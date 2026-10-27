import { Metadata } from 'next';
export const dynamic = 'force-static';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Map, ShieldCheck, TrendingUp, Info } from 'lucide-react';
import BrochureButton from '@/components/BrochureButton';
import ROICalculator from '@/components/ROICalculator';
import { BarChart3, Users } from 'lucide-react';

export const metadata: Metadata = {
    title: {
        absolute: "Pune Real Estate Guide 2026 | Rates, RERA & ROI Tips"
    },
    description: "Complete guide to buying property in Pune 2026. Explore micro-market trends (Hinjewadi, Hadapsar), RERA checklist, stamp duty, and investment ROI analysis.",
    keywords: [
        "Pune Real Estate Guide 2026",
        "How to buy a house in Pune",
        "Real Estate investment Pune ROI",
        "Best areas to live in Pune for families",
        "Pune property market trends 2026",
        "RERA registered projects Pune checklist",
        "Stamp duty and registration Pune 2026",
        "Ready to move flats Pune advantages"
    ],
    alternates: {
        canonical: "https://joyville-homes.com/pune-real-estate-guide"
    }
};

interface GuideLink {
    label: string;
    href: string;
    external?: boolean;
}

interface GuideSection {
    title: string;
    icon: React.ReactNode;
    content: string;
    links: GuideLink[];
}

