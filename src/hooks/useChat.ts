import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "../lib/analytics";
import {
  PILL_LABELS,
  faqChoiceOf,
  getIntention,
  nextFaqStep,
  splitOtrosAnswer,
  type FaqChoiceMode,
  type FaqOption,
  type IntentionId,
} from "../lib/faq_brief_questions";
import { saveLead } from "../lib/saveLead";
import { BOT_NAME } from "../lib/systemprompt";

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
  pais?: string;
};

export type SaveState = "idle" | "saving" | "saved" | "error";

export type ActiveFaqChoice = {
  mode: FaqChoiceMode;
  options: readonly FaqOption[];
};

export type ChatStep =
  | "greet"
  | "consent"
  | "faq"
  | "idea"
  | "nombre"
  | "empresa"
  | "email"
  | "whatsapp"
  | "pais"
  | "closed";

export const WHATSAPP_NUMBER = "584165359897";

const STORAGE_KEY = "rst_chat_state_v3";

const GREET_MESSAGE =
  "¡Hola! Te damos la bienvenida a RodSancTechs. Elige la solución que mejor describe lo que necesitas:";

const IDEA_PROMPT =
  "Cuéntanos con tus palabras qué necesitas construir.";

const OTROS_FOLLOWUP =
  "Elegiste Otros. Escríbelo aquí para que quede en el brief.";

const CONSENT_CHIPS = ["Sí", "No"] as const;

function typingDelayMs(): number {
  return 1500 + Math.floor(Math.random() * 501);
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

/* ── Contact field validation ───────────────────────────────────────── */

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8;
}

function isValidCountry(value: string): boolean {
  return value.trim().length >= 2;
}

type ValidationResult = { ok: true } | { ok: false; error: string };

function validateContactField(
  step: ContactStep,
  value: string,
): ValidationResult {
  const trimmed = value.trim();
  switch (step) {
    case "email":
      if (!trimmed) return { ok: false, error: "Por favor ingresa tu correo electrónico." };
      if (!isValidEmail(trimmed))
        return { ok: false, error: "El correo no parece válido. Ejemplo: usuario@empresa.com" };
      break;
    case "whatsapp":
      if (!trimmed) return { ok: false, error: "Por favor ingresa tu número de WhatsApp." };
      if (!isValidPhone(trimmed))
        return { ok: false, error: "El número debe tener al menos 8 dígitos. Ejemplo: +58 416 535 9897" };
      break;
    case "pais":
      if (!trimmed) return { ok: false, error: "Por favor indica en qué país estás." };
      if (!isValidCountry(trimmed))
        return { ok: false, error: "Por favor escribe el nombre de tu país." };
      break;
    default:
      if (!trimmed) return { ok: false, error: "Por favor completa este campo." };
      break;
  }
  return { ok: true };
}

const INTENTION_IDS: readonly IntentionId[] = [
  "landing",
  "sitio-corporativo",
  "blog",
  "erp",
  "pos",
  "ecommerce",
  "gestion-pasteleria",
  "fintech-prestamos",
  "fintech-inversiones",
  "fintech-seguros",
];

const CONTACT_STEPS = [
  "nombre",
  "empresa",
  "email",
  "whatsapp",
  "pais",
] as const;

type ContactStep = (typeof CONTACT_STEPS)[number];

const CONTACT_PROMPTS: Record<ContactStep, string> = {
  nombre: "¿Cuál es tu nombre?",
  empresa: "¿En qué empresa o negocio trabajas?",
  email: "¿Cuál es tu correo electrónico?",
  whatsapp: "¿Cuál es tu número de WhatsApp?",
  pais: "¿En qué país estás?",
};

const CHAT_STEPS = new Set<ChatStep>([
  "greet",
  "consent",
  "faq",
  "idea",
  "nombre",
  "empresa",
  "email",
  "whatsapp",
  "pais",
  "closed",
]);

export type BriefExtract = {
  /** true si el texto contenía el marcador (aunque el JSON esté malformado). */
  matched: boolean;
  /** Texto conversacional que precede al marcador (el cierre amable), si existe. */
  prefix: string | null;
  brief: BriefData | null;
};

/**
 * Extrae el brief del texto del modelo de forma tolerante.
 * El happy path del FSM no lo llama; se conserva para rollback.
 */
