import { useEffect, useState } from "react";
import { openChatWidget } from "../lib/chat-events";

const links = [
  { href: "#servicios", label: "Soluciones" },
  { href: "#casos", label: "Demos" },
  { href: "#empresas", label: "Empresas" },
  { href: "#equipo", label: "Equipo" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-slate-200"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" aria-label="Inicio" className="flex items-center gap-3">
          <svg
            className="w-9 h-9"
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M20 4l14 8v16l-14 8-14-8V12l14-8z" className="text-accent" strokeLinejoin="round" />
            <path d="M14 22v-4l6-2 6 2v4l-6 2-6-2z" className="text-cyan" strokeLinejoin="round" />
          </svg>
          <span className="text-lg font-bold tracking-tight">
            <span className="text-slate-800">Rod</span>
            <span className="text-accent-light">Sanc</span>
            <span className="text-cyan">Techs</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          onClick={openChatWidget}
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-accent shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          Cuéntanos tu proyecto
        </button>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 w-10 h-10"
          aria-expanded={open}
          aria-controls="mobileMenu"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block h-0.5 w-full bg-slate-800 transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-full bg-slate-800 transition-all ${open ? "-rotate-45 -translate-y-0" : ""}`} />
        </button>
      </div>

      {open && (
        <div id="mobileMenu" className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl">
          <nav className="flex flex-col px-6 py-4 gap-1" aria-label="Móvil">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-slate-600 hover:text-slate-900 transition-colors border-b border-slate-100 last:border-0"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
