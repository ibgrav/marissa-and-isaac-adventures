import type { AppProps } from "next/app";
import Head from "next/head";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "../main.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </main>
  );
}
