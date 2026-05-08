import { Nav } from "@/components/Nav";
import { MetricCard } from "@/components/MetricCard";
import { campaigns } from "@/lib/mockData";
import Link from "next/link";

export default function DashboardPage() {
  const plays = campaigns.reduce((sum, c) => sum + c.plays, 0);
  const leads = campaigns.reduce((sum, c) => sum + c.leads, 0);
  const conversion = ((leads / plays) * 100).toFixed(1) + "%";

  return (
    <>
      <Nav />
      <main className="container" style={{ padding: "32px 0" }}>
        <h1>Dashboard</h1>
        <div className="grid grid-3">
          <MetricCard title="Total plays" value={plays.toLocaleString()} hint="Across all campaigns" />
          <MetricCard title="Leads captured" value={leads.toLocaleString()} hint="Form submissions" />
          <MetricCard title="Conversion rate" value={conversion} hint="Leads divided by plays" />
        </div>

        <div className="card" style={{ marginTop: 18 }}>
          <h2>Campaigns</h2>
          <table>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Client</th>
                <th>Type</th>
                <th>Status</th>
                <th>Plays</th>
                <th>Leads</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id}>
                  <td><Link href={`/campaigns/${c.id}`}>{c.name}</Link></td>
                  <td>{c.client}</td>
                  <td>{c.type}</td>
                  <td><span className="badge">{c.status}</span></td>
                  <td>{c.plays.toLocaleString()}</td>
                  <td>{c.leads.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
