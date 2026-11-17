import { createSignal, onSettled } from "solid-js";
import { RELEASES_URL, REPO_URL } from "../constants";
import { detectMacArch, dmgForArch, LATEST_ARM64_DMG, LATEST_X64_DMG, type MacArch } from "../macArch";
import { stable } from "../releases";
import { actions, primaryButton, releaseNote, secondaryButton } from "../ui";

const archLink =
  "text-ink no-underline border-b border-line hover:border-line-strong";

export function MacDownloadCta() {
  const [arch, setArch] = createSignal<MacArch>("arm64");

  onSettled(() => {
    void detectMacArch().then(setArch);
  });

  return (
    <>
      <div class={actions}>
        <a class={primaryButton} href={dmgForArch(arch())} download>
          Download for Mac
        </a>
        <a class={secondaryButton} href={REPO_URL}>
          View on GitHub
        </a>
      </div>
      <p class={releaseNote}>
        {stable?.name ?? "Latest stable"} · macOS 13 or later ·{" "}
        <a class={archLink} href={LATEST_ARM64_DMG} download>
          Apple Silicon
        </a>
        {" · "}
        <a class={archLink} href={LATEST_X64_DMG} download>
          Intel
        </a>
        {" · "}
        <a class={archLink} href={RELEASES_URL}>
          All releases
        </a>
      </p>
    </>
  );
}
