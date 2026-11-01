import { useHead, type HeadTag } from "@solidjs/web";
import { SITE_URL } from "../constants";

export interface PageHeadProps {
  title: string;
  description?: string;
  canonicalPath?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  robots?: string;
  /** Pass `null` to omit the theme color. */
  themeColor?: string | null;
  manifest?: boolean;
  appleTouchIcon?: boolean;
  preloadFont?: boolean;
}

const meta = (name: string, content: string | undefined): HeadTag[] =>
  content ? [{ tag: "meta", props: { name, content } }] : [];
const property = (property: string, content: string | undefined): HeadTag[] =>
  content ? [{ tag: "meta", props: { property, content } }] : [];

/** Declares a page's title and head tags; they change with client navigation. */
export function PageHead(props: PageHeadProps) {
  const canonicalUrl = props.canonicalPath ? `${SITE_URL}${props.canonicalPath}` : undefined;
  useHead([
    { tag: "title", props: { children: props.title } },
    ...meta("description", props.description),
    ...meta("robots", props.robots),
    ...meta("theme-color", props.themeColor === null ? undefined : (props.themeColor ?? "#f7f4ef")),
    ...property("og:title", props.ogTitle),
    ...property("og:description", props.ogDescription),
    ...property("og:image", props.ogImage),
    ...property("og:type", props.ogType),
    ...property("og:url", props.ogTitle ? canonicalUrl : undefined),
    ...meta("twitter:card", props.twitterCard),
    ...(canonicalUrl
      ? [{ tag: "link", props: { rel: "canonical", href: canonicalUrl } } as const]
      : []),
    ...(props.preloadFont === false
      ? []
      : [
          {
            tag: "link",
            props: {
              rel: "preload",
              href: "/fonts/inter-latin-wght-normal.woff2",
              as: "font",
              type: "font/woff2",
              crossorigin: "",
            },
          } as const,
        ]),
    ...(props.appleTouchIcon === false
      ? []
      : [
          {
            tag: "link",
            props: { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
          } as const,
        ]),
    ...(props.manifest
      ? [{ tag: "link", props: { rel: "manifest", href: "/manifest.webmanifest" } } as const]
      : []),
  ]);
  return null;
}
