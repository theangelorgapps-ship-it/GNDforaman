import { createContext, useContext, type ReactNode } from "react";
import { useLocalState } from "./hooks";
import { PRODUCTS, type Product } from "./catalog";
import { addToBag, changeQuantity, restoreBag, type BagItem } from "./shop-bag";
interface ShopState {
  bag: BagItem[];
  wishlist: string[];
  count: number;
  add: (
    product: Product,
    selections: Record<string, string>,
    quantity: number,
  ) => void;
  setQuantity: (key: string, quantity: number) => void;
  toggleWishlist: (id: string) => void;
}
const ShopContext = createContext<ShopState | null>(null);
export function ShopProvider({ children }: { children: ReactNode }) {
  const [storedBag, setBag] = useLocalState<BagItem[]>("shop-bag", []);
  const [storedWishlist, setWishlist] = useLocalState<string[]>(
    "shop-wishlist",
    [],
  );
  const bag = restoreBag(storedBag, PRODUCTS);
  const wishlist = Array.isArray(storedWishlist)
    ? storedWishlist.filter((id) => PRODUCTS.some((p) => p.id === id))
    : [];
  return (
    <ShopContext.Provider
      value={{
        bag,
        wishlist,
        count: bag.reduce((sum, item) => sum + item.quantity, 0),
        add: (product, selections, quantity) =>
          setBag((old) =>
            addToBag(restoreBag(old, PRODUCTS), product, selections, quantity),
          ),
        setQuantity: (key, quantity) =>
          setBag((old) =>
            changeQuantity(restoreBag(old, PRODUCTS), key, quantity),
          ),
        toggleWishlist: (id) =>
          setWishlist((old) => {
            const safe = Array.isArray(old) ? old : [];
            return safe.includes(id)
              ? safe.filter((x) => x !== id)
              : [...safe, id];
          }),
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
export function useShop() {
  const shop = useContext(ShopContext);
  if (!shop) throw new Error("ShopProvider is required");
  return shop;
}
