# Gestor de contenidos + API (unificado en el Worker)

El mismo Worker `aceai-studio` ahora también **alimenta al dashboard** y aloja el
**gestor de contenidos**. Todo junto: frontend + backend + manejador.

## Rutas nuevas

| Ruta | Qué hace |
|---|---|
| `GET /api/resources?p=&ia=&pmf=&lang=` | Devuelve las 20 secciones con su contenido; las que el nivel no desbloquea llegan `locked:true` y sin enlace. **Esto alimenta al dashboard.** |
| `GET /admin` | Gestor de contenidos (Natalia edita enlaces y textos por sección). |
| `POST /api/admin/login` · `/logout` | Entrada/salida del gestor (contraseña). |
| `GET/PUT /api/admin/resources[/:id]` | Listar / editar el contenido de cada sección. |

Los niveles por sección viven en `worker/access.js` (misma tabla que el frontend
`src/lib/access.js`). El contenido (enlaces, textos) vive en D1, editable desde
`/admin`.

## Puesta en marcha

```bash
cd worker
# 1) Crear la base D1 y pegar el database_id en wrangler.toml
npx wrangler d1 create aceai
# 2) Crear la tabla y sembrar las 20 secciones
npx wrangler d1 execute aceai --file=./schema.sql
npx wrangler d1 execute aceai --file=./seed.sql
# 3) Secretos del gestor
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put AUTH_SECRET
# 4) Desplegar
npx wrangler deploy
```

Luego entra a `https://<tu-worker>/admin`, pon la contraseña y rellena el enlace
y los textos de cada sección. El dashboard los lee desde `/api/resources`.

> Pendiente (Etapa 2): conectar las páginas del dashboard para que lean su
> contenido desde `/api/resources` en vez de tenerlo escrito en el código.
