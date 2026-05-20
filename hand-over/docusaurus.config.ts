import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import {
  griddEmbed,
  chartEmbed,
  d3Embed,
} from "@gridd/docusaurus-visuals-plugin/remark";
import { remarkSlides } from "@gridd/docusaurus-slides-plugin/remark";

const GRIDD_COMMON_STYLE = "/style/style.gridd.json";
const D3_SPEC_BASE_URL = "/style/d3";

const config: Config = {
  title: "Next-Gen Consultant",
  tagline: "Research → Synthesis → Presentation",
  favicon: "img/favicon.png",

  future: {
    v4: true,
  },

  url: "https://demo.griddapp.com",
  baseUrl: "/",

  onBrokenLinks: "throw",

  markdown: {
    mermaid: true,
  },

  themes: ["@docusaurus/theme-mermaid"],

  plugins: [
    "@gridd/docusaurus-visuals-plugin",
    "@gridd/docusaurus-slides-plugin",
  ],
  customFields: {
    griddEmbedBaseUrl:
      "https://wonderful-smoke-03be4ab0f.5.azurestaticapps.net/embeddable.html",
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          path: "../engagement",
          sidebarPath: "./sidebars.ts",
          remarkPlugins: [
            [griddEmbed, { styleSrc: GRIDD_COMMON_STYLE }],
            chartEmbed,
            [d3Embed, { specBaseUrl: D3_SPEC_BASE_URL }],
          ],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: "Next-Gen Consultant",
      logo: {
        alt: "Next-Gen Consultant",
        src: "img/favicon.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "contextSidebar",
          position: "left",
          label: "Context",
        },
        {
          type: "docSidebar",
          sidebarId: "researchSidebar",
          position: "left",
          label: "Research",
        },
        {
          type: "docSidebar",
          sidebarId: "synthesisSidebar",
          position: "left",
          label: "Synthesis",
        },
        {
          position: "right",
          label: "Blog",
          to: "blog",
        },
        {
          type: "dropdown",
          position: "right",
          label: "About",
          items: [
            { label: "README", to: "/about/readme" },
            { label: "License", to: "/about/license" },
          ],
        },
        {
          position: "right",
          label: "GitHub",
          href: "https://github.com/GriddApp/NextGenConsultant",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} DeckAI Inc. Built with Docusaurus. Disclaimer: content is fictional, not a real engagement done by any consultant.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
