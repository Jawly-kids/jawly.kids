"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { CalendarDays, MessageCircle, Phone } from "lucide-react";
import { lookupZip } from "@/content/service-area";
import { site } from "@/lib/site";
import styles from "./marketing.module.css";

type LeadTheme = "home" | "heroes" | "cosmos" | "tides";
type Coverage = "covered" | "not-covered";
type LeadEntry = { zip: string; coverage: Coverage; page: string };

const copy = {
  home: {
    eyebrow: "Bring Jawly to your center",
    title: "Start with a",
    highlight: "free visit.",
    body: "Enter your center's ZIP code first. Whether Jawly is nearby or still expanding toward you, we'll help you take the next step.",
  },
  heroes: {
    eyebrow: "Bring Heroes to your center",
    title: "Start with a",
    highlight: "free Heroes visit.",
    body: "One live, 30-minute first chapter for your class. Check your ZIP, then tell us where to follow up.",
  },
  cosmos: {
    eyebrow: "Bring Cosmos to your center",
    title: "Start with a",
    highlight: "free Cosmos session.",
    body: "One live, 30-minute first chapter for your class. Check your ZIP, then tell us where to follow up.",
  },
  tides: {
    eyebrow: "Tides is coming soon",
    title: "Bring the",
    highlight: "Discovery Journey.",
    body: "Check your ZIP and tell us about your center. We'll keep you close as Tides expands across Chicagoland.",
  },
} as const;

export default function LeadCaptureCta({ theme, page, id = "calendar" }: { theme: LeadTheme; page: string; id?: string }) {
  const content = copy[theme];
  const formId = useId();
  const scheduleDialogRef = useRef<HTMLDialogElement>(null);
  const [zip, setZip] = useState("");
  const [coverage, setCoverage] = useState<Coverage | null>(null);
  const [email, setEmail] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [received, setReceived] = useState(false);

  useEffect(() => {
    const applyEntry = (entry: LeadEntry | null) => {
      if (!entry || entry.page.split("-")[0] !== page.split("-")[0]) return;
      setZip(entry.zip);
      setCoverage(entry.coverage);
      setReceived(false);
      setError("");
    };

    const saved = sessionStorage.getItem("jawly-lead-entry");
    if (saved) {
      try { applyEntry(JSON.parse(saved) as LeadEntry); } catch { sessionStorage.removeItem("jawly-lead-entry"); }
    }

    const receiveEntry = (event: Event) => applyEntry((event as CustomEvent<LeadEntry>).detail);
    window.addEventListener("jawly:lead-entry", receiveEntry);
    return () => window.removeEventListener("jawly:lead-entry", receiveEntry);
  }, [page]);

  const checkZip = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = zip.trim();
    const result = lookupZip(normalized);
    if (result.status === "invalid") {
      setError("Enter a valid 5-digit ZIP code.");
      setCoverage(null);
      return;
    }
    setZip(normalized);
    setCoverage(result.status);
    setReceived(false);
    setError("");
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!coverage) return;
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, schoolName, zip, page: `${page}:${coverage}` }),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(payload?.error ?? "We couldn't save that. Please try again.");
        return;
      }
      setReceived(true);
    } catch {
      setError("We couldn't save that. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id={id} className={`${styles.leadSection} ${styles[`lead${theme[0].toUpperCase()}${theme.slice(1)}`]}`} aria-labelledby={`${formId}-title`}>
      <div className={styles.leadShell}>
        <div className={styles.leadMain}>
          <div className={styles.leadIntro}>
            <p className={styles.leadEyebrow}>{content.eyebrow}</p>
            <h2 id={`${formId}-title`}>{content.title} <em>{content.highlight}</em></h2>
            <p>{content.body}</p>
          </div>

          <div className={styles.leadInteraction}>
            {!received ? (
              <>
                <form className={styles.zipForm} onSubmit={checkZip}>
                  <label htmlFor={`${formId}-zip`}>Center ZIP code</label>
                  <div>
                    <input
                      id={`${formId}-zip`}
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={5}
                      placeholder="Enter ZIP code"
                      value={zip}
                      onChange={(event) => {
                        setZip(event.target.value.replace(/\D/g, "").slice(0, 5));
                        setCoverage(null);
                        setError("");
                      }}
                    />
                    <button type="submit">See if we serve your area</button>
                  </div>
                </form>

                {coverage && (
                  <div className={styles.leadExpanded} aria-live="polite">
                    <div className={styles.coverageResult}>
                      <strong>{coverage === "covered" ? "Good news. Jawly is serving your area." : "We're not in your area, but we're expanding fast."}</strong>
                      <span>{coverage === "covered" ? `Tell us about your center in ${zip}, and we'll help you plan the first visit.` : `Share your info. You never know, ${zip} could be where we head next.`}</span>
                    </div>
                    <form className={styles.leadForm} onSubmit={submitLead}>
                      <label htmlFor={`${formId}-school`}>School or center name</label>
                      <input id={`${formId}-school`} autoComplete="organization" required minLength={2} maxLength={200} value={schoolName} onChange={(event) => setSchoolName(event.target.value)} />
                      <label htmlFor={`${formId}-email`}>Work email</label>
                      <input id={`${formId}-email`} type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
                      <button type="submit" disabled={submitting}>{submitting ? "Sending…" : coverage === "covered" ? "Request my free first visit" : "Keep me updated"}</button>
                    </form>
                  </div>
                )}
                {error && <p className={styles.leadError} role="alert">{error}</p>}
              </>
            ) : (
              <div className={styles.leadReceived} role="status">
                <strong>{coverage === "covered" ? "Your request is in." : "You're on our expansion list."}</strong>
                <p>Thanks, {schoolName}. We&apos;ll follow up at {email} about Jawly in {zip}.</p>
                <button type="button" onClick={() => { setReceived(false); setCoverage(null); setZip(""); setEmail(""); setSchoolName(""); }}>Check another ZIP</button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.leadSecondary}>
          <div>
            <p>Have questions first?</p>
            <h3>Talk with Jawly.</h3>
          </div>
          <a href={site.phoneHref}><Phone aria-hidden="true" /><span><strong>Call us now</strong><small>{site.phoneDisplay}</small></span></a>
          <button type="button" disabled data-commerce-action="ask-jawly-ai"><MessageCircle aria-hidden="true" /><span><strong>Ask Jawly AI</strong><small>Coming soon</small></span></button>
          <button type="button" onClick={() => scheduleDialogRef.current?.showModal()}><CalendarDays aria-hidden="true" /><span><strong>Schedule a meeting</strong><small>Choose a time to talk</small></span></button>
        </div>
      </div>

      <dialog ref={scheduleDialogRef} className={styles.leadDialog} aria-labelledby={`${formId}-schedule-title`}>
        <button type="button" className={styles.leadDialogClose} onClick={() => scheduleDialogRef.current?.close()} aria-label="Close scheduling">×</button>
        <h2 id={`${formId}-schedule-title`}>Schedule a meeting</h2>
        <p>The scheduling connection is coming next. For now, call us and we&apos;ll find a time together.</p>
        <a href={site.phoneHref}>Call {site.phoneDisplay}</a>
      </dialog>
    </section>
  );
}
