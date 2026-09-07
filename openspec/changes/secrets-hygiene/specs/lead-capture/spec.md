# Lead Capture Specification

## Purpose

Lead submission sends structured project and contact data to Google Sheets via a Google Apps Script web app. The endpoint URL MUST be supplied at build time through environment configuration.

## Requirements

### Requirement: Env-Required Endpoint

Lead capture MUST read the Apps Script URL exclusively from `VITE_SHEETS_URL` and MUST NOT fall back to a hardcoded default URL.

#### Scenario: Successful submission with configured URL

- GIVEN `VITE_SHEETS_URL` is set to a valid Apps Script web app URL
- WHEN a lead payload is submitted through the chat save flow
- THEN a POST request is sent to that URL with the lead data

#### Scenario: Missing endpoint configuration

- GIVEN `VITE_SHEETS_URL` is unset or empty
- WHEN a lead submission is attempted
- THEN no request is sent to a baked-in default URL and submission fails

#### Scenario: Endpoint returns HTTP error

- GIVEN `VITE_SHEETS_URL` is set
- WHEN the Apps Script endpoint responds with a non-OK HTTP status
- THEN saveLead propagates an error to the caller

#### Scenario: Endpoint returns application error

- GIVEN `VITE_SHEETS_URL` is set and HTTP status is OK
- WHEN the response body contains an `error` field
- THEN saveLead propagates an error to the caller
