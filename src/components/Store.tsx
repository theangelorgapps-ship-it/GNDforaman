import { useState } from "react";
import {
  ArrowLeft,
  ShoppingBag as BagIcon,
  Sun,
  Moon,
  Trash2,
  ArrowUpRight,
} from "lucide-react";
import Ecommerce04 from "./ui/ecommerce-04";
import { ProductCard } from "./ui/product-card-1";
import { Button } from "./ui/button";
import { Modal } from "./Modal";
import { PRODUCTS, money, officialProductUrl, type Product } from "../catalog";
import { useShop } from "../shop-state";
import "./shop.css";
function BagProductImage({ product }: { product: Product }) {
  const [failed, setFailed] = useState(false);
  return failed || !product.images[0] ? (
    <span className="bag-image-fallback">Image unavailable</span>
  ) : (
    <img src={product.images[0]} alt="" onError={() => setFailed(true)} />
  );
}
export function StorePage({
  onProduct,
  onBag,
  onBack,
  dark,
  onTheme,
}: {
  onProduct: (product: Product) => void;
  onBag: () => void;
  onBack: () => void;
  dark: boolean;
  onTheme: () => void;
}) {
  const shop = useShop();
  return (
    <div className="shop-page shop-scope">
      <header className="shop-header">
        <button className="shop-back" onClick={onBack}>
          <ArrowLeft size={19} /> Home
        </button>
        <div>
          <button
            className="icon-button"
            onClick={onTheme}
            aria-label={dark ? "Use light theme" : "Use dark theme"}
          >
            {dark ? <Sun size={21} /> : <Moon size={21} />}
          </button>
          <button
            className="shop-bag-button"
            onClick={onBag}
            aria-label={`Open shopping bag, ${shop.count} items`}
          >
            <BagIcon size={21} />
            <span>Bag</span>
            <b>{shop.count}</b>
          </button>
        </div>
      </header>
      <Ecommerce04 onProduct={onProduct} />
    </div>
  );
}
export function ProductPage({
  product,
  onBack,
  onBag,
}: {
  product: Product;
  onBack: () => void;
  onBag: () => void;
}) {
  const shop = useShop();
  return (
    <div className="product-page shop-scope">
      <header className="shop-header">
        <button className="shop-back" onClick={onBack}>
          <ArrowLeft size={19} /> Back to store
        </button>
        <button
          className="shop-bag-button"
          onClick={onBag}
          aria-label={`Open shopping bag, ${shop.count} items`}
        >
          <BagIcon size={21} />
          <b>{shop.count}</b>
        </button>
      </header>
      <ProductCard key={product.id} product={product} details onBag={onBag} />
      <section className="product-description">
        <p className="shop-eyebrow">THE DETAILS</p>
        <h2>Made for your everyday.</h2>
        {product.description.slice(1).map((text, i) => (
          <p key={i}>{text}</p>
        ))}
        {product.description.length < 2 && (
          <p>
            {product.description[0] ||
              `Find product information and current availability for ${product.name} on the official GoodNews store.`}
          </p>
        )}
        <a href={product.url} target="_blank" rel="noreferrer">
          View original product <ArrowUpRight size={16} />
        </a>
      </section>
    </div>
  );
}
export function ShoppingBag({
  onClose,
  onProduct,
}: {
  onClose: () => void;
  onProduct: (product: Product) => void;
}) {
  const shop = useShop();
  const total = shop.bag.reduce(
    (sum, item) =>
      sum +
      (PRODUCTS.find((p) => p.id === item.productId)?.price ?? 0) *
        item.quantity,
    0,
  );
  return (
    <Modal
      title="Your shopping bag"
      onClose={onClose}
      className="shop-scope bag-modal"
    >
      {shop.bag.length === 0 ? (
        <div className="bag-empty">
          <BagIcon size={40} />
          <h3>A little room for GoodNews.</h3>
          <p>Products you add will appear here.</p>
          <Button onClick={onClose}>Continue exploring</Button>
        </div>
      ) : (
        <>
          <p className="muted">
            Saved on this device. Complete each purchase on the official store.
          </p>
          <div className="bag-items">
            {shop.bag.map((item) => {
              const product = PRODUCTS.find((p) => p.id === item.productId)!;
              return (
                <article key={item.key} className="bag-item">
                  <button
                    onClick={() => onProduct(product)}
                    aria-label={`View ${product.name}`}
                  >
                    <BagProductImage product={product} />
                  </button>
                  <div>
                    <button
                      className="bag-product-title"
                      onClick={() => onProduct(product)}
                    >
                      {product.name}
                    </button>
                    <p>{Object.values(item.selections).join(" · ")}</p>
                    <strong>{money(product.price * item.quantity)}</strong>
                    <div className="bag-item-actions">
                      <label>
                        Qty{" "}
                        <select
                          aria-label={`Quantity for ${product.name}`}
                          value={item.quantity}
                          onChange={(e) =>
                            shop.setQuantity(item.key, Number(e.target.value))
                          }
                        >
                          {Array.from({ length: 99 }, (_, i) => (
                            <option key={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                      </label>
                      <button
                        aria-label={`Remove ${product.name} from bag`}
                        onClick={() => shop.setQuantity(item.key, 0)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                    <a
                      href={officialProductUrl(
                        product,
                        item.selections,
                        item.quantity,
                      )}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Buy on official store <ArrowUpRight size={14} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="bag-total">
            <span>Subtotal</span>
            <strong>{money(total)}</strong>
          </div>
          <p className="small muted">
            Shipping and any price changes are confirmed by the official store.
            This saved bag does not create an order.
          </p>
        </>
      )}
    </Modal>
  );
}
