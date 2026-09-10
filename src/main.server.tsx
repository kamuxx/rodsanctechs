import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

/**
 * SSR entry used by scripts/prerender.mjs to inject the full HTML
 * into dist/index.html at build time. Makes headings/content visible
 * to non-JS crawlers.
 */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}