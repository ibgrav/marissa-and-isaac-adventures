import { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./main.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        <Analytics />
      </body>
    </html>
  );
}
