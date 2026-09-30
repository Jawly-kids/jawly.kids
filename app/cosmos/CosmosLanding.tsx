"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
import { cosmosCopy } from "@/content/programs/cosmos";
import { programs, site } from "@/lib/site";
import styles from "../heroes/heroes.module.css";

const skillIcons = [Heart, Brain, Activity, MessageCircle, Shapes, Palette];
const showCards = [
  { Icon: Music2, color: "showDeep" },
  { Icon: Move, color: "showYellow" },
  { Icon: Zap, color: "showGreen" },
  { Icon: Wind, color: "showAsphalt" },
];

const continueStory = [
  { slug: "heroes", action: "Meet Bravo" },
  { slug: "tides", action: "Meet Mira" },
];

function vimeoSrc(id: string, hash: string) {
  const privacy = hash ? `h=${hash}&` : "";
  return `https://player.vimeo.com/video/${id}?${privacy}title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&progress_bar=0&quality_selector=0&speed=0&cc=0&chapters=0&transcript=0&audio_track=0&airplay=0&chromecast=0&pip=0&volume=1&fullscreen=1`;
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function range(progress: number, start: number, end: number) {
  return clamp((progress - start) / (end - start));
}

export default function CosmosLanding() {
  const storyRef = useRef<HTMLElement>(null);
  const schedulingDialogRef = useRef<HTMLDialogElement>(null);
  const [progress, setProgress] = useState(0);
  const [inviteEmail, setInviteEmail] = useState("");
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(cosmosCopy.videos[0]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialsPaused, setTestimonialsPaused] = useState(false);
  const journey = [
    ...cosmosCopy.journey,
    cosmosCopy.keepsake,
  ];

  useEffect(() => {
    if (testimonialsPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      if (!document.hidden) setTestimonialIndex((index) => (index + 1) % cosmosCopy.testimonials.length);
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
    const subject = encodeURIComponent("Free Cosmos demo invite");
    const body = encodeURIComponent(`Hi Jawly,\n\nPlease send the scheduling link for a free, 30-minute Cosmos classroom demo to ${inviteEmail.trim()}.\n\nCenter name:\nYour name:\n`);
    window.location.href = `mailto:${site.salesEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <main className={`${styles.page} ${styles.cosmosPage}`}>
      <section id="top" className={`${styles.hero} ${styles.cosmosHero}`}>
        <img className={styles.heroBackdrop} src={cosmosCopy.heroBackground} alt="" aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>{cosmosCopy.heroEyebrow}</p>
          <img className={styles.bravoLogo} src={cosmosCopy.heroLogo} alt={cosmosCopy.heroTitle} />
          <p className={styles.heroLead}>{cosmosCopy.heroLead}</p>
        </div>
        <img className={styles.heroFigures} src={cosmosCopy.heroFigures} alt={cosmosCopy.heroFiguresAlt} />
      </section>

      <section id="basics" className={styles.basicsSection} aria-label="Cosmos program basics">
        <div className={styles.basicsGrid}>
          {cosmosCopy.basics.map((card, index) => {
            const tone = ["basicsSky", "basicsGold", "basicsGreen"][index];
            const Icon = [CirclePlay, Check, Target][index];
            const iconSize = [19, 23, 22][index];
            const strokeWidth = [2, 3, 2.5][index];
            return (
              <article key={card.title} className={`${styles.basicsCard} ${styles[tone]}`}>
                <span className={styles.basicsIcon} aria-hidden="true"><Icon size={iconSize} strokeWidth={strokeWidth} /></span>
                <h2>{card.title}</h2>
                <p>{card.body}</p>
                {card.title.startsWith("Serving Chicagoland") && (
                  <CheckArea className={styles.basicsCta} demoHref="#calendar" page="cosmos" />
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section id="experience" ref={storyRef} className={styles.storySection}>
        <div className={styles.storySticky}>
          <div className={styles.storyGrid}>
            <div className={styles.copyStage}>
              {cosmosCopy.stages.map((stage, index) => (
                <article key={stage.title} className={`${styles.storyCopy} ${activeStage === index ? styles.storyCopyActive : ""}`} aria-hidden={activeStage !== index}>
                  <p className={styles.eyebrow}>{stage.eyebrow}</p>
                  <h2>{stage.title}</h2>
                  <p>{stage.body}</p>
                  {index === 2 && (
                    <button className={styles.voiceButton} type="button" onClick={() => setVoiceOpen((value) => !value)} aria-expanded={voiceOpen}>
                      <Volume2 size={18} /> {voiceOpen ? "Close Orla’s welcome" : "Hear Orla’s welcome"}
                    </button>
                  )}
                </article>
              ))}
            </div>

            <div className={styles.imageStage} aria-label={`Character reveal, stage ${visualStage + 1} of 4`}>
              {cosmosCopy.characterStates.map((state, index) => (
                <img
                  key={state.src}
                  src={state.src}
                  alt={state.alt}
                  className={`${styles.stateImage} ${styles[`state${index + 1}`]}`}
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
              <p><strong>Orla’s welcome</strong><br />{cosmosCopy.voiceWelcome}</p>
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
            <p>{cosmosCopy.visitIntro}</p>
          </div>
          <div className={styles.visitGroup}>
            <h3>THE SKILLS</h3>
            <div className={styles.visitSkillGrid}>
              {cosmosCopy.skills.map(({ title, body }, index) => {
                const Icon = skillIcons[index];
                return (
                  <article className={styles.visitSkillCard} key={title}>
                    <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                    <h4>{title}</h4>
                    <p>{body}</p>
                  </article>
                );
              })}
            </div>
          </div>
          <div id="visit-show" className={styles.visitGroup}>
            <h3>THE SHOW</h3>
            <p className={styles.visitGroupLead}>Big movement at the peaks. Calm at the close.</p>
            <div className={styles.visitShowGrid}>
              {cosmosCopy.show.map(({ title, body }, index) => {
                const { Icon, color } = showCards[index];
                return (
                  <article className={`${styles.visitShowCard} ${styles[color]}`} key={title}>
                    <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                    <h4>{title}</h4>
                    <p>{body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className={`${styles.gallerySection} ${styles.cosmosGallery}`}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>{cosmosCopy.galleryEyebrow}</p>
          <h2>{cosmosCopy.galleryTitle}</h2>
          <p>{cosmosCopy.galleryLead}</p>
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
                key={selectedVideo.vimeoId}
                src={vimeoSrc(selectedVideo.vimeoId, selectedVideo.vimeoHash)}
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
          <div className={styles.videoRail} style={{ gridTemplateColumns: `repeat(${cosmosCopy.videos.length - 1}, minmax(0, 1fr))` }} aria-label="Choose a Cosmos video">
            {cosmosCopy.videos.filter((video) => video.vimeoId !== selectedVideo.vimeoId).map((video) => (
              <button
                key={video.vimeoId}
                type="button"
                className={selectedVideo.vimeoId === video.vimeoId ? styles.videoThumbActive : ""}
                onClick={() => setSelectedVideo(video)}
                aria-pressed={selectedVideo.vimeoId === video.vimeoId}
              >
                <span className={styles.thumbImage}>
                  {video.thumbnail ? <img src={video.thumbnail} alt="" /> : <span className={styles.thumbPlaceholder}>Placeholder</span>}
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
          <h2>{cosmosCopy.proofTitle}</h2>
        </div>
        <div className={styles.metricGrid}>
          {cosmosCopy.metrics.map((metric) => (
            <article key={metric.value}>
              <strong>{metric.value}</strong>
              <p>{metric.body}</p>
              {metric.note && <small className={styles.metricNote}>{metric.note}</small>}
            </article>
          ))}
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
              {cosmosCopy.testimonials.map((testimonial, index) => (
                <figure key={testimonial.quote} className={styles.testimonialSlide} aria-hidden={index !== testimonialIndex}>
                  <blockquote>“{testimonial.quote}”</blockquote>
                  <figcaption>{testimonial.attribution}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className={styles.testimonialDots} aria-label="Choose a teacher testimonial">
            {cosmosCopy.testimonials.map((testimonial, index) => (
              <button
                key={testimonial.quote}
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
          <p className={styles.eyebrow}>{cosmosCopy.journeyEyebrow}</p>
          <h2>{cosmosCopy.journeyTitle}</h2>
          <p>{cosmosCopy.journeyLead}</p>
        </div>
        <div className={styles.timeline}>
          {journey.map((stop, index) => {
            const isKeepsake = index === journey.length - 1;
            return (
              <article key={stop.title} className={`${styles.journeyNode} ${index % 2 ? styles.nodeReverse : ""} ${isKeepsake ? styles.keepsakeNode : ""}`}>
                {stop.image && (
                  <div className={styles.journeyImage}>
                    <img src={stop.image} alt={`${stop.title} from the Cosmos journey`} />
                  </div>
                )}
                <div className={styles.nodeCopy}>
                  <span className={styles.nodeNumber}>{String(index + 1).padStart(2, "0")}</span>
                  {stop.eyebrow && <small>{stop.eyebrow}</small>}
                  <h3>{stop.title}</h3>
                  <p>{stop.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="calendar" className={styles.calendarSection}>
        <div className={styles.ctaShell}>
          <article className={styles.inviteCard}>
            <div className={styles.inviteIntro}>
              <h2>Start with a <span>FREE</span> demo.</h2>
              <p>One live, 30-minute Cosmos session for your class — free, no commitment. Tell us where to send the scheduling link.</p>
            </div>
            <div className={styles.inviteAction}>
              <form className={styles.inviteForm} onSubmit={requestInvite}>
                <label htmlFor="cosmos-invite-email" className={styles.srOnly}>Email address</label>
                <input id="cosmos-invite-email" type="email" placeholder="you@center.com" autoComplete="email" required value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} />
                <button type="submit">Send My Invite <ArrowRight size={17} /></button>
              </form>
              <p className={styles.inviteNote}>No credit card, no obligation — just pick a slot that works.</p>
              <p className={styles.inviteHandoff} role="status">This opens a prepared email to our team.</p>
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
              <p>We pick up fast, and you&apos;ll always reach a real person for anything more.</p>
            </article>
          </div>
        </div>
      </section>

      <dialog ref={schedulingDialogRef} className={styles.scheduleDialog} aria-labelledby="cosmos-schedule-dialog-title">
        <button type="button" className={styles.scheduleDialogClose} onClick={() => schedulingDialogRef.current?.close()} aria-label="Close scheduling">×</button>
        <h2 id="cosmos-schedule-dialog-title">Schedule a meeting</h2>
        <p>Online scheduling is coming soon. For now, call us and we’ll find a time together.</p>
        <a href={site.phoneHref}>Call {site.phoneDisplay}</a>
      </dialog>

      <section className={styles.moreSection}>
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>CONTINUE THE STORY</p><h2>Orla is one commander in a growing world.</h2></div>
        <div className={styles.moreGrid}>
          {continueStory.map(({ slug, action }) => {
            const program = programs.find((item) => item.slug === slug);
            if (!program) return null;
            const card = (
              <>
                <span className={styles[program.tone]}>{program.mark}</span>
                <div>
                  <small>{program.label.toUpperCase()}</small>
                  <h3>{program.character} · {program.journey}</h3>
                  <p>{action}</p>
                </div>
              </>
            );
            return (
              <Link key={slug} href={program.href} className={`${styles.programCard} ${program.status === "live" ? "" : styles.programCardSoon}`}>{card}</Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
