"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";

interface Campaign {
  id: string;
  name: string;
  client: string;
  type: string;
  status: string;
  slug: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await fetch("/api/campaigns");
        if (!response.ok) {
          throw new Error("Failed to fetch campaigns");
        }
        const data = await response.json();
        setCampaigns(data.campaigns);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <>
        <Nav />
        <main className="container" style={{ padding: "32px 0" }}>
          <h1>Campaigns</h1>
          <p>Loading campaigns...</p>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Nav />
        <main className="container" style={{ padding: "32px 0" }}>
          <h1>Campaigns</h1>
          <p style={{ color: "red" }}>Error: {error}</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="container" style={{ padding: "32px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <h1>Campaigns</h1>
          <Link className="btn" href="/campaigns/new">Create Campaign</Link>
        </div>
        <div className="grid">
          {campaigns.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>No campaigns found. Create your first campaign!</p>
          ) : (
            campaigns.map((c) => (
              <Link href={`/campaigns/${c.id}`} className="card" key={c.id}>
                <span className="badge">{c.status}</span>
                <h2>{c.name}</h2>
                <p style={{ color: "var(--muted)" }}>{c.client} · {c.type}</p>
              </Link>
            ))
          )}
        </div>
      </main>
    </>
  );
}
