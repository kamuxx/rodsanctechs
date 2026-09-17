# Maquetación de landings por rubro — RodSancTechs

> Spec de construcción de las landings del catálogo: medidas, tipografía,
> animaciones y CTA por rubro, más el alcance de los sistemas médicos operables.
> Documento de trabajo, no de decisión: las decisiones viven en `proyectos.md`
> (§1 Matriz de rubros, Sistema de diseño, MVP Scope). Este fichero detalla el
> **cómo**; `proyectos.md` define el **qué y el porqué**.
> Estado: propuesta. Nada de lo aquí descrito existe todavía.

---

## 0. Cómo leer una ficha

Cada rubro nuevo tiene una ficha con la misma plantilla:

```
Clasificación → variante del bloque variable (ver proyectos.md §1.2)
Paleta → tokens --drop-* más hover/focus derivados
Tipografía → familia de titulares + familia de cuerpo (Google Fonts)
Composición → secciones en orden, con alto desktop / alto mobile
Animaciones → patrones del catálogo cerrado (§1.4) y dónde aplican
CTA → primario, secundario, flotante y sticky móvil
Hero sin foto → qué se muestra cuando no hay imagen propia (regla heredada:
  composición tipográfica o ilustración, nunca banco genérico)
Detalle → lo que delata que la landing fue pensada para ese negocio
```

Los 16 rubros originales de la matriz mantienen su paleta y secciones
prioritarias en `proyectos.md` §1.1; sus fichas completas se agregan aquí
a medida que se construyen, empezando por Veterinaria (§3.3).

---

## 1. Especificación global

Vale para las 20 landings. Ningún rubro inventa breakpoints, escala
tipográfica ni patrones de animación: elige dentro de este sistema.

### 1.1 Breakpoints y contenedor

| Rango   | Ancho        | Contenedor       | Padding lateral | Columnas |
| ------- | ------------ | ---------------- | --------------- | -------- |
| Mobile  | `< 640px`    | Fluido           | 24px            | 4        |
| Tablet  | 640–1023px   | Fluido           | 40px            | 8        |
| Desktop | 1024–1439px  | Máx 1200px       | 64px            | 12       |
| Wide    | `≥ 1440px`   | Máx 1200px fijo  | auto            | 12       |

### 1.2 Ritmo vertical y alturas por bloque

Padding estándar de sección: **96px** vertical en desktop, **64px** en mobile.
El alto total de cada bloque es padding × 2 + contenido. Alturas mínimas:

| Bloque              | Desktop            | Mobile               | Notas                                   |
| ------------------- | ------------------ | -------------------- | --------------------------------------- |
| `NavbarDemo`        | 72px, sticky       | 64px, sticky         | Marca del negocio sembrado              |
| `Hero`              | Mín 760px, máx 90vh| Mín 560px, apilado   | Sin padding superior (bajo navbar)      |
| `ServiciosPrecio`   | Mín 640px          | Auto, tarjetas pila  | 3–4 tarjetas con precio y duración      |
| `GrillaCatalogo`    | Mín 720px          | Auto, 1 columna      | 2 filas × 3 tarjetas                    |
| `AreasPractica`     | Mín 560px          | Auto, acordeón       | En mobile colapsa a acordeón            |
| `Experiencias`      | Mín 600px          | Auto, carrusel       | Con media o ilustración                 |
| `Equipo`            | Mín 520px          | Auto, 1 columna      | 3–4 perfiles con rol y credencial       |
| `Galeria`           | Mín 560px          | Auto, carrusel       | Solo rubros donde aplica                |
| `PruebaSocial`      | 440–520px          | Auto                 | Padding reducido: 80px desktop          |
| `UbicacionHorarios` | Mín 560px          | Auto, mapa arriba    | Mapa o zona de 320–360px de alto        |
| `FaqRubro`          | Mín 480px          | Auto, acordeón       | 3–5 preguntas típicas del rubro         |
| `CtaContacto`       | Mín 480px          | Mín 520px            | Formulario o WhatsApp con confirmación  |
| `FooterDemo`        | Mín 240px          | Auto                 | Datos sembrados + aviso de demo         |
| CTA flotante        | 60px diámetro      | 56px diámetro        | Abajo derecha, 24px de margen           |

