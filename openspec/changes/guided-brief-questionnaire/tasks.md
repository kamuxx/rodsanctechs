# Tasks: Guided Brief Questionnaire

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 500–800 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 FAQ SSOT → PR 2 useChat FSM → PR 3 ChatWidget → PR 4 saveLead + verify |
| Delivery strategy | ask-on-risk |
| Chain strategy | feature-branch-chain |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | FAQ SSOT + types | PR 1 | Base = tracker `feature/guided-brief-questionnaire`; `faq_brief_questions.ts` only |
| 2 | useChat FSM | PR 2 | Base = PR 1 branch; hook only; no chip chrome |
| 3 | ChatWidget chips | PR 3 | Base = PR 2 branch; WA chips + hide composer |
| 4 | saveLead pais + verify | PR 4 | Base = PR 3 branch; payload + manual checklist |

Tracker PR aggregates the feature branch to main. Child PRs never target main.

## Phase 1: FAQ SSOT + Types

- [x] 1.1 Create `src/lib/faq_brief_questions.ts` with `IntentionId`, `FaqStep`, `IntentionFaq`, `getIntention`, `nextFaqStep`, `PILL_LABELS` (7, no "Otro").
- [x] 1.2 Add 7 Spanish trees (`mapsTo` BriefData fields); `projectType` per design. Spec: Catalog then vanish.

## Phase 2: useChat FSM

- [x] 2.1 In `src/hooks/useChat.ts`, add `pais` to `BriefData`; persist `rst_chat_state_v3` `{messages, brief, step, intentionId, briefClosed}`; ignore v2.
- [x] 2.2 Replace OpenRouter path with FSM greet → pills → consent → FAQ/`nextFaqStep` or idea; add `chips`, `selectChip`. Spec: Open without key, No OpenRouter on happy path, Locked.
- [x] 2.3 Contact: nombre, empresa, email, whatsapp, pais (empty trim stays); auto `save()` after `pais`. Spec: Contact steps, Sí FAQ or No idea.
- [x] 2.4 Close: track `brief_complete`/`lead_submit_*`; summary + WhatsApp with `pais`; skip `extractBrief`. Keep `src/lib/systemprompt.ts`. Spec: Close or persist fail.

## Phase 3: ChatWidget chips

- [x] 3.1 In `src/components/ChatWidget.tsx`, WA quick-replies under last bot bubble: left-align, wrap, `rounded-full` outline (not `bg-accent`), real `<button>`s, `:focus-visible` `wa-header` not `#7c3aed`. Spec: Catalog then vanish, Consent.
- [x] 3.2 On select, unmount chips + sent `bg-wa-sent` bubble; hide composer on chip turns; show for idea + contact. Spec: Consent, Sí FAQ or No idea.

## Phase 4: saveLead + verify

- [x] 4.1 In `src/lib/saveLead.ts`, forward `pais` if present; env-only `VITE_SHEETS_URL`; leave `Contacto.tsx`. Spec: Persist after contact, Successful submission, Missing or error endpoint, Contacto unchanged.
- [x] 4.2 Manual UI: open (no OpenRouter key), 7 pills, consent, FAQ, idea, contact (empty stays), Sheets fail still WhatsApp. Spec: Open without key, Catalog then vanish, Consent, Sí FAQ or No idea, Contact steps, Close or persist fail.
- [x] 4.3 Source audit (no hardcoded OpenRouter key); keep `systemprompt.ts`; `bun run lint` + `bun run build`. Spec: Source audit, No OpenRouter on happy path.
