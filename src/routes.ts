import type { Screen } from "./types.ts";
export interface Route {
  screen: Screen;
  id?: string;
  filter?: string;
  reference?: string;
}
const screens: Screen[] = [
  "home",
  "library",
  "collections",
  "bible",
  "profile",
  "notes",
  "store",
];
export function parseRoute(hash: string): Route {
  try {
    const [path, query = ""] = hash.replace(/^#\/?/, "").split("?");
    const params = new URLSearchParams(query);
    if (path.startsWith("product/"))
      return { screen: "product", id: decodeURIComponent(path.slice(8)) };
    if (path.startsWith("reader/"))
      return { screen: "reader", id: decodeURIComponent(path.slice(7)) };
    if (path === "library")
      return { screen: "library", filter: params.get("filter") || "All" };
    if (path === "bible")
      return { screen: "bible", reference: params.get("ref") || undefined };
    return {
      screen: screens.includes(path as Screen) ? (path as Screen) : "home",
    };
  } catch {
    return { screen: "home" };
  }
}
export function routeHash(route: Route): string {
  if (route.screen === "reader" || route.screen === "product")
    return `#/${route.screen}/${encodeURIComponent(route.id || "")}`;
  if (route.screen === "library" && route.filter && route.filter !== "All")
    return `#/library?filter=${encodeURIComponent(route.filter)}`;
  if (route.screen === "bible" && route.reference)
    return `#/bible?ref=${encodeURIComponent(route.reference)}`;
  return `#/${route.screen}`;
}
