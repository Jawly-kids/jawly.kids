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
  },
};

export default function HeroesPage() {
  return <HeroesLanding />;
}
