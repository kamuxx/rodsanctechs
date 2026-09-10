# Brief Questionnaire

## Requirements

### Requirement: Seven-Product Catalog

MUST offer ERP, POS, E-commerce, Gestión pastelería/tienda, Fintech - préstamos, Fintech - inversiones, Fintech - seguros. MUST NOT offer "Otro". After selection, pills MUST vanish and `projectType` MUST equal that intention.

#### Scenario: Catalog then vanish

- GIVEN a new session
- WHEN greeting is shown and one intention is selected
- THEN the seven pills appear without "Otro", then vanish, and `projectType` equals that intention

### Requirement: Consent Gate

MUST ask consent matching "Para poder ayudar con <intención>..." with WhatsApp-style Sí and No.

#### Scenario: Consent

- GIVEN an intention is selected
- WHEN consent is shown
- THEN the prompt includes that intention and only Sí and No

### Requirement: FAQ Or Idea Branch

Sí MUST start that intention's FAQ from the FAQ SSOT. No MUST collect a free-text idea instead.

#### Scenario: Sí FAQ or No idea

- GIVEN consent is shown
- WHEN visitor chooses Sí or No
- THEN Sí starts that FAQ in order, and No collects a free-text idea and skips FAQ

### Requirement: Separate Contact Steps

After FAQ or idea, MUST ask nombre, empresa, email, whatsapp, and pais one field each.

#### Scenario: Contact steps

- GIVEN FAQ or idea is complete
- WHEN contact starts
- THEN each of those five fields is asked as its own step

### Requirement: Compiled Brief Close

After contact, both paths MUST compile a brief, persist, summarize, and offer WhatsApp even if persist fails.

#### Scenario: Close or persist fail

- GIVEN FAQ or idea and contact are complete
- WHEN the session closes, including when persist fails
- THEN summary is shown and WhatsApp with that brief is offered

### Requirement: No Back Navigation

MUST NOT allow changing intention or going back.

#### Scenario: Locked

- GIVEN an intention is selected
- WHEN the visitor continues
- THEN no back or intention change
