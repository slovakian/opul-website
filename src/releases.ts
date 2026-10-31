import data from "./releases.generated";
import type { Release } from "../scripts/releases";

export const releases: Release[] = data;
export const stable = releases.find((release) => release.channel === "stable");
export const nightly = releases.find(
  (release) => release.channel === "nightly",
);
export function releaseDate(release: Release) {
  return new Date(release.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
