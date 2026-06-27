import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  server: {
    proxy: {
      "/predict": "http://127.0.0.1:7860",
      "/health": "http://127.0.0.1:7860",
      "/metrics": "http://127.0.0.1:7860",
    },
    watch: {
      ignored: ["**/metrics/**"],
    },
  },
});
