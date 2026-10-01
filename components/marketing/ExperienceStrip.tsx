import CheckArea from "@/components/availability/CheckArea";
import styles from "./marketing.module.css";

type ExperienceStripProps = {
  context?: "home" | "program";
  character?: string;
  program?: string;
  demoHref: string;
  page: string;
};

export default function ExperienceStrip({
  context = "home",
  character = "A character",
  program,
  demoHref,
  page,
}: ExperienceStripProps) {
  const programContext = context === "program" && program;

  return (
    <section className={`${styles.experienceSection} ${programContext ? styles.experienceProgram : ""}`} aria-label={programContext ? `${program} program basics` : "Jawly at a glance"}>
      <div className={styles.experienceStrip}>
        <div className={styles.experienceLead}>
          <strong>Live &amp; in person</strong>
          <span>{character} comes right into your classroom.</span>
        </div>
        <div className={styles.experienceFacts}>
          <div><strong>30 minutes</strong><span>Designed for ages 3 to 8</span></div>
          <i aria-hidden="true" />
          <div><strong>First visit free</strong><span>Start with {programContext ? `${program} Chapter One` : "Chapter One"}</span></div>
        </div>
        <div className={styles.experienceAvailability}>
          <small>{programContext ? "Serving Chicagoland" : "Expanding across Chicagoland"}</small>
          <strong>{programContext ? `Can we bring ${program} to you?` : "Are we serving your area?"}</strong>
          <CheckArea className={styles.experienceButton} demoHref={demoHref} page={page} label="Check Your Area" />
        </div>
      </div>
    </section>
  );
}
