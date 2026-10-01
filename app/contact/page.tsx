import type { Metadata } from "next";
import LeadCaptureCta from "@/components/marketing/LeadCaptureCta";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Book a Free Visit",
  description: "Check Jawly availability, request a free classroom visit, or talk with the Jawly team.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <LeadCaptureCta theme="home" page="contact" />
    </main>
  );
}
