import { test } from "node:test";
import assert from "node:assert/strict";
import { fetchReleases, parseReleases } from "./releases";

const url = "https://github.com/slovakian/opul/releases";
function release(tag: string, names: string[], extra = {}) {
  return {
    tag_name: tag,
    name: tag,
    draft: false,
    prerelease: tag === "nightly",
    published_at: "2026-10-31T00:00:00Z",
    html_url: `${url}/tag/${tag}`,
    body: "<script>alert(1)</script>",
    assets: names.map((name) => ({
      name,
      browser_download_url: `${url}/download/${tag}/${name}`,
    })),
    ...extra,
  };
}
test("selects real stable and nightly architecture assets, ignoring legacy alias when split installers exist", () => {
  const parsed = parseReleases([
    release("v1.0.0", ["Opul-arm64.dmg", "Opul-x64.dmg", "Opul.dmg"]),
    release("nightly", ["Opul-Nightly-arm64.dmg", "Opul-Nightly-x64.dmg"]),
  ]);
  assert.deepEqual(
    parsed.map((r) => r.downloads.map((d) => d.label)),
    [
      ["Apple silicon (arm64)", "Intel (x86_64)"],
      ["Apple silicon (arm64)", "Intel (x86_64)"],
    ],
  );
  assert.equal(parsed[1].channel, "nightly");
});
test("excludes drafts, tools, and other prereleases; retains legacy installers without guessing architecture", () => {
  const parsed = parseReleases([
    release("media-tools-1", []),
    release("v2.0.0", [], { draft: true }),
    release("v1.2.0", [], { prerelease: true }),
    release("v0.2.1", ["Opul.dmg"]),
    release("v0.1.0", ["Opul-v0.1.0-macOS.zip"]),
  ]);
  assert.deepEqual(
    parsed.map((r) => r.tag),
    ["v0.2.1", "v0.1.0"],
  );
  assert.equal(parsed[0].downloads[0].label, "macOS (legacy installer)");
});
test("handles empty lists and missing installers; rejects malformed API data and unsafe links", () => {
  assert.deepEqual(parseReleases([]), []);
  assert.deepEqual(parseReleases([release("v1.0.0", [])])[0].downloads, []);
  assert.throws(() => parseReleases({ message: "rate limit" }));
  assert.throws(() =>
    parseReleases([release("v1.0.0", [], { html_url: "javascript:alert(1)" })]),
  );
  assert.throws(() =>
    parseReleases([release("v1.0.0", [], { published_at: "bad" })]),
  );
});
test("fetches all pages and fails on API errors instead of silently using stale data", async (t) => {
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    calls++;
    return Response.json(
      calls === 1
        ? Array.from({ length: 100 }, () => release("media-tools-1", []))
        : [release("v1.0.0", ["Opul-arm64.dmg"])],
    );
  });
  assert.equal((await fetchReleases())[0].tag, "v1.0.0");
  assert.equal(calls, 2);
  t.mock.method(
    globalThis,
    "fetch",
    async () => new Response("Unavailable", { status: 503 }),
  );
  await assert.rejects(fetchReleases(), /503/);
});
