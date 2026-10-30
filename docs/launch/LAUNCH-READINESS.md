# GoodNews Daily launch readiness

Updated **30 October 2026, Europe/London**. Policy packs researched 29 October; upload requirements spot-checked 30 October. **This is a web MVP, not yet a store-ready release: neither native binary exists.** No submission or approval is represented.

Read next: [owner actions](OWNER-INPUTS.md), [Apple pack and draft listing](APPLE-SUBMISSION.md), [Google pack and draft listing](GOOGLE-PLAY-SUBMISSION.md), [screen audit](SCREEN-AUDIT.md), [implementation plan](PLAN.md).

## Frontend scope versus launch blockers

The owner approved a **local reader profile**; authentication entry points have been removed. The frontend work covers accurate Profile/reading labels, “View” product actions, normal title capitalization, data export/reset, help/about, deliberate partnership-form loading, storage/error recovery and navigation fixes. Implementation and test results are recorded in [release verification](RELEASE.md); native launch gates remain open.

Export produces a data record; importing/restoring it is not implemented. Local clearing affects this browser, not external orders or partnership records. There is no cloud account/sync, native background reminder or verified NFC capability.

Native builds/signing, device tests, publisher identity, content rights, current-content maintenance, public policies, age/country decisions and payment eligibility remain outside this frontend release. A working website alone does not establish the useful native experience required by [Apple §4.2](https://developer.apple.com/app-store/review/guidelines/#minimum-functionality) or [Google's functionality policy](https://support.google.com/googleplay/android-developer/answer/9898783?hl=en).

## Documents and forms

**M = mandatory; C = conditional; O = optional.** Detailed exceptions and source links are in the platform packs.

| Status | Both stores |
| --- | --- |
| M | Verified developer account/legal publisher; app identifiers/version; countries/languages/category; accurate listing; public privacy policy and in-app access; content rights; reviewer contact/instructions; functional release build. |
| C | Organization evidence/D-U-N-S; merchant agreements, tax/bank information and purchase products; regional payment enrollment; child safeguards; deletion mechanisms if account creation is introduced. |

| Store | Mandatory forms/documents | Conditional additions |
| --- | --- | --- |
| Apple | App record/bundle ID/SKU; App Privacy answers; current age-rating questionnaire; encryption/export answers; DSA trader-status declaration; support URL, privacy URL and copyright; reviewer information. | Encryption documents if requested; native privacy manifests/required-reason APIs and listed SDK signatures; Digital Goods and Services questionnaire when shown; verified EU trader contacts; IAP metadata/review assets; payment entitlements/territory permits. [Apple requirements](APPLE-SUBMISSION.md#2-submission-checklist-account-build-and-documents) |
| Google | App record/package registration; Data safety; ads; app access; target audience; IARC rating; Financial features and Health apps declarations, including truthful “none” answers; support email/privacy URL. | News & Magazines declaration if in scope; restricted-permission/SDK declarations; external account-deletion URL; billing-program onboarding. [Play review setup](https://support.google.com/googleplay/android-developer/answer/9859455?hl=en), [complete checklist](GOOGLE-PLAY-SUBMISSION.md#3-documents-and-declarations) |

Local storage does not justify declaring “no collection”: inventory Bible requests, hosting, the partnership embed, DocDroid/shop destinations and native SDKs. Use the final build's evidence for [Apple privacy answers](https://developer.apple.com/app-store/app-privacy-details/) and [Google Data safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en).

## Assets and copy

| Deliverable | Apple | Google Play |
| --- | --- | --- |
| M icon | 1024 × 1024 source, integrated into native build | 512 × 512 PNG with alpha; ≤1,024 KB |
| M listing | Name ≤30 characters; description ≤4,000; keywords ≤100 **bytes** | Name ≤30; short description ≤80; full description ≤4,000 characters |
| M screenshots | 1–10 per required supported size, JPG/PNG without alpha. Prepare iPhone medium **1179 × 2556** and large **1290 × 2796**; if supporting iPad, **2064 × 2752**. Verify actual Connect slots/fallbacks. | At least two, JPEG/PNG without alpha; dimensions 320–3,840 px, longest ≤2× shortest; up to eight per device type. Recommended phone set: four at **1080 × 1920**. |
| M feature graphic | Not a general submission asset | 1024 × 500 JPEG/PNG without alpha |
| O | Subtitle ≤30; promotional text ≤170; preview videos; custom EULA | Preview video; additional localized/device captures |

Sources: [Apple fields](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information), [Apple screenshots](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/), [Play fields](https://support.google.com/googleplay/android-developer/answer/9859152?hl=en), [Play graphics](https://support.google.com/googleplay/android-developer/answer/9866151?hl=en). Capture the final native Home, reader, Bible, saved readings, journal and local Profile with fictional data. Asset files still need production; the packs provide specifications and drafts.

## Payments and children: decisions before native release

**Confirmed:** support is voluntary, unlocks nothing, funds free-app/technology development, and is **not charity fundraising**. Physical books/clothes/accessories use ordinary merchandise checkout; classify any digital bundle separately.

Apple permits IAP developer tips; nothing-unlocked support does not establish a blanket external-payment exemption. Google exempts qualifying creator contributions only when 100% reaches the creator and no digital goods/services are provided; the recipient/processor arrangement still needs verification. Regional alternatives require the applicable storefront/program conditions. Resolve the route or omit the native payment entry until resolved. [Apple payments](https://developer.apple.com/app-store/review/guidelines/#business), [Google payments FAQ](https://support.google.com/googleplay/android-developer/answer/10281818?hl=en)

Kids/Teens UI requires an actual intended-age decision. A content selector is neither age verification nor parental consent. Audit child-accessible forms, advertising, documents and commercial links before declaring audiences. [Apple Kids rules](https://developer.apple.com/app-store/review/guidelines/#kids-category), [Google Families](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en)

## Build, test, then submit

1. **M:** Resolve the [owner checklist](OWNER-INPUTS.md); build signed iOS and Android releases. Apple currently requires Xcode 26+/iOS 26+ SDK and deployment target iOS 13+. New Play phone apps require API 36+. [Apple upload rules](https://developer.apple.com/news/upcoming-requirements/), [Play API rule](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en)
2. **M:** Test real-device launch/update, reading/journal persistence, export/reset, offline/error recovery, accessibility, links, child paths and payment cancellation/failure. Validate Android AAB/signing/package registration/compatibility and iOS archive/privacy requirements.
3. **O:** TestFlight and Play internal testing. **C:** Personal Play accounts created after 13 November 2023 need ≥12 continuously opted-in closed testers for ≥14 days, then production-access review. Organization accounts are outside that specific rule. [Google testing requirement](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en)
4. **M:** Reconcile screenshots, forms and reviewer notes with the tested binaries; obtain separate owner authorization for store submission. Research completion is not compliance certification or approval.
