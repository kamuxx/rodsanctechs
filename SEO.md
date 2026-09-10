# SEO Strategy — RodSancTechs Landing

> Fase 0 (MT-00/MT-01/MT-02). Dominio canónico: `https://rodsanctechs.netlify.app`.
> Posicionamiento: estudio/empresa de soluciones de software a medida (NO freelance/contractor).

## 1. Objetivo

Posicionar a RodSancTechs como proveedor de **servicios de desarrollo de software a medida** (ERP, CRM, POS, e-commerce, fintech) para pequeñas y medianas empresas — no como portafolio de desarrolladores freelance.

## 2. Keywords primarias (foco comercial)

| Keyword | Intención | Dónde aplica |
|---|---|---|
| `desarrollo de software a medida` | Comercial/transaccional | `<title>`, H1, copy hero, JSON-LD |
| `desarrollo web a medida` | Comercial/transaccional | `<title>` alternativo, H2 Soluciones, copy |
| `sistemas de gestión a medida` (ERP/CRM/POS) | Comercial | H2 Soluciones, cards, JSON-LD Service |
| `desarrollo de aplicaciones fintech` | Comercial | H2 fintech, cards, JSON-LD |
| `e-commerce a medida` | Comercial/transaccional | H2 Soluciones, cards |
| `empresa de desarrollo de software` | Comercial/navegacional | title, OG, JSON-LD Organization |

## 3. Keywords secundarias (calificación - latam/es)

| Keyword | Intención | Dónde aplica |
|---|---|---|
| `desarrollo de software venezuela` / `desarrollo web venezuela` | Geo | meta description, JSON-LD, footer |
| `crear sistema para pymes` | Informativa/transaccional | copy Soluciones, FAQ |
| `sistema para pastelerías` | Transaccional | card caso de estudio (real) |
| `plataforma de préstamos` / `sistema para seguros` | Transaccional | card caso de estudio (real) |
| `automatizar procesos de negocio` | Informativa | copy hero/subtítulo, proceso |

## 4. Long tail (fase casos de estudio, solo si hay datos reales)

- `sistema de gestión para pastelerías`
- `plataforma de préstamos a medida`
- `panel de administración para seguros`
- `ERP para pymes venezolanas`
- `desarrollador de software para empresas venezolanas`

> No usar long tail de casos hasta que existan casos reales (MT-03). NO fabricar métricas ni proyectos.

## 5. Mapa on-page (cómo se aplica)

| Elemento | Keyword objetivo | Regla |
|---|---|---|
| `<title>` | primaria | ≤60 chars, luego de la keyword: marca |
| `meta description` | primaria + geo | ≤155 chars, CTA implícito, sin "freelance" |
| H1 único | primaria principal | promesa de resultado, no lista de techs |
| H2 por sección | secundaria de la sección | keywords naturales, sin stuffing |
| H3/cards | long tail solo reales | 1 idea por card |
| JSON-LD | Organization + Service | nombre, servicios, contacto, geo |
| OG/Twitter | primaria + marca | mantener consistencia con title/description |
| Alt text / aria | — | descriptivo, sin keyword stuffing |

## 6. Reglas de contenido (no negociables)

1. La tecnología aparece como **prueba de capacidad**, nunca como producto principal.
2. El visitante compra una **solución a un problema**, no React/Next/APIs.
3. Nunca usar la palabra "freelance"/"contractor" como posicionamiento (contradice el objetivo).
4. Métricas y casos: solo verificables y reales (PRODUCT.md).
5. Idioma: español neutro profesional (es_VE). Los artefactos técnicos quedan en inglés.

## 7. Bloqueado hasta Fase 0 completa

- Canonical/og:url/sitemap: dependen de MT-00 → ya resuelto (`https://rodsanctechs.netlify.app`).
- Long tail de casos: NO aplica casos de clientes. Restricción confirmada (MT-03): todo el trabajo previo fue como empleado bajo NDA → no es público ni propiedad de la marca. Sustitución decidida: **demos públicas propias** (productos de demostración con IP propia, ej. Gestión de Pastelería, Panel de Préstamos) presentadas con narrativa de caso pero etiquetadas como demo, NUNCA como trabajo de cliente. Secuencia: las demos se construyen POST-lanzamiento; la landing publica estado honesto "en preparación" y el CTA de casos se restaura cuando existan demos reales. Trust signals permitidas (si son reales): "sistemas enterprise bajo NDA", sectores genéricos (Retail · Alimentos · Finanzas · Seguros), años de experiencia.

## Métricas de éxito (definidas en fase verificación)

- LCP/CLS/INP verdes en Lighthouse.
- Un solo H1, jerarquía H2/H3 correcta.
- JSON-LD válido (Rich Results Test).
- Sitemap y robots accesibles desde el dominio.