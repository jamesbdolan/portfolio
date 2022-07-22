module.exports = {
  siteMetadata: {
    title: "",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: `${__dirname}/blog`,
      }
    },
    // {
    //   resolve: `gatsby-plugin-favicons`,
    //   options: {
    //     logo: "./src/images/favicon.png"
    //   }
    // },
    "gatsby-plugin-mdx",
    "gatsby-remark-autolink-headers",
    "gatsby-remark-prismjs",
    "gatsby-remark-images",
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: `James Dolan's portfolio`,
        description: `Portfolio to showcase my abilities as a software engineer`,
        start_url: `/`,
        lang: `en`,
        icon: 'src/images/favicon.png'
      },
    },
    'gatsby-plugin-offline'
  ],
};