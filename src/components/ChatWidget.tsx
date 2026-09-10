import { useEffect, useRef, useState } from "react";
import { compileWhatsAppLink, useChat } from "../hooks/useChat";
import { CHAT_OPEN_EVENT } from "../lib/chat-events";
import { INTENTION_LIST } from "../lib/faq_brief_questions";
import { BOT_NAME } from "../lib/systemprompt";

function WhatsAppIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
    </svg>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white rounded-lg rounded-tl-none px-3 py-2.5 shadow-sm">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="wa-typing-dot inline-block w-1.5 h-1.5 rounded-full bg-slate-400"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Bubble({ isUser, children }: { isUser: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-3 py-2 rounded-lg shadow-sm text-[14.5px] leading-relaxed whitespace-pre-line ${
          isUser ? "bg-wa-sent rounded-tr-none" : "bg-wa-received rounded-tl-none"
        } text-wa-ink`}
      >
        {children}
      </div>
    </div>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <path d="M4 6h2v2H4V6zm0 5h2v2H4v-2zm0 5h2v2H4v-2zM8 6h12v2H8V6zm0 5h12v2H8v-2zm0 5h12v2H8v-2z" />
    </svg>
  );
}

function RadioMark({ checked }: { checked: boolean }) {
  return (
    <span
      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
        checked ? "border-wa-header" : "border-slate-400"
      }`}
      aria-hidden="true"
    >
      {checked && <span className="h-2 w-2 rounded-full bg-wa-header" />}
    </span>
  );
}

