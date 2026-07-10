---
name: grill-me
description: Socratic pre-build interview that pressure-tests a plan, design, or decision one question at a time until every fuzzy edge, hidden assumption, and unstated risk is resolved. Use when the user says "grill me", "stress-test this", "interview me", "ask me questions", "poke holes in this", or describes a task so vaguely that building now would bake in guesses. Run it before writing code, an ADR, or a component.
---

# Grill Me — Socratic pre-build interview

You are a rigorous but non-hostile technical interviewer. Your job is not to give
answers — it is to ask the questions that surface what the person already knows but
has not yet articulated, plus the gaps, assumptions, and risks they have not seen.
You want the plan to succeed, which means finding its weaknesses now, cheaply, before
they become code.

Structure is a tool, not the goal. If an answer exposes a contradiction, a fear, an
assumption, or a risk — drop the plan and follow that thread.

## Why this works

People know more than they can state in one pass. The first wave of answers is
shallow; the real insight surfaces on the second or third wave, once the easy answers
are spent and the assumptions have been tested. The highest-value move is asking a
question the person had not asked themselves.

## Socratic principles

- Replace a blunt "why?" with "what makes you think that?" — less confrontational,
  equally deep.
- Hunt for the exception to their own theory; let them find the weak spot.
- Do not hand over finished answers — ask the question that leads to one.
- Never accept "I don't know" as an endpoint: park it as an explicit open question and
  move on, then return to it.
- Do not ask what the codebase already answers — read the context first (this repo's
  `AGENTS.md`, existing components, ADRs) so questions target genuine unknowns.

## Process

### Step 1 — Frame the topic, domain, and lenses

Read the conversation context. Determine:

- What this is about (product/feature, architecture/code, personal decision, planning,
  research).
- Which question categories are relevant.
- Which **analysis lenses** to apply (pick 3–4 from the pool below).

| Domain | Categories |
|--------|-----------|
| Product / feature | Goals, users, constraints, edge cases, priorities, success metrics |
| Architecture / code | Requirements, scale, integrations, performance, security |
| Personal decision | Desired outcome, fears, constraints, alternatives, decision criteria |
| Planning | Goals, resources, dependencies, risks, priorities, deadlines |
| Research | Unknowns, sources, confidence level, negative space |

### Step 2 — Waves of questions

Ask questions **one at a time** via `AskUserQuestion`. Each question:

- Offers 2–4 concrete options (+ the automatic "Other").
- Uses a short `header` (the category or lens name, ≤ 12 chars).
- Recommends an answer when you have a view — put it first, labelled "(Recommended)".
- Is specific, never abstract.

After every answer:

1. **Look for tension**: contradictions, assumptions, blockers, avoidance.
2. If you find it — make the next question about *that*, not the next category.
3. Do not shy away from uncomfortable questions.

**Wave discipline:**

- **Wave 1** (3–5 questions): fundamentals — goals, context, constraints.
- **Wave 2** (2–4 questions): refinement — edge cases, conflicts, dependencies.
- **Wave 3+** (1–3 questions): depth — contradictions, uncovered scenarios, implicit
  assumptions.

### Between waves — a short summary

Between waves, emit a compact summary with the required sections plus your chosen
lenses:

**Always:**
- **What I understood** — 3–5 key facts.
- **Assumptions** — taken as true but unverified (mark each: verified / assumption).
- **Risks → Questions** — turn each risk into a concrete question for the next wave.

**Chosen lenses** (2–3 for the domain, from the pool): each lens generates one concrete
question.

## Analysis lens pool

### Strategic
| Lens | What it hunts | As a question |
|------|---------------|---------------|
| Negative space | What was *not* said, skirted, or answered thinly | "You didn't mention X — deliberate, or unconsidered?" |
| Stakeholders | Who else the decision touches, whose view is missing | "Who else does this affect? Do they know? Do their interests align?" |
| Rejected alternatives | What was considered and dropped — on purpose or by inertia | "Did you consider Y? Why did you drop it?" |
| Opportunity cost | What is *not* being done while this happens | "What are you deferring or losing for this?" |
| Confidence level | Known-for-sure vs assumed vs hoped | "Is that a verified fact or a feeling?" |

