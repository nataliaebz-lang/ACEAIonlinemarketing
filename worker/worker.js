import { handleResources } from './resources.js';
import { handleAdmin } from './admin.js';

// ACEAI Studio — Worker ÚNICO de Cloudflare (backend + orquestador)
// ─────────────────────────────────────────────────────────────────────────────
// Claude (API) pone el CEREBRO: textos, coach, miniaturas (concepto), títulos,
// asistente de avatar, recrear-desde-URL (visión), borrador y el PLAN del pipeline.
// Los pasos FÍSICOS (render de video, imagen real, subtítulos, publicar) los hace
// un PROVEEDOR externo enchufable. Si no está conectado, el paso queda "pendiente"
// y NO descuenta créditos.
//
// CRÉDITOS: si tienes el binding D1 `DB`, cada acción facturable comprueba y
// descuenta créditos por cliente (client_id). Si NO hay D1, el Worker funciona
// igual que antes (sin cobrar), para no romper tu despliegue actual.
//
// Secretos / config (wrangler):
//   wrangler secret put ANTHROPIC_API_KEY          (obligatorio)
//   wrangler secret put ALLOWED_ORIGIN             (opcional, recomendado)
//   wrangler secret put IMAGE_ENDPOINT             (opcional: miniatura/persona real)
//   wrangler secret put VIDEO_RENDER_URL           (opcional: render del video final)
//   wrangler secret put CAPTIONS_URL               (opcional: transcripción/subtítulos)
//   wrangler secret put PUBLISH_URL                (opcional: publicar en redes)
//   wrangler secret put GHL_WEBHOOK_SECRET         (opcional: recargar créditos desde GHL)
//   [[d1_databases]] binding="DB"  (en wrangler.toml, para créditos)
//
// NIVELES (seguridad real — "la interfaz oculta, el Worker decide"):
//   wrangler secret put GHL_PIT          (token de integración privada de GHL; lee el contacto)
//   wrangler secret put GHL_FIELD_P      (id del campo personalizado nivel_p en GHL)
//   wrangler secret put GHL_FIELD_IA     (id del campo personalizado nivel_ia en GHL)
//   wrangler secret put GHL_FIELD_PMF    (id del campo personalizado acceso_pmf en GHL)
//   Sin GHL_PIT el Worker NO bloquea por nivel (compat. con despliegues actuales).
// ─────────────────────────────────────────────────────────────────────────────

const MODEL = 'claude-sonnet-4-6';

// Menú de créditos (mismo que la calculadora, markup 2x). Edítalo aquí si cambian
// los costos de los modelos: no toques el resto del código.
const CREDITS = {
  text:        1,   // un caption / guion / variante de post
  image:       4,   // una miniatura estándar
  image_prem:  6,   // miniatura premium / con tu cara (persona)
  video:       20,  // un video corto estándar (Kling/Veo Lite, ~8s)
  video_prem:  60,  // un video corto premium (Veo Fast)
  captions:    2,   // transcripción + subtítulos de un clip
  vision:      2    // analizar una miniatura de referencia (recrear)
};

// ── NIVELES — qué nivel exige cada acción del Worker ──────────────────────────
// Modelo de los adjuntos (P/IA/PMF, acumulativo, PMF abre todo P+IA).
// Todo el Studio es el desbloqueo IA3: cualquier acción de pago exige ia>=3 o PMF.
const STUDIO_REQ = { area: 'ia', level: 3 };
const GHL_API     = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';
const NIVEL_TTL   = 60 * 1000;                 // cache de nivel por contacto (60s)
const _nivelCache = new Map();                 // clientId -> { user, exp }

