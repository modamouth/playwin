import Link from "next/link";
import { Nav } from "@/components/Nav";
import { campaigns } from "@/lib/mockData";

export default function CampaignsPage() {
  return (
    <>
      <Nav />
      <main className="container" style={{ padding: "32px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <h1>Campaigns</h1>
          <Link className="btn" href="/campaigns/new">Create Campaign</Link>
        </div>
        <div className="grid">
          {campaigns.map((c) => (
            <Link href={`/campaigns/${c.id}`} className="card" key={c.id}>
              <span className="badge">{c.status}</span>
              <h2>{c.name}</h2>
              <p style={{ color: "var(--muted)" }}>{c.client} · {c.type}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
