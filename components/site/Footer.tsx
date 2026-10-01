import Link from "next/link";
import { programs, site } from "@/lib/site";
import styles from "./site.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <Link className={styles.footerWordmark} href="/" aria-label={`${site.name} home`}>
            {site.name}
          </Link>
          <p>{site.description}</p>
          <a className={styles.footerPhone} href={site.phoneHref}>{site.phoneDisplay}</a>
        </div>

        <div className={styles.footerGroup}>
          <h2>Explore</h2>
          <Link href="/">Home</Link>
          <Link href="/why-jawly">Why Jawly</Link>
          <Link href="/trust-safety">Trust &amp; Safety</Link>
        </div>

        <div className={styles.footerGroup}>
          <h2>Programs</h2>
          {programs.map((program) => (
            <Link key={program.slug} href={program.href}>
              {program.label}{program.status === "draft" ? " · Coming Soon" : ""}
            </Link>
          ))}
        </div>

        <div className={styles.footerGroup}>
          <h2>Join</h2>
          <Link href="/facilitators">Join the Jawly Crew</Link>
          <Link href="/heroes#calendar">Book a Free Visit</Link>
        </div>

        <div className={styles.footerGroup}>
          <h2>Legal</h2>
          <Link href="/privacy">Privacy</Link>
          <Link href="/term">Terms</Link>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} Jawly</span>
        <span>Live character adventures for early learners.</span>
      </div>
    </footer>
  );
}
