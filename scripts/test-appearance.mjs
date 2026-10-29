import assert from "node:assert/strict";
import {
  initialAppearance,
  isDarkAppearance,
  observeSystemAppearance,
} from "../src/appearance.ts";

assert.equal(
  initialAppearance(null, null),
  "system",
  "New installs follow the device",
);
assert.equal(
  initialAppearance(null, true),
  "dark",
  "Existing dark preference survives migration",
);
assert.equal(
  initialAppearance(null, false),
  "light",
  "Existing light preference survives migration",
);
assert.equal(
  initialAppearance("system", true),
  "system",
  "Explicit System overrides legacy preference",
);
assert.equal(
  initialAppearance({ corrupt: true }, null),
  "system",
  "Invalid storage is safe",
);
for (const appearance of ["light", "dark", "system"]) {
  assert.equal(
    initialAppearance(JSON.parse(JSON.stringify(appearance)), false),
    appearance,
    "Preference survives storage round trip",
  );
}

// Simulate real MediaQueryList change events: System must update live, while
// explicit appearance remains stable. Cleanup must detach the event listener.
const media = new EventTarget();
media.matches = false;
const resolved = [];
const stop = observeSystemAppearance(media, (dark) =>
  resolved.push({
    system: isDarkAppearance("system", dark),
    light: isDarkAppearance("light", dark),
    dark: isDarkAppearance("dark", dark),
  }),
);
media.matches = true;
media.dispatchEvent(new Event("change"));
media.matches = false;
media.dispatchEvent(new Event("change"));
assert.deepEqual(resolved, [
  { system: false, light: false, dark: true },
  { system: true, light: false, dark: true },
  { system: false, light: false, dark: true },
]);
stop();
media.matches = true;
media.dispatchEvent(new Event("change"));
assert.equal(resolved.length, 3, "Unmount removes listener");
console.log(
  "APPEARANCE_VERIFIED: migration, preference persistence, live OS changes, explicit overrides, listener cleanup",
);
