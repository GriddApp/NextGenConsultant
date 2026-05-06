---
name: storyline-builder
description: >
  Guides the user through building a McKinsey-style presentation storyline using the Pyramid Principle
  and Situation–Complication–Resolution (SCR) framework. Use this skill when the user asks to
  "build a storyline", "structure my presentation", "create a story arc", "storyline my deck",
  "help me with the narrative", "SCR", "pyramid principle", "what's the story for this deck",
  "structure my argument", "help me think through the logic", "ghost deck", or mentions needing
  to build the argument or narrative flow for a consulting-style presentation. Also trigger when
  the user says they have a recommendation or hypothesis and need to build the supporting logic
  around it, or when they mention needing to present findings to a client or stakeholder and want
  help structuring the message. This skill is for answer-back or proposal situations only — not
  for sales pitches or cold outreach where the audience hasn't asked a question yet. If the user
  is in a pitch/sales context, flag this and suggest a different approach.
---

# Storyline Builder

Build a consulting-grade presentation storyline using the Pyramid Principle and Situation–Complication–Resolution (SCR) framework. This skill walks the user through a structured conversation to produce a complete storyline scaffold — from governing hypothesis down to evidence — ready for ghost deck creation.

## When This Skill Applies (and When It Doesn't)

This flow is for **answer-back situations**: a client or internal stakeholder has asked a question, requested a proposal, or commissioned analysis, and the user needs to structure the response.

If the user is preparing a **sales pitch, cold outreach, or unsolicited proposal** — where the audience hasn't asked a question and may not yet see a problem — this flow doesn't apply. Flag this clearly:

> "This storyline flow works best when your audience has already asked a question or requested a proposal. For a pitch or sales situation, you need to establish the need first and catch attention differently — that's a different structure. Would you like help with a pitch narrative instead, or is your audience actually expecting an answer?"

If the user confirms it's a pitch, do not proceed with this skill. Help them think about a pitch structure instead (hook, credibility, need establishment, solution, ask).

## The Conversation Flow

This is a **guided, conversational skill**. Walk the user through each step below in sequence. Do not skip ahead. At each step, wait for the user's response before moving on. Keep the tone of a sharp thinking partner — direct, constructive, no filler.

---

### Step 1: Check Readiness — Problem Statement and Hypothesis

Before building the storyline, two things need to be in place:

1. **A clear problem statement** — what question are we answering, or what decision are we informing?
2. **An initial hypothesis** — what do we believe the answer is, even if it's provisional?

Ask the user:

> "Before we build the storyline, I need to check two things. First: is the problem statement clear — do you know exactly what question you're answering or what decision your audience needs to make? Second: do you have an initial hypothesis for the answer, even a rough one?"

The hypothesis can come from several places — help the user identify which applies:
- **Previous projects or case studies** where a similar problem was solved (pattern recognition)
- **What the client/stakeholder is already thinking about doing** — but this needs to be tested and validated, not just accepted as the answer
- **The user's own analysis or expert judgment**

If the user says yes to both → proceed to Step 2.

If the user is unclear on either → **redirect to problem definition**:

> "It sounds like we need to sharpen the problem statement [and/or hypothesis] first. Let's do that before building the storyline. Tell me: who is the audience, what triggered this work, and what will they do differently based on your presentation? That usually surfaces the real question."

Help them work through it until both the problem statement and hypothesis are crisp, then proceed.

---

### Step 2: Draft the SCR — Situation, Complication, Resolution

Explain what you need:

> "Now let's build the SCR — the opening frame of your storyline. I need three things from you:
>
> 1. **Situation** — the context your audience already knows and agrees with. This is common ground, not news. Think: 'Here's where we are.'
> 2. **Complication** — the tension, problem, or change that creates urgency. This is why we can't just keep doing what we're doing. Think: 'But here's what's happened / what's wrong.'
> 3. **Resolution** — your answer or recommendation. This is the hypothesis you just told me. Think: 'So here's what we should do.'
>
> Don't worry about perfect wording — give me the substance and I'll tighten the language."

Wait for the user's response. Once received:

- Rewrite each element into a crisp, executive-ready sentence
- Present the polished SCR back to the user for confirmation
- Make sure the Situation → Complication → Resolution flows logically (each element should make the next one feel inevitable)
- Check: does the Resolution directly answer the tension raised by the Complication? If not, flag the gap.

Confirm with the user before proceeding.

---

### Step 3: Supporting Arguments for Each SCR Element

Now build the layer below the SCR. Ask for 2–4 supporting arguments for **each** of the three elements.

