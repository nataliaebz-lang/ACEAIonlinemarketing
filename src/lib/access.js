// ─────────────────────────────────────────────────────────────────────────────
// Control de acceso del dashboard (capa visual / candados del menú).
//
// La fundadora SIEMPRE ve toda la estructura del dashboard. Lo que su nivel /
// sus compras no desbloquean aparece con CANDADO y no se puede abrir.
//
// MODELO (según la tabla de Natalia): cada contenido tiene un Nº de nivel (ID).
// Cada nivel de cliente (P1/P2/P3, IA1/IA2/IA3, PMF) accede a una LISTA de IDs.
// El nivel real llega de GHL en el objeto `member` del login (nivel_p, nivel_ia,
// acceso_pmf). La seguridad de verdad la aplica el Worker en cada acción de pago.
//
// 👉 ESTE ES EL MAPA QUE CONTROLARÁ EL PANEL INTERNO DE PERMISOS.
// ─────────────────────────────────────────────────────────────────────────────

// Nº de nivel (ID de contenido) de cada sección del menú.
//  10 = Programa Numina (/proposito/programa-6-meses)
//  11 = Agentes Dayllu (aún no está en el menú)
//  17 = Programa SOS-IAP (/ia/programa-avanzado)
export const CONTENT_ID = {
  "/": 1,                              // Comunidad (base)
  "/atlas": 2,                         // Mapamundi
  "/apps": 3,                          // Apps
  "/studio": 4,                        // ACEAI Studio
  "/proposito": 5,                     // El Camino (resumen Propósito)
  "/proposito/arquetipo": 6,           // App Dayllu
  "/proposito/ebook": 7,               // e-book Numina
  "/proposito/curso-7-dias": 8,        // Curso 7 días P
  "/proposito/curso-40-dias": 9,       // Curso 41 días P
  "/proposito/programa-6-meses": 10,   // Programa Numina
  "/proposito/dayllu": 12,             // Música
  "/ia": 13,                           // Centro IA (resumen IA)
  "/ia/libro": 14,                     // e-book SOS-IAP
  "/ia/curso-7-dias": 15,              // Curso 7 días IA
  "/ia/curso-40-dias": 16,             // Curso 41 días IA
  "/ia/programa-avanzado": 17,         // Programa SOS-IAP
  "/ia/prompts": 18,                   // Biblioteca Prompts
  "/ia/agentes": 19,                   // Agentes IA
  "/ia/directorio": 20,                // Directorio IA
};

// Contenidos a los que accede cada nivel de cliente (IDs).
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

// Todos los contenidos (PMF accede a todos, salvo los bloqueados de momento).
const ALL_IDS = Array.from({ length: 20 }, (_, i) => i + 1);

// Lee los niveles del miembro de forma tolerante (varios nombres de campo
// posibles, por si el backend de login los entrega distinto).
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

// Conjunto de IDs de contenido que el miembro puede abrir.
export function accessibleIds(member) {
  const { p, ia, pmf } = readLevels(member);
  const set = new Set();

  if (pmf >= 1) {
    ALL_IDS.forEach((id) => set.add(id)); // PMF: todo
  } else {
    if (p >= 1 && LEVEL_CONTENT["P" + p]) LEVEL_CONTENT["P" + p].forEach((id) => set.add(id));
    if (ia >= 1 && LEVEL_CONTENT["IA" + ia]) LEVEL_CONTENT["IA" + ia].forEach((id) => set.add(id));
  }

  set.add(1); // Comunidad (base): cualquier miembra logueada
  GLOBAL_BLOCKED.forEach((id) => set.delete(id)); // bloqueados de momento (para todas)
  return set;
}

// Normaliza una ruta (quita query/hash y la barra final).
function normalizePath(path) {
  if (!path) return "/";
  let p = String(path).split("?")[0].split("#")[0];
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

// ¿El miembro puede acceder a esta ruta? Las rutas sin contenido asignado
// (p. ej. /proposito/mantras) se consideran abiertas.
export function hasAccess(member, path) {
  const id = CONTENT_ID[normalizePath(path)];
  if (id == null) return true;
  return accessibleIds(member).has(id);
}

// Motivo del candado para mostrar la etiqueta correcta:
//   "soon"  → bloqueado para todas de momento (mostrar "Pronto")
//   "level" → bloqueado por nivel (solo candado)
//   null    → desbloqueado / sin regla
export function lockReason(member, path) {
  const id = CONTENT_ID[normalizePath(path)];
  if (id == null) return null;
  if (GLOBAL_BLOCKED.includes(id)) return "soon";
  return accessibleIds(member).has(id) ? null : "level";
}