Largo total orientativo por landing: 3.500–4.200px en desktop.

### 1.3 Escala tipográfica

Máximo **2 familias** por landing (titulares + cuerpo), Google Fonts,
`font-display: swap`, máximo 4 pesos cargados.

| Nivel   | Desktop / Mobile | Interlineado | Uso                          |
| ------- | ---------------- | ------------ | ---------------------------- |
| Display | 56px / 40px      | 1.05         | Hero, una sola vez           |
| H1      | 44px / 34px      | 1.1          | Título de sección principal  |
| H2      | 36px / 28px      | 1.15         | Títulos de sección           |
| H3      | 28px / 23px      | 1.2          | Tarjetas y subsecciones      |
| Lead    | 20px / 18px      | 1.5          | Bajada del hero              |
| Body    | 17px / 16px      | 1.6          | Párrafos                     |
| Small   | 15px / 14px      | 1.5          | Precios secundarios, metas   |
| Caption | 13px / 12px      | 1.4          | Avisos, horarios, legales    |

### 1.4 Catálogo de animaciones (cerrado)

No se inventan animaciones por rubro. Cada ficha elige hasta 3 patrones
(A6 no cuenta, es funcional):

| ID  | Patrón          | Spec                                                        | Dónde se usa                        |
| --- | --------------- | ----------------------------------------------------------- | ----------------------------------- |
| A0  | Entrada hero    | Fade-up 700ms ease-out, una vez al cargar                   | Contenido del hero                  |
| A1  | Fade-up scroll  | translateY 24→0px, 600ms ease-out, dispara al 20% visible   | Títulos y bloques de sección        |
| A2  | Stagger         | A1 por tarjeta con delay +80ms c/u, máx 6                   | Grillas y listas                    |
| A3  | Parallax leve   | Media con translateY máx 8%, solo desktop                   | Fondo o imagen del hero             |
| A4  | Hover lift      | translateY −4px + sombra, 180ms ease                        | Tarjetas y CTA secundario           |
| A5  | Mask reveal     | clip-path sobre media, 900ms, una vez por landing           | Media principal del hero            |
| A6  | Pulso flotante  | Sombra pulsante cada 3s hasta el primer scroll              | CTA flotante de WhatsApp            |

Regla dura: con `prefers-reduced-motion`, todo queda estático.

### 1.5 Anatomía del CTA

- **Primario:** 52px de alto en desktop / 48px en mobile, padding horizontal
  28px, radio 12px (salvo token del rubro), peso 600, área táctil mínima 44px.
- **Secundario:** variante fantasma con borde de 1.5px, misma altura.
- **Copy:** verbo + beneficio, nunca genérico. Ejemplos: "Reservar turno",
  "Agendar valoración", "Cotizar por WhatsApp", "Reservar lugar".
- **Flotante de WhatsApp:** presente en todas las landings, entra a los 800ms.
- **Sticky móvil:** barra inferior con el CTA primario solo en rubros de
  reserva inmediata (lo define cada ficha). Desaparece al llegar al `CtaContacto`.

### 1.6 Color y accesibilidad

- Hover del primario: oscurecer 12%. Focus visible: anillo de 3px en acento.
- Deshabilitado: opacidad 50%, sin eventos.
- Contraste texto/fondo mínimo 4.5:1 (AA). El acento nunca porta texto
  funcional salvo que cumpla AA sobre su fondo.
- Los hex viven solo en tokens CSS y en este documento; jamás como texto
  visible en la landing (regla heredada).

---

## 2. Esqueleto común

El orden técnico es el de `proyectos.md` §1.2, con `FaqRubro` explícito
(la librería lo declara para todos):

