import * as React from "react";
const _jsxFileName = "";import { Link } from "wouter";
import { Brain, BookOpen, Sparkles, Crown, FileText, Bot, List, ArrowRight, Wand2 } from "lucide-react";
import { useLanguage } from "@/context/language";

export default function IAOverview() {
  const { lang } = useLanguage();
  const l = (es, en) => lang === "es" ? es : en;

  const items = [
    {
      href: "/ia/libro",
      icon: BookOpen,
      title: "E-book SOS-IA+P",
      subtitle: l("La Guía Definitiva", "The Definitive Guide"),
      desc: l("El manual completo para emprendedoras que quieren usar la inteligencia artificial como su mayor ventaja competitiva.", "The complete manual for entrepreneurs who want to use artificial intelligence as their greatest competitive advantage."),
      accent: "#E8001C",
      available: true,
    },
    {
      href: "/ia/curso-7-dias",
      icon: Sparkles,
      title: "IA para Emprendedoras",
      subtitle: l("Programa de 7 días", "7-Day Programme"),
      desc: l("En siete días aprenderás a usar ChatGPT, Claude y las principales herramientas de IA para crear contenido y automatizar tu marketing.", "In seven days you'll learn to use ChatGPT, Claude and the top AI tools to create content and automate your marketing."),
      accent: "#7B4FA6",
      available: true,
    },
    {
      href: "/ia/curso-40-dias",
      icon: Brain,
      title: l("Programa de 41 días", "41-Day Programme"),
      subtitle: l("Lanza tu Negocio con IA + Propósito", "Launch Your Business with AI + Purpose"),
      desc: l("El programa más completo para dominar el marketing con IA: desde fundamentos hasta automatizaciones avanzadas.", "The most complete programme to master AI marketing: from foundations to advanced automations."),
      accent: "#BE185D",
      available: false,
    },
    {
      href: "/ia/programa-avanzado",
      icon: Crown,
      title: l("Programa Transformacional", "Transformational Programme"),
      subtitle: l("6 Meses · Método SOS-IA+P", "6 Months · SOS-IA+P Method"),
      desc: l("El nivel elite. Sistemas de automatización completos, flujos de ventas con IA y estrategia de marca personal aumentada.", "The elite level. Complete automation systems, AI sales flows and augmented personal brand strategy."),
      accent: "#B45309",
      available: false,
    },
    {
      href: "/ia/prompts",
      icon: FileText,
      title: l("Biblioteca de Prompts", "Prompt Library"),
      subtitle: l("Básico · Intermedio · Avanzado", "Basic · Intermediate · Advanced"),
      desc: l("Prompts organizados por nivel y categoría: copywriting, redes sociales, email, SEO, estrategia de contenido y más.", "Prompts organised by level and category: copywriting, social media, email, SEO, content strategy and more."),
      accent: "#4338CA",
      available: true,
    },
    {
      href: "/ia/agentes",
      icon: Bot,
      title: l("Agentes IA Especializados", "Specialised AI Agents"),
      subtitle: l("Tu Equipo Digital", "Your Digital Team"),
      desc: l("Agentes de IA diseñados específicamente para tareas de marketing: copy, redes, email, publicidad y branding.", "AI agents specifically designed for marketing tasks: copy, social, email, advertising and branding."),
      accent: "#9F1239",
      available: true,
    },
    {
      href: "/ia/directorio",
      icon: List,
      title: l("Directorio de Herramientas", "Tools Directory"),
      subtitle: l("200+ Herramientas de IA", "200+ AI Tools"),
      desc: l("El directorio más completo de herramientas de IA organizadas por categoría: imagen, video, voz, escritura y automatización.", "The most complete AI tools directory organised by category: image, video, voice, writing and automation."),
      accent: "#065F46",
      available: true,
    },
    {
      href: "/studio",
      icon: Wand2,
      title: "ACEAI Studio",
      subtitle: l("Crea · Automatiza · Publica", "Create · Automate · Publish"),
      desc: l("Tu estudio de contenido potenciado por IA. Genera contenido para redes sociales y publícalo simultáneamente en todas tus plataformas.", "Your AI-powered content studio. Generate social media content and publish it simultaneously across all your platforms."),
      accent: "#7C3AED",
      available: false,
    },
  ];

  return (
    React.createElement('div', { className: "px-6 py-10 md:px-10 md:py-14"   , 'data-testid': "ia-overview", __self: this, __source: {fileName: _jsxFileName, lineNumber: 85}}
      , React.createElement('div', { className: "mb-10", __self: this, __source: {fileName: _jsxFileName, lineNumber: 86}}
        , React.createElement('p', { className: "text-xs uppercase tracking-[0.25em] text-accent mb-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 87}}, l("Dimensión II", "Dimension II"))
        , React.createElement('h1', { className: "font-serif text-4xl md:text-5xl font-light mb-3 text-foreground"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}}, l("Inteligencia Artificial", "Artificial Intelligence"))
        , React.createElement('p', { className: "text-muted-foreground max-w-xl leading-relaxed text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}
          , l(
            "La IA no reemplaza tu esencia — la amplifica. Herramientas, programas y recursos para que tu marketing trabaje con la inteligencia que mereces.",
            "AI doesn't replace your essence — it amplifies it. Tools, programmes and resources to make your marketing work with the intelligence you deserve."
          )
        )
      )

      , React.createElement('div', { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 97}}
        , items.map((item) => {
          const Icon = item.icon;
          return (
            React.createElement(Link, { key: item.href, href: item.href, __self: this, __source: {fileName: _jsxFileName, lineNumber: 101}}
              , React.createElement('div', {
                className: "group relative h-full flex bg-white rounded-2xl border border-border/60 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-border"              ,
                'data-testid': `ia-item-${item.href}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 102}}

                , React.createElement('div', { className: "w-1 shrink-0" , style: { backgroundColor: item.accent }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}} )
                , React.createElement('div', { className: "flex flex-col p-5 flex-1 min-w-0"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}
                  , React.createElement('div', { className: "flex items-start justify-between mb-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}}
                    , React.createElement('div', { className: "w-9 h-9 rounded-xl flex items-center justify-center shrink-0"      , style: { backgroundColor: `${item.accent}18` }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 109}}
                      , React.createElement(Icon, { className: "w-4 h-4" , style: { color: item.accent }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}} )
                    )
                    , !item.available && (
                      React.createElement('span', { className: "text-[9px] uppercase tracking-widest text-muted-foreground/50 font-medium mt-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 113}}
                        , l("Próx.", "Soon")
                      )
                    )
                  )
                  , React.createElement('h3', { className: "font-serif text-base font-light leading-snug text-foreground mb-0.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 118}}, item.title)
                  , React.createElement('p', { className: "text-xs font-medium mb-3 leading-snug"   , style: { color: item.accent }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 119}}, item.subtitle)
                  , React.createElement('p', { className: "text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-3"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}, item.desc)
                  , React.createElement('div', { className: "flex items-center gap-1.5 mt-4 text-xs font-medium transition-all group-hover:gap-2"       , style: { color: item.accent }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}
                    , item.available ? l("Acceder", "Access") : l("Ver detalles", "View details")
                    , React.createElement(ArrowRight, { className: "w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}} )
                  )
                )
              )
            )
          );
        })
      )
    )
  );
}
