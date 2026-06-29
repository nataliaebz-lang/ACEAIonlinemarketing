# ACEAI · Panel autónomo de fundadoras

Backend en **Cloudflare Workers + D1** que da a cada fundadora acceso a los
recursos (cursos, libros, audios y apps) que su **nivel** desbloquea, con un
**gestor de contenidos** en `/admin` para subir y editar recursos sin tocar
código.

---

## 1. Por qué NO usamos iframe / SSO

GoHighLevel (GHL) **no le pasa el dato del contacto logueado** a una página
externa embebida en un iframe. Por eso cualquier ruta de iframe o SSO está
cerrada. La identidad se resuelve con un **magic link por correo**: la
fundadora pide acceso con su email, GHL confirma quién es y su nivel, y le
enviamos un enlace de un solo uso que crea su sesión.

## 2. Arquitectura

| Pieza | Tecnología | Rol |
|------|-----------|-----|
| Frontend | Cloudflare **Pages** | El sitio y la página del panel (`/panel`) |
| Backend | Cloudflare **Workers** (este repo) | Auth, gating y API |
| Base de datos | Cloudflare **D1** | Tabla `resources` (gestor de contenidos) |
| Identidad y niveles | **GoHighLevel** | Fuente de verdad de quién es cada fundadora y su nivel |

**Flujo:** `email → verificación en GHL → magic link → cookie de sesión →
/api/resources filtra por nivel`.

## 3. Las tres piezas nuevas (lo que pedía el brief)

1. **`GET /api/resources`** — entrega a cada fundadora solo los recursos que su
   nivel desbloquea (`src/resources.js`).
2. **Base D1 con la tabla `resources`** — cada recurso guarda su enlace, su área
   (`P` / `IA` / `abierto`), su nivel y sus textos en **tres idiomas**
   (es / en / pt) → `schema.sql`.
3. **Panel `/admin`** — gestor de contenidos para subir y editar recursos sin
   tocar código (`src/admin.js` + `src/html.js`).

## 4. Estructura

```
aceai-auth-worker/
├── wrangler.toml        Configuración del Worker + binding de D1
├── package.json         Scripts de despliegue y base de datos
├── schema.sql           Tabla `resources`
├── seed.sql             Datos de ejemplo (opcional)
└── src/
    ├── index.js         Router principal
    ├── auth.js          Magic link + sesiones
    ├── ghl.js           Cliente de GoHighLevel (identidad + nivel)
    ├── email.js         Envío del magic link (Resend)
    ├── resources.js     /api/resources (gating) + CRUD en D1
    ├── admin.js         Login de admin + API del panel
    ├── html.js          Interfaz visual de /admin
    └── util.js          JSON, CORS, cookies, firma HMAC
```

## 5. Puesta en marcha (paso a paso)

```bash
cd aceai-auth-worker
npm install

# 1) Crear la base de datos D1 y pegar el database_id en wrangler.toml
npm run db:create
# → copia el "database_id" que imprime y reemplázalo en wrangler.toml

# 2) Crear la tabla
npm run db:init           # producción
npm run db:init:local     # local (para `wrangler dev`)

# 3) (opcional) Datos de ejemplo
npm run db:seed

# 4) Configurar los secretos
npx wrangler secret put AUTH_SECRET        # cadena larga aleatoria
npx wrangler secret put ADMIN_PASSWORD     # contraseña del panel /admin
npx wrangler secret put GHL_API_TOKEN      # Private Integration token de GHL
npx wrangler secret put GHL_LOCATION_ID    # ID de la subcuenta en GHL
npx wrangler secret put RESEND_API_KEY     # API key de Resend (correos)

# 5) Probar en local y desplegar
npm run dev
npm run deploy
```

> **Variables públicas** (no secretas) se editan en `wrangler.toml`:
> `ALLOWED_ORIGIN`, `APP_URL`, `EMAIL_FROM`, `COOKIE_SAMESITE`,
> `GHL_LEVEL_FIELD`, `DEFAULT_LEVEL`.

### Cookies entre dominios

Si el Worker vive en un dominio distinto al frontend (p. ej. `*.workers.dev`
vs `*.pages.dev`), deja `COOKIE_SAMESITE = "None"`. Para evitar fricción, lo
ideal es ponerlo en un subdominio propio (`api.aceaionlinemarketing.com`) y
usar `"Lax"`.

## 6. Cómo se conecta el frontend (Cloudflare Pages)

Pedir acceso:
```js
await fetch("https://api.aceaionlinemarketing.com/api/auth/request", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email }),
});
// La fundadora recibe el correo y al hacer clic vuelve a APP_URL con la sesión lista.
```

Cargar los recursos en `/panel`:
```js
const res = await fetch("https://api.aceaionlinemarketing.com/api/resources?lang=es", {
  credentials: "include",
});
const { resources } = await res.json(); // solo los que su nivel desbloquea
```

## 7. Modelo de gating

- Cada fundadora tiene un **nivel** (número) que viene de GHL (custom field
  `membership_level` o un tag tipo `nivel-2`).
- Cada recurso tiene un **nivel mínimo**. La fundadora ve el recurso si
  `recurso.nivel <= nivel de la fundadora`.
- `nivel 0` = recurso **abierto** a todas.
- El **área** (`P`, `IA`, `abierto`) sirve para agrupar visualmente.

---

## ✅ Checklist de tareas

- [x] **1.** Configuración del Worker (`wrangler.toml`) con binding de D1.
- [x] **2.** Esquema D1 de la tabla `resources` con textos en es/en/pt (`schema.sql`).
- [x] **3.** Auth por magic link: request / verify / me / logout (`auth.js`).
- [x] **4.** Cliente de GHL: identidad + nivel por custom field o tags (`ghl.js`).
- [x] **5.** Envío de correo del magic link vía Resend, con modo dev (`email.js`).
- [x] **6.** Endpoint `GET /api/resources` con gating por nivel (`resources.js`).
- [x] **7.** Panel `/admin`: login + CRUD de recursos (`admin.js` + `html.js`).
- [x] **8.** Router, CORS y manejo de errores (`index.js`, `util.js`).
- [x] **9.** Datos de ejemplo y documentación (`seed.sql`, este README).
- [ ] **10.** *(operación)* Crear D1 real, configurar secretos y desplegar.
- [ ] **11.** *(operación)* Conectar el frontend de Pages a los endpoints.

## 🎯 Definición de "listo"

El panel autónomo está terminado cuando:

1. Una fundadora registrada en GHL escribe su correo y **recibe el magic link**.
2. Al hacer clic, **entra a `/panel`** y ve **solo** los recursos que su nivel
   desbloquea, en su idioma (es / en / pt).
3. Una fundadora de **nivel inferior no ve** los recursos de nivel superior.
4. Natalia entra a **`/admin`** con su contraseña y puede **crear, editar y
   borrar** recursos, y esos cambios se reflejan al instante en lo que ven las
   fundadoras — **sin tocar código**.

---

### Nota técnica

Se eligió **Cloudflare D1** para el gestor de contenidos (en vez de un CMS
externo) porque es nativo del stack, no agrega otra herramienta ni otro costo,
y permite filtrar por nivel de forma sencilla. Si se prefiere otro CMS, el
cambio está acotado a `src/resources.js` (lectura) y `src/admin.js` (escritura).
