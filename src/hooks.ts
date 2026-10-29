import { useState } from "react";
export function useLocalState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem("gnd-local-" + key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  });
  function update(next: T | ((old: T) => T)) {
    setValue((old) => {
      const result =
        typeof next === "function" ? (next as (old: T) => T)(old) : next;
      try {
        localStorage.setItem("gnd-local-" + key, JSON.stringify(result));
      } catch {
        /* Session remains usable if storage is unavailable. */
      }
      return result;
    });
  }
  return [value, update] as const;
}
export async function copyText(text: string) {
  await navigator.clipboard.writeText(text);
}
