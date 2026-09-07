# Chat Assistant

## Requirements

### Requirement: Open Without OpenRouter Key

MUST open with a local Spanish greeting and seven Soluciones pills when `VITE_OPENROUTER_KEY` is unset or empty. Happy path MUST NOT call OpenRouter.

#### Scenario: Open without key

- GIVEN `VITE_OPENROUTER_KEY` is unset or empty
- WHEN the widget opens
- THEN a local Spanish greeting and seven pills appear and no OpenRouter request is made

#### Scenario: No OpenRouter on happy path

- GIVEN the widget is open with or without the key
- WHEN greeting, consent, FAQ or idea, and contact complete
- THEN no OpenRouter request is made

### Requirement: No Hardcoded Chat Credentials

MUST NOT fall back to a hardcoded OpenRouter key or re-introduce keys in tracked source.

#### Scenario: Source audit

- GIVEN tracked source
- WHEN inspected for OpenRouter credentials
- THEN no hardcoded API key is present
