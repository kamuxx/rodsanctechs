# Catálogo de Demos — RodSancTechs

> Documento de decisión para el catálogo de demos que acompaña la landing.
> Fuente de verdad: `src/lib/faq_brief_questions.ts` (10 intenciones canónicas),
> `src/components/Demos.tsx`, `src/components/Soluciones.tsx`, `PLAN_RRSS_30_DIAS.md`, `SEO.md`.
> Medidas, tipografía, animaciones y CTA por rubro: `MAQUETA_LANDINGS.md`.
> Estado: propuesta. Nada de lo aquí descrito existe todavía.

---

## Problem Statement

El sitio promete 10 tipos de sistema, pero no puede mostrar ninguno. No hay casos reales,
no hay logos, no hay capturas — y la operación enterprise está bajo NDA. El único activo
que puede demostrar capacidad es un sistema propio funcionando.

Hoy la sección `#casos` ofrece "Demos en preparación" con dos tarjetas sin prueba visual
(`Gestión de Pastelería`, `Panel de Préstamos`) y un botón de _solicitar acceso_. El
visitante debe decidir por copy, no por evidencia.

**El problema real:** el visitante no puede verificar que el estudio construye sistemas
operables antes de invertir una conversación. Eso traslada todo el riesgo al cliente.

## Target User

- **Primario:** PYME o comercio que ya sabe qué tipo de sistema necesita (o lo intuye) y
  busca prueba de capacidad antes de contactar. Llega desde `#servicios` o desde el chat guiado.
- **Secundario:** empresa evaluando reemplazar un sistema existente — necesita ver
  profundidad operativa (módulos, roles, reportes), no una vitrina.
- **Quien NO es target:** visitante que solo busca un sitio web simple. Para él basta
  `Landing informativa`, el demo más barato.

## Success Metric

Tasa de conversión desde la sección `#casos`: visitantes que abren el chat **después** de
interactuar con un demo, sobre el total que visita la sección.

- Métrica de vanidad a evitar: visitas al demo sin apertura de chat.
- Métrica secundaria: `projectType` enviado en el brief coincide con el tipo de demo visto
  (indica que el demo calificó la intención).
- **No hay baseline.** Instrumentar antes del primer demo (ver Open Questions).

## Recommended Direction

Construir **una sola aplicación de demos**, no 10 proyectos separados: un único sistema
con un **selector de tipo de proyecto** que carga el módulo correspondiente con datos
sembrados y reiniciables.

Tres decisiones que definen la dirección:

1. **Demo operable, no mockup.** Cada demo debe permitir una acción real end-to-end
   (cobrar una venta, registrar un encargo, emitir una cuota). Un carrusel de capturas ya
   lo puede hacer cualquier agencia; un sistema clickeable no.
2. **Acceso con un clic, sin formulario.** El gate actual ("solicitar acceso") agrega
   fricción justo donde falta prueba. El demo debe abrirse directo, en modo lectura,
   con una capa de datos `demo` claramente marcada y no persistente.
3. **Prioridad por ratio credibilidad/esfuerzo, no por prestigio.** Los tipos livianos
   (landing, blog, corporativo) se construyen en días y cubren la mayoría del tráfico.
   Los pesados (ERP, fintech) cuestan meses y se justifican solo si hay demanda medida.

**Por qué no las 10 completas:** el `SYSTEM_TIMELINE` de la propia SSOT promete 3 meses
para un MVP de 1–2 módulos. 10 demos a ese costo equivalen a más de un año de trabajo de
dos personas — es construir una línea de producto, no un activo de marketing.

## Decision Log

