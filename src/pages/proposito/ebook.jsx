import * as React from "react";
const _jsxFileName = ""; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { useState, useEffect, useRef } from "react";
import { BookOpen, Download, Upload, CheckCircle2, AlertCircle, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language";
import { useResource, useFileUrl } from "@/context/resources";

const BASE = import.meta.env.BASE_URL;
const API = "/api";

function authHeader() {
  const t = localStorage.getItem("aceai_token");
  return t ? { Authorization: `Bearer ${t}` } : {};
}

function fmtBytes(b) {
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
  return `${(b / 1024 / 1024).toFixed(1)} MB`;
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
}



/* ── TOC data extracted from the book ── */
const toc = [
  {
    label: "Apertura",
    entries: [
      { n: "★", t: "Empieza aquí · tu dolor tiene un mensaje (y una práctica de 3 minutos)" },
      { n: "★", t: "Qué es Numina (y cómo leer este libro)" },
    ],
  },
  {
    label: "Parte I · Los cimientos",
    entries: [
      { n: "01", t: "El dolor como brújula" },
      { n: "02", t: "El propósito se teje (80% psicología, 20% mecánica)" },
      { n: "03", t: "Tu estado crea tu química" },
      { n: "04", t: "El Águila y el Cóndor (y de dónde baja esto: los Q'ero)" },
      { n: "05", t: "Naciste afinada a una sola nota" },
      { n: "★", t: "La voz detrás del mapa · quién soy" },
    ],
  },
  {
    label: "Parte II · Los 4 niveles de percepción",
    entries: [
      { n: "★", t: "Los cuatro mundos · cuerpo, mente, alma, espíritu" },
      { n: "★", t: "Serpiente · cuerpo" },
      { n: "★", t: "El cuerpo y las adicciones" },
      { n: "★", t: "Jaguar · mente y emociones" },
      { n: "★", t: "Colibrí · alma" },
      { n: "★", t: "Águila-Cóndor · espíritu" },
      { n: "★", t: "La Tierra viva · Pachamama" },
    ],
  },
  {
    label: "Parte III · Los 12 arquetipos",
    entries: [
      { n: "1–6", t: "Los Radiadores (eléctricos · activan)" },
      { n: "7–12", t: "Los Equilibradores (magnéticos · integran)" },
    ],
  },
  {
    label: "Parte IV · La práctica viva",
    entries: [
      { n: "★", t: "Reconoce tu nota de partida" },
      { n: "★", t: "Las 7 fuerzas · 2 Respiraciones · 4 Mantras · Bonus" },
      { n: "★", t: "Prácticas: preguntas que abren · reclamar tu sombra" },
    ],
  },
  {
    label: "Cierre",
    entries: [
      { n: "★", t: "El Acorde 13 · tu Ser Luminoso" },
      { n: "★", t: "DAyllu · tu siguiente paso, tu comunidad" },
      { n: "★", t: "Fuentes e influencias · y mapas paralelos" },
    ],
  },
];

export default function Ebook() {
  const { lang } = useLanguage();
  const l = (es, en, pt) =>
    lang === "pt" ? (_nullishCoalesce(pt, () => ( es))) : lang === "en" ? en : es;
  const managed = useResource("/proposito/ebook");
  const fileUrl = useFileUrl();

  const [info, setInfo] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [uploadMsg, setUploadMsg] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch(`${API}/books/numina/info`, { headers: authHeader() })
      .then((r) => r.json())
      .then(setInfo)
      .catch(() => setInfo({ exists: false, admin: false }));
  }, []);

  // URL del libro en el idioma actual. Si el gestor /admin tiene un PDF asignado
  // (link gestionado) se usa; si no, el PDF estático servido desde /books.
  function bookUrl() {
    // 1º archivo subido desde /admin · 2º link gestionado · 3º PDF estático.
    if (managed && managed.fileLangs && managed.fileLangs.length) return fileUrl(7, lang);
    return (managed && managed.link) || `${BASE}books/numina-${lang}.pdf`;
  }
  // Abre el libro para leerlo (visor PDF del navegador; desde ahí se descarga).
  function handleDownload() {
    window.open(bookUrl(), "_blank", "noopener");
  }

  async function handleUpload(file) {
    if (!file.type.includes("pdf")) {
      setUploadResult("error");
      setUploadMsg(l("Solo se aceptan archivos PDF.", "Only PDF files are accepted.", "Apenas arquivos PDF são aceitos."));
      return;
    }
    setUploading(true);
    setUploadResult(null);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const r = await fetch(`${API}/books/numina/upload`, { method: "POST", headers: authHeader(), body: fd });
      const data = await r.json();
      if (r.ok) {
        setUploadResult("ok");
        setUploadMsg(l("PDF subido correctamente.", "PDF uploaded successfully.", "PDF enviado com sucesso."));
        setInfo((prev) => prev ? { ...prev, exists: true, sizeBytes: data.sizeBytes, uploadedAt: data.uploadedAt } : prev);
      } else {
        setUploadResult("error");
        setUploadMsg(_nullishCoalesce(data.error, () => ( l("Error al subir.", "Upload error.", "Erro ao enviar."))));
      }
    } catch (e3) {
      setUploadResult("error");
      setUploadMsg(l("Error de red.", "Network error.", "Erro de rede."));
    } finally {
      setUploading(false);
    }
  }

  return (
    React.createElement('div', { className: "flex flex-col h-[calc(100vh-4rem)]"  , 'data-testid': "ebook-page", __self: this, __source: {fileName: _jsxFileName, lineNumber: 153}}

      /* ── Top bar ── */
      , React.createElement('div', { className: "flex items-center gap-3 px-6 py-3 border-b border-border/60 bg-background/80 backdrop-blur shrink-0"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}}
        , React.createElement(BookOpen, { className: "w-4 h-4 text-secondary shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 157}} )
        , React.createElement('p', { className: "font-serif text-sm text-foreground/80 flex-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}}
          , l("E-book Numina · El Acorde 13", "Numina E-book · The 13th Chord", "E-book Numina · O Acorde 13")
        )
        , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 161}}
          /* TOC toggle */
          , React.createElement(Button, {
            size: "sm",
            variant: "ghost",
            className: "gap-1.5 text-xs text-muted-foreground"  ,
            onClick: () => setTocOpen((o) => !o), __self: this, __source: {fileName: _jsxFileName, lineNumber: 163}}

            , tocOpen ? React.createElement(ChevronUp, { className: "w-3.5 h-3.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 169}} ) : React.createElement(ChevronDown, { className: "w-3.5 h-3.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 169}} )
            , l("Índice", "Contents", "Índice")
          )

          , _optionalChain([info, 'optionalAccess', _ => _.exists]) && (
            React.createElement(Button, {
              size: "sm",
              variant: "outline",
              className: "gap-1.5 text-xs" ,
              onClick: handleDownload,
              disabled: downloading, __self: this, __source: {fileName: _jsxFileName, lineNumber: 174}}

              , downloading
                ? React.createElement(Loader2, { className: "w-3.5 h-3.5 animate-spin"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 182}} )
                : React.createElement(Download, { className: "w-3.5 h-3.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 183}} )
              , l("Leer / Descargar", "Read / Download", "Ler / Baixar")
            )
          )

          , _optionalChain([info, 'optionalAccess', _2 => _2.admin]) && (
            React.createElement('label', { className: "cursor-pointer", __self: this, __source: {fileName: _jsxFileName, lineNumber: 189}}
              , React.createElement('input', {
                ref: fileInputRef,
                type: "file",
                accept: "application/pdf",
                className: "hidden",
                onChange: (e) => { const f = _optionalChain([e, 'access', _3 => _3.target, 'access', _4 => _4.files, 'optionalAccess', _5 => _5[0]]); if (f) handleUpload(f); }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 190}}
              )
              , React.createElement(Button, { size: "sm", variant: "ghost", className: "gap-1.5 text-xs text-muted-foreground"  , asChild: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 197}}
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 198}}
                  , uploading
                    ? React.createElement(Loader2, { className: "w-3.5 h-3.5 animate-spin"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 200}} )
                    : React.createElement(Upload, { className: "w-3.5 h-3.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 201}} )
                  , l("Subir PDF", "Upload PDF", "Enviar PDF")
                )
              )
            )
          )
        )
      )

      /* Upload feedback */
      , uploadResult && (
        React.createElement('div', { className: `flex items-center gap-2 px-6 py-2 text-xs shrink-0 ${uploadResult === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 212}}
          , uploadResult === "ok"
            ? React.createElement(CheckCircle2, { className: "w-3.5 h-3.5 shrink-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 214}} )
            : React.createElement(AlertCircle, { className: "w-3.5 h-3.5 shrink-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 215}} )
          , uploadMsg
          , _optionalChain([info, 'optionalAccess', _6 => _6.exists]) && info.sizeBytes && (
            React.createElement('span', { className: "ml-2 text-muted-foreground" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 218}}
              , fmtBytes(info.sizeBytes), info.uploadedAt ? ` · ${fmtDate(info.uploadedAt)}` : ""
            )
          )
        )
      )

      /* ── TOC drawer ── */
      , tocOpen && (
        React.createElement('div', { className: "shrink-0 overflow-y-auto max-h-72 border-b border-border/60 bg-white/70 backdrop-blur px-6 py-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 227}}
          , React.createElement('p', { className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 mb-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 228}}
            , l("Mapa del camino", "Map of the Journey", "Mapa do Caminho")
          )
          , React.createElement('div', { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 231}}
            , toc.map((group) => (
              React.createElement('div', { key: group.label, __self: this, __source: {fileName: _jsxFileName, lineNumber: 233}}
                , React.createElement('p', { className: "text-[10px] font-semibold uppercase tracking-widest text-secondary mb-1.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 234}}, group.label)
                , group.entries.map((e) => (
                  React.createElement('div', { key: e.t, className: "flex items-baseline gap-2 py-1 border-b border-border/30 last:border-0"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 236}}
                    , React.createElement('span', { className: "text-[10px] font-mono text-muted-foreground/50 shrink-0 w-6 text-right"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 237}}, e.n === "★" ? "·" : e.n)
                    , React.createElement('span', { className: "text-xs text-foreground/75 leading-snug"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 238}}, e.t)
                  )
                ))
              )
            ))
          )
        )
      )

      /* ── HTML book viewer ── */
      , React.createElement('iframe', {
        src: `${BASE}numina-ebook.html`,
        className: "flex-1 w-full border-0"  ,
        title: l("E-book Numina", "Numina E-book", "E-book Numina"), __self: this, __source: {fileName: _jsxFileName, lineNumber: 248}}
      )
    )
  );
}