export function extractBrief(text: string): BriefExtract {
  const marker = text.search(/___BRIEF_+\s*/);
  if (marker === -1) return { matched: false, prefix: null, brief: null };

  const prefix = text.slice(0, marker).trim();
  const jsonStart = text.indexOf("{", marker);
  if (jsonStart === -1)
    return { matched: true, prefix: prefix || null, brief: null };

  const candidate = text.slice(jsonStart);
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

  L.push("Hola RodSancTechs, solicito cotización para:");
  L.push("");

  // Proyecto
  const tipo = brief.projectType || "Proyecto";
  L.push("📋 *" + tipo + "*");
  L.push("");

  if (brief.idea) L.push("💡 " + brief.idea);
  if (brief.target) L.push("🎯 Negocio: " + brief.target);
  if (brief.problem) L.push("📦 Objetivo: " + brief.problem);
  if (brief.detailLabel && brief.detailValue)
    L.push("📊 " + brief.detailLabel + ": " + brief.detailValue);

  // Alcance
  const alcance: string[] = [];
  if (brief.modalidad) alcance.push(brief.modalidad);
  if (brief.timeline) alcance.push("Plazo: " + brief.timeline);
  if (brief.urgencia) alcance.push("Urgencia: " + brief.urgencia);
  if (brief.presupuesto) alcance.push("Presupuesto: " + brief.presupuesto);
  if (alcance.length) {
    L.push("");
    L.push("⏰ " + alcance.join(" | "));
  }

  L.push("");
  L.push("👤 " + (brief.nombre || ""));
  if (brief.empresa) L.push("🏢 " + brief.empresa);
  if (brief.email) L.push("📧 " + brief.email);
  if (brief.whatsapp) L.push("📱 " + brief.whatsapp);
  if (brief.pais) L.push("🌎 " + brief.pais);

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
      const cleanContent = m.content.replace(/___BRIEF[\s\S]*$/, "").trim();
      const truncated =
        cleanContent.length > 120
          ? cleanContent.slice(0, 117) + "..."
          : cleanContent;
      lines.push(`🤖 *${BOT_NAME}:* ${truncated}`);
    }
  }

  lines.push("\n¿Me podrían continuar asesorando por aquí?");

  let fullText = lines.join("\n");
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
  step: ChatStep;
  intentionId: IntentionId | null;
  briefClosed?: boolean;
};

function isChatStep(value: unknown): value is ChatStep {
  return typeof value === "string" && CHAT_STEPS.has(value as ChatStep);
}

function isIntentionId(value: unknown): value is IntentionId {
  return (
    typeof value === "string" &&
    INTENTION_IDS.includes(value as IntentionId)
  );
}

function intentionFromPill(label: string) {
  for (const id of INTENTION_IDS) {
    const intention = getIntention(id);
    if (intention.pillLabel === label) return intention;
  }
  return null;
}

function chipsForStep(step: ChatStep): string[] | null {
  if (step === "greet") return [...PILL_LABELS];
  if (step === "consent") return [...CONSENT_CHIPS];
  return null;
}

function consentPrompt(projectType: string): string {
  return `Para poder ayudar con ${projectType} necesitamos que nos contestes unas preguntas. ¿Estás de acuerdo?`;
}

function faqStepById(intentionId: IntentionId, stepId: string) {
  return (
    getIntention(intentionId).steps.find((step) => step.id === stepId) ?? null
  );
}

/** Reconstruye el paso FAQ pendiente a partir del brief persistido. */
function inferFaqStepId(
  intentionId: IntentionId,
  brief: BriefData,
): string | null {
  let currentId: string | null = null;
  let step = nextFaqStep(intentionId, null);
  while (step) {
    const value = brief[step.mapsTo];
    if (!value?.trim()) return step.id;
    currentId = step.id;
    step = nextFaqStep(intentionId, currentId);
  }
  return currentId;
}

function nextContactAfter(current: ContactStep): ContactStep | "closed" {
  const index = CONTACT_STEPS.indexOf(current);
  if (index === -1 || index === CONTACT_STEPS.length - 1) return "closed";
  return CONTACT_STEPS[index + 1];
}

function isContactStep(step: ChatStep): step is ContactStep {
  return (CONTACT_STEPS as readonly string[]).includes(step);
}

