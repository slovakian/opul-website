import { MACOS_MINIMUM_VERSION } from "./constants";

export type MacArch = "arm" | "intel";

/**
 * Asset names are stable across current stable releases (`Opul-arm64.dmg`,
 * `Opul-x64.dmg` on v0.2.2 and v0.2.3). GitHub's latest-download URL keeps
 * working when a new version ships with the same names.
 */
const LATEST_DOWNLOAD = "https://github.com/slovakian/opul/releases/latest/download";

export const ARM_DMG = `${LATEST_DOWNLOAD}/Opul-arm64.dmg`;
export const INTEL_DMG = `${LATEST_DOWNLOAD}/Opul-x64.dmg`;

export function dmgForArch(arch: MacArch): string {
  return arch === "intel" ? INTEL_DMG : ARM_DMG;
}

export function versionLabel(tag: string | undefined, name: string | undefined): string | undefined {
  if (tag && /^v\d+\.\d+\.\d+$/.test(tag)) return tag.slice(1);
  const trimmed = name?.trim();
  return trimmed ? trimmed : undefined;
}

/** "13.0" from Tauri's minimumSystemVersion is "macOS 13 or later". */
export function macosRequirementLabel(minimum = MACOS_MINIMUM_VERSION): string {
  const [major, minor = "0"] = minimum.split(".");
  const shown = minor === "0" || minor === undefined ? major : `${major}.${minor}`;
  return `macOS ${shown} or later`;
}

export function isMac(userAgent: string, platform?: string): boolean {
  if (/iPhone|iPad|iPod/.test(userAgent)) return false;
  if (platform && /mac/i.test(platform)) return true;
  return /Macintosh|Mac OS X/.test(userAgent);
}

export function archFromClientHint(architecture: string | undefined): MacArch | undefined {
  if (!architecture) return undefined;
  const value = architecture.toLowerCase().replaceAll("_", "-");
  if (value === "arm" || value === "arm64" || value === "aarch64") return "arm";
  if (value === "x86" || value === "x64" || value === "x86-64" || value === "amd64") return "intel";
  return undefined;
}

export function archFromRenderer(renderer: string | undefined): MacArch | undefined {
  if (!renderer) return undefined;
  const value = renderer.toLowerCase();
  if (value.includes("apple")) return "arm";
  if (value.includes("intel")) return "intel";
  return undefined;
}

/**
 * Apple Silicon unless this looks like a Mac and the hints say Intel.
 * Other systems default to Apple Silicon even when their own CPU is x86.
 */
export function chooseMacArch(input: {
  userAgent?: string;
  platform?: string;
  architecture?: string;
  renderer?: string;
}): MacArch {
  if (!isMac(input.userAgent ?? "", input.platform)) return "arm";
  return archFromClientHint(input.architecture) ?? archFromRenderer(input.renderer) ?? "arm";
}

interface ClientHints {
  platform?: string;
  getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string }>;
}

function clientHints(nav: Navigator): ClientHints | undefined {
  return (nav as Navigator & { userAgentData?: ClientHints }).userAgentData;
}

function readWebGlRenderer(): string | undefined {
  if (typeof document === "undefined") return undefined;
  try {
    const gl = document.createElement("canvas").getContext("webgl");
    if (!gl) return undefined;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    if (!ext) return undefined;
    const value = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
    return typeof value === "string" ? value : undefined;
  } catch {
    return undefined;
  }
}

export async function detectMacArch(): Promise<MacArch> {
  if (typeof navigator === "undefined") return "arm";
  const userAgent = navigator.userAgent;
  const hints = clientHints(navigator);
  const platform = hints?.platform || navigator.platform;
  let architecture: string | undefined;
  if (hints?.getHighEntropyValues) {
    try {
      architecture = (await hints.getHighEntropyValues(["architecture"])).architecture;
    } catch {
      architecture = undefined;
    }
  }
  if (!isMac(userAgent, platform)) return "arm";
  const fromHint = archFromClientHint(architecture);
  if (fromHint) return fromHint;
  return chooseMacArch({
    userAgent,
    platform,
    renderer: readWebGlRenderer(),
  });
}
