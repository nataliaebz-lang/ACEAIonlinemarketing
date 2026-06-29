// Autenticación por magic link.
//
// Flujo:
//   1. POST /api/auth/request  { email }
//      → verifica el correo contra GHL (identidad + nivel)
//      → firma un token de un solo uso (15 min) y lo envía por correo
//   2. GET  /api/auth/verify?token=...
//      → valida el token, crea la cookie de sesión (30 días) y redirige al panel
//   3. GET  /api/auth/me      → datos de la sesión actual
//   4. POST /api/auth/logout  → borra la cookie

import {
  json,
  signToken,
  verifyToken,
  buildCookie,
  clearCookie,
  readCookie,
  isValidEmail,
} from "./util.js";
import { lookupFounder } from "./ghl.js";
import { sendMagicLink } from "./email.js";

const SESSION_COOKIE = "aceai_session";
const MAGIC_TTL_MS = 15 * 60 * 1000; // 15 minutos
const SESSION_TTL_S = 30 * 24 * 60 * 60; // 30 días

// POST /api/auth/request
export async function handleAuthRequest(request, env) {
  const { email } = await request.json().catch(() => ({}));
  if (!isValidEmail(email)) {
    return json({ error: "invalid_email" }, request, env, 400);
  }
  const clean = email.trim().toLowerCase();

  const founder = await lookupFounder(clean, env);

  // Respuesta neutra: no revelamos si el correo está o no registrado.
  // Solo enviamos el enlace si la fundadora existe en GHL.
  if (founder.found) {
    const token = await signToken(
      { email: clean, level: founder.level, name: founder.name, exp: Date.now() + MAGIC_TTL_MS },
      env.AUTH_SECRET
    );
    const verifyUrl = `${new URL(request.url).origin}/api/auth/verify?token=${encodeURIComponent(token)}`;
    await sendMagicLink(clean, verifyUrl, env);
  }

  return json({ ok: true, message: "Si tu correo está registrado, recibirás un enlace de acceso." }, request, env);
}

// GET /api/auth/verify?token=...
export async function handleAuthVerify(request, env) {
  const token = new URL(request.url).searchParams.get("token");
  const payload = await verifyToken(token, env.AUTH_SECRET);

  const appUrl = env.APP_URL || "/";
  if (!payload || !payload.email) {
    return Response.redirect(`${appUrl}?auth=expired`, 302);
  }

  // Sesión de larga duración (sin exp del magic link).
  const session = await signToken(
    { email: payload.email, level: payload.level ?? 1, name: payload.name || "", exp: Date.now() + SESSION_TTL_S * 1000 },
    env.AUTH_SECRET
  );

  return new Response(null, {
    status: 302,
    headers: {
      Location: `${appUrl}?auth=ok`,
      "Set-Cookie": buildCookie(SESSION_COOKIE, session, env, SESSION_TTL_S),
    },
  });
}

// GET /api/auth/me
export async function handleAuthMe(request, env) {
  const session = await getSession(request, env);
  if (!session) return json({ authenticated: false }, request, env, 401);
  return json(
    { authenticated: true, email: session.email, name: session.name, level: session.level },
    request,
    env
  );
}

// POST /api/auth/logout
export async function handleLogout(request, env) {
  return json({ ok: true }, request, env, 200, {
    "Set-Cookie": clearCookie(SESSION_COOKIE, env),
  });
}

// Lee y valida la sesión desde la cookie. Devuelve el payload o null.
export async function getSession(request, env) {
  const raw = readCookie(request, SESSION_COOKIE);
  if (!raw) return null;
  return verifyToken(raw, env.AUTH_SECRET);
}
