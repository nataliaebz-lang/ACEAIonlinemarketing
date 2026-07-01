import * as React from "react";
const _jsxFileName = "";import { Lock, Calendar, Bell } from "lucide-react";
import { useLanguage } from "@/context/language";
import { SectionUpload } from "@/components/section-upload";

export default function Curso7Dias() {
  const { lang } = useLanguage();
  const l = (es, en) => lang === "es" ? es : en;

  const days = [1, 2, 3, 4, 5, 6, 7];

  return (
    React.createElement('div', { className: "px-6 py-10 md:px-10 md:py-14"   , 'data-testid': "curso-7-dias", __self: this, __source: {fileName: _jsxFileName, lineNumber: 11}}
      , React.createElement(SectionUpload, { route: "/proposito/curso-7-dias" })
      /* Header */
      , React.createElement('div', { className: "mb-10", __self: this, __source: {fileName: _jsxFileName, lineNumber: 13}}
        , React.createElement('p', { className: "text-xs uppercase tracking-[0.25em] text-secondary mb-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 14}}
          , l("Propósito · 7 Días", "Purpose · 7 Days")
        )
        , React.createElement('h1', { className: "font-serif text-4xl font-light mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 17}}, l("Descubre tu Misión", "Discover your Mission"))
        , React.createElement('p', { className: "text-secondary font-serif italic mb-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 18}}, l("7 Días", "7 Days"))
        , React.createElement('p', { className: "text-muted-foreground max-w-lg" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 19}}
          , l(
            "Siete jornadas intensas para activar tu claridad interior y definir el rumbo de tu vida y negocio.",
            "Seven intense sessions to activate your inner clarity and define the direction of your life and business."
          )
        )
      )

      /* Coming soon banner */
      , React.createElement('div', { className: "rounded-2xl border border-secondary/30 bg-gradient-to-br from-rose-50 to-violet-50 p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-5"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 28}}
        , React.createElement('div', { className: "w-14 h-14 rounded-full bg-white/80 border border-secondary/30 flex items-center justify-center shrink-0 shadow-sm"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 29}}
          , React.createElement(Calendar, { className: "w-6 h-6 text-secondary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 30}} )
        )
        , React.createElement('div', { className: "flex-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}}
          , React.createElement('div', { className: "flex items-center gap-2 mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}
            , React.createElement('span', { className: "text-xs uppercase tracking-[0.2em] text-secondary font-semibold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 34}}, l("Próximamente", "Coming Soon"))
            , React.createElement('span', { className: "text-xs rounded-full bg-secondary/10 text-secondary px-2.5 py-0.5 border border-secondary/20 font-medium"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}, "2026")
          )
          , React.createElement('p', { className: "font-serif text-xl font-light text-foreground mb-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 37}}, l("El curso comienza en 2026", "Course starts in 2026"))
          , React.createElement('p', { className: "text-sm text-muted-foreground" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}}, l("La fecha exacta se confirmará pronto. Te notificaremos por email en cuanto esté lista.", "The exact date will be confirmed soon. We'll notify you by email as soon as it's set."))
        )
        , React.createElement('div', { className: "flex items-center gap-2 text-xs text-muted-foreground shrink-0"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}
          , React.createElement(Bell, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}} )
          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}, l("Notificación activada", "Notification active"))
        )
      )

      /* Days 1–7 */
      , React.createElement('h2', { className: "font-serif text-xl font-light mb-5 text-foreground/70"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 47}}, l("El viaje · Días 1 al 7", "The Journey · Days 1 to 7"))
      , React.createElement('div', { className: "space-y-2 max-w-2xl" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 48}}
        , days.map((day) => (
          React.createElement('div', {
            key: day,
            className: "w-full text-left rounded-xl border border-border bg-white/50 p-4 opacity-60"       ,
            'data-testid': `day-card-${day}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}

            , React.createElement('div', { className: "flex items-center gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 55}}
              , React.createElement(Lock, { className: "w-4 h-4 text-muted-foreground/40 shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}} )
              , React.createElement('span', { className: "text-sm text-muted-foreground" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}}, l("Día", "Day"), " " , day)
            )
          )
        ))
      )
    )
  );
}
