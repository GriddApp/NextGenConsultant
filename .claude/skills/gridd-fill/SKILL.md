---
name: gridd-fill
description: Fill a Gridd slide template with the user's content and produce a .pptx. Use this whenever the user wants to put content on a slide — whether they ask for a "slide", "deck page", a specific visual (buckets, pillars, goals, roadmap, comparison, matrix, funnel), or simply say "visualize this" or "put this on a slide". Works from plain text, a markdown table, a screenshot, or anything discussed earlier in the conversation. Trigger even if the user does not name this skill or mention "Gridd".
---

# Fill out a Gridd template

This skill turns user content into a filled Gridd slide. Work through it in four steps: **pick template → extract → fill → write pptx**. Each step has one cheap, deterministic way to do it — use the bundled scripts, don't reinvent them.

## Why this skill exists

Gridd templates are pre-designed slide layouts. Each template has a `gridd` JSON payload that describes its grid, cells, icons, and styling. The payload lives as an XML-escaped attribute on a `<p:tag name="GRIDD" val="...">` element inside the slide's tag XML. Filling a template means editing that payload's cell text/rich-text while leaving structure and styling alone.

Don't try to regenerate the grid or styling from scratch. The template carries visual design decisions (fonts, icons, spacing, borders) that are tuned for the layout — your job is to pour content into the cells the template expects.

## Step 1 — Pick a template (always show top 3)

Search `search-list.json` using the `name` and `description` fields. Find the three templates whose structure best fits the user's content (count of items, relationships, whether it's a comparison, timeline, buckets, pillars, etc.).

List all three for the user with a one-line reason each and ask which to use. Don't pick unilaterally — the user often has a strong preference, and the templates look quite different.

## Step 2 — Load the template's gridd JSON

Each template is pre-extracted as a ready-to-edit JSON file in the `gridds/` folder:

```
gridds/<identifier>.json
```

Read `gridds/<identifier>.json` directly — it already contains the parsed `gridd` object, ready to load and modify. Copy it to `/tmp/gridd.json` if you want a working copy to edit without touching the originals.

## Step 3 — Fill the gridd JSON

Now open `/tmp/gridd.json` and replace placeholder content. Three things matter here; get them wrong and the slide will render oddly or lose formatting. For this step, try to fill in the text only in the template. No need for special scripting.

### Content cells vs spacer cells

`cells` is a 2D array shaped like `rows × cols`. Some positions are **content cells** (have `text` and `json` fields, possibly plus a styled entry in `cellStyles`), others are **spacer cells** (only have an `id`, no `text`). Spacers correspond to `s36`-style fixed-width columns or rows. **Never add `text`/`json` to a spacer** — it breaks layout.

Quick rule: read the existing gridd. A cell that already has `text` is a content cell and expects your content. A cell with only `id` is a spacer — skip it.

Example: a 3-column "key statements" template actually has 5 entries per row (content, spacer, content, spacer, content). Column positions `[0, 2, 4]` are content; `[1, 3]` are spacers.

### Preserve the TipTap `json` shape when editing text

Content cells typically have two parallel representations:

- `text`: plain string — used by anything that needs a quick read.
- `json`: a TipTap rich-text document — this is what actually renders.

Both must be updated together, or the slide and the preview will disagree. The minimum shape for a single line of styled text is:

```json
{
  "type": "doc",
  "content": [{
    "type": "paragraph",
    "attrs": {"textAlign": "center"},
    "content": [{
      "type": "text",
      "marks": [
        {"type": "textStyle", "attrs": {"backgroundColor": "", "color": "#333333", "fontFamily": "Arial", "fontSize": "14.25pt", "lineHeight": ""}},
        {"type": "bold"}
      ],
      "text": "Your text here"
    }]
  }]
}
```

Copy the template's existing cell shape and just swap the inner `text` value and the top-level `text` field. Don't invent new attributes, don't drop fields you don't understand — they're there because the renderer wants them. Keep `textAlign`, `fontSize`, `fontFamily`, `color`, and any `marks` array entries intact from the template.

If a cell's existing `json` uses `"textAlign": null` (left-align), keep it null. If it uses `"center"`, keep it centered. Matching the template's alignment per cell matters: headers are often centered, body text is often left-aligned.

### Keep structural fields alone

Don't touch `cols`, `rows`, `borders`, `cellStyles`, `spacerStyles`, `merged`, or cell `id`s. Those encode the visual design. The only time to modify structure is if the user's content genuinely doesn't fit — e.g., they gave you four items for a three-bucket template. Prefer trimming the content to the template's shape. If the mismatch is large, go back to Step 1 and pick a template that fits.

## Step 4 — Validate, then write the pptx

Validate against `schema.json` before writing:

```python
import json, jsonschema
schema = json.load(open('.claude/skills/gridd-fill/schema.json'))
data = json.load(open('/tmp/gridd.json'))
jsonschema.Draft202012Validator(schema).validate(data)  # raises on failure
```

If validation fails, fix your edits — don't touch the schema. If you hit something you believe is a real schema gap, tell the user rather than silently changing validation.

Then write the final pptx:

```bash
python3 scripts/write_pptx.py --gridd /tmp/gridd.json --out <project-root>/<descriptive-name>.pptx
```

The writer copies the bundled `gridd.pptx`, locates the `<p:tag name="GRIDD" ...>` inside `ppt/tags/*.xml`, and replaces the XML-escaped JSON payload on that tag. That's the same mechanism a host app would use via `slide.tags.add("GRIDD", value)` — it's just done against the zipped XML here.

**Output location:** default to the project root with a short, descriptive filename (e.g. `business-goals.pptx`, `q3-roadmap.pptx`). Don't dump into `/tmp` — the user wants to find the file.

## Step 5 — Open it

macOS:
```bash
open <output>.pptx
```

Linux: `xdg-open <output>.pptx`. Windows: `start <output>.pptx`.

## Files in this skill

- `SKILL.md` — this file
- `search-list.json` — compact list of all templates (name + description) for Step 1 matching
- `gridds/<identifier>.json` — one file per template, parsed gridd JSON ready to read and edit
- `gridd.pptx` — source pptx the writer copies from
- `schema.json` — validates the filled `gridd` JSON
- `scripts/write_pptx.py` — write a new pptx with the GRIDD tag replaced
