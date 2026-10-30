import { useRef, useState } from "react";
import {
  readLocalValue,
  reportStorageProblem,
  writeLocalValue,
} from "./local-data";
export function useLocalState<T>(key: string, fallback: T) {
  const readable = useRef(true);
  const [value, setValue] = useState<T>(() => {
    try {
      return readLocalValue(localStorage, key, fallback);
    } catch {
      readable.current = false;
      reportStorageProblem(
        "Some saved data could not be read. You can keep using this session. Export your stored data in Profile → Privacy & data before clearing anything.",
      );
      return fallback;
    }
  });
  function update(next: T | ((old: T) => T)) {
    setValue((old) => {
      const result =
        typeof next === "function" ? (next as (old: T) => T)(old) : next;
      try {
        if (!writeLocalValue(localStorage, key, result, readable.current))
          throw new Error("Saved data needs recovery");
      } catch {
        reportStorageProblem(
          "Your latest changes could not be saved in this browser. Keep this page open and copy any new notes before leaving. A data export includes previously saved data only.",
        );
      }
      return result;
    });
  }
  return [value, update] as const;
}
export async function copyText(text: string) {
  await navigator.clipboard.writeText(text);
}