| Decisión                                                                                         | Razón                                                                                    | Alternativas consideradas                         | Rechazado porque                                        | Impacto                                |
| ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------- | -------------------------------------- |
| Una app de demos con selector de tipo                                                            | Reutiliza shell, auth, datos y deploy                                                    | 10 demos independientes                           | 10× mantenimiento y 10× deploy por 2 personas           | Alto — define la arquitectura completa |
| Acceso directo, sin pedir permiso                                                                | El gate contradice el propósito de probar                                                | Mantener "solicitar demo privada"                 | Añade fricción donde falta evidencia                    | Alto — cambia `Demos.tsx` y el embudo  |
| Datos sembrados, reiniciables, no persistentes                                                   | Cero riesgo de datos personales, cero backend de escritura                               | Base de datos real por demo                       | Costo operativo y riesgo de privacidad sin beneficio    | Medio                                  |
| Scaffolding en español neutro                                                                    | Coherente con `SEO.md` §6.5 y el copy actual                                             | Interfaz en inglés                                | Rompe la coherencia de idioma del sitio                 | Bajo                                   |
| Los 3 demos fintech no se publican                                                               | `Soluciones.tsx` declara operación bajo NDA                                              | Publicarlos como los demás                        | Contradice el compromiso escrito en el propio sitio     | Alto — decisión de posicionamiento     |
| Un demo de ERP se limita a 2 módulos                                                             | El `SYSTEM_TIMELINE` ya vende MVP, no sistema completo                                   | ERP completo                                      | Meses de trabajo y contradice la promesa de la SSOT     | Alto                                   |
| Landings por rubro; sistemas por tipo                                                            | El rubro cambia diseño, copy y secciones de una landing; no cambia los módulos de un ERP | Catálogo vertical completo (rubros + sistemas)    | Mezcla dos ejes de venta distintos y rompe el selector  | Alto — define el mapa del catálogo     |
| Cada landing es también una plantilla vendible                                                   | El FAQ ya promete un "catálogo de plantillas profesionales" (vía 2 de 3)                 | Construir landings solo como demo                 | Desperdicia el activo: el mismo build sirve a dos fines | Alto — cambia el retorno del esfuerzo  |
| La paleta del rubro reemplaza la marca dentro de la landing; el shell del demo mantiene la marca | Un demo que solo se ve morado no prueba adaptación a la identidad del cliente            | Usar la paleta de RodSancTechs en todos los demos | No demuestra justo lo que el cliente necesita ver       | Medio                                  |
| Composición por bloques reutilizables, no landings a medida                                      | 15 landings artesanales son 15 mantenimientos; un set de bloques es una librería         | Una plantilla bespoke por rubro                   | Costo lineal e insostenible para dos personas           | Alto — define cómo se construye        |
| Spec de maquetación en fichero aparte (`MAQUETA_LANDINGS.md`); `proyectos.md` referencia    | Medidas, tipografía, animaciones y CTA cambian por rubro sin tocar las decisiones        | Todo el spec dentro de `proyectos.md`             | El documento de decisión se vuelve un manual            | Medio — ordena los artefactos          |
| Catálogo ampliado a 20 rubros; salud con doble salida (landing + `sistema-turnos` en Later) | Demanda de salud, bodega y estacionamiento; `PRODUCT.md` ya ofrece clínica/veterinaria   | Salud solo como landing                           | Vende la vidriera sin probar el sistema real            | Alto — amplía matriz y Later           |
| Demo operable de estacionamiento (`sistema-parking`) en Later, spec en §4.4 de maquetación | La landing R-20 vende la reserva; tablero, cobro y cierre prueban la operación           | Solo landing de parking                           | Repite el hueco de salud: vidriera sin sistema          | Medio — nuevo tipo en Later            |
| Pantallas de los 5 pendientes especcadas en maquetación §4.5–4.9                        | Faltaba el cómo construirlos; los módulos ya estaban declarados                          | Dejarlos solo con módulos                         | El builder inventa pantallas y rompe consistencia       | Medio — cierra el hueco de spec        |
| Nuevos tipos `app-movil` y `gestion-publicidad` en Later, con ID propuesto              | Demanda declarada; `PRODUCT.md` ya ofrece apps móviles                                   | No incluirlos                                     | El portafolio niega capacidad que sí se vende           | Alto — amplía catálogo y cuestionario  |
| Sección `Soluciones` ampliada con app móvil, CRM, turnos, parking y publicidad         | El usuario lo pidió explícito; el título ya prometía CRM sin tarjeta                    | Mantener el Not Doing de secciones                | La vitrina niega lo que el cuestionario ya ofrece       | Medio — copy del sitio, no del catálogo |

## Core Assumption

**Un visitante que puede entrar a un sistema funcionando convierte a conversación a una
tasa mayor que uno que solo lee descripciones de servicio y debe pedir acceso.**

- **Evidencia:** `Demos.tsx` hoy no ofrece prueba visual alguna; `PLAN_RRSS_30_DIAS.md`
  confirma que no existen casos, logos ni testimonios utilizables. El único sustituto
  posible de la prueba social ausente es un sistema propio verificable.
- **Método de validación:** instrumentar `#casos`, publicar un único demo (`Landing
informativa` o `POS`, el de menor costo), medir apertura de chat desde la sección antes
  y después con la misma fuente de tráfico.
- **Impacto si falla:** el catálogo no es un activo de conversión, solo un gasto de
  ingeniería. En ese escenario, el esfuerzo debe redirigirse a contenido y a casos reales
  bajo permiso del cliente.

