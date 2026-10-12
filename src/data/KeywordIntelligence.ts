/**
 * Enterprise SEO Keyword Intelligence Matrix
 * Designed for Semantic Architecture & JSON-LD Compliance
 * Avoids keyword stuffing by generating logical long-tail permutations dynamically.
 */

// =========================================================================
// LEVEL 1: MASTER BRAND KEYWORDS (Highest Priority)
// =========================================================================

export const LEVEL_1_MASTER = {
    CORE_BRAND: [
        "Shapoorji Pallonji Pune", "Shapoorji Pallonji Projects Pune", "Shapoorji Pallonji Homes Pune",
        "Shapoorji Pallonji Real Estate Pune", "Shapoorji Pallonji Residential Projects Pune",
        "Shapoorji Pallonji Apartments Pune", "Shapoorji Pallonji Flats Pune", "Shapoorji Pallonji Luxury Apartments Pune",
        "Shapoorji Pallonji Premium Homes Pune", "Shapoorji Pallonji Property Pune", "Shapoorji Pallonji New Projects Pune",
        "Shapoorji Pallonji Upcoming Projects Pune", "Shapoorji Pallonji Under Construction Projects Pune",
        "Shapoorji Pallonji Ready Possession Projects Pune", "Shapoorji Pallonji Residential Property Pune",
        "Shapoorji Pallonji Real Estate Projects Pune", "Shapoorji Pallonji Township Pune", "Shapoorji Pallonji Luxury Homes Pune",
        "Shapoorji Pallonji Premium Apartments Pune", "Shapoorji Pallonji Pune Projects List"
    ],
    JOYVILLE_MASTER: [
        "Joyville Pune", "Joyville Homes Pune", "Joyville by Shapoorji Pallonji", "Joyville Projects Pune",
        "Joyville Apartments Pune", "Joyville Flats Pune", "Joyville Residential Projects Pune",
        "Joyville Property Pune", "Joyville Luxury Apartments Pune", "Joyville Premium Homes Pune",
        "Joyville Gated Community Pune", "Joyville Smart Homes Pune", "Joyville Township Pune",
        "Joyville New Projects Pune", "Joyville Upcoming Projects Pune", "Joyville Ready Possession Pune",
        "Joyville Under Construction Pune", "Joyville Investment Property Pune", "Joyville Real Estate Pune",
        "Joyville Pune Projects List"
    ],
    COMMERCIAL_INTENT: [
        "Shapoorji Pallonji Pune Price", "Shapoorji Pallonji Flats Price Pune", "Joyville Pune Price",
        "Joyville Apartments Price", "Shapoorji Pallonji Price List Pune", "Joyville Price List",
        "Shapoorji Pallonji Cost Pune", "Joyville Cost Pune", "Buy Shapoorji Pallonji Apartment Pune",
        "Buy Joyville Apartment Pune", "Book Shapoorji Pallonji Pune", "Book Joyville Pune",
        "Shapoorji Pallonji Booking", "Joyville Booking", "Shapoorji Pallonji Site Visit",
        "Joyville Site Visit", "Schedule Site Visit Joyville", "Shapoorji Pallonji Sales Office Pune",
        "Joyville Sales Office Pune", "Shapoorji Pallonji Contact Number Pune", "Joyville Contact Number Pune",
        "Shapoorji Pallonji Brochure", "Joyville Brochure", "Shapoorji Pallonji Floor Plan", "Joyville Floor Plan",
        "Shapoorji Pallonji Master Plan", "Joyville Master Plan"
    ],
    BUYER_INTENT: [
        "Buy Flat by Shapoorji Pallonji Pune", "Buy Luxury Flat Pune", "Buy Premium Apartment Pune",
        "Buy Apartment by Joyville", "Buy New Launch Apartment Pune", "Buy Under Construction Apartment Pune",
        "Buy Ready Possession Apartment Pune", "Buy Family Apartment Pune", "Buy Investment Property Pune",
        "Buy Luxury Residence Pune"
    ],
    INVESTMENT: [
        "Shapoorji Pallonji Investment Pune", "Joyville Investment Pune", "Best Shapoorji Project Pune",
        "Best Joyville Project Pune", "Best Property by Shapoorji Pune", "Luxury Investment Property Pune",
        "Premium Investment Property Pune", "Rental Income Property Pune", "Property Appreciation Pune",
        "High ROI Property Pune", "NRI Investment Pune", "Real Estate Investment Pune",
        "Premium Residential Investment Pune", "Luxury Asset Pune", "Long-Term Investment Pune"
    ],
    TRUST_AUTHORITY: [
        "Shapoorji Pallonji Builder Pune", "Shapoorji Pallonji Developer Pune", "Shapoorji Pallonji Reviews Pune",
        "Shapoorji Pallonji Reputation", "Shapoorji Pallonji Legacy", "Shapoorji Pallonji Trusted Builder",
        "Shapoorji Pallonji Quality Construction", "Joyville Reviews Pune", "Joyville Builder Review",
        "Joyville Customer Reviews", "Joyville Construction Quality", "Joyville Brand Value",
        "Joyville Trusted Homes", "Joyville Residential Brand", "Joyville Premium Builder"
    ]
};

