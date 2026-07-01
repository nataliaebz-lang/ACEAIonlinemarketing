import * as React from "react";
const _jsxFileName = ""; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Music, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/context/language";
import { SectionUpload } from "@/components/section-upload";

const BASE = import.meta.env.BASE_URL;


function fmtTime(secs) {
  if (!isFinite(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Dayllu() {
  const { lang } = useLanguage();
  const l = (es, en, pt) =>
    lang === "pt" ? (_nullishCoalesce(pt, () => ( es))) : lang === "en" ? en : es;

  const tracks = [
    {
      id: 1,
      title: l("La Quietud Interior · Om Tare Tuttare Ture Soha", "The Calm Within · Om Tare Tuttare Ture Soha", "A Quietude Interior"),
      titleEn: "The Calm Within",
      artist: "DAyllu",
      file: `${BASE}music/the-calm-within.mp3`,
    },
    {
      id: 2,
      title: l("¡Ya Está!", "Enough!", "Já Está!"),
      titleEn: "Enough!",
      artist: "DAyllu",
      file: `${BASE}music/enough-ya-esta.mp3`,
    },
    {
      id: 3,
      title: "DAyllu Action",
      titleEn: "DAyllu Action",
      artist: "DAyllu",
      file: `${BASE}music/dayllu-action.mp3`,
    },
    {
      id: 4,
      title: l("Despierta Tu Corazón", "Let Your Heart Awaken", "Desperta Seu Coração"),
      titleEn: "Let Your Heart Awaken",
      artist: "DAyllu",
      file: `${BASE}music/let-your-heart-awaken.mp3`,
    },
    {
      id: 5,
      title: l("María Madre Sabiduría", "Mary Mother of Wisdom", "Maria Mãe Sabedoria"),
      titleEn: "Mary Mother of Wisdom",
      artist: "DAyllu",
      file: `${BASE}music/mary-mother-of-wisdom.mp3`,
    },
    {
      id: 6,
      title: l("Calma tu Mente · Om Tare Tuttare Soha", "Calm Your Mind · Om Tare Tuttare Soha", "Acalme sua Mente"),
      titleEn: "Calm Your Mind · Om Tare Soha",
      artist: "DAyllu",
      file: `${BASE}music/calma-tu-mente.mp3`,
    },
    {
      id: 7,
      title: "DAyllu Heart",
      titleEn: "DAyllu Heart",
      artist: "DAyllu",
      file: `${BASE}music/dayllu-heart.mp3`,
    },
    {
      id: 8,
      title: l("Rompiendo Cadenas", "Breaking Chains", "Quebrando Correntes"),
      titleEn: "Breaking Chains",
      artist: "DAyllu",
      file: `${BASE}music/breaking-chains.mp3`,
    },
    {
      id: 9,
      title: l("Activa tu Propósito", "Activate Your Purpose", "Ativa seu Propósito"),
      titleEn: "Activate Your Purpose",
      artist: "DAyllu",
      file: `${BASE}music/activa-tu-proposito.mp3`,
    },
    {
      id: 10,
      title: "Soulful Jazz",
      titleEn: "Soulful Jazz",
      artist: "DAyllu",
      file: `${BASE}music/soulful-jazz.mp3`,
    },
    {
      id: 11,
      title: "Nita Ochun",
      titleEn: "Nita Ochun",
      artist: "DAyllu",
      file: `${BASE}music/nita-ochun.mp3`,
    },
    {
      id: 12,
      title: l("El mundo exterior gira...", "The World Outside is Spinning...", "O mundo lá fora está girando..."),
      titleEn: "The World Outside is Spinning...",
      artist: "DAyllu",
      file: `${BASE}music/the-world-outside.mp3`,
    },
    {
      id: 13,
      title: "Ide Were Were Nita Ochun",
      titleEn: "Ide Were Were Nita Ochun",
      artist: "DAyllu",
      file: `${BASE}music/ide-were-were.mp3`,
    },
  ];

  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [volume, setVolume] = useState([70]);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTrack = tracks[current];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = currentTrack.file;
    audio.volume = volume[0] / 100;
    audio.load();
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    }
  }, [current]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume[0] / 100;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration || 0);
    setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
  };

  const handleEnded = () => {
    if (current < tracks.length - 1) {
      setCurrent(c => c + 1);
    } else {
      setPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    }
  };

  const handleSeek = (pct) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = (pct[0] / 100) * audio.duration;
    setProgress(pct[0]);
  };

  const selectTrack = (i) => {
    if (i === current) {
      setPlaying(p => !p);
    } else {
      setCurrent(i);
      setPlaying(true);
    }
  };

  return (
    React.createElement('div', { className: "px-0 py-0" , 'data-testid': "dayllu-page", __self: this, __source: {fileName: _jsxFileName, lineNumber: 190}}
      , React.createElement('div', { className: "px-6 pt-6" }, React.createElement(SectionUpload, { route: "/proposito/dayllu" }))
      , React.createElement('audio', {
        ref: audioRef,
        onTimeUpdate: handleTimeUpdate,
        onLoadedMetadata: handleTimeUpdate,
        onEnded: handleEnded,
        preload: "metadata", __self: this, __source: {fileName: _jsxFileName, lineNumber: 191}}
      )

      /* ── HEADER ── */
      , React.createElement('div', { className: "px-6 pt-10 pb-6 md:px-10"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 200}}
        , React.createElement('div', { className: "flex items-center gap-2 mb-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 201}}
          , React.createElement(Sparkles, { className: "w-4 h-4 text-accent"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 202}} )
          , React.createElement('span', { className: "text-xs uppercase tracking-[0.25em] text-accent"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 203}}
            , l("Propósito · DAyllu", "Purpose · DAyllu", "Propósito · DAyllu")
          )
        )
        , React.createElement('h1', { className: "font-serif text-4xl font-light mb-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 207}}
          , l("App DAyllu — Tu Arquetipo Universal", "DAyllu App — Your Universal Archetype", "App DAyllu — Seu Arquétipo Universal")
        )
        , React.createElement('p', { className: "text-muted-foreground max-w-2xl" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 210}}
          , l(
            "Descubre cuál de los 12 arquetipos universales rige tu propósito de vida. Completa el formulario y recibe tu resultado al instante.",
            "Discover which of the 12 universal archetypes governs your life purpose. Complete the form and get your result instantly.",
            "Descubra qual dos 12 arquétipos universais rege o seu propósito de vida. Preencha o formulário e receba seu resultado na hora."
          )
        )
      )

      /* ── DAYLLU ARCHETYPE APP (iframe) ── */
      , React.createElement('div', { className: "w-full", __self: this, __source: {fileName: _jsxFileName, lineNumber: 220}}
        , React.createElement('iframe', {
          src: `${BASE}dayllu-app.html`,
          title: "DAyllu — Arquetipo Universal"   ,
          className: "w-full border-0" ,
          style: { minHeight: "820px", height: "100vh", maxHeight: "1200px" },
          allow: "clipboard-write",
          'data-testid': "dayllu-iframe", __self: this, __source: {fileName: _jsxFileName, lineNumber: 221}}
        )
      )

      /* ── MÚSICA DAYLLU ── */
      , React.createElement('div', { className: "px-6 pt-12 pb-10 md:px-10"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 232}}
        , React.createElement('div', { className: "flex items-center gap-2 mb-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 233}}
          , React.createElement(Music, { className: "w-4 h-4 text-accent/60"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 234}} )
          , React.createElement('span', { className: "text-xs uppercase tracking-[0.25em] text-accent/60"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 235}}
            , l("Música Sagrada", "Sacred Music", "Música Sagrada")
          )
        )
        , React.createElement('h2', { className: "font-serif text-2xl font-light mb-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 239}}
          , l("Música Dayllu", "Dayllu Music", "Música Dayllu")
        )
        , React.createElement('p', { className: "text-muted-foreground text-sm mb-8 max-w-lg"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 242}}
          , l(
            "Sonidos sagrados para acompañar tu viaje interior.",
            "Sacred sounds to accompany your inner journey.",
            "Sons sagrados para acompanhar sua jornada interior."
          )
        )

        , React.createElement('div', { className: "grid md:grid-cols-2 gap-8"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 250}}
          /* Player */
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 252}}
            , React.createElement('div', { className: "bg-gradient-to-br from-indigo-50 to-violet-50 border border-accent/20 rounded-3xl p-8 mb-6 text-center"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 253}}
              , React.createElement('div', { className: "relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-violet-100 to-indigo-100 border-2 border-accent/30 flex items-center justify-center shadow-xl"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 254}}
                , React.createElement('div', { className: "absolute inset-0 opacity-30"  , style: { backgroundImage: 'radial-gradient(circle at center, hsl(275 36% 60%), transparent 60%)' }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 255}} )
                , React.createElement(Music, { className: "w-12 h-12 text-accent/60 relative"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 256}} )
                , playing && React.createElement('div', { className: "absolute inset-0 rounded-full border-2 border-accent/40 animate-ping"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 257}} )
              )
              , React.createElement('h3', { className: "font-serif text-xl font-light mb-1 leading-tight"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 259}}, currentTrack.title)
              , React.createElement('p', { className: "text-sm text-muted-foreground mb-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 260}}, currentTrack.artist)

              /* Progress bar */
              , React.createElement('div', { className: "mt-5 mb-1" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 263}}
                , React.createElement(Slider, {
                  value: [progress],
                  onValueChange: handleSeek,
                  max: 100,
                  step: 0.1,
                  className: "w-full",
                  'data-testid': "progress-slider", __self: this, __source: {fileName: _jsxFileName, lineNumber: 264}}
                )
              )
              , React.createElement('div', { className: "flex justify-between text-xs text-muted-foreground mb-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 273}}
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 274}}, fmtTime(currentTime))
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 275}}, fmtTime(duration))
              )

              /* Controls */
              , React.createElement('div', { className: "flex items-center justify-center gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 279}}
                , React.createElement('button', {
                  onClick: () => { setCurrent(Math.max(0, current - 1)); setPlaying(true); },
                  disabled: current === 0,
                  className: "text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"   ,
                  'data-testid': "btn-prev-track", __self: this, __source: {fileName: _jsxFileName, lineNumber: 280}}

                  , React.createElement(SkipBack, { className: "w-5 h-5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 286}} )
                )
                , React.createElement('button', {
                  onClick: () => setPlaying(p => !p),
                  className: "w-12 h-12 rounded-full bg-accent hover:bg-accent/80 flex items-center justify-center shadow-lg transition-all hover:scale-105"          ,
                  'data-testid': "btn-play-pause", __self: this, __source: {fileName: _jsxFileName, lineNumber: 288}}

                  , playing ? React.createElement(Pause, { className: "w-5 h-5 text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 293}} ) : React.createElement(Play, { className: "w-5 h-5 text-white ml-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 293}} )
                )
                , React.createElement('button', {
                  onClick: () => { setCurrent(Math.min(tracks.length - 1, current + 1)); setPlaying(true); },
                  disabled: current === tracks.length - 1,
                  className: "text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"   ,
                  'data-testid': "btn-next-track", __self: this, __source: {fileName: _jsxFileName, lineNumber: 295}}

                  , React.createElement(SkipForward, { className: "w-5 h-5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 301}} )
                )
              )

              /* Volume */
              , React.createElement('div', { className: "flex items-center gap-3 mt-5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 306}}
                , React.createElement(Volume2, { className: "w-4 h-4 text-muted-foreground shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 307}} )
                , React.createElement(Slider, { value: volume, onValueChange: setVolume, max: 100, className: "flex-1", 'data-testid': "volume-slider", __self: this, __source: {fileName: _jsxFileName, lineNumber: 308}} )
                , React.createElement('span', { className: "text-xs text-muted-foreground w-8"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 309}}, volume[0], "%")
              )
            )
          )

          /* Track list */
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 315}}
            , React.createElement('h3', { className: "font-serif text-base font-light mb-3 text-muted-foreground"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 316}}
              , l("Todos los Tracks", "All Tracks", "Todas as Faixas")
            )
            , React.createElement('div', { className: "rounded-2xl border border-border overflow-hidden"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 319}}
              , tracks.map((track, i) => (
                React.createElement('div', {
                  key: track.id,
                  className: `transition-colors duration-200 ${i === current ? "bg-accent/8" : "bg-white/60 hover:bg-white/90"} ${i < tracks.length - 1 ? "border-b border-border/50" : ""}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 321}}

                  , React.createElement('button', {
                    onClick: () => selectTrack(i),
                    className: "w-full flex items-center gap-3 px-4 py-2.5 text-left"      ,
                    'data-testid': `track-${track.id}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 325}}

                    , React.createElement('span', { className: `w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${i === current ? "bg-accent" : "bg-muted"}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 330}}
                      , i === current && playing
                        ? React.createElement(Pause, { className: "w-2.5 h-2.5 text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 332}} )
                        : React.createElement(Play, { className: `w-2.5 h-2.5 ml-0.5 ${i === current ? "text-white" : "text-muted-foreground"}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 333}} )
                      
                    )
                    , React.createElement('span', { className: `flex-1 text-sm font-light font-serif min-w-0 leading-tight ${i === current ? "text-accent" : "text-foreground/80"}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 336}}
                      , track.title
                    )
                    , React.createElement('span', { className: "text-xs text-muted-foreground shrink-0 font-mono"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 339}}
                      , i === current && duration > 0 ? fmtTime(duration) : "—"
                    )
                  )
                )
              ))
            )
          )
        )
      )
    )
  );
}
