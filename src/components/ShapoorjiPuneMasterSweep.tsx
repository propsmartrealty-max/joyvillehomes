"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    MapPin, 
    ShieldCheck, 
    FileText, 
    PhoneCall, 
    Sparkles, 
    ArrowRight, 
    ChevronDown, 
    CheckCircle2, 
    ExternalLink,
    Filter
} from 'lucide-react';
import { projects } from '@/data/projects';
import PriceDisplay from '@/components/PriceDisplay';

type MicroMarketFilter = 'all' | 'hinjewadi' | 'hadapsar' | 'bavdhan' | 'purandhar';
type TypologyFilter = 'all' | '1bhk' | '2bhk' | '3bhk' | 'luxury';

const MICRO_MARKET_TABS = [
    { id: 'all' as MicroMarketFilter, label: 'All Pune Projects', count: 10 },
    { id: 'hinjewadi' as MicroMarketFilter, label: 'Hinjewadi (West)', count: 2 },
    { id: 'hadapsar' as MicroMarketFilter, label: 'Hadapsar (East)', count: 4 },
    { id: 'bavdhan' as MicroMarketFilter, label: 'Bavdhan (West)', count: 3 },
    { id: 'purandhar' as MicroMarketFilter, label: 'Purandhar (Plots)', count: 1 },
];

const PUNE_PROJECT_FAQS = [
    {
        q: "What is the complete list and starting prices of Shapoorji Pallonji projects in Pune for 2026?",
        a: "Shapoorji Pallonji features 10 signature developments across Pune: Joyville Hadapsar Annexe (from ₹65 Lakhs), Joyville Celestia (from ₹85 Lakhs), Joyville Vyomora Hinjewadi (from ₹88.19 Lakhs), Joyville Sensorium Hinjewadi (from ₹1.10 Cr), Vanaha Bavdhan (from ₹82 Lakhs), Vanaha Springs (from ₹95 Lakhs), Vanaha Golfland (from ₹1.55 Cr), Joyville Skyluxe Edition (from ₹1.40 Cr), Wildernest at SP Kingstown (from ₹1.85 Cr), and Treetopia Villa Plots in Purandhar (from ₹84 Lakhs)."
    },
    {
        q: "What is the key difference between Joyville Vyomora and Joyville Sensorium in Hinjewadi Phase 1?",
        a: "Joyville Vyomora is a brand-new launch 25-acre master development offering 2 & 3 BHK flats and duplexes starting at ₹88.19 L with a massive 32,000 sq ft clubhouse. Joyville Sensorium is an advanced-stage, biophilic luxury enclave featuring 2 & 3 BHK luxury residences from ₹1.10 Cr with an infinity-edge pool overlooking the Mula River and 75% dedicated green cover."
    },
    {
        q: "Which Shapoorji Pallonji Pune projects have ready-to-move-in flats available?",
        a: "Joyville Hadapsar Annexe offers ready-possession options in its early phases with operational clubhouses and 60+ lifestyle amenities. In Bavdhan, select phases of Vanaha also have near-possession inventory. Joyville Vyomora, Joyville Celestia, and Wildernest are under active construction, offering flexible construction-linked payment plans."
    },
    {
        q: "Are all Shapoorji Pallonji Pune projects MahaRERA registered and compliant?",
        a: "Yes, every Shapoorji Pallonji project in Pune is fully MahaRERA registered with 100% legal compliance. Key registrations include Joyville Vyomora (PR1260002600999), Joyville Sensorium (P52100027234), Joyville Hadapsar Annexe (P52100026451), Joyville Celestia (P52100048338), Wildernest at SP Kingstown (P52100052683), Vanaha Golfland (P52100052531), and Treetopia (PP1261012501803)."
    },
    {
        q: "What home loan offers and bank approvals are available for Joyville Pune homes?",
        a: "All Shapoorji Pallonji Pune projects have pre-sanctioned APF approvals from leading financial institutions including State Bank of India (SBI), HDFC Bank, ICICI Bank, Axis Bank, and Bank of Baroda. Buyers can avail attractive interest rates, customized subvention plans, and zero-processing-fee tie-ups."
    },
    {
        q: "Why is Shapoorji Pallonji's Mivan construction technology superior?",
        a: "Shapoorji Pallonji utilizes modern aluminum formwork (Mivan monolithic casting) that casts walls and slabs simultaneously in reinforced concrete. This delivers earthquake-resistant seismic stability, zero joint leakage, smoother walls, higher usable carpet area efficiency, and superior longevity compared to conventional brickwork."
    }
];

