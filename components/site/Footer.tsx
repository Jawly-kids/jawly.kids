import Link from "next/link";
import { CalendarDays, MessageCircle, Users } from "lucide-react";
import { programs, site } from "@/lib/site";
import styles from "./site.module.css";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M5.3 7.8H1.7V22h3.6V7.8ZM3.5 2A2.1 2.1 0 1 0 3.5 6.2 2.1 2.1 0 0 0 3.5 2ZM22.3 13.9c0-4.3-2.3-6.3-5.3-6.3-2.5 0-3.6 1.4-4.2 2.3V7.8H9.2V22h3.6v-7c0-1.8.3-3.6 2.6-3.6 2.2 0 2.3 2.1 2.3 3.7V22h3.6l1-8.1Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M14 8.5V6.8c0-.8.5-1 1-1h2.7V2.1L14.6 2C11.2 2 10 4.1 10 6.4v2.1H7v4.1h3V22h4v-9.4h3.3l.5-4.1H14Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
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
              alt="NAEYC, National Association for the Education of Young Children"
            />
          </div>
          <div className={styles.footerSocials} aria-label="Jawly social media">
            <a
              href="https://www.linkedin.com/company/jawly-kids/"
              target="_blank"
              rel="noreferrer"
              aria-label="Jawly on LinkedIn"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://www.instagram.com/jawly.kids/"
              target="_blank"
              rel="noreferrer"
              aria-label="Jawly on Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61588455315994"
              target="_blank"
              rel="noreferrer"
              aria-label="Jawly on Facebook"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>

        <div className={styles.footerGroup}>
          <h2>Explore &amp; Join</h2>
          <Link href="/">Home</Link>
          <Link href="/why-jawly">Why Jawly</Link>
          <Link href="/trust-safety">Trust &amp; Safety</Link>
          <Link href="/facilitators">Join the Jawly Crew</Link>
          <Link href="/contact">Book a Free Visit</Link>
        </div>

        <div className={styles.footerGroup}>
          <h2>Programs</h2>
          {programs.map((program) => (
            <Link key={program.slug} href={program.href}>
              {program.label}{program.status === "draft" ? <span className={styles.footerLinkNote}> · Coming Soon</span> : null}
            </Link>
          ))}
        </div>

        <div className={`${styles.footerGroup} ${styles.footerSupport}`}>
          <h2>Talk with Jawly</h2>
          <div className={styles.footerContactCards}>
            <Link href="/contact">
              <MessageCircle aria-hidden="true" />
              <span><strong>Questions?</strong><small>Tell us what you need</small></span>
            </Link>
            <a href={site.scheduleHref} target="_blank" rel="noreferrer">
              <CalendarDays aria-hidden="true" />
              <span><strong>Schedule a meeting</strong><small>Choose a time to talk</small></span>
            </a>
            <a href={site.phoneHref}>
              <Users aria-hidden="true" />
              <span><strong>Interested in joining?</strong><small>Call the Jawly team</small></span>
            </a>
          </div>
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
