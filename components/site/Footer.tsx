import Link from "next/link";
import { Phone } from "lucide-react";
import CheckArea from "@/components/availability/CheckArea";
import { programs, site } from "@/lib/site";
import styles from "./site.module.css";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M5.3 7.8H1.7V22h3.6V7.8ZM3.5 2A2.1 2.1 0 1 0 3.5 6.2 2.1 2.1 0 0 0 3.5 2ZM22.3 13.9c0-4.3-2.3-6.3-5.3-6.3-2.5 0-3.6 1.4-4.2 2.3V7.8H9.2V22h3.6v-7c0-1.8.3-3.6 2.6-3.6 2.2 0 2.3 2.1 2.3 3.7V22h3.6l1-8.1Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerCta}>
        <div>
          <p className={styles.footerEyebrow}>Bring Jawly to your center</p>
          <h2>Ready to light up the room?</h2>
          <p>Check your area, then start with one complete 30-minute adventure—free.</p>
        </div>
        <CheckArea
          className={styles.footerCtaButton}
          demoHref="/heroes#calendar"
          page="footer"
          label="Check Availability"
        />
      </div>

      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <Link className={styles.footerWordmark} href="/" aria-label={`${site.name} home`}>
            {site.name}
          </Link>
          <p>{site.description}</p>
          <div className={styles.footerMembership}>
            <span>Proud member of</span>
            <img
              src="/brand/naeyc-member.png"
              alt="NAEYC — National Association for the Education of Young Children"
            />
          </div>
          <div className={styles.footerSocials} aria-label="Jawly social media">
            <a
              href="https://www.linkedin.com/company/jawly-kids"
              target="_blank"
              rel="noreferrer"
              aria-label="Jawly on LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
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

        <div className={`${styles.footerGroup} ${styles.footerSupport}`}>
          <h2>Questions?</h2>
          <p>Call the Jawly team. We&apos;re happy to talk through fit, timing, and what a first visit looks like.</p>
          <a className={styles.supportCall} href={site.phoneHref}>
            <Phone aria-hidden="true" />
            <span>
              <small>Call us</small>
              <strong>{site.phoneDisplay}</strong>
            </span>
          </a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} Jawly</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/term">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
