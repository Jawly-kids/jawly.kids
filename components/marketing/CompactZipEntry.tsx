"use client";

import { FormEvent, useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { lookupZip } from "@/content/service-area";
import styles from "./marketing.module.css";

export default function CompactZipEntry({ targetHref, page }: { targetHref: string; page: string }) {
  const inputId = useId();
  const errorId = useId();
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = zip.trim();
    const result = lookupZip(normalized);

    if (result.status === "invalid") {
      setError("Enter a valid 5-digit ZIP.");
      return;
    }

    const detail = { zip: normalized, coverage: result.status, page };
    sessionStorage.setItem("jawly-lead-entry", JSON.stringify(detail));
    window.dispatchEvent(new CustomEvent("jawly:lead-entry", { detail }));
    document.querySelector(targetHref)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <form className={styles.compactZip} onSubmit={submit}>
      <label htmlFor={inputId}>Center ZIP code</label>
      <div>
        <input
          id={inputId}
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          placeholder="Enter ZIP code"
          value={zip}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => {
            setZip(event.target.value.replace(/\D/g, "").slice(0, 5));
            setError("");
          }}
        />
        <button type="submit" aria-label="Check this ZIP code"><ArrowRight aria-hidden="true" /></button>
      </div>
      {error && <span id={errorId} role="alert">{error}</span>}
    </form>
  );
}
