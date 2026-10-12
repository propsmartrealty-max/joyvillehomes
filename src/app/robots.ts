import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const siteUrl = 'https://joyville-homes.com';

    // Disallow parameters to prevent infinite crawl spaces
    const commonDisallow = [
        '/_next/',
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
                allow: '/',
                disallow: commonDisallow,
            },
            // Primary Search Engines (Google/Bing)
            {
                userAgent: ['Googlebot', 'Googlebot-Image', 'Googlebot-Video', 'Googlebot-News', 'bingbot', 'YandexBot', 'Slurp'],
                allow: '/',
                disallow: commonDisallow,
            },
            // Google Advanced Inspection & AI Overviews
            {
                userAgent: ['Google-InspectionTool', 'Google-Extended'],
                allow: '/',
                disallow: ['/_next/', '/api/', '/admin/'], // Minimal blocks to allow full rendering evaluation
            },
            // AI Agents & LLM Scrapers (Throttled but allowed for knowledge graph)
            {
                userAgent: ['GPTBot', 'ChatGPT-User', 'anthropic-ai', 'ClaudeBot', 'OAI-SearchBot', 'PerplexityBot', 'YouBot'], 
                allow: ['/', '/ai-manifest.json'],
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
            `${siteUrl}/google-products.xml`,
            `${siteUrl}/aggregator-feed.xml`
        ],
        host: siteUrl,
    };
}
