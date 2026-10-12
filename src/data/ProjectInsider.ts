export interface ProjectInsider {
    projectId: string;
    maintenancePremium: string; // ₹/sqft
    parkingDetails: {
        open?: string;
        covered?: string;
        automated?: string;
    };
    constructionStatus: {
        currentPhase: string;
        slabsCompleted: number;
        totalSlabs: number;
        lastUpdate: string;
        nextMilestone: string;
    };
    inventoryStatus: {
        twoBHK: string; // e.g. "Limited 2.0 Units"
        threeBHK: string;
        duplex?: string;
    };
    civicRoadmap: {
        event: string;
        distance: string;
        impact: string;
        eta: string;
    }[];
}

export const PROJECT_INSIDER_DATA: Record<string, ProjectInsider> = {
    'joyville-sensorium-hinjewadi': {
        projectId: 'joyville-sensorium-hinjewadi',
        maintenancePremium: '₹4.25 per sq.ft.',
        parkingDetails: {
            covered: 'Included (Single/Tandem options)',
            automated: 'Available in Phase 2'
        },
        constructionStatus: {
            currentPhase: 'Superstructure Phase 3',
            slabsCompleted: 18,
            totalSlabs: 24,
            lastUpdate: '2026-03-15',
            nextMilestone: 'External Plastering Start (June 2026)'
        },
        inventoryStatus: {
            twoBHK: '82% Sold (Last 14 Units)',
            threeBHK: 'Ready for Immediate Possession (Phase 1)'
        },
        civicRoadmap: [
            { event: 'Metro Line 3 Phase 1', distance: '800m', impact: 'Direct connectivity to Shivaji Nagar', eta: 'Q4 2026' },
            { event: 'Mhalunge-Hinjewadi Bridge', distance: '1.2km', impact: 'Reduces commute to Balewadi High Street by 15 mins', eta: 'Sept 2026' }
        ]
    },
    'joyville-hadapsar-annexe-pune': {
        projectId: 'joyville-hadapsar-annexe-pune',
        maintenancePremium: '₹3.95 per sq.ft.',
        parkingDetails: {
            open: 'Available for visitors',
            covered: 'Standard with every unit'
        },
        constructionStatus: {
            currentPhase: 'Finishing & Internal Works',
            slabsCompleted: 100,
            totalSlabs: 100,
            lastUpdate: '2026-03-20',
            nextMilestone: 'Occupancy Certificate (OC) Filing'
        },
        inventoryStatus: {
            twoBHK: 'Sold Out',
            threeBHK: 'Limited Elite Collection (Last 8 Garden Facing Units)'
        },
        civicRoadmap: [
            { event: 'DP Road Expansion (Solapur Road)', distance: 'Adjacent', impact: 'Wider access for heavy traffic hours', eta: 'Q3 2026' },
            { event: 'Ring Road Convergence', distance: '4km', impact: 'Seamless transit to Airport', eta: '2027' }
        ]
    },
    'joyville-vyomora-hinjewadi': {
        projectId: 'joyville-vyomora-hinjewadi',
        maintenancePremium: '₹4.50 per sq.ft.',
        parkingDetails: {
            covered: 'Multi-level car parking (MLCP) with EV charging bays'
        },
        constructionStatus: {
            currentPhase: 'Substructure Piling & Foundation Works',
            slabsCompleted: 2,
            totalSlabs: 24,
            lastUpdate: '2026-10-01',
            nextMilestone: 'Podium Level Slab Completion'
        },
        inventoryStatus: {
            twoBHK: 'Selling Fast (Early Bird Pricing)',
            threeBHK: 'Available (Corner Units)',
            duplex: 'Exclusive Sky Villa Duplexes (Limited 12 Units with Private Decks)'
        },
        civicRoadmap: [
            { event: 'Pune Metro Line 3 Station', distance: '0.4km', impact: 'Direct rapid transit connectivity to Shivajinagar & Pune University', eta: 'Q4 2026' },
            { event: 'Mhalunge-Hinjewadi Bridge Link', distance: '1.2km', impact: 'Cuts travel time to Balewadi High Street & Baner to under 10 minutes', eta: 'Mid 2026' },
            { event: 'Hinjewadi-Wakad Ring Road Expansion', distance: '2.0km', impact: 'Decongests Phase 1 peak-hour corporate transit', eta: '2027' },
            { event: 'IT Park Phase 4 Expansion', distance: '1.5km', impact: 'Rental demand surge from 45,000+ new tech professionals', eta: '2027-28' }
        ]
    }
};

export function getProjectInsider(slug: string): ProjectInsider | undefined {
    return PROJECT_INSIDER_DATA[slug];
}
