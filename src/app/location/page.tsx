import { Metadata } from "next";
export const dynamic = "force-static";
import Link from "next/link";
import { MapPin, Navigation2, Briefcase, ShoppingBag, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: {
        absolute: "Joyville Homes Pune Locations | Hinjewadi & Hadapsar Hubs"
    },
    description: "Unrivaled connectivity for Shapoorji Pallonji's premium residential projects in Pune. Near Infosys, Wakad, and Pune Metro.",
    keywords: [
        "Flats near Infosys Pune",
        "Joyville Homes Pune location",
        "Shapoorji Pallonji Hinjewadi Phase 1",
        "Pune real estate prime location",
        "Buy property near Pune IT Hub",
        "Joyville Pune Hinjewadi",
        "Flats near Pune IT Parks",
        "Properties near Pune Metro",
        "Properties near Pune Airport / Metro / Highways"
    ],
    alternates: {
        canonical: "https://joyville-homes.com/location"
    }
};

export default function LocationPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": "https://joyville-homes.com/location/#collection",
                "name": "Joyville Homes Pune Locations & Connectivity Guide",
                "description": "Explore prime residential locations in Pune by Shapoorji Pallonji. Detailed connectivity guides for Hinjewadi, Hadapsar, and Bavdhan micro-markets.",
                "url": "https://joyville-homes.com/location",
                "publisher": {
                    "@id": "https://joyville-homes.com/#organization"
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://joyville-homes.com/location/#breadcrumb",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://joyville-homes.com" },
                    { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://joyville-homes.com/location" }
                ]
            }
        ]
    };

    const landmarks = [
        {
            category: "Pune IT Parks HQ",
            icon: Briefcase,
            places: [
                { name: "Infosys Phase 1", dist: "1.2 km", time: "5 Mins" },
                { name: "Wipro Technologies", dist: "1.5 km", time: "6 Mins" },
                { name: "TCS Sahyadri Park", dist: "2.5 km", time: "10 Mins" },
            ]
        },
        {
            category: "Major Pune Transit",
            icon: Navigation2,
            places: [
                { name: "Upcoming Metro Station", dist: "0.5 km", time: "2 Mins" },
                { name: "Mumbai-Bengaluru Highway", dist: "3.5 km", time: "10 Mins" },
                { name: "Pune Railway Station", dist: "20.0 km", time: "45 Mins" }
            ]
        },
        {
            category: "Premium Retail",
            icon: ShoppingBag,
            places: [
                { name: "Xion Mall", dist: "2.8 km", time: "8 Mins" },
                { name: "Balewadi High Street", dist: "8.0 km", time: "20 Mins" },
            ]
        }
    ];

    return (
        <article className="min-h-[100dvh] bg-[#FFFFFF] pt-32 pb-24 text-[#323334] selection:bg-[#1D4F9C] selection:text-[#FFFFFF]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <header className="max-w-7xl mx-auto px-6 mb-24 text-center">
                <div className="inline-flex items-center gap-4 text-[#1D4F9C] font-light text-xs tracking-[0.3em] uppercase mb-6">
                    <span className="w-8 h-[1px] bg-[#1D4F9C]" /> <MapPin size={14} className="mr-1" /> Heart of Hinjewadi <span className="w-8 h-[1px] bg-[#1D4F9C]" />
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-8 text-[#323334] font-light">
                    Strategic <span className="text-[#1D4F9C] italic text-gradient">Advantage</span>
                </h1>
                <p className="text-[#1A1A1A] text-lg max-w-3xl mx-auto font-light leading-relaxed">
                    When you invest in a Shapoorji Pallonji property in Pune, location is paramount. Joyville Homes offers unrivaled connectivity to the city&apos;s largest IT Hubs and crucial transit corridors.
                </p>
            </header>

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 mb-32 items-center">
                {/* Dark Premium Map Area */}
                <div className="relative h-full min-h-[500px] border border-[#C5A059]/60 bg-[#EEF2F6] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group overflow-hidden rounded-sm p-3">
                    <div 
                        style={{ backgroundImage: "url('/images/joyville_sensorium_projectcard.webp')" }}
                        className="absolute inset-0 m-3 bg-cover bg-center opacity-30 mix-blend-luminosity group-hover:scale-105 transition-transform duration-[3000ms] rounded-sm" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F4F6F9] via-transparent to-transparent pointer-events-none" />

                    {/* Simulated Premium Map Markers */}
                    <div className="absolute top-[30%] left-[45%] flex items-center justify-center">
                        <span className="absolute w-16 h-16 rounded-full bg-[#1D4F9C]/30 animate-pulse" />
                        <div className="relative w-6 h-6 rounded-full bg-[#1D4F9C] shadow-[0_0_30px_#1D4F9C] border-2 border-[#FFFFFF] flex items-center justify-center">
                            <MapPin size={12} className="text-[#FFFFFF]" />
                        </div>
                        <div className="absolute top-10 w-max px-6 py-3 bg-[#FFFFFF]/95 backdrop-blur-md border border-[#C5A059]/60 shadow-2xl text-[10px] tracking-[0.3em] uppercase text-[#323334] font-medium rounded-sm">Joyville Phase 1</div>
                    </div>
                </div>

                {/* Detailed Timeline Data */}
                <div className="space-y-10">
                    {landmarks.map((category, idx) => (
                        <section key={idx} className="bg-[#EEF2F6] p-10 rounded-sm border border-[#C5A059]/60 shadow-2xl hover:border-[#C5A059]/60 transition-colors duration-500">
                            <h2 className="text-2xl font-serif text-[#323334] mb-8 flex items-center gap-4 border-b border-[#C5A059]/60 pb-5 font-light">
                                <div className="p-3 bg-[#FFFFFF] text-[#1D4F9C] rounded-full border border-[#C5A059]/60 shadow-inner"><category.icon size={20} strokeWidth={1.5} /></div> {category.category}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-8">
                                {category.places.map((place, i) => (
                                    <div key={i} className="flex flex-col group">
                                        <h3 className="text-[#323334] font-medium mb-3 tracking-wide">{place.name}</h3>
                                        <div className="flex justify-between items-center text-sm border-t border-[#C5A059]/60 pt-3 group-hover:border-[#C5A059]/50 transition-colors">
                                            <span className="text-[#1A1A1A] font-light tracking-[0.2em] uppercase text-[10px]">{place.dist}</span>
                                            <span className="text-[#1D4F9C] font-serif font-medium italic">{place.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>

            <section className="max-w-7xl mx-auto px-6 text-center">
                <Link href="/" className="inline-flex items-center gap-4 px-10 py-5 bg-[#1D4F9C] text-[#FFFFFF] font-semibold uppercase tracking-[0.2em] text-xs hover:bg-[#323334] transition-colors duration-500 shadow-[0_0_30px_rgba(197,160,89,0.2)]">
                    Explore Projects <ArrowRight size={16} />
                </Link>
            </section>
        </article>
    );
}
