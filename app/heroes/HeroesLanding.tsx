"use client";

import { useEffect, useRef, useState } from "react";
import {
  Activity,
  Brain,
  Heart,
  MessageCircle,
  Move,
  Music2,
  Palette,
  Shapes,
  Wind,
  Zap,
} from "lucide-react";
import ClassroomTrust from "@/components/marketing/ClassroomTrust";
import ExperienceStrip from "@/components/marketing/ExperienceStrip";
import GalleryPlaceholder from "@/components/marketing/GalleryPlaceholder";
import LeadCaptureCta from "@/components/marketing/LeadCaptureCta";
import OtherPrograms from "@/components/marketing/OtherPrograms";
import ProofSection from "@/components/marketing/ProofSection";
import BravoMaskSequence from "./BravoMaskSequence";
import styles from "./heroes.module.css";

const stages = [
  {
    eyebrow: "THE CHARACTER",
    title: "Meet Bravo—a hero who helps children find the courage within.",
    body:
      "Bravo is powered by Jawly, an education technology platform—not a traditional costumed-character program. Character, technology, produced narrative, and live performance work together to create a hero children can see, hear, and join in the room.",
  },
  {
    eyebrow: "THE TECHNOLOGY",
    title: "A patent-pending wearable system brings him to life without a screen.",
    body:
      "Jawly’s wearable expression system delivers the character experience while leaving the performer free to move through the room, meet children eye to eye, and lead the physical play.",
  },
  {
    eyebrow: "THE NARRATIVE",
    title: "A theatrical character voice that opens a world of music, story, and wonder.",
    body:
      "Bravo’s distinctive voice, original music, stories, dialogue, activities, and curriculum are authored and highly produced in advance. Together, they create one cohesive character experience—not a role improvised through the mask.",
    soundMark: true,
  },
  {
    eyebrow: "THE HUMAN",
    title: "A performer who embodies the magic with human warmth.",
    body:
      "Our cast members love taking children on imaginative journeys. They bring physical presence, shared laughter, and the human warmth we desperately need in education, while the Jawly system carries the character, story, and curriculum.",
  },
];

const visitSkills = [
  { title: "SOCIAL-EMOTIONAL", body: "Hand on heart, one brave breath - the move every child keeps long after Bravo leaves the room.", Icon: Heart },
  { title: "EXECUTIVE FUNCTION", body: "The Hero Circle only charges up on the count of three, together - not a second before.", Icon: Brain },
  { title: "BODY", body: "Tip-toe the wobbly bridge. Brace the giant boulder. Real balance, real strength.", Icon: Activity },
  { title: "LANGUAGE", body: "Bravo puts a name to the feeling - out loud, every single visit.", Icon: MessageCircle },
  { title: "COGNITIVE", body: "Visit five asks them to remember the whole story - and use it to save the day.", Icon: Shapes },
  { title: "CREATIVE", body: "Cape on, mask on, hero pose struck. Pretend play, played for real.", Icon: Palette },
];

const visitShow = [
  { title: "SING", body: "A chant or call-and-response that gets the whole room's voice in the room.", Icon: Music2, color: "showDeep" },
  { title: "DANCE", body: "Capes on, hero pose struck - movement that gets everybody up and moving together.", Icon: Move, color: "showYellow" },
  { title: "MOVE", body: "Power squeezes, big stomps, physical challenges that build strength and focus.", Icon: Zap, color: "showGreen" },
  { title: "WIND DOWN", body: "One last breath together. The calm that closes every visit.", Icon: Wind, color: "showAsphalt" },
];

const journey = [
  ["MEET & ESTABLISH", "Becoming a Superhero", "Capes on, hero pose struck: you’re a Little Legend now. And a secret comes with it. There’s already a spark of courage inside you. That’s your Bravo.", "/heroes/journey-1.png"],
  ["FIRST DEEP DIVE", "Finding Your Strength", "Training day. Power squeezes, mighty stomps, five big reps and one more. Getting braver looks a lot like practice.", "/heroes/journey-2.png"],
  ["EXPAND", "Better Together", "The biggest hero secret: nobody has to be brave alone. Capes work best side by side.", "/heroes/journey-3.png"],
  ["THE BIG CHALLENGE", "Finding Your Bravo", "Trouble in the city, and it’s a little scary. Hand on your heart, one brave breath, fist to the sky. There it is.", "/heroes/journey-4.png"],
  ["SKILLS ROUNDUP", "Saving the Day", "Everything they trained for: see it, make a plan, be brave. The Legends save the day.", "/heroes/journey-5.png"],
  ["GRADUATION CELEBRATION", "Hero Graduation", "Bravo asks for the capes back… and no one feels one bit smaller. Hand on heart, fist to the sky: the cape was never the superpower. You were.", "/heroes/journey-6.png"],
  ["CREW & KEEPSAKE", "What the Little Legends carry home", "Every class becomes the Little Legends, a name they carry through all six visits and keep after. What they take home: a cape, a mask, and a squeeze-and-breathe stress ball, a coping tool they can actually use whenever they need to find their Bravo again.", ""],
];

