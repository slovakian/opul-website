# Release-driven builds

The website fetches every page of the public `slovakian/opul` releases API during
`pnpm build`. It generates `src/releases.generated.ts`, then renders the homepage,
downloads, and release history with Hono SSG. No visitor-side API requests or tokens
are needed. An API error fails the build, leaving the previous deployment intact.
Run `pnpm build` before type checking or running the local Worker.

Stable releases use published, non-prerelease `vX.Y.Z` tags. The `nightly` tag is
the rolling preview. Other prereleases, such as media tools, are excluded.
Installer links come from the API's asset URLs. The architecture-specific DMGs
are preferred over `Opul.dmg`, which current release packaging aliases to arm64.
Old releases without split DMGs retain their explicitly labeled legacy installer.
Release names carry the nightly version; dates use the release publication time.
Release notes render as escaped plain text, with a link to GitHub's formatted notes.

## One-time setup

1. Merge the website PR first, so the `repository_dispatch` listener exists on
   `slovakian/opul-website`'s default branch.
2. Create a fine-grained personal access token owned by an account with access to
   `slovakian/opul-website`. Limit repository access to **opul-website** and grant
   **Contents: read and write**. This is required by GitHub's repository dispatch API.
3. Store that token as an Actions secret named **OPUL_WEBSITE_DISPATCH_TOKEN** in
   **slovakian/opul**, the application repository. Do not put it in the website's
   environment or public files. Rotate it before it expires.
4. Merge the [companion app PR](https://github.com/slovakian/opul/pull/36) that adds `.github/workflows/notify-website.yml`.
   Its `workflow_run` listener watches successful `Release` and `Nightly` runs,
   then sends `opul-release` to the website. This waits for uploaded assets and
   works when releases are created by `GITHUB_TOKEN`, whose release events do not
   start another workflow. Manual release publication/edits are covered by the
   `release` event as well. A manual workflow dispatch permits recovery.
5. Run **Notify website → Run workflow** once, then confirm **Deploy website**
   runs on the website and `/download/` and `/releases/` show the current releases.

The website keeps its existing `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`
Actions secrets. Builds use the automatic `github.token` for API quota; local
builds work anonymously, or accept an optional `GITHUB_TOKEN`. No new website
secrets or Cloudflare variables are required.

Production pushes, release notifications, and manual redeploys share one
concurrency group so Alchemy production state cannot be mutated concurrently.
Preview stages keep their own group.

## Verification and recovery

```sh
pnpm test
pnpm build
pnpm exec tsc --noEmit
./check.sh
# After deployment, also compare the deployed release pages with this build:
./check.sh https://opul.procka.org
```

The live checks compare the generated HTML on both release pages and verify all
current download URLs. Rolling nightly URLs continue to point to the moving
`nightly` tag; the site rebuild refreshes its name, date, and notes.

If notification fails, check the app's **Notify website** run for an absent or
expired token. After fixing it, rerun that workflow. The website's **Deploy
website → Run workflow** can also rebuild production directly.

References: [workflow events](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows),
[repository dispatch API and token permissions](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event).
