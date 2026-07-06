---
name: pr-ready
description: Verify a pull request is genuinely ready before opening it, marking it ready, or reporting that its checks pass — fetch, ancestry vs origin/main, mergeability, and CI rollup — so you never report a conflicting or stale branch as ready. Use before creating a PR, updating one, or telling the user a PR is ready to merge.
argument-hint: '[pr-number]'
allowed-tools: Bash(git fetch *), Bash(git merge-base *), Bash(git rev-parse *), Bash(git status *), Bash(gh pr view *), Bash(gh pr checks *)
---

# Pull request readiness check

Run before creating a PR, updating one, or telling the user a PR is ready to merge.
Complements the `commit-check` skill (which validates the commit and branch) — this one
validates the PR against `origin/main` and CI. Do not skip steps.

## Inputs

- `$0` (optional): the PR number. If omitted, derive it once a PR exists with
  `gh pr view --json number`.

## Pre-resolved state

- Current branch: !`git branch --show-current`
- Fetch + ancestry vs origin/main: !`git fetch origin --quiet && (git merge-base --is-ancestor origin/main HEAD && echo "UP-TO-DATE" || echo "BEHIND — update before reporting ready")`

If the ancestry line reads `BEHIND`, update the branch (rebase or merge `origin/main`)
and re-run this skill before reporting readiness.

## Steps

1. The fetch + ancestry check above already ran. If it reported `BEHIND`, stop and
   update the branch first; re-run afterward.
2. Inspect GitHub mergeability and checks:
   ```bash
   gh pr view $0 --json mergeStateStatus,statusCheckRollup,headRefName,baseRefName
   ```
3. Interpret the result strictly:
   - `mergeStateStatus == DIRTY` → NOT ready. Report the conflict.
   - `mergeStateStatus == UNKNOWN` → GitHub is still computing; re-query, do not conclude.
   - `statusCheckRollup == null` → required checks (`check`, `e2e`) have not registered;
     do not claim checks are running. Wait until they appear QUEUED / IN_PROGRESS / COMPLETED.
   - Any check `FAILURE` → NOT ready. Report which job failed.
4. The PR is ready only when the branch is up-to-date with `origin/main`,
   `mergeStateStatus` is CLEAN, and every required check passes. Report the PR URL, the
   merge state, and the required check names.

## Merge-block triage

If GitHub says "Merging is blocked" while checks pass, do NOT add unrelated code to
clear it. Inspect, in order: branch-protection requirements and unresolved review
threads. Fix true positives; dismiss false positives with written justification.

## Note on `gh` and GraphQL

`gh pr edit` / `gh pr merge` can fail on this repo with a Projects-classic GraphQL
error. Fall back to the REST API — e.g. merge with
`gh api --method PUT repos/{owner}/{repo}/pulls/{n}/merge -f merge_method=squash`.

Related: [[commit-check]], [[engineering-discipline]].
