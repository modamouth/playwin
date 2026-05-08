"use client";

import { useMemo, useState } from "react";
import { Nav } from "@/components/Nav";
import { MetricCard } from "@/components/MetricCard";
import { campaigns } from "@/lib/mockData";
import Link from "next/link";

const monthOptions = ["all", "2026-03", "2026-04", "2026-05"];

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState("all");

  const filteredCampaigns = useMemo(() => {
    if (selectedMonth === "all") {
      return campaigns.map((campaign) => ({
        ...campaign,
        monthPlays: campaign.plays,
        monthLeads: campaign.leads,
      }));
    }

    return campaigns.map((campaign) => {
      const monthData = campaign.monthlyStats?.find((item) => item.month === selectedMonth);
      return {
        ...campaign,
        monthPlays: monthData?.plays ?? 0,
        monthLeads: monthData?.leads ?? 0,
      };
    });
  }, [selectedMonth]);

  const totalPlays = filteredCampaigns.reduce((sum, campaign) => sum + (campaign.monthPlays ?? 0), 0);
  const totalLeads = filteredCampaigns.reduce((sum, campaign) => sum + (campaign.monthLeads ?? 0), 0);
  const conversion = totalPlays > 0 ? ((totalLeads / totalPlays) * 100).toFixed(1) + "%" : "0.0%";

  return (
    <>
      <Nav />
      <main className="container" style={{ padding: "32px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <h1>Dashboard</h1>
            <p style={{ color: "var(--muted)", marginTop: 6 }}>
              Viewing campaign metrics for {selectedMonth === "all" ? "all time" : selectedMonth}.
            </p>
          </div>
          <label style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "right" }}>
            Filter by month
            <select
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
              style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ccc" }}
            >
              {monthOptions.map((month) => (
                <option key={month} value={month}>
                  {month === "all" ? "All time" : month}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid grid-3" style={{ marginTop: 20 }}>
          <MetricCard title="Total plays" value={totalPlays.toLocaleString()} hint="Across selected month" />
          <MetricCard title="Leads captured" value={totalLeads.toLocaleString()} hint="Form submissions" />
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
              {filteredCampaigns.map((c) => (
                <tr key={c.id}>
                  <td><Link href={`/campaigns/${c.id}`}>{c.name}</Link></td>
                  <td>{c.client}</td>
                  <td>{c.type}</td>
                  <td><span className="badge">{c.status}</span></td>
                  <td>{(c.monthPlays ?? 0).toLocaleString()}</td>
                  <td>{(c.monthLeads ?? 0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