export default {
  async fetch(request, env) {
    const origin = env.ALLOWED_ORIGIN || '*';
    const cors = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-GHL-Signature, X-WH-Signature'
    };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    const path = new URL(request.url).pathname.replace(/\/+$/, '') || '/';

    // ── Contenidos del dashboard + gestor /admin (unificados en este worker) ──
    // /api/resources alimenta al frontend; /admin es el gestor de contenidos.
    if (path === '/api/resources') return handleResources(request, env, cors);
    if (path === '/admin' || path.startsWith('/api/admin')) return handleAdmin(request, env, new URL(request.url), cors);

    // ── Consultar saldo:  GET /balance?client=ID   o  POST /balance {client_id}
    if (path === '/balance') {
      const clientId = clientFrom(request) || 'default';
      const credits = await getBalance(env, clientId);
      return json({ client_id: clientId, credits, credits_enabled: !!env.DB }, 200, cors);
    }

    // ── Recargar créditos desde GHL (webhook de compra)
    if (path === '/ghl-webhook') {
      return handleGhlWebhook(request, env, cors);
    }

    // ── Consultar nivel real (QA):  GET /nivel?client=ID  → {p, ia, pmf}
    if (path === '/nivel') {
      const clientId = clientFrom(request) || 'default';
      const user = await nivelReal(env, clientId);
      return json({ client_id: clientId, nivel: user, niveles_enabled: !!env.GHL_PIT }, 200, cors);
    }

    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, cors);

    try {
      const body = await request.json();
      const lang = ({ es: 'español', en: 'English', pt: 'português' })[body.lang] || 'español';
      const clientId = body.client_id || 'default';

      // ── VERIFICACIÓN DE NIVEL REAL (antes de ejecutar/cobrar nada).
      // El nivel llega por la URL al portal, pero NO se confía en él: se lee
      // el nivel real del contacto en GHL. Insuficiente → 403 sin_acceso.
      const bloqueo = await guardNivel(env, clientId, STUDIO_REQ, cors);
      if (bloqueo) return bloqueo;

      // ── PIPELINE de video completo (un clic: estructura → adaptar → miniatura → subs → guiones → publicar)
      if (path === '/pipeline' || body.pipeline) {
        return runPipeline(env, body, lang, clientId, cors);
      }

      // ── Pasos sueltos del pipeline (por si los llamas individualmente desde la app)
      if (body.render_video) return billed(env, clientId, body.premium ? CREDITS.video_prem : CREDITS.video, 'video_render', cors,
        () => renderVideo(env, body.plan || {}, body.source_url, body.captions || null, body.premium));
      if (body.render_thumb) return billed(env, clientId, body.persona ? CREDITS.image_prem : CREDITS.image, 'thumbnail', cors,
        () => genThumbnail(env, body.prompt || '', body.persona || null));
      if (body.captions)     return billed(env, clientId, CREDITS.captions, 'captions', cors,
        () => genCaptions(env, body.source_url, lang));

      // ── BORRADOR de video/presentación (texto+visión: el plan, sin render)
      if (body.draft) {
        return billed(env, clientId, CREDITS.text, 'draft', cors, async () => {
          const id = body.videoId || ytId(body.url || '');
          let visual = '';
          if (id) { const thumb = await fetchThumb(id); if (thumb) visual = await visionDescribe(env, thumb, lang); }
          const draft = await buildDraft(env, body, lang, visual);
          return { draft };
        });
      }

      // ── RECREAR: analiza la miniatura del video de referencia (visión)
      if (body.url || body.videoId) {
        return billed(env, clientId, CREDITS.vision, 'recreate', cors, async () => {
          const id = body.videoId || ytId(body.url || '');
          if (!id) throw new Error('No es un link de YouTube válido.');
          const thumb = await fetchThumb(id);
          if (!thumb) throw new Error('No se pudo obtener la miniatura del video.');
          const prompt = 'Analiza esta miniatura de YouTube y describe su ESTRUCTURA para recrear el FORMATO (no el contenido). Responde en ' + lang + '. ' +
            (body.topic ? ('El usuario hará una miniatura sobre: "' + body.topic + '". ') : '') +
            'Devuelve EXCLUSIVAMENTE JSON válido sin texto extra: {"composicion":"...","foco":"...","texto":{"contenido":"...","posicion":"...","estilo":"..."},"colores":"...","expresion":"...","elementos":["..."],"recreacion_prompt":"<prompt para una miniatura nueva con la misma estructura pero el tema del usuario>"}';
          const text = await callVision(env, thumb, prompt, 900);
          let structure; try { structure = JSON.parse(strip(text)); } catch (e) { structure = { recreacion_prompt: text }; }
          return { videoId: id, thumbUrl: 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg', structure };
        });
      }

      // ── Rutas de texto (coach, miniaturas-concepto, títulos, asistente)
      if (body.coach || body.thumbs || body.titles || body.assist) {
        const max = body.thumbs ? 700 : (body.titles ? 300 : 600);
        return billed(env, clientId, CREDITS.text, 'text', cors,
          async () => ({ text: await callClaude(env, String(body.prompt || ''), max) }));
      }

      // ── Por defecto: variantes de post (1 crédito por red)
      if (body.idea) {
        const plats = body.platforms || [];
        const cost = Math.max(CREDITS.text, plats.length * CREDITS.text);
        return billed(env, clientId, cost, 'variants', cors, async () => {
          const prompt = buildVariantPrompt(body, lang);
          const text = await callClaude(env, prompt, 1200);
          let parsed; try { parsed = JSON.parse(strip(text)); } catch (e) { throw new Error('Respuesta no válida del modelo.'); }
          return { variants: parsed.variants || [] };
        });
      }

      return json({ error: 'Petición no reconocida.' }, 400, cors);
    } catch (e) {
      return json({ error: String(e && e.message || e) }, 500, { 'Access-Control-Allow-Origin': origin });
    }
  }
};

