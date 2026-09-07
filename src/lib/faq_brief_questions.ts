/**
 * SSOT del cuestionario guiado: intenciones, pasos FAQ y listas.
 * El happy path no llama OpenRouter; contacto (nombre, empresa, email,
 * whatsapp, pais) vive en el FSM, no en estos árboles.
 */

export type IntentionId =
  | "landing"
  | "sitio-corporativo"
  | "blog"
  | "erp"
  | "pos"
  | "ecommerce"
  | "gestion-pasteleria"
  | "fintech-prestamos"
  | "fintech-inversiones"
  | "fintech-seguros";

/** Claves FAQ de BriefData. Sin campos de contacto. */
export type FaqMapsTo =
  | "idea"
  | "target"
  | "problem"
  | "detailValue"
  | "complejidad"
  | "timeline"
  | "urgencia"
  | "presupuesto"
  | "modalidad";

export type FaqChoiceMode = "radio" | "check";

export type FaqOption = {
  id: string;
  title: string;
  description?: string;
};

export type FaqStep = {
  id: string;
  prompt: string;
  mapsTo: FaqMapsTo;
  detailLabel?: string;
  choice?: FaqChoiceMode;
  options?: readonly FaqOption[];
};

export type IntentionFaq = {
  id: IntentionId;
  projectType: string;
  pillLabel: string;
  description: string;
  steps: FaqStep[];
};

const URGENCIA_OPTIONS: readonly FaqOption[] = [
  { id: "baja", title: "Baja" },
  { id: "media", title: "Media" },
  { id: "alta", title: "Alta" },
];

const PRESUPUESTO_OPTIONS: readonly FaqOption[] = [
  { id: "lt500", title: "Menos de $500" },
  { id: "500-2000", title: "$500 – $2.000" },
  { id: "2000-5000", title: "$2.000 – $5.000" },
  { id: "gt5000", title: "Más de $5.000" },
];

export const OTROS_TITLE = "Otros";

const OTROS: FaqOption = {
  id: "otros",
  title: OTROS_TITLE,
  description: "Si no está en la lista, elígelo y escríbelo en el chat",
};

/** Separa "Otros" de un valor de lista unido por coma. */
export function splitOtrosAnswer(value: string): {
  hasOtros: boolean;
  rest: string;
} {
  const parts = value
    .split(", ")
    .map((part) => part.trim())
    .filter(Boolean);
  return {
    hasOtros: parts.includes(OTROS_TITLE),
    rest: parts.filter((part) => part !== OTROS_TITLE).join(", "),
  };
}

const RUBRO_COMERCIO: readonly FaqOption[] = [
  { id: "alimentos", title: "Alimentos y bebidas" },
  { id: "moda", title: "Moda y accesorios" },
  { id: "farmacia", title: "Farmacia y cuidado personal" },
  { id: "ferreteria", title: "Ferretería y construcción" },
  { id: "tecnologia", title: "Tecnología y electrónicos" },
  { id: "hogar", title: "Hogar y decoración" },
  { id: "belleza", title: "Belleza y estética" },
  OTROS,
];

const LINEA_NEGOCIO: readonly FaqOption[] = [
  {
    id: "detal",
    title: "Venta al detal",
    description: "Línea dentro del rubro: vende al consumidor final",
  },
  {
    id: "mayor",
    title: "Venta al mayor",
    description: "Línea dentro del rubro: vende a otros comercios",
  },
  {
    id: "local",
    title: "Atención en local",
    description: "El cliente compra en el punto físico",
  },
  {
    id: "delivery",
    title: "Delivery o envíos",
    description: "Línea de despacho a domicilio",
  },
  {
    id: "varias",
    title: "Varias líneas a la vez",
    description: "Más de una línea dentro del mismo rubro",
  },
  OTROS,
];

const POS_ROLES: readonly FaqOption[] = [
  { id: "cajeros", title: "Cajeros" },
  { id: "dueno", title: "Dueño o encargado" },
  { id: "almacen", title: "Almacén / consulta de stock" },
  { id: "piso", title: "Vendedores en piso" },
  OTROS,
];

type ClosingList = {
  prompt: string;
  options: readonly FaqOption[];
};

const TIMELINE_PROMPT = "¿Para cuándo lo necesitan funcionando?";