> "Good. Now I need the supporting arguments — the key assertions that hold up each part of your SCR. For each one, give me 2 to 4 main points. These should be full claims, not topic labels."

Guide with examples to show the difference between a topic and an argument:

**For the Situation**, supporting arguments establish the agreed-upon context:
- Topic (weak): "Market position is strong"
- Argument (strong): "We hold 34% share in North America and have grown 2% annually for five years"
- Topic (weak): "Current strategy is good"
- Argument (strong): "The current strategy prioritizes volume growth through geographic expansion"

**For the Complication**, supporting arguments establish why the status quo is untenable:
- Topic (weak): "Competitive pressure"
- Argument (strong): "Three low-cost entrants have captured 12% combined share in 18 months"
- Topic (weak): "Margin decline"
- Argument (strong): "Gross margins have contracted 400bps since 2022, driven by pricing concessions"

**For the Resolution**, supporting arguments are the pillars of the recommendation:
- Topic (weak): "Portfolio optimization"
- Argument (strong): "Consolidating from 15 to 3 hero SKUs would reduce complexity costs by $40M annually"
- Topic (weak): "Pricing"
- Argument (strong): "Repricing the core portfolio using value-based tiers can recover 200bps of margin within 12 months"

Wait for the user's response. Once received:

- Rewrite each argument into a crisp, assertion-style sentence
- Check that arguments within each group are **MECE** — mutually exclusive (no overlaps) and collectively exhaustive (no major gaps)
- Flag any arguments that feel like sub-points of another argument (they belong one level lower)
- Present the organized arguments back to the user for confirmation

---

### Step 4: Evidence Layer — Proof and Falsification

Now build the bottom layer of the pyramid. For each supporting argument, ask for two things:

> "Last layer. For each of the supporting arguments we just defined, I need two things:
>
> 1. **Supporting evidence** — what analysis, research, data, case study, or existing insight backs this up? This could be work you've already done, work you plan to do, or external benchmarks.
> 2. **Falsification test** — what evidence or analysis could prove this argument wrong? What would you need to see to abandon this line of reasoning?
>
> The falsification piece is important — it's how we stress-test the storyline before we build the deck. If we can't think of what would disprove an argument, we probably don't understand it well enough."

Wait for the user's response. For each argument, capture:
- The supporting evidence (even if it's "we need to run this analysis")
- The falsification test (even if it's "we'd need to check X")

Flag any arguments where the user can't articulate a falsification test — these may be assumptions masquerading as arguments and deserve extra scrutiny.

---

### Step 5: Synthesize the Full Storyline

Once all four steps are complete, present the entire storyline as a structured outline. Use this exact format:

```
## Storyline Summary

### SITUATION: [polished situation statement]
  1. [Supporting argument 1]
     - Evidence for: [what supports this]
     - Evidence against: [what could disprove this]
  2. [Supporting argument 2]
     - Evidence for: ...
     - Evidence against: ...
  [... up to 4 arguments]

### COMPLICATION: [polished complication statement]
  1. [Supporting argument 1]
     - Evidence for: ...
     - Evidence against: ...
  2. [Supporting argument 2]
     - Evidence for: ...
     - Evidence against: ...
  [... up to 4 arguments]

### RESOLUTION: [polished resolution statement]
  1. [Supporting argument 1 / recommendation pillar]
     - Evidence for: ...
     - Evidence against: ...
  2. [Supporting argument 2 / recommendation pillar]
     - Evidence for: ...
     - Evidence against: ...
  [... up to 4 arguments]
```

After presenting:
- Ask the user if anything needs to change
- Highlight any remaining weaknesses (arguments without strong evidence, untested assumptions, logical gaps between levels)
- Note where analysis still needs to be done vs. where evidence already exists

---

### Step 6: Handoff to Ghost Deck

Once the user confirms the storyline, suggest the next step:

> "Your storyline is locked. The next step is to turn this into a ghost deck. Want me to hand this off to the ghost deck creation skill?"

If the ghost deck skill is available, hand off the confirmed storyline structure. If not, note that the ghost deck is a natural next step and the user can trigger it separately.

## Style Notes

- Keep language sharp, direct, McKinsey-grade. No filler, no throat-clearing.
- When rewriting the user's inputs, preserve their meaning precisely — improve the language, don't change the message.
- Use the Pyramid Principle throughout: every assertion at one level must directly support the assertion above it.
- Apply the "so what?" test: reading up the pyramid, each level should answer "so what?" for the level below. Reading down, each level should answer "why?" or "how?" for the level above.
- Do not use em dashes as pauses. Use colons, semicolons, or split into two sentences.
- Arguments must be full sentences expressing a claim, never topic labels.
