import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Check, GUARANTEES, ITEMS } from "./faq-data";

/**
 * COPIA de propuesta — remodel del #faq contra el scroll largo.
 * Mismo id, mismo texto y datos que Faq.tsx. La original queda intacta.
 * Para previsualizar, en App.tsx cambiar:
 *   import Faq from "./components/Faq";
 * por:
 *   import Faq from "./components/FaqRemodel";
 *
 * Tesis: 12 acordeones en una sola columna obligan a todo el scroll.
 * La copia usa header compacto + grilla de 2 columnas en desktop
 * (un solo abierto) + densidad compacta. El cierre de conversión
 * se conserva idéntico.
 */

export default function FaqRemodel() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) =>
    setOpenIndex((current) => (current === index ? null : index));

  return (
    <section id="faq" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decoración sutil de fondo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-24 w-96 h-96 bg-accent/[0.05] rounded-full blur-[110px]" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 bg-cyan/[0.06] rounded-full blur-[110px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header compacto */}
        <div className="max-w-3xl">
          <p
            className="reveal inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent mb-4"
            style={{ transitionDelay: "0.05s" }}
          >
            Preguntas frecuentes
          </p>
          <h2
            className="reveal text-3xl md:text-4xl font-bold tracking-tight mb-4"
            style={{ transitionDelay: "0.1s" }}
          >
            Preguntas frecuentes sobre{" "}
            <span className="text-accent-deep">
              desarrollo de software a medida
            </span>
          </h2>
          <p
            className="reveal text-slate-500 text-lg mb-6"
            style={{ transitionDelay: "0.15s" }}
          >
            Las dudas más comunes antes de contratar un desarrollo: costos, tiempos,
            soporte y propiedad del código. Respuestas directas, sin letra pequeña.
          </p>
          <ul className="reveal flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600" style={{ transitionDelay: "0.2s" }}>
            {GUARANTEES.map((g) => (
              <li key={g} className="flex items-start gap-2.5">
                <Check /> {g}
              </li>
            ))}
          </ul>
        </div>

        {/* Acordeón en 2 columnas */}
        <div className="mt-10 grid gap-4 lg:grid-cols-2 items-start">
          {ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isOpen = openIndex === index;
            const delay = `${Math.min(index * 0.03, 0.3)}s`;

            return (
              // El wrapper lleva .reveal y su className NUNCA cambia: useReveal añade .visible
              // de forma imperativa. Si .reveal viviera en la tarjeta (className dinámico),
              // React borraría .visible al re-renderizar por el click y la tarjeta desaparecería.
              <div key={item.q} className="reveal" style={{ transitionDelay: delay }}>
                <div
                  className={`card-accent group rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? "is-open border-accent/30 shadow-xl shadow-accent/10"
                      : "border-slate-200 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                  }`}
                >
                  <h3>
                    <button
                      id={`faq-button-${index}`}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      onClick={() => toggle(index)}
                      className="flex w-full items-center gap-3 px-5 py-4 text-left cursor-pointer"
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                          isOpen
                            ? "bg-gradient-to-br from-accent to-accent-deep text-white shadow-md shadow-accent/25 scale-105"
                            : "bg-accent/10 text-accent group-hover:bg-accent/15"
                        }`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span
                        className={`flex-1 text-[15px] font-semibold transition-colors duration-300 ${
                          isOpen ? "text-accent-deep" : "text-slate-800 group-hover:text-accent-deep"
                        }`}
                      >
                        {item.q}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen
                            ? "bg-accent/10 text-accent rotate-180"
                            : "text-slate-400 group-hover:bg-accent/5 group-hover:text-accent"
                        }`}
                      >
                        <FiChevronDown className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    className="grid will-change-[grid-template-rows] transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden min-h-0">
                      <div
                        className={`px-5 pb-4 pl-[4.5rem] text-sm text-slate-500 leading-relaxed transition-[opacity,transform] duration-300 ease-out ${
                          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                        }`}
                      >
                        {item.a}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cierre de conversión */}
        <div
          className="reveal relative mt-14 md:mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-accent-deep via-accent to-cyan px-6 py-10 md:px-12 md:py-12"
          style={{ transitionDelay: "0.15s" }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-16 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          </div>
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                ¿Quedó alguna duda? Hablemos.
              </h3>
              <p className="text-white/80 text-base md:text-lg">
                Un humano te responde con una propuesta clara en menos de 24 h. Sin
                compromiso.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/584122619542?text=Hola%2C%20tengo%20una%20consulta%20sobre%20un%20proyecto"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-accent-deep bg-white hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-xl transition-all"
              >
                <svg className="w-5 h-5 text-success" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Hablar por WhatsApp
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center px-7 py-3.5 rounded-full font-semibold text-white border border-white/40 hover:bg-white/10 hover:border-white/70 transition-all"
              >
                Usar el formulario
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
