import { createSignal, onSettled } from "solid-js";
import { REPO_URL } from "../constants";
import {
  ARM_DMG,
  INTEL_DMG,
  detectMacArch,
  dmgForArch,
  macosRequirementLabel,
  versionLabel,
  type MacArch,
} from "../mac-download";
import { stable } from "../releases";
import { actions, primaryButton, releaseNote, secondaryButton } from "../ui";

const archLink = (selected: boolean) => (selected ? "font-semibold text-ink" : undefined);

export function MacDownload() {
  const [arch, setArch] = createSignal<MacArch>("arm");
  onSettled(() => {
    if (typeof document === "undefined") return;
    void detectMacArch().then(setArch);
  });

  const version = versionLabel(stable?.tag, stable?.name);
  const requirement = macosRequirementLabel();

  return (
    <>
      <div class={actions}>
        <a class={`${primaryButton} mobile:w-full`} href={dmgForArch(arch())}>
          Download for Mac
        </a>
        <a class={secondaryButton} href={REPO_URL}>
          View on GitHub
        </a>
      </div>
      <p class={releaseNote}>
        {version ? `${version} · ${requirement}` : requirement}
      </p>
      <p class="mx-0 mt-1.5 mb-0 text-[12px] text-muted">
        <a class={archLink(arch() === "arm")} href={ARM_DMG}>
          Apple Silicon
        </a>
        {" · "}
        <a class={archLink(arch() === "intel")} href={INTEL_DMG}>
          Intel
        </a>
        {" · "}
        <a href="/releases/">All releases</a>
      </p>
    </>
  );
}
