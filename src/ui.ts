// Utility class groups shared across pages.

export const shell = "mx-auto w-[min(1160px,calc(100%-40px))]";

export const copy = "text-[17px] leading-[1.65] text-muted";

export const underlinedLink = "border-b border-line font-semibold text-ink no-underline";

export const panel = "rounded-[26px] bg-sand p-[58px] mobile:p-8";

export const panelHeading = "text-[length:clamp(34px,4vw,50px)]";

export const actions = "mt-[34px] flex flex-wrap gap-3";

export const releaseNote = "mx-0 mt-[15px] mb-0 text-[12px] text-muted";

const button =
  "inline-flex min-h-12 items-center justify-center rounded-xl border border-line px-5 text-[15px] font-[650] no-underline transition-[translate,box-shadow] duration-[180ms] ease-[ease] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(20,17,14,0.1)] motion-reduce:transition-none";

export const primaryButton = `${button} border-ink bg-ink text-white`;

export const secondaryButton = `${button} bg-frost`;

export const releaseEntry = "mt-9 border-t border-line py-9";

export const releaseTitle = "text-[length:clamp(28px,4vw,42px)] wrap-anywhere";

export const lede = "max-w-[620px] text-[length:clamp(18px,2vw,22px)] leading-[1.55] text-muted";

export const pageTitle = "text-[length:clamp(46px,6vw,72px)]";

export const documentMain = `${shell} max-w-[760px] py-[110px]`;

export const documentTitle = "text-[length:clamp(50px,7vw,78px)]";

export const documentCopy = `${copy} mb-[22px]`;
