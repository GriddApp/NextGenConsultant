---
name: parallel-bullets
description: >
  Enforces parallel grammatical structure to bullets points. This skill should be used when the user asks to "make these bullets parallel",
  "fix these bullet points", "clean up this list", "normalize these bullets",
  "parallel structure", "make these consistent", or "rewrite these items consistently".
  Also trigger when the user selects bullet points on a PowerPoint slide and asks for
  editing, polishing, or consistency improvements. Applies parallel grammatical structure
  across list items without changing meaning or formatting.
---

# Parallel Bullets

Enforce parallel grammatical structure across list items on the current slide or in pasted text. Preserve meaning, order, and visual/structural formatting.

## Workflow

### Step 1: Extract the Bullets

1. Read the bullet-point text the user has provided or selected on the current slide.
2. If the user specifies a preferred grammatical form (e.g., "use gerunds", "use noun phrases"), note it for Step 2.

### Step 2: Determine the Grammatical Form

Choose one grammatical form for all items. Priority:

1. If the user specified a preferred form, use it.
2. If a clear majority of items already use one form (noun phrase, gerund, infinitive), adopt that form.
3. Otherwise, default to **imperative verb phrases**.

### Step 3: Apply Transformations

Process each item applying all rules below:

**Rule 1 — Preserve list scaffolding**
Keep bullet markers, numbered markers, nesting/indentation, and checkbox states exactly as they are.

**Rule 2 — Preserve inline formatting**
Keep bold, italics, code spans, and links intact. Link URLs must remain unchanged. Anchor text may be adjusted for parallelism while keeping formatting wrappers.

**Rule 3 — Normalize leading verbs**
Convert the head of each item to the chosen grammatical form:
- Gerund to imperative: "Onboarding faster" becomes "Accelerate onboarding"
- Infinitive to imperative: "To reduce churn" becomes "Reduce churn"
- Noun phrase to imperative: "Reduction of churn" becomes "Reduce churn"
- Reverse as needed depending on the chosen form.

**Rule 4 — Remove boilerplate prefixes**
Strip filler phrases that add no meaning, then re-inflect to the chosen form:
- "Ability to", "Capability to", "Can", "To", "We will", "Our team will", "Need to", "Should", "Must"
- Example: "Ability to increase adoption" becomes "Increase adoption"

**Rule 5 — Capitalization**
Use **Sentence case** (capitalize first word + proper nouns/acronyms). Exception: if a clear majority of items use Title Case, preserve Title Case for all items.

**Rule 6 — Punctuation**
- Remove terminal punctuation (`.` `;` `,` `:`) from list items.
- Keep `?` or `!` when semantically meaningful.
- Internal punctuation (commas, parentheses, em dashes) is fine when needed.

**Rule 7 — Meaning and integrity**
Preserve item order, named entities, numbers, dates, units, and quantitative claims exactly. Do not invent, omit, or reinterpret facts.

**Rule 8 — Stability**
Items already parallel require only minor normalization (boilerplate removal, case, punctuation). Do not rewrite items that are already correct. If unsure, leave the item as-is.

**Rule 9 — Proofread**
Fix obvious grammatical errors, typos, or agreement issues within items.

### Step 4: Return the Result

Output the revised list so that it can be copied into PowerPoint
