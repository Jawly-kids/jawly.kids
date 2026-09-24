"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { demoHref, livePrograms, programSections, site } from "@/lib/site";
import styles from "./site.module.css";

export default function Header() {
  const pathname = usePathname();
  const sections = programSections[pathname] ?? [];
  const links = sections.length > 0 ? sections : livePrograms.map((program) => ({ href: program.href, label: program.label }));

  return (
    <header className={`${styles.header} ${pathname === "/cosmos" ? styles.cosmosHeader : ""}`}>
      <Link className={styles.wordmark} href="/" aria-label={`${site.name} home`}>
        {site.name}
      </Link>
      <nav aria-label="Primary">
        {links.map((link) =>
          link.href.startsWith("#") ? (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ) : (
            <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
              {link.label}
            </Link>
          ),
        )}
        <a className={styles.navCta} href={demoHref(pathname)}>
          Get a free demo
        </a>
      </nav>
    </header>
  );
}
