#!/usr/bin/env node

/**
 * Enterprise Search Engine Ping & Instant IndexNow Dispatcher
 * Pings Google, Bing, and dispatches full project & PSEO URLs via IndexNow protocol.
 */

const SITE_URL = 'https://joyville-homes.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const INDEXNOW_KEY = '582cfba9a2c34255959929007f3bc6cf';
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

const PRIORITY_URLS = [
    `${SITE_URL}`,
    `${SITE_URL}/projects`,
    `${SITE_URL}/flats-in-pune`,
    `${SITE_URL}/insights`,
    `${SITE_URL}/pune-real-estate-market`,
    `${SITE_URL}/pune-real-estate-guide`,
    `${SITE_URL}/roi-calculator`,
    // Flagship Projects
    `${SITE_URL}/projects/joyville-vyomora-hinjewadi`,
    `${SITE_URL}/projects/joyville-sensorium-hinjewadi`,
    `${SITE_URL}/projects/joyville-hadapsar-annexe-pune`,
    `${SITE_URL}/projects/joyville-celestia-hadapsar`,
    `${SITE_URL}/projects/joyville-skyluxe-hadapsar`,
    `${SITE_URL}/projects/wildernest-sp-kingstown-pune`,
    `${SITE_URL}/projects/tree-clouds-sp-kingstown-pune`,
    `${SITE_URL}/projects/the-vastion-sp-kingstown-pune`,
    `${SITE_URL}/projects/vanaha-pune`,
    `${SITE_URL}/projects/vanaha-springs-pune`,
    `${SITE_URL}/projects/vanaha-golfland-pune`,
    `${SITE_URL}/projects/shapoorji-treetopia-pune`,
    // Core Localities
    `${SITE_URL}/locality/hinjewadi`,
    `${SITE_URL}/locality/hadapsar`,
    `${SITE_URL}/locality/bavdhan`,
    `${SITE_URL}/locality/purandar`,
    `${SITE_URL}/locality/compare`,
    // High-CTR Programmatic SEO Landing Pages
    `${SITE_URL}/properties/2-bhk-flats-in-hinjewadi`,
    `${SITE_URL}/properties/3-bhk-luxury-apartments-pune-west`,
    `${SITE_URL}/properties/townships-near-magarpatta-city`,
    `${SITE_URL}/properties/na-bungalow-plots-near-purandar-airport`,
    `${SITE_URL}/properties/flats-near-wipro-circle-hinjewadi`,
    `${SITE_URL}/properties/luxury-villas-near-oxford-golf-resort-bavdhan`,
    `${SITE_URL}/properties/ready-possession-flats-hadapsar-annexe`,
    `${SITE_URL}/properties/flats-near-infosys-hinjewadi-phase-1`,
    `${SITE_URL}/flats-near-infosys-hinjewadi`,
    `${SITE_URL}/flats-near-wtc-pune`,
    `${SITE_URL}/flats-near-magarpatta-city`,
    `${SITE_URL}/flats-near-symbiosis-university`,
    `${SITE_URL}/flats-near-bavdhan-highway`
];

async function pingGoogleSitemap() {
    const target = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
    try {
        console.log(`📡 Pinging Google Sitemap: ${target}`);
        const res = await fetch(target);
        console.log(`   ✅ Google Ping Response: ${res.status} ${res.statusText}`);
    } catch (err) {
        console.error(`   ⚠️ Google Ping Failed:`, err.message);
    }
}

async function pingBingSitemap() {
    const target = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
    try {
        console.log(`📡 Pinging Bing Sitemap: ${target}`);
        const res = await fetch(target);
        console.log(`   ✅ Bing Ping Response: ${res.status} ${res.statusText}`);
    } catch (err) {
        console.error(`   ⚠️ Bing Ping Failed:`, err.message);
    }
}

async function submitIndexNow() {
    const payload = {
        host: 'joyville-homes.com',
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: PRIORITY_URLS
    };

    const endpoints = [
        'https://api.indexnow.org/indexnow',
        'https://www.bing.com/indexnow',
        'https://yandex.com/indexnow'
    ];

    console.log(`\n📡 Submitting ${PRIORITY_URLS.length} URLs to IndexNow...`);

    for (const endpoint of endpoints) {
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(payload)
            });
            console.log(`   ✅ IndexNow ${endpoint}: ${res.status} ${res.statusText}`);
        } catch (err) {
            console.error(`   ⚠️ IndexNow ${endpoint} Failed:`, err.message);
        }
    }
}

async function main() {
    console.log('====================================================');
    console.log('🚀 SEARCH ENGINE VELOCITY & INDEXNOW DISPATCHER');
    console.log('====================================================');
    await pingGoogleSitemap();
    await pingBingSitemap();
    await submitIndexNow();
    console.log('\n✨ Indexing dispatch complete! Monitor Google Search Console and Bing Webmaster Tools.');
}

main();
