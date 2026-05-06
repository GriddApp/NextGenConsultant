---
name: rephrase-text
description: >
  Provides 3 alternative ways to rephrase selected slide text, applying Strunk & White writing principles
  optimized for MBB consulting presentations. Use this skill when the user asks to "rephrase", "reword",
  "say this differently", "alternative phrasing", "different ways to say", "rewrite this", "how else
  could I say", "improve the wording", "better way to phrase", or "give me options" on slide text,
  bullet points, or pasted presentation content. Also trigger when the user selects text on a PowerPoint
  slide and asks for rewording, rephrasing, or wording alternatives. Trigger even for short phrases or
  single sentences — the user wants polished consulting-grade alternatives, not just synonyms.
---

# Rephrase Text

Provide 3 alternative phrasings for selected slide or pasted text. Each alternative applies rigorous writing principles tuned for MBB (McKinsey, Bain, BCG) consulting presentations.

## Principles

Every alternative must follow these rules. They are non-negotiable — treat them as a checklist before returning any output.

**Grammar & punctuation**
- Form the possessive singular by adding 's, even for proper nouns ending in s (e.g., "Charles's strategy")
- Use the Oxford comma: place a comma before the final "and" or "or" in a series
- Set off parenthetic expressions with commas
- Place a comma before a conjunction that joins independent clauses
- Never join independent clauses with a comma alone (no comma splices)

**Voice & structure**
- Use the active voice — make the actor the subject
- Put statements in positive form: say what something is, not what it isn't ("failed to" → "did not"; "did not remember" → "forgot")
- Use definite, specific, concrete language — avoid vague abstractions
- Express coordinate ideas in parallel form
- Keep related words together — do not separate subject from verb or verb from object with long intervening phrases
- Place the emphatic word or idea at the end of the sentence

**Economy & tone**
- Omit needless words — every word must earn its place
- Avoid qualifiers: "rather," "very," "little," "somewhat," "quite," "fairly"
- Do not affect a breezy or informal style — maintain professional gravity
- Prefer the plain word over the fancy one ("use" not "utilize," "start" not "commence," "help" not "facilitate")
- Use orthodox spelling
- Be clear above all else

## Behavior

When triggered, immediately produce 3 alternatives. Do NOT ask for confirmation or present preliminary questions. The user triggered the skill because they want options now.

## Workflow

### Step 1: Read the Input

1. Read the text the user has provided or selected on the current slide.
2. Identify the core message — the "so-what" that every alternative must preserve.

### Step 2: Generate 3 Alternatives

Produce exactly 3 rephrased versions. Each must:

- Preserve the original meaning — no facts added, removed, or changed
- Follow every principle listed above
- Differ meaningfully from the others in structure or emphasis, not just in word swaps
- Match the approximate length of the original (±25%) unless the original is bloated, in which case tighten it
- Never use em dashes (—); use colons, semicolons, or split into two sentences instead

**Aim for variety across the three alternatives:**
- **Alternative 1**: Restructure for clarity — lead with the key message, tighten the phrasing
- **Alternative 2**: Shift emphasis — place a different element in the power position (end of sentence) or reframe the angle
- **Alternative 3**: Simplify aggressively — strip to the essential claim using the fewest strong words

### Step 3: Verify Integrity

Before returning, check each alternative against:

- **No meaning drift.** Every claim in the output exists in the input.
- **No invented facts.** Nothing inferred or editorialized.
- **No symbols substituted for words.** Do not replace "and" with "&" or "percentage" with "%" unless the original used them.
- **No em dashes.** Replace any that crept in.
- **All principles applied.** Scan each alternative against the full principles checklist.
- **Genuine variety.** The three alternatives must feel like real choices, not trivial permutations.

### Step 4: Present the Result

Format the output as a numbered list:

```
1. [First alternative]
2. [Second alternative]
3. [Third alternative]
```

If the original text had multiple bullets or items, present a complete set of 3 alternatives for the full block, not per-bullet alternatives.

If running in PowerPoint (e.g., via Claude in Chrome), present the alternatives in the chat so the user can choose. Do not auto-apply — the user picks which version to use.
