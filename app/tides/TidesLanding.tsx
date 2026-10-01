"use client";

import ClassroomTrust from "@/components/marketing/ClassroomTrust";
import ExperienceStrip from "@/components/marketing/ExperienceStrip";
import LeadCaptureCta from "@/components/marketing/LeadCaptureCta";
import OtherPrograms from "@/components/marketing/OtherPrograms";
import styles from "../heroes/heroes.module.css";

export default function TidesLanding() {
  return (
    <main className={`${styles.page} ${styles.tidesPage}`}>
      <section id="top" className={`${styles.hero} ${styles.tidesHero}`}>
        <img className={styles.heroBackdrop} src="/tides/Tides_Background.png" alt="" aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>TIDES: THE DISCOVERY JOURNEY <span>· COMING SOON</span></p>
          <img className={styles.bravoLogo} src="/tides/Mighty_Minnows_by_Jawly.png" alt="Mighty Minnows: Tiny Fins. Kindness Wins." />
          <p className={styles.heroLead}>A live ocean adventure where children move, imagine, practice kindness, and discover an underwater world alongside Mira and the Mighty Minnows.</p>
        </div>
        <img className={styles.heroFigures} src="/tides/TidesGroupShot.png" alt="Mira swimming with the Mighty Minnows" />
      </section>

      <ExperienceStrip context="program" character="Mira" program="Tides" demoHref="#calendar" page="tides" theme="tides" />

      <section id="experience" className={styles.tidesStory} aria-labelledby="mira-title">
        <div className={styles.tidesStoryInner}>
          <article className={styles.tidesStoryCopy}>
            <p className={styles.eyebrow}>STARRING MIRA</p>
            <h2 id="mira-title">A curious guide for the world beneath the waves.</h2>
            <p>Mira turns the classroom into an underwater expedition. Children follow her lead, move like sea creatures, solve challenges together, and discover that even the smallest fin can make a meaningful difference.</p>
            <p className={styles.tidesCastNote}>A trained Jawly cast member brings Mira&apos;s movement, warmth, and playful sense of discovery into the room.</p>
          </article>
          <div className={styles.tidesPortrait}>
            <img src="/tides/Mira-Portraite.png" alt="The Jawly cast member who brings Mira to life" />
          </div>
        </div>
      </section>

      <OtherPrograms currentSlug="tides" />

      <ClassroomTrust />

      <LeadCaptureCta theme="tides" page="tides-bottom" />
    </main>
  );
}
