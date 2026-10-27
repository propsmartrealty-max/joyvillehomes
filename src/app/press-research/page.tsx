import { Metadata } from 'next';
export const dynamic = 'force-static';
import ResearchHub from '@/components/ResearchHub';
import { ShieldCheck, Globe, Users, Trophy } from 'lucide-react';

export const metadata: Metadata = {
    title: {
        absolute: "Press & Market Research Desk | Shapoorji Pallonji Pune"
    },
    description: "Official real estate research, market whitepapers, and corporate press releases from the Shapoorji Pallonji Institutional Desk. Data-backed ROI reports for Pune micro-markets.",
    keywords: ["Pune real estate whitepapers", "Shapoorji Pallonji press releases", "institutional real estate research Pune", "Pune property market reports 2026"]
};

export default function PressResearchPage() {
    return (
        <main className="min-h-[100dvh] bg-[#EEF2F6] pt-32 pb-24 text-[#323334]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://joyville-homes.com" },
                    { "@type": "ListItem", "position": 2, "name": "Press & Research", "item": "https://joyville-homes.com/press-research" }
                ]
            }) }} />
            
            <div className="max-w-7xl mx-auto px-6">
                <header className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <Globe className="text-[#1D4F9C]" size={20} />
                        <span className="text-[10px] tracking-[0.4em] uppercase text-[#1D4F9C] font-bold">Institutional Authority</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif text-[#323334] font-light mb-8 max-w-4xl">
                        Advancing the Science of Real Estate in Pune
                    </h1>
                    <p className="text-xl text-[#323334]/70 font-light max-w-2xl leading-relaxed">
                        The Shapoorji Pallonji Institutional Desk provides sovereign funds, wealth managers, and HNI 
                        investors with granular data and forward-looking economic models for the Pune residential market.
                    </p>
                </header>

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    <div className="bg-white p-8 border-l-2 border-[#C5A059]">
                        <Trophy className="text-[#C5A059] mb-4" size={24} />
                        <h3 className="text-lg font-serif mb-2">150+ Years</h3>
                        <p className="text-xs font-light text-[#323334]/60 uppercase tracking-widest">Engineering Heritage</p>
                    </div>
                    <div className="bg-white p-8 border-l-2 border-[#1D4F9C]">
                        <Users className="text-[#1D4F9C] mb-4" size={24} />
                        <h3 className="text-lg font-serif mb-2">Verified E-E-A-T</h3>
                        <p className="text-xs font-light text-[#323334]/60 uppercase tracking-widest">Expert Authority Mesh</p>
                    </div>
                    <div className="bg-white p-8 border-l-2 border-[#C5A059]">
                        <ShieldCheck className="text-[#C5A059] mb-4" size={24} />
                        <h3 className="text-lg font-serif mb-2">MahaRERA Gold</h3>
                        <p className="text-xs font-light text-[#323334]/60 uppercase tracking-widest">Institutional Compliance</p>
                    </div>
                </div>

                <ResearchHub />

                <section className="bg-white p-12 mt-20 border border-[#C5A059]/10 shadow-sm">
                    <div className="max-w-3xl">
                        <h2 className="text-2xl font-serif text-[#323334] mb-6">Media & Editorial Contact</h2>
                        <p className="text-sm font-light text-[#323334]/70 leading-relaxed mb-8">
                            For press inquiries, editorial collaborations, or to request spokesperson quotes regarding 
                            Pune market trends, please contact our corporate communications desk.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-8">
                            <div>
                                <span className="text-[10px] uppercase tracking-widest text-[#323334]/40 block mb-1">Press Desk</span>
                                <span className="text-sm font-bold text-[#1D4F9C]">press.pune@shapoorji.com</span>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase tracking-widest text-[#323334]/40 block mb-1">Corporate Office</span>
                                <address className="text-sm font-light not-italic text-[#323334]">
                                    SP Centre, Mumbai & Pune Regional HQ
                                </address>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
