-- Migración para bases D1 que se crearon ANTES de estos campos.
-- Solo si ya tenías la tabla `resources` creada. En un despliegue nuevo NO hace
-- falta (schema.sql ya incluye todo). Ejecuta:
--   npx wrangler d1 execute aceai --file=./migrate.sql
-- (Si alguna columna ya existe, SQLite dará error en esa línea; ignóralo.)

ALTER TABLE resources ADD COLUMN body_es TEXT NOT NULL DEFAULT '';
ALTER TABLE resources ADD COLUMN body_en TEXT NOT NULL DEFAULT '';
ALTER TABLE resources ADD COLUMN body_pt TEXT NOT NULL DEFAULT '';

CREATE TABLE IF NOT EXISTS magic_links (
  jti        TEXT PRIMARY KEY,
  exp        INTEGER,
  created_at TEXT DEFAULT (datetime('now'))
);
