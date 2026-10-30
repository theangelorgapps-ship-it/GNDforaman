# Frontend screen audit

Inspected 29–30 October 2026. Baseline: commit 94738ee, gnd-test.pages.dev. Read-only browser inspection used the existing live app; no orders, form submissions, notes, highlights or bag items were deleted. Code audit covered the full screen modules and their helpers; browser checks below distinguish observed UI from code-only failure review. Native-device and store-review testing are not represented by these checks.

| Screen / flow | Evidence before changes | Action / priority |
|---|---|---|
| Home | Browser: audience tabs, Read/Listen, Verse/Store/Blogs rail, pause control and nav present. Source: fixed date content with Today badge; Reader name hardcoded. | P1: date-aware badge, normal title capitalization, local name. Preserve approved rail, motion and store card. |
| Reader | Browser: complete text, scripture buttons, text controls, save/share/completion. URL stayed #/home after Read. Source: primary references with translation suffix parse as null; annual-plan section is same passages on every day. | P1: deep link/history, correct Bible chapter, honest More Bible reading label. No claim of recorded audio; device narration remains. |
| Library | Browser: 15 initial items, search/category/period, Saved empty state offers Browse all. Detail labels say Article summary and link to source. | P1: encode entry filter in route; retain real empty states. P3: article-detail permalink can follow later. |
| Collection | Browser: year -> October issue -> language chooser; available/unavailable editions explicit. Source: six years shown but only 2026 bundled. | P2: only available years. Language preference/official edition links retained. P3: issue-detail permalink. |
| Bible | Browser: John 3 ASV, version/book/chapter/search/options and source attribution. Search explains chapter-only text search. Source: timeout, retry, cache/offline handling exist. | P1: normalize citation suffix and test invalid references. P2: bounds for restored highlights, reduced-motion scroll and practical touch targets. |
| Store | Browser: search, filters, sort, 20 products, View product labels; hearts have saved state but no saved view. | P2: View label, Saved products filter and stock/price snapshot disclosure. |
| Product | Browser: image/name/price/description, quantity/Add to bag, official store link. Bottom nav correctly hidden. | Keep hidden nav; show price/availability caveat near purchasing information and image fallback. |
| Bag | Browser: existing item/quantity/subtotal and clear local-only/order disclaimer. No mutations made. Source: product/options/quantity validation exists. | Preserve local bag; no invented checkout/order success. |
| Profile | Browser: Log in/Sign up redirect modal, reading counts, journal/saved, outreach teaser, settings. Owner selected local profile. | P1: remove remote account CTA; local identity, Reading journey, Help/About/Privacy & data. |
| Profile settings/name/appearance | Browser: Reader name, Light/Dark/System, preferred audience, reminder shortcut. Modal focus restoration needs source fix around autofocus and nested navigation. | Reuse options; limit name to 60 chars, update Home, reliable focus restoration. |
| Privacy/data | Browser: claims local storage but omits hosted form/hosting traffic; export omits Bible/shop/preferences; no reset. | P1: accurate data explanation, versioned full owned-data export, scoped confirmed reset and recovery. Full operator privacy policy remains owner/legal launch blocker. |
| Reading journey | Browser: outreach card promises connections/milestones, modal only completed/saved counts. | P2: label actual reading activity; no fabricated impact metrics. |
| Journal | Browser: empty state and New note/write first note actions. Source: create/edit/search/delete with confirmation; dirty dismissal loses draft. | P1: pre-close discard confirmation and leave-page guard. No data mutations on live site. |
| Partnership | Browser: immediately loads nested external provider iframe and fallback link; no explanation of support model. | P1: voluntary non-charity development support; nothing unlocked; deliberate hosted-form loading/status/fallback. Native payment route remains unresolved. |
| Prayer reminders | Source/browser settings: local in-page interval, day/time validation and tab-open explanation. | Keep honest local capability, strengthen nearby label; no native push promise. |
| Share / Tap2Connect | Source: hardcoded original Expo URL and native NFC claim. | P1: current-app link/deep link, honest link sharing; no unbuilt NFC claim. |
| Community/story links | Source: curated story summaries and external sources; no public posting/comments. | Preserve source labels; UGC moderation not falsely claimed as an implemented social feature. |
| Failure shell | Source: Suspense handles load, no runtime/chunk error recovery; localStorage catches silently. | P1: safe recovery boundary and persistent storage warning. Never reset data automatically. |

## Not resolved by frontend changes

Native app binaries, signing, device testing, content publication cadence, complete content/translation rights, verified privacy/support/terms pages, operator identity and data retention facts, target ages/countries, provider/payment review and native billing/child safeguards. These are release blockers or owner decisions documented in the submission packs, not reasons to fabricate UI or backend behavior.

## Deferred frontend depth

Library article and Collection issue URLs currently reset their internal detail state on reload; primary screen navigation still works. Full offline app installation and background reminders require a deliberately scoped implementation and verification. Export is a versioned data record; importing/restoring it is not part of this MVP. No full chapter-by-chapter scripture editorial verification or exhaustive assistive-technology certification was performed.

## Implemented follow-through

All P1/P2 frontend actions above are implemented in this release; details, manual failure cases and remaining limitations are recorded in [RELEASE.md](RELEASE.md). Final review additionally fixed corrupt-data overwrites, stale Journal discard state and cancelled Back history loss. Phone screenshots revealed the duplicate Profile tray obscured content; it now stays in page flow.
