// Acceso a la tabla `resources` en D1 y el endpoint público con gating.

import { json } from "./util.js";
import { getSession } from "./auth.js";

const VALID_TYPES = ["course", "book", "audio", "app"];
const VALID_AREAS = ["P", "IA", "abierto"];
const VALID_LANGS = ["es", "en", "pt"];

// GET /api/resources[?lang=es]
// Devuelve TODOS los recursos del dashboard. La fundadora ve el dashboard
// completo; los recursos que su nivel aún no desbloquea llegan marcados como
// `locked: true` y SIN su enlace, para que el frontend los muestre con candado
// ("Disponible en …") en vez de ocultarlos.
//
// Regla de gating: un recurso está desbloqueado si su `level` <= nivel de la
// fundadora. (level = 0 = abierto a todas.)
export async function handleResources(request, env) {
  const session = await getSession(request, env);
  if (!session) return json({ error: "unauthenticated" }, request, env, 401);

  const lang = pickLang(new URL(request.url).searchParams.get("lang"));
  const level = Number(session.level) || 0;

  const { results } = await env.DB.prepare(
    `SELECT * FROM resources
       WHERE active = 1
       ORDER BY area, sort_order, level, id`
  ).all();

  const items = (results || []).map((r) => shapeForFounder(r, lang, level));

  return json(
    {
      level,
      lang,
      count: items.length,
      unlocked: items.filter((i) => !i.locked).length,
      resources: items,
    },
    request,
    env
  );
}

function pickLang(lang) {
  return VALID_LANGS.includes(lang) ? lang : "es";
}

// Da forma a un recurso para la fundadora.
// - Siempre se devuelven título y descripción (en el idioma pedido y en los tres)
//   para poder mostrar la tarjeta aunque esté bloqueada.
// - `locked` indica si el nivel de la fundadora aún no lo desbloquea.
// - El `link` solo se incluye si está desbloqueado; si está bloqueado va `null`
//   para que no se pueda abrir el contenido.
function shapeForFounder(r, lang, founderLevel) {
  const locked = Number(r.level) > Number(founderLevel);
  return {
    id: r.id,
    type: r.type,
    area: r.area,
    level: r.level,
    locked,
    unlock_level: r.level, // nivel necesario para desbloquearlo (p. ej. P2)
    link: locked ? null : r.link,
    image_url: r.image_url,
    title: r[`title_${lang}`] || r.title_es,
    description: r[`desc_${lang}`] || r.desc_es,
    i18n: {
      es: { title: r.title_es, description: r.desc_es },
      en: { title: r.title_en, description: r.desc_en },
      pt: { title: r.title_pt, description: r.desc_pt },
    },
  };
}

// ── Operaciones CRUD usadas por el panel /admin ──────────────────────────

export async function listAllResources(env) {
  const { results } = await env.DB.prepare(
    `SELECT * FROM resources ORDER BY area, sort_order, id`
  ).all();
  return results || [];
}

export async function createResource(body, env) {
  const r = normalize(body);
  const v = validate(r);
  if (v) return { error: v };
  const res = await env.DB.prepare(
    `INSERT INTO resources
      (type, area, level, link, image_url, title_es, title_en, title_pt, desc_es, desc_en, desc_pt, sort_order, active)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`
  )
    .bind(
      r.type, r.area, r.level, r.link, r.image_url,
      r.title_es, r.title_en, r.title_pt,
      r.desc_es, r.desc_en, r.desc_pt,
      r.sort_order, r.active
    )
    .run();
  return { id: res.meta?.last_row_id };
}

export async function updateResource(id, body, env) {
  const r = normalize(body);
  const v = validate(r);
  if (v) return { error: v };
  await env.DB.prepare(
    `UPDATE resources SET
       type=?, area=?, level=?, link=?, image_url=?,
       title_es=?, title_en=?, title_pt=?,
       desc_es=?, desc_en=?, desc_pt=?,
       sort_order=?, active=?, updated_at=datetime('now')
     WHERE id=?`
  )
    .bind(
      r.type, r.area, r.level, r.link, r.image_url,
      r.title_es, r.title_en, r.title_pt,
      r.desc_es, r.desc_en, r.desc_pt,
      r.sort_order, r.active, id
    )
    .run();
  return { id };
}

export async function deleteResource(id, env) {
  await env.DB.prepare(`DELETE FROM resources WHERE id=?`).bind(id).run();
  return { id };
}

// Normaliza y aplica valores por defecto a la entrada del admin.
function normalize(b = {}) {
  return {
    type: String(b.type || "").trim(),
    area: String(b.area || "").trim(),
    level: Number.isFinite(+b.level) ? parseInt(b.level, 10) : 0,
    link: String(b.link || "").trim(),
    image_url: b.image_url ? String(b.image_url).trim() : null,
    title_es: String(b.title_es || "").trim(),
    title_en: String(b.title_en || "").trim(),
    title_pt: String(b.title_pt || "").trim(),
    desc_es: String(b.desc_es || "").trim(),
    desc_en: String(b.desc_en || "").trim(),
    desc_pt: String(b.desc_pt || "").trim(),
    sort_order: Number.isFinite(+b.sort_order) ? parseInt(b.sort_order, 10) : 0,
    active: b.active === false || b.active === 0 || b.active === "0" ? 0 : 1,
  };
}

function validate(r) {
  if (!VALID_TYPES.includes(r.type)) return "type_invalid";
  if (!VALID_AREAS.includes(r.area)) return "area_invalid";
  if (r.level < 0) return "level_invalid";
  if (!r.link) return "link_required";
  if (!r.title_es && !r.title_en && !r.title_pt) return "title_required";
  return null;
}
