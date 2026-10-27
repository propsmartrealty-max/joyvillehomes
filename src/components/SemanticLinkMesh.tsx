"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Share2, ArrowRight, ExternalLink } from 'lucide-react';
import { getRelatedEntities } from '@/data/semanticLinking';

interface SemanticLinkMeshProps {
    currentSlug: string;
}

const SemanticLinkMesh: React.FC<SemanticLinkMeshProps> = ({ currentSlug }) => {
    const relatedGroups = getRelatedEntities(currentSlug);

    if (relatedGroups.length === 0) return null;

    return (
        <section className="py-12 border-t border-[#E5E7EB] bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-3 mb-10">
                    <Share2 className="text-[#1D4F9C]" size={20} />
                    <h2 className="text-2xl font-serif text-[#323334]">Semantic Connectivity Mesh</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedGroups.map((group, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="p-6 bg-[#FAFBFC] border border-[#E5E7EB] rounded-sm hover:border-[#C5A059]/40 transition-colors group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1D4F9C]">{group.category}</span>
                                {group.wikidataUri && (
                                    <a 
                                        href={group.wikidataUri} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-[#1D4F9C]/40 hover:text-[#1D4F9C] transition-colors"
                                    >
                                        <ExternalLink size={12} />
                                    </a>
                                )}
                            </div>
                            <p className="text-xs text-[#323334]/60 font-light leading-relaxed mb-6 italic">
                                &quot;{group.description}&quot;
                            </p>
                            
                            <div className="space-y-3">
                                <span className="text-[9px] uppercase tracking-widest font-bold text-[#323334]/40 block border-b border-[#E5E7EB] pb-2">Shared Entity Hubs</span>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {group.entities.filter(slug => slug !== currentSlug).map(slug => {
                                        const isLocality = ['hinjewadi', 'hadapsar', 'bavdhan', 'purandar'].includes(slug.toLowerCase());
                                        const href = isLocality ? `/locality/${slug}` : `/projects/${slug}`;
                                        return (
                                            <Link 
                                                key={slug} 
                                                href={href}
                                                className="inline-flex items-center gap-2 text-[11px] font-medium text-[#1D4F9C] hover:text-[#C5A059] transition-colors"
                                            >
                                                {slug.split('-').map(word => word.charAt(0) === 'p' && word.length === 1 ? '' : word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} <ArrowRight size={10} />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SemanticLinkMesh;