/** Web corta: landing. 1 semana solo página mínima. */
const LANDING_TIMELINE: ClosingList = {
  prompt: TIMELINE_PROMPT,
  options: [
    {
      id: "1s",
      title: "1 semana",
      description: "Solo una página muy simple, sin integraciones",
    },
    { id: "15d", title: "15 días" },
    { id: "1m", title: "1 mes" },
    { id: "2m", title: "2 meses" },
    OTROS,
  ],
};

/** Blog o sitio chico. */
const BLOG_TIMELINE: ClosingList = {
  prompt: TIMELINE_PROMPT,
  options: [
    { id: "15d", title: "15 días", description: "Blog mínimo, pocas plantillas" },
    { id: "1m", title: "1 mes" },
    { id: "2m", title: "2 meses" },
    { id: "3m", title: "3 meses" },
    OTROS,
  ],
};

const CORP_TIMELINE: ClosingList = {
  prompt: TIMELINE_PROMPT,
  options: [
    { id: "1m", title: "1 mes", description: "Pocas páginas, sin CMS complejo" },
    { id: "2m", title: "2 meses" },
    { id: "3m", title: "3 meses" },
    { id: "6m", title: "6 meses" },
    OTROS,
  ],
};

/** POS, e-commerce, pastelería: producto operable, no un prototipo. */
const OPS_TIMELINE: ClosingList = {
  prompt: TIMELINE_PROMPT,
  options: [
    {
      id: "1m",
      title: "1 mes",
      description: "Alcance muy acotado: un local o catálogo chico",
    },
    { id: "2m", title: "2 meses" },
    { id: "3m", title: "3 meses" },
    { id: "6m", title: "6 meses" },
    OTROS,
  ],
};

/** ERP y fintech: primera versión usable, no el sistema completo. */
const SYSTEM_TIMELINE: ClosingList = {
  prompt: TIMELINE_PROMPT,
  options: [
    {
      id: "3m",
      title: "3 meses",
      description: "MVP de 1 o 2 módulos, no el sistema entero",
    },
    { id: "6m", title: "6 meses" },
    { id: "9m", title: "9 meses" },
    { id: "12m", title: "12 meses" },
    OTROS,
  ],
};

const LANDING_MODALIDAD: ClosingList = {
  prompt: "¿Cómo quieren esa landing?",
  options: [
    { id: "nueva", title: "Landing nueva desde cero" },
    { id: "redisenar", title: "Rediseñar la que ya tienen" },
    { id: "pasar", title: "Pasar un PDF, Canva o one-pager a web" },
    OTROS,
  ],
};

const CORP_MODALIDAD: ClosingList = {
  prompt: "¿Cómo quieren el sitio corporativo?",
  options: [
    { id: "nuevo", title: "Sitio nuevo desde cero" },
    { id: "redisenar", title: "Rediseñar el sitio actual" },
    { id: "ampliar", title: "Ampliar un sitio que ya tienen" },
    OTROS,
  ],
};

const BLOG_MODALIDAD: ClosingList = {
  prompt: "¿Cómo quieren el blog?",
  options: [
    { id: "nuevo", title: "Blog nuevo desde cero" },
    { id: "anadir", title: "Añadir blog a un sitio que ya tienen" },
    { id: "migrar", title: "Migrar un blog existente" },
    OTROS,
  ],
};

const ERP_MODALIDAD: ClosingList = {
  prompt: "¿Cómo quieren el ERP?",
  options: [
    { id: "nuevo", title: "ERP nuevo" },
    { id: "reemplazar", title: "Reemplazar o mejorar el que usan hoy" },
    { id: "conectar", title: "Conectar áreas o sistemas que ya tienen" },
    OTROS,
  ],
};

const POS_MODALIDAD: ClosingList = {
  prompt: "¿Cómo quieren el punto de venta?",
  options: [
    { id: "nuevo", title: "POS nuevo" },
    { id: "reemplazar", title: "Reemplazar el que usan hoy" },
    { id: "conectar", title: "Conectar caja o stock con algo que ya tienen" },
    OTROS,
  ],
};