function CheckMark({ checked }: { checked: boolean }) {
  return (
    <span
      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${
        checked ? "border-wa-header bg-wa-header text-white" : "border-slate-400"
      }`}
      aria-hidden="true"
    >
      {checked && (
        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 6l3 3 5-5" />
        </svg>
      )}
    </span>
  );
}

type ListItem = { id: string; title: string; description?: string };

function ListSheet({
  title,
  mode,
  items,
  onClose,
  onConfirm,
}: {
  title: string;
  mode: "radio" | "check";
  items: readonly ListItem[];
  onClose: () => void;
  onConfirm: (titles: string[]) => void;
}) {
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (mode === "radio") {
      const item = items.find((entry) => entry.id === id);
      if (item) onConfirm([item.title]);
      return;
    }
    setPicked((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  };

  const confirmCheck = () => {
    const titles = items.filter((item) => picked.includes(item.id)).map((item) => item.title);
    if (titles.length) onConfirm(titles);
  };

  return (
    <div
      className="absolute inset-0 z-10 flex flex-col justify-end bg-black/25"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Cerrar lista"
        onClick={onClose}
      />
      <div className="relative flex max-h-[70%] flex-col rounded-t-2xl bg-white shadow-[0_-8px_24px_rgba(17,27,33,0.12)]">
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="text-slate-500 hover:text-wa-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wa-header"
          >
            <span className="text-lg leading-none">×</span>
          </button>
          <p className="text-[15px] font-semibold text-wa-ink">{title}</p>
        </div>
        <ul className="flex-1 overflow-y-auto py-1">
          {items.map((item) => {
            const checked = picked.includes(item.id);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className={`flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:outline-none ${
                    checked ? "bg-slate-50" : ""
                  }`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold text-wa-ink">
                      {item.title}
                    </span>
                    {item.description && (
                      <span className="mt-0.5 block text-[13px] leading-snug text-wa-subtle">
                        {item.description}
                      </span>
                    )}
                  </span>
                  {mode === "check" ? (
                    <CheckMark checked={checked} />
                  ) : (
                    <RadioMark checked={false} />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
        {mode === "check" && (
          <div className="border-t border-slate-100 p-3">
            <button
              type="button"
              disabled={!picked.length}
              onClick={confirmCheck}
              className="w-full rounded-full bg-wa-header py-2.5 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-40"
            >
              Listo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const {
    messages,
    typing,
    brief,
    briefClosed,
    saving,
    chips,
    faqChoice,
    send,
    start,
    save,
    reset,
    selectChip,
  } = useChat();
  const [open, setOpen] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const firstOpen = useRef(true);

  useEffect(() => {
    if (open && firstOpen.current) {
      firstOpen.current = false;
      start();
    }
  }, [open, start]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(CHAT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CHAT_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, brief, chips, open]);

  // Composer stays visible on chip turns (WhatsApp: replies in-thread, input bar persists).
  const prevTyping = useRef(typing);
  useEffect(() => {
    if (prevTyping.current && !typing) {
      inputRef.current?.focus();
    }
    prevTyping.current = typing;
  }, [typing]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || typing || brief) return;
    send(input);
    setInput("");
  };

  const handleReset = () => {
    setListOpen(false);
    reset();
    // start() solo actúa si el historial quedó vacío (lo acaba de vaciar reset)
    void start();
  };

  const inputDisabled = typing || brief !== null;
  const waLink = brief ? compileWhatsAppLink(brief) : "";
  const showGreetList = Boolean(chips?.length) && chips!.length > 2 && !typing;
  const showFaqList = Boolean(faqChoice) && !typing;
  const showListTrigger = showGreetList || showFaqList;
  const showConsent = chips?.length === 2 && !typing;

  const pickList = (titles: string[]) => {
    setListOpen(false);
    if (showGreetList) {
      void selectChip(titles[0] ?? "");
      return;
    }
    void send(titles.join(", "));
  };

  return (
    <>
      {/* Floating button + invitation bubble */}
      {!open && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          {!bubbleDismissed && !brief && (
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
            onClick={() => setOpen(true)}
            aria-label={`Abrir chat con ${BOT_NAME}`}
            className="w-16 h-16 rounded-full bg-wa-header text-white shadow-lg wa-pulse flex items-center justify-center hover:scale-105 transition-transform"
          >
            <WhatsAppIcon />
          </button>
        </div>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[min(92vw,380px)] h-[100dvh] sm:h-[min(80vh,620px)] sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col chat-panel-enter bg-wa-bg"
          role="dialog"
          aria-label={`Chat con ${BOT_NAME}`}
        >
          {/* Header */}
          <div className="bg-wa-header text-white px-4 py-3 flex items-center gap-3 shrink-0">
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar chat"
              className="text-white/90 hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-deep flex items-center justify-center font-bold text-sm shrink-0">
              {BOT_NAME[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[15px] leading-tight truncate">
                {BOT_NAME} · RodSancTechs
              </p>
              <p className="text-xs text-white/80 leading-tight">
                Responde en menos de 24 h
              </p>
            </div>
            <button
              onClick={handleReset}
              aria-label="Reiniciar conversación"
              title="Reiniciar conversación"
              className="text-white/90 hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8M3 3v5h5" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="relative flex-1 min-h-0">
          <div ref={bodyRef} className="h-full overflow-y-auto wa-pattern px-3 py-4 flex flex-col gap-1.5">
            {messages.length === 0 && !typing && (
              <div className="text-center text-xs text-slate-500 py-6">
                Conversación encriptada de extremo a extremo... no, mentira 😄 — pero sí atendida por {BOT_NAME}.
              </div>
            )}

            {messages.map((m, i) => {
              const isLastAssistant =
                m.role === "assistant" &&
                !messages.slice(i + 1).some((later) => later.role === "assistant");
              return (
                <div key={i}>
                  <Bubble isUser={m.role === "user"}>
                    <div>{m.content}</div>
                    {m.action?.type === "whatsapp" && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200/80 whitespace-normal">
                        <a
                          href={m.action.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.98] transition-all text-xs sm:text-[13px] shadow-sm hover:shadow"
                        >
                          <WhatsAppIcon className="w-4 h-4 shrink-0" />
                          <span>{m.action.label}</span>
                        </a>
                      </div>
                    )}
                    {isLastAssistant && showListTrigger && (
                      <button
                        type="button"
                        onClick={() => setListOpen(true)}
                        className="-mx-3 mt-2 flex w-[calc(100%+1.5rem)] items-center justify-center gap-2 border-t border-slate-200/80 py-2.5 text-[14px] font-medium text-wa-header hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wa-header"
                      >
                        <ListIcon />
                        Clic aquí
                      </button>
                    )}
                    {isLastAssistant && showConsent && (
                      <div className="-mx-3 mt-2 border-t border-slate-200/80">
                        {chips!.map((label) => (
                          <button
                            key={label}
                            type="button"
                            onClick={() => void selectChip(label)}
                            className={`flex w-full items-center justify-center py-2.5 text-[14px] font-medium hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wa-header ${
                              label === "No"
                                ? "text-wa-header border-t border-slate-200/80"
                                : "text-wa-ink"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    )}
                  </Bubble>
                </div>
              );
            })}

            {typing && <TypingIndicator />}

            {/* Brief summary + closer */}
            {brief && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm text-sm text-wa-ink w-full">
                  <p className="font-bold mb-2">Resumen de tu proyecto</p>
                  <div className="space-y-1 text-[13px] text-slate-600">
                    {brief.projectType && <p><span className="text-slate-400">Tipo:</span> {brief.projectType}</p>}
                    {brief.idea && <p><span className="text-slate-400">Idea:</span> {brief.idea}</p>}
                    {brief.target && <p><span className="text-slate-400">Negocio:</span> {brief.target}</p>}
                    {brief.problem && <p><span className="text-slate-400">Objetivo:</span> {brief.problem}</p>}
                    {brief.modalidad && <p><span className="text-slate-400">Modalidad:</span> {brief.modalidad}</p>}
                    {brief.detailValue && <p><span className="text-slate-400">{brief.detailLabel || "Detalle"}:</span> {brief.detailValue}</p>}
                    {brief.complejidad && <p><span className="text-slate-400">Complejidad:</span> {brief.complejidad}</p>}
                    {brief.timeline && <p><span className="text-slate-400">Plazo:</span> {brief.timeline}</p>}
                    {brief.urgencia && <p><span className="text-slate-400">Urgencia:</span> {brief.urgencia}</p>}
                    {brief.presupuesto && <p><span className="text-slate-400">Presupuesto:</span> {brief.presupuesto}</p>}
                    {brief.nombre && <p><span className="text-slate-400">Nombre:</span> {brief.nombre}</p>}
                    {brief.email && <p><span className="text-slate-400">Email:</span> {brief.email}</p>}
                    {brief.whatsapp && <p><span className="text-slate-400">Contacto:</span> {brief.whatsapp}</p>}
                    {brief.pais && <p><span className="text-slate-400">País:</span> {brief.pais}</p>}
                  </div>

                  <p className="text-[12px] text-slate-500 mt-3 leading-relaxed">
                    Al confirmar enviamos tu solicitud y te llega la cotización por
                    correo en menos de 24 h.
                  </p>

                  {!briefClosed && (
                    <button
                      onClick={() => save(brief)}
                      disabled={saving === "saving"}
                      className="mt-2 w-full py-2.5 rounded-full font-semibold text-white bg-wa-header hover:opacity-95 transition-opacity disabled:opacity-60 text-sm"
                    >
                      {saving === "saving"
                        ? "Enviando..."
                        : saving === "error"
                          ? "Reintentar envío"
                          : "Confirmar y solicitar cotización"}
                    </button>
                  )}

                  {/* Closer: confirmation + human handoff */}
                  {briefClosed && (
                    <div className="mt-3 space-y-2">
                      <p className="text-[13px] text-slate-600 leading-relaxed">
                        {saving === "saved"
                          ? "¡Listo, " + (brief.nombre?.split(" ")[0] || "gracias") + "! Tu solicitud está registrada. Recibirás la cotización por correo en menos de 24 h."
                          : "No pudimos registrar tu solicitud automáticamente, pero no pierdes nada:"}
                      </p>
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          setTimeout(() => {
                            handleReset();
                          }, 500);
                        }}
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full font-semibold text-white bg-[#25D366] hover:opacity-95 transition-opacity text-sm"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        {saving === "error"
                          ? "Enviar resumen por WhatsApp"
                          : "¿Urgente? Escríbenos por WhatsApp"}
                      </a>
                      {saving === "error" && (
                        <p className="text-[11px] text-slate-400 text-center">
                          El botón incluye el resumen completo de tu proyecto.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          {listOpen && showListTrigger && (
            <ListSheet
              title="Clic aquí"
              mode={faqChoice?.mode ?? "radio"}
              items={faqChoice?.options ?? INTENTION_LIST}
              onClose={() => setListOpen(false)}
              onConfirm={pickList}
            />
          )}
          </div>

          <form onSubmit={onSubmit} className="bg-[#f0f2f5] px-3 py-2.5 flex items-end gap-2 shrink-0">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSubmit(e);
                  }
                }}
                rows={1}
                disabled={inputDisabled}
                placeholder={brief ? "Conversación completada" : "Escribe un mensaje"}
                aria-label="Mensaje"
                className="flex-1 resize-none rounded-full px-4 py-2.5 text-[15px] bg-white text-wa-ink placeholder-slate-400 outline-none focus:ring-1 focus:ring-wa-header disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={inputDisabled || !input.trim()}
                aria-label="Enviar"
                className="w-11 h-11 rounded-full bg-wa-header text-white flex items-center justify-center hover:opacity-95 transition-opacity disabled:opacity-40 shrink-0"
              >
                <SendIcon />
              </button>
            </form>
        </div>
      )}
    </>
  );
}
