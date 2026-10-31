import { REPO_URL } from "../src/constants";

export type Download = { label: string; url: string };
export type Release = {
  tag: string;
  name: string;
  channel: "stable" | "nightly";
  publishedAt: string;
  url: string;
  notes: string;
  downloads: Download[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function object(value: unknown): Record<string, unknown> {
  if (!isRecord(value)) throw new Error("Invalid GitHub release data");
  return value;
}
function string(value: unknown): string {
  if (typeof value !== "string")
    throw new Error("Expected a string in GitHub release data");
  return value;
}
function githubUrl(value: unknown): string {
  const url = string(value);
  if (!url.startsWith(`${REPO_URL}/releases/`))
    throw new Error(`Unexpected release URL: ${url}`);
  return url;
}

export function parseReleases(data: unknown): Release[] {
  if (!Array.isArray(data)) throw new Error("Expected GitHub releases array");
  return data
    .flatMap((entry): Release[] => {
      const release = object(entry);
      if (
        typeof release.draft !== "boolean" ||
        typeof release.prerelease !== "boolean"
      )
        throw new Error("Invalid release flags");
      if (release.draft) return [];
      const tag = string(release.tag_name);
      const nightly = tag === "nightly";
      if (!nightly && (release.prerelease || !/^v\d+\.\d+\.\d+$/.test(tag)))
        return [];
      if (!Array.isArray(release.assets))
        throw new Error("Missing release assets");
      const assets = release.assets.map(object);
      const prefix = nightly ? "Opul-Nightly" : "Opul";
      const downloads: Download[] = [];
      for (const [arch, label] of [
        ["arm64", "Apple silicon (arm64)"],
        ["x64", "Intel (x86_64)"],
      ]) {
        const asset = assets.find(
          (asset) => asset.name === `${prefix}-${arch}.dmg`,
        );
        if (asset)
          downloads.push({ label, url: githubUrl(asset.browser_download_url) });
      }
      // Legacy installers have no architecture in their name. Do not infer one.
      if (downloads.length === 0) {
        const legacy = assets.find(
          (asset) =>
            asset.name === "Opul.dmg" || asset.name === `Opul-${tag}-macOS.zip`,
        );
        if (legacy)
          downloads.push({
            label: "macOS (legacy installer)",
            url: githubUrl(legacy.browser_download_url),
          });
      }
      const publishedAt = string(release.published_at);
      if (!Number.isFinite(Date.parse(publishedAt)))
        throw new Error("Invalid release date");
      return [
        {
          tag,
          name: release.name ? string(release.name) : tag,
          channel: nightly ? "nightly" : "stable",
          publishedAt,
          url: githubUrl(release.html_url),
          notes: release.body == null ? "" : string(release.body),
          downloads,
        },
      ];
    })
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export async function fetchReleases(): Promise<Release[]> {
  const releases: Release[] = [];
  for (let page = 1; ; page++) {
    const response = await fetch(
      `https://api.github.com/repos/slovakian/opul/releases?per_page=100&page=${page}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        signal: AbortSignal.timeout(30_000),
      },
    );
    if (!response.ok)
      throw new Error(
        `GitHub releases request failed: ${response.status} ${response.statusText}`,
      );
    const data: unknown = await response.json();
    releases.push(...parseReleases(data));
    if (Array.isArray(data) && data.length < 100) break;
  }
  return releases.sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
}
