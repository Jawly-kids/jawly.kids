import type { Metadata } from "next";
import Link from "next/link";
import { AudioWaveform, Heart, PersonStanding } from "lucide-react";
import { PreparedExperienceIcon, PrivateSystemIcon, TrustedPeopleIcon } from "@/components/illustrations/TrustPrincipleIcons";
import CheckArea from "@/components/availability/CheckArea";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: { absolute: "Jawly | Live character adventures for early learners" },
  description: "Live, captivating, screen-free character adventures for daycare and preschool classrooms.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Jawly | Live. Captivating. Screen-free.",
    description: "A six-part character-led adventure for daycare and preschool classrooms.",
    url: "/",
  },
};

export default function Home() {
  return (
    <main className={styles.home} data-homepage>
      <section className={styles.hero} aria-labelledby="home-title">
        <img
          className={styles.heroBackground}
          src="/homepage/classroom-hero3.png"
          alt="A bright, welcoming preschool classroom"
        />
        <div className={styles.heroAtmosphere} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Early learning enrichment</p>
          <h1 id="home-title"><span>Live.</span><span>Captivating.</span><span>Screen-free.</span></h1>
          <p className={styles.heroSubhead}>A six-part, character-led adventure where daycare and preschool children sing, dance, learn, and build social-emotional skills through play.</p>
          <div className={styles.heroActions}>
            <CheckArea className={styles.primaryHero} demoHref="#start" page="home-hero" label="Book a Free First Visit" />
            <a className={styles.secondaryHero} href="#programs">See How Jawly Works</a>
          </div>
        </div>
        <img
          className={styles.heroPerformers}
          src="/homepage/performer-trio.png"
          alt="Three Jawly performers in colorful character costumes"
        />
      </section>

      <section className={styles.grounding} aria-label="Jawly at a glance">
        <div className={styles.groundingLead}>
          <div><strong>Live &amp; in person</strong><span>A character comes right into your classroom.</span></div>
        </div>
        <div className={styles.groundingMiddle}>
          <div><strong>30 minutes</strong><span>Designed for ages 3 to 8</span></div>
          <span className={styles.factDivider} aria-hidden="true" />
          <div><strong>First visit free</strong><span>Start with Chapter One</span></div>
        </div>
        <div className={styles.availabilityPanel}>
          <span className={styles.availabilityLabel}>Expanding across Chicagoland</span>
          <strong>Are we serving your area?</strong>
          <CheckArea className={styles.availabilityButton} demoHref="#start" page="home-top" label="Check Your Area" />
        </div>
      </section>

      <section className={styles.adventures} id="programs" aria-labelledby="adventures-title">
        <div className={styles.adventuresIntro}>
          <p className={styles.eyebrowDark}>Explore the programs</p>
          <h2 id="adventures-title">Every program opens<br />a different world.</h2>
          <p>Each journey is deliberately crafted around its character, story, movement, and purpose.</p>
        </div>

        <article className={`${styles.adventureRow} ${styles.heroesRow} ${styles.rightCopyRow}`}>
          <div className={styles.adventureImage}><img src="/homepage/heroes_for_Jawly_HomePage.png" alt="Bravo and the Little Legends looking toward a new adventure" /></div>
          <div className={styles.adventureCopy}>
            <p className={styles.worldLabel}>Heroes</p>
            <h3 className={`${styles.programLogo} ${styles.bravoLogo}`}>
              <img src="/homepage/Find_Your_Bravo_By_Jawly.png" alt="Find Your Bravo: The Courage Within" />
            </h3>
            <p>A six-visit adventure where children join Bravo to face challenges, work together, move their bodies, and discover what courage can feel like in everyday life.</p>
            <Link href="/heroes">Explore Heroes</Link>
          </div>
        </article>

        <article className={`${styles.adventureRow} ${styles.cosmosRow}`}>
          <div className={styles.adventureImage}><img src="/homepage/Cosmos_for_Jawly_HomePage.png" alt="Orla and the Stardusters exploring deep space" /></div>
          <div className={styles.adventureCopy}>
            <p className={styles.worldLabel}>Cosmos</p>
            <h3 className={`${styles.programLogo} ${styles.stardustersLogo}`}>
              <img src="/homepage/Stardusters_by_Jawly.png" alt="Stardusters: Glow and Go" />
            </h3>
            <p>Children join Orla on a six-visit journey through space, moving, imagining, discovering, and bringing real science ideas back down to Earth.</p>
            <Link href="/cosmos">Explore Cosmos</Link>
          </div>
        </article>

        <Link href="/tides" className={`${styles.adventureRow} ${styles.tidesRow} ${styles.rightCopyRow}`}>
          <div className={styles.adventureImage}><img src="/homepage/Tides_for_Jawly_HomePage.png" alt="Mira and young explorers discovering a colorful ocean world" /></div>
          <div className={styles.adventureCopy}>
            <p className={styles.worldLabel}>Tides · Coming Soon</p>
            <h3 className={`${styles.programLogo} ${styles.minnowsLogo}`}>
              <img src="/homepage/Mighty_Minnows_by_Jawly.png" alt="Mighty Minnows: Tiny Fins. Kindness Wins." />
            </h3>
            <p>An ocean adventure is on the horizon. Children will move, imagine, and explore a vibrant underwater world alongside Mira.</p>
            <span className={styles.comingSoon}>Coming Soon</span>
          </div>
        </Link>
      </section>

      <section className={styles.liveSection} id="live" aria-labelledby="live-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrowDark}>See Jawly live</p>
          <h2 id="live-title">This is what screen-free attention looks like.</h2>
          <p>Children aren&apos;t watching the adventure. <strong>They&apos;re inside it</strong>, moving, responding, imagining, laughing, and learning alongside the character.</p>
        </div>
        <div className={styles.liveMontage}>
          <figure className={styles.liveMain}>
            <img src="/heroes/video-power.jpg" alt="Children joining Bravo in a live classroom adventure" />
            <figcaption><span className={styles.liveDot} /> Real character. Real room. Real participation.</figcaption>
          </figure>
          <div className={styles.liveSide}>
            <img src="/heroes/video-dance.jpg" alt="Children moving together during a Jawly visit" />
            <img src="/cosmos/IMG_4058.jpg" alt="A performer bringing a Jawly character to life" />
          </div>
        </div>
      </section>

      <section className={styles.proof} aria-labelledby="proof-title">
        <div className={styles.proofHeading}>
          <p className={styles.eyebrowDark}>Tested in real classrooms</p>
          <h2 id="proof-title">Children remember.<br />Educators notice.</h2>
        </div>
        <div className={styles.stats}>
          <div><strong>4.8<span>/5</span></strong><p>Average across 50+ teacher reviews</p></div>
          <div><strong>97<span>%</span></strong><p>said children remembered the character and curriculum week after week</p></div>
          <div><strong>96<span>%</span></strong><p>gave the end-of-session cool-down a perfect 5</p></div>
        </div>
        <blockquote>
          <p>This is <span className={styles.smallCaps}>THE</span> coolest thing I&apos;ve seen in 11 years of being here.</p>
          <cite>Amber P. · Center Director · KinderCare Learning Centers</cite>
        </blockquote>
        <div className={styles.serving} id="serving">
          <span>Currently serving families at</span>
          <div className={styles.customerLogos} aria-label="Jawly customers">
            <img src="/homepage/clients/kindercare-balanced.jpg" alt="KinderCare" />
            <img src="/homepage/clients/kids-r-kids-balanced.jpg" alt="Kids 'R' Kids Learning Academies" />
            <img src="/homepage/clients/kiddie-academy-balanced.jpg" alt="Kiddie Academy" />
          </div>
          <p>Now expanding to more early-learning centers across Chicago and the Northwest suburbs.</p>
        </div>
      </section>

      <section className={styles.meaning} aria-labelledby="meaning-title">
        <div className={styles.meaningIntro}>
          <p className={styles.eyebrowDark}>Why Jawly</p>
          <h2 id="meaning-title">A live show, a movement class, and a calm-down ritual. All in one.</h2>
          <p>Jawly combines beloved recurring characters, a real performer, and thoughtfully designed technology to draw children into singing, dancing, imagining, cooperating, learning, and finally slowing down together.</p>
          <Link href="/why-jawly">See Why Jawly Works <span aria-hidden="true">→</span></Link>
        </div>
        <div className={styles.meaningReasons}>
          <article><span className={styles.reasonMark} aria-hidden="true"><Heart /></span><div><h3>A character to care about</h3><span>Children remember Bravo and Orla, talk about them between visits, and anticipate their return.</span></div></article>
          <article><span className={styles.reasonMark} aria-hidden="true"><PersonStanding /></span><div><h3>A room to participate in</h3><span>Children move, sing, answer, pretend, cooperate, and help shape what happens next.</span></div></article>
          <article><span className={styles.reasonMark} aria-hidden="true"><AudioWaveform /></span><div><h3>A rhythm designed for learning</h3><span>The energy rises with purpose, then settles through reflection so the classroom is ready for what comes next.</span></div></article>
        </div>
        <div className={styles.energyArc} aria-label="Every Jawly visit moves through anticipation, movement, challenge, laughter, listening, and calm">
          <div><p>Every visit has a rhythm</p><span>A deliberate arc from arrival to reset.</span></div>
          <ol><li>Anticipation</li><li>Movement</li><li>Challenge</li><li>Laughter</li><li>Listening</li><li>Calm</li></ol>
          <p className={styles.arcPromise}>Then we hand your classroom back calm, grounded, and ready for what comes next.</p>
        </div>
      </section>

      <section className={styles.reassurance} aria-labelledby="easy-title">
        <div className={styles.easyCopy}>
          <p className={styles.eyebrowLight}>Designed for real classrooms</p>
          <h2 id="easy-title">You bring the room.<br />We bring the adventure.</h2>
          <p>Jawly arrives ready to go with the character, trained performer, story, music, activities, and materials. There&apos;s no lesson for your team to prepare, and your classroom staff remain part of the room throughout the visit.</p>
        </div>
        <div className={styles.trustCard}>
          <div className={styles.trustIntro}>
            <p className={styles.eyebrowDark}>Trust &amp; Safety</p>
            <h3>Carefully designed for the people and places that trust us.</h3>
            <p>Jawly pairs thoughtful technology with trained people and clear boundaries around children’s information.</p>
            <Link href="/trust-safety">Our approach to Trust &amp; Safety</Link>
          </div>
          <div className={styles.trustPrinciples}>
            <article><TrustedPeopleIcon className={styles.trustIcon}/><div><h4>Trusted people</h4><p>Background-checked performers are trained for the responsibility of entering an early-learning classroom.</p></div></article>
            <article><PrivateSystemIcon className={styles.trustIcon}/><div><h4>Private by design</h4><p>No child accounts, recognition, stored child memory, or advertising profiles.</p></div></article>
            <article><PreparedExperienceIcon className={styles.trustIcon}/><div><h4>Prepared before arrival</h4><p>Stories, prompts, songs, and responses are authored in advance, then delivered with human warmth.</p></div></article>
          </div>
        </div>
      </section>

      <section className={styles.finalCta} id="start" aria-labelledby="start-title">
        <div className={styles.finalCtaInner}>
          <div>
            <p className={styles.eyebrowLight}>A complete first chapter</p>
            <h2 id="start-title">Start with a <em>free visit.</em></h2>
            <p>Bring Jawly into your classroom for one live, 30-minute Chapter One experience. Your class gets the real adventure, and you decide whether to continue.</p>
          </div>
          <div className={styles.finalAction}>
            <p>See if Jawly is available at your center.</p>
            <CheckArea className={styles.finalButton} demoHref="/heroes#calendar" page="home-final" label="Check Availability" />
            <span>ZIP check · service confirmation · choose a time</span>
            <a className={styles.questionLink} href="/heroes#calendar">Have questions? Talk with us</a>
          </div>
        </div>
      </section>

      <section className={styles.join} aria-labelledby="join-title">
        <div className={styles.joinCopy}>
          <p className={styles.eyebrowDark}>We&apos;re hiring</p>
          <h2 id="join-title">Do work that makes the whole room light up.</h2>
          <p>Join a warm, creative crew bringing movement, imagination, and meaningful play into children&apos;s classrooms.</p>
          <a href="tel:+18887752959">Talk to the Jawly team <span aria-hidden="true">→</span></a>
        </div>
        <img src="/homepage/join-jawly.png" alt="Three members of the Jawly crew holding character performance masks" />
      </section>
    </main>
  );
}
