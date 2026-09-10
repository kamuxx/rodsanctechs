const steps = [
  {
    n: "1",
    title: "Descubrimiento",
    desc: "Entendemos tu negocio antes de escribir una línea de código, para construir lo que resuelve tu operación — no lo que asumimos que necesitas.",
  },
  {
    n: "2",
    title: "Arquitectura",
    desc: "Diseñamos una base sólida: modelo de datos, integraciones y plan por sprints, para que el sistema crezca contigo sin reescribirse.",
  },
  {
    n: "3",
    title: "Desarrollo",
    desc: "Construimos con entregas incrementales y demos cada sprint, para que veas avance real y ajustes a tiempo, sin sorpresas al final.",
  },
  {
    n: "4",
    title: "Despliegue y soporte",
    desc: "Llevamos tu sistema a producción y te acompañamos con mantenimiento continuo, para que siga funcionando cuando tu negocio crece.",
  },
];

export default function Proceso() {
  return (
    <section id="proceso" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="reveal text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Proceso de Desarrollo de Software a Medida
        </h2>
        <p className="reveal text-slate-500 text-lg max-w-2xl mb-14" style={{ transitionDelay: "0.1s" }}>
          Un proceso de desarrollo de software claro y transparente, sin sorpresas.
          Sabrás en todo momento qué estamos construyendo.
        </p>
        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-slate-200" aria-hidden="true" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((s, i) => (
              <div key={s.n} className="reveal relative" style={{ transitionDelay: `${i * 0.05}s` }}>
                <div className="w-20 h-20 rounded-full border-2 border-accent/40 flex items-center justify-center text-2xl font-bold text-accent bg-white mb-5 mx-auto lg:mx-0 relative z-10">
                  {s.n}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center lg:text-left">{s.title}</h3>
                <p className="text-sm text-slate-500 text-center lg:text-left">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
