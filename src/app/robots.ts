import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const siteUrl = 'https://joyville-homes.com';

    // Disallow parameters and private paths to prevent crawl waste, while NEVER blocking static assets
    const commonDisallow = [
        '/api/',
        '/admin/',
        '/cgi-bin/',
        // Tracking & query params
        '/*?*utm_*',
        '/*?*fbclid=*',
        '/*?*gclid=*',
        '/*?*sort=*',
        '/*?*filter=*',
        '/*?*ref=*',
        '/*?*action=*',
        '/*?*session=*',
        '/*?*search=*'
    ];

    return {
        rules: [
            // Standard Global Rules
            {
                userAgent: '*',
                allow: ['/', '/_next/static/', '/_next/image'],
                disallow: commonDisallow,
            },
            // Primary Search Engines (Google/Bing)
            {
                userAgent: ['Googlebot', 'Googlebot-Image', 'Googlebot-Video', 'Googlebot-News', 'bingbot', 'YandexBot', 'Slurp'],
                allow: ['/', '/_next/static/', '/_next/image'],
                disallow: commonDisallow,
            },
            // Google Advanced Inspection & AI Overviews
            {
                userAgent: ['Google-InspectionTool', 'Google-Extended'],
                allow: ['/', '/_next/static/', '/_next/image'],
                disallow: ['/api/', '/admin/'], // Ensure full rendering evaluation of JS/CSS
            },
            // AI Agents & LLM Scrapers (Throttled but allowed for knowledge graph)
            {
                userAgent: ['GPTBot', 'ChatGPT-User', 'anthropic-ai', 'ClaudeBot', 'OAI-SearchBot', 'PerplexityBot', 'YouBot'], 
                allow: ['/', '/ai-manifest.json', '/_next/static/'],
                disallow: commonDisallow,
                crawlDelay: 2, // Protect server bandwidth
            },
            // Block invasive/low-value scrapers (keep Twitterbot/social crawlers allowed)
            {
                userAgent: ['CCBot', 'Omigili', 'GPTBot-Mobile', 'PetalBot', 'ImagesiftBot'],
                disallow: ['/'],
            }
        ],
        sitemap: [
            `${siteUrl}/sitemap.xml`,
            `${siteUrl}/image-sitemap.xml`,
            `${siteUrl}/aggregator-feed.xml`
        ],
        host: siteUrl,
    };
}
