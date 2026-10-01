"use client";

import { useEffect, useState } from "react";
import styles from "./marketing.module.css";

const testimonials = [
  { quote: "It beat the sports and movement classes we already run. No contest.", attribution: "Lead Teacher · KinderCare" },
  { quote: "Several children now bring him up on their own between visits. He has become someone they think about.", attribution: "Teacher · Kids R Kids" },
  { quote: "Almost mesmerized, not scared like expected.", attribution: "Center Director · KinderCare" },
];

type ProofSectionProps = {
  theme?: "home" | "heroes";
};

export default function ProofSection({ theme = "home" }: ProofSectionProps) {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      if (!document.hidden) setTestimonialIndex((index) => (index + 1) % testimonials.length);
    }, 5500);
    return () => window.clearInterval(interval);
  }, [paused]);

  return (
    <section className={`${styles.proof} ${theme === "heroes" ? styles.proofHeroes : ""}`} aria-labelledby={`${theme}-proof-title`}>
      <div className={styles.proofHeading}>
        <p className={styles.eyebrow}>Tested in real classrooms</p>
        <h2 id={`${theme}-proof-title`}>Classrooms are buzzing.<br />Thumbs up all around.</h2>
      </div>
      <div className={styles.stats}>
        <div><strong>4.8<span>/5</span></strong><p>Average across 50+ teacher reviews</p></div>
        <div><strong>97<span>%</span></strong><p>said children remembered the character and curriculum week after week</p></div>
        <div><strong>96<span>%</span></strong><p>gave the end-of-session cool-down a perfect 5</p></div>
      </div>
      <div
        className={styles.testimonials}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
        }}
      >
        <div className={styles.testimonialViewport} aria-live="polite">
          <div className={styles.testimonialTrack} style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}>
            {testimonials.map((testimonial, index) => (
              <blockquote key={testimonial.quote} aria-hidden={index !== testimonialIndex}>
                <p>{testimonial.quote}</p>
                <cite>{testimonial.attribution}</cite>
              </blockquote>
            ))}
          </div>
        </div>
        <div className={styles.testimonialDots} aria-label="Choose a teacher testimonial">
          {testimonials.map((_, index) => (
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
      <div className={styles.serving} id={`${theme}-serving`}>
        <span>Currently serving families at</span>
        <div className={styles.customerLogos} aria-label="Jawly customers">
          <img src="/homepage/clients/kindercare-balanced.jpg" alt="KinderCare" />
          <img src="/homepage/clients/kids-r-kids-balanced.jpg" alt="Kids 'R' Kids Learning Academies" />
          <img src="/homepage/clients/kiddie-academy-balanced.jpg" alt="Kiddie Academy" />
        </div>
        <p>Now expanding to more early-learning centers across Chicago and the Northwest suburbs.</p>
      </div>
    </section>
  );
}
