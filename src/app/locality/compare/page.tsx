import { Metadata } from 'next';
import { localities } from '@/data/localities';
import Link from 'next/link';
import { BarChart3, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

export const metadata: Metadata = {
    title: {
        absolute: "Pune Locality Comparison 2026 | Hinjewadi vs Hadapsar ROI"
    },
    description: "Compare Hinjewadi, Hadapsar, and Bavdhan micro-markets for investment potential. Data-backed ROI analysis, infrastructure growth scores, and occupancy rates for 2026.",
    keywords: ["Pune locality comparison", "Hinjewadi vs Hadapsar investment", "Bavdhan vs Hinjewadi real estate", "Pune property appreciation trends 2026"]
};

const siteUrl = 'https://joyville-homes.com';

export default function LocalityComparePage() {
    const mainLocalities = localities.filter(l => l.comparativeMetrics);

    const comparisonDatasetJsonLd = {
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": "Pune Real Estate Micro-Market Comparison 2026",
        "description": "Comparative matrix of Hinjewadi, Hadapsar, and Bavdhan micro-markets focusing on ROI, infrastructure velocity, and rental liquidity.",
        "creator": {
            "@type": "Organization",
            "name": "Shapoorji Pallonji Research Desk"
        },
        "variableMeasured": ["ROI Potential", "Infrastructure Growth", "Year-over-Year Appreciation", "Occupancy Rate"],
        "includedInDataCatalog": {
            "@type": "DataCatalog",
            "name": "Joyville Pune Market Intelligence"
        },
        "hasPart": mainLocalities.map(loc => ({
            "@type": "Dataset",
            "name": `${loc.name} Investment Profile`,
            "description": loc.description,
            "identifier": loc.slug
        }))
    };

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Which locality in Pune has the best ROI for 2026?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Based on current infrastructure velocity, Hinjewadi and Bavdhan show the highest capital appreciation potential due to Metro Line 3 connectivity, while Hadapsar offers superior rental liquidity."
                }
            },
            {
                "@type": "Question",
                "name": "Is it better to invest in Hinjewadi or Hadapsar?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Hinjewadi is ideal for long-term capital gains and proximity to IT hubs. Hadapsar is better for immediate rental income given its proximity to established commercial centers like SP Infocity."
                }
            }
        ]
    };

    const compareActionJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemPage",
        "name": "Pune Real Estate Micro-Market Comparison Matrix",
        "description": "Head-to-head comparison of Hinjewadi, Hadapsar, and Bavdhan for investment ROI.",
        "breadcrumb": "Home > Localities > Comparison",
        "potentialAction": {
            "@type": "CompareAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${siteUrl}/locality/compare`
            },
            "object": mainLocalities.map(loc => ({
                "@type": "City",
                "name": loc.name,
                "url": `${siteUrl}/locality/${loc.slug}`
            }))
        }
    };

    return (
        <main className="min-h-[100dvh] bg-[#EEF2F6] pt-32 pb-24 text-[#323334]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonDatasetJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compareActionJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            
            <div className="max-w-7xl mx-auto px-6">
                <header className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <BarChart3 className="text-[#1D4F9C]" size={24} />
                        <h1 className="text-4xl md:text-6xl font-serif text-[#323334] font-light">
                            Neighborhood Comparison Matrix
                        </h1>
                    </div>
                    <p className="text-xl text-[#323334]/70 font-light max-w-3xl leading-relaxed">
                        A data-driven analysis of Pune&apos;s premium corridors. Compare capital appreciation, infrastructure 
                        velocity, and rental liquidity to make informed investment decisions for 2026.
                    </p>
                </header>

                <div className="grid lg:grid-cols-3 gap-8 mb-20">
                    {mainLocalities.map((loc) => (
                        <div key={loc.id} className="bg-white border-t-4 border-[#1D4F9C] p-8 shadow-sm">
                            <span className="text-[10px] tracking-[0.2em] uppercase text-[#1D4F9C] font-bold block mb-4">
                                Micro-Market Profile
                            </span>
                            <h2 className="text-3xl font-serif text-[#323334] mb-2">{loc.name}</h2>
                            <p className="text-sm text-[#323334]/60 mb-8">{loc.subtitle}</p>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs uppercase tracking-widest text-[#323334]/50">ROI Potential</span>
                                        <span className="text-xl font-serif text-[#1D4F9C]">{loc.comparativeMetrics?.roiPotential}/10</span>
                                    </div>
                                    <div className="w-full h-1 bg-[#EEF2F6] rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-[#1D4F9C]" 
                                            style={{ width: `${(loc.comparativeMetrics?.roiPotential || 0) * 10}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs uppercase tracking-widest text-[#323334]/50">Infra Velocity</span>
                                        <span className="text-xl font-serif text-[#C5A059]">{loc.comparativeMetrics?.infraGrowth}/10</span>
                                    </div>
                                    <div className="w-full h-1 bg-[#EEF2F6] rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-[#C5A059]" 
                                            style={{ width: `${(loc.comparativeMetrics?.infraGrowth || 0) * 10}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#C5A059]/10">
                                    <div>
                                        <span className="text-[10px] uppercase text-[#323334]/40 block mb-1">Appreciation</span>
                                        <span className="text-xs font-bold text-green-600">{loc.yoyAppreciation} YoY</span>
                                    </div>
                                    <div>
                                        <span className="text-[10px] uppercase text-[#323334]/40 block mb-1">Occupancy</span>
                                        <span className="text-xs font-bold text-[#1D4F9C]">{loc.comparativeMetrics?.occupancyRate}</span>
                                    </div>
                                </div>
                            </div>

                            <Link 
                                href={`/locality/${loc.slug}`}
                                className="mt-8 flex items-center justify-between w-full p-4 bg-[#EEF2F6] hover:bg-[#1D4F9C] hover:text-white transition-all group"
                            >
                                <span className="text-[10px] font-bold uppercase tracking-widest">Full Report</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    ))}
                </div>

                <section className="bg-white p-12 shadow-sm border border-[#C5A059]/10">
                    <div className="flex items-center gap-3 mb-10">
                        <Zap className="text-[#C5A059]" size={20} />
                        <h3 className="text-2xl font-serif text-[#323334]">Infrastructure Catalyst Mesh</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-[#1D4F9C] mb-6">Mass Transit impact</h4>
                            <p className="text-sm font-light text-[#323334] leading-relaxed mb-6">
                                According to our premium research desk, the completion of <strong>Metro Line 3</strong> and the 
                                <strong>Pune Ring Road</strong> will redistribute liquidity toward west Pune, specifically 
                                favoring the Hinjewadi-Bavdhan cluster for capital gains.
                            </p>
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                                <ShieldCheck size={14} /> Analyst Verified Signal
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-[#1D4F9C] mb-6">Commercial Absportion</h4>
                            <p className="text-sm font-light text-[#323334] leading-relaxed mb-6">
                                East Pune (Hadapsar/Shewalewadi) continues to dominate in <strong>rental liquidity</strong> due 
                                to the sustained expansion of SP Infocity and Magarpatta ecosystem, rendering a healthy 3.5%-4.2% 
                                rental yield for early-phase apartments.
                            </p>
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                                <ShieldCheck size={14} /> Analyst Verified Signal
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
