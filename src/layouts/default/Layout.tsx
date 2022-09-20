import Head from 'next/head';
import { useRouter } from 'next/router';

import { site } from '@/lib/site';
import Navbar from '@/layouts/default/Navbar';
import NavbarMega from '@/components/navbar/NavbarMega';

type TLayout = {
  children: JSX.Element;
};

const Layout = (props: TLayout) => {
  const router = useRouter();

  const { children, ...customMeta } = props;

  const meta = {
    mainTitle: 'Rendi Riz Groupware',
    title: null,
    description: 'Rendi Riz Groupware',
    image: 'https://placehold.co/1820x904',
    date: null,
    ...customMeta,
  };

  let metaTitle = meta.mainTitle;
  if (meta.title) {
    metaTitle = `${meta.title} — ${meta.mainTitle}`;
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href={site.favicon} />
        <link rel="canonical" href={`${site.url}${router.asPath}`} />
        <title>{metaTitle}</title>
        <meta name="description" content={meta.description} />
        <meta name="robots" content="follow, index" />
        <meta property="og:url" content={`${site.url}${router.asPath}`} />
        <meta property="og:type" content={site.type} />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={site.twitter} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
