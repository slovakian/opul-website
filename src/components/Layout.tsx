import type { Child } from "hono/jsx";
import { html } from "hono/html";
import { SITE_URL } from "../constants";
import { STYLESHEET_URL } from "../assets.generated";

export interface LayoutProps {
  title: string;
  description?: string;
  canonicalPath?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  robots?: string;
  manifest?: boolean;
  children: Child;
}

export function Layout({
  title,
  description,
  canonicalPath,
  ogTitle,
  ogDescription,
  ogImage,
  ogType,
  twitterCard,
  robots,
  manifest = false,
  children,
}: LayoutProps) {
  const canonicalUrl = canonicalPath ? `${SITE_URL}${canonicalPath}` : undefined;

  return (
    <>
      {html`<!doctype html>`}
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="color-scheme" content="light" />
          {/* Paint the page colour before styles.css arrives, so navigations never flash white. */}
          <style>{"html{background:#f7f4ef}"}</style>
          <title>{title}</title>
          {description && <meta name="description" content={description} />}
          {robots && <meta name="robots" content={robots} />}
          <meta name="theme-color" content="#f7f4ef" />
          {ogTitle && <meta property="og:title" content={ogTitle} />}
          {ogDescription && <meta property="og:description" content={ogDescription} />}
          {ogImage && <meta property="og:image" content={ogImage} />}
          {ogType && <meta property="og:type" content={ogType} />}
          {canonicalUrl && ogTitle && <meta property="og:url" content={canonicalUrl} />}
          {twitterCard && <meta name="twitter:card" content={twitterCard} />}
          {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
          <link
            rel="preload"
            href="/fonts/inter-latin-wght-normal.woff2"
            as="font"
            type="font/woff2"
            crossorigin=""
          />
          <link rel="stylesheet" href={STYLESHEET_URL} />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          {manifest && <link rel="manifest" href="/manifest.webmanifest" />}
          {/* Chrome prerenders a page when a link to it is hovered, so the click shows it instantly. */}
          <script type="speculationrules">
            {html`{"prerender":[{"where":{"href_matches":"/*"},"eagerness":"moderate"}]}`}
          </script>
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
