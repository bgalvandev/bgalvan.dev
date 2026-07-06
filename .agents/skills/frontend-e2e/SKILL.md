---
name: frontend-e2e
description: Write and run browser end-to-end tests for the portfolio with Playwright — role/text locators, web-first assertions, a thin Page Object Model, and a production-build server as the test boundary. Use when adding e2e coverage for a user journey or debugging the e2e suite.
allowed-tools: Bash(pnpm run test:e2e), Bash(pnpm run test:e2e:ui), Bash(pnpm exec playwright*)
---

# Frontend E2E (Playwright)

The e2e suite lives in `e2e/` and runs against a **production build** of the site
(`next build` + `next start`) — the same output that ships. There is no API or
database, so tests exercise the rendered pages directly; no request mocking or stub
server is needed. Run it with `pnpm run test:e2e` (Playwright's `webServer` builds
and starts the app automatically).

## Layout

```txt
e2e/
  <journey>.spec.ts        # tests (testDir: ./e2e, default **/*.spec.ts)
  pages/<page>.page.ts     # Page Objects (locators + user-intent actions)
playwright.config.ts       # webServer, projects, reporters (repo root)
```

Two projects run the same specs on the Chromium engine: `chromium` (desktop) and
`mobile` (Pixel 5 viewport) — so responsive layout is covered without downloading
extra browsers.

## Writing tests

- **Page Object Model**: put locators and intent actions in a `*.page.ts`; keep the
  spec about behavior. Page objects stay thin — locators + actions, no assertions.
- **Locators**: prefer `getByRole`, `getByText`, `getByLabel` — what a user
  perceives. Never select by CSS class or Tailwind utility (markup churns).
- **Web-first assertions are the wait mechanism**: `await
  expect(locator).toBeVisible()` / `toHaveText()` auto-wait and retry. Never use
  `waitForTimeout`/hard sleeps.
- **Tags**: mark the critical path with the options-object form —
  `test('title', { tag: '@smoke' }, ...)` — and filter with `--grep @smoke`.
- Keep tests independent and idempotent; each navigates fresh from `goto()`.

## Running

- `pnpm run test:e2e` — full suite (chromium + mobile), CI-equivalent.
- `pnpm exec playwright test --project=chromium` — fast local loop on one project.
- `pnpm run test:e2e:ui` — interactive UI mode (pick tests, time-travel the DOM).
- First run on a fresh machine needs the browser:
  `pnpm exec playwright install --with-deps chromium` (`--with-deps` installs OS
  libraries and may require root; CI does this automatically).
- Debug a failure with the trace: `pnpm exec playwright show-trace <trace.zip>`.
  Traces/screenshots for failures land in `test-results/` (gitignored).

## Scope and the `check` gate

E2e is **separate** from `pnpm run check` (which stays fast and offline): it needs a
browser and a running server. A dedicated `e2e` job in `.github/workflows/ci.yml`
(`needs: check`) installs Chromium, then runs `pnpm run test:e2e`; the HTML report
uploads as an artifact on failure. Keep the suite a thin smoke layer over the
critical path — unit/component behavior belongs in Vitest + RTL next to the source.

## Verification

- `pnpm run test:e2e` passes locally (after installing the browser) and in CI.
- Reviewer checks locators are role/text-based and assertions are web-first.

Related: [[frontend-architecture]], [[frontend-design]], [[engineering-discipline]].
