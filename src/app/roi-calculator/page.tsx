import { Metadata } from 'next';
import ROISimulator from '@/components/ROISimulator';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const siteUrl = 'https://joyville-homes.com';

export const metadata: Metadata = {
    title: {
        absolute: "Pune Real Estate ROI Calculator 2026 | Joyville Homes"
    },
    description: "Calculate your rental yield, capital appreciation, and absolute ROI for premium Shapoorji Pallonji Joyville flats in Pune. Free data-driven real estate investment calculator.",
    keywords: [
        "Pune real estate ROI calculator",
        "rental yield calculator Pune",
        "property investment return calculator",
        "Shapoorji Pallonji investment ROI",
        "buy flat in Pune investment",
        "real estate appreciation calculator India",
        "Hinjewadi rental yield",
        "Bavdhan property appreciation"
    ],
    alternates: {
        canonical: `${siteUrl}/roi-calculator`
    },
    openGraph: {
        title: "Pune Real Estate ROI Calculator | Data-Driven Returns",
        description: "Simulate your 5-year capital appreciation and rental yields across Pune's top IT corridors.",
        url: `${siteUrl}/roi-calculator`,
        type: 'website'
    }
};

export default function ROICalculatorPage() {
    const schemaLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": "Pune Real Estate ROI & Yield Calculator",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "INR"
                },
                "description": "An interactive real estate investment calculator designed to estimate 5-year capital appreciation, rental yield, and absolute ROI for properties in Pune's IT corridors like Hinjewadi and Hadapsar."
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What is a good rental yield in Pune?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "A good rental yield for premium residential properties in Pune (especially near IT hubs like Hinjewadi and Hadapsar) ranges from 3.5% to 5.0% annually, depending on the property type and exact location."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How is real estate ROI calculated in India?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Real estate ROI is calculated by adding the total capital appreciation over a holding period (e.g., 5 years) to the cumulative rental income generated, minus maintenance and taxation, divided by the initial investment cost."
                        }
                    }
                ]
            }
        ]
    };

    return (
        <main className="min-h-[100dvh] bg-[#F4F6F9] pt-32 pb-24 text-[#323334] selection:bg-[#1D4F9C] selection:text-[#FFFFFF]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }} />

            <div className="max-w-4xl mx-auto px-6 mb-12">
                <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1D4F9C] hover:text-[#C5A059] transition-colors mb-8">
                    <ArrowLeft size={14} /> Back to Hub
                </Link>

                <header className="mb-12 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-serif text-[#1D4F9C] mb-4">Real Estate ROI Simulator</h1>
                    <p className="text-lg font-light text-[#323334]/70 leading-relaxed max-w-2xl">
                        Simulate your potential returns, visualize 5-year capital appreciation, and calculate rental yields across Pune&apos;s most lucrative micro-markets.
                    </p>
                </header>

                {/* The ROI Simulator Component */}
                <div className="bg-[#FFFFFF] shadow-2xl rounded-sm overflow-hidden border border-[#1D4F9C]/10">
                    <ROISimulator />
                </div>

                <div className="mt-16 bg-[#EEF2F6] p-8 md:p-12 border-t-4 border-[#C5A059]">
                    <h2 className="text-2xl font-serif text-[#1D4F9C] mb-6">Why Use This Calculator?</h2>
                    <div className="space-y-4 text-sm font-light text-[#323334]/80 leading-relaxed">
                        <p>
                            Investing in Pune&apos;s real estate market requires precision. With massive infrastructure developments like the Pune Metro and the expansion of the Hinjewadi IT Park, micro-markets are seeing asymmetrical growth. 
                        </p>
                        <p>
                            Our proprietary ROI Simulator leverages conservative market intelligence to help you model returns for Shapoorji Pallonji Joyville projects. Whether you are aiming for high rental yields from IT professionals in <strong>Joyville Sensorium</strong> or long-term capital appreciation in <strong>Vanaha Bavdhan</strong>, this tool provides the data-driven clarity needed to make your next big investment.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
