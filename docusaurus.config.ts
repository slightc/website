import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Hans Site",
  tagline: "Dinosaurs are cool",
  favicon: "https://github.com/slightc.png",

  // Set the production url of your site here
  url: "https://slightc.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "slightc", // Usually your GitHub org/user name.
  projectName: "site", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          // routeBasePath: '/posts',
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: "所有博文",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "https://github.com/slightc.png",
    navbar: {
      title: "HANS",
      logo: {
        alt: "Logo",
        src: "https://github.com/slightc.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "专题",
        },
        { to: "/blog", label: "博客", position: "left" },
        {
          href: "https://github.com/slightc",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "专题",
          items: [
            {
              label: "React18源码解析",
              to: "/docs/learn-react18",
            },
          ],
        },
        {},
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/slightc",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Hans Blog. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    giscus: {
      repo: "slightc/blog-giscus",
      repoId: "R_kgDOLrKr7g",
      category: "General",
      categoryId: "DIC_kwDOLrKr7s4CeiGk",
    },
    algolia: {
      // The application ID provided by Algolia
      appId: "ANJMDJ0JUV",

      // Public API key: it is safe to commit it
      apiKey: "f27d8193c3225f2fdf11de2a5bdccc7c",

      indexName: "slightc",

      // Optional
      contextualSearch: false,
      searchParameters: {
        facetFilters: [],
      },
      searchPagePath: "search",

      //... other Algolia params
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
