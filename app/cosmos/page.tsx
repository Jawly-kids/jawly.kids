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
  },
};

export default function CosmosPage() {
  return <CosmosLanding />;
}
