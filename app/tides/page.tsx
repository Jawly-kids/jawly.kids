import type { Metadata } from "next";
import styles from "./tides.module.css";

export const metadata: Metadata = {
  title: "Tides",
  description:
    "An ocean adventure is on the horizon. Children will move, imagine, and explore a vibrant underwater world alongside Mira.",
  alternates: { canonical: "/tides" },
};

export default function TidesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="tides-title">
        <img
          className={styles.scene}
          src="/homepage/Tides_for_Jawly_HomePage.png"
          alt="Mira and young explorers discovering a colorful ocean world"
        />
        <div className={styles.copy}>
          <p className={styles.label}>Tides · Coming Soon</p>
          <h1 id="tides-title" className={styles.logo}>
            <img src="/homepage/Mighty_Minnows_by_Jawly.png" alt="Mighty Minnows: Tiny Fins. Kindness Wins." />
          </h1>
          <p>
            An ocean adventure is on the horizon. Children will move, imagine, and explore a vibrant underwater world
            alongside Mira.
          </p>
          <span className={styles.comingSoon}>Coming Soon</span>
        </div>
      </section>
    </main>
  );
}
