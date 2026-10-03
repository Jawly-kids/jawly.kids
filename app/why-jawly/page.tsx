import type { Metadata } from "next";
import Link from "next/link";
import { Activity, Brain, Heart, MessageCircle, Palette, Shapes } from "lucide-react";
import styles from "./why-jawly.module.css";

export const metadata: Metadata = {
  title: "Why Jawly",
  description: "Why Jawly brings live performance, movement, whole-child learning, and self-regulation together in one classroom adventure.",
  alternates: { canonical: "/why-jawly" },
};

const reasons = [
  { number: "01", label: "LIVE SHOW", title: "Attention becomes connection.", body: "A recurring character, original music, and a continuing story give children someone to care about and a world they want to reenter. They remember what happened, anticipate what comes next, and arrive ready to participate—not simply watch.", takeaway: "Imagination opens the door to attention, memory, and belonging.", image: "/why-jawly/live-show.png" },
  { number: "02", label: "MOVEMENT CLASS", title: "Learning moves through the body.", body: "Children dance, balance, stretch, act, sing, and solve physical challenges together. Movement is not a break from the lesson. It gives new language, ideas, and feelings something children can see, do, and remember.", takeaway: "The whole body becomes part of how the child understands.", image: "/why-jawly/movement-class.png" },
  { number: "03", label: "LEARNING ADVENTURE", title: "The mission gives every skill a reason.", body: "Children recall, sequence, plan, persist, cooperate, name feelings, use new words, and imagine possibilities because the story needs them to. Knowledge and developmental skills become part of accomplishing something meaningful together.", takeaway: "Learning is woven into the adventure instead of interrupting it.", image: "/why-jawly/learning-adventure.png" },
  { number: "04", label: "GUIDED RESET", title: "Big energy learns how to settle.", body: "Every visit changes pace with purpose. Children breathe, notice how they feel, reflect on what happened, and bring their bodies back toward calm before Jawly leaves the room.", takeaway: "Self-regulation is practiced as part of the experience—not saved for after it.", image: "/why-jawly/guided-reset.png" },
] as const;

const learningAreas = [
  ["Body", "Balance, coordination, strength, and controlled movement", Activity],
  ["Language", "New words, call-and-response, recall, and retelling", MessageCircle],
  ["Executive function", "Planning, persistence, flexible thinking, and follow-through", Brain],
  ["Social-emotional", "Feeling words, empathy, cooperation, and regulation", Heart],
  ["Cognitive", "Sequencing, cause and effect, counting, sorting, and knowledge", Shapes],
  ["Creative", "Pretend play, music, storytelling, and imagination", Palette],
] as const;

const journey = [
  ["Meet", "The character arrives, the crew forms, and the mission begins."],
  ["Explore", "One big idea is discovered through story, language, and movement."],
  ["Expand", "A new challenge brings earlier ideas back in a different way."],
  ["Face the challenge", "Something goes wrong, and the group plans, persists, and adapts."],
  ["Use every skill", "Children recall and apply what the journey has taught them."],
  ["Celebrate", "The class retells what it accomplished and carries the identity forward."],
] as const;

