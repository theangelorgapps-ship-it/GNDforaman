# GoodNews Daily Connect — local TypeScript replica

A React + TypeScript + Vite recreation of https://goodnews-daily-connect.expo.app/, inspected 29 October 2026. The project is independent from the other GoodNews repositories in the parent workspace.

## Run locally

```sh
cd '/Users/charlesfinney/Documents/Codex/Projects/New project/goodnews-daily-connect-local'
npm install
npm run dev
```

Open http://127.0.0.1:5173/ (or http://localhost:5173/). The development server binds only to this computer. Port 5173 is strict, so an existing server will not silently move it to another port.

```sh
npm run typecheck
npm run build
npm run preview
```

Stop a terminal-launched server with Ctrl+C. The Codex-launched development server is recorded in `evidence/server.json`; stop its recorded PID when you no longer need the preview.

## Included

- Responsive home, audience tabs, original sunset/teens artwork, verse and story cards, Light/Dark/System appearance, floating navigation.
- Complete captured adult and teen devotionals, reading progress, saved readings, text controls, sharing, and device speech narration.
- Searchable library with real source story summaries and original article links; year/issue/reading collections.
- Bible chapter/book navigation, ASV and WEB translations, search, persistent highlights and reading controls. Bundled passages work offline; other passages load from https://bible-api.com/ with explicit loading and error states.
- Local reader profile, journal creation/editing/deletion, reminder configuration, local data export, and share-link flow.

## Scope and data

This is a frontend replica with local browser persistence, not a connection to the production account system. Sign-in links to the original app. Partnership opens the supplied official form in a modal; the embedded service handles personal information and payments. The Store uses the official product catalog snapshot and directs purchases to the official shop. NFC phone tapping requires the native app; this web replica provides a working share link. Reminders run while the tab remains open. Narration uses installed browser/device voices, rather than the original hosted audio. Clearing browser storage removes local data.

Adult “DON’T SLEEP!” and teen “I AM IN CHARGE” text and artwork are captured from the supplied reference for 29 October 2026. The source Kids service returned no published edition during inspection, so Kids explicitly displays a sample from the user's existing GoodNews project. This is a dated content snapshot and does not claim to publish a new devotional each day. Historical collection years without bundled content have an explicit empty state. Story cards link to the full original articles; local excerpts are identified as summaries.

Original object artwork comes from the user's existing `gndfinale/apps/mobile/assets/navigation` assets and the reference. Scripture text is public-domain ASV/WEB from Bible API; provenance is in `src/bible-data.ts`. Reference notes, browser verification, and screenshots are in `evidence/`. Completion checks are in `GATES.md` and `gates/`.

## Source structure

- `src/App.tsx`: application navigation, local state, settings and dialogs.
- `src/components/Home.tsx`, `Reader.tsx`: home and devotional reading.
- `src/components/Library.tsx`, `Collections.tsx`: library and archive.
- `src/components/Bible.tsx`: scripture reader.
- `src/components/Profile.tsx`, `Journal.tsx`: personal local journey.
- `src/data.ts`, `library-data.ts`, `bible-data.ts`: content.
- `src/styles.css` and component CSS: visual styles.

## Store and partnership

- Catalog: 20 purchasable products from https://goodnewsdailydevotional.com/shop/, captured 29 October 2026. Images, prices (GBP), options and descriptions come from the public WooCommerce Store API and visible shop listing. This is a snapshot, not a live inventory connection. Refresh with `npm run catalog:sync`, review the changes, then rebuild.
- Store design adapts the supplied Hirael ecommerce-04 (MIT, Mohammad Shehadeh) and product-card-1 React components with owned shadcn/Radix components, Tailwind, Framer Motion and native images. No Next.js runtime is needed.
- Search, category/colour/stock/price filters, sorting, galleries, variant selection, wishlist and bag work locally. Bag quantity and variant validation have automated checks (`npm test`). Prices, shipping and checkout are confirmed by the official store. Adding to this bag does not create an order or transfer a multi-item cart to WooCommerce.
- Direct routes: `#/store` and `#/product/<slug>`. Product pages hide the bottom navigation; browser back and reload preserve their route.
- The home Store card sits second, after the verse. Product scrolling pauses on hover, keyboard focus, or its pause control. Reduced-motion settings disable the animation and enable manual scrolling.
- Partnership uses the supplied form URL and `form_embed.js`, isolated in `public/partnership.html`. Its layout is INLINE because React supplies the requested popup; this avoids a second Contact us launcher. The widget mounts only on demand and is removed on close. A direct-form fallback link is provided. Test submissions and payments were not made.
- Product assets and prices are public source data. Local reader data, bag and wishlist stay in browser storage and are never committed.

See `DEPLOYMENT.md` for deployment and rollback commands, and `evidence/store-verification.md` for release checks.

## Appearance, motion and language editions

- System appearance follows the device theme live. An explicit Light or Dark preference overrides it. Existing boolean theme preferences migrate without changing the selected theme. `npm test` verifies migration, OS-change events and listener cleanup.
- Home cards remain side by side in a swipeable, keyboard-accessible carousel. The home Store preview hides prices; the catalog and product pages retain them.
- Motion uses small, calm entrances and quick feedback; reduced-motion preferences disable decorative animation.
- Collection issue cards open a searchable language chooser. Official Issue 4 (October–December 2026) edition links are captured in `src/collection-languages.json`, with separate Adults/Teens/Kids sources and explicit unavailable states. PDFs open on the official document host. The language selection does not translate the local daily-reading snapshot. The original app's Kids sample remains a sample; published Kids full-issue PDFs are available through Collections.
- Refinement verification and source provenance: `evidence/annotation-verification.md`.
