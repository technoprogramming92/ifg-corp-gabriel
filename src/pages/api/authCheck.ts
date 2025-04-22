// src/pages/api/authCheck.ts
export async function POST({ request }: { request: Request }) {
    const { password } = await request.json();
  
    const correctPassword = import.meta.env.PROTECTED_PASSWORD;
  
    if (password === correctPassword) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  