# Client Config Specification

## Purpose

The Vite/React SPA obtains runtime configuration exclusively from environment variables. Tracked source MUST NOT embed credentials, endpoint URLs, or duplicate pre-Vite assets that obscure the SPA as the single source of truth.

## Requirements

### Requirement: No Hardcoded Secrets

The application MUST NOT contain hardcoded OpenRouter API keys or Google Apps Script endpoint URLs in any tracked source file.

#### Scenario: Repository secret audit

- GIVEN the tracked source tree
- WHEN inspected for embedded credentials or exec URLs
- THEN no OpenRouter keys or Apps Script `/macros/s/` URLs appear outside `.env.example` name listings

### Requirement: Documented Environment Contract

The project MUST declare `VITE_OPENROUTER_KEY` and `VITE_SHEETS_URL` in TypeScript env typings and MUST provide `.env.example` listing variable names only, without values.

#### Scenario: Developer onboarding

- GIVEN a fresh clone without a local `.env`
- WHEN a developer reads `.env.example` and `vite-env.d.ts`
- THEN both required variable names are documented and no secret values are present

### Requirement: Legacy Asset Removal

Root-level pre-Vite `css/` and `js/` directories MUST NOT remain in the repository.

#### Scenario: Single frontend source of truth

- GIVEN the Vite/React SPA is the sole active frontend
- WHEN the repository root is inspected
- THEN `css/` and `js/` directories are absent

### Requirement: Build Configuration Hygiene

`vite.config.ts` MUST NOT import or reference unused Node.js APIs.

#### Scenario: Lint and build gate

- GIVEN the updated Vite configuration
- WHEN `bun run lint` and `bun run build` execute
- THEN both complete successfully

### Requirement: Client-Visible Variables

`VITE_`-prefixed variables MAY be exposed to the browser bundle. A backend proxy for secrets is out of scope for this change.

#### Scenario: Production bundle

- GIVEN a production build with env vars set
- WHEN the client bundle loads
- THEN configuration is read from injected `import.meta.env` values only
