import * as React from "react";
const _jsxFileName = ""; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }import { useEffect, useState } from "react";
import { Music, Moon, Wind, Heart, Waves, Sparkles, Settings2, ChevronDown, ChevronUp, Leaf, Gem, Star, Flame, Sun } from "lucide-react";
import { useLanguage } from "@/context/language";
import { AudioPlayer } from "@/components/audio-player";
import { MediaUpload, MediaInfo } from "@/components/media-upload";
import { useAuth } from "@/context/auth";

















const TRACKS = [
  {
    id: "m1", type: "mantra",
    title: "Tara Verde", titleEn: "Green Tara",
    subtitle: "Protección y compasión", subtitleEn: "Protection and compassion",
    source: "Budismo tibetano · Veintiuna alabanzas a Tara",
    sourceEn: "Tibetan Buddhism · Twenty-one Praises to Tara",
    duration: "—", icon: Leaf,
    gradient: "from-emerald-400 to-teal-500",
    mantraText: "Om Tare Tuttare Ture Soha",
    slug: "mantra-tara-verde",
  },
  {
    id: "m2", type: "mantra",
    title: "Avalokiteshvara", titleEn: "Avalokiteshvara",
    subtitle: "La joya en el loto", subtitleEn: "The jewel in the lotus",
    source: "Budismo · Sutra Karandavyuha",
    sourceEn: "Buddhism · Karandavyuha Sutra",
    duration: "—", icon: Gem,
    gradient: "from-blue-400 to-indigo-600",
    mantraText: "Om Mani Padme Hum",
    slug: "mantra-avalokiteshvara",
  },
  {
    id: "m3", type: "mantra",
    title: "Oshun", titleEn: "Oshun",
    subtitle: "Las aguas dulces y las emociones", subtitleEn: "Sweet waters and emotions",
    source: "Tradición yoruba · Transmisión oral y ceremonial",
    sourceEn: "Yoruba tradition · Oral and ceremonial transmission",
    duration: "—", icon: Waves,
    gradient: "from-amber-400 to-yellow-500",
    mantraText: "Ide were were",
    slug: "mantra-oshun",
  },
  {
    id: "m4", type: "mantra",
    title: "Maha-mantra", titleEn: "Maha-mantra",
    subtitle: "La devoción", subtitleEn: "Devotion",
    source: "Bhakti · Kali-Santarana Upanishad (tradición vaishnava)",
    sourceEn: "Bhakti · Kali-Santarana Upanishad (Vaishnava tradition)",
    duration: "—", icon: Flame,
    gradient: "from-orange-400 to-rose-500",
    mantraText: "Hare Krishna Hare Krishna Krishna Krishna Hare Hare\nHare Rama Hare Rama Rama Rama Hare Hare",
    slug: "mantra-maha-mantra",
  },
  {
    id: "m5", type: "mantra",
    title: "Prajnaparamita", titleEn: "Prajnaparamita",
    subtitle: "La liberación y el despertar", subtitleEn: "Liberation and awakening",
    source: "Budismo · Sutra del Corazón (Prajnaparamita Hridaya)",
    sourceEn: "Buddhism · Heart Sutra (Prajnaparamita Hridaya)",
    duration: "—", icon: Star,
    gradient: "from-violet-500 to-indigo-600",
    mantraText: "Gate gate pāragate pārasaṃgate bodhi svāhā",
    slug: "mantra-gate",
  },
  { id: "med1",  type: "meditacion", title: "Meditación 1",  titleEn: "Meditation 1",  subtitle: "", subtitleEn: "", duration: "—", icon: Moon,     gradient: "from-indigo-500 to-violet-600",   slug: "meditacion-1"  },
  { id: "med2",  type: "meditacion", title: "Meditación 2",  titleEn: "Meditation 2",  subtitle: "", subtitleEn: "", duration: "—", icon: Heart,    gradient: "from-rose-400 to-fuchsia-500",    slug: "meditacion-2"  },
  { id: "med3",  type: "meditacion", title: "Meditación 3",  titleEn: "Meditation 3",  subtitle: "", subtitleEn: "", duration: "—", icon: Sparkles, gradient: "from-amber-400 to-rose-500",      slug: "meditacion-3"  },
  { id: "med4",  type: "meditacion", title: "Meditación 4",  titleEn: "Meditation 4",  subtitle: "", subtitleEn: "", duration: "—", icon: Waves,    gradient: "from-sky-400 to-indigo-500",      slug: "meditacion-4"  },
  { id: "med5",  type: "meditacion", title: "Meditación 5",  titleEn: "Meditation 5",  subtitle: "", subtitleEn: "", duration: "—", icon: Wind,     gradient: "from-emerald-400 to-teal-600",    slug: "meditacion-5"  },
  { id: "med6",  type: "meditacion", title: "Meditación 6",  titleEn: "Meditation 6",  subtitle: "", subtitleEn: "", duration: "—", icon: Gem,      gradient: "from-yellow-400 to-amber-500",    slug: "meditacion-6"  },
  { id: "med7",  type: "meditacion", title: "Meditación 7",  titleEn: "Meditation 7",  subtitle: "", subtitleEn: "", duration: "—", icon: Star,     gradient: "from-pink-400 to-rose-600",       slug: "meditacion-7"  },
  { id: "med8",  type: "meditacion", title: "Meditación 8",  titleEn: "Meditation 8",  subtitle: "", subtitleEn: "", duration: "—", icon: Sun,      gradient: "from-orange-400 to-amber-600",    slug: "meditacion-8"  },
  { id: "med9",  type: "meditacion", title: "Meditación 9",  titleEn: "Meditation 9",  subtitle: "", subtitleEn: "", duration: "—", icon: Leaf,     gradient: "from-teal-400 to-emerald-600",    slug: "meditacion-9"  },
  { id: "med10", type: "meditacion", title: "Meditación 10", titleEn: "Meditation 10", subtitle: "", subtitleEn: "", duration: "—", icon: Flame,    gradient: "from-red-400 to-rose-600",        slug: "meditacion-10" },
  { id: "med11", type: "meditacion", title: "Meditación 11", titleEn: "Meditation 11", subtitle: "", subtitleEn: "", duration: "—", icon: Moon,     gradient: "from-violet-400 to-purple-700",   slug: "meditacion-11" },
  { id: "med12", type: "meditacion", title: "Meditación 12", titleEn: "Meditation 12", subtitle: "", subtitleEn: "", duration: "—", icon: Gem,      gradient: "from-cyan-400 to-sky-600",        slug: "meditacion-12" },
  { id: "med13", type: "meditacion", title: "Meditación 13", titleEn: "Meditation 13", subtitle: "", subtitleEn: "", duration: "—", icon: Star,     gradient: "from-fuchsia-500 to-pink-700",    slug: "meditacion-13" },
];

