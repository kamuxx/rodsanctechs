export const CHAT_OPEN_EVENT = "rodsanctechs:open-chat";

export function openChatWidget() {
  window.dispatchEvent(new CustomEvent(CHAT_OPEN_EVENT));
}