## Risks

- **Categoría:** Operacional (dominante) — **Probabilidad:** Alta — **Impacto:** Alto
- **Riesgo:** el catálogo se convierte en una línea de producto. Diez demos "operables"
  necesitan datos, mantenimiento, control de acceso y actualización continua. Con dos
  personas, compite directamente contra el trabajo pagado.
- **Mitigación:** límite duro de alcance por demo (un flujo end-to-end, no un sistema
  completo) y una decisión de continuar/parar después del primer demo publicado.

Riesgo secundario — **Mercado**, probabilidad Media: el demo puede atraer consultas de
tipos que el estudio no quiere construir de inmediato. Mitigación: cada demo declara su
alcance real y el chat ya filtra intención por `projectType`.

Riesgo terciario — **Técnico**, probabilidad Baja: mezclar datos `demo` con cualquier
entorno real. Mitigación: capa de datos aislada, reinicio explícito y aviso visible de
entorno de demostración.

## Validation Plan

1. Instrumentar la sección `#casos`: visita, clic en demo, apertura de chat, `projectType` enviado.
2. Publicar **un solo demo** — el de menor esfuerzo con mayor tráfico potencial.
3. Comparar apertura de chat desde `#casos` contra la línea base de 2–4 semanas.
4. Si mejora: construir el siguiente demo del grupo Core y repetir la medición.
5. Si no mejora: detener el catálogo y reasignar el esfuerzo a contenido o a casos reales.

Criterio de continuidad: el demo debe sostener su costo — si no mueve la conversión, no se
construye el siguiente.

## MVP Scope

### Core

Los seis tipos livianos y de mayor demanda. Un flujo operable cada uno.

| #   | Tipo                      | ID en SSOT           | Flujo que debe funcionar                               | Esfuerzo (base SSOT)                    |
| --- | ------------------------- | -------------------- | ------------------------------------------------------ | --------------------------------------- |
| 1   | Landing informativa       | `landing`            | Hero → bloque variable por rubro → formulario/WhatsApp | `LANDING_TIMELINE` — 1 semana por rubro |
| 2   | Blog                      | `blog`               | Alta de artículo → portada → detalle con metadatos SEO | `BLOG_TIMELINE` — 15 días               |
| 3   | Sitio corporativo         | `sitio-corporativo`  | 5 páginas navegables con contacto                      | `CORP_TIMELINE` — 1 mes, pocas páginas  |
| 4   | POS                       | `pos`                | Venta → cobro → descuento de stock → cierre de caja    | `OPS_TIMELINE` — 1 mes acotado          |
| 5   | E-commerce                | `ecommerce`          | Catálogo → carrito → checkout con pago móvil → pedido  | `OPS_TIMELINE` — 1 mes acotado          |
| 6   | Gestión pastelería/tienda | `gestion-pasteleria` | Encargo con fecha → producción → insumos → entrega     | `OPS_TIMELINE` — 1 mes acotado          |

El tipo 6 ya está anunciado en `Demos.tsx`; los tipos 4 y 5 son los sistemas de comercio
con mayor demanda potencial.

**Sobre las landings (tipo 1):** la variante por rubro es un multiplicador, no un tipo nuevo.
La ronda inicial construye **una** landing completa (barbería, rubro de reserva, el más
reconocible) y de ahí se derivan las demás cambiando solo el bloque variable y la paleta.
El catálogo completo de 20 rubros se construye incremental y nunca en un solo sprint.

### Later

- **ERP** (`erp`) — recortado a 2 módulos: inventario + compras, con reporte. Base `SYSTEM_TIMELINE`.
- **Sistema de turnos / gestión de consultorio** (`sistema-turnos`) — un flujo end-to-end
  (disponibilidad → reserva → confirmación → registro de atención) con variantes por
  especialidad (odontología, cardiología, veterinaria). Base `OPS_TIMELINE` acotado.
  Spec completa en `MAQUETA_LANDINGS.md` §4.1–4.2. Primera especialidad recomendada: odontología.
- **Sistema de estacionamiento** (`sistema-parking`) — flujo disponibilidad →
  reserva → cobro → cierre, con tablero de lugares y ticket con QR simulado.
  Base `OPS_TIMELINE` acotado. Spec en `MAQUETA_LANDINGS.md` §4.4.
- **App móvil** (`app-movil`) — demo enmarcada 390×844 con un
  flujo core completo (pedir → seguir → recibir). Base `SYSTEM_TIMELINE`.
  Spec en `MAQUETA_LANDINGS.md` §4.10.
