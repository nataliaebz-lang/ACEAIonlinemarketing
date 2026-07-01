import * as React from "react";
const _jsxFileName = "";import { Calendar, Bell } from "lucide-react";
import { useLanguage } from "@/context/language";
import { SectionUpload } from "@/components/section-upload";

export default function Curso40Dias() {
  const { lang } = useLanguage();
  const l = (es, en) => lang === "es" ? es : en;

  return (
    React.createElement('div', { className: "px-6 py-10 md:px-10 md:py-14"   , 'data-testid': "curso-40-dias", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9}}
      , React.createElement(SectionUpload, { route: "/proposito/curso-40-dias" })
      /* Header */
      , React.createElement('div', { className: "mb-10", __self: this, __source: {fileName: _jsxFileName, lineNumber: 11}}
        , React.createElement('p', { className: "text-xs uppercase tracking-[0.25em] text-secondary mb-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12}}
          , l("Propósito · 41 Días", "Purpose · 41 Days")
        )
        , React.createElement('h1', { className: "font-serif text-4xl font-light mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 15}}, l("El Cambio", "The Change"))
        , React.createElement('p', { className: "text-secondary font-serif italic mb-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 16}}, l("41 Días", "41 Days"))
        , React.createElement('p', { className: "text-muted-foreground max-w-lg" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 17}}
          , l(
            "Un viaje de cuarenta y un jornadas para reprogramar creencias, conectar con tu propósito y anclar tu identidad más luminosa.",
            "A forty-one-day journey to reprogram beliefs, connect with your purpose and anchor your most luminous identity."
          )
        )
      )

      /* Coming soon banner */
      , React.createElement('div', { className: "rounded-2xl border border-secondary/30 bg-gradient-to-br from-amber-50 to-rose-50 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 26}}
        , React.createElement('div', { className: "w-14 h-14 rounded-full bg-white/80 border border-secondary/30 flex items-center justify-center shrink-0 shadow-sm"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 27}}
          , React.createElement(Calendar, { className: "w-6 h-6 text-secondary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 28}} )
        )
        , React.createElement('div', { className: "flex-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 30}}
          , React.createElement('div', { className: "flex items-center gap-2 mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 31}}
            , React.createElement('span', { className: "text-xs uppercase tracking-[0.2em] text-secondary font-semibold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}}, l("Próximamente", "Coming Soon"))
            , React.createElement('span', { className: "text-xs rounded-full bg-secondary/10 text-secondary px-2.5 py-0.5 border border-secondary/20 font-medium"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}, "2026")
          )
          , React.createElement('p', { className: "font-serif text-xl font-light text-foreground mb-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}, l("El curso comienza en 2026", "Course starts in 2026"))
          , React.createElement('p', { className: "text-sm text-muted-foreground" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}, l("La fecha exacta se confirmará pronto. Te notificaremos por email en cuanto esté lista.", "The exact date will be confirmed soon. We'll notify you by email as soon as it's set."))
        )
        , React.createElement('div', { className: "flex items-center gap-2 text-xs text-muted-foreground shrink-0"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}}
          , React.createElement(Bell, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 39}} )
          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}, l("Notificación activada", "Notification active"))
        )
      )
    )
  );
}
