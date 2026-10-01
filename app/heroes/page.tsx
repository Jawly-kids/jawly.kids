import type { Metadata } from "next";
import HeroesLanding from "./HeroesLanding";

export const metadata: Metadata = {
  title: "Find Your Bravo",
  description:
    "A theatrical, screenless social-emotional learning adventure for early childhood classrooms.",
  alternates: { canonical: "/heroes" },
  openGraph: {
    title: "Find Your Bravo | Jawly",
    description:
      "A theatrical, screenless social-emotional learning adventure for early childhood classrooms.",
    url: "/heroes",
    images: [{
      url: "/heroes/find-your-bravo-logo.png",
      width: 1200,
      height: 444,
      alt: "Find Your Bravo: The Courage Within",
    }],
  },
  twitter: { card: "summary_large_image", images: ["/heroes/find-your-bravo-logo.png"] },
};

export default function HeroesPage() {
  return <HeroesLanding />;
}
