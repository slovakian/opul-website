import { createHash } from "node:crypto";
import * as fs from "node:fs/promises";
import { toSSG } from "hono/ssg";
import { fetchReleases } from "./releases";

async function build() {
  const releases = await fetchReleases();
  await fs.writeFile(
    "src/releases.generated.ts",
    'import type { Release } from "../scripts/releases";\nexport default ' +
      JSON.stringify(releases, null, 2) +
      " satisfies Release[];\n",
  );
  // Versioning the stylesheet URL lets browsers cache it forever (see public/_headers)
  // instead of revalidating it, render-blocking, on every navigation.
  const styles = await fs.readFile("public/styles.css");
  const stylesVersion = createHash("sha256").update(styles).digest("hex").slice(0, 10);
  await fs.writeFile(
    "src/assets.generated.ts",
    `export const STYLESHEET_URL = "/styles.css?v=${stylesVersion}";\n`,
  );
  const { app } = await import("../src/index");
  console.log("Generating static site with Hono SSG...");
  const result = await toSSG(app, fs, {
    dir: "./public",
  });

  if (!result.success) {
    console.error("SSG failed:", result.error);
    process.exit(1);
  }

  console.log(`Generated ${result.files.length} static files:`);
  for (const file of result.files) {
    console.log(` - ${file}`);
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
