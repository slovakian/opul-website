import type { JSX } from "@solidjs/web";
import { merge, Show } from "solid-js";
import stylesheet from "virtual:stylesheet";
import { SITE_URL } from "../constants";

export interface DocumentProps {
  title: string;
  description?: string;
  canonicalPath?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  robots?: string;
  themeColor?: string;
  manifest?: boolean;
  appleTouchIcon?: boolean;
  preloadFont?: boolean;
  children: JSX.Element;
}

/** The full HTML document shared by every page. */
export function Document(input: DocumentProps) {
  const props = merge(
    {
      themeColor: "#f7f4ef",
      manifest: false,
      appleTouchIcon: true,
      preloadFont: true,
    },
    input,
  );
  const canonicalUrl = () =>
    props.canonicalPath ? `${SITE_URL}${props.canonicalPath}` : undefined;

  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{props.title}</title>
        <Show when={props.description}>
          <meta name="description" content={props.description} />
        </Show>
        <Show when={props.robots}>
          <meta name="robots" content={props.robots} />
        </Show>
        <Show when={props.themeColor}>
          <meta name="theme-color" content={props.themeColor} />
        </Show>
        <Show when={props.ogTitle}>
          <meta property="og:title" content={props.ogTitle} />
        </Show>
        <Show when={props.ogDescription}>
          <meta property="og:description" content={props.ogDescription} />
        </Show>
        <Show when={props.ogImage}>
          <meta property="og:image" content={props.ogImage} />
        </Show>
        <Show when={props.ogType}>
          <meta property="og:type" content={props.ogType} />
        </Show>
        <Show when={canonicalUrl() && props.ogTitle}>
          <meta property="og:url" content={canonicalUrl()} />
        </Show>
        <Show when={props.twitterCard}>
          <meta name="twitter:card" content={props.twitterCard} />
        </Show>
        <Show when={canonicalUrl()}>
          <link rel="canonical" href={canonicalUrl()} />
        </Show>
        <Show when={props.preloadFont}>
          <link
            rel="preload"
            href="/fonts/inter-latin-wght-normal.woff2"
            as="font"
            type="font/woff2"
            crossorigin=""
          />
        </Show>
        <link rel="stylesheet" href={stylesheet} />
        <link rel="icon" href="/favicon.ico" />
        <Show when={props.appleTouchIcon}>
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        </Show>
        <Show when={props.manifest}>
          <link rel="manifest" href="/manifest.webmanifest" />
        </Show>
      </head>
      <body>{props.children}</body>
    </html>
  );
}
