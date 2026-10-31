import * as fs from "node:fs/promises";
import * as path from "node:path";
import { pathToFileURL } from "node:url";
import solid from "@solidjs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin, type ResolvedConfig } from "vite";

const STYLESHEET_ENTRY = "src/styles.css";
const CLIENT_DIR = "dist/client";
const PRERENDER_DIR = "dist/prerender";

/**
 * Exposes the stylesheet URL to the server-rendered pages: the hashed file
 * from the client build's manifest in production, the source file in dev.
 */
function stylesheet(): Plugin {
  const id = "virtual:stylesheet";
  let config: ResolvedConfig;
  return {
    name: "opul:stylesheet",
    configResolved(resolved) {
      config = resolved;
    },
    resolveId(source) {
      if (source === id) return `\0${id}`;
    },
    async load(source) {
      if (source !== `\0${id}`) return;
      if (config.command === "serve") return `export default "/${STYLESHEET_ENTRY}";`;
      const manifestPath = path.resolve(config.root, CLIENT_DIR, ".vite/manifest.json");
      this.addWatchFile(manifestPath);
      const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
      const entry = manifest[STYLESHEET_ENTRY];
      if (!entry) throw new Error(`${STYLESHEET_ENTRY} is missing from the client manifest`);
      return `export default ${JSON.stringify(config.base + entry.file)};`;
    },
  };
}

/**
 * Plain `vite dev` (without Alchemy's Workers runtime) server-renders pages
 * through the `ssr` environment's module runner.
 */
function devServer(): Plugin {
  return {
    name: "opul:dev-server",
    apply: () => process.env.ALCHEMY_CLOUDFLARE_VITE_INJECTED !== "1",
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (req.method !== "GET" || !req.headers.accept?.includes("text/html")) return next();
          try {
            const ssr = server.environments.ssr as unknown as {
              runner: { import(id: string): Promise<typeof import("./src/routes")> };
            };
            const { render } = await ssr.runner.import("/src/routes.tsx");
            const { status, html } = render(new URL(req.url ?? "/", "http://localhost").pathname);
            res.statusCode = status;
            res.setHeader("Content-Type", "text/html; charset=UTF-8");
            res.end(html);
          } catch (error) {
            next(error);
          }
        });
      };
    },
  };
}

export default defineConfig({
  // No index.html: pages come from the server renderer, not an SPA shell.
  appType: "custom",
  plugins: [
    // Pages are server-rendered only; nothing hydrates, so no client JS ships.
    solid({ ssr: true, solid: { hydratable: false } }),
    tailwindcss(),
    stylesheet(),
    devServer(),
  ],
  environments: {
    // Static assets: the stylesheet, `public/`, and the prerendered pages.
    client: {
      build: {
        outDir: CLIENT_DIR,
        manifest: true,
        rolldownOptions: { input: STYLESHEET_ENTRY },
      },
    },
    // The Cloudflare Worker, which server-renders anything not prerendered.
    ssr: {
      build: {
        ssr: true,
        minify: true,
        outDir: "dist/ssr",
        rolldownOptions: { input: "src/worker.ts" },
      },
    },
    // A Node build of the routes, used once at build time to prerender pages.
    prerender: {
      consumer: "server",
      build: {
        ssr: true,
        outDir: PRERENDER_DIR,
        rolldownOptions: { input: { routes: "src/routes.tsx" } },
      },
    },
  },
  builder: {
    async buildApp(builder) {
      const { client, prerender, ssr } = builder.environments;
      await builder.build(client);
      await builder.build(prerender);

      const root = builder.config.root;
      const routes: typeof import("./src/routes") = await import(
        pathToFileURL(path.resolve(root, PRERENDER_DIR, "routes.js")).href
      );
      for (const [pathname, file] of Object.entries(routes.prerenderRoutes)) {
        const target = path.resolve(root, CLIENT_DIR, file);
        await fs.mkdir(path.dirname(target), { recursive: true });
        await fs.writeFile(target, routes.render(pathname).html);
        builder.config.logger.info(`prerendered ${pathname} -> ${file}`);
      }
      await fs.rm(path.resolve(root, PRERENDER_DIR), { recursive: true, force: true });

      await builder.build(ssr);
    },
  },
});
