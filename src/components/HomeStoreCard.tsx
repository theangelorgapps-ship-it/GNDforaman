import { useState } from "react";
import { ArrowUpRight, Pause, Play, Store } from "lucide-react";
import { PRODUCTS, money, type Product } from "../catalog";
export function HomeStoreCard({
  onStore,
  onProduct,
}: {
  onStore: () => void;
  onProduct: (product: Product) => void;
}) {
  const [paused, setPaused] = useState(false);
  const featured = PRODUCTS.filter((p) =>
    ["2855", "3222", "3215", "5243", "2913"].includes(p.id),
  );
  return (
    <section
      className="home-store-card surface"
      aria-labelledby="home-store-title"
    >
      <div className="home-store-heading">
        <Store size={25} />
        <button
          onClick={() => setPaused((p) => !p)}
          aria-label={
            paused ? "Play product scrolling" : "Pause product scrolling"
          }
        >
          {paused ? <Play size={15} /> : <Pause size={15} />}
        </button>
      </div>
      <button className="home-store-title" onClick={onStore}>
        <h2 id="home-store-title">GoodNews Store</h2>
        <ArrowUpRight size={19} />
      </button>
      <p>Carry a little inspiration.</p>
      <div className={`home-product-marquee ${paused ? "is-paused" : ""}`}>
        <div className="home-product-track">
          {[0, 1].map((copy) => (
            <div
              className="home-product-group"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {featured.map((product) =>
                copy === 0 ? (
                  <button
                    className="home-mini-product"
                    key={product.id}
                    onClick={() => onProduct(product)}
                  >
                    <img src={product.images[0]} alt="" loading="lazy" />
                    <span>{product.name}</span>
                    <strong>{money(product.price)}</strong>
                  </button>
                ) : (
                  <div className="home-mini-product" key={product.id}>
                    <img src={product.images[0]} alt="" loading="lazy" />
                    <span>{product.name}</span>
                    <strong>{money(product.price)}</strong>
                  </div>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
      <button className="home-store-link" onClick={onStore}>
        Explore the store <ArrowUpRight size={15} />
      </button>
    </section>
  );
}
