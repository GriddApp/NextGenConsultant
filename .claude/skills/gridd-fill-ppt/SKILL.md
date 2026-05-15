---
name: gridd-fill-ppt
description: Fill a Gridd slide template with the user's content and add it to the open PowerPoint deck via Office.js. Use whenever the user wants to put content on a slide — whether they ask for a "slide", "deck page", a specific visual (buckets, pillars, goals, roadmap, comparison, matrix, funnel), or simply say "visualize this" or "put this on a slide". Works from plain text, a markdown table, a screenshot, or anything discussed earlier in the conversation. Trigger even if the user does not name this skill or mention "Gridd".
---

# Fill out a Gridd template (Claude for PowerPoint / Office.js)

This skill turns user content into a filled Gridd slide and inserts it into the **currently open presentation** using the PowerPoint Office.js JavaScript API. Work through it in four steps: **pick template → load gridd JSON → fill → insert slide and attach the GRIDD tag**.

There is no Python, no shell, and no file write here — everything happens against the live deck via `PowerPoint.run`. The only deliverable is a new slide appearing at the end of the user's presentation.

## Why this skill exists

Gridd templates are pre-designed slide layouts. Each template has a `gridd` JSON payload that describes its grid, cells, icons, and styling. In a .pptx, that payload is stored on the slide as a `<p:tag name="GRIDD" val="...">` element — i.e., a slide-level tag. In Office.js this is the same thing as `slide.tags.getItem("GRIDD")` / `slide.tags.add("GRIDD", value)`.

Filling a template means editing the payload's cell text and rich text while leaving structure and styling alone. Don't try to regenerate the grid or styling from scratch — the template carries visual design decisions (fonts, icons, spacing, borders) that are tuned for the layout. Your job is to pour content into the cells the template expects.

## Step 1 — Pick a template (always show top 3)

Search `search-list.json` using the `name` and `description` fields. Find the three templates whose structure best fits the user's content (count of items, relationships, whether it's a comparison, timeline, buckets, pillars, etc.).

List all three for the user with a one-line reason each and ask which to use. Don't pick unilaterally — the user often has a strong preference, and the templates look quite different.

## Step 2 — Load the template's gridd JSON

Each template is pre-extracted as a ready-to-edit JSON file:

```
gridds/<identifier>.json
```

Read `gridds/<identifier>.json` directly — it already contains the parsed `gridd` object, ready to modify in memory. You don't need to write it to disk; the eventual destination is a slide tag, not a file.

## Step 3 — Fill the gridd JSON

Now mutate the loaded object in memory and replace placeholder content. Three things matter; get them wrong and the slide will render oddly or lose formatting. For this step, fill in the text only — no structural rewrites.

The action title is not part of the gridd JSON. It lives in the PowerPoint slide's native title placeholder (<p:ph type="title"/>) and is passed to the writer at Step 4 via the --action-title flag. Putting it in the real title placeholder means it shows up in PowerPoint's outline view, gets read by screen readers, inherits the layout's title styling, and stays editable as a normal placeholder rather than being trapped inside the gridd payload.

### Content cells vs spacer cells

`cells` is a 2D array shaped like `rows × cols`. Some positions are **content cells** (have `text` and `json` fields, possibly plus a styled entry in `cellStyles`); others are **spacer cells** (only have an `id`, no `text`). Spacers correspond to `s36`-style fixed-width columns or rows. **Never add `text`/`json` to a spacer** — it breaks layout.

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

## Step 4 — Insert the slide and attach the GRIDD tag (Office.js)

This is where the PowerPoint flavor of the skill diverges from the file-based one. Two API calls do the whole job:

1. `Presentation.insertSlidesFromBase64(base64File, options)` — inserts the bundled `gridd.pptx` template slide into the active presentation.
2. `Slide.tags.add("GRIDD", value)` — replaces (or adds) the GRIDD payload on the inserted slide. Office.js writes this as the same `<p:tag name="GRIDD" val="..."/>` element the renderer reads.

### Validate before sending

Sanity-check the filled gridd against `schema.json` in memory before writing it to a tag. If validation fails, fix your edits — don't touch the schema. If you hit something you believe is a real schema gap, tell the user rather than silently changing validation.

### The Office.js call

Read `gridd.pptx` from the skill bundle as base64, then run:

```javascript
await PowerPoint.run(async (context) => {
  const presentation = context.presentation;

  // 1) Capture which slide IDs already exist so we can find the inserted one.
  const before = presentation.slides;
  before.load("items/id");
  await context.sync();
  const beforeIds = new Set(before.items.map(s => s.id));

  // 2) Insert the bundled gridd.pptx — its single slide is appended to the deck.
  presentation.insertSlidesFromBase64(templateBase64, {
    formatting: "KeepSourceFormatting"
  });
  await context.sync();

  // 3) Find the newly inserted slide (the one whose ID wasn't there before).
  const after = presentation.slides;
  after.load("items/id");
  await context.sync();
  const inserted = after.items.find(s => !beforeIds.has(s.id));
  if (!inserted) throw new Error("Could not locate inserted Gridd slide.");

  // 4) Write the filled gridd JSON onto the slide as the GRIDD tag.
  //    Compact JSON keeps the tag value short. The renderer reads the same
  //    <p:tag name="GRIDD" val="..."/> element this API writes.
  const payload = JSON.stringify(filledGridd);
  inserted.tags.add("GRIDD", payload);
  await context.sync();
});
```

Notes that matter in practice:

- **Tag key must be `GRIDD`** (uppercase). The renderer matches on that exact name.
- **`tags.add` upserts.** If the inserted slide already has a GRIDD tag from the template, calling `add("GRIDD", …)` overwrites it. No need to remove first.
- **`KeepSourceFormatting`** preserves the template's theme, fonts, and layout. Do not switch to `UseDestinationTheme` — it will replace the Gridd visual styling with the user's deck theme and break the design.
- **Compact JSON** (`JSON.stringify(filledGridd)` with no indent) keeps the tag value well under PowerPoint's per-tag size limit. Don't pretty-print into the tag.
- **Do not insert and then re-insert.** Each call to `insertSlidesFromBase64` adds another copy. If you need to retry after an error, delete the inserted slide first (`inserted.delete()`) or undo in the UI.

### Locating the inserted slide

`insertSlidesFromBase64` does not return the inserted slide reference directly. The before/after ID diff above is the reliable way to find it. Don't assume it's the last slide — `targetSlideId` in `options` can place it elsewhere, and the user may have additional automations running.

If you pass `targetSlideId`, the inserted slide goes immediately after that slide; if you omit it (default), the inserted slide goes to the end of the deck. The diff approach works for both.

### After insertion

The slide is live in the user's open presentation. There is nothing to open, save, or download — the user can see it immediately. Tell them which template you used and which slide index it ended up at, so they can navigate to it.

## Files in this skill

- `SKILL.md` — this file
- `search-list.json` — compact list of all templates (name + description) for Step 1 matching
- `gridds/<identifier>.json` — one file per template, parsed gridd JSON ready to read and edit in memory
- `gridd.pptx` — single-slide template bundled with the skill; loaded as base64 and passed to `insertSlidesFromBase64`
- `schema.json` — validates the filled `gridd` JSON before it's written into the GRIDD tag
