import Link from "next/link";
import { PreparedExperienceIcon, PrivateSystemIcon, TrustedPeopleIcon } from "@/components/illustrations/TrustPrincipleIcons";
import styles from "./marketing.module.css";

export default function ClassroomTrust() {
  return (
    <section className={styles.reassurance} aria-labelledby="classroom-trust-title">
      <div className={styles.easyCopy}>
        <p className={styles.neutralEyebrow}>Designed for real classrooms</p>
        <h2 id="classroom-trust-title">You bring the room.<br />We bring the adventure.</h2>
        <p>Jawly arrives ready to go with the character, trained performer, story, music, activities, and materials. There&apos;s no lesson for your team to prepare, and your classroom staff remain part of the room throughout the visit.</p>
      </div>
      <div className={styles.trustCard}>
        <div className={styles.trustIntro}>
          <p className={styles.redEyebrow}>Trust &amp; Safety</p>
          <h3>Carefully designed for the people and places that trust us.</h3>
          <p>Jawly pairs thoughtful technology with trained people and clear boundaries around children&apos;s information.</p>
          <Link className={styles.textCta} href="/trust-safety">Our approach to Trust &amp; Safety <span aria-hidden="true">→</span></Link>
        </div>
        <div className={styles.trustPrinciples}>
          <article><TrustedPeopleIcon className={styles.trustIcon}/><div><h4>Trusted people</h4><p>Background-checked performers are trained for the responsibility of entering an early-learning classroom.</p></div></article>
          <article><PrivateSystemIcon className={styles.trustIcon}/><div><h4>Private by design</h4><p>No child accounts, recognition, stored child memory, or advertising profiles.</p></div></article>
          <article><PreparedExperienceIcon className={styles.trustIcon}/><div><h4>Prepared before arrival</h4><p>Stories, prompts, songs, and responses are authored in advance, then delivered with human warmth.</p></div></article>
        </div>
      </div>
    </section>
  );
}
