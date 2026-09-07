import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "../lib/analytics";
import { saveLead } from "../lib/saveLead";
import SYSTEM_PROMPT from "../lib/systemprompt";

export type ChatAction = {
  type: "whatsapp";
  label: string;
  url: string;
};

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
  action?: ChatAction;
};

export class ApiError extends Error {
  status: number;
  code?: number | string;
  data?: unknown;

  constructor(
    message: string,
    status: number,
    code?: number | string,
    data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

export type BriefData = {
  projectType?: string;
  idea?: string;
  target?: string;
  problem?: string;
  detailLabel?: string;
  detailValue?: string;
  complejidad?: string;
  timeline?: string;
  urgencia?: string;
  presupuesto?: string;
  modalidad?: string;
  nombre?: string;
  email?: string;
  empresa?: string;
  whatsapp?: string;
};

export type SaveState = "idle" | "saving" | "saved" | "error";

const OPENROUTER_KEY =
  import.meta.env.VITE_OPENROUTER_KEY ??
  "***REMOVED***";
// const AI_MODEL = "minimax/minimax-m3:free";
const AI_MODEL = "openrouter/free";
export const WHATSAPP_NUMBER = "584165359897";

const STORAGE_KEY = "rst_chat_state_v2";

export type BriefExtract = {
  /** true si el texto contenía el marcador (aunque el JSON esté malformado). */
  matched: boolean;
  /** Texto conversacional que precede al marcador (el cierre amable), si existe. */
  prefix: string | null;
  brief: BriefData | null;
};

/**
 * Extrae el brief del texto del modelo de forma tolerante:
 * - acepta variantes del marcador (`___BRIEF___`, `___BRIEF____`, etc.)
 * - separa el prefijo conversacional del JSON
 * - tolera texto sobrante después del JSON
 * - NUNCA devuelve el JSON crudo como contenido visible
 */
export function extractBrief(text: string): BriefExtract {
  const marker = text.search(/___BRIEF_+\s*/);
  if (marker === -1) return { matched: false, prefix: null, brief: null };

  const prefix = text.slice(0, marker).trim();
  const jsonStart = text.indexOf("{", marker);
  if (jsonStart === -1)
    return { matched: true, prefix: prefix || null, brief: null };

  const candidate = text.slice(jsonStart);
  // Prueba cada posición que termina en `}` de derecha a izquierda (tolera texto
  // posterior al JSON). JSON.parse valida — las llaves anidadas no rompen esto.
  for (let i = candidate.length; i > 0; i--) {
    if (candidate[i - 1] !== "}") continue;
    try {
      return {
        matched: true,
        prefix: prefix || null,
        brief: JSON.parse(candidate.slice(0, i)) as BriefData,
      };
    } catch {
      /* sigue recortando */
    }
  }
  return { matched: true, prefix: prefix || null, brief: null };
}

/** Compila el resumen del proyecto para el handoff por WhatsApp. */
export function compileWhatsAppLink(brief: BriefData): string {
  const L: string[] = [];
  L.push("*Nuevo proyecto — RodSancTechs*");
  L.push("");
  L.push("*Descubrimiento*");
  L.push("*Tipo:* " + (brief.projectType || "-"));
  L.push("*Idea:* " + (brief.idea || "-"));
  L.push("*Negocio:* " + (brief.target || "-"));
  L.push("*Objetivo:* " + (brief.problem || "-"));
  if (brief.detailLabel && brief.detailValue)
    L.push("*" + brief.detailLabel + ":* " + brief.detailValue);
  L.push("");
  L.push("*Alcance*");
  L.push("*Complejidad:* " + (brief.complejidad || "-"));
  L.push("*Timeline:* " + (brief.timeline || "-"));
  L.push("*Urgencia:* " + (brief.urgencia || "-"));
  L.push("*Presupuesto:* " + (brief.presupuesto || "-"));
  L.push("*Modalidad:* " + (brief.modalidad || "-"));
  L.push("");
  L.push("*Contacto*");
  L.push("*Nombre:* " + (brief.nombre || "-"));
  L.push("*Email:* " + (brief.email || "-"));
  L.push("*Empresa:* " + (brief.empresa || "-"));
  L.push("*WhatsApp:* " + (brief.whatsapp || "-"));
  return (
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(L.join("\n"))
  );
}

/** Compila el enlace a WhatsApp con el historial completo de la conversación ante alta demanda o error de IA. */
export function compileWhatsAppErrorLink(
  context?: ChatMessage[] | string,
): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

  if (typeof context === "string") {
    const trimmed = context.trim();
    if (!trimmed) {
      const text =
        "Hola RodSancTechs, estaba en el chat de la web pero encontré alta demanda en el servicio. Me gustaría solicitar asesoría para mi proyecto.";
      return base + encodeURIComponent(text);
    }
    const text = `Hola RodSancTechs, estaba consultando por el chat de la web pero el servicio tiene alta demanda.\n\nMi consulta es:\n"${trimmed}"\n\n¿Me podrían asesorar por aquí?`;
    return base + encodeURIComponent(text);
  }

  const messages = context ?? [];
  const relevantMsgs = messages.filter(
    (m) => !m.isError && m.content.trim().length > 0,
  );

  const hasUserMsgs = relevantMsgs.some((m) => m.role === "user");
  if (!hasUserMsgs) {
    const text =
      "Hola RodSancTechs, estaba en el chat de la web pero encontré alta demanda en el servicio. Me gustaría solicitar asesoría para mi proyecto.";
    return base + encodeURIComponent(text);
  }

  const lines: string[] = [];
  lines.push("*Consulta desde la web — RodSancTechs*");
  lines.push("_(Conversación transferida por alta demanda en el chat)_\n");
  lines.push("*Historial de la conversación:*");

  for (const m of relevantMsgs) {
    if (m.role === "user") {
      lines.push(`👤 *Cliente:* ${m.content.trim()}`);
    } else {
      // Limpiar marcadores internos si los hubiera y acortar preguntas del bot para priorizar respuestas del cliente
      const cleanContent = m.content.replace(/___BRIEF[\s\S]*$/, "").trim();
      const truncated =
        cleanContent.length > 120
          ? cleanContent.slice(0, 117) + "..."
          : cleanContent;
      lines.push(`🤖 *Lester (IA):* ${truncated}`);
    }
  }

  lines.push("\n¿Me podrían continuar asesorando por aquí?");

  let fullText = lines.join("\n");
  // Límite seguro para URLs de WhatsApp (~2500 caracteres)
  if (fullText.length > 2500) {
    fullText =
      fullText.slice(0, 2430) +
      "...\n\n¿Me podrían continuar asesorando por aquí?";
  }

  return base + encodeURIComponent(fullText);
}

/** Determina si un error corresponde a un límite de tasa (429) o saturación de cuota. */
export function isRateLimitError(err: unknown): boolean {
  if (err instanceof ApiError) {
    return err.status === 429 || String(err.code) === "429";
  }
  if (typeof err === "object" && err !== null) {
    const status = (err as { status?: unknown }).status;
    const code = (err as { code?: unknown }).code;
    if (status === 429 || code === 429 || String(code) === "429") return true;
  }
  if (err instanceof Error) {
    return /429|rate limit|quota|credits|daily limit/i.test(err.message);
  }
  return false;
}

type PersistedState = {
  messages: ChatMessage[];
  brief: BriefData | null;
  briefClosed?: boolean;
};

/** Texto visible limpio (sin marcador ___BRIEF___) o null si no hay nada que mostrar. */
function cleanAssistantText(text: string): string | null {
  const { matched, prefix } = extractBrief(text);
  if (!matched) return text;
  return prefix;
}

/**
 * Elimina mensajes de asistente que contengan el marcador ___BRIEF___ crudo
 * (estados viejos persistidos antes de la corrección). Reemplaza por el
 * prefijo conversacional cuando existe.
 */
function scrubStoredMessages(msgs: ChatMessage[]): ChatMessage[] {
  const out: ChatMessage[] = [];
  for (const m of msgs) {
    if (m.role !== "assistant" || !m.content.includes("___BRIEF")) {
      out.push(m);
      continue;
    }
    const clean = cleanAssistantText(m.content);
    if (clean) out.push({ role: "assistant", content: clean });
  }
  return out;
}

function loadState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState;
    if (!Array.isArray(parsed.messages)) return null;
    parsed.messages = scrubStoredMessages(parsed.messages);
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Realiza fetch con reintentos y backoff exponencial para absorber picos de concurrencia
 * o límites temporales de peticiones (HTTP 429 / 5xx) de OpenRouter.
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 2,
  baseDelayMs = 800,
): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, options);
      if (res.status === 429 || res.status >= 500) {
        if (attempt < maxRetries && !options.signal?.aborted) {
          const delay =
            baseDelayMs * Math.pow(2, attempt) + Math.random() * 200;
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
      }
      return res;
    } catch (err: unknown) {
      lastError = err;
      if (options.signal?.aborted) throw err;
      if (attempt < maxRetries) {
        const delay = baseDelayMs * Math.pow(2, attempt) + Math.random() * 200;
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
    }
  }
  if (lastError) throw lastError;
  throw new Error("Network request failed after retries");
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [brief, setBrief] = useState<BriefData | null>(null);
  const [briefClosed, setBriefClosed] = useState(false);
  const [saving, setSaving] = useState<SaveState>("idle");

  // Mutex locks síncronos: protegen contra race conditions antes del re-render de React
  const isProcessingRef = useRef(false);
  const isSavingRef = useRef(false);

  // Historial como única fuente de verdad para el contexto de la IA
  const history = useRef<ChatMessage[]>([]);
  const hydrated = useRef(false);

  // AbortController para cancelar peticiones huérfanas en vuelo
  const abortControllerRef = useRef<AbortController | null>(null);

  /* Hydrate from localStorage once (conversation survives close/refresh) */
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    const saved = loadState();
    if (saved) {
      history.current = saved.messages;
      setMessages(saved.messages);
      if (saved.brief) {
        setBrief(saved.brief);
        setBriefClosed(saved.briefClosed ?? false);
        setSaving(saved.briefClosed ? "saved" : "idle");
      }
    }
  }, []);

  /* Sincronización multi-pestaña para evitar sobreescritura de estado entre pestañas */
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return;
      try {
        const parsed = JSON.parse(e.newValue) as PersistedState;
        if (Array.isArray(parsed.messages)) {
          history.current = scrubStoredMessages(parsed.messages);
          setMessages(history.current);
          if (parsed.brief !== undefined) setBrief(parsed.brief);
          if (parsed.briefClosed !== undefined) {
            setBriefClosed(parsed.briefClosed);
            setSaving(parsed.briefClosed ? "saved" : "idle");
          }
        }
      } catch {
        /* storage parse error ignorado */
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  /* Persist on every change */
  useEffect(() => {
    try {
      const state: PersistedState = {
        messages: history.current,
        brief,
        briefClosed,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full or unavailable — non-blocking */
    }
  }, [messages, brief, briefClosed]);

  /* Cleanup al desmontar para abortar cualquier fetch pendiente */
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const callAI = useCallback(
    async (
      messagesToSend: ChatMessage[],
      signal?: AbortSignal,
    ): Promise<string> => {
      const body = {
        model: AI_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messagesToSend,
        ],
        max_tokens: 600,
      };

      const res = await fetchWithRetry(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENROUTER_KEY}`,
            "HTTP-Referer": window.location.href,
          },
          body: JSON.stringify(body),
          signal,
        },
      );

      if (!res.ok) {
        let errMessage = `OpenRouter ${res.status}`;
        let errCode: string | number = res.status;
        let errData: unknown = null;
        try {
          const json = await res.json();
          errData = json;
          if (json?.error) {
            errMessage = json.error.message || errMessage;
            errCode = json.error.code ?? errCode;
          } else if (json?.message) {
            errMessage = json.message;
            errCode = json.code ?? errCode;
          }
        } catch {
          /* ignore json parse error */
        }
        throw new ApiError(errMessage, res.status, errCode, errData);
      }
      const data = await res.json();
      const reply: string = data.choices?.[0]?.message?.content ?? "";
      if (!reply) throw new Error("No response from AI");
      return reply;
    },
    [],
  );

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      // Lock síncrono instantáneo: previene race conditions ante doble click o ráfagas
      if (!trimmed || isProcessingRef.current || brief) return;

      isProcessingRef.current = true;
      setTyping(true);

      // Abortar cualquier petición en vuelo previa
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const userMsg: ChatMessage = { role: "user", content: trimmed };
      const previousHistory = [...history.current];

      // Actualizar historial y UI
      history.current = [...previousHistory, userMsg];
      setMessages((m) => [...m, userMsg]);

      try {
        const reply = await callAI(history.current, controller.signal);

        // Si fue cancelada en el ínterin, no tocar el estado
        if (controller.signal.aborted) return;

        const { matched, prefix, brief: parsed } = extractBrief(reply);
        if (!matched) {
          // Respuesta normal de conversación — se muestra completa y se persiste limpia
          const clean: ChatMessage = { role: "assistant", content: reply };
          history.current = [...history.current, clean];
          setMessages((m) => [...m, clean]);
        } else {
          // El cierre conversacional se muestra limpio; el JSON NUNCA se renderiza ni persiste
          if (prefix) {
            const clean: ChatMessage = { role: "assistant", content: prefix };
            history.current = [...history.current, clean];
            setMessages((m) => [...m, clean]);
          }
          if (parsed) {
            setBrief(parsed);
            track("brief_complete", { projectType: parsed.projectType ?? "" });
          } else {
            console.error("Brief malformado del modelo:", reply);
            const fallback: ChatMessage = {
              role: "assistant",
              content:
                "Ya casi terminamos. ¿Me confirmas tu nombre y email para enviarte la cotización?",
            };
            history.current = [...history.current, fallback];
            setMessages((m) => [...m, fallback]);
          }
        }
      } catch (err: unknown) {
        if (controller.signal.aborted) return;

        // Historial completo con el último mensaje del usuario para el handoff a WhatsApp
        const fullConversation = [...previousHistory, userMsg];

        // Rollback del historial del modelo para no dejar el prompt desalineado
        history.current = previousHistory;

        const isRateLimit = isRateLimitError(err);
        const content = isRateLimit
          ? "En este momento tenemos una alta demanda de solicitudes y el asistente no puede responderte de inmediato.\n\nPor favor, contáctanos a través de WhatsApp para atender tu consulta sin esperas:"
          : "Disculpa, tuvimos un inconveniente temporal de conexión. Puedes volver a intentarlo o escribirnos directamente por WhatsApp:";

        const errorMsg: ChatMessage = {
          role: "assistant",
          content,
          isError: true,
          action: {
            type: "whatsapp",
            label: "Contactar por WhatsApp",
            url: compileWhatsAppErrorLink(fullConversation),
          },
        };

        setMessages((m) => [...m, errorMsg]);
        console.error("[useChat] Error en llamada al modelo:", err);
      } finally {
        if (!controller.signal.aborted) {
          isProcessingRef.current = false;
          setTyping(false);
        }
      }
    },
    [callAI, brief],
  );

  const start = useCallback(async () => {
    // Si ya hay procesamiento en marcha o ya hay historial, evitar re-ejecución
    if (isProcessingRef.current || history.current.length > 0) return;

    isProcessingRef.current = true;
    setTyping(true);
    track("chat_open");

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const seedPrompt: ChatMessage[] = [
        {
          role: "user",
          content:
            "Un nuevo visitante llego a tu sitio web. Inicia la conversacion con un saludo breve y preguntale que necesita construir.",
        },
      ];
      const reply = await callAI(seedPrompt, controller.signal);

      if (controller.signal.aborted) return;

      const cleanText = cleanAssistantText(reply) ?? reply;
      const clean: ChatMessage = { role: "assistant", content: cleanText };
      history.current = [clean];
      setMessages([clean]);
    } catch (err: unknown) {
      if (controller.signal.aborted) return;

      const isRateLimit = isRateLimitError(err);
      if (isRateLimit) {
        const fallback: ChatMessage = {
          role: "assistant",
          content:
            "¡Hola! Te damos la bienvenida a RodSancTechs.\n\nEn este momento tenemos una alta demanda de solicitudes y el asistente automático se encuentra saturado. Puedes escribirnos directamente por WhatsApp para atenderte de inmediato:",
          isError: true,
          action: {
            type: "whatsapp",
            label: "Contactar por WhatsApp",
            url: compileWhatsAppErrorLink(),
          },
        };
        history.current = [fallback];
        setMessages([fallback]);
      } else {
        const fallback: ChatMessage = {
          role: "assistant",
          content:
            "¡Hola! Te damos la bienvenida a RodSancTechs. Cuéntanos: ¿qué proyecto o sistema necesitas construir?",
        };
        history.current = [fallback];
        setMessages([fallback]);
      }
    } finally {
      if (!controller.signal.aborted) {
        isProcessingRef.current = false;
        setTyping(false);
      }
    }
  }, [callAI]);

  const save = useCallback(
    async (data: BriefData) => {
      // Lock síncrono para evitar registros duplicados en Google Sheets
      if (isSavingRef.current || briefClosed) return;
      isSavingRef.current = true;
      setSaving("saving");
      track("lead_submit_attempt");

      const payload = {
        nombre: data.nombre ?? "",
        email: data.email ?? "",
        empresa: data.empresa ?? "",
        whatsapp: data.whatsapp ?? "",
        projectType: data.projectType ?? "",
        idea: data.idea ?? "",
        target: data.target ?? "",
        problem: data.problem ?? "",
        detailLabel: data.detailLabel ?? "",
        detailValue: data.detailValue ?? "",
        complejidad: data.complejidad ?? "",
        timeline: data.timeline ?? "",
        urgencia: data.urgencia ?? "",
        presupuesto: data.presupuesto ?? "",
        modalidad: data.modalidad ?? "",
      };

      try {
        await saveLead(payload);
        setSaving("saved");
        setBriefClosed(true);
        track("lead_submit_ok");
      } catch (err) {
        console.error("Sheets error:", err);
        setSaving("error");
        setBriefClosed(true);
        track("lead_submit_fail");
      } finally {
        isSavingRef.current = false;
      }
    },
    [briefClosed],
  );

  const reset = useCallback(() => {
    // 1. Cancelar cualquier petición HTTP pendiente inmediatamente
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;

    // 2. Liberar locks síncronos
    isProcessingRef.current = false;
    isSavingRef.current = false;

    // 3. Resetear estado
    history.current = [];
    setMessages([]);
    setTyping(false);
    setBrief(null);
    setBriefClosed(false);
    setSaving("idle");

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return {
    messages,
    typing,
    brief,
    briefClosed,
    saving,
    send,
    start,
    save,
    reset,
  };
}
