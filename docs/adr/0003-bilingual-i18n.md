# ADR 0003: Bilingual UI (es/en) with cookie-based locale

- Status: Accepted
- Date: 2026-07-10
- Impact: low — sets how the UI is translated and how the locale is chosen.

## Context

The portfolio should read in Spanish and English (the author's language plus the
broadest professional-audience language). The copy was English-only and hard-coded in
components. We want real translations, type-safe keys, and a clean URL.

## Options considered

- **`next-intl`, cookie-based locale, no URL prefix** (chosen): strings live in
  `src/i18n/messages/{es,en}.json`; the active locale is a cookie resolved per
  request; a `LocaleSwitcher` writes the cookie via a Server Action. Tradeoff: reading
  the cookie makes the home route render dynamically (not static).
- **`next-intl` with routed locales (`/es`, `/en`)**: keeps static rendering.
  Tradeoff: adds a URL prefix and an `app/[locale]/` segment — heavier structure and
  uglier URLs for a one-page site.
- **No i18n / English only**: simplest. Tradeoff: excludes the Spanish-speaking
  audience the author writes for.

## Decision

Adopt **`next-intl` with a cookie-based locale and no URL prefix**. `es` is the
default (flip `defaultLocale` in `src/i18n/config.ts` to change it). Keys are
type-checked against the `en` catalog; a `messages.spec.ts` parity test keeps `es` in
lockstep. See the `frontend-i18n` skill.

## Consequences

- The home route renders per-request (dynamic) instead of as static HTML — acceptable
  at portfolio scale.
- Every visible string must live in both catalogs; the parity test enforces it.
- Clean URLs (no `/es` or `/en`); the visitor's choice persists in a cookie.
