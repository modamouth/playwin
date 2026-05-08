export function MetricCard({ title, value, hint }: { title: string; value: string | number; hint?: string }) {
  return (
    <div className="card">
      <div style={{ color: "var(--muted)", fontSize: 14 }}>{title}</div>
      <div style={{ fontSize: 34, fontWeight: 800, marginTop: 10 }}>{value}</div>
      {hint ? <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 6 }}>{hint}</div> : null}
    </div>
  );
}
