import type { Metadata } from "next";
import Link from "next/link";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: { absolute: "Jawly | Choose your adventure" },
  description: "Step into Heroes or explore the Cosmos with Jawly.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Jawly | Choose your adventure",
    description: "Step into Heroes or explore the Cosmos with Jawly.",
    url: "/",
  },
};

const worlds = [
  {
    href: "/heroes",
    className: styles.heroes,
    eyebrow: "HEROES",
    title: "Find Your Bravo",
    tagline: "The Courage Within",
    image: "/homepage/heroes-gateway.png",
    imageAlt: "Bravo and the Little Legends setting out across a sunlit hillside",
  },
  {
    href: "/cosmos",
    className: styles.cosmos,
    eyebrow: "COSMOS",
    title: "Stardusters",
    tagline: "Glow and Go",
    image: "/homepage/cosmos-gateway.png",
    imageAlt: "Orla and the Stardusters exploring a glowing world in deep space",
  },
] as const;

export default function Home() {
  return (
    <main className={styles.gateway} data-homepage>
      <h1 className={styles.srOnly}>Choose your Jawly adventure</h1>
      <div className={styles.brandTab} aria-hidden="true">
        <span>JAWLY</span>
      </div>
      {worlds.map((world) => (
        <Link
          key={world.href}
          href={world.href}
          className={`${styles.panel} ${world.className}`}
          aria-label={`Explore ${world.title}`}
        >
          <img className={styles.artwork} src={world.image} alt={world.imageAlt} />
          <span className={styles.scrim} aria-hidden="true" />
          <span className={styles.copy}>
            <span className={styles.eyebrow}>{world.eyebrow}</span>
            <span className={styles.title}>{world.title}</span>
            <span className={styles.tagline}>{world.tagline}</span>
            <span className={styles.cta}>Explore <span aria-hidden="true">→</span></span>
          </span>
        </Link>
      ))}
    </main>
  );
}
