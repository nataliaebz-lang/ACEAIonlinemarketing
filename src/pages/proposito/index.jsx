import * as React from "react";
const _jsxFileName = ""; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }import { Link } from "wouter";
import { Crown, BookOpen, Music, ArrowRight, Heart, Sparkles, Moon } from "lucide-react";
import { useLanguage } from "@/context/language";

export default function PropositoOverview() {
  const { lang } = useLanguage();
  const l = (es, en, pt) =>
    lang === "pt" ? (_nullishCoalesce(pt, () => ( es))) : lang === "en" ? en : es;

  const recursos = [
    {
      href: "/proposito/arquetipo",
      icon: Crown,
      title: l("App Arquetipo", "Archetype Quiz", "App Arquétipo"),
      subtitle: l("Descubre tu esencia", "Discover your essence", "Descubra sua essência"),
      desc: l("Un quiz de 10 preguntas para revelar el arquetipo femenino que guía tu misión.", "A 10-question quiz to reveal the feminine archetype guiding your mission.", "Um quiz de 10 perguntas para revelar o arquétipo feminino que guia sua missão."),
      accent: "#BE185D",
    },
    {
      href: "/proposito/ebook",
      icon: BookOpen,
      title: l("E-book Numina", "Numina E-book", "E-book Numina"),
      subtitle: l("Donde el mito y la ciencia se encuentran", "Where myth and science meet", "Onde mito e ciência se encontram"),
      desc: l("Una guía profunda para descubrir y vivir tu propósito con claridad y valentía.", "A deep guide to discover and live your purpose with clarity and courage.", "Um guia profundo para descobrir e viver seu propósito com clareza e coragem."),
      accent: "#E8001C",
    },
    {
      href: "/proposito/dayllu",
      icon: Music,
      title: "DAyllu",
      subtitle: l("Arquetipo + Música Sagrada", "Archetype + Sacred Music", "Arquétipo + Música Sagrada"),
      desc: l("Descubre tu arquetipo universal y explora la playlist de sonidos sagrados para tu viaje interior.", "Discover your universal archetype and explore the sacred sounds playlist for your inner journey.", "Descubra seu arquétipo universal e explore a playlist de sons sagrados para sua jornada interior."),
      accent: "#7B4FA6",
    },
    {
      href: "/proposito/mantras",
      icon: Moon,
      title: l("Mantras & Meditaciones", "Mantras & Meditations", "Mantras & Meditações"),
      subtitle: l("Sonido sagrado para tu transformación", "Sacred sound for your transformation", "Som sagrado para sua transformação"),
      desc: l("Mantras ancestrales y meditaciones guiadas para elevar tu vibración y conectar con tu propósito.", "Ancient mantras and guided meditations to elevate your vibration and connect with your purpose.", "Mantras ancestrais e meditações guiadas para elevar sua vibração e conectar com seu propósito."),
      accent: "#6D28D9",
    },
  ];

  const cursos = [
    {
      href: "/proposito/curso-7-dias",
      icon: Sparkles,
      title: l("Descubre tu Misión", "Discover your Mission", "Descubra sua Missão"),
      duration: l("7 Días", "7 Days", "7 Dias"),
      desc: l("Siete jornadas intensas para activar tu claridad interior.", "Seven intense sessions to activate your inner clarity.", "Sete jornadas intensas para ativar sua clareza interior."),
      accent: "#BE185D",
    },
    {
      href: "/proposito/curso-40-dias",
      icon: Heart,
      title: l("El Cambio", "The Change", "A Mudança"),
      duration: l("41 Días", "41 Days", "41 Dias"),
      desc: l("Un viaje de 41 jornadas para reprogramar creencias y anclar tu identidad.", "A 41-day journey to reprogram beliefs and anchor your identity.", "Uma jornada de 41 dias para reprogramar crenças e ancorar sua identidade."),
      accent: "#B45309",
    },
    {
      href: "/proposito/programa-6-meses",
      icon: Crown,
      title: l("Programa Transformacional", "Transformational Programme", "Programa Transformacional"),
      duration: l("6 Meses · Numina", "6 Months · Numina", "6 Meses · Numina"),
      desc: l("Acompañamiento profundo 1:1 para fundadoras que quieren un cambio total.", "Deep 1:1 mentoring for founding members who want total transformation.", "Acompanhamento profundo 1:1 para fundadoras que querem uma transformação total."),
      accent: "#6D28D9",
    },
  ];

  return (
    React.createElement('div', { className: "px-6 py-10 md:px-10 md:py-14"   , 'data-testid': "proposito-overview", __self: this, __source: {fileName: _jsxFileName, lineNumber: 73}}

      /* Header */
      , React.createElement('div', { className: "mb-10", __self: this, __source: {fileName: _jsxFileName, lineNumber: 76}}
        , React.createElement('p', { className: "text-xs uppercase tracking-[0.25em] text-secondary mb-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 77}}, l("Dimensión I", "Dimension I", "Dimensão I"))
        , React.createElement('h1', { className: "font-serif text-4xl md:text-5xl font-light mb-3"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 78}}, l("Propósito", "Purpose", "Propósito"))
        , React.createElement('p', { className: "text-muted-foreground max-w-xl leading-relaxed text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 79}}
          , l(
            "El viaje hacia adentro. Antes de construir un negocio brillante, construyes una identidad brillante.",
            "The journey within. Before building a brilliant business, you build a brilliant identity.",
            "A jornada para dentro. Antes de construir um negócio brilhante, você constrói uma identidade brilhante."
          )
        )
      )

      /* Recursos */
      , React.createElement('div', { className: "grid sm:grid-cols-2 gap-4 mb-10"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}
        , recursos.map((item) => {
          const Icon = item.icon;
          return (
            React.createElement(Link, { key: item.href, href: item.href, __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}}
              , React.createElement('div', {
                className: "group relative h-full flex bg-white rounded-2xl border border-border/60 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-border"              ,
                'data-testid': `recurso-${item.href}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 94}}

                , React.createElement('div', { className: "w-1 shrink-0" , style: { backgroundColor: item.accent }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 98}} )
                , React.createElement('div', { className: "flex flex-col p-5 flex-1 min-w-0"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}}
                  , React.createElement('div', { className: "w-9 h-9 rounded-xl flex items-center justify-center mb-4 shrink-0"       , style: { backgroundColor: `${item.accent}18` }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 100}}
                    , React.createElement(Icon, { className: "w-4 h-4" , style: { color: item.accent }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 101}} )
                  )
                  , React.createElement('h3', { className: "font-serif text-base font-light leading-snug text-foreground mb-0.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}}, item.title)
                  , React.createElement('p', { className: "text-xs font-medium mb-3 leading-snug"   , style: { color: item.accent }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}}, item.subtitle)
                  , React.createElement('p', { className: "text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 105}}, item.desc)
                  , React.createElement('div', { className: "flex items-center gap-1.5 mt-4 text-xs font-medium transition-all group-hover:gap-2"       , style: { color: item.accent }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}}
                    , l("Acceder", "Access", "Acessar")
                    , React.createElement(ArrowRight, { className: "w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}} )
                  )
                )
              )
            )
          );
        })
      )

      /* Cursos */
      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 118}}
        , React.createElement('div', { className: "flex items-center gap-3 mb-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 119}}
          , React.createElement('div', { className: "h-px flex-1 bg-border/50"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}} )
          , React.createElement('span', { className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50 px-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}
            , l("Cursos", "Courses", "Cursos")
          )
          , React.createElement('div', { className: "h-px flex-1 bg-border/50"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 124}} )
        )
        , React.createElement('div', { className: "flex flex-col gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}
          , cursos.map((c) => {
            const Icon = c.icon;
            return (
              React.createElement(Link, { key: c.href, href: c.href, __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}
                , React.createElement('div', {
                  className: "group flex bg-white rounded-xl border border-border/60 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-sm hover:border-border"           ,
                  'data-testid': `curso-${c.href}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 131}}

                  , React.createElement('div', { className: "w-1 shrink-0" , style: { backgroundColor: c.accent }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}} )
                  , React.createElement('div', { className: "flex items-center gap-4 px-5 py-4 flex-1 min-w-0"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 136}}
                    , React.createElement('div', { className: "w-8 h-8 rounded-lg flex items-center justify-center shrink-0"      , style: { backgroundColor: `${c.accent}18` }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}
                      , React.createElement(Icon, { className: "w-3.5 h-3.5" , style: { color: c.accent }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}} )
                    )
                    , React.createElement('div', { className: "flex-1 min-w-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}}
                      , React.createElement('p', { className: "font-serif text-sm font-light text-foreground truncate"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 141}}, c.title)
                      , React.createElement('p', { className: "text-xs text-muted-foreground truncate"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}}, c.desc)
                    )
                    , React.createElement('span', { className: "text-[10px] font-medium uppercase tracking-widest shrink-0 px-2"     , style: { color: c.accent }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 144}}
                      , c.duration
                    )
                    , React.createElement(ArrowRight, { className: "w-3.5 h-3.5 shrink-0 text-muted-foreground/40 group-hover:translate-x-0.5 transition-transform"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 147}} )
                  )
                )
              )
            );
          })
        )
      )
    )
  );
}