// =========================================================================
// LEVEL 2: EXPANSION ENGINE MATRIX MODIFIERS
// =========================================================================

const MODIFIERS = {
    TRANSACTIONAL: [
        "Price", "Price List", "Cost", "Offers", "Booking", "Book Now", "Site Visit", 
        "Brochure", "Brochure PDF", "Floor Plan", "Master Plan", "Payment Plan", 
        "Contact Number", "Inventory", "Availability", "Possession Date", 
        "Construction Status", "RERA", "Reviews", "Resale"
    ],
    PROPERTY_TYPE: [
        "2 BHK", "3 BHK", "Luxury Apartments", "Premium Apartments", "Family Homes", 
        "Smart Homes", "Gated Community", "Township", "Investment Property", "Ready Possession"
    ],
    AUDIENCE: [
        "For IT Professionals", "For Families", "For Investors", "For NRIs", 
        "For First-Time Buyers", "For Working Couples", "For Senior Citizens"
    ]
};

// Plot-specific modifiers for Treetopia
const PLOT_MODIFIERS = {
    TRANSACTIONAL: [
        "Price", "Price List", "Cost", "Offers", "Launch Offers", "Booking", "Site Visit", 
        "Brochure", "Brochure PDF", "Layout Plan", "Site Plan", "Master Plan", "Payment Plan", 
        "Contact Number", "RERA", "Reviews", "Possession Date"
    ],
    PROPERTY_TYPE: [
        "NA Plot", "Premium NA Plot", "Luxury NA Plot", "Residential NA Plot", 
        "Clear Title NA Plot", "RERA Approved Plot", "Gated Plot", "Investment Plot",
        "Villa Plot", "Luxury Villa Plot", "Bungalow Plot", "Custom Home Plot", "Estate Plot"
    ],
    SIZES: [
        "1800 sq ft Plot", "2000 sq ft Plot", "2200 sq ft Plot", "2500 sq ft Plot", 
        "3000 sq ft Plot", "4000 sq ft Plot", "5000 sq ft Plot", "Large Plot", "Corner Plot"
    ]
};

// =========================================================================
// LEVEL 2: PROJECT SEED DICTIONARIES
// =========================================================================

