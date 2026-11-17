import { closeSync, existsSync, openSync, readSync } from "node:fs";

/**
 * Light-theme screenshot of the current Opul interface.
 * The README hero (`assets/readme/opul-hero.png`) is captured with
 * `theme: "dark"`. Drop a light PNG here and the homepage frames it.
 * A 1280×820 capture matches the README hero viewport.
 */
export const HERO_SCREENSHOT_FILE = "public/screenshots/opul-light.png";
export const HERO_SCREENSHOT_SRC = "/screenshots/opul-light.png";

export type HeroShot = { src: string; width: number; height: number };

export function readHeroShot(file = HERO_SCREENSHOT_FILE): HeroShot | null {
  if (!existsSync(file)) return null;
  const fd = openSync(file, "r");
  try {
    const header = Buffer.alloc(24);
    if (readSync(fd, header, 0, 24, 0) !== 24) throw new Error(`${file} is not a PNG`);
    if (header.toString("ascii", 1, 4) !== "PNG" || header.toString("ascii", 12, 16) !== "IHDR") {
      throw new Error(`${file} is not a PNG`);
    }
    const width = header.readUInt32BE(16);
    const height = header.readUInt32BE(20);
    if (width < 1 || height < 1) throw new Error(`${file} has invalid dimensions`);
    return { src: HERO_SCREENSHOT_SRC, width, height };
  } finally {
    closeSync(fd);
  }
}
