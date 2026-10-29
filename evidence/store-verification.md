# Store release verification — 29 October 2026

- Real catalog: 20 purchasable products from the supplied official shop; 24 source images downloaded. No demo Nike/tech items or fabricated reviews included.
- Desktop catalog: 20 cards; Books filter returned 5 actual products. Price ascending returned £10, £10, £12, £12, £35 for that category. TAP2CONNECT search returned 2 products. Unmatched search displayed the clear-filters empty state.
- Phone filter sheet: Bags returned 3 products, and removing its chip restored the catalog.
- Product route: TAP2CONNECT gallery advanced to image 2; colour was required before Add to bag. BLACK, quantity 2 produced £19.98; reloading retained the bag and wishlist. Quantity 3 produced £29.97; removing the item displayed the empty bag. QA bag/wishlist data was removed afterward.
- Bottom navigation: Collection label, Store immediately after Bible. Catalog is a real screen. Product route contains no bottom-dock; Back to store returns correctly.
- Home DOM order: Verse, Store, Blogs. CSS animation home-products was running; explicit pause changed it to paused. Reduced-motion CSS disables animation and permits manual scrolling (source-reviewed).
- Width measurements: home/store/product scrollWidth=320 at a 320px viewport; store/product scrollWidth=393 at 393px. Desktop inspected at 1280px. Both themes checked. Screenshots: store-desktop.png, store-320-light.png, product-phone.png, home-store-card.png.
- Partnership: supplied Name/Phone/Email/Country and donation form rendered. Responsive wrapper fit at 393px. Parent iframe count 1 when open, 0 after close, 1 on reopen. Form/payment submission was not performed. Vendor Turnstile diagnostics appeared from its third-party challenge frame; no application errors were observed in these checks.
- Automated state checks: invalid/missing variants, unavailable products, invalid quantities, bounds, variant merging, storage restore, corrupt records, and removal all passed.
- Existing Codex phone emulator clipping is a separate browser-frame issue documented in earlier evidence. Release layout was checked in a fresh Chrome viewport rather than relying on the emulator's page-only capture.

## Published smoke check

Cloudflare production URL https://gnd-test.pages.dev and deployment https://bc8cc824.gnd-test.pages.dev are live. Root HTML and partnership host matched the tested dist files byte for byte. Main JS/CSS, profile artwork, and product image returned HTTP 200 with expected content types. Live Store rendered 20 product cards. Live T-shirt detail at 393px measured scrollWidth 393, showed the correct title/image, and contained no bottom menu. The live partnership Name field was visible. Screenshots: deployed-store-desktop.png, deployed-product-phone.png, deployed-partnership-phone.png. Private GitHub repository and default branch were verified through gh. Temporary Chrome QA tabs were closed and viewport overrides reset; the requested existing local dev server remains running.
