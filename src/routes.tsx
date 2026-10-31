import { renderToString } from "@solidjs/web";
import type { Component } from "solid-js";
import { HomePage } from "./pages/Home";
import { DownloadPage } from "./pages/Download";
import { ReleasesPage } from "./pages/Releases";
import { PrivacyPage } from "./pages/Privacy";
import { NotFoundPage } from "./pages/NotFound";

const pages: Record<string, Component> = {
  "/": HomePage,
  "/download/": DownloadPage,
  "/releases/": ReleasesPage,
  "/privacy/": PrivacyPage,
};

/**
 * Every page written to static assets at build time, keyed by URL path, with
 * the file each one is served from.
 */
export const prerenderRoutes: Record<string, string> = {
  "/": "index.html",
  "/download/": "download/index.html",
  "/releases/": "releases/index.html",
  "/privacy/": "privacy/index.html",
  "/404.html": "404.html",
};

export function render(pathname: string): { status: number; html: string } {
  const found = Object.hasOwn(pages, pathname);
  const Page = found ? pages[pathname] : NotFoundPage;
  return {
    status: found || pathname === "/404.html" ? 200 : 404,
    html: "<!doctype html>" + renderToString(() => <Page />, { noScripts: true }),
  };
}
