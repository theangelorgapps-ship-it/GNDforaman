import assert from "node:assert/strict";
import {
  clearLocalData,
  exportLocalData,
  readLocalValue,
  writeLocalValue,
  validLocalValue,
} from "../src/local-data.ts";
import { parseRoute, routeHash } from "../src/routes.ts";
class MemoryStorage {
  values = new Map();
  constructor(entries = {}) {
    this.values = new Map(Object.entries(entries));
  }
  get length() {
    return this.values.size;
  }
  key(i) {
    return [...this.values.keys()][i] ?? null;
  }
  getItem(k) {
    return this.values.get(k) ?? null;
  }
  setItem(k, v) {
    this.values.set(k, v);
  }
  removeItem(k) {
    this.values.delete(k);
  }
}
const sample = new MemoryStorage({
  "other-app": "keep",
  "gnd-local-name": '"Reader"',
  "gnd-local-notes": "[broken",
  "gnd-local-shop-bag": "[]",
  "gnd-local-bible-highlights": "{}",
  "gnd-local-bible-chapter:John3": '{"verses":[]}',
  "gnd-local-appearance": '"system"',
});
const exported = exportLocalData(sample, new Date("2026-10-30T00:00:00Z"));
assert.equal(exported.schemaVersion, 1);
assert.equal(exported.entries["gnd-local-notes"], "[broken");
assert.equal(Object.keys(exported.entries).length, 6);
assert.ok(!("other-app" in exported.entries));
assert.equal(readLocalValue(sample, "name", "Fallback"), "Reader");
assert.equal(readLocalValue(sample, "absent", "Fallback"), "Fallback");
assert.throws(() => readLocalValue(sample, "notes", []));
assert.equal(
  sample.getItem("gnd-local-notes"),
  "[broken",
  "invalid values must be preserved for export",
);
assert.equal(writeLocalValue(sample, "notes", [], false), false);
assert.equal(
  sample.getItem("gnd-local-notes"),
  "[broken",
  "a fallback-derived edit must not overwrite unreadable data",
);
const quota = new MemoryStorage();
quota.setItem = () => {
  throw new Error("QuotaExceededError");
};
assert.throws(() => writeLocalValue(quota, "name", "Session only"));
for (const value of [null, {}, "bad", [4], [null]])
  assert.equal(validLocalValue("saved", value, []), false);
assert.equal(validLocalValue("saved", ["dont-sleep"], []), true);
assert.equal(validLocalValue("audience", ["Adults"], "Adults"), false);
assert.equal(validLocalValue("audience", "Kids", "Adults"), true);
assert.equal(
  validLocalValue(
    "notes",
    [{ id: "a", title: "a", body: "", date: "broken" }],
    [],
  ),
  false,
);
assert.equal(
  validLocalValue(
    "notes",
    [{ id: "a", title: "a", body: "b", date: "2026-10-30" }],
    [],
  ),
  true,
);
const alarm = {
  enabled: false,
  interval: 30,
  start: "07:00",
  end: "20:00",
  days: [0, 6],
  label: "",
};
assert.equal(validLocalValue("alarm", alarm, {}), true);
for (const changed of [
  { interval: 0 },
  { start: "27:00" },
  { days: [7] },
  { label: null },
])
  assert.equal(validLocalValue("alarm", { ...alarm, ...changed }, {}), false);
const blocked = new MemoryStorage();
blocked.getItem = () => {
  throw new Error("SecurityError");
};
assert.throws(() => readLocalValue(blocked, "name", "Reader"));
const partial = new MemoryStorage({
  "gnd-local-a": "1",
  "gnd-local-b": "2",
  "other-app": "3",
});
partial.removeItem = (key) => {
  if (key === "gnd-local-b") throw new Error("denied");
  partial.values.delete(key);
};
assert.deepEqual(clearLocalData(partial), {
  removed: 1,
  failed: ["gnd-local-b"],
});
assert.equal(partial.getItem("other-app"), "3");
assert.equal(partial.getItem("gnd-local-b"), "2");
partial.removeItem = (key) => partial.values.delete(key);
assert.deepEqual(clearLocalData(partial), { removed: 1, failed: [] });
assert.deepEqual([...partial.values], [["other-app", "3"]]);
const enumeration = new MemoryStorage({ "gnd-local-name": '"Reader"' });
enumeration.key = () => {
  throw new Error("denied");
};
assert.throws(() => clearLocalData(enumeration));
assert.equal(enumeration.values.size, 1);
assert.deepEqual(clearLocalData(sample), { removed: 6, failed: [] });
assert.deepEqual([...sample.values], [["other-app", "keep"]]);
for (const route of [
  { screen: "home" },
  { screen: "reader", id: "dont-sleep" },
  { screen: "product", id: "a/b c" },
  { screen: "library", filter: "Saved" },
  { screen: "bible", reference: "Proverbs 24:33–34 (ISV)" },
])
  assert.deepEqual(parseRoute(routeHash(route)), route);
assert.deepEqual(parseRoute("#/reader/%E0%A4%A"), { screen: "home" });
assert.deepEqual(parseRoute("#/unknown"), { screen: "home" });
assert.deepEqual(parseRoute("#/library"), { screen: "library", filter: "All" });
assert.deepEqual(parseRoute("#/bible"), {
  screen: "bible",
  reference: undefined,
});
console.log(
  "LOCAL_DATA_AND_ROUTES_VERIFIED: export isolation, invalid data, blocked/partial reset, validation and route round trips",
);
