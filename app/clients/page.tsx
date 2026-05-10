"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";

interface Client {
  name: string;
  campaignCount: number;
  lastCampaign: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await fetch("/api/clients");
        if (!response.ok) {
          throw new Error("Failed to fetch clients");
        }
        const data = await response.json();
        setClients(data.clients);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []);

  if (loading) {
    return (
      <>
        <Nav />
        <main className="container" style={{ padding: "32px 0" }}>
          <h1>Clients</h1>
          <p>Loading clients...</p>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Nav />
        <main className="container" style={{ padding: "32px 0" }}>
          <h1>Clients</h1>
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
          <h1>Clients</h1>
          <Link className="btn" href="/campaigns/new">Create Campaign</Link>
        </div>

        <div className="grid">
          {clients.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>No clients found. Create your first campaign to see clients here!</p>
          ) : (
            clients.map((client) => (
              <div className="card" key={client.name}>
                <h2>{client.name}</h2>
                <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                  <span style={{ color: "var(--muted)", fontSize: "14px" }}>
                    {client.campaignCount} campaign{client.campaignCount !== 1 ? 's' : ''}
                  </span>
                  <span style={{ color: "var(--muted)", fontSize: "14px" }}>
                    Last: {new Date(client.lastCampaign).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}