/**
 * Prerenders the React app to static HTML and injects it into
 * dist/index.html right after `vite build`.
 *
 * Why: the SPA renders everything client-side, so crawlers that do not
 * execute JS see an empty #root and no H1/headings. This script uses
 * renderToString to embed the full markup at build time.
 *
 * Run with: node scripts/prerender.mjs (after `vite build`)
 */
import { build } from "esbuild";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outfile = path.join(root, "node_modules/.cache/prerender-bundle.mjs");

await mkdir(path.dirname(outfile), { recursive: true });

// 1. Bundle the SSR entry (externalize React so it resolves from node_modules)
await build({
  entryPoints: [path.join(root, "src/main.server.tsx")],
  bundle: true,
  format: "esm",
  platform: "node",
  jsx: "automatic",
  loader: { ".css": "empty" },
  external: ["react", "react-dom", "react-dom/server", "react/jsx-runtime", "react/jsx-dev-runtime"],
  define: {
    // Vite reemplaza import.meta.env en build; esbuild no, así que lo neutralizamos:
    "import.meta.env.DEV": "false",
    "import.meta.env.PROD": "true",
    "import.meta.env.VITE_SHEETS_URL": '""',
  },
  outfile,
  logLevel: "silent",
});

// 2. Render to HTML string
const { render } = await import(`${pathToFileURL(outfile)}?t=${Date.now()}`);
const body = render();

// 3. Inject into the built index.html
const htmlPath = path.join(root, "dist/index.html");
const html = await readFile(htmlPath, "utf-8");
const marker = '<div id="root"></div>';
if (!html.includes(marker)) {
  throw new Error("dist/index.html no contiene <div id=\"root\"></div> — abortando prerender");
}
const prerendered = html.replace(marker, `<div id="root">${body}</div>`);
await writeFile(htmlPath, prerendered);

console.log(`Prerendered HTML inyectado en dist/index.html (${body.length} chars)`);