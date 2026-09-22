import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Jawly", template: "%s | Jawly" },
  description: "Live character adventures for early childhood classrooms.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
