# GoodNews local TypeScript replica

Reference: https://goodnews-daily-connect.expo.app/ inspected 29 October 2026.
Destination: this independent repository; branch codex/goodnews-local; no remote.

## Contract
React + TypeScript + Vite, standard DOM, lucide-react icons, Tailwind available. Recreate original design rather than redesign. CSS variables --ink, --muted, --surface, --border, --blue supplied by shell. body[data-theme="dark"] for theme. Shared controls .icon-button, .glass-button, .primary-button, .surface, .page-heading, .page-header, .screen, .narrow-screen. App shell owns navigation, audience, saved/completed IDs, overlay modals and theme. Each component imports its own CSS. No private service credentials or production writes; localStorage stores local state.

Shared types in src/types.ts. Shared devotional content/assets in src/data.ts. All callbacks use types defined below; do not edit these shared files from workers.

## Ownership and component contracts
1. Home/Reader worker owns src/components/Home.tsx, Reader.tsx, home.css, reader.css and gates/home-reader.md. Export Home({audience,onAudience,onRead,onSearch,onProfile,onTheme,dark,onPartner,onAlarm,onStories,completed}) and Reader({devotional,onBack,saved,onSave,completed,onComplete,onBible}). Reader accepts the Devotional type. Home onRead takes optional Devotional, Home completed boolean. Audience type 'Adults'|'Teens'|'Kids'.
2. Library worker owns src/components/Library.tsx, Collections.tsx, library.css and gates/library.md. Library({onRead,saved,onSave,onTheme,dark,onProfile,initialTab?,onNotes,onBible,onAlarm}); onRead receives Devotional; onSave receives string ID; initialTab string. Collections({audience,onAudience,onRead,onBack,onTheme,dark}). Own filters, search, collections and story detail views.
3. Bible worker owns src/components/Bible.tsx, bible.css, src/bible-data.ts and gates/bible.md. Bible({initialReference?}) default John 3 ASV; independently managed book/chapter/version/search/highlight state. Use public Bible text or known local source; no invented scripture. Functional selection/highlighting and chapter navigation, honest errors for unavailable passages.
4. Driver owns all other files, shell/profile/settings/journal/alarm/tap share, data integration, responsive verification and root GATES.md.

## Verification
Each leaf typechecks when integrated; manual evidence cites source lines or actual tests. Parent reruns typecheck/build and all UI flows in local browser. Screens should closely match observed reference; current reference uses system sans-serif rather than serif. Mobile width 390; desktop 961 and 1440. Keep local dev server running because user requested a local server; log PID/session and stop instructions.

## Status
- Reference home, reader, library, collection, Bible, profile captured; original home artwork copied locally.
- All component leaves integrated; parent reran typecheck, build and browser interaction checks.
- Screenshot refinement passes corrected home, library, collection and Bible details; mobile/desktop overflow and console checks passed.
- Final documentation, process tracking and evidence recorded. Server remains running as requested.
