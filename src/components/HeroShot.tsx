import { Show } from "solid-js";
import { heroShot } from "../hero-shot";

const frame =
  "overflow-hidden rounded-[16px] border border-line bg-white shadow-[0_22px_48px_rgba(38,25,78,0.16)]";

/**
 * Mac window for the light app screenshot at public/screenshots/opul-light.png.
 * Until that file exists, the mark sits in the same frame.
 */
export function HeroShot() {
  return (
    <div class={heroShot ? undefined : "mobile:hidden"}>
      <div class={frame}>
        <Show
          when={heroShot}
          fallback={
            <div class="flex aspect-[1280/820] items-center justify-center" aria-hidden="true">
              <img
                class="h-auto w-[min(168px,42%)]"
                src="/mark.png"
                width={384}
                height={384}
                alt=""
              />
            </div>
          }
        >
          {(shot) => (
            <img
              class="block h-auto w-full"
              src={shot().src}
              width={shot().width}
              height={shot().height}
              alt="Opul on macOS, with workspaces and downloads"
              decoding="async"
              fetchpriority="high"
            />
          )}
        </Show>
      </div>
    </div>
  );
}