const PROJECT_SEEDS = {
    VANAHA: [
        "Vanaha", "Vanaha Pune", "Vanaha Bavdhan", "Shapoorji Vanaha", "Vanaha by Shapoorji Pallonji",
        "Vanaha Township", "Vanaha Forest Township", "Vanaha Phase 1", "Vanaha Phase 2"
    ],
    VANAHA_GOLFLAND: [
        "Vanaha Golfland", "Golfland Pune", "Golfland Bavdhan", "Golf View Apartments Pune", 
        "Vanaha Golfland Luxury Apartments"
    ],
    SENSORIUM: [
        "Joyville Sensorium", "Joyville Sensorium Pune", "Joyville Sensorium Hinjawadi", 
        "Sensorium by Joyville", "Sensorium by Shapoorji Pallonji"
    ],
    SKYLUXE: [
        "Joyville Sky-Luxe Edition", "Sky-Luxe Pune", "Sky-Luxe Hadapsar", "Sky-Luxe 3 BHK"
    ],
    HADAPSAR_ANNEXE: [
        "Joyville Hadapsar Annexe", "Joyville Hadapsar", "Joyville Manjari", "Joyville Manjri"
    ],
    CELESTIA: [
        "Joyville Celestia", "Celestia Pune", "Celestia Manjari"
    ],
    WILDERNEST: [
        "Wildernest Pune", "Wildernest SP Kingstown", "SP Kingstown Pune", "Wildernest Villas"
    ],
    HINJAWADI_LEGACY: [
        "Shapoorji Joyville Homes Hinjewadi", "Shapoorji Joyville Hinjewadi", "Joyville Homes Hinjewadi",
        "Joyville Hinjewadi", "Joyville Hinjewadi Phase 1", "Shapoorji Hinjewadi Phase 1",
        "Joyville Hinjawadi", "Joyville Hinjawadi Resale", "Joyville Hinjawadi Ready Possession",
        "Joyville Hinjewadi 2 BHK Price", "Joyville Hinjewadi 3 BHK Price", "Joyville Hinjewadi Floor Plan",
        "Joyville Hinjewadi Brochure", "Joyville Hinjewadi Price List"
    ],
    VYOMORA: [
        "Shapoorji Vyomora", "Vyomora Pune", "Vyomora Hinjawadi", "Vyomora Hinjawadi Phase 1",
        "Shapoorji Pallonji Vyomora", "Joyville Vyomora", "Joyville Vyomora Pune", 
        "Vyomora by Shapoorji Pallonji", "Vyomora Duplex", "Vyomora 3 BHK Duplex"
    ],
    TREETOPIA: [
        "Shapoorji Treetopia", "Treetopia Pune", "Shapoorji Pallonji Treetopia",
        "Treetopia by Shapoorji Pallonji", "Treetopia Plots", "Treetopia Jadhavwadi",
        "Treetopia Saswad", "Treetopia Purandar"
    ]
};

// =========================================================================
// THE EXPANSION ENGINE
// =========================================================================

/**
 * Dynamically generates a massive, Google-compliant keyword universe for a given project seed
 * by cross-multiplying base brands with transactional intents, configurations, and audiences.
 */
export const generateEnterpriseKeywords = (projectId: keyof typeof PROJECT_SEEDS, isPlot: boolean = false): string[] => {
    const seeds = PROJECT_SEEDS[projectId];
    if (!seeds) return [];

    const generated = new Set<string>();
    
    const mods = isPlot ? PLOT_MODIFIERS : MODIFIERS;

    seeds.forEach(seed => {
        // Base seed itself
        generated.add(seed);
        
        // Seed + Transactional (e.g., "Vanaha Price")
        mods.TRANSACTIONAL.forEach(t => generated.add(`${seed} ${t}`));
        
        // Seed + Property Type (e.g., "Vanaha 2 BHK")
        mods.PROPERTY_TYPE.forEach(pt => {
            generated.add(`${seed} ${pt}`);
            // Seed + Property Type + Transactional (e.g., "Vanaha 2 BHK Price")
            generated.add(`${seed} ${pt} Price`);
            generated.add(`${seed} ${pt} Floor Plan`);
        });

        if (isPlot && PLOT_MODIFIERS.SIZES) {
            // Seed + Size (e.g., "Treetopia 2000 sq ft Plot")
            PLOT_MODIFIERS.SIZES.forEach(s => {
                generated.add(`${seed} ${s}`);
                generated.add(`${seed} ${s} Price`);
            });
        } else if (!isPlot && MODIFIERS.AUDIENCE) {
            // Seed + Audience (e.g., "Vanaha For IT Professionals")
            MODIFIERS.AUDIENCE.forEach(a => generated.add(`${seed} ${a}`));
        }
    });

    return Array.from(generated);
};

// =========================================================================
// EXPORTS FOR NEXT.JS CONSUMPTION
// =========================================================================

