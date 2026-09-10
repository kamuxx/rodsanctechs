# Design: Secrets and Leftover Asset Hygiene

## Technical Approach

Remove hardcoded OpenRouter and Apps Script fallbacks; require env-only configuration via `import.meta.env`. Delete orphaned pre-Vite `css/` and `js/` directories (duplicate secrets, not imported by Vite). Add `.env.example` and complete TypeScript env typings. Gate chat when `VITE_OPENROUTER_KEY` is absent using existing fail-closed Spanish + WhatsApp UX. Apply a minimal `saveLead` fix so HTTP failures and `{error}` in response body propagate to callers (current inner `catch` swallows application errors).

## Architecture Decisions

| Decision | Alternatives | Choice | Rationale |
|----------|--------------|--------|-----------|
| Env access | Central config module | Inline `import.meta.env` per module | Matches existing hook/lib pattern; minimal diff |
| Chat without key | Hide FAB / disable widget | Keep widget open; guard in `useChat` | Spec requires Spanish fallback on open/send; no OpenRouter calls |
| Missing-key UX | New copy | Reuse `compileWhatsAppErrorLink` + error bubble pattern | Consistent WhatsApp handoff; aligns with rate-limit path |
| saveLead errors | Full retry refactor | Narrow `catch` fix only | lead-capture spec requires propagation; proposal scopes broader fixes out |
| Backend proxy | Build now | Defer | Out of scope; `VITE_` vars remain client-visible |
| Legacy assets | External archive | Delete `css/`, `js/` | Git history retained; confirmed not referenced by Vite entry |

### Decision: Env-only constants

**Choice**: Replace `?? "hardcoded..."` with trimmed env reads; empty string means unset.
**Alternatives considered**: Shared `src/lib/config.ts`.
**Rationale**: Vite inlines at build time; two call sites only; follows current module layout.

### Decision: saveLead error propagation

**Choice**: On OK response, parse JSON; if `body.error`, throw. Catch only JSON parse failures; rethrow application errors.
**Alternatives considered**: Leave swallow behavior; add retry queue.
**Rationale**: Lines 33–36 currently catch thrown Apps Script errors and treat them as success — violates lead-capture spec.

## Data Flow

### Chat — configured key

```
Visitor → ChatWidget (open) → useChat.start()
  → callAI (Authorization: Bearer VITE_OPENROUTER_KEY) → OpenRouter
  → extractBrief → brief panel → useChat.save() → saveLead → Apps Script
```

### Chat — missing key (fail closed)

```
Visitor → ChatWidget (open) → useChat.start()
  → CHAT_ENABLED? ──no──→ assistant bubble (ES) + WhatsApp action
  │                         (callAI NEVER invoked)
Visitor → send(message)
  → CHAT_ENABLED? ──no──→ same bubble pattern, no fetch
```

### Lead capture

```
useChat.save(brief) → saveLead(payload)
  → VITE_SHEETS_URL set? ──no──→ throw (caller → saving="error")
  → POST text/plain JSON → Apps Script
  → !res.ok ──→ throw HTTP error
  → res.ok + body.error ──→ throw Apps Script error
  → success ──→ saving="saved"
  → catch ──→ saving="error", WhatsApp handoff in ChatWidget
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/hooks/useChat.ts` | Modify | Remove key fallback; add `CHAT_ENABLED`; guard `start`, `send`, `callAI` |
| `src/lib/saveLead.ts` | Modify | Remove URL fallback; throw if URL missing; fix error catch |
| `src/vite-env.d.ts` | Modify | Add `VITE_SHEETS_URL?: string` |
| `vite.config.ts` | Modify | Remove unused `spawn` import and stale cloudflared comment |
| `.env.example` | Create | List `VITE_OPENROUTER_KEY`, `VITE_SHEETS_URL` (names only, no values) |
| `css/` | Delete | Unused pre-Vite styles |
| `js/` | Delete | Duplicate chat/leads with embedded secrets |

## Interfaces / Contracts

```typescript
// useChat.ts — module scope
const OPENROUTER_KEY = import.meta.env.VITE_OPENROUTER_KEY?.trim() ?? "";
const CHAT_ENABLED = OPENROUTER_KEY.length > 0;
```

```typescript
// saveLead.ts
const SHEETS_URL = import.meta.env.VITE_SHEETS_URL?.trim() ?? "";

export async function saveLead(payload: Record<string, unknown>): Promise<void> {
  if (!SHEETS_URL) throw new Error("VITE_SHEETS_URL is not configured");
  // POST with text/plain; propagate HTTP and body.error failures
}
```

Fail-closed chat uses existing `ChatMessage` shape: `isError: true`, Spanish content, `action: { type: "whatsapp", label: "Contactar por WhatsApp", url }`.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Typecheck | Env typings | `bun run lint` |
| Build | Bundle compiles | `bun run build` |
| Secret audit | No embedded credentials | Grep tracked source for key/URL patterns |
| Manual — chat | With key | Open widget → greeting → message → brief flow |
| Manual — chat | Without key | Unset key → open/send → WhatsApp shown, no OpenRouter network call |
| Manual — lead | With URL | Confirm brief → row in Sheets |
| Manual — lead | Error path | Mock HTTP/body.error → `saving="error"`, retry button |

No unit/E2E runner in project; manual + build gates only.

## Migration / Rollout

1. Operator rotates exposed OpenRouter key and Apps Script deployment (out of repo).
2. Developer copies `.env.example` → `.env` with real values locally.
3. Apply changes; run `bun run lint` and `bun run build`.
4. Deploy with host env vars set for both `VITE_*` keys.
5. Rollback: revert commit; restore `css/`/`js/` from git if needed.

No database or feature-flag migration.

## Open Questions

- [ ] Were credentials rotated before production deploy?
- [ ] Where will production env vars be injected (host dashboard vs CI)?
