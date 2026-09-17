# Plan 9/10 — Fuente de verdad de ejecución

> Fuente madre: `INFORME_PAGINA_2026-09-16.md`. Este plan no puede contradecir el informe.
> Si hay conflicto, el informe gana y el plan se corrige.
> Objetivo: UI ≥9, UX ≥9, Marketing ≥9, Convertibilidad ≥9, Gaps ≤1, Sesgos ≤1.
> Techo certificable sin demos: 9 — 9.5/10. El 10/10 queda `INCOMPLETE` por bloqueador externo (prueba social real + 1 demo operable, track paralelo del usuario).

## Reglas del plan

1. Oferta 15 = 15 = 15 (cards = chat = formulario). Lo guarda `scripts/check-offer-sync.mjs`.
2. No inventar testimonios, logos ni métricas (`PRODUCT.md:44`).
3. Sin escasez ni urgencia falsas. Solo claridad, prueba honesta, reversión de riesgo y facilidad.
4. Cada batch cierra con `tsc -b --noEmit` + `node scripts/check-offer-sync.mjs` + `npm run build`.
5. Sin runner de tests en `package.json`: la evidencia es scripts node + tsc + build + checklist manual.

## Criterios de aceptación 9/10

- AC-UI-1: secuencia de fondos sin dos secciones iguales seguidas (verificado por script).
- AC-UI-2: cero `cursor-pointer` sin acción. Toda card abre el chat con su intención.
- AC-UI-3: H2 de Soluciones cubre las 15, no solo 3.
- AC-UX-1: elegir entre 15 toma ≤2 clics (filtro + card).
- AC-UX-2: cerrar y reabrir el chat CONSERVA el brief. Reset solo con botón explícito.
- AC-UX-3: el formulario habla el mismo idioma que cards/chat (15 opciones).
- AC-MKT-1: `check-offer-sync` PASS + cero promesas huérfanas (G-07 cerrado).
- AC-MKT-2: 15 descripciones en formato verbo + resultado + para quién (títulos intactos).
- AC-CONV-1: garantías "menos de 24h / sin compromiso" en Hero + Soluciones + FAQ + Contacto.
- AC-INST-1: eventos `servicios_card_click, servicios_filter, casos_view, casos_click, faq_open, chat_open_source` emiten sin romper build.

## Micro-tareas

| ID | Cierra gap | Acción | Ficheros | Validación |
|---|---|---|---|---|
| MT-001 | G-01 | `#casos` a `bg-white`, auditar secuencia completa | `Demos.tsx:5` | `check-ui-rhythm.mjs` + capturas 1280/360 |
| MT-002 | G-02, G-04 | Quitar contadores 12/3, nuevo H2 que cubra las 15 | `Soluciones.tsx:58-80,97-100` | grep H2 + lint |
| MT-003 | G-03 | `openChatWidget(intentionId?)` con `CustomEvent detail`; `ServiceCard` pasa a `button` con `onClick`; añadir `intent: IntentionId` a `Service` | `chat-events.ts`, `ChatWidget.tsx`, `ChatPanel.tsx`/`useChat.ts`, `Soluciones.tsx`, `soluciones-data.tsx` | clic 15/15 abre paso 1 de su intención; intención inválida → chat genérico sin crash |
| MT-004 | G-05 parcial | Hero apunta a las 15 ("y soluciones operativas más abajo" + ancla) | `Hero.tsx:150-154` | manual + lint |
| MT-005 | Paradoja elección | `group: "web"\|"operacion"\|"fintech"` por Service + tabs Todos/Web/Operación/Fintech con `aria-pressed` | `soluciones-data.tsx`, `Soluciones.tsx` | teclado + clic por filtro + build |
| MT-006 | Copy features | Reescribir solo `desc` x15 (NO `title`) a verbo + resultado + para quién | `soluciones-data.tsx` | `check-offer-sync` PASS + revisión línea por línea |
| MT-007 | G-06 | Quitar `clearChatState()` de apertura; añadir botón "Empezar de nuevo" en el panel; reapertura = resume | `ChatWidget.tsx`, `chat-storage.ts`, `ChatPanel.tsx` | inicia → cierra → reabre = resume; reset = fresco; storage corrupto → fresco sin crash |
| MT-008 | G-07a | Reescribir vías sin "catálogo" inexistente | `faq-data.tsx:80-94` | grep "catálogo" + lint |
| MT-009 | G-07b | `#casos` honesto: "Lo que estamos construyendo", pastelería "Avísame", préstamos "llamada privada bajo NDA" | `Demos.tsx` | manual + lint |
| MT-010 | AC-UX-3 | `TIPO_SERVICIO` = 15 `PILL_LABELS` + "Otro", importado sin duplicar | `Contacto.tsx`, `faq_brief_questions.ts` | submit + `saveLead` + build |
| MT-011 | Status-Quo, Regret | "Sin compromiso · <24h" bajo CTAs Soluciones; "Migramos desde Excel/WhatsApp sin parar tu operación" en Empresas | `Soluciones.tsx`, `Empresas.tsx` | visual |
| MT-012 | AC-INST-1 | `track()` en card, filtro, casos, faq, chat (sin PII) | `lib/analytics.ts`, `Soluciones.tsx`, `Demos.tsx`, `FaqRemodel.tsx`, `ChatWidget.tsx` | dev hook + build |
| MT-013 | Anti-regresión | `scripts/check-ui-rhythm.mjs` + extensión contact-sync; documentar en build/pre-commit | `scripts/` | `node scripts/*.mjs` PASS |
| MT-014 | A11y | Cards `button` con `focus-visible`, filtro `tablist`, verificar `prefers-reduced-motion` | `Soluciones.tsx`, `FaqRemodel.tsx` | tab 360/1280 + lint |