const videos = [
  {
    id: "1227772184",
    hash: "cd31bd5063",
    title: "Dancing to the Theme Song",
    shortTitle: "Dance to the Theme Song",
    invitation: "Watch Bravo turn the theme song into a room-wide movement moment.",
    thumbnail: "/heroes/video-dance.jpg",
  },
  {
    id: "1227770633",
    hash: "75c166e39e",
    title: "Flying Down Low Like a Sneaky Hero",
    shortTitle: "Sneaky Hero Flight",
    invitation: "See how one playful movement cue turns the whole class into sneaky heroes.",
    thumbnail: "/heroes/video-sneaky.jpg",
  },
  {
    id: "1227770634",
    hash: "3e50750d7b",
    title: "Hero Training: Power Squeezes",
    shortTitle: "Power Squeezes",
    invitation: "Join a quick hero-training exercise that gives big energy a focused place to go.",
    thumbnail: "/heroes/video-power.jpg",
  },
  {
    id: "1227772182",
    hash: "91d9211ea5",
    title: "Bravo & Little Legends Cross the Wobbly Bridge",
    shortTitle: "The Wobbly Bridge",
    invitation: "Watch Bravo and the Little Legends practice courage one wobbly step at a time.",
    thumbnail: "/heroes/video-wobbly.jpg",
  },
  {
    id: "1227770632",
    hash: "3a4e5e6f9f",
    title: "Find Your Bravo: The Theme Song",
    shortTitle: "The Theme Song",
    invitation: "Hear the song that gives every visit its shared rhythm, language, and heroic lift.",
    thumbnail: "/heroes/video-theme.jpg",
  },
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export default function HeroesLanding() {
  const storyRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = storyRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const distance = section.offsetHeight - window.innerHeight;
      setProgress(clamp(-rect.top / Math.max(1, distance)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const activeStage =
    progress < 0.11 ? 0 :
    progress < 0.36 ? 1 :
    progress < 0.55 ? 2 : 3;
  return (
    <main className={styles.page}>
      <section id="top" className={styles.hero}>
        <img className={styles.heroBackdrop} src="/heroes/figma-hero-background.png" alt="" aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>HEROES: THE COURAGE JOURNEY</p>
          <img className={styles.bravoLogo} src="/heroes/find-your-bravo-logo.png" alt="Find Your Bravo: The Courage Within" />
          <p className={styles.heroLead}>A live, six-visit courage adventure with feeling words, brave breaths, teamwork, and a plan for when something goes wrong.</p>
        </div>
        <img className={styles.heroFigures} src="/heroes/bravo-little-legends.png" alt="Bravo standing with the Little Legends" />
      </section>

      <ExperienceStrip context="program" character="Bravo" program="Heroes" demoHref="#contact" page="heroes" />

      <section id="experience" ref={storyRef} className={styles.storySection}>
        <div className={styles.storySticky}>
          <div className={styles.storyGrid}>
            <div className={styles.copyStage}>
              <div className={styles.storyIndex} aria-label="How Bravo works">
                {stages.map((stage, index) => (
                  <span key={stage.eyebrow} className={activeStage === index ? styles.storyIndexActive : ""}>
                    {stage.eyebrow.replace("THE ", "")}
                  </span>
                ))}
              </div>
              {stages.map((stage, index) => (
                <article key={stage.title} className={`${styles.storyCopy} ${activeStage === index ? styles.storyCopyActive : ""}`} aria-hidden={activeStage !== index}>
                  <p className={styles.eyebrow}>{stage.eyebrow}</p>
                  <h2>{stage.title}</h2>
                  <p>{stage.body}</p>
                  {stage.soundMark && <img className={styles.soundMark} src="/heroes/sound-music-reference.png" alt="" />}
                </article>
              ))}
            </div>

            <div className={styles.imageStage} role="img" aria-label="Bravo’s wearable mask is removed to reveal the performer behind the character">
              <BravoMaskSequence progress={progress} />
              <div className={`${styles.techAnnotation} ${activeStage === 1 ? styles.techAnnotationActive : ""}`} aria-hidden="true">
                <span>Wearable expression system</span>
                <i />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="visit" className={styles.visitSection} aria-labelledby="visit-heading">
        <div className={styles.visitInner}>
          <div className={styles.visitHeader}>
            <p className={styles.eyebrow}>WHAT&apos;S IN A JAWLY VISIT</p>
            <h2 id="visit-heading">One story. Real skills. Built like a show.</h2>
            <p>Every Heroes visit is built around the same character and the same real curriculum.</p>
          </div>
          <div className={styles.visitGroup}>
            <h3>THE SKILLS</h3>
            <div className={styles.visitSkillGrid}>
              {visitSkills.map(({ title, body, Icon }) => (
                <article className={styles.visitSkillCard} key={title}>
                  <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                  <h4>{title}</h4>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
          <div id="visit-show" className={styles.visitGroup}>
            <h3>THE SHOW</h3>
            <p className={styles.visitGroupLead}>Big movement at the peaks. Calm at the close.</p>
            <div className={styles.visitShowGrid}>
              {visitShow.map(({ title, body, Icon, color }) => (
                <article className={`${styles.visitShowCard} ${styles[color]}`} key={title}>
                  <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                  <h4>{title}</h4>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className={styles.gallerySection}>
        <div className={`${styles.sectionHeading} ${styles.galleryEyebrow}`}>
          <p className={styles.eyebrow}>SEE HEROES LIVE</p>
        </div>
        <GalleryPlaceholder />
        {/* Gallery hidden while new footage is prepared. Restore this block, and re-apply the JAW-181 width fix on .videoDisclosure, when the videos return.
        <div className={styles.videoGallery}>
          <div className={styles.featuredVideo}>
            <div className={styles.videoFrame}>
              <iframe
                key={selectedVideo.id}
                src={`https://player.vimeo.com/video/${selectedVideo.id}?h=${selectedVideo.hash}&title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&progress_bar=0&quality_selector=0&speed=0&cc=0&chapters=0&transcript=0&audio_track=0&airplay=0&chromecast=0&pip=0&volume=1&fullscreen=1`}
                title={selectedVideo.title}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className={styles.videoCaption}>
              <div><h3>{selectedVideo.title}</h3><p>{selectedVideo.invitation}</p></div>
            </div>
          </div>
          <div className={styles.videoRail} aria-label="Choose a Heroes video">
            {videos.map((video) => (
              <button
                key={video.id}
                type="button"
                className={selectedVideo.id === video.id ? styles.videoThumbActive : ""}
                onClick={() => setSelectedVideo(video)}
                aria-pressed={selectedVideo.id === video.id}
              >
                <span className={styles.thumbImage}>
                  <img src={video.thumbnail} alt="" />
                  <i><Play size={15} fill="currentColor" /></i>
                </span>
                <span><strong>{video.shortTitle}</strong></span>
              </button>
            ))}
          </div>
          <p className={styles.videoDisclosure}>{"Every clip above is genuine, unscripted footage from a real Jawly classroom. We’ve used AI to alter the children’s faces to protect their privacy."}</p>
        </div>
        */}
      </section>

      <ProofSection theme="heroes" />

      <section id="journey" className={styles.journeySection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>THE COURAGE JOURNEY</p>
          <h2>Every visit moves the story and the child forward.</h2>
          <p>Six classroom adventures lead to a final chapter children carry home.</p>
        </div>
        <div className={styles.timeline}>
          {journey.map(([eyebrow, title, body, image], index) => (
            <article key={title} className={`${styles.journeyNode} ${index % 2 ? styles.nodeReverse : ""} ${index === 6 ? styles.keepsakeNode : ""}`}>
              {image && <div className={styles.journeyImage}><img src={image} alt={`${title} from the Heroes journey`} /></div>}
              <div className={styles.nodeCopy}>
                <span className={styles.nodeNumber}>{String(index + 1).padStart(2, "0")}</span>
                <small>{eyebrow}</small>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <OtherPrograms currentSlug="heroes" />

      <ClassroomTrust />

      <LeadCaptureCta theme="heroes" page="heroes-bottom" />

    </main>
  );
}
