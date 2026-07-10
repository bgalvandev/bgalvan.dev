# AGENTS.md

## Scope

This document is the engineering standard for this repository — the personal
portfolio at `bgalvan.dev`. It applies to all contributors (human and AI) and all
CI workflows. It holds **always-on standing rules**. Repeatable _procedures_ live in
skills under `.agents/skills/**` and are referenced from here, not restated.

The key words **MUST, MUST NOT, SHOULD, SHOULD NOT, MAY** are interpreted per BCP 14
(RFC 2119, RFC 8174) when in all capitals.

### Precedence

1. Direct system/developer/user instructions override this file.
2. This standard is evolvable, not frozen: when a better tool or pattern supersedes a
   rule, update the affected rule in the **same** change rather than working around it
   silently. Silent drift between a rule and the actual practice is the only thing
   forbidden.

## Language Standard

All technical artifacts (code comments, commit messages, PR descriptions, docs) MUST
be written in English by default. Product/content copy on the site MAY be in any
language the design calls for.

## Stack Baseline

Default unless a documented decision approves an exception.

- Framework: **Next.js (App Router) + React + TypeScript** with `"strict": true`.
- Styling: **Tailwind CSS v4**; UI as repository-owned source components (never opaque
  binary bundles).
- The **React Compiler is enabled** (`reactCompiler: true` in `next.config.js`, backed
  by `babel-plugin-react-compiler`) — see the `frontend-performance` skill.
- Package manager: **pnpm** (pinned via `packageManager` in `package.json`); Node.js
  version pinned in `.nvmrc`.
- Tests: **Vitest** + **React Testing Library**.
- Deploy: static/SSR host (e.g. Vercel).

## Frontend Architecture Standard

Scope: `src/**`. Procedures: `frontend-architecture` and `frontend-performance` skills.

1. Structure follows idiomatic Next.js App Router: `src/app/**` holds routes
   (composition roots, no heavy business logic), `src/components/**` holds reusable
   components, `src/content/**` and `src/lib/**` hold data/content and small explicit
   utilities.
2. Components MUST be Server Components by default; `'use client'` MUST be placed only
   on the leaf component that needs interactivity/browser APIs — never on layouts or
   pages.
3. One exported component per file; component files SHOULD stay under ~150 lines —
   extract sub-components/hooks when exceeded (justify any deliberate exception).
   Generic `utils.ts`/`service.ts` names MUST NOT be used; prefer explicit names.
4. Manual memoization (`useMemo`/`useCallback`/`React.memo`) MUST NOT be added by
   default; rely on the React Compiler and add manual memo only with a
   Profiler-measured reason recorded in a comment.
5. Lists over ~100 items SHOULD be virtualized (deviation justified in the PR).

Verification: `pnpm run lint` and `pnpm run typecheck` pass (the
`eslint-plugin-react-hooks` Rules-of-React/React-Compiler rules are the automated
gate); reviewer checks `'use client'` placement, file size, and virtualization on
large lists.

## Simplicity and Proportionality Standard

1. Changes MUST use the smallest code path and surface that satisfies the requirement.
2. Contributors MUST NOT add abstractions, adapters, shared utilities, or generators
   for speculative future reuse.
3. New files MAY be added when they isolate a concern or test changed behavior.

Verification: reviewer confirms new files/abstractions are required by the changed
behavior, not speculative. The `engineering-discipline` skill is the working protocol.

## Code Quality Gates

Scope: repository-wide. Procedure: `code-quality` skill.

1. Dead code MUST be removed: `pnpm run dead-code` (knip) MUST pass; a genuinely-used
   dependency knip cannot import-trace MAY be added to `knip.json` `ignoreDependencies`
   only with justification.
2. Copy-paste duplication MUST NOT be introduced: `pnpm run dupes` (jscpd, `--threshold
0` over `src`, tests excluded) MUST report zero clones. Shared logic MUST be
   extracted into the owning module, not a speculative utility.
3. Both gates run inside `pnpm run check` and CI, and MUST pass.

## Testing Standard

1. Unit/component tests MUST use **Vitest** + **React Testing Library** and assert
   user-visible behavior.
2. Test files live next to source as `*.spec.{ts,tsx}` / `*.test.{ts,tsx}`.
3. Browser end-to-end tests use **Playwright**, live in `e2e/**/*.spec.ts`, and run
   against a production build via `pnpm run test:e2e` — separate from `check` (they
   need a browser and a server) and covered by a dedicated CI `e2e` job. Procedure:
   `frontend-e2e` skill.

Verification (minimum merge gate): `pnpm run check` passes
(lint, typecheck, test, build, dead-code, dupes); the CI `e2e` job passes.

## Commit Message Standard

