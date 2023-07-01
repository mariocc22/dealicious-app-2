import "./globals.css";
import Provider from "./components/Provider";
import Link from "next/link";

import ThemeWrapper from "./components/ThemeWrapper";

export const metadata = {
  title: "Dealicious",
  description: "Best App for Deals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Provider>
          {/* <ThemeWrapper> */}
          {children}
          {/* </ThemeWrapper> */}
        </Provider>
      </body>
    </html>
  );
}