const ECOMMERCE_MODALIDAD: ClosingList = {
  prompt: "¿Cómo quieren la tienda en línea?",
  options: [
    { id: "nueva", title: "Tienda nueva" },
    { id: "migrar", title: "Mejorar o migrar la tienda actual" },
    { id: "conectar", title: "Conectar catálogo, pagos o stock con lo que ya usan" },
    OTROS,
  ],
};

const BAKERY_MODALIDAD: ClosingList = {
  prompt: "¿Cómo quieren el sistema de la pastelería o tienda?",
  options: [
    { id: "nuevo", title: "Sistema nuevo" },
    { id: "reemplazar", title: "Dejar de usar Excel, WhatsApp o papel" },
    { id: "conectar", title: "Conectar con POS o delivery que ya usan" },
    OTROS,
  ],
};

const LOANS_MODALIDAD: ClosingList = {
  prompt: "¿Cómo quieren la plataforma de préstamos?",
  options: [
    { id: "nueva", title: "Plataforma nueva" },
    { id: "mejorar", title: "Mejorar la que ya operan" },
    { id: "integrar", title: "Integrar con core, cobranza o contabilidad" },
    OTROS,
  ],
};

const INVEST_MODALIDAD: ClosingList = {
  prompt: "¿Cómo quieren la plataforma de inversiones?",
  options: [
    { id: "nueva", title: "Plataforma nueva" },
    { id: "mejorar", title: "Mejorar la que ya operan" },
    { id: "integrar", title: "Integrar con reportes o custodia que ya usan" },
    OTROS,
  ],
};

const INSURANCE_MODALIDAD: ClosingList = {
  prompt: "¿Cómo quieren el sistema de seguros?",
  options: [
    { id: "nuevo", title: "Sistema nuevo" },
    { id: "mejorar", title: "Mejorar el que ya operan" },
    { id: "integrar", title: "Integrar pólizas, siniestros o comisiones" },
    OTROS,
  ],
};

function closingSteps(
  prefix: string,
  modalidad: ClosingList,
  timeline: ClosingList,
): FaqStep[] {
  return [
    {
      id: `${prefix}-modalidad`,
      prompt: modalidad.prompt,
      mapsTo: "modalidad",
      choice: "radio",
      options: modalidad.options,
    },
    {
      id: `${prefix}-timeline`,
      prompt: timeline.prompt,
      mapsTo: "timeline",
      choice: "radio",
      options: timeline.options,
    },
    {
      id: `${prefix}-urgencia`,
      prompt: "¿Qué tan urgente es?",
      mapsTo: "urgencia",
      choice: "radio",
      options: URGENCIA_OPTIONS,
    },
    {
      id: `${prefix}-presupuesto`,
      prompt: "¿En qué rango de presupuesto se mueven?",
      mapsTo: "presupuesto",
      choice: "radio",
      options: PRESUPUESTO_OPTIONS,
    },
  ];
}

