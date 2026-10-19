import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
        failOnError: true,
      },
    }),
    viteReact(),
  ],
  lint: {
    ignorePatterns: [".alchemy/**", ".output/**", "dist/**", "src/routeTree.gen.ts"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    overrides: [
      {
        files: ["src/**"],
        plugins: ["react"],
      },
      {
        files: ["alchemy.run.ts", "vite.config.ts"],
        env: { node: true },
      },
    ],
  },
  fmt: {
    ignorePatterns: [".alchemy/**", ".output/**", "bun.lock", "dist/**", "src/routeTree.gen.ts"],
  },
});
