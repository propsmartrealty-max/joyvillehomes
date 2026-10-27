import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: {
        absolute: "Pune Real Estate Market 2026 | Investment Guide & Trends"
    },
    description: "The complete guide to the Pune real estate market. Track property trends, capital appreciation, and best investment areas in Pune including Hinjewadi, Hadapsar & Bavdhan.",
    keywords: [
        "Pune real estate market", "Pune property trends", "best place to invest in Pune", "buy property in Pune", "Pune real estate 2026", "real estate developer Pune", "Shapoorji Pallonji Pune"
    ],
    alternates: {
        canonical: 'https://joyville-homes.com/pune-real-estate-market',
    }
};

export default function PuneRealEstateMarket() {
    return (
        <main className="min-h-[100dvh] bg-neutral pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://joyville-homes.com" },
                    { "@type": "ListItem", "position": 2, "name": "Pune Real Estate Market", "item": "https://joyville-homes.com/pune-real-estate-market" }
                ]
            }) }} />
            <div className="max-w-4xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
                        The Ultimate Guide to the Pune Real Estate Market (2026 Edition)
                    </h1>
                    <p className="text-lg md:text-xl text-primary/80 leading-relaxed">
                        Pune has firmly established itself as one of India&apos;s most resilient and rapidly appreciating real estate markets. Fueled by IT sector dominance, robust infrastructure development, and an influx of top-tier talent, the Pune real estate market offers unmatched capital appreciation.
                    </p>
                </header>

                <section className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-primary">Key Micro-Markets Driving Growth</h2>
                    <p className="text-primary/70 mb-6">
                        While the broader Pune market shows strong fundamentals, maximum ROI is concentrated in specific infrastructural corridors.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-neutral p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-2">Hinjewadi</h3>
                            <p className="text-sm text-primary/70 mb-4">The IT capital of Pune, witnessing immense growth due to the upcoming Metro Line 3.</p>
                            <Link href="/locality/hinjewadi" className="text-accent font-medium hover:underline text-sm">Explore Hinjewadi Properties →</Link>
                        </div>
                        <div className="bg-neutral p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-2">Hadapsar</h3>
                            <p className="text-sm text-primary/70 mb-4">The eastern commercial hub, strategically positioned near Magarpatta City and SP Infocity.</p>
                            <Link href="/locality/hadapsar" className="text-accent font-medium hover:underline text-sm">Explore Hadapsar Properties →</Link>
                        </div>
                        <div className="bg-neutral p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-2">Bavdhan</h3>
                            <p className="text-sm text-primary/70 mb-4">West Pune&apos;s premium residential enclave, offering excellent connectivity and pristine surroundings.</p>
                            <Link href="/locality/bavdhan" className="text-accent font-medium hover:underline text-sm">Explore Bavdhan Properties →</Link>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-serif text-primary mb-6">Why Invest with Shapoorji Pallonji?</h2>
                    <p className="text-primary/80 text-lg mb-6 leading-relaxed">
                        Shapoorji Pallonji Real Estate brings a 150+ year legacy of engineering excellence to the Pune market. Through the Joyville brand, we offer meticulously planned residential projects that command premium resale value and high rental yields.
                    </p>
                    <Link 
                        href="/projects" 
                        className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors"
                    >
                        View All Premium Projects in Pune
                    </Link>
                </section>
            </div>
        </main>
    );
}