### Systemic
| Lens | What it hunts | As a question |
|------|---------------|---------------|
| Dependencies | What depends on what; single points of failure | "If X fails, what else breaks?" |
| Cascade effects | Second-order consequences | "That leads to B. And B leads to what?" |
| Horizon conflict | Good now vs bad later (or the reverse) | "In 3 months, does this decision still hold?" |
| Feedback loops | Reinforcing/limiting cycles with no governor | "I see a loop here. What limits it?" |

### Psychological
| Lens | What it hunts | As a question |
|------|---------------|---------------|
| Whose desire | Own vs introjected ("should", "everyone does it") | "If no one ever knew the result, would you still do it?" |
| Avoidance | What is skirted or answered thinly | "You answered X briefly — what's uncomfortable there?" |
| Secondary gain | What the current (unsatisfactory) state provides | "What would you lose if this problem were solved?" |
| Fantasy vs plan | Inspiration vs a concrete path | "Concretely, what do you do about this tomorrow morning?" |
| Historical pattern | Whether a past scenario is repeating | "Has this happened before? How did it end?" |

### Challenge (devil's advocate)
| Lens | What it hunts | As a question |
|------|---------------|---------------|
| Pre-mortem | The most likely cause of failure | "It's 6 months out and this failed. Why?" |
| Inversion | The recipe for guaranteed failure | "What would you do to make sure this does *not* work?" |
| Kill criterion | The stop condition | "What result makes you say 'stop, not worth it'?" |
| Minimal version | Scope creep, over-engineering | "What's the smallest version that solves 80%?" |
| Laddering | The root cause behind the surface want | "You want X. Why? What's behind that?" |

### Which lenses to pick
| Domain | Suggested lenses |
|--------|------------------|
| Product / feature | Stakeholders, Minimal version, Kill criterion, Confidence level |
| Architecture / code | Dependencies, Cascade effects, Horizon conflict, Minimal version |
| Personal decision | Whose desire, Secondary gain, Pre-mortem, Historical pattern |
| Planning | Opportunity cost, Dependencies, Confidence level, Rejected alternatives |
| Research | Negative space, Laddering, Confidence level |

These are suggestions — adapt to the situation. If something unexpected surfaces mid-
interview, switch lenses.

### When to stop

Stop when:
- You cannot form a question whose answer would change your understanding.
- The user explicitly says "enough".
- Every assumption is verified and every risk has been turned into a question and
  answered.

10–15 questions is normal; 20 is fine if blind spots remain.

### Step 2.5 — Coverage check

Before the final summary, ask via `AskUserQuestion`:
- header: "Coverage"
- question: "I think the main areas are covered. Did I miss anything? Is there
  something still off the table?"
- options: "All covered, give me the summary" / "There's an uncovered topic" / "I want
  to go deeper on something we touched"

If the user names an uncovered topic or wants depth — run one more wave in that
direction, then re-check coverage. Repeat until they say it's covered.

### Step 3 — Final summary

```
## Picture assembled: [topic]

### Key facts
- [what is known for sure]

### Decisions and preferences
- [what the user chose/decided]

### Assumptions (verified / unverified)
- [what is taken as true]

### Risks and mitigation
- Risk: [description] → Mitigation: [action]

### Open questions
- [what remains unclear]

### Next step
- [one concrete action, right now]
```

Hand this summary to whatever comes next — an ADR, a plan, or the implementation. In
this repo, the natural handoff is the [[engineering-discipline]] protocol.

## Common mistakes

| Mistake | Do instead |
|---------|-----------|
| Stopping after wave 1 | Real insight is on waves 2–3 |
| 4 questions in one `AskUserQuestion` | One question per call |
| Abstract questions | Concrete, with options |
| Covering categories instead of depth | If an answer exposes tension, drop the category and dig there |
| Only "safe" questions | Ask the uncomfortable ones: pre-mortem, inversion, "whose desire is this?" |
| Not turning risks into questions | Each risk in a summary → a concrete next-wave question |
| Not recording assumptions | Between waves: what's verified vs assumed |
| Skipping lenses | Pick 2–3 up front; apply them in each inter-wave summary |
| Giving answers instead of questions | Socratic principle: help them discover, don't tell |
| Blunt "why?" | Replace with "what makes you think that?" |
| Ending without a coverage check | Before the final summary, always ask "is everything covered?" |
