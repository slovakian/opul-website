# Opul website

The public website for [Opul](https://github.com/slovakian/opul), served at
[opul.procka.org](https://opul.procka.org).

This is a standalone Vite Plus and TanStack Start project. Its routes are
prerendered during the build, and Alchemy deploys the result to Cloudflare.
There is no account system, licensing service, payments integration, database,
or API backend.

## Development

Install [Bun](https://bun.sh), then run:

```sh
bun install
bun run check
bun run dev
```

Production deployments run through Alchemy from GitHub Actions. The repository
needs `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` Actions secrets.

The site source is MIT-licensed. The Opul name, logo, and visual assets are
reserved; see [TRADEMARKS.md](TRADEMARKS.md).
