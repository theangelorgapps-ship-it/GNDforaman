import { useEffect, useState } from "react";
import { useLocalState } from "./hooks";
import {
  initialAppearance,
  isDarkAppearance,
  observeSystemAppearance,
  type Appearance,
} from "./appearance";
function storedAppearance() {
  try {
    return initialAppearance(
      JSON.parse(localStorage.getItem("gnd-local-appearance") ?? "null"),
      JSON.parse(localStorage.getItem("gnd-local-dark") ?? "null"),
    );
  } catch {
    return "system" as const;
  }
}
export function useAppearance() {
  const [stored, setAppearance] = useLocalState<Appearance>(
    "appearance",
    storedAppearance(),
  );
  const appearance = initialAppearance(stored, null);
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  useEffect(
    () =>
      observeSystemAppearance(
        window.matchMedia("(prefers-color-scheme: dark)"),
        setSystemDark,
      ),
    [],
  );
  const dark = isDarkAppearance(appearance, systemDark);
  return {
    appearance,
    setAppearance,
    dark,
    toggleTheme: () => setAppearance(dark ? "light" : "dark"),
  };
}
