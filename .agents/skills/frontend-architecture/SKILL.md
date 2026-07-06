---
name: frontend-architecture
description: How to structure the portfolio UI — Server Components by default, client at the leaves, idiomatic Next.js App Router layout, and small single-purpose files. Use when adding or reshaping any component, page, hook, or content module under src.
---

# Frontend Architecture

This is a content-focused portfolio site on the Next.js App Router. Keep the
structure idiomatic and flat — do **not** impose per-module Clean Architecture
layers (domain/application/infrastructure/interface). That is overkill for a site
whose job is to render content. The rule is the **layout below**.

## Project layout (follow this)

```txt
src/
  app/         # routes — layouts and pages are composition roots (Next.js App Router)
  components/  # reusable components — one exported component per file
  content/     # data/content: projects, experience, posts, etc.
  lib/         # small, single-purpose utilities with explicit names
```

- `src/app/**` holds the routes. A `layout.tsx`/`page.tsx` is a **composition root**:
  it reads content and wires it into components. Keep heavy logic out of pages —
  they compose, they don't carry business rules.
- `src/components/**` holds reusable UI. One component per file, one exported
  component per file.
- `src/content/**` (or `src/lib/**` for shared helpers) holds the data that drives
  the site — the list of projects, experience entries, post metadata — and small
  utilities. Name things by what they hold or do (`projects.ts`, `format-date.ts`),
  never `utils.ts` / `service.ts`.

## Server Components by default

Every component is a React Server Component unless it needs interactivity. Add
`'use client'` only on the **leaf** that uses state/effects/event handlers or
browser APIs — never on a layout, a page, or a container. Push the directive as
far down the tree as possible so the client bundle stays minimal.

- Server Component: data reading, composition, static markup.
- Client Component (`'use client'`): `useState`/`useEffect`, `onClick`, `useRef`,
  anything touching `window`/`document`.

Content is read directly in Server Components from `src/content/**` (or a helper in
`src/lib/**`) — there is no API layer, no DTO mapping, and no Zod validation of
external responses to do here. Components receive plain typed content objects.

## Small, single-purpose files (no giant files)

- One component per file; one exported component per file.
- A component file should stay under ~150 lines. When it grows past that, extract
  sub-components into `src/components/**` and pull non-trivial logic into a hook or a
  named helper in `src/lib/**`.
- Co-locate the component test (`*.spec.tsx` / `*.test.tsx`) next to the component.
- Name by role, not generic nouns: `project-card.tsx`, `nav-link.tsx` — never
  `utils.ts` / `service.ts`. Helpers go in a named file (`format-date.ts`).

## Verification

- `pnpm run lint` passes (React Compiler / Rules-of-React lint, see
  [[frontend-performance]]).
- `pnpm run typecheck` passes.
- Reviewer confirms `'use client'` sits on leaf components only, and files are small
  and single-purpose (one exported component per file).

Related: [[frontend-performance]] for render cost, [[code-quality]] for
duplication/dead-code, [[engineering-discipline]] for the overall working protocol.