const INTENTIONS: Record<IntentionId, IntentionFaq> = {
  landing: {
    id: "landing",
    projectType: "Landing informativa",
    pillLabel: "Landing informativa",
    description: "Una página para presentar la oferta y captar contacto.",
    steps: [
      {
        id: "landing-problem",
        prompt: "¿Para qué necesitan la landing?",
        mapsTo: "problem",
        choice: "check",
        options: [
          { id: "campana", title: "Campaña o anuncio" },
          { id: "lanzamiento", title: "Lanzar un producto o servicio" },
          { id: "contacto", title: "Captar leads o citas" },
          { id: "presencia", title: "Tener presencia simple en internet" },
          OTROS,
        ],
      },
      {
        id: "landing-target",
        prompt: "¿A quién va dirigida?",
        mapsTo: "target",
        choice: "check",
        options: [
          { id: "clientes", title: "Clientes finales" },
          { id: "empresas", title: "Otras empresas" },
          { id: "local", title: "Público local" },
          OTROS,
        ],
      },
      {
        id: "landing-detail",
        prompt: "¿Qué bloques son imprescindibles en esa página?",
        mapsTo: "detailValue",
        detailLabel: "Secciones",
        choice: "check",
        options: [
          { id: "oferta", title: "Oferta / héroe" },
          { id: "servicios", title: "Servicios o beneficios" },
          { id: "prueba", title: "Prueba social" },
          { id: "formulario", title: "Formulario o WhatsApp" },
          OTROS,
        ],
      },
      ...closingSteps("landing", LANDING_MODALIDAD, LANDING_TIMELINE),
    ],
  },
  "sitio-corporativo": {
    id: "sitio-corporativo",
    projectType: "Sitio corporativo",
    pillLabel: "Sitio corporativo",
    description: "Varias páginas: empresa, servicios, equipo y contacto.",
    steps: [
      {
        id: "corp-problem",
        prompt: "¿Qué necesitan resolver con el sitio corporativo?",
        mapsTo: "problem",
        choice: "check",
        options: [
          { id: "imagen", title: "Imagen profesional" },
          { id: "servicios", title: "Explicar servicios" },
          { id: "equipo", title: "Mostrar equipo o sedes" },
          { id: "reemplazo", title: "Reemplazar un sitio viejo" },
          OTROS,
        ],
      },
      {
        id: "corp-target",
        prompt: "¿Quiénes lo visitarían?",
        mapsTo: "target",
        choice: "check",
        options: [
          { id: "clientes", title: "Clientes o pacientes" },
          { id: "aliados", title: "Aliados o proveedores" },
          { id: "talento", title: "Talento / vacantes" },
          OTROS,
        ],
      },
      {
        id: "corp-detail",
        prompt: "¿Qué páginas deben ir en la primera versión?",
        mapsTo: "detailValue",
        detailLabel: "Páginas",
        choice: "check",
        options: [
          { id: "inicio", title: "Inicio" },
          { id: "nosotros", title: "Nosotros" },
          { id: "servicios", title: "Servicios" },
          { id: "equipo", title: "Equipo" },
          { id: "contacto", title: "Contacto" },
          OTROS,
        ],
      },
      ...closingSteps("corp", CORP_MODALIDAD, CORP_TIMELINE),
    ],
  },
  blog: {
    id: "blog",
    projectType: "Blog",
    pillLabel: "Blog",
    description: "Publicar artículos, noticias o contenidos con frecuencia.",
    steps: [
      {
        id: "blog-problem",
        prompt: "¿Para qué quieren el blog?",
        mapsTo: "problem",
        choice: "check",
        options: [
          { id: "seo", title: "Aparecer en Google (SEO)" },
          { id: "autoridad", title: "Autoridad o marca" },
          { id: "noticias", title: "Noticias o novedades" },
          { id: "comunidad", title: "Comunidad o lectores" },
          OTROS,
        ],
      },
      {
        id: "blog-target",
        prompt: "¿Quién lo leería y quién lo publicaría?",
        mapsTo: "target",
        choice: "check",
        options: [
          { id: "clientes", title: "Clientes o público general" },
          { id: "equipo", title: "El equipo publica" },
          { id: "redactores", title: "Redactores externos" },
          OTROS,
        ],
      },
      {
        id: "blog-detail",
        prompt: "¿Con qué frecuencia publicarían?",
        mapsTo: "detailValue",
        detailLabel: "Frecuencia",
        choice: "radio",
        options: [
          { id: "semanal", title: "Cada semana" },
          { id: "mensual", title: "Cada mes" },
          { id: "ocasional", title: "Cuando haya algo que contar" },
          OTROS,
        ],
      },
      ...closingSteps("blog", BLOG_MODALIDAD, BLOG_TIMELINE),
    ],
  },
  erp: {
    id: "erp",
    projectType: "ERP",
    pillLabel: "ERP",
    description: "Inventario, ventas, compras y reportes en un solo sistema.",
    steps: [
      {
        id: "erp-problem",
        prompt: "¿Qué problema operativo buscan resolver con un ERP?",
        mapsTo: "problem",
        choice: "check",
        options: [
          { id: "inventario", title: "Inventario" },
          { id: "compras", title: "Compras" },
          { id: "nomina", title: "Nómina" },
          { id: "finanzas", title: "Finanzas" },
          OTROS,
        ],
      },
      {
        id: "erp-target",
        prompt: "¿Para qué tipo de negocio es y quiénes lo usarían día a día?",
        mapsTo: "target",
        choice: "check",
        options: [
          { id: "comercio", title: "Comercio o tienda", description: "Mostrador, dueño y vendedores" },
          { id: "distribucion", title: "Distribución o mayorista", description: "Almacén, despacho y administración" },
          { id: "manufactura", title: "Taller o manufactura", description: "Producción, compras e inventario" },
          { id: "servicios", title: "Servicios profesionales", description: "Equipo interno y administración" },
          { id: "alimentos", title: "Restaurante o alimentos", description: "Cocina, caja y gerencia" },
          { id: "salud", title: "Clínica o salud", description: "Recepción, personal clínico y admin" },
          OTROS,
        ],
      },
      {
        id: "erp-detail",
        prompt: "¿Qué áreas son las más urgentes de conectar primero?",
        mapsTo: "detailValue",
        detailLabel: "Áreas prioritarias",
        choice: "check",
        options: [
          { id: "inventario", title: "Inventario" },
          { id: "nomina", title: "Nómina" },
          { id: "compras", title: "Compras" },
          { id: "finanzas", title: "Finanzas" },
          OTROS,
        ],
      },
      ...closingSteps("erp", ERP_MODALIDAD, SYSTEM_TIMELINE),
    ],
  },
  pos: {
    id: "pos",
    projectType: "POS",
    pillLabel: "POS",
    description: "Facturación rápida, inventario y control de caja.",
    steps: [
      {
        id: "pos-problem",
        prompt: "¿Qué se les complica hoy que un punto de venta debería resolver?",
        mapsTo: "problem",
        choice: "check",
        options: [
          { id: "caja", title: "Caja y cobro" },
          { id: "pedidos", title: "Pedidos" },
          { id: "inventario", title: "Inventario" },
          OTROS,
        ],
      },
      {
        id: "pos-rubro",
        prompt:
          "¿Cuál es el rubro del comercio? El rubro es el sector (alimentos, moda, ferretería…). La línea de negocio va después: es lo que venden dentro de ese rubro.",
        mapsTo: "target",
        choice: "radio",
        options: RUBRO_COMERCIO,
      },
      {
        id: "pos-linea",
        prompt:
          "¿Qué línea de negocio tienen dentro de ese rubro? Una línea vive adentro del rubro: detal, mayor, delivery, local…",
        mapsTo: "idea",
        choice: "check",
        options: LINEA_NEGOCIO,
      },
      {
        id: "pos-roles",
        prompt: "¿Quiénes cobran o consultan stock?",
        mapsTo: "complejidad",
        choice: "check",
        options: POS_ROLES,
      },
      {
        id: "pos-detail",
        prompt: "¿Cuántas sucursales o puntos de cobro manejan?",
        mapsTo: "detailValue",
        detailLabel: "Puntos de cobro",
        choice: "radio",
        options: [
          { id: "uno", title: "Un solo punto" },
          { id: "2-3", title: "2 o 3 puntos" },
          { id: "4+", title: "4 o más" },
          OTROS,
        ],
      },
      ...closingSteps("pos", POS_MODALIDAD, OPS_TIMELINE),
    ],
  },
  ecommerce: {
    id: "ecommerce",
    projectType: "E-commerce",
    pillLabel: "E-commerce",
    description: "Tienda online con pagos, pedidos y stock conectados.",
    steps: [
      {
        id: "ecommerce-problem",
        prompt: "¿Qué les frena hoy para vender en línea?",
        mapsTo: "problem",
        choice: "check",
        options: [
          { id: "catalogo", title: "Catálogo" },
          { id: "pagos", title: "Pagos" },
          { id: "pedidos", title: "Pedidos" },
          { id: "stock", title: "Control de stock" },
          OTROS,
        ],
      },
      {
        id: "ecommerce-target",
        prompt: "¿Quién vende y quién compra en esa tienda?",
        mapsTo: "target",
        choice: "check",
        options: [
          { id: "b2c", title: "Un negocio a clientes finales" },
          { id: "mayor", title: "Venta al mayor en línea" },
          { id: "mixto", title: "Detal y mayor" },
          OTROS,
        ],
      },
      {
        id: "ecommerce-catalog",
        prompt: "¿Cuántos productos aproximadamente tendrían?",
        mapsTo: "detailValue",
        detailLabel: "Tamaño de catálogo",
        choice: "radio",
        options: [
          { id: "lt50", title: "Menos de 50" },
          { id: "50-200", title: "50 a 200" },
          { id: "200+", title: "Más de 200" },
          OTROS,
        ],
      },
      {
        id: "ecommerce-pay",
        prompt: "¿Qué medios de pago usarían?",
        mapsTo: "complejidad",
        choice: "check",
        options: [
          { id: "movil", title: "Pago móvil" },
          { id: "transferencia", title: "Transferencia" },
          { id: "tarjeta", title: "Tarjeta" },
          { id: "contraentrega", title: "Contraentrega" },
          OTROS,
        ],
      },
      ...closingSteps("ecommerce", ECOMMERCE_MODALIDAD, OPS_TIMELINE),
    ],
  },
  "gestion-pasteleria": {
    id: "gestion-pasteleria",
    projectType: "Gestión pastelería/tienda",
    pillLabel: "Gestión pastelería/tienda",
    description: "Pedidos, recetas, insumos y entregas en una sola operación.",
    steps: [
      {
        id: "bakery-problem",
        prompt: "¿Qué se les complica hoy en la pastelería o tienda?",
        mapsTo: "problem",
        choice: "check",
        options: [
          { id: "encargos", title: "Encargos" },
          { id: "produccion", title: "Producción" },
          { id: "insumos", title: "Insumos" },
          { id: "entregas", title: "Entregas" },
          OTROS,
        ],
      },
      {
        id: "bakery-target",
        prompt: "¿Quiénes usarían el sistema?",
        mapsTo: "target",
        choice: "check",
        options: [
          { id: "mostrador", title: "Mostrador" },
          { id: "produccion", title: "Producción" },
          { id: "delivery", title: "Delivery" },
          OTROS,
        ],
      },
      {
        id: "bakery-detail",
        prompt: "¿Qué tan seguido reciben pedidos personalizados o por encargo?",
        mapsTo: "detailValue",
        detailLabel: "Pedidos personalizados",
        choice: "radio",
        options: [
          { id: "diario", title: "Casi todos los días" },
          { id: "semanal", title: "Varias veces por semana" },
          { id: "ocasional", title: "De vez en cuando" },
          OTROS,
        ],
      },
      ...closingSteps("bakery", BAKERY_MODALIDAD, OPS_TIMELINE),
    ],
  },
  "fintech-prestamos": {
    id: "fintech-prestamos",
    projectType: "Fintech - préstamos",
    pillLabel: "Fintech - préstamos",
    description: "Carteras, amortización, intereses y estados de cuenta.",
    steps: [
      {
        id: "loans-problem",
        prompt:
          "Nosotros construimos el software, no el marco regulatorio. ¿Qué necesitan controlar?",
        mapsTo: "problem",
        choice: "check",
        options: [
          { id: "solicitudes", title: "Solicitudes" },
          { id: "cuotas", title: "Cuotas" },
          { id: "cobros", title: "Cobros" },
          { id: "estados", title: "Estados de cuenta" },
          OTROS,
        ],
      },
      {
        id: "loans-target",
        prompt: "¿Quiénes operarían la plataforma?",
        mapsTo: "target",
        choice: "check",
        options: [
          { id: "analistas", title: "Analistas" },
          { id: "cobranza", title: "Cobranza" },
          { id: "clientes", title: "Clientes finales" },
          OTROS,
        ],
      },
      {
        id: "loans-detail",
        prompt: "¿Qué módulos son prioritarios?",
        mapsTo: "detailValue",
        detailLabel: "Módulos de préstamos",
        choice: "check",
        options: [
          { id: "solicitudes", title: "Solicitudes" },
          { id: "calculo", title: "Cálculo de cuotas" },
          { id: "cartera", title: "Cartera" },
          { id: "estados", title: "Estados de cuenta" },
          OTROS,
        ],
      },
      ...closingSteps("loans", LOANS_MODALIDAD, SYSTEM_TIMELINE),
    ],
  },
  "fintech-inversiones": {
    id: "fintech-inversiones",
    projectType: "Fintech - inversiones",
    pillLabel: "Fintech - inversiones",
    description: "Portafolios, rendimientos y reportes para inversores.",
    steps: [
      {
        id: "invest-problem",
        prompt:
          "Nosotros construimos el software, no el marco regulatorio. ¿Qué necesitan operar?",
        mapsTo: "problem",
        choice: "check",
        options: [
          { id: "portafolios", title: "Portafolios" },
          { id: "rendimientos", title: "Rendimientos" },
          { id: "reportes", title: "Reportes para inversores" },
          OTROS,
        ],
      },
      {
        id: "invest-target",
        prompt: "¿Quiénes lo usarían?",
        mapsTo: "target",
        choice: "check",
        options: [
          { id: "admins", title: "Administradores" },
          { id: "asesores", title: "Asesores" },
          { id: "inversores", title: "Inversores finales" },
          OTROS,
        ],
      },
      {
        id: "invest-detail",
        prompt: "¿Qué debe priorizar la primera versión?",
        mapsTo: "detailValue",
        detailLabel: "Módulos de inversión",
        choice: "radio",
        options: [
          { id: "portafolios", title: "Portafolios" },
          { id: "rendimientos", title: "Rendimientos" },
          { id: "reportes", title: "Reportes" },
          OTROS,
        ],
      },
      ...closingSteps("invest", INVEST_MODALIDAD, SYSTEM_TIMELINE),
    ],
  },
  "fintech-seguros": {
    id: "fintech-seguros",
    projectType: "Fintech - seguros",
    pillLabel: "Fintech - seguros",
    description: "Pólizas, siniestros, renovaciones y comisiones.",
    steps: [
      {
        id: "insurance-problem",
        prompt:
          "Nosotros construimos el software, no el marco regulatorio. ¿Qué necesitan controlar?",
        mapsTo: "problem",
        choice: "check",
        options: [
          { id: "polizas", title: "Pólizas" },
          { id: "siniestros", title: "Siniestros" },
          { id: "renovaciones", title: "Renovaciones" },
          { id: "comisiones", title: "Comisiones" },
          OTROS,
        ],
      },
      {
        id: "insurance-target",
        prompt: "¿Quiénes operarían el sistema?",
        mapsTo: "target",
        choice: "check",
        options: [
          { id: "suscripcion", title: "Suscripción" },
          { id: "siniestros", title: "Siniestros" },
          { id: "corredores", title: "Corredores" },
          { id: "asegurados", title: "Asegurados" },
          OTROS,
        ],
      },
      {
        id: "insurance-detail",
        prompt: "¿Qué flujo es el más urgente?",
        mapsTo: "detailValue",
        detailLabel: "Módulos de seguros",
        choice: "radio",
        options: [
          { id: "alta", title: "Alta de pólizas" },
          { id: "siniestros", title: "Siniestros" },
          { id: "renovaciones", title: "Renovaciones" },
          { id: "comisiones", title: "Comisiones" },
          OTROS,
        ],
      },
      ...closingSteps("insurance", INSURANCE_MODALIDAD, SYSTEM_TIMELINE),
    ],
  },
};

