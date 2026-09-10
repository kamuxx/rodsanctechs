# Proposal: Guided Brief Questionnaire

## Proposal question round

These questions tighten business rules, edge cases, and tradeoffs. Assumptions below are used until you correct them or ask a second round.

1. After Sí/No, can the visitor change intention or go back? *(Assumption: no back this slice; restart only by starting a new chat session.)*
2. Which contact fields are asked as separate questions? *(Assumption: nombre, empresa, email, whatsapp, pais — one field per step. Add `pais` to `BriefData` and the Sheets payload.)*
3. If `saveLead` fails, still show WhatsApp with the compiled brief? *(Assumption: yes — WhatsApp is the conversion close.)*

## Intent

Replace OpenRouter sales chat with a deterministic WhatsApp-style questionnaire so visitors produce a complete project brief without AI cost or non-deterministic answers.

## Scope

### In Scope

- Greeting + 7 Soluciones intention pills (no "Otro")
- Consent copy + WhatsApp-style Sí / No
- Sí → FAQ tree from `src/lib/faq_brief_questions.ts`; No → free-text idea
- Contact as separate questions; then `saveLead` + summary + WhatsApp (both paths)
- Chat opens without OpenRouter; happy path never calls it

### Out of Scope

- CRM, Marketplace, App móvil, Mantenimiento, "Otro"
- Reopening `secrets-hygiene`; backend proxy; GTM; Contacto form rewrite
- Intention change / back navigation after pills or Sí/No

## Capabilities

### New Capabilities

- `brief-questionnaire`: 7-product catalog, consent, FAQ SSOT, separate contact steps, compiled brief for Sí and No paths

### Modified Capabilities

- `chat-assistant`: Guided questionnaire instead of OpenRouter. Local greeting/pills. AI path unused; do not re-add keys. Widget opens without `VITE_OPENROUTER_KEY`.
- `lead-capture`: Submit after FAQ/idea + contact; may add `pais`; still env-only `VITE_SHEETS_URL`. Contacto form unchanged.

## Approach

Chat FSM: greet → pills → consent → FAQ or idea → contact (one field each) → `saveLead` + compiled summary + WhatsApp. SSOT: `faq_brief_questions.ts`. `projectType` = selected intention (ERP, POS, E-commerce, Gestión pastelería/tienda, Fintech - préstamos / inversiones / seguros). Drop `___BRIEF___` parse on the happy path. UI copy stays Spanish.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/hooks/useChat.ts` | Modified | OpenRouter → questionnaire FSM; WhatsApp compile |
| `src/components/ChatWidget.tsx` | Modified | Pills, Sí/No chips, step prompts |
| `src/lib/faq_brief_questions.ts` | New | Per-intention FAQ sequences |
| `src/lib/systemprompt.ts` | Unused | No longer drives funnel |
| `src/lib/saveLead.ts` | Modified | Payload after questionnaire (`pais` additive) |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Incomplete FAQ trees | Med | SSOT file; 7 products only |
| Cannot correct intention | Med | No-back; new session reset |
| Sheets fail, lead lost | Med | Still show WhatsApp brief |
| Dead OpenRouter path | Low | Unused; do not reopen secrets |

## Rollback Plan

Restore OpenRouter `useChat` + `systemprompt.ts` greeting/brief extract. Keep env-only keys from `secrets-hygiene`. `pais` is additive and safe to leave.

## Dependencies

- `secrets-hygiene` verified separately; do not reopen
- `faq_brief_questions.ts` must exist before apply
- Main funnel no longer needs `VITE_OPENROUTER_KEY`

## Success Criteria

- [ ] Greeting + 7 pills; pills vanish after selection
- [ ] Sí starts that FAQ; No collects free-text idea
- [ ] Contact one field per step; then Sheets + WhatsApp (WhatsApp if Sheets fails)
- [ ] No OpenRouter on happy path; chat works without that key
- [ ] `bun run lint` and `bun run build` pass; no "Otro"
