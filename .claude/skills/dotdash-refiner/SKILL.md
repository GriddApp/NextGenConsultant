---
name: dotdash-refiner
description: >
  Reviews and refines an existing dot-dash (bullet point storyline) so it follows the Pyramid Principle
  and Situation–Complication–Resolution (SCR) framework with consulting-grade structure and wording.
  Use this skill when the user asks to "review my storyline", "refine my dot-dash", "check my bullet
  structure", "fix my storyline", "improve my dot-dash", "tighten my storyline", "review my narrative",
  "clean up my bullets", "is my storyline right", "check my SCR", "does this story work", or pastes
  a bullet-point outline and asks for feedback or improvement. Also trigger when the user shares a
  hierarchical bullet list that looks like a presentation storyline and wants it reviewed, restructured,
  or polished. This skill does not build a storyline from scratch (use storyline-builder for that).
  It takes an existing draft and makes it sharper, more structured, and more rigorous.
---

# Dot-Dash Refiner

Take an existing dot-dash (bullet point storyline) and refine it so it has the right components, structure, and wording according to the Pyramid Principle and SCR framework. This skill reviews, diagnoses, and improves — it does not build from scratch.

## Scope

This skill checks two layers:

1. **The SCR frame** — Situation, Complication, Resolution
2. **The supporting arguments** — the 2–4 assertions beneath each SCR element

It does not check or request evidence. That's a separate step.

## When This Skill Does Not Apply

If the user has no existing bullet outline and needs to build a storyline from scratch, redirect:

> "It looks like you're starting from a blank page rather than refining an existing outline. The storyline-builder skill is designed to walk you through creating one from scratch. Want to use that instead?"

If the input is a sales pitch or cold outreach narrative (no question was asked by the audience), flag it:

> "This outline reads like a pitch or sales narrative rather than an answer-back storyline. The SCR framework works best when your audience has already asked a question or requested a proposal. Is your audience expecting an answer, or are you trying to establish the need?"

## Behavior

This is a **diagnose-then-fix** skill. When triggered:

1. Read the full input
2. Run the diagnostic checklist (see below)
3. Present findings organized by category, flagging what's missing or weak
4. For structural and wording issues: propose specific rewrites
5. For missing components: flag them and ask the user to provide the substance
6. Wait for the user to confirm or provide missing pieces before producing the refined output

Do not silently invent content. The user owns the substance; this skill owns the structure and language.

---

## The Diagnostic Checklist

Work through each check in order. For each issue found, note the specific problem and which bullet(s) it affects.

### Check 1: SCR Completeness

Does the outline contain all three SCR elements?

- **Situation**: a statement of agreed-upon context the audience already knows. It should feel like common ground, not news. If missing, flag:
  > "I can't identify a clear Situation statement — the context your audience already agrees with. What's the shared starting point?"

- **Complication**: a statement of tension, change, or problem that disrupts the Situation. It should create urgency. If missing, flag:
  > "There's no clear Complication — the 'but' that creates tension. What's changed, what's wrong, or why can't you keep doing what you're doing?"

- **Resolution**: the answer, recommendation, or proposed path forward. It should directly resolve the tension raised by the Complication. If missing, flag:
  > "I don't see a clear Resolution — your answer or recommendation. What do you think should be done?"

### Check 2: SCR Flow

Even if all three elements are present, check that they connect logically:

- Does the Situation → Complication transition feel like a natural "but" or "however"? The Complication should disrupt the Situation.
- Does the Complication → Resolution transition feel like a natural "therefore" or "so we should"? The Resolution should directly address the tension.
- If the Resolution doesn't answer the Complication, flag the disconnect:
  > "Your Complication is about [X], but your Resolution addresses [Y]. The Resolution needs to directly resolve the tension. Which one needs to change?"

### Check 3: Arguments Are Assertions, Not Topics

Each supporting argument beneath an SCR element must be a full sentence expressing a specific, falsifiable claim. Check for the most common failure mode: topic labels or vague statements disguised as arguments.

**Test**: can someone disagree with it? If not, it's a topic, not an argument.

Examples of what to catch and how to flag:

