import type { Metadata } from "next";
import Link from "next/link";
import styles from "./why-jawly.module.css";

export const metadata: Metadata = {
  title: "Why Jawly",
  description: "Nine reasons live, character-led enrichment feels different in an early-learning classroom.",
  alternates: { canonical: "/why-jawly" },
};

const reasons = [
  {
    id: "physical-world",
    eyebrow: "LIVE, PHYSICAL-WORLD ATTENTION",
    title: "Jawly earns attention in the room—not from a screen.",
    body: "The character walks through the classroom door, talks, sings, and reacts with the children in real time. The story is suddenly here—at child height, in shared space. Screen-free matters because it makes room for something richer: eye contact, movement, imagination, and a room responding together.",
    photo: "IMAGE INTENT · The instant a character enters and every child turns toward the same live moment. Show faces, eye lines, and shared attention—not a posed group photo.",
  },
  {
    id: "characters",
    eyebrow: "CHARACTERS CHILDREN REMEMBER",
    title: "Children remember the character—and arrive ready for the next chapter.",
    body: "Bravo, Orla, and Mira do not start from zero every week. The children know who is coming back, remember what happened together, and anticipate where the story will go next. That relationship turns a series of activities into one continuing adventure.",
    quote: "97% of teachers said children remembered the character and the curriculum week after week.",
    quoteSource: "Jawly teacher reviews · 50 responses",
    photo: "IMAGE INTENT · Recognition at the start of a return visit: children pointing, calling out, or moving toward a character they already know.",
  },
  {
    id: "human",
    eyebrow: "LIVE MEANS HUMAN",
    title: "A live performer makes every child part of the moment.",
    body: "A trained Jawly performer brings the character’s mouth and voice to life by hand, then reads the room as it unfolds. They can notice a hesitant child, celebrate an unexpected answer, wait for the laugh, and help the group find its way back. The story is authored; the connection is live.",
    photo: "IMAGE INTENT · A responsive exchange at child height—character and one or two children visibly reacting to each other, with the wider group included in the moment.",
  },
  {
    id: "consistency",
    eyebrow: "ONE STORY ENGINE, BROUGHT TO LIFE",
    title: "Every visit is carefully authored—then brought to life in real time.",
    body: "The story beats, songs, prompts, learning goals, and emotional pacing are designed before the character enters the room. The performer supplies timing, warmth, and responsiveness. Children get a consistent, purposeful experience that still feels personal to their class.",
    equation: ["Crafted experience", "+", "Human performance"],
  },
  {
    id: "participation",
    eyebrow: "THE STORY MOVES THROUGH THE BODY",
    title: "Children do not watch the adventure. They move it forward.",
    body: "They move, sing, answer, pretend, help, and cooperate. A planet becomes a stomp, courage becomes a breath and a pose, and an ocean current becomes a push and pull the whole group can feel. Participation is not a break from the story. It is how the story works.",
    verbs: ["Move", "Sing", "Answer", "Pretend", "Help", "Cooperate"],
    photo: "IMAGE INTENT · A full-body group action with a clear story purpose—children freezing, balancing, reaching, or moving together rather than generic dancing.",
  },
  {
    id: "story-arc",
    eyebrow: "SIX VISITS, ONE JOURNEY",
    title: "Each chapter recalls the last—so memory becomes momentum.",
    body: "The world opens, children take a first deep dive, the mission expands, and then something goes wrong. They meet the big challenge, apply everything they have learned, and complete the journey together. Every opening calls back what came before; every ending gives them a reason to return.",
    steps: ["Meet", "Explore", "Expand", "Face the challenge", "Use every skill", "Celebrate"],
  },
  {
    id: "rhythm",
    eyebrow: "ONE SESSION, A DELIBERATE ENERGY ARC",
    title: "Every visit builds to a high—then winds children down calm.",
    body: "The room moves from anticipation into action, listening, challenge, and laughter. Then the pace changes on purpose. Breath slows, bodies settle, and children reflect before returning to class. Jawly does not hand teachers a room that is still at full volume.",
    quote: "96% of teachers gave the end-of-session cool-down a perfect 5.",
    quoteSource: "Jawly teacher reviews · 50 responses",
    steps: ["Anticipate", "Move", "Listen", "Take on the challenge", "Laugh", "Wind down", "Reflect"],
    photo: "IMAGE INTENT · The contrast at the end of a visit: children seated or lying calmly, breathing or reflecting with the character. The image should visibly communicate ‘calm, not wired.’",
  },
  {
    id: "learning",
    eyebrow: "ONE LEARNING SPINE, THREE JOURNEYS",
    title: "Children learn because the lesson is inside the adventure.",
    body: "Body, language, executive function, social-emotional learning, cognition, and creativity develop through what children must do to complete the mission. They recall, sequence, plan, persist, take turns, name feelings, and move as one group—without the experience stopping to announce a lesson.",
    photo: "IMAGE INTENT · A learning moment disguised as play: children sequencing mission steps, responding to a prompt, or solving something together with the character.",
  },
  {
    id: "belonging",
    eyebrow: "AN IDENTITY THAT STICKS",
    title: "The adventure ends with a name children carry home.",
    body: "They are not merely the class that watched Bravo, Orla, or Mira. They become Little Legends, Stardusters, or Mighty Minnows. The final visit retells what they accomplished, celebrates the crew, and leaves children with an identity rooted in courage, curiosity, or discovery.",
    photo: "IMAGE INTENT · Graduation or goodbye moment showing earned belonging—keepsakes, a crew gesture, hugs, or children proudly repeating their group identity.",
  },
] as const;

