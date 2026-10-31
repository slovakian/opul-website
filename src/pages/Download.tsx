import { Layout } from "../components/Layout";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { DMG_URL, RELEASES_URL, LATEST_RELEASE_URL } from "../constants";

export function DownloadPage() {
  return (
    <Layout
      title="Download Opul"
      description="Download the latest version of Opul for macOS and open it for the first time."
      canonicalPath="/download/"
      robots="noindex"
      httpEquivRefresh={`1; url=${DMG_URL}`}
    >
      <Nav />
      <main>
        <section class="download shell">
          <h1>Your download is starting.</h1>
          <p class="lede">
            Opul.dmg is the latest version, for macOS 14 or later on Apple silicon and Intel Macs. If it
            doesn&apos;t start,{" "}
            <a href={DMG_URL}>download Opul directly</a>.
          </p>
          <p class="release-note">
            <a href={LATEST_RELEASE_URL}>Release notes</a> ·{" "}
            <a href={RELEASES_URL}>All versions</a>
          </p>
        </section>

        <section class="steps shell" id="install" aria-labelledby="install-title">
          <h2 id="install-title">Three steps, once.</h2>
          <ol>
            <li>
              <h3>Move it to Applications</h3>
              <p>
                Open <kbd>Opul.dmg</kbd> from your Downloads folder, then drag Opul onto the
                Applications folder in the window that appears.
              </p>
            </li>
            <li>
              <h3>Open Opul</h3>
              <p>
                Open Opul from Applications. Opul isn&apos;t notarized by Apple yet, so macOS says it
                can&apos;t verify the app. Close the warning, and don&apos;t choose{" "}
                <kbd>Move to Trash</kbd>.
              </p>
            </li>
            <li>
              <h3>Allow it in System Settings</h3>
              <p>
                Open <kbd>System Settings</kbd> &rarr; <kbd>Privacy &amp; Security</kbd>, scroll down to
                Security, and click <kbd>Open Anyway</kbd> next to the message about Opul. Confirm when
                macOS asks again. It may ask for your password or Touch ID.
              </p>
            </li>
          </ol>
          <p class="done">
            That&apos;s it. From now on Opul opens normally and installs its own updates.
          </p>
        </section>
      </main>
      <Footer />
    </Layout>
  );
}
