---
name: ghost-deck
description: "Turns a confirmed storyline (from the storyline-builder or dotdash-refiner skills) into a ghost deck: first as a slide-by-slide outline with action titles, reasoning, and evidence, then as an actual .pptx file with no formatting. Use this skill when the user asks to \"create a ghost deck\", \"turn this into slides\", \"make a ghost deck\", \"slide outline\", \"draft the deck\", \"build the deck skeleton\", \"action titles for my slides\", or mentions \"ghost deck\" in any context. Also trigger when the user has just completed a storyline or dot-dash refinement and wants to move to the next step. This skill bridges the gap between a storyline and a formatted presentation. It produces an unformatted deck that captures the full argument structure, ready for visual design in a subsequent step."
---

# Ghost Deck

Turn a confirmed storyline into a ghost deck in two deliverables:

1. **An .xlsx spreadsheet** — the planning table with four columns (Action Title, Reasoning & Evidence, Sources, Layout Description).
2. **A .pptx file** — built from the user's template, with action titles in the title placeholder and all other content pasted as plain text in the body.

The ghost deck captures the full argument structure so nothing gets lost between storyline and final presentation.

## What a Ghost Deck Is

A ghost deck is the skeleton of a consulting presentation. The spreadsheet has four columns:

- **Column A — Action Title**: a full sentence that states the slide's single message. If you read only the action titles top to bottom, they tell the entire story.
- **Column B — Reasoning & Evidence**: bullet points capturing the supporting logic, data points, and assertions. These will later become the slide body (charts, tables, text).
- **Column C — Sources**: ideas for where the data or evidence on this slide could come from (e.g., "Company 10-K FY2024", "Expert interview", "Internal CRM data", "Industry report from McKinsey/Bain/BCG", "Client-provided P&L", "Web research on competitor pricing"). Flag where sources are missing or uncertain.
- **Column D — Layout Description**: a description of the ideal visual format for this slide's content. Think consulting presentations, not pitch decks or TED talks.

The ghost deck has zero visual formatting beyond basic readability. No colors, no charts, no visual design. It is purely a structural document. Formatting happens in a later step with a separate skill.

## Prerequisites

This skill expects a confirmed storyline as input. The storyline should have:

- Situation, Complication, and Resolution statements
- 2–4 supporting arguments for each
- Evidence (supporting and/or negating) for each argument

If the user doesn't have a storyline yet, redirect:

> "A ghost deck needs a confirmed storyline as its foundation. Want to build one using the storyline-builder skill, or refine an existing one with the dotdash-refiner?"

## The Workflow

### Step 1: Generate the Slide Outline in .xlsx
Taking the storyline, read `/mnt/skills/public/xlsx/SKILL.md` and create the spreadsheet.

**Spreadsheet structure — single sheet called "Ghost Deck":**

**Row 1 — Header row** (bold, light gray fill, frozen):
- A1: `Action Title`
- B1: `Reasoning & Evidence`
- C1: `Sources`
- D1: `Layout Description`

**Row 2 onward — One row per slide**, in deck order:

| Column | Content | Formatting |
|--------|---------|------------|
| A (Action Title) | Full-sentence action title, prefixed with section label in brackets, e.g., `[SCR Summary] Company X should invest in...` | Wrap text. Bold. |
| B (Reasoning & Evidence) | All reasoning bullets and evidence notes, each on a new line within the cell (`\n`). Prefix reasoning with `•` and evidence with `[Evidence]`. | Wrap text. Normal. |
| C (Sources) | Source ideas, each on a new line. `[Source TBD]` if unknown. | Wrap text. Normal. |
| D (Layout Description) | Suggested layout description. | Wrap text. Normal. |

**Formatting rules:**
1. Header row: bold, light gray fill (`D9D9D9`), freeze panes at A2.
2. Column widths: A=40, B=55, C=35, D=35.
3. All cells: top-aligned, wrap text.
4. Thin bottom border on each row.
5. Action title column: bold font.
6. No colors beyond the header. No charts, no merged cells.

**Content rule:** 
Do not change content that is in the approved storyline. No rewording.

Add content for Sources and Layout description, if these were not provided.

Present the .xlsx to the user, then ask for review and confirmation before proceeding to Step 2.

---

### Step 2: Create the Ghost Deck (.pptx)

After the final .xlsx is delivered, create a .pptx file from a user-provided template.

#### Ask for a Template

> "Which PowerPoint template should I use for the ghost deck? Upload the .pptx template file."

