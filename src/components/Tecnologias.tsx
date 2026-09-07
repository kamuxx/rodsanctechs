import type { IconType } from "react-icons";
import {
  SiPhp,
  SiLaravel,
  SiGo,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiAngular,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
  SiGit,
} from "react-icons/si";

const tech: { name: string; Icon: IconType; color: string }[] = [
  { name: "PHP", Icon: SiPhp, color: "#777BB4" },
  { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
  { name: "Go", Icon: SiGo, color: "#00ADD8" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Angular", Icon: SiAngular, color: "#DD0031" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
];

export default function Tecnologias() {
  return (
    <section id="tecnologias" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="reveal text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Nuestro stack
        </h2>
        <p className="reveal text-slate-500 text-lg max-w-2xl mb-14" style={{ transitionDelay: "0.1s" }}>
          Las herramientas que usamos para construir sistemas robustos y mantenibles.
        </p>
        <div className="reveal flex flex-wrap gap-3" style={{ transitionDelay: "0.15s" }}>
          {tech.map(({ name, Icon, color }) => (
            <span
              key={name}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:border-accent/40 hover:shadow-sm transition-all cursor-default"
            >
              <Icon className="w-5 h-5" style={{ color }} aria-hidden="true" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
