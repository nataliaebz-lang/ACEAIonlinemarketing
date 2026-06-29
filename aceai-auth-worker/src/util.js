// Utilidades compartidas: respuestas JSON, CORS, cookies, base64url y firma HMAC.

const enc = new TextEncoder();
const dec = new TextDecoder();

// ── CORS ────────────────────────────────────────────────────────────────
// Devuelve los headers CORS apropiados según el Origin de la petición.
export function corsHeaders(request, env) {
  const origin = request.headers.get("Origin") || "";
  const allowed = (env.ALLOWED_ORIGIN || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const allow = allowed.includes(origin) ? origin : allowed[0] || "";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

export function json(data, request, env, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(request, env),
      ...extraHeaders,
    },
  });
}

export function html(body, status = 200, extraHeaders = {}) {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", ...extraHeaders },
  });
}

export function preflight(request, env) {
  return new Response(null, { status: 204, headers: corsHeaders(request, env) });
}

// ── base64url ─────────────────────────────────────────────────────────────
export function b64urlEncode(bytes) {
  let str = "";
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  for (let i = 0; i < arr.length; i++) str += String.fromCharCode(arr[i]);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function b64urlDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  const bin = atob(str);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

export function encodeJSON(obj) {
  return b64urlEncode(enc.encode(JSON.stringify(obj)));
}

export function decodeJSON(str) {
  return JSON.parse(dec.decode(b64urlDecode(str)));
}

// ── Firma HMAC-SHA256 (para magic links y sesiones) ─────────────────────────
async function importKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

// Crea un token firmado: payload (objeto) → "payloadB64.firmaB64".
export async function signToken(payload, secret) {
  const key = await importKey(secret);
  const body = encodeJSON(payload);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(body));
  return `${body}.${b64urlEncode(sig)}`;
}

// Verifica un token firmado y devuelve el payload, o null si es inválido/expirado.
export async function verifyToken(token, secret) {
  if (!token || typeof token !== "string" || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  try {
    const key = await importKey(secret);
    const ok = await crypto.subtle.verify(
      "HMAC",
      key,
      b64urlDecode(sig),
      enc.encode(body)
    );
    if (!ok) return null;
    const payload = decodeJSON(body);
    if (payload.exp && Date.now() > payload.exp) return null; // expirado
    return payload;
  } catch {
    return null;
  }
}

// ── Cookies ─────────────────────────────────────────────────────────────
export function buildCookie(name, value, env, maxAgeSeconds) {
  const sameSite = env.COOKIE_SAMESITE || "None";
  const parts = [
    `${name}=${value}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    `SameSite=${sameSite}`,
    `Max-Age=${maxAgeSeconds}`,
  ];
  return parts.join("; ");
}

export function clearCookie(name, env) {
  const sameSite = env.COOKIE_SAMESITE || "None";
  return `${name}=; Path=/; HttpOnly; Secure; SameSite=${sameSite}; Max-Age=0`;
}

export function readCookie(request, name) {
  const header = request.headers.get("Cookie") || "";
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return null;
}

export function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
