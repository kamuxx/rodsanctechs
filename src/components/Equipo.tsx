const founders = [
  {
    initials: "LR",
    name: "Lester Rodriguez",
    role: "Co-Founder · ERP, CRM & POS",
    roleClass: "text-accent",
    avatarClass: "from-accent to-accent-deep",
    desc: "Ingeniero de Sistemas con 9+ años construyendo sistemas de gestión: ERPs, CRMs y puntos de venta para comercios y empresas. Arquitectura, bases de datos, APIs y despliegue.",
    tags: ["PHP", "Python", "Go", "Express.js", "React", "Angular", "PostgreSQL", "MySQL", "Git"],
    tagClass: "border-accent/15",
  },
  {
    initials: "YS",
    name: "Yuleisi Sanchez",
    role: "Co-Founder · Fintech, Seguros & E-commerce",
    roleClass: "text-cyan",
    avatarClass: "from-cyan to-accent",
    desc: "Ingeniera de Sistemas con 9+ años en el sector financiero: sistemas de seguros, plataformas de inversión y préstamos, gestión para pastelerías y carritos de compra.",
    tags: ["PHP", "Laravel", "WordPress", "React", "MySQL", "Express.js", "Git"],
    tagClass: "border-cyan/15",
  },
];

export default function Equipo() {
  return (
    <section id="equipo" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="reveal text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">
          Equipo de Desarrollo de Software
        </h2>
        <p className="reveal text-slate-500 text-lg max-w-2xl mb-14 text-center mx-auto">
          Dos fundadores con más de 9 años de experiencia cada uno, especializados
          en sistemas de gestión y soluciones fintech. Esa experiencia se construyó
          dentro de empresas, como parte de sus equipos, bajo acuerdos de
          confidencialidad (NDA): por eso aquí no verás logos de clientes ni datos
          privados — verás cómo trabajamos y qué sabemos construir.
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((f) => (
            <div
              key={f.name}
              className="reveal bg-white border border-slate-200 rounded-2xl p-8 text-center hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30 transition-all"
            >
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${f.avatarClass} flex items-center justify-center mx-auto mb-5`}>
                <span className="text-2xl font-bold text-white">{f.initials}</span>
              </div>
              <h3 className="text-xl font-bold mb-1">{f.name}</h3>
              <p className={`${f.roleClass} font-semibold text-sm mb-4`}>{f.role}</p>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{f.desc}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {f.tags.map((t) => (
                  <span key={t} className={`text-xs px-2.5 py-1 rounded-full border ${f.tagClass} text-slate-600`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