```
Navbar → Hero → [bloque variable] → [Equipo / Galeria según rubro]
      → Prueba social → Ubicación y horarios → FAQ → CTA contacto → Footer
```

---

## 3. Fichas por rubro

### 3.1 R-17 Odontología — `landing-odonto`

- **Clasificación:** reserva (`ServiciosPrecio`).
- **Paleta:** primario `#0891B2` higiene / acento `#F59E0B` miel /
  fondo `#F0FDFA`. Hover primario `#0E7490`.
- **Tipografía:** titulares Manrope 600/700 · cuerpo Inter 400/500.
  Tono clínico moderno: transmite calma frente al miedo al dolor.
- **Composición:**
  1. `NavbarDemo` 72/64
  2. `Hero` credencial + tarjeta de sonrisa ilustrada — 760/560 · A0 + A5 · CTA "Agendar valoración"
  3. `ServiciosPrecio`: limpieza, ortodoncia, implantes, diseño de sonrisa (precio + sesiones) — 640 · A1 + A2
  4. `Equipo`: odontólogos con matrícula — 520 · A1
  5. `PruebaSocial`: reseñas declaradas — 480 · A1
  6. `UbicacionHorarios` + obras sociales y prepagas — 560
  7. `FaqRubro`: dolor, sesiones, financiación — 480
  8. `CtaContacto`: formulario + WhatsApp — 480
  9. `FooterDemo` — 240
- **CTA:** primario "Agendar valoración" (hero, servicios, sticky móvil).
  Secundario "Consultar financiación". Flotante sí.
- **Hero sin foto:** composición tipográfica + tarjeta ilustrada de
  antes/después esquemática (sin rostros reales).
- **Detalle que lo delata:** plan por piezas y financiación por tratamiento.

### 3.2 R-18 Cardiología — `landing-cardio`

- **Clasificación:** reserva (`ServiciosPrecio`).
- **Paleta:** primario `#1D4ED8` clínico / acento `#DC2626` latido /
  fondo `#F8FAFC`. Hover primario `#1E40AF`. El rojo solo en iconos y
  detalles, nunca en superficies grandes.
- **Tipografía:** titulares Libre Franklin 600/700 · cuerpo Inter 400/500.
  Tono sobrio y riguroso: aquí nada es lúdico.
- **Composición:**
  1. `NavbarDemo` 72/64
  2. `Hero` credencial + línea de pulso ECG en SVG sutil — 720/560 · A0 · CTA "Solicitar turno"
  3. `ServiciosPrecio`: ECG, ergometría, holter, ecodoppler (duración + preparación) — 640 · A1 + A2
  4. `Equipo`: cardiólogos con subespecialidad — 520 · A1
  5. `PruebaSocial`: trayectoria y afiliaciones declaradas — 480 · A1
  6. `UbicacionHorarios` + obras sociales destacadas — 560
  7. `FaqRubro`: preparación por estudio, entrega de resultados — 480
  8. `CtaContacto`: formulario + WhatsApp — 480
  9. `FooterDemo` — 240
- **Animaciones:** solo A1 + A2. Sin parallax ni reveals: la sobriedad
  es parte del mensaje.
- **CTA:** primario "Solicitar turno" (hero, estudios, sticky móvil).
  Secundario "Ver preparación de estudios". Flotante sí.
- **Hero sin foto:** composición tipográfica + línea ECG dibujada en SVG.
- **Detalle que lo delata:** preparación previa por estudio y subespecialidad
  visible junto a cada profesional.

### 3.3 R-09 Veterinaria — `landing-vet`

- **Clasificación:** reserva (`ServiciosPrecio`).
- **Paleta:** primario `#166534` / acento `#FACC15` / fondo `#F0FDF4`
  (de la matriz, §1.1 de `proyectos.md`). Hover primario `#14532D`.
- **Tipografía:** titulares Nunito Sans 700/800 · cuerpo Inter 400/500.
  Tono cálido y cercano: la redondez acerca, el verde da confianza sanitaria.
