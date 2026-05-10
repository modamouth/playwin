import { Nav } from "@/components/Nav";
import { MetricCard } from "@/components/MetricCard";
import { getCampaignById } from "@/lib/campaigns";
import { leaderboard, leads } from "@/lib/mockData";

export default async function CampaignDetailPage({ params }: { params: { id: string } }) {
  const campaign = await getCampaignById(params.id);

  if (!campaign) {
    return (
      <>
        <Nav />
        <main className="container" style={{ padding: "32px 0" }}>
          <h1>Campaign not found</h1>
          <p style={{ color: "var(--muted)" }}>No campaign exists for ID {params.id}.</p>
        </main>
      </>
    );
  }

  const playCount = 0;
  const leadCount = 0;
  const completions = 0;
  const voucherCount = 0;
  const leadConversion = playCount > 0 ? `${((leadCount / playCount) * 100).toFixed(1)}%` : "0%";

  return (
    <>
      <Nav />
      <main className="container" style={{ padding: "32px 0" }}>
        <span className={`badge ${campaign.status === 'active' ? 'active' : ''}`}>{campaign.status}</span>
        <h1>{campaign.campaignName}</h1>
        <p style={{ color: "var(--muted)" }}>{campaign.clientName} · {campaign.gameType}</p>

        <div className="grid grid-3">
          <MetricCard title="Plays" value={playCount.toLocaleString()} />
          <MetricCard title="Leads" value={leadCount.toLocaleString()} />
          <MetricCard title="Vouchers" value={voucherCount.toLocaleString()} />
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
              <MetricCard title="Game starts" value={playCount.toLocaleString()} />
              <MetricCard title="Completions" value={completions.toLocaleString()} />
              <MetricCard title="Lead conversion" value={leadConversion} />
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
