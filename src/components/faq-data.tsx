import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  FiDollarSign,
  FiClock,
  FiMessageCircle,
  FiCode,
  FiKey,
  FiRefreshCw,
  FiBriefcase,
  FiLifeBuoy,
  FiCreditCard,
  FiSend,
  FiUsers,
  FiGlobe,
} from "react-icons/fi";

/**
 * Datos compartidos de la sección #faq. Mismo texto en todas las variantes;
 * cada variante decide su topología.
 */

export type FaqItem = {
  icon: IconType;
  q: string;
  a: ReactNode;
};

export const ITEMS: FaqItem[] = [
  {
    icon: FiDollarSign,
    q: "¿Cuánto cuesta mi proyecto?",
    a: (
      <>
        Depende del tipo y del alcance: no es lo mismo una landing que un ERP o una
        plataforma fintech. Por eso no publicamos tarifas cerradas. Cuéntanos qué
        necesitas por el <strong className="font-semibold text-slate-700">chat guiado</strong> o el
        formulario y en <strong className="font-semibold text-slate-700">menos de 24 h</strong> recibes
        una propuesta clara, con alcance y precio cerrado. Sin compromiso. En el chat
        te preguntamos tu rango de presupuesto para orientar la propuesta a lo que buscas.
      </>
    ),
  },
  {
    icon: FiClock,
    q: "¿Cuánto tiempo tarda en estar listo?",
    a: (
      <>
        Depende de la complejidad. Una landing sencilla es el proyecto más rápido; un
        sistema operativo (punto de venta, e-commerce, gestión) se construye por
        etapas y arranca con una <strong className="font-semibold text-slate-700">primera versión usable
        de uno o dos módulos</strong>, no el sistema completo de golpe. En la propuesta
        recibes un cronograma con hitos concretos.
      </>
    ),
  },
  {
    icon: FiMessageCircle,
    q: "¿Cómo empiezo? ¿Qué pasa después de escribirles?",
    a: (
      <ol className="list-decimal pl-5 space-y-1.5">
        <li>
          Eliges tu tipo de proyecto en el <strong className="font-semibold text-slate-700">chat guiado</strong> o
          el formulario de contacto.
        </li>
        <li>Respondes unas preguntas breves: objetivo, plazo y presupuesto.</li>
        <li>
          En <strong className="font-semibold text-slate-700">menos de 24 h</strong> recibes una propuesta
          clara, sin compromiso.
        </li>
        <li>
          Si decides avanzar, acordamos alcance, cronograma y precio cerrado{" "}
          <strong className="font-semibold text-slate-700">antes de empezar</strong>. Sin sorpresas a
          mitad de camino.
        </li>
      </ol>
    ),
  },
  {
    icon: FiCode,
    q: "¿Trabajan con plantillas o todo es a medida?",
    a: (
      <>
        Tenemos <strong className="font-semibold text-slate-700">tres vías</strong>. Si ya tienes tu
        propia plantilla o diseño, partimos de eso y lo llevamos a producción. Si no,
        puedes elegir alguna de nuestras{" "}
        <strong className="font-semibold text-slate-700">plantillas profesionales</strong> del catálogo y
        adaptarla a tu marca. O bien construimos{" "}
        <strong className="font-semibold text-slate-700">todo a medida</strong> desde cero, según cómo
        opera tu negocio. En todos los casos, te acompañamos de punta a punta.
      </>
    ),
  },
  {
    icon: FiKey,
    q: "¿De quién es el código y la información al final?",
    a: (
      <>
        <strong className="font-semibold text-slate-700">Tuya.</strong> El desarrollo se hace a tu
        medida y recibes el código, los accesos y el control de tu proyecto. No quedas
        atrapado con nosotros: decides si continúas con soporte o caminas solo.
      </>
    ),
  },
  {
    icon: FiRefreshCw,
    q: "Ya tengo una web o un sistema. ¿Pueden rediseñarlo o migrarlo?",
    a: (
      <>
        Sí. Hacemos <strong className="font-semibold text-slate-700">rediseños, migraciones e
        integraciones</strong> con lo que ya usas: Excel, WhatsApp, otro sistema o pasarelas
        de pago. En el chat elige «Rediseño de uno actual» o «Integración con otros
        sistemas» y te orientamos, sin venderte un proyecto desde cero si no lo necesitas.
      </>
    ),
  },
  {
    icon: FiBriefcase,
    q: "¿Tienen experiencia en mi rubro?",
    a: (
      <>
        Trabajamos con <strong className="font-semibold text-slate-700">sistemas enterprise bajo NDA</strong>{" "}
        en Retail, Alimentos, Finanzas y Seguros, además de pymes, clínicas y
        comercios.
      </>
    ),
  },
  {
    icon: FiLifeBuoy,
    q: "¿Dan soporte después de la entrega?",
    a: (
      <>
        Sí. Cada entrega incluye un <strong className="font-semibold text-slate-700">período de soporte
        post-lanzamiento</strong> acordado y ofrecemos mantenimiento evolutivo para seguir
        mejorando el sistema con el tiempo.
      </>
    ),
  },
  {
    icon: FiUsers,
    q: "¿Acompañan a nuestro equipo cuando empecemos a usar el producto?",
    a: (
      <>
        Sí. No entregamos y desaparecemos: cada entrega incluye un{" "}
        <strong className="font-semibold text-slate-700">acompañamiento inicial en el uso</strong> de
        la solución. Guiamos a tu equipo y a tus{" "}
        <strong className="font-semibold text-slate-700">usuarios finales</strong> durante la puesta
        en marcha y resolvemos dudas reales de la operación, para que el producto se adopte
        con confianza desde el primer día.
      </>
    ),
  },
  {
    icon: FiCreditCard,
    q: "¿Cómo se paga el proyecto?",
    a: (
      <>
        Se define en la propuesta. Para proyectos grandes trabajamos{" "}
        <strong className="font-semibold text-slate-700">por hitos</strong>: avanzas por etapas y pagas
        conforme se entrega cada una. Así reduces el riesgo y ves resultados desde el inicio.
      </>
    ),
  },
  {
    icon: FiSend,
    q: "¿Qué métodos de pago aceptan?",
    a: (
      <>
        Trabajamos con pagos en <strong className="font-semibold text-slate-700">USD</strong> y
        aceptamos <strong className="font-semibold text-slate-700">Binance</strong>,{" "}
        <strong className="font-semibold text-slate-700">Zinli</strong> y{" "}
        <strong className="font-semibold text-slate-700">Mercantil Panamá</strong>. El método y la
        forma (por hitos o completo) se definen en la propuesta según el alcance del proyecto.
      </>
    ),
  },
  {
    icon: FiGlobe,
    q: "¿Trabajan con empresas fuera de Venezuela?",
    a: (
      <>
        Sí, trabajamos de forma <strong className="font-semibold text-slate-700">remota</strong> y
        atendemos negocios en Latinoamérica y otros países. Reuniones, entregas y
        soporte se coordinan por completo en línea.
      </>
    ),
  },
];

export function Check() {
  return (
    <svg
      className="w-4 h-4 text-accent mt-0.5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export const GUARANTEES = [
  "Respuesta en menos de 24 h",
  "Sin compromiso ni costo al consultar",
  "Propuesta clara con alcance, plazo y precio",
];
