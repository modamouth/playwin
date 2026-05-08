"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/Nav";

export default function NewCampaignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    clientName: "",
    campaignName: "",
    gameType: "spin",
    status: "draft",
    primaryColour: "#d5293f",
    campaignToken: "",
    prizeMessage: ""
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create campaign");
      }

      const data = await response.json();
      router.push("/campaigns");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Nav />
      <main className="container" style={{ padding: "32px 0" }}>
        <h1>Create Campaign</h1>
        {error && <p style={{ color: "red", marginBottom: 16 }}>{error}</p>}
        <form className="card grid grid-2" onSubmit={handleSubmit}>
          <label>
            Client name
            <input
              className="input"
              placeholder="Fishaways Namibia"
              value={formData.clientName}
              onChange={(e) => handleChange("clientName", e.target.value)}
              required
            />
          </label>
          <label>
            Campaign name
            <input
              className="input"
              placeholder="Fresh Flavour Maze"
              value={formData.campaignName}
              onChange={(e) => handleChange("campaignName", e.target.value)}
              required
            />
          </label>
          <label>
            Game type
            <select
              value={formData.gameType}
              onChange={(e) => handleChange("gameType", e.target.value)}
            >
              <option value="spin">spin</option>
              <option value="quiz">quiz</option>
              <option value="scratch">scratch</option>
              <option value="maze">maze</option>
              <option value="catch">catch</option>
              <option value="runner">runner</option>
            </select>
          </label>
          <label>
            Status
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="draft">draft</option>
              <option value="active">active</option>
              <option value="paused">paused</option>
              <option value="archived">archived</option>
            </select>
          </label>
          <label>
            Primary colour
            <input
              className="input"
              placeholder="#d5293f"
              value={formData.primaryColour}
              onChange={(e) => handleChange("primaryColour", e.target.value)}
            />
          </label>
          <label>
            Campaign token
            <input
              className="input"
              placeholder="fishaways-maze-may2026"
              value={formData.campaignToken}
              onChange={(e) => handleChange("campaignToken", e.target.value)}
              required
            />
          </label>
          <label style={{ gridColumn: "1 / -1" }}>
            Prize / campaign message
            <textarea
              rows={4}
              placeholder="Stand a chance to win a N$500 voucher."
              value={formData.prizeMessage}
              onChange={(e) => handleChange("prizeMessage", e.target.value)}
            />
          </label>
          <div style={{ gridColumn: "1 / -1" }}>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Save Campaign"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