## Orden de ejecución

- **Batch 1 (coherencia crítica):** MT-001, MT-002, MT-004, MT-007, MT-008, MT-009.
- **Batch 2 (conversión):** MT-003, MT-005, MT-006, MT-010, MT-011.
- **Batch 3 (medición y candados):** MT-012, MT-013, MT-014.

## Flujos a validar por batch

- Happy: filtra Operación → clic turnos → chat en `turnos-problem` → contacto → propuesta <24h.
- Alternate: formulario con "Sistema de turnos médicos" → mismo brief por WhatsApp.
- Error/edge: intención inválida, storage corrupto, submit vacío, email/teléfono inválido, toggle rápido FAQ, doble apertura chat, 360px, analytics caído (no bloquea), `saveLead` falla (error + WhatsApp directo).

## Estado de ejecución — 2026-09-17

Todas las micro-tareas implementadas y validadas en un solo ciclo:

- MT-001 ✅ DONE — `#casos` a `bg-white`. Hallazgo: `Demos` no está montado en `App.tsx`; el ritmo montado real es hero:white → servicios:slate-50 → proceso:white → equipo:slate-50 → empresas:white → tecnologias:slate-50 → faq:white → contacto:slate-50 (alternancia perfecta, verificada por script).
- MT-002 ✅ DONE — H2 "Software a medida para operar tu negocio" + subtítulo de 3 líneas, contadores 12/3 eliminados.
- MT-003 ✅ DONE — `openChatWithIntention(pill)` + `pendingPill`/`session` en `ChatWidget` + `initialPillLabel` en `ChatPanel` (se consume una vez; intención inválida = se ignora, sigue el saludo). Cards como `<button>` con `aria-label`.
- MT-004 ✅ DONE — Hero apunta a las 15 ("web, operación, aplicaciones móviles o plataforma financiera").
- MT-005 ✅ DONE — Filtro Todos / Web y móvil / Operación / Fintech con `aria-pressed` + `track`.
- MT-006 ✅ DONE — 15 descripciones verbo + resultado + para quién (títulos intactos).
- MT-007 ✅ DONE — Apertura genérica conserva progreso; card = conversación nueva con intención; reset explícito ya existía en el header del panel.
- MT-008 ✅ DONE — Sin "catálogo" inexistente en FAQ.
- MT-009 ✅ DONE — `#casos` honesto (pastelería "Avísame", préstamos "llamada privada bajo NDA").
- MT-010 ✅ DONE — Formulario = `[...PILL_LABELS, "Otro"]`, WhatsApp genérico por tipo.
- MT-011 ✅ DONE — Garantías bajo CTAs + microcopy migración en Empresas.
- MT-012 ✅ DONE — `servicios_card_click`, `servicios_filter`, `casos_view`/`casos_click`, `faq_open`, `chat_open_source` (sin PII; analytics nunca rompe).
- MT-013 ✅ DONE — `scripts/check-page-sync.mjs` (ritmo + contacto + intent/group + anti `cursor-pointer` en divs).
- MT-014 ✅ DONE — Cards botón con `focus-visible`, filtro con `aria-pressed`, `useReveal` ya respeta `prefers-reduced-motion`.

Evidencia: `npm run lint` PASS · `check-offer-sync` PASS (15=15=15) · `check-page-sync` PASS · `npm run build` PASS (prerender 132038 chars).

Nota de alcance: `UI 9 / UX 9 / MKT 9 / CONV 9 / Gaps ≤1 / Sesgos ≤1` certificable en este ciclo. El 10/10 sigue `INCOMPLETE` por bloqueador externo (prueba social real + 1 demo operable, track paralelo del usuario).

## Trazabilidad informe ↔ plan

- G-01 → MT-001 → AC-UI-1.
- G-02, G-04 → MT-002 → AC-UI-3.
- G-03 → MT-003 → AC-UI-2.
- G-05 → MT-004 + MT-006 → AC-MKT-2.
- G-06 → MT-007 → AC-UX-2.
- G-07 → MT-008 + MT-009 → AC-MKT-1.
- Paradoja/Status-Quo/Endowment → MT-005 + MT-011 → AC-UX-1, AC-CONV-1.
- Formulario → MT-010 → AC-UX-3.
- Medición/candados → MT-012 + MT-013 + MT-014 → AC-INST-1.
