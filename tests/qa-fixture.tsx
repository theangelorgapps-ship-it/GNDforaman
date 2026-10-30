// Development-only manual failure fixture. All storage is in memory, never real user data.
import React, { lazy, useState } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "../src/components/ErrorBoundary";
import App from "../src/App";
import { ShopProvider } from "../src/shop-state";
import "../src/styles.css";
if (!import.meta.env.DEV) throw new Error("QA fixture is development only");
const memory = new Map<string, string>([
  ["unrelated-fixture-key", "preserve"],
  ["gnd-local-name", '"Fixture Reader"'],
  [
    "gnd-local-notes",
    JSON.stringify([
      {
        id: "fixture",
        title: "Disposable fixture",
        body: "Memory only",
        date: "2026-10-30T00:00:00Z",
      },
    ]),
  ],
]);
if (new URLSearchParams(location.search).has("corrupt"))
  memory.set(
    "gnd-local-notes",
    JSON.stringify([
      {
        id: "recoverable",
        title: "Keep this original",
        body: "Original memory-only note",
        date: "2026-10-30",
      },
      {
        id: "invalid",
        title: "Bad date",
        body: "Preserve raw",
        date: "not-a-date",
      },
    ]),
  );
let failRemove = false,
  failWrites = false;
Object.defineProperty(window, "localStorage", {
  configurable: true,
  value: {
    get length() {
      return memory.size;
    },
    key: (i: number) => [...memory.keys()][i] ?? null,
    getItem: (k: string) => memory.get(k) ?? null,
    setItem: (k: string, v: string) => {
      if (failWrites) throw new Error("fixture quota");
      memory.set(k, v);
    },
    removeItem: (k: string) => {
      if (failRemove && k === "gnd-local-notes")
        throw new Error("fixture blocked");
      memory.delete(k);
    },
  },
});
function Crash() {
  throw new Error("intentional fixture render failure");
  return null;
}
const LazyFailure = lazy(() =>
  Promise.reject(new Error("intentional fixture chunk failure")),
);
function Fixture() {
  const [mode, setMode] = useState("app");
  const [status, setStatus] = useState("");
  return (
    <>
      <aside style={{ padding: 16, background: "#fff", color: "#111" }}>
        <b>Development QA — disposable in-memory data</b>
        <div className="modal-actions">
          <button onClick={() => setMode("render")}>
            Simulate render failure
          </button>
          <button onClick={() => setMode("lazy")}>
            Simulate chunk failure
          </button>
          <button
            onClick={() => {
              failRemove = true;
              setStatus("One memory key will refuse removal");
            }}
          >
            Block one memory removal
          </button>
          <button
            onClick={() => {
              failRemove = false;
              setStatus("Removal allowed");
            }}
          >
            Allow memory removal
          </button>
          <button
            onClick={() => {
              failWrites = true;
              setStatus("Memory writes blocked");
            }}
          >
            Block memory writes
          </button>
          <button onClick={() => setStatus([...memory.keys()].join(", "))}>
            Inspect memory keys
          </button>
          <button
            onClick={() =>
              setStatus(memory.get("gnd-local-notes") ?? "No notes key")
            }
          >
            Inspect memory notes
          </button>
        </div>
        <p role="status">{status}</p>
      </aside>
      <ErrorBoundary>
        <React.Suspense fallback={<p>Loading fixture…</p>}>
          {mode === "render" ? (
            <Crash />
          ) : mode === "lazy" ? (
            <LazyFailure />
          ) : (
            <ShopProvider>
              <App />
            </ShopProvider>
          )}
        </React.Suspense>
      </ErrorBoundary>
    </>
  );
}
createRoot(document.getElementById("fixture")!).render(<Fixture />);