export default function WhyJawlyPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.overline}>WHY JAWLY</p>
          <h1>Built for what childhood needs now.</h1>
          <p className={styles.dek}>Children are growing up surrounded by screens, fragmented attention, and increasingly automated experiences. Jawly uses technology differently—to create a live, physical world where children look up, move together, use their imaginations, and connect with the people around them.</p>
          <a href="#reasons" className={styles.start}>Explore why it matters <span aria-hidden="true">↓</span></a>
        </div>
        <div className={styles.heroImage}>
          <img src="/homepage/performer-trio.png" alt="Bravo, Orla, and Mira, Jawly’s live classroom characters" />
        </div>
      </header>

      <section className={styles.reasons} id="reasons" aria-label="Four reasons Jawly matters">
        {reasons.map((reason) => (
          <article className={styles.reason} key={reason.number}>
            <div className={styles.reasonLead}><span>{reason.number}</span><p>{reason.label}</p></div>
            <div className={styles.reasonBody}>
              <h2>{reason.title}</h2>
              <p>{reason.body}</p>
              <strong>{reason.takeaway}</strong>
            </div>
            <img className={styles.reasonImage} src={reason.image} alt="" aria-hidden="true" />
          </article>
        ))}
      </section>

      <section className={styles.technology} aria-labelledby="technology-title">
        <div className={styles.technologyCopy}>
          <p className={styles.overline}>TECHNOLOGY WITH A BOUNDARY</p>
          <h2 id="technology-title">Technology should deepen human connection—not replace it.</h2>
          <p>Jawly uses AI in intentionally limited ways behind the scenes. The classroom experience is authored before arrival and led by a trained performer. It is not an open-ended AI conversation with children, and it does not identify children, remember individual participation, or build profiles from what happens in the room.</p>
          <Link href="/trust-safety">See our technology and privacy boundaries <span aria-hidden="true">→</span></Link>
        </div>
        <div className={styles.boundaryGraphic} aria-label="Authored experience delivered by a trained human in a live classroom">
          <div><span>01</span><strong>Authored experience</strong><small>Designed before arrival</small></div>
          <i aria-hidden="true" />
          <div><span>02</span><strong>Trained human</strong><small>Present in the room</small></div>
          <i aria-hidden="true" />
          <div><span>03</span><strong>Live classroom</strong><small>No child profiles or stored memory</small></div>
        </div>
      </section>

      <section className={styles.learning} aria-labelledby="learning-title">
        <div className={styles.sectionHeading}>
          <p className={styles.overline}>THE WHOLE CHILD JOINS IN</p>
          <h2 id="learning-title">Learning has more than one dimension.</h2>
          <p>Each adventure has its own purpose and personality. Across them, children practice a broad mix of skills through the actions, choices, language, and relationships inside the story.</p>
        </div>
        <div className={styles.learningGrid}>
          {learningAreas.map(([title, body, Icon]) => <article key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className={styles.continuity} aria-labelledby="continuity-title">
        <div className={styles.sectionHeading}>
          <p className={styles.overline}>WHY THE RETURN MATTERS</p>
          <h2 id="continuity-title">One visit can delight. A continuing journey can build momentum.</h2>
          <p>The character returns, the class remembers, and each new chapter asks children to carry something forward. The story grows with them until the whole journey belongs to the group.</p>
        </div>
        <ol className={styles.journey} aria-label="The six-visit story journey">
          {journey.map(([step, detail], index) => (
            <li key={step}>
              <span>{index + 1}</span>
              {index < journey.length - 1 ? (
                <svg className={styles.journeyConnector} viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 16 C26 2 72 30 100 16" vectorEffect="non-scaling-stroke" />
                </svg>
              ) : null}
              <strong>{step}</strong>
              <p>{detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <aside className={styles.evidence} id="evidence">
        <div><p className={styles.overline}>THE THINKING BENEATH THE MAGIC</p><h2>Grounded, not overclaimed.</h2></div>
        <div>
          <p>Jawly draws on established child-development principles: playful social interaction, active participation, and relationships that make learning meaningful. Published research informs the design; our statements about what children say and anticipate come from Jawly classroom observations.</p>
          <blockquote>“Several children now bring him up on their own between visits. He has become someone they think about.”<cite>Teacher · Kids R Kids</cite></blockquote>
          <ul>
            <li><a href="https://developingchild.harvard.edu/resources/handouts-tools/brainbuildingthroughplay/">Harvard Center on the Developing Child: brain-building through play ↗</a></li>
            <li><a href="https://publications.aap.org/pediatrics/article/138/5/e20162591/60503/Media-and-Young-Minds">American Academy of Pediatrics: media and young minds ↗</a></li>
            <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7818392/">Child Development: young children, characters, and learning ↗</a></li>
          </ul>
        </div>
      </aside>

      <footer className={styles.cta}>
        <p className={styles.overline}>SEE IT IN THE ROOM</p>
        <h2>The best way to understand Jawly is to feel the room change.</h2>
        <p>Start with Chapter One. Your first Jawly visit is free.</p>
        <Link href="/contact">Bring Jawly to your classroom <span aria-hidden="true">→</span></Link>
      </footer>
    </main>
  );
}
