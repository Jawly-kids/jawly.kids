import type { Metadata } from "next";
import TidesLanding from "./TidesLanding";

export const metadata: Metadata = {
  title: "Tides",
  description:
    "A live ocean adventure where children move, imagine, practice kindness, and discover an underwater world alongside Mira and the Mighty Minnows.",
  alternates: { canonical: "/tides" },
};

export default function TidesPage() {
  return <TidesLanding />;
}
