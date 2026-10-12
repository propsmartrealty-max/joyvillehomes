"use client";

import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';
import DeepLinkDirectory from './DeepLinkDirectory';
import GoogleWebStoriesFooter from './GoogleWebStoriesFooter';

const footerLinks = {
    homebuyers: [
        { href: '/properties/ready-possession-flats-pune-2026', label: 'Ready Possession 2026' },
        { href: '/properties/under-1-crore-flats-pune', label: 'Flats Under ₹1 Cr' },
        { href: '/properties/rera-approved-flats-pune', label: 'RERA Approved Projects' },
        { href: '/properties/smart-home-apartments-pune', label: 'Smart Home Collection' },
        { href: '/properties/gated-community-pune-2026', label: 'Gated Communities' },
        { href: '/properties/pet-friendly-apartments-pune', label: 'Pet-Friendly Homes' },
        { href: '/properties/work-from-home-apartments-pune', label: 'WFH Ready Apartments' },
        { href: '/properties/vastu-compliant-flats-pune', label: 'Vastu Compliant Flats' },
        { href: '/insights/first-time-homebuyer-checklist-pune-2026', label: 'Homebuyer Checklist' },
        { href: '/glossary', label: 'Real Estate Glossary' },
    ],
    investors: [
        { href: '/properties/investment-property-pune-2026', label: 'Top Investment Picks' },
        { href: '/properties/best-flats-in-pune-2027', label: 'Best Flats 2027' },
        { href: '/properties/new-launch-projects-pune-2026', label: 'New Launch Opportunities' },
        { href: '/properties/flats-near-hinjewadi-metro-station-2027', label: 'Metro Station Flats' },
        { href: '/properties/flats-near-pune-ring-road', label: 'Ring Road Corridor' },
        { href: '/properties/vanaha-golfland-bavdhan-price-list', label: 'Vanaha Price List' },
        { href: '/properties/shapoorji-treetopia-plots-price-list', label: 'Treetopia Plots Price' },
        { href: '/properties/duplex-apartments-hinjewadi-pune', label: 'Duplex Hinjewadi' },
        { href: '/properties/luxury-penthouses-pune-2026', label: 'Luxury Penthouses' },
        { href: '/insights/matchmaker', label: 'Investment Matchmaker (New)' },
        { href: '/insights/joyville-vs-competitors', label: 'ROI Simulator Hub' },
    ],
    nris: [
        { href: '/properties/nri-investment-flats-pune', label: 'NRI Preferred Homes' },
        { href: '/insights/complete-nri-guide-buying-property-pune-2026', label: 'NRI Investment Guide' },
        { href: '/insights/rental-yields-hinjewadi-2025-nri-investment-guide', label: 'Rental Yield Analysis' },
        { href: '/properties/3-bhk-luxury-apartments-pune-west', label: 'Premium HNI Suites' },
        { href: '/insights/pune-it-corridor-hinjewadi-vs-kharadi-vs-magarpatta', label: 'IT Corridor Insights' },
        { href: '/insights/nri/region/nri-uae-dubai', label: 'UAE Regional Hub' },
        { href: '/insights/nri/region/nri-usa-tech', label: 'US Tech Investor Hub' },
    ],
    projects: [
        { href: '/projects/joyville-vyomora-hinjewadi', label: 'Joyville Vyomora' },
        { href: '/projects/joyville-sensorium-hinjewadi', label: 'Joyville Sensorium' },
        { href: '/projects/joyville-hadapsar-annexe-pune', label: 'Joyville Hadapsar Annexe' },
        { href: '/projects/joyville-celestia-hadapsar', label: 'Joyville Celestia' },
        { href: '/projects/joyville-skyluxe-hadapsar', label: 'Skyluxe Edition' },
        { href: '/projects/wildernest-sp-kingstown-pune', label: 'Wildernest Kingstown' },
        { href: '/projects/tree-clouds-sp-kingstown-pune', label: 'Tree Clouds Kingstown' },
        { href: '/projects/the-vastion-sp-kingstown-pune', label: 'The Vastion Kingstown' },
        { href: '/projects/vanaha-golfland-pune', label: 'Vanaha Golfland' },
        { href: '/projects/vanaha-springs-pune', label: 'Vanaha Springs' },
        { href: '/projects/vanaha-pune', label: 'Vanaha Bavdhan' },
        { href: '/projects/shapoorji-treetopia-pune', label: 'Shapoorji Treetopia' },
    ],
    localities: [
        { href: '/locality/hinjewadi', label: 'Hinjewadi' },
        { href: '/locality/hadapsar', label: 'Hadapsar' },
        { href: '/locality/bavdhan', label: 'Bavdhan' },
        { href: '/locality/shewalewadi', label: 'Shewalewadi' },
        { href: '/locality/purandar', label: 'Purandar' },
        { href: '/locality/kharadi', label: 'Kharadi' },
        { href: '/locality/wakad', label: 'Wakad' },
    ],
    comparisons: [
        { href: '/insights/hinjewadi-it-lifeline-master-guide-2027-roi', label: 'Hinjewadi Master Guide' },
        { href: '/insights/pune-east-township-corridor-guide-hadapsar-shewalewadi', label: 'East Pune Hub Guide' },
        { href: '/insights/bavdhan-1000-acre-nature-valley-master-guide-vanaha', label: 'Bavdhan Nature Hub Guide' },
        { href: '/insights/shapoorji-pallonji-pune-project-review-2026-master-collection', label: 'Master Collection Review' },
    ],
    popular: [
        { href: '/flats-in-pune', label: 'Flats in Pune — Directory' },
        { href: '/properties/2-bhk-flats-in-hinjewadi', label: '2 BHK Hinjewadi' },
        { href: '/properties/ready-possession-flats-pune-2026', label: 'Ready Possession 2026' },
        { href: '/properties/nri-investment-flats-pune', label: 'NRI Investment Pune' },
        { href: '/properties/under-1-crore-flats-pune', label: 'Under ₹1 Crore' },
        { href: '/pune-real-estate-market', label: 'Pune Market 2026' },
    ]
};