export default function ShapoorjiPuneMasterSweep() {
    const [marketFilter, setMarketFilter] = useState<MicroMarketFilter>('all');
    const [typologyFilter, setTypologyFilter] = useState<TypologyFilter>('all');
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const filtered = useMemo(() => {
        return projects.filter(project => {
            // Market Filter
            let matchesMarket = true;
            if (marketFilter === 'hinjewadi') {
                matchesMarket = project.location.toLowerCase().includes('hinjewadi') || 
                                project.title.toLowerCase().includes('vyomora') || 
                                project.title.toLowerCase().includes('sensorium');
            } else if (marketFilter === 'hadapsar') {
                matchesMarket = project.location.toLowerCase().includes('hadapsar') || 
                                project.location.toLowerCase().includes('shewalewadi') ||
                                project.title.toLowerCase().includes('celestia') ||
                                project.title.toLowerCase().includes('skyluxe') ||
                                project.title.toLowerCase().includes('wildernest');
            } else if (marketFilter === 'bavdhan') {
                matchesMarket = project.location.toLowerCase().includes('bavdhan') || 
                                project.title.toLowerCase().includes('vanaha');
            } else if (marketFilter === 'purandhar') {
                matchesMarket = project.location.toLowerCase().includes('purandhar') || 
                                project.title.toLowerCase().includes('treetopia') ||
                                project.type.toLowerCase().includes('plot');
            }

            // Typology Filter
            let matchesTypology = true;
            if (typologyFilter === '1bhk') {
                matchesTypology = project.type.includes('1 BHK') || project.floorPlans.some(fp => fp.type.includes('1 BHK'));
            } else if (typologyFilter === '2bhk') {
                matchesTypology = project.type.includes('2 BHK') || project.floorPlans.some(fp => fp.type.includes('2 BHK'));
            } else if (typologyFilter === '3bhk') {
                matchesTypology = project.type.includes('3 BHK') || project.floorPlans.some(fp => fp.type.includes('3 BHK'));
            } else if (typologyFilter === 'luxury') {
                matchesTypology = project.type.toLowerCase().includes('duplex') || 
                                  project.type.toLowerCase().includes('penthouse') || 
                                  project.type.toLowerCase().includes('villa') ||
                                  project.type.toLowerCase().includes('plot') ||
                                  project.title.toLowerCase().includes('skyluxe') ||
                                  project.title.toLowerCase().includes('wildernest');
            }

            return matchesMarket && matchesTypology;
        });
    }, [marketFilter, typologyFilter]);

    // Structured JSON-LD Schema
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "ItemList",
                "@id": "https://joyville-homes.com/#shapoorji-pune-projects-list",
                "name": "Shapoorji Pallonji Entire Pune Projects Master Directory 2026",
                "description": "Authoritative directory of all 10 Shapoorji Pallonji residential and plotted developments across Hinjewadi, Hadapsar, Bavdhan, and Purandhar in Pune.",
                "numberOfItems": projects.length,
                "itemListElement": projects.map((p, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "item": {
                        "@type": "RealEstateListing",
                        "name": p.title,
                        "url": `https://joyville-homes.com/projects/${p.slug}`,
                        "description": p.description,
                        "image": `https://joyville-homes.com${p.image}`,
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": p.location,
                            "addressRegion": "Maharashtra",
                            "addressCountry": "IN"
                        },
                        "offers": {
                            "@type": "AggregateOffer",
                            "priceCurrency": "INR",
                            "priceRange": p.price,
                            "availability": p.status.toLowerCase().includes('ready') ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
                            "seller": {
                                "@type": "Organization",
                                "name": "Shapoorji Pallonji Real Estate"
                            }
                        }
                    }
                }))
            },
            {
                "@type": "FAQPage",
                "@id": "https://joyville-homes.com/#pune-projects-faq",
                "mainEntity": PUNE_PROJECT_FAQS.map(faq => ({
                    "@type": "Question",
                    "name": faq.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.a
                    }
                }))
            }
        ]
    };

    return (
        <section className="py-20 bg-gradient-to-b from-[#F8FAFC] via-[#FFFFFF] to-[#F1F5F9] text-[#1E293B] border-t border-[#C5A059]/20" id="all-pune-projects">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Badge & Title */}
                <div className="text-center max-w-4xl mx-auto mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D4F9C]/10 border border-[#1D4F9C]/20 text-[#1D4F9C] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                        <Sparkles size={14} className="text-[#C5A059]" />
                        <span>160-Year Engineering Heritage</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                        <span>Pune Master Portfolio</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#0F172A] font-normal tracking-tight mb-4 leading-tight">
                        Shapoorji Pallonji <span className="text-[#1D4F9C] italic">Pune Projects</span> (2026 Price List)
                    </h2>

                    <p className="text-[#475569] text-sm sm:text-base font-light leading-relaxed">
                        Comprehensive price directory, verified MahaRERA certifications, carpet areas, and construction milestones across Hinjewadi Phase 1, Hadapsar Annexe, Bavdhan Valley, and the Purandhar growth corridor.
                    </p>

                    {/* Quick Stats Banner */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-slate-200">
                        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                            <div className="text-2xl font-serif font-bold text-[#1D4F9C]">10</div>
                            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Pune Developments</div>
                        </div>
                        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                            <div className="text-2xl font-serif font-bold text-[#1D4F9C]">₹65 L*</div>
                            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Starting Entry Price</div>
                        </div>
                        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                            <div className="text-2xl font-serif font-bold text-[#1D4F9C]">100%</div>
                            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">MahaRERA Approved</div>
                        </div>
                        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                            <div className="text-2xl font-serif font-bold text-[#1D4F9C]">Mivan</div>
                            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Monolithic Engineering</div>
                        </div>
                    </div>
                </div>

                {/* Filter Controls */}
                <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm mb-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1D4F9C]">
                            <Filter size={15} className="text-[#C5A059]" />
                            <span>Filter Micro-Market</span>
                        </div>

                        {/* Typology Quick Toggles */}
                        <div className="flex flex-wrap items-center gap-1.5 text-xs">
                            <span className="text-slate-400 text-[11px] mr-1 uppercase tracking-wider font-semibold">Typology:</span>
                            {[
                                { id: 'all' as TypologyFilter, label: 'All Typologies' },
                                { id: '1bhk' as TypologyFilter, label: '1 BHK' },
                                { id: '2bhk' as TypologyFilter, label: '2 BHK' },
                                { id: '3bhk' as TypologyFilter, label: '3 BHK' },
                                { id: 'luxury' as TypologyFilter, label: 'Duplex & Plots' },
                            ].map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => setTypologyFilter(t.id)}
                                    className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                                        typologyFilter === t.id
                                            ? 'bg-[#1D4F9C] text-white shadow-xs'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Micro Market Tabs */}
                    <div className="flex flex-wrap gap-2 pt-4">
                        {MICRO_MARKET_TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setMarketFilter(tab.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center gap-2 border ${
                                    marketFilter === tab.id
                                        ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md'
                                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-[#C5A059] hover:bg-white'
                                }`}
                            >
                                <span>{tab.label}</span>
                                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                    marketFilter === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                                }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Master Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {filtered.map(project => {
                        const reraDisplay = Array.isArray(project.reraNumber) 
                            ? project.reraNumber[0] 
                            : project.reraNumber;

                        return (
                            <div 
                                key={project.id}
                                className="group bg-white rounded-2xl border border-slate-200 hover:border-[#C5A059]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                            >
                                {/* Project Banner Image */}
                                <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={`Shapoorji Pallonji ${project.title} ${project.location}`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                    {/* Status Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="px-3 py-1 rounded-md bg-[#1D4F9C]/95 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider shadow-sm border border-white/20">
                                            {project.status}
                                        </span>
                                    </div>

                                    {/* Micro-market Tag */}
                                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                                        <span className="flex items-center gap-1 drop-shadow-md text-[11px] font-medium">
                                            <MapPin size={12} className="text-[#C5A059]" />
                                            {project.location.split(',')[0]}
                                        </span>
                                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/20 backdrop-blur-md font-medium">
                                            {project.type.split('&')[0]}
                                        </span>
                                    </div>
                                </div>

                                {/* Body Content */}
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <Link href={`/projects/${project.slug}`}>
                                            <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-[#1D4F9C] transition-colors mb-2">
                                                {project.title}
                                            </h3>
                                        </Link>

                                        {/* Price block */}
                                        <div className="mb-4 pb-3 border-b border-slate-100 flex items-baseline justify-between">
                                            <div>
                                                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Official Price</div>
                                                <PriceDisplay price={project.price} className="text-lg font-serif font-bold text-[#1D4F9C]" />
                                            </div>
                                            {project.constructionUpdate && (
                                                <div className="text-right">
                                                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Progress</div>
                                                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                                        {project.constructionUpdate.percentage}% Built
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Highlights list */}
                                        <ul className="space-y-1.5 mb-5 text-xs text-slate-600 font-light">
                                            {project.highlights.slice(0, 2).map((hl, i) => (
                                                <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                                                    <CheckCircle2 size={13} className="text-[#C5A059] shrink-0 mt-0.5" />
                                                    <span>{hl}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        {/* MahaRERA Badge */}
                                        <div className="mb-4 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between text-[10px] text-slate-600">
                                            <span className="flex items-center gap-1 font-medium">
                                                <ShieldCheck size={12} className="text-emerald-600" />
                                                <span>MahaRERA:</span>
                                            </span>
                                            <span className="font-mono font-semibold text-slate-800">{reraDisplay}</span>
                                        </div>

                                        {/* CTAs */}
                                        <div className="grid grid-cols-2 gap-2">
                                            <Link
                                                href={`/projects/${project.slug}`}
                                                className="w-full inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-[#1D4F9C] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#153a75] transition-all shadow-sm"
                                            >
                                                <span>Details</span>
                                                <ArrowRight size={12} />
                                            </Link>
                                            <Link
                                                href={`/projects/${project.slug}#floor-plans`}
                                                className="w-full inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider hover:bg-slate-200 transition-all border border-slate-200"
                                            >
                                                <FileText size={12} className="text-[#C5A059]" />
                                                <span>Floor Plans</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Master Comparison Matrix Table (High-Intent SEO Anchor) */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-16 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-1">
                                Consolidated Data Matrix
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-slate-900">
                                Shapoorji Pallonji Pune Projects Comparison (2026)
                            </h3>
                        </div>
                        <a
                            href="https://wa.me/917744009295?text=Hi%2C%20please%20send%20the%20consolidated%20cost%20sheets%20and%20floor%20plans%20for%20all%20Shapoorji%20Pallonji%20Pune%20projects."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 transition-all shadow-sm shrink-0"
                        >
                            <FileText size={14} />
                            <span>Download All Cost Sheets (PDF)</span>
                        </a>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-y border-slate-200 text-slate-700 uppercase tracking-wider text-[10px] font-bold">
                                    <th className="py-3.5 px-4">Project Name</th>
                                    <th className="py-3.5 px-4">Micro-Market</th>
                                    <th className="py-3.5 px-4">Configurations</th>
                                    <th className="py-3.5 px-4">Starting Price</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4">MahaRERA Registration</th>
                                    <th className="py-3.5 px-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-600">
                                {projects.map((p) => {
                                    const reraNum = Array.isArray(p.reraNumber) ? p.reraNumber[0] : p.reraNumber;
                                    return (
                                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="py-3.5 px-4 font-bold text-slate-900">
                                                <Link href={`/projects/${p.slug}`} className="hover:text-[#1D4F9C] flex items-center gap-1.5">
                                                    <span>{p.title}</span>
                                                    <ArrowRight size={11} className="text-slate-400" />
                                                </Link>
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <span className="inline-flex items-center gap-1 text-slate-700">
                                                    <MapPin size={11} className="text-[#C5A059]" />
                                                    {p.location}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4 font-medium">{p.type}</td>
                                            <td className="py-3.5 px-4 font-bold text-[#1D4F9C] whitespace-nowrap">
                                                {p.price}
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                    p.status.toLowerCase().includes('ready')
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                        : p.status.toLowerCase().includes('launch')
                                                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                                                }`}>
                                                    {p.status}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4 font-mono text-[11px] text-slate-700">
                                                {reraNum}
                                            </td>
                                            <td className="py-3.5 px-4 text-right">
                                                <Link
                                                    href={`/projects/${p.slug}`}
                                                    className="inline-flex items-center gap-1 text-[#1D4F9C] hover:text-[#0F172A] font-bold uppercase tracking-wider text-[11px]"
                                                >
                                                    <span>View</span>
                                                    <ExternalLink size={11} />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* High-Intent FAQ Knowledge Hub */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 mb-12">
                    <div className="max-w-3xl mb-8">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-1">
                            Buyer Knowledge Base
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">
                            Frequently Asked Questions by Pune Homebuyers
                        </h3>
                        <p className="text-slate-500 text-sm font-light">
                            Direct answers covering pricing schedules, legal RERA certifications, construction milestones, and site visits for all Shapoorji Pallonji Pune developments.
                        </p>
                    </div>

                    <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
                        {PUNE_PROJECT_FAQS.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div key={idx} className="py-4">
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full flex items-center justify-between text-left gap-4 py-2 group focus:outline-none"
                                        aria-expanded={isOpen}
                                    >
                                        <span className="font-serif font-semibold text-base sm:text-lg text-slate-900 group-hover:text-[#1D4F9C] transition-colors">
                                            {faq.q}
                                        </span>
                                        <ChevronDown
                                            size={18}
                                            className={`text-slate-400 group-hover:text-[#1D4F9C] transition-transform duration-300 shrink-0 ${
                                                isOpen ? 'rotate-180 text-[#1D4F9C]' : ''
                                            }`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <div className="pt-2 pb-4 text-slate-600 text-sm font-light leading-relaxed animate-fadeIn">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Assistance Banner */}
                    <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-[#1D4F9C] to-[#0F172A] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                            <h4 className="font-serif text-xl font-bold mb-1">Looking for a Personalized Pune Property Recommendation?</h4>
                            <p className="text-white/80 text-xs font-light">
                                Speak directly with an authorized Shapoorji Pallonji property specialist. Free VIP site visits & zero brokerage fees.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <a
                                href="tel:+912067431149"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#1D4F9C] font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-md"
                            >
                                <PhoneCall size={14} className="text-[#C5A059]" />
                                <span>Call Sales Desk</span>
                            </a>
                            <a
                                href="https://wa.me/917744009295?text=Hi%2C%20I%20am%20interested%20in%20Shapoorji%20Pallonji%20Pune%20projects.%20Please%20share%20all%20project%20details."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-600 transition-colors shadow-md"
                            >
                                <span>WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
