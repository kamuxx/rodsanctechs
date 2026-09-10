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
  SiMysql,
  SiMariadb,
  SiMongodb,
  SiDocker,
  SiGit,
  SiJenkins,
} from "react-icons/si";

/* SVGs inline para marcas sin entrada en react-icons/si */
function SqlServerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.998 0C7.163 0 3.01 2.346.817 6.07l1.61 1.18C4.18 4.038 7.88 2.13 11.998 2.13c2.954 0 5.66 1.01 7.79 2.7l1.39-1.54C18.88 1.29 15.57 0 11.998 0zM12 4.46c-3.31 0-6.3 1.37-8.45 3.56l1.61 1.18C7.02 7.58 9.38 6.59 12 6.59s4.98.99 6.84 2.61l1.61-1.18C18.3 5.83 15.31 4.46 12 4.46zM12 8.91c-2.21 0-4.21.91-5.65 2.37l1.61 1.18c1.04-1.01 2.47-1.63 4.04-1.63s3 .62 4.04 1.63l1.61-1.18C16.21 9.82 14.21 8.91 12 8.91zM12 13.36c-1.1 0-2.1.45-2.82 1.18l2.82 3.45 2.82-3.45c-.72-.73-1.72-1.18-2.82-1.18z" />
    </svg>
  );
}

function OracleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.004 0C6.842 0 2.66 2.878.816 7.17l.006.005C1.69 9.18 3.25 10.8 5.25 11.7c.57.26 1.18.43 1.81.52a5.4 5.4 0 01-.18-1.4c0-3 2.43-5.43 5.43-5.43 1.28 0 2.46.45 3.4 1.2a5.5 5.5 0 012.62-1.55C16.72 2.5 14.5 0 12.004 0zm0 3.6c1.1 0 2.1.45 2.83 1.18a5.4 5.4 0 012.57 3.73c1.6.42 2.97 1.3 3.96 2.5A12.05 12.05 0 0012 1.2c-1.14 0-2.23.18-3.25.5A5.45 5.45 0 0112.004 3.6zM7.08 13.22c-2.42.68-4.2 2.88-4.2 5.5a6.3 6.3 0 003.8 5.78c1.5.68 3.2 1.08 5 1.08 3.17 0 6-1.57 7.72-3.97a7.3 7.3 0 01-4.5 1.57c-4.04 0-7.32-3.28-7.32-7.32 0-.87.15-1.7.42-2.48v-.16zm1.82 9.06a4.5 4.5 0 005.1.68 4.5 4.5 0 002.6-4.07c0-.96-.24-1.86-.67-2.66a8.2 8.2 0 014.02 3.17c-1.83 2.46-4.67 4.06-7.84 4.06a10 10 0 01-3.21-.53v-.65z" />
    </svg>
  );
}

const tech: { name: string; Icon: IconType | (({ className }: { className?: string }) => React.JSX.Element); color: string }[] = [
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
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "MariaDB", Icon: SiMariadb, color: "#003545" },
  { name: "SQL Server", Icon: SqlServerIcon, color: "#CC2927" },
  { name: "Oracle", Icon: OracleIcon, color: "#F80000" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "Jenkins", Icon: SiJenkins, color: "#D33833" },
];

const groups: { label: string; names: string[] }[] = [
  {
    label: "Backend",
    names: ["PHP", "Laravel", "Go", "Python", "Node.js"],
  },
  {
    label: "Frontend",
    names: ["JavaScript", "TypeScript", "React", "Angular"],
  },
  {
    label: "Datos",
    names: ["PostgreSQL", "MySQL", "MariaDB", "SQL Server", "Oracle", "MongoDB"],
  },
  {
    label: "Infraestructura",
    names: ["Docker", "Git", "Jenkins"],
  },
];

function groupTech(names: string[]) {
  return tech.filter((t) => names.includes(t.name));
}

export default function Tecnologias() {
  return (
    <section id="tecnologias" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="reveal text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Tecnologías que Usamos en Nuestro Desarrollo
        </h2>
        <p className="reveal text-slate-500 text-lg max-w-2xl mb-14" style={{ transitionDelay: "0.1s" }}>
          Elegimos herramientas probadas y mantenibles para que tu sistema de gestión
          sea sólido hoy y evolucione mañana.
        </p>
        <div className="grid sm:grid-cols-2 gap-8">
          {groups.map((g, gi) => (
            <div key={g.label} className="reveal" style={{ transitionDelay: `${gi * 0.05}s` }}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">
                {g.label}
              </h3>
              <div className="flex flex-wrap gap-3">
                {groupTech(g.names).map(({ name, Icon, color }) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700"
                  >
                    <Icon className="w-5 h-5" style={{ color }} aria-hidden="true" />
                    {name}
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
