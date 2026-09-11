import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const rootEl = document.getElementById("root")!;

// Solo hidratar si el HTML fue prerenderizado (build). En dev el root
// viene vacío y hydrateRoot ahí es el que dispara el "Hydration failed".
if (rootEl.hasChildNodes()) {
  hydrateRoot(
    rootEl,
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
