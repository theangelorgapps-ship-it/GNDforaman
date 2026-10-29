export type Appearance = "light" | "dark" | "system";
export function initialAppearance(
  value: unknown,
  legacyDark: unknown,
): Appearance {
  if (value === "light" || value === "dark" || value === "system") return value;
  return typeof legacyDark === "boolean"
    ? legacyDark
      ? "dark"
      : "light"
    : "system";
}
export function isDarkAppearance(appearance: Appearance, systemDark: boolean) {
  return appearance === "dark" || (appearance === "system" && systemDark);
}
export function observeSystemAppearance(
  media: Pick<
    MediaQueryList,
    "matches" | "addEventListener" | "removeEventListener"
  >,
  update: (dark: boolean) => void,
) {
  const change = () => update(media.matches);
  change();
  media.addEventListener("change", change);
  return () => media.removeEventListener("change", change);
}
