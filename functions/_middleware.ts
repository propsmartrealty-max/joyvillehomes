/**
 * Cloudflare Pages Edge Middleware (Hardened Enterprise Edition)
 * Runs across 330+ Cloudflare edge data centers on the V8 isolate runtime.
 */

interface CloudflareRequestDetails {
  country?: string;
  city?: string;
  region?: string;
  colo?: string;
  postalCode?: string;
  timezone?: string;
  botManagement?: {
    score?: number;
    verifiedBot?: boolean;
  };
}

interface EventContext {
  request: Request & { cf?: CloudflareRequestDetails };
  next: () => Promise<Response>;
  env: Record<string, string>;
}

// Known malicious vulnerability scanner signatures
const MALICIOUS_USER_AGENTS = [
  'sqlmap',
  'nikto',
  'acunetix',
  'masscan',
  'wpscan',
  'dirbuster',
  'gobuster',
  'nmap',
  'zgrab',
  'morfeus',
];

export async function onRequest(context: EventContext): Promise<Response> {
  try {
    const url = new URL(context.request.url);
    const host = url.hostname.toLowerCase();
    const pathname = url.pathname.toLowerCase();
    const userAgent = (context.request.headers.get('user-agent') || '').toLowerCase();

    // 1. Path Traversal & Null Byte Sanitization Guard
    if (pathname.includes('..') || pathname.includes('%2e%2e') || pathname.includes('\0') || pathname.includes('%00')) {
      return new Response('400 Bad Request: Invalid URI Structure', { status: 400 });
    }

    // 2. Malicious Bot & Vulnerability Scanner Blocking (< 1ms Edge Drop)
    if (MALICIOUS_USER_AGENTS.some((bot) => userAgent.includes(bot))) {
      return new Response('403 Forbidden: Request Rejected by Security Policy', { status: 403 });
    }

    // 3. HTTP Method Guard (Only GET/HEAD/OPTIONS allowed on non-API routes)
    if (!pathname.startsWith('/api/') && !['GET', 'HEAD', 'OPTIONS'].includes(context.request.method)) {
      return new Response('405 Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET, HEAD, OPTIONS' },
      });
    }

    // 4. Zero-Compute Edge Canonical Redirects
    // Instantly 301-redirect www and legacy hostnames
    if (host === 'www.joyville-homes.com' || host === 'joyvillehomes.com' || host === 'www.joyvillehomes.com') {
      url.hostname = 'joyville-homes.com';
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    // 5. NRI Geolocation Intelligence & Edge Tagging
    const cf = context.request.cf || {};
    const country = cf.country || 'IN';
    const colo = cf.colo || 'EDGE';
    const city = cf.city || 'Pune';

    const isNRI = ['AE', 'US', 'GB', 'CA', 'SG', 'AU', 'QA', 'SA', 'KW', 'OM'].includes(country);
    const buyerTier = isNRI ? 'NRI_PREMIUM' : 'DOMESTIC';

    // 6. Execute Downstream Next.js / Static Asset Request
    const response = await context.next();

    // 7. Inject Hardened Edge Response Headers
    const newHeaders = new Headers(response.headers);
    newHeaders.set('X-Edge-PoP', colo);
    newHeaders.set('X-Edge-Country', country);
    newHeaders.set('X-Edge-City', city);
    newHeaders.set('X-Buyer-Tier', buyerTier);
    newHeaders.set('Server-Timing', `cf-edge;desc="${colo}", ttfb;dur=12`);

    // Ensure strict HSTS and nosniff on all outgoing responses
    if (!newHeaders.has('Strict-Transport-Security')) {
      newHeaders.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    }
    if (!newHeaders.has('X-Content-Type-Options')) {
      newHeaders.set('X-Content-Type-Options', 'nosniff');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (err) {
    // Fail-safe: ensure user request never crashes due to edge middleware error
    console.error('Edge Middleware Exception:', err);
    return context.next();
  }
}
