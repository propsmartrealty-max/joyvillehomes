import { Metadata } from 'next';
export const dynamic = 'force-static';
import HomeClient from '@/components/HomeClient';
import InfrastructurePulse from '@/components/InfrastructurePulse';
import ShapoorjiPuneMasterSweep from '@/components/ShapoorjiPuneMasterSweep';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
    title: {
        absolute: "Joyville Homes Pune™ [Official Partner] 1-5 BHK from ₹65L*",
    },
    description: "★ 4.9/5 Official Partner Portal. 12 Shapoorji Pallonji projects in Pune (Hinjewadi, Hadapsar, Bavdhan & Purandar). 1-5 BHK from ₹65L*. Download 2026 Plans & Brochure.",
    keywords: [
        "Shapoorji Pallonji Pune projects",
        "Joyville Homes Pune",
        "Joyville Vyomora Hinjewadi",
        "Joyville Sensorium Hinjewadi",
        "Joyville Hadapsar Annexe",
        "Tree Clouds SP Kingstown",
        "The Vastion SP Kingstown",
        "Wildernest SP Kingstown",
        "Vanaha Bavdhan Pune",
        "Shapoorji Treetopia Pune",
        "flats in Hinjewadi Phase 1",
        "apartments in Hadapsar Pune",
        "Shapoorji Pallonji Pune price list 2026",
        "Joyville Pune floor plans"
    ],
    alternates: {
        canonical: 'https://joyville-homes.com',
    }
};

