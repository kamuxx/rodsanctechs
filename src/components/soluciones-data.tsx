import type { IntentionId } from "../lib/faq_brief_questions";

/**
 * Datos compartidos de la sección #servicios (títulos, descripciones, iconos).
 * Las variantes comparten el copy desde aquí; cada una decide su topología.
 *
 * Contratos (verificados por scripts/check-offer-sync.mjs):
 * - `title` es exacto: coincide con INTENTION_TO_CARD del guard. No renombrar
 *   sin actualizar el guard.
 * - `intent` conecta cada card con su intención del cuestionario (deep-link).
 * - `group` alimenta el filtro anti-parálisis (web / operacion / fintech).
 */

export type ServiceGroup = "web" | "operacion" | "fintech";

export type Service = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  intent: IntentionId;
  group: ServiceGroup;
};

export const pymeServices: Service[] = [
  {
    title: "Landing informativa",
    desc: "Convierte visitas en contactos con una página clara pensada para tu campaña.",
    icon: <path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" />,
    intent: "landing",
    group: "web",
  },
  {
    title: "Sitio corporativo",
    desc: "Gana imagen profesional con un sitio que explica tus servicios y trae consultas.",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </>
    ),
    intent: "sitio-corporativo",
    group: "web",
  },
  {
    title: "Blog",
    desc: "Atrae clientes desde Google publicando artículos sin depender de un desarrollador.",
    icon: (
      <>
        <path d="M4 4h16v16H4z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
    intent: "blog",
    group: "web",
  },
  {
    title: "Aplicación móvil",
    desc: "Lleva tus pedidos, reservas y notificaciones al bolsillo de tus clientes en Android e iOS.",
    icon: (
      <>
        <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
        <path d="M11 18h2" />
      </>
    ),
    intent: "app-movil",
    group: "web",
  },
  {
    title: "ERP a medida",
    desc: "Ordena inventario, ventas, compras y reportes en un sistema que crece con tu negocio.",
    icon: <path d="M12 20V10M18 20V4M6 20v-4" />,
    intent: "erp",
    group: "operacion",
  },
  {
    title: "Punto de venta (POS)",
    desc: "Cobra rápido, sincroniza inventario y cierra caja sin procesos manuales.",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </>
    ),
    intent: "pos",
    group: "operacion",
  },
  {
    title: "Carritos de compra",
    desc: "Vende en línea con pagos, pedidos y stock conectados hasta el pedido confirmado.",
    icon: (
      <>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </>
    ),
    intent: "ecommerce",
    group: "operacion",
  },
  {
    title: "Gestión para pastelerías y tiendas",
    desc: "Cumple encargos a tiempo con pedidos, producción, insumos y entregas conectadas.",
    icon: (
      <>
        <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z" />
      </>
    ),
    intent: "gestion-pasteleria",
    group: "operacion",
  },
  {
    title: "CRM a medida",
    desc: "No pierdas ventas: ordena clientes, seguimiento y oportunidades en un solo lugar.",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </>
    ),
    intent: "crm",
    group: "operacion",
  },
  {
    title: "Sistema de turnos médicos",
    desc: "Llena tu agenda sin llamadas: citas, pacientes y recordatorios para tu consultorio.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4" />
      </>
    ),
    intent: "sistema-turnos",
    group: "operacion",
  },
  {
    title: "Sistema de estacionamiento",
    desc: "Cobra cada lugar: disponibilidad, reservas y cierre para tu estacionamiento.",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M9 17V7h4a3 3 0 010 6H9" />
      </>
    ),
    intent: "sistema-parking",
    group: "operacion",
  },
  {
    title: "Gestión de publicidad",
    desc: "Vende cada espacio: inventario, disponibilidad y reportes para tus anunciantes.",
    icon: (
      <>
        <path d="M3 11l18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 11-5.8-1.6" />
      </>
    ),
    intent: "gestion-publicidad",
    group: "operacion",
  },
];

export const fintechServices: Service[] = [
  {
    title: "Sistemas de préstamos",
    desc: "Controla cartera, cuotas y estados de cuenta con precisión auditable.",
    icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />,
    intent: "fintech-prestamos",
    group: "fintech",
  },
  {
    title: "Plataformas de inversión",
    desc: "Opera portafolios y reporta rendimientos a tus inversores con confianza.",
    icon: (
      <>
        <path d="M23 4v6h-6M1 20v-6h6" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </>
    ),
    intent: "fintech-inversiones",
    group: "fintech",
  },
  {
    title: "Sistemas para seguros",
    desc: "Gestiona pólizas, siniestros y renovaciones en un flujo auditable.",
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    intent: "fintech-seguros",
    group: "fintech",
  },
];
