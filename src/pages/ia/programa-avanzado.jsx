import * as React from "react";
const _jsxFileName = "";import { Crown, Calendar } from "lucide-react";
import { useLanguage } from "@/context/language";

export default function ProgramaAvanzado() {
  const { lang } = useLanguage();
  const l = (es, en) => lang === "es" ? es : en;

  return (
    React.createElement('div', { className: "px-6 py-10 md:px-10 md:py-14 flex flex-col items-center justify-center min-h-[60vh] text-center"         , 'data-testid': "programa-avanzado", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9}}
      , React.createElement('div', { className: "w-16 h-16 rounded-full bg-amber-50 border border-gold/40 flex items-center justify-center mb-6 shadow-sm"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10}}
        , React.createElement(Crown, { className: "w-7 h-7 text-gold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11}} )
      )

      , React.createElement('p', { className: "text-xs uppercase tracking-[0.25em] text-gold mb-3"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 14}}
        , l("Exclusivo · Fundadoras", "Exclusive · Founders")
      )

      , React.createElement('h1', { className: "font-serif text-4xl md:text-5xl font-light mb-6"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 18}}
        , React.createElement('span', { className: "gradient-text-gold font-semibold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 19}}, l("Programa Transformacional", "Transformational Programme")), React.createElement('br', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 19}} )
        , l("6 Meses · Método SOS-IA+P", "6 Months · SOS-IA+P Method")
      )

      , React.createElement('div', { className: "flex items-center gap-3 px-6 py-4 rounded-2xl border border-gold/30 bg-amber-50/60"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 23}}
        , React.createElement(Calendar, { className: "w-5 h-5 text-gold shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 24}} )
        , React.createElement('p', { className: "text-base font-light text-foreground/70"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 25}}
          , l("Próximamente · Inicio Septiembre 2026", "Coming Soon · Starting September 2026")
        )
      )
    )
  );
}
