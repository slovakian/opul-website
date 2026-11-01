import { Show } from "solid-js";
import { PageHead } from "../components/PageHead";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { REPO_URL, ISSUES_URL, CONTRIBUTING_URL, SPONSOR_URL } from "../constants";
import { stable, nightly } from "../releases";
import {
  actions,
  copy,
  lede,
  panel,
  panelHeading,
  primaryButton,
  releaseNote,
  secondaryButton,
  shell,
  underlinedLink,
} from "../ui";

const features = [
  {
    title: "Workspaces",
    body: "Separate projects, media, and everyday downloads with their own folders, icons, and views.",
  },
  {
    title: "More than links",
    body: "Download direct files, video pages, playlists, magnet links, and torrent files from one app.",
  },
  {
    title: "Built for Mac",
    body: "Built for performance and stability with Tauri and a Rust download core.",
  },
];

export function HomePage() {
  return (
    <>
      <PageHead
        title="Opul — a native download manager for macOS"
        description="Opul is a free, open-source download manager built for macOS."
        canonicalPath="/"
        ogTitle="Opul"
        ogDescription="Opul is a free, open-source download manager built for macOS."
        ogImage="https://opul.procka.org/og.jpg"
        ogType="website"
        twitterCard="summary_large_image"
        manifest
      />
      <Nav />
      <main>
        <section
          class={`${shell} grid min-h-[690px] grid-cols-[1.08fr_0.92fr] items-center gap-[70px] pt-[74px] pb-[110px] mobile:min-h-auto mobile:grid-cols-[1fr] mobile:gap-10 mobile:pt-[60px] mobile:pb-[84px]`}
        >
          <div>
            <h1>
              A download manager
              <br />
              for macOS.
            </h1>
            <p class={lede}>
              Opul is a native download manager for macOS. Keep video, direct, and torrent downloads
              in focused Workspaces that feel at home on your Mac.
            </p>
            <div class={actions}>
              <a class={primaryButton} href="/download/">
                Download for macOS
              </a>
              <a class={secondaryButton} href={REPO_URL}>
                View on GitHub
              </a>
            </div>
            <p class={releaseNote}>
              {stable?.name ?? "Stable downloads"} · macOS 14 or later · Apple silicon and Intel ·{" "}
              <a href="/releases/">Release notes</a>
            </p>
            <Show when={nightly}>
              <a
                class="mt-[18px] inline-flex items-center gap-1.5 rounded-full border border-line bg-frost py-1.5 pr-3.5 pl-2.5 text-[13px] font-[550] text-muted no-underline transition-[color,border-color] duration-[180ms] ease-[ease] hover:border-line-strong hover:text-ink"
                href="/download/#nightly"
              >
                <span aria-hidden="true">🌚</span> Want the latest changes? Try Nightly{" "}
                <span aria-hidden="true">→</span>
              </a>
            </Show>
          </div>
          <div class="flex items-center justify-center mobile:hidden" aria-hidden="true">
            <img
              class="h-auto w-[min(280px,70%)] drop-shadow-[0_18px_24px_rgba(38,25,78,0.18)]"
              src="/mark.png"
              alt=""
            />
          </div>
        </section>

        <section class={`${shell} py-[104px]`} aria-labelledby="features-title">
          <div class="max-w-[690px]">
            <h2 id="features-title">Opul is simple and awesome.</h2>
          </div>
          <div class="mt-[62px] grid grid-cols-[repeat(3,1fr)] gap-[22px] mobile:grid-cols-[1fr] mobile:gap-[42px]">
            {features.map((feature, index) => (
              <article class="border-t border-line pt-[22px]">
                <span class="text-[12px] text-muted">{String(index + 1).padStart(2, "0")}</span>
                <h3 class="mx-0 mt-10 mb-3 text-[22px]">{feature.title}</h3>
                <p class={copy}>{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          class={`${shell} grid grid-cols-[1fr_1fr] gap-[90px] border-t border-line py-[110px] mobile:grid-cols-[1fr] mobile:gap-[26px]`}
        >
          <div>
            <h2 class="max-w-[580px]">And it&apos;s open source.</h2>
          </div>
          <div>
            <p class={copy}>
              Opul is MIT-licensed. Read the code, report a bug, improve it, or build something new
              from it. There is no product license and no account to create.
            </p>
            <div class="mt-8 flex flex-col items-start gap-3.5">
              <a class={underlinedLink} href={ISSUES_URL}>
                Report an issue ↗
              </a>
              <a class={underlinedLink} href={CONTRIBUTING_URL}>
                Contribute ↗
              </a>
              <a class={underlinedLink} href={SPONSOR_URL}>
                Support on GitHub Sponsors ↗
              </a>
            </div>
          </div>
        </section>

        <section class={`${shell} ${panel} mt-5 mb-[110px]`} aria-labelledby="install-title">
          <h2 id="install-title" class={panelHeading}>
            One extra step, once.
          </h2>
          <p class={`${copy} mb-0 max-w-[820px]`}>
            If macOS can&apos;t verify your download the first time you open it, you can approve it
            in System Settings. The download page walks you through it. After that, Opul opens
            normally. Choose stable or nightly builds for Apple silicon and Intel on the download
            page.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
