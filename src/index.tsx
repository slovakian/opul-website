import { Hono } from "hono";
import { HomePage } from "./pages/Home";
import { DownloadPage } from "./pages/Download";
import { ReleasesPage } from "./pages/Releases";
import { PrivacyPage } from "./pages/Privacy";
import { NotFoundPage } from "./pages/NotFound";

export const app = new Hono();

// Cache headers for edge caching
app.use("*", async (c, next) => {
  await next();
  if (!c.res.headers.has("Cache-Control")) {
    c.header("Cache-Control", "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800");
  }
});

app.get("/", (c) => c.html(<HomePage />));
app.get("/download/", (c) => c.html(<DownloadPage />));
app.get("/releases/", (c) => c.html(<ReleasesPage />));
app.get("/privacy/", (c) => c.html(<PrivacyPage />));
app.get("/404.html", (c) => c.html(<NotFoundPage />));

app.notFound((c) => c.html(<NotFoundPage />, 404));

export default app;