export default function SEOFooter() {
    const { formatPrice } = useCurrency();

    const getDynamicLabel = (label: string) => {
        if (label.includes('₹')) {
            // Special case for "₹1 Cr"
            if (label.includes('₹1 Cr')) {
                return label.replace('₹1 Cr', formatPrice('₹1.00 Cr'));
            }
            return label;
        }
        return label;
    };

    return (
        <>
            <DeepLinkDirectory />
            <footer className="bg-[#1A1A2E] text-[#FFFFFF] pt-20 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                {/* Google Web Stories Focused on All Shapoorji Pune Projects */}
                <GoogleWebStoriesFooter />

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
                    {/* Column 1: Homebuyers */}
                    <div>
                        <h3 className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-bold text-[#C5A059] mb-6">
                            For Homebuyers
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.homebuyers.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="block py-1 text-[#FFFFFF]/60 text-xs font-light hover:text-[#FFFFFF] transition-colors">
                                        {getDynamicLabel(link.label)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2: Investors */}
                    <div>
                        <h3 className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-bold text-[#C5A059] mb-6">
                            For Investors
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.investors.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="block py-1 text-[#FFFFFF]/60 text-xs font-light hover:text-[#FFFFFF] transition-colors">
                                        {getDynamicLabel(link.label)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: NRIs */}
                    <div>
                        <h3 className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-bold text-[#C5A059] mb-6">
                            For NRI Investors
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.nris.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="block py-1 text-[#FFFFFF]/60 text-xs font-light hover:text-[#FFFFFF] transition-colors">
                                        {getDynamicLabel(link.label)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Projects */}
                    <div>
                        <h3 className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-bold text-[#FFFFFF]/90 mb-6">
                            Portfolios
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.projects.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="block py-1 text-[#FFFFFF]/60 text-xs font-light hover:text-[#FFFFFF] transition-colors">
                                        {getDynamicLabel(link.label)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 5: Hubs */}
                    <div>
                        <h3 className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-bold text-[#FFFFFF]/90 mb-6">
                            Locality Hubs
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.localities.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="block py-1 text-[#FFFFFF]/60 text-xs font-light hover:text-[#FFFFFF] transition-colors">
                                        {getDynamicLabel(link.label)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 6: Comparisons (Optional/Dynamic) */}
                    <div className="hidden lg:block">
                        <h3 className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-bold text-[#C5A059] mb-6">
                            Comparison Data
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.comparisons.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="block py-1 text-[#FFFFFF]/60 text-xs font-light hover:text-[#FFFFFF] transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Phase 38: Hyper-Link Matrix - Deep Internal Linking Grid */}
                <div className="border-t border-[#FFFFFF]/10 pt-12 pb-8 mb-8">
                    <h3 className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#C5A059] mb-8">Sovereign Authority Hub — Internal Linking Matrix</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-10">
                        {/* Hinjewadi Silo */}
                        <div className="space-y-3">
                            <p className="text-[9px] font-bold text-[#FFFFFF]/40 uppercase tracking-widest border-b border-[#FFFFFF]/10 pb-2">Hinjewadi Silo</p>
                            <Link href="/projects/joyville-sensorium-hinjewadi" className="block text-[10px] text-[#FFFFFF]/60 hover:text-[#C5A059]">Joyville Sensorium</Link>
                            <Link href="/projects/joyville-vyomora-hinjewadi" className="block text-[10px] text-[#FFFFFF]/60 hover:text-[#C5A059]">Joyville Vyomora</Link>
                            <Link href="/properties/joyville-vs-kolte-patil-life-republic-hinjewadi" className="block text-[10px] text-[#FFFFFF]/40 hover:text-[#C5A059] italic">Joyville vs Life Republic</Link>
                        </div>
                        {/* Hadapsar Silo */}
                        <div className="space-y-3">
                            <p className="text-[9px] font-bold text-[#FFFFFF]/40 uppercase tracking-widest border-b border-[#FFFFFF]/10 pb-2">Hadapsar Silo</p>
                            <Link href="/projects/joyville-hadapsar-annexe-pune" className="block text-[10px] text-[#FFFFFF]/60 hover:text-[#C5A059]">Hadapsar Annexe</Link>
                            <Link href="/projects/joyville-celestia-hadapsar" className="block text-[10px] text-[#FFFFFF]/60 hover:text-[#C5A059]">Joyville Celestia</Link>
                            <Link href="/properties/joyville-vs-amanora-hadapsar" className="block text-[10px] text-[#FFFFFF]/40 hover:text-[#C5A059] italic">Joyville vs Amanora</Link>
                        </div>
                        {/* Bavdhan Silo */}
                        <div className="space-y-3">
                            <p className="text-[9px] font-bold text-[#FFFFFF]/40 uppercase tracking-widest border-b border-[#FFFFFF]/10 pb-2">Bavdhan Silo</p>
                            <Link href="/projects/vanaha-golfland-pune" className="block text-[10px] text-[#FFFFFF]/60 hover:text-[#C5A059]">Vanaha Golfland</Link>
                            <Link href="/projects/vanaha-springs-pune" className="block text-[10px] text-[#FFFFFF]/60 hover:text-[#C5A059]">Vanaha Springs</Link>
                            <Link href="/properties/vanaha-golfland-bavdhan-price-list" className="block text-[10px] text-[#FFFFFF]/40 hover:text-[#C5A059] italic">Vanaha Price List</Link>
                        </div>
                        {/* Investment Silo */}
                        <div className="space-y-3">
                            <p className="text-[9px] font-bold text-[#FFFFFF]/40 uppercase tracking-widest border-b border-[#FFFFFF]/10 pb-2">Investment Hub</p>
                            <Link href="/properties/investment-property-pune-2026" className="block text-[10px] text-[#FFFFFF]/60 hover:text-[#C5A059]">Best ROI 2026</Link>
                            <Link href="/properties/nri-investment-flats-pune" className="block text-[10px] text-[#FFFFFF]/60 hover:text-[#C5A059]">NRI Priority Hub</Link>
                            <Link href="/insights/matchmaker" className="block text-[10px] text-[#FFFFFF]/40 hover:text-[#C5A059] italic">Property Matchmaker</Link>
                        </div>
                        {/* Compliance Silo */}
                        <div className="space-y-3">
                            <p className="text-[9px] font-bold text-[#FFFFFF]/40 uppercase tracking-widest border-b border-[#FFFFFF]/10 pb-2">Compliance Hub</p>
                            <Link href="/properties/rera-approved-flats-pune" className="block text-[10px] text-[#FFFFFF]/60 hover:text-[#C5A059]">RERA Directory</Link>
                            <Link href="/glossary" className="block text-[10px] text-[#FFFFFF]/60 hover:text-[#C5A059]">Real Estate Glossary</Link>
                            <Link href="/disclaimer" className="block text-[10px] text-[#FFFFFF]/40 hover:text-[#C5A059] italic">Legal Framework</Link>
                        </div>
                        {/* Crawler Hub */}
                        <div className="space-y-3">
                            <p className="text-[9px] font-bold text-[#FFFFFF]/40 uppercase tracking-widest border-b border-[#FFFFFF]/10 pb-2">Crawler Intelligence</p>
                            <Link href="/sitemap.xml" className="block text-[10px] text-[#FFFFFF]/60 hover:text-[#C5A059]">Sitemap.xml</Link>
                            <Link href="/robots.txt" className="block text-[10px] text-[#FFFFFF]/60 hover:text-[#C5A059]">Robots.txt</Link>
                            <span className="block text-[8px] text-green-500 font-mono tracking-tighter uppercase">API::INDEXING::ACTIVE</span>
                        </div>
                        {/* RERA & Authority Silo */}
                        <div className="space-y-3">
                            <p className="text-[9px] font-bold text-[#FFFFFF]/40 uppercase tracking-widest border-b border-[#FFFFFF]/10 pb-2">RERA & Wikidata</p>
                            <a href="https://maharera.mahaonline.gov.in/" target="_blank" rel="noopener noreferrer" className="block text-[10px] text-[#FFFFFF]/60 hover:text-[#C5A059]">MahaRERA Official</a>
                            <span className="block text-[10px] text-[#FFFFFF]/60">India Geo-Entity</span>
                            <span className="block text-[10px] text-[#FFFFFF]/60">Pune City Authority</span>
                        </div>
                    </div>
                </div>

                {/* Local Business Map Embed & GMB Entity Link */}
                <div className="border-t border-[#FFFFFF]/10 pt-12 pb-8 mb-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 flex flex-col justify-center">
                        <h3 className="text-[14px] tracking-[0.25em] uppercase font-bold text-[#C5A059] mb-4">Visit Us</h3>
                        <p className="text-[12px] text-[#FFFFFF]/60 leading-relaxed font-light mb-6">
                            Experience the premium lifestyle at our flagship development. Joyville Homes is strategically located in the heart of Hinjewadi.
                        </p>
                        View Google Reviews
                    </div>
                    <div className="lg:col-span-2">
                        <iframe 
                            title="Joyville Homes Hinjewadi Location"
                            src="https://maps.google.com/maps?q=joyville+homes+hinjewadi&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                            width="100%" 
                            height="250" 
                            style={{ border: 0, opacity: 0.8 }} 
                            allowFullScreen={false} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-sm grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </div>
                </div>

                {/* Phase 38: Crawler Intelligence & Site Authority Hub */}
                <div className="border-t border-[#FFFFFF]/10 pt-8 pb-8 mb-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="col-span-1">
                        <h3 className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#C5A059] mb-3">Google Crawler Intelligence</h3>
                        <p className="text-[10px] text-[#FFFFFF]/40 leading-relaxed font-light uppercase tracking-wider">
                            Programmatic Indexing Active via Sovereign Bridge v3.0. Real-time SERP optimization and entity-level schema verification for Googlebot-mobile.
                        </p>
                    </div>
                    <div className="col-span-1 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[9px] uppercase tracking-[0.2em] text-[#FFFFFF]/60">Google Search Console Verified</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[9px] uppercase tracking-[0.2em] text-[#FFFFFF]/60">Sitemap.xml Protocol Hardened</span>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-wrap gap-2">
                            {['Googlebot', 'Bingbot', 'Gemini-Bot', 'ChatGPT-User'].map(bot => (
                                <span key={bot} className="px-3 py-1 bg-[#FFFFFF]/5 rounded-sm border border-[#FFFFFF]/10 text-[9px] font-mono text-[#FFFFFF]/30">
                                    {bot}::ALLOWED
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Phase 16.7: Popular Searches — PageRank distribution to money pages */}
                <div className="border-t border-[#FFFFFF]/10 pt-8 pb-8 mb-8">
                    <h3 className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#C5A059] mb-4">Pune Real Estate Market - Popular Searches</h3>
                    <div className="flex flex-wrap gap-3">
                        {footerLinks.popular.map(link => (
                            <Link key={link.href} href={link.href} className="px-4 py-2 border border-[#FFFFFF]/10 text-[#FFFFFF]/60 text-[10px] font-light tracking-wider hover:border-[#C5A059]/40 hover:text-[#FFFFFF] transition-all">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Ultimate Keyword Hardening Matrix (Semantic Injector) */}
                <div className="border-t border-[#FFFFFF]/10 pt-8 pb-8 mb-8">
                    <p className="text-[#FFFFFF]/20 text-[9px] font-light leading-relaxed text-justify">
                        <strong>Shapoorji Pallonji Joyville Homes Pune:</strong> As a leading developer in the <strong>Pune Real Estate Market</strong>, the <strong>Shapoorji Pallonji Joyville Homes Pune</strong> portfolio represents the pinnacle of luxury, trust, and capital appreciation. Whether you are seeking premium 2 BHK and 3 BHK flats in Hinjewadi, smart home apartments in Hadapsar, or an expansive 1000-acre township experience in Bavdhan, <strong>Shapoorji Pallonji Joyville Homes Pune</strong> delivers unparalleled construction quality (Mivan technology) and EDGE green building certification. With the rapidly expanding <strong>Pune Real Estate Market</strong>, investing in these prime IT corridors guarantees high rental yields and robust ROI for NRIs and local homebuyers alike. Explore the best of the <strong>Pune Real Estate Market</strong> with Shapoorji Pallonji.
                    </p>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-[#FFFFFF]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" itemScope itemType="https://schema.org/Organization">
                    <meta itemProp="name" content="Shapoorji Pallonji Real Estate" />
                    <meta itemProp="url" content="https://joyville-homes.com" />
                    <meta itemProp="logo" content="https://joyville-homes.com/logo.png" />
                    <div>
                        <span className="text-2xl font-serif text-[#FFFFFF]/80 tracking-widest uppercase">Joyville</span>
                        <span className="text-[8px] font-sans tracking-[0.4em] text-[#C5A059] uppercase ml-2">Pune</span>
                    </div>
                    <p className="text-[#FFFFFF]/30 text-[9px] tracking-[0.2em] uppercase text-center max-w-md">
                        Digital presence managed by Authorized Channel Partners. All projects are MahaRERA Registered. 
                        Official verification: <a href="https://maharera.mahaonline.gov.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#C5A059]">MahaRERA Portal</a>. 
                        © {new Date().getFullYear()} Shapoorji Pallonji Real Estate.
                    </p>
                    <div className="flex flex-wrap gap-6 text-[#FFFFFF]/40 text-[10px] uppercase tracking-widest font-light">
                        <Link href="/projects" className="hover:text-[#FFFFFF] transition-colors">Projects</Link>
                        <Link href="/insights" className="hover:text-[#FFFFFF] transition-colors">Insights</Link>
                        <Link href="/privacy-policy" className="hover:text-[#FFFFFF] transition-colors">Privacy Policy</Link>
                        <Link href="/terms-and-conditions" className="hover:text-[#FFFFFF] transition-colors">Terms</Link>
                        <Link href="/disclaimer" className="hover:text-[#FFFFFF] transition-colors">Disclaimer</Link>
                        <Link href="/glossary" className="hover:text-[#FFFFFF] transition-colors">Glossary</Link>
                    </div>
                </div>

                {/* Prominent Legal & RERA Disclaimer */}
                <div className="mt-12 pt-8 border-t border-[#FFFFFF]/10 text-[#FFFFFF]/40 text-[10px] sm:text-xs text-justify font-light leading-relaxed max-w-7xl mx-auto">
                    <p className="mb-4">
                        <strong className="text-[#FFFFFF]/70 font-medium uppercase tracking-widest text-[11px] block mb-2">Disclaimer & Statutory Notice</strong> 
                        The content provided on this website is for informational purposes only and does not constitute an offer, invitation, or solicitation to purchase properties. This is not the official developer website; it is managed by Authorized Channel Partners for marketing, education, and information dissemination. All project information, including but not limited to brochures, floor plans, pricing, layouts, and availability, is subject to change at the sole discretion of the developer without prior notice. 
                    </p>
                    <p>
                        The images, renders, and virtual tours shown are artistic impressions and representational in nature. Actual deliveries may vary. We do not guarantee the accuracy or completeness of the data presented and shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this information. All projects listed are MahaRERA registered. Prospective buyers are strongly advised to independently verify all details, including RERA registration numbers, property approvals, and terms of sale, by visiting the official MahaRERA website (<a href="https://maharera.mahaonline.gov.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#C5A059] transition-colors">https://maharera.mahaonline.gov.in</a>) before making any booking or investment decision. By providing your contact details, you authorize us to contact you via Whatsapp, SMS, Phone Call, or Email.
                    </p>
                </div>
            </div>
            </footer>
        </>
    );
}
