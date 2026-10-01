import type { Metadata } from "next";
import Link from "next/link";
import styles from "./trust-safety.module.css";

export const metadata: Metadata = {
  title: "Trust, Safety & Privacy",
  description: "How Jawly protects children through privacy by design, trained performers, and clear classroom boundaries.",
  alternates: { canonical: "/trust-safety" },
};

const neverCollected = [
  ["No built-in recording", "The Jawly character system does not automatically record or store classroom audio, video, or photographs."],
  ["School documentation stays with the school", "Photos or videos taken by center staff for families remain part of the center’s own operations and policies, separate from the Jawly system."],
  ["No child profiles", "Children do not create accounts, log in, or receive persistent digital identities."],
  ["No recognition", "Jawly does not use facial recognition, voice recognition, or biometric identification."],
  ["No stored child memory", "The system does not retain a child’s name, behavior, answers, or participation after the visit."],
  ["No advertising data", "Children’s classroom activity is never used to target ads, build audiences, or create data products."],
] as const;

const safetyPractices = [
  ["Background-checked", "Every Jawly performer completes a background check before entering a center."],
  ["Trained for the room", "Performers are trained on the facilitation playbook and coached on child-safe interaction."],
  ["Designed before arrival", "The character’s story, prompts, songs, and responses are authored in advance. They are not improvised by an open-ended AI system."],
  ["The center stays in control", "Jawly works within the center’s environment, schedule, classroom expectations, and direction."],
] as const;

export default function TrustSafetyPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.overline}>TRUST, SAFETY &amp; PRIVACY</p>
        <h1>Jawly is not, and will never be, <span>in the business of children’s data.</span></h1>
        <p className={styles.dek}>Jawly exists to create meaningful experiences with children, not valuable information about them. Our technology is designed around that distinction.</p>
        <div className={styles.heroPromise}>
          <strong>Attentive by design. Private by principle.</strong>
          <span>A trained performer responds to the children in front of them. The Jawly system does not automatically record the room or retain information about individual children.</span>
        </div>
      </header>

      <section className={styles.principle} id="privacy">
        <p className={styles.number}>01</p>
        <div>
          <p className={styles.overline}>PRESENT, NOT PROFILING</p>
          <h2>Children are known by the people in the room, not by a system building a record.</h2>
          <p className={styles.body}>Jawly is pre-designed and pre-authored, then brought to life by a person who can read the room and respond to what is happening. The warmth is human. The experience does not need to identify children, store their answers, build behavior histories, or remember individual participation after the visit.</p>
        </div>
      </section>

      <section className={styles.neverSection} aria-labelledby="never-heading">
        <div className={styles.sectionIntro}>
          <p className={styles.overline}>OUR DATA BOUNDARY</p>
          <h2 id="never-heading">The experience works without collecting information about individual children.</h2>
        </div>
        <div className={styles.boundaryList}>
          {neverCollected.map(([title, detail], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.documentation} id="documentation">
        <div>
          <p className={styles.number}>02</p>
          <p className={styles.overline}>CLASSROOM MEMORIES, HANDLED WITH CARE</p>
          <h2>Schools and Jawly document different things for different purposes.</h2>
        </div>
        <div>
          <p className={styles.body}>Early-learning staff commonly photograph or film classroom activities so they can privately show families what their children did that day. Those images are created and shared by the center under its own policies. Jawly does not direct that routine documentation or control how the center communicates with its families.</p>
          <p className={styles.body}>Separately, Jawly sometimes uses an external camera, often an iPhone, to document real sessions for galleries, demonstrations, and other company materials. That is a distinct, planned media activity. It is not automatic recording by the character system, and it is coordinated with the center in advance.</p>
          <p className={styles.body}>Before Jawly-recorded classroom footage appears publicly in a gallery, we use AI to alter children’s faces to protect their identities, and we disclose that treatment wherever the footage appears.</p>
          <div className={styles.honestyNote}>
            <strong>How we protect public classroom footage</strong>
            <p>Face alteration helps protect a child’s public identity. The original recording is still treated as sensitive media, and media capture remains separate from the operation of the classroom experience.</p>
          </div>
        </div>
      </section>

      <section className={styles.personal} id="personal">
        <div>
          <p className={styles.number}>03</p>
          <p className={styles.overline}>PERSONALIZATION WITH A BOUNDARY</p>
          <h2>Jawly personalizes the adventure for the classroom, not the child for a database.</h2>
        </div>
        <div>
          <p className={styles.body}>Jawly can be planned around a center, an age group, a schedule, and the adventure a class is taking. That is different from personalizing around individual children’s identities or data.</p>
          <div className={styles.comparison}>
            <div><strong>Jawly may need</strong><span>Center contact</span><span>Visit schedule</span><span>Age group</span><span>Class size</span><span>Selected adventure</span></div>
            <div><strong>The experience does not need</strong><span>Children’s names</span><span>Faces or voices</span><span>Individual accounts</span><span>Behavior histories</span><span>Advertising identifiers</span></div>
          </div>
        </div>
      </section>

      <section className={styles.humanSafety} id="people">
        <div className={styles.sectionIntro}>
          <p className={styles.overline}>TRUST IN THE ROOM</p>
          <h2>Safety begins with the people we invite into the classroom.</h2>
          <p>Privacy is one part of trust. Jawly also prepares the human being behind each character for the responsibility of entering an early-learning environment.</p>
        </div>
        <div className={styles.practiceList}>
          {safetyPractices.map(([title, detail]) => <article key={title}><h3>{title}</h3><p>{detail}</p></article>)}
        </div>
      </section>

      <section className={styles.law} id="standards">
        <div>
          <p className={styles.number}>04</p>
          <p className={styles.overline}>BEYOND COMPLIANCE</p>
          <h2>Our standard begins where the legal minimum ends.</h2>
        </div>
        <div>
          <p className={styles.body}>COPPA establishes protections when covered websites and online services collect personal information from children under 13. Jawly’s classroom principle is simpler: do not build the live experience around collecting children’s personal information at all.</p>
          <p className={styles.body}>We believe a children’s program should be able to explain its boundaries in plain language. If our technology or practices change, those boundaries must be reconsidered before the experience reaches a classroom, not after.</p>
          <a href="https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions">Read the FTC’s COPPA guidance ↗</a>
          <br />
          <Link href="/privacy">Read Jawly’s full Privacy Statement</Link>
        </div>
      </section>

      <section className={styles.pledge}>
        <p className={styles.overline}>THE JAWLY PRIVACY PLEDGE</p>
        <blockquote>A classroom should be a place where children are free to move, speak, imagine, make mistakes, and simply be children.</blockquote>
        <p>Their curiosity belongs to them. We will never turn it into a data product.</p>
      </section>

      <section className={styles.questions}>
        <div><p className={styles.overline}>QUESTIONS ARE WELCOME</p><h2>Trust should be easy to understand.</h2></div>
        <div><p>Directors and families deserve specific answers about how Jawly works, what its equipment can do, and how separately recorded media is handled.</p><a href="mailto:privacy@jawly.kids">Ask us about safety or privacy <span aria-hidden="true">→</span></a><Link href="/contact">See how a visit works</Link></div>
      </section>
    </main>
  );
}
