# Launch owner checklist

Updated **30 October 2026, Europe/London**. Start with [launch readiness](LAUNCH-READINESS.md); consult [Apple](APPLE-SUBMISSION.md) and [Google](GOOGLE-PLAY-SUBMISSION.md) for policy detail. Roles below need named assignees; no publisher/contact facts are assumed. Keep identity documents and signing secrets in secure systems, not Git.

**Already decided:** free app; voluntary development support with nothing unlocked; non-charity business; physical merchandise; local reader profile with authentication removed. Export is a data record, not restore; local reset cannot delete external records.

| Gate / status | Accountable owner | Evidence needed | Next action |
| --- | --- | --- | --- |
| ☐ Publisher — open | Business owner | Legal entity, authority, verified store accounts, account type/date, D-U-N-S where applicable | Confirm seller and Console holders; complete verification. |
| ☐ Release identity — open | Product owner | Final name, bundle/package IDs, SKU, languages, countries, supported devices | Approve one release specification; reconcile differing draft store names. |
| ☐ Ages — open | Product owner + privacy adviser | Intended ages/direct-child usage, territories, Kids-category decision | Review child routes and provider suitability; specify required safeguards. |
| ☐ Support payments — open | Business owner + payment implementer | Recipient/fund flow, fees, recurrence/refunds, processor, applicable exemption/program | Select native route by market; preserve no-unlock premise or omit payment entry. |
| ☐ Physical shop — open | Merchant owner | Seller, actual product types, delivery/returns/contact, any bundled digital rights | Verify destinations and final transaction disclosures. |
| ☐ Data/policies — open | Operator + privacy adviser | Provider data map, cookies/logs, retention/deletion, child handling, monitored contact, approved public policy/support URLs | Obtain provider facts; publish reviewed pages and complete final-build declarations. |
| ☐ Rights/content — open | Content owner | Brand/text/translation/media/document licences; dates and available editions; publishing cadence | Assemble rights register and verify content promises. |
| ☐ Native builds — absent | Native engineer | Signed iOS archive and Android AAB, SDK/permission inventory, compatibility checks | Choose implementation and signing custodian; build and test. |
| ✓ Frontend verification — completed for web | Frontend release owner | Test/build results and screen evidence for this task's fixes | See [release verification](RELEASE.md); native/device verification remains separate. |
| ☐ Store assets/review — open | Design + release owner | Final screenshots/icons/copy, complete forms, reviewer steps/contact, device/beta feedback | Replace every placeholder; verify listing against release binaries. |
| ☐ Submission — not authorized here | Business owner | Closed preceding gates, selected territories/payment route, release timing | Review the concrete submission packages and authorize submission separately. |

No account-deletion backend is required merely to rename a local reader. Reassess if any app-account creation route is introduced, including external sign-up; Google then also requires a public deletion-request resource. [Google deletion scope](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en), [Apple deletion guidance](https://developer.apple.com/help/app-review/guideline-reference/5-1-1-account-deletion/)
