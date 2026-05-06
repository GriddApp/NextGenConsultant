---
name: shorten-text
description: >
  Shortens selected slide text by roughly one-third while preserving meaning, optimized for MBB consulting presentations.
  Use this skill when the user asks to "shorten", "tighten", "condense", "trim", "cut down", "make more concise",
  "reduce text", "make punchier", or "cut by a third" on bullet points, slide text, or pasted presentation content.
  Also trigger when the user selects text on a PowerPoint slide and asks to make it shorter, more concise,
  or fit it into less space. Applies MBB consulting style: verb-led, parallel, no filler, message-forward.
---

# Shorten Text

Cut selected slide or pasted text by approximately one-third while preserving meaning. Optimized for MBB (McKinsey, Bain, BCG) consulting presentation style.

## Principles

The goal is ruthless concision without changing what the text says. Every word must earn its place. Consulting slides communicate through density: fewer words, stronger signal.

## Behavior

This is an **auto-apply** skill. When triggered, immediately apply the transformation and return the shortened text. Do NOT ask for confirmation, do NOT present options, do NOT ask "would you like me to proceed?" Just do it. The user triggered the skill because they want the result now. If the user selected text on a PowerPoint slide, write the shortened text back to the selection directly using the available tools. Treat this like a keyboard shortcut: instant execution, no dialog.

## Workflow

### Step 1: Read the Input

1. Read the text the user has provided or selected on the current slide.
2. Note the approximate word count; the target output is roughly two-thirds of this count.

### Step 2: Apply Shortening Rules

Process each item applying all rules below, in priority order:

**Rule 1: Remove filler and hedge words**
Strip words that add no meaning: "currently," "essentially," "in order to," "it is important to note that," "as a matter of fact," "at the end of the day," "going forward," "it should be noted," "as previously mentioned," "in terms of," "with respect to," "on an ongoing basis."

**Rule 2: Drop unnecessary subjects**
Remove leading subjects like "We," "Our team," "The company," "Management," "The organization" when the agent is obvious from context.

**Rule 3: Lead with strong verbs or concise noun phrases**
Restructure sentences so the action or key concept comes first. Prefer imperative verbs or direct noun phrases over passive constructions or throat-clearing intros.
- "We are currently in the process of evaluating" → "Evaluating"
- "There is an opportunity to improve" → "Improve"
- "Our team has been working on developing" → "Developing"

**Rule 4: Merge overlapping ideas**
When two bullets or sentences say substantially the same thing with different wording, combine them into one tighter statement that captures both.

**Rule 5: Remove non-critical examples and bracketed text**
Strip parenthetical asides, bracketed annotations, and illustrative examples that aren't essential to the core message. Keep examples only when they ARE the message (e.g., a specific data point that supports the "so-what").

**Rule 6: Keep grammatical form parallel**
Ensure all bullets in a group follow the same grammatical pattern (all imperative, all gerund, all noun phrase). Choose whichever form the majority already uses, or default to imperative verbs.

**Rule 7: Retain the "so-what"**
The key insight, recommendation, or implication of each bullet must survive. If a bullet exists to deliver a specific message, that message stays; everything else around it is fair game for cutting.

### Step 3: Verify Integrity

Before returning the result, check:

- **No meaning changed.** Every claim in the output was present in the input.
- **No new facts introduced.** Nothing invented, inferred, or editorialized.
- **No symbols substituted for words.** Do not replace "and" with "&", plus with "+", or use arrows, slashes, or other symbols to save space unless they were already in the original.
- **No em dashes.** Never use the em dash character (—) in output. Use a colon, semicolon, comma, or split into two sentences instead. If the input contains em dashes, replace them too.
- **Approximate one-third reduction achieved.** The output should be noticeably shorter. If the reduction is less than ~20%, look for more cuts. If greater than ~45%, check that meaning hasn't been lost.

### Step 4: Apply the Result

If running in PowerPoint (e.g., via Claude in Chrome or an MCP tool with slide access), write the shortened text directly back into the selected text box or shape, replacing the original content in place. Do not ask for confirmation first.

If running in chat without slide access, output the revised text so it can be copied back. Preserve the original structure (bullet hierarchy, numbering) and formatting cues (bold, italics) where present.

After doing that, return in the chat a brief line noting the word count reduction, e.g.:
`Reduced from 120 → 78 words (~35% shorter)`


