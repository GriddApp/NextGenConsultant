---
name: paragraph-to-bullets
description: >
  Converts a paragraph or block of prose into 3–6 concise, consulting-style bullet points (5–10 words each).
  Use this skill when the user asks to "bulletize", "bullet this", "turn into bullets", "extract key points",
  "make bullets from this", "convert to bullet points", "pull out the key takeaways", "summarize as bullets",
  "break this into bullets", or "distill this paragraph". Also trigger when the user pastes a paragraph of text
  on a PowerPoint slide and asks to convert it into bullet points, or when the user provides prose and wants
  consulting-grade slide-ready bullets. Trigger even for short paragraphs — the user wants structured,
  message-forward output, not a simple copy-paste. This skill handles input tagged with {{slide::md}} or
  {{gridd::event::md}} markers as well as plain pasted text.
---

# Paragraph to Bullets

Convert a paragraph or block of prose into 3–6 concise, consulting-style bullet points. Optimized for MBB (McKinsey, Bain, BCG) consulting presentations.

## Principles

Every bullet must earn its place. Consulting slides communicate through density and structure: fewer words, stronger signal, logical flow. The output is not a summary — it is a distillation into discrete, slide-ready claims.

## Behavior

This is an **auto-apply** skill. When triggered, immediately produce the bullet points. Do NOT ask for confirmation, do NOT present options, do NOT ask "would you like me to proceed?" Just do it. The user triggered the skill because they want the result now.

## Workflow

### Step 1: Read the Input

1. Read the paragraph or prose block the user has provided, pasted, or selected.
2. If input is tagged with `{{slide::md}}` or `{{gridd::event::md}}`, treat the content within as the source text.
3. Identify the core narrative arc: what is the context, what is the issue, what is the implication or action?

### Step 2: Distill into Bullets

Produce 3–6 bullet points following all rules below, in priority order:

**Rule 1: One idea per bullet**
Each bullet expresses exactly one discrete insight, claim, or action. Never combine two ideas into one bullet. If a sentence contains two distinct points, split them.

**Rule 2: 5–10 words per bullet**
This is a hard constraint. Count words. If a bullet exceeds 10 words, cut further. If under 5 words, it likely lacks specificity — add a meaningful qualifier.

**Rule 3: Lead with action verbs or concise noun phrases**
Start each bullet with a strong verb (imperative or past tense) or a tight noun phrase. Never start with "There is," "It is," "We," "The company," or other throat-clearing.
- Good: "Reduced churn 15% via targeted retention"
- Good: "Market share eroding in core segments"
- Bad: "We have been working on reducing churn"
- Bad: "There is an opportunity to improve market share"

**Rule 4: Maintain parallel grammatical structure**
All bullets in the set must follow the same grammatical pattern — all imperative verbs, all past-tense verbs, all noun phrases, or all gerunds. Choose whichever form best fits the content. Default to imperative verbs when in doubt.

**Rule 5: Follow a logical flow**
Order bullets to tell a story. Preferred sequences:
- Context → Issue → Implication → Action
- Situation → Complication → Resolution
- What happened → Why it matters → What to do next

Rearrange source material as needed to achieve logical progression. Do not mirror the paragraph's original sentence order if it lacks narrative logic.

**Rule 6: Capture only essential insights**
Strip all filler, repetition, hedging, and decoration. If two sentences in the source say the same thing differently, extract the single core point. Omit background that adds no decision-relevant information.

**Rule 7: Preserve quantitative claims**
Numbers, percentages, dates, and specific metrics from the source must survive if they are material to the message. Do not round or approximate unless the original did.

### Step 3: Verify Integrity

Before returning, check:

- **3–6 bullets total.** Not fewer, not more. If the source is thin, 3 is fine. If rich, cap at 6.
- **5–10 words each.** Count every bullet. Revise any that fall outside this range.
- **No meaning invented.** Every claim in the output exists in the input.
- **No filler retained.** Scan for "currently," "essentially," "in order to," "going forward," "it should be noted" — these must be gone.
- **Parallel structure.** All bullets use the same grammatical form.
- **Logical flow.** Read the bullets top to bottom — they should tell a coherent story.
- **No em dashes.** Never use the em dash character (—). Use a colon or comma instead.
- **No symbols substituted for words.** Do not use "&" instead of "and" or "+" instead of "plus". Do not add arrows or emojis.

### Step 4: Present the Result

Output the bullets as a clean Markdown list:

```
- [Bullet 1]
- [Bullet 2]
- [Bullet 3]
...
```

If the original text had a clear title or header, include it as a bold line above the bullets.

After the bullets, add a brief line noting the compression, e.g.:
`Distilled from ~85 words → 6 bullets, 42 words`