- **Gestión de espacios publicitarios** (`gestion-publicidad`, ID propuesto) —
  inventario → disponibilidad → contratación → reporte de exposición.
  Base `SYSTEM_TIMELINE`. Spec en `MAQUETA_LANDINGS.md` §4.11.
- **Selector de tipo de proyecto** sobre una sola app: se construye cuando existan al menos
  3 demos y el shell esté probado.

### Never

- **Fintech — préstamos, inversiones, seguros** (`fintech-prestamos`, `fintech-inversiones`,
  `fintech-seguros`) como demos públicos. `Soluciones.tsx` declara que estas soluciones se
  construyen bajo NDA; publicar demos equivalentes contradice ese compromiso.
- Capturas estáticas o videos en sustitución de un sistema operable.
- Casos de estudio, logos, testimonios o métricas de clientes: no existen y no se inventan.
- Cualquier demo que requiera datos personales reales o escritura persistente.

## Catálogo por tipo de proyecto

Cada demo demuestra exactamente los módulos que el cuestionario de la SSOT pregunta para
ese tipo. La trazabilidad es deliberada: si el chat pregunta por un módulo, el demo debe
poder mostrarlo.

### 1. Landing informativa — `landing`

La landing es el único tipo que se multiplica por rubro, porque el rubro cambia el diseño,
la jerarquía de secciones y el copy — pero no cambia la arquitectura técnica. Un bloque
reutilizable resuelve los 20 rubros.

- **Concepto:** una landing informativa por rubro, cada una con su propia paleta, sus
  secciones priorizadas y su copy de ejemplo real, no `Lorem ipsum`.
- **Qué prueba:** que el estudio adapta identidad visual y jerarquía de contenido al
  negocio del cliente, no solo que sabe maquetar.
- **Doble uso:** cada landing es a la vez **demo** y **plantilla vendible** — el FAQ del
  sitio ya promete un "catálogo de plantillas profesionales" como vía 2 de 3. El mismo
  build cubre los dos fines. No hacerlo así desperdicia el activo.
- **Supuesto propio:** el visitante se reconoce en su rubro y eso vence la duda de
  "¿sabrán hacer lo mío?".
- **Riesgo primario:** 20 landings artesanales son 20 mantenimientos. Mitigación:
  composición por bloques (ver Sistema de diseño), no 16 diseños bespoke.

#### 1.1 Matriz de rubros

Cada rubro declara su paleta, las secciones que van primero, la conversión principal y el
detalle que delata que la landing fue pensada para ese negocio.

