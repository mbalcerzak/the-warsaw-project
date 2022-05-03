module.exports = {
  presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
  themeConfig: {
    algolia: {
      contextualSearch: true,
    },
  },
};
