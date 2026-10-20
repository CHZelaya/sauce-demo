# Sauce Demo Test Suite #

The purpose of this repo is to serve as a portfolio project, in which I can learn and practice how to write automated end-to-end tests for Sauce Demo. (https://www.saucedemo.com)

## Table of Contents ##

| Area     | Status  | Spec file            |
| -------- | ------- | -------------------- |
| Login    | Done    | `tests/login.spec.ts` |
| Cart     | Planned | `tests/cart.spec.ts`  |
| Checkout     | Planned | `tests/checkout.spec.ts`  |
| Access Control     | Planned | `tests/access.spec.ts`  |


Plain english cases, issues and findings: 
`docs/`


## Setup ##

Requirements: Node.js 18+ and pnpm.

``` bash

git clone <your-repo-url>
cd saucedemo
pnpm install
pnpm exec playwright install --with-deps

```

## Running the tests ##

``` bash
# Run  Everything (headless)
pnpm exec playwright test

# One file (replace login.spec.ts with whatever test file)
pnpm exec playwright test tests/login.spec.ts

# One browser
pnpm exec playwright test --project=chromium

# Interactive UI mode
pnpm exec playwright test --ui

# Open the last HTML report
pnpm exec playwright show-report

```

Tests run against Chromium, Firefox and WebKit. CI runs on every push via GitHub Actions. 

## Approach ##

Followed along with best practices based on Playwrights documentation: https://playwright.dev/docs/writing-tests

- **Test Design First**: Cases are written in plain English before any code, and then implemented. 
- **User-facing Locators**: Role, placeholder, and text locators were preffered over CSS selectors, with test ID's used as a fallback. 
- **Meaningful Assertions**: Each test checks the outcome, not just the action that ran. Error tests also confirm the user stayed on the same page (i.e.: Login Page)
- **Paramaterized Table Driven Tests**: For tests that share the same steps and differ only in data (i.e.: login.spec/ts - Error Messages)

## Known Issues and Scope ##

- **WebKit in headed mode on WSL:** Pages render blank under WSLg in headed mode, but pass headless. Confirmed with a control test against Playwrights own demo app. A local environment issue and not a site bug. Run WebKit headless locally. 
- **UI Only**:  Sauce Demo has no backend API to call, resulting in no API testing here. 
- **Hosted site**: Tests run against a public site, so network-level behavior (latency, rate limiting) isn't controlled.
