# Chat Assistant Specification

## Purpose

The AI chat assistant engages visitors via OpenRouter when configured. When the API key is absent, the assistant MUST fail closed: no OpenRouter calls, Spanish user messaging, and WhatsApp contact as fallback.

## Requirements

### Requirement: Env-Required API Key

Chat MUST use `VITE_OPENROUTER_KEY` exclusively for OpenRouter authorization and MUST NOT fall back to a hardcoded key.

#### Scenario: Configured chat conversation

- GIVEN `VITE_OPENROUTER_KEY` is set
- WHEN a visitor sends a chat message
- THEN OpenRouter is called with that key and an assistant reply is shown

#### Scenario: Chat session start with key

- GIVEN `VITE_OPENROUTER_KEY` is set and no prior conversation exists
- WHEN the chat widget opens
- THEN an initial assistant greeting is fetched from OpenRouter

### Requirement: Fail-Closed Without Key

When `VITE_OPENROUTER_KEY` is unset or empty, the chat MUST NOT call OpenRouter and MUST present Spanish guidance with a WhatsApp contact action.

#### Scenario: Missing key on chat open

- GIVEN `VITE_OPENROUTER_KEY` is unset or empty
- WHEN the visitor opens the chat widget
- THEN no OpenRouter request is made and Spanish messaging with WhatsApp fallback is shown

#### Scenario: Missing key on user message

- GIVEN `VITE_OPENROUTER_KEY` is unset or empty
- WHEN the visitor attempts to send a message
- THEN no OpenRouter request is made and Spanish messaging with WhatsApp fallback is shown

### Requirement: API Error User Experience

When OpenRouter returns rate-limit or connection errors, the chat MUST show Spanish error messaging with a WhatsApp fallback action. Changes to retry logic are out of scope.

#### Scenario: Rate limit during conversation

- GIVEN `VITE_OPENROUTER_KEY` is set
- WHEN OpenRouter responds with a rate-limit error
- THEN the visitor sees Spanish high-demand messaging and a WhatsApp contact action

#### Scenario: Connection failure during conversation

- GIVEN `VITE_OPENROUTER_KEY` is set
- WHEN a network or non-rate-limit API error occurs
- THEN the visitor sees Spanish connection-error messaging and a WhatsApp contact action
