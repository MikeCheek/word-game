import React from 'react';
import { Helmet } from 'react-helmet';
//import { useStaticQuery, graphql } from "gatsby"
import { SEOProps /*QueryTypes*/ } from './index.types';
import { useStaticQuery, graphql } from 'gatsby';

const Index = ({
  description = '',
  lang = 'en',
  meta = [],
  title,
  pathname,
  googleSiteVerification,
  bingSiteVerification,
}: SEOProps): JSX.Element => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            keywords
            siteUrl
          }
        }
      }
    `
  );

  const metaDescription: string = site.siteMetadata.description || description;
  const defaultTitle: string = site.siteMetadata.title || 'MP';
  const url: string = site.siteMetadata.siteUrl || location.origin + location.pathname;
  const image = null; // url + "/logo.png";
  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      link={[
        canonical
          ? {
              rel: 'canonical',
              href: canonical,
            }
          : {},
        { rel: 'icon', href: '/favicon.ico' },
      ]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: 'keywords',
          content: site.siteMetadata.keywords.join(','),
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: url,
        },
        {
          property: `og:site_name`,
          content: title,
        },
        // {
        //   property: `twitter:image`,
        //   content: image,
        // },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `google-site-verification`,
          content: googleSiteVerification ?? '',
        },
        {
          name: `msvalidate.01`,
          content: bingSiteVerification ?? '',
        },
      ]
        .concat(
          image
            ? [
                {
                  property: 'og:image',
                  content: image,
                },
                {
                  property: 'og:image:width',
                  content: '200px',
                },
                {
                  property: 'og:image:height',
                  content: '200px',
                },
                {
                  name: 'twitter:card',
                  content: 'summary_large_image',
                },
              ]
            : [
                {
                  name: 'twitter:card',
                  content: 'summary',
                },
              ]
        )
        .concat(meta)}
    ></Helmet>
  );
};

/*
// Queries
const SEOStaticQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
*/

export default Index;
