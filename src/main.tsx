import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ShopProvider } from "./shop-state";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./styles.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ShopProvider>
        <React.Suspense
          fallback={
            <p role="status" className="screen">
              Loading GoodNews…
            </p>
          }
        >
          <App />
        </React.Suspense>
      </ShopProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