export const KEYWORD_MATRIX = {
    // Project-specific expansion clusters to inject into `projects.ts`
    PROJECT_EXPANSIONS: {
        VANAHA: generateEnterpriseKeywords("VANAHA"),
        VANAHA_GOLFLAND: generateEnterpriseKeywords("VANAHA_GOLFLAND"),
        SENSORIUM: generateEnterpriseKeywords("SENSORIUM"),
        SKYLUXE: generateEnterpriseKeywords("SKYLUXE"),
        HADAPSAR_ANNEXE: generateEnterpriseKeywords("HADAPSAR_ANNEXE"),
        CELESTIA: generateEnterpriseKeywords("CELESTIA"),
        WILDERNEST: generateEnterpriseKeywords("WILDERNEST"),
        HINJAWADI_LEGACY: generateEnterpriseKeywords("HINJAWADI_LEGACY"),
        VYOMORA: generateEnterpriseKeywords("VYOMORA"),
        TREETOPIA: generateEnterpriseKeywords("TREETOPIA", true),
    },

    // Global layout keywords for domain authority
    SITE_WIDE_MASTER: [
        ...LEVEL_1_MASTER.CORE_BRAND.slice(0, 5),
        ...LEVEL_1_MASTER.JOYVILLE_MASTER.slice(0, 5),
        ...LEVEL_1_MASTER.TRUST_AUTHORITY.slice(0, 5),
        "best real estate investment in Pune 2026", "Pune real estate trends 2027", "luxury gated communities Pune",
        "best places to stay in Pune for NRI", "high rental yield property Pune", "Pune IT corridor real estate"
    ],
    
    // Competitor benchmarking
    COMPETITOR_BENCHMARKS: [
        "Joyville vs Kolte Patil Life Republic", "Joyville vs Godrej Evergreen Square",
        "Joyville vs VTP Bellissimo Hinjewadi", "Vyomora vs Joyville Sensorium",
        "Vyomora vs Mahindra Citadel", "Treetopia vs K Raheja Viva", "Treetopia vs Forest Trails Plots"
    ],
    
    // Semantic Graph Credits for JSON-LD
    SITE_CREDITS: {
        publisher: "Shapoorji Pallonji Real Estate",
        established: "1865",
        authoritativeEntities: ["MahaRERA", "EDGE", "IGBC"],
        puneMarkets: ["Hinjewadi", "Hadapsar", "Bavdhan", "Purandar", "S.P. Infocity", "Saswad"]
    },

    // Backward compatibility for existing files
    MACRO_PUNE: ["Pune real estate", "buy flats in Pune", "top builders in Pune", "Shapoorji Pallonji Pune properties"],
    SITE_WIDE_HARDENED_KEYWORDS: [
        ...LEVEL_1_MASTER.CORE_BRAND.slice(0, 5),
        ...LEVEL_1_MASTER.JOYVILLE_MASTER.slice(0, 5),
        ...LEVEL_1_MASTER.TRUST_AUTHORITY.slice(0, 5),
        "best real estate investment in Pune 2026", "Pune real estate trends 2027", "luxury gated communities Pune",
        "best places to stay in Pune for NRI", "high rental yield property Pune", "Pune IT corridor real estate"
    ],
    TRANSACTIONAL: MODIFIERS.TRANSACTIONAL,
    MICRO_MARKET_HINJEWADI: ["Hinjewadi real estate", "flats in Hinjewadi", "Joyville Hinjewadi", "IT park apartments"],
    MICRO_MARKET_BAVDHAN: ["Bavdhan real estate", "flats in Bavdhan", "Oxford golf resort flats", "luxury apartments Bavdhan"],
    COMPETITIVE_BENCHMARKS: [
        "Joyville vs Kolte Patil Life Republic", "Joyville vs Godrej Evergreen Square",
        "Joyville vs VTP Bellissimo Hinjewadi", "Vyomora vs Joyville Sensorium",
        "Vyomora vs Mahindra Citadel", "Treetopia vs K Raheja Viva", "Treetopia vs Forest Trails Plots"
    ],
    MICRO_MARKET_HADAPSAR: ["Hadapsar real estate", "flats in Hadapsar", "SP Infocity apartments", "luxury flats Hadapsar"],
    SHAPOORJI_BRAND_DOMINANCE: LEVEL_1_MASTER.CORE_BRAND
};

// Legacy shim to prevent build breakage for older imports (if any exist)
export const SITE_WIDE_HARDENED_KEYWORDS = KEYWORD_MATRIX.SITE_WIDE_MASTER;
export const GET_EXPANDED_KEYWORDS = (project: string, location: string) => {
    return [
        `${project} price list 2026`,
        `${project} floor plan download`,
        `${project} contact number`,
        `flats in ${location} near ${project}`,
        `investment potential of ${project} in ${location}`
    ];
};
