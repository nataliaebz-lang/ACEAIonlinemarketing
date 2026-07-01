import * as React from "react";
import { useResource, useFileUrl } from "@/context/resources";
import { useLanguage } from "@/context/language";

// Muestra el contenido gestionado desde /admin de una sección:
//   · el CUERPO (texto largo editable, en el idioma actual), y/o
//   · el ARCHIVO subido (PDF/app/video en iframe, música en reproductor).
// Si la sección no tiene contenido gestionado (o está bloqueada), no renderiza
// nada y la página conserva su diseño/placeholder actual.
//
// Uso:  React.createElement(SectionUpload, { route: "/proposito/curso-7-dias" })
export function SectionUpload({ route }) {
  const res = useResource(route);
  const fileUrl = useFileUrl();
  const { lang } = useLanguage();
  const l = (es, en, pt) => (lang === "pt" ? pt || es : lang === "en" ? en : es);

  if (!res || res.locked) return null;

  const body = (res.body || "").trim();
  const langs = (res.fileLangs || []);
  const hasFile = langs.length > 0;
  if (!body && !hasFile) return null; // nada gestionado todavía

  const children = [];

  // Cuerpo editable (respeta saltos de línea).
  if (body) {
    children.push(
      React.createElement(
        "div",
        {
          key: "body",
          className: "whitespace-pre-line text-foreground/80 leading-relaxed mb-6 max-w-2xl",
        },
        body
      )
    );
  }

  // Archivo subido.
  if (hasFile) {
    const isAudio = res.type === "audio";
    const useLang = langs.includes(lang) ? lang : langs.includes("") ? "" : langs[0];
    const url = fileUrl(res.id, useLang);
    children.push(
      React.createElement(
        "h2",
        { key: "h", className: "font-serif text-xl font-light mb-4 text-foreground/80" },
        isAudio ? l("Escuchar", "Listen", "Ouvir") : l("Contenido", "Content", "Conteúdo")
      )
    );
    children.push(
      isAudio
        ? React.createElement("audio", { key: "a", src: url, controls: true, className: "w-full" })
        : React.createElement("iframe", {
            key: "f",
            src: url,
            title: l("Contenido", "Content", "Conteúdo"),
            className: "w-full rounded-2xl border border-card-border bg-white",
            style: { height: "72vh" },
            allow: "fullscreen",
          })
    );
    children.push(
      React.createElement(
        "a",
        {
          key: "o",
          href: url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-block mt-3 text-sm text-primary font-medium",
        },
        l("Abrir en pestaña nueva →", "Open in new tab →", "Abrir em nova aba →")
      )
    );
  }

  return React.createElement("div", { className: "mb-10" }, children);
}
