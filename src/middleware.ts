import type { RequestEvent } from "@solidjs/web";

// Fronts every server-rendered request (see `start.middleware` in vite.config.ts).

const PAGES = ["/download", "/releases", "/privacy"];

export default async function middleware(
  event: RequestEvent,
  next: () => Promise<Response>,
): Promise<Response> {
  // Pages live at trailing-slash URLs; redirect the bare form to the canonical one.
  const url = new URL(event.request.url);
  if (PAGES.includes(url.pathname)) {
    url.pathname += "/";
    return Response.redirect(url, 308);
  }

  const response = await next();
  if (response.headers.get("Content-Type")?.includes("text/html")) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    );
  }
  return response;
}
