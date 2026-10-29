import snapshot from "./catalog.json";
export type Product = (typeof snapshot.products)[number];
export const PRODUCTS: Product[] = snapshot.products;
export const CATALOG_SOURCE = snapshot.source;
export const CATALOG_UPDATED = snapshot.updated;
export const CATEGORIES = Array.from(
  new Map(
    PRODUCTS.flatMap((p) => p.categories).map((c) => [c.value, c]),
  ).values(),
);
export const colourOptions = (product: Product) =>
  product.attributes
    .filter((a) => /colou?r/i.test(a.name))
    .flatMap((a) => a.options);
export const COLOURS = Array.from(
  new Set(PRODUCTS.flatMap(colourOptions).map((c) => c.toLowerCase())),
).map((value) => ({
  value,
  label: value.replace(/\b\w/g, (s) => s.toUpperCase()),
  swatch:
    (
      {
        "royal blue": "#4169e1",
        aqua: "#00ffff",
        purple: "#a855f7",
        pink: "#f9a8d4",
        blue: "#3b82f6",
        black: "#1e293b",
        white: "#fff",
        red: "#ef4444",
        yellow: "#facc15",
        green: "#22c55e",
      } as Record<string, string>
    )[value] ?? "#94a3b8",
}));
export const money = (amount: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
    amount,
  );
export function officialProductUrl(
  product: Product,
  selections: Record<string, string> = {},
  quantity = 1,
) {
  const url = new URL(product.url);
  for (const [name, value] of Object.entries(selections))
    url.searchParams.set(
      `attribute_${name.toLowerCase().replace(/\s+/g, "-")}`,
      value,
    );
  if (quantity > 1) url.searchParams.set("quantity", String(quantity));
  return url.toString();
}
