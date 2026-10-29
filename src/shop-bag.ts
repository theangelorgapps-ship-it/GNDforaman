import type { Product } from "./catalog";
export interface BagItem {
  key: string;
  productId: string;
  selections: Record<string, string>;
  quantity: number;
}
export function addToBag(
  bag: BagItem[],
  product: Product,
  selections: Record<string, string>,
  quantity: number,
): BagItem[] {
  if (
    !product.inStock ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    product.attributes.some((a) => !a.options.includes(selections[a.name]))
  )
    return bag;
  const selected = Object.fromEntries(
    product.attributes.map((a) => [a.name, selections[a.name]]),
  );
  const key = JSON.stringify([product.id, Object.entries(selected).sort()]);
  const found = bag.find((item) => item.key === key);
  return found
    ? bag.map((item) =>
        item.key === key
          ? { ...item, quantity: Math.min(99, item.quantity + quantity) }
          : item,
      )
    : [
        ...bag,
        {
          key,
          productId: product.id,
          selections: selected,
          quantity: Math.min(99, quantity),
        },
      ];
}
export function changeQuantity(
  bag: BagItem[],
  key: string,
  quantity: number,
): BagItem[] {
  if (!Number.isInteger(quantity)) return bag;
  return bag.flatMap((item) =>
    item.key !== key
      ? [item]
      : quantity < 1
        ? []
        : [{ ...item, quantity: Math.min(99, quantity) }],
  );
}
export function restoreBag(value: unknown, products: Product[]): BagItem[] {
  if (!Array.isArray(value)) return [];
  return value.reduce<BagItem[]>((bag, item) => {
    if (
      !item ||
      typeof item !== "object" ||
      !item.selections ||
      typeof item.selections !== "object"
    )
      return bag;
    const product = products.find((p) => p.id === item.productId);
    return product
      ? addToBag(bag, product, item.selections, item.quantity)
      : bag;
  }, []);
}
