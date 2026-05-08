import Link from "next/link";
import { Nav } from "@/components/Nav";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="container" style={{ padding: "55px 0" }}>
        <section className="card" style={{ padding: 42 }}>
          <span className="badge">MVP starter</span>
          <h1 style={{ fontSize: 52, lineHeight: 1.02, margin: "18px 0" }}>
            White-label playable campaign platform
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 18, maxWidth: 760 }}>
            Manage basic campaigns, branded game campaigns and custom playable ads from one dashboard.
            Track leads, scores, leaderboards, vouchers and client reporting.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <Link className="btn" href="/dashboard">Open Dashboard</Link>
            <Link className="btn secondary" href="/demos">View Demos</Link>
          </div>
        </section>

        <section className="grid grid-3" style={{ marginTop: 18 }}>
          <div className="card">
            <h3>Basic Campaigns</h3>
            <p style={{ color: "var(--muted)" }}>Quizzes, forms, scratch cards, spin wheels and voucher entries.</p>
          </div>
          <div className="card">
            <h3>Branded Games</h3>
            <p style={{ color: "var(--muted)" }}>Reusable HTML5 games that can be reskinned for each brand.</p>
          </div>
          <div className="card">
            <h3>Custom Playables</h3>
            <p style={{ color: "var(--muted)" }}>Premium game builds with analytics, leaderboards and messaging flows.</p>
          </div>
        </section>
      </main>
    </>
  );
}
