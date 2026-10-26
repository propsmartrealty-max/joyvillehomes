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
                        <h3 className="text-[10px] font-bold tracking-widest text-[#1D4F9C] uppercase border-b border-[#1D4F9C]/10 pb-2">High-Intent Property Portfolios</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {SEO_ROUTES.slice(0, 24).map((r, i) => (
                                <Link 
                                    key={i} 
                                    href={`/properties/${r.slug}`} 
                                    className="text-[11px] text-[#323334]/60 hover:text-[#1D4F9C] transition-colors font-light leading-snug"
                                >
                                    {r.title.split('|')[0].trim()}
                                </Link>
                            ))}
                        </div>
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
