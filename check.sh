#!/usr/bin/env bash
# Fails if a prerendered page links to a missing local file or the download link stops resolving.
# Run `pnpm build` first. Pass a site URL (for example https://opul.procka.org) to also check
# the deployed pages.
set -euo pipefail
cd "$(dirname "$0")"

out=dist/client
[[ -f $out/index.html ]] || { echo "Missing $out; run pnpm build first"; exit 1; }
status=0

while IFS= read -r page; do
  while IFS= read -r path; do
    target="$out${path%%#*}"
    [[ "$target" == */ ]] && target="${target}index.html"
    [[ -e "$target" ]] || { echo "$page links to missing $path"; status=1; }
  done < <(grep -o -E '(href|src)="/[^"]*"' "$page" | sed -E 's/^(href|src)="//; s/"$//')
done < <(find "$out" -name '*.html')

# Check the actual generated asset URLs, including nightly and both architectures.
[[ -f $out/releases/index.html ]] || { echo "Missing releases page"; exit 1; }
while IFS= read -r url; do
  curl -fsSLI --retry 3 "$url" -o /dev/null || { echo "Download link is broken: $url"; status=1; }
done < <(grep -o -E 'https://github.com/slovakian/opul/releases/download/[^" ]+' "$out/download/index.html" | sort -u)

if [[ $# -gt 0 ]]; then
  site=${1%/}
  stylesheet=$(grep -o -E 'href="/assets/[^"]+\.css"' "$out/index.html" | head -1 | sed -E 's/^href="//; s/"$//')
  for path in / /download/ /releases/ /privacy/ "$stylesheet" /fonts/inter-latin-wght-normal.woff2; do
    curl -fsS --retry 5 --retry-all-errors -o /dev/null "$site$path" || { echo "$site$path is not served"; status=1; }
  done
  for path in /download/ /releases/; do
    live=$(mktemp)
    curl -fsS "$site$path" -o "$live"
    cmp -s "$out${path}index.html" "$live" || { echo "$site$path is stale"; status=1; }
    rm -f "$live"
  done
  code=$(curl -s -o /dev/null -w '%{http_code}' "$site/does-not-exist")
  [[ "$code" == 404 ]] || { echo "$site/does-not-exist returned $code, expected 404"; status=1; }
fi

[[ $status -eq 0 ]] && echo "Website checks passed."
exit $status
