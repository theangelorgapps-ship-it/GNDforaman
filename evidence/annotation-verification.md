# Annotated UI refinement verification — 29 October 2026

Target: `goodnews-daily-connect-local`, `codex/goodnews-local`, private `theangelorgapps-ship-it/GNDforaman`. Release destination: existing Cloudflare Pages project `gnd-test`.

## User comments

1 / 3. Explore the store is a full-width, 44px-minimum liquid-glass button with a translucent gradient, inset highlights, blur, hover sheen and restrained press feedback. Activation opens `#/store`.
2. Verse heading tracking is 0.1px instead of 1.6px.
4 / 5 / 6. The home card is titled GoodNews Daily Store, has no storefront icon, and shows no product prices. The separate store catalog still displays prices.
7. Verse, Store, Blogs remain a horizontal scroll-snap carousel on phones. Store is second. Previous/next controls and arrow keys reach all three cards and report the correct position. Desktop center targets are distinct (0, 44.25, 87.75px in the inspected 848px rail).
8. Appearance includes Light, Dark and System. All three were selected in browser; System matched the device's dark preference and remained selected after reload. A separate event-driven test changes the MediaQueryList preference both ways, verifies explicit overrides, and checks cleanup.
9 / 10. Collections has a language control beside the heading. Activating an issue opens the searchable selector before its readings. French links to the French full issue; English retains the bundled daily reading. Selecting Amharic displays explicit missing-download feedback. Kids and Teens use separate language sets and edition links.

## Source evidence

Language links were extracted from these official Issue 4, 2026 pages on 29 October 2026:

- Adults: https://goodnewsdailydevotional.com/goodnews-daily-issue-4-2026/ — 69 listed, 54 distinct linked editions.
- Teens: https://goodnewsdailydevotional.com/goodnews-daily-teens-issue-4-2026/ — 11 listed, 8 linked editions.
- Kids: https://goodnewsdailydevotional.com/goodnews-daily-kids-issue-4-2026/ — 15 listed, 12 linked editions.

`src/collection-languages.json` retains provenance and nulls for unlinked editions. The source reused the Turkish URL for Xhosa; Xhosa is deliberately treated as unlinked to avoid sending readers to a wrong-language edition. Full issues cover October–December 2026. These links do not translate the bundled English daily readings.

Curl followed these selected official links and confirmed destination document titles:

- `https://docdro.id/g3FdsSf`: French Issue 4 2026.pdf | DocDroid
- `https://docdro.id/v53BvvX`: French Teens Issue 4 2026.pdf | DocDroid
- `https://docdro.id/EwgLtHJ`: Spanish Kids Issue 4 2026.pdf | DocDroid

All linked URLs were checked against the official source anchors; individual PDF contents were not exhaustively reviewed.

## Behavior, layout and motion

- Browser checks used measured CSS viewport widths 319, 357, 367, 393 and 960px. Document scroll width equaled viewport width in each layout check. Tool-requested sizes differed from actual CSS widths because browser zoom was active, so measurements use the DOM rather than requested dimensions.
- All three phone card rectangles shared the same top coordinate; their horizontal overflow stays within the carousel. At 319px the rail was 299px wide and cards were 267.49px wide. At 393px document width was 393px.
- Store CTA navigation, retained catalog pricing, carousel next/previous/keyboard control, product pause, Appearance persistence, modal Tab wrap, Escape, body scroll restoration and focus return were exercised.
- Adults French, missing Amharic, English daily readings, Kids Spanish and Teens French selections were exercised. Kids exposes 15 options and Teens 11.
- Motion uses small vertical entrances, staggered card arrival, 140/280/420ms timing and decelerating curves. Dialogs exit in 160ms. Product scrolling pauses on hover/focus and via its control. Existing global reduced-motion CSS overrides every new animation; programmatic carousel scrolling and modal exit also check the preference. Reduced-motion styling was reviewed; the OS preference itself was not changed during QA.
- No browser console errors were reported in the verification session.
- `npm test`: SHOP_STATE_VERIFIED and APPEARANCE_VERIFIED.
- `npm run build`: TypeScript, Vite and asset verification passed, BUILD_VERIFIED.
- `git diff --check`: clean.

Screenshots: `annotations-home-phone.png`, `annotations-home-desktop.png`, `annotations-system.png`, `annotations-language.png`.

## Release

Application source commit: `69a192e` (main refinement `46ced79`, historical availability copy `87572d2`). Pushed successfully to `origin/codex/goodnews-local`; GitHub confirmed the repository remains private.

Cloudflare production deployment: https://f3ba3d3e.gnd-test.pages.dev, served at https://gnd-test.pages.dev.

Final HTTP checks confirmed that `/`, `/partnership.html`, profile artwork, `/assets/index-CRUqHR5F.js` and `/assets/index-dJcQiSXx.css` match the local production build byte for byte. Result: LIVE_BUILD_VERIFIED.

Live browser checks confirmed the Store title, absence of home-preview prices/icon, 2/3 carousel position, Light/Dark/System choices, issue-triggered language selection and the official French edition link. An empty 2025 collection correctly says “No edition linked yet.” No console errors were reported. The live mobile check measured document width equal to the 446px CSS viewport. Language selection was returned to English and temporary viewport settings were reset.

Production inspection caught a minifier interaction with vendor-prefix order. Placing the WebKit declaration before the standard declaration preserves both. The deployed glass button now computes to `blur(18px) saturate(1.35)`; the built stylesheet was also checked for the standard property. The post-fix live image is `annotations-live-phone.png`.

The temporary verification server (session 48593) was stopped. QA tabs were closed; no ongoing verification process is required.
