# Next-Gen Consultant

This is the new age for consultants. One without PPTX and the decades of obsolete baggage the industry carries over every day.

## How to use this project?

Start docusaurus locally:

```bash
cd hand-over
npm i
npm start
```

## Project structure

As for any engagement's successful team work, we have to set up a few common ground rules:

First of all, we work iteratively over 3 major steps:

1. Research
2. Synthesis
3. Presentation

Research output flows into the Synthesis. Synthesis output flows into the Presentation. Presentation can show the underlying data from research to prove the synthesized insights.

## Implementation

0. **Context**: the engagement onboarding materials, client context, team norms and the main storyline with tracks.
1. **Research**: a collection of data files easy to process by code and presenters. It can contain markdowns, mdx and csv files. Images, screenshots, even draw.io PNG files can be put here.
2. **Synthesis**: this step evaluates or even directs the research steps by defining the hypothesis, the MECE breakdowns and the overarching storyline. It can contain mdx files mostly. Additionally asset files for Gridd tables (*.gridd.json), image assets and further diagrams defined inside the mdx files acceptable.
3. **Presentation**: cutting the synthesis together into a Docusaurus page structure, enhanced visual communication with Mermaid, Rechart and Gridd embedded diagrams, charts and tables.

### Tech stack

In Presentation folder, it is:
- a Docusaurus project, Typescript,
- Mermaid enabled in the Docusaurus,
- adding Gridd, Rechart and D3 support by enabling @gridd/docusaurus-visuals-plugin (from https://www.npmjs.com/package/@gridd/docusaurus-visuals-plugin) and
- symlinking engagement folder to replace the docusaurus docs folder.