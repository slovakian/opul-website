import solid from "@solidjs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { readHeroShot } from "./scripts/hero-shot";

export default defineConfig({
  define: {
    __OPUL_HERO_SHOT__: JSON.stringify(readHeroShot()),
  },
  plugins: [
    // Start mode with SSR: src/App.tsx inside src/Document.tsx, streamed from
    // the server and hydrated in the browser. Under Alchemy, the Cloudflare
    // plugin runs the `ssr` environment as the Worker.
    solid({ start: { middleware: "./src/middleware.ts" }, ssr: true }),
    tailwindcss(),
  ],
});
