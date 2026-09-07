import { openChatWidget } from "../lib/chat-events";

function TrustItem({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      {children}
    </span>
  );
}

function HeroSvg() {
  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-[420px] h-auto" fill="none" aria-hidden="true">
      <defs>
        <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {[
        { cx: 50, cy: 50, r: 1.5, c: "#7C3AED", d: "0s" },
        { cx: 350, cy: 45, r: 1, c: "#06B6D4", d: "1.2s" },
        { cx: 30, cy: 200, r: 1.2, c: "#7C3AED", d: "0.6s" },
        { cx: 370, cy: 180, r: 1, c: "#6D28D9", d: "2s" },
        { cx: 60, cy: 350, r: 1.5, c: "#06B6D4", d: "1.8s" },
        { cx: 340, cy: 360, r: 1.2, c: "#7C3AED", d: "0.3s" },
        { cx: 100, cy: 30, r: 1, c: "#6D28D9", d: "2.5s" },
        { cx: 300, cy: 380, r: 1, c: "#06B6D4", d: "1.5s" },
      ].map((d, i) => (
        <circle key={`dot-${i}`} cx={d.cx} cy={d.cy} r={d.r} fill={d.c} opacity="0.08">
          <animate attributeName="opacity" values="0.08;0.3;0.08" dur="4s" begin={d.d} repeatCount="indefinite" />
        </circle>
      ))}

      {[
        { r: 28, sw: 1, d: "0s" },
        { r: 42, sw: 0.7, d: "1s" },
        { r: 56, sw: 0.5, d: "2s" },
      ].map((p, i) => (
        <circle key={`ring-${i}`} cx="200" cy="200" r={p.r} stroke="#7C3AED" strokeWidth={p.sw} fill="none" opacity="0.15">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="3s" begin={p.d} repeatCount="indefinite" />
          <animate attributeName="r" values={`${p.r};${p.r + 8};${p.r}`} dur="3s" begin={p.d} repeatCount="indefinite" />
        </circle>
      ))}

      {[
        { x2: 200, y2: 70, len: 130, d: "0.5s" },
        { x2: 312, y2: 135, len: 140, d: "0.7s" },
        { x2: 312, y2: 265, len: 140, d: "0.9s" },
        { x2: 200, y2: 330, len: 130, d: "1.1s" },
        { x2: 88, y2: 265, len: 140, d: "1.3s" },
        { x2: 88, y2: 135, len: 140, d: "1.5s" },
      ].map((l, i) => (
        <line key={`line-${i}`} x1="200" y1="200" x2={l.x2} y2={l.y2} stroke="url(#connGrad)" strokeWidth="1.2" strokeDasharray={l.len} strokeDashoffset={l.len} opacity="0">
          <animate attributeName="stroke-dashoffset" from={l.len} to="0" dur="1.5s" begin={l.d} fill="freeze" />
          <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin={l.d} fill="freeze" />
        </line>
      ))}

      {[
        { cx: 200, cy: 70, label: "API", d: "1.2s" },
        { cx: 312, cy: 135, label: "DB", d: "1.4s" },
        { cx: 312, cy: 265, label: "UI", d: "1.6s" },
        { cx: 200, cy: 330, label: "CI", d: "1.8s" },
        { cx: 88, cy: 265, label: "Go", d: "2s" },
        { cx: 88, cy: 135, label: "UX", d: "2.2s" },
      ].map((n, i) => (
        <g key={`node-${i}`} opacity="0" filter="url(#heroGlow)">
          <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin={n.d} fill="freeze" />
          <animateTransform attributeName="transform" type="scale" from="0" to="1" dur="0.4s" begin={n.d} fill="freeze" additive="sum" />
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-5; 0,0" dur="4s" begin="2.5s" repeatCount="indefinite" additive="sum" />
          <circle cx={n.cx} cy={n.cy} r="18" fill="#ffffff" stroke="#7C3AED" strokeWidth="1.5" />
          <text x={n.cx} y={n.cy + 4} textAnchor="middle" fill="#6D28D9" fontSize="11" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">
            {n.label}
          </text>
        </g>
      ))}

      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="20s" repeatCount="indefinite" />
        <polygon points="200,172 224,186 224,214 200,228 176,214 176,186" stroke="#A78BFA" strokeWidth="2" strokeLinejoin="round" fill="none" filter="url(#heroGlow)" strokeDasharray="200" strokeDashoffset="200">
          <animate attributeName="stroke-dashoffset" from="200" to="0" dur="2s" fill="freeze" />
        </polygon>
      </g>
      <text x="200" y="204" textAnchor="middle" fill="#7C3AED" fontSize="16" fontWeight="700" fontFamily="Inter,system-ui,sans-serif" opacity="0">
        LR
        <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.5s" fill="freeze" />
      </text>

      {[
        { cx: 160, cy: 150, r: 1.5, c: "#6D28D9", dx: -20, dy: -30, d: "3s" },
        { cx: 240, cy: 160, r: 1, c: "#7C3AED", dx: 25, dy: -25, d: "4s" },
        { cx: 250, cy: 250, r: 1.2, c: "#06B6D4", dx: 20, dy: 20, d: "3.5s" },
        { cx: 150, cy: 260, r: 1, c: "#6D28D9", dx: -15, dy: 25, d: "4.5s" },
        { cx: 200, cy: 130, r: 1.5, c: "#7C3AED", dx: 10, dy: -35, d: "5s" },
        { cx: 180, cy: 280, r: 1, c: "#06B6D4", dx: -10, dy: 30, d: "3.8s" },
      ].map((p, i) => (
        <circle key={`particle-${i}`} cx={p.cx} cy={p.cy} r={p.r} fill={p.c} opacity="0">
          <animate attributeName="opacity" values="0;0.6;0.6;0" dur="6s" begin={p.d} repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" values={`0,0; ${p.dx},${p.dy}; ${p.dx},${p.dy}`} dur="6s" begin={p.d} repeatCount="indefinite" />
        </circle>
      ))}

      {[
        { path: "M200,200 L200,70", c: "#6D28D9", dur: "1.5s", d: "2.5s", r: 3 },
        { path: "M200,200 L312,135", c: "#7C3AED", dur: "1.4s", d: "3s", r: 2.5 },
        { path: "M200,200 L312,265", c: "#06B6D4", dur: "1.6s", d: "3.5s", r: 3 },
        { path: "M200,200 L200,330", c: "#6D28D9", dur: "1.3s", d: "4s", r: 2.5 },
        { path: "M200,200 L88,265", c: "#7C3AED", dur: "1.5s", d: "4.5s", r: 3 },
        { path: "M200,200 L88,135", c: "#06B6D4", dur: "1.4s", d: "5s", r: 2.5 },
      ].map((m, i) => (
        <circle key={`motion-${i}`} r={m.r} fill={m.c} opacity="0">
          <animate attributeName="opacity" values="0;0.8;0.8;0" dur={m.dur} begin={m.d} repeatCount="indefinite" />
          <animateMotion dur={m.dur} begin={m.d} repeatCount="indefinite" path={m.path} />
        </circle>
      ))}
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/[0.06] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div>
            <h1 className="reveal text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight max-w-4xl mb-6">
              Sistemas que hacen <span className="text-accent">funcionar</span> tu negocio
            </h1>

            <p className="reveal text-lg md:text-xl text-slate-500 max-w-2xl mb-10" style={{ transitionDelay: "0.1s" }}>
              ERP, CRM, POS, e-commerce y soluciones fintech a medida. Diseñamos,
              construimos y llevamos tu sistema a producción — desde una
              pastelería hasta una operación financiera.
            </p>

            <div className="reveal flex flex-wrap gap-4" style={{ transitionDelay: "0.2s" }}>
              <button
                onClick={openChatWidget}
                className="inline-flex items-center px-7 py-3.5 rounded-full text-base font-semibold text-white bg-accent shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Cuéntanos qué necesitas construir
              </button>
              <a href="#servicios" className="inline-flex items-center px-7 py-3.5 rounded-full text-base font-semibold text-slate-700 border border-slate-300 hover:border-accent/50 hover:bg-accent/5 transition-all">
                Ver soluciones
              </a>
            </div>

            <div className="reveal flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 text-sm text-slate-500" style={{ transitionDelay: "0.3s" }}>
              <TrustItem>9+ años de experiencia por fundador</TrustItem>
              <TrustItem>Sistemas enterprise bajo NDA</TrustItem>
              <TrustItem>Retail · Alimentos · Finanzas · Seguros</TrustItem>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <HeroSvg />
          </div>
        </div>
      </div>
    </section>
  );
}
