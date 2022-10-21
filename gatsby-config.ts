import type { GatsbyConfig } from "gatsby";
import slug from "./src/utilities/slug";

const url = "https://mikecheek.github.io" + slug;
const description = "A simple guess the word game";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Word game`,
    siteUrl: url,
    description: description,
    author: "Michele Pulvirenti",
    keywords: ["word", "game", "guess"],
  },
  flags: {
    DEV_SSR: true,
  },
  pathPrefix: `/wordgame`,
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: "./src/assets/",
      },
      __key: "assets",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
        path: "./src/assets/",
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: url,
        sitemap: url + "/sitemap/sitemap-0.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Word Game | MP",
        short_name: "Word Game",
        description: description,
        start_url: "/",
        lang: "en",
        background_color: "#000000",
        theme_color: "#000000",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "fullscreen",
        icon: "src/assets/images/icon.png", // This path is relative to the root of the site.
        icons: [
          {
            src: "src/assets/images/maskableIcons/maskable_icon.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "src/assets/images/maskableIcons/maskable_icon_x512.png",
            sizes: `512x512`,
            type: `image/png`,
          },
          {
            src: "src/assets/images/maskableIcons/maskable_icon_x384.png",
            sizes: `384x384`,
            type: `image/png`,
          },
          {
            src: "src/assets/images/maskableIcons/maskable_icon_x192.png",
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: "src/assets/images/maskableIcons/maskable_icon_x128.png",
            sizes: `128x128`,
            type: `image/png`,
          },
          {
            src: "src/assets/images/maskableIcons/maskable_icon_x96.png",
            sizes: `96x96`,
            type: `image/png`,
          },
          {
            src: "src/assets/images/maskableIcons/maskable_icon_x72.png",
            sizes: `72x72`,
            type: `image/png`,
          },
          {
            src: "src/assets/images/maskableIcons/maskable_icon_x48.png",
            sizes: `48x48`,
            type: `image/png`,
          },
        ],
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: ["/"],
        workboxConfig: {
          maximumFileSizeToCacheInBytes: 100000000,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Montserrat\:700`, `Rubik\:300,700`],
        display: "swap",
      },
    },
  ],
};

export default config;
