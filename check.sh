#!/usr/bin/env bash
# Fails if a page links to a missing local file or the download link stops resolving.
# Pass a site URL (for example https://opul.procka.org) to also check the deployed pages.
set -euo pipefail
cd "$(dirname "$0")"

DMG_URL=https://github.com/slovakian/opul/releases/latest/download/Opul.dmg
status=0

while IFS= read -r page; do
  while IFS= read -r path; do
    target="public${path%%#*}"
    [[ "$target" == */ ]] && target="${target}index.html"
    [[ -e "$target" ]] || { echo "$page links to missing $path"; status=1; }
  done < <(grep -o -E '(href|src)="/[^"]*"' "$page" | sed -E 's/^(href|src)="//; s/"$//')
done < <(find public -name '*.html')

grep -q "$DMG_URL" public/download/index.html || { echo "/download/ does not point at $DMG_URL"; status=1; }
curl -fsSL --retry 3 -r 0-0 -o /dev/null "$DMG_URL" || { echo "Download link is broken: $DMG_URL"; status=1; }

if [[ $# -gt 0 ]]; then
  site=${1%/}
  for path in / /download/ /privacy/ /styles.css /fonts/inter-latin-wght-normal.woff2; do
    curl -fsS --retry 5 --retry-all-errors -o /dev/null "$site$path" || { echo "$site$path is not served"; status=1; }
  done
  curl -fsS "$site/download/" | grep -q "$DMG_URL" || { echo "$site/download/ is stale"; status=1; }
  code=$(curl -s -o /dev/null -w '%{http_code}' "$site/does-not-exist")
  [[ "$code" == 404 ]] || { echo "$site/does-not-exist returned $code, expected 404"; status=1; }
fi

[[ $status -eq 0 ]] && echo "Website checks passed."
exit $status
