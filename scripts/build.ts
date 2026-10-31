import * as fs from "node:fs/promises";
import { toSSG } from "hono/ssg";
import { app } from "../src/index";

async function build() {
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