| #   | Rubro                     | Paleta (primario / acento / fondo)                      | Secciones prioritarias                                                                 | Conversión principal              | Detalle que lo delata                            |
| --- | ------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------ |
| 1   | Barbería                  | `#1F2937` grafito / `#C2410C` cobre / `#FFFFFF`         | Hero con foto real → Precios → Equipo → Galería de cortes → Reserva                    | Reserva de turno por WhatsApp     | Horarios por barbero y duración del servicio     |
| 2   | Panadería                 | `#92400E` horneado / `#F59E0B` dorado / `#FEF3C7` crema | Hero con producto → Catálogo del día → Historia → Pedidos por encargo → Ubicación      | Encargo anticipado                | Horneadas del día con hora de salida             |
| 3   | Pastelería                | `#9D174D` vino / `#FBCFE8` rosa / `#FFF7FB`             | Hero con torta → Catálogo por ocasión → Personalizados → Galería → Encargo             | Cotización de torta personalizada | Fechas mínimas de anticipación y porciones       |
| 4   | Restaurante               | `#7F1D1D` vino / `#EA580C` naranja / `#FFFFFF`          | Hero ambiente → Menú → Especialidades → Reservas → Ubicación y horarios                | Reserva de mesa                   | Menú por turno (desayuno, almuerzo, cena)        |
| 5   | Cafetería                 | `#78350F` espresso / `#D97706` caramelo / `#FAF5EF`     | Hero con barra → Carta de café → Origen del grano → Ambiente → Ubicación               | Visita al local o delivery        | Métodos de preparación disponibles               |
| 6   | Estética / Spa            | `#4C6B62` salvia / `#C9A227` dorado / `#F7F9F8`         | Hero sensorial → Tratamientos → Antes/después → Precios → Agenda                       | Agenda de cita                    | Duración y sesiones recomendadas por tratamiento |
| 7   | Gimnasio                  | `#111827` negro / `#84CC16` lima / `#F8FAFC`            | Hero con entrenamiento → Planes y precios → Disciplinas → Entrenadores → Prueba gratis | Clase de prueba gratuita          | Horarios por disciplina y cupos por clase        |
| 8   | Clínica / Dental          | `#0369A1` azul médico / `#7DD3FC` celeste / `#F0F9FF`   | Hero con credenciales → Especialidades → Equipo médico → Obras sociales → Cita         | Solicitud de cita                 | Seguros y coberturas aceptadas                   |
| 9   | Veterinaria               | `#166534` verde / `#FACC15` amarillo / `#F0FDF4`        | Hero con mascotas → Servicios → Equipo → Urgencias 24h → Cita                          | Cita o consulta de urgencia       | Horario de urgencias y especies atendidas        |
| 10  | Ferretería / Construcción | `#334155` acero / `#F97316` seguridad / `#FFFFFF`       | Hero con inventario → Categorías → Cotización por volumen → Despacho → Contacto        | Cotización por WhatsApp           | Despacho y venta al mayor                        |
| 11  | Moda / Boutique           | `#111827` negro / `#D4AF37` oro / `#FAFAF9`             | Hero editorial → Colección → Tallas y materiales → Envíos → Contacto                   | Consulta de producto              | Guía de tallas y política de cambios             |
| 12  | Inmobiliaria              | `#1E3A8A` azul confianza / `#B45309` tierra / `#FFFFFF` | Hero con propiedad → Propiedades destacadas → Zonas → Financiamiento → Contacto        | Agendar visita                    | Opciones de financiamiento y requisitos          |
| 13  | Abogados / Consultoría    | `#1E293B` grafito / `#A16207` oro sobrio / `#FFFFFF`    | Hero con especialidad → Áreas de práctica → Equipo → Casos por tipo → Consulta         | Consulta inicial                  | Áreas de práctica y jurisdicción                 |
| 14  | Escuela / Academia        | `#1E40AF` azul / `#F59E0B` ámbar / `#FFFBEB`            | Hero con resultado → Programas → Metodología → Docentes → Inscripción                  | Inscripción o clase muestra       | Duración, nivel y certificación por programa     |
| 15  | Turismo / Hotel           | `#0F766E` teal / `#FB923C` atardecer / `#F8FAFC`        | Hero con destino → Habitaciones → Experiencias → Tarifas → Reserva                     | Reserva directa                   | Temporadas, tarifas y qué incluye                |
| 16  | Taller / Automotriz       | `#18181B` negro / `#DC2626` motor / `#FFFFFF`           | Hero con servicio → Servicios → Diagnóstico → Marcas atendidas → Cita                  | Cita de diagnóstico               | Marcas y tiempos estimados por servicio          |
| 17  | Odontología               | `#0891B2` higiene / `#F59E0B` miel / `#F0FDFA`          | Hero credencial → Tratamientos con sesiones → Equipo → Obras sociales → Cita           | Agendar valoración                | Plan por piezas y financiación por tratamiento   |
| 18  | Cardiología               | `#1D4ED8` clínico / `#DC2626` latido / `#F8FAFC`        | Hero credencial → Estudios con preparación → Equipo → Obras sociales → Turno           | Solicitar turno                   | Preparación previa por estudio y subespecialidad |
| 19  | Bodega / Víveres          | `#9A3412` terracota / `#16A34A` fresco / `#FFF7ED` crema | Hero con oferta del día → Catálogo y ofertas → Delivery y pagos → Ubicación            | Pedido por WhatsApp               | Horario corrido, delivery en la zona y pago móvil |
| 20  | Estacionamiento           | `#172554` noche / `#FACC15` señalética / `#FFFFFF`      | Hero con disponibilidad → Tarifas → Seguridad → Mapa y accesos → Reserva               | Reservar lugar                    | Disponibilidad visible y tarifa hora/día/mes     |

Las medidas, tipografía, animaciones y CTA de los rubros 17–20 (y la ficha
completa de Veterinaria) viven en `MAQUETA_LANDINGS.md` §3.

#### 1.2 Esqueleto común y variación por rubro

Todos los rubros comparten el mismo orden técnico de bloques. Lo que cambia es la
**prioridad** y el **contenido** — nunca la estructura de componentes:

```
Navbar → Hero → [bloque variable según rubro] → Prueba social → Ubicación y horarios
      → CTA de contacto → Footer
```

El bloque variable es lo que hace que cada landing se sienta propia:

- **Rubros de reserva** (barbería, restaurante, estética, gimnasio, clínica, veterinaria,
  taller, odontología, cardiología, estacionamiento): el bloque variable es
  **Servicios con precio y duración**.
