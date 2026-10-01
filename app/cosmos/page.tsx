import type { Metadata } from "next";
import { cosmosCopy } from "@/content/programs/cosmos";
import CosmosLanding from "./CosmosLanding";

export const metadata: Metadata = {
  title: cosmosCopy.title,
  description: cosmosCopy.description,
  alternates: { canonical: "/cosmos" },
  openGraph: {
    title: `${cosmosCopy.title} | Jawly`,
    description: cosmosCopy.description,
    url: "/cosmos",
    images: [{
      url: "/homepage/Stardusters_by_Jawly.png",
      width: 1200,
      height: 450,
      alt: "Stardusters: Glow and Go",
    }],
  },
  twitter: { card: "summary_large_image", images: ["/homepage/Stardusters_by_Jawly.png"] },
};

export default function CosmosPage() {
  return <CosmosLanding />;
}
