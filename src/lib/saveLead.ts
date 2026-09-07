const SHEETS_URL =
  import.meta.env.VITE_SHEETS_URL ??
  "https://script.google.com/macros/s/AKfycbx_LQTMgSVwXd6ajzG0c_GNpOUv8arwkkRm7TOnFKL90XaikXNE5W4v5SdvN1AWnClY/exec";

/**
 * Guarda un lead en Google Sheets vía Apps Script.
 * Lanza error si el endpoint no responde OK — el llamador decide el fallback.
 */
export async function saveLead(
  payload: Record<string, unknown>,
): Promise<void> {
  console.log("[saveLead] Sending payload:", payload);

  const res = await fetch(SHEETS_URL, {
    method: "POST",
    // text/plain = petición CORS "simple" (sin preflight OPTIONS).
    // Apps Script no responde preflight; application/json provocaba
    // "blocked by CORS policy". El body JSON llega igual en e.postData.contents.
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });

  console.log("[saveLead] Response status:", res.status, res.statusText);

  // Apps Script sometimes returns 200 with error in body
  if (res.ok) {
    try {
      const body = await res.json();
      console.log("[saveLead] Response body:", body);
      if (body.error) {
        throw new Error(`Apps Script error: ${body.error}`);
      }
    } catch (e) {
      // If JSON parsing fails, it might be a redirect page — that's ok
      console.log("[saveLead] Response not JSON (likely redirect page, ok)");
    }
    return;
  }

  throw new Error(`HTTP ${res.status} ${res.statusText}`);
}
