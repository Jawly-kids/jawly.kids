import Link from "next/link";
import { programs } from "@/lib/site";
import styles from "./marketing.module.css";

const cardDetails = {
  heroes: { title: "Find Your Bravo", subhead: "The Courage Within", image: "/homepage/heroes_for_Jawly_HomePage.png", side: "right" },
  cosmos: { title: "Stardusters", subhead: "Glow and Go", image: "/homepage/Cosmos_for_Jawly_HomePage.png", side: "left" },
  tides: { title: "Mighty Minnows", subhead: "Tiny Fins. Kindness Wins.", image: "/homepage/Tides_for_Jawly_HomePage.png", side: "right" },
} as const;

export default function OtherPrograms({ currentSlug }: { currentSlug: string }) {
  return (
    <section className={styles.otherPrograms} aria-labelledby={`${currentSlug}-other-programs-title`}>
      <div className={styles.otherProgramsHeading}>
        <h2 id={`${currentSlug}-other-programs-title`}>Explore our other programs.</h2>
        <p>Meet two more character-led worlds built for movement, imagination, and discovery.</p>
      </div>
      <div className={styles.otherProgramsGrid}>
        {programs.filter((program) => program.slug !== currentSlug).map((program) => {
          const detail = cardDetails[program.slug as keyof typeof cardDetails];
          return (
            <Link key={program.slug} href={program.href} className={`${styles.otherProgramCard} ${detail.side === "right" ? styles.otherProgramRight : styles.otherProgramLeft}`}>
              <img src={detail.image} alt="" />
              <div>
                <small>{program.label}{program.status === "draft" ? " · Coming Soon" : ""}</small>
                <h3>{detail.title}</h3>
                <p className={styles.otherProgramSubhead}>{detail.subhead}</p>
                <strong>{program.status === "draft" ? `Preview ${program.label}` : `Explore ${program.label}`} <span aria-hidden="true">→</span></strong>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