- "Market position is strong" → flag: "This is too vague to be useful. Strong how? Compared to what? Something like 'We hold 34% share in North America and have grown 2% annually for five years' gives the audience something concrete."
- "Current strategy is good" → flag: "Good in what way? Try stating specifically what the strategy is and what it has achieved, e.g., 'The current strategy prioritizes volume growth through geographic expansion, delivering 8% revenue CAGR since 2020.'"
- "Competitive pressure" → flag: "This is a topic label, not an assertion. What specifically is happening with competitors? e.g., 'Three low-cost entrants have captured 12% combined share in 18 months.'"
- "We should optimize the portfolio" → flag: "Optimize how, and what's the expected impact? e.g., 'Consolidating from 15 to 3 hero SKUs would reduce complexity costs by $40M annually.'"

When flagging a weak argument, always explain why it's weak and show what a stronger version would look like structurally. Do not invent specific numbers or facts; use the pattern "[specific claim with concrete detail]" to show the shape of what's needed, and ask the user to supply the substance.

### Check 4: MECE Within Each Group

Arguments under the same SCR element should be mutually exclusive (no overlaps) and collectively exhaustive (no major gaps).

- **Overlaps**: if two arguments say substantially the same thing with different wording, flag:
  > "Arguments [X] and [Y] under your [Situation/Complication/Resolution] overlap — they're both saying [common theme]. Merge them or sharpen the distinction."

- **Gaps**: if the arguments don't fully cover the claim they support, flag:
  > "Your [Situation/Complication/Resolution] says [X], but your supporting arguments don't address [missing aspect]. Is there an argument missing?"

### Check 5: Argument Count

Each SCR element should have 2–4 supporting arguments. Flag deviations:

- **Fewer than 2**: "Your [element] only has one supporting argument. That's either a sign you need to break it into sub-components, or the argument is actually just restating the SCR element itself."
- **More than 4**: "Your [element] has [N] supporting arguments. That's too many for one level — look for arguments that are actually sub-points of a higher-level argument, and nest them."

### Check 6: Hierarchy Violations

Check that arguments sit at the right level of the pyramid:

- Arguments that are actually sub-points of another argument should be nested one level lower, not listed as peers.
- Arguments that are actually broader than the SCR element they sit under may belong at the SCR level itself.
- Flag:
  > "Argument [X] looks like a sub-point of [Y] rather than a peer. It should sit one level below."

### Check 7: Wording Quality

Apply consulting-grade language standards:

- **Verb-led where possible**: prefer active, direct constructions
- **No filler**: strip "it is important to note that," "as mentioned previously," "going forward," etc.
- **No em dashes used as pauses**: replace with colons, semicolons, or split into two sentences
- **Parallel structure**: arguments in the same group should follow the same grammatical pattern
- **Specific over vague**: flag weasel words like "significant," "various," "key," "leverage," "optimize" when used without concrete detail

---

## Output Format

After running the diagnostic, present findings in this order:

**1. Diagnosis** — what you found, organized by check number. Only include checks that surfaced issues. For each issue, state the problem and which bullet(s) it affects.

**2. Proposed rewrites** — for wording, structure, and flow issues, show the specific before → after. Format as:

> **Before**: [original text]
> **After**: [proposed rewrite]

**3. Missing pieces** — for gaps where the user needs to supply substance, list them clearly as questions.

**4. Wait for the user** — do not produce a final refined outline until the user has addressed the missing pieces and confirmed the proposed rewrites.

---

## Producing the Refined Output

Once the user has confirmed all changes and filled in gaps, produce the complete refined dot-dash in this format:

```
## Refined Storyline

### SITUATION: [polished situation statement]
  1. [Supporting argument 1]
  2. [Supporting argument 2]
  [... up to 4]

### COMPLICATION: [polished complication statement]
  1. [Supporting argument 1]
  2. [Supporting argument 2]
  [... up to 4]

### RESOLUTION: [polished resolution statement]
  1. [Supporting argument 1]
  2. [Supporting argument 2]
  [... up to 4]
```

After presenting the refined version, suggest the ghost deck as a natural next step:

> "Your dot-dash is tight. When you're ready, the next step is to turn this into a ghost deck. Want me to hand it off?"

## Style Notes

- Be direct and constructive. This is a peer review, not a lecture.
- When rewriting, preserve the user's meaning precisely. Improve the language, don't change the message.
- Do not invent facts, numbers, or specifics. Show the structural shape of what's needed and ask the user to fill in the substance.
- Do not use em dashes as pauses. Use colons, semicolons, or split into two sentences.
- Keep feedback actionable. Every flag should come with either a proposed fix or a specific question.
