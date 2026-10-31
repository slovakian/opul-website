import { Layout } from "../components/Layout";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import {
  REPO_URL,
  ISSUES_URL,
  CONTRIBUTING_URL,
  SPONSOR_URL,
} from "../constants";

import { stable, nightly } from "../releases";

export function HomePage() {
  return (
    <Layout
      title="Opul — a native download manager for macOS"
      description="Opul is a free, open-source download manager built for macOS."
      canonicalPath="/"
      ogTitle="Opul"
      ogDescription="Opul is a free, open-source download manager built for macOS."
      ogImage="https://opul.procka.org/og.jpg"
      ogType="website"
      twitterCard="summary_large_image"
      manifest={true}
    >
      <Nav />
      <main>
        <section class="hero shell">
          <div class="hero-copy">
            <h1>
              A download manager
              <br />
              for macOS.
            </h1>
            <p class="lede">
              Opul is a native download manager for macOS. Keep video, direct,
              and torrent downloads in focused Workspaces that feel at home on
              your Mac.
            </p>
            <div class="actions">
              <a class="button primary" href="/download/">
                Download for macOS
              </a>
              <a class="button secondary" href={REPO_URL}>
                View on GitHub
              </a>
            </div>
            <p class="release-note">
              {stable?.name ?? "Stable downloads"} · macOS 14 or later · Apple
              silicon and Intel · <a href="/releases/">Release notes</a>
            </p>
            {nightly && (
              <a class="nightly-link" href="/download/#nightly">
                <span aria-hidden="true">🌚</span> Want the latest changes? Try
                Nightly <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
          <div class="art" aria-hidden="true">
            <img class="mark" src="/mark.png" width="384" height="384" alt="" />
          </div>
        </section>

        <section class="features shell" aria-labelledby="features-title">
          <div class="section-heading">
            <h2 id="features-title">Opul is simple and awesome.</h2>
          </div>
          <div class="feature-grid">
            <article>
              <span>01</span>
              <h3>Workspaces</h3>
              <p>
                Separate projects, media, and everyday downloads with their own
                folders, icons, and views.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>More than links</h3>
              <p>
                Download direct files, video pages, playlists, magnet links, and
                torrent files from one app.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Built for Mac</h3>
              <p>
                Built for performance and stability with Tauri and a Rust
                download core.
              </p>
            </article>
          </div>
        </section>

        <section class="open-source shell">
          <div>
            <h2>And it&apos;s open source.</h2>
          </div>
          <div>
            <p>
              Opul is MIT-licensed. Read the code, report a bug, improve it, or
              build something new from it. There is no product license and no
              account to create.
            </p>
            <div class="text-links">
              <a href={ISSUES_URL}>Report an issue ↗</a>
              <a href={CONTRIBUTING_URL}>Contribute ↗</a>
              <a href={SPONSOR_URL}>Support on GitHub Sponsors ↗</a>
            </div>
          </div>
        </section>

        <section class="install shell" aria-labelledby="install-title">
          <h2 id="install-title">One extra step, once.</h2>
          <p>
            If macOS can&apos;t verify your download the first time you open it,
            you can approve it in System Settings. The download page walks you
            through it. After that, Opul opens normally. Choose stable or
            nightly builds for Apple silicon and Intel on the download page.
          </p>
        </section>
      </main>
      <Footer />
    </Layout>
  );
}