If the user doesn't have one:
> "I can create a plain deck with no styling. Want me to proceed without a template?"

**Wait for the user to provide or decline a template before proceeding.**

#### If a Template Is Provided

1. **Read the PPTX editing guide**: read `/mnt/skills/public/pptx/editing.md`
2. **Analyze the template**:
   ```bash
   python scripts/thumbnail.py template.pptx
   python -m markitdown template.pptx
   ```
   Review `thumbnails.jpg` to identify available layouts. Choose the simplest text-based layout with a title placeholder and a body/content placeholder (typically "Title and Content" or similar). **Use the same layout for every slide.** This is a ghost deck; layout variety comes later.

3. **Unpack the template**:
   ```bash
   python scripts/office/unpack.py template.pptx unpacked/
   ```

4. **Create slides**: Use `add_slide.py` to create one slide per row in the outline, using the chosen layout. Manage slide order in `<p:sldIdLst>`.

5. **Edit each slide's content**:
   - **Title placeholder**: Insert the action title (Column A from the spreadsheet, without the `[Section Label]` bracket prefix — put the section label in speaker notes instead if desired).
   - **Body placeholder**: Paste Columns B, C, and D as plain text, separated by blank lines, with simple section headers. The body content for each slide should look like this:

     ```
     REASONING & EVIDENCE
     • [first reasoning bullet]
     • [second reasoning bullet]
     [Evidence] [evidence note]

     SOURCES
     [source 1]
     [source 2]

     LAYOUT
     [layout description]
     ```

   - **No formatting**: Do not apply any font changes, colors, bold, italic, or sizing beyond what the template's placeholder inherits by default. The content goes in as plain text runs. Do not add shapes, images, or charts.
   - **Use proper XML paragraphs**: Each line of content should be a separate `<a:p>` element. Do not concatenate lines into a single paragraph. Copy `<a:pPr>` from the template's existing paragraph to preserve inherited line spacing.

6. **Clean and pack**:
   ```bash
   python scripts/clean.py unpacked/
   python scripts/office/pack.py unpacked/ ghost_deck.pptx --original template.pptx
   ```

#### If No Template Is Provided

1. **Read the PPTX creation guide**: read `/mnt/skills/public/pptx/pptxgenjs.md`
2. **Create a minimal plain deck** using pptxgenjs:
   - For each slide: set the action title as the slide title, and add columns B/C/D as a single plain text body block using the same format shown above.
   - Use a clean, minimal style: white background, black text, no design elements.

#### Content Rules (Critical)

These rules are non-negotiable:

1. **Do not change any content.** The action titles, reasoning bullets, evidence notes, sources, and layout descriptions go into the deck exactly as they appeared in the approved .xlsx. No rewording, no "improving," no additions.
2. **Do not format the slides.** No colors, no shapes, no charts, no icons, no images. Plain text only. Formatting will be done in a consecutive step with a separate skill.
3. **Do not adjust font sizes, colors, or styles** beyond what the template provides by default.

#### QA

After creating the .pptx:

1. Run content QA:
   ```bash
   python -m markitdown ghost_deck.pptx
   ```
   Verify every action title and body content appears correctly.

2. Check for leftover placeholder text:
   ```bash
   python -m markitdown ghost_deck.pptx | grep -iE "\bx{3,}\b|lorem|ipsum|\bTODO|\[insert|this.*(page|slide).*layout"
   ```

3. If content issues exist, fix them before presenting.

Visual QA is not required for ghost decks since they are intentionally unformatted.

#### After Creating the File

Present both the .xlsx and .pptx files to the user. Then:

> "Here's your ghost deck — both the planning spreadsheet and the PowerPoint.
>
> Before moving to visual design, I'd suggest you:
>
> 1. **Read through the action titles** in sequence (Column A in the spreadsheet, or flip through the slides) to check the story flows
> 2. **Fill in any `[Source TBD]` cells** in Column C with real data sources
> 3. **Refine wording** in either the spreadsheet or directly in PowerPoint
> 4. **Pull in any existing slides** from other decks that already cover some of these points
>
> Once you're happy with the ghost deck, the next step is to use a visual formatting skill to design the slides. Want to proceed with that?"

## Style Notes
- Layout suggestions should be specific to the content, not generic. "Chart" is too vague. "Waterfall chart showing margin erosion by driver" is right.
- Source ideas should be as specific as possible: name the type of document, the likely owner, or the research method. "Data" is too vague. "Client P&L, FY2023–2025" is right.
- This skill produces structure, not design. Resist any temptation to make it look good.