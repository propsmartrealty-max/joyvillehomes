"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Project } from '@/data/projects';

interface RelatedProjectsProps {
    currentProject: Project;
    allProjects: Project[];
}

export default function RelatedProjects({ currentProject, allProjects }: RelatedProjectsProps) {
    // Score projects by relevance: same locality > same city zone > different zone
    const scored = allProjects
        .filter(p => p.id !== currentProject.id)
        .map(p => {
            let score = 0;
            const currentLoc = currentProject.location.toLowerCase();
            const pLoc = p.location.toLowerCase();

            // Same locality = highest relevance
            if (currentLoc.split(',')[0].trim() === pLoc.split(',')[0].trim()) score += 10;
            // Same city
            if (currentLoc.includes('pune') && pLoc.includes('pune')) score += 3;
            // Similar price range (within 30%)
            const currentPrice = parseFloat(currentProject.price.replace(/[^0-9.]/g, ''));
            const pPrice = parseFloat(p.price.replace(/[^0-9.]/g, ''));
            if (currentPrice > 0 && pPrice > 0 && Math.abs(currentPrice - pPrice) / currentPrice < 0.3) score += 5;
            // Same type (2BHK/3BHK overlap)
            if (currentProject.type.includes('2 BHK') && p.type.includes('2 BHK')) score += 2;
            if (currentProject.type.includes('3 BHK') && p.type.includes('3 BHK')) score += 2;
            // Persona overlap
            const currentPersonas = currentProject.personaTags || [];
            const pPersonas = p.personaTags || [];
            const overlap = currentPersonas.filter(t => pPersonas.includes(t)).length;
            score += overlap * 2;

            return { project: p, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

    if (scored.length === 0) return null;

    return (
        <section className="mt-20 pt-16 border-t border-[#C5A059]/10">
            <div className="flex items-center gap-3 mb-10">
                <span className="w-8 h-[1px] bg-[#1D4F9C]" />
                <h2 className="text-2xl font-serif text-[#323334] font-light">You Might Also Consider</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {scored.map(({ project }, idx) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                        <Link
                            href={`/projects/${project.slug}`}
                            className="group block bg-[#FFFFFF] border border-[#C5A059]/20 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={`${project.title} - ${project.location} | Shapoorji Pallonji Joyville Homes`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute top-3 left-3 bg-[#1D4F9C] text-[#FFFFFF] text-[8px] uppercase tracking-widest font-bold px-2.5 py-1">
                                    {project.status}
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex items-center gap-1.5 text-[#1D4F9C] text-[9px] uppercase tracking-widest mb-2">
                                    <MapPin size={10} /> {project.location.split(',')[0]}
                                </div>
                                <h3 className="text-lg font-serif text-[#323334] mb-2 group-hover:text-[#1D4F9C] transition-colors">
                                    {project.title}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-[#1D4F9C] font-serif text-sm italic">{project.price}</span>
                                    <span className="text-[10px] uppercase tracking-widest text-[#323334]/40 flex items-center gap-1 group-hover:text-[#1D4F9C] transition-colors">
                                        Explore <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
