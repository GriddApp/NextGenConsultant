# Next-Gen Consultant

This is the new age for consultants. One without PPTX and the decades of obsolete baggage the industry carries over every day.

This project aims to bring a new type of deliverables for consultant clients with as little effort as possible required from the consultant. 

With the text based project content (`engagement` folder's markdown and json files), the work becomes more efficient and effective utilizing AI-agents and hand-made editing without the fuss of styling, pixel-perfect designing and other time sinks using the legacy PowerPoint and UI based toolkit.

Check out the live deployment on our [Demo Site](https://demo.griddapp.com)!

## How to use this project?

Fork this repository and push it to your own version control of choice.

https://github.com/GriddApp/NextGenConsultant

Work in the `engagement` folder:
- give project context, goals and aims, team info in the 0-context folder
- collect research data and backup pages in the 1-research folder
- and finalize the storyline, recommendation, insights and the supporting sources in the 2-synthesis folder

Or restructure however you wish for your own project, this content is extremely flexible for all needs!

Start docusaurus locally to see the rendered site:

```bash
cd hand-over
npm i
npm start
```



## Contribution


## Gridd Template collection

In this repository, you find a /gridd-fill skill ready for your use with 30+ templates already making your visualization efforts faster!

We have a 200+ collection of the finest management consulting templates ready for you to use however! Check it out at https://griddtemplates.com

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