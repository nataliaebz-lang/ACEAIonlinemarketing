import * as React from "react";
const _jsxFileName = ""; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }import { createContext, useContext, useState, } from "react";

 







const LanguageContext = createContext({ lang: "es", setLang: () => {}, toggle: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try { return _nullishCoalesce((localStorage.getItem("aceai-lang") ), () => ( "es")); } catch (e) { return "es"; }
  });

  const setLang = (l) => {
    try { localStorage.setItem("aceai-lang", l); } catch (e2) {}
    setLangState(l);
  };

  const toggle = () =>
    setLang(lang === "es" ? "en" : lang === "en" ? "pt" : "es");

  return (
    React.createElement(LanguageContext.Provider, { value: { lang, setLang, toggle }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 27}}
      , children
    )
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  const l = (es, en, pt) => {
    if (ctx.lang === "pt") return _nullishCoalesce(pt, () => ( es));
    if (ctx.lang === "en") return en;
    return es;
  };
  return { ...ctx, l };
}
