import { For, Show } from "solid-js";
import type { Release } from "../../scripts/releases";
import { actions, secondaryButton } from "../ui";

export function ReleaseDownloads(props: { release: Release }) {
  return (
    <div class={actions}>
      <For each={props.release.downloads}>
        {(download) => (
          <a class={secondaryButton} href={download.url}>
            {download.label}
          </a>
        )}
      </For>
      <Show when={props.release.downloads.length === 0}>
        <p>
          Installers are not available for this release.{" "}
          <a href={props.release.url}>View on GitHub</a>.
        </p>
      </Show>
    </div>
  );
}
