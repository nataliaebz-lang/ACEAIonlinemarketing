import * as React from "react";
const _jsxFileName = "";import { Star, Calendar, Bell } from "lucide-react";
import { useLanguage } from "@/context/language";

export default function Programa6Meses() {
  const { lang } = useLanguage();
  const l = (es, en) => lang === "es" ? es : en;

  return (
    React.createElement('div', { className: "px-6 py-10 md:px-10 md:py-14"   , 'data-testid': "programa-6-meses", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9}}
      /* Header */
      , React.createElement('div', { className: "mb-10", __self: this, __source: {fileName: _jsxFileName, lineNumber: 11}}
        , React.createElement('div', { className: "flex items-center gap-2 mb-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12}}
          , React.createElement(Star, { className: "w-4 h-4 text-gold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 13}} )
          , React.createElement('span', { className: "text-xs uppercase tracking-[0.25em] text-gold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 14}}, l("Exclusivo · Fundadoras", "Exclusive · Founders"))
        )
        , React.createElement('h1', { className: "font-serif text-4xl md:text-5xl font-light mb-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 16}}
          , React.createElement('span', { className: "gradient-text-gold font-semibold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 17}}, l("Programa Transformacional", "Transformational Programme"))
        )
        , React.createElement('p', { className: "text-gold font-serif italic mb-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 19}}, l("6 Meses · Método: Numina", "6 Months · Method: Numina"))
        , React.createElement('p', { className: "text-muted-foreground max-w-xl leading-relaxed"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 20}}
          , l(
            "El acompañamiento más profundo de ACEAI. Seis meses de trabajo conjunto para transformar no solo tu negocio, sino la mujer que lo dirige.",
            "ACEAI's deepest mentoring. Six months of joint work to transform not only your business, but the woman who leads it."
          )
        )
      )

      /* Coming soon banner */
      , React.createElement('div', { className: "rounded-2xl border border-gold/40 bg-gradient-to-br from-yellow-50 to-amber-50 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 29}}
        , React.createElement('div', { className: "w-14 h-14 rounded-full bg-white/80 border border-gold/40 flex items-center justify-center shrink-0 shadow-sm"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 30}}
          , React.createElement(Calendar, { className: "w-6 h-6 text-gold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 31}} )
        )
        , React.createElement('div', { className: "flex-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}
          , React.createElement('div', { className: "flex items-center gap-2 mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 34}}
            , React.createElement('span', { className: "text-xs uppercase tracking-[0.2em] text-gold font-semibold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}, l("Próximamente", "Coming Soon"))
            , React.createElement('span', { className: "text-xs rounded-full bg-amber-100 text-amber-700 px-2.5 py-0.5 border border-amber-200 font-medium"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}, "2026")
          )
          , React.createElement('p', { className: "font-serif text-xl font-light text-foreground mb-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}}
            , l("El programa comienza en 2026", "Programme starts in 2026")
          )
          , React.createElement('p', { className: "text-sm text-muted-foreground" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}
            , l(
              "Los materiales y el acceso completo se publicarán aquí cuando estén listos. Todas las fundadoras inscritas recibirán una notificación.",
              "Materials and full access will be published here when ready. All enrolled founders will be notified."
            )
          )
        )
        , React.createElement('div', { className: "flex items-center gap-2 text-xs text-muted-foreground shrink-0"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 48}}
          , React.createElement(Bell, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}} )
          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}, l("Notificación activada", "Notification active"))
        )
      )
    )
  );
}
