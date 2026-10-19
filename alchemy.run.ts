import { Stack, Stage } from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import { Effect } from "effect";

export default Stack(
  "OpulWebsite",
  {
    providers: Cloudflare.providers(),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const stage = yield* Stage;
    const production = stage === "prod";

    const website = yield* Cloudflare.Website.Vite("Website", {
      compatibility: {
        date: "2026-10-19",
        flags: ["nodejs_compat"],
      },
      domain: production ? "opul.procka.org" : null,
      workersDev: !production,
      memo: {
        include: ["src/**", "public/**", "package.json", "tsconfig.json", "vite.config.ts"],
        lockfile: true,
      },
    });

    return { website };
  }),
);
