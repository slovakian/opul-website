import { Layout } from "../components/Layout";
import { Nav } from "../components/Nav";
import { REPO_URL } from "../constants";

export function PrivacyPage() {
  return (
    <Layout
      title="Privacy — Opul"
      description="Opul privacy information."
      canonicalPath="/privacy/"
    >
      <Nav showLinks={false} />
      <main class="document shell">
        <h1>No account. No analytics.</h1>
        <p>
          Opul does not require an account and the website does not use analytics, advertising
          trackers, or cookies.
        </p>
        <p>
          The app connects to addresses you ask it to download from, along with the services and peers
          required for those downloads. Guided extraction uses a dedicated WebKit data store on your Mac
          so website sessions can persist. You can clear that data from Opul&apos;s settings.
        </p>
        <p>
          About once a day, Opul asks GitHub whether a newer version exists. That request identifies
          only the app and its version; it carries no personal information.
        </p>
        <p>
          GitHub serves source code, releases, updates, and sponsorship. GitHub&apos;s own privacy
          terms apply when you use those services.
        </p>
        <p>
          <a href={REPO_URL}>Inspect the source ↗</a>
        </p>
      </main>
    </Layout>
  );
}
