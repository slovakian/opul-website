import * as Alchemy from "alchemy";
import { adopt } from "alchemy/AdoptPolicy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as GitHub from "alchemy/GitHub";
import * as Output from "alchemy/Output";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

export default Alchemy.Stack(
  "OpulWebsite",
  {
    providers: Layer.mergeAll(Cloudflare.providers(), GitHub.providers()),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const stage = yield* Alchemy.Stage;
    const production = stage === "prod";

    // Production takes over the Wrangler-created Worker that already owns
    // opul.procka.org, so the custom domain never moves. Other stages get
    // their own Worker on workers.dev.
    //
    // Solid's start mode (see vite.config.ts) builds the client assets and
    // the `ssr` environment, which runs as the Worker and server-renders
    // every request that isn't a static file.
    const site = yield* Cloudflare.Website.Vite("Website", {
      name: production ? "opul-website" : undefined,
      compatibility: { date: "2026-10-09" },
      // The release snapshot is gitignored, so hash it explicitly: a release
      // must trigger a rebuild even when no tracked file changed.
      memo: {
        include: [
          "src/**",
          "public/**",
          "scripts/**",
          "vite.config.ts",
          "package.json",
          "tsconfig.json",
        ],
        exclude: [],
        lockfile: true,
      },
      domain: production ? "opul.procka.org" : undefined,
      workersDev: !production,
    }).pipe(adopt(production));

    if (process.env.PULL_REQUEST) {
      yield* GitHub.Comment("preview-comment", {
        owner: "slovakian",
        repository: "opul-website",
        issueNumber: Number(process.env.PULL_REQUEST),
        body: Output.interpolate`
## Preview deployed

**URL:** ${site.url}

Built from commit ${process.env.GITHUB_SHA?.slice(0, 7)}

---
_This comment updates automatically with each push._
`,
      });
    }

    return { url: site.url };
  }),
);
