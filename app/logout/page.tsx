"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function LogoutPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Signing out...");

  useEffect(() => {
    async function signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setMessage(error.message);
        return;
      }
      router.replace("/login");
    }

    signOut();
  }, [router]);

  return (
    <main className="container" style={{ padding: "55px 0" }}>
      <section className="card" style={{ maxWidth: 520, margin: "0 auto", padding: 40 }}>
        <h1>Logging out</h1>
        <p style={{ color: "var(--muted)", marginTop: 16 }}>{message}</p>
      </section>
    </main>
  );
}
