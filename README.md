# bgalvan.dev

Personal portfolio of Bruno Galván.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router) + React 19 + TypeScript (strict)
- [Tailwind CSS v4](https://tailwindcss.com/)
- React Compiler enabled
- [Vitest](https://vitest.dev/) + React Testing Library
- Tooling: ESLint (flat config), Prettier, knip (dead code), jscpd (duplication)

## Requirements

- Node.js (see `.nvmrc`) — `nvm use`
- pnpm (pinned via `packageManager` in `package.json`) — `corepack enable`

## Getting started

```bash
pnpm install
pnpm run dev        # http://localhost:3000
```

## Scripts

| Script                | What it does                                        |
| --------------------- | --------------------------------------------------- |
| `pnpm run dev`        | Start the dev server                                |
| `pnpm run build`      | Production build                                    |
| `pnpm run start`      | Serve the production build                          |
| `pnpm run lint`       | ESLint                                              |
| `pnpm run typecheck`  | `tsc --noEmit`                                      |
| `pnpm run test`       | Run tests once (Vitest)                             |
| `pnpm run test:watch` | Watch mode                                          |
| `pnpm run format`     | Prettier write                                      |
| `pnpm run dead-code`  | knip                                                |
| `pnpm run dupes`      | jscpd                                               |
| `pnpm run check`      | lint + typecheck + test + build + dead-code + dupes |

## Project layout

```txt
src/
  app/          # routes (App Router) — composition roots
  components/    # reusable UI components
  content/       # site data (projects, etc.)
```

## Conventions

Engineering standards live in [`AGENTS.md`](./AGENTS.md); repeatable procedures live as
skills under `.agents/skills/**`.
