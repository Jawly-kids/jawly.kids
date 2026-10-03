"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { lookupZip } from "@/content/service-area";
import styles from "./check-area.module.css";

type Step = "zip" | "covered" | "waitlist" | "received";

type CheckAreaProps = {
  className?: string;
  demoHref: string;
  page: string;
  label?: string;
};

export default function CheckArea({ className, demoHref, page, label = "Check your area" }: CheckAreaProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const errorId = useId();
  const [step, setStep] = useState<Step>("zip");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(false);

  const reset = () => {
    setStep("zip");
    setZip("");
    setEmail("");
    setSchoolName("");
    setError("");
    setSubmitting(false);
  };

  const open = () => {
    reset();
    setPendingOpen(true);
  };

  useEffect(() => {
    if (!pendingOpen || step !== "zip") return;
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    zipInputRef.current?.focus();
    setPendingOpen(false);
  }, [pendingOpen, step]);

  const close = () => {
    dialogRef.current?.close();
  };

  const submitZip = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = zip.trim();
    const result = lookupZip(normalized);
    if (result.status === "invalid") {
      setError("Enter a 5-digit ZIP code.");
      zipInputRef.current?.focus();
      return;
    }
    setZip(normalized);
    setError("");
    setStep(result.status === "covered" ? "covered" : "waitlist");
  };

  const submitWaitlist = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, schoolName, zip, page }),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(payload?.error ?? "We couldn't save that. Try again.");
        return;
      }
      setStep("received");
    } catch {
      setError("We couldn't save that. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const continueToDemo = () => {
    close();
    if (demoHref.startsWith("#")) {
      document.querySelector(demoHref)?.scrollIntoView({ block: "start" });
      return;
    }
    window.location.assign(demoHref);
  };

  return (
    <>
      <button type="button" className={className} onClick={open}>
        {label}
      </button>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onClose={reset}
      >
        <button type="button" className={styles.close} onClick={close} aria-label="Close">
          ×
        </button>

        {step === "zip" && (
          <form onSubmit={submitZip}>
            <h2 id={titleId}>Check your area</h2>
            <p>Enter your center&apos;s ZIP code to see if Jawly can visit.</p>
            <label htmlFor={`${titleId}-zip`}>ZIP code</label>
            <input
              ref={zipInputRef}
              id={`${titleId}-zip`}
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              value={zip}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              onChange={(event) => {
                setZip(event.target.value.replace(/\D/g, "").slice(0, 5));
                setError("");
              }}
            />
            {error && <p id={errorId} className={styles.error} role="alert">{error}</p>}
            <button type="submit" className={styles.primary}>Check availability</button>
          </form>
        )}

        {step === "covered" && (
          <div>
            <h2 id={titleId}>Great news. Jawly is available in your area.</h2>
            <p>Your class can begin the real six-part adventure with a free Chapter One visit in {zip}.</p>
            <button type="button" className={styles.primary} onClick={continueToDemo}>Book My Free First Visit</button>
            <button type="button" className={styles.text} onClick={() => { setStep("zip"); setError(""); }}>Try another ZIP</button>
          </div>
        )}

        {step === "waitlist" && (
          <form onSubmit={submitWaitlist}>
            <h2 id={titleId}>Not in this area yet</h2>
            <p>Jawly isn&apos;t visiting {zip} yet. Leave your email and your school or center name, and we&apos;ll reach out when we can.</p>
            <label htmlFor={`${titleId}-email`}>Email</label>
            <input
              id={`${titleId}-email`}
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor={`${titleId}-school`}>School or center name</label>
            <input
              id={`${titleId}-school`}
              autoComplete="organization"
              required
              minLength={2}
              value={schoolName}
              onChange={(event) => setSchoolName(event.target.value)}
            />
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button type="submit" className={styles.primary} disabled={submitting}>
              {submitting ? "Saving…" : "Join the waitlist"}
            </button>
            <button type="button" className={styles.text} onClick={() => { setStep("zip"); setError(""); }}>Try another ZIP</button>
          </form>
        )}

        {step === "received" && (
          <div>
            <h2 id={titleId}>You&apos;re on the list</h2>
            <p role="status">We received your note for {schoolName}. We&apos;ll reach out at {email} when Jawly can visit {zip}.</p>
            <button type="button" className={styles.primary} onClick={close}>Done</button>
          </div>
        )}
      </dialog>
    </>
  );
}