- **Rubros de catálogo** (panadería, pastelería, moda, ferretería, inmobiliaria, bodega):
  el bloque variable es **Grilla de productos o propiedades**.
- **Rubros de credenciales** (abogados, escuela): el bloque variable es
  **Áreas de práctica o programas**.
- **Rubros de destino** (cafetería, turismo): el bloque variable es **Experiencias o ambiente**.

Esto significa que los 20 rubros se construyen sobre **cuatro variantes de un solo bloque**.
Ese es el argumento técnico para que 20 landings sean viables en vez de una línea de producto.

#### 1.3 Qué se siembra en cada landing

- Nombre de negocio ficticio, creíble y local (nunca una marca real).
- Fotos: **no hay banco de imágenes propio**. Ver Not Doing para la restricción aplicable.
- Copy real por rubro, escrito para el negocio sembrado, no relleno.
- Un aviso visible de entorno de demostración, con la marca de RodSancTechs y acceso al chat.

### 2. Blog — `blog`

- **Concepto:** blog con panel de publicación y una entrada de ejemplo por cada objetivo
  (SEO, autoridad, noticias, comunidad).
- **Qué prueba:** que el cliente puede publicar sin depender de un desarrollador.
- **Módulos a mostrar:** alta/edición de artículo, portada con categorías, detalle con
  metadatos SEO, frecuencia de publicación declarada.
- **Supuesto propio:** la autogestión real convence más que la promesa de autogestión.
- **Riesgo primario:** esfuerzo percibido como "solo un blog". Mitigación: mostrar el
  resultado de SEO en la estructura, no solo la edición.
- **Spec de pantallas:** `MAQUETA_LANDINGS.md` §4.3 (portada, detalle con snippet simulado, panel/editor).

### 3. Sitio corporativo — `sitio-corporativo`

- **Concepto:** sitio de cinco páginas (inicio, nosotros, servicios, equipo, contacto)
  con navegación completa.
- **Qué prueba:** criterio de arquitectura de información y pulido multiuso.
- **Módulos a mostrar:** las cinco páginas del primer alcance de la SSOT, más el formulario
  de contacto con confirmación.
- **Supuesto propio:** el visitante evalúa el sitio corporativo por la navegación, no por la portada.
- **Riesgo primario:** solapamiento con el sitio real de RodSancTechs. Mitigación: usar un
  rubro ajeno al propio estudio.

### 4. POS — `pos`

- **Concepto:** punto de venta de un comercio de un solo local, con rubro y línea de
  negocio configurables.
- **Qué prueba:** que el cobro y el stock están resueltos de verdad.
- **Módulos a mostrar:** venta rápida y cobro, pedidos, inventario, roles (cajero, dueño,
  almacén, vendedor de piso), sucursales y puntos de cobro, cierre de caja.
- **Supuesto propio:** el dueño decide al ver el cierre de caja funcionando, no la pantalla de venta.
- **Riesgo primario:** el rubro sembrado puede no representar al visitante. Mitigación:
  rubro y línea de negocio conmutables.

### 5. E-commerce — `ecommerce`

- **Concepto:** tienda con catálogo acotado y checkout con los medios de pago que la SSOT
  releva para el mercado.
- **Qué prueba:** que la venta en línea llega hasta el pedido confirmado, no hasta el carrito.
- **Módulos a mostrar:** catálogo, carrito, checkout con pago móvil, transferencia, tarjeta
  y contraentrega, pedidos, sincronización de stock, escalas de catálogo (menos de 50,
  50–200, más de 200).
- **Supuesto propio:** el visitante vende hoy por WhatsApp y necesita ver el pedido confirmado.
- **Riesgo primario:** simular pagos sin integrar una pasarela real puede leerse como humo.
  Mitigación: declarar el estado de sandbox de forma explícita y visible.

### 6. Gestión pastelería/tienda — `gestion-pasteleria`

- **Concepto:** operación completa de una pastelería, desde el encargo hasta la entrega.
- **Qué prueba:** que el sistema entiende el negocio, no solo la venta.
- **Módulos a mostrar:** encargos, producción, insumos, entregas, pedidos personalizados
  por frecuencia, roles de mostrador, producción y delivery.
- **Supuesto propio:** la pastelería es el rubro más identificable del mercado local y el
  demo más memorable.
- **Riesgo primario:** el flujo de recetas e insumos puede volverse un ERP. Mitigación:
  un encargo completo, sin costeo ni compras.

