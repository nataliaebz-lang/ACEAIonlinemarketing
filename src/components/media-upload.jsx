import * as React from "react";
const _jsxFileName = ""; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/**
 * MediaUpload — admin drag-and-drop upload panel
 * Shows upload zone for admins, current file info, and delete option.
 * Used in mantras, courses, and any section that needs media management.
 */
import { useRef, useState } from "react";
import { Upload, Trash2, CheckCircle, AlertCircle, Loader2, File } from "lucide-react";










const ACCEPT = {
  audio: "audio/*",
  image: "image/*",
  pdf:   "application/pdf",
  video: "video/*",
  any:   "audio/*,image/*,video/*,application/pdf",
};

const CATEGORY_LABEL = {
  audio: "Audio (MP3, WAV, OGG)",
  image: "Imagen (JPG, PNG, WEBP)",
  pdf:   "PDF",
  video: "Video (MP4, WEBM)",
  any:   "Audio, Imagen, PDF o Video",
};

function fmtSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MediaUpload({ slug, category = "any", label, onUploaded }) {
  const token = _nullishCoalesce(localStorage.getItem("aceai_token"), () => ( ""));
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  async function doUpload(file) {
    setUploading(true);
    setProgress(0);
    setResult(null);

    const form = new FormData();
    form.append("file", file);

    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `/api/media/${encodeURIComponent(slug)}/upload`);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
      };
      xhr.onload = () => {
        setUploading(false);
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          setResult({ ok: true, msg: "Archivo subido correctamente", size: fmtSize(data.sizeBytes) });
          _optionalChain([onUploaded, 'optionalCall', _ => _(data.url)]);
        } else {
          setResult({ ok: false, msg: `Error: ${xhr.status}` });
        }
        resolve();
      };
      xhr.onerror = () => {
        setUploading(false);
        setResult({ ok: false, msg: "Error de conexión" });
        resolve();
      };
      xhr.send(form);
    });
  }

  function handleFiles(files) {
    if (!_optionalChain([files, 'optionalAccess', _2 => _2.length])) return;
    doUpload(files[0]);
  }

  return (
    React.createElement('div', { className: "rounded-2xl border border-dashed border-secondary/40 bg-white/50 p-5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}
      , React.createElement('p', { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
        , _nullishCoalesce(label, () => ( "Subir archivo")), " · "  , React.createElement('span', { className: "normal-case font-normal" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}, CATEGORY_LABEL[category])
      )

      /* Drop zone */
      , React.createElement('div', {
        className: `relative rounded-xl border-2 border-dashed transition-colors duration-200 cursor-pointer
          ${dragging ? "border-secondary bg-secondary/5" : "border-border hover:border-secondary/50 hover:bg-secondary/3"}`,
        onClick: () => _optionalChain([inputRef, 'access', _3 => _3.current, 'optionalAccess', _4 => _4.click, 'call', _5 => _5()]),
        onDragOver: (e) => { e.preventDefault(); setDragging(true); },
        onDragLeave: () => setDragging(false),
        onDrop: (e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}}

        , React.createElement('input', {
          ref: inputRef,
          type: "file",
          accept: ACCEPT[category],
          className: "hidden",
          onChange: (e) => handleFiles(e.target.files), __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}}
        )

        , React.createElement('div', { className: "flex flex-col items-center gap-2 py-8 px-4 text-center pointer-events-none"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}
          , uploading
            ? React.createElement(Loader2, { className: "w-8 h-8 text-secondary animate-spin"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 113}} )
            : React.createElement(Upload, { className: `w-8 h-8 ${dragging ? "text-secondary" : "text-muted-foreground/40"}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}} )
          
          , React.createElement('p', { className: "text-sm text-muted-foreground" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}}
            , uploading ? `Subiendo… ${progress}%` : "Arrastra aquí o haz clic para seleccionar"
          )
          , uploading && (
            React.createElement('div', { className: "w-full max-w-xs h-1.5 bg-muted rounded-full overflow-hidden mt-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}
              , React.createElement('div', { className: "h-full bg-gradient-to-r from-secondary to-fuchsia-500 rounded-full transition-all duration-200"      , style: { width: `${progress}%` }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}} )
            )
          )
        )
      )

      /* Result */
      , result && (
        React.createElement('div', { className: `mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${result.ok ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}
          , result.ok ? React.createElement(CheckCircle, { className: "w-3.5 h-3.5 shrink-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}} ) : React.createElement(AlertCircle, { className: "w-3.5 h-3.5 shrink-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}} )
          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 131}}, result.msg, result.size ? ` · ${result.size}` : "")
        )
      )
    )
  );
}

/* ── MediaInfo — shows current file status + delete button ── */





export function MediaInfo({ slug, onDeleted }) {
  const token = _nullishCoalesce(localStorage.getItem("aceai_token"), () => ( ""));
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  async function handleDelete() {
    if (!confirm("¿Eliminar este archivo?")) return;
    setDeleting(true);
    await fetch(`/api/media/${encodeURIComponent(slug)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setDeleting(false);
    setDeleted(true);
    _optionalChain([onDeleted, 'optionalCall', _6 => _6()]);
  }

  if (deleted) {
    return (
      React.createElement('div', { className: "text-xs text-muted-foreground flex items-center gap-1.5 mt-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 163}}
        , React.createElement(File, { className: "w-3.5 h-3.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 164}} ), " Archivo eliminado"
      )
    );
  }

  return (
    React.createElement('button', {
      onClick: handleDelete,
      disabled: deleting,
      className: "mt-3 flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 170}}

      , deleting ? React.createElement(Loader2, { className: "w-3.5 h-3.5 animate-spin"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 175}} ) : React.createElement(Trash2, { className: "w-3.5 h-3.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 175}} ), "Eliminar archivo actual"

    )
  );
}
