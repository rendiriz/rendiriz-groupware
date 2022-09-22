import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';
const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps<{ session: Session }>) => {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider attribute="class">
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            {!isProduction && <ReactQueryDevtools initialIsOpen={false} />}
          </QueryClientProvider>
        </ThemeProvider>
      </SessionProvider>
      {isProduction && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
          strategy="worker"
        />
      )}
    </>
  );
};

export default MyApp;
