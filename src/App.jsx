import * as React from "react";
const _jsxFileName = "";import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";
import { LanguageProvider } from "@/context/language";
import { AuthProvider, useAuth } from "@/context/auth";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";

// Hubs
import Home from "@/pages/home";
import PropositoOverview from "@/pages/proposito/index";
import IAOverview from "@/pages/ia/index";

// Proposito Wing
import ArquetipoApp from "@/pages/proposito/arquetipo";
import Ebook from "@/pages/proposito/ebook";
import Curso7Dias from "@/pages/proposito/curso-7-dias";
import Curso40Dias from "@/pages/proposito/curso-40-dias";
import Programa6Meses from "@/pages/proposito/programa-6-meses";
import Dayllu from "@/pages/proposito/dayllu";
import MantrasPage from "@/pages/proposito/mantras";

// Atlas
import Atlas from "@/pages/atlas";
import Apps from "@/pages/apps";

// Studio
import StudioPage from "@/pages/studio/index";

// IA Wing
import LibroIA from "@/pages/ia/libro";
import Curso7DiasIA from "@/pages/ia/curso-7-dias";
import Curso40DiasIA from "@/pages/ia/curso-40-dias";
import ProgramaAvanzado from "@/pages/ia/programa-avanzado";
import PromptsLibrary from "@/pages/ia/prompts";
import AgentesIA from "@/pages/ia/agentes";
import DirectorioIA from "@/pages/ia/directorio";

const queryClient = new QueryClient();

function ProtectedRouter() {
  const { member, loading } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) {
    return (
      React.createElement('div', { className: "min-h-screen flex items-center justify-center bg-[#FAF7F4]"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}
        , React.createElement('div', { className: "w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}} )
      )
    );
  }

  if (!member) {
    return React.createElement(Login, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 56}} );
  }

  return (
    React.createElement(Layout, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 60}}
      , React.createElement(Switch, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 61}}
        , React.createElement(Route, { path: "/", component: Home, __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}} )
        , React.createElement(Route, { path: "/atlas", component: Atlas, __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}} )
        , React.createElement(Route, { path: "/apps", component: Apps, __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}} )
        , React.createElement(Route, { path: "/proposito", component: PropositoOverview, __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}} )
        , React.createElement(Route, { path: "/proposito/arquetipo", component: ArquetipoApp, __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}} )
        , React.createElement(Route, { path: "/proposito/ebook", component: Ebook, __self: this, __source: {fileName: _jsxFileName, lineNumber: 67}} )
        , React.createElement(Route, { path: "/proposito/curso-7-dias", component: Curso7Dias, __self: this, __source: {fileName: _jsxFileName, lineNumber: 68}} )
        , React.createElement(Route, { path: "/proposito/curso-40-dias", component: Curso40Dias, __self: this, __source: {fileName: _jsxFileName, lineNumber: 69}} )
        , React.createElement(Route, { path: "/proposito/programa-6-meses", component: Programa6Meses, __self: this, __source: {fileName: _jsxFileName, lineNumber: 70}} )
        , React.createElement(Route, { path: "/proposito/dayllu", component: Dayllu, __self: this, __source: {fileName: _jsxFileName, lineNumber: 71}} )
        , React.createElement(Route, { path: "/proposito/mantras", component: MantrasPage, __self: this, __source: {fileName: _jsxFileName, lineNumber: 72}} )
        , React.createElement(Route, { path: "/ia", component: IAOverview, __self: this, __source: {fileName: _jsxFileName, lineNumber: 73}} )
        , React.createElement(Route, { path: "/ia/libro", component: LibroIA, __self: this, __source: {fileName: _jsxFileName, lineNumber: 74}} )
        , React.createElement(Route, { path: "/ia/curso-7-dias", component: Curso7DiasIA, __self: this, __source: {fileName: _jsxFileName, lineNumber: 75}} )
        , React.createElement(Route, { path: "/ia/curso-40-dias", component: Curso40DiasIA, __self: this, __source: {fileName: _jsxFileName, lineNumber: 76}} )
        , React.createElement(Route, { path: "/ia/programa-avanzado", component: ProgramaAvanzado, __self: this, __source: {fileName: _jsxFileName, lineNumber: 77}} )
        , React.createElement(Route, { path: "/ia/prompts", component: PromptsLibrary, __self: this, __source: {fileName: _jsxFileName, lineNumber: 78}} )
        , React.createElement(Route, { path: "/ia/agentes", component: AgentesIA, __self: this, __source: {fileName: _jsxFileName, lineNumber: 79}} )
        , React.createElement(Route, { path: "/ia/directorio", component: DirectorioIA, __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}} )
        , React.createElement(Route, { path: "/studio", component: StudioPage, __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}} )
        , React.createElement(Route, { component: NotFound, __self: this, __source: {fileName: _jsxFileName, lineNumber: 82}} )
      )
    )
  );
}

function App() {
  return (
    React.createElement(LanguageProvider, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
      , React.createElement(AuthProvider, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
        , React.createElement(QueryClientProvider, { client: queryClient, __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}
          , React.createElement(TooltipProvider, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 93}}
            , React.createElement(WouterRouter, { base: import.meta.env.BASE_URL.replace(/\/$/, ""), __self: this, __source: {fileName: _jsxFileName, lineNumber: 94}}
              , React.createElement(ProtectedRouter, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 95}} )
            )
            , React.createElement(Toaster, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 97}} )
          )
        )
      )
    )
  );
}

export default App;
