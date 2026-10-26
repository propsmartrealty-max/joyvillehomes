/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { generateUnitSlug, parsePriceToINR } from '@/utils/seo-utils';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight, CheckCircle2, Shield, Clock, TrendingUp, BarChart3, Smartphone, Building2 } from 'lucide-react';
import PriceDisplay from '@/components/PriceDisplay';
import EMICalculator from '@/components/EMICalculator';
import BrochureButton from '@/components/BrochureButton';
import Breadcrumbs from '@/components/Breadcrumbs';
import LiveActivityFeed from '@/components/LiveActivityFeed';
import { SITE_WIDE_HARDENED_KEYWORDS } from '@/data/KeywordIntelligence';

const siteUrl = 'https://joyville-homes.com';

export async function generateStaticParams() {
    const params: { unitSlug: string }[] = [];
    
    projects.forEach(project => {
        project.floorPlans.forEach(plan => {
            params.push({
                unitSlug: generateUnitSlug(project.title, plan.type, project.location)
            });
        });
    });
    
    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ unitSlug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const { unitSlug } = resolvedParams;
    
    // Find the project and plan that matches this slug
    let matchedProject: any = null;
    let matchedPlan: any = null;
    
    for (const project of projects) {
        for (const plan of project.floorPlans) {
            if (generateUnitSlug(project.title, plan.type, project.location) === unitSlug) {
                matchedProject = project;
                matchedPlan = plan;
                break;
            }
        }
        if (matchedProject) break;
    }
    
    if (!matchedProject || !matchedPlan) {
        return { title: 'Configuration Not Found | Joyville Pune' };
    }
    
    const shortLoc = matchedProject.location.includes('Hinjewadi') ? 'Hinjewadi'
        : matchedProject.location.includes('Hadapsar') || matchedProject.location.includes('Shewalewadi') ? 'Hadapsar'
        : matchedProject.location.includes('Bavdhan') ? 'Bavdhan'
        : matchedProject.location.includes('Purandar') || matchedProject.location.includes('Jadhavwadi') ? 'Purandar'
        : matchedProject.location.split(',')[0].trim();

    const cleanProj = matchedProject.title
        .replace(' at SP Kingstown', '')
        .replace('Shapoorji Pallonji ', '')
        .replace(' Edition', '')
        .trim();
    const projWithLoc = cleanProj.toLowerCase().includes(shortLoc.toLowerCase()) ? cleanProj : `${cleanProj} ${shortLoc}`;
    
    // High-CTR 50-60 char title for Google SERP
    let title = `${matchedPlan.type} | ${projWithLoc} | 2026 Price & Plan`;
    if (title.length > 60) {
        title = `${matchedPlan.type} | ${cleanProj} | 2026 Price & Plan`;
    }
    if (title.length > 60) {
        title = `${matchedPlan.type} | ${cleanProj} | Price & Floor Plan`;
    }
    if (title.length > 60) {
        title = `${matchedPlan.type} | ${cleanProj} | 2026 Price`;
    }
    
    const description = `Direct Inventory: ${matchedPlan.type} (${matchedPlan.carpetArea}) at ${cleanProj}, ${shortLoc}. Starting ${matchedPlan.price || matchedProject.price}. Download 2026 floor plan and cost sheet.`;
    
    return {
        title: {
            absolute: title
        },
        description,
        keywords: [
            `${matchedProject.title} ${matchedPlan.type} price`,
            `${matchedProject.title} ${matchedPlan.type} floor plan`,
            `${matchedPlan.type} flats in ${matchedProject.location}`,
            `buy ${matchedPlan.type} in ${matchedProject.title}`,
            `carpet area of ${matchedPlan.type} in ${matchedProject.title}`,
            `${matchedProject.title} ${matchedPlan.type} rental yield`,
            ...SITE_WIDE_HARDENED_KEYWORDS,
            `Shapoorji Pallonji ${matchedProject.location} 2026`
        ],
        openGraph: {
            title,
            description,
            url: `${siteUrl}/properties/unit/${unitSlug}`,
            siteName: 'Joyville Homes Pune',
            images: [
                {
                    url: matchedPlan.image || matchedProject.image,
                    width: 1200,
                    height: 630,
                    alt: `${matchedPlan.type} at ${matchedProject.title} ${matchedProject.location}`
                }
            ],
            locale: 'en_IN',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [matchedPlan.image || matchedProject.image],
        },
        alternates: {
            canonical: `${siteUrl}/properties/unit/${unitSlug}`,
        }
    };
}

