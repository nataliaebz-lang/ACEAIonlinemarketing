-- Contenidos del dashboard (lo que alimenta al frontend).
-- Cada fila = una sección del dashboard (ID 1..20, coincide con la tabla de niveles).
-- Natalia edita el enlace y los textos desde el gestor /admin, sin tocar código.

CREATE TABLE IF NOT EXISTS resources (
  id          INTEGER PRIMARY KEY,          -- nº de contenido 1..20
  route       TEXT NOT NULL DEFAULT '',      -- ruta en el dashboard (p. ej. /proposito/ebook)
  area        TEXT NOT NULL DEFAULT '',      -- comunidad | apps | P | IA
  type        TEXT NOT NULL DEFAULT 'course',-- course|book|audio|app|map|studio|directory
  link        TEXT NOT NULL DEFAULT '',      -- URL real del contenido (lo llena Natalia)
  image_url   TEXT,
  title_es    TEXT NOT NULL DEFAULT '',
  title_en    TEXT NOT NULL DEFAULT '',
  title_pt    TEXT NOT NULL DEFAULT '',
  desc_es     TEXT NOT NULL DEFAULT '',
  desc_en     TEXT NOT NULL DEFAULT '',
  desc_pt     TEXT NOT NULL DEFAULT '',
  active      INTEGER NOT NULL DEFAULT 1,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_resources_area ON resources(area);

-- Archivos subidos desde /admin (PDF del libro, la app, materiales de curso).
-- Se guardan en Cloudflare R2; aquí solo va la ficha (metadatos).
-- lang: '' = sin idioma · es/en/pt = un archivo por idioma (p. ej. el libro).
CREATE TABLE IF NOT EXISTS files (
  resource_id  INTEGER NOT NULL,
  lang         TEXT    NOT NULL DEFAULT '',
  r2_key       TEXT    NOT NULL,
  filename     TEXT,
  content_type TEXT,
  size         INTEGER,
  uploaded_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (resource_id, lang)
);
