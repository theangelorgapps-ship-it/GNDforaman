# Browser verification — 29 October 2026

Verified in the Codex browser against the local Vite server using real UI interactions. Reference screenshots and DOM observations were collected from https://goodnews-daily-connect.expo.app/ before implementation.

## Observed passes

- Home opens the captured adult devotional. Teens opens I AM IN CHARGE with its original image; Kids uses a labelled local sample.
- Reading opens the full article. Save changes to Remove saved devotional; completion changes to Reading completed. Reload preserves 100% read and the Saved filter shows the saved reading.
- Library search for I AM IN CHARGE yields the teen reading; zznonexistent yields No matching reads. The saved filter shows the stored adult reading.
- Collection year 2026 opens October, then the adult reading listing. Audience controls and year controls are available; unavailable older years have empty states.
- Bible starts at John3ASV; Next chapter opens John4. Search Proverbs24:33-34 opens Proverbs24 and selects verses33/34. Yellow highlighting changes their accessible names to highlighted. After reload, Reading options shows My highlights2. WEB changes actual scripture text and the header abbreviation.
- Reader text size changes18px to20px then back. Narration changes to Pause reading / Reading aloud using your device’s voice; pause changes to Resume reading / Reading paused; Stop audio stops the narration. Audible output was not independently recorded.
- Created Verification reflection journal entry, saved its body, reloaded, verified profile shows1note and reopened it; removed this test note using the UI delete confirmation.
- Dark/light switches change appearance and persist. A visual pass corrected dark-tab contrast.
- Prayer interval changed to15min, saved, and produced Prayer reminder saved. Alarm remains disabled; this test did not schedule ongoing alerts.
- Tap2Connect copy link produced GoodNews link copied. Reader Share opens a native dialog with actual source text. No production message, account or purchase action was performed.
- Mobile home, library, collection, Bible, and profile were inspected. Measured document scrollWidth equals innerWidth390px on home, collections, Bible and profile. No broken images in the home image inspection.
- Desktop inspection measured innerWidth962px / scrollWidth962px. Wide layout measured1800px /1800px with hero constrained to840px. Browser viewport tooling produced the measured1800px size from a requested1440px override, so1800px is the verified measurement.
- Final captured console error list was empty. Final local preview tab is kept open on adult home.

## Visual correction passes

Compared reference and local home dimensions, audience pill distribution, button layout, sunset shading, title weight, reminder size, verse typography, story rail, and dock. Corrected library heading labels/weights, featured card geometry, filters, and category tray. Corrected collection card/book layout and Bible tray icons. Checked mobile variants and dark theme. The result is a close frontend recreation, not a claim of a mathematically pixel-identical diff.

## Evidence

- `local-desktop.jpg`: final adult home at desktop size.
- `local-mobile.jpg`: final adult home at390px.
- `local-mobile-teens.jpg`: teen home comparison capture.
- `reference-profile.jpg`: reference profile capture.
- `reference.md`: reference dimensions, visible text, assets, and limitations.
- `server.json`: retained local server process.

## Final improvement pass

Checked rendered pages after revisions, persisted state, empty search state, dialogs, no horizontal overflow, and console errors. Fixed low-contrast dark tabs and rail minimum width; improved reader scripture spacing and modal placement. Replaced the placeholder streak calculation with stored reading-day dates. No further blocker found. Online sign-in, purchases, hosted narration and NFC are explicitly scoped in README and UI instead of simulated.

Final production check after all source edits and formatting: `npm run build` completed TypeScript checking, Vite output and BUILD_VERIFIED; `node scripts/check-server.mjs` emitted LOCAL_SERVER_VERIFIED. Repository root is the new child folder, branch codex/goodnews-local, no remote. All16 gates in root and leaf ledgers are met; no abandoned gates.

## Follow-up: phone fit

User reported clipped content on the phone preview. Root cause: the home rail retained296px fixed-width cards side-by-side; at393px the second card extended to622px even though document scrollWidth stayed393px. The previous whole-page overflow check missed this clipped carousel content.

Changed the mobile rail to full-width stacked cards; converted decorative moving titles to wrapped excerpts on phones; made the hero height responsive to short viewports; constrained header content and dock edges; removed the dock ancestor filter that prevented the child backdrop blur from sampling the page. Kept desktop cards in a row. The compact phone header retains accessible Partner Now naming.

Measured320×568,393×852,430×932 and1024×900. At every size document width matched viewport width and all checked header, audience, hero, reminder, card and navigation bounds stayed on-screen. At phone widths cards were columns; desktop remained a row. Final screenshot evidence/mobile-fit-393.jpg shows the complete verse and stories cards. Production build passed again after the fix. Phone-fit gates3/3 met.
