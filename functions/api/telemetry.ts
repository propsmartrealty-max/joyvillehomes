/**
 * Cloudflare Edge Worker API: /api/telemetry
 * Lightweight edge logging endpoint for client errors.
 */

export async function onRequestPost(context: { request: Request }): Promise<Response> {
  try {
    const payload = await context.request.json();
    console.error('🚨 [EDGE_TELEMETRY]', JSON.stringify(payload));
    return new Response(JSON.stringify({ status: 'logged', edge: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid payload' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
