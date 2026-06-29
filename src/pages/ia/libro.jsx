import * as React from "react";
const _jsxFileName = "";import { BookOpen, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language";

const excerptEs = `El mayor error que cometen las emprendedoras cuando descubren la inteligencia artificial es creer que su trabajo es aprender la herramienta.

No lo es.

Tu trabajo es aprender a pensar. La herramienta ejecuta. Tú decides qué ejecutar.

Cada prompt que escribes es una conversación con el modelo más sofisticado que la humanidad ha creado. Y como en toda conversación, la calidad de lo que obtienes depende de la calidad de lo que aportas.

Este libro no te enseñará a usar ChatGPT. Te enseñará a usar tu mente de una manera que ChatGPT pueda amplificar. Esa es la diferencia entre las emprendedoras que se quedan en las herramientas básicas y las que construyen sistemas de marketing que los demás no comprenden.

Bienvenida al lado que ya sabe.`;

const excerptEn = `The biggest mistake entrepreneurs make when they discover artificial intelligence is believing their job is to learn the tool.

It isn't.

Your job is to learn to think. The tool executes. You decide what to execute.

Every prompt you write is a conversation with the most sophisticated model humanity has ever created. And as in any conversation, the quality of what you get depends on the quality of what you bring.

This book won't teach you to use ChatGPT. It will teach you to use your mind in a way that ChatGPT can amplify. That is the difference between entrepreneurs who stay at the basic tool level and those who build marketing systems that others cannot understand.

Welcome to the side that already knows.`;

export default function LibroIA() {
  const { lang } = useLanguage();
  const l = (es, en) => lang === "es" ? es : en;

  const excerpt = lang === "es" ? excerptEs : excerptEn;

  return (
    React.createElement('div', { className: "px-6 py-10 md:px-10 md:py-14"   , 'data-testid': "libro-ia-page", __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}
      , React.createElement('div', { className: "grid md:grid-cols-2 gap-10 mb-16 items-start"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 37}}
        /* Book Cover */
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 39}}
          , React.createElement('div', { className: "aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-violet-900 via-indigo-900 to-rose-900 border border-accent/20 shadow-2xl flex flex-col items-center justify-center p-10 text-center relative"                  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}
            , React.createElement('div', { className: "absolute inset-0 opacity-10"  , style: { backgroundImage: 'radial-gradient(circle at 70% 30%, hsl(275 36% 48%), transparent 50%), radial-gradient(circle at 30% 70%, hsl(353 100% 45%), transparent 50%)' }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}} )
            , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}
              , React.createElement('p', { className: "text-xs uppercase tracking-[0.3em] text-accent mb-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}, "ACEAI Online Marketing"  )
              , React.createElement('h2', { className: "font-serif text-3xl font-light leading-tight mb-2 text-white"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}, "Marketing")
              , React.createElement('h2', { className: "font-serif text-3xl font-semibold leading-tight mb-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}
                , React.createElement('span', { className: "gradient-text", __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}}, l("con IA", "with AI"))
              )
              , React.createElement('div', { className: "w-12 h-px bg-accent/50 mx-auto my-6"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 48}} )
              , React.createElement('p', { className: "text-sm text-white/70" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}
                , l(
                  "La guía definitiva para emprendedoras que quieren liderar en la era de la inteligencia artificial",
                  "The definitive guide for entrepreneurs who want to lead in the age of artificial intelligence"
                )
              )
            )
          )
        )

        /* Info */
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 60}}
          , React.createElement('div', { className: "flex items-center gap-2 mb-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 61}}
            , React.createElement(BookOpen, { className: "w-4 h-4 text-accent"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}} )
            , React.createElement('span', { className: "text-xs uppercase tracking-[0.2em] text-accent"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}, l("E-book Digital", "Digital E-book"))
          )
          , React.createElement('h1', { className: "font-serif text-4xl font-light mb-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}, "E-book SOS-IA+P" )
          , React.createElement('p', { className: "text-accent font-serif italic mb-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}}, l("La Guía para Emprendedoras", "The Guide for Entrepreneurs"))
          , React.createElement('p', { className: "text-muted-foreground leading-relaxed mb-8"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 67}}
            , l(
              "El manual que ninguna gurú de marketing te dará porque les conviene que sigas comprando sus cursos. Todo lo que necesitas para integrar la IA en tu marketing, explicado sin humo.",
              "The manual no marketing guru will give you because they benefit from you buying their courses. Everything you need to integrate AI into your marketing, explained without the fluff."
            )
          )
          , React.createElement('div', { className: "grid grid-cols-3 gap-4 mb-8"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 73}}
            , [["10", l("Capítulos", "Chapters")], ["200+", l("Páginas", "Pages")], ["30+", "Prompts"]].map(([v, label]) => (
              React.createElement('div', { key: label, className: "bg-card border border-card-border rounded-xl p-4 text-center"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 75}}
                , React.createElement('p', { className: "text-2xl font-serif text-gold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 76}}, v)
                , React.createElement('p', { className: "text-xs text-muted-foreground" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 77}}, label)
              )
            ))
          )
          , React.createElement(Button, { className: "gap-2 w-full sm:w-auto"  , 'data-testid': "btn-download-libro", __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}
            , React.createElement(Download, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 82}} ), " " , l("Descargar PDF", "Download PDF")
          )
        )
      )

      /* Excerpt */
      , React.createElement('div', { className: "mb-12 bg-card border border-card-border rounded-2xl p-8 md:p-10"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}}
        , React.createElement('p', { className: "text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}, l("Extracto — Introducción", "Excerpt — Introduction"))
        , React.createElement('blockquote', { className: "font-serif text-lg leading-relaxed text-foreground/85 whitespace-pre-line italic border-l-2 border-accent/40 pl-6"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
          , excerpt
        )
      )

    )
  );
}
