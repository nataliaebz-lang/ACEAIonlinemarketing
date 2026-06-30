// ─────────────────────────────────────────────────────────────────────────────
// Control de acceso del dashboard (capa visual / candados del menú).
//
// La fundadora SIEMPRE ve toda la estructura del dashboard. Lo que su nivel /
// sus compras no desbloquean aparece con CANDADO y no se puede abrir.
//
// El nivel real viene de GHL (campos nivel_p, nivel_ia, acceso_pmf) y llega en
// el objeto `member` del login. La seguridad de verdad la aplica el Worker en
// cada acción de pago ("la interfaz oculta, el Worker decide"); esto es la capa
// visual que pidió Natalia.
//
// 👉 PARA AJUSTAR QUÉ NIVEL DESBLOQUEA CADA SECCIÓN, edita el mapa ACCESS de
//    abajo. (Es la tabla que más adelante controlará el panel interno de
//    permisos.) area: 'p' | 'ia' | 'pmf' | 'open'  ·  level: número mínimo.
// ─────────────────────────────────────────────────────────────────────────────

export const ACCESS = {
  // Comunidad
  "/atlas": { area: "pmf", level: 1 }, // Mapamundi RF — exclusivo PMF

  // Apps
  "/apps": { area: "open", level: 0 }, // abierto a todas las miembras
  "/studio": { area: "ia", level: 3 }, // ACEAI Studio = nivel IA 3

  // Propósito (nivel_p)
  "/proposito": { area: "p", level: 1 },
  "/proposito/arquetipo": { area: "p", level: 1 },
  "/proposito/ebook": { area: "p", level: 1 },
  "/proposito/curso-7-dias": { area: "p", level: 1 },
  "/proposito/curso-40-dias": { area: "p", level: 2 },
  "/proposito/programa-6-meses": { area: "p", level: 3 },
  "/proposito/dayllu": { area: "p", level: 2 },
  "/proposito/mantras": { area: "p", level: 2 },

  // Inteligencia Artificial (nivel_ia)
  "/ia": { area: "ia", level: 1 },
  "/ia/libro": { area: "ia", level: 1 },
  "/ia/curso-7-dias": { area: "ia", level: 1 },
  "/ia/curso-40-dias": { area: "ia", level: 2 },
  "/ia/programa-avanzado": { area: "ia", level: 3 },
  "/ia/prompts": { area: "ia", level: 2 },
  "/ia/agentes": { area: "ia", level: 3 },
  "/ia/directorio": { area: "ia", level: 2 },
};

// Lee los niveles del miembro de forma tolerante (acepta varios nombres de campo
// por si el backend de login los entrega como p/ia/pmf o nivel_p/nivel_ia/…).
export function readLevels(member) {
  const n = (v) => {
    const x = parseInt(v, 10);
    return Number.isNaN(x) ? 0 : x;
  };
  if (!member) return { p: 0, ia: 0, pmf: 0 };
  return {
    p: n(member.p ?? member.nivel_p ?? member.levelP),
    ia: n(member.ia ?? member.nivel_ia ?? member.levelIA),
    pmf: n(member.pmf ?? member.acceso_pmf ?? member.PMF),
  };
}

// Misma regla que el Worker: PMF abre todo; si no, acumulativo por área.
export function permitido(member, area, level) {
  if (area === "open") return true;
  const u = readLevels(member);
  if (u.pmf >= 1) return true; // PMF desbloquea todo
  if (area === "pmf") return u.pmf >= (level || 1);
  const have = area === "p" ? u.p : area === "ia" ? u.ia : u.pmf;
  return have >= level;
}

// Normaliza una ruta (quita query/hash y la barra final).
function normalizePath(path) {
  if (!path) return "/";
  let p = String(path).split("?")[0].split("#")[0];
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

// ¿El miembro puede acceder a esta ruta? Las rutas sin regla (p. ej. "/") se
// consideran abiertas.
export function hasAccess(member, path) {
  const rule = ACCESS[normalizePath(path)];
  if (!rule) return true;
  return permitido(member, rule.area, rule.level);
}

// Etiqueta corta del nivel requerido, para mostrar junto al candado (p. ej. "P2").
export function lockBadge(path) {
  const rule = ACCESS[normalizePath(path)];
  if (!rule) return "";
  if (rule.area === "pmf") return "PMF";
  if (rule.area === "open") return "";
  return (rule.area === "p" ? "P" : "IA") + rule.level;
}
