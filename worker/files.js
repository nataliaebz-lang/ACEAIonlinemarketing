// GET /api/file/:id?lang=es&p=&ia=&pmf=
// Sirve un archivo subido (PDF del libro, app, material de curso) desde R2,
// respetando el nivel: si la sección está bloqueada para ese nivel → 403.

import { accessibleIds, isBlocked } from "./access.js";

export async function handleFile(request, env, url, cors) {
  const m = url.pathname.match(/^\/api\/file\/(\d+)$/);
  if (!m) return new Response("not found", { status: 404, headers: cors });
  const id = parseInt(m[1], 10);
  const lang = url.searchParams.get("lang") || "";

  // Gating por nivel (mismo modelo que /api/resources).
  const levels = {
    p: url.searchParams.get("p"),
    ia: url.searchParams.get("ia"),
    pmf: url.searchParams.get("pmf"),
  };
  if (isBlocked(id) || !accessibleIds(levels).has(id)) {
    return new Response("forbidden", { status: 403, headers: cors });
  }

  if (!env.DB || !env.FILES) return new Response("storage_not_configured", { status: 501, headers: cors });

  // Busca el archivo del idioma pedido; si no hay, cae al genérico o a cualquiera.
  const row =
    (await env.DB.prepare("SELECT * FROM files WHERE resource_id=? AND lang=?").bind(id, lang).first()) ||
    (await env.DB.prepare("SELECT * FROM files WHERE resource_id=? AND lang=''").bind(id).first()) ||
    (await env.DB.prepare("SELECT * FROM files WHERE resource_id=? ORDER BY lang LIMIT 1").bind(id).first());

  if (!row) return new Response("no_file", { status: 404, headers: cors });

  const obj = await env.FILES.get(row.r2_key);
  if (!obj) return new Response("no_file", { status: 404, headers: cors });

  const headers = new Headers(cors);
  headers.set("Content-Type", row.content_type || "application/octet-stream");
  headers.set("Cache-Control", "private, max-age=300");
  if (row.filename) {
    headers.set("Content-Disposition", `inline; filename="${row.filename.replace(/"/g, "")}"`);
  }
  return new Response(obj.body, { status: 200, headers });
}
