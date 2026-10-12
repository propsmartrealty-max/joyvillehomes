import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.joyvillehomes.com',
      },
      {
        protocol: 'https',
        hostname: 'joyvillehomes.com',
      },
      {
        protocol: 'https',
        hostname: 'www.shapoorjipallonji.com',
      },
      {
        protocol: 'https',
        hostname: 'shapoorjipallonji.com',
      },
      {
        protocol: 'https',
        hostname: 'shapoorjirealestate.com',
      },
      {
        protocol: 'https',
        hostname: 'www.joyville-homes.com',
      },
      {
        protocol: 'https',
        hostname: 'joyville-homes.com',
      }
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy', value: "default-src 'self' https://joyville-homes.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https: http:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://joyville-homes.com https://www.google-analytics.com https://formsubmit.co https://api.whatsapp.com https://region1.google-analytics.com; frame-src 'self' https://www.google.com; object-src 'none'; base-uri 'self'" },
          { key: 'X-Robots-Tag', value: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1, notranslate' },
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400' },
          { key: 'Link', value: '<https://www.googletagmanager.com>; rel=preconnect, <https://connect.facebook.net>; rel=preconnect, <https://fonts.googleapis.com>; rel=preconnect' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Download-Options', value: 'noopen' },
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
          { key: 'Expect-CT', value: 'max-age=86400, enforce' },
          { key: 'Timing-Allow-Origin', value: '*' },
          { key: 'Server-Timing', value: 'edge;dur=1, origin;dur=10' },
          { key: 'NEL', value: '{"report_to":"default","max_age":31536000,"include_subdomains":true}' },
          { key: 'Report-To', value: '{"group":"default","max_age":31536000,"endpoints":[{"url":"https://joyville-homes.com/api/reporting"}],"include_subdomains":true}' },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, immutable' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'joyvillehomes.com' }],
        destination: 'https://joyville-homes.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.joyvillehomes.com' }],
        destination: 'https://joyville-homes.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.joyville-homes.com' }],
        destination: 'https://joyville-homes.com/:path*',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en-us',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en-us/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/properties/residential-projects-near-hinjewadi-phase-1',
        destination: '/locality/hinjewadi',
        permanent: true,
      },
      {
        source: '/properties/2-bhk-flats-in-hinjewadi-pune',
        destination: '/properties/2-bhk-flats-in-hinjewadi',
        permanent: true,
      },
      {
        source: '/properties/property-near-sp-infocity-phursungi',
        destination: '/properties/flats-near-sp-infocity-pune',
        permanent: true,
      },
      {
        source: '/projects/joyville-celestia-hinjewadi',
        destination: '/projects/joyville-celestia-hadapsar',
        permanent: true,
      },
      {
        source: '/projects/vanaha-springs-bavdhan',
        destination: '/projects/vanaha-springs-pune',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
