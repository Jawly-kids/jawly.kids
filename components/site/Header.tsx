"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CheckArea from "@/components/availability/CheckArea";
import {
  demoHref,
  globalNav,
  headerOverlayUsesLightType,
  headerOverlaysHero,
  pageSections,
  site,
} from "@/lib/site";
import styles from "./site.module.css";

export default function Header() {
  const pathname = usePathname();
  const sections = pageSections[pathname] ?? [];
  const overlaysHero = headerOverlaysHero(pathname);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const solid = !overlaysHero || scrolled;
  const lightType = !solid && headerOverlayUsesLightType(pathname);
  const talkHref = demoHref(pathname);

  return (
    <header className={`${styles.header} ${solid ? styles.solid : ""} ${lightType ? styles.overlayLight : ""}`}>
      <div className={styles.tier1}>
        <Link className={styles.wordmark} href="/" aria-label={`${site.name} home`}>
          {site.name}
        </Link>
        <nav aria-label="Primary">
          {globalNav.map((link) => (
            <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
          <CheckArea
            className={styles.navCta}
            demoHref={talkHref}
            page={`header:${pathname}`}
            label={pathname === "/" ? "Book a Free Visit" : "Check Availability"}
          />
        </nav>
      </div>
      {sections.length > 0 ? (
        <nav className={styles.tier2} aria-label="On this page">
          {sections.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
