import { Metadata } from 'next';
export const dynamic = 'force-static';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import TechnicalSheet from '@/components/TechnicalSheet';
import PriceDisplay from '@/components/PriceDisplay';
import IntentLinkCluster from '@/components/IntentLinkCluster';
import LiveActivityFeed from '@/components/LiveActivityFeed';
import Breadcrumbs from '@/components/Breadcrumbs';
import { KEYWORD_MATRIX, SITE_WIDE_HARDENED_KEYWORDS } from '@/data/KeywordIntelligence';
import { SEO_ROUTES } from '@/data/seo-routes';
import SemanticSynthesizer from '@/components/SemanticSynthesizer';
import { parsePriceRangeToINR } from '@/utils/seo-utils';

// Define the supported SEO Slugs based on our strategy matrix
const siteUrl = 'https://joyville-homes.com';

// Data handled via centralized registry in src/data/seo-routes.ts

export async function generateStaticParams() {
    return SEO_ROUTES.map((route) => ({
        seoSlug: route.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ seoSlug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const routeData = SEO_ROUTES.find(r => r.slug === resolvedParams.seoSlug);

    if (!routeData) {
        return { title: 'Properties | Joyville Pune' };
    }

    const matchedProjects = projects.filter(project => {
        const matchesLocation = routeData.filters.locationMatch ? new RegExp(routeData.filters.locationMatch, 'i').test(project.location) : true;
        const matchesType = routeData.filters.typeMatch ? new RegExp(routeData.filters.typeMatch, 'i').test(project.type) : true;
        return matchesLocation && matchesType;
    });

    const primaryProject = matchedProjects[0];
    const ogImageUrl = primaryProject?.image 
        ? (primaryProject.image.startsWith('http') ? primaryProject.image : `${siteUrl}${primaryProject.image}`)
        : `${siteUrl}/images/desktop-poster.webp`;

    // High-CTR Title formatting tailored for Google SERP display (under 60 chars)
    let absoluteTitle = routeData.title
        .replace(/\s*\|\s*Shapoorji Pallonji Joyville/g, '')
        .replace(/\s*—\s*Shapoorji Treetopia Pune/g, ' | Treetopia')
        .replace(/\s*—\s*Hinjewadi & Bavdhan\s*\|\s*Shapoorji Pallonji/g, ' | Pune West')
        .replace(/\s*\|\s*Shapoorji Pallonji/g, '')
        .replace(/\s*\|\s*Joyville Hadapsar Annexe/g, ' | Hadapsar')
        .replace(/\s*\|\s*Joyville Hadapsar/g, ' | Hadapsar')
        .replace(/\s*\|\s*Joyville Pune/g, '')
        .trim();

    if (absoluteTitle.length > 60) {
        const lastSpace = absoluteTitle.lastIndexOf(' ', 58);
        if (lastSpace > 35) {
            absoluteTitle = absoluteTitle.substring(0, lastSpace).replace(/\s*[-—|:]\s*$/, '').trim();
        }
    }

    const rawDesc = routeData.description;
    const truncatedDesc = rawDesc.length > 158 
        ? rawDesc.substring(0, rawDesc.lastIndexOf(' ', 155)).replace(/[,;:]$/, '') + '.' 
        : rawDesc;

    return {
        title: {
            absolute: absoluteTitle
        },
        description: truncatedDesc,
        keywords: [
            ...routeData.keywords,
            ...SITE_WIDE_HARDENED_KEYWORDS,
            ...KEYWORD_MATRIX.TRANSACTIONAL.slice(0, 10)
        ],
        openGraph: {
            title: absoluteTitle,
            description: truncatedDesc,
            url: `${siteUrl}/properties/${routeData.slug}`,
            siteName: 'Joyville Homes Pune | Shapoorji Pallonji',
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: absoluteTitle,
                },
            ],
            locale: 'en_IN',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: absoluteTitle,
            description: truncatedDesc,
            images: [ogImageUrl],
        },
        alternates: {
            canonical: `${siteUrl}/properties/${routeData.slug}`,
            languages: {
                'en-IN': `${siteUrl}/properties/${routeData.slug}`,
                'en-US': `${siteUrl}/properties/${routeData.slug}`,
                'en-GB': `${siteUrl}/properties/${routeData.slug}`,
                'en-AE': `${siteUrl}/properties/${routeData.slug}`,
                'x-default': `${siteUrl}/properties/${routeData.slug}`
            }
        }
    };
}

// FAQ data for programmatic pages — enables Google rich snippets
const PAGE_FAQS: Record<string, { q: string; a: string }[]> = {
    'hinjewadi': [
        { q: 'What is the starting price of flats at Shapoorji Joyville Hinjewadi?', a: 'Flats across Shapoorji Pallonji Joyville projects in Hinjewadi Phase 1 start from ₹88.19 Lakhs onwards for 2 BHK residences at Joyville Vyomora (with pre-launch allocation slots from ₹84.99 L*). Premium 3 BHK residences start from ₹1.25 Cr, and luxury 3 BHK Duplex Sky Villas are priced up to ₹1.85 Cr*. At Joyville Sensorium, 2 & 3 BHK biophilic residences range between ₹1.10 Cr and ₹1.45 Cr.' },
        { q: 'Which projects are included under Shapoorji Pallonji Joyville Homes Hinjewadi?', a: 'Shapoorji Pallonji has two landmark developments in Hinjewadi Phase 1: 1. Joyville Sensorium (10.5-acre biophilic luxury development with 2.8-acre sunken garden, infinity pool, and EDGE green certification). 2. Joyville Vyomora (25-acre grand master community featuring 80% open spaces, 32,000+ sq. ft. clubhouse, and exclusive 3 BHK Duplex Sky Villas).' },
        { q: 'Are Shapoorji Joyville Hinjewadi projects MahaRERA registered?', a: 'Yes, all projects are 100% MahaRERA approved. Joyville Vyomora is registered under MahaRERA PR1260002600999. Joyville Sensorium phases are registered under MahaRERA P52100027234, P52100024965, P52100024963, P52100027244, P52100024964, P52100045257, and P52100049547.' },
        { q: 'How far are Joyville Hinjewadi developments from major IT parks?', a: 'Both Joyville Sensorium and Joyville Vyomora are situated off Maan Village Road in Hinjewadi Phase 1, just 500 meters to 1.5 km from Infosys Circle, Wipro Circle, TCS, and Cognizant campuses. This ensures true 5-minute walk-to-work convenience.' },
        { q: 'What is the expected rental yield and appreciation in Hinjewadi Phase 1?', a: 'Hinjewadi Phase 1 generates top-tier rental yields between 4.8% and 5.4% per annum, driven by steady demand from corporate IT executives. Capital appreciation is projected at 11% to 14% YoY, catalyzed by the commercial operations of Pune Metro Line 3.' },
        { q: 'What construction technology is utilized by Shapoorji Pallonji in Hinjewadi?', a: 'Both projects utilize 100% monolithic Aluform / Mivan RCC shear wall engineering. This delivers superior earthquake resistance (Zone 3), silky smooth wall finishes, zero brick joints to prevent water seepage, and maximum usable carpet area.' },
    ],
    'hadapsar': [
        { q: 'What is the price range for flats in Hadapsar?', a: 'Joyville Hadapsar Annexe offers 1 BHK from ₹65 Lakhs, 2 BHK from ₹80 Lakhs. Luxury 3 BHK at Skyluxe Edition starts from ₹1.40 Cr.' },
        { q: 'Are there ready-to-move-in flats in Hadapsar?', a: 'Yes, Joyville Hadapsar Annexe has ready-to-move-in options with immediate possession. OC received for select towers.' },
        { q: 'How close are Joyville Hadapsar projects to Magarpatta City?', a: 'Joyville Hadapsar Annexe is approximately 4.5 km from Magarpatta City and 2.5 km from SP Infocity Phursungi.' },
        { q: 'What amenities does Joyville Hadapsar offer?', a: 'Joyville Hadapsar Annexe spans 21 acres with 60+ amenities including a 35,000 sq.ft. clubhouse, infinity pool, co-working spaces, jogging track, and 4 mini club facilities.' },
    ],
    'bavdhan': [
        { q: 'What makes Bavdhan special for real estate investment?', a: 'Bavdhan offers hill views, proximity to NDA hills, Pashan Lake, and the Mumbai-Pune Expressway. Shapoorji Pallonji\'s 1,000-acre Vanaha township makes it Pune\'s largest integrated community.' },
        { q: 'What is Vanaha Golfland?', a: 'Vanaha Golfland is a premium residential project by Shapoorji Pallonji in Bavdhan offering golf course views, hill vistas, and world-class clubhouse amenities within the 1,000-acre Vanaha township.' },
        { q: 'What is the price appreciation in Bavdhan?', a: 'Bavdhan has recorded 13.18% year-on-year appreciation, making it the fastest-growing luxury micro-market in Pune. Limited land availability is driving scarcity-led price growth.' },
    ],
    'vs': [
        { q: 'Why choose Joyville over competitors in Pune?', a: 'Joyville by Shapoorji Pallonji offers a 150-year developer legacy, EDGE-certified green buildings, 60+ world-class amenities, and construction quality that built the Indian Parliament — advantages no competitor can match.' },
        { q: 'Is Joyville Sensorium better than other Hinjewadi projects?', a: 'Joyville Sensorium stands out with its 10.5-acre scale, 1.8km walking boulevard, EDGE certification, smart home integration, and 75% open space — metrics that exceed most competitors in Hinjewadi Phase 1.' },
        { q: 'What ROI can I expect from Joyville projects?', a: 'Joyville Hinjewadi projects offer 4.5-5.5% rental yield with 8-12% annual capital appreciation. Hadapsar projects offer 3.5-4.5% yield with steady 8.5% appreciation.' },
    ],
    'general': [
        { q: 'Who is the developer of Joyville Homes?', a: 'Joyville Homes is developed by Shapoorji Pallonji Real Estate, a group with 150+ years of legacy since 1865. The group has built iconic structures including the Indian Parliament and the Oberoi Hotel.' },
        { q: 'Are all Joyville projects MahaRERA registered?', a: 'Yes, every Joyville and Vanaha project by Shapoorji Pallonji is fully MahaRERA registered. RERA numbers are displayed on each project page for verification.' },
        { q: 'How do I book a site visit for Joyville projects?', a: 'You can request a complimentary site visit by filling the enquiry form on any project page, or by contacting our sales team. Cab pickup from Pune station/airport is available for outstation buyers.' },
        { q: 'Is Joyville a good investment for NRIs?', a: 'Yes, Joyville projects offer excellent NRI investment value with 4.5-5.5% rental yields, RERA protection, Shapoorji Pallonji brand trust, and rupee depreciation advantage for foreign currency investors.' },
        { q: 'What is the booking process for a flat at Joyville Pune?', a: 'The booking process is seamless: 1. Select your preferred unit/floor plan. 2. Submit the booking amount (EOI/Booking Payment). 3. Provide KYC documents (PAN, Aadhaar/Passport). 4. Complete the digital application. Most bookings can be completed remotely within 48 hours for NRIs.' },
        { q: 'Are home loans available from major banks for Joyville?', a: 'Yes, all Joyville projects are pre-approved by major financial institutions including SBI, HDFC, ICICI, and Axis Bank. Competitive interest rates starting from 8.35% are available for eligible buyers.' },
        { q: 'What are the stamp duty and registration charges in Pune 2026?', a: 'Currently, the stamp duty in Maharashtra is 7% (including LBT) and registration is 1% or ₹30,000 (whichever is lower). Women buyers may be eligible for a 1% concession in stamp duty.' },
    ],
    'lifestyle': [
        { q: 'Are Joyville projects pet-friendly?', a: 'Yes, Joyville townships feature dedicated pet parks, landscaped walking trails, and open green spaces ideal for pets. The 75%+ open space ratio at Sensorium and 21-acre Hadapsar Annexe provide ample outdoor areas.' },
        { q: 'Do Joyville apartments support work from home?', a: 'Absolutely. Joyville Sensorium and Hadapsar Annexe include dedicated co-working lounges, high-speed fiber connectivity, and quiet study zones designed for the hybrid work model.' },
        { q: 'Are there Vastu-compliant flats at Joyville?', a: 'Yes, Joyville Celestia Hadapsar offers 100% Vastu-aligned floor plans. Other projects also feature east-facing units and Vastu-friendly layouts on request.' },
        { q: 'Are Joyville projects suitable for senior citizens?', a: 'Yes. All Joyville townships feature barrier-free common areas, elevators in every tower, 24/7 medical emergency response, walking trails, and gated security — making them ideal for senior residents.' },
    ],
    'infrastructure': [
        { q: 'How will Pune Metro Line 3 impact Hinjewadi property prices?', a: 'The Pune Metro Line 3 (Hinjewadi to Shivajinagar) is projected to boost property values by 12-15% upon completion. Joyville Sensorium and Vyomora are located within 2 km of the planned Hinjewadi terminus.' },
        { q: 'What is the impact of the Pune Ring Road on real estate?', a: 'The 128-km Pune Ring Road will connect Hinjewadi, Bavdhan, and Purandar — all Joyville micro-markets. Properties along the corridor are projected to see 15%+ appreciation upon completion.' },
        { q: 'How does Purandar Airport affect property investment?', a: 'The proposed Purandar International Airport will transform South-East Pune into a high-growth corridor. Shapoorji Treetopia NA plots near the corridor offer significant long-term ROI potential.' },
    ],
    'plots': [
        { q: 'What are NA bungalow plots?', a: 'NA (Non-Agricultural) plots are land parcels converted for residential use. They allow individual house construction and offer full land ownership — unlike apartments. Treetopia by Shapoorji Pallonji offers gated NA plots from ₹84 Lakhs.' },
        { q: 'Is plotted development a good investment in Pune?', a: 'Yes. NA plots in emerging corridors like Purandar have historically delivered 2-3x returns over 5-7 years. Treetopia offers the added security of a gated community with Shapoorji Pallonji brand backing.' },
        { q: 'What is the price of Shapoorji Treetopia plots?', a: 'Shapoorji Treetopia NA bungalow plots start from ₹84 Lakhs onwards. Multiple plot sizes are available in a fully gated, landscaped community near the Purandar Airport corridor.' },
    ],
    'techPark': [
        { q: 'How far are Joyville Hinjewadi flats from Wipro Circle and Infosys?', a: 'Joyville Sensorium and Joyville Vyomora are situated on Maan Village Road in Hinjewadi Phase 1, just 500 meters to 1.5 km from Wipro Circle and Infosys Circle. Tech professionals enjoy a 5-minute walk-to-work commute, saving up to 2 hours of daily traffic.' },
        { q: 'What is the commute time to TCS Sahyadri Park and Cognizant from Joyville?', a: 'TCS Sahyadri Park and Cognizant campuses are reachable within 7 to 10 minutes from Joyville Hinjewadi. Dedicated shuttle and cab pickup routes operate directly along the arterial Maan-Hinjewadi road.' },
        { q: 'What rental income can IT professionals generate from Joyville Hinjewadi homes?', a: '2 BHK apartments at Joyville Sensorium & Vyomora generate monthly rentals of ₹32,000 to ₹38,000, while premium 3 BHK and duplex units command ₹45,000 to ₹55,000+. Rental yield averages 4.8% to 5.4% annually with near-zero tenant vacancy.' },
        { q: 'Are there work-from-home facilities inside Joyville Hinjewadi?', a: 'Yes. Both developments include dedicated air-conditioned co-working lounges, high-speed fiber internet infrastructure, meeting pods, and quiet reading zones designed for hybrid corporate work.' },
    ],
    'duplex': [
        { q: 'What are the specifications of 3 BHK Duplex Sky Villas at Joyville Vyomora?', a: 'Joyville Vyomora introduces exclusive double-height 3 BHK Duplex Sky Villas ranging up to 1,434 sq. ft. Features include double-height living ceilings, private terrace decks, separation of guest entertaining from family bedrooms, and panoramic Sahyadri hill views.' },
        { q: 'What is the starting price for 3 BHK Duplex flats in Hinjewadi Phase 1?', a: '3 BHK Duplex Sky Villas at Joyville Vyomora start from ₹1.45 Cr to ₹1.85 Cr* depending on floor rise and terrace deck configuration. Pre-launch cost sheets and flexible payment plans are available.' },
        { q: 'Why are duplex flats in Hinjewadi considered high-appreciation assets?', a: 'Due to severe land scarcity in Phase 1, horizontal villa plots are non-existent. Duplex Sky Villas satisfy the demand for independent villa living within a 25-acre secure gated community, appreciating 12-15% faster YoY than conventional apartments.' },
    ],
    'villas': [
        { q: 'What luxury villas are offered at The Vastion SP Kingstown Hadapsar?', a: 'The Vastion at SP Kingstown offers ultra-luxury 4 & 5 BHK palatial villaments and signature standalone villas starting from ₹4.70 Cr*. Highlights include private swimming pools, landscaped private gardens, private elevator shafts, and double-height grand entrance foyers.' },
        { q: 'Is The Vastion MahaRERA approved?', a: 'Yes, The Vastion is fully approved under MahaRERA registration number P52100053978. It features 100% clear land title backed by Shapoorji Pallonji Real Estate.' },
        { q: 'What township amenities are accessible to The Vastion villa owners?', a: 'Residents enjoy elite access to the 100+ acre SP Kingstown master development, including sports clubs, fine-dining restaurants, concierge assistance, and private wellness spas.' },
    ],
    'possession': [
        { q: 'What are the possession dates for Joyville projects in Pune?', a: 'Joyville Hadapsar Annexe has ready-to-move-in towers with OC received. Joyville Sensorium Hinjewadi is in advanced superstructure stage with handovers underway. Joyville Vyomora is a brand-new launch slated for phased delivery starting 2028.' },
        { q: 'Are ready-to-move flats at Joyville exempt from GST?', a: 'Yes. Ready possession apartments with an official Occupancy Certificate (OC) are 100% exempt from 5% GST, delivering an immediate cash saving to homebuyers.' },
        { q: 'Can I inspect the actual sample flat before booking?', a: 'Yes. Fully furnished and unfurnished experience sample flats are open for physical inspection 7 days a week at the Hinjewadi and Hadapsar site sales offices. Complimentary cab pickup is available.' },
    ],
    'payment': [
        { q: 'What is included in the all-inclusive cost sheet for Joyville flats?', a: 'The cost sheet provides full transparency: Base Selling Price (BSP), floor rise, PLC, clubhouse charges, infrastructure development fees, 7% stamp duty, 1% registration, and 5% GST (for under-construction units). There are zero hidden escalations.' },
        { q: 'Which banks offer home loans for Joyville Pune developments?', a: 'All Joyville projects are pre-approved by tier-1 banks including State Bank of India (SBI), HDFC Bank, ICICI Bank, Axis Bank, and Bank of Baroda. Competitive home loan rates starting from 8.35% are available.' },
        { q: 'What are the available payment plans?', a: 'Buyers can select Construction-Linked Payment (CLP) plans tied to actual MahaRERA structural milestones, or special builder subvention schemes during pre-launch phases with 70% escrow ring-fencing.' },
    ],
    'nriGuide': [
        { q: 'Can NRIs legally purchase property at Joyville Pune?', a: 'Yes. Under Reserve Bank of India (RBI) and FEMA regulations, NRIs and OCIs can purchase unlimited residential properties in India without prior approvals. Funds can be remitted via NRE, NRO, or FCNR banking channels.' },
        { q: 'Can NRI investors repatriate rental income and capital gains abroad?', a: 'Yes. Net rental yields and sale proceeds from property can be repatriated up to USD 1 Million per financial year through Form 15CA/15CB under standard FEMA and DTAA tax guidelines.' },
        { q: 'Can an NRI complete booking and documentation without traveling to India?', a: 'Yes. Joyville offers a 100% digital onboarding process: virtual 3D site walkthroughs, video consultations, online booking payments, and Power of Attorney (POA) registration executed through the local Indian Embassy/Consulate.' },
    ]
};

function getFaqsForRoute(slug: string): { q: string; a: string }[] {
    if (slug.includes('wipro') || slug.includes('infosys') || slug.includes('tcs') || slug.includes('cognizant')) return [...PAGE_FAQS['techPark'], ...PAGE_FAQS['hinjewadi']];
    if (slug.includes('duplex') || slug.includes('sky-villa')) return [...PAGE_FAQS['duplex'], ...PAGE_FAQS['hinjewadi']];
    if (slug.includes('vastion') || slug.includes('villas') || slug.includes('villaments')) return [...PAGE_FAQS['villas'], ...PAGE_FAQS['hadapsar']];
    if (slug.includes('possession') || slug.includes('ready-to-move') || slug.includes('resale')) return [...PAGE_FAQS['possession'], ...PAGE_FAQS['general']];
    if (slug.includes('cost-sheet') || slug.includes('payment-plan') || slug.includes('price')) return [...PAGE_FAQS['payment'], ...PAGE_FAQS['general']];
    if (slug.includes('nri') || slug.includes('investment') || slug.includes('rental-yield')) return [...PAGE_FAQS['nriGuide'], ...PAGE_FAQS['general']];
    if (slug.includes('hinjewadi') && !slug.includes('-vs-')) return [...PAGE_FAQS['hinjewadi'], ...PAGE_FAQS['general']];
    if (slug.includes('hadapsar') || slug.includes('sp-infocity') || slug.includes('magarpatta') || slug.includes('shewalewadi')) return [...PAGE_FAQS['hadapsar'], ...PAGE_FAQS['general']];
    if (slug.includes('bavdhan') || slug.includes('vanaha') || slug.includes('golfland')) return [...PAGE_FAQS['bavdhan'], ...PAGE_FAQS['general']];
    if (slug.includes('-vs-')) return [...PAGE_FAQS['vs'], ...PAGE_FAQS['general']];
    if (slug.includes('pet-friendly') || slug.includes('work-from-home') || slug.includes('vastu') || slug.includes('senior-citizen')) return [...PAGE_FAQS['lifestyle'], ...PAGE_FAQS['general']];
    if (slug.includes('metro') || slug.includes('ring-road')) return [...PAGE_FAQS['infrastructure'], ...PAGE_FAQS['general']];
    if (slug.includes('treetopia') || slug.includes('plots') || slug.includes('purandar') || slug.includes('saswad')) return [...PAGE_FAQS['plots'], ...PAGE_FAQS['general']];
    return PAGE_FAQS['general'];
}

export default async function ProgrammaticSEOPage({ params }: { params: Promise<{ seoSlug: string }> }) {
    const resolvedParams = await params;
    const routeData = SEO_ROUTES.find(r => r.slug === resolvedParams.seoSlug);

    if (!routeData) {
        notFound();
    }

    // Filter projects based on the programmatic route logic
    const matchedProjects = projects.filter(project => {
        const matchesLocation = routeData.filters.locationMatch ? new RegExp(routeData.filters.locationMatch, 'i').test(project.location) : true;
        const matchesType = routeData.filters.typeMatch ? new RegExp(routeData.filters.typeMatch, 'i').test(project.type) : true;
        return matchesLocation && matchesType;
    });

    const pageFaqs = getFaqsForRoute(routeData.slug);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": routeData.h1,
        "description": routeData.description,
        "url": `${siteUrl}/properties/${routeData.slug}`,
        "numberOfItems": matchedProjects.length,
        "about": matchedProjects.map(p => ({
            "@type": "RealEstateProject",
            "name": p.title,
            "url": `${siteUrl}/projects/${p.slug}`,
            "sameAs": p.wikidataUri
        })),
        "itemListElement": matchedProjects.map((project, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "RealEstateListing",
                "name": project.title,
                "url": `${siteUrl}/projects/${project.slug}`,
                "image": project.image,
                "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "INR",
                    "lowPrice": parsePriceRangeToINR(project.price).lowPrice,
                    "highPrice": parsePriceRangeToINR(project.price).highPrice,
                    "priceRange": project.price,
                    "offerCount": "100",
                    "availability": project.status.toLowerCase().includes('ready') ? "https://schema.org/InStock" : "https://schema.org/PreOrder"
                }
            }
        }))
    };

    const faqJsonLd = pageFaqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": pageFaqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    } : null;

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteUrl
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Properties",
                "item": `${siteUrl}/projects`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": routeData.h1,
                "item": `${siteUrl}/properties/${routeData.slug}`
            }
        ]
    };

    return (
        <main className="min-h-[100dvh] bg-[#EEF2F6] pt-32 pb-24 text-[#323334]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            
            <div className="max-w-7xl mx-auto px-6 mb-8 pt-6">
                <Breadcrumbs 
                    items={[
                        { label: 'Properties', href: '/properties' },
                        { label: routeData.h1.length > 30 ? routeData.h1.substring(0, 27) + '...' : routeData.h1, href: `/properties/${routeData.slug}` }
                    ]} 
                />
            </div>

            <header className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#1D4F9C] font-semibold block mb-4">Shapoorji Pallonji Curated Collection</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#323334] font-light mb-6">{routeData.h1}</h1>
                <p className="text-[#323334] text-lg max-w-3xl mx-auto font-light leading-relaxed header-description">
                    {routeData.description} Explore our portfolio of premium properties crafted with a 150-year legacy of trust and engineering excellence.
                </p>
                
                {/* Technical Specification Sheet for Featured Project (if strictly matched) */}
                {matchedProjects.length === 1 && matchedProjects[0].technicalSpecs && (
                    <div className="mt-12 text-left max-w-5xl mx-auto">
                        <TechnicalSheet 
                            specs={matchedProjects[0].technicalSpecs} 
                            projectName={matchedProjects[0].title}
                        />
                    </div>
                )}
            </header>

            {/* HCU Hardening: Dynamic Deep Content Injection */}
            <SemanticSynthesizer slug={routeData.slug} />

            {/* Rich Comparison Content for vs Pages */}
            {routeData.slug.includes('-vs-') && (
                <section className="max-w-5xl mx-auto px-6 mb-20">
                    <div className="bg-[#FFFFFF] border border-[#C5A059]/20 rounded-sm overflow-hidden shadow-lg">
                        <div className="bg-[#1D4F9C] text-[#FFFFFF] py-4 px-8">
                            <h2 className="text-xl font-serif">Head-to-Head Comparison</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-[#C5A059]/10">
                                        <th className="py-4 px-6 text-left text-[10px] tracking-[0.2em] uppercase text-[#1D4F9C] font-semibold">Parameter</th>
                                        <th className="py-4 px-6 text-left text-[10px] tracking-[0.2em] uppercase text-[#1D4F9C] font-semibold">
                                            {routeData.slug.includes('hadapsar') || routeData.slug.includes('amanora') ? 'Joyville Hadapsar Annexe' : 'Joyville Sensorium'}
                                        </th>
                                        <th className="py-4 px-6 text-left text-[10px] tracking-[0.2em] uppercase text-[#323334] font-semibold">
                                            {routeData.slug.includes('kolte-patil') ? 'Kolte Patil Life Republic'
                                                : routeData.slug.includes('vtp') ? 'VTP Bellissimo'
                                                    : routeData.slug.includes('amanora') ? 'Amanora Trendsetter'
                                                        : routeData.slug.includes('pride-purple') ? 'Pride Purple'
                                                            : routeData.slug.includes('gera') ? 'Gera World of Joy'
                                                                : routeData.slug.includes('kohinoor') ? 'Kohinoor Coral Hinjewadi'
                                                                    : routeData.slug.includes('rohan') ? 'Rohan Builders Pune'
                                                                        : routeData.slug.includes('sensorium-vs-joyville-vyomora') || routeData.slug.includes('sensorium-vs-vyomora') ? 'Joyville Vyomora Hinjewadi'
                                                                            : 'Godrej Evergreen Square'}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(routeData.slug.includes('kolte-patil') ? [
                                        ['Developer Legacy', '150 Years (Since 1865)', '33 Years (Since 1991)'],
                                        ['Land Area', '10.5 Acres', '390 Acres (Full Township)'],
                                        ['2 BHK Starting Price', '₹1.10 Cr', '₹72-75 Lakhs'],
                                        ['Construction Quality', 'Premium (Built Indian Parliament)', 'Mid-Market Standard'],
                                        ['Amenities Count', '60+', '30-40 per cluster'],
                                        ['Open Space', '75% of total land', '~60%'],
                                        ['Smart Home', '✅ Standard', '❌ Not standard'],
                                        ['Green Certification', '✅ EDGE Certified', '❌ No'],
                                        ['Rental Yield', '4.5-5.5%', '3.5-4.0%'],
                                        ['Best For', 'Luxury + Investment', 'Budget-first buyers'],
                                    ] : routeData.slug.includes('vtp') ? [
                                        ['Developer Legacy', '150 Years (Since 1865)', '30+ Years'],
                                        ['Land Area', '10.5 Acres', '~8 Acres'],
                                        ['2 BHK Starting Price', '₹1.10 Cr', '₹95 Lakhs - 1.15 Cr'],
                                        ['Construction Quality', 'Premium (Built Indian Parliament)', 'Good (Regional Focus)'],
                                        ['Amenities Count', '60+', '35+'],
                                        ['Open Space', '75% of total land', '~65%'],
                                        ['Smart Home', '✅ Standard', '✅ Select units'],
                                        ['Green Certification', '✅ EDGE Certified', '❌ No'],
                                        ['Unique Feature', '1.8km Walking Boulevard', 'Proximity to IT Park'],
                                        ['Best For', 'Luxury + Lifestyle + ROI', 'Mid-segment buyers'],
                                    ] : routeData.slug.includes('amanora') ? [
                                        ['Developer Legacy', '150 Years (Since 1865)', 'City Corp Group'],
                                        ['Land Area', '21 Acres', '400 Acres (Full Township)'],
                                        ['1 BHK Starting Price', '₹65 Lakhs', '₹75 Lakhs+'],
                                        ['Construction Quality', 'Premium (Shapoorji Legacy)', 'Standard Market'],
                                        ['Amenities Count', '60+', '50+ (Shared across township)'],
                                        ['Open Space', '80%', '~55%'],
                                        ['Ready to Move', '✅ Available', '✅ Available'],
                                        ['Clubhouse', '35,000 sq.ft. + 4 Mini Clubs', 'Shared Township Club'],
                                        ['Mall Proximity', '5.5 km to Amanora Mall', 'Within township'],
                                        ['Best For', 'Families + Value seekers', 'Mall-lifestyle seekers'],
                                    ] : routeData.slug.includes('pride-purple') ? [
                                        ['Developer Legacy', '150 Years (Since 1865)', '22+ Years'],
                                        ['Land Area', '10.5-21 Acres', '5-15 Acres'],
                                        ['2 BHK Starting Price', '₹65 Lakhs - 1.10 Cr', '₹70 Lakhs - 95 Lakhs'],
                                        ['Construction Quality', 'Premium (Built Indian Parliament)', 'Good (Regional Leader)'],
                                        ['Amenities Count', '60+', '30-45'],
                                        ['Open Space', '75-80%', '~60%'],
                                        ['Smart Home', '✅ Standard', '❌ Not standard'],
                                        ['Green Certification', '✅ EDGE Certified', '❌ No'],
                                        ['Township Scale', '1,000 Acres (Vanaha)', 'Standalone projects'],
                                        ['Best For', 'Premium lifestyle + investment', 'Mid-segment buyers'],
                                    ] : routeData.slug.includes('gera') ? [
                                        ['Developer Legacy', '150 Years (Since 1865)', '50+ Years'],
                                        ['Focus', 'Premium lifestyle + IT corridor', 'Family & child-friendly'],
                                        ['Land Area', '10.5-21 Acres', '8-12 Acres'],
                                        ['2 BHK Starting Price', '₹65 Lakhs - 1.10 Cr', '₹78 Lakhs - 1.05 Cr'],
                                        ['Construction Quality', 'Premium (Shapoorji Legacy)', 'Good (Pune-focused)'],
                                        ['Amenities Count', '60+', '40-50'],
                                        ['Child-Friendly Amenities', '✅ Extensive', '✅ Branded (ChildCentric®)'],
                                        ['Green Certification', '✅ EDGE Certified', '❌ No'],
                                        ['RERA Compliance', '✅ All Projects', '✅ All Projects'],
                                        ['Best For', 'IT professionals + investors', 'Young families'],
                                    ] : routeData.slug.includes('kohinoor') ? [
                                        ['Developer Legacy', '150 Years (Since 1865)', '30+ Years (Since 1994)'],
                                        ['Land Area', '10.5 - 25 Acres', '~4 Acres'],
                                        ['2 BHK Starting Price', '₹84.99 L - 1.10 Cr', '₹68 - 78 Lakhs'],
                                        ['Construction Quality', '100% Aluform / Mivan (Built Indian Parliament)', 'Conventional RCC'],
                                        ['Amenities Count', '48 - 60+ (Clubhouse up to 32,000 sq.ft.)', '25+'],
                                        ['Open Space', '75 - 80% Green Buffer', '~50%'],
                                        ['Green Certification', 'EDGE Certified / IGBC', 'Basic Compliance'],
                                        ['Duplex Format', '✅ Available (3 BHK Duplex Sky Villas)', '❌ Not available'],
                                        ['Rental Yield', '4.8 - 5.4%', '3.8 - 4.2%'],
                                        ['Best For', 'Long-term luxury & high ROI', 'Entry-level budget buyers'],
                                    ] : routeData.slug.includes('rohan') ? [
                                        ['Developer Legacy', '150 Years (Since 1865)', '30+ Years'],
                                        ['Design Philosophy', 'Biophilic & Master-Planned Townships', 'PLUS Home Concept'],
                                        ['Land Area', '10.5 - 25 Acres (Hinjewadi) / 21-100 Acres (Hadapsar)', '5 - 12 Acres'],
                                        ['2 BHK Starting Price', '₹84.99 L - 1.10 Cr', '₹80 - 95 Lakhs'],
                                        ['Construction Technology', 'Monolithic Aluform RCC', 'Tunnel Form / Aluform'],
                                        ['Clubhouse Scale', '32,000 - 35,000 Sq. Ft.', '15,000 - 20,000 Sq. Ft.'],
                                        ['Open Space', '75 - 80%', '~60%'],
                                        ['EDGE Green Certified', '✅ Yes (20% Resource Savings)', '❌ No'],
                                        ['Best For', 'Institutional quality & township scale', 'Niche architectural buyers'],
                                    ] : (routeData.slug.includes('sensorium-vs-joyville-vyomora') || routeData.slug.includes('sensorium-vs-vyomora')) ? [
                                        ['Project Master Area', '10.5 Acres (Sensorium)', '25 Acres (Vyomora)'],
                                        ['Open Green Ratio', '75% Open Spaces', '80% Open Breathing Spaces'],
                                        ['2 BHK Starting Price', '₹1.10 Cr*', '₹88.19 L* (Slots from ₹84.99 L*)'],
                                        ['3 BHK Starting Price', '₹1.45 Cr*', '₹1.25 Cr*'],
                                        ['Duplex Sky Villas', '❌ Not Available', '✅ Exclusive 3 BHK Duplex (1434 sq.ft.)'],
                                        ['Clubhouse Scale', '2.8-Acre Sunken Garden & Boulevard', '32,000+ Sq. Ft. Multi-Tier Clubhouse'],
                                        ['Construction Status', 'Advanced Superstructure (Near Possession)', 'Brand New Launch (Maximum Capital Runway)'],
                                        ['MahaRERA Registration', 'P52100027234', 'PR1260002600999'],
                                        ['Best For', 'Immediate move-in & proven community', 'Accessible pre-launch pricing & high growth'],
                                    ] : [
                                        ['Developer Legacy', '150 Years (Since 1865)', '127 Years (Since 1897)'],
                                        ['Land Area', '10.5 Acres', '~5 Acres'],
                                        ['2 BHK Starting Price', '₹1.10 Cr', '₹90 Lakhs - 1 Cr'],
                                        ['Construction Quality', 'Premium (Built Indian Parliament)', 'Premium (Godrej National Brand)'],
                                        ['Amenities Count', '60+', '40+'],
                                        ['Open Space', '75% of total land', '~65%'],
                                        ['Smart Home', '✅ Standard', '✅ Available'],
                                        ['Green Certification', '✅ EDGE Certified', '✅ IGBC Certified'],
                                        ['Unique Selling Point', '1.8km Walking Boulevard', 'Green Building Focus'],
                                        ['Best For', 'Luxury + Lifestyle', 'Green-conscious buyers'],
                                    ]).map(([param, joyville, competitor], idx) => (
                                        <tr key={idx} className={idx % 2 === 0 ? 'bg-[#F4F6F9]' : 'bg-[#FFFFFF]'}>
                                            <td className="py-3 px-6 font-medium text-[#323334]">{param}</td>
                                            <td className="py-3 px-6 text-[#1D4F9C] font-medium">
                                                {param.toLowerCase().includes('price') ? <PriceDisplay price={String(joyville)} /> : joyville}
                                            </td>
                                            <td className="py-3 px-6 text-[#323334]">
                                                {param.toLowerCase().includes('price') ? <PriceDisplay price={String(competitor)} /> : competitor}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-6 bg-[#F4F6F9] border-t border-[#C5A059]/10">
                            <p className="text-sm text-[#323334] font-light">
                                <strong className="text-[#1D4F9C]">Verdict:</strong> {routeData.slug.includes('kolte-patil')
                                    ? 'Joyville Sensorium delivers premium construction quality and luxury amenities backed by 150+ years of Shapoorji Pallonji engineering legacy. Kolte Patil Life Republic offers a full township ecosystem at a lower price point. Choose Sensorium for quality and ROI; choose Life Republic for budget and township scale.'
                                    : routeData.slug.includes('vtp')
                                        ? 'Joyville Sensorium leads with EDGE certification, 60+ amenities, and the iconic 1.8km Walking Boulevard. VTP Bellissimo offers competitive pricing for mid-segment buyers. Choose Sensorium for premium lifestyle and long-term appreciation; choose VTP for value-oriented living.'
                                        : routeData.slug.includes('amanora')
                                            ? 'Joyville Hadapsar Annexe offers a massive 35,000 sq.ft. clubhouse, 80% open space, and the trusted Shapoorji Pallonji legacy at competitive pricing. Amanora Trendsetter leverages mall proximity. Choose Joyville for family-friendly township living; choose Amanora for retail-centric lifestyle.'
                                            : routeData.slug.includes('pride-purple')
                                                ? 'Joyville by Shapoorji Pallonji outperforms with 150 years of construction legacy, EDGE green certification, and 60+ premium amenities including smart home integration. Pride Purple offers competitive mid-segment pricing but lacks the institutional-grade construction quality. Choose Joyville for long-term investment value; choose Pride Purple for budget-first decisions.'
                                                : routeData.slug.includes('gera')
                                                    ? 'Joyville by Shapoorji Pallonji and Gera World of Joy both excel in family-focused design. Joyville leads with superior township scale (up to 1,000 acres), EDGE certification, and 60+ amenities. Gera stands out with branded ChildCentric® features. Choose Joyville for premium lifestyle and investment ROI; choose Gera for specialized child-friendly living.'
                                                    : routeData.slug.includes('kohinoor')
                                                        ? 'Joyville by Shapoorji Pallonji offers superior institutional construction quality (100% Aluform), 80% open greens, and exclusive 3 BHK Duplex Sky Villas backed by a 150-year legacy. Kohinoor Coral offers lower entry-level pricing. Choose Joyville for enduring build quality, higher rental yields, and superior appreciation.'
                                                        : routeData.slug.includes('rohan')
                                                            ? 'Both Shapoorji Pallonji and Rohan Builders emphasize ventilation and functional layouts. Joyville leads with massive township scale (up to 25 acres in Hinjewadi, 100+ acres in Hadapsar), 32,000+ sq.ft. clubhouses, and EDGE green certification delivering 20% utility savings.'
                                                            : (routeData.slug.includes('sensorium-vs-joyville-vyomora') || routeData.slug.includes('sensorium-vs-vyomora'))
                                                                ? 'Choose Joyville Sensorium if you require earlier possession timelines, established 2.8-acre sunken gardens, and mature biophilic living. Choose Joyville Vyomora if you want pre-launch entry pricing under ₹90 Lakhs, rare 3 BHK Duplex Sky Villas, or maximum long-term capital runway across a 25-acre grand community.'
                                                                : 'Both are premium developers with strong legacies. Joyville Sensorium edges ahead with its 10.5-acre scale, 60+ amenities, and 1.8km walking boulevard. Godrej Evergreen Square offers compelling green certifications. Choose Sensorium for amenity density; choose Godrej for green-first living.'
                                }
                            </p>
                        </div>
                    </div>
                </section>
            )}

            <section className="max-w-7xl mx-auto px-6">
                {matchedProjects.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {matchedProjects.map(project => (
                            <Link href={`/projects/${project.slug}`} key={project.id} className="group flex flex-col bg-[#FFFFFF] rounded-sm overflow-hidden border border-[#C5A059]/20 hover:border-[#C5A059]/50 transition-all duration-500 shadow-lg hover:shadow-2xl">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={`${project.title} - ${project.location} | Shapoorji Pallonji Joyville`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute top-4 right-4 bg-[#FFFFFF]/90 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] font-bold tracking-widest uppercase text-[#1D4F9C]">
                                        {project.status}
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-[#1D4F9C] text-xs font-medium tracking-wider uppercase mb-3">
                                        <MapPin size={14} /> {project.location}
                                    </div>
                                    <h2 className="text-2xl font-serif text-[#323334] mb-3">{project.title}</h2>
                                    <PriceDisplay price={project.price} className="text-[#1D4F9C] font-serif italic text-xl mb-4 block" />

                                    <p className="text-[#323334] font-light text-sm line-clamp-2 mb-6 border-b border-[#C5A059]/10 pb-6">
                                        {project.type}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between text-[#323334] group-hover:text-[#1D4F9C] transition-colors">
                                        <span className="text-[10px] tracking-[0.2em] font-bold uppercase">View Project</span>
                                        <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-[#FFFFFF] border border-[#C5A059]/20 rounded-sm">
                        <p className="text-[#323334] text-lg font-light">New inventory coming soon for this specific requirement.</p>
                        <Link href="/projects" className="inline-block mt-6 text-[#1D4F9C] border-b border-[#C5A059] pb-1 uppercase tracking-widest text-xs font-bold hover:text-[#323334] hover:border-[#323334] transition-colors">
                            View All Projects
                        </Link>
                    </div>
                )}
            </section>

            {/* Project Cluster Intelligence Mesh — Phase 4 Strategy  */}
            <section className="max-w-7xl mx-auto px-6 mt-20">
                <div className="bg-[#1D4F9C] p-8 md:p-12 rounded-sm text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-110 transition-transform duration-700" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="max-w-2xl">
                            <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.3em] mb-4 block">Strategic Real Estate Intelligence</span>
                            <h2 className="text-3xl font-serif mb-4">Explore the {routeData.slug.includes('hinjewadi') ? 'Hinjewadi IT' : routeData.slug.includes('hadapsar') ? 'East Pune' : 'Pune Luxury'} Cluster Hub</h2>
                            <p className="text-white/70 font-light leading-relaxed">
                                Access our master guides to understand how interconnected project ecosystems are maximizing capital appreciation and lifestyle quality in this micro-market.
                            </p>
                        </div>
                        <Link 
                            href={
                                routeData.slug.includes('hinjewadi') ? '/insights/hinjewadi-it-lifeline-cluster-guide-2026' :
                                routeData.slug.includes('hadapsar') || routeData.slug.includes('shewalewadi') ? '/insights/pune-east-township-corridor-hadapsar-shewalewadi-hub' :
                                routeData.slug.includes('bavdhan') ? '/insights/bavdhan-nature-valley-vanaha-golfland-luxury-living' :
                                '/insights/shapoorji-pallonji-pune-project-review-2026-master-collection'
                            }
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#C5A059] text-[#1D4F9C] text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors flex-shrink-0"
                        >
                            Open Cluster Hub <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section for Rich Snippets */}
            {pageFaqs.length > 0 && (
                <section className="max-w-5xl mx-auto px-6 mt-20">
                    <h2 className="text-3xl font-serif text-[#323334] mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {pageFaqs.map((faq, idx) => (
                            <details key={idx} className="bg-[#FFFFFF] border border-[#C5A059]/20 rounded-sm group">
                                <summary className="px-6 py-5 cursor-pointer text-[#323334] font-medium text-sm hover:text-[#1D4F9C] transition-colors list-none flex justify-between items-center">
                                    {faq.q}
                                    <span className="text-[#1D4F9C] text-lg group-open:rotate-45 transition-transform">+</span>
                                </summary>
                                <div className="px-6 pb-5 text-[#323334] font-light text-sm leading-relaxed border-t border-[#C5A059]/10 pt-4">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>
            )}

            <div className="max-w-7xl mx-auto px-6 mt-12 mb-12">
                <IntentLinkCluster />
            </div>

            <footer className="py-20 bg-[#FFFFFF] border-t border-[#C5A059]/30 text-center mt-20">
                <div className="text-3xl font-serif text-[#1D4F9C] font-light tracking-widest mb-4">JOYVILLE <span className="text-[10px] font-sans tracking-[0.4em] text-[#323334] uppercase ml-2">Pune</span></div>
                <p className="text-[#323334]/60 text-[10px] tracking-[0.2em] uppercase font-medium">MahaRERA: PR1260002600999 | P52100027234 | P52100026451 | Authorized Channel Partner for Shapoorji Pallonji Real Estate</p>
            </footer>

            {/* Global FOMO Activity Feed */}
            <LiveActivityFeed />
        </main>
    );
}
