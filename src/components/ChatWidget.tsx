import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { CHAT_OPEN_EVENT } from "../lib/chat-events";
import { hasCompletedBrief } from "../lib/chat-storage";
import { BOT_NAME } from "../lib/systemprompt";
import { WhatsAppIcon } from "./chat-icons";

/**
 * The chat panel (state machine, FAQ data and lead capture) is only needed
 * after the user opens the chat, so it is code-split. The floating button and
 * the invitation bubble stay eager: they are the only chat markup present in
 * the prerendered HTML and must hydrate without a mismatch.
 */
const ChatPanel = lazy(() => import("./ChatPanel"));

function ChatPanelFallback() {
  return (
    <div
      className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[min(92vw,380px)] h-[100dvh] sm:h-[min(80vh,620px)] sm:rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center chat-panel-enter bg-wa-bg"
      role="status"
      aria-label="Cargando chat"
    >
      <span className="text-sm text-slate-500">Cargando chat…</span>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [hasBrief, setHasBrief] = useState(false);

  // Read persisted state after mount to keep SSR/hydration output identical.
  useEffect(() => {
    setHasBrief(hasCompletedBrief());
  }, []);

  useEffect(() => {
    const onOpen = () => {
      setMounted(true);
      setOpen(true);
    };
    window.addEventListener(CHAT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CHAT_OPEN_EVENT, onOpen);
  }, []);

  const openPanel = useCallback(() => {
    setMounted(true);
    setOpen(true);
  }, []);

  const closePanel = useCallback(() => setOpen(false), []);

  const handleBriefChange = useCallback((value: boolean) => {
    setHasBrief(value);
  }, []);

  return (
    <>
      {/* Floating button + invitation bubble */}
      {!open && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          {!bubbleDismissed && !hasBrief && (
            <div className="relative bg-white rounded-2xl rounded-br-none shadow-xl px-4 py-3 max-w-[240px] chat-panel-enter">
              <p className="text-sm font-semibold text-slate-800">
                ¿Hablamos de tu proyecto?
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Cuéntanos qué necesitas — respuesta en menos de 24 h.
              </p>
              <button
                onClick={() => setBubbleDismissed(true)}
                aria-label="Descartar invitación"
                className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-xs transition-colors"
              >
                ×
              </button>
            </div>
          )}
          <button
            onClick={openPanel}
            aria-label={`Abrir chat con ${BOT_NAME}`}
            className="w-16 h-16 rounded-full bg-wa-header text-white shadow-lg wa-pulse flex items-center justify-center hover:scale-105 transition-transform"
          >
            <WhatsAppIcon />
          </button>
        </div>
      )}

      {/* Chat panel — loaded on first interaction and kept mounted afterwards */}
      {mounted && (
        <Suspense fallback={<ChatPanelFallback />}>
          <ChatPanel open={open} onClose={closePanel} onBriefChange={handleBriefChange} />
        </Suspense>
      )}
    </>
  );
}
