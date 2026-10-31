import { render } from "./routes";

// Prerendered pages and other static files are served from Workers static
// assets before this Worker runs. It server-renders whatever is left, which
// in practice is the not-found page for unknown paths.
export default {
  fetch(request: Request): Response {
    const { status, html } = render(new URL(request.url).pathname);
    return new Response(html, {
      status,
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
        "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  },
};
