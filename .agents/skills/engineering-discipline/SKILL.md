---
name: engineering-discipline
description: The working protocol for any non-trivial change in the portfolio — verify before claiming, no hallucinated APIs, smallest correct solution, and run the gates before declaring done. Use at the start of an implementation task and before reporting it finished.
---

# Engineering Discipline

The goal: one clear line of reasoning to the best solution — no guessing, no
hallucinated APIs, no speculative scaffolding. This skill is the default operating
protocol; the topic skills ([[frontend-architecture]], [[frontend-performance]],
[[code-quality]], [[frontend-design]]) cover specifics.

## 1. Ground every claim in evidence

- Before using a function, type, package export, config flag, or CLI option,
  **confirm it exists** — read the file, check `package.json`, or check official
  docs. Do not invent names or assume an API shape from memory.
- Before asserting something works ("tests pass", "the build is green", "this
  fixes it"), **run the command and read the output**. Report what actually
  happened, including failures — never claim a result you did not observe.
- When unsure between two readings of the requirement, ask or state the assumption
  explicitly; do not silently pick one and build on it.

## 2. Smallest correct change

- Use the smallest code path and surface that satisfies the requirement while
  preserving the architecture.
- Do **not** add abstractions, adapters, services, or shared utilities for
  speculative future reuse. Add structure only when the current behavior needs it.
- Match the surrounding code: naming, file conventions, comment density, and test
  style.

## 3. Respect the architecture

- Keep the layout idiomatic and flat (see [[frontend-architecture]]): routes in
  `src/app/**` compose, `src/components/**` holds reusable UI, `src/content/**` and
  `src/lib/**` hold data and small helpers. Do not reintroduce heavy layering.
- Server Components by default; `'use client'` only on the leaf that needs it.
- Keep files small and single-purpose (one exported component per file).

## 4. Change workflow

1. Identify the target route/component/content and where it lives under `src`.
2. Change the content/data first when behavior changes, then the components that
   render it, then the route that composes them. Add/adjust tests alongside.
3. Verify before declaring done.

## 5. Definition of done (run these, read the output)

- Local gate before merge: `pnpm run check` (lint, typecheck, test, build,
  dead-code, dupes) — all green.
- For narrower iteration, run the affected pieces directly: `pnpm run lint`,
  `pnpm run typecheck`, `pnpm run test`.
- For commits use the [[commit-check]] skill.

If a gate fails, fix the cause — do not weaken the gate, delete the test, or add an
ignore to make red turn green. Justify any genuinely-needed config exception in the
PR.
