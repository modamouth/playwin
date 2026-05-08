import { Nav } from "@/components/Nav";

const demos = [
  { name: "Spin & Win", path: "/games/spin-wheel/index.html?campaign=demo-spin" },
  { name: "Quiz Challenge", path: "/games/quiz/index.html?campaign=demo-quiz" }
];

export default function DemosPage() {
  return (
    <>
      <Nav />
      <main className="container" style={{ padding: "32px 0" }}>
        <h1>Demo Portfolio</h1>
        <p style={{ color: "var(--muted)" }}>
          These are starter demo pages. In production, host the /games folder on Cloudflare Pages.
        </p>
        <div className="grid grid-2">
          {demos.map((demo) => (
            <div className="card" key={demo.name}>
              <h2>{demo.name}</h2>
              <p style={{ color: "var(--muted)" }}>Reusable branded campaign template.</p>
              <a className="btn" href={demo.path} target="_blank">Open Demo</a>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
