import { REPO_URL } from "../constants";

export function Footer() {
  return (
    <footer class="footer shell">
      <a class="brand" href="/">
        <img src="/mark.png" width="28" height="28" alt="" />
        <span>Opul</span>
      </a>
      <p>Made by Jason Procka for macOS 🌈</p>
      <div>
        <a href="/privacy/">Privacy</a>
        <a href="/releases/">Releases</a>
        <a href={REPO_URL}>GitHub</a>
      </div>
    </footer>
  );
}
