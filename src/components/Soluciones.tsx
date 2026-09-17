import { openChatWidget } from "../lib/chat-events";
import { fintechServices, pymeServices } from "./soluciones-data";
import type { Service } from "./soluciones-data";

/**
 * Sección #servicios: dos bloques apilados con grilla compacta de cards
 * parejas (los carriles implicaban una equivalencia falsa 12 vs 3).
 * Copy y datos en ./soluciones-data.
 */

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

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <div
      className="reveal bg-white border border-slate-200 rounded-2xl p-6 h-full hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30 transition-all duration-300 cursor-pointer"
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
      <h4 className="font-semibold mt-4">{service.title}</h4>
      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
        {service.desc}
      </p>
    </div>
  );
}

export default function Soluciones() {
  return (
    <section id="servicios" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="reveal text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Sistemas de Gestión a Medida: ERP, CRM y POS
        </h2>
        <p
          className="reveal text-slate-500 text-lg max-w-2xl mb-14"
          style={{ transitionDelay: "0.1s" }}
        >
          Hacemos desarrollo de software a medida en dos líneas de trabajo:
          sistemas de gestión para negocios en crecimiento y soluciones fintech
          para operaciones complejas.
        </p>

        {/* Bloque 1: negocio */}
        <div>
          <div className="reveal flex items-baseline gap-3 mb-6">
            <h3 className="text-xl font-bold">Soluciones para tu negocio</h3>
            <span className="text-sm text-slate-400">
              {pymeServices.length} soluciones
            </span>
          </div>
          <p className="reveal text-sm text-slate-500 -mt-4 mb-6">
            Para comercios y PYMEs que necesitan orden y control.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pymeServices.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>
          <button
            onClick={openChatWidget}
            className="reveal inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-deep transition-colors mt-6 cursor-pointer"
          >
            Cuéntanos qué necesitas <Arrow />
          </button>
        </div>

        {/* Bloque 2: fintech */}
        <div className="mt-16">
          <div className="h-1 bg-gradient-to-r from-accent to-cyan rounded-full mb-6" />
          <div className="reveal flex items-baseline gap-3 mb-6">
            <h3 className="text-xl font-bold">Soluciones Fintech & Seguros</h3>
            <span className="text-sm text-slate-400">
              {fintechServices.length} soluciones
            </span>
          </div>
          <p className="reveal text-sm text-slate-500 -mt-4 mb-6">
            Para operaciones financieras que exigen precisión.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fintechServices.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>
          <p className="reveal text-xs text-slate-500 leading-relaxed mt-6 max-w-2xl">
            Construidos bajo contratos NDA para el sector financiero. Agenda una
            llamada y te mostramos cómo trabajamos.
          </p>
          <button
            onClick={openChatWidget}
            className="reveal inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-deep transition-colors mt-3 cursor-pointer"
          >
            Hablemos de tu proyecto <Arrow />
          </button>
        </div>
      </div>
    </section>
  );
}
