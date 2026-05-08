import { Nav } from "@/components/Nav";

export default function NewCampaignPage() {
  return (
    <>
      <Nav />
      <main className="container" style={{ padding: "32px 0" }}>
        <h1>Create Campaign</h1>
        <form className="card grid grid-2">
          <label>
            Client name
            <input className="input" placeholder="Fishaways Namibia" />
          </label>
          <label>
            Campaign name
            <input className="input" placeholder="Fresh Flavour Maze" />
          </label>
          <label>
            Game type
            <select>
              <option>spin</option>
              <option>quiz</option>
              <option>scratch</option>
              <option>maze</option>
              <option>catch</option>
              <option>runner</option>
            </select>
          </label>
          <label>
            Status
            <select>
              <option>draft</option>
              <option>active</option>
              <option>paused</option>
              <option>archived</option>
            </select>
          </label>
          <label>
            Primary colour
            <input className="input" placeholder="#d5293f" />
          </label>
          <label>
            Campaign token
            <input className="input" placeholder="fishaways-maze-may2026" />
          </label>
          <label style={{ gridColumn: "1 / -1" }}>
            Prize / campaign message
            <textarea rows={4} placeholder="Stand a chance to win a N$500 voucher." />
          </label>
          <div style={{ gridColumn: "1 / -1" }}>
            <button className="btn" type="button">Save Campaign</button>
          </div>
        </form>
      </main>
    </>
  );
}
