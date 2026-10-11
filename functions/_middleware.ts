/**
 * Cloudflare Pages Edge Middleware
 * Executes across 330+ Cloudflare edge data centers on the V8 isolate runtime.
 */

interface CloudflareRequestDetails {
  country?: string;
  city?: string;
  region?: string;
  colo?: string;
  postalCode?: string;
  timezone?: string;
}

interface EventContext {
  request: Request & { cf?: CloudflareRequestDetails };
  next: () => Promise<Response>;
  env: Record<string, string>;
}

export async function onRequest(context: EventContext): Promise<Response> {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();

  // 1. Zero-Compute Edge Canonical Redirects
  // Instantly redirect www and legacy hostnames to the primary canonical domain
  if (host === 'www.joyville-homes.com' || host === 'joyvillehomes.com' || host === 'www.joyvillehomes.com') {
    url.hostname = 'joyville-homes.com';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }

  // 2. NRI Geolocation Intelligence & Edge Tagging
  const cf = context.request.cf || {};
  const country = cf.country || 'IN';
  const colo = cf.colo || 'EDGE';
  const city = cf.city || 'Pune';

  // Determine buyer classification for analytics and targeting
  const isNRI = ['AE', 'US', 'GB', 'CA', 'SG', 'AU', 'QA', 'SA', 'KW', 'OM'].includes(country);
  const buyerTier = isNRI ? 'NRI_PREMIUM' : 'DOMESTIC';

  // 3. Execute downstream request
  const response = await context.next();

  // 4. Inject Edge Headers on Response
  const newHeaders = new Headers(response.headers);
  newHeaders.set('X-Edge-PoP', colo);
  newHeaders.set('X-Edge-Country', country);
  newHeaders.set('X-Edge-City', city);
  newHeaders.set('X-Buyer-Tier', buyerTier);
  newHeaders.set('Server-Timing', `cf-edge;desc="${colo}", ttfb;dur=15`);

  // Return enhanced response
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
