import { REPO_URL } from "../constants";
import { shell } from "../ui";
import { Brand } from "./Brand";

const footerLink = "text-[14px] text-muted no-underline hover:text-ink";

export function Footer() {
  return (
    <footer
      class={`${shell} grid min-h-[120px] grid-cols-[1fr_auto_1fr] items-center gap-6 border-t border-line mobile:grid-cols-[1fr] mobile:py-[34px]`}
    >
      <Brand size={28} class={footerLink} />
      <p class="m-0 text-[13px] text-muted">Made by Jason Procka for macOS 🌈</p>
      <div class="flex justify-end gap-[26px] mobile:justify-start narrow:gap-[14px]">
        <a class={footerLink} href="/privacy/">
          Privacy
        </a>
        <a class={footerLink} href="/releases/">
          Releases
        </a>
        <a class={footerLink} href={REPO_URL}>
          GitHub
        </a>
      </div>
    </footer>
  );
}
