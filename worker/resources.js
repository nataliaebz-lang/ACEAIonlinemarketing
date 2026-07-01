// GET /api/resources — el contenido que alimenta al dashboard.
// Devuelve TODAS las secciones; las que el nivel no desbloquea llegan con
// locked:true y SIN enlace (para el candado). El nivel llega por la URL
// (?p=&ia=&pmf=), igual que en el frontend; la seguridad real de las acciones
// de pago la sigue aplicando el Worker (guardNivel) contra GHL.

import { accessibleIds, isBlocked } from "./access.js";

const LANGS = ["es", "en", "pt"];

function jsonR(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...cors },
  });
}

export async function handleResources(request, env, cors) {
  if (!env.DB) return jsonR({ error: "db_not_configured", resources: [] }, 200, cors);

  const url = new URL(request.url);
  const lang = LANGS.includes(url.searchParams.get("lang")) ? url.searchParams.get("lang") : "es";
  const levels = {
    p: url.searchParams.get("p"),
    ia: url.searchParams.get("ia"),
    pmf: url.searchParams.get("pmf"),
  };
  const allowed = accessibleIds(levels);

  const { results } = await env.DB.prepare(
    "SELECT * FROM resources WHERE active = 1 ORDER BY sort_order, id"
  ).all();

  const items = (results || []).map((r) => {
    const blocked = isBlocked(r.id);          // bloqueado para todas de momento
    const locked = blocked || !allowed.has(r.id);
    return {
      id: r.id,
      route: r.route,
      area: r.area,
      type: r.type,
      locked,
      reason: locked ? (blocked ? "soon" : "level") : null,
      link: locked ? null : r.link,           // el enlace solo si está desbloqueado
      image_url: r.image_url,
      title: r[`title_${lang}`] || r.title_es,
      description: r[`desc_${lang}`] || r.desc_es,
      i18n: {
        es: { title: r.title_es, description: r.desc_es },
        en: { title: r.title_en, description: r.desc_en },
        pt: { title: r.title_pt, description: r.desc_pt },
      },
    };
  });

  return jsonR(
    { lang, count: items.length, unlocked: items.filter((i) => !i.locked).length, resources: items },
    200,
    cors
  );
}