- **Composición:**
  1. `NavbarDemo` 72/64
  2. `Hero` con mascotas ilustradas — 760/560 · A0 + A5 · CTA "Pedir cita"
  3. `ServiciosPrecio`: consulta, vacunación, cirugía, peluquería (precio + duración) — 640 · A1 + A2
  4. Franja de urgencias 24h full-width con teléfono — 120px fijos · sin animación
  5. `Equipo`: veterinarios + especialidad — 520 · A1
  6. `PruebaSocial`: reseñas declaradas — 480 · A1
  7. `UbicacionHorarios` + especies atendidas — 560
  8. `FaqRubro`: urgencias, vacunación, internación — 480
  9. `CtaContacto`: formulario + WhatsApp — 480
  10. `FooterDemo` — 240
- **CTA:** primario "Pedir cita" (hero, servicios, sticky móvil).
  La franja de urgencias lleva su propio CTA telefónico permanente.
  Secundario "Consultar urgencia". Flotante sí.
- **Hero sin foto:** ilustración de mascotas, nunca foto genérica de stock.
- **Detalle que lo delata:** horario de urgencias y especies atendidas
  visibles sin hacer scroll profundo.

### 3.4 R-19 Bodega / Víveres — `landing-bodega`

- **Clasificación:** catálogo (`GrillaCatalogo`) + destino (`Experiencias`:
  delivery, pagos y encargos).
- **Paleta:** primario `#9A3412` terracota / acento `#16A34A` fresco /
  fondo `#FFF7ED` crema. Hover primario `#7C2D12`. Tono de abasto popular:
  precio legible, frescura visible, cero pretensión.
- **Tipografía:** titulares Barlow 600/700/800 · cuerpo Inter 400/500.
  Tono de cartel de oferta: titulares compactos y grandes, cuerpo neutro.
- **Composición:**
  1. `NavbarDemo` 72/64
  2. `Hero` con oferta del día + horario ("Abierto hoy 7am–9pm") — 640/520 · A0 · CTA "Pedir por WhatsApp"
  3. `GrillaCatalogo`: categorías (víveres, lácteos, limpieza, pan) + ofertas con precio grande — 720 · A1 + A2
  4. `Experiencias`: delivery en la zona, pago móvil, encargos — 560 · A1
  5. `PruebaSocial`: reconocimiento del barrio declarado — 440 · A1
  6. `UbicacionHorarios`: dirección + horario corrido — 560
  7. `FaqRubro`: monto mínimo de delivery, métodos de pago, encargos — 480
  8. `CtaContacto`: pedido por WhatsApp con confirmación — 480
  9. `FooterDemo` — 240
- **Animaciones:** A1 + A2 + A4, dentro del catálogo cerrado y del límite de
  3 patrones. A4 vive en las tarjetas de oferta: el precio levanta al hover
  e invita al clic. Sin A3 ni A5: aquí la velocidad de lectura manda.
- **CTA:** primario "Pedir por WhatsApp" (hero, ofertas, sticky móvil).
  Secundario "Ver ofertas del día". Flotante sí.
- **Hero sin foto:** composición tipográfica + tarjeta de oferta del día con
  precio grande, como cartel de bodega.
- **Detalle que lo delata:** horario corrido, delivery en la zona, pago móvil
  y ofertas del día con precio a la vista.

### 3.5 R-20 Estacionamiento — `landing-parking`

- **Clasificación:** reserva (`ServiciosPrecio`: tarifario) + destino
  (`Experiencias`: seguridad y comodidades).
- **Paleta:** primario `#172554` noche / acento `#FACC15` señalética /
  fondo `#FFFFFF` (alterno `#F1F5F9`). Hover primario `#1E3A8A`.
  Tono utilitario de señalización: alto contraste, cero decoración.
