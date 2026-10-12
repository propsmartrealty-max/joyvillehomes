'use client';

import React from 'react';
import { parsePriceRangeToINR } from '@/utils/seo-utils';

interface ProjectProductProps {
    id: string;
    name: string;
    description: string;
    image: string;
    price: string;
    currency: string;
    availability: string;
    url: string;
    brand: string;
    sku: string;
    category: string;
}

export default function GoogleProductBridge({ 
    id, 
    name, 
    description, 
    image, 
    price, 
    currency, 
    availability, 
    url,
    brand = "Shapoorji Pallonji Joyville",
    sku,
    category = "Real Estate > Residential"
}: ProjectProductProps) {
    const { lowPrice, highPrice } = parsePriceRangeToINR(price);
    const isReady = (availability || '').toLowerCase().includes('ready');

    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": name,
        "image": [image.startsWith('http') ? image : `https://joyville-homes.com${image}`],
        "description": description,
        "sku": sku || id,
        "mpn": sku || id,
        "brand": {
            "@type": "Brand",
            "name": brand || "Shapoorji Pallonji"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1280",
            "bestRating": "5",
            "worstRating": "1"
        },
        "offers": {
            "@type": "AggregateOffer",
            "url": url,
            "priceCurrency": currency || "INR",
            "lowPrice": lowPrice,
            "highPrice": highPrice,
            "offerCount": "100",
            "itemCondition": "https://schema.org/NewCondition",
            "priceValidUntil": "2026-12-31",
            "availability": isReady ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
            "valueAddedTaxIncluded": true
        },
        "category": category
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
    );
}
