"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const validUsername = "skytouch";
const validPassword = "skytouch";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === validUsername && password === validPassword) {
      router.push("/dashboard");
    } else {
      setError("Invalid username or password. Use skytouch / skytouch.");
    }
  };

  return (
    <main className="container" style={{ padding: "55px 0" }}>
      <section className="card" style={{ maxWidth: 520, margin: "0 auto", padding: 40 }}>
        <h1>Admin Login</h1>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>
          Enter the admin credentials to access the dashboard.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username" style={{ display: "block", marginBottom: 8 }}>
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            style={{ width: "100%", padding: "12px 14px", marginBottom: 16, borderRadius: 8, border: "1px solid #ccc" }}
          />

          <label htmlFor="password" style={{ display: "block", marginBottom: 8 }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            style={{ width: "100%", padding: "12px 14px", marginBottom: 16, borderRadius: 8, border: "1px solid #ccc" }}
          />

          {error && <p style={{ color: "#ff6b6b", marginBottom: 16 }}>{error}</p>}

          <button
            type="submit"
            style={{ width: "100%", padding: "14px", borderRadius: 8, border: "none", background: "#111", color: "white" }}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: 24, color: "var(--muted)" }}>
          Admin account: <strong>skytouch</strong> / <strong>skytouch</strong>
        </p>
      </section>
    </main>
  );
}
