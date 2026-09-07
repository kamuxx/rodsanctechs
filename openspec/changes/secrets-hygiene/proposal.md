# Proposal: Secrets and Leftover Asset Hygiene

## Proposal question round

Review these before spec/design (assumptions used until answered):

1. **Rotation:** Were embedded OpenRouter/Apps Script credentials rotated after any public exposure? *(Assumption: operator rotates post-merge; not repo work.)*
2. **Missing env:** Without keys, fail closed with Spanish + WhatsApp, or hide chat CTAs? *(Assumption: fail closed; chat disabled without key.)*
3. **Legacy `css/`/`js/`:** Delete from repo or archive externally? *(Assumption: delete; git history retains.)*
4. **Client `VITE_` keys:** Accept browser-visible secrets until a backend proxy? *(Assumption: yes; proxy deferred.)*
5. **Funnel bugs:** Include `saveLead` swallow/retry fixes? *(Assumption: out of scope.)*

## Intent

Remove hardcoded credentials and duplicate pre-Vite assets leaking secrets and obscuring the Vite/React SPA as SSOT. Security hygiene only—no feature work.

## Scope

### In Scope
- Remove OpenRouter/Apps Script fallbacks in `useChat.ts`, `saveLead.ts`
- Delete unused `css/`, `js/` (duplicate chat/leads in `js/index.js`)
- Remove unused `spawn` in `vite.config.ts`; add `VITE_SHEETS_URL` to `vite-env.d.ts`

### Out of Scope
- Backend OpenRouter proxy; operator credential rotation
- `saveLead` errors, chat retry, GTM, `PRODUCT.md`

## Capabilities

### New Capabilities
- `client-config`: Env-only runtime config; no hardcoded secrets
- `lead-capture`: Apps Script POST requires `VITE_SHEETS_URL`
- `chat-assistant`: OpenRouter requires `VITE_OPENROUTER_KEY`; graceful disable otherwise

### Modified Capabilities
None (empty `openspec/specs/`)

## Approach

Remove `??` fallbacks; require env vars. Delete legacy assets not imported by Vite. Add `.env.example` (names only). Gate: `bun run lint`, `bun run build`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/hooks/useChat.ts` | Modified | Env-only key |
| `src/lib/saveLead.ts` | Modified | Env-only URL |
| `src/vite-env.d.ts` | Modified | `VITE_SHEETS_URL` typing |
| `vite.config.ts` | Modified | Drop unused `spawn` |
| `css/`, `js/` | Removed | Pre-Vite leftovers |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Break without `.env` | High | Document vars; fail-closed UX |
| `VITE_` still client-visible | High | Document; defer backend |
| Secrets in git history | Med | Operator rotation |

## Rollback Plan

Revert commit; restore `css/`/`js/` from git; use local `.env` only—never recommit secrets.

## Dependencies

Operator rotation if credentials were committed; local `.env` for dev/prod builds.

## Success Criteria

- [ ] No hardcoded OpenRouter key or Apps Script URL in tracked source
- [ ] `css/` and `js/` removed
- [ ] `bun run lint` and `bun run build` pass
- [ ] Chat/leads work when env vars set
