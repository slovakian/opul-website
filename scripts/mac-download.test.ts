import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  ARM_DMG,
  INTEL_DMG,
  chooseMacArch,
  dmgForArch,
  macosRequirementLabel,
  versionLabel,
} from "../src/mac-download";
import { HERO_SCREENSHOT_SRC, readHeroShot } from "./hero-shot";

const mac =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)";

test("latest stable DMGs use the stable asset names", () => {
  assert.equal(ARM_DMG, "https://github.com/slovakian/opul/releases/latest/download/Opul-arm64.dmg");
  assert.equal(INTEL_DMG, "https://github.com/slovakian/opul/releases/latest/download/Opul-x64.dmg");
  assert.equal(dmgForArch("arm"), ARM_DMG);
  assert.equal(dmgForArch("intel"), INTEL_DMG);
});

test("version label prefers the stable tag", () => {
  assert.equal(versionLabel("v0.2.3", "Opul 0.2.3"), "0.2.3");
  assert.equal(versionLabel("nightly", "Opul Nightly"), "Opul Nightly");
  assert.equal(versionLabel(undefined, "  "), undefined);
});

test("macOS requirement follows Tauri minimumSystemVersion", () => {
  assert.equal(macosRequirementLabel("13.0"), "macOS 13 or later");
  assert.equal(macosRequirementLabel("13.3"), "macOS 13.3 or later");
});

test("defaults to Apple Silicon unless this Mac is Intel", () => {
  assert.equal(
    chooseMacArch({
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      platform: "Windows",
      architecture: "x86_64",
      renderer: "ANGLE (Intel, Intel(R) UHD Graphics, D3D11)",
    }),
    "arm",
  );
  assert.equal(
    chooseMacArch({
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X)",
      platform: "iPhone",
      architecture: "x86",
      renderer: "Intel",
    }),
    "arm",
  );
  assert.equal(chooseMacArch({ userAgent: mac, platform: "MacIntel" }), "arm");
  assert.equal(chooseMacArch({ userAgent: mac, platform: "macOS", architecture: "arm64" }), "arm");
  assert.equal(chooseMacArch({ userAgent: mac, platform: "macOS", architecture: "x86_64" }), "intel");
  assert.equal(
    chooseMacArch({
      userAgent: mac,
      platform: "MacIntel",
      renderer: "ANGLE (Apple, ANGLE Metal Renderer: Apple M2, Unspecified Version)",
    }),
    "arm",
  );
  assert.equal(
    chooseMacArch({
      userAgent: mac,
      platform: "MacIntel",
      renderer: "ANGLE (Intel, Intel(R) Iris(TM) Plus Graphics 655, OpenGL 4.1)",
    }),
    "intel",
  );
  assert.equal(
    chooseMacArch({ userAgent: mac, platform: "macOS", architecture: "arm", renderer: "Intel Iris" }),
    "arm",
  );
});

test("reads a light hero PNG and ignores a missing file", () => {
  assert.equal(readHeroShot(join(tmpdir(), "opul-missing-hero.png")), null);
  const dir = mkdtempSync(join(tmpdir(), "opul-hero-"));
  try {
    const file = join(dir, "opul-light.png");
    const header = Buffer.alloc(24);
    header.write("PNG", 1, "ascii");
    header.write("IHDR", 12, "ascii");
    header.writeUInt32BE(1280, 16);
    header.writeUInt32BE(820, 20);
    writeFileSync(file, header);
    assert.deepEqual(readHeroShot(file), { src: HERO_SCREENSHOT_SRC, width: 1280, height: 820 });
    writeFileSync(file, Buffer.from("not a png"));
    assert.throws(() => readHeroShot(file), /not a PNG/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
