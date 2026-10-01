import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jawly.kids"),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${nunito.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
