const links = [
  { href: "#servicios", label: "Soluciones" },
  { href: "#casos", label: "Demos", hidden: true },
  { href: "#empresas", label: "Empresas" },
  { href: "#equipo", label: "Equipo" },
  { href: "#contacto", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <nav className="flex flex-wrap gap-6 text-sm text-slate-500" aria-label="Pie">
          {links.filter((l) => !l.hidden).map((l) => (
            <a key={l.href} href={l.href} className="hover:text-slate-900 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="text-right">
          <p className="text-xs text-slate-500">
            &copy; 2026 RodSancTechs. Desarrollo de software a medida.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Software a medida para empresas en Venezuela.
          </p>
        </div>
      </div>
    </footer>
  );
}
