import type { Metadata } from "next";
import HeroesLanding from "./HeroesLanding";

export const metadata: Metadata = {
  title: "Find Your Bravo | Jawly",
  description:
    "A theatrical, screenless social-emotional learning adventure for early childhood classrooms.",
};

export default function HeroesPage() {
  return <HeroesLanding />;
}
