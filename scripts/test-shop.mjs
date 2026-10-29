import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { addToBag, changeQuantity, restoreBag } from "../src/shop-bag.ts";
const products = JSON.parse(
  readFileSync(new URL("../src/catalog.json", import.meta.url), "utf8"),
).products;
const variant = products.find((p) => p.id === "5243");
const choices = { Colour: "BLACK" };
assert.deepEqual(addToBag([], variant, {}, 1), [], "Variants require a choice");
assert.deepEqual(
  addToBag([], variant, { Colour: "invented" }, 1),
  [],
  "Unknown choices rejected",
);
assert.deepEqual(
  addToBag([], { ...variant, inStock: false }, choices, 1),
  [],
  "Unavailable products rejected",
);
assert.deepEqual(
  addToBag([], variant, choices, NaN),
  [],
  "Invalid quantities rejected",
);
let bag = addToBag([], variant, choices, 2);
assert.equal(bag[0].quantity, 2);
bag = addToBag(bag, variant, choices, 3);
assert.equal(bag.length, 1);
assert.equal(bag[0].quantity, 5);
bag = addToBag(bag, variant, { Colour: "WHITE" }, 1);
assert.equal(bag.length, 2, "Variants stay separate");
assert.deepEqual(
  restoreBag(JSON.parse(JSON.stringify(bag)), products),
  bag,
  "Persistence round trip",
);
assert.deepEqual(
  restoreBag(
    [
      null,
      { productId: "unknown" },
      { productId: variant.id, selections: {}, quantity: 2 },
    ],
    products,
  ),
  [],
  "Corrupt and stale storage handled",
);
assert.equal(changeQuantity(bag, bag[0].key, 999)[0].quantity, 99);
assert.equal(changeQuantity(bag, bag[0].key, 0).length, 1);
assert.deepEqual(changeQuantity(bag, bag[0].key, 1.5), bag);
console.log(
  "SHOP_STATE_VERIFIED: missing/invalid variants, unavailable products, quantity bounds, variant merging, persistence, corrupt storage, removal",
);
