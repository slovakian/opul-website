import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://opul.procka.org/" }],
  }),
  component: HomePage,
});

function Brand({ compact = false }: Readonly<{ compact?: boolean }>) {
  return (
    <Link className="brand" to="/">
      <img src="/mark.png" width={compact ? 28 : 34} height={compact ? 28 : 34} alt="" />
      <span>Opul</span>
    </Link>
  );
}

function HomePage() {
  return (
    <>
      <nav className="nav shell" aria-label="Main navigation">
        <Brand />
        <div className="nav-links">
          <a href="https://github.com/slovakian/opul">Source</a>
          <a href="https://github.com/sponsors/slovakian">Sponsor</a>
        </div>
      </nav>

      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <p className="eyebrow">Free and open source</p>
            <h1>
              Your downloads,
              <br />
              beautifully organized.
            </h1>
            <p className="lede">
              Opul is a native download manager for macOS. Keep video, direct, and torrent downloads
              in focused Workspaces that feel at home on your Mac.
            </p>
            <div className="actions">
              <a
                className="button primary"
                href="https://github.com/slovakian/opul/releases/latest"
              >
                Download for macOS
              </a>
              <a className="button secondary" href="https://github.com/slovakian/opul">
                View on GitHub
              </a>
            </div>
            <p className="release-note">macOS 14+ · Ad-hoc signed and not notarized</p>
          </div>
          <div className="art" aria-hidden="true">
            <img className="glass" src="/opalescent-glass.png" alt="" />
            <img className="mark" src="/mark.png" alt="" />
          </div>
        </section>

        <section className="features shell" aria-labelledby="features-title">
          <div className="section-heading">
            <p className="eyebrow">Made for macOS</p>
            <h2 id="features-title">One calm place for every download.</h2>
          </div>
          <div className="feature-grid">
            <article>
              <span>01</span>
              <h3>Workspaces</h3>
              <p>
                Separate projects, media, and everyday downloads with their own folders, icons, and
                views.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>More than links</h3>
              <p>
                Download direct files, video pages, playlists, magnet links, and torrent files from
                one app.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Native by design</h3>
              <p>
                SwiftUI and Rust deliver a focused Mac experience without accounts, subscriptions,
                or tracking.
              </p>
            </article>
          </div>
        </section>

        <section className="open-source shell">
          <div>
            <p className="eyebrow">Built in public</p>
            <h2>Useful software should belong to the people who use it.</h2>
          </div>
          <div>
            <p>
              Opul is MIT-licensed. Read the code, report a bug, improve it, or build something new
              from it. There is no product license and no account to create.
            </p>
            <div className="text-links">
              <a href="https://github.com/slovakian/opul/issues">Report an issue ↗</a>
              <a href="https://github.com/slovakian/opul/blob/main/CONTRIBUTING.md">Contribute ↗</a>
              <a href="https://github.com/sponsors/slovakian">Support on GitHub Sponsors ↗</a>
            </div>
          </div>
        </section>

        <section className="install shell" aria-labelledby="install-title">
          <p className="eyebrow">Before you download</p>
          <h2 id="install-title">A small macOS caveat.</h2>
          <p>
            Opul does not yet participate in Apple&apos;s paid Developer Program, so current builds
            are ad-hoc signed rather than notarized. On first launch, Control-click Opul, choose
            <strong> Open</strong>, then confirm. Download only from the official GitHub repository
            and verify the published SHA-256 checksum.
          </p>
        </section>
      </main>

      <footer className="footer shell">
        <Brand compact />
        <p>Made by Jason Procka.</p>
        <div>
          <Link to="/privacy">Privacy</Link>
          <a href="https://github.com/slovakian/opul">GitHub</a>
        </div>
      </footer>
    </>
  );
}
