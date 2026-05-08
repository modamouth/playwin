"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const defaultLoginEmail = process.env.NEXT_PUBLIC_DEFAULT_LOGIN_EMAIL || "";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(defaultLoginEmail);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/dashboard");
  };

  return (
    <main className="container" style={{ padding: "55px 0" }}>
      <section className="card" style={{ maxWidth: 520, margin: "0 auto", padding: 40 }}>
        <h1>Login</h1>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>
          Use the default login email and continue to the dashboard.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" style={{ display: "block", marginBottom: 8 }}>
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            style={{ width: "100%", padding: "12px 14px", marginBottom: 16, borderRadius: 8, border: "1px solid #ccc" }}
          />

          <button
            type="submit"
            style={{ width: "100%", padding: "14px", borderRadius: 8, border: "none", background: "#111", color: "white" }}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: 24, color: "var(--muted)" }}>
          You will be redirected to the dashboard.
        </p>
      </section>
    </main>
  );
}
