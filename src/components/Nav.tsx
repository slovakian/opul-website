import { REPO_URL, SPONSOR_URL } from "../constants";

export function Nav() {
  return (
    <nav class="nav shell" aria-label="Main navigation">
      <a class="brand" href="/">
        <img src="/mark.png" width="34" height="34" alt="" />
        <span>Opul</span>
      </a>
      <div class="nav-links">
        <a href="/releases/">Releases</a>
        <a href={REPO_URL}>Source</a>
        <a href={SPONSOR_URL}>Sponsor</a>
      </div>
    </nav>
  );
}
