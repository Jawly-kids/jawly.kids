import type { Metadata } from "next";
import TidesLanding from "./TidesLanding";

export const metadata: Metadata = {
  title: "Tides",
  description:
    "A live ocean adventure where children move, imagine, practice kindness, and discover an underwater world alongside Mira and the Mighty Minnows.",
  alternates: { canonical: "/tides" },
  openGraph: {
    title: "Tides | Jawly",
    description:
      "A live ocean adventure where children move, imagine, practice kindness, and discover an underwater world alongside Mira and the Mighty Minnows.",
    url: "/tides",
    images: [{
      url: "/tides/Mighty_Minnows_by_Jawly.png",
      width: 2062,
      height: 763,
      alt: "Mighty Minnows: Tiny Fins. Kindness Wins.",
    }],
  },
  twitter: { card: "summary_large_image", images: ["/tides/Mighty_Minnows_by_Jawly.png"] },
};

export default function TidesPage() {
  return <TidesLanding />;
}
