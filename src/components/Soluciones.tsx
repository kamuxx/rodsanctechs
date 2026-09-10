import { openChatWidget } from "../lib/chat-events";

function Arrow({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

const pymeServices = [
  {
    title: "Landing informativa",
    desc: "Una página clara para presentar la oferta y convertir visitas en contacto.",
    icon: <path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" />,
  },
  {
    title: "Sitio corporativo",
    desc: "Varias páginas para contar la empresa, servicios, equipo y contacto.",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </>
    ),
  },
  {
    title: "Blog",
    desc: "Publicar artículos, noticias o contenidos para atraer y educar.",
    icon: (
      <>
        <path d="M4 4h16v16H4z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
  },
  {
    title: "ERP a medida",
    desc: "Inventario, ventas, compras y reportes en un solo sistema que crece contigo.",
    icon: <path d="M12 20V10M18 20V4M6 20v-4" />,
  },
  {
    title: "Punto de venta (POS)",
    desc: "Facturación rápida, inventario sincronizado y control de caja sin procesos manuales.",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </>
    ),
  },
  {
    title: "Carritos de compra",
    desc: "Tienda online con pagos, pedidos y stock conectados en tiempo real.",
    icon: (
      <>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </>
    ),
  },
  {
    title: "Gestión para pastelerías y tiendas",
    desc: "Pedidos, recetas, insumos y entregas en una sola operación.",
    icon: (
      <>
        <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z" />
      </>
    ),
  },
];

const fintechServices = [
  {
    title: "Sistemas de préstamos",
    desc: "Carteras, amortización, intereses y estados de cuenta automatizados.",
    icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />,
  },
  {
    title: "Plataformas de inversión",
    desc: "Portafolios, rendimientos y reportes para inversores y administradores.",
    icon: (
      <>
        <path d="M23 4v6h-6M1 20v-6h6" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </>
    ),
  },
  {
    title: "Sistemas para seguros",
    desc: "Pólizas, siniestros, renovaciones y comisiones en un flujo auditable.",
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
];

export default function Soluciones() {
  return (
    <section id="servicios" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="reveal text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Sistemas de Gestión a Medida: ERP, CRM y POS
        </h2>
        <p className="reveal text-slate-500 text-lg max-w-2xl mb-14" style={{ transitionDelay: "0.1s" }}>
          Hacemos desarrollo de software a medida en dos líneas de trabajo: sistemas de gestión
          para negocios en crecimiento y soluciones fintech para operaciones complejas.
        </p>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Carril 1: PYME */}
          <div className="reveal" style={{ transitionDelay: "0.05s" }}>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-200 bg-slate-50">
                <h3 className="text-xl font-bold">Sistemas para tu negocio</h3>
                <p className="text-sm text-slate-500 mt-1">Para comercios y PYMEs que necesitan orden y control.</p>
              </div>
              <div className="divide-y divide-slate-100">
                {pymeServices.map((s) => (
                  <div key={s.title} className="px-8 py-5 flex gap-4 items-start">
                    <svg className="w-6 h-6 text-accent mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {s.icon}
                    </svg>
                    <div>
                      <h4 className="font-semibold">{s.title}</h4>
                      <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-8 py-5 bg-slate-50">
                <button onClick={openChatWidget} className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-deep transition-colors cursor-pointer">
                  Cuéntanos qué necesitas <Arrow />
                </button>
              </div>
            </div>
          </div>

          {/* Carril 2: Fintech */}
          <div className="reveal" style={{ transitionDelay: "0.1s" }}>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-accent to-cyan" />
              <div className="px-8 py-6 border-b border-slate-200 bg-slate-50">
                <h3 className="text-xl font-bold">Soluciones Fintech & Seguros</h3>
                <p className="text-sm text-slate-500 mt-1">Para operaciones financieras que exigen precisión.</p>
              </div>
              <div className="divide-y divide-slate-100">
                {fintechServices.map((s) => (
                  <div key={s.title} className="px-8 py-5 flex gap-4 items-start">
                    <svg className="w-6 h-6 text-accent mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {s.icon}
                    </svg>
                    <div>
                      <h4 className="font-semibold">{s.title}</h4>
                      <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-8 py-5 bg-slate-50">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Construidos bajo contratos NDA para el sector financiero. Agenda
                  una llamada y te mostramos cómo trabajamos.
                </p>
                <button onClick={openChatWidget} className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-deep transition-colors mt-3 cursor-pointer">
                  Hablemos de tu proyecto <Arrow />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
