import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "path";

// DEMO=1 produce un único HTML autocontenido (preview sin backend).
const DEMO = process.env.DEMO === "1";

export default defineConfig({
  plugins: [react(), tailwindcss(), ...(DEMO ? [viteSingleFile()] : [])],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
});