export default function WhyJawlyPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.overline}>WHY JAWLY</p>
        <h1>What makes a Jawly room feel different?</h1>
        <p className={styles.dek}>Nine reasons a live character, a continuing story, and a thoughtfully paced room create an experience children remember.</p>
        <a href="#physical-world" className={styles.start}>Start with the first reason <span aria-hidden="true">↓</span></a>
      </header>

      <div className={styles.article}>
        {reasons.map((reason, index) => (
          <article className={styles.reason} id={reason.id} key={reason.id}>
            <div className={styles.number}>{String(index + 1).padStart(2, "0")}</div>
            <div className={styles.reasonBody}>
              <p className={styles.eyebrow}>{reason.eyebrow}</p>
              <h2>{reason.title}</h2>
              <p className={styles.body}>{reason.body}</p>

              {"quote" in reason ? <blockquote>{reason.quote}<cite>{"quoteSource" in reason ? reason.quoteSource : "Jawly classroom observation"}</cite></blockquote> : null}
              {"verbs" in reason ? <ul className={styles.verbs}>{reason.verbs.map((verb) => <li key={verb}>{verb}</li>)}</ul> : null}
              {"equation" in reason ? <div className={styles.equation} aria-label="Crafted experience plus human performance">{reason.equation.map((item) => <span key={item}>{item}</span>)}</div> : null}
              {"steps" in reason ? <ol className={styles.steps}>{reason.steps.map((step, stepIndex) => <li key={step}><span>{stepIndex + 1}</span>{step}</li>)}</ol> : null}
              {"photo" in reason ? <figure className={styles.photoPlaceholder}><div aria-hidden="true"><strong>IMAGE PLACEHOLDER</strong><span>{reason.photo.replace("IMAGE INTENT · ", "")}</span></div><figcaption>{reason.photo}</figcaption></figure> : null}
            </div>
          </article>
        ))}
      </div>

      <aside className={styles.evidence} id="evidence">
        <div><p className={styles.overline}>THE THINKING BENEATH THE MAGIC</p><h2>Grounded, not overclaimed.</h2></div>
        <div>
          <p>Jawly draws on established child-development principles: playful social interaction, active participation, and relationships that make learning meaningful. Published research informs the design; our statements about what children say and anticipate come from Jawly classroom observations.</p>
          <ul>
            <li><a href="https://developingchild.harvard.edu/resources/handouts-tools/brainbuildingthroughplay/">Harvard Center on the Developing Child: brain-building through play ↗</a></li>
            <li><a href="https://publications.aap.org/pediatrics/article/138/5/e20162591/60503/Media-and-Young-Minds">American Academy of Pediatrics: media and young minds ↗</a></li>
            <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7818392/">Child Development: young children, characters, and learning ↗</a></li>
          </ul>
        </div>
      </aside>

      <footer className={styles.cta}>
        <p className={styles.overline}>SEE IT IN THE ROOM</p>
        <h2>Start with Chapter One.</h2>
        <p>Your first Jawly visit is free.</p>
        <Link href="/heroes#calendar">Bring Jawly to your classroom <span aria-hidden="true">→</span></Link>
      </footer>
    </main>
  );
}
