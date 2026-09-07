const perks = [
  { text: "Frontend + Backend + DevOps" },
  { text: "Integración con equipos existentes" },
  { text: "Por hora, por sprint o por proyecto" },
];

const backendPerks = [
  { text: "APIs REST/GraphQL de alta concurrencia" },
  { text: "Microservicios y arquitectura de datos" },
  { text: "Optimización y auditoría de performance" },
];

function Check() {
  return (
    <svg className="w-4 h-4 text-accent-light mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function Empresas() {
  return (
    <section id="empresas" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="reveal text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Disponibles para Empresas
        </h2>
        <p className="reveal text-slate-500 text-lg max-w-2xl mb-14" style={{ transitionDelay: "0.1s" }}>
          ¿Tu empresa necesita refuerzo técnico? Trabajamos como contractors o
          freelancers integrándonos directamente en tu equipo de desarrollo.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="reveal card-accent bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30 transition-all" style={{ transitionDelay: "0.05s" }}>
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-accent-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
                <path d="M7 8l3 3-3 3M13 14h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Fullstack Developer</h3>
            <p className="text-sm text-slate-500 mb-5 leading-relaxed">
              Nos integramos en tu equipo para desarrollar features completas: API,
              base de datos, UI y deploy. Comunicación directa, entregas
              incrementales y código de producción.
            </p>
            <ul className="space-y-2 mb-6">
              {perks.map((p) => (
                <li key={p.text} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check /> {p.text}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {["React/Angular", "Node.js/Go", "PostgreSQL"].map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-accent/15 text-slate-600">{t}</span>
              ))}
            </div>
          </div>

          <div className="reveal card-accent bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30 transition-all" style={{ transitionDelay: "0.1s" }}>
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-accent-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="8" rx="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" />
                <circle cx="6" cy="6" r="1" fill="currentColor" />
                <circle cx="6" cy="18" r="1" fill="currentColor" />
                <path d="M10 6h4M10 18h8" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Backend Developer</h3>
            <p className="text-sm text-slate-500 mb-5 leading-relaxed">
              APIs robustas, microservicios escalables, migración de bases de datos,
              optimización de consultas y arquitectura de sistemas distribuidos.
            </p>
            <ul className="space-y-2 mb-6">
              {backendPerks.map((p) => (
                <li key={p.text} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check /> {p.text}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {["Go/Laravel", "Docker", "Redis"].map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-accent/15 text-slate-600">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
