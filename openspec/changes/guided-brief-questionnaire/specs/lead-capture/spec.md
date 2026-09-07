# Lead Capture

## Requirements

### Requirement: Env-Required Endpoint

MUST use only `VITE_SHEETS_URL`. MUST NOT use a hardcoded URL.

#### Scenario: Successful submission

- GIVEN `VITE_SHEETS_URL` is set
- WHEN a completed questionnaire lead is submitted
- THEN a POST is sent to that URL with the lead data

#### Scenario: Missing or error endpoint

- GIVEN `VITE_SHEETS_URL` is unset, empty, or the endpoint returns non-OK HTTP or an `error` field
- WHEN submission is attempted
- THEN no baked-in URL is used and saveLead fails

### Requirement: Submit After Questionnaire Contact

MUST persist only after FAQ or idea and contact. Payload MAY include `pais`. `projectType` MUST equal the selected intention.

#### Scenario: Persist after contact

- GIVEN FAQ or idea and contact are complete
- WHEN the session closes
- THEN persist is attempted with that `projectType` and `pais` MAY be included

### Requirement: Contacto Form Unchanged

Contacto MUST keep existing submit behavior.

#### Scenario: Contacto unchanged

- GIVEN the visitor uses Contacto
- WHEN they submit that form
- THEN existing Contacto submit behavior still applies