/* ── Per-track availability (fetched from API) ── */
function useTrackAvailability(slug) {
  const [exists, setExists] = useState(null);
  useEffect(() => {
    const token = _nullishCoalesce(localStorage.getItem("aceai_token"), () => ( ""));
    fetch(`/api/media/${encodeURIComponent(slug)}/info`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setExists(!!d.exists))
      .catch(() => setExists(false));
  }, [slug]);
  return exists;
}

/* ── Compact accordion row (mantras & meditaciones) ── */
function AccordionRow({ track, number, isAdmin, isLast }) {
  const { lang } = useLanguage();
  const l = (es, en) => lang === "en" ? en : es;
  const available = useTrackAvailability(track.slug);
  const [open, setOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const Icon = track.icon;

  return (
    React.createElement('div', { className: `bg-white/60 hover:bg-white/90 transition-colors duration-200 ${!isLast ? "border-b border-border/50" : ""}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}
      /* Row header */
      , React.createElement('button', { onClick: () => setOpen((o) => !o), className: "w-full flex items-center gap-3 px-4 py-2.5 text-left"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}}
        , React.createElement('span', { className: `w-6 h-6 rounded-full bg-gradient-to-br ${track.gradient} flex items-center justify-center shrink-0`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 124}}
          , number !== undefined
            ? React.createElement('span', { className: "text-white text-[10px] font-light font-serif"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}, number)
            : React.createElement(Icon, { className: "w-3 h-3 text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 127}} )
          
        )
        , React.createElement('span', { className: "flex-1 text-sm font-light text-foreground/80 font-serif"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}, l(track.title, track.titleEn))
        , React.createElement('div', { className: `w-1.5 h-1.5 rounded-full shrink-0 ${available ? "bg-emerald-400" : "bg-muted-foreground/20"}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 131}} )
        , open ? React.createElement(ChevronUp, { className: "w-3.5 h-3.5 text-muted-foreground shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}} ) : React.createElement(ChevronDown, { className: "w-3.5 h-3.5 text-muted-foreground shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}} )
      )

      /* Expanded content */
      , open && (
        React.createElement('div', { className: "px-4 pb-3 pt-1 border-t border-border/30 space-y-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}
          /* Source */
          , track.source && (
            React.createElement('p', { className: "text-[10px] text-muted-foreground/60 tracking-wide pt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}}
              , l(track.source, _nullishCoalesce(track.sourceEn, () => ( track.source)))
            )
          )
          /* Mantra text */
          , track.mantraText && (
            React.createElement('div', { className: "border-l-2 border-secondary/30 pl-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 146}}
              , track.mantraText.split("\n").map((line, i) => (
                React.createElement('p', { key: i, className: "text-sm italic text-foreground/70 font-serif leading-relaxed"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 148}}, line)
              ))
            )
          )
          /* Audio player */
          , React.createElement(AudioPlayer, { key: refreshKey, slug: track.slug, title: l(track.title, track.titleEn), gradient: track.gradient, available: available === true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 153}} )
          /* Admin panel */
          , isAdmin && (
            React.createElement('div', { className: "pt-1 border-t border-dashed border-border/40"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}}
              , React.createElement('button', { onClick: () => setShowAdmin((s) => !s), className: "flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 157}}
                , React.createElement(Settings2, { className: "w-3 h-3" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}} )
                , l("Gestionar audio", "Manage audio")
                , showAdmin ? React.createElement(ChevronUp, { className: "w-3 h-3" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 160}} ) : React.createElement(ChevronDown, { className: "w-3 h-3" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 160}} )
              )
              , showAdmin && (
                React.createElement('div', { className: "mt-2 space-y-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 163}}
                  , React.createElement(MediaUpload, { slug: track.slug, category: "audio", label: l("Audio", "Audio"), onUploaded: () => setRefreshKey((k) => k + 1), __self: this, __source: {fileName: _jsxFileName, lineNumber: 164}} )
                  , available && React.createElement(MediaInfo, { slug: track.slug, onDeleted: () => setRefreshKey((k) => k + 1), __self: this, __source: {fileName: _jsxFileName, lineNumber: 165}} )
                )
              )
            )
          )
        )
      )
    )
  );
}

