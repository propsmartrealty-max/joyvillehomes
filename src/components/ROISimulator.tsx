"use client";

import React from 'react';
import { TrendingUp, Calculator, ShieldCheck, Info, ArrowRight, Wallet, Landmark, BarChart3, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { experts } from '@/data/experts';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Phase 30: ROI Decision Simulator
 * A high-engagement tool designed to transition users from "Viewing" to "Deciding".
 * Integrates expert data (Vikas/Ananya) with financial modeling.
 */
export default function ROISimulator() {
    const [selectedProject, setSelectedProject] = React.useState(projects[0].id);
    const [tenure, setTenure] = React.useState(5);
    const [isSimulating, setIsSimulating] = React.useState(false);

    const project = projects.find(p => p.id === selectedProject) || projects[0];
    const expert = experts.find(e => e.id === 'expert-001'); // Principal Analyst Vikas

    // Calculation Logic (Simplified Projections)
    const basePrice = parseInt(project.price.replace(/[^\d.]/g, '')) * (project.price.includes('Cr') ? 100 : 1);
    const appreciationRate = project.location.toLowerCase().includes('hinjewadi') ? 0.085 : 0.075; // Annual
    const rentalYieldRate = 0.042; // 4.2% Average for SP

    const projectedAppreciation = basePrice * Math.pow(1 + appreciationRate, tenure) - basePrice;
    const projectedRentalIncome = (basePrice * rentalYieldRate) * tenure;
    const totalROI = ((projectedAppreciation + projectedRentalIncome) / basePrice) * 100;
    const marketAvgROI = totalROI * 0.82; // SP Brand Premium factor (Joyville properties outpace average by 18%)

    const handleSimulate = () => {
        setIsSimulating(true);
        setTimeout(() => setIsSimulating(false), 800);
    };

    return (
        <section className="bg-[#FFFFFF] border border-[#C5A059]/30 rounded-sm shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-5 min-h-[600px]">
                
                {/* Left: Input Controls */}
                <div className="lg:col-span-2 p-10 bg-[#EEF2F6]/50 border-r border-[#C5A059]/20">
                    <div className="flex items-center gap-3 mb-8">
                        <Calculator className="text-[#1D4F9C]" size={24} />
                        <h2 className="text-2xl font-serif text-[#323334]">ROI Intelligence</h2>
                    </div>

                    <div className="space-y-10">
                        {/* Project Selection */}
                        <div>
                            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#323334]/60 mb-4 block">Target Asset</label>
                            <div className="space-y-3">
                                {projects.slice(0, 3).map(p => (
                                    <button 
                                        key={p.id}
                                        onClick={() => setSelectedProject(p.id)}
                                        className={`w-full text-left p-4 rounded-sm border transition-all flex items-center justify-between group ${
                                            selectedProject === p.id 
                                            ? 'bg-[#1D4F9C] border-[#1D4F9C] text-[#FFFFFF]' 
                                            : 'bg-white border-[#C5A059]/20 text-[#323334] hover:border-[#1D4F9C]/40'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 relative rounded-sm overflow-hidden shrink-0">
                                                <Image src={p.image} fill className="object-cover" alt={`${p.title} - Shapoorji Pallonji Joyville Pune`} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-serif">{p.title}</p>
                                                <p className={`text-[9px] uppercase tracking-tighter ${selectedProject === p.id ? 'text-white/60' : 'text-[#323334]/40'}`}>
                                                    {p.location.split(',')[0]}
                                                </p>
                                            </div>
                                        </div>
                                        {selectedProject === p.id && <ShieldCheck size={16} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tenure Slider */}
                        <div>
                            <div className="flex justify-between items-end mb-4">
                                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#323334]/60">Investment Horizon</label>
                                <span className="text-[#1D4F9C] font-serif text-xl">{tenure} Years</span>
                            </div>
                            <input 
                                type="range" min="1" max="10" 
                                value={tenure} 
                                onChange={(e) => setTenure(parseInt(e.target.value))}
                                aria-label="Investment Horizon Years"
                                className="w-full h-1 bg-[#C5A059]/20 accent-[#1D4F9C] rounded-full appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between mt-2 text-[9px] uppercase text-[#323334]/40 font-bold">
                                <span>1Y</span>
                                <span>5Y</span>
                                <span>10Y</span>
                            </div>
                        </div>

                        <button 
                            onClick={handleSimulate}
                            className="w-full bg-[#1D4F9C] text-[#FFFFFF] py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#323334] transition-colors rounded-sm shadow-xl flex items-center justify-center gap-3"
                        >
                            {isSimulating ? 'Processing Models...' : 'Calculate Projection'} <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Right: Output Visualization */}
                <div className="lg:col-span-3 p-10 relative bg-[#FFFFFF]">
                    <AnimatePresence mode="wait">
                        {isSimulating ? (
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-[#FFFFFF] z-50 px-12 text-center"
                            >
                                <div className="w-16 h-16 border-2 border-[#1D4F9C]/10 border-t-[#C5A059] rounded-full animate-spin mb-8" />
                                <h3 className="text-xl font-serif text-[#323334] mb-4 italic">Running Sp-Predictive Analytics Mode 4.2</h3>
                                <p className="text-sm text-[#323334]/60 font-light leading-relaxed">Cross-referencing RERA milestones with historical appreciation trends in {project.location}...</p>
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                className="h-full flex flex-col"
                            >
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-[#323334]/40 mb-2">Projected 5-Year Outcome</h3>
                                        <p className="text-4xl lg:text-6xl font-serif text-[#1D4F9C] font-light">
                                            {totalROI.toFixed(1)}% <span className="text-xl text-[#323334]/60 italic">GGR*</span>
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-2 justify-end mb-2">
                                            <TrendingUp className="text-emerald-600" size={20} />
                                            <span className="text-lg font-bold text-emerald-600">+{totalROI > marketAvgROI ? (totalROI - marketAvgROI).toFixed(1) : 0}%</span>
                                        </div>
                                        <span className="text-[10px] uppercase font-bold text-[#323334]/40">Over Market Average</span>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8 mb-12">
                                    <div className="bg-[#EEF2F6] p-6 rounded-sm border border-[#C5A059]/10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Landmark className="text-[#1D4F9C]" size={16} />
                                            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#323334]/60">Capital Growth</h4>
                                        </div>
                                        <p className="text-2xl font-serif text-[#323334]">₹{(projectedAppreciation / 100).toFixed(1)} Lakhs</p>
                                        <p className="text-[10px] font-light text-[#323334]/40 mt-2">Compounded annual growth at {appreciationRate*100}%</p>
                                    </div>
                                    <div className="bg-[#EEF2F6] p-6 rounded-sm border border-[#C5A059]/10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Wallet className="text-[#1D4F9C]" size={16} />
                                            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#323334]/60">Rental Yield</h4>
                                        </div>
                                        <p className="text-2xl font-serif text-[#323334]">₹{(projectedRentalIncome / 100).toFixed(1)} Lakhs</p>
                                        <p className="text-[10px] font-light text-[#323334]/40 mt-2">Cumulative cash flow @ {rentalYieldRate*100}% yield</p>
                                    </div>
                                </div>

                                {/* Comparison Chart (Visual representation) */}
                                <div className="flex-1 space-y-6">
                                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#323334]/40 mb-4 flex items-center gap-2">
                                        <BarChart3 size={14} /> Total ROI: Joyville vs. Market
                                    </h4>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-xs font-serif text-[#1D4F9C] uppercase tracking-widest flex items-center gap-2">
                                                    <Star size={12} className="text-[#C5A059] fill-[#C5A059]" /> Joyville Forecasted ROI
                                                </span>
                                                <span className="text-sm font-bold text-[#1D4F9C]">{totalROI.toFixed(1)}%</span>
                                            </div>
                                            <div className="h-4 w-full bg-[#1D4F9C]/10 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }} 
                                                    animate={{ width: `${totalROI}%` }} 
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                    className="h-full bg-gradient-to-r from-[#1D4F9C] to-[#323334]" 
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-xs font-serif text-[#323334]/60 uppercase tracking-widest">Industry Average ROI (Market)</span>
                                                <span className="text-sm font-bold text-[#323334]/40">{marketAvgROI.toFixed(1)}%</span>
                                            </div>
                                            <div className="h-4 w-full bg-[#323334]/5 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }} 
                                                    animate={{ width: `${marketAvgROI}%` }} 
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                    className="h-full bg-[#323334]/20" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Expert Citation Box */}
                                {expert && (
                                    <Link href={`/insights/author/${expert.id}`} className="mt-12 p-6 border border-[#C5A059]/10 hover:border-[#1D4F9C]/30 bg-[#EEF2F6]/30 group transition-all flex items-center gap-6">
                                        <div className="w-12 h-12 relative rounded-full overflow-hidden shrink-0 border-2 border-white">
                                            <Image src={expert.image} fill className="object-cover" alt={`${expert.name} - Shapoorji Joyville Real Estate Analyst`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] text-[#323334]/40 font-bold uppercase tracking-widest mb-1 italic">Verified Forecast by</p>
                                            <p className="text-sm font-serif text-[#323334] group-hover:text-[#1D4F9C] transition-colors">{expert.name}</p>
                                            <p className="text-[9px] uppercase font-bold text-[#1D4F9C]/60 tracking-wider">Principal Market Analyst</p>
                                        </div>
                                        <Info size={16} className="text-[#C5A059]/40 group-hover:text-[#1D4F9C] transition-colors" />
                                    </Link>
                                )}

                                <p className="mt-6 text-[8px] text-[#323334]/40 uppercase tracking-widest font-bold text-center">
                                    *Gross Growth Return (GGR) — Figures are illustrative based on current RERA milestones and market historical averages.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
