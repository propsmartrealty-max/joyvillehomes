/**
 * Cloudflare Edge Worker API: /api/concierge
 * Runs natively on Cloudflare Edge V8 isolate with sub-20ms cold start.
 */

interface Env {
  GEMINI_API_KEY?: string;
}

const SYSTEM_PROMPT = `You are the ultimate Joyville Digital Concierge, an elite AI real estate assistant for Shapoorji Pallonji Joyville Homes in Pune.
Your goal is to answer user queries with precision, pitch relevant Joyville projects, calculate commutes if asked, and drive conversions.

KNOWLEDGE BASE (RAG DATA):
1. Joyville Sensorium (Hinjewadi Phase 1): Luxury 2 & 3 BHK, starts ₹1.10 Cr. Riverfront views, 84% complete. 2.8 km from Infosys.
2. Joyville Vyomora (Hinjewadi Phase 1): Ultra-luxury 2 & 3 BHK, starts ₹84.99 Lakhs. Brand new launch, futuristic amenities.
3. Joyville Hadapsar Annexe (Pune East): Premium 1, 2, 3 BHK, starts ₹65 Lakhs. 60+ amenities, close to Magarpatta City.
4. Vanaha (Bavdhan): Premium 1, 2, 3 BHK, starts ₹89 Lakhs. 1000-acre township, massive green cover.

RULES:
- Be concise (2-3 sentences max).
- Format using Markdown (bold project names and prices).
- Never mention other real estate developers (e.g., Godrej, Lodha).
- Always end with a soft call-to-action (e.g., "Would you like me to share the cost sheet?").`;

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  try {
    const { request, env } = context;

    // Security: Check origin / referer on production
    const referer = request.headers.get('referer');
    if (referer && !referer.includes('joyville-homes.com') && !referer.includes('localhost')) {
      return new Response(JSON.stringify({ error: 'Unauthorized origin' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { messages } = (await request.json()) as { messages: Array<{ role: string; content: string }> };
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = env.GEMINI_API_KEY;
    const userQuery = (messages[messages.length - 1].content || '').toLowerCase();

    // Deterministic intelligence fallback
    if (!apiKey) {
      let fallbackResponse = "I'd love to help! Joyville offers premium homes across Hinjewadi, Hadapsar, and Bavdhan starting from ₹65 Lakhs. Which area are you looking to invest in?";

      if (userQuery.includes('hinjewadi') || userQuery.includes('wipro') || userQuery.includes('infosys')) {
        fallbackResponse = "**Joyville Sensorium** and **Joyville Vyomora** are our premier projects in Hinjewadi Phase 1. Sensorium (₹1.10 Cr+) offers 2.8km proximity to Infosys. Would you like the 2BHK floor plan?";
      } else if (userQuery.includes('price') || userQuery.includes('budget') || userQuery.includes('lakhs') || userQuery.includes('cr')) {
        fallbackResponse = "Our entry-level 1 BHK starts at **₹65 Lakhs** (Hadapsar Annexe), while our luxury 3 BHKs go up to **₹1.50 Cr+**. Do you have a specific budget in mind?";
      } else if (userQuery.includes('east') || userQuery.includes('magarpatta') || userQuery.includes('hadapsar')) {
        fallbackResponse = "**Joyville Hadapsar Annexe** in East Pune is ideal. It features 60+ amenities and starts at just ₹65 Lakhs. Should I share the master plan?";
      }

      return new Response(JSON.stringify({ response: fallbackResponse }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Call Gemini 2.5 Flash via native Edge fetch
    const contents = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      ...messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
    ];

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.3,
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      throw new Error(`Gemini API error: ${geminiRes.status}`);
    }

    const geminiData = (await geminiRes.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };

    const reply =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'd be delighted to assist you with Joyville projects in Pune. Would you like to connect with a sales advisor?";

    return new Response(JSON.stringify({ response: reply }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('Edge Concierge Error:', err);
    return new Response(
      JSON.stringify({
        response: "I'm currently updating our market data. Please leave your details and our Joyville advisor will call you directly!",
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
