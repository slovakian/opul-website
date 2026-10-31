import { For, Show } from "solid-js";
import { Document } from "../components/Document";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ReleaseDownloads } from "../components/ReleaseDownloads";
import { releases, releaseDate } from "../releases";
import { RELEASES_URL } from "../constants";
import { lede, pageTitle, releaseEntry, releaseNote, releaseTitle, shell } from "../ui";

export function ReleasesPage() {
  return (
    <Document
      title="Opul releases"
      description="Stable and nightly Opul releases, release notes, and macOS downloads."
      canonicalPath="/releases/"
    >
      <Nav />
      <main class={`${shell} pt-[90px] pb-10`}>
        <h1 class={pageTitle}>Releases.</h1>
        <p class={`${lede} mb-0`}>
          Stable versions and the latest nightly build for macOS. The nightly is a rolling preview
          and is replaced with each new build.
        </p>
        <p>
          <a href="/download/">Help choosing and installing Opul</a> ·{" "}
          <a href={RELEASES_URL}>View on GitHub</a>
        </p>
        <Show when={releases.length === 0}>
          <p>No releases have been published yet.</p>
        </Show>
        <For each={releases}>
          {(release) => (
            <article class={releaseEntry}>
              <p class="mt-0 mb-[18px] text-[12px] font-[750] tracking-[0.13em] text-accent uppercase">
                {release.channel}
              </p>
              <h2 class={releaseTitle}>{release.name}</h2>
              <p class={releaseNote}>
                <time datetime={release.publishedAt}>{releaseDate(release)}</time> · {release.tag}
              </p>
              <ReleaseDownloads release={release} />
              <Show when={release.notes}>
                <details class="my-6">
                  <summary class="cursor-pointer font-semibold">Release notes</summary>
                  <pre class="leading-[1.65] wrap-anywhere whitespace-pre-wrap text-muted [font-family:inherit] [font-size:inherit] [font-weight:inherit]">
                    {release.notes}
                  </pre>
                </details>
              </Show>
              <p>
                <a href={release.url}>Read formatted notes on GitHub ↗</a>
              </p>
            </article>
          )}
        </For>
      </main>
      <Footer />
    </Document>
  );
}
