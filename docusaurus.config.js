// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Marzban Nameh',
  tagline: 'با مرزبان نامه به بهترین شکل از مرزبان استفاده کن!',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://marzbannameh.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'marzbannameh', // Usually your GitHub org/user name.
  projectName: 'marzbannameh.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fa',
    locales: ['fa', 'en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/marzbannameh/marzbannameh.github.io/tree/main/',
        },
        blog: false,
      //  blog: {
      //    showReadingTime: true,
      //    feedOptions: {
      //      type: ['rss', 'atom'],
      //      xslt: true,
      //    },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
      //    editUrl:
      //      'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
      //    onInlineTags: 'warn',
      //    onInlineAuthors: 'warn',
      //    onUntruncatedBlogPosts: 'warn',
      //  },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Marzban Nameh',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
        //  {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/marzbannameh',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'localeDropdown',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/@MarzbanNameh',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/Marzban_Nameh',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/marzbannameh',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Marzban Nameh, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
