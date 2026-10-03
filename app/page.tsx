import type { Metadata } from "next";
import Link from "next/link";
import { AudioWaveform, Heart, PersonStanding } from "lucide-react";
import ClassroomTrust from "@/components/marketing/ClassroomTrust";
import ExperienceStrip from "@/components/marketing/ExperienceStrip";
import GalleryPlaceholder from "@/components/marketing/GalleryPlaceholder";
import LeadCaptureCta from "@/components/marketing/LeadCaptureCta";
import ProofSection from "@/components/marketing/ProofSection";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: { absolute: "Jawly | Live character adventures for early learners" },
  description: "Live, captivating, screen-free character adventures for daycare and preschool classrooms.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Jawly | Live. Captivating. Screen-free.",
    description: "Character-led adventures for daycare and preschool children to sing, dance, learn, and build social-emotional skills through play.",
    url: "/",
    images: [{
      url: "/homepage/performer-trio.png",
      width: 1803,
      height: 1161,
      alt: "Three Jawly performers bringing live characters to early-learning classrooms",
    }],
  },
  twitter: { card: "summary_large_image", images: ["/homepage/performer-trio.png"] },
};

export default function Home() {
  return (
    <main className={styles.home} data-homepage>
      <div className={styles.heroStage}>
        <img
          className={styles.heroBackground}
          src="/homepage/classroom-hero3.png"
          alt="A bright, welcoming preschool classroom"
        />
        <div className={styles.heroAtmosphere} aria-hidden="true" />
        <section className={styles.hero} aria-labelledby="home-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Early learning enrichment</p>
            <h1 id="home-title"><span>Live.</span><span>Captivating.</span><span>Screen-free.</span></h1>
            <p className={styles.heroSubhead}>Character-led adventures for daycare and preschool children to sing, dance, learn, and build social-emotional skills through play.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryHero} href="#contact">Book a Free First Visit</a>
              <a className={styles.secondaryHero} href="#programs">See How Jawly Works</a>
            </div>
          </div>
          <img
            className={styles.heroPerformers}
            src="/homepage/performer-trio.png"
            alt="Three Jawly performers in colorful character costumes"
          />
        </section>

        <ExperienceStrip demoHref="#contact" page="home-top" />
      </div>

      <section className={styles.adventures} id="programs" aria-labelledby="adventures-title">
        <div className={styles.adventuresIntro}>
          <p className={styles.eyebrowDark}>Explore the programs</p>
          <h2 id="adventures-title">Every program opens<br />a different world.</h2>
          <p>Each journey is deliberately crafted around its character, story, movement, and purpose.</p>
        </div>

        <Link href="/heroes" className={`${styles.adventureRow} ${styles.heroesRow} ${styles.rightCopyRow}`}>
          <div className={styles.adventureImage}><img src="/homepage/heroes_for_Jawly_HomePage.png" alt="Bravo and the Little Legends looking toward a new adventure" /></div>
          <div className={styles.adventureCopy}>
            <p className={styles.worldLabel}>Heroes</p>
            <h3 className={`${styles.programLogo} ${styles.bravoLogo}`}>
              <img src="/homepage/Find_Your_Bravo_By_Jawly.png" alt="Find Your Bravo: The Courage Within" />
            </h3>
            <p>A six-visit adventure where children join Bravo to face challenges, work together, move their bodies, and discover what courage can feel like in everyday life.</p>
            <span className={styles.textCta}>Explore Heroes <span aria-hidden="true">→</span></span>
          </div>
        </Link>

        <Link href="/cosmos" className={`${styles.adventureRow} ${styles.cosmosRow}`}>
          <div className={styles.adventureImage}><img src="/homepage/Cosmos_for_Jawly_HomePage.png" alt="Orla and the Stardusters exploring deep space" /></div>
          <div className={styles.adventureCopy}>
            <p className={styles.worldLabel}>Cosmos</p>
            <h3 className={`${styles.programLogo} ${styles.stardustersLogo}`}>
              <img src="/homepage/Stardusters_by_Jawly.png" alt="Stardusters: Glow and Go" />
            </h3>
            <p>Children join Orla on a six-visit journey through space, moving, imagining, discovering, and bringing real science ideas back down to Earth.</p>
            <span className={styles.textCta}>Explore Cosmos <span aria-hidden="true">→</span></span>
          </div>
        </Link>

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
          <h2 id="live-title">Classrooms become worlds of wonder.</h2>
          <p>Children aren&apos;t watching the adventure. <strong>They&apos;re inside it</strong>, moving, responding, imagining, laughing, and learning alongside the character.</p>
        </div>
        <GalleryPlaceholder />
      </section>

      <ProofSection />

      <section className={styles.meaning} aria-labelledby="meaning-title">
        <div className={styles.meaningIntro}>
          <p className={styles.eyebrowDark}>Why Jawly</p>
          <h2 id="meaning-title">A live show, a movement class, and a calm-down ritual. All in one.</h2>
          <p>Jawly combines beloved recurring characters, a real performer, and thoughtfully designed technology to draw children into singing, dancing, imagining, cooperating, learning, and finally slowing down together.</p>
          <Link className={styles.textCta} href="/why-jawly">See Why Jawly Works <span aria-hidden="true">→</span></Link>
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

      <ClassroomTrust />

      <section className={styles.join} aria-labelledby="join-title">
        <div className={styles.joinCopy}>
          <p className={styles.eyebrowDark}>We&apos;re hiring</p>
          <h2 id="join-title">Do work that makes the room light up.</h2>
          <p>Join a warm, creative crew bringing movement, imagination, and meaningful play into children&apos;s classrooms.</p>
          <a className={styles.textCta} href="#contact">Talk to the Jawly team <span aria-hidden="true">→</span></a>
        </div>
        <img src="/homepage/join-jawly.png" alt="Three members of the Jawly crew holding character performance masks" />
      </section>

      <LeadCaptureCta theme="home" page="home-final" />
    </main>
  );
}