const INTENTION_ORDER = [
  "landing",
  "sitio-corporativo",
  "blog",
  "erp",
  "pos",
  "ecommerce",
  "gestion-pasteleria",
  "fintech-prestamos",
  "fintech-inversiones",
  "fintech-seguros",
] as const satisfies readonly IntentionId[];

export const PILL_LABELS: readonly string[] = INTENTION_ORDER.map(
  (id) => INTENTIONS[id].pillLabel,
);

export const INTENTION_LIST = INTENTION_ORDER.map((id) => {
  const item = INTENTIONS[id];
  return {
    id: item.id,
    title: item.pillLabel,
    description: item.description,
  };
});

export function getIntention(id: IntentionId): IntentionFaq {
  const intention = INTENTIONS[id];
  if (!intention) {
    throw new Error(`Unknown intention: ${String(id)}`);
  }
  return intention;
}

export function faqChoiceOf(step: FaqStep | null) {
  if (!step?.choice || !step.options?.length) return null;
  return { mode: step.choice, options: step.options };
}

/** Siguiente paso FAQ. `currentStepId` null = primero. null de retorno = contacto. */
export function nextFaqStep(
  id: IntentionId,
  currentStepId: string | null,
): FaqStep | null {
  const { steps } = getIntention(id);
  if (currentStepId === null) {
    return steps[0] ?? null;
  }
  const index = steps.findIndex((step) => step.id === currentStepId);
  if (index === -1) {
    return null;
  }
  return steps[index + 1] ?? null;
}
