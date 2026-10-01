"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Activity,
  Brain,
  Check,
  CirclePlay,
  Heart,
  MessageCircle,
  Move,
  Music2,
  Palette,
  Play,
  Shapes,
  Target,
  Volume2,
  Wind,
  Zap,
} from "lucide-react";
import CheckArea from "@/components/availability/CheckArea";
import { programs, site } from "@/lib/site";
import styles from "./heroes.module.css";

const stages = [
  {
    eyebrow: "STARRING BRAVO",
    title: "The hero who makes courage visible.",
    body:
      "Bravo doesn’t tell children to stop feeling scared. He shows them how to feel scared, take a brave breath, ask for help, and try anyway. As children help Bravo through his challenges, they begin to recognize the courage already inside themselves.",
  },
  {
    eyebrow: "PATENT PENDING TECH",
    title: "Screenless. Yet Captivating Wearable Expression System.",
    body:
      "Jawly is an education technology platform, not a costumed performer. Bravo speaks through a patent-pending wearable expression system — a rich character voice, produced ahead of time with AI rather than improvised by an actor in the moment. Delivered through screenless wearable hardware, that same voice and personality show up the same way in every visit, while a real performer brings the movement, eye contact, and play.",
  },
  {
    eyebrow: "HEAR IT FOR YOURSELF",
    title: "Meet the hero your class will meet.",
    body:
      "A real cast member brings the timing, movement, and eye contact. Bravo brings the familiar voice and personality children recognize every time.",
  },
  {
    eyebrow: "MEET THE CREW",
    title: "The Jawly Crew behind the mask.",
    body:
      "Every visit is led by a trained, background-checked Jawly cast member. Bravo brings the familiar voice, story, and journey; the person behind the mask brings the movement, eye contact, timing, and spontaneous high-fives.",
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
  { title: "WIND DOWN", body: "One last breath together — the calm that closes every visit.", Icon: Wind, color: "showAsphalt" },
];

const journey = [
  ["MEET & ESTABLISH", "Becoming a Superhero", "Capes on, hero pose struck: you’re a Little Legend now. And a secret comes with it. There’s already a spark of courage inside you — that’s your Bravo.", "/heroes/journey-1.png"],
  ["FIRST DEEP DIVE", "Finding Your Strength", "Training day. Power squeezes, mighty stomps, five big reps and one more. Getting braver looks a lot like practice.", "/heroes/journey-2.png"],
  ["EXPAND", "Better Together", "The biggest hero secret: nobody has to be brave alone. Capes work best side by side.", "/heroes/journey-3.png"],
  ["THE BIG CHALLENGE", "Finding Your Bravo", "Trouble in the city, and it’s a little scary. Hand on your heart, one brave breath, fist to the sky. There it is.", "/heroes/journey-4.png"],
  ["SKILLS ROUNDUP", "Saving the Day", "Everything they trained for: see it, make a plan, be brave. The Legends save the day.", "/heroes/journey-5.png"],
  ["GRADUATION CELEBRATION", "Hero Graduation", "Bravo asks for the capes back… and no one feels one bit smaller. Hand on heart, fist to the sky: the cape was never the superpower. You were.", "/heroes/journey-6.png"],
  ["CREW & KEEPSAKE", "What the Little Legends carry home", "Every class becomes the Little Legends — a name they carry through all six visits and keep after. What they take home: a cape, a mask, and a squeeze-and-breathe stress ball — a coping tool they can actually use, whenever they need to find their Bravo again.", ""],
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
    title: "Hero Training — Power Squeezes",
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
    title: "Find Your Bravo — The Theme Song",
    shortTitle: "The Theme Song",
    invitation: "Hear the song that gives every visit its shared rhythm, language, and heroic lift.",
    thumbnail: "/heroes/video-theme.jpg",
  },
];

