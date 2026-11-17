#!/usr/bin/env bash
# Fails if a page links to a missing local URL or a download link stops resolving.
# Run `pnpm build` first: pages are server-rendered by the built app via `vite preview`.
# Pass a site URL (for example https://opul.procka.org) to also check the deployed site.
set -euo pipefail
cd "$(dirname "$0")"

[[ -f dist/server/server.js ]] || { echo "Missing build; run pnpm build first"; exit 1; }

port=4319
local_site="http://localhost:$port"
pages=(/ /download/ /releases/ /privacy/)
work=$(mktemp -d)
pnpm exec vite preview --port "$port" --strictPort >"$work/preview.log" 2>&1 &
preview=$!
trap 'kill "$preview" 2>/dev/null || true; rm -rf "$work"' EXIT
for _ in $(seq 1 60); do
  curl -fs -o /dev/null "$local_site/favicon.ico" && break
  sleep 0.5
done

status=0
fetch() { curl -fsS --retry 5 --retry-all-errors -H 'Accept: text/html' "$@"; }

for page in "${pages[@]}"; do
  fetch "$local_site$page" >"$work/page.html" || { echo "$page is not served"; status=1; continue; }
  while IFS= read -r path; do
    curl -fs -o /dev/null "$local_site${path%%#*}" || { echo "$page links to missing $path"; status=1; }
  done < <(grep -o -E '(href|src)="/[^"]*"' "$work/page.html" | sed -E 's/^(href|src)="//; s/"$//' | sort -u)
done

code=$(curl -s -o /dev/null -w '%{http_code}' -H 'Accept: text/html' "$local_site/does-not-exist")
[[ "$code" == 404 ]] || { echo "/does-not-exist returned $code, expected 404"; status=1; }

# Versioned release assets, plus homepage links that follow /releases/latest/download/<asset>.
downloads() { grep -o -E 'https://github.com/slovakian/opul/releases/(latest/)?download/[^" ]+' | sort -u; }
check_downloads() {
  local page="$1"
  local file="$work/downloads${page//\//-}.txt"
  fetch "$local_site$page" | downloads >"$file"
  [[ -s "$file" ]] || { echo "No download links on $page"; status=1; return; }
  while IFS= read -r url; do
    curl -fsSLI --retry 3 "$url" -o /dev/null || { echo "Download link is broken: $url"; status=1; }
  done <"$file"
}
check_downloads /
check_downloads /download/

if [[ $# -gt 0 ]]; then
  site=${1%/}
  for page in "${pages[@]}"; do
    fetch "$site$page" -o /dev/null || { echo "$site$page is not served"; status=1; }
  done
  stylesheet=$(fetch "$site/" | grep -o -E 'href="/assets/[^"]+\.css"' | head -1 | sed -E 's/^href="//; s/"$//')
  for path in "$stylesheet" /fonts/inter-latin-wght-normal.woff2; do
    curl -fsS --retry 5 --retry-all-errors -o /dev/null "$site$path" || { echo "$site$path is not served"; status=1; }
  done
  # The deployed release pages must show the same releases as this build.
  for page in / /download/ /releases/; do
    cmp -s <(fetch "$local_site$page" | downloads) <(fetch "$site$page" | downloads) ||
      { echo "$site$page is stale"; status=1; }
  done
  code=$(curl -s -o /dev/null -w '%{http_code}' "$site/does-not-exist")
  [[ "$code" == 404 ]] || { echo "$site/does-not-exist returned $code, expected 404"; status=1; }
fi

[[ $status -eq 0 ]] && echo "Website checks passed."
exit $status
