import Link from "next/link";
import { globalNav, livePrograms, programs, site } from "@/lib/site";
import styles from "./site.module.css";

const tides = programs.find((program) => program.slug === "tides");
const storyLinks = globalNav.filter((link) => link.href === "/why-jawly" || link.href === "/trust-safety");

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <strong>{site.name}</strong>
      <div>
        <Link href="/">Home</Link>
        {livePrograms.map((program) => (
          <Link key={program.slug} href={program.href}>
            {program.label}
          </Link>
        ))}
        {tides ? <Link href={tides.href}>Tides · Coming Soon</Link> : null}
        {storyLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
        <a href={livePrograms[0] ? `${livePrograms[0].href}#calendar` : "/"}>Talk to us</a>
        <Link href="/privacy">Privacy</Link>
        <Link href="/term">Terms</Link>
      </div>
      <p>
        Sales &amp; Service
        <br />
        <a href={site.phoneHref}>{site.phoneDisplay}</a>
      </p>
    </footer>
  );
}
