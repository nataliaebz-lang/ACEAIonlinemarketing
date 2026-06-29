// Punto de entrada del Worker. Enruta todas las peticiones.
//
//   Auth (fundadoras):
//     POST /api/auth/request   { email }
//     GET  /api/auth/verify?token=...
//     GET  /api/auth/me
//     POST /api/auth/logout
//
//   Recursos (con gating por nivel):
//     GET  /api/resources[?lang=es|en|pt]
//
//   Admin (gestor de contenidos):
//     GET  /admin                      -> interfaz
//     POST /api/admin/login            { password }
//     POST /api/admin/logout
//     GET/POST/PUT/DELETE /api/admin/resources[/:id]

import { json, preflight } from "./util.js";
import {
  handleAuthRequest,
  handleAuthVerify,
  handleAuthMe,
  handleLogout,
} from "./auth.js";
import { handleResources } from "./resources.js";
import {
  handleAdminLogin,
  handleAdminLogout,
  handleAdminPage,
  handleAdminApi,
} from "./admin.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method;

    // Preflight CORS
    if (method === "OPTIONS") return preflight(request, env);

    try {
      // ── Salud ───────────────────────────────────────────────
      if (pathname === "/" || pathname === "/health") {
        return json({ ok: true, service: "aceai-auth-worker" }, request, env);
      }

      // ── Auth ────────────────────────────────────────────────
      if (pathname === "/api/auth/request" && method === "POST")
        return handleAuthRequest(request, env);
      if (pathname === "/api/auth/verify" && method === "GET")
        return handleAuthVerify(request, env);
      if (pathname === "/api/auth/me" && method === "GET")
        return handleAuthMe(request, env);
      if (pathname === "/api/auth/logout" && method === "POST")
        return handleLogout(request, env);

      // ── Recursos (fundadoras) ───────────────────────────────
      if (pathname === "/api/resources" && method === "GET")
        return handleResources(request, env);

      // ── Admin ───────────────────────────────────────────────
      if (pathname === "/admin") return handleAdminPage(env);
      if (pathname === "/api/admin/login" && method === "POST")
        return handleAdminLogin(request, env);
      if (pathname === "/api/admin/logout" && method === "POST")
        return handleAdminLogout(request, env);
      if (pathname.startsWith("/api/admin/resources"))
        return handleAdminApi(request, env, url);

      return json({ error: "not_found" }, request, env, 404);
    } catch (err) {
      console.error("Worker error:", err && err.stack ? err.stack : err);
      return json({ error: "internal_error" }, request, env, 500);
    }
  },
};