const teacherTestimonials = [
  { quote: "It beat the sports and movement classes we already run — no contest.", attribution: "Lead Teacher - KinderCare" },
  { quote: "Several children now bring him up on their own, between visits — he's become someone they think about.", attribution: "Teacher - Kids R Kids" },
  { quote: "Almost mesmerized, not scared like expected.", attribution: "Center Director - FinderCare" },
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function range(progress: number, start: number, end: number) {
  return clamp((progress - start) / (end - start));
}

export default function HeroesLanding() {
  const storyRef = useRef<HTMLElement>(null);
  const schedulingDialogRef = useRef<HTMLDialogElement>(null);
  const [progress, setProgress] = useState(0);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteDraftOpened, setInviteDraftOpened] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialsPaused, setTestimonialsPaused] = useState(false);

  useEffect(() => {
    if (testimonialsPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      if (!document.hidden) setTestimonialIndex((index) => (index + 1) % teacherTestimonials.length);
    }, 5500);
    return () => window.clearInterval(interval);
  }, [testimonialsPaused]);

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
    progress < 0.2 ? 0 :
    progress < 0.3 ? -1 :
    progress < 0.43 ? 1 :
    progress < 0.55 ? -1 :
    progress < 0.7 ? 2 :
    progress < 0.84 ? -1 : 3;
  const visualStage = progress < 0.25 ? 0 : progress < 0.49 ? 1 : progress < 0.78 ? 2 : 3;
  const reveals = [1, range(progress, 0.19, 0.29), range(progress, 0.43, 0.54), range(progress, 0.71, 0.85)];

  const requestInvite = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent("Free Heroes demo invite");
    const body = encodeURIComponent(`Hi Jawly,\n\nPlease send the scheduling link for a free, 30-minute Heroes classroom demo to ${inviteEmail.trim()}.\n\nCenter name:\nYour name:\n`);
    setInviteDraftOpened(true);
    window.location.href = `mailto:${site.salesEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <main className={styles.page}>
      <section id="top" className={styles.hero}>
        <img className={styles.heroBackdrop} src="/heroes/figma-hero-background.png" alt="" aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>HEROES — THE COURAGE JOURNEY</p>
          <img className={styles.bravoLogo} src="/heroes/find-your-bravo-logo.png" alt="Find Your Bravo — The Courage Within" />
          <p className={styles.heroLead}>A live, six-visit courage adventure — feeling words, brave breaths, teamwork, and a plan for when something goes wrong.</p>
        </div>
        <img className={styles.heroFigures} src="/heroes/bravo-little-legends.png" alt="Bravo standing with the Little Legends" />
      </section>

      <section id="basics" className={styles.basicsSection} aria-label="Heroes program basics">
        <div className={styles.basicsGrid}>
          <article className={`${styles.basicsCard} ${styles.basicsSky}`}>
            <span className={styles.basicsIcon} aria-hidden="true"><CirclePlay size={19} strokeWidth={2} /></span>
            <h2>A live performance — no videos or screens</h2>
            <p>A trained performer brings Bravo directly into your classroom, in person. You bring the classroom and we bring everything else.</p>
          </article>
          <article className={`${styles.basicsCard} ${styles.basicsGold}`}>
            <span className={styles.basicsIcon} aria-hidden="true"><Check size={23} strokeWidth={3} /></span>
            <h2>Your first session is a FREE demo</h2>
            <p>One live, 30-minute session for a class, no commitment — then enroll in the full six-visit Heroes series when you&apos;re ready.</p>
          </article>
          <article className={`${styles.basicsCard} ${styles.basicsGreen}`}>
            <span className={styles.basicsIcon} aria-hidden="true"><Target size={22} strokeWidth={2.5} /></span>
            <h2>Serving Chicagoland daycares + preschools</h2>
            <p>Find out if we can bring Heroes to your center.</p>
            <CheckArea className={styles.basicsCta} demoHref="#calendar" page="heroes" />
          </article>
        </div>
      </section>

      <section id="experience" ref={storyRef} className={styles.storySection}>
        <div className={styles.storySticky}>
          <div className={styles.storyGrid}>
            <div className={styles.copyStage}>
              {stages.map((stage, index) => (
                <article key={stage.title} className={`${styles.storyCopy} ${activeStage === index ? styles.storyCopyActive : ""}`} aria-hidden={activeStage !== index}>
                  <p className={styles.eyebrow}>{stage.eyebrow}</p>
                  <h2>{stage.title}</h2>
                  <p>{stage.body}</p>
                  {index === 2 && (
                    <button className={styles.voiceButton} type="button" onClick={() => setVoiceOpen((value) => !value)} aria-expanded={voiceOpen}>
                      <Volume2 size={18} /> {voiceOpen ? "Close Bravo’s welcome" : "Hear Bravo’s welcome"}
                    </button>
                  )}
                </article>
              ))}
            </div>

            <div className={styles.imageStage} aria-label={`Character reveal, stage ${visualStage + 1} of 4`}>
              {[1, 2, 3, 4].map((number, index) => (
                <img
                  key={number}
                  src={`/heroes/bravo-state-${number}.jpg`}
                  alt={index === 0 ? "Bravo" : index === 1 ? "Bravo’s physical mask" : index === 2 ? "A Jawly cast member wearing Bravo’s mask" : "The Jawly cast member behind Bravo"}
                  className={`${styles.stateImage} ${styles[`state${number}`]}`}
                  style={{ clipPath: `inset(${(1 - reveals[index]) * 100}% 0 0 0)` }}
                />
              ))}
            </div>
          </div>
          <div className={styles.storyProgress} role="img" aria-label={`Character reveal, stage ${visualStage + 1} of 4`}>
            {[0, 1, 2, 3].map((index) => <span key={index} className={index === visualStage ? styles.storyProgressActive : ""} />)}
          </div>
          {voiceOpen && (
            <div className={styles.voiceTranscript} role="status">
              <Play size={18} fill="currentColor" />
              <p><strong>Bravo’s welcome</strong><br />Little Legends, courage isn’t about never feeling scared. It’s taking a brave breath, asking for help, and trying anyway.</p>
              <span>Final produced audio will replace this transcript control.</span>
            </div>
          )}
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
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>SEE HEROES LIVE</p>
          <h2>The room becomes the stage.</h2>
          <p>Five moments from the journey.</p>
        </div>
        <div className={styles.videoGalleryPlaceholder}>
          <h3>Video gallery coming soon</h3>
          <p>We&apos;re updating this section with new footage — check back shortly.</p>
        </div>
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
          <p className={styles.videoDisclosure}>{"Every clip above is genuine, unscripted footage from a real Jawly classroom — we’ve used AI to alter the children’s faces to protect their privacy."}</p>
        </div>
        */}
      </section>

      <section id="proof" className={styles.proofSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>PROOF</p>
          <h2>The response is through the roof.</h2>
        </div>
        <div className={styles.metricGrid}>
          <article><strong>4.8/5</strong><p>Average across 42 teacher reviews, five centers</p></article>
          <article><strong>86%</strong><p>Rated Bravo&apos;s first session above comparable enrichment programs</p><small className={styles.metricNote}>From our pilot cohort</small></article>
          <article><strong>100%</strong><p>Gave the end-of-visit cool-down a perfect 5</p></article>
        </div>
        <div
          className={styles.testimonialPanel}
          onMouseEnter={() => setTestimonialsPaused(true)}
          onMouseLeave={() => setTestimonialsPaused(false)}
          onFocus={() => setTestimonialsPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setTestimonialsPaused(false);
          }}
        >
          <span className={styles.testimonialLabel}>IN THEIR WORDS</span>
          <div className={styles.testimonialViewport} aria-label="Teacher testimonials">
            <div className={styles.testimonialTrack} style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}>
              {teacherTestimonials.map((testimonial, index) => (
                <figure key={index} className={styles.testimonialSlide} aria-hidden={index !== testimonialIndex}>
                  <blockquote>“{testimonial.quote}”</blockquote>
                  <figcaption>{testimonial.attribution}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className={styles.testimonialDots} aria-label="Choose a teacher testimonial">
            {teacherTestimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show testimonial ${index + 1}`}
                aria-pressed={index === testimonialIndex}
                onClick={() => setTestimonialIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="journey" className={styles.journeySection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>THE COURAGE JOURNEY</p>
          <h2>Every visit moves the story—and the child—forward.</h2>
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

      <section id="calendar" className={styles.calendarSection}>
        <div className={styles.ctaShell}>
          <article className={styles.inviteCard}>
            <div className={styles.inviteIntro}>
              <h2>Start with a <span>FREE</span> demo.</h2>
              <p>One live, 30-minute Heroes session for your class — free, no commitment. Tell us where to send the scheduling link.</p>
            </div>
            <div className={styles.inviteAction}>
              <form className={styles.inviteForm} onSubmit={requestInvite}>
                <label htmlFor="heroes-invite-email" className={styles.srOnly}>Email address</label>
                <input id="heroes-invite-email" type="email" placeholder="Email address" autoComplete="email" required value={inviteEmail} onChange={(event) => { setInviteEmail(event.target.value); setInviteDraftOpened(false); }} />
                <button type="submit">Send My Invite <ArrowRight size={17} /></button>
              </form>
              <p className={styles.inviteNote}>No credit card, no obligation — just pick a slot that works.</p>
              <p className={styles.inviteHandoff} role="status">{inviteDraftOpened ? "Send the prepared email to request your invite." : "This opens a prepared email to our team."}</p>
            </div>
          </article>

          <div className={styles.secondaryHeading}>
            <h3>Not ready for a classroom demo?</h3>
            <p>Start with a conversation.</p>
          </div>
          <div className={styles.secondaryGrid}>
            <article className={styles.meetingCard}>
              <h4>Schedule a meeting</h4>
              <p>Choose a time to talk through the program and what it could look like at your center.</p>
              <button type="button" className={styles.scheduleButton} onClick={() => schedulingDialogRef.current?.showModal()}>Choose a time <ArrowRight size={17} /></button>
            </article>
            <article className={styles.callCard}>
              <h4>Call us now</h4>
              <a href={site.phoneHref}>{site.phoneDisplay}</a>
              <p>We pick up fast and connect you live for anything more.</p>
            </article>
          </div>
        </div>
      </section>

      <dialog ref={schedulingDialogRef} className={styles.scheduleDialog} aria-labelledby="schedule-dialog-title">
        <button type="button" className={styles.scheduleDialogClose} onClick={() => schedulingDialogRef.current?.close()} aria-label="Close scheduling">×</button>
        <h2 id="schedule-dialog-title">Schedule a meeting</h2>
        <p>Online scheduling is coming soon. For now, call us and we’ll find a time together.</p>
        <a href={site.phoneHref}>Call {site.phoneDisplay}</a>
      </dialog>

      <section className={styles.moreSection}>
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>CONTINUE THE STORY</p><h2>Bravo is one hero in a growing world.</h2></div>
        <div className={styles.moreGrid}>
          {programs.filter((program) => program.status !== "live").map((program) => (
            <article key={program.slug} className={`${styles.programCard} ${styles.programCardSoon}`}>
              <span className={styles[program.tone]}>{program.mark}</span>
              <div>
                <small>{program.label.toUpperCase()}</small>
                <h3>{program.character} · {program.journey}</h3>
                <p>Coming soon</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