/* ── Main page ── */
export default function MantrasPage() {
  const { lang } = useLanguage();
  const { member } = useAuth();
  const l = (es, en, pt) =>
    lang === "pt" ? (_nullishCoalesce(pt, () => ( es))) : lang === "en" ? en : es;

  const adminEmails = (_nullishCoalesce(import.meta.env.VITE_ADMIN_EMAILS, () => ( "demo@aceai.com")))
    .split(",").map((e) => e.trim().toLowerCase());
  const isAdmin = !!member && adminEmails.includes(member.email.toLowerCase());

  const mantras = TRACKS.filter((t) => t.type === "mantra");
  const meditaciones = TRACKS.filter((t) => t.type === "meditacion");

  return (
    React.createElement('div', { className: "px-6 py-10 md:px-10 md:py-14"   , 'data-testid': "mantras-meditaciones", __self: this, __source: {fileName: _jsxFileName, lineNumber: 191}}

      /* ── Header ── */
      , React.createElement('div', { className: "mb-10", __self: this, __source: {fileName: _jsxFileName, lineNumber: 194}}
        , React.createElement('div', { className: "flex items-center gap-2 mb-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 195}}
          , React.createElement(Music, { className: "w-4 h-4 text-secondary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 196}} )
          , React.createElement('span', { className: "text-xs uppercase tracking-[0.25em] text-secondary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 197}}
            , l("Propósito · Sonido Sagrado", "Purpose · Sacred Sound", "Propósito · Som Sagrado")
          )
        )
        , React.createElement('h1', { className: "font-serif text-4xl md:text-5xl font-light mb-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 201}}
          , l("Mantras &", "Mantras &")
        )
        , React.createElement('h1', { className: "font-serif text-4xl md:text-5xl font-light text-secondary mb-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 204}}
          , l("Meditaciones", "Meditations", "Meditações")
        )
        , React.createElement('p', { className: "text-muted-foreground max-w-xl leading-relaxed"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 207}}
          , l(
            "El sonido como herramienta de transformación. Mantras ancestrales y meditaciones guiadas para elevar tu vibración y conectar con tu propósito más profundo.",
            "Sound as a tool for transformation. Ancient mantras and guided meditations to elevate your vibration and connect with your deepest purpose.",
            "O som como ferramenta de transformação. Mantras ancestrais e meditações guiadas para elevar sua vibração e conectar com seu propósito mais profundo."
          )
        )
      )

      /* ── Legend ── */
      , React.createElement('div', { className: "flex items-center gap-4 mb-8 text-[10px] text-muted-foreground"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 217}}
        , React.createElement('div', { className: "flex items-center gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 218}}, React.createElement('div', { className: "w-2 h-2 rounded-full bg-emerald-400"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 218}} ), " " , l("Disponible", "Available"))
        , React.createElement('div', { className: "flex items-center gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 219}}, React.createElement('div', { className: "w-2 h-2 rounded-full bg-muted-foreground/30"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 219}} ), " " , l("Próximamente", "Coming soon"))
        , isAdmin && (
          React.createElement('div', { className: "flex items-center gap-1.5 ml-auto text-secondary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 221}}
            , React.createElement(Settings2, { className: "w-3 h-3" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 222}} )
            , l("Modo admin activo — puedes subir audios", "Admin mode active — you can upload audio")
          )
        )
      )

      /* ── Mantras ── */
      , React.createElement('section', { className: "mb-12", __self: this, __source: {fileName: _jsxFileName, lineNumber: 229}}
        , React.createElement('div', { className: "flex items-center gap-3 mb-5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 230}}
          , React.createElement(Sparkles, { className: "w-4 h-4 text-secondary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 231}} )
          , React.createElement('h2', { className: "font-serif text-2xl font-light"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 232}}, l("Mantras", "Mantras"))
          , React.createElement('div', { className: "flex-1 h-px bg-gradient-to-r from-secondary/20 to-transparent"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 233}} )
          , React.createElement('span', { className: "text-xs text-muted-foreground" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 234}}, mantras.length, " tracks" )
        )
        , React.createElement('div', { className: "rounded-2xl border border-border overflow-hidden"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 236}}
          , mantras.map((t, i) => (
            React.createElement(AccordionRow, { key: t.id, track: t, isAdmin: isAdmin, isLast: i === mantras.length - 1, __self: this, __source: {fileName: _jsxFileName, lineNumber: 238}} )
          ))
        )
      )

      /* ── Meditaciones ── */
      , React.createElement('section', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 244}}
        , React.createElement('div', { className: "flex items-center gap-3 mb-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 245}}
          , React.createElement(Moon, { className: "w-4 h-4 text-accent"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 246}} )
          , React.createElement('h2', { className: "font-serif text-2xl font-light"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 247}}, l("Meditaciones", "Meditations", "Meditações"))
          , React.createElement('div', { className: "flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 248}} )
          , React.createElement('span', { className: "text-xs text-muted-foreground" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 249}}, l("1 a 13", "1 to 13"))
        )
        , React.createElement('div', { className: "rounded-2xl border border-border overflow-hidden"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 251}}
          , meditaciones.map((t, i) => (
            React.createElement(AccordionRow, { key: t.id, track: t, number: i + 1, isAdmin: isAdmin, isLast: i === meditaciones.length - 1, __self: this, __source: {fileName: _jsxFileName, lineNumber: 253}} )
          ))
        )
      )
    )
  );
}
