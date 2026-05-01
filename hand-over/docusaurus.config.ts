import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import {
  griddEmbed,
  chartEmbed,
  d3Embed,
} from "@gridd/docusaurus-visuals-plugin/remark";

const GRIDD_COMMON_STYLE = "/style/style.gridd.json";
const D3_SPEC_BASE_URL = "/style/d3";

const config: Config = {
  title: "New Age Consultant Demo",
  tagline: "Research → Synthesis → Presentation",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://your-docusaurus-site.example.com",
  baseUrl: "/",

  onBrokenLinks: "throw",

  markdown: {
    mermaid: true,
  },

  themes: ["@docusaurus/theme-mermaid"],

  plugins: ["@gridd/docusaurus-visuals-plugin"],

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
    navbar: {
      title: "New Age Consultant Demo",
      logo: {
        alt: "New Age Consultant Demo",
        src: "img/logo.svg",
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
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} New Age Consultant Demo. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
