export const site = {
  name: "Jawly",
  description: "Live character adventures for early childhood classrooms.",
  salesEmail: "kyle@jawly.kids",
  phoneDisplay: "1-888-77-JAWLY",
  phoneHref: "tel:+18887752959",
} as const;

export type ProgramStatus = "live" | "draft";

export type SiteProgram = {
  slug: string;
  href: string;
  label: string;
  character: string;
  journey: string;
  mark: string;
  tone: "cosmos" | "tides" | "heroes";
  status: ProgramStatus;
};

export const programs: SiteProgram[] = [
  {
    slug: "heroes",
    href: "/heroes",
    label: "Heroes",
    character: "Bravo",
    journey: "The Courage Journey",
    mark: "★",
    tone: "heroes",
    status: "live",
  },
  {
    slug: "cosmos",
    href: "/cosmos",
    label: "Cosmos",
    character: "Orla Orbit",
    journey: "The Knowledge Journey",
    mark: "✦",
    tone: "cosmos",
    status: "live",
  },
  {
    slug: "tides",
    href: "/tides",
    label: "Tides",
    character: "Mira",
    journey: "The Discovery Journey",
    mark: "≈",
    tone: "tides",
    status: "draft",
  },
];

export const livePrograms = programs.filter((program) => program.status === "live");

export const programSections: Record<string, { href: string; label: string }[]> = {
  "/heroes": [
    { href: "#experience", label: "The experience" },
    { href: "#journey", label: "The journey" },
    { href: "#proof", label: "Proof" },
  ],
  "/cosmos": [
    { href: "#experience", label: "The experience" },
    { href: "#journey", label: "The journey" },
    { href: "#proof", label: "Proof" },
  ],
};

export function demoHref(pathname: string) {
  if (programSections[pathname]) return "#calendar";
  const destination = livePrograms[0]?.href ?? "/";
  return `${destination}#calendar`;
}
