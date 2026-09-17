/**
 * Guard de página: coherencia visual y de oferta más allá de check-offer-sync.
 * - Ritmo: dos secciones montadas seguidas no comparten fondo (lee el orden
 *   real de <main> en App.tsx y el bg de cada sección).
 * - Contacto: el formulario usa las 15 PILL_LABELS (mismo idioma cards/chat).
 * - Cards: cada Service tiene intent válido (union IntentionId) y group válido,
 *   y cada intención tiene exactamente una card (deep-link sin huérfanos).
 *
 * Uso: node scripts/check-page-sync.mjs (exit 1 si hay desvío).
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

const failures = [];
const ok = (cond, msg) => {
  if (!cond) failures.push(msg);
};

// 1. Ritmo de fondos según el orden montado en App.tsx ---------------------
const app = read("src/App.tsx");
const mainBlock = app.slice(app.indexOf("<main>"), app.indexOf("</main>"));
const mounted = [...mainBlock.matchAll(/<([A-Z][A-Za-z0-9]*) \/>/g)].map((m) => m[1]);
ok(mounted.length >= 5, `App.tsx monta muy pocas secciones (${mounted.length})`);

const importOf = (name) => {
  const m = app.match(new RegExp(`import ${name} from "([^"]+)"`));
  if (!m) throw new Error(`Import no encontrado: ${name}`);
  return m[1].replace("./", "src/") + (m[1].endsWith(".tsx") ? "" : ".tsx");
};

const rhythm = [];
for (const name of mounted) {
  const src = read(importOf(name));
  const section = src.match(/<section[^>]*>/);
  if (!section) {
    failures.push(`${name}: sin <section> detectable`);
    continue;
  }
  const tag = section[0];
  const id = (tag.match(/id="([^"]+)"/) || [])[1] ?? "(sin id)";
  const bg = tag.includes("bg-slate-50") ? "slate-50" : "white";
  rhythm.push({ name, id, bg });
}
for (let i = 1; i < rhythm.length; i++) {
  ok(
    rhythm[i].bg !== rhythm[i - 1].bg,
    `Doble fondo ${rhythm[i].bg}: ${rhythm[i - 1].name}#${rhythm[i - 1].id} + ${rhythm[i].name}#${rhythm[i].id}`,
  );
}

// 2. Contacto homologado ----------------------------------------------------
const contacto = read("src/components/Contacto.tsx");
ok(
  contacto.includes("PILL_LABELS") && contacto.includes("faq_brief_questions"),
  "Contacto no importa PILL_LABELS del cuestionario",
);
ok(
  /\[\.\.\.PILL_LABELS, "Otro"\]/.test(contacto.replace(/\s+/g, " ").replace("...PILL_LABELS, \"Otro\"", "...PILL_LABELS, \"Otro\"")),
  "TIPO_SERVICIO debe ser [...PILL_LABELS, \"Otro\"]",
);

// 3. Cards con intent/group válidos y sin huérfanos ---------------------------
const faq = read("src/lib/faq_brief_questions.ts");
const unionBlock = faq.slice(faq.indexOf("export type IntentionId ="), faq.indexOf(";", faq.indexOf("export type IntentionId =")));
const unionIds = new Set([...unionBlock.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]));

const data = read("src/components/soluciones-data.tsx");
const intents = [...data.matchAll(/intent: "([a-z0-9-]+)"/g)].map((m) => m[1]);
const groups = [...data.matchAll(/group: "(web|operacion|fintech)"/g)].map((m) => m[1]);
const titles = [...data.matchAll(/title: "([^"]+)"/g)].map((m) => m[1]);
ok(intents.length === titles.length, `cards sin intent: ${titles.length} títulos vs ${intents.length} intents`);
ok(groups.length === titles.length, `cards sin group: ${titles.length} títulos vs ${groups.length} groups`);
for (const intent of intents) {
  ok(unionIds.has(intent), `intent "${intent}" fuera de la union IntentionId`);
}
const intentCounts = new Map();
for (const intent of intents) intentCounts.set(intent, (intentCounts.get(intent) ?? 0) + 1);
for (const id of unionIds) {
  ok(intentCounts.get(id) === 1, `intención "${id}" con ${intentCounts.get(id) ?? 0} cards (esperado 1)`);
}
// Falsa affordance: ninguna card con cursor-pointer fuera de un <button>
const sol = read("src/components/Soluciones.tsx");
ok(!/<div[^>]*cursor-pointer/.test(sol), "Soluciones tiene cursor-pointer en un div no clicable");

if (failures.length) {
  console.error(`PAGE-SYNC FAIL (${failures.length}):`);
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}
console.log(
  `PAGE-SYNC PASS: ritmo ${rhythm.map((r) => `${r.id}:${r.bg}`).join(" → ")} | ${titles.length} cards con intent+group | contacto homologado.`,
);
