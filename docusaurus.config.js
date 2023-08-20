const currentYear = new Date().getFullYear();
const startYear = 2021;
const siteYear = startYear == currentYear ? String(startYear) : `${startYear} - ${currentYear}`;

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Valencia flats",
  tagline: "Tagline",
  url: "https://serene-palmier-f01f35.netlify.app",
  baseUrl: "/",
  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",
  organizationName: "MAB Data",
  projectName: "mabdata",
  themeConfig: {
    algolia: {
      // The application ID provided by Algolia
      appId: 'K5UOQ0RVBA',
      // Public API key: it is safe to commit it
      apiKey: 'e7311d2c32fbcca26fffca2a49b9c000',
      indexName: 'dev_mabdata'
    },
    hideableSidebar: true,
    collapsible: false,
    image: "img/social_preview.png", // Relative to "static" directory
    // googleAnalytics: {
    //   trackingID: "UA-173562145-3",
    //   anonymizeIP: true,
    // },
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'welcom_to_new_site', // Any value that will identify this message.
      content:
        'Do you like the website? I am a Cloud / MLOps Engineer, let`s connect :) <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/malgorzata-a-balcerzak/">My LinkedIn</a>',
      backgroundColor: '#b580cb', // Defaults to `#fff`.
      textColor: '#091E42', // Defaults to `#000`.
    },
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/dracula"),
    },
    navbar: {
      hideOnScroll: false,
      // style: 'primary', // or 'dark'
      title: "Valencia flats",
      logo: {
        alt: "Website Logo",
        src: "img/house_search.svg",
        srcDark: "img/house_search.svg",
      },
      items: [
        {
          to: "charts",
          label: "Charts",
        },
        {
          to: "flats",
          label: "Flats",
        },
        {
          to: "about",
          label: "Author",
          position: "right",
        },
        { 
          type: "doc",
          docId: "about", 
          label: "Docs", 
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
                <img src="/img/neighbourhood.svg" alt="Valencia flats" title="Valencia flats" class="footer-logo"/>
              `,
            },
          ],
        },
        // {
        //   title: "Data",
        //   items: [
        //     {
        //       label: "How I built it",
        //       to: "docs/about",
        //     },
        //     {
        //       label: "Charts",
        //       to: "charts",
        //     },
        //   ],
        // },
        {},
        {},
        {
          title: "Contact",
          items: [
            {
              label: "Contact me",
              to: "about#contact",
            },
            {
              label: "Buy me a coffee",
              href: "https://www.buymeacoffee.com/mab.data",
            },
            {
              label: "GitHub",
              href: "https://github.com/mbalcerzak",
            },
          ],
        },
      ],
      copyright: `Copyright © ${siteYear} Valencia flats`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "docs"
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
