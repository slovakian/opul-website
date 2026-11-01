import { PageHead } from "../components/PageHead";
import { Nav } from "../components/Nav";
import { REPO_URL } from "../constants";
import { documentCopy, documentMain, documentTitle, underlinedLink } from "../ui";

export function PrivacyPage() {
  return (
    <>
      <PageHead
        title="Privacy — Opul"
        description="Opul privacy information."
        canonicalPath="/privacy/"
      />
      <Nav showLinks={false} />
      <main class={documentMain}>
        <h1 class={documentTitle}>No account. No analytics.</h1>
        <p class={documentCopy}>
          Opul does not require an account and the website does not use analytics, advertising
          trackers, or cookies.
        </p>
        <p class={documentCopy}>
          The app connects to addresses you ask it to download from, along with the services and
          peers required for those downloads. Guided extraction uses a dedicated WebKit data store
          on your Mac so website sessions can persist. You can clear that data from Opul&apos;s
          settings.
        </p>
        <p class={documentCopy}>
          About once a day, Opul asks GitHub whether a newer version exists. That request identifies
          only the app and its version; it carries no personal information.
        </p>
        <p class={documentCopy}>
          GitHub serves source code, releases, updates, and sponsorship. GitHub&apos;s own privacy
          terms apply when you use those services.
        </p>
        <p class={documentCopy}>
          <a class={underlinedLink} href={REPO_URL}>
            Inspect the source ↗
          </a>
        </p>
      </main>
    </>
  );
}
