import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import styles from "./facilitators.module.css";

export const metadata: Metadata = {
  title: "Join the Jawly Crew",
  description: "Bring Jawly characters and live adventures to early-learning classrooms.",
  alternates: { canonical: "/facilitators" },
};

export default function FacilitatorsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="facilitators-title">
        <p className={styles.eyebrow}>Join the Jawly Crew</p>
        <h1 id="facilitators-title">Bring unforgettable characters to life.</h1>
        <p className={styles.intro}>
          We&apos;re creating a flexible way for expressive, dependable people to bring movement,
          imagination, and meaningful play into early-learning classrooms.
        </p>
        <div className={styles.status}>
          <strong>Interested in joining the Jawly Crew?</strong>
          <span>Tell us about your performance experience, availability, and the communities you know.</span>
        </div>
        <a href={site.phoneHref}>Call {site.phoneDisplay}</a>
        <Link href="/contact">Contact the Jawly team</Link>
      </section>
    </main>
  );
}