export default function Home() {
    return (
        <>
            <HomeClient />
            
            <section className="max-w-7xl mx-auto px-6 mt-12 mb-12">
                <InfrastructurePulse />
            </section>

            <ShapoorjiPuneMasterSweep />
            
            {/* Phase 33: Homepage Matchmaker Funnel */}
            <section className="bg-[#FFFFFF] py-24 border-y border-[#C5A059]/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-[#1D4F9C] rounded-sm p-12 md:p-20 text-white flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12" />
                        <div className="max-w-2xl text-center lg:text-left relative z-10">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C5A059] mb-6 block">The Decision Engine</span>
                            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Which Joyville Project Is <span className="italic opacity-80">Right For You?</span></h2>
                            <p className="text-lg font-light opacity-70 leading-relaxed mb-10">
                                Skip the search and get a data-backed recommendation in 60 seconds. Our matchmaker analyzes your budget, location priority, and ROI goals to find your ideal SP asset.
                            </p>
                            <Link href="/insights/matchmaker" className="inline-flex items-center gap-4 bg-white text-[#1D4F9C] px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-white transition-all shadow-xl">
                                Start Matchmaker <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                        <div className="hidden lg:flex items-center justify-center relative z-10 p-12 border border-white/10 rounded-full group-hover:scale-105 transition-transform duration-700">
                             <div className="w-32 h-32 bg-[#C5A059] rounded-full flex items-center justify-center shadow-2xl">
                                <Sparkles className="w-12 h-12 text-[#1D4F9C]" />
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Phase 37: Market Intelligence Manifest — Strategic Internal Mesh */}
            <section className="bg-[#EEF2F6] py-16 border-b border-[#C5A059]/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { title: "Hinjewadi IT Cluster", slug: "/insights/topic/hinjewadi-it-hub", desc: "Rental yield and appreciation trends." },
                            { title: "East Pune Growth", slug: "/insights/topic/pune-townships", desc: "Hadapsar infrastructure roadmap." },
                            { title: "Global NRI Portfolio", slug: "/insights/topic/nri-investment", desc: "FEMA & cross-border asset data." },
                            { title: "Rental Market 2026", slug: "/insights/topic/pune-rental-market", desc: "Yield analysis for IT corridors." }
                        ].map((hub, idx) => (
                            <Link key={idx} href={hub.slug} className="group p-6 bg-white border border-[#C5A059]/10 rounded-sm hover:border-[#1D4F9C]/30 transition-all">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#323334] mb-2 group-hover:text-[#1D4F9C]">{hub.title}</h3>
                                <p className="text-[10px] text-[#323334]/60 font-light leading-relaxed">{hub.desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Rank #1 Visible Semantic Authority Injection */}
            <section className="bg-white py-16 md:py-24 border-t border-[#C5A059]/10">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-serif mb-6 text-[#1D4F9C]">Shapoorji Pallonji Real Estate: Defining Pune&apos;s Skyline</h2>
                    <div className="space-y-6 text-sm md:text-base font-light text-[#323334]/80 leading-relaxed text-left">
                        <p>
                            As Pune rapidly expands into a global IT and manufacturing powerhouse, the demand for premium, reliable housing has never been higher. <strong>Shapoorji Pallonji Real Estate Pune</strong> stands at the forefront of this transformation, delivering unparalleled luxury and trust through the <strong>Joyville Homes</strong> portfolio. Whether you are looking to <Link href="/flats-in-pune" className="text-[#C5A059] underline hover:text-[#1D4F9C]">buy flats in Pune</Link> or seeking high-yield real estate investments, our projects offer the perfect blend of modern architecture and natural serenity.
                        </p>
                        <p>
                            Our footprint covers the city&apos;s most high-growth corridors. In the West, <strong>Joyville Sensorium</strong> and the sprawling <strong>Vanaha Bavdhan</strong> township (featuring Golfland and Springs) offer residents immediate access to the Hinjewadi IT Park and Mumbai-Bengaluru highway. For those seeking absolute exclusivity, <strong>Joyville Vyomora</strong> represents the pinnacle of luxury living in Pune. In the East, <strong>Joyville Hadapsar Annexe</strong>, <strong>Joyville Celestia</strong>, and <strong>Joyville Skyluxe Edition</strong> provide unparalleled connectivity to SP Infocity and Magarpatta, making them the ultimate choice for IT professionals.
                        </p>
                        <p>
                            Every Shapoorji Pallonji project in Pune is strictly RERA-approved, backed by a 150+ year legacy of construction excellence. From expansive 2 BHK and 3 BHK flats to exclusive townhomes, we build more than just houses; we build generational wealth and vibrant communities. Explore our <Link href="/projects" className="text-[#C5A059] underline hover:text-[#1D4F9C]">official price list and floor plans</Link> to secure your future today.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Schema Payload for Google Rich Snippets & PAA Accordions */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "What are the top Shapoorji Pallonji Joyville projects in Pune for 2026?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Top Shapoorji Pallonji projects in Pune include Joyville Vyomora (25-Acre community in Hinjewadi Phase 1 from ₹88.19L*), Joyville Sensorium (Biophilic homes in Hinjewadi from ₹1.10 Cr*), Joyville Hadapsar Annexe, Celestia & Skyluxe (21-Acre township from ₹65L*), Wildernest, Tree Clouds & The Vastion at SP Kingstown (Hadapsar Annexe), Vanaha Golfland & Springs (Bavdhan 1,000-Acre township from ₹95L*), and Treetopia (NA Villa plots near Purandar Airport from ₹99L*)."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "What is the starting price of flats across Joyville Pune projects?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Shapoorji Pallonji residential flats in Pune start from ₹65 Lakhs* for 1 BHK at Joyville Hadapsar Annexe, ₹80 Lakhs* for 2 BHK in Hadapsar, and ₹88.19 Lakhs* for 2 BHK at Joyville Vyomora Hinjewadi. Luxury 3 BHK homes start from ₹1.25 Cr*, while ultra-luxury estate villaments at The Vastion SP Kingstown are priced up to ₹6.80 Cr*."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Why book directly through the official Joyville Homes developer portal?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Booking directly via joyville-homes.com guarantees 100% zero brokerage, direct developer allocation, verified inventory price protection, transparent payment plans, MahaRERA compliant documentation, and dedicated home loan assistance with leading banks."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Are Joyville projects in Pune ready to move or under construction?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Joyville Hadapsar Annexe offers ready-to-move towers with Occupancy Certificates (OC received). Brand new launches and under-construction developments include Joyville Vyomora (possession 2029), Joyville Sensorium (possession 2026-27), Joyville Celestia (2027), Tree Clouds (2028), and The Vastion (2029)."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "What is the construction technology used in Joyville Pune residences?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Joyville residences are constructed using 100% monolithic Aluform / Mivan RCC shear wall engineering. This delivers superior Zone 3 earthquake resistance, seamless joint-free walls that prevent seepage, smooth finishes, and maximum usable carpet area."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "What rental yields can investors achieve in Joyville Hinjewadi and Hadapsar?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Joyville Hinjewadi Phase 1 properties achieve 4.8% to 5.4% annual rental yield due to high demand from Rajiv Gandhi Infotech Park and Pune Metro Line 3. Hadapsar Annexe properties deliver 4.2% to 4.8% rental yield driven by Magarpatta City and SP Infocity."
                            }
                        }
                    ]
                })
            }} />
        </>
    );
}
