# Tasks: Secrets and Leftover Asset Hygiene

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~50–150 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Env-only config + legacy removal + verification | PR 1 | All changes; autonomous scope |

## Phase 1: Foundation / Configuration

- [x] 1.1 Create `.env.example` listing `VITE_OPENROUTER_KEY` and `VITE_SHEETS_URL` (names only, no values) — client-config onboarding scenario
- [x] 1.2 Add `VITE_SHEETS_URL?: string` to `src/vite-env.d.ts` alongside existing OpenRouter typing
- [x] 1.3 Remove unused `spawn` import and stale cloudflared comment from `vite.config.ts` — build config hygiene scenario

## Phase 2: Core Implementation

- [x] 2.1 Update `src/lib/saveLead.ts`: env-only `VITE_SHEETS_URL`, throw if unset, propagate HTTP and `body.error` failures — lead-capture endpoint scenarios
- [x] 2.2 Update `src/hooks/useChat.ts`: remove key fallback; add `CHAT_ENABLED`; guard `start`, `send`, and `callAI` with Spanish + WhatsApp fallback — chat-assistant missing-key scenarios

## Phase 3: Legacy Cleanup

- [x] 3.1 Delete root `css/` directory (unused pre-Vite styles) — legacy asset removal scenario
- [x] 3.2 Delete root `js/` directory (duplicate chat/leads with embedded secrets) — no hardcoded secrets scenario

## Phase 4: Verification

- [x] 4.1 Run `bun run lint` and `bun run build`; both MUST pass — build gate scenario
- [x] 4.2 Grep tracked source for OpenRouter keys and Apps Script `/macros/s/` URLs; confirm none outside `.env.example` names — repository secret audit scenario
- [x] 4.3 Manual chat: with key — open widget, greeting, message, brief flow; without key — open/send shows Spanish + WhatsApp, no OpenRouter network calls
- [x] 4.4 Manual lead: with URL — confirm brief saves to Sheets; error path — HTTP or `body.error` yields `saving="error"` with retry/WhatsApp handoff
