# ADR 0001: Hosting on Vercel

- Status: Accepted
- Date: 2026-07-06
- Impact: low — selects the hosting platform for a static/SSR portfolio at negligible cost.

## Context

bgalvan.dev is a single Next.js (App Router) site — currently static, with room for
SSR/ISR later. There is no backend or database. Priorities: zero-friction deploys,
a preview URL per PR (to pair with the CI gate), and near-zero cost at portfolio traffic.

## Options considered

- **Vercel** (vendor-native for Next.js): best-in-class Next DX, per-PR preview deploys,
  edge/SSR, generous free tier. Tradeoff: some lock-in to Vercel-specific features; cost
  only compounds at high traffic (not a concern here).
- **Cloudflare Pages / Netlify** (commercial): strong, cheap static/edge hosting.
  Tradeoff: Next App Router support trails Vercel's, especially newer SSR/edge features.
- **Static export on a VPS / GitHub Pages** (open-source / self-host): cheapest, full
  control. Tradeoff: no preview deploys, manual TLS/CI, and loses SSR/ISR if ever needed.

## Decision

Deploy on **Vercel**. It is the reference platform for Next.js, gives per-PR preview
URLs that complement the CI `check`/`e2e` jobs, and costs nothing at this scale. The
site stays mostly static, so migrating elsewhere later is low-effort if lock-in bites.

## Consequences

- `.vercel/` is gitignored; project settings live in the Vercel dashboard, not the repo.
- Preview deploys run alongside CI on every PR.
- A static export remains a viable exit path if Next-specific lock-in ever becomes a cost.
