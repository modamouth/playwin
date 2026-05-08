"use client";

import { useParams } from "next/navigation";
import { Nav } from "@/components/Nav";
import { MetricCard } from "@/components/MetricCard";
import { campaigns, leads, leaderboard } from "@/lib/mockData";

export default function CampaignDetailPage() {
  const params = useParams();
  const campaignId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const campaign = campaigns.find((c) => c.id === campaignId) || campaigns[0];

  return (
    <>
      <Nav />
      <main className="container" style={{ padding: "32px 0" }}>
        <span className="badge">{campaign.status}</span>
        <h1>{campaign.name}</h1>
        <p style={{ color: "var(--muted)" }}>{campaign.client} · {campaign.type}</p>

        <div className="grid grid-3">
          <MetricCard title="Plays" value={campaign.plays.toLocaleString()} />
          <MetricCard title="Leads" value={campaign.leads.toLocaleString()} />
          <MetricCard title="Vouchers" value={campaign.vouchers.toLocaleString()} />
        </div>

        <div className="grid grid-2" style={{ marginTop: 18 }}>
          <div className="card">
            <h2>Leaderboard</h2>
            <table>
              <thead>
                <tr><th>Rank</th><th>Name</th><th>Score</th><th>Time</th></tr>
              </thead>
              <tbody>
                {leaderboard.map((r) => (
                  <tr key={r.rank}>
                    <td>{r.rank}</td><td>{r.name}</td><td>{r.score}</td><td>{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card">
            <h2>Funnel</h2>
            <div className="grid">
              <MetricCard title="Game starts" value={campaign.plays.toLocaleString()} />
              <MetricCard title="Completions" value={campaign.completions.toLocaleString()} />
              <MetricCard title="Lead conversion" value={`${((campaign.leads / campaign.plays) * 100).toFixed(1)}%`} />
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
            <h2>Leads</h2>
            <a className="btn secondary" href="/api/export">Export CSV</a>
          </div>
          <table>
            <thead>
              <tr><th>Name</th><th>Phone</th><th>Email</th><th>Score</th><th>Source</th><th>Date</th></tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.phone}>
                  <td>{lead.name}</td><td>{lead.phone}</td><td>{lead.email}</td><td>{lead.score}</td><td>{lead.source}</td><td>{lead.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