export default async function HomebuyersGuide({ 
    searchParams 
}: { 
    searchParams: Promise<{ intent?: string }> 
}) {
    const resolvedSearchParams = await searchParams;
    const intent = resolvedSearchParams.intent;

    const sections: GuideSection[] = [
        {
            title: "Understanding Pune's Micro-Markets",
            icon: <Map className="text-accent" />,
            content: "Pune is divided into distinct growth corridors. The IT-heavy West (Hinjewadi, Bavdhan) offers high rental yields, while the established East (Hadapsar, Kharadi) provides massive township ecosystems. Choosing the right locality depends on your commute and lifestyle goals.",
            links: [
                { label: "Explore Hinjewadi Projects", href: "/locality/hinjewadi" },
                { label: "Explore Hadapsar Projects", href: "/locality/hadapsar" }
            ]
        },
        {
            title: "Legal & RERA Checklist",
            icon: <ShieldCheck className="text-accent" />,
            content: "Always verify the MahaRERA registration number. A registered project ensures transparency in carpet area, possession dates, and financial accountability. Shapoorji Pallonji's Joyville projects are 100% RERA compliant, offering peace of mind to first-time buyers.",
            links: [
                { label: "Verify RERA Status", href: "https://maharera.mahaonline.gov.in/", external: true }
            ]
        },
        {
            title: "Market Trends & ROI 2026",
            icon: <TrendingUp className="text-accent" />,
            content: "With the Pune Metro Line 3 and Ring Road expansion, property values in suburban hubs are projected to appreciate by 12-15% annually. Integrated townships like Joyville Hadapsar Annexe are seeing high demand from both end-users and NRI investors.",
            links: [
                { label: "Investment Analysis", href: "/insights" }
            ]
        }
    ];

    const personaContent = intent === 'investment' ? {
        badge: "Strategic Investor Track",
        title: "Maximize Your Alpha in Pune Real Estate",
        description: "Institutional-grade analysis for high-yield residential assets.",
        bg: "bg-[#1D4F9C]",
        icon: <BarChart3 className="text-[#C5A059]" />
    } : {
        badge: "First-Time Homebuyer Track",
        title: "Your Journey to a Perfect Pune Home",
        description: "Step-by-step guidance for a safe and transparent homebuying experience.",
        bg: "bg-accent",
        icon: <Users className="text-white" />
    };

    return (
        <article className="min-h-[100dvh] bg-white pt-32 pb-24 font-sans text-foreground">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://joyville-homes.com" },
                    { "@type": "ListItem", "position": 2, "name": "Pune Real Estate Guide", "item": "https://joyville-homes.com/pune-real-estate-guide" }
                ]
            }) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    { "@type": "Question", "name": "What are the best areas to invest in Pune real estate for 2025?", "acceptedAnswer": { "@type": "Answer", "text": "Hinjewadi Phase 1, Hadapsar-Shewalewadi corridor, and Bavdhan are top picks due to proximity to employment hubs and upcoming infrastructure like Metro Line 3." } },
                    { "@type": "Question", "name": "Is it a good time to buy property in Pune now?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, currently Pune offers a balanced supply and demand. With interest rates stabilizing and secondary market prices rising, pre-launch or under-construction projects by trusted brands like Shapoorji Pallonji offer high ROI." } },
                    { "@type": "Question", "name": "What is the average price of a 2 BHK in Pune?", "acceptedAnswer": { "@type": "Answer", "text": "Prices vary by locality. Premium 2 BHKs in growth corridors like Hinjewadi start around ₹75-80 Lakhs, while established areas like Bavdhan range from ₹90 Lakhs to ₹1.2 Cr." } }
                ]
            }) }} />
            {/* Hero Section */}
            <header className="max-w-7xl mx-auto px-6 mb-20">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 text-accent font-medium text-xs tracking-widest uppercase mb-4">
                            <BookOpen size={16} /> {personaContent.badge}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-6">
                            {personaContent.title.split(':').length > 1 ? (
                                <>{personaContent.title.split(':')[0]}: <span className="italic text-accent">{personaContent.title.split(':')[1]}</span></>
                            ) : (
                                personaContent.title
                            )}
                        </h1>
                        <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
                            Navigate the complex landscape of Pune&apos;s property market with data-driven insights, legal checklists, and investment trends curated by industry experts.
                        </p>
                    </div>
                    <div className="flex-1 relative aspect-[4/3] w-full rounded-sm overflow-hidden border border-border shadow-2xl">
                        <Image
                            src="/images/joyville_sensorium_projectcard.webp"
                            fill
                            alt="Pune Real Estate Market Investment Guide - Shapoorji Pallonji Joyville Homes"
                            className="object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>
            </header>

            {/* Strategic Content Grid */}
            <main className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-12 mb-32">
                    {sections.map((section, idx) => (
                        <div key={idx} className="bg-secondary/30 p-10 border border-border hover:border-accent/40 transition-all group">
                            <div className="mb-6 group-hover:scale-110 transition-transform duration-500">{section.icon}</div>
                            <h2 className="text-2xl font-serif mb-4">{section.title}</h2>
                            <p className="text-muted-foreground font-light text-sm leading-relaxed mb-8">{section.content}</p>
                            <div className="space-y-3">
                                {section.links.map((link, lIdx) => (
                                    <Link
                                        key={lIdx}
                                        href={link.href}
                                        target={link.external ? "_blank" : "_self"}
                                        className="flex items-center gap-2 text-accent text-xs uppercase tracking-widest font-semibold hover:text-foreground transition-colors"
                                    >
                                        {link.label} {link.external && <Info size={10} />}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Interactive ROI Calculator --- */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif mb-4 italic">Predict Your <span className="text-accent">Wealth Growth</span></h2>
                        <p className="text-muted-foreground font-light max-w-2xl mx-auto">Use our proprietary ROI engine to calculate projected appreciation and rental yields across Pune&apos;s primary growth corridors.</p>
                    </div>
                    <ROICalculator />
                </section>

                {/* Investment Deep Dive Section */}
                <section className="bg-foreground text-white p-16 rounded-sm mb-32 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 blur-[100px] pointer-events-none" />
                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-serif mb-8 italic">Why Pune is India&apos;s Preferred Investment Destination</h2>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs">01</div>
                                    <p className="text-sm font-light text-white/80"><span className="text-white font-medium">IT & Manufacturing Hub:</span> Home to over 800+ IT companies and global manufacturing giants like Mercedes-Benz.</p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs">02</div>
                                    <p className="text-sm font-light text-white/80"><span className="text-white font-medium">Educational Capital:</span> The &apos;Oxford of the East&apos; attracts thousands of students annually, driving residential rental demand.</p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs">03</div>
                                    <p className="text-sm font-light text-white/80"><span className="text-white font-medium">Infrastructure Boom:</span> Upcoming Ring Road and Metro expansions are unlocking new high-appreciation suburbs.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10">
                            <h3 className="text-xl font-serif mb-6 text-accent">Request Market Report</h3>
                            <p className="text-sm font-light mb-8 text-white/60">Download our detailed 2025 Market Sentiment Report including micro-market pricing trends and upcoming project pipeline.</p>
                            <BrochureButton projectName="Pune Market Guide" label="Download Report" />
                        </div>
                    </div>
                </section>

                {/* FAQ Section for SEO Rich Results */}
                <section className="max-w-4xl mx-auto mb-32">
                    <h2 className="text-3xl font-serif mb-12 text-center text-accent italic">Frequently Asked Questions</h2>
                    <div className="space-y-8">
                        {[
                            {
                                q: "What are the best areas to invest in Pune real estate for 2025?",
                                a: "Hinjewadi Phase 1, Hadapsar-Shewalewadi corridor, and Bavdhan are top picks due to proximity to employment hubs and upcoming infrastructure like Metro Line 3."
                            },
                            {
                                q: "Is it a good time to buy property in Pune now?",
                                a: "Yes, currently Pune offers a balanced supply and demand. With interest rates stabilizing and secondary market prices rising, pre-launch or under-construction projects by trusted brands like Shapoorji Pallonji offer high ROI."
                            },
                            {
                                q: "What is the average price of a 2 BHK in Pune?",
                                a: "Prices vary by locality. Premium 2 BHKs in growth corridors like Hinjewadi start around ₹75-80 Lakhs, while established areas like Bavdhan range from ₹90 Lakhs to ₹1.2 Cr."
                            }
                        ].map((faq, idx) => (
                            <div key={idx} className="border-b border-border pb-8">
                                <h3 className="text-xl font-serif mb-4 flex items-center gap-3">
                                    <span className="text-accent text-lg">Q.</span> {faq.q}
                                </h3>
                                <p className="text-muted-foreground font-light leading-relaxed pl-8">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* CTA Footer */}
            <footer className="bg-secondary py-20 text-center">
                <h2 className="text-4xl font-serif mb-6">Start Your Search Today</h2>
                <p className="text-muted-foreground mb-10 font-light italic">Browse our curated portfolio of premium residential projects across Pune.</p>
                <div className="flex justify-center gap-6">
                    <Link href="/projects" className="px-10 py-5 bg-accent text-white uppercase text-xs tracking-widest font-bold hover:bg-foreground transition-all">
                        View All Projects
                    </Link>
                </div>
            </footer>
        </article>
    );
}
