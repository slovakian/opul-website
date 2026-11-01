import * as fs from "node:fs/promises";
import { fetchReleases } from "./releases";

// Snapshots the GitHub releases into a module the Solid pages import, so
// rendering (prerender and Worker SSR) never calls the GitHub API.
const releases = await fetchReleases();
await fs.writeFile(
  "src/releases.generated.ts",
  'import type { Release } from "../scripts/releases";\nexport default ' +
    JSON.stringify(releases, null, 2) +
    " satisfies Release[];\n",
);
console.log(`Fetched ${releases.length} releases.`);
