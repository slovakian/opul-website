import { HydrationScript, type JSX } from "@solidjs/web";

/**
 * The HTML shell around the app. Page-specific head tags come from each
 * page's `PageHead`; start mode injects the stylesheet and client entry.
 */
export default function Document(props: { children: JSX.Element }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
