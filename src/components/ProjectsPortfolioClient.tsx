"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles, Compass } from "lucide-react";
import PriceDisplay from "@/components/PriceDisplay";
import { projects } from "@/data/projects";
import { generateUnitSlug } from "@/utils/seo-utils";

type LocalityFilter = "all" | "hinjewadi" | "hadapsar" | "bavdhan" | "purandar";

interface FilterTab {
    id: LocalityFilter;
    label: string;
    sublabel: string;
}

const FILTER_TABS: FilterTab[] = [
    { id: "all", label: "All Developments", sublabel: "Pune Portfolio" },
    { id: "hinjewadi", label: "Hinjewadi", sublabel: "IT Corridor" },
    { id: "hadapsar", label: "Hadapsar", sublabel: "East Pune" },
    { id: "bavdhan", label: "Bavdhan", sublabel: "West Pune" },
    { id: "purandar", label: "Purandar", sublabel: "Gated Plots" },
];

export default function ProjectsPortfolioClient() {
    const [selectedFilter, setSelectedFilter] = useState<LocalityFilter>("all");

    const filteredProjects = useMemo(() => {
        if (selectedFilter === "all") return projects;
        if (selectedFilter === "hinjewadi") {
            return projects.filter(p => p.location.toLowerCase().includes("hinjewadi") || p.title.toLowerCase().includes("vyomora") || p.title.toLowerCase().includes("sensorium"));
        }
        if (selectedFilter === "hadapsar") {
            return projects.filter(p => p.location.toLowerCase().includes("hadapsar") || p.location.toLowerCase().includes("shewalewadi") || p.title.toLowerCase().includes("hadapsar") || p.title.toLowerCase().includes("celestia") || p.title.toLowerCase().includes("skyluxe"));
        }
        if (selectedFilter === "bavdhan") {
            return projects.filter(p => p.location.toLowerCase().includes("bavdhan") || p.title.toLowerCase().includes("vanaha"));
        }
        if (selectedFilter === "purandar") {
            return projects.filter(p => p.location.toLowerCase().includes("purandar") || p.title.toLowerCase().includes("plot") || p.type.toLowerCase().includes("plot"));
        }
        return projects;
    }, [selectedFilter]);

    // Dynamic JSON-LD for the Portfolio
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["ItemList", "CollectionPage"],
                "@id": "https://joyville-homes.com/projects/#portfolio",
                "name": "Joyville Homes Pune Residential Projects Portfolio",
                "description": "Explore Shapoorji Pallonji's premium portfolio of luxury residential projects across Pune, Hinjewadi, Hadapsar, and Bavdhan. Find luxury 2 & 3 BHK flats and villas.",
                "url": "https://joyville-homes.com/projects",
                "publisher": {
                    "@id": "https://joyville-homes.com/#organization"
                },
                "itemListElement": projects.map((project, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "url": `https://joyville-homes.com/projects/${project.slug}`,
                    "name": project.title,
                    "description": project.type
                }))
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://joyville-homes.com/projects/#breadcrumb",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://joyville-homes.com" },
                    { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://joyville-homes.com/projects" }
                ]
            }
        ]
    };

    return (
        <article className="min-h-[100dvh] bg-[#FAFBFC] pt-32 pb-24 text-[#1E293B] selection:bg-[#1D4F9C] selection:text-[#FFFFFF]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Header section */}
            <header className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#1D4F9C]/5 border border-[#1D4F9C]/15 text-[#1D4F9C] font-semibold text-xs tracking-[0.25em] uppercase mb-6">
                    <Sparkles size={12} className="text-[#C5A059]" />
                    <span>Shapoorji Pallonji Real Estate</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                    <span>Pune Portfolio</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1E293B] font-normal tracking-tight mb-6">
                    Signature Residential <span className="text-[#1D4F9C] italic">Masterpieces</span>
                </h1>
                <p className="text-[#475569] text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed">
                    Explore curated living spaces crafted with the 160-year engineering legacy of Shapoorji Pallonji. From high-growth IT corridors in Hinjewadi to expansive township residences in Hadapsar and Bavdhan.
                </p>

                {/* Filter Tabs */}
                <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                    {FILTER_TABS.map((tab) => {
                        const isActive = selectedFilter === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedFilter(tab.id)}
                                className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border ${
                                    isActive
                                        ? "bg-[#1D4F9C] text-white border-[#1D4F9C] shadow-lg shadow-[#1D4F9C]/20 scale-102"
                                        : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#C5A059] hover:text-[#1D4F9C] shadow-xs"
                                }`}
                            >
                                <Compass size={13} className={isActive ? "text-[#C5A059]" : "text-gray-400"} />
                                <span>{tab.label}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                    isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                                }`}>
                                    {tab.id === "all" ? projects.length : 
                                     tab.id === "hinjewadi" ? projects.filter(p => p.location.toLowerCase().includes("hinjewadi") || p.title.toLowerCase().includes("vyomora") || p.title.toLowerCase().includes("sensorium")).length :
                                     tab.id === "hadapsar" ? projects.filter(p => p.location.toLowerCase().includes("hadapsar") || p.location.toLowerCase().includes("shewalewadi") || p.title.toLowerCase().includes("hadapsar") || p.title.toLowerCase().includes("celestia") || p.title.toLowerCase().includes("skyluxe")).length :
                                     tab.id === "bavdhan" ? projects.filter(p => p.location.toLowerCase().includes("bavdhan") || p.title.toLowerCase().includes("vanaha")).length :
                                     projects.filter(p => p.location.toLowerCase().includes("purandar") || p.title.toLowerCase().includes("plot") || p.type.toLowerCase().includes("plot")).length}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </header>

            {/* Project Grid */}
            <main className="max-w-6xl mx-auto px-6 space-y-12 mb-24">
                {filteredProjects.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-[#E2E8F0] rounded-lg shadow-sm">
                        <MapPin size={48} className="text-[#C5A059] mb-4 opacity-50" />
                        <h3 className="text-2xl font-serif text-[#1E293B] mb-2">No Developments Found</h3>
                        <p className="text-[#64748B] font-light text-sm max-w-md">We couldn&apos;t find any projects matching your selected filter. View all developments to explore the full portfolio.</p>
                        <button
                            onClick={() => setSelectedFilter("all")}
                            className="mt-6 px-6 py-2.5 bg-[#1D4F9C] text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#153a75] transition-colors"
                        >
                            View All Projects
                        </button>
                    </div>
                )}

                {filteredProjects.map((project) => (
                    <div 
                        key={project.id} 
                        className="group flex flex-col lg:flex-row bg-white border border-[#E2E8F0] hover:border-[#C5A059]/70 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 relative"
                    >
                        {/* Image Showcase */}
                        <div className="lg:w-1/2 relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px] overflow-hidden bg-gray-900">
                            <Image
                                src={project.image}
                                alt={`Shapoorji Pallonji ${project.title} - ${project.type} in ${project.location}`}
                                fill
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority={true}
                            />
                            {/* Subtle dark gradient overlay only on bottom for legible badge */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                            {/* Top Badges */}
                            <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                                <span className="px-3.5 py-1.5 bg-[#1D4F9C]/95 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded shadow-md border border-white/10">
                                    {project.status}
                                </span>
                                <span className="px-3 py-1.5 bg-[#0F172A]/90 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-semibold rounded border border-[#C5A059]/50 shadow-md flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                                    <span>MahaRERA: {Array.isArray(project.reraNumber) ? project.reraNumber[0] + (project.reraNumber.length > 1 ? ', ...' : '') : project.reraNumber}</span>
                                </span>
                            </div>

                            {/* Bottom Type Badge */}
                            <div className="absolute bottom-5 left-5 pointer-events-none">
                                <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#1D4F9C] text-[11px] font-semibold tracking-wider uppercase rounded shadow-sm">
                                    {project.type}
                                </span>
                            </div>
                        </div>

                        {/* Content Details */}
                        <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-[#1D4F9C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                                    <MapPin size={13} className="text-[#C5A059]" />
                                    <span>{project.location}</span>
                                </div>

                                <Link href={`/projects/${project.slug}`}>
                                    <h2 className="text-2xl lg:text-3xl font-serif text-[#1E293B] font-normal hover:text-[#1D4F9C] transition-colors cursor-pointer mb-3">
                                        {project.title}
                                    </h2>
                                </Link>

                                <div className="mb-5 flex items-baseline gap-3">
                                    <PriceDisplay price={project.price} className="text-2xl text-[#1D4F9C] font-serif font-medium block" />
                                    {project.constructionUpdate && (
                                        <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-medium">
                                            {project.constructionUpdate.percentage}% Completed
                                        </span>
                                    )}
                                </div>

                                <p className="text-[#64748B] font-light text-sm leading-relaxed mb-6 line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Highlights grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 pb-6 border-b border-gray-100">
                                    {project.highlights.slice(0, 4).map((hl, i) => (
                                        <div key={i} className="flex items-start gap-2 text-xs text-[#334155] font-light">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-1.5 shrink-0" />
                                            <span>{hl}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                {/* Floor Plan Quick Links */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.floorPlans.slice(0, 3).map((plan, i) => (
                                        <Link 
                                            key={i} 
                                            href={`/properties/unit/${generateUnitSlug(project.title, plan.type, project.location)}`}
                                            className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#1D4F9C] hover:bg-[#1D4F9C] text-[#1D4F9C] hover:text-white text-[10px] font-semibold uppercase tracking-wider rounded transition-colors"
                                        >
                                            {plan.type} ({plan.carpetArea.split(' ')[0]} sq.ft)
                                        </Link>
                                    ))}
                                </div>

                                {/* Primary CTA Actions */}
                                <div className="flex items-center justify-between pt-2">
                                    <Link 
                                        href={`/projects/${project.slug}`}
                                        className="inline-flex items-center gap-2.5 text-[#1D4F9C] font-bold uppercase tracking-[0.2em] text-xs hover:text-[#0F172A] transition-colors group/link"
                                    >
                                        <span>Explore Project Details</span>
                                        <ArrowRight size={14} className="group-hover/link:translate-x-1.5 transition-transform duration-300" />
                                    </Link>

                                    <Link
                                        href={`/projects/${project.slug}#floor-plans`}
                                        className="text-[11px] font-semibold text-[#64748B] hover:text-[#1D4F9C] uppercase tracking-wider"
                                    >
                                        View Floor Plans &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </article>
    );
}
