# ACEAI Dashboard

Portal de miembros de **ACEAI Online Marketing** — "IA con propósito".
Aplicación React (Vite + Tailwind CSS v4 + shadcn/ui) que sirve el dashboard
de las Miembras Fundadoras (PMF): propósito, cursos, herramientas de IA,
Atlas/Mapamundi, Studio y más.

## Stack

- **Vite 6** + **React 18**
- **Tailwind CSS v4** (configuración inline en `src/index.css` vía `@theme`)
- **shadcn/ui** (componentes Radix en `src/components/ui`)
- **wouter** para el routing
- **@tanstack/react-query**, **lucide-react**, **recharts**, **sonner**, etc.

## Estructura

```
index.html            Punto de entrada de Vite
public/               Assets estáticos (logo, hero-bg)
src/
  main.jsx            Bootstrap de React
  App.jsx             Rutas + providers (auth, idioma, query, tooltip)
  index.css           Tema cósmico + animaciones + Tailwind v4
  context/            Auth e idioma (ES / EN / PT)
  components/         Layout, star-field, audio-player, media-upload, ui/*
  hooks/              use-mobile, use-toast
  lib/                utils (cn)
  pages/              home, login, atlas, apps, studio,
                      proposito/*, ia/*
legacy/               Exports HTML compilados previos (referencia)
```

## Desarrollo

```bash
npm install
npm run dev       # servidor de desarrollo en http://localhost:5173
npm run build     # build de producción en dist/
npm run preview   # sirve el build de producción
```

## Backend / API

El frontend espera una API en `<BASE_URL>/api` para la autenticación
(`/api/auth/login`, `/api/auth/me`, `/api/auth/logout`) y para servir media.
Sin backend la app muestra la pantalla de login; al conectar la API se accede
al dashboard completo. El token se guarda en `localStorage` (`aceai_token`).

## Idiomas

Tres idiomas conmutables desde la barra superior: Español, Inglés y Portugués
(persistidos en `localStorage` como `aceai-lang`).
