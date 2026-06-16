export async function GET() {
    const res = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/your_table?select=id&limit=1`,
      {
        headers: {
          apikey: process.env.SUPABASE_ANON_KEY,
        },
      }
    );
  
    return Response.json({
      status: res.status,
    });
  }