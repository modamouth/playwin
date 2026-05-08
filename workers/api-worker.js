// Cloudflare Worker API stub for PlayWin.
// Bind these environment variables:
// SUPABASE_URL
// SUPABASE_SERVICE_ROLE_KEY

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === "/health") {
      return json({ ok: true, service: "playwin-api" }, corsHeaders);
    }

    if (url.pathname === "/event" && request.method === "POST") {
      const body = await request.json();

      // TODO:
      // 1. Validate campaign token.
      // 2. Rate limit by IP.
      // 3. Insert into Supabase events table.
      // 4. If score/lead, insert into leads or leaderboard_entries.
      // 5. If voucher campaign, generate voucher server-side.

      return json({ ok: true, received: body }, corsHeaders);
    }

    if (url.pathname === "/leaderboard" && request.method === "GET") {
      const campaign = url.searchParams.get("campaign");
      // TODO: Fetch top 10 from Supabase.
      return json({
        campaign,
        rows: [
          { rank: 1, name: "Anna K.", score: 9850, time: "34s" },
          { rank: 2, name: "John M.", score: 9400, time: "38s" }
        ]
      }, corsHeaders);
    }

    return json({ error: "Not found" }, corsHeaders, 404);
  }
};

function json(data, headers = {}, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  });
}
