const currentYear = new Date().getFullYear();
const startYear = 2021;
const siteYear = startYear == currentYear ? String(startYear) : `${startYear} - ${currentYear}`;

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Warsaw flats",
  tagline: "Tagline",
  url: "http://mabdata.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",
  organizationName: "MAB Data",
  projectName: "mabdata",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pl"],
    localeConfigs: {
      en: { label: "English" },
      pl: { label: "Polski" },
    },
  },
  themeConfig: {
    hideableSidebar: true,
    // algolia: {
    //   apiKey: '',
    //   indexName: '',
    // },
    image: "img/social_preview.png", // Relative to "static" directory
    googleAnalytics: {
      trackingID: "UA-173562145-3",
      anonymizeIP: true,
    },
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
      switchConfig: {
        darkIcon: "🌙",
      },
    },
    // announcementBar: {
    //   id: 'welcom_to_new_site', // Any value that will identify this message.
    //   content:
    //     'We are looking to revamp our docs, please fill <a target="_blank" rel="noopener noreferrer" href="#">this survey</a>',
    //   backgroundColor: '#fafbfc', // Defaults to `#fff`.
    //   textColor: '#091E42', // Defaults to `#000`.
    // },
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/dracula"),
    },
    navbar: {
      hideOnScroll: true,
      // style: 'primary', // or 'dark'
      title: "Warsaw flats",
      logo: {
        alt: "Website Logo",
        src: "img/house_search.svg",
        srcDark: "img/house_search.svg",
      },
      items: [
        {
          to: "charts",
          label: "charts",
        },
        {
          to: "about",
          label: "author",
          position: "right",
        },
        { 
          type: "doc",
          docId: "about", 
          label: "docs", 
          position: "left", 
        },
      ],
    },
    footer: {
      // style: 'dark',
      links: [
        {
          items: [
            {
              html: `
                <img src="/img/neighbourhood.svg" alt="Warsaw flats" title="Warsaw flats" class="footer-logo"/>
              `,
            },
          ],
        },
        {
          title: "Data",
          items: [
            {
              label: "How I built it",
              to: "docs/about",
            },
            {
              label: "Charts",
              to: "charts",
            },
          ],
        },
        {
          title: "Contact",
          items: [
            {
              label: "Contact me",
              to: "about#contact",
            },
            {
              label: "Buy me a coffee",
              href: "https://www.buymeacoffee.com/mabdata",
            },
            {
              label: "GitHub",
              href: "https://github.com/mbalcerzak",
            },
          ],
        },
      ],
      copyright: `Copyright © ${siteYear} Warsaw flats`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "docs",
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
      },
    ],
  ],
  plugins: ["docusaurus-plugin-sass"],
};
