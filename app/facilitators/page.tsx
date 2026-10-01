import Link from "next/link";
import styles from "./facilitators.module.css";

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
          <strong>Applications are coming soon.</strong>
          <span>Role details, service areas, and the application process are still being prepared.</span>
        </div>
        <Link href="/">Return to Jawly</Link>
      </section>
    </main>
  );
}
