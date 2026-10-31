import type { Release } from "../../scripts/releases";

export function ReleaseDownloads({ release }: { release: Release }) {
  return (
    <div class="actions">
      {release.downloads.map((download) => (
        <a class="button secondary" href={download.url}>
          {download.label}
        </a>
      ))}
      {release.downloads.length === 0 && (
        <p>
          Installers are not available for this release.{" "}
          <a href={release.url}>View on GitHub</a>.
        </p>
      )}
    </div>
  );
}
