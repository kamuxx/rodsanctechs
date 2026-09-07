import { useState } from "react";
import { saveLead } from "../lib/saveLead";
import { track } from "../lib/analytics";

type FormState = "idle" | "sending" | "sent" | "error";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [state, setState] = useState<FormState>("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !contacto.trim()) return;
    setState("sending");
    track("contact_form_attempt");
    try {
      await saveLead({
        nombre: nombre.trim(),
        whatsapp: contacto.trim(),
        mensaje: mensaje.trim(),
        fuente: "formulario-contacto",
      });
      setState("sent");
      track("contact_form_ok");
    } catch (err) {
      console.error("Lead save error:", err);
      setState("error");
      track("contact_form_fail");
    }
  };

  return (
    <section id="contacto" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Copy + canales directos */}
          <div>
            <h2 className="reveal text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Hablemos de tu proyecto
            </h2>
            <p className="reveal text-slate-500 text-lg mb-8" style={{ transitionDelay: "0.1s" }}>
              Cuéntanos qué necesitas y te respondemos con una propuesta clara en
              menos de 24 h. Sin compromiso.
            </p>
            <div className="reveal flex flex-col gap-4 text-sm text-slate-600" style={{ transitionDelay: "0.15s" }}>
              <a
                href="https://wa.me/584165359897"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-slate-900 transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-success" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
                +58 416 535 9897
              </a>
              <a
                href="mailto:lesterrodriguez3101@gmail.com"
                className="flex items-center gap-3 hover:text-slate-900 transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </span>
                lesterrodriguez3101@gmail.com
              </a>
            </div>
          </div>

          {/* Formulario corto de respaldo */}
          <div className="reveal bg-white border border-slate-200 rounded-2xl p-8" style={{ transitionDelay: "0.1s" }}>
            <h3 className="text-lg font-bold mb-1">Prefieres escribir? Déjanos tus datos</h3>
            <p className="text-sm text-slate-500 mb-6">
              Un humano te responde — normalmente en menos de 2 horas hábiles.
            </p>
            {state === "sent" ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <p className="font-semibold">¡Recibido!</p>
                <p className="text-sm text-slate-500 mt-1">
                  Te contactamos en menos de 24 h. Si es urgente, escríbenos por
                  WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label htmlFor="lead-nombre" className="block text-sm font-medium mb-1.5">
                    Nombre
                  </label>
                  <input
                    id="lead-nombre"
                    type="text"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="lead-contacto" className="block text-sm font-medium mb-1.5">
                    WhatsApp o email
                  </label>
                  <input
                    id="lead-contacto"
                    type="text"
                    required
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                    placeholder="+58 ... o email@empresa.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="lead-mensaje" className="block text-sm font-medium mb-1.5">
                    ¿Qué necesitas?
                  </label>
                  <textarea
                    id="lead-mensaje"
                    rows={3}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Ej: sistema de inventario para mi tienda, ERP, carrito de compra…"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                  />
                </div>
                {state === "error" && (
                  <p className="text-sm text-red-600">
                    No pudimos enviar. Intenta de nuevo o usa WhatsApp directo:
                    +58 416 535 9897.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="w-full py-3 rounded-full font-semibold text-white bg-accent hover:opacity-95 transition-opacity disabled:opacity-60"
                >
                  {state === "sending" ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
