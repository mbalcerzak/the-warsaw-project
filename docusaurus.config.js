const currentYear = new Date().getFullYear();
const startYear = 2021;
const siteYear = startYear == currentYear ? String(startYear) : `${startYear} - ${currentYear}`;

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Warsaw flats",
  tagline: "Tagline",
  url: "https://covid-fr.misterfishup.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",
  organizationName: "MAB Data",
  projectName: "mabdata",
  i18n: {
    defaultLocale: "zh-Hant",
    locales: ["zh-Hant", "zh-Hans", "en", "fr"],
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
        src: "img/logo.svg",
        srcDark: "img/logo-dark.svg",
      },
      items: [
        {
          to: "digest",
          label: "Digest",
          activeBaseRegex: "digest/?$",
        },
        {
          type: "doc",
          docId: "2021/intro",
          label: "2021",
        },
        {
          type: "doc",
          docId: "2020/december/31",
          label: "2020",
        },
        {
          to: "charts",
          label: "charts",
        },
        {
          type: "doc",
          docId: "sources",
          label: "sources",
        },
        {
          to: "about",
          label: "about",
          position: "right",
        },
        {
          type: "localeDropdown",
          position: "right",
        },
        // { to: 'blog', label: 'Blog', position: 'left' },
        // {
        //   href: 'https://github.com/MisterFISHUP/covid-19-in-france',
        //   // label: 'GitHub',
        //   position: 'right',
        //   className: 'header-github-link',
        //   'aria-label': 'GitHub repository',
        // },
      ],
    },
    footer: {
      // style: 'dark',
      links: [
        {
          items: [
            {
              html: `
                <img src="/img/logo.svg" alt="Warsaw flats | Daily Digest - COVID-19 IN FRANCE" title="Warsaw flats | Daily Digest - COVID-19 IN FRANCE" class="footer-logo"/>
              `,
            },
          ],
        },
        {
          title: "日誌",
          items: [
            {
              label: "2021 年",
              to: "digest/2021/",
            },
            {
              label: "2020 年",
              to: "digest/2020/december/31",
            },
          ],
        },
        {
          title: "法國疫情數據",
          items: [
            {
              label: "官方數據儀表板",
              href: "https://www.gouvernement.fr/info-coronavirus/carte-et-donnees",
            },
            {
              label: "官方數據儀表板 - 疫情總覽",
              href: "https://dashboard.covid19.data.gouv.fr/vue-d-ensemble",
            },
            {
              label: "官方數據庫",
              href: "https://www.data.gouv.fr/fr/pages/donnees-coronavirus",
            },
            {
              label: "法國衛生部 - 疫苗數據",
              href:
                "https://solidarites-sante.gouv.fr/grands-dossiers/vaccin-covid-19/article/le-tableau-de-bord-de-la-vaccination",
            },
            {
              label: "法國公共衛生局 SpF",
              href:
                "https://www.santepubliquefrance.fr/dossiers/coronavirus-covid-19/coronavirus-chiffres-cles-et-evolution-de-la-covid-19-en-france-et-dans-le-monde",
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
              href: "https://github.com/MisterFISHUP/covid-19-in-france",
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
          routeBasePath: "digest",
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
