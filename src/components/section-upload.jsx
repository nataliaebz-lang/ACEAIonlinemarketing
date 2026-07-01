import * as React from "react";
import { useResource, useFileUrl } from "@/context/resources";
import { useLanguage } from "@/context/language";

// Visor reutilizable del contenido subido desde /admin para una sección.
// Si la sección tiene un archivo subido (y está desbloqueada), lo muestra
// embebido (PDF, video, app HTML, imagen…) con un botón para abrirlo aparte.
// Si aún no hay archivo, no renderiza nada: la página conserva su diseño actual.
//
// Uso:  React.createElement(SectionUpload, { route: "/proposito/curso-7-dias" })
export function SectionUpload({ route }) {
  const res = useResource(route);
  const fileUrl = useFileUrl();
  const { lang } = useLanguage();
  const l = (es, en, pt) => (lang === "pt" ? pt || es : lang === "en" ? en : es);

  const langs = (res && res.fileLangs) || [];
  if (!res || res.locked || !langs.length) return null;

  // Idioma a servir: el actual si tiene archivo; si no, el genérico o el primero.
  const useLang = langs.includes(lang) ? lang : langs.includes("") ? "" : langs[0];
  const url = fileUrl(res.id, useLang);
  const isAudio = res.type === "audio";

  return React.createElement(
    "div",
    { className: "mb-10" },
    React.createElement(
      "h2",
      { className: "font-serif text-xl font-light mb-4 text-foreground/80" },
      isAudio ? l("Escuchar", "Listen", "Ouvir") : l("Contenido", "Content", "Conteúdo")
    ),
    isAudio
      ? React.createElement("audio", {
          src: url,
          controls: true,
          className: "w-full",
        })
      : React.createElement("iframe", {
          src: url,
          title: l("Contenido", "Content", "Conteúdo"),
          className: "w-full rounded-2xl border border-card-border bg-white",
          style: { height: "72vh" },
          allow: "fullscreen",
        }),
    React.createElement(
      "a",
      {
        href: url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-block mt-3 text-sm text-primary font-medium",
      },
      l("Abrir en pestaña nueva →", "Open in new tab →", "Abrir em nova aba →")
    )
  );
}
