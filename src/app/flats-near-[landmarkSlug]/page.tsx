import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Programmatic SEO Database
const LANDMARKS = [
    { slug: 'infosys-hinjewadi', name: 'Infosys Hinjewadi Phase 1', project: 'Joyville Sensorium', price: '₹1.10 Cr', url: '/projects/joyville-sensorium-hinjewadi' },
    { slug: 'wtc-pune', name: 'World Trade Center Pune', project: 'Joyville Hadapsar Annexe', price: '₹65 Lakhs', url: '/projects/joyville-hadapsar-annexe-pune' },
    { slug: 'magarpatta-city', name: 'Magarpatta City IT Park', project: 'Joyville Hadapsar Annexe', price: '₹65 Lakhs', url: '/projects/joyville-hadapsar-annexe-pune' },
    { slug: 'symbiosis-university', name: 'Symbiosis International University', project: 'Joyville Sensorium', price: '₹1.10 Cr', url: '/projects/joyville-sensorium-hinjewadi' },
    { slug: 'bavdhan-highway', name: 'Bavdhan Highway Junction', project: 'Vanaha by Shapoorji', price: '₹89 Lakhs', url: '/projects/vanaha-bavdhan' },
];

export async function generateStaticParams() {
    return LANDMARKS.map((landmark) => ({
        landmarkSlug: landmark.slug,
    }));
}

export async function generateMetadata(
    { params }: { params: { landmarkSlug: string } }
): Promise<Metadata> {
    const { landmarkSlug } = await params;
    const landmark = LANDMARKS.find(l => l.slug === landmarkSlug);

    if (!landmark) return { title: 'Premium Flats in Pune | Joyville' };

    return {
        title: `Premium Flats near ${landmark.name} | ${landmark.project}`,
        description: `Looking for flats near ${landmark.name}? Explore ${landmark.project} by Shapoorji Pallonji. Premium 2 & 3 BHK apartments starting at ${landmark.price}.`,
        alternates: {
            canonical: `https://joyville-homes.com/flats-near-${landmarkSlug}`
        }
    };
}

export default async function ProgrammaticLandingPage({ params }: { params: { landmarkSlug: string } }) {
    const { landmarkSlug } = await params;
    const landmark = LANDMARKS.find(l => l.slug === landmarkSlug);

    if (!landmark) return <div className="p-20 text-center">Location not found.</div>;

    return (
        <main className="min-h-[100dvh] bg-[#F8FAFC]">
            {/* SEO Hero Section */}
            <section className="relative pt-32 pb-20 px-6 bg-[#1D4F9C] text-white">
                <div className="absolute inset-0 z-0 opacity-20">
                    <Image src="/images/hero_bg.webp" fill alt={`Luxury flats near ${landmark.name} Pune - ${landmark.project}`} className="object-cover" priority />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                        Premium Flats Near <span className="text-[#C5A059]">{landmark.name}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10">
                        Cut down your commute. Discover luxury 2 & 3 BHK apartments at {landmark.project}, located just minutes away from {landmark.name}.
                    </p>
                    <Link 
                        href={landmark.url}
                        className="inline-block bg-[#C5A059] text-white px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-[#1D4F9C] transition-colors rounded-sm"
                    >
                        Explore {landmark.project}
                    </Link>
                </div>
            </section>

            {/* Semantic Value Proposition */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl font-serif text-[#323334]">Why live near {landmark.name}?</h2>
                    <p className="text-[#323334]/80 leading-relaxed text-lg">
                        Living close to {landmark.name} ensures you spend less time in traffic and more time with your family. 
                        {landmark.project} by Shapoorji Pallonji offers world-class amenities, robust Mivan construction, and massive open green spaces right at the epicenter of Pune&apos;s growth corridor.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-8 pt-10">
                        <div className="p-8 border border-[#EEF2F6] shadow-sm rounded-lg">
                            <h3 className="text-xl font-bold text-[#1D4F9C] mb-3">0 Min</h3>
                            <p className="text-sm text-gray-500">Wasted in Commute</p>
                        </div>
                        <div className="p-8 border border-[#EEF2F6] shadow-sm rounded-lg">
                            <h3 className="text-xl font-bold text-[#1D4F9C] mb-3">{landmark.price}</h3>
                            <p className="text-sm text-gray-500">Starting Price</p>
                        </div>
                        <div className="p-8 border border-[#EEF2F6] shadow-sm rounded-lg">
                            <h3 className="text-xl font-bold text-[#1D4F9C] mb-3">Premium</h3>
                            <p className="text-sm text-gray-500">Shapoorji Legacy</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
