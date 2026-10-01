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
  summary: string;
  thumbnail: string;
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
    summary: "Courage, teamwork, and movement.",
    thumbnail: "/heroes/bravo-state-1.jpg",
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
    summary: "Wonder, discovery, and real science.",
    thumbnail: "/cosmos/state-1.jpg",
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
    summary: "Kindness, movement, and ocean discovery.",
    thumbnail: "/tides/mira-state-1.png",
    mark: "≈",
    tone: "tides",
    status: "draft",
  },
];

export const livePrograms = programs.filter((program) => program.status === "live");

export type SiteLink = { href: string; label: string };

/** Tier 1. Identical on every educator-track route. Programs stays a plain link until JAW-184. */
export const globalNav: SiteLink[] = [
  { href: "/", label: "Home" },
  { href: "/heroes", label: "Programs" },
  { href: "/why-jawly", label: "Why Jawly" },
  { href: "/trust-safety", label: "Trust & Safety" },
];

/** Tier 2 in-page anchors, keyed by path. Any route can opt in. */
export const pageSections: Record<string, SiteLink[]> = {
  "/why-jawly": [
    { href: "#physical-world", label: "The reasons" },
    { href: "#rhythm", label: "The rhythm" },
    { href: "#evidence", label: "The thinking" },
  ],
  "/trust-safety": [
    { href: "#privacy", label: "Privacy" },
    { href: "#documentation", label: "Filming" },
    { href: "#personal", label: "Personalization" },
    { href: "#people", label: "People" },
    { href: "#standards", label: "Standards" },
  ],
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

/** Full-bleed first screen. The header stays transparent until the page scrolls. */
export function headerOverlaysHero(pathname: string) {
  return pathname === "/" || pathname === "/heroes" || pathname === "/cosmos" || pathname === "/why-jawly";
}

/**
 * Dark hero art under a transparent bar. Light type is a contrast stand-in
 * until the nav wireframe (frames 01–04) can be checked.
 */
export function headerOverlayUsesLightType(pathname: string) {
  return pathname === "/cosmos";
}

export function demoHref(pathname: string) {
  if (pathname === "/heroes" || pathname === "/cosmos") return "#calendar";
  const destination = livePrograms[0]?.href ?? "/";
  return `${destination}#calendar`;
}
