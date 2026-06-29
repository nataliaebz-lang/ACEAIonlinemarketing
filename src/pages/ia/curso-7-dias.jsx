import * as React from "react";
const _jsxFileName = "";import { Lock, Calendar, Bell } from "lucide-react";
import { useLanguage } from "@/context/language";

export default function Curso7DiasIA() {
  const { lang } = useLanguage();
  const l = (es, en) => lang === "es" ? es : en;

  const days = [1, 2, 3, 4, 5, 6, 7];

  return (
    React.createElement('div', { className: "px-6 py-10 md:px-10 md:py-14"   , 'data-testid': "curso-7-dias-ia", __self: this, __source: {fileName: _jsxFileName, lineNumber: 11}}
      /* Header */
      , React.createElement('div', { className: "mb-10", __self: this, __source: {fileName: _jsxFileName, lineNumber: 13}}
        , React.createElement('p', { className: "text-xs uppercase tracking-[0.25em] text-primary mb-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 14}}
          , l("IA para Emprendedoras", "AI for Entrepreneurs")
        )
        , React.createElement('h1', { className: "font-serif text-4xl font-light mb-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 17}}, "IA para Emprendedoras"  )
        , React.createElement('p', { className: "text-muted-foreground max-w-lg" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 18}}
          , l("Siete días para transformar la manera en que usas la inteligencia artificial en tu negocio.", "Seven days to transform the way you use artificial intelligence in your business.")
        )
      )

      /* Coming soon banner */
      , React.createElement('div', { className: "rounded-2xl border border-primary/30 bg-gradient-to-br from-red-50 to-rose-50 p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-5"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 24}}
        , React.createElement('div', { className: "w-14 h-14 rounded-full bg-white/80 border border-primary/30 flex items-center justify-center shrink-0 shadow-sm"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 25}}
          , React.createElement(Calendar, { className: "w-6 h-6 text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 26}} )
        )
        , React.createElement('div', { className: "flex-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 28}}
          , React.createElement('div', { className: "flex items-center gap-2 mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 29}}
            , React.createElement('span', { className: "text-xs uppercase tracking-[0.2em] text-primary font-semibold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 30}}, l("Próximamente", "Coming Soon"))
            , React.createElement('span', { className: "text-xs rounded-full bg-primary/10 text-primary px-2.5 py-0.5 border border-primary/20 font-medium"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 31}}, "15 Jul 2026"  )
          )
          , React.createElement('p', { className: "font-serif text-xl font-light text-foreground mb-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}, l("El programa empieza el 15 de julio de 2026", "Programme starts 15 July 2026"))
          , React.createElement('p', { className: "text-sm text-muted-foreground" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 34}}, l("Reserva tu plaza ahora. Te confirmaremos todos los detalles por email.", "Reserve your place now. We'll confirm all details by email."))
        )
        , React.createElement('div', { className: "flex items-center gap-2 text-xs text-muted-foreground shrink-0"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}
          , React.createElement(Bell, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 37}} )
          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 38}}, l("Notificación activada", "Notification active"))
        )
      )

      /* Days 1–7 */
      , React.createElement('h2', { className: "font-serif text-xl font-light mb-5 text-foreground/70"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}, l("El reto · Días 1 al 7", "The Challenge · Days 1 to 7"))
      , React.createElement('div', { className: "space-y-2 max-w-2xl" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}
        , days.map((day) => (
          React.createElement('div', {
            key: day,
            className: "w-full text-left rounded-xl border border-border bg-white/50 p-4 opacity-60"       ,
            'data-testid': `day-card-${day}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}}

            , React.createElement('div', { className: "flex items-center gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}
              , React.createElement(Lock, { className: "w-4 h-4 text-muted-foreground/40 shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 52}} )
              , React.createElement('span', { className: "text-sm text-muted-foreground" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}, l("Día", "Day"), " " , day)
            )
          )
        ))
      )
    )
  );
}
