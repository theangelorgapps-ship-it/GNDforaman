# Gates: Bible
Scope: Bible reader with original reference style and functional navigation.

- [x] B1: Default John 3 text, version controls, chapter navigation implemented.
  EVIDENCE: `src/components/Bible.tsx:31` initializes John 3 ASV; `src/components/Bible.tsx:104` moves between chapters and adjacent books; `src/components/Bible.tsx:224` renders the 66-book / chapter picker; `src/components/Bible.tsx:231` switches ASV / WEB. `src/bible-data.ts:161` contains the complete 36-verse ASV John 3, downloaded verbatim from Bible API. `src/components/bible.css:2` and `:6` match the recorded full-width glass toolbar, 660px reading column, 14px/24px text, blue verse numbers, and 16px verse spacing.
- [x] B2: Reference/text search, persisted highlights, selection, and browser narration implemented with real scripture.
  EVIDENCE: `src/bible-data.ts:47` validates book/chapter/verse references, including Proverbs24:33–34. `src/components/Bible.tsx:113` persists highlights under `gnd-local-bible-highlights`; `:118` handles three colors/removal; `:169` selects and scrolls to the requested verse range; `:200` supports mouse and keyboard verse selection; `:234` provides reference and chapter-text search; `:247` lists/reopens/deletes saved highlights. `:68` uses actual `SpeechSynthesisUtterance` verse-by-verse narration; `:94` pauses/resumes; `:179` cancels narration on unmount. No audio success is simulated.
- [x] B3: Responsive layout, loading/error handling, and source improvement pass implemented.
  EVIDENCE: `src/components/bible.css:16` defines 740px/mobile layout; `:17` handles 375px widths; `:15` supports the shared dark theme; `:18` respects reduced motion. `src/components/Bible.tsx:145` loads other chapters from the documented public CORS endpoint, with AbortController cancellation, a 15-second timeout, 429 errors, cached chapters and explicit retry/offline fallback. `:22` reads the offline/cache copy first. Improvement pass added cancel-safe verse narration, resume after a paused chapter change, narrow-screen controls, keyboard verse selection, malformed-storage handling, and distinct translation data.

## Actual checks

- `npm run typecheck` passed on 2026-10-29 after integration.
- Node assertions passed for the 66-book catalog; John3, Proverbs24:33–34, and numbered-book parsing; invalid chapter/verse-range rejection; all ten offline chapters' continuous verse numbering and nonempty text; John 3's 36 verses and Proverbs 24's 34 verses; and differing ASV / WEB John 3 text.
- Scripture source fetched on 2026-10-29: https://bible-api.com/ documents ASV/WEB, CORS, and single-chapter-book handling. All 329 bundled verses are unmodified source text except surrounding whitespace. No credentials used.
- Browser visual and interaction confirmation belongs to the parent verification pass; this worker started no server, browser, watcher, or dependency install. Audible voice availability depends on the browser/OS, with explicit error feedback.

## Parent browser checks

1. Open Bible: John 3 ASV and tray should align with the recorded reference at 961px and 390px.
2. Next/previous should open bundled John 4/2. Version WEB should show different genuine text.
3. Search `Proverbs24:33–34`; the complete chapter opens and verses 33–34 are selected/scrolled into view.
4. Highlight a verse, reload, reopen My highlights, and remove it. Try text search `world` within John 3.
5. Play/pause/resume and navigate while reading. Verify speech cancellation; if the browser has no usable voice, verify the honest error.
6. Open an uncached chapter online; test offline failure/retry and John 3 offline fallback. Collapse/expand the chapter tray; increase/decrease text size.

Ownership: only `src/components/Bible.tsx`, `src/components/bible.css`, `src/bible-data.ts`, and this gate file changed. Shared Modal and root theme/dock remain owned by the parent.
