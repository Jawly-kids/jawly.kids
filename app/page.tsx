import Link from "next/link";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeContent: "center", gap: 24, padding: 32, background: "#f5f8fc", color: "#2a2521", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1 style={{ margin: 0 }}>Jawly</h1>
      <p style={{ margin: 0 }}>Live character adventures for early childhood classrooms.</p>
      <Link href="/heroes">Explore Heroes →</Link>
    </main>
  );
}
