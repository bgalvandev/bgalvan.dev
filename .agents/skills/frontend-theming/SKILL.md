---
name: frontend-theming
description: How to color and theme the portfolio UI — use the semantic design tokens (never raw Tailwind palette colors), add tokens the CSS-first Tailwind v4 way, and build light/dark-aware components with next-themes. Use when adding or restyling a component, choosing colors, adding a token, or touching globals.css.
---

# Frontend Theming

The UI has ONE color substrate: semantic design tokens, defined once in
`src/app/globals.css` and theme-aware by construction. A component picks the token
that names its intent; it never picks a raw color and never knows which theme is
active. This is the substrate, not the style — per-feature visual expression stays
free (see [[frontend-design]]).

## The one rule

Use semantic token utilities. **Never** use a raw Tailwind palette color
(`bg-slate-100`, `text-gray-500`, bare `bg-white`/`text-black`) — they are
theme-blind and render wrong in one of the two themes.

Current tokens (light + dark both defined):

| Token utility | Role |
|---|---|
| `bg-paper` | page background |
| `bg-surface` / `border-line` | raised surfaces and their borders |
| `text-ink` | primary text |
| `text-muted` | secondary text |
| `text-accent` / `bg-accent` | the single accent (links, focus, hover) |
| `text-accent-contrast` | text on an accent fill |
| `font-mono` | mono face for labels, years, the spec-sheet header |

## Adding a token

Tailwind v4 is CSS-first — there is no `tailwind.config.ts`. Tokens live in
`globals.css`; three edits, always together:

1. Declare the light value in `:root`.
2. Declare the dark value in `.dark`.
3. Map it under `@theme inline` so a utility is generated.

```css
:root  { --focus-ring: #2b4be3; }
.dark  { --focus-ring: #8298ff; }
@theme inline { --color-focus-ring: var(--focus-ring); }  /* → ring-focus-ring, etc. */
```

`@theme inline` (not plain `@theme`) is load-bearing: `inline` makes the utility
emit `var(--token)`, so the `.dark` override applies at runtime. A plain `@theme`
bakes the light value at build time and dark mode silently does nothing. The
class-based dark variant is wired with
`@custom-variant dark (&:where(.dark, .dark *))`.

Steps 1 and 2 are **not optional**: `theme-tokens.spec.ts` fails the build if
`:root` and `.dark` declare different token sets.

## Theme-aware components

- Colors come only from tokens, so a single class-set works in both themes. Reach
  for a `dark:` variant only for a genuinely theme-specific tweak a token can't
  express (rare).
- `next-themes` owns theme state: `ThemeProvider` at the root (`attribute="class"`,
  `defaultTheme="system"`, no-flash). Read/set the theme with `useTheme()` in a
  client leaf (see `components/theme-toggle.tsx`).
- Avoid client state for theme-dependent rendering — it causes hydration mismatches
  and trips the React Compiler's `set-state-in-effect` lint. Drive visuals with the
  `.dark` class in CSS instead, as the toggle does (its label is a pure `dark:`
  variant, no `useState`/`useEffect`).

## Accessibility floor

Interactive elements keep a visible focus style from a token
(`:focus-visible { outline: var(--accent) }` in `globals.css`). Contrast holds in
both themes.

Related: [[frontend-design]], [[frontend-performance]].
