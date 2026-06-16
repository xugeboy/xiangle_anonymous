export async function GET() {
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/confessions?select=id&limit=1`, {
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY!,
      },
    });
  
    return Response.json({ ok: true });
  }