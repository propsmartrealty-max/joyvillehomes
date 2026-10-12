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

interface EdgeProjectInfo {
  name: string;
  title: string;
  description: string;
  lowPrice: number;
  highPrice: number;
  rera: string;
  placename: string;
  lat: number;
  lng: number;
  reviews: number;
  image: string;
  status: 'InStock' | 'PreOrder';
  propertyType: string;
}

const PUNE_PROJECTS_EDGE_CATALOG: Record<string, EdgeProjectInfo> = {
  'joyville-vyomora-hinjewadi': {
    name: 'Shapoorji Pallonji Joyville Vyomora Hinjewadi',
    title: 'Joyville Vyomora',
    description: 'Brand New Launch 25-Acre Master Community in Hinjewadi Phase 1, Pune. 2, 3 BHK & Duplex residences from ₹88.19 L with 48+ lifestyle amenities and 32,000 sq ft clubhouse.',
    lowPrice: 8819000,
    highPrice: 18500000,
    rera: 'PR1260002600999',
    placename: 'Hinjewadi Phase 1, Pune, Maharashtra',
    lat: 18.5913,
    lng: 73.7389,
    reviews: 1280,
    image: 'https://joyville-homes.com/images/projects/vyomora/desktop_banner.webp',
    status: 'PreOrder',
    propertyType: '2, 3 BHK & Duplex'
  },
  'joyville-sensorium-hinjewadi': {
    name: 'Shapoorji Pallonji Joyville Sensorium Hinjewadi',
    title: 'Joyville Sensorium',
    description: 'Biophilic Luxury 2 & 3 BHK residences across 10.5 acres with 75% open spaces, 2.8-acre sunken garden, and 5D sensorial park in Hinjewadi Phase 1, Pune.',
    lowPrice: 11000000,
    highPrice: 14500000,
    rera: 'P52100027234',
    placename: 'Off Maan Village Road, Hinjewadi Phase 1, Pune',
    lat: 18.5913,
    lng: 73.7389,
    reviews: 940,
    image: 'https://joyville-homes.com/images/joyville_sensorium_projectcard.webp',
    status: 'InStock',
    propertyType: '2 & 3 BHK Luxury Apartments'
  },
  'joyville-hadapsar-annexe-pune': {
    name: 'Shapoorji Pallonji Joyville Hadapsar Annexe',
    title: 'Joyville Hadapsar Annexe',
    description: '21-Acre Master Community with Ready to Move options in Shewalewadi, Hadapsar, Pune. 35,000 sq. ft. clubhouse and 8.85 acres of Central Park amenities.',
    lowPrice: 6500000,
    highPrice: 9500000,
    rera: 'P52100026451',
    placename: 'Shewalewadi, Hadapsar, Pune',
    lat: 18.4967,
    lng: 73.9417,
    reviews: 1420,
    image: 'https://joyville-homes.com/images/joyville_hadapsar_projectcard.webp',
    status: 'InStock',
    propertyType: '1, 2 & 3 BHK Flats'
  },
  'joyville-celestia-hadapsar': {
    name: 'Shapoorji Pallonji Joyville Celestia Hadapsar',
    title: 'Joyville Celestia',
    description: 'Vastu-compliant 2 & 3 BHK celestial homes in Hadapsar Annexe, Shewalewadi, Pune. Excellent connectivity to Magarpatta City and SP Infocity.',
    lowPrice: 8500000,
    highPrice: 12500000,
    rera: 'P52100048338',
    placename: 'Shewalewadi, Hadapsar, Pune',
    lat: 18.4967,
    lng: 73.9417,
    reviews: 650,
    image: 'https://joyville-homes.com/images/joyville_celestia_projectcard.webp',
    status: 'PreOrder',
    propertyType: '2 & 3 BHK Apartments'
  },
  'joyville-skyluxe-hadapsar': {
    name: 'Shapoorji Pallonji Joyville Skyluxe Edition Hadapsar',
    title: 'Joyville Skyluxe Edition',
    description: 'Exclusive 3 BHK sky villas with Italian marble finishes and expansive private decks in Hadapsar Annexe, Pune by Shapoorji Pallonji.',
    lowPrice: 14000000,
    highPrice: 19500000,
    rera: 'P52100048338',
    placename: 'Shewalewadi, Hadapsar, Pune',
    lat: 18.4967,
    lng: 73.9417,
    reviews: 480,
    image: 'https://joyville-homes.com/images/joyville_hadapsar_projectcard.webp',
    status: 'PreOrder',
    propertyType: '3 BHK Ultra-Luxury Residences'
  },
  'wildernest-sp-kingstown-pune': {
    name: 'Wildernest at SP Kingstown Pune by Shapoorji Pallonji',
    title: 'Wildernest at SP Kingstown',
    description: 'Low-density vertical sanctuary of 3 & 4 BHK luxury residences, villaments, and villas nestled in centuries-old mango orchards across 11 acres in the 200-acre SP Kingstown township, Hadapsar along Pune-Solapur Highway.',
    lowPrice: 18400000,
    highPrice: 27500000,
    rera: 'P52100052683',
    placename: 'SP Kingstown, Shewalewadi Road, Hadapsar, Pune',
    lat: 18.5030,
    lng: 73.9712,
    reviews: 420,
    image: 'https://joyville-homes.com/images/projects/wildernest/desktop_banner.webp',
    status: 'PreOrder',
    propertyType: '3 & 4 BHK Luxury Residences, Villaments & Villas'
  },
  'vanaha-golfland-pune': {
    name: 'Shapoorji Pallonji Vanaha Golfland Bavdhan',
    title: 'Vanaha Golfland',
    description: 'Ultra-luxury golf-facing residences overlooking Oxford Golf Resort in Bavdhan, Pune. Part of the 1,000-acre Vanaha master township with 90+ amenities.',
    lowPrice: 15500000,
    highPrice: 25000000,
    rera: 'P52100052531',
    placename: 'Bavdhan, Near Oxford Golf Resort, Pune',
    lat: 18.5130,
    lng: 73.7699,
    reviews: 520,
    image: 'https://joyville-homes.com/images/dl_vanaha-pune.jpg',
    status: 'PreOrder',
    propertyType: '2, 3 & 4 BHK Golf Residences'
  },
  'vanaha-springs-pune': {
    name: 'Shapoorji Pallonji Vanaha Springs Bavdhan',
    title: 'Vanaha Springs',
    description: 'Nature-embraced 1, 2 & 3 BHK residences in Bavdhan, Western Pune. Minutes from Kothrud and Chandani Chowk with mountain panoramas.',
    lowPrice: 9500000,
    highPrice: 14000000,
    rera: 'P52100028031',
    placename: 'Bavdhan, Near Oxford Golf Resort, Pune',
    lat: 18.5130,
    lng: 73.7699,
    reviews: 780,
    image: 'https://joyville-homes.com/images/dl_vanaha-pune.jpg',
    status: 'InStock',
    propertyType: '1, 2 & 3 BHK Premium Flats'
  },
  'vanaha-pune': {
    name: 'Shapoorji Pallonji Vanaha Bavdhan 1000-Acre Township',
    title: 'Vanaha Bavdhan',
    description: 'One of Western Indias largest green urban townships in Bavdhan, Pune. 1,000 acres of hills, golf greenery, pristine air quality, and luxury residences.',
    lowPrice: 8200000,
    highPrice: 25000000,
    rera: 'P52100028031',
    placename: 'Bavdhan, Near Oxford Golf Resort, Pune',
    lat: 18.5130,
    lng: 73.7699,
    reviews: 1150,
    image: 'https://joyville-homes.com/images/dl_vanaha-pune.jpg',
    status: 'InStock',
    propertyType: '1, 2, 3 & 4 BHK Township Residences'
  },
  'shapoorji-treetopia-pune': {
    name: 'Shapoorji Pallonji Treetopia Pune Growth Corridor',
    title: 'Shapoorji Pallonji Treetopia',
    description: 'Spread over ~105 acres in Jadhavwadi nestled between hills on three sides, Treetopia offers bespoke NA residential villa plots from 1,800 to 5,000+ sq. ft. centred around a 25-acre lake, 10 mins from proposed Purandar Airport.',
    lowPrice: 9900000,
    highPrice: 18400000,
    rera: 'PP1261012501803',
    placename: 'Jadhavwadi, Pune Growth Corridor, Maharashtra',
    lat: 18.3582,
    lng: 74.0041,
    reviews: 420,
    image: 'https://joyville-homes.com/images/projects/treetopia/desktop_banner.webp',
    status: 'InStock',
    propertyType: 'NA Residential Villa Plots (1,800 - 5,000+ Sq. Ft.)'
  }
};

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

    // 4b. Edge Next/Image Fallback Guard: redirect /_next/image requests to the raw static asset
    if (pathname === '/_next/image') {
      const targetUrl = url.searchParams.get('url');
      if (targetUrl) {
        const decoded = decodeURIComponent(targetUrl);
        const redirectUrl = decoded.startsWith('http') ? decoded : new URL(decoded, url.origin).toString();
        return Response.redirect(redirectUrl, 301);
      }
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

      const isProjectPage = pathname.startsWith('/projects/');
      const projectSlug = isProjectPage ? pathname.replace(/^\/projects\//, '').replace(/\/$/, '') : '';
      const matchedProject = projectSlug ? PUNE_PROJECTS_EDGE_CATALOG[projectSlug] : null;

      const geoPlacename = matchedProject ? matchedProject.placename : 'Pune, Hinjewadi, Hadapsar, Bavdhan';
      const geoPosition = matchedProject ? `${matchedProject.lat};${matchedProject.lng}` : '18.559385;73.723826';
      const geoICBM = matchedProject ? `${matchedProject.lat}, ${matchedProject.lng}` : '18.559385, 73.723826';

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
              'streetAddress': matchedProject ? matchedProject.placename : 'SP Infocity, Phursungi IT Park & Hinjewadi Phase 1',
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
          ...(matchedProject ? [
            {
              '@type': 'Product',
              '@id': `${canonicalUrl}#product`,
              'name': matchedProject.name,
              'description': matchedProject.description,
              'image': matchedProject.image,
              'mpn': matchedProject.rera,
              'sku': matchedProject.rera,
              'brand': {
                '@type': 'Brand',
                'name': 'Shapoorji Pallonji'
              },
              'offers': {
                '@type': 'AggregateOffer',
                'priceCurrency': 'INR',
                'lowPrice': matchedProject.lowPrice.toString(),
                'highPrice': matchedProject.highPrice.toString(),
                'offerCount': '100',
                'availability': `https://schema.org/${matchedProject.status}`,
                'itemCondition': 'https://schema.org/NewCondition',
                'priceValidUntil': '2026-12-31'
              },
              'aggregateRating': {
                '@type': 'AggregateRating',
                'ratingValue': '4.9',
                'reviewCount': matchedProject.reviews.toString(),
                'bestRating': '5',
                'worstRating': '1'
              }
            },
            {
              '@type': 'RealEstateListing',
              '@id': `${canonicalUrl}#listing`,
              'name': matchedProject.title,
              'description': matchedProject.description,
              'url': canonicalUrl,
              'image': matchedProject.image,
              'address': {
                '@type': 'PostalAddress',
                'addressLocality': matchedProject.placename,
                'addressRegion': 'Maharashtra',
                'addressCountry': 'IN'
              },
              'geo': {
                '@type': 'GeoCoordinates',
                'latitude': matchedProject.lat,
                'longitude': matchedProject.lng
              }
            }
          ] : [
            {
              '@type': 'Product',
              '@id': `${canonicalUrl}#product`,
              'name': 'Shapoorji Pallonji Joyville Homes Pune Master Collection',
              'description': 'Master portfolio of 10 premium residential projects across Hinjewadi, Hadapsar, Bavdhan, and Purandar by Shapoorji Pallonji Real Estate.',
              'brand': {
                '@type': 'Brand',
                'name': 'Shapoorji Pallonji'
              },
              'offers': {
                '@type': 'AggregateOffer',
                'priceCurrency': 'INR',
                'lowPrice': '6500000',
                'highPrice': '27500000',
                'offerCount': '1250',
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
          ])
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
<meta name="geo.placename" content="${geoPlacename}" />
<meta name="geo.position" content="${geoPosition}" />
<meta name="ICBM" content="${geoICBM}" />`,
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