Commit messages MUST follow **Conventional Commits 1.0.0**. Procedure: `commit-check`
skill.

1. Every commit MUST start with a valid type: `feat`, `fix`, `refactor`, `perf`,
   `docs`, `test`, `build`, `ci`, `chore`, `revert`.
2. Scope is optional and SHOULD map to a site area when one applies (e.g. `home`,
   `projects`, `blog`, `layout`, `ci`).
3. Breaking changes MUST use `!` and/or a `BREAKING CHANGE:` footer.
4. Subjects MUST be concise, specific, and in English.
5. Commit messages and PR descriptions MUST NOT include authorship trailers or
   AI-attribution footers (e.g. `Co-Authored-By:`, `🤖 Generated with ...`).

Examples: `feat(projects): add case-study card grid`, `fix(layout): correct dark-mode
contrast`, `chore(ci): pin node via .nvmrc`.

## Git Risk Controls

1. Prefer `git revert` to undo published commits; prefer non-destructive
   `git restore`/`git reset` for local corrections.
2. High-risk commands (`git reset --hard`, `git clean -fd`, `git push --force`) require
   explicit confirmation; if a force update is unavoidable use `--force-with-lease`,
   never plain `--force`.
3. Do not commit feature work directly on `main`; create a working branch first.
4. Before opening a PR, or reporting one ready or mergeable, run the `pr-ready` skill
   (ancestry vs `origin/main`, mergeability, CI rollup) — never call a stale or
   conflicting branch ready.

## CI and Supply Chain Standard

Scope: `.github/workflows/**`, `.github/dependabot.yml`.

1. GitHub Actions MUST run lint, typecheck, test, and build on pull requests (see
   `.github/workflows/ci.yml`).
2. Dependency update automation MUST be configured via `.github/dependabot.yml`.
3. Workflow credentials MUST live in GitHub Secrets and MUST NOT be committed.

## Decision Records (ADRs)

Decisions that shape the repo and are not obvious from the code — hosting, testing
strategy, a framework/tooling or theming choice — SHOULD be recorded as a short ADR
under `docs/adr/` (copy `0000-template.md`). Records state the decision, the options
weighed, and the consequences; status flows `Proposed` → `Accepted` → `Superseded by
NNNN`. Reference the relevant ADR from the PR that enacts or changes the decision.

## Agent Skills and Local Configuration Standard

Scope: `.agents/**`, `.claude/**`, related `.gitignore` entries, `CLAUDE.md`.

1. A repeatable, verifiable procedure SHOULD be a skill rather than appended here.
2. Canonical skills MUST live under `.agents/skills/**` as `SKILL.md` files; Claude
   Code discovery MUST be a `.claude/skills` symlink to `.agents/skills` — skill files
   MUST NOT be duplicated across paths.
3. Team-owned config MUST be committed (`.agents/skills/**`, the `.claude/skills`
   symlink, `.claude/settings.json`); personal/machine config
   (`.claude/settings.local.json`) MUST stay gitignored.
4. `.claude/settings.json` and skill files MUST NOT contain plaintext secrets.
5. Every committed skill MUST be a `SKILL.md` with `name` and `description`
   frontmatter, and the `description` MUST state when the skill applies.
6. A committed skill MUST NOT silently contradict a rule here; a skill MAY supersede a
   rule only if the same change updates that rule so the two stay coherent.
7. `CLAUDE.md` MUST stay minimal, MUST defer to this file, and MUST NOT duplicate
   normative rules.

Verification: `readlink .claude/skills` resolves to `../.agents/skills` with no
duplicated `SKILL.md`; reviewer checks frontmatter and that no plaintext secrets exist.

## File and Naming Conventions

Files use kebab-case (`project-card.tsx`, `format-date.ts`). Prefer explicit names;
`service.ts`/`utils.ts` are discouraged. Tests are `*.spec.{ts,tsx}` next to source.

## Available Skills

- `engineering-discipline` — default working protocol for any non-trivial change.
- `frontend-architecture` — how to structure components, routes, and content.
- `frontend-performance` — React Compiler, streaming, virtualization, bundle size.
- `frontend-design` — distinctive, intentional visual design.
- `frontend-theming` — semantic design tokens and light/dark theming (CSS-first Tailwind v4 + next-themes).
- `frontend-i18n` — bilingual (es/en) UI with next-intl message catalogs and a cookie locale.
- `frontend-e2e` — Playwright browser end-to-end tests for user journeys.
- `code-quality` — the knip + jscpd gates and DRY extraction.
- `commit-check` — validate a change against commit/branch standards before committing.
- `pr-ready` — verify a PR is genuinely ready (ancestry, mergeability, CI) before opening or merging.
- `grill-me` — Socratic pre-build interview that pressure-tests a plan or decision before building.
