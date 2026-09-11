/**
 * Funnel analytics — emite eventos al dataLayer (Google Tag Manager / GA4) si
 * está presente. Nunca rompe si no hay analytics configurado.
 */
export function track(event: string, params: Record<string, string | number> = {}) {
  try {
    const win = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push({ event, ...params });
    if (typeof win.gtag === "function") {
      win.gtag("event", event, params);
    }
  } catch {
    /* analytics must never break the funnel */
  }
  if (import.meta.env.DEV) {
    console.debug("[analytics]", event, params);
  }
}

if (import.meta.env.DEV) {
  (window as unknown as { track?: typeof track }).track = track;
}
