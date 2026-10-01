"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Activity,
  Brain,
  Heart,
  MessageCircle,
  Move,
  Music2,
  Palette,
  Play,
  Shapes,
  Volume2,
  Wind,
  Zap,
} from "lucide-react";
import CheckArea from "@/components/availability/CheckArea";
import ClassroomTrust from "@/components/marketing/ClassroomTrust";
import ExperienceStrip from "@/components/marketing/ExperienceStrip";
import GalleryPlaceholder from "@/components/marketing/GalleryPlaceholder";
import OtherPrograms from "@/components/marketing/OtherPrograms";
import ProofSection from "@/components/marketing/ProofSection";
import { cosmosCopy } from "@/content/programs/cosmos";
import { site } from "@/lib/site";
import styles from "../heroes/heroes.module.css";

const skillIcons = [Heart, Brain, Activity, MessageCircle, Shapes, Palette];
const showCards = [
  { Icon: Music2, color: "showDeep" },
  { Icon: Move, color: "showYellow" },
  { Icon: Zap, color: "showGreen" },
  { Icon: Wind, color: "showAsphalt" },
];

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
  const [voiceOpen, setVoiceOpen] = useState(false);
  const journey = [
    ...cosmosCopy.journey,
    cosmosCopy.keepsake,
  ];

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

      <ExperienceStrip context="program" character="Orla" program="Cosmos" demoHref="#calendar" page="cosmos" theme="cosmos" />

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
        <div className={`${styles.sectionHeading} ${styles.galleryEyebrow}`}>
          <p className={styles.eyebrow}>{cosmosCopy.galleryEyebrow}</p>
        </div>
        <GalleryPlaceholder />
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

      <ProofSection
        theme="cosmos"
        headline={cosmosCopy.proofTitle}
        metrics={cosmosCopy.metrics.map(({ value, body }) => ({ value, body }))}
        testimonials={cosmosCopy.testimonials}
      />

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

      <OtherPrograms currentSlug="cosmos" />

      <ClassroomTrust />

      <section id="calendar" className={styles.calendarSection}>
        <div className={styles.ctaShell}>
          <article className={styles.inviteCard}>
            <div className={styles.inviteIntro}>
              <h2>Start with a <span>FREE</span> demo.</h2>
              <p>One live, 30-minute Cosmos session for your class, free with no commitment. Tell us where to send the scheduling link.</p>
            </div>
            <div className={styles.inviteAction}>
              <div className={styles.inviteForm}>
                <CheckArea demoHref="#calendar" page="cosmos:invite" label="Check Availability" />
              </div>
              <p className={styles.inviteNote}>No credit card and no obligation. Just pick a slot that works.</p>
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
    </main>
  );
}
