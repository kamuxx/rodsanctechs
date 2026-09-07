## Verification Report

**Change**: guided-brief-questionnaire
**Version**: N/A (delta specs; no version field)
**Mode**: Standard (`strict_tdd` false; no runner)

### Completeness
| Metric | Value |
|--------|-------|
| Tasks total | 11 |
| Tasks complete | 11 |
| Tasks incomplete | 0 |

Task 3.2 still says “hide composer on chip turns”. User correction + current `design.md`: composer **always visible** with chips. Treated as current design, not incomplete.

### Build & Tests Execution
**Build**: ✅ Passed
```text
bun run lint   → tsc -b --noEmit  (exit 0)
bun run build  → tsc -b && vite build  (exit 0)
  vite v6.4.3 — 52 modules, dist/assets/index-TulbbJ3u.js 277.01 kB
```

**Tests**: ⚠️ No test runner (`package.json` has no `test` script; design: “No runner; no harness”)
```text
No unit / integration / E2E command to execute.
No live browser this session. Task 4.2 marked [x] but not reproduced here.
```

**Coverage**: ➖ Not available / threshold: n/a

**Source audit (executed)**:
```text
rg -i "sk-or-|openrouter.ai/api|OPENROUTER_KEY\s*[:=]" src  → no matches
fetch() in src: saveLead.ts only (VITE_SHEETS_URL)
VITE_OPENROUTER_KEY remains a vite-env type only
```

### Spec Compliance Matrix
| Requirement | Scenario | Test | Result |
|-------------|----------|------|--------|
| Seven-Product Catalog | Catalog then vanish | (none; no browser) | ❌ UNTESTED |
| Consent Gate | Consent | (none; no browser) | ❌ UNTESTED |
| FAQ Or Idea Branch | Sí FAQ or No idea | (none; no browser) | ❌ UNTESTED |
| Separate Contact Steps | Contact steps | (none; no browser) | ❌ UNTESTED |
| Compiled Brief Close | Close or persist fail | (none; no browser) | ❌ UNTESTED |
| No Back Navigation | Locked | (none; no browser) | ❌ UNTESTED |
| Open Without OpenRouter Key | Open without key | (none; no browser) | ❌ UNTESTED |
| Open Without OpenRouter Key | No OpenRouter on happy path | (none; no runtime) | ❌ UNTESTED |
| No Hardcoded Chat Credentials | Source audit | `rg` over `src` this session | ✅ COMPLIANT |
| Env-Required Endpoint | Successful submission | (none) | ❌ UNTESTED |
| Env-Required Endpoint | Missing or error endpoint | (none) | ❌ UNTESTED |
| Submit After Questionnaire Contact | Persist after contact | (none) | ❌ UNTESTED |
| Contacto Form Unchanged | Contacto unchanged | (none; no browser) | ❌ UNTESTED |

**Compliance summary**: 1/13 scenarios compliant (runtime). Design allows manual verification; this session did not run the UI checklist.

### Correctness (Static Evidence)
| Requirement | Status | Notes |
|------------|--------|-------|
| Seven-Product Catalog | ✅ Implemented | `PILL_LABELS` = 7 exact labels; no "Otro"; `selectChip` sets `projectType` and switches chips to Sí/No |
| Consent Gate | ✅ Implemented | `consentPrompt` matches `Para poder ayudar con ${projectType}...`; chips `Sí`/`No` only |
| FAQ Or Idea Branch | ✅ Implemented | Sí → `nextFaqStep`; No → `IDEA_PROMPT` + `idea` |
| Separate Contact Steps | ✅ Implemented | nombre → empresa → email → whatsapp → pais; empty trim no-ops |
| Compiled Brief Close | ✅ Implemented | `closeAfterPais` → `save()`; `briefClosed` on ok **and** fail; WhatsApp via `compileWhatsAppLink` (includes `pais`) |
| No Back Navigation | ✅ Implemented | No back UI; `send()` ignored on greet/consent; reset = new session |
| Open without OpenRouter | ✅ Implemented | Local greet; no OpenRouter `fetch` in `src` |
| Source audit | ✅ Implemented | No hardcoded OpenRouter key in `src` |
| Env-only Sheets | ✅ Implemented | `saveLead` uses `VITE_SHEETS_URL` only; throws if unset |
| Persist after contact | ✅ Implemented | Payload includes `projectType` + `pais`; `Contacto` omits `pais` |
| Contacto unchanged | ✅ Implemented | Still `{nombre, whatsapp, mensaje, fuente}` |

### Coherence (Design)
Workspace `design.md` is current (always-visible composer). Engram `#363` is stale (still “hide on chip-only”).

| Decision | Followed? | Notes |
|----------|-----------|-------|
| Extend `useChat` FSM | ✅ Yes | |
| `systemprompt.ts` unused, keep `CONTACT_NAME` | ✅ Yes | Widget imports `CONTACT_NAME` only |
| Auto `save()` after `pais` | ✅ Yes | Residual confirm while `!briefClosed` during async save |
| Trim empty → stay | ✅ Yes | |
| Composer always visible + in-thread chips | ✅ Yes | Form always mounted; chips under last bot bubble |
| WA chips (not accent) | ✅ Yes | `rounded-full` outline; `focus-visible:outline-wa-header` |
| FAQ SSOT `faq_brief_questions.ts` | ✅ Yes | 7 trees; `getIntention` / `nextFaqStep` / `PILL_LABELS` |
| Persist `rst_chat_state_v3` | ✅ Yes | v2 ignored (other key) |
| `pais` additive; env-only URL | ✅ Yes | |

### Issues Found
**CRITICAL**: None

**WARNING**:
- 12/13 behavioral/HTTP scenarios UNTESTED (no runner, no live browser this session). Task 4.2 is checked but not reproduced here.
- Engram design `#363` still documents hide-composer; workspace `design.md` is the source of truth.

**SUGGESTION**:
- Reconcile task 3.2 wording with always-visible composer (do not treat as a regression).
- ChatWidget summary omits `empresa`, `target`, `modalidad` (WhatsApp compile includes them).
- Confirm button can flash while save is in flight (`brief` set, `briefClosed` still false).
- Unused `systemprompt.ts` still documents “Otro” (rollback keep; not on happy path).

### Verdict
**PASS WITH WARNINGS**
All 11 tasks checked; lint/build green; no hardcoded OpenRouter keys; static implementation matches specs and current always-visible-composer design. Behavioral scenarios remain UNTESTED without a runner or live browser.
