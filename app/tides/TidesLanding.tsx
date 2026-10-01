"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import CheckArea from "@/components/availability/CheckArea";
import ClassroomTrust from "@/components/marketing/ClassroomTrust";
import ExperienceStrip from "@/components/marketing/ExperienceStrip";
import OtherPrograms from "@/components/marketing/OtherPrograms";
import { site } from "@/lib/site";
import styles from "../heroes/heroes.module.css";

export default function TidesLanding() {
  const schedulingDialogRef = useRef<HTMLDialogElement>(null);

  return (
    <main className={`${styles.page} ${styles.tidesPage}`}>
      <section id="top" className={`${styles.hero} ${styles.tidesHero}`}>
        <img className={styles.heroBackdrop} src="/tides/Tides_Background.png" alt="" aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>TIDES: THE DISCOVERY JOURNEY · COMING SOON</p>
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

      <section id="calendar" className={styles.calendarSection}>
        <div className={styles.ctaShell}>
          <article className={styles.inviteCard}>
            <div className={styles.inviteIntro}>
              <p className={styles.tidesCtaEyebrow}>TIDES IS COMING SOON</p>
              <h2>Bring the Discovery Journey to your center.</h2>
              <p>Tell us where you are, and we&apos;ll keep your center close as Tides expands across Chicagoland.</p>
            </div>
            <div className={styles.inviteAction}>
              <div className={styles.inviteForm}>
                <CheckArea demoHref="#calendar" page="tides:invite" label="Check Your Area" />
              </div>
              <p className={styles.inviteNote}>No child accounts and no screens. Just a live adventure built for the whole classroom.</p>
            </div>
          </article>

          <div className={styles.secondaryHeading}>
            <h3>Want to talk through the program?</h3>
            <p>Start with a conversation.</p>
          </div>
          <div className={styles.secondaryGrid}>
            <article className={styles.meetingCard}>
              <h4>Schedule a meeting</h4>
              <p>Choose a time to talk through Tides and what it could look like at your center.</p>
              <button type="button" className={styles.scheduleButton} onClick={() => schedulingDialogRef.current?.showModal()}>Choose a time <ArrowRight size={17} /></button>
            </article>
            <article className={styles.callCard}>
              <h4>Call us now</h4>
              <a href={site.phoneHref}>{site.phoneDisplay}</a>
              <p>You&apos;ll reach a real person who can answer questions about bringing Jawly to your classroom.</p>
            </article>
          </div>
        </div>
      </section>

      <dialog ref={schedulingDialogRef} className={styles.scheduleDialog} aria-labelledby="tides-schedule-dialog-title">
        <button type="button" className={styles.scheduleDialogClose} onClick={() => schedulingDialogRef.current?.close()} aria-label="Close scheduling">×</button>
        <h2 id="tides-schedule-dialog-title">Schedule a meeting</h2>
        <p>Online scheduling is coming soon. For now, call us and we&apos;ll find a time together.</p>
        <a href={site.phoneHref}>Call {site.phoneDisplay}</a>
      </dialog>
    </main>
  );
}
