import { For, Show } from "solid-js";
import { PageHead } from "../components/PageHead";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ReleaseDownloads } from "../components/ReleaseDownloads";
import { stable, nightly, releaseDate } from "../releases";
import {
  copy,
  lede,
  pageTitle,
  panel,
  panelHeading,
  releaseEntry,
  releaseNote,
  releaseTitle,
  shell,
} from "../ui";

const channels = [
  { channel: "Stable", release: stable, summary: "The latest stable release." },
  {
    channel: "Nightly",
    release: nightly,
    summary: "Preview the latest changes. Nightly builds may have bugs.",
  },
];

const stepTitle = "mx-0 mt-7 mb-3 text-[22px]";
const step =
  "border-t border-line pt-[22px] [counter-increment:step] before:text-[12px] before:text-muted before:content-['0'_counter(step)]";

export function DownloadPage() {
  return (
    <>
      <PageHead
        title="Download Opul"
        description="Download the latest version of Opul for macOS and open it for the first time."
        canonicalPath="/download/"
      />
      <Nav />
      <main>
        <section class={`${shell} pt-[90px] pb-10`}>
          <h1 class={pageTitle}>Download Opul.</h1>
          <p class={`${lede} mb-0`}>
            Choose a release and the installer for your Mac. In the Apple menu, open About This Mac.
            A Chip entry means Apple silicon; a Processor entry with Intel means Intel x86_64.
          </p>
          <For each={channels}>
            {({ channel, release, summary }) => (
              <article class={releaseEntry} id={channel.toLowerCase()}>
                <h2 class={releaseTitle}>{channel}</h2>
                <p>{summary}</p>
                <Show
                  when={release}
                  fallback={<p>No {channel.toLowerCase()} release is available yet.</p>}
                >
                  {(release) => (
                    <>
                      <h3 class="wrap-anywhere">{release().name}</h3>
                      <p class={releaseNote}>
                        <time datetime={release().publishedAt}>{releaseDate(release())}</time> ·{" "}
                        <a href={release().url}>Release notes</a>
                      </p>
                      <ReleaseDownloads release={release()} />
                    </>
                  )}
                </Show>
              </article>
            )}
          </For>
          <p>
            <a href="/releases/">Browse all releases</a>
          </p>
        </section>

        <section
          class={`${shell} ${panel} mt-10 mb-[110px]`}
          id="install"
          aria-labelledby="install-title"
        >
          <h2 id="install-title" class={panelHeading}>
            Three steps, once.
          </h2>
          <ol class="mx-0 mt-11 mb-0 grid list-none grid-cols-[repeat(3,1fr)] gap-[34px] p-0 [counter-reset:step] mobile:grid-cols-[1fr]">
            <li class={step}>
              <h3 class={stepTitle}>Move it to Applications</h3>
              <p class={copy}>
                Open the downloaded <kbd>.dmg</kbd> file, then drag Opul or Opul Nightly onto the
                Applications folder in the window that appears.
              </p>
            </li>
            <li class={step}>
              <h3 class={stepTitle}>Open Opul</h3>
              <p class={copy}>
                Open Opul from Applications. If macOS says it can&apos;t verify the app, close the
                warning, and don&apos;t choose <kbd>Move to Trash</kbd>.
              </p>
            </li>
            <li class={step}>
              <h3 class={stepTitle}>Allow it in System Settings</h3>
              <p class={copy}>
                Open <kbd>System Settings</kbd> &rarr; <kbd>Privacy &amp; Security</kbd>, scroll
                down to Security, and click <kbd>Open Anyway</kbd> next to the message about Opul.
                Confirm when macOS asks again. It may ask for your password or Touch ID.
              </p>
            </li>
          </ol>
          <p class="mx-0 mt-11 mb-0 text-ink">
            From now on Opul opens normally. Visit this page for the latest stable and nightly
            downloads.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
