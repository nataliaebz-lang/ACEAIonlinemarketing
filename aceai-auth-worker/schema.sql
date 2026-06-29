-- ACEAI · Esquema de la base de datos del gestor de contenidos (Cloudflare D1)
-- Cada fila es un recurso (curso, libro, audio o app) que se desbloquea por nivel.
-- Los textos viven en tres idiomas: español (es), inglés (en) y portugués (pt).

CREATE TABLE IF NOT EXISTS resources (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  type        TEXT    NOT NULL,                 -- course | book | audio | app
  area        TEXT    NOT NULL,                 -- P (Propósito) | IA (Inteligencia Artificial) | abierto
  level       INTEGER NOT NULL DEFAULT 0,       -- nivel mínimo de fundadora que desbloquea el recurso (0 = abierto a todas)
  link        TEXT    NOT NULL,                 -- URL del recurso (curso, PDF, audio, app, etc.)
  image_url   TEXT,                             -- imagen de portada opcional

  -- Textos en tres idiomas
  title_es    TEXT    NOT NULL DEFAULT '',
  title_en    TEXT    NOT NULL DEFAULT '',
  title_pt    TEXT    NOT NULL DEFAULT '',
  desc_es     TEXT    NOT NULL DEFAULT '',
  desc_en     TEXT    NOT NULL DEFAULT '',
  desc_pt     TEXT    NOT NULL DEFAULT '',

  sort_order  INTEGER NOT NULL DEFAULT 0,       -- orden de aparición dentro de cada área
  active      INTEGER NOT NULL DEFAULT 1,       -- 1 = visible, 0 = oculto (borrador)
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_resources_level  ON resources(level);
CREATE INDEX IF NOT EXISTS idx_resources_area   ON resources(area);
CREATE INDEX IF NOT EXISTS idx_resources_active ON resources(active);
CREATE INDEX IF NOT EXISTS idx_resources_sort   ON resources(area, sort_order);
