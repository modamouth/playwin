export async function GET() {
  const csv = [
    "name,phone,email,score,source,date",
    "Anna K.,+26481******1,anna@example.com,9850,Facebook,2026-05-01",
    "John M.,+26481******2,john@example.com,9400,WhatsApp,2026-05-01",
    "Tangi N.,+26481******3,tangi@example.com,8950,QR Code,2026-05-02"
  ].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=campaign-leads.csv"
    }
  });
}
