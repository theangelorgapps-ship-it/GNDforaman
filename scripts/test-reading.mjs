import assert from "node:assert/strict";
import {
  parseBibleReference,
  restoreBibleHighlights,
} from "../src/bible-data.ts";
import { devotionals, readingBadge } from "../src/data.ts";

const validReferences = [
  ["Proverbs 24:33-34 (ISV)", "Proverbs", 24, 33, 34],
  ["Romans 12:1 (KJV)", "Romans", 12, 1, undefined],
  ["Matthew 5:16 (NIRV)", "Matthew", 5, 16, undefined],
  ["Proverbs 10:4", "Proverbs", 10, 4, undefined],
  ["Galatians 2:20", "Galatians", 2, 20, undefined],
  ["  prov. 24:33–34 (isv)  ", "Proverbs", 24, 33, 34],
  ["Jn.3:16—17", "John", 3, 16, 17],
  ["1  jn 2:1", "1 John", 2, 1, undefined],
  ["Psalm 23", "Psalms", 23, undefined, undefined],
  ["song of songs 1:1", "Song of Solomon", 1, 1, undefined],
  ["Genesis 1", "Genesis", 1, undefined, undefined],
  ["Matthew 1:1–17", "Matthew", 1, 1, 17],
];
for (const [input, book, chapter, verse, endVerse] of validReferences) {
  assert.deepEqual(
    parseBibleReference(input),
    { book, chapter, verse, endVerse },
    `Reference navigates to the actual cited passage: ${input}`,
  );
}
for (const devotional of devotionals) {
  assert.ok(parseBibleReference(devotional.scriptureRef), devotional.id);
  if (devotional.furtherStudy)
    assert.ok(parseBibleReference(devotional.furtherStudy), devotional.id);
}
const invalidReferences = [
  "", " ", "Not a book 3:16", "John", "John 0", "John 22",
  "Genesis 51", "Jude 2:1", "John 3:0", "John 3:17-16", "John 3:1-0",
  "John -3:16", "John 3:16 garbage", "John 3:16 (not a version)",
  "John 3:16 (123)",
  "John 3:16 (KJV) garbage", "John 3:16:17", "John 3:16-",
];
for (const input of invalidReferences)
  assert.equal(parseBibleReference(input), null, `Reject malformed reference: ${input}`);
// Syntax parsing is distinct from verse availability: Bible checks the loaded
// chapter before highlighting, so a well-formed out-of-range verse cannot hide it.
assert.deepEqual(parseBibleReference("John 3:99"), {
  book: "John", chapter: 3, verse: 99, endVerse: undefined,
});

const highlight = {
  book: "John", chapter: 3, verse: 16, version: "asv",
  text: "A saved verse", color: "yellow",
};
assert.deepEqual(restoreBibleHighlights({ oldKey: highlight }), {
  "asv:John:3:16": highlight,
}, "Restore valid highlight with a canonical key");
for (const patch of [
  { book: "Unknown" }, { book: "__proto__" }, { chapter: 0 }, { chapter: 22 },
  { chapter: 1.5 }, { verse: 0 }, { verse: -1 }, { verse: 1.5 },
  { verse: 99 }, { text: " " }, { text: null }, { version: "kjv" },
  { color: "red" },
]) {
  assert.deepEqual(restoreBibleHighlights({ key: { ...highlight, ...patch } }), {},
    `Drop invalid or unavailable saved passage: ${JSON.stringify(patch)}`);
}
for (const value of [null, undefined, [], "bad", 1, { bad: null }])
  assert.deepEqual(restoreBibleHighlights(value), {});
assert.deepEqual(restoreBibleHighlights({ valid: highlight, invalid: { book: "bad" } }), {
  "asv:John:3:16": highlight,
}, "Corrupt entries do not discard a valid highlight");

const adult = devotionals.find((item) => item.audience === "Adults");
const kids = devotionals.find((item) => item.audience === "Kids");
assert.equal(readingBadge(adult, new Date(2026, 9, 29, 23, 59)), "Today’s reading");
assert.equal(readingBadge(adult, new Date(2026, 9, 30, 0, 0)), "Latest reading · 29 Oct 2026");
assert.equal(readingBadge(adult, new Date(2027, 0, 1)), "Latest reading · 29 Oct 2026");
assert.equal(readingBadge(kids, new Date(2026, 9, 29)), "Sample reading · 29 Oct 2026");

console.log("READING_VERIFIED: citations, aliases, ranges, malformed references, restored-highlight bounds and local-date labels");
