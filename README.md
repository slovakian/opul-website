# Opul website

The public website for [Opul](https://github.com/slovakian/opul), served at
[opul.procka.org](https://opul.procka.org).

The site is built with [Hono](https://hono.dev) and JSX in `src/`. Static
site generation (`pnpm build`) pre-renders the pages into `public/` using
Hono's SSG helper so Cloudflare caches them at the edge for blazingly fast loads.
[Alchemy](https://alchemy.run) (`alchemy.run.ts`) deploys the Hono web worker and
static assets to Cloudflare Workers.

## Development

Run the site locally with Alchemy's Workers emulator:

```sh
pnpm install
pnpm build
pnpm dev
# In another terminal:
pnpm test
pnpm exec tsc --noEmit
./check.sh
```

`check.sh` verifies local links and that the download link resolves. Pass a URL
to check a deployed site too: `./check.sh https://opul.procka.org`.

## Deployment

Every push to `main` deploys the `prod` stage to `opul.procka.org` and then
checks the live site. Every pull request deploys its own `pr-<number>` stage on
`workers.dev` and comments the preview URL on the pull request. Closing the pull
request destroys that stage. The repository needs `CLOUDFLARE_ACCOUNT_ID` and
`CLOUDFLARE_API_TOKEN` Actions secrets.

Every build fetches current stable and nightly releases from `slovakian/opul`.
The download page offers available Apple silicon and Intel x86_64 installers;
`/releases/` includes release history and notes. The site uses Tauri and Rust
terminology to match the application.

Release notifications trigger a production rebuild via `repository_dispatch`.
See [release deployment setup](docs/release-deploys.md) for the companion app
workflow, the required `OPUL_WEBSITE_DISPATCH_TOKEN` secret in `slovakian/opul`,
and recovery instructions. You can also redeploy from the website's Actions UI.

The site source is MIT-licensed. The Opul name, logo, and visual assets are
reserved; see [TRADEMARKS.md](TRADEMARKS.md). Inter is licensed under the SIL
Open Font License (`public/fonts/LICENSE-Inter.txt`).
