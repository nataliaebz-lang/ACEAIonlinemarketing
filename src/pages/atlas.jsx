import * as React from "react";
const _jsxFileName = "";import { useLanguage } from "@/context/language";
import { Globe } from "lucide-react";

export default function Atlas() {
  const { lang } = useLanguage();
  const l = (es, en) => lang === "es" ? es : en;

  return (
    React.createElement('div', { className: "flex flex-col h-screen"  , 'data-testid': "atlas-page", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9}}
      /* Header strip */
      , React.createElement('div', { className: "shrink-0 px-6 py-4 border-b border-border flex items-center gap-3 bg-[#FAF7F4]"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11}}
        , React.createElement('div', { className: "w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12}}
          , React.createElement(Globe, { className: "w-4 h-4 text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 13}} )
        )
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 15}}
          , React.createElement('p', { className: "text-xs uppercase tracking-[0.25em] text-primary font-medium"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 16}}
            , l("Comunidad · Referentes Femeninas", "Community · Female Leaders")
          )
          , React.createElement('h1', { className: "font-serif text-lg font-light text-foreground leading-tight"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 19}}
            , l("Mapamundi RF — Referentes Femeninas", "Mapamundi RF — Female Leaders")
          )
        )
      )

      /* Full-height iframe */
      , React.createElement('iframe', {
        src: `${import.meta.env.BASE_URL}mapamundi-femenino.html`,
        title: l("Mapamundi Femenino — Mujeres Emprendedoras", "Female Mapamundi — Women Entrepreneurs"),
        className: "flex-1 w-full border-0"  ,
        allow: "fullscreen", __self: this, __source: {fileName: _jsxFileName, lineNumber: 26}}
      )
    )
  );
}