function loadState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState;
    if (!Array.isArray(parsed.messages)) return null;
    if (!isChatStep(parsed.step)) return null;
    if (parsed.intentionId !== null && !isIntentionId(parsed.intentionId)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [brief, setBrief] = useState<BriefData | null>(null);
  const [briefClosed, setBriefClosed] = useState(false);
  const [saving, setSaving] = useState<SaveState>("idle");
  const [step, setStepState] = useState<ChatStep>("greet");
  const [intentionId, setIntentionIdState] = useState<IntentionId | null>(null);
  const [chips, setChips] = useState<string[] | null>(null);
  const [faqChoice, setFaqChoice] = useState<ActiveFaqChoice | null>(null);

  const isProcessingRef = useRef(false);
  const isSavingRef = useRef(false);
  const history = useRef<ChatMessage[]>([]);
  const hydrated = useRef(false);
  const stepRef = useRef<ChatStep>("greet");
  const intentionIdRef = useRef<IntentionId | null>(null);
  const draftRef = useRef<BriefData>({});
  const faqStepIdRef = useRef<string | null>(null);
  const otrosPrefixRef = useRef<string | null>(null);

  const setStep = (next: ChatStep) => {
    stepRef.current = next;
    setStepState(next);
    setChips(chipsForStep(next));
  };

  const setIntention = (id: IntentionId | null) => {
    intentionIdRef.current = id;
    setIntentionIdState(id);
  };

  const appendMessages = (...incoming: ChatMessage[]) => {
    history.current = [...history.current, ...incoming];
    setMessages(history.current);
  };

  /* Hydrate from localStorage once. v2 se ignora (otra clave). */
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    const saved = loadState();
    if (!saved) return;

    history.current = saved.messages;
    setMessages(saved.messages);
    draftRef.current = saved.brief ?? {};
    setStep(saved.step);
    setIntention(saved.intentionId);

    if (saved.step === "faq" && saved.intentionId) {
      faqStepIdRef.current = inferFaqStepId(
        saved.intentionId,
        saved.brief ?? {},
      );
      const pending = faqStepIdRef.current
        ? faqStepById(saved.intentionId, faqStepIdRef.current)
        : null;
      setFaqChoice(faqChoiceOf(pending));
    } else {
      setFaqChoice(null);
    }

    if (saved.briefClosed) {
      setBrief(saved.brief);
      setBriefClosed(true);
      setSaving("saved");
    }
  }, []);

  /* Sincronización multi-pestaña */
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return;
      try {
        const parsed = JSON.parse(e.newValue) as PersistedState;
        if (!Array.isArray(parsed.messages) || !isChatStep(parsed.step)) return;
        if (parsed.intentionId !== null && !isIntentionId(parsed.intentionId)) {
          return;
        }
        history.current = parsed.messages;
        setMessages(parsed.messages);
        draftRef.current = parsed.brief ?? {};
        setStep(parsed.step);
        setIntention(parsed.intentionId);
        if (parsed.step === "faq" && parsed.intentionId) {
          faqStepIdRef.current = inferFaqStepId(
            parsed.intentionId,
            parsed.brief ?? {},
          );
          const pending = faqStepIdRef.current
            ? faqStepById(parsed.intentionId, faqStepIdRef.current)
            : null;
          setFaqChoice(faqChoiceOf(pending));
        } else {
          setFaqChoice(null);
        }
        if (parsed.briefClosed) {
          setBrief(parsed.brief);
          setBriefClosed(true);
          setSaving("saved");
        } else {
          setBrief(null);
          setBriefClosed(false);
          setSaving("idle");
        }
      } catch {
        /* storage parse error ignorado */
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  /* Persist on every change — solo v3 */
  useEffect(() => {
    try {
      const state: PersistedState = {
        messages: history.current,
        brief: Object.keys(draftRef.current).length ? draftRef.current : {},
        step: stepRef.current,
        intentionId: intentionIdRef.current,
        briefClosed,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full or unavailable — non-blocking */
    }
  }, [messages, brief, briefClosed, step, intentionId, chips]);

  const save = useCallback(
    async (data: BriefData) => {
      if (isSavingRef.current || briefClosed) return;
      isSavingRef.current = true;
      setSaving("saving");
      track("lead_submit_attempt");

      const payload = {
        nombre: data.nombre ?? "",
        email: data.email ?? "",
        empresa: data.empresa ?? "",
        whatsapp: data.whatsapp ?? "",
        pais: data.pais ?? "",
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

  const closeAfterPais = useCallback(
    (data: BriefData) => {
      draftRef.current = data;
      setBrief(data);
      setStep("closed");
      track("brief_complete", { projectType: data.projectType ?? "" });
      void save(data);
    },
    [save],
  );

  const speak = async (content: string) => {
    setTyping(true);
    await wait(typingDelayMs());
    setTyping(false);
    appendMessages({ role: "assistant", content });
  };

  const beginContact = async () => {
    setFaqChoice(null);
    setStep("nombre");
    await speak(CONTACT_PROMPTS.nombre);
  };

  const start = useCallback(async () => {
    if (isProcessingRef.current || history.current.length > 0) return;

    isProcessingRef.current = true;
    track("chat_open");
    draftRef.current = {};
    setIntention(null);
    faqStepIdRef.current = null;
    setStep("greet");
    await speak(GREET_MESSAGE);
    isProcessingRef.current = false;
  }, []);

  const selectChip = useCallback(async (label: string) => {
    if (isProcessingRef.current || briefClosed) return;

    const current = stepRef.current;
    if (current === "greet") {
      const intention = intentionFromPill(label);
      if (!intention) return;

      isProcessingRef.current = true;
      draftRef.current = {
        ...draftRef.current,
        projectType: intention.projectType,
      };
      setIntention(intention.id);
      appendMessages({ role: "user", content: label });
      setStep("consent");
      await speak(consentPrompt(intention.projectType));
      isProcessingRef.current = false;
      return;
    }

    if (current === "consent") {
      if (label !== "Sí" && label !== "No") return;
      const id = intentionIdRef.current;
      if (!id) return;

      isProcessingRef.current = true;
      appendMessages({ role: "user", content: label });

      if (label === "Sí") {
        const first = nextFaqStep(id, null);
        if (first) {
          faqStepIdRef.current = first.id;
          otrosPrefixRef.current = null;
          setStep("faq");
          setFaqChoice(faqChoiceOf(first));
          await speak(first.prompt);
        } else {
          faqStepIdRef.current = null;
          await beginContact();
        }
      } else {
        faqStepIdRef.current = null;
        setFaqChoice(null);
        setStep("idea");
        await speak(IDEA_PROMPT);
      }

      isProcessingRef.current = false;
    }
  }, [briefClosed]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isProcessingRef.current || briefClosed) return;

      const current = stepRef.current;
      if (
        current === "greet" ||
        current === "consent" ||
        current === "closed"
      ) {
        return;
      }

      isProcessingRef.current = true;
      appendMessages({ role: "user", content: trimmed });

      if (current === "faq") {
        const id = intentionIdRef.current;
        if (!id) {
          isProcessingRef.current = false;
          return;
        }

        const currentFaq =
          (faqStepIdRef.current
            ? faqStepById(id, faqStepIdRef.current)
            : null) ?? nextFaqStep(id, null);

        if (!currentFaq) {
          await beginContact();
          isProcessingRef.current = false;
          return;
        }

        let stored = trimmed;
        if (otrosPrefixRef.current !== null) {
          const prefix = otrosPrefixRef.current;
          otrosPrefixRef.current = null;
          stored = prefix ? `${prefix}; Otros: ${trimmed}` : trimmed;
        } else if (currentFaq.choice) {
          const { hasOtros, rest } = splitOtrosAnswer(trimmed);
          if (hasOtros) {
            otrosPrefixRef.current = rest;
            setFaqChoice(null);
            await speak(OTROS_FOLLOWUP);
            isProcessingRef.current = false;
            return;
          }
        }

        const nextDraft: BriefData = {
          ...draftRef.current,
          [currentFaq.mapsTo]: stored,
        };
        if (currentFaq.detailLabel) {
          nextDraft.detailLabel = currentFaq.detailLabel;
        }
        draftRef.current = nextDraft;

        const next = nextFaqStep(id, currentFaq.id);
        if (next) {
          faqStepIdRef.current = next.id;
          setFaqChoice(faqChoiceOf(next));
          await speak(next.prompt);
        } else {
          faqStepIdRef.current = null;
          setFaqChoice(null);
          await beginContact();
        }
        isProcessingRef.current = false;
        return;
      }

      if (current === "idea") {
        draftRef.current = { ...draftRef.current, idea: trimmed };
        await beginContact();
        isProcessingRef.current = false;
        return;
      }

      if (isContactStep(current)) {
        const validation = validateContactField(current, trimmed);
        if (!validation.ok) {
          await speak(validation.error);
          isProcessingRef.current = false;
          return;
        }

        const nextDraft: BriefData = {
          ...draftRef.current,
          [current]: trimmed,
        };
        draftRef.current = nextDraft;
        const next = nextContactAfter(current);
        if (next === "closed") {
          closeAfterPais(nextDraft);
        } else {
          setStep(next);
          await speak(CONTACT_PROMPTS[next]);
        }
      }

      isProcessingRef.current = false;
    },
    [briefClosed, closeAfterPais],
  );

  const reset = useCallback(() => {
    isProcessingRef.current = false;
    isSavingRef.current = false;
    history.current = [];
    draftRef.current = {};
    faqStepIdRef.current = null;
    otrosPrefixRef.current = null;
    setMessages([]);
    setBrief(null);
    setBriefClosed(false);
    setSaving("idle");
    setIntention(null);
    setStep("greet");
    setChips(null);
    setFaqChoice(null);
    setTyping(false);

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
    step,
    chips,
    faqChoice,
    intentionId,
    send,
    start,
    save,
    reset,
    selectChip,
  };
}
