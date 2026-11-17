/** Detect whether this Mac should get the arm64 or x64 DMG. Defaults to Apple silicon. */

export type MacArch = "arm64" | "x64";

export const LATEST_ARM64_DMG =
  "https://github.com/slovakian/opul/releases/latest/download/Opul-arm64.dmg";
export const LATEST_X64_DMG =
  "https://github.com/slovakian/opul/releases/latest/download/Opul-x64.dmg";

export function dmgForArch(arch: MacArch): string {
  return arch === "x64" ? LATEST_X64_DMG : LATEST_ARM64_DMG;
}

type NavigatorUAData = {
  getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string }>;
};

function webglArch(): MacArch | null {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    if (!gl) return null;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    if (!ext) return null;
    const renderer = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) ?? "");
    if (/intel/i.test(renderer)) return "x64";
    if (/apple|m[1-9]\b|metal/i.test(renderer)) return "arm64";
  } catch {
    // Ignore WebGL probe failures and fall through to the default.
  }
  return null;
}

export async function detectMacArch(): Promise<MacArch> {
  const uaData = (navigator as Navigator & { userAgentData?: NavigatorUAData }).userAgentData;
  if (uaData?.getHighEntropyValues) {
    try {
      const { architecture } = await uaData.getHighEntropyValues(["architecture"]);
      if (architecture === "x86") return "x64";
      if (architecture === "arm") return "arm64";
    } catch {
      // Fall through to the WebGL heuristic.
    }
  }
  return webglArch() ?? "arm64";
}
