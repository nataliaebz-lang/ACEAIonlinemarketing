import * as React from "react";
const _jsxFileName = "";/* Soft stellar background — tiny stars only, no colored blobs */

const lcg = (s) => ((s * 1664525 + 1013904223) | 0) >>> 0;

function makeStars(count) {
  return Array.from({ length: count }, (_, i) => {
    let s = lcg(i + 1);
    const x = (s % 10000) / 100;
    s = lcg(s); const y = (s % 10000) / 100;
    s = lcg(s); const size = (s % 20) / 10 + 0.5;
    s = lcg(s); const opacity = (s % 18) / 100 + 0.04;
    s = lcg(s); const dur = (s % 50) / 10 + 3;
    s = lcg(s); const delay = (s % 80) / 10;
    return { id: i, x, y, size, opacity, dur, delay };
  });
}

const STARS = makeStars(80);

const SHOOTING_STARS = [
  { id: 0, x: 12, y:  5, angle: 35, delay:  6, dur: 2.4 },
  { id: 1, x: 48, y:  3, angle: 40, delay: 15, dur: 2.0 },
  { id: 2, x: 72, y:  7, angle: 33, delay: 26, dur: 2.6 },
  { id: 3, x: 28, y: 10, angle: 38, delay: 38, dur: 2.2 },
];

export function StarField() {
  return (
    React.createElement('div', { className: "fixed inset-0 pointer-events-none overflow-hidden z-0"    , 'aria-hidden': "true", __self: this, __source: {fileName: _jsxFileName, lineNumber: 29}}

      /* Very subtle warm-rose base tint — aligned with spiral cover */
      , React.createElement('div', {
        className: "absolute inset-0" ,
        style: {
          background:
            "radial-gradient(ellipse 70% 50% at 80% 10%, hsl(344 60% 70% / 0.07), transparent 60%)," +
            "radial-gradient(ellipse 55% 45% at 15% 85%, hsl(275 50% 65% / 0.05), transparent 55%)," +
            "radial-gradient(ellipse 45% 35% at 50% 50%, hsl(42 70% 65% / 0.04), transparent 60%)",
        }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}}
      )

      /* Tiny muted stars */
      , STARS.map((star) => (
        React.createElement('div', {
          key: star.id,
          className: "absolute rounded-full" ,
          style: {
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: "hsl(344 30% 60%)",
            opacity: star.opacity,
            animation: `star-twinkle ${star.dur}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}
        )
      ))

      /* Subtle shooting stars */
      , SHOOTING_STARS.map((ss) => (
        React.createElement('div', {
          key: ss.id,
          className: "absolute",
          style: {
            left: `${ss.x}%`,
            top: `${ss.y}%`,
            height: 1,
            width: 0,
            transform: `rotate(${ss.angle}deg)`,
            background: "linear-gradient(90deg, hsl(344 40% 70%), rgba(255,255,255,0.7), transparent)",
            borderRadius: 2,
            animation: `shooting-star ${ss.dur}s ease-out infinite`,
            animationDelay: `${ss.delay}s`,
            opacity: 0,
          }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}}
        )
      ))

    )
  );
}
