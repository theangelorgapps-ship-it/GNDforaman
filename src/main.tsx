import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ShopProvider } from "./shop-state";
import "./styles.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
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
  </React.StrictMode>,
);
