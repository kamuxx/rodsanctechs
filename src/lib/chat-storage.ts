/**
 * Single source of truth for the chat persistence key.
 * Kept in its own module so the eager launcher (ChatWidget) can inspect the
 * stored conversation without pulling the full chat runtime into the main bundle.
 */

export const CHAT_STORAGE_KEY = "rst_chat_state_v3";

/**
 * True when the persisted conversation already closed the brief
 * (submitted or explicitly handed off). Used by the launcher to hide the
 * invitation bubble after the user has completed the flow.
 */
export function hasCompletedBrief(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { briefClosed?: unknown };
    return parsed?.briefClosed === true;
  } catch {
    return false;
  }
}
