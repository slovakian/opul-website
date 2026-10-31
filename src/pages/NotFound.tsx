import { Document } from "../components/Document";
import { Nav } from "../components/Nav";
import { documentCopy, documentMain, documentTitle, underlinedLink } from "../ui";

export function NotFoundPage() {
  return (
    <Document
      title="Not found — Opul"
      robots="noindex"
      themeColor=""
      preloadFont={false}
      appleTouchIcon={false}
    >
      <Nav showLinks={false} />
      <main class={documentMain}>
        <h1 class={documentTitle}>This page doesn&apos;t exist.</h1>
        <p class={documentCopy}>
          <a class={underlinedLink} href="/">
            Go to the Opul home page
          </a>{" "}
          or{" "}
          <a class={underlinedLink} href="/download/">
            download Opul
          </a>
          .
        </p>
      </main>
    </Document>
  );
}
