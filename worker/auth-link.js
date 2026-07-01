// Acceso por enlace de un solo uso (magic-link). Panel INDEPENDIENTE (sin iframe).
//
// Flujo:
//   POST /api/auth/request { email }  → busca el contacto en GHL; si existe, firma
//        un enlace de un solo uso (15 min) y lo envía por correo. Respuesta neutra.
//   GET  /api/auth/verify?token=...   → valida el enlace, crea la cookie de sesión
//        (30 días con el cid del contacto) y redirige al panel.
//   GET  /api/auth/me                 → datos de la sesión + nivel REAL desde GHL.
//   POST /api/auth/logout             → borra la cookie.
//
// La cookie de sesión guarda el cid (id de contacto en GHL). El nivel NUNCA se
// guarda en la sesión ni viaja por la URL: se lee en cada petición con nivelReal.

const GHL_API = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";
const SESSION_COOKIE = "aceai_session";
const MAGIC_TTL_MS = 15 * 60 * 1000;      // 15 min
const SESSION_TTL_S = 30 * 24 * 60 * 60;  // 30 días
const enc = new TextEncoder();

// ── util json / cookies / firma ─────────────────────────────────────────────
function jsonR(obj, status, cors, extra = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...cors, ...extra },
  });
}
function b64url(bytes) {
  let s = ""; const a = new Uint8Array(bytes);
  for (let i = 0; i < a.length; i++) s += String.fromCharCode(a[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlBytes(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/"); while (str.length % 4) str += "=";
  const bin = atob(str); const b = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) b[i] = bin.charCodeAt(i); return b;
}
async function hkey(secret) {
  // Sin secreto NO se firma nada (evita sesiones falsificables con clave genérica).
  if (!secret) throw new Error("AUTH_SECRET no configurado");
  return crypto.subtle.importKey("raw", enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
async function sign(payload, secret) {
  const body = b64url(enc.encode(JSON.stringify(payload)));
  const sig = await crypto.subtle.sign("HMAC", await hkey(secret), enc.encode(body));
  return `${body}.${b64url(sig)}`;
}
async function verify(token, secret) {
  if (!token || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  try {
    const ok = await crypto.subtle.verify("HMAC", await hkey(secret), b64urlBytes(sig), enc.encode(body));
    if (!ok) return null;
    const p = JSON.parse(new TextDecoder().decode(b64urlBytes(body)));
    if (p.exp && Date.now() > p.exp) return null;
    return p;
  } catch { return null; }
}
function readCookie(request, name) {
  const h = request.headers.get("Cookie") || "";
  for (const part of h.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return null;
}
function sessionCookie(value, env, maxAge) {
  const ss = env.COOKIE_SAMESITE || "Lax";
  return `${SESSION_COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=${ss}; Max-Age=${maxAge}`;
}
function isEmail(e) { return typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim()); }

// ── GHL: buscar contacto por correo ─────────────────────────────────────────
async function ghlContactByEmail(env, email) {
  if (!env.GHL_PIT || !env.GHL_LOCATION_ID) return null;
  const url = `${GHL_API}/contacts/?locationId=${encodeURIComponent(env.GHL_LOCATION_ID)}&query=${encodeURIComponent(email)}`;
  let r;
  try {
    r = await fetch(url, { headers: { Authorization: `Bearer ${env.GHL_PIT}`, Version: GHL_VERSION, Accept: "application/json" } });
  } catch { return null; }
  if (!r.ok) return null;
  const data = await r.json().catch(() => ({}));
  const target = email.trim().toLowerCase();
  const c = (data.contacts || []).find((x) => (x.email || "").trim().toLowerCase() === target);
  if (!c) return null;
  return { id: c.id, name: c.contactName || [c.firstName, c.lastName].filter(Boolean).join(" ") || "" };
}

// ── Enviar el magic-link por correo (Resend) ────────────────────────────────
async function sendMagicLink(env, email, link) {
  const brand = env.BRAND_NAME || "ACEAI";
  if (!env.RESEND_API_KEY) { console.log(`[DEV magic-link] ${email} -> ${link}`); return; }
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.EMAIL_FROM || `${brand} <onboarding@resend.dev>`,
      to: [email],
      subject: `Tu acceso a ${brand}`,
      html: `<p>Entra a tu panel con este enlace (válido 15 minutos):</p>
             <p><a href="${link}">Entrar a ${brand}</a></p>
             <p style="color:#888;font-size:12px">Si no lo solicitaste, ignora este correo.</p>`,
      text: `Entra a tu panel: ${link}`,
    }),
  }).catch((e) => console.error("resend", e));
}

// ── Sesión: lee la cookie y devuelve { email, cid, name } o null ─────────────
export async function getSession(request, env) {
  if (!env.AUTH_SECRET) return null;
  const raw = readCookie(request, SESSION_COOKIE);
  if (!raw) return null;
  const p = await verify(raw, env.AUTH_SECRET);
  return p && p.t === "sess" ? p : null;
}

// ── Router de /api/auth/* ────────────────────────────────────────────────────
// nivelReal se recibe del worker para leer el nivel real en /me (sin acoplar).
export async function handleAuth(request, env, url, cors, nivelReal) {
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const method = request.method;

  // Sin la clave de firma, el sistema NO opera (sesiones no falsificables).
  if (!env.AUTH_SECRET) return jsonR({ error: "server_misconfigured" }, 500, cors);

  // Solicitar acceso
  if (path === "/api/auth/request" && method === "POST") {
    const { email } = await request.json().catch(() => ({}));
    if (!isEmail(email)) return jsonR({ error: "invalid_email" }, 400, cors);
    const clean = email.trim().toLowerCase();
    const contact = await ghlContactByEmail(env, clean);
    if (contact) {
      const jti = crypto.randomUUID();
      const exp = Date.now() + MAGIC_TTL_MS;
      // Registra el enlace para que sea de un solo uso (se borra al verificarse).
      if (env.DB) await env.DB.prepare("INSERT INTO magic_links (jti, exp) VALUES (?, ?)").bind(jti, exp).run();
      const token = await sign({ t: "magic", jti, email: clean, cid: contact.id, name: contact.name, exp }, env.AUTH_SECRET);
      const link = `${url.origin}/api/auth/verify?token=${encodeURIComponent(token)}`;
      await sendMagicLink(env, clean, link);
    }
    // Respuesta neutra: no revela si el correo está registrado.
    return jsonR({ ok: true, message: "Si tu correo está registrado, recibirás un enlace de acceso." }, 200, cors);
  }

  // Verificar el enlace y crear la sesión
  if (path === "/api/auth/verify" && method === "GET") {
    const appUrl = env.APP_URL || "/";
    const payload = await verify(url.searchParams.get("token"), env.AUTH_SECRET);
    if (!payload || payload.t !== "magic" || !payload.cid || !payload.jti) {
      return Response.redirect(`${appUrl}?auth=expired`, 302);
    }
    // Un solo uso REAL: consume el jti (lo borra). Si ya no existe, el enlace
    // ya se usó → se rechaza, aunque no haya pasado el tiempo de expiración.
    let consumed = false;
    if (env.DB) {
      const del = await env.DB.prepare("DELETE FROM magic_links WHERE jti=?").bind(payload.jti).run();
      consumed = !!(del && del.meta && del.meta.changes === 1);
    }
    if (!consumed) return Response.redirect(`${appUrl}?auth=used`, 302);
    const sess = await sign(
      { t: "sess", email: payload.email, cid: payload.cid, name: payload.name || "", exp: Date.now() + SESSION_TTL_S * 1000 },
      env.AUTH_SECRET
    );
    return new Response(null, {
      status: 302,
      headers: { Location: `${appUrl}?auth=ok`, "Set-Cookie": sessionCookie(sess, env, SESSION_TTL_S) },
    });
  }

  // Datos de la sesión + nivel real desde GHL
  if (path === "/api/auth/me" && method === "GET") {
    const s = await getSession(request, env);
    if (!s) return jsonR({ authenticated: false }, 200, cors);
    const lvl = nivelReal ? await nivelReal(env, s.cid) : { p: 0, ia: 0, pmf: 0 };
    const firstName = (s.name || "").split(" ")[0] || "";
    return jsonR(
      { authenticated: true, email: s.email, name: s.name, firstName, p: lvl.p, ia: lvl.ia, pmf: lvl.pmf },
      200, cors
    );
  }

  // Cerrar sesión
  if (path === "/api/auth/logout" && method === "POST") {
    return jsonR({ ok: true }, 200, cors, { "Set-Cookie": sessionCookie("", env, 0) });
  }

  return jsonR({ error: "not_found" }, 404, cors);
}
