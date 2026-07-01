import * as React from "react";
const _jsxFileName = "";import { Rocket, FlaskConical, Clapperboard, FolderKanban, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/language";
import { useResource } from "@/context/resources";

export default function Apps() {
  const { lang } = useLanguage();
  const l = (es, en) => lang === "es" ? es : en;
  // Enlace gestionado desde /admin (con respaldo al valor actual).
  const appsLive = useResource("/apps");

  const demoCategories = [
    {
      id: "studio",
      icon: Clapperboard,
      name: "ACEAI Studio",
      descEs: "Aplicaciones creativas y de contenido del ecosistema ACEAI.",
      descEn: "Creative and content applications from the ACEAI ecosystem.",
      color: "from-violet-50/90 to-fuchsia-50/70 border-violet-200/60",
      iconColor: "bg-violet-100 border-violet-200 text-accent",
      cta: l("Próximamente", "Coming soon"),
    },
    {
      id: "gp",
      icon: FolderKanban,
      name: "ACEAI GP",
      descEs: "Gestión de proyectos: herramientas para organizar, planificar y ejecutar tu negocio con IA.",
      descEn: "Project management: tools to organise, plan and run your business with AI.",
      color: "from-red-50/90 to-rose-50/70 border-primary/20",
      iconColor: "bg-red-100 border-red-200 text-primary",
      cta: l("Próximamente", "Coming soon"),
    },
  ];

  return (
    React.createElement('div', { className: "px-6 py-10 md:px-10 md:py-14"   , 'data-testid': "apps-page", __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}}
      /* Header */
      , React.createElement('div', { className: "mb-12", __self: this, __source: {fileName: _jsxFileName, lineNumber: 34}}
        , React.createElement('div', { className: "flex items-center gap-2 mb-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}
          , React.createElement(Rocket, { className: "w-4 h-4 text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}} )
          , React.createElement('span', { className: "text-xs uppercase tracking-[0.25em] text-primary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 37}}, l("Herramientas", "Tools"))
        )
        , React.createElement('h1', { className: "font-serif text-4xl md:text-5xl font-light mb-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 39}}, l("Apps", "Apps"))
        , React.createElement('p', { className: "text-muted-foreground max-w-xl leading-relaxed"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}
          , l(
            "Accede a todas las aplicaciones del ecosistema ACEAI, organizadas por categoría.",
            "Access all applications in the ACEAI ecosystem, organised by category."
          )
        )
      )

      /* Apps Live */
      , React.createElement('div', { className: "mb-14", __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}
        , React.createElement('div', { className: "flex items-center gap-3 mb-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}
          , React.createElement('div', { className: "w-9 h-9 rounded-xl flex items-center justify-center border bg-green-50 border-green-200 text-green-700"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}
            , React.createElement(Rocket, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 52}} )
          )
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}
            , React.createElement('h2', { className: "font-serif text-xl font-light text-foreground leading-none"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 55}}, l("Apps Live", "Live Apps"))
            , React.createElement('p', { className: "text-xs text-muted-foreground mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}}, l("Aplicaciones en producción", "Production applications"))
          )
        )
        , React.createElement('a', { href: (appsLive && appsLive.link) || "https://aceaionlinemarketing.com", target: "_blank", rel: "noopener noreferrer" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 59}}
          , React.createElement('div', { className: "group rounded-2xl border border-green-200/70 bg-gradient-to-br from-green-50/80 to-emerald-50/60 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer flex items-center gap-5"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 60}}
            , React.createElement('div', { className: "w-11 h-11 rounded-xl bg-green-100 border border-green-200 flex items-center justify-center shrink-0"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 61}}
              , React.createElement('span', { className: "w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}} )
            )
            , React.createElement('div', { className: "flex-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}
              , React.createElement('p', { className: "font-serif text-lg font-semibold text-foreground"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}, "ACEAI Online Marketing"  )
              , React.createElement('p', { className: "text-sm text-muted-foreground mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}}, l("Sitio web oficial · en producción", "Official website · live"))
            )
            , React.createElement('div', { className: "flex items-center gap-1.5 text-xs font-semibold text-green-700 group-hover:gap-2.5 transition-all shrink-0"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 68}}
              , React.createElement(ArrowRight, { className: "w-3.5 h-3.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 69}} )
            )
          )
        )
      )

      /* Apps Demo */
      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 76}}
        , React.createElement('div', { className: "flex items-center gap-3 mb-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 77}}
          , React.createElement('div', { className: "w-9 h-9 rounded-xl flex items-center justify-center border bg-violet-50 border-violet-200 text-accent"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 78}}
            , React.createElement(FlaskConical, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 79}} )
          )
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}
            , React.createElement('h2', { className: "font-serif text-xl font-light text-foreground leading-none"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 82}}, l("Apps Demo", "Demo Apps"))
            , React.createElement('p', { className: "text-xs text-muted-foreground mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 83}}, l("Herramientas interactivas incluidas en tu membresía", "Interactive tools included in your membership"))
          )
        )
        , React.createElement('div', { className: "grid sm:grid-cols-2 gap-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 86}}
          , demoCategories.map((cat) => (
            React.createElement('div', {
              key: cat.id,
              className: `group relative rounded-2xl border bg-gradient-to-br p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${cat.color}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}}

              , React.createElement('div', { className: `w-11 h-11 rounded-xl flex items-center justify-center border mb-5 ${cat.iconColor}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}
                , React.createElement(cat.icon, { className: "w-5 h-5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}} )
              )
              , React.createElement('h3', { className: "font-serif text-2xl font-light text-foreground mb-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}}, cat.name)
              , React.createElement('p', { className: "text-sm text-muted-foreground leading-relaxed mb-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 96}}
                , lang === "es" ? cat.descEs : cat.descEn
              )
              , React.createElement('span', { className: "inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest rounded-full px-3 py-1.5 bg-white/60 text-muted-foreground border border-white/80"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}}
                , cat.cta
              )
            )
          ))
        )
      )
    )
  );
}
