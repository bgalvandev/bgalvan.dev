---
name: frontend-i18n
description: How to internationalize the portfolio UI — put user-facing text in the next-intl message catalogs (never hard-code it), keep es/en in sync, and switch locale via a cookie (no URL prefix). Use when adding or changing any visible text or adding a locale.
---

# Frontend i18n

The site ships two locales — `es` (default) and `en` — with **no URL prefix**: the
active locale lives in a cookie, resolved per request in `src/i18n/request.ts` (the
i18n composition root). To change the default, flip `defaultLocale` in
`src/i18n/config.ts`.

## The one rule

Every user-facing string comes from a message catalog. **Never** hard-code visible
text in a component. Keep `src/i18n/messages/es.json` and `en.json` in sync — same
keys in both, or a lookup throws.

## Adding or using a string

1. Add the key to **both** `es.json` and `en.json`, under a namespace (`home`,
   `nav`, `projects`, …).
2. Read it with `useTranslations('<namespace>')` — works in Server and Client
   Components. In an **async** Server Component (e.g. `generateMetadata`) use
   `await getTranslations('<namespace>')` instead (you can't call a hook there).
3. Interpolate values / ICU plurals:
   `t('count', { n })` with `"{n, plural, one {# project} other {# projects}}"`.

## Type safety (keys checked at compile time)

Messages are type-safe via the `AppConfig` augmentation in `src/i18n/next-intl.d.ts`
(`Messages: typeof enMessages`, `Locale`). A key not in the catalog (`t('nope')`) or
an unknown locale is a **`tsc` error**, so `pnpm run typecheck` is the guard. `en` is
the source of truth for the types; `messages.spec.ts` (key parity) guarantees `es`
has the same keys, so a type-valid key is never missing at runtime.

## Switching locale

`LocaleSwitcher` (`src/i18n/locale-switcher.tsx`, a client leaf) writes the locale
cookie via the `setLocale` Server Action, then `router.refresh()` re-renders Server
Components in the new language. Because the locale is read from the cookie, the home
route renders dynamically (per request) rather than as static HTML.

Related: [[frontend-architecture]], [[frontend-design]].