// ── PIPELINE: orquesta los pasos y solo cobra los que de verdad se ejecutan ───
async function runPipeline(env, body, lang, clientId, cors) {
  const steps = {};
  let charged = 0;
  const premium = !!body.premium;

  // Saldo: estimamos el costo máximo (plan + miniatura + video + subs) y validamos ANTES.
  const estMax = CREDITS.text + (body.persona ? CREDITS.image_prem : CREDITS.image) +
                 (premium ? CREDITS.video_prem : CREDITS.video) + CREDITS.captions;
  if (env.DB) {
    const bal = await getBalance(env, clientId);
    if (bal < estMax) return json({ error: 'creditos_insuficientes', need: estMax, have: bal }, 402, cors);
  }

  try {
    // 1) PLAN (cerebro): estructura del referente + mapeo del clip subido + guiones por red + texto de subtítulos + prompt de miniatura
    const plan = await buildPipelinePlan(env, body, lang);
    await charge(env, clientId, CREDITS.text, 'pipeline_plan'); charged += CREDITS.text;
    steps.plan = { status: 'ok', plan };

    // 2) SUBTÍTULOS (proveedor): transcribe el clip subido y devuelve SRT/VTT
    const cap = await genCaptions(env, body.source_url, lang);
    if (cap.status === 'ok') { await charge(env, clientId, CREDITS.captions, 'captions'); charged += CREDITS.captions; }
    steps.captions = cap;

    // 3) MINIATURA (proveedor de imagen): usa el prompt del plan y, si hay, la persona
    const thumb = await genThumbnail(env, (plan.thumbnail_prompt || body.topic || ''), body.persona || null);
    if (thumb.status === 'ok') { await charge(env, clientId, body.persona ? CREDITS.image_prem : CREDITS.image, 'thumbnail'); charged += body.persona ? CREDITS.image_prem : CREDITS.image; }
    steps.thumbnail = thumb;

    // 4) RENDER del video (proveedor): aplica la estructura al clip subido + quema subtítulos
    const vid = await renderVideo(env, plan, body.source_url, cap.status === 'ok' ? cap : null, premium);
    if (vid.status === 'ok') { await charge(env, clientId, premium ? CREDITS.video_prem : CREDITS.video, 'video_render'); charged += premium ? CREDITS.video_prem : CREDITS.video; }
    steps.video = vid;

    // 5) PUBLICAR (proveedor): manda video + posts por red. Solo si lo pides explícitamente.
    if (body.publish) {
      const pub = await publish(env, { platforms: body.platforms || [], posts: plan.posts || [], video: vid });
      steps.publish = pub; // publicar no descuenta créditos (es envío, no generación)
    }

    const balance = env.DB ? await getBalance(env, clientId) : null;
    return json({ ok: true, charged, balance, steps }, 200, cors);
  } catch (e) {
    return json({ error: String(e && e.message || e), charged, steps }, 500, cors);
  }
}

