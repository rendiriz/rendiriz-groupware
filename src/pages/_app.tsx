import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

const MyApp = ({ Component, pageProps }: AppProps<{ session: Session }>) => {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        strategy="worker"
      />
    </>
  );
};

export default MyApp;
