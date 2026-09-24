import Link from "next/link";
import { livePrograms, site } from "@/lib/site";
import styles from "./site.module.css";

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
        <a href={livePrograms[0] ? `${livePrograms[0].href}#calendar` : "/"}>Talk to us</a>
      </div>
      <p>
        Sales &amp; Service
        <br />
        <a href={site.phoneHref}>{site.phoneDisplay}</a>
      </p>
    </footer>
  );
}
