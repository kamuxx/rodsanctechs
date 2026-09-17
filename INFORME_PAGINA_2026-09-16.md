# Informe Marketing Página — 2026-09-16

> Fuente de verdad del estado marketing/UI/UX de la landing.
> Commits evaluados: `f944d2e` + `3fbbb9a` (17 ficheros, +2126 / -161 vs `e042e9b`).
> Verificado: `OFFER-SYNC PASS: 15 intenciones = orden = useChat = 15 tarjetas`.
> El plan de subida a 9/10 (`PLAN_9-10.md`) apunta a este informe. Nada del plan puede contradecirlo.

## Nota actual honesta

| Dimensión | Hoy | Objetivo |
|---|---|---|
| UI | 7.5/10 | 10/10 |
| UX | 6.5/10 | 10/10 |
| Marketing | 6.5/10 | 10/10 |
| Convertibilidad | 6.0/10 | 10/10 |
| Gaps | 6/10 | 0/10 |
| Sesgos dañinos | 5/10 | 0/10 |

## Lo que SÍ hicimos hoy bien

1. **Homologación oferta 15x15** — `soluciones-data.tsx` + `faq_brief_questions.ts` + `useChat.ts` con 15 = 15. Nuevas: `app-movil` (vertical primero), `crm`, `sistema-turnos`, `sistema-parking`, `gestion-publicidad`. Guard `scripts/check-offer-sync.mjs` doble vía + `closingSteps` completo. Hero suma "aplicaciones móviles" (`Hero.tsx:150-154`).
2. **Soluciones remodel definitivo** — de 2 carriles 7 vs 3 a 2 bloques apilados con grilla 1/2/3 pareja, copy compartido, reveal escalonado (`Soluciones.tsx:56-124`).
3. **Ritmo de fondos** — Hero white → servicios slate-50 → proceso white → equipo slate-50 → empresas white → tecnologias slate-50 → faq white → contacto slate-50. Queda un doble gris nuevo (ver gaps).
4. **FAQ remodel 2 columnas** — mismo texto, 12 preguntas, garantías y cierre idénticos. `FaqRemodel.tsx` montada en `App.tsx`. Cierre conserva Peak-End Rule (gradiente + WhatsApp + formulario + "<24h, sin compromiso").
5. **Chat reinicia en cada apertura** — `ChatWidget.tsx` + `chat-storage.ts:clearChatState()`. Intención buena, implementación peligrosa (ver gaps).

## Gaps abiertos (7) — fuente para el plan

1. **G-01 doble slate:** `Tecnologias.tsx:84` y `Demos.tsx:5` ambas `bg-slate-50` seguidas.
2. **G-02 desbalance 12 vs 3:** contadores "12 soluciones / 3 soluciones" hacen ver pobre a Fintech. Mal Framing.
3. **G-03 falsa affordance:** `ServiceCard` con `cursor-pointer` sin `onClick` (`Soluciones.tsx:31`).
4. **G-04 H2 estrecho:** "ERP, CRM y POS" no cubre las 15 (`Soluciones.tsx:58-60`).
5. **G-05 Hero abstracto:** SVG API/DB/UI/CI/Go/UX, Curse of Knowledge. No hay prueba visual de producto.
6. **G-06 chat destructivo:** borrado forzado de `localStorage` en cada apertura rompe Endowment / Goal-Gradient. Si el visitante cierra por error, pierde su brief.
7. **G-07 promesas huérfanas:** FAQ promete "catálogo de plantillas" sin link (`faq-data.tsx:80-94`); `#casos` pide "solicitar demo privada" donde falta evidencia y ofrece "Panel de Préstamos" como demo público bajo NDA (`Demos.tsx`).

## Sesgos activos

- Curse of Knowledge (Hero técnico, labels sin traducir a dolor).
- Paradox of Choice / Hick's Law (15 opciones planas sin filtro).
- Status-Quo Bias no tratado (sin "migramos tu Excel/WhatsApp sin parar tu operación").
- Endowment roto por el reset del chat.

## Límite honesto

Con `PRODUCT.md:44` (cero prueba social, prohibido inventarla) y sin demo operable, el 10/10 tiene bloqueo externo real. Techo certificable sin demos: **9 — 9.5/10**.