// El plan: TODO el cerebro del pipeline en una sola llamada a Claude
async function buildPipelinePlan(env, body, lang) {
  const id = body.videoId || ytId(body.url || '');
  let visual = '';
  if (id) { const thumb = await fetchThumb(id); if (thumb) visual = await visionDescribe(env, thumb, lang); }
  const plats = body.platforms || ['ig', 'tk', 'yt'];
  const reglas = plats.map(k => '- ' + (PLAT_RULES[k] || k)).join('\n');
  const persona = body.persona || {};
  const p =
    'Eres director de contenido de ACEAI. A partir de un VIDEO DE REFERENCIA y el VIDEO PROPIO del usuario, produce el PLAN para crear un video corto que copie la ESTRUCTURA del referente (no su contenido). Todo en ' + lang + '.\n' +
    'TEMA del usuario: "' + (body.topic || '') + '".\n' +
    (body.url ? ('Referente: ' + body.url + '. ') : '') +
    (visual ? ('Estilo visual del referente: ' + visual + '. ') : '') +
    (body.transcript ? ('Transcripción del video PROPIO del usuario: """' + body.transcript + '""". Mapea sus partes reales a la estructura. ') : 'No hay transcripción del video propio: deja marcadores de qué segmento va en cada escena. ') +
    (persona.nombre ? ('La cara/persona del usuario: ' + persona.nombre + (persona.descripcion ? ' — ' + persona.descripcion : '') + '. ') : '') +
    'Devuelve EXCLUSIVAMENTE JSON válido, sin texto ni bloques de código, con esta forma:\n' +
    '{' +
    '"scenes":[{"orden":1,"fase":"Gancho/Problema/Solución/CTA","desde_seg":0,"hasta_seg":3,"en_pantalla":"texto superpuesto","origen_clip":"qué parte del video propio usar","subtitulo":"línea hablada"}],' +
    '"thumbnail_prompt":"<prompt en inglés para generar la miniatura con la misma estructura del referente y el tema del usuario>",' +
    '"posts":[{"platform":"<codigo>","meta":"<etiqueta>","body":"<post listo para esa red>","script":"<guion/locución para acompañar>"}]' +
    '}\n' +
    'Para los posts usa SOLO estas redes y respeta su formato:\n' + reglas + '\nCódigos: ' + plats.join(', ') + '.';
  const text = await callClaude(env, p, 1800);
  let plan; try { plan = JSON.parse(strip(text)); } catch (e) { plan = { scenes: [], posts: [], thumbnail_prompt: body.topic || '', raw: text }; }
  return plan;
}

async function buildDraft(env, body, lang, visual) {
  const mode = body.mode === 'presentacion' ? 'presentación' : 'video corto';
  const persona = body.persona || {};
  const p = 'Eres guionista y diseñador de contenido. Crea el BORRADOR de un ' + mode + ' en ' + lang +
    ' sobre el tema: "' + (body.topic || '') + '". Sigue el ORDEN y la ESTRUCTURA típica del video de referencia' +
    (body.url ? (' (' + body.url + ')') : '') + '. ' + (visual ? ('Estilo del referente: ' + visual + '. ') : '') +
    (persona.nombre ? ('Protagonista (tu imagen): ' + persona.nombre + (persona.descripcion ? ' — ' + persona.descripcion : '') + '. ') : '') +
    'Da entre 5 y 8 ' + (body.mode === 'presentacion' ? 'diapositivas' : 'escenas') + ' EN ORDEN. ' +
    'Para cada una: orden, titulo (fase), en_pantalla, guion (1-2 frases), tu_imagen (cómo aparece tu imagen o "—"). ' +
    'Devuelve EXCLUSIVAMENTE JSON válido sin bloques de código: ' +
    '{"mode":"' + (body.mode === 'presentacion' ? 'presentacion' : 'video') + '","scenes":[{"orden":1,"titulo":"...","en_pantalla":"...","guion":"...","tu_imagen":"..."}]}';
  const text = await callClaude(env, p, 1400);
  try { return JSON.parse(strip(text)); } catch (e) { return { mode: body.mode, scenes: [], raw: text }; }
}

