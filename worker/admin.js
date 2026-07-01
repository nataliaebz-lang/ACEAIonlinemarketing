// Gestor /admin: Natalia edita el enlace y los textos de cada sección sin tocar
// código. Login por contraseña (ADMIN_PASSWORD) con cookie firmada (AUTH_SECRET).

import { adminPageHtml } from "./admin-html.js";

const COOKIE = "aceai_admin";
const TTL_S = 12 * 60 * 60;
const enc = new TextEncoder();

function jsonR(obj, status, cors, extra = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...cors, ...extra },
  });
}
function b64url(bytes) {
  let s = "";
  const a = new Uint8Array(bytes);
  for (let i = 0; i < a.length; i++) s += String.fromCharCode(a[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlToBytes(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  const bin = atob(str);
  const b = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) b[i] = bin.charCodeAt(i);
  return b;
}
async function key(secret) {
  if (!secret) throw new Error("AUTH_SECRET no configurado");
  return crypto.subtle.importKey("raw", enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
async function sign(payload, secret) {
  const body = b64url(enc.encode(JSON.stringify(payload)));
  const sig = await crypto.subtle.sign("HMAC", await key(secret), enc.encode(body));
  return `${body}.${b64url(sig)}`;
}
async function verify(token, secret) {
  if (!token || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  try {
    const ok = await crypto.subtle.verify("HMAC", await key(secret), b64urlToBytes(sig), enc.encode(body));
    if (!ok) return null;
    const p = JSON.parse(new TextDecoder().decode(b64urlToBytes(body)));
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
async function isAdmin(request, env) {
  if (!env.AUTH_SECRET) return false;
  const raw = readCookie(request, COOKIE);
  const p = raw && (await verify(raw, env.AUTH_SECRET));
  return !!(p && p.admin === true);
}

const FIELDS = ["route", "area", "type", "link", "image_url",
  "title_es", "title_en", "title_pt", "desc_es", "desc_en", "desc_pt",
  "body_es", "body_en", "body_pt", "active", "sort_order"];

export async function handleAdmin(request, env, url, cors) {
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const method = request.method;

  // Interfaz del gestor
  if (path === "/admin") {
    return new Response(adminPageHtml(env), { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } });
  }

  // Login / logout
  if (path === "/api/admin/login" && method === "POST") {
    if (!env.AUTH_SECRET) return jsonR({ error: "server_misconfigured" }, 500, cors);
    const { password } = await request.json().catch(() => ({}));
    if (!env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) {
      return jsonR({ error: "invalid_password" }, 401, cors);
    }
    const token = await sign({ admin: true, exp: Date.now() + TTL_S * 1000 }, env.AUTH_SECRET);
    const cookie = `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=${TTL_S}`;
    return jsonR({ ok: true }, 200, cors, { "Set-Cookie": cookie });
  }
  if (path === "/api/admin/logout" && method === "POST") {
    return jsonR({ ok: true }, 200, cors, { "Set-Cookie": `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0` });
  }

  // A partir de aquí, requiere admin
  if (!(await isAdmin(request, env))) return jsonR({ error: "unauthorized" }, 401, cors);
  if (!env.DB) return jsonR({ error: "db_not_configured" }, 500, cors);

  // Listar todas las secciones
  if (path === "/api/admin/resources" && method === "GET") {
    const { results } = await env.DB.prepare("SELECT * FROM resources ORDER BY sort_order, id").all();
    return jsonR({ resources: results || [] }, 200, cors);
  }

  // Editar una sección:  PUT /api/admin/resources/:id
  const m = path.match(/^\/api\/admin\/resources\/(\d+)$/);
  if (m && method === "PUT") {
    const id = parseInt(m[1], 10);
    const body = await request.json().catch(() => ({}));
    const cols = [], vals = [];
    for (const f of FIELDS) {
      if (f in body) {
        cols.push(`${f}=?`);
        vals.push(f === "active" ? (body[f] ? 1 : 0) : (f === "sort_order" ? parseInt(body[f], 10) || 0 : String(body[f] ?? "")));
      }
    }
    if (!cols.length) return jsonR({ error: "nothing_to_update" }, 400, cors);
    cols.push("updated_at=datetime('now')");
    vals.push(id);
    await env.DB.prepare(`UPDATE resources SET ${cols.join(", ")} WHERE id=?`).bind(...vals).run();
    return jsonR({ ok: true, id }, 200, cors);
  }

  // Subir un archivo:  POST /api/admin/upload/:id?lang=es   (cuerpo = el archivo)
  const up = path.match(/^\/api\/admin\/upload\/(\d+)$/);
  if (up && method === "POST") {
    if (!env.FILES) return jsonR({ error: "r2_not_configured" }, 500, cors);
    const id = parseInt(up[1], 10);
    const lang = url.searchParams.get("lang") || "";
    const ct = request.headers.get("Content-Type") || "application/octet-stream";
    const filename = decodeURIComponent(request.headers.get("X-Filename") || "archivo");
    const r2key = `r/${id}/${lang || "default"}`;
    const put = await env.FILES.put(r2key, request.body, { httpMetadata: { contentType: ct } });
    const size = put && put.size ? put.size : null;
    await env.DB.prepare(
      `INSERT INTO files (resource_id, lang, r2_key, filename, content_type, size, uploaded_at)
       VALUES (?,?,?,?,?,?,datetime('now'))
       ON CONFLICT(resource_id, lang) DO UPDATE SET
         r2_key=excluded.r2_key, filename=excluded.filename,
         content_type=excluded.content_type, size=excluded.size, uploaded_at=datetime('now')`
    ).bind(id, lang, r2key, filename, ct, size).run();
    return jsonR({ ok: true, id, lang, filename, size }, 200, cors);
  }

  // Borrar un archivo:  DELETE /api/admin/file/:id?lang=es
  const del = path.match(/^\/api\/admin\/file\/(\d+)$/);
  if (del && method === "DELETE") {
    const id = parseInt(del[1], 10);
    const lang = url.searchParams.get("lang") || "";
    const row = await env.DB.prepare("SELECT r2_key FROM files WHERE resource_id=? AND lang=?").bind(id, lang).first();
    if (row && env.FILES) await env.FILES.delete(row.r2_key);
    await env.DB.prepare("DELETE FROM files WHERE resource_id=? AND lang=?").bind(id, lang).run();
    return jsonR({ ok: true }, 200, cors);
  }

  // Estado de archivos subidos (para el gestor)
  if (path === "/api/admin/files" && method === "GET") {
    const { results } = await env.DB.prepare(
      "SELECT resource_id, lang, filename, size, uploaded_at FROM files"
    ).all();
    return jsonR({ files: results || [] }, 200, cors);
  }

  return jsonR({ error: "not_found" }, 404, cors);
}
