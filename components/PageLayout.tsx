import React from 'react';
import Head from 'next/head';

const defaultTitle = 'Frontend Eval Questions';
const defaultDescription = 'Solving all frontend eval questions';
const baseUrl = 'https://frontend-eval.vercel.app/';

interface Props {
  page?: string;
  description?: string;
  googleSiteVerification?: string;
  ogImage?: string;
  title?: string;
  url?: string;
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = '',
  description = defaultDescription,
  page = '',
  ogImage = '',
  googleSiteVerification = '',
  url = '',
}) => {
  const finalTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const finalUrl = `${baseUrl}${url}`;
  return (
    <>
      <Head>
        {/* design */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Primary SEO */}
        <title>{finalTitle}</title>
        <meta name="title" content={finalTitle} />
        <meta name="description" content={description} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={finalTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={finalUrl} />
        <meta property="og:image" content={ogImage} />
        {/* twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={finalUrl} />
        <meta property="twitter:title" content={finalTitle} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={ogImage} />
        {/* other */}
        {googleSiteVerification && <meta name="google-site-verification" content={googleSiteVerification} />}
      </Head>
      <main>
        <header>
          <h1>{page || title}</h1>
        </header>
        {children}
      </main>
    </>
  );
};

export default Layout;
