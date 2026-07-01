import * as React from "react";
const _jsxFileName = "";import { Brain, Calendar } from "lucide-react";
import { useLanguage } from "@/context/language";
import { SectionUpload } from "@/components/section-upload";

export default function Curso40DiasIA() {
  const { lang } = useLanguage();
  const l = (es, en) => lang === "es" ? es : en;

  return (
    React.createElement('div', { className: "px-6 py-10 md:px-10 md:py-14 flex flex-col items-center justify-center min-h-[60vh] text-center"         , 'data-testid': "curso-40-dias-ia", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9}}
      , React.createElement('div', { className: "w-full" }, React.createElement(SectionUpload, { route: "/ia/curso-40-dias" }))
      , React.createElement('div', { className: "w-16 h-16 rounded-full bg-red-50 border border-primary/30 flex items-center justify-center mb-6 shadow-sm"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10}}
        , React.createElement(Brain, { className: "w-7 h-7 text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11}} )
      )

      , React.createElement('p', { className: "text-xs uppercase tracking-[0.25em] text-primary mb-3"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 14}}
        , l("IA · Programa", "AI · Programme")
      )

      , React.createElement('h1', { className: "font-serif text-4xl md:text-5xl font-light mb-6"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 18}}
        , React.createElement('span', { className: "text-primary font-semibold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 19}}, l("Programa de 41 días", "41-Day Programme")), React.createElement('br', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 19}} )
        , l("Lanza tu Negocio con IA + Propósito", "Launch Your Business with AI + Purpose")
      )

      , React.createElement('div', { className: "flex items-center gap-3 px-6 py-4 rounded-2xl border border-primary/30 bg-red-50/60"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 23}}
        , React.createElement(Calendar, { className: "w-5 h-5 text-primary shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 24}} )
        , React.createElement('p', { className: "text-base font-light text-foreground/70"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 25}}
          , l("Próximamente · Inicio Agosto 2026", "Coming Soon · Starting August 2026")
        )
      )
    )
  );
}
