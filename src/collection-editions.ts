import snapshot from "./collection-languages.json";
import type { Audience } from "./types";
export interface EditionLanguage {
  name: string;
  url: string | null;
}
export function supportsPublishedIssue(issue: string) {
  return /^2026-(10|11|12)$/.test(issue);
}
export function editionLanguages(
  audience: Audience,
  issue: string,
): EditionLanguage[] {
  return supportsPublishedIssue(issue)
    ? snapshot.audiences[audience].languages
    : [{ name: "English", url: null }];
}
export const editionSource = (audience: Audience) =>
  snapshot.audiences[audience].source;
export const editionPeriod = snapshot.period;
