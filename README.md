# Opul website

The public website for [Opul](https://github.com/slovakian/opul), served at
[opul.procka.org](https://opul.procka.org).

The site is a [Solid 2.0](https://solidjs.com) app in `src/`, styled with
[Tailwind CSS](https://tailwindcss.com) v4 and built with [Vite](https://vite.dev).
It uses the Solid Vite plugin's start mode with SSR (`vite.config.ts`). There is no
SolidStart and no static generation: `src/App.tsx` (the routes, using
`@solidjs/router`) renders inside `src/Document.tsx` on every request. The page then
hydrates, so later navigation happens client-side. `src/middleware.ts` sets the
edge cache headers and redirects page URLs to their trailing-slash form.

[Alchemy](https://alchemy.run) (`alchemy.run.ts`) deploys the app to Cloudflare
Workers. The client build becomes static assets, and Solid's server handler runs
as the Worker.

## Development

Run the site locally with Alchemy's Workers emulator:

```sh
pnpm install
pnpm build      # fetch releases, then vite build
pnpm dev        # Alchemy's Workers emulator
pnpm dev:vite   # or plain Vite, with server rendering in Node
pnpm preview    # serve the production build locally
# In another terminal:
pnpm test
pnpm exec tsc --noEmit
./check.sh
```

`pnpm releases` refreshes the release snapshot on its own. `check.sh` serves the build with `vite preview` and verifies local links, the 404
status, and that the download links resolve. Pass a URL
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