- **Tipografía:** titulares Archivo 700/800 · cuerpo Inter 400/500.
- **Composición:**
  1. `NavbarDemo` 72/64
  2. `Hero` utilitario con disponibilidad sembrada ("128 lugares libres") — 640/520 · A0 · CTA "Reservar lugar"
  3. `ServiciosPrecio`: hora, día, mes, lavado (precio) — 560 · A1 + A2
  4. `Experiencias`: seguridad (cámaras, techado, seguro) y comodidades — 560 · A1
  5. `UbicacionHorarios`: mapa dominante + accesos — 600
  6. `FaqRubro`: altura máxima, mensualidad, estadía — 480
  7. `CtaContacto`: reserva + WhatsApp — 480
  8. `FooterDemo` — 240
- **CTA:** primario "Reservar lugar" (hero, tarifas, sticky móvil).
  Secundario "Ver tarifas". Flotante sí.
- **Hero sin foto:** composición tipográfica + marcador de disponibilidad;
  el dato en vivo (sembrado) es el protagonista.
- **Detalle que lo delata:** disponibilidad visible y tarifa hora/día/mes
  sin pedirla por chat.

---

## 4. Fichas de sistemas operables

Las landings persuaden; los sistemas se operan. Modo Operate: escaneabilidad,
consistencia, estados explícitos y cero animación decorativa. Cada sistema se
especifica con esta plantilla:

```
Vistas → layout y medidas por vista → componentes → estados
(vacío / carga / error / éxito) → acciones por vista → roles →
datos sembrados → límites
```

### 4.0 Spec global de app demo

Vale para todos los sistemas del catálogo:

- **Shell demo:** barra superior de 56px con marca RodSancTechs, aviso visible
  "Entorno de demostración", selector de rol, botón "Reiniciar datos" y enlace
  al chat. El shell mantiene siempre la marca; solo el contenido cambia.
- **Chrome de navegador:** barra de URL ficticia (`demo.rodsanctechs/...`) +
  candado SSL, datos legibles. Nunca captura plana (regla heredada).
- **Layout:** sidebar de 248px en desktop (colapsa a 72px de iconos en tablet),
  bottom-nav en mobile. Topbar interna de 64px con título + acción primaria.
  Contenido máx 1280px, padding 32/24/16px.
- **Tablas:** fila de 52px, header fijo, hover sin zebra. En mobile colapsan
  a tarjetas.
- **Formularios:** label 13px semibold, input de 48px, error en rojo con
  mensaje, confirmación explícita (toast + cambio de estado).
- **Estados obligatorios por vista:** vacío (ilustración + CTA), carga
  (skeleton), error (reintentar), éxito (confirmación visible).
- **Movimiento:** transiciones de 150–200ms. Nada más.
- **Datos:** sembrados, reiniciables, no persistentes.

### 4.1 `sistema-turnos` — gestión de consultorio (Later)

Doble salida de salud: landing (§3) + sistema (aquí). Un flujo end-to-end:
**disponibilidad → reserva → confirmación → registro de atención → ficha**.

- **Módulos:** Agenda (día/semana por profesional, estados pendiente /
  confirmado / atendido / cancelado), Pacientes (ficha básica + historial;
  en veterinaria la ficha es de la mascota), Turnos (alta, reprogramación,
  cancelación), Recordatorios simulados, Obras sociales y precios editables,
  Reporte del día.
- **Roles:** recepción (crea turnos), profesional (atiende y registra), admin
  (horarios, precios, coberturas). Selector visible, sin login real.
- **Variantes sembradas:** odontología (sillones, plan por piezas en lista,
  presupuesto; primera recomendada), cardiología (estudios con preparación,
  resultados con estado), veterinaria (especies, carnet de vacunación, triage
  de 3 niveles).
- **Límites:** sin historia clínica completa, sin firma digital, sin
  facturación fiscal, sin integración real con obras sociales, sin datos
  personales reales.

### 4.2 `sistema-turnos` — pantallas

- **V1 Agenda:** grilla día (columna hora 64px, slots de 48px) o semana
  (7 columnas); color por estado; CTA "+ Nuevo turno". Mobile: lista
  cronológica.
