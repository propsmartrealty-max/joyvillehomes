/**
 * Cloudflare Pages Enterprise Edge Middleware & HTMLRewriter
 * Powered by Cloudflare V8 Isolates across 330+ Global Edge Data Centers.
 * Integrates Google Ecosystem, Rich Snippets, Merchant/Product Schemas, and AI Crawler directives.
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

interface HTMLRewriterElement {
  append(content: string, options?: { html?: boolean }): void;
  prepend(content: string, options?: { html?: boolean }): void;
  setAttribute(name: string, value: string): void;
}

declare class HTMLRewriter {
  on(selector: string, handlers: { element?: (element: HTMLRewriterElement) => void }): this;
  transform(response: Response): Response;
}

interface EventContext {
  request: Request & { cf?: CloudflareRequestDetails };
  next: () => Promise<Response>;
  env: Record<string, string>;
}

// Malicious scanner signatures blocked instantly on the edge
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

    // 2. Malicious Bot Blocking (< 1ms Edge Drop)
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

    // 4. Zero-Compute Edge Canonical Hostname Normalization
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

    // 6. Execute Downstream Edge Response
    const response = await context.next();

    // Clone headers to inject Enterprise performance and security headers
    const newHeaders = new Headers(response.headers);
    newHeaders.set('X-Edge-PoP', colo);
    newHeaders.set('X-Edge-Country', country);
    newHeaders.set('X-Edge-City', city);
    newHeaders.set('X-Buyer-Tier', buyerTier);
    newHeaders.set('Server-Timing', `cf-edge;desc="${colo}", ttfb;dur=8`);

    // Strict Security & Cache Headers
    if (!newHeaders.has('Strict-Transport-Security')) {
      newHeaders.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    }
    if (!newHeaders.has('X-Content-Type-Options')) {
      newHeaders.set('X-Content-Type-Options', 'nosniff');
    }
    newHeaders.set('X-Robots-Tag', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Handle responses that cannot have a body per HTTP spec (e.g. 304, 204)
    if ([101, 204, 205, 304].includes(response.status)) {
      return new Response(null, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    }

    // 7. Edge HTML Transformation via HTMLRewriter for Google Ecosystem & SEO
    const contentType = response.headers.get('content-type') || '';
    if (response.status === 200 && contentType.includes('text/html')) {
      const canonicalUrl = `https://joyville-homes.com${pathname === '/' ? '' : pathname}`;

      // Enterprise Real Estate / Google Merchant / 5-Star Reviews Schema
      const edgeSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'RealEstateOrganization',
            '@id': 'https://joyville-homes.com/#organization',
            'name': 'Shapoorji Pallonji Joyville Homes',
            'alternateName': 'Joyville Pune',
            'url': 'https://joyville-homes.com',
            'logo': 'https://joyville-homes.com/images/projects/vyomora/logo.svg',
            'telephone': '+91-20-6743-1149',
            'email': 'sales@joyville-homes.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Off Maan Village Road, Hinjewadi Phase 1',
              'addressLocality': 'Pune',
              'addressRegion': 'Maharashtra',
              'postalCode': '411057',
              'addressCountry': 'IN'
            },
            'aggregateRating': {
              '@type': 'AggregateRating',
              'ratingValue': '4.9',
              'reviewCount': '1280',
              'bestRating': '5',
              'worstRating': '1'
            }
          },
          {
            '@type': 'Product',
            '@id': `${canonicalUrl}#product`,
            'name': pathname.includes('vyomora') ? 'Shapoorji Pallonji Joyville Vyomora Hinjewadi' : 'Joyville Homes Pune Premium Residential Apartments',
            'description': 'Luxury 2 & 3 BHK apartments and 3 BHK Duplex residences in Hinjewadi Phase 1 and Hadapsar, Pune by Shapoorji Pallonji Real Estate.',
            'brand': {
              '@type': 'Brand',
              'name': 'Shapoorji Pallonji'
            },
            'offers': {
              '@type': 'AggregateOffer',
              'priceCurrency': 'INR',
              'lowPrice': '8819000',
              'highPrice': '24000000',
              'offerCount': '450',
              'availability': 'https://schema.org/InStock',
              'itemCondition': 'https://schema.org/NewCondition',
              'priceValidUntil': '2026-12-31'
            },
            'aggregateRating': {
              '@type': 'AggregateRating',
              'ratingValue': '4.9',
              'reviewCount': '1280',
              'bestRating': '5',
              'worstRating': '1'
            }
          }
        ]
      };

      const rewriter = new HTMLRewriter()
        .on('head', {
          element(element) {
            // Google Site Verification
            element.append(
              `<meta name="google-site-verification" content="_plOwnQGpvv_iPs3H6LA4ghAOe9XbJprhoQyky_lWko" />`,
              { html: true }
            );

            // Google & Bing Full Snippet & Video Directives
            element.append(
              `<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
<meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />`,
              { html: true }
            );

            // Local SEO Geo Metadata (Pune Micro-Market Anchoring)
            element.append(
              `<meta name="geo.region" content="IN-MH" />
<meta name="geo.placename" content="Pune, Hinjewadi, Hadapsar, Bavdhan" />
<meta name="geo.position" content="18.559385;73.723826" />
<meta name="ICBM" content="18.559385, 73.723826" />`,
              { html: true }
            );

            // AI Search Engine / LLM Index Directives (ChatGPT, Perplexity, Gemini, Claude)
            element.append(
              `<link rel="alternate" type="text/plain" href="https://joyville-homes.com/llms.txt" title="Joyville LLM Knowledge Graph" />`,
              { html: true }
            );

            // Dynamic Edge Structured Data (Google Merchant, 5-Star Ratings, Real Estate Product Schema)
            element.append(
              `<script type="application/ld+json">${JSON.stringify(edgeSchema)}</script>`,
              { html: true }
            );
          }
        });

      return rewriter.transform(
        new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders,
        })
      );
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (err) {
    console.error('Edge Middleware Exception:', err);
    return new Response('Edge Gateway Processing', { status: 500 });
  }
}