export default async function UnitDetailPage({ params }: { params: Promise<{ unitSlug: string }> }) {
    const resolvedParams = await params;
    const { unitSlug } = resolvedParams;
    
    let project: any = null;
    let plan: any = null;
    
    for (const p of projects) {
        for (const fp of p.floorPlans) {
            if (generateUnitSlug(p.title, fp.type, p.location) === unitSlug) {
                project = p;
                plan = fp;
                break;
            }
        }
        if (project) break;
    }
    
    if (!project || !plan) {
        notFound();
    }

    const rera = Array.isArray(project.reraNumber) ? project.reraNumber[0] : (project.reraNumber || 'PR1260002600999');
    const roomsCount = plan.type.includes('3') ? 3 : (plan.type.includes('2') ? 2 : (plan.type.includes('1') ? 1 : 4));

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": `${plan.type} at ${project.title} | Shapoorji Pallonji ${project.location}`,
        "description": `Official ${plan.type} configuration with ${plan.carpetArea} carpet area at ${project.title}, ${project.location}. MahaRERA: ${rera}. Price: ${project.price}.`,
        "url": `${siteUrl}/properties/unit/${unitSlug}`,
        "image": plan.image ? `${siteUrl}${plan.image}` : `${siteUrl}${project.image}`,
        "datePosted": "2026-01-01",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": project.location,
            "addressLocality": "Pune",
            "addressRegion": "Maharashtra",
            "postalCode": "411057",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": project.latitude || 18.5913,
            "longitude": project.longitude || 73.7389
        },
        "mainEntity": {
            "@type": plan.category === 'Duplex' ? "SingleFamilyResidence" : "Apartment",
            "name": `${plan.type} - ${project.title}`,
            "numberOfRooms": roomsCount,
            "floorSize": {
                "@type": "QuantitativeValue",
                "value": plan.carpetArea.split(' ')[0],
                "unitCode": "FTK"
            }
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": parsePriceToINR(project.price),
            "priceValidUntil": "2026-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": project.status.toLowerCase().includes('ready') ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
            "seller": {
                "@type": "RealEstateAgent",
                "name": "Shapoorji Pallonji Real Estate",
                "url": siteUrl
            }
        }
    };

    return (
        <main className="min-h-[100dvh] bg-[#EEF2F6] pt-32 pb-24 text-[#323334]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            
            <div className="max-w-7xl mx-auto px-6 mb-8 pt-6">
                <Breadcrumbs 
                    items={[
                        { label: "Portfolios", href: "/projects" },
                        { label: project.title, href: `/projects/${project.slug}` },
                        { label: plan.type, href: `/properties/unit/${unitSlug}` }
                    ]}
                />
            </div>

            <header className="max-w-7xl mx-auto px-6 mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 text-[#1D4F9C] text-[10px] tracking-[0.3em] uppercase font-bold mb-4">
                            <Smartphone size={14} /> Smart Configuration Intelligence
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif text-[#323334] font-light mb-6">
                            {plan.type} <span className="text-[#1D4F9C] italic">Residence</span> at {project.title}
                        </h1>
                        <div className="flex items-center gap-2 text-[#323334]/60 text-sm font-light">
                            <MapPin size={16} className="text-[#1D4F9C]" /> {project.location}
                        </div>
                    </div>
                    <div className="bg-[#FFFFFF] p-8 border border-[#C5A059]/20 shadow-xl rounded-sm">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-[#323334]/40 block mb-2 font-bold">Starting Price</span>
                        <PriceDisplay price={project.price} className="text-3xl font-serif italic text-[#1D4F9C] block" />
                        <BrochureButton projectName={project.title} className="mt-6 w-full py-4" />
                    </div>
                </div>
            </header>

            <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 mb-20">
                {/* Left Col: Floor Plan Visuals */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="bg-[#FFFFFF] border border-[#C5A059]/20 p-4 rounded-sm shadow-inner group">
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F8FAFC]">
                            <Image 
                                src={plan.image || project.image} 
                                alt={`${project.title} ${plan.type} Floor Plan`}
                                fill
                                className="object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <div className="p-6 border-t border-[#C5A059]/10 flex justify-between items-center text-[10px] tracking-widest uppercase font-bold text-[#323334]/50">
                            <span>High-Resolution Architectural Layout</span>
                            <span className="text-[#1D4F9C]">Verified Configuration</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Carpet Area', value: plan.carpetArea, icon: <div className="p-2 bg-[#1D4F9C]/5 text-[#1D4F9C] rounded-sm"><Building2 size={16} /></div> },
                            { label: 'Status', value: project.status, icon: <div className="p-2 bg-[#1D4F9C]/5 text-[#1D4F9C] rounded-sm"><Clock size={16} /></div> },
                            { label: 'RERA Number', value: Array.isArray(project.reraNumber) ? project.reraNumber[0] : project.reraNumber, icon: <div className="p-2 bg-[#1D4F9C]/5 text-[#1D4F9C] rounded-sm"><Shield size={16} /></div> },
                            { label: 'ROI Forecast', value: '12-14%', icon: <div className="p-2 bg-[#1D4F9C]/5 text-[#1D4F9C] rounded-sm"><TrendingUp size={16} /></div> }
                        ].map((spec, i) => (
                            <div key={i} className="bg-[#FFFFFF] p-6 border border-[#C5A059]/10 rounded-sm">
                                {spec.icon}
                                <span className="text-[9px] tracking-widest uppercase text-[#323334]/40 font-bold block mt-4 mb-1">{spec.label}</span>
                                <span className="text-xs font-semibold text-[#323334] line-clamp-1">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Col: Intelligence & Conversion */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="bg-[#FFFFFF] p-8 border border-[#C5A059]/20 shadow-xl rounded-sm">
                        <h2 className="text-2xl font-serif text-[#323334] mb-6">Expert <span className="text-[#1D4F9C] italic text-gradient">Configuration Analysis</span></h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-[#1D4F9C]/10 flex items-center justify-center text-[#1D4F9C] rounded-full shrink-0">
                                    <CheckCircle2 size={20} />
                                </div>
                                <p className="text-sm font-light leading-relaxed">
                                    <strong className="text-[#1D4F9C] font-semibold">Efficiency First:</strong> This {plan.type} layout is optimized for zero-dead-space. The 150-year legacy of Shapoorji Pallonji ensures every square foot of the {plan.carpetArea} carpet area is usable.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-[#1D4F9C]/10 flex items-center justify-center text-[#1D4F9C] rounded-full shrink-0">
                                    <BarChart3 size={20} />
                                </div>
                                <p className="text-sm font-light leading-relaxed">
                                    <strong className="text-[#1D4F9C] font-semibold">Market Liquidity:</strong> {plan.type} configurations in {project.location} are currently seeing the highest rental velocity in Pune, with average yields touching 5.2%.
                                </p>
                            </div>
                        </div>
                        
                        <div className="mt-10 pt-10 border-t border-[#C5A059]/10">
                            <h3 className="text-xs tracking-[0.2em] font-bold uppercase text-[#323334]/40 mb-6 text-center">Request Priority Cost Sheet</h3>
                            <button className="w-full py-5 bg-[#1D4F9C] text-[#FFFFFF] text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#323334] transition-all flex items-center justify-center gap-3 group shadow-xl shadow-[#1D4F9C]/20">
                                Unlock Pricing Details <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF]/40 backdrop-blur-md p-8 border border-[#C5A059]/10 rounded-sm">
                        <EMICalculator />
                    </div>
                </div>
            </section>

            {/* Contextual Links */}
            <div className="max-w-7xl mx-auto px-6 mb-24">
                <div className="bg-[#1D4F9C] p-12 text-[#FFFFFF] rounded-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full -mr-48 -mt-48 blur-3xl group-hover:scale-110 transition-transform duration-1000" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-4xl font-serif mb-6">Explore the full <span className="italic block mt-2">{project.title} Township</span></h2>
                            <p className="text-[#FFFFFF]/70 font-light text-lg italic">
                                "{project.description.slice(0, 120)}..."
                            </p>
                        </div>
                        <Link 
                            href={`/projects/${project.slug}`}
                            className="bg-[#FFFFFF] text-[#1D4F9C] px-10 py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#C5A059] hover:text-[#FFFFFF] transition-all flex-shrink-0"
                        >
                            Return to Project <ArrowRight size={14} className="inline ml-2" />
                        </Link>
                    </div>
                </div>
            </div>

            <LiveActivityFeed />

            <footer className="py-20 bg-[#FFFFFF] border-t border-[#C5A059]/30 text-center mt-20">
                <div className="text-3xl font-serif text-[#1D4F9C] font-light tracking-widest mb-4">JOYVILLE <span className="text-[10px] font-sans tracking-[0.4em] text-[#323334] uppercase ml-2">Properties</span></div>
                <p className="text-[#323334]/40 text-[9px] tracking-[0.3em] uppercase font-medium">Verified Property Card Hub | A Shapoorji Pallonji Real Estate Digital Transformation</p>
            </footer>
        </main>
    );
}
