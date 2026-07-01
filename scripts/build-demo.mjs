// Genera un único HTML autocontenido del dashboard (modo demo, sin backend).
// Uso: npm run build:demo  ->  dist-demo/dashboard-demo.html
import { execSync } from "node:child_process";
import fs from "node:fs";

// base "./" → rutas relativas (p. ej. el iframe del mapa apunta a
// ./mapamundi-femenino.html, junto al propio HTML; necesario para servir el
// preview desde una subcarpeta vía githack).
execSync("vite build --base=./ --outDir dist-demo", {
  stdio: "inherit",
  env: { ...process.env, DEMO: "1", VITE_DEMO: "1" },
});

// Incrusta las imágenes de public/ como data-URI para portabilidad total.
let html = fs.readFileSync("dist-demo/index.html", "utf8");
const inline = (file, mime) =>
  `data:${mime};base64,` + fs.readFileSync(`public/${file}`).toString("base64");
html = html
  .split("/aceai-logo-red.jpg").join(inline("aceai-logo-red.jpg", "image/jpeg"))
  .split("/hero-bg.png").join(inline("hero-bg.png", "image/png"));
fs.writeFileSync("dist-demo/dashboard-demo.html", html);

const mb = (fs.statSync("dist-demo/dashboard-demo.html").size / 1024 / 1024).toFixed(2);
console.log(`\n✓ dist-demo/dashboard-demo.html (${mb} MB) — ábrelo en el navegador.`);
