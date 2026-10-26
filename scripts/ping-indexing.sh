#!/bin/bash
# Phase 38: Google & Bing Indexing Ping Script
# Run after every deployment to accelerate indexing velocity

SITE_URL="https://joyville-homes.com"
SITEMAP_URL="${SITE_URL}/sitemap.xml"
INDEXNOW_KEY="582cfba9a2c34255959929007f3bc6cf"

echo "🔍 Phase 38: Indexing Velocity Accelerator"
echo "============================================"

# 1. Ping Google with sitemap
echo ""
echo "📡 Pinging Google Sitemap..."
curl -s "https://www.google.com/ping?sitemap=${SITEMAP_URL}" > /dev/null 2>&1
echo "   ✅ Google pinged: ${SITEMAP_URL}"

# 2. Ping Bing with sitemap
echo ""
echo "📡 Pinging Bing Sitemap..."
curl -s "https://www.bing.com/ping?sitemap=${SITEMAP_URL}" > /dev/null 2>&1
echo "   ✅ Bing pinged: ${SITEMAP_URL}"

# 3. Submit top priority URLs via IndexNow (Bing/Yandex/Seznam)
echo ""
echo "📡 Submitting Priority URLs via IndexNow..."

PRIORITY_URLS=(
    "${SITE_URL}"
    "${SITE_URL}/projects"
    "${SITE_URL}/flats-in-pune"
    "${SITE_URL}/insights"
    "${SITE_URL}/punt-real-estate-market"
    "${SITE_URL}/projects/joyville-vyomora-hinjewadi"
    "${SITE_URL}/projects/joyville-sensorium-hinjewadi"
    "${SITE_URL}/projects/joyville-hadapsar-annexe-pune"
    "${SITE_URL}/locality/hinjewadi"
    "${SITE_URL}/locality/hadapsar"
    "${SITE_URL}/properties/2-bhk-flats-in-hinjewadi"
    "${SITE_URL}/properties/3-bhk-flats-in-hinjewadi"
)

# Build JSON payload
URL_LIST=""
for url in "${PRIORITY_URLS[@]}"; do
    URL_LIST="${URL_LIST}\"${url}\","
done
URL_LIST="${URL_LIST%,}" # Remove trailing comma

JSON_PAYLOAD="{\"host\":\"joyville-homes.com\",\"key\":\"${INDEXNOW_KEY}\",\"keyLocation\":\"${SITE_URL}/indexnow-key.txt\",\"urlList\":[${URL_LIST}]}"

# Submit to IndexNow endpoints
for ENGINE in "api.indexnow.org" "www.bing.com" "yandex.com"; do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
        -X POST "https://${ENGINE}/indexnow" \
        -H "Content-Type: application/json; charset=utf-8" \
        -d "${JSON_PAYLOAD}")
    echo "   ${ENGINE}: HTTP ${HTTP_CODE}"
done

echo ""
echo "============================================"
echo "✅ All indexing pings completed!"
echo "   📊 Monitor: Google Search Console → Pages"
echo "   📊 Monitor: Bing Webmaster Tools → URL Submission"
echo ""
