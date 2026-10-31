import { Layout } from "../components/Layout";
import { Nav } from "../components/Nav";

export function NotFoundPage() {
  return (
    <Layout
      title="Not found — Opul"
      robots="noindex"
      themeColor=""
      preloadFont={false}
      appleTouchIcon={false}
    >
      <Nav showLinks={false} />
      <main class="document shell">
        <h1>This page doesn&apos;t exist.</h1>
        <p>
          <a href="/">Go to the Opul home page</a> or <a href="/download/">download Opul</a>.
        </p>
      </main>
    </Layout>
  );
}
