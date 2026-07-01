# Gestor de contenidos + API (unificado en el Worker)

El mismo Worker `aceai-studio` ahora también **alimenta al dashboard** y aloja el
**gestor de contenidos**. Todo junto: frontend + backend + manejador.

## Acceso (magic-link) — panel independiente, sin iframe

El panel es **independiente** (no se incrusta en GHL por iframe). La fundadora
pide acceso con su correo y entra por un **enlace de un solo uso**:

| Ruta | Qué hace |
|---|---|
| `POST /api/auth/request { email }` | Busca el contacto en GHL; si existe, envía el enlace de acceso al correo. |
| `GET /api/auth/verify?token=` | Valida el enlace y crea la cookie de sesión (guarda el `cid` del contacto). |
| `GET /api/auth/me` | Datos de la sesión + **nivel real leído de GHL** (P/IA/PMF). |
| `POST /api/auth/logout` | Cierra la sesión. |

El nivel **nunca viaja por la URL**: `/api/resources` y `/api/file` leen el nivel
real del contacto en GHL (con `nivelReal`) a partir de la sesión.

## Rutas de contenido

| Ruta | Qué hace |
|---|---|
| `GET /api/resources?p=&ia=&pmf=&lang=` | Devuelve las 20 secciones con su contenido; las que el nivel no desbloquea llegan `locked:true` y sin enlace. **Esto alimenta al dashboard.** |
| `GET /admin` | Gestor de contenidos (Natalia edita enlaces y textos por sección). |
| `POST /api/admin/login` · `/logout` | Entrada/salida del gestor (contraseña). |
| `GET/PUT /api/admin/resources[/:id]` | Listar / editar el contenido de cada sección. |
| `POST /api/admin/upload/:id?lang=` | **Subir un archivo** (PDF del libro, app, material de curso). El cuerpo es el archivo; `lang` = es/en/pt o vacío. |
| `DELETE /api/admin/file/:id?lang=` | Borrar un archivo subido. |
| `GET /api/file/:id?lang=&p=&ia=&pmf=` | **Leer/servir** el archivo (con control de nivel). Lo usa el dashboard. |

Los archivos se guardan en **Cloudflare R2**; el dashboard los sirve por
`/api/file/:id` respetando el nivel. Para el libro, se sube uno por idioma
(ES/EN/PT); para la app o un curso, uno solo.

Los niveles por sección viven en `worker/access.js` (misma tabla que el frontend
`src/lib/access.js`). El contenido (enlaces, textos) vive en D1, editable desde
`/admin`.

## Puesta en marcha

```bash
cd worker
# 1) Crear la base D1 y pegar el database_id en wrangler.toml
npx wrangler d1 create aceai
# 2) Crear las tablas y sembrar las 20 secciones
npx wrangler d1 execute aceai --file=./schema.sql
npx wrangler d1 execute aceai --file=./seed.sql
# 3) Crear el bucket R2 para los archivos subidos
npx wrangler r2 bucket create aceai-files
# 4) Secretos del gestor y del acceso
npx wrangler secret put ADMIN_PASSWORD    # contraseña del gestor /admin
npx wrangler secret put AUTH_SECRET       # cadena larga aleatoria (sesiones + magic-link)
npx wrangler secret put GHL_PIT           # token de integración privada de GHL
npx wrangler secret put GHL_LOCATION_ID   # id de la subcuenta (Location) en GHL
npx wrangler secret put RESEND_API_KEY    # para enviar el correo del enlace
#   (y GHL_FIELD_P / GHL_FIELD_IA / GHL_FIELD_PMF con los ids de los campos de nivel)

# Seguridad:
#  · AUTH_SECRET es OBLIGATORIO: sin él, el acceso y el gestor no operan (no usa clave genérica).
#  · Los enlaces de acceso son de un SOLO USO (se registran en la tabla magic_links y se borran al usarse).
#  · El webhook de créditos (/ghl-webhook) queda DESHABILITADO salvo que configures
#    GHL_WEBHOOK_SECRET y la llamada traiga la cabecera  X-Webhook-Secret: <ese valor>.
#    npx wrangler secret put GHL_WEBHOOK_SECRET   # solo si vas a usar el webhook de créditos
# 5) En wrangler.toml, poner APP_URL = la URL del panel (para el redirect del enlace)
# 6) Desplegar
npx wrangler deploy
```

Luego entra a `https://<tu-worker>/admin`, pon la contraseña y rellena el enlace
y los textos de cada sección. El dashboard los lee desde `/api/resources`.

> Pendiente (Etapa 2): conectar las páginas del dashboard para que lean su
> contenido desde `/api/resources` en vez de tenerlo escrito en el código.
