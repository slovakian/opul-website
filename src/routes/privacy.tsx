import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Opul" },
      { name: "description", content: "Opul privacy information." },
    ],
    links: [{ rel: "canonical", href: "https://opul.procka.org/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <nav className="nav shell">
        <Link className="brand" to="/">
          <img src="/mark.png" width={34} height={34} alt="" />
          <span>Opul</span>
        </Link>
      </nav>
      <main className="document shell">
        <p className="eyebrow">Privacy</p>
        <h1>No account. No analytics.</h1>
        <p>
          Opul does not require an account and the website does not use analytics, advertising
          trackers, or cookies.
        </p>
        <p>
          The app connects to addresses you ask it to download from, along with the services and
          peers required for those downloads. Guided extraction uses a dedicated WebKit data store
          on your Mac so website sessions can persist. You can clear that data from Opul&apos;s
          settings.
        </p>
        <p>
          GitHub serves source code, releases, and sponsorship. GitHub&apos;s own privacy terms
          apply when you use those services.
        </p>
        <p>
          <a href="https://github.com/slovakian/opul">Inspect the source ↗</a>
        </p>
      </main>
    </>
  );
}
