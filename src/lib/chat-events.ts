export const CHAT_OPEN_EVENT = "rodsanctechs:open-chat";

export type ChatOpenDetail = {
  /** Pill del cuestionario (p. ej. "CRM a medida"). Ausente = conservar progreso. */
  intentionPill?: string;
};

/**
 * Abre el chat conservando la conversación en curso.
 * Para iniciar una intención concreta usar `openChatWithIntention`.
 */
export function openChatWidget() {
  window.dispatchEvent(new CustomEvent(CHAT_OPEN_EVENT));
}

/** Abre el chat en una conversación nueva con la intención preseleccionada. */
export function openChatWithIntention(intentionPill: string) {
  const detail: ChatOpenDetail = { intentionPill };
  window.dispatchEvent(new CustomEvent(CHAT_OPEN_EVENT, { detail }));
}
