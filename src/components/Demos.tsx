import { openChatWidget } from "../lib/chat-events";

export default function Demos() {
  return (
    <section id="demos" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="reveal text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Demos en vivo
        </h2>
        <p className="reveal text-slate-500 text-lg max-w-2xl mb-14" style={{ transitionDelay: "0.1s" }}>
          Prueba cómo se siente un sistema real antes de hablar con nosotros.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={openChatWidget}
            className="reveal group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30 transition-all text-left cursor-pointer"
            style={{ transitionDelay: "0.05s" }}
          >
            <div className="aspect-video bg-slate-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-slate-300 group-hover:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2" />
                <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold mb-1">Gestión de Pastelería</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Pedidos, recetas, insumos y entregas. Próximamente — pide acceso
                anticipado.
              </p>
            </div>
          </button>
          <button
            onClick={openChatWidget}
            className="reveal group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30 transition-all text-left cursor-pointer"
            style={{ transitionDelay: "0.1s" }}
          >
            <div className="aspect-video bg-slate-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-slate-300 group-hover:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold mb-1">Panel de Préstamos</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Carteras y amortización para el sector financiero. Bajo NDA —
                solicita una demo privada.
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
