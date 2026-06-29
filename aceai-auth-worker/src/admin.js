// Panel de administración /admin: login por contraseña y CRUD de recursos.
// El admin (Natalia) entra con la contraseña ADMIN_PASSWORD y obtiene una
// cookie de sesión de admin separada de la de las fundadoras.

import {
  json,
  html,
  signToken,
  verifyToken,
  buildCookie,
  clearCookie,
  readCookie,
} from "./util.js";
import {
  listAllResources,
  createResource,
  updateResource,
  deleteResource,
} from "./resources.js";
import { adminPageHtml } from "./html.js";

const ADMIN_COOKIE = "aceai_admin";
const ADMIN_TTL_S = 12 * 60 * 60; // 12 horas

async function isAdmin(request, env) {
  const raw = readCookie(request, ADMIN_COOKIE);
  if (!raw) return false;
  const payload = await verifyToken(raw, env.AUTH_SECRET);
  return !!(payload && payload.admin === true);
}

// POST /api/admin/login  { password }
export async function handleAdminLogin(request, env) {
  const { password } = await request.json().catch(() => ({}));
  if (!env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) {
    return json({ error: "invalid_password" }, request, env, 401);
  }
  const token = await signToken(
    { admin: true, exp: Date.now() + ADMIN_TTL_S * 1000 },
    env.AUTH_SECRET
  );
  return json({ ok: true }, request, env, 200, {
    "Set-Cookie": buildCookie(ADMIN_COOKIE, token, env, ADMIN_TTL_S),
  });
}

// POST /api/admin/logout
export async function handleAdminLogout(request, env) {
  return json({ ok: true }, request, env, 200, {
    "Set-Cookie": clearCookie(ADMIN_COOKIE, env),
  });
}

// GET /admin  → sirve la interfaz del panel (HTML)
export function handleAdminPage(env) {
  return html(adminPageHtml(env));
}

// Maneja todo lo que cuelga de /api/admin/resources
export async function handleAdminApi(request, env, url) {
  if (!(await isAdmin(request, env))) {
    return json({ error: "unauthorized" }, request, env, 401);
  }

  const method = request.method;
  const parts = url.pathname.split("/").filter(Boolean); // ["api","admin","resources","<id>?"]
  const id = parts[3] ? parseInt(parts[3], 10) : null;

  if (method === "GET") {
    return json({ resources: await listAllResources(env) }, request, env);
  }

  if (method === "POST") {
    const body = await request.json().catch(() => ({}));
    const result = await createResource(body, env);
    if (result.error) return json(result, request, env, 400);
    return json(result, request, env, 201);
  }

  if (method === "PUT") {
    if (!id) return json({ error: "id_required" }, request, env, 400);
    const body = await request.json().catch(() => ({}));
    const result = await updateResource(id, body, env);
    if (result.error) return json(result, request, env, 400);
    return json(result, request, env);
  }

  if (method === "DELETE") {
    if (!id) return json({ error: "id_required" }, request, env, 400);
    return json(await deleteResource(id, env), request, env);
  }

  return json({ error: "method_not_allowed" }, request, env, 405);
}
