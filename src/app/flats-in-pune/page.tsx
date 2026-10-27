import { Metadata } from 'next';
export const dynamic = 'force-static';
import Link from 'next/link';
import { MapPin, Home, TrendingUp, CheckCircle2, ArrowRight, Building2, Shield } from 'lucide-react';

const siteUrl = 'https://joyville-homes.com';

export const metadata: Metadata = {
    title: {
        absolute: 'Flats in Pune 2026 | 32+ Joyville Homes by Shapoorji'
    },
    description: 'Explore 32+ categories of flats in Pune by Shapoorji Pallonji. 2 & 3 BHK in Hinjewadi, Hadapsar, Bavdhan. Ready to move, new launch, NRI investment, RERA approved. Starting ₹65 Lakhs.',
    keywords: [
        'flats in Pune', 'flats in Pune 2026', 'apartments Pune', 'Shapoorji Pallonji flats Pune',
        '2 BHK flats Pune', '3 BHK flats Pune', 'ready to move flats Pune', 'new launch Pune 2026',
        'RERA approved flats Pune', 'affordable flats Pune', 'luxury apartments Pune',
        'flats Hinjewadi', 'flats Hadapsar', 'flats Bavdhan', 'property Pune 2026'
    ],
    alternates: { canonical: `${siteUrl}/flats-in-pune` },
    openGraph: {
        title: 'Flats in Pune — 32+ Options by Shapoorji Pallonji',
        description: 'Explore every type of flat in Pune. Budget, luxury, ready-to-move, new launch, NRI investment & more. Shapoorji Pallonji Joyville from ₹65L.',
        url: `${siteUrl}/flats-in-pune`,
        type: 'website',
    },
};

const SECTIONS = [
    {
        icon: Home,
        title: 'By BHK Type',
        links: [
            { href: '/properties/1-bhk-flats-in-hadapsar', label: '1 BHK Flats in Hadapsar' },
            { href: '/properties/2-bhk-flats-in-hinjewadi', label: '2 BHK Flats in Hinjewadi' },
            { href: '/properties/3-bhk-flats-in-hinjewadi', label: '3 BHK Flats in Hinjewadi' },
            { href: '/properties/apartments-near-magarpatta-city-hadapsar', label: '2 BHK Flats in Hadapsar' },
            { href: '/properties/ready-to-move-flats-hadapsar', label: '3 BHK Flats in Hadapsar' },
            { href: '/properties/3-bhk-luxury-apartments-pune-west', label: '3 BHK Luxury Apartments West Pune' },
        ]
    },
    {
        icon: MapPin,
        title: 'By Locality',
        links: [
            { href: '/properties/flats-in-bavdhan-pune', label: 'Flats in Bavdhan' },
            { href: '/properties/flats-near-magarpatta-pune', label: 'Flats Near Magarpatta City' },
            { href: '/properties/flats-near-hinjewadi-it-park', label: 'Flats Near Hinjewadi IT Park' },
            { href: '/properties/flats-near-eon-it-park-kharadi', label: 'Flats Near EON IT Park Kharadi' },
            { href: '/properties/flats-near-sp-infocity-pune', label: 'Flats Near SP Infocity' },
            { href: '/properties/apartments-near-magarpatta-city-hadapsar', label: 'Apartments Near Magarpatta' },
            { href: '/properties/residential-projects-near-hinjewadi-phase-1', label: 'Projects Near Hinjewadi Phase 1' },
            { href: '/properties/affordable-flats-in-shewalewadi-hadapsar', label: 'Affordable Flats Shewalewadi' },
            { href: '/properties/townships-near-magarpatta-city', label: 'Townships Near Magarpatta' },
            { href: '/properties/flats-near-pune-metro-line-3', label: 'Flats Near Pune Metro Line 3' },
        ]
    },
    {
        icon: TrendingUp,
        title: 'By Budget & Intent',
        links: [
            { href: '/properties/under-1-crore-flats-pune', label: 'Flats Under ₹1 Crore in Pune' },
            { href: '/properties/ready-possession-flats-pune-2026', label: 'Ready Possession Pune 2026' },
            { href: '/properties/nri-investment-flats-pune', label: 'NRI Investment Flats Pune' },
            { href: '/properties/investment-property-pune-2026', label: 'Investment Property Pune 2026' },
            { href: '/properties/na-bungalow-plots-near-purandar-airport', label: 'NA Plots Near Purandar Airport' },
        ]
    },
    {
        icon: CheckCircle2,
        title: 'By Status & Features',
        links: [
            { href: '/properties/ready-to-move-flats-hadapsar', label: 'Ready to Move Hadapsar' },
            { href: '/properties/new-launch-projects-pune-2025', label: 'New Launch Projects 2025' },
            { href: '/properties/new-launch-projects-pune-2026', label: 'New Launch Projects 2026' },
            { href: '/properties/rera-approved-flats-pune', label: 'RERA Approved Flats Pune' },
            { href: '/properties/smart-home-apartments-pune', label: 'Smart Home Apartments Pune' },
            { href: '/properties/gated-community-pune-2026', label: 'Gated Community Pune 2026' },
            { href: '/properties/shapoorji-pallonji-projects-pune', label: 'All Shapoorji Projects Pune' },
        ]
    },
    {
        icon: Shield,
        title: 'Competitor Comparisons',
        links: [
            { href: '/properties/joyville-vs-kolte-patil-life-republic-hinjewadi', label: 'Joyville vs Kolte Patil' },
            { href: '/properties/joyville-vs-godrej-hinjewadi', label: 'Joyville vs Godrej' },
            { href: '/properties/joyville-vs-vtp-bellissimo-hinjewadi', label: 'Joyville vs VTP Bellissimo' },
            { href: '/properties/joyville-vs-amanora-hadapsar', label: 'Joyville vs Amanora Hadapsar' },
            { href: '/properties/joyville-vs-pride-purple-pune', label: 'Joyville vs Pride Purple' },
            { href: '/properties/joyville-vs-gera-world-of-joy', label: 'Joyville vs Gera World of Joy' },
        ]
    }
];