- **V2 Turno (alta):** modal de 560px (mobile full-screen): paciente,
  profesional, fecha/hora, motivo, obra social → confirmar → queda pendiente
  con recordatorio "simulado".
- **V3 Pacientes:** tabla (nombre, contacto, último turno) + ficha lateral
  de 380px con historial.
- **V4 Reporte del día:** 3 KPI (atendidos, ausentes, recaudación simulada)
  + tabla de turnos.

### 4.3 `blog` — alcance y pantallas

Flujo: **alta de artículo → portada → detalle con metadatos SEO**.

- **V1 Portada:** cabecera editorial de 320px + grilla de 3 columnas
  (cover 16:9, categoría, título, extracto, fecha) + filtro por categorías.
- **V2 Detalle:** columna de 720px, H1, meta (autor, fecha, min. lectura),
  cover, cuerpo 18px/1.7 + tarjeta "Cómo se ve en Google" (snippet simulado:
  título, URL, descripción). Esa tarjeta es la prueba de SEO.
- **V3 Panel:** tabla (título, estado borrador/publicado, fecha) + editor
  (título, slug automático, extracto 160 car., cover, cuerpo, botón Publicar
  → confirmación y aparición en portada).
- **Roles:** editor, admin. **Límites:** sin comentarios, sin multiusuario real.

### 4.4 `sistema-parking` — gestión de estacionamiento (Later)

Doble salida de parking: landing R-20 (§3.5) + sistema (aquí). Flujo:
**disponibilidad → reserva → cobro → cierre**.

- **V1 Tablero:** grilla de lugares (celda 72px; libre / ocupado / reservado),
  contador de libres, filtro por zona. Mobile: contador + lista por zona.
- **V2 Reserva:** placa + tipo de vehículo + tiempo estimado → ticket con
  código y QR simulado.
- **V3 Cobro:** ticket → tarifa hora/día/mes + medio de pago simulado →
  comprobante.
- **V4 Cierre:** ocupación %, recaudación por tarifa, tickets del turno.
- **Roles:** operador, admin. **Límites:** sin barreras ni cámaras reales,
  sin pago real.

### 4.5 `pos` — pantallas

Flujo: **venta → cobro → descuento de stock → cierre de caja**.

- **V1 Venta:** grilla de productos (celda 120px, búsqueda + categorías) +
  ticket lateral de 360px (líneas, cantidad, total) + CTA "Cobrar".
- **V2 Cobro:** modal de 480px: total, medio (efectivo / pago móvil / tarjeta),
  monto recibido + cambio → confirmar → descuenta stock.
- **V3 Pedidos:** tabla (n.º, items, estado), si aplica al rubro sembrado.
- **V4 Inventario:** tabla (producto, stock, mínimo) con alerta de bajo stock.
- **V5 Cierre de caja:** ventas del turno por medio de pago + diferencia →
  "Cerrar caja". Esta vista es la que decide al dueño.
- **Roles:** cajero (venta/cobro), dueño (todo + cierre), almacén (inventario),
  vendedor de piso (pedidos). Rubro y línea de negocio conmutables.
- **Límites:** un solo local, sin factura fiscal, sin hardware real.

### 4.6 `ecommerce` — pantallas

Flujo: **catálogo → carrito → checkout → pedido confirmado**.

- **V1 Catálogo:** grilla de 4 col (foto, nombre, precio, stock) + filtros.
  Escalas declaradas: <50, 50–200, >200 productos.
- **V2 Carrito:** líneas + cantidades + total + CTA "Finalizar compra".
- **V3 Checkout:** datos + medio (pago móvil, transferencia, tarjeta,
  contraentrega) con sandbox visible → confirmar → n.º de pedido.
- **V4 Pedidos:** tabla (n.º, estado, total) + sincronización de stock visible.
- **Límites:** pagos en sandbox declarado, sin pasarela real.

