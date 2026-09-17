/**
 * Datos compartidos de la sección #servicios (títulos, descripciones, iconos).
 * Las variantes (Soluciones, SolucionesRemodel, SolucionesBolder) comparten
 * el copy desde aquí; cada una decide su topología.
 */

export type Service = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

export const pymeServices: Service[] = [
  {
    title: "Landing informativa",
    desc: "Una página clara para presentar la oferta y convertir visitas en contacto.",
    icon: <path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" />,
  },
  {
    title: "Sitio corporativo",
    desc: "Varias páginas para contar la empresa, servicios, equipo y contacto.",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </>
    ),
  },
  {
    title: "Blog",
    desc: "Publicar artículos, noticias o contenidos para atraer y educar.",
    icon: (
      <>
        <path d="M4 4h16v16H4z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
  },
  {
    title: "ERP a medida",
    desc: "Inventario, ventas, compras y reportes en un solo sistema que crece contigo.",
    icon: <path d="M12 20V10M18 20V4M6 20v-4" />,
  },
  {
    title: "Punto de venta (POS)",
    desc: "Facturación rápida, inventario sincronizado y control de caja sin procesos manuales.",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </>
    ),
  },
  {
    title: "Carritos de compra",
    desc: "Tienda online con pagos, pedidos y stock conectados en tiempo real.",
    icon: (
      <>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </>
    ),
  },
  {
    title: "Gestión para pastelerías y tiendas",
    desc: "Pedidos, recetas, insumos y entregas en una sola operación.",
    icon: (
      <>
        <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z" />
      </>
    ),
  },
  {
    title: "Aplicación móvil",
    desc: "Apps Android e iOS para restaurantes, delivery y marketplace: pedidos, pagos y notificaciones.",
    icon: (
      <>
        <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
        <path d="M11 18h2" />
      </>
    ),
  },
  {
    title: "CRM a medida",
    desc: "Clientes, seguimiento y oportunidades en un solo lugar, conectado a tu operación.",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </>
    ),
  },
  {
    title: "Sistema de turnos médicos",
    desc: "Agenda, pacientes y recordatorios para consultorios, odontología y veterinarias.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4" />
      </>
    ),
  },
  {
    title: "Sistema de estacionamiento",
    desc: "Disponibilidad, reservas, cobro y cierre para playas y cocheras.",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M9 17V7h4a3 3 0 010 6H9" />
      </>
    ),
  },
  {
    title: "Gestión de publicidad",
    desc: "Espacios, disponibilidad y reportes de exposición para medios y anunciantes.",
    icon: (
      <>
        <path d="M3 11l18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 11-5.8-1.6" />
      </>
    ),
  },
];

export const fintechServices: Service[] = [
  {
    title: "Sistemas de préstamos",
    desc: "Carteras, amortización, intereses y estados de cuenta automatizados.",
    icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />,
  },
  {
    title: "Plataformas de inversión",
    desc: "Portafolios, rendimientos y reportes para inversores y administradores.",
    icon: (
      <>
        <path d="M23 4v6h-6M1 20v-6h6" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </>
    ),
  },
  {
    title: "Sistemas para seguros",
    desc: "Pólizas, siniestros, renovaciones y comisiones en un flujo auditable.",
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
];
