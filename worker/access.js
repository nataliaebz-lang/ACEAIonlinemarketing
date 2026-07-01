// Lógica de acceso por nivel (misma tabla que el frontend src/lib/access.js).
// Fuente de verdad del gating para /api/resources y el gestor /admin.

// Contenidos a los que accede cada nivel de cliente (IDs 1..20).
export const LEVEL_CONTENT = {
  P1: [1, 6, 7],
  P2: [1, 6, 7, 8, 12, 18, 20],
  P3: [1, 6, 7, 9, 12, 18, 20],
  IA1: [1, 6, 12, 14],
  IA2: [1, 6, 12, 15, 18, 20],
  IA3: [1, 6, 12, 16, 18, 20],
};

// Bloqueados para TODAS de momento (incluida PMF). Salen con candado "Pronto".
export const GLOBAL_BLOCKED = [3, 4, 11, 19];

const ALL_IDS = Array.from({ length: 20 }, (_, i) => i + 1);

export function readLevels(src = {}) {
  const n = (v) => {
    const x = parseInt(v, 10);
    return Number.isNaN(x) ? 0 : x;
  };
  return {
    p: n(src.p ?? src.nivel_p),
    ia: n(src.ia ?? src.nivel_ia),
    pmf: n(src.pmf ?? src.acceso_pmf),
  };
}

// Conjunto de IDs de contenido que el miembro puede abrir.
export function accessibleIds(levels) {
  const { p, ia, pmf } = readLevels(levels);
  const set = new Set();
  if (pmf >= 1) {
    ALL_IDS.forEach((id) => set.add(id));
  } else {
    if (p >= 1 && LEVEL_CONTENT["P" + p]) LEVEL_CONTENT["P" + p].forEach((id) => set.add(id));
    if (ia >= 1 && LEVEL_CONTENT["IA" + ia]) LEVEL_CONTENT["IA" + ia].forEach((id) => set.add(id));
  }
  set.add(1); // Comunidad (base)
  if (p >= 1) set.add(5); // El Camino (resumen Propósito)
  if (ia >= 1) set.add(13); // Centro IA (resumen IA)
  GLOBAL_BLOCKED.forEach((id) => set.delete(id));
  return set;
}

export function isBlocked(id) {
  return GLOBAL_BLOCKED.includes(Number(id));
}
