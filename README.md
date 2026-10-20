# Opul website

The public website for [Opul](https://github.com/slovakian/opul), served at
[opul.procka.org](https://opul.procka.org).

The site is plain HTML and CSS in `public/`. There is no build step, framework,
or package manager. Cloudflare Workers serves the folder as static assets.

## Development

Serve the folder and open http://localhost:8080:

```sh
python3 -m http.server -d public 8080
./check.sh
```

`check.sh` verifies local links and that the download link resolves. Pass a URL
to check a deployed site too: `./check.sh https://opul.procka.org`.

## Deployment

Every push to `main` deploys with Wrangler (`wrangler.jsonc`) and then checks
the live site. The repository needs `CLOUDFLARE_ACCOUNT_ID` and
`CLOUDFLARE_API_TOKEN` Actions secrets.

The site never changes for an app release. The download button points at
`https://github.com/slovakian/opul/releases/latest/download/Opul.dmg`, which
GitHub always resolves to the newest release.

The site source is MIT-licensed. The Opul name, logo, and visual assets are
reserved; see [TRADEMARKS.md](TRADEMARKS.md). Inter is licensed under the SIL
Open Font License (`public/fonts/LICENSE-Inter.txt`).