export default function FlatsInPunePage() {
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
            { "@type": "ListItem", "position": 2, "name": "Flats in Pune", "item": `${siteUrl}/flats-in-pune` }
        ]
    };

    const allLinks = SECTIONS.flatMap(s => s.links);
    const itemListLd = {
        "@context": "https://schema.org",
        "@type": ["ItemList", "CollectionPage"],
        "name": "Flats in Pune by Shapoorji Pallonji",
        "description": "Complete directory of 40+ flat categories in Pune",
        "numberOfItems": allLinks.length,
        "itemListElement": allLinks.map((link, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": link.label,
            "url": `${siteUrl}${link.href}`
        }))
    };

    return (
        <div className="min-h-[100dvh] bg-[#EEF2F6] pt-32 pb-24 text-[#323334]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

            {/* Hero */}
            <header className="max-w-6xl mx-auto px-6 mb-16">
                <p className="text-[#1D4F9C] text-[10px] uppercase tracking-[0.3em] font-semibold mb-4 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-[#1D4F9C]" /> Shapoorji Pallonji Real Estate
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#323334] font-light leading-tight mb-6">
                    Flats in Pune — <span className="text-[#1D4F9C] italic">Complete Directory</span>
                </h1>
                <p className="text-lg text-[#323334]/80 font-light max-w-3xl leading-relaxed">
                    Explore every type of flat and apartment in Pune by Shapoorji Pallonji. Browse by BHK type, locality, budget, status, or compare with competitors. 32+ curated property searches across Hinjewadi, Hadapsar, Bavdhan, and Shewalewadi.
                </p>

                <div className="flex items-center gap-6 mt-8 text-sm text-[#1D4F9C] font-light">
                    <span className="flex items-center gap-2"><Building2 size={16} /> 9 Projects</span>
                    <span className="flex items-center gap-2"><MapPin size={16} /> 7 Localities</span>
                    <span className="flex items-center gap-2"><Home size={16} /> 40+ Searches</span>
                </div>
            </header>

            {/* Category Sections */}
            <div className="max-w-6xl mx-auto px-6 space-y-12">
                {SECTIONS.map((section, sIdx) => (
                    <section key={sIdx} className="bg-[#FFFFFF] border border-[#C5A059]/15 rounded-sm overflow-hidden shadow-sm">
                        <div className="bg-[#1D4F9C]/5 border-b border-[#C5A059]/10 px-8 py-5 flex items-center gap-3">
                            <section.icon size={20} className="text-[#1D4F9C]" />
                            <h2 className="text-lg font-serif text-[#323334]">{section.title}</h2>
                            <span className="ml-auto text-xs text-[#323334]/40 font-light">{section.links.length} searches</span>
                        </div>
                        <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {section.links.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center gap-3 px-4 py-3 bg-[#F4F6F9] border border-[#C5A059]/5 hover:border-[#1D4F9C]/30 hover:bg-[#1D4F9C]/5 transition-all rounded-sm group"
                                >
                                    <ArrowRight size={12} className="text-[#1D4F9C] group-hover:translate-x-1 transition-transform flex-shrink-0" />
                                    <span className="text-sm text-[#323334] group-hover:text-[#1D4F9C] transition-colors font-light">{link.label}</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* SEO Content Block */}
            <div className="max-w-5xl mx-auto px-6 mt-20">
                <h2 className="text-2xl font-serif text-[#323334] mb-4">Why Choose Shapoorji Pallonji for Flats in Pune?</h2>
                <div className="text-sm text-[#323334]/80 font-light leading-relaxed space-y-3">
                    <p>
                        With over 150 years of engineering legacy, Shapoorji Pallonji Real Estate brings unmatched construction quality to Pune&apos;s residential market. Our Joyville and Vanaha brands offer 2 & 3 BHK flats across Pune&apos;s top micro-markets — <Link href="/locality/hinjewadi" className="text-[#1D4F9C] hover:underline">Hinjewadi</Link>, <Link href="/locality/hadapsar" className="text-[#1D4F9C] hover:underline">Hadapsar</Link>, <Link href="/locality/bavdhan" className="text-[#1D4F9C] hover:underline">Bavdhan</Link>, and <Link href="/locality/shewalewadi" className="text-[#1D4F9C] hover:underline">Shewalewadi</Link>.
                    </p>
                    <p>
                        Every project is MahaRERA registered, EDGE green-certified, and comes with 60+ premium amenities. Whether you&apos;re looking for <Link href="/properties/under-1-crore-flats-pune" className="text-[#1D4F9C] hover:underline">affordable flats under ₹1 Crore</Link>, <Link href="/properties/ready-possession-flats-pune-2026" className="text-[#1D4F9C] hover:underline">ready possession homes</Link>, or <Link href="/properties/nri-investment-flats-pune" className="text-[#1D4F9C] hover:underline">NRI investment opportunities</Link>, explore our complete directory above.
                    </p>
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                    <Link href="/projects" className="px-8 py-4 bg-[#1D4F9C] text-[#FFFFFF] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#323334] transition-colors">
                        View All Projects
                    </Link>
                    <Link href="/pune-real-estate-guide" className="px-8 py-4 border border-[#1D4F9C] text-[#1D4F9C] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#1D4F9C] hover:text-[#FFFFFF] transition-colors">
                        Pune Buyer&apos;s Guide
                    </Link>
                </div>
            </div>
        </div>
    );
}
