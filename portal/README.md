# Portal de Fundadoras (Cloudflare Pages)

Portal estático que se incrusta en GHL por iframe y se adapta a cada fundadora
según su nivel en 3 áreas (P, IA, PMF). **El login, las contraseñas y los
niveles los maneja GHL**, no el portal. Aquí solo se muestra/oculta; la
seguridad real la hace el Worker (`../worker`).

> `index.html` es el `dashboard-fundadoras.html` del instructivo, ya sin el
> panel de prueba y listo para producción.

## Cómo decide el acceso

Lee de la URL `?cid=&p=&ia=&pmf=`:

- **Acumulativo**: un nivel incluye los de abajo (IA3 ve también IA1 e IA2).
- **PMF** (`pmf=1`) abre todo el portal (P + IA) y muestra el banner Fundadora.
- **Sin parámetros → todo a 0** (fail-closed: se ve con candado).

Las tarjetas bloqueadas se muestran con candado (`MODO_CANDADO = true`) para
vender la oferta. Cambia a `false` para ocultarlas en vez de mostrarlas.

## Antes de subir — 2 cosas que rellenas

En el bloque de configuración (arriba del `<script>`):

1. **`window.API_BASE`** → la URL de tu Worker.
2. **`LINKS`** → la URL real de cada tarjeta (curso, libro, app). Deja `""`
   las que aún no existan. La tarjeta de Studio (`ia_apps_pro`) recibe
   automáticamente `?cid=` con el id del contacto.

## Deploy en Cloudflare Pages

1. Sube **esta carpeta** (`portal/`) como proyecto de Pages.
2. Dominio: `app.tudominio.com`.
3. El archivo `_headers` ya trae la cabecera para permitir el iframe desde GHL:
   edita `TU-DOMINIO-GHL` por tu dominio real de GHL.
4. Revisa que el iframe no quede cortado en móvil.

## Incrustar en GHL

Crea en el contacto 3 campos personalizados: `nivel_p` (0–4), `nivel_ia` (0–4),
`acceso_pmf` (0/1). Automatiza su valor al comprar/subir/cancelar nivel. Luego
incrusta el portal por iframe pasando los niveles en la URL:

```
https://app.tudominio.com/?cid={{contact.id}}&p={{contact.nivel_p}}&ia={{contact.nivel_ia}}&pmf={{contact.acceso_pmf}}
```

El portal ya lee estos parámetros; no hay que tocar el JS.

## Probar en local

Como no hay panel de prueba, simula niveles por la URL:

```
index.html?cid=demo&p=2&ia=2&pmf=0   → ve hasta P2/IA2; P3/IA3 con candado
index.html?pmf=1                     → ve todo + banner Fundadora
index.html?p=0&ia=1&pmf=0            → solo IA1 (Libro SOS-IA+P, Apps IA, Agentes IA)
```
