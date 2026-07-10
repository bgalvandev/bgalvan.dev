# ADR 0002: CSS-first theming with a light/dark toggle

- Status: Accepted
- Date: 2026-07-10
- Impact: low — sets how the UI is colored and how the theme is chosen.

## Context

The site needs a light and a dark theme. The first pass used a `tailwind.config.ts`
for color tokens plus `@media (prefers-color-scheme: dark)` — OS-driven only, with no
way for a visitor to override it, and a JS config file that also produced a Node
`MODULE_TYPELESS_PACKAGE_JSON` warning (see ADR history / the ESM-config change).

## Options considered

- **CSS-first tokens + class-based toggle** (chosen): drop `tailwind.config.ts`;
  define semantic tokens in `globals.css` with `@theme inline` + `:root`/`.dark`;
  drive dark mode with a `.dark` class managed by `next-themes` (a
  `system`/`light`/`dark` toggle). Tradeoff: adds a tiny client dependency
  (`next-themes`, ~1 KB) and a client leaf for the toggle.
- **Keep `prefers-color-scheme` only**: simplest, zero JS. Tradeoff: no user
  override — a visitor whose OS is light can never see the dark design, and vice-versa.
- **Keep the JS config + a hand-rolled toggle**: avoids a dependency. Tradeoff:
  reimplements no-flash theme persistence (the hard part `next-themes` solves) and
  keeps the config file and its warning.

## Decision

Adopt **CSS-first theming** (`@theme inline`, no `tailwind.config.ts` — Tailwind v4
auto-detects content) with a **`next-themes` toggle** defaulting to `system`. Tokens
are semantic (`bg-paper`, `text-ink`, …); components never use raw palette colors.
The toggle's label is driven purely by the `.dark` class (CSS `dark:` variant), so it
needs no client state — avoiding hydration mismatch and the React Compiler's
`set-state-in-effect` lint. See the `frontend-theming` skill.

## Consequences

- `system` default preserves the old auto-behavior; the toggle adds user control.
- A `theme-tokens.spec.ts` parity test fails the build if `:root` and `.dark` drift.
- Removing `tailwind.config.ts` also removed the last JS config quirk; theming lives
  in one file (`globals.css`).
