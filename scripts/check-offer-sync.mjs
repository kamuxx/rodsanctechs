/**
 * Regression guard: la oferta del sitio debe estar homologada.
 * - El set de intenciones es idéntico en: union IntentionId, mapa INTENTIONS,
 *   INTENTION_ORDER (faq_brief_questions.ts) y INTENTION_IDS (useChat.ts).
 * - Cada intención mapea a una tarjeta de Soluciones y cada tarjeta tiene
 *   su intención (doble vía: detecta huérfanos en ambos lados).
 * - Cada intención usa ...closingSteps(...) (cierre completo).
 *
 * Uso: node scripts/check-offer-sync.mjs (exit 1 si hay desvío).
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const faq = readFileSync(join(root, "src/lib/faq_brief_questions.ts"), "utf8");
const useChat = readFileSync(join(root, "src/hooks/useChat.ts"), "utf8");
const data = readFileSync(join(root, "src/components/soluciones-data.tsx"), "utf8");

/** Intención -> título exacto de la tarjeta en Soluciones. Única fuente del mapeo. */
const INTENTION_TO_CARD = {
  landing: "Landing informativa",
  "sitio-corporativo": "Sitio corporativo",
  blog: "Blog",
  erp: "ERP a medida",
  pos: "Punto de venta (POS)",
  ecommerce: "Carritos de compra",
  "app-movil": "Aplicación móvil",
  "gestion-pasteleria": "Gestión para pastelerías y tiendas",
  "fintech-prestamos": "Sistemas de préstamos",
  "fintech-inversiones": "Plataformas de inversión",
  "fintech-seguros": "Sistemas para seguros",
  crm: "CRM a medida",
  "sistema-turnos": "Sistema de turnos médicos",
  "sistema-parking": "Sistema de estacionamiento",
  "gestion-publicidad": "Gestión de publicidad",
};

const failures = [];
const ok = (cond, msg) => {
  if (!cond) failures.push(msg);
  return cond;
};

const section = (src, from, to) => {
  const start = src.indexOf(from);
  const end = src.indexOf(to, start);
  if (start === -1 || end === -1) throw new Error(`Bloque no encontrado: ${from}`);
  return src.slice(start, end);
};

// 1. Union IntentionId
const unionBlock = section(faq, "export type IntentionId =", ";");
const unionIds = new Set([...unionBlock.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]));

// 2. Claves del mapa INTENTIONS (2 espacios + clave + ": {")
const mapBlock = section(faq, "const INTENTIONS", "const INTENTION_ORDER");
const mapIds = new Set(
  [...mapBlock.matchAll(/^  ("?)([a-z0-9-]+)\1: \{$/gm)].map((m) => m[2]),
);

// 3. INTENTION_ORDER
const orderBlock = section(faq, "const INTENTION_ORDER = [", "] as const");
const orderIds = [...orderBlock.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]);

// 4. INTENTION_IDS en useChat
const idsBlock = section(useChat, "const INTENTION_IDS", "];");
const hookIds = [...idsBlock.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]);

// 5. Títulos de tarjetas en Soluciones
const cardTitles = new Set([...data.matchAll(/title: "([^"]+)"/g)].map((m) => m[1]));

const sameSet = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));
ok(sameSet(unionIds, mapIds), `Union (${unionIds.size}) != mapa INTENTIONS (${mapIds.size})`);
ok(
  sameSet(new Set(orderIds), unionIds) && orderIds.length === unionIds.size,
  "INTENTION_ORDER desincronizado (falta, sobra o duplica)",
);
ok(
  sameSet(new Set(hookIds), unionIds) && hookIds.length === unionIds.size,
  "INTENTION_IDS de useChat desincronizado",
);

// 6. Doble vía intención <-> tarjeta
for (const [id, title] of Object.entries(INTENTION_TO_CARD)) {
  ok(unionIds.has(id), `Mapeo huérfano: intención "${id}" no existe en la SSOT`);
  ok(cardTitles.has(title), `Intención "${id}" sin tarjeta "${title}" en Soluciones`);
}
const mappedTitles = new Set(Object.values(INTENTION_TO_CARD));
for (const title of cardTitles) {
  ok(mappedTitles.has(title), `Tarjeta "${title}" sin intención en el cuestionario`);
}

// 7. Cierre completo por intención
const closings = (faq.match(/\.\.\.closingSteps\("/g) || []).length;
ok(
  closings === mapIds.size,
  `closingSteps aparece ${closings} veces para ${mapIds.size} intenciones`,
);

if (failures.length) {
  console.error(`OFFER-SYNC FAIL (${failures.length}):`);
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}
console.log(
  `OFFER-SYNC PASS: ${unionIds.size} intenciones = orden = useChat = ${cardTitles.size} tarjetas.`,
);
