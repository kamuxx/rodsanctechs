import { useEffect, useRef } from "react";
import { track } from "../lib/analytics";
import { openChatWidget } from "../lib/chat-events";

export default function Demos() {
  const sectionRef = useRef<HTMLElement>(null);

  // Baseline de conversión #casos: vista de sección (una sola vez).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          track("casos_view");
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="casos" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="reveal text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Lo que estamos construyendo
        </h2>
        <p className="reveal text-slate-500 text-lg max-w-2xl mb-14" style={{ transitionDelay: "0.1s" }}>
          Demos operables en construcción: un sistema real que podrás probar con
          un clic. Mientras tanto, cuéntanos qué necesitas y te avisamos cuando
          tu demo esté lista.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <article className="reveal bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all">
            <div className="aspect-video bg-slate-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2" />
                <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold mb-1">Gestión de Pastelería</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-1">
                Pedidos, recetas, insumos y entregas.
              </p>
              <p className="text-xs font-medium text-amber-600 mb-4">
                En construcción — demo operable en camino.
              </p>
              <button
                onClick={() => {
                  track("casos_click", { demo: "pasteleria" });
                  openChatWidget();
                }}
                className="text-sm font-semibold text-accent hover:text-accent-light transition-colors cursor-pointer"
              >
                Avísame cuando esté →
              </button>
            </div>
          </article>
          <article className="reveal bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all">
            <div className="aspect-video bg-slate-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold mb-1">Panel de Préstamos</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-1">
                Carteras y amortización para el sector financiero.
              </p>
              <p className="text-xs font-medium text-slate-500 mb-4">
                Solo en llamada privada bajo NDA.
              </p>
              <button
                onClick={() => {
                  track("casos_click", { demo: "prestamos-nda" });
                  openChatWidget();
                }}
                className="text-sm font-semibold text-accent hover:text-accent-light transition-colors cursor-pointer"
              >
                Agendar llamada →
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