### 4.7 `sitio-corporativo` — pantallas

Cinco páginas navegables: **Inicio → Nosotros → Servicios → Equipo →
Contacto**, con nav completa y formulario de contacto con confirmación.
Rubro sembrado ajeno al estudio (evita solaparse con el sitio real).
**Límites:** contenido fijo sembrado, sin CMS (lo autogestionable lo prueba el blog).

### 4.8 `gestion-pasteleria` — pantallas

Flujo: **encargo con fecha → producción → insumos → entrega**.

- **V1 Encargos:** tabla/calendario (cliente, torta, porciones, fecha, anticipo, estado).
- **V2 Encargo (alta):** formulario (ocasión, porciones, fecha con mínimo
  validado, personalización) → confirmar.
- **V3 Producción:** tablero por estado (pendiente / en horno / decorando / listo).
- **V4 Insumos:** tabla con descuento al producir. Sin costeo ni compras (límite).
- **V5 Entregas:** lista del día con check de entrega.
- **Roles:** mostrador, producción, delivery.

### 4.9 `erp` — pantallas (MVP de 2 módulos)

- **V1 Inventario:** tabla (SKU, descripción, stock, mínimo, ubicación) + alertas.
- **V2 Compras:** órdenes (proveedor, items, pendiente/recibida) → recibir
  actualiza stock.
- **V3 Reporte:** consolidado (stock valorizado simulado, compras del mes).
- Alcance visible en la propia interfaz ("MVP: 2 módulos"). Tipos de negocio
  sembrados conmutables. **Límites:** sin contabilidad, sin nómina.

### 4.10 `app-movil` — alcance y pantallas (Later)

- **Concepto:** demo de app en marco de dispositivo 390×844: un flujo core
  completo de una app de servicios (pedir → seguir → recibir). Una plataforma
  (Android primero, por mercado). Base `SYSTEM_TIMELINE`.
- **Vertical sembrada conmutable:** restaurante, delivery, marketplace o fintech,
  coherente con el caso de uso que declara el cuestionario.
- **V1 Onboarding:** 3 slides máx + permisos (ubicación, notificaciones).
- **V2 Home:** servicios + estado actual del pedido.
- **V3 Flujo core:** solicitud → seguimiento en vivo simulado → confirmación.
- **V4 Cuenta:** perfil + historial.
- Bottom-nav de 4 tabs, touch mínimo 48px, gestos simulados (volver,
  pull-to-refresh).
- **Límites:** sin build nativo (demo web enmarcada), sin push real, sin tiendas.

### 4.11 `gestion-publicidad` — alcance y pantallas (Later, ID propuesto)

- **Concepto:** sistema que administra espacios publicitarios (vallas,
  pantallas, mupis) y pauta en medios digitales. Flujo: **inventario →
  disponibilidad → cotización/reserva → reporte de exposición**.
  Base `SYSTEM_TIMELINE`.
- **V1 Espacios:** tabla/mapa (tipo, zona, medidas, foto, precio/mes, estado).
- **V2 Disponibilidad:** calendario por espacio (libre / reservado / ocupado).
- **V3 Contratación:** cotizar (espacio + período + arte) → reservar → orden.
- **V4 Reporte:** exposición del período por espacio (impresiones simuladas)
  + exportar.
- **Roles:** comercial, admin, cliente (ve solo sus pautas).
- **Límites:** sin compra programática real, sin medición de campo real.

---

## 5. Reglas compartidas

Heredadas de `PLAN_RRSS_30_DIAS.md` (ver `proyectos.md`, Sistema de diseño),
más dos propias de este fichero:

- Nunca un hex como texto visible; ortografía en español impecable.
- Sin foto corporativa genérica: cada ficha define su fallback en "Hero sin foto".
- El software se muestra como software real corriendo, nunca captura plana.
- Línea de gradiente de marca en el shell de demostración.
- `prefers-reduced-motion`: todo estático (§1.4).
- Contraste AA en todo texto funcional (§1.6).
