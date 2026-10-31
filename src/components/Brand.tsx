/** The Opul mark and wordmark, linking home. */
export function Brand(props: { size: number; class?: string }) {
  return (
    <a
      class={["inline-flex items-center gap-[10px] font-[650] no-underline", props.class]}
      href="/"
    >
      <img
        class="rounded-[9px]"
        src="/mark.png"
        width={props.size}
        height={props.size}
        alt=""
      />
      <span>Opul</span>
    </a>
  );
}
