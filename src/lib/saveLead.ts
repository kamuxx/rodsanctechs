const SHEETS_URL = import.meta.env.VITE_SHEETS_URL?.trim() ?? "";

/**
 * Incluye `pais` solo si el llamador lo envió.
 * Contacto no lo manda; el brief del chat sí.
 */
function withOptionalPais(
  payload: Record<string, unknown>,
): Record<string, unknown> {
  const { pais, ...rest } = payload;
  if (pais === undefined) return rest;
  return { ...rest, pais };
}

/**
 * Guarda un lead en Google Sheets vía Apps Script.
 * Lanza error si el endpoint no responde OK — el llamador decide el fallback.
 * Solo usa VITE_SHEETS_URL; no hay URL de respaldo.
 */
export async function saveLead(
  payload: Record<string, unknown>,
): Promise<void> {
  if (!SHEETS_URL) throw new Error("VITE_SHEETS_URL is not configured");

  const record = withOptionalPais(payload);

  console.log("[saveLead] Sending payload:", record);

  const res = await fetch(SHEETS_URL, {
    method: "POST",
    // text/plain = petición CORS "simple" (sin preflight OPTIONS).
    // Apps Script no responde preflight; application/json provocaba
    // "blocked by CORS policy". El body JSON llega igual en e.postData.contents.
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(record),
  });

  console.log("[saveLead] Response status:", res.status, res.statusText);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }

  // Apps Script sometimes returns 200 with error in body
  try {
    const body = await res.json();
    console.log("[saveLead] Response body:", body);
    if (body.error) {
      throw new Error(`Apps Script error: ${body.error}`);
    }
  } catch (e) {
    if (e instanceof SyntaxError) {
      // Redirect page — non-JSON response is ok
      console.log("[saveLead] Response not JSON (likely redirect page, ok)");
      return;
    }
    throw e;
  }
}
