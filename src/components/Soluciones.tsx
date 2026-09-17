import { useState } from "react";
import { track } from "../lib/analytics";
import { openChatWidget, openChatWithIntention } from "../lib/chat-events";
import { getIntention } from "../lib/faq_brief_questions";
import { fintechServices, pymeServices } from "./soluciones-data";
import type { Service, ServiceGroup } from "./soluciones-data";

/**
 * Sección #servicios: dos bloques apilados con grilla compacta de cards
 * clicables (cada card abre el chat con su intención preseleccionada).
 * Filtro anti-parálisis: Todos / Web y móvil / Operación / Fintech.
 * Copy y datos en ./soluciones-data (títulos exactos del guard).
 */

type Filter = "all" | ServiceGroup;

const FILTERS: readonly { id: Filter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "web", label: "Web y móvil" },
  { id: "operacion", label: "Operación" },
  { id: "fintech", label: "Fintech" },
];

function Arrow({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function openServiceChat(service: Service) {
  track("servicios_card_click", { intent: service.intent });
  openChatWithIntention(getIntention(service.intent).pillLabel);
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <button
      type="button"
      onClick={() => openServiceChat(service)}
      aria-label={`${service.title}: cotizar por chat`}
      className="reveal bg-white border border-slate-200 rounded-2xl p-6 h-full text-left hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-all duration-300 cursor-pointer"
      style={{ transitionDelay: `${Math.min(index, 5) * 0.05}s` }}
    >
      <svg
        className="w-6 h-6 text-accent shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {service.icon}
      </svg>
      <span className="block font-semibold mt-4">{service.title}</span>
      <span className="block text-sm text-slate-500 mt-1 leading-relaxed">
        {service.desc}
      </span>
      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Cotizar <Arrow className="w-3.5 h-3.5" />
      </span>
    </button>
  );
}

export default function Soluciones() {
  const [filter, setFilter] = useState<Filter>("all");

  const matches = (service: Service) => filter === "all" || service.group === filter;
  const visiblePyme = pymeServices.filter(matches);
  const visibleFintech = fintechServices.filter(matches);
  const showPyme = visiblePyme.length > 0;
  const showFintech = visibleFintech.length > 0;

  const pick = (id: Filter) => {
    setFilter(id);
    track("servicios_filter", { group: id });
  };

  return (
    <section id="servicios" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="reveal text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Software a medida para operar tu negocio
        </h2>
        <p
          className="reveal text-slate-500 text-lg max-w-2xl mb-8"
          style={{ transitionDelay: "0.1s" }}
        >
          Desarrollo de software a medida en tres líneas: presencia web,
          operación del negocio y soluciones fintech. Elige la tuya y la
          cotizamos en menos de 24 h.
        </p>

        <div
          className="reveal flex flex-wrap gap-2 mb-10"
          role="group"
          aria-label="Filtrar soluciones"
          style={{ transitionDelay: "0.15s" }}
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => pick(f.id)}
              aria-pressed={filter === f.id}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                filter === f.id
                  ? "bg-accent text-white border-accent shadow-md shadow-accent/25"
                  : "bg-white text-slate-600 border-slate-300 hover:border-accent/50 hover:text-accent-deep"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Bloque 1: negocio */}
        {showPyme && (
          <div>
            <div className="reveal flex items-baseline gap-3 mb-6">
              <h3 className="text-xl font-bold">Soluciones para tu negocio</h3>
            </div>
            <p className="reveal text-sm text-slate-500 -mt-4 mb-6">
              Para comercios y PYMEs que necesitan orden y control. Toca una
              tarjeta y cotízala directo por chat.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visiblePyme.map((s, i) => (
                <ServiceCard key={s.title} service={s} index={i} />
              ))}
            </div>
            <button
              onClick={openChatWidget}
              className="reveal inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-deep transition-colors mt-6 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Cuéntanos qué necesitas <Arrow />
            </button>
            <p className="reveal text-xs text-slate-400 mt-2">
              Sin compromiso · Respuesta en menos de 24 h.
            </p>
          </div>
        )}

        {/* Bloque 2: fintech */}
        {showFintech && (
          <div className={showPyme ? "mt-16" : ""}>
            <div className="h-1 bg-gradient-to-r from-accent to-cyan rounded-full mb-6" />
            <div className="reveal flex items-baseline gap-3 mb-6">
              <h3 className="text-xl font-bold">Soluciones Fintech & Seguros</h3>
            </div>
            <p className="reveal text-sm text-slate-500 -mt-4 mb-6">
              Para operaciones financieras que exigen precisión.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleFintech.map((s, i) => (
                <ServiceCard key={s.title} service={s} index={i} />
              ))}
            </div>
            <p className="reveal text-xs text-slate-500 leading-relaxed mt-6 max-w-2xl">
              Construidos bajo contratos NDA para el sector financiero. Agenda una
              llamada y te mostramos cómo trabajamos.
            </p>
            <button
              onClick={openChatWidget}
              className="reveal inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-deep transition-colors mt-3 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Hablemos de tu proyecto <Arrow />
            </button>
            <p className="reveal text-xs text-slate-400 mt-2">
              Sin compromiso · Respuesta en menos de 24 h.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
