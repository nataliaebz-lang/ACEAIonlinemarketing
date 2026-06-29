import * as React from "react";
const _jsxFileName = ""; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { Link, useLocation } from "wouter";
import {
  Heart, BookOpen, Crown, Music, Sparkles,
  Brain, FileText, Bot, Compass, Menu, X, Rocket, List, LogOut, Globe, FlaskConical, Wand2,
  Users2, Flame, Cpu, LayoutGrid
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StarField } from "@/components/star-field";
import { useLanguage, } from "@/context/language";
import { useAuth } from "@/context/auth";

export function Layout({ children }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, l } = useLanguage();
  const { member, logout } = useAuth();

  const displayName = _optionalChain([member, 'optionalAccess', _ => _.firstName])
    ? `${member.firstName}${member.lastName ? " " + member.lastName : ""}`
    : _nullishCoalesce(_optionalChain([member, 'optionalAccess', _2 => _2.email]), () => ( l("Miembro Fundadora", "Founding Member", "Membro Fundadora")));
  const initials = _optionalChain([member, 'optionalAccess', _3 => _3.firstName]) && _optionalChain([member, 'optionalAccess', _4 => _4.lastName])
    ? `${member.firstName[0]}${member.lastName[0]}`.toUpperCase()
    : _optionalChain([member, 'optionalAccess', _5 => _5.firstName])
    ? member.firstName.slice(0, 2).toUpperCase()
    : "PMF";

  const comunidadLinks = [
    { href: "/atlas", label: l("Mapamundi RF", "Mapamundi RF", "Mapamundi RF"), icon: Globe },
  ];

  const appsLinks = [
    { href: "/apps",   label: l("Apps Demo & Live", "Apps Demo & Live", "Apps Demo & Live"), icon: FlaskConical },
    { href: "/studio", label: "ACEAI Studio",                                                 icon: Wand2 },
  ];

  const propositoLinks = [
    { href: "/proposito",                  label: l("El Camino", "The Path", "O Caminho"),                         icon: Compass },
    { href: "/proposito/arquetipo",         label: l("App Arquetipo", "Archetype Quiz", "App Arquétipo"),           icon: Crown },
    { href: "/proposito/ebook",            label: l("E-book Numina", "Numina E-book", "E-book Numina"),              icon: BookOpen },
    { href: "/proposito/curso-7-dias",     label: l("Curso 7 Días", "7-Day Course", "Curso 7 Dias"),                icon: Sparkles },
    { href: "/proposito/curso-40-dias",    label: l("Curso 41 Días", "41-Day Course", "Curso 41 Dias"),             icon: Heart },
    { href: "/proposito/programa-6-meses", label: l("Programa 6 Meses", "6-Month Programme", "Programa 6 Meses"),   icon: Crown },
    { href: "/proposito/dayllu",           label: l("Música Dayllu", "Dayllu Music", "Música Dayllu"),              icon: Music },
  ];

  const iaLinks = [
    { href: "/ia",                   label: l("Centro IA", "AI Center", "Centro IA"),                          icon: Brain },
    { href: "/ia/libro",             label: "E-book SOS-IA+P",                                                  icon: BookOpen },
    { href: "/ia/curso-7-dias",      label: l("Curso 7 Días IA", "7-Day AI Course", "Curso 7 Dias IA"),        icon: Rocket },
    { href: "/ia/curso-40-dias",     label: l("Curso 41 Días IA", "41-Day AI Course", "Curso 41 Dias IA"),     icon: Sparkles },
    { href: "/ia/programa-avanzado", label: l("Programa Avanzado", "Advanced Programme", "Programa Avançado"), icon: Crown },
    { href: "/ia/prompts",           label: l("Biblioteca Prompts", "Prompt Library", "Biblioteca Prompts"),   icon: FileText },
    { href: "/ia/agentes",           label: l("Agentes IA", "AI Agents", "Agentes IA"),                        icon: Bot },
    { href: "/ia/directorio",        label: l("Directorio", "Directory", "Diretório"),                         icon: List },
  ];

  const isActive = (href) =>
    location === href ||
    (location.startsWith(href) && href !== "/proposito" && href !== "/ia");

  const LANGS = [
    { code: "es", label: "ES" },
    { code: "en", label: "EN" },
    { code: "pt", label: "PT" },
  ];

  const LangSwitcher = ({ className }) => (
    React.createElement('div', { className: cn("flex items-center rounded-full border border-border bg-white/60 p-0.5 gap-0.5", className), __self: this, __source: {fileName: _jsxFileName, lineNumber: 72}}
      , LANGS.map(({ code, label }) => (
        React.createElement('button', {
          key: code,
          onClick: () => setLang(code),
          className: cn(
            "text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full transition-all",
            lang === code
              ? "bg-primary text-white shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 74}}

          , label
        )
      ))
    )
  );

  const NavLinks = ({
    links, title, sectionIcon: SectionIcon,
  }



) => (
    React.createElement('div', { className: "mb-7", __self: this, __source: {fileName: _jsxFileName, lineNumber: 97}}
      , React.createElement('h3', { className: "label-cosmos mb-3 px-4 flex items-center gap-1.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 98}}
        , SectionIcon && React.createElement(SectionIcon, { className: "w-3 h-3 opacity-60"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}} )
        , title
      )
      , React.createElement('div', { className: "space-y-0.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 102}}
        , links.map((link) => {
          const active = isActive(link.href);
          return (
            React.createElement(Link, { key: link.href, href: link.href, onClick: () => setMobileMenuOpen(false), __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}}
              , React.createElement('div', {
                className: cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group cursor-pointer shimmer-hover",
                  active
                    ? "nav-active"
                    : "text-foreground/60 hover:text-foreground hover:bg-black/5"
                ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}

                , React.createElement(link.icon, { className: cn(
                  "w-4 h-4 transition-colors shrink-0",
                  active ? "text-primary drop-shadow-sm" : "text-foreground/35 group-hover:text-foreground/65"
                ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}} )
                , React.createElement('span', { className: active ? "font-semibold" : "", __self: this, __source: {fileName: _jsxFileName, lineNumber: 119}}, link.label)
                , active && (
                  React.createElement('span', { className: "ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}} )
                )
              )
            )
          );
        })
      )
    )
  );

  return (
    React.createElement('div', { className: "min-h-screen bg-background text-foreground flex flex-col md:flex-row overflow-hidden selection:bg-primary/20 selection:text-primary relative"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}}
      , React.createElement(StarField, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 133}} )

      /* Mobile Header */
      , React.createElement('div', { className: "md:hidden flex items-center justify-between p-4 border-b border-border glass sticky top-0 z-50"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 136}}
        , React.createElement(Link, { href: "/", __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}
          , React.createElement('img', { src: "/aceai-logo-red.jpg", alt: "ACEAI", className: "h-8 cursor-pointer" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}} )
        )
        , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}}
          , React.createElement(LangSwitcher, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 141}} )
          , React.createElement(Button, { variant: "ghost", size: "icon", onClick: () => setMobileMenuOpen(!mobileMenuOpen), __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}}
            , mobileMenuOpen ? React.createElement(X, { className: "w-5 h-5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 143}} ) : React.createElement(Menu, { className: "w-5 h-5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 143}} )
          )
        )
      )

      /* Sidebar */
      , React.createElement('aside', { className: cn(
        "fixed inset-y-0 left-0 z-40 w-72 flex flex-col transition-transform duration-500 ease-in-out md:translate-x-0 md:static glass border-r border-white/60",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 149}}
        /* Rainbow top line */
        , React.createElement('div', {
          className: "absolute top-0 left-0 right-0 h-1 z-10"     ,
          style: {
            background: "linear-gradient(90deg, hsl(353 100% 48%), hsl(344 85% 58%), hsl(275 70% 55%), hsl(42 90% 54%), hsl(190 80% 52%), hsl(275 70% 55%), hsl(344 85% 58%), hsl(353 100% 48%))",
            backgroundSize: "400% 100%",
            animation: "gradient-drift 3s linear infinite",
            boxShadow: "0 0 12px hsl(344 85% 58% / 0.6), 0 0 24px hsl(353 100% 48% / 0.3)",
          }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 154}}
        )

        /* Logo + Language */
        , React.createElement('div', { className: "p-8 pb-5 flex items-center justify-between border-b border-white/50 pt-9"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 165}}
          , React.createElement(Link, { href: "/", __self: this, __source: {fileName: _jsxFileName, lineNumber: 166}}
            , React.createElement('img', {
              src: "/aceai-logo-red.jpg",
              alt: "ACEAI",
              className: "w-24 cursor-pointer transition-all duration-300 hover:scale-105 hover:drop-shadow-md"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 167}}
            )
          )
          , React.createElement(LangSwitcher, { className: "hidden md:flex" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 173}} )
        )

        , React.createElement(ScrollArea, { className: "flex-1 px-4 py-6"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 176}}
          , React.createElement(NavLinks, { links: comunidadLinks, title: l("Comunidad", "Community", "Comunidade"), sectionIcon: Users2, __self: this, __source: {fileName: _jsxFileName, lineNumber: 177}} )
          , React.createElement(NavLinks, { links: appsLinks, title: "Apps", sectionIcon: LayoutGrid, __self: this, __source: {fileName: _jsxFileName, lineNumber: 178}} )
          , React.createElement(NavLinks, { links: propositoLinks, title: l("Propósito", "Purpose", "Propósito"), sectionIcon: Flame, __self: this, __source: {fileName: _jsxFileName, lineNumber: 179}} )
          , React.createElement(NavLinks, { links: iaLinks, title: l("Inteligencia Artificial", "Artificial Intelligence", "Inteligência Artificial"), sectionIcon: Cpu, __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}} )
        )

        /* Member card */
        , React.createElement('div', { className: "p-4 border-t border-white/50"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 184}}
          , React.createElement('div', {
            className: "relative overflow-hidden flex items-center gap-3 p-3.5 rounded-2xl"      ,
            style: {
              background: "linear-gradient(135deg, rgba(255,255,255,0.9), hsl(344 80% 97% / 0.85))",
              boxShadow: "0 4px 24px hsl(344 80% 58% / 0.22), 0 1px 0 rgba(255,255,255,0.95), inset 0 0 0 1px hsl(344 80% 70% / 0.20)",
            }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 185}}

            , React.createElement('div', {
              className: "absolute inset-0 rounded-2xl opacity-60"   ,
              style: {
                background: "linear-gradient(135deg, hsl(353 100% 45% / 0.25), hsl(344 36% 55% / 0.2), hsl(275 36% 48% / 0.2))",
                padding: 1,
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 192}}
            )
            , React.createElement(Avatar, { className: "h-10 w-10 border-2 border-white shadow-sm shrink-0"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 202}}
              , React.createElement(AvatarFallback, { className: "bg-gradient-to-br from-primary/20 to-accent/20 text-primary text-sm font-serif"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 203}}, initials)
            )
            , React.createElement('div', { className: "relative z-10 flex-1 min-w-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 205}}
              , React.createElement('p', { className: "text-sm font-semibold text-foreground truncate"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 206}}, displayName)
              , React.createElement('p', { className: "text-xs text-secondary flex items-center gap-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 207}}
                , React.createElement('span', { className: "w-1.5 h-1.5 rounded-full bg-secondary inline-block animate-pulse"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 208}} )
                , l("Miembro Fundadora", "Founding Member", "Membro Fundadora")
              )
            )
            , React.createElement('button', {
              onClick: () => logout(),
              title: l("Cerrar sesión", "Sign out", "Sair"),
              className: "relative z-10 p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/8 transition-all shrink-0"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 212}}

              , React.createElement(LogOut, { className: "w-3.5 h-3.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 217}} )
            )
          )
        )
      )

      /* Mobile overlay */
      , mobileMenuOpen && (
        React.createElement('div', {
          className: "fixed inset-0 bg-black/15 backdrop-blur-sm z-30 md:hidden"     ,
          onClick: () => setMobileMenuOpen(false), __self: this, __source: {fileName: _jsxFileName, lineNumber: 225}}
        )
      )

      /* Main Content */
      , React.createElement('main', { className: "flex-1 h-screen overflow-y-auto relative z-10"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 232}}
        , React.createElement('div', { className: "max-w-6xl mx-auto min-h-full"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 233}}
          , children
        )
      )
    )
  );
}
