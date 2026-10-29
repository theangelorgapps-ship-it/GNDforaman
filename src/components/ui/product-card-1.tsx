"use client";
// Adapted from the product-card-1 component supplied for this project.
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Check,
  Minus,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { money, officialProductUrl, type Product } from "@/catalog";
import { useShop } from "@/shop-state";
export interface ProductCardProps {
  product: Product;
  details?: boolean;
  onOpen?: () => void;
  onBag?: () => void;
}
export function ProductCard({
  product,
  details = false,
  onOpen,
  onBag,
}: ProductCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const reduceMotion = useReducedMotion();
  const shop = useShop();
  const wished = shop.wishlist.includes(product.id);
  const ready =
    product.inStock &&
    product.attributes.every((a) => a.options.includes(selections[a.name]));
  const select = (name: string, value: string) => {
    setSelections((old) => ({ ...old, [name]: value }));
    setAdded(false);
  };
  const image = (
    <motion.img
      key={imageIndex}
      src={product.images[imageIndex]}
      alt={`${product.name}${imageIndex ? `, view ${imageIndex + 1}` : ""}`}
      className="product-image"
      loading={details ? "eager" : "lazy"}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    />
  );
  return (
    <Card className={`product-card ${details ? "product-card-detail" : ""}`}>
      <div className="product-gallery">
        <div className="product-image-wrap">
          {details ? (
            image
          ) : (
            <button
              className="product-open-image"
              onClick={onOpen}
              aria-label={`View ${product.name}`}
            >
              {image}
            </button>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="product-stock-badge">
              Currently unavailable
            </Badge>
          )}
          <Button
            variant="secondary"
            size="icon"
            className="product-wishlist"
            aria-label={`${wished ? "Remove" : "Save"} ${product.name}${wished ? " from" : " to"} wishlist`}
            aria-pressed={wished}
            onClick={() => shop.toggleWishlist(product.id)}
          >
            <Heart size={19} fill={wished ? "currentColor" : "none"} />
          </Button>
          {details && product.images.length > 1 && (
            <div className="product-image-arrows">
              <Button
                variant="secondary"
                size="icon"
                aria-label="Previous product image"
                onClick={() =>
                  setImageIndex(
                    (i) =>
                      (i - 1 + product.images.length) % product.images.length,
                  )
                }
              >
                <ChevronLeft size={20} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                aria-label="Next product image"
                onClick={() =>
                  setImageIndex((i) => (i + 1) % product.images.length)
                }
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          )}
        </div>
        {details && product.images.length > 1 && (
          <div className="product-thumbnails">
            {product.images.map((src, i) => (
              <button
                key={src}
                className={i === imageIndex ? "selected" : ""}
                aria-label={`Show product image ${i + 1}`}
                aria-pressed={i === imageIndex}
                onClick={() => setImageIndex(i)}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="product-information">
        <CardContent className="product-content">
          <p className="shop-eyebrow">
            {product.categories[0]?.label ?? "GoodNews"}
          </p>
          {details ? (
            <h1>{product.name}</h1>
          ) : (
            <h3>
              <button onClick={onOpen}>{product.name}</button>
            </h3>
          )}
          {product.reviewCount > 0 && (
            <p className="muted">
              {product.rating.toFixed(1)} / 5 · {product.reviewCount} reviews
            </p>
          )}
          <div className="product-price">
            <strong>{money(product.price)}</strong>
            {product.originalPrice > product.price && (
              <s>{money(product.originalPrice)}</s>
            )}
          </div>
          {details && (
            <>
              <p className="product-intro">
                {product.description[0] ||
                  `Explore ${product.name} from the official GoodNews shop.`}
              </p>
              {product.attributes.map((attribute) => (
                <fieldset className="product-options" key={attribute.name}>
                  <legend>
                    {attribute.name}
                    {selections[attribute.name] && (
                      <span> · {selections[attribute.name]}</span>
                    )}
                  </legend>
                  <div>
                    {attribute.options.map((value) => (
                      <button
                        key={value}
                        className={
                          selections[attribute.name] === value ? "selected" : ""
                        }
                        aria-pressed={selections[attribute.name] === value}
                        onClick={() => select(attribute.name, value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ))}
              <div className="product-quantity">
                <span>Quantity</span>
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Decrease quantity"
                    disabled={quantity === 1}
                    onClick={() => {
                      setQuantity((q) => q - 1);
                      setAdded(false);
                    }}
                  >
                    <Minus size={16} />
                  </Button>
                  <output aria-label="Product quantity">{quantity}</output>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Increase quantity"
                    disabled={quantity === 99}
                    onClick={() => {
                      setQuantity((q) => q + 1);
                      setAdded(false);
                    }}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
              {!ready && product.inStock && (
                <p className="product-option-hint">
                  Choose{" "}
                  {product.attributes
                    .filter((a) => !selections[a.name])
                    .map((a) => a.name.toLowerCase())
                    .join(" and ")}{" "}
                  to add this item.
                </p>
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="product-footer">
          {details ? (
            <>
              <Button
                className="product-add"
                disabled={!ready}
                onClick={() => {
                  if (added) {
                    onBag?.();
                    return;
                  }
                  shop.add(product, selections, quantity);
                  setAdded(true);
                }}
              >
                {added ? <Check size={18} /> : <ShoppingBag size={18} />}{" "}
                {added ? "Added · View bag" : "Add to bag"}
              </Button>
              <Button asChild variant="outline">
                <a
                  href={officialProductUrl(product, selections, quantity)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Buy on official store <ArrowUpRight size={17} />
                </a>
              </Button>
              <p className="product-purchase-note">
                Your bag is saved on this device. Payment, shipping and final
                availability are handled by the official GoodNews store.
              </p>
            </>
          ) : (
            <Button variant="outline" onClick={onOpen}>
              View product <ChevronRight size={16} />
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
