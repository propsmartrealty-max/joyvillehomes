import { Metadata } from "next";
export const dynamic = 'force-static';
import Link from "next/link";
import { CheckCircle2, Trees, Droplets, Dumbbell, ShieldCheck, Gamepad2, Coffee, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Premium Luxury Amenities in Pune | Joyville Homes Hinjewadi",
    description: "Experience the Shapoorji Pallonji legacy with 60+ world-class luxury amenities at Joyville Homes Hinjewadi. The best residential projects in Pune.",
    keywords: [
        "Luxury amenities flats Pune",
        "Gated community Pune projects",
        "Premium lifestyle Hinjewadi apartments",
        "Joyville Homes Pune Phase 1",
        "Shapoorji Pallonji luxury flats"
    ],
    alternates: {
        canonical: "https://joyville-homes.com/amenities"
    }
};

export default function AmenitiesPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "Joyville Homes Pune Premium Amenities",
        "description": "Premium gated community in Hinjewadi Phase 1 offering 60+ world-class amenities.",
        "areaServed": {
            "@type": "City",
            "name": "Pune, Maharashtra"
        }
    };

    const amenityGroups = [
        {
            title: "Health & Wellness",
            icon: Dumbbell,
            items: ["State-of-the-Art Gymnasium", "Yoga & Meditation Pavilion", "Jogging/Cycling Track", "Acupressure Pathway"]
        },
        {
            title: "Recreation & Leisure",
            icon: Droplets,
            items: ["Infinity Swimming Pool", "Kids' Splash Pool", "Sun Deck", "Clubhouse with Lounge"]
        },
        {
            title: "Nature & Lush Greens",
            icon: Trees,
            items: ["10.5 Acres Total Development", "75% Open Green Spaces", "Thematic Gardens", "Reflexology Park"]
        },
        {
            title: "Sports & Games",
            icon: Gamepad2,
            items: ["Multi-purpose Sports Court", "Indoor Games Room (Billiards/TT)", "Kids' Play Area", "Cricket Practice Net"]
        },
        {
            title: "Community & Convenience",
            icon: Coffee,
            items: ["Multi-purpose Hall", "Co-working Spaces", "Cafeteria / Convenience Store", "Amphitheatre"]
        },
        {
            title: "Smart Security & Tech",
            icon: ShieldCheck,
            items: ["3-Tier Security System", "CCTV Surveillance", "Smart Home Automation Options", "High-speed Wi-Fi Zones"]
        }
    ];

    return (
        <article className="min-h-[100dvh] bg-[#FFFFFF] pt-32 pb-24 text-[#323334] selection:bg-[#1D4F9C] selection:text-[#FFFFFF]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://joyville-homes.com" },
                    { "@type": "ListItem", "position": 2, "name": "Premium Amenities", "item": "https://joyville-homes.com/amenities" }
                ]
            }) }} />

            <header className="max-w-7xl mx-auto px-6 mb-24 text-center">
                <div className="inline-flex items-center gap-4 text-[#1D4F9C] font-light text-xs tracking-[0.3em] uppercase mb-6">
                    <span className="w-8 h-[1px] bg-[#1D4F9C]" /> World-Class Standards <span className="w-8 h-[1px] bg-[#1D4F9C]" />
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-8 text-[#323334] font-light">
                    Unmatched <span className="text-[#1D4F9C] italic text-gradient">Amenities</span>
                </h1>
                <p className="text-[#323334]/90 text-lg max-w-3xl mx-auto font-light leading-relaxed">
                    A Shapoorji Pallonji Real Estate project promises more than just a residence. Explore Pune&apos;s most comprehensive offering of 60+ meticulously designed amenities that ensure a premium lifestyle within Hinjewadi Phase 1.
                </p>
            </header>

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {amenityGroups.map((group, idx) => (
                    <section key={idx} className="bg-[#EEF2F6] border border-[#C5A059]/30 shadow-lg p-10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-[#C5A059]/40 hover:-translate-y-2 transition-all duration-500 group rounded-sm">
                        <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#C5A059]/30 flex items-center justify-center text-[#1D4F9C] mb-8 group-hover:bg-[#1D4F9C] group-hover:text-[#FFFFFF] transition-colors duration-500 shadow-sm">
                            <group.icon size={28} className="stroke-1" />
                        </div>
                        <h2 className="text-2xl font-serif mb-8 text-[#323334] font-light">{group.title}</h2>
                        <ul className="space-y-5">
                            {group.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <CheckCircle2 className="text-[#1D4F9C] flex-shrink-0 mt-0.5 stroke-1" size={18} />
                                    <span className="text-[#323334]/90 font-light text-sm tracking-wide">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>

            <section className="max-w-5xl mx-auto px-6 mt-32 text-center">
                <div className="p-16 border border-[#C5A059]/30 bg-[#EEF2F6] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-sm relative overflow-hidden group">
                    <div 
                        style={{ backgroundImage: "url('/images/joyville_sensorium_projectcard.webp')" }}
                        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-luminosity group-hover:scale-105 transition-transform duration-[3000ms]" 
                    />
                    <div className="absolute inset-0 bg-[#EEF2F6]/80 backdrop-blur-sm" />

                    <div className="relative z-10">
                        <h2 className="text-4xl lg:text-5xl font-serif mb-6 text-[#323334] font-light">Experience Pune&apos;s <span className="text-[#1D4F9C] italic text-gradient">Finest</span> Life</h2>
                        <p className="text-[#323334]/90 mb-10 max-w-2xl mx-auto font-light text-lg">
                            Secure your premium 2 BHK or 3 BHK luxury flat at Joyville Homes Hinjewadi today. The legacy awaits.
                        </p>
                        <Link href="/" className="inline-flex items-center gap-4 px-10 py-5 bg-[#1D4F9C] text-[#FFFFFF] font-semibold uppercase tracking-[0.2em] text-xs hover:bg-[#323334] transition-colors duration-500 shadow-[0_0_30px_rgba(197,160,89,0.2)]">
                            Return to Projects <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </article>
    );
}
