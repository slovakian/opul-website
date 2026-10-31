import { Layout } from "../components/Layout";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ReleaseDownloads } from "../components/ReleaseDownloads";
import { releases, releaseDate } from "../releases";
import { RELEASES_URL } from "../constants";

export function ReleasesPage() {
  return (
    <Layout
      title="Opul releases"
      description="Stable and nightly Opul releases, release notes, and macOS downloads."
      canonicalPath="/releases/"
    >
      <Nav />
      <main class="download shell">
        <h1>Releases.</h1>
        <p class="lede">
          Stable versions and the latest nightly build for macOS. The nightly is
          a rolling preview and is replaced with each new build.
        </p>
        <p>
          <a href="/download/">Help choosing and installing Opul</a> ·{" "}
          <a href={RELEASES_URL}>View on GitHub</a>
        </p>
        {releases.length === 0 && <p>No releases have been published yet.</p>}
        {releases.map((release) => (
          <article class="release-entry">
            <p class="eyebrow">{release.channel}</p>
            <h2>{release.name}</h2>
            <p class="release-note">
              <time datetime={release.publishedAt}>{releaseDate(release)}</time>{" "}
              · {release.tag}
            </p>
            <ReleaseDownloads release={release} />
            {release.notes && (
              <details class="release-notes">
                <summary>Release notes</summary>
                <pre>{release.notes}</pre>
              </details>
            )}
            <p>
              <a href={release.url}>Read formatted notes on GitHub ↗</a>
            </p>
          </article>
        ))}
      </main>
      <Footer />
    </Layout>
  );
}
