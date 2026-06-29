# ACEAI Studio Worker

Worker único de Cloudflare: backend del Studio (IA con Claude + créditos) **y
verificación de niveles de acceso** contra GHL.

> Regla del portal: **la interfaz oculta, el Worker decide.** El nivel viaja por
> la URL hacia el portal (spoofeable), pero el Worker lee el nivel **real** del
> contacto en GHL antes de ejecutar o cobrar cualquier acción.

## Modelo de niveles

Tres campos en el contacto de GHL:

| Campo | Valores | Significado |
|---|---|---|
| `nivel_p`    | 0–4   | Nivel en el área Propósito (P1, P2, P3…) |
| `nivel_ia`   | 0–4   | Nivel en el área IA (IA1, IA2, IA3…) |
| `acceso_pmf` | 0 o 1 | Círculo Fundador: abre **todo** P + IA |

Acceso **acumulativo**: un nivel incluye los de abajo (IA3 ve también IA1 e IA2).
`acceso_pmf = 1` abre todo el portal.

**Todo el Studio es el desbloqueo IA3** (`STUDIO_REQ = { area: 'ia', level: 3 }`).
Cualquier acción de pago exige `nivel_ia ≥ 3` **o** `acceso_pmf = 1`; si no →
`403 sin_acceso`.

## Cómo verifica (funciones nuevas)

- `nivelReal(env, clientId)` — `GET /contacts/:id` en GHL con `GHL_PIT`; devuelve
  `{ p, ia, pmf }`. **Fail-closed**: sin id, sin token, o si GHL falla → todo 0.
  Cachea 60 s por contacto.
- `permitido(user, area, nivel)` — PMF abre todo; si no, `user[area] >= nivel`.
- `guardNivel(...)` — devuelve `403 sin_acceso` si no pasa. Sin `GHL_PIT`
  configurado **no bloquea** (compatibilidad con el despliegue actual).

El `clientId` es el `contact.id` de GHL (`?cid={{contact.id}}` en el portal).

## Rutas

| Ruta | Qué hace |
|---|---|
| `POST /` o `POST /pipeline` | Acciones del Studio (gated por nivel IA3/PMF) |
| `GET /balance?client=ID` | Saldo de créditos (no gated) |
| `GET /nivel?client=ID` | **QA**: nivel real resuelto `{p, ia, pmf}` |
| `POST /ghl-webhook` | Recarga créditos al comprar un pack |

## Configuración

```bash
wrangler secret put ANTHROPIC_API_KEY      # obligatorio
wrangler secret put ALLOWED_ORIGIN         # https://app.tudominio.com
# Niveles:
wrangler secret put GHL_PIT                # token de integración privada de GHL
wrangler secret put GHL_FIELD_P            # id del campo nivel_p
wrangler secret put GHL_FIELD_IA           # id del campo nivel_ia
wrangler secret put GHL_FIELD_PMF          # id del campo acceso_pmf
wrangler deploy
```

> Los `GHL_FIELD_*` son los **ids internos** de los campos personalizados en GHL.
> Si tu API devuelve los campos con `key`/`fieldKey` (p.ej. `contact.nivel_p`),
> el Worker también los resuelve por nombre, así que esos ids son opcionales.

## Prueba final

```bash
curl "https://TU-WORKER/nivel?client=CONTACT_ID"     # ver nivel resuelto
# Acción de pago con nivel insuficiente → 403 {"error":"sin_acceso",...}
```
