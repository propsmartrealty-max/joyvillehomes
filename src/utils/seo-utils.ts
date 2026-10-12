/**
 * SEO Utility Matrix
 * Standardizes slug generation for deep property links.
 */

export function generateUnitSlug(projectName: string, unitType: string, location: string): string {
    const slug = `${projectName}-${unitType}-${location}`
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    return slug;
}

export function parseUnitSlug(slug: string): { projectName: string; unitType: string; location: string } {
    // This is a simple parser, might need refinement for complex project names
    // But since we control the generation, it's predictable
    const parts = slug.split('-');
    // Assuming project-name-unit-type-location
    return {
        projectName: parts[0],
        unitType: parts[1],
        location: parts[parts.length - 1]
    };
}

/**
 * Robust Price Parser to INR Integer
 * Converts price strings like "₹88.19 L Onwards", "₹1.10 Cr - ₹1.45 Cr", "Starting ₹84 Lakhs"
 * into accurate, schema-compliant integer amounts.
 */
export function parsePriceToINR(priceStr: string): number {
    if (!priceStr) return 8500000;
    const firstPart = priceStr.split('-')[0].trim();
    const match = firstPart.match(/([0-9.]+)/);
    if (!match) return 8500000;
    const num = parseFloat(match[1]);
    if (firstPart.toLowerCase().includes('cr')) {
        return Math.round(num * 10000000);
    }
    return Math.round(num * 100000);
}

/**
 * Robust Price Range Parser to INR Integers
 * Returns lowPrice and highPrice for Schema.org AggregateOffer and Google Merchant.
 */
export function parsePriceRangeToINR(priceStr: string): { lowPrice: number; highPrice: number } {
    if (!priceStr) return { lowPrice: 8500000, highPrice: 15000000 };
    const parts = priceStr.split('-').map(s => s.trim());
    const low = parsePriceToINR(parts[0]);
    if (parts.length > 1) {
        const match = parts[1].match(/([0-9.]+)/);
        if (match) {
            const num = parseFloat(match[1]);
            const isCr = parts[1].toLowerCase().includes('cr') || parts[0].toLowerCase().includes('cr');
            const high = Math.round(num * (isCr ? 10000000 : 100000));
            return { lowPrice: low, highPrice: high >= low ? high : Math.round(low * 1.4) };
        }
    }
    return { lowPrice: low, highPrice: Math.round(low * 1.4) };
}