### 7. ERP — `erp` (Later)

- **Concepto:** MVP de dos módulos, inventario y compras, con un reporte consolidado.
- **Qué prueba:** profundidad operativa y modelado de datos serio.
- **Módulos a mostrar:** inventario, compras, y el área prioritaria seleccionable; tipos de
  negocio sembrados (comercio, distribución, taller, servicios, alimentos, salud).
- **Supuesto propio:** un MVP de dos módulos demuestra más que una maqueta de siete.
- **Riesgo primario:** expectativa de ERP completo. Mitigación: alcance visible y explícito
  en la propia interfaz.

### 8–10. Fintech — préstamos / inversiones / seguros (Never público)

- **Concepto:** no se publican como demo abierto. Se mantienen como conversación privada
  bajo NDA, coherente con `Soluciones.tsx`.
- **Módulos que sí se pueden mostrar en una llamada:** solicitudes, cálculo de cuotas,
  cartera y estados de cuenta; portafolios, rendimientos y reportes; pólizas, siniestros,
  renovaciones y comisiones.
- **Riesgo primario:** la tarjeta "Panel de Préstamos" en `Demos.tsx` insinúa un demo
  público que no existe. Mitigación: reformularla como invitación a la llamada, no como demo.

### 11. App móvil — `app-movil` (Later)

- **Concepto:** demo enmarcada de una app de servicios con un flujo core
  operable, no una landing "mobile-friendly".
- **Qué prueba:** que el estudio construye experiencia móvil real (tabs,
  gestos, estados), no solo web responsive.
- **Módulos a mostrar:** onboarding, home, flujo de solicitud con seguimiento,
  cuenta e historial.
- **Supuesto propio:** el visitante distingue una app de verdad de una web
  angosta al primer scroll.
- **Riesgo primario:** expectativa de app publicada en tiendas. Mitigación:
  marco de demo explícito y una sola plataforma.

### 12. Gestión de publicidad — `gestion-publicidad` (Later, ID propuesto pendiente de alta en SSOT)

- **Concepto:** sistema que administra espacios publicitarios físicos y pauta
  digital, desde el inventario hasta el reporte.
- **Qué prueba:** que el estudio modela negocio de medios (espacios, períodos,
  exposición), no solo comercio.
- **Módulos a mostrar:** espacios con zona y medidas, calendario de
  disponibilidad, contratación con orden, reporte de exposición.
- **Supuesto propio:** el dueño de medios decide al ver su inventario
  calendarizado, no una grilla genérica.
- **Riesgo primario:** confundirlo con un ERP. Mitigación: el objeto central
  es el espacio pautado, no el stock.

## Sistema de diseño del catálogo

Las 20 landings no se diseñan por separado. Se construyen con una **librería de bloques
reutilizables** y **tokens de paleta por rubro**. Esto es lo que hace viable el catálogo
completo para un estudio de dos personas.

### Librería de bloques

Cada bloque es un componente con contenido inyectable. El orden se compone por rubro:

| Bloque              | Qué resuelve                                       | Aparece en                     |
| ------------------- | -------------------------------------------------- | ------------------------------ |
| `Hero`              | Propuesta de valor + CTA principal                 | Todos                          |
| `ServiciosPrecio`   | Lista de servicios con precio y duración           | Rubros de reserva              |
| `GrillaCatalogo`    | Productos o propiedades en tarjetas                | Rubros de catálogo             |
| `AreasPractica`     | Áreas, programas o disciplinas                     | Rubros de credenciales         |
| `Experiencias`      | Ambiente, destinos o métodos                       | Rubros de destino              |
| `Equipo`            | Personas con rol y credencial                      | Todos                          |
| `Galeria`           | Grilla de imágenes o trabajos                      | Barbería, pastelería, estética |
| `PruebaSocial`      | Reseñas y reconocimientos declarados               | Todos                          |
| `UbicacionHorarios` | Mapa o zona + horarios + contacto                  | Todos                          |
| `FaqRubro`          | 3–5 preguntas típicas del rubro                    | Todos                          |
| `CtaContacto`       | Formulario o WhatsApp con confirmación             | Todos                          |
| `NavbarDemo`        | Marca del negocio sembrado, no de RodSancTechs     | Todos                          |
| `FooterDemo`        | Datos sembrados + aviso de entorno de demostración | Todos                          |

### Tokens de paleta por rubro

La paleta se define una vez por rubro y el shell del demo la consume. El shell (header de
demostración, chat, navegación entre demos) mantiene **siempre** la marca de RodSancTechs;
solo el cuerpo de la landing cambia de color.

