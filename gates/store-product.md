# Gates: Store, product pages, and partnership form

Scope: Integrate the supplied product and catalog components with the local GoodNews app, add the home store card, and open the supplied partnership form.

- [x] S1: TypeScript and the production build pass with the adapted UI components.
  CHECK: npm run build
  EXPECT: BUILD_VERIFIED
  EVIDENCE: npm run build: TypeScript passes, BUILD_VERIFIED; Store split into a separate JS/CSS chunk.

- [x] S2: Collection is the navigation label; Store opens its own catalog; product details hide the bottom menu and return to the store.
  EVIDENCE: Browser navigation verified in evidence/store-verification.md; product DOM has no bottom-dock; direct product route reload and Back to store passed.

- [x] S3: The home card order is Verse, Store, Blogs; products scroll automatically with pause and reduced-motion behavior.
  EVIDENCE: Home DOM order Verse/Store/Blogs; home-products animation running then paused by control; reduced-motion CSS reviewed. evidence/home-store-card.png.

- [x] S4: Catalog search, filters, sorting, empty states and product navigation work with one shared catalog.
  EVIDENCE: 20 real products; Books=5; ascending prices verified; unmatched query empty state; TAP2CONNECT=2; mobile Bags filter=3. evidence/store-verification.md.

- [x] S5: Product image/variant controls, wishlist and cart work; cart changes persist locally and unavailable items cannot be added.
  EVIDENCE: npm test outputs SHOP_STATE_VERIFIED; browser gallery, choices, wishlist, bag persistence, £19.98/£29.97 subtotal and removal verified.

- [x] S6: Partner Now opens the supplied Partnership form only on demand; closing and reopening work without duplicate widgets.
  EVIDENCE: Official form fields rendered, parent iframe counts open=1/closed=0/reopened=1. App-managed popup uses supplied form and script with INLINE provider layout; no submission.

- [x] S7: Desktop and phone layouts are checked visually, with no horizontal page overflow; integration and catalog limitations are documented.
  EVIDENCE: 320px and 393px scrollWidth matches viewport for Store/product; 320px home also matches. Desktop and both themes inspected; README.md and evidence/store-verification.md record limits.

- [ ] S8: The finished source is pushed to the private GNDforaman repository and its privacy/commit are verified.
  EVIDENCE: pending

- [ ] S9: The tested build is deployed to Cloudflare gnd-test and the public deployment is verified.
  EVIDENCE: pending
