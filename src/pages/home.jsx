import * as React from "react";
const _jsxFileName = "";import { Link } from "wouter";
import { ArrowRight, Heart, Brain, Crown, Sparkles, Globe, Rocket, FlaskConical, Zap } from "lucide-react";
import { useLanguage } from "@/context/language";

export default function Home() {
  const { l } = useLanguage();

  const stats = [
    {
      label: l("Plazas Limitadas", "Limited Spots", "Vagas Limitadas"),
      value: "✦",
      icon: Crown,
      gradient: "from-amber-400 to-orange-500",
      glow: "shadow-[0_8px_32px_hsl(38_90%_52%_/_0.45)]",
      border: "border-amber-300/60",
      bg: "bg-gradient-to-br from-amber-50 to-orange-50",
      text: "text-amber-600",
      sub: l("Acceso exclusivo PMF", "Exclusive PMF access", "Acesso exclusivo PMF"),
      href: null,
    },
    {
      label: l("Herramientas IA", "AI Tools", "Ferramentas IA"),
      value: "+200",
      icon: Brain,
      gradient: "from-red-500 to-rose-600",
      glow: "shadow-[0_8px_32px_hsl(353_100%_48%_/_0.45)]",
      border: "border-red-300/60",
      bg: "bg-gradient-to-br from-red-50 to-rose-50",
      text: "text-primary",
      sub: l("En el Directorio IA", "In the AI Directory", "No Diretório IA"),
      href: "/ia/directorio",
    },
    {
      label: l("Mapamundi Referentes Femeninas", "Female Leaders Mapamundi", "Mapamundi Referentes Femininas"),
      value: "🌍",
      icon: Globe,
      gradient: "from-teal-500 to-emerald-600",
      glow: "shadow-[0_8px_32px_hsl(168_80%_40%_/_0.45)]",
      border: "border-teal-300/60",
      bg: "bg-gradient-to-br from-teal-50 to-emerald-50",
      text: "text-teal-700",
      sub: l("Solo para miembras PMF", "PMF members only", "Apenas membras PMF"),
      exclusive: true,
      href: "/atlas",
    },
  ];

  return (
    React.createElement('div', { 'data-testid': "home-page", className: "min-h-screen", __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}

      /* ── HERO ── */
      , React.createElement('section', { className: "relative min-h-[88vh] flex items-center overflow-hidden"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 52}}
        , React.createElement('div', { className: "absolute inset-0 z-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}
          , React.createElement('img', {
            src: "/hero-bg.png",
            alt: "",
            'aria-hidden': "true",
            className: "absolute right-0 top-0 h-full w-[68%] object-cover object-top opacity-30"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}
          )
          , React.createElement('div', { className: "absolute inset-0 bg-gradient-to-r from-[#FAF7F4] via-[#FAF7F4]/90 to-[#FAF7F4]/15"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 60}} )
          , React.createElement('div', { className: "absolute inset-0 bg-gradient-to-b from-[#FAF7F4]/15 via-transparent to-[#FAF7F4]/60"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 61}} )
        )

        , React.createElement('div', { className: "relative z-10 px-8 md:px-12 py-24 max-w-xl"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}

          /* Badge — gradient rainbow border */
          , React.createElement('div', { className: "inline-flex mb-8" , style: { padding: 1.5, borderRadius: 9999, background: "linear-gradient(90deg, hsl(353 100% 48%), hsl(275 70% 55%), hsl(42 90% 54%), hsl(190 80% 52%), hsl(344 85% 58%), hsl(353 100% 48%))", backgroundSize: "300% 100%", animation: "gradient-drift 3s linear infinite" }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 67}}
            , React.createElement('div', { className: "inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/95 backdrop-blur-sm"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 68}}
              , React.createElement('span', { className: "text-xs font-bold tracking-[0.22em] uppercase bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 69}}
                , l("Miembro Fundadora · Acceso Exclusivo", "Founding Member · Exclusive Access", "Membro Fundadora · Acesso Exclusivo")
              )
            )
          )

          /* PMF */
          , React.createElement('div', { className: "mb-5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 76}}
            , React.createElement('div', { className: "inline-flex items-baseline gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 77}}
              , React.createElement('span', {
                className: "font-serif text-[2.75rem] md:text-[3.25rem] font-bold gradient-text-animated leading-none tracking-tight"      ,
                style: { filter: "drop-shadow(0 2px 18px hsl(353 100% 48% / 0.22))" }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 78}}
, "PMF"

              )
              , React.createElement('span', { className: "text-foreground/45 text-[0.65rem] uppercase tracking-[0.22em] leading-snug max-w-[11rem]"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 84}}
                , l("Programa de Miembras Fundadoras", "Founding Members Program", "Programa de Membras Fundadoras")
              )
            )
            , React.createElement('div', { className: "mt-2 h-px w-20 bg-gradient-to-r from-primary/50 via-secondary/25 to-transparent rounded-full"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}} )
          )

          , React.createElement('h1', { className: "font-serif text-5xl md:text-6xl font-light leading-[1.05] mb-6"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
            , l("Tu portal de", "Your portal of", "Seu portal de"), React.createElement('br', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 92}} )
            , React.createElement('span', { className: "gradient-text-animated font-semibold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}}, l("propósito", "purpose", "propósito")), " "
            , l("e", "and", "e"), " "
            , React.createElement('span', { className: "gradient-text-animated font-semibold" , style: { animationDelay: "1s" }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}}, "IA")
          )

          /* Improved tagline */
          , React.createElement('p', { className: "text-foreground/70 text-base leading-relaxed mb-10 max-w-sm"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}}
            , l(
              "Tu propósito como brújula. La inteligencia artificial como potenciador. Tú, imparable.",
              "Your purpose as compass. Artificial intelligence as amplifier. You, unstoppable.",
              "Seu propósito como bússola. A inteligência artificial como amplificador. Você, imparável."
            )
          )

          /* Quick links */
          , React.createElement('div', { className: "flex flex-wrap gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}}
            , React.createElement(Link, { href: "/proposito", __self: this, __source: {fileName: _jsxFileName, lineNumber: 109}}
              , React.createElement('div', { className: "flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-sm font-medium shadow-[0_4px_20px_hsl(275_70%_52%_/_0.35)] hover:scale-105 hover:shadow-[0_6px_28px_hsl(275_70%_52%_/_0.50)] transition-all duration-200 cursor-pointer"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}
                , React.createElement(Heart, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}} ), " " , l("Propósito", "Purpose", "Propósito"), " " , React.createElement(ArrowRight, { className: "w-3.5 h-3.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}} )
              )
            )
            , React.createElement(Link, { href: "/ia", __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}
              , React.createElement('div', { className: "flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium shadow-[0_4px_20px_hsl(353_100%_48%_/_0.35)] hover:scale-105 hover:shadow-[0_6px_28px_hsl(353_100%_48%_/_0.50)] transition-all duration-200 cursor-pointer"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}}
                , React.createElement(Brain, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}} ), " " , l("Inteligencia Artificial", "AI", "Inteligência Artificial"), " " , React.createElement(ArrowRight, { className: "w-3.5 h-3.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}} )
              )
            )
          )
        )
      )

      /* ── STATS — vibrant colored cards ── */
      , React.createElement('section', { className: "px-8 md:px-12 -mt-10 relative z-10 mb-16"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 124}}
        , React.createElement('div', { className: "grid grid-cols-3 gap-5 items-stretch"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 125}}
          , stats.map((s, i) => {
            const inner = (
              React.createElement('div', {
                className: `relative overflow-hidden border ${s.border} ${s.bg} ${s.glow} px-4 py-5 flex flex-col gap-1.5 rounded-3xl h-full ${s.href ? "cursor-pointer" : ""}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}

                /* Exclusive badge */
                , s.exclusive && (
                  React.createElement('div', { className: "absolute top-2.5 right-2.5 flex items-center gap-1 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-full shadow-sm"                 , __self: this, __source: {fileName: _jsxFileName, lineNumber: 134}}
                    , React.createElement(Sparkles, { className: "w-2 h-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}} )
                    , l("Exclusivo", "Exclusive", "Exclusivo")
                  )
                )
                /* Colored orb */
                , React.createElement('div', { className: `absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${s.gradient} opacity-20 blur-2xl pointer-events-none`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}} )
                , React.createElement('div', { className: `w-8 h-8 rounded-full bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-sm shrink-0`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 141}}
                  , React.createElement(s.icon, { className: "w-3.5 h-3.5 text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}} )
                )
                , React.createElement('p', { className: `text-2xl font-serif font-bold leading-none ${s.text}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 144}}, s.value)
                , React.createElement('p', { className: "text-xs font-semibold text-foreground/75 leading-tight"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 145}}, s.label)
                , s.sub && React.createElement('p', { className: "text-[10px] text-muted-foreground leading-tight"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 146}}, s.sub)
                , s.href && (
                  React.createElement('div', { className: `flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-widest ${s.text} opacity-50 mt-0.5`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 148}}
                    , React.createElement(ArrowRight, { className: "w-2.5 h-2.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 149}} )
                  )
                )
              )
            );
            return s.href
              ? React.createElement(Link, { key: s.label, href: s.href, __self: this, __source: {fileName: _jsxFileName, lineNumber: 155}}, inner)
              : React.createElement('div', { key: s.label, __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}}, inner);
          })
        )
      )

      /* ── TWO DIMENSIONS ── */
      , React.createElement('section', { className: "px-8 md:px-12 mb-6"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 162}}
        , React.createElement('div', { className: "flex items-center gap-3 mb-8"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 163}}
          , React.createElement('div', { className: "h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 164}} )
          , React.createElement('h2', { className: "font-serif text-xl font-light text-foreground/50 tracking-widest px-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 165}}
            , l("Las Dos Dimensiones", "The Two Dimensions", "As Duas Dimensões")
          )
          , React.createElement('div', { className: "h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 168}} )
        )
        , React.createElement('div', { className: "grid md:grid-cols-2 gap-6"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 170}}

          /* PROPÓSITO — vivid violet */
          , React.createElement(Link, { href: "/proposito", __self: this, __source: {fileName: _jsxFileName, lineNumber: 173}}
            , React.createElement('div', { className: "group relative overflow-hidden rounded-3xl cursor-pointer magic-card shadow-[0_8px_40px_hsl(275_70%_52%_/_0.45)]"      , style: { minHeight: 320 }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 174}}
              , React.createElement('div', { className: "absolute inset-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 175}}
                , React.createElement('img', { src: "/hero-bg.png", alt: "", 'aria-hidden': true, className: "absolute inset-0 w-full h-full object-cover object-top opacity-12 scale-110 group-hover:scale-105 transition-transform duration-700 hue-rotate-[200deg] saturate-200"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 176}} )
              )
              , React.createElement('div', { className: "absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-700 to-fuchsia-800"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 178}} )
              , React.createElement('div', { className: "absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-900/60 to-transparent"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 179}} )
              , React.createElement('div', { className: "absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}} )

              , React.createElement('div', { className: "relative z-10 p-8 h-full flex flex-col justify-between"      , style: { minHeight: 320 }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 182}}
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 183}}
                  , React.createElement('div', { className: "flex items-center gap-2 mb-5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 184}}
                    , React.createElement('div', { className: "w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 185}}
                      , React.createElement(Heart, { className: "w-4 h-4 text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 186}} )
                    )
                    , React.createElement('span', { className: "text-xs uppercase tracking-[0.28em] text-white/80 font-bold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 188}}, l("Dimensión I · Propósito", "Dimension I · Purpose", "Dimensão I · Propósito"))
                  )
                  , React.createElement('h3', { className: "font-serif text-4xl font-light text-white mb-3 leading-tight"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 190}}, l("Propósito", "Purpose", "Propósito"))
                  , React.createElement('p', { className: "text-white/70 text-sm leading-relaxed max-w-xs"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 191}}
                    , l(
                      "Arquetipos, cursos de transformación, e-book y música sagrada. El viaje hacia adentro.",
                      "Archetypes, transformation courses, e-book and sacred music. The journey within.",
                      "Arquétipos, cursos de transformação, e-book e música sagrada. A jornada interior."
                    )
                  )
                )
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 199}}
                  , React.createElement('div', { className: "flex flex-wrap gap-2 mb-5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 200}}
                    , ["Dayllu", "E-book Numina", l("Cursos", "Courses", "Cursos"), l("Música", "Music", "Música"), "Mantras", l("Meditación", "Meditation", "Meditação"), "Podcast"].map((t) => (
                      React.createElement('span', { key: t, className: "text-xs bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full px-3 py-1 font-semibold"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 202}}, t)
                    ))
                  )
                  , React.createElement('div', { className: "flex items-center gap-2 text-sm text-white font-bold group-hover:gap-4 transition-all duration-300"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 205}}
                    , l("Explorar", "Explore", "Explorar"), " " , React.createElement(ArrowRight, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 206}} )
                  )
                )
              )
            )
          )

          /* IA — vivid red */
          , React.createElement(Link, { href: "/ia", __self: this, __source: {fileName: _jsxFileName, lineNumber: 214}}
            , React.createElement('div', { className: "group relative overflow-hidden rounded-3xl cursor-pointer magic-card shadow-[0_8px_40px_hsl(353_100%_48%_/_0.45)]"      , style: { minHeight: 320 }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 215}}
              , React.createElement('div', { className: "absolute inset-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 216}}
                , React.createElement('img', { src: "/hero-bg.png", alt: "", 'aria-hidden': true, className: "absolute inset-0 w-full h-full object-cover object-top opacity-10 scale-110 group-hover:scale-105 transition-transform duration-700 saturate-200"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 217}} )
              )
              , React.createElement('div', { className: "absolute inset-0 bg-gradient-to-br from-red-500 via-rose-600 to-red-800"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 219}} )
              , React.createElement('div', { className: "absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-red-900/60 to-transparent"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 220}} )
              , React.createElement('div', { className: "absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 221}} )

              , React.createElement('div', { className: "relative z-10 p-8 h-full flex flex-col justify-between"      , style: { minHeight: 320 }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 223}}
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 224}}
                  , React.createElement('div', { className: "flex items-center gap-2 mb-5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 225}}
                    , React.createElement('div', { className: "w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 226}}
                      , React.createElement(Brain, { className: "w-4 h-4 text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 227}} )
                    )
                    , React.createElement('span', { className: "text-xs uppercase tracking-[0.28em] text-white/80 font-bold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 229}}, l("Dimensión II · Inteligencia Artificial", "Dimension II · Artificial Intelligence", "Dimensão II · Inteligência Artificial"))
                  )
                  , React.createElement('h3', { className: "font-serif text-4xl font-light text-white mb-3 leading-tight"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 231}}, l("Inteligencia Artificial", "Artificial Intelligence", "Inteligência Artificial"))
                  , React.createElement('p', { className: "text-white/70 text-sm leading-relaxed max-w-xs"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 232}}
                    , l(
                      "Marketing con IA, prompts, agentes y directorio de herramientas. El viaje hacia afuera.",
                      "AI marketing, prompts, agents and tools directory. The journey outward.",
                      "Marketing com IA, prompts, agentes e diretório de ferramentas. A jornada exterior."
                    )
                  )
                )
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 240}}
                  , React.createElement('div', { className: "flex flex-wrap gap-2 mb-5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 241}}
                    , [l("E-book SOS-IA+P", "E-book SOS-IA+P", "E-book SOS-IA+P"), l("Cursos", "Courses", "Cursos"), "Prompts", l("Agentes", "Agents", "Agentes"), l("Directorio", "Directory", "Diretório")].map((t) => (
                      React.createElement('span', { key: t, className: "text-xs bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full px-3 py-1 font-semibold"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 243}}, t)
                    ))
                  )
                  , React.createElement('div', { className: "flex items-center gap-2 text-sm text-white font-bold group-hover:gap-4 transition-all duration-300"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 246}}
                    , l("Explorar", "Explore", "Explorar"), " " , React.createElement(ArrowRight, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 247}} )
                  )
                )
              )
            )
          )
        )
      )

      /* ── APPS ── */
      , React.createElement('section', { className: "px-8 md:px-12 mb-6"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 257}}
        , React.createElement(Link, { href: "/apps", __self: this, __source: {fileName: _jsxFileName, lineNumber: 258}}
          , React.createElement('div', { className: "group relative overflow-hidden rounded-3xl cursor-pointer magic-card border border-violet-200/60"       , style: { minHeight: 180 }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 259}}
            , React.createElement('div', { className: "absolute inset-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 260}}
              , React.createElement('img', { src: "/hero-bg.png", alt: "", 'aria-hidden': true, className: "absolute inset-0 w-full h-full object-cover object-center opacity-14 group-hover:opacity-22 transition-opacity duration-700 hue-rotate-[200deg]"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 261}} )
              , React.createElement('div', { className: "absolute inset-0 bg-gradient-to-r from-violet-100/95 via-fuchsia-50/88 to-rose-100/80"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 262}} )
            )
            , React.createElement('div', { className: "relative z-10 p-8 flex flex-col md:flex-row md:items-center gap-6 h-full"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 264}}
              , React.createElement('div', { className: "shrink-0 flex gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 265}}
                , React.createElement('div', { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-400/35"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 266}}
                  , React.createElement(Rocket, { className: "w-5 h-5 text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 267}} )
                )
                , React.createElement('div', { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-400/35"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 269}}
                  , React.createElement(FlaskConical, { className: "w-5 h-5 text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 270}} )
                )
              )
              , React.createElement('div', { className: "flex-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 273}}
                , React.createElement('div', { className: "flex items-center gap-2 mb-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 274}}
                  , React.createElement(Zap, { className: "w-3.5 h-3.5 text-violet-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 275}} )
                  , React.createElement('span', { className: "text-xs uppercase tracking-[0.28em] text-violet-700 font-bold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 276}}, l("Herramientas · Apps", "Tools · Apps", "Ferramentas · Apps"))
                )
                , React.createElement('h3', { className: "font-serif text-2xl md:text-3xl font-light text-foreground mb-2 leading-tight"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 278}}
                  , l("Apps Demo", "Demo Apps", "Apps Demo"), React.createElement('span', { className: "text-violet-600 font-semibold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 279}}, " & "  ), l("Apps Live", "Live Apps", "Apps Live")
                )
                , React.createElement('p', { className: "text-foreground/60 text-sm leading-relaxed max-w-lg"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}
                  , l(
                    "Todas las aplicaciones del ecosistema ACEAI: desde el arquetipo interactivo hasta el directorio de herramientas IA.",
                    "All applications in the ACEAI ecosystem: from the interactive archetype quiz to the AI tools directory.",
                    "Todas as aplicações do ecossistema ACEAI: desde o arquétipo interativo até o diretório de ferramentas IA."
                  )
                )
              )
              , React.createElement('div', { className: "shrink-0 flex items-center gap-2 text-sm text-violet-700 font-bold group-hover:gap-4 transition-all duration-300"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 289}}
                , l("Ver todas", "View all", "Ver todas"), " " , React.createElement(ArrowRight, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 290}} )
              )
            )
          )
        )
      )

      /* ── MAPAMUNDI RF ── */
      , React.createElement('section', { className: "px-8 md:px-12 mb-16"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 298}}
        , React.createElement(Link, { href: "/atlas", __self: this, __source: {fileName: _jsxFileName, lineNumber: 299}}
          , React.createElement('div', { className: "group relative overflow-hidden rounded-3xl cursor-pointer magic-card border border-red-200/60"       , style: { minHeight: 180 }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 300}}
            , React.createElement('div', { className: "absolute inset-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 301}}
              , React.createElement('img', { src: "/hero-bg.png", alt: "", 'aria-hidden': true, className: "absolute inset-0 w-full h-full object-cover object-center opacity-20 group-hover:opacity-28 transition-opacity duration-700"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 302}} )
              , React.createElement('div', { className: "absolute inset-0 bg-gradient-to-r from-red-100/95 via-rose-50/88 to-fuchsia-100/80"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 303}} )
            )
            , React.createElement('div', { className: "relative z-10 p-8 flex flex-col md:flex-row md:items-center gap-6 h-full"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 305}}
              , React.createElement('div', { className: "shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center shadow-lg shadow-red-400/35"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 306}}
                , React.createElement(Globe, { className: "w-7 h-7 text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 307}} )
              )
              , React.createElement('div', { className: "flex-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 309}}
                , React.createElement('div', { className: "flex items-center gap-2 mb-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 310}}
                  , React.createElement('span', { className: "text-xs uppercase tracking-[0.28em] text-red-700 font-bold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 311}}
                    , l("Comunidad · Nuevo", "Community · New", "Comunidade · Novo")
                  )
                  , React.createElement('span', { className: "text-[10px] bg-gradient-to-r from-primary to-rose-600 text-white rounded-full px-2.5 py-0.5 font-bold shadow-sm"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 314}}
                    , l("NUEVO", "NEW", "NOVO")
                  )
                )
                , React.createElement('h3', { className: "font-serif text-2xl md:text-3xl font-light text-foreground mb-2 leading-tight"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 318}}
                  , l("Mapamundi RF", "Mapamundi RF", "Mapamundi RF")
                  , React.createElement('span', { className: "text-red-600 font-semibold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 320}}, " — "  )
                  , l("Referentes Femeninas", "Female Leaders", "Referentes Femininas")
                )
                , React.createElement('p', { className: "text-foreground/60 text-sm leading-relaxed max-w-lg"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 323}}
                  , l(
                    "Mapa interactivo de mujeres emprendedoras e innovadoras alrededor del mundo. Descubre, inspírate y conecta.",
                    "Interactive map of women entrepreneurs and innovators around the world. Discover, get inspired and connect.",
                    "Mapa interativo de mulheres empreendedoras e inovadoras ao redor do mundo. Descubra, inspire-se e conecte-se."
                  )
                )
              )
              , React.createElement('div', { className: "shrink-0 flex items-center gap-2 text-sm text-red-700 font-bold group-hover:gap-4 transition-all duration-300"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 331}}
                , l("Explorar mapa", "Explore map", "Explorar mapa"), " " , React.createElement(ArrowRight, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 332}} )
              )
            )
          )
        )
      )

      /* ── QUOTE ── */
      , React.createElement('section', { className: "px-8 md:px-12 pb-16 relative"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 340}}
        , React.createElement('div', { className: "relative overflow-hidden rounded-3xl p-10 text-center"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 341}}
          , React.createElement('div', { className: "absolute inset-0 rounded-3xl overflow-hidden"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 342}}
            , React.createElement('img', { src: "/hero-bg.png", alt: "", 'aria-hidden': true, className: "absolute inset-0 w-full h-full object-cover object-top opacity-12"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 343}} )
            , React.createElement('div', { className: "absolute inset-0 bg-gradient-to-br from-rose-100/92 via-fuchsia-50/85 to-violet-100/88"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 344}} )
          )
          , React.createElement('div', { className: "relative z-10" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 346}}
            , React.createElement('div', { className: "flex items-center justify-center gap-3 mb-6"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 347}}
              , React.createElement('div', { className: "h-px w-16 bg-gradient-to-r from-transparent to-secondary/50"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 348}} )
              , React.createElement('span', { className: "text-secondary/70 sparkle" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 349}}, "✦")
              , React.createElement('span', { className: "text-gold/60 sparkle sparkle-delay-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 350}}, "✦")
              , React.createElement('span', { className: "text-accent/70 sparkle sparkle-delay-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 351}}, "✦")
              , React.createElement('div', { className: "h-px w-16 bg-gradient-to-l from-transparent to-accent/50"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 352}} )
            )
            , React.createElement('p', { className: "font-serif text-xl md:text-2xl text-foreground/80 italic max-w-2xl mx-auto leading-relaxed"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 354}}
              , l(
                '"La inteligencia artificial amplifica quien ya eres. Primero conoce quién eres."',
                '"Artificial intelligence amplifies who you already are. First know who you are."',
                '"A inteligência artificial amplifica quem você já é. Primeiro conheça quem você é."'
              )
            )
            , React.createElement('p', { className: "text-xs text-muted-foreground/50 mt-5 tracking-[0.25em] uppercase"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 361}}, "— ACEAI Online Marketing"   )
          )
        )
      )

    )
  );
}
