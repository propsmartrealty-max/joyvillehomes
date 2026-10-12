export interface ComparisonData {
    id: string;
    joyvilleProject: string;
    competitorProject: string;
    developer: string;
    metrics: {
        label: string;
        joyville: string;
        competitor: string;
        winner: 'joyville' | 'competitor' | 'neutral';
    }[];
    summary: string;
}

export const comparisons: ComparisonData[] = [
    {
        id: 'sensorium-vs-life-republic',
        joyvilleProject: 'Joyville Sensorium',
        competitorProject: 'Life Republic',
        developer: 'Kolte Patil',
        metrics: [
            { label: 'Construction Tech', joyville: 'Mivan Monolithic', competitor: 'Traditional RCC', winner: 'joyville' },
            { label: 'Open Space', joyville: '75% Biophilic', competitor: '45-50%', winner: 'joyville' },
            { label: 'Metro Proximity', joyville: '800m (Phase 1)', competitor: '3.5km (Phase 2)', winner: 'joyville' },
            { label: 'Legacy Trust', joyville: '160 Years', competitor: '30 Years', winner: 'joyville' }
        ],
        summary: "While Life Republic is a large township, Joyville Sensorium offers superior construction quality (Mivan) and much closer proximity to the Hinjewadi IT Lifeline and Metro Line 3."
    },
    {
        id: 'hadapsar-vs-amanora',
        joyvilleProject: 'Joyville Hadapsar Annexe',
        competitorProject: 'Amanora Trendsetter',
        developer: 'Amanora',
        metrics: [
            { label: 'Acreage', joyville: '21 Acres', competitor: '400 Acres (Township)', winner: 'competitor' },
            { label: 'Value for Money', joyville: 'Premium Luxury @ 7k/sqft', competitor: '9k/sqft+', winner: 'joyville' },
            { label: 'Privacy', joyville: 'High (Lower Density)', competitor: 'Moderate (High Density)', winner: 'joyville' },
            { label: 'Connectivity', joyville: 'On Highway', competitor: 'Internal Road', winner: 'joyville' }
        ],
        summary: "Amanora offers a larger ecosystem, but Joyville Hadapsar Annexe provides a more focused, lower-density luxury experience with better price-to-value appreciation potential."
    },
    {
        id: 'sensorium-vs-vyomora',
        joyvilleProject: 'Joyville Sensorium',
        competitorProject: 'Joyville Vyomora',
        developer: 'Shapoorji Pallonji (Internal Portfolio)',
        metrics: [
            { label: 'Master Acreage', joyville: '10.5 Acres (75% Open)', competitor: '25 Acres (80% Open)', winner: 'competitor' },
            { label: 'Entry Price', joyville: '₹1.10 Cr Onwards', competitor: '₹88.19 L Onwards (Pre-Launch ₹84.99 L*)', winner: 'competitor' },
            { label: 'Signature Format', joyville: 'Biophilic 2.8-Acre Sunken Garden', competitor: '3 BHK Duplex Sky Villas & 32k sq.ft. Club', winner: 'neutral' },
            { label: 'Possession Horizon', joyville: 'Nearing Handover / Mature Phase', competitor: 'Brand New Launch Phase 1', winner: 'joyville' },
            { label: 'IT Park Proximity', joyville: '1.5km Infosys / 800m Metro', competitor: '0.8km Infosys / 400m Metro', winner: 'competitor' }
        ],
        summary: "Both projects represent Shapoorji Pallonji's gold-standard engineering in Hinjewadi Phase 1. Choose Joyville Sensorium for earlier move-in dates and mature biophilic parks, or Joyville Vyomora for lower entry prices, 25-acre community scale, and exclusive duplex sky villas."
    },
    {
        id: 'joyville-hinjewadi-vs-godrej-elements',
        joyvilleProject: 'Joyville Hinjewadi (Sensorium & Vyomora)',
        competitorProject: 'Godrej Elements / Godrej 24',
        developer: 'Godrej Properties',
        metrics: [
            { label: 'Construction Quality', joyville: '100% Monolithic Aluform / Mivan', competitor: 'Standard Subcontracted RCC', winner: 'joyville' },
            { label: 'Open Green Ratio', joyville: '75% to 80% Breathing Space', competitor: '50% to 60% Density', winner: 'joyville' },
            { label: 'Special Typologies', joyville: '3 BHK Duplex Sky Villas Available', competitor: 'Standard Apartments Only', winner: 'joyville' },
            { label: 'Builder Heritage', joyville: '160+ Years (RBI, Parliament Builder)', competitor: '35+ Years Real Estate Division', winner: 'joyville' }
        ],
        summary: "While Godrej provides recognizable branding in Hinjewadi, Shapoorji Pallonji's Joyville developments deliver unmatched structural integrity via 100% in-house Mivan engineering, higher open space ratios, and rare duplex inventory."
    }
];
