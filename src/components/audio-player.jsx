import * as React from "react";
const _jsxFileName = ""; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/**
 * AudioPlayer — styled HTML5 audio player with real range/seek support.
 * Fetches the authenticated stream URL and plays via Blob URL.
 */
import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Loader2, Volume2, VolumeX, Lock } from "lucide-react";








function fmtTime(s) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function AudioPlayer({ slug, title, gradient, available }) {
  const token = _nullishCoalesce(localStorage.getItem("aceai_token"), () => ( ""));
  const audioRef = useRef(null);
  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(null);
  const [fileExists, setFileExists] = useState(null);

  /* Check if file exists */
  useEffect(() => {
    if (!available) return;
    fetch(`/api/media/${encodeURIComponent(slug)}/info`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setFileExists(d.exists))
      .catch(() => setFileExists(false));
  }, [slug, token, available]);

  /* Load audio as Blob so auth token is used */
  async function loadAudio() {
    if (blobUrl) return; // already loaded
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/media/${encodeURIComponent(slug)}/stream`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);
    } catch (e) {
      setError("No se pudo cargar el audio");
    } finally {
      setLoading(false);
    }
  }

  /* Auto-play once blobUrl is ready */
  useEffect(() => {
    if (!blobUrl || !audioRef.current) return;
    audioRef.current.src = blobUrl;
    audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
  }, [blobUrl]);

  /* Cleanup blob on unmount */
  useEffect(() => {
    return () => { if (blobUrl) URL.revokeObjectURL(blobUrl); };
  }, [blobUrl]);

  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (!blobUrl) { loadAudio(); return; }
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play(); setPlaying(true); }
  }

  function handleSeek(e) {
    const a = audioRef.current;
    if (!a) return;
    const t = Number(e.target.value);
    a.currentTime = t;
    setCurrentTime(t);
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  /* Not available yet */
  if (!available) {
    return (
      React.createElement('div', { className: "flex items-center gap-3 mt-3 opacity-50"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 98}}
        , React.createElement('div', { className: "w-9 h-9 rounded-full bg-muted flex items-center justify-center"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}}
          , React.createElement(Lock, { className: "w-4 h-4 text-muted-foreground"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 100}} )
        )
        , React.createElement('span', { className: "text-xs text-muted-foreground" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 102}}, "Próximamente")
      )
    );
  }

  /* File not uploaded yet */
  if (fileExists === false) {
    return (
      React.createElement('div', { className: "flex items-center gap-3 mt-3 opacity-50"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}
        , React.createElement('div', { className: "w-9 h-9 rounded-full bg-muted flex items-center justify-center"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}
          , React.createElement(Lock, { className: "w-4 h-4 text-muted-foreground"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 112}} )
        )
        , React.createElement('span', { className: "text-xs text-muted-foreground" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}, "Audio pendiente de publicación"   )
      )
    );
  }

  return (
    React.createElement('div', { className: "mt-4 space-y-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}
      /* Hidden audio element */
      , React.createElement('audio', {
        ref: audioRef,
        muted: muted,
        onTimeUpdate: () => setCurrentTime(_nullishCoalesce(_optionalChain([audioRef, 'access', _ => _.current, 'optionalAccess', _2 => _2.currentTime]), () => ( 0))),
        onLoadedMetadata: () => setDuration(_nullishCoalesce(_optionalChain([audioRef, 'access', _3 => _3.current, 'optionalAccess', _4 => _4.duration]), () => ( 0))),
        onEnded: () => setPlaying(false),
        preload: "none", __self: this, __source: {fileName: _jsxFileName, lineNumber: 122}}
      )

      /* Controls row */
      , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}}
        /* Play/Pause */
        , React.createElement('button', {
          onClick: togglePlay,
          disabled: loading,
          className: `w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 shrink-0`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 134}}

          , loading
            ? React.createElement(Loader2, { className: "w-4 h-4 text-white animate-spin"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}} )
            : playing
            ? React.createElement(Pause, { className: "w-4 h-4 text-white fill-white"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}} )
            : React.createElement(Play, { className: "w-4 h-4 text-white fill-white ml-0.5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 143}} )
          
        )

        /* Seek bar */
        , React.createElement('div', { className: "flex-1 flex flex-col gap-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 148}}
          , React.createElement('div', { className: "relative h-1.5 rounded-full bg-black/10 overflow-hidden"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 149}}
            , React.createElement('div', {
              className: `absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${gradient} transition-none`,
              style: { width: `${progress}%` }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 150}}
            )
            , React.createElement('input', {
              type: "range",
              min: 0,
              max: duration || 100,
              step: 0.1,
              value: currentTime,
              onChange: handleSeek,
              className: "absolute inset-0 w-full opacity-0 cursor-pointer h-full"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 154}}
            )
          )
          , React.createElement('div', { className: "flex justify-between text-[9px] text-muted-foreground font-mono"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 164}}
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 165}}, fmtTime(currentTime))
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 166}}, fmtTime(duration))
          )
        )

        /* Mute + Restart */
        , React.createElement('button', { onClick: () => setMuted((m) => !m), className: "text-muted-foreground hover:text-foreground transition-colors"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 171}}
          , muted ? React.createElement(VolumeX, { className: "w-3.5 h-3.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 172}} ) : React.createElement(Volume2, { className: "w-3.5 h-3.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 172}} )
        )
        , React.createElement('button', {
          onClick: () => { if (audioRef.current) { audioRef.current.currentTime = 0; setCurrentTime(0); } },
          className: "text-muted-foreground hover:text-foreground transition-colors"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 174}}

          , React.createElement(RotateCcw, { className: "w-3.5 h-3.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 178}} )
        )
      )

      , error && React.createElement('p', { className: "text-[10px] text-red-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 182}}, error)
    )
  );
}
