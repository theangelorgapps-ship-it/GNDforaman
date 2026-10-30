export const LOCAL_PREFIX = "gnd-local-";
export const LOCAL_DATA_VERSION = 1;
type StorageLike = Pick<
  Storage,
  "length" | "key" | "getItem" | "setItem" | "removeItem"
>;
let problem = "";
const listeners = new Set<() => void>();
export const getStorageProblem = () => problem;
export function subscribeStorageProblem(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
export function reportStorageProblem(message: string) {
  problem = message;
  queueMicrotask(() => listeners.forEach((listener) => listener()));
}
const strings = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");
const record = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);
export function validLocalValue(
  key: string,
  value: unknown,
  fallback: unknown,
): boolean {
  if (["saved", "completed", "reading-days", "shop-wishlist"].includes(key))
    return strings(value);
  if (key === "audience")
    return (
      typeof value === "string" && ["Adults", "Teens", "Kids"].includes(value)
    );
  if (key === "appearance")
    return (
      typeof value === "string" && ["light", "dark", "system"].includes(value)
    );
  if (key === "notes")
    return (
      Array.isArray(value) &&
      value.every(
        (note) =>
          record(note) &&
          ["id", "title", "body", "date"].every(
            (field) => typeof note[field] === "string",
          ) &&
          Number.isFinite(Date.parse(note.date as string)),
      )
    );
  if (key === "alarm")
    return (
      record(value) &&
      typeof value.enabled === "boolean" &&
      typeof value.interval === "number" &&
      Number.isFinite(value.interval) &&
      value.interval > 0 &&
      typeof value.label === "string" &&
      [value.start, value.end].every(
        (time) =>
          typeof time === "string" && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time),
      ) &&
      Array.isArray(value.days) &&
      value.days.every((day) => Number.isInteger(day) && day >= 0 && day <= 6)
    );
  if (Array.isArray(fallback)) return Array.isArray(value);
  return typeof value === typeof fallback && value !== null;
}
export function readLocalValue<T>(
  storage: StorageLike,
  key: string,
  fallback: T,
): T {
  const raw = storage.getItem(LOCAL_PREFIX + key);
  if (raw === null) return fallback;
  const value: unknown = JSON.parse(raw);
  if (!validLocalValue(key, value, fallback))
    throw new Error("Invalid saved data");
  return value as T;
}
export function writeLocalValue(
  storage: StorageLike,
  key: string,
  value: unknown,
  readable = true,
) {
  // A fallback must not overwrite unreadable originals before the reader can export them.
  if (!readable) return false;
  storage.setItem(LOCAL_PREFIX + key, JSON.stringify(value));
  return true;
}
export function ownedKeys(storage: StorageLike): string[] {
  const keys: string[] = [];
  for (let index = 0; index < storage.length; index++) {
    const key = storage.key(index);
    if (key?.startsWith(LOCAL_PREFIX)) keys.push(key);
  }
  return keys.sort();
}
export function exportLocalData(storage: StorageLike, now = new Date()) {
  return {
    app: "GoodNews Daily",
    schemaVersion: LOCAL_DATA_VERSION,
    exportedAt: now.toISOString(),
    format:
      "Raw browser storage values. This app does not currently import exports.",
    entries: Object.fromEntries(
      ownedKeys(storage).map((key) => [key, storage.getItem(key)]),
    ),
  };
}
export function clearLocalData(storage: StorageLike) {
  // Snapshot first: enumeration failure must never start a partial reset.
  const keys = ownedKeys(storage);
  const failed: string[] = [];
  for (const key of keys) {
    try {
      storage.removeItem(key);
      if (storage.getItem(key) !== null) failed.push(key);
    } catch {
      failed.push(key);
    }
  }
  return { removed: keys.length - failed.length, failed };
}
