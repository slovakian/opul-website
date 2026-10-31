import { Layout } from "../components/Layout";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { stable, nightly, releaseDate } from "../releases";
import { ReleaseDownloads } from "../components/ReleaseDownloads";

export function DownloadPage() {
  return (
    <Layout
      title="Download Opul"
      description="Download the latest version of Opul for macOS and open it for the first time."
      canonicalPath="/download/"
    >
      <Nav />
      <main>
        <section class="download shell">
          <h1>Download Opul.</h1>
          <p class="lede">
            Choose a release and the installer for your Mac. In the Apple menu,
            open About This Mac. A Chip entry means Apple silicon; a Processor
            entry with Intel means Intel x86_64.
          </p>
          {[
            { channel: "Stable", release: stable },
            { channel: "Nightly", release: nightly },
          ].map(({ channel, release }) => (
            <article class="release-entry" id={channel.toLowerCase()}>
              <h2>{channel}</h2>
              <p>
                {channel === "Stable"
                  ? "The latest stable release."
                  : "Preview the latest changes. Nightly builds may have bugs."}
              </p>
              {release ? (
                <>
                  <h3>{release.name}</h3>
                  <p class="release-note">
                    <time datetime={release.publishedAt}>
                      {releaseDate(release)}
                    </time>{" "}
                    · <a href={release.url}>Release notes</a>
                  </p>
                  <ReleaseDownloads release={release} />
                </>
              ) : (
                <p>No {channel.toLowerCase()} release is available yet.</p>
              )}
            </article>
          ))}
          <p>
            <a href="/releases/">Browse all releases</a>
          </p>
        </section>

        <section
          class="steps shell"
          id="install"
          aria-labelledby="install-title"
        >
          <h2 id="install-title">Three steps, once.</h2>
          <ol>
            <li>
              <h3>Move it to Applications</h3>
              <p>
                Open the downloaded <kbd>.dmg</kbd> file, then drag Opul or Opul
                Nightly onto the Applications folder in the window that appears.
              </p>
            </li>
            <li>
              <h3>Open Opul</h3>
              <p>
                Open Opul from Applications. If macOS says it can&apos;t verify
                the app, close the warning, and don&apos;t choose{" "}
                <kbd>Move to Trash</kbd>.
              </p>
            </li>
            <li>
              <h3>Allow it in System Settings</h3>
              <p>
                Open <kbd>System Settings</kbd> &rarr;{" "}
                <kbd>Privacy &amp; Security</kbd>, scroll down to Security, and
                click <kbd>Open Anyway</kbd> next to the message about Opul.
                Confirm when macOS asks again. It may ask for your password or
                Touch ID.
              </p>
            </li>
          </ol>
          <p class="done">
            From now on Opul opens normally. Visit this page for the latest
            stable and nightly downloads.
          </p>
        </section>
      </main>
      <Footer />
    </Layout>
  );
}