// ── PROVEEDORES enchufables (devuelven {status:'ok'|'pending_provider', ...}) ──
async function genThumbnail(env, prompt, persona) {
  if (!env.IMAGE_ENDPOINT) return { status: 'pending_provider', provider: 'image', note: 'Conecta IMAGE_ENDPOINT (fal.ai/Replicate flux+identidad) para la miniatura real.' };
  const r = await fetch(env.IMAGE_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt, persona }) });
  const d = await r.json();
  if (!r.ok || d.error) throw new Error(d.error || 'Error del proveedor de imagen');
  return { status: 'ok', ...d };
}
async function genCaptions(env, sourceUrl, lang) {
  if (!sourceUrl) return { status: 'pending_provider', provider: 'captions', note: 'Sube tu video y pasa su URL (R2) para transcribir.' };
  if (!env.CAPTIONS_URL) return { status: 'pending_provider', provider: 'captions', note: 'Conecta CAPTIONS_URL (Whisper/transcripción) para los subtítulos.' };
  const r = await fetch(env.CAPTIONS_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: sourceUrl, lang }) });
  const d = await r.json();
  if (!r.ok || d.error) throw new Error(d.error || 'Error del proveedor de subtítulos');
  return { status: 'ok', ...d }; // espera { srt, vtt, transcript }
}
async function renderVideo(env, plan, sourceUrl, captions, premium) {
  if (!sourceUrl) return { status: 'pending_provider', provider: 'video_render', note: 'Sube tu video y pasa su URL (R2) para renderizar.' };
  if (!env.VIDEO_RENDER_URL) return { status: 'pending_provider', provider: 'video_render', note: 'Conecta VIDEO_RENDER_URL (Shotstack/Creatomate/fal) para el render final.' };
  const r = await fetch(env.VIDEO_RENDER_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan, source_url: sourceUrl, captions, quality: premium ? 'premium' : 'standard' }) });
  const d = await r.json();
  if (!r.ok || d.error) throw new Error(d.error || 'Error del proveedor de render');
  return { status: 'ok', ...d }; // espera { job_id, status } o { video_url }
}
async function publish(env, payload) {
  if (!env.PUBLISH_URL) return { status: 'pending_provider', provider: 'publish', note: 'Conecta PUBLISH_URL (Ayrshare/Blotato) para publicar en redes.' };
  const r = await fetch(env.PUBLISH_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  const d = await r.json();
  if (!r.ok || d.error) throw new Error(d.error || 'Error del proveedor de publicación');
  return { status: 'ok', ...d };
}

// ── CRÉDITOS (D1) ────────────────────────────────────────────────────────────
// Envuelve una acción: comprueba saldo, ejecuta, descuenta. Si falla, no cobra.
async function billed(env, clientId, cost, reason, cors, run) {
  if (env.DB) {
    const bal = await getBalance(env, clientId);
    if (bal < cost) return json({ error: 'creditos_insuficientes', need: cost, have: bal }, 402, cors);
  }
  const out = await run();
  let balance = null;
  if (env.DB) { await charge(env, clientId, cost, reason); balance = await getBalance(env, clientId); }
  return json({ ...out, charged: env.DB ? cost : 0, balance }, 200, cors);
}
async function ensureTables(env) {
  await env.DB.exec("CREATE TABLE IF NOT EXISTS balances (client_id TEXT PRIMARY KEY, credits INTEGER NOT NULL DEFAULT 0)");
  await env.DB.exec("CREATE TABLE IF NOT EXISTS ledger (id INTEGER PRIMARY KEY AUTOINCREMENT, client_id TEXT, delta INTEGER, reason TEXT, ts INTEGER)");
}
async function getBalance(env, clientId) {
  if (!env.DB) return null;
  await ensureTables(env);
  const row = await env.DB.prepare("SELECT credits FROM balances WHERE client_id=?").bind(clientId).first();
  return row ? row.credits : 0;
}
async function charge(env, clientId, amount, reason) {
  if (!env.DB || !amount) return;
  await ensureTables(env);
  await env.DB.prepare("INSERT INTO balances (client_id, credits) VALUES (?, 0) ON CONFLICT(client_id) DO NOTHING").bind(clientId).run();
  await env.DB.prepare("UPDATE balances SET credits = credits - ? WHERE client_id=?").bind(amount, clientId).run();
  await env.DB.prepare("INSERT INTO ledger (client_id, delta, reason, ts) VALUES (?,?,?,?)").bind(clientId, -amount, reason, Date.now()).run();
}
async function topup(env, clientId, amount, reason) {
  if (!env.DB) return;
  await ensureTables(env);
  await env.DB.prepare("INSERT INTO balances (client_id, credits) VALUES (?, ?) ON CONFLICT(client_id) DO UPDATE SET credits = credits + ?").bind(clientId, amount, amount).run();
  await env.DB.prepare("INSERT INTO ledger (client_id, delta, reason, ts) VALUES (?,?,?,?)").bind(clientId, amount, reason || 'topup', Date.now()).run();
}

// Webhook de GHL: al comprar un pack, suma créditos al cliente.
async function handleGhlWebhook(request, env, cors) {
  try {
    const raw = await request.text();
    // Verificación de firma (recomendado): GHL firma con X-GHL-Signature (Ed25519).
    // Implementa la verificación con tu clave pública antes de confiar en el payload.
    // if (!verifyGhlSignature(raw, request.headers.get('X-GHL-Signature'), env)) return json({error:'firma_invalida'},401,cors);
    const data = JSON.parse(raw);
    const clientId = data.client_id || data.contact_id || data.email || 'default';
    // Mapa pack → créditos (ajusta a tus packs 400/800/1600)
    const PACKS = { studio_start: 400, studio_plus: 800, studio_pro: 1600 };
    const credits = data.credits || PACKS[data.pack] || 0;
    if (!credits) return json({ error: 'pack_desconocido', data }, 400, cors);
    await topup(env, clientId, credits, 'compra:' + (data.pack || 'manual'));
    return json({ ok: true, client_id: clientId, added: credits, balance: await getBalance(env, clientId) }, 200, cors);
  } catch (e) {
    return json({ error: String(e && e.message || e) }, 500, cors);
  }
}

// ── NIVELES (acceso real desde GHL) ──────────────────────────────────────────
// "La interfaz oculta; el Worker decide." El portal pasa el nivel por la URL,
// pero es spoofeable: aquí se lee el nivel REAL del contacto en GHL y se decide.

// Lee {p, ia, pmf} del contacto en GHL. Fail-closed: ante cualquier duda → 0.
async function nivelReal(env, clientId) {
  if (!clientId || clientId === 'default') return { p: 0, ia: 0, pmf: 0, _sin_id: true };
  if (!env.GHL_PIT)                          return { p: 0, ia: 0, pmf: 0, _sin_token: true };

  const hit = _nivelCache.get(clientId);
  if (hit && hit.exp > Date.now()) return hit.user;

  let data;
  try {
    const r = await fetch(`${GHL_API}/contacts/${encodeURIComponent(clientId)}`, {
      headers: { Authorization: `Bearer ${env.GHL_PIT}`, Version: GHL_VERSION, Accept: 'application/json' }
    });
    if (!r.ok) return { p: 0, ia: 0, pmf: 0, _error: 'ghl_' + r.status }; // fail-closed
    data = await r.json();
  } catch (e) {
    return { p: 0, ia: 0, pmf: 0, _error: String(e && e.message || e) };   // fail-closed
  }

  const contact = data.contact || data || {};
  const cf = contact.customFields || contact.custom_fields || [];
  // GHL devuelve los campos por id; algunos setups también traen key/fieldKey.
  const val = (idEnv, keyName) => {
    const wantId = env[idEnv];
    for (const f of cf) {
      if (wantId && f.id === wantId) return f.value;
      const k = f.key || f.fieldKey || '';
      if (k && (k === keyName || k.endsWith('.' + keyName))) return f.value;
    }
    return undefined;
  };
  const num = v => { const n = parseInt(v, 10); return Number.isFinite(n) ? n : 0; };
  const user = {
    p:   num(val('GHL_FIELD_P',   'nivel_p')),
    ia:  num(val('GHL_FIELD_IA',  'nivel_ia')),
    pmf: num(val('GHL_FIELD_PMF', 'acceso_pmf'))
  };
  _nivelCache.set(clientId, { user, exp: Date.now() + NIVEL_TTL });
  return user;
}

// Misma lógica que el portal: PMF abre todo; si no, acumulativo (nivel >= requerido).
function permitido(user, area, nivelRequerido) {
  if (!user) return false;
  if (user.pmf >= 1) return true;
  const n = area === 'p' ? user.p : area === 'ia' ? user.ia : user.pmf;
  return n >= nivelRequerido;
}

// Compuerta: devuelve una Response 403 si el contacto no tiene nivel; null si pasa.
// Sin GHL_PIT no bloquea (compat. con despliegues que aún no conectan GHL).
async function guardNivel(env, clientId, req, cors) {
  if (!env.GHL_PIT) return null;
  const user = await nivelReal(env, clientId);
  if (!permitido(user, req.area, req.level)) {
    return json({ error: 'sin_acceso', area: req.area, level: req.level, have: { p: user.p, ia: user.ia, pmf: user.pmf } }, 403, cors);
  }
  return null;
}

// ── Helpers base (de tu worker original) ─────────────────────────────────────
function clientFrom(request) {
  const u = new URL(request.url);
  return u.searchParams.get('client') || null;
}
function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), { status: status || 200, headers: { 'Content-Type': 'application/json', ...(headers || {}) } });
}
function strip(t) { return String(t || '').replace(/```json|```/g, '').trim(); }
function ytId(u) {
  const m = (u || '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/))([\w-]{11})|[?&]v=([\w-]{11})/);
  return m ? (m[1] || m[2] || '') : '';
}
async function fetchThumb(id) {
  const urls = ['https://img.youtube.com/vi/' + id + '/maxresdefault.jpg', 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg'];
  for (const u of urls) {
    try { const r = await fetch(u); if (r.ok) { const ab = await r.arrayBuffer(); if (ab.byteLength > 3000) return { b64: toBase64(ab), media: 'image/jpeg' }; } } catch (e) {}
  }
  return null;
}
function toBase64(ab) { let bin = ''; const bytes = new Uint8Array(ab); for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]); return btoa(bin); }
async function callClaude(env, prompt, maxTokens) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: MODEL, max_tokens: maxTokens || 1000, messages: [{ role: 'user', content: prompt }] })
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error.message || 'Error del modelo');
  return (d.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n');
}
async function callVision(env, thumb, prompt, maxTokens) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: MODEL, max_tokens: maxTokens || 900, messages: [{ role: 'user', content: [
      { type: 'image', source: { type: 'base64', media_type: thumb.media, data: thumb.b64 } }, { type: 'text', text: prompt }
    ] }] })
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error.message || 'Error del modelo');
  return (d.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n');
}
async function visionDescribe(env, thumb, lang) {
  try { return await callVision(env, thumb, 'Describe en una frase el estilo visual de esta miniatura (colores, composición, energía) en ' + lang + '.', 150); }
  catch (e) { return ''; }
}
const PLAT_RULES = {
  x: 'X (Twitter): gancho potente, máx 280 caracteres, 1 emoji opcional. meta = "N / 280".',
  li: 'LinkedIn: 120-160 palabras, cálido y profesional, termina con pregunta. meta = "N caracteres".',
  ig: 'Instagram: caption con gancho "Guarda esto", escaneable y 3-5 hashtags. meta = "Caption".',
  tk: 'TikTok: guion 20-30s con marcas [0-3s],[3-12s],[12-25s]. meta = "Guion · N s".',
  yt: 'YouTube: descripción corta de Short, 2-3 frases + llamada a comentar. meta = "Short".'
};
function buildVariantPrompt(body, langName) {
  const plats = body.platforms || [];
  const reglas = plats.map(k => '- ' + (PLAT_RULES[k] || k)).join('\n');
  const a = body.avatar || null;
  let p = 'Eres el motor de contenido de ACEAI, una plataforma de IA para emprendedoras. A partir de una idea, redacta publicaciones nativas para cada red indicada, listas para publicar y con la voz de la marca. Escribe TODO en ' + langName + '.\n\n';
  p += 'IDEA: """' + (body.idea || '') + '"""\nTONO: ' + (body.tono || 'cercano') + '\n';
  if (body.campName) p += 'CAMPAÑA: ' + body.campName + '\n';
  if (a) {
    p += '\nAVATAR OBJETIVO: ' + a.nombre + (a.servicio ? ' (servicio: ' + a.servicio + ', empresa: ' + a.empresa + ')' : '') + '.\n';
    if (a.descripcion) p += 'Quién es: ' + a.descripcion + '\n';
    if (a.dolores) p += 'Sus dolores: ' + a.dolores + '\n';
    if (a.deseos) p += 'Sus deseos: ' + a.deseos + '\n';
    p += 'Háblale directamente a este avatar.\n';
  }
  if (body.voz) p += '\nVOZ DAYLLU: añade una capa de propósito y sabiduría (cosmovisión andina, arquetipos), cálida y auténtica, sin sonar esotérica.\n';
  p += '\nRedacta SOLO para estas redes y respeta su formato:\n' + reglas + '\n\n';
  p += 'Devuelve EXCLUSIVAMENTE un JSON válido, sin texto antes ni después y sin bloques de código:\n';
  p += '{"variants":[{"platform":"<codigo>","meta":"<etiqueta corta>","body":"<texto del post>"}]}\n';
  p += 'Códigos válidos: ' + plats.join(', ') + '. Una entrada por red, en ese orden.';
  return p;
}
