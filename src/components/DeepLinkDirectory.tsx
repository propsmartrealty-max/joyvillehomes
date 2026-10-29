"use client";

import Link from 'next/link';
import { projects } from '@/data/projects';
import { localities } from '@/data/localities';
import { generateUnitSlug } from '@/utils/seo-utils';
import { SEO_ROUTES } from '@/data/seo-routes';

export default function DeepLinkDirectory() {
    return (
        <section className="bg-[#FFFFFF] py-20 px-6 border-t border-[#C5A059]/30">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-12">
                    <span className="w-8 h-[1px] bg-[#1D4F9C]"></span>
                    <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-[#323334]">Property Intelligence Directory</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
                    {/* Project Deep Links */}
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-bold tracking-widest text-[#1D4F9C] uppercase border-b border-[#1D4F9C]/10 pb-2">Main Projects</h3>
                        <ul className="space-y-3">
                            {projects.map(p => (
                                <li key={p.id}>
                                    <Link href={`/projects/${p.slug}`} className="text-xs text-[#323334]/60 hover:text-[#1D4F9C] transition-colors font-light">
                                        {p.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* High-Intent Unit Links (First 2 Projects) */}
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-bold tracking-widest text-[#1D4F9C] uppercase border-b border-[#1D4F9C]/10 pb-2">Unit Floor Plans</h3>
                        <ul className="space-y-3">
                            {projects.slice(0, 3).flatMap(p => 
                                p.floorPlans.map((fp, i) => (
                                    <li key={`${p.id}-${i}`}>
                                        <Link 
                                            href={`/properties/unit/${generateUnitSlug(p.title, fp.type, p.location)}`} 
                                            className="text-xs text-[#323334]/60 hover:text-[#1D4F9C] transition-colors font-light"
                                        >
                                            {p.title.split(' ')[1] || p.title} {fp.type}
                                        </Link>
                                    </li>
                                ))
                            ).slice(0, 10)}
                        </ul>
                    </div>

                    {/* Regional Hubs */}
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-bold tracking-widest text-[#1D4F9C] uppercase border-b border-[#1D4F9C]/10 pb-2">Locality Matrix</h3>
                        <ul className="space-y-3">
                            {localities.map(l => (
                                <li key={l.id}>
                                    <Link href={`/locality/${l.slug}`} className="text-xs text-[#323334]/60 hover:text-[#1D4F9C] transition-colors font-light">
                                        Flats in {l.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Programmatic SEO Links */}
                    <div className="space-y-6 lg:col-span-2">
                        <h3 className="text-[10px] font-bold tracking-widest text-[#1D4F9C] uppercase border-b border-[#1D4F9C]/10 pb-2">High-Intent Property Portfolios (2026)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                            {SEO_ROUTES.filter(r => 
                                r.slug.includes('under-') || 
                                r.slug.includes('wipro') || 
                                r.slug.includes('tcs') || 
                                r.slug.includes('infosys') || 
                                r.slug.includes('metro') || 
                                r.slug.includes('duplex') || 
                                r.slug.includes('cost-sheet') || 
                                r.slug.includes('ready-possession') || 
                                r.slug.includes('mivan') || 
                                r.slug.includes('balcony') ||
                                r.slug.includes('ring-road')
                            ).slice(0, 36).map((r, i) => (
                                <Link 
                                    key={i} 
                                    href={`/properties/${r.slug}`} 
                                    className="text-[11px] text-[#323334]/60 hover:text-[#1D4F9C] transition-colors font-light leading-snug line-clamp-1"
                                >
                                    {r.title.split('|')[0].replace(/\[.*?\]/g, '').trim()}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 12-Project Specific Authority Hubs (Crawl Equity Propagation) */}
                <div className="mt-16 pt-10 border-t border-[#1D4F9C]/10">
                    <h3 className="text-xs font-bold tracking-widest text-[#1D4F9C] uppercase mb-8">
                        Shapoorji Pallonji Pune Project Authority Hubs & Cost Sheets (2026)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {[
                            { name: 'Joyville Vyomora', slugPrefix: 'joyville-vyomora' },
                            { name: 'Joyville Sensorium', slugPrefix: 'joyville-sensorium' },
                            { name: 'Joyville Hadapsar Annexe', slugPrefix: 'joyville-hadapsar-annexe' },
                            { name: 'Joyville Celestia', slugPrefix: 'joyville-celestia' },
                            { name: 'Joyville Skyluxe Edition', slugPrefix: 'joyville-skyluxe' },
                            { name: 'Wildernest SP Kingstown', slugPrefix: 'wildernest-sp-kingstown' },
                            { name: 'Vanaha Golfland', slugPrefix: 'vanaha-golfland' },
                            { name: 'Vanaha Springs', slugPrefix: 'vanaha-springs' },
                            { name: 'Vanaha Bavdhan Township', slugPrefix: 'vanaha-bavdhan' },
                            { name: 'Tree Clouds SP Kingstown', slugPrefix: 'tree-clouds-sp-kingstown' },
                            { name: 'The Vastion SP Kingstown', slugPrefix: 'the-vastion-sp-kingstown' },
                            { name: 'Shapoorji Treetopia', slugPrefix: 'shapoorji-treetopia' },
                        ].map((cluster) => {
                            const clusterRoutes = SEO_ROUTES.filter(r => r.slug.startsWith(cluster.slugPrefix));
                            return (
                                <div key={cluster.name} className="space-y-2">
                                    <h4 className="text-[11px] font-semibold text-[#323334] border-b border-[#C5A059]/20 pb-1">
                                        {cluster.name}
                                    </h4>
                                    <ul className="space-y-1.5">
                                        {clusterRoutes.map(r => (
                                            <li key={r.slug}>
                                                <Link 
                                                    href={`/properties/${r.slug}`}
                                                    className="text-[10px] text-[#323334]/70 hover:text-[#1D4F9C] transition-colors font-light line-clamp-1"
                                                    title={r.title}
                                                >
                                                    {r.h1.replace(/^(Joyville|Shapoorji Pallonji|Vanaha|Wildernest|Tree Clouds|The Vastion)\s*/i, '').trim()}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-[#C5A059]/10 text-center">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#323334]/30 font-medium">
                        © 2026 Shapoorji Pallonji Real Estate | Technical SEO Sovereign Node | Verified Joyville Pune Cluster
                    </p>
                </div>
            </div>
        </section>
    );
}
