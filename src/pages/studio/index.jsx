import * as React from "react";
const _jsxFileName = ""; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }import { Wand2, Calendar, Share2, ImagePlus, FileText, Zap } from "lucide-react";
import { useLanguage } from "@/context/language";

export default function StudioPage() {
  const { lang } = useLanguage();
  const l = (es, en, pt) =>
    lang === "pt" ? (_nullishCoalesce(pt, () => ( es))) : lang === "en" ? en : es;

  const features = [
    {
      icon: ImagePlus,
      title: l("Creación Visual con IA", "AI Visual Creation", "Criação Visual com IA"),
      desc: l("Genera imágenes, carruseles y gráficos optimizados para cada red social.", "Generate images, carousels and graphics optimised for each social network.", "Gere imagens, carrosséis e gráficos otimizados para cada rede social."),
      accent: "#7C3AED",
    },
    {
      icon: FileText,
      title: l("Copy Persuasivo", "Persuasive Copy", "Copy Persuasivo"),
      desc: l("Captions, scripts y textos adaptados al tono de tu marca y arquetipo.", "Captions, scripts and texts adapted to your brand tone and archetype.", "Legendas, scripts e textos adaptados ao tom da sua marca e arquétipo."),
      accent: "#BE185D",
    },
    {
      icon: Share2,
      title: l("Publicación Simultánea", "Simultaneous Publishing", "Publicação Simultânea"),
      desc: l("Programa y publica en Instagram, LinkedIn, TikTok y más desde un solo lugar.", "Schedule and publish on Instagram, LinkedIn, TikTok and more from one place.", "Agende e publique no Instagram, LinkedIn, TikTok e mais em um único lugar."),
      accent: "#065F46",
    },
    {
      icon: Zap,
      title: l("Flujos Automatizados", "Automated Flows", "Fluxos Automatizados"),
      desc: l("Calendarios de contenido generados por IA que respetan tu propósito y estrategia.", "AI-generated content calendars that respect your purpose and strategy.", "Calendários de conteúdo gerados por IA que respeitam seu propósito e estratégia."),
      accent: "#B45309",
    },
  ];

  return (
    React.createElement('div', { className: "px-6 py-10 md:px-10 md:py-14"   , 'data-testid': "studio-page", __self: this, __source: {fileName: _jsxFileName, lineNumber: 37}}

      /* Header */
      , React.createElement('div', { className: "mb-12", __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}
        , React.createElement('p', { className: "text-xs uppercase tracking-[0.25em] mb-2"   , style: { color: "#7C3AED" }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}
          , l("Próximamente", "Coming Soon", "Em Breve")
        )
        , React.createElement('div', { className: "flex items-start gap-4 mb-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}
          , React.createElement('div', { className: "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"      , style: { backgroundColor: "#7C3AED18" }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}
            , React.createElement(Wand2, { className: "w-6 h-6" , style: { color: "#7C3AED" }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}} )
          )
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 48}}
            , React.createElement('h1', { className: "font-serif text-4xl md:text-5xl font-light text-foreground"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}, "ACEAI Studio" )
            , React.createElement('p', { className: "text-sm mt-1" , style: { color: "#7C3AED" }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}
              , l("Crea · Automatiza · Publica", "Create · Automate · Publish", "Crie · Automatize · Publique")
            )
          )
        )
        , React.createElement('p', { className: "text-muted-foreground max-w-2xl leading-relaxed text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 55}}
          , l(
            "Tu estudio de contenido potenciado por IA. Desde la idea hasta la publicación en todas tus redes sociales — en minutos, no en horas.",
            "Your AI-powered content studio. From idea to publication across all your social networks — in minutes, not hours.",
            "Seu estúdio de conteúdo potencializado por IA. Da ideia à publicação em todas as suas redes sociais — em minutos, não em horas."
          )
        )
      )

      /* Feature grid */
      , React.createElement('div', { className: "grid sm:grid-cols-2 gap-4 mb-12"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}
        , features.map((f) => {
          const Icon = f.icon;
          return (
            React.createElement('div', {
              key: f.title,
              className: "flex bg-white rounded-2xl border border-border/60 overflow-hidden"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 69}}

              , React.createElement('div', { className: "w-1 shrink-0" , style: { backgroundColor: f.accent }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 73}} )
              , React.createElement('div', { className: "flex gap-4 p-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 74}}
                , React.createElement('div', { className: "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"       , style: { backgroundColor: `${f.accent}18` }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 75}}
                  , React.createElement(Icon, { className: "w-4 h-4" , style: { color: f.accent }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 76}} )
                )
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 78}}
                  , React.createElement('h3', { className: "font-serif text-base font-light text-foreground mb-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 79}}, f.title)
                  , React.createElement('p', { className: "text-xs text-muted-foreground leading-relaxed"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}}, f.desc)
                )
              )
            )
          );
        })
      )

      /* Coming soon banner */
      , React.createElement('div', { className: "flex items-center gap-4 px-6 py-5 rounded-2xl border border-dashed"       , style: { borderColor: "#7C3AED40", backgroundColor: "#7C3AED08" }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}
        , React.createElement(Calendar, { className: "w-5 h-5 shrink-0"  , style: { color: "#7C3AED" }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}} )
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
          , React.createElement('p', { className: "text-sm font-medium text-foreground"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}
            , l("Lanzamiento · Q3 2026", "Launch · Q3 2026", "Lançamento · Q3 2026")
          )
          , React.createElement('p', { className: "text-xs text-muted-foreground mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}}
            , l(
              "Como Miembro Fundadora tendrás acceso anticipado y precio especial.",
              "As a Founding Member you'll get early access and a special price.",
              "Como Membro Fundadora você terá acesso antecipado e preço especial."
            )
          )
        )
      )
    )
  );
}
