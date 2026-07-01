import * as React from "react";
const _jsxFileName = ""; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }import { Bot, Clock } from "lucide-react";
import { useLanguage } from "@/context/language";

export default function AgentesIA() {
  const { lang } = useLanguage();
  const l = (es, en, pt) =>
    lang === "pt" ? (_nullishCoalesce(pt, () => ( es))) : lang === "en" ? en : es;

  return (
    React.createElement('div', { className: "px-6 py-10 md:px-10 md:py-14"   , 'data-testid': "agentes-ia", __self: this, __source: {fileName: _jsxFileName, lineNumber: 10}}
      , React.createElement('div', { className: "mb-8", __self: this, __source: {fileName: _jsxFileName, lineNumber: 11}}
        , React.createElement('div', { className: "flex items-center gap-2 mb-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12}}
          , React.createElement(Bot, { className: "w-4 h-4 text-accent"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 13}} )
          , React.createElement('span', { className: "text-xs uppercase tracking-[0.25em] text-accent"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 14}}, "IA · "
              , l("Agentes", "Agents", "Agentes")
          )
        )
        , React.createElement('h1', { className: "font-serif text-4xl font-light mb-3 text-foreground"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 18}}
          , l("Agentes IA Especializados", "Specialised AI Agents", "Agentes IA Especializados")
        )
      )

      , React.createElement('div', { className: "flex flex-col items-center justify-center py-24 text-center"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 23}}
        , React.createElement('div', { className: "relative w-24 h-24 mb-8"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 24}}
          , React.createElement('div', { className: "absolute inset-0 rounded-full bg-accent/10 animate-ping"    , style: { animationDuration: "2.5s" }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 25}} )
          , React.createElement('div', { className: "relative w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 26}}
            , React.createElement(Clock, { className: "w-10 h-10 text-accent/50"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 27}} )
          )
        )

        , React.createElement('div', { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/25 bg-accent/5 text-accent text-xs font-semibold uppercase tracking-widest mb-6"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 31}}
          , React.createElement('span', { className: "w-1.5 h-1.5 rounded-full bg-accent animate-pulse"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}} )
          , l("Próximamente", "Coming Soon", "Em Breve")
        )

        , React.createElement('h2', { className: "font-serif text-3xl font-light text-foreground mb-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}
          , l("Estamos diseñando tus agentes", "We're designing your agents", "Estamos desenhando seus agentes")
        )
        , React.createElement('p', { className: "text-muted-foreground max-w-md leading-relaxed"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 39}}
          , l(
            "Los agentes especializados de ACEAI están en desarrollo. Serán herramientas de IA diseñadas específicamente para tu negocio y propósito.",
            "ACEAI's specialised agents are in development. They will be AI tools designed specifically for your business and purpose.",
            "Os agentes especializados da ACEAI estão em desenvolvimento. Serão ferramentas de IA projetadas especificamente para o seu negócio e propósito."
          )
        )
      )
    )
  );
}
