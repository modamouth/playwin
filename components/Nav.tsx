import Link from "next/link";

export function Nav() {
  return (
    <div className="container nav">
      <Link href="/" style={{ fontWeight: 800, color: "white" }}>PlayWin</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/campaigns">Campaigns</Link>
      <Link href="/campaigns/new">New Campaign</Link>
      <Link href="/demos">Demos</Link>
    </div>
  );
}
