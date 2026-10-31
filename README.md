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

The site never changes for an app release. The download button points at
`https://github.com/slovakian/opul/releases/latest/download/Opul.dmg`, which
GitHub always resolves to the newest release.

The site source is MIT-licensed. The Opul name, logo, and visual assets are
reserved; see [TRADEMARKS.md](TRADEMARKS.md). Inter is licensed under the SIL
Open Font License (`public/fonts/LICENSE-Inter.txt`).
