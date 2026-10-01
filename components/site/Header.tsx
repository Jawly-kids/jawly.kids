"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  globalNav,
  headerOverlayUsesLightType,
  headerOverlaysHero,
  pageSections,
  programs,
  site,
} from "@/lib/site";
import styles from "./site.module.css";

export default function Header() {
  const pathname = usePathname();
  const sections = pageSections[pathname] ?? [];
  const overlaysHero = headerOverlaysHero(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
    setProgramsOpen(false);
  }, [pathname]);

  const solid = !overlaysHero || scrolled || menuOpen;
  const lightType = !solid && headerOverlayUsesLightType(pathname);
  const onProgramPage = programs.some((program) => pathname === program.href);

  return (
    <header className={`${styles.header} ${solid ? styles.solid : ""} ${lightType ? styles.overlayLight : ""}`}>
      <div className={styles.tier1}>
        <Link className={styles.wordmark} href="/" aria-label={`${site.name} home`}>
          {site.name}
        </Link>

        <button
          className={styles.menuToggle}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav id="primary-navigation" className={`${styles.primaryNav} ${menuOpen ? styles.primaryNavOpen : ""}`} aria-label="Primary">
          {globalNav.map((link) =>
            link.label === "Programs" ? (
              <div className={styles.programMenu} key={link.label}>
                <button
                  className={styles.programMenuTrigger}
                  type="button"
                  aria-expanded={programsOpen}
                  aria-controls="program-navigation"
                  aria-current={onProgramPage ? "page" : undefined}
                  onClick={() => setProgramsOpen((open) => !open)}
                >
                  Programs <ChevronDown aria-hidden="true" />
                </button>
                <div id="program-navigation" className={`${styles.programDropdown} ${programsOpen ? styles.programDropdownOpen : ""}`}>
                  {programs.map((program) => (
                    <Link key={program.slug} href={program.href} aria-current={pathname === program.href ? "page" : undefined}>
                      <span className={styles.programImage}>
                        <img src={program.thumbnail} alt="" />
                      </span>
                      <span className={styles.programCardCopy}>
                        <span>{program.summary}</span>
                        {program.status === "draft" ? <em>Coming soon</em> : null}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
                {link.label}
              </Link>
            ),
          )}
          <Link className={styles.navCta} href="/contact">Book a Free Visit</Link>
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
