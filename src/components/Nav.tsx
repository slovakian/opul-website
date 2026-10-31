import { Show } from "solid-js";
import { REPO_URL, SPONSOR_URL } from "../constants";
import { shell } from "../ui";
import { Brand } from "./Brand";

const navLink = "text-[14px] text-muted no-underline hover:text-ink";

export function Nav(props: { showLinks?: boolean }) {
  const showLinks = () => props.showLinks ?? true;
  return (
    <nav
      class={`${shell} flex h-[78px] items-center justify-between`}
      aria-label={showLinks() ? "Main navigation" : undefined}
    >
      <Brand size={34} />
      <Show when={showLinks()}>
        <div class="flex gap-[26px] narrow:gap-[14px]">
          <a class={navLink} href="/releases/">
            Releases
          </a>
          <a class={navLink} href={REPO_URL}>
            Source
          </a>
          <a class={navLink} href={SPONSOR_URL}>
            Sponsor
          </a>
        </div>
      </Show>
    </nav>
  );
}