```
--drop-primary    # primario del rubro       (navbar, botones, titulares)
--drop-accent     # acento del rubro          (detalles, hover, iconos)
--drop-surface    # fondo del rubro           (secciones alternas)
```

Los valores concretos están en la matriz de rubros (1.1). Ninguno se muestra como texto
visible en pantalla; son tokens de CSS. Las medidas, tipografía, animaciones y CTA de
cada rubro viven en `MAQUETA_LANDINGS.md`; las fichas de los 16 rubros originales se
completan ahí a medida que se construyen.

### Reglas de diseño heredadas

Estas vienen de `PLAN_RRSS_30_DIAS.md` y aplican a cada landing del catálogo:

- Nunca renderizar un código hex como texto visible.
- Ortografía en español impecable: la falta de tilde delata descuido en un demo de diseño.
- Nada de foto corporativa genérica. Si no hay imagen propia del rubro, usar composición
  tipográfica o ilustración, no un banco de imágenes ajeno.
- El software (POS, e-commerce, pastelería) se muestra **como software real corriendo**:
  chrome de navegador, barra de URL, candado SSL, datos legibles. Nunca una captura plana.
- Línea de gradiente de marca en el shell de demostración.

## Not Doing

- No construir diez demos en paralelo.
- No publicar capturas ni videos como sustituto de un demo operable.
- No inventar casos de estudio, logos, testimonios ni métricas.
- No introducir un backend de escritura persistente para los demos.
- No reescribir las secciones `Demos`, `Soluciones` ni el flujo del chat como parte de este alcance.
- No incluir los tipos fintech en el catálogo público.

## Open Questions

1. **No existe línea base de conversión** en `#casos`. Sin ella, la mejora atribuible al
   demo es indetectable. Requiere instrumentación previa.
2. **Presupuesto de tiempo semanal** para demos. Con las duraciones de la propia SSOT, los
   seis demos Core equivalen a varios meses de trabajo. El ritmo real determina si el Core
   es alcanzable o si se reduce a dos demos.
3. **Dónde vive el catálogo:** aplicación separada o rutas dentro de esta landing. Cambia
   el esfuerzo, el deploy y el modelo de acceso.
4. **Alcance de la interacción:** ¿el visitante solo ejecuta flujos permitidos, o también
   puede editar datos sembrados? Afecta el costo de cada demo.
5. **Qué pasa con el gate actual** ("solicitar demo privada") en `Demos.tsx`: se reemplaza
   o convive con el acceso directo.
6. **Nombre e identidad de los negocios sembrados:** ¿nombres ficticios neutros o un
   namespace reutilizable tipo "Demo Barbería"? Afecta la credibilidad del demo.
7. **Cuántos rubros son el mínimo creíble:** 4, 8 o los 20. Cada rubro extra es 1 semana
   de SSOT. El valor de la cobertura debe justificar el costo.
8. **Las landings por rubro, ¿son plantillas vendibles?** El FAQ ya lo promete. Confirmar
   si el catálogo y el producto de plantillas son el mismo activo o dos artefactos separados.
9. **Cómo se selecciona el rubro en el demo:** por ruta, por query param o por menú del
   shell. Cambia el esfuerzo de la variante por rubro.
10. **Alta de `gestion-publicidad` en la SSOT:** unión de intenciones,
    `closingSteps`, modalidad y timeline en `src/lib/faq_brief_questions.ts` + lista
    en `src/hooks/useChat.ts`. (`app-movil` ya fue dada de alta.) Es trabajo de código
    separado; hasta hacerlo, el ID es propuesto y el chat no lo ofrece.

## Readiness Score

| Dimensión             | Nivel  |
| --------------------- | ------ |
| Problem Clarity       | High   |
| User Value            | High   |
| Technical Feasibility | High   |
| Business Viability    | Medium |
| Differentiation       | High   |
| Risk                  | Medium |
| MVP Clarity           | Medium |

**Overall: 72% — Needs Validation.**

El problema, el usuario y la dirección están resueltos. La factibilidad técnica subió: la
matriz de rubros, el esqueleto de bloques y los tokens de paleta convierten "16 landings"
de una línea de producto en cuatro variantes de un bloque sobre una librería de componentes.
Eso es concreto y construible.

Lo que sigue faltando es lo mismo que antes, más una decisión nueva: el presupuesto de
tiempo real, la línea base de conversión, y **cuántos rubros son el mínimo creíble**. Hasta
resolver eso, ninguna landing debe empezar a construirse.
