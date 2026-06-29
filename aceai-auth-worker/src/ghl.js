// Cliente de GoHighLevel (GHL). GHL es la fuente de verdad de la identidad
// y del nivel de cada fundadora. Aquí buscamos el contacto por correo y
// derivamos su nivel desde un custom field (configurable) o desde sus tags.

const GHL_BASE = "https://services.leadconnectorhq.com";

// Busca un contacto en GHL por su correo electrónico.
// Devuelve { found, name, level } o { found: false }.
export async function lookupFounder(email, env) {
  const token = env.GHL_API_TOKEN;
  const locationId = env.GHL_LOCATION_ID;

  // Sin credenciales de GHL no podemos verificar identidad.
  if (!token || !locationId) {
    return { found: false, error: "ghl_not_configured" };
  }

  const url = new URL(`${GHL_BASE}/contacts/`);
  url.searchParams.set("locationId", locationId);
  url.searchParams.set("query", email.trim().toLowerCase());

  let res;
  try {
    res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        Version: env.GHL_API_VERSION || "2021-07-28",
        Accept: "application/json",
      },
    });
  } catch {
    return { found: false, error: "ghl_unreachable" };
  }

  if (!res.ok) return { found: false, error: `ghl_${res.status}` };

  const data = await res.json().catch(() => ({}));
  const contacts = data.contacts || [];

  // GHL devuelve coincidencias parciales; exigimos correo exacto.
  const target = email.trim().toLowerCase();
  const contact = contacts.find(
    (c) => (c.email || "").trim().toLowerCase() === target
  );
  if (!contact) return { found: false };

  const name =
    contact.contactName ||
    [contact.firstName, contact.lastName].filter(Boolean).join(" ") ||
    contact.firstName ||
    "";

  return { found: true, name, level: deriveLevel(contact, env), contactId: contact.id };
}

// Determina el nivel de la fundadora a partir del contacto de GHL.
// 1º intenta el custom field configurado (GHL_LEVEL_FIELD).
// 2º intenta tags del estilo "nivel-2" / "level-2".
// Si existe pero no tiene nivel, usa DEFAULT_LEVEL.
function deriveLevel(contact, env) {
  const fieldKey = env.GHL_LEVEL_FIELD || "membership_level";
  const fallback = parseInt(env.DEFAULT_LEVEL || "1", 10) || 1;

  // Custom fields: GHL los entrega como array [{ id/key, value }] o como objeto.
  const cf = contact.customFields || contact.customField || [];
  if (Array.isArray(cf)) {
    for (const f of cf) {
      const key = (f.key || f.name || f.id || "").toString().toLowerCase();
      if (key.includes(fieldKey.toLowerCase())) {
        const n = parseInt(String(f.value ?? f.fieldValue ?? "").replace(/\D/g, ""), 10);
        if (!Number.isNaN(n)) return n;
      }
    }
  } else if (cf && typeof cf === "object") {
    const raw = cf[fieldKey];
    if (raw != null) {
      const n = parseInt(String(raw).replace(/\D/g, ""), 10);
      if (!Number.isNaN(n)) return n;
    }
  }

  // Tags: "nivel-3", "level3", "tier-2", etc.
  const tags = contact.tags || [];
  for (const tag of tags) {
    const m = String(tag).toLowerCase().match(/(?:nivel|level|tier)[-_ ]?(\d+)/);
    if (m) return parseInt(m[1], 10);
  }

  return fallback;
}
