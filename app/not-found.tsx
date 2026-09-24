import Link from "next/link";
import styles from "@/components/site/site.module.css";

export default function NotFound() {
  return (
    <main className={styles.simplePage}>
      <h1>This page isn’t ready.</h1>
      <p>Program pages go live after the copy and assets are in place.</p>
      <Link href="/">Back home</Link>
    </main>
  );
}
