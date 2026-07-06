# ADR 0002: Browser e2e without a database

- Status: Accepted
- Date: 2026-07-06
- Impact: low — sets the scope and boundary of the Playwright suite.

## Context

The portfolio has no API or database; pages are static/SSR with content from
`src/content`. We still want browser coverage of the critical path — the page renders,
links resolve, dark mode applies — to catch regressions unit tests can't see.

## Options considered

- **Playwright against a production build, no data layer** (chosen): the Playwright
  `webServer` runs `next build && next start`, so tests assert on the real shipped
  output. Tradeoff: a rebuild per run (seconds), acceptable here.
- **Stub API / seeded database lane** (as in the vitalpro monorepo): required when pages
  read a backend server-side. Tradeoff: pure overhead here — there is no backend to stub.
- **No e2e, unit/component only**: cheapest. Tradeoff: never exercises the real build,
  routing, or CSS-driven dark mode in a browser.

## Decision

Run **Playwright against a production build with no stub or database**. Keep the suite a
thin smoke layer over the critical path; unit/component behavior stays in Vitest + RTL
next to the source. If a backend or dynamic data is added later, introduce a stub/seed
lane in a follow-up ADR — that is where the vitalpro `frontend-e2e` approach would apply.

## Consequences

- `pnpm run test:e2e` builds and starts the app itself; a dedicated CI `e2e` job runs it.
- Tests use role/text locators and web-first assertions (see the `frontend-e2e` skill).
- Adding data-backed flows later is a known, documented extension point, not a rewrite.
