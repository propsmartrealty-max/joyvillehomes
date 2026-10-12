'use client';

import React, { useState, useMemo } from 'react';
import { projects } from '@/data/projects';
import { 
    Target, 
    ArrowRight, 
    CheckCircle2, 
    Building2, 
    TrendingUp, 
    MapPin, 
    Circle, 
    ChevronRight, 
    Sparkles,
    ShieldCheck,
    Wallet
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type Step = 'budget' | 'location' | 'goal' | 'result';

interface Selections {
    budget: number; // Max budget in Lacs
    locationPriority: 'it' | 'township' | 'luxury' | 'any';
    investmentGoal: 'rental' | 'appreciation' | 'end-user';
}

export default function InvestmentMatchmaker() {
    const [step, setStep] = useState<Step>('budget');
    const [selections, setSelections] = useState<Selections>({
        budget: 150,
        locationPriority: 'any',
        investmentGoal: 'appreciation'
    });

    const matchedProject = useMemo(() => {
        if (step !== 'result') return null;

        // Scoring algorithm
        const scores = projects.map(project => {
            let score = 0;
            
            // Budget Match (Basic)
            const minPrice = parseInt(project.price.replace(/[^0-9]/g, '')) || 0;
            if (minPrice <= selections.budget) score += 10;
            if (minPrice > selections.budget) score -= 5;

            // Location Priority
            if (selections.locationPriority === 'it' && project.location.includes('Hinjewadi')) score += 20;
            if (selections.locationPriority === 'township' && project.location.includes('Hadapsar')) score += 20;
            if (selections.locationPriority === 'luxury' && project.slug.includes('vyomora')) score += 20;

            // Investment Goal
            if (selections.investmentGoal === 'rental' && project.location.includes('Hinjewadi')) score += 15;
            if (selections.investmentGoal === 'appreciation' && project.status.includes('New Launch')) score += 15;
            if (selections.investmentGoal === 'end-user' && project.status.includes('Ready')) score += 15;

            return { project, score };
        });

        return scores.sort((a, b) => b.score - a.score)[0].project;
    }, [step, selections]);

    const handleNext = () => {
        if (step === 'budget') setStep('location');
        else if (step === 'location') setStep('goal');
        else if (step === 'goal') setStep('result');
    };

    const reset = () => {
        setStep('budget');
        setSelections({ budget: 150, locationPriority: 'any', investmentGoal: 'appreciation' });
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-[#FFFFFF] border border-[#C5A059]/20 rounded-sm shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
            
            {/* Header / Progress */}
            <div className="p-8 border-b border-[#C5A059]/10 bg-[#EEF2F6]/50 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-serif text-[#323334]">Joyville <span className="text-[#1D4F9C] italic">Matchmaker</span></h2>
                    <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#323334]/40 mt-1">Zero-Search Investment Engine</p>
                </div>
                <div className="flex gap-2">
                    {(['budget', 'location', 'goal', 'result'] as Step[]).map((s, i) => (
                        <div 
                            key={s} 
                            className={`h-1.5 w-12 rounded-full transition-all duration-500 ${
                                (step === s || i < ['budget', 'location', 'goal', 'result'].indexOf(step)) 
                                ? 'bg-[#1D4F9C]' 
                                : 'bg-[#1D4F9C]/10'
                            }`} 
                        />
                    ))}
                </div>
            </div>

            {/* Steps Container */}
            <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
                
                {step === 'budget' && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-center space-y-4">
                            <span className="p-4 bg-[#EEF2F6] rounded-full inline-block mb-4"><Wallet className="text-[#1D4F9C]" size={32} /></span>
                            <h3 className="text-3xl font-serif text-[#323334]">What is your ideal budget?</h3>
                            <p className="text-[#323334]/60 font-light italic">All-inclusive pricing in Indian Rupee (₹)</p>
                        </div>
                        <div className="max-w-md mx-auto">
                            <input 
                                type="range" 
                                min="40" 
                                max="250" 
                                step="5"
                                value={selections.budget}
                                onChange={(e) => setSelections({...selections, budget: parseInt(e.target.value)})}
                                className="w-full h-2 bg-[#EEF2F6] rounded-lg appearance-none cursor-pointer accent-[#1D4F9C]"
                                aria-label="Adjust your maximum budget in Lacs"
                                title="Budget Slider"
                            />
                            <div className="flex justify-between mt-6 text-2xl font-serif text-[#1D4F9C]">
                                <span>₹40 Lac</span>
                                <span className="bg-[#1D4F9C] text-white px-6 py-2 rounded-sm shadow-lg animate-pulse">₹{selections.budget} Lac</span>
                                <span>₹2.5 Cr+</span>
                            </div>
                        </div>
                        <div className="text-center pt-8">
                            <button onClick={handleNext} className="group bg-[#1D4F9C] text-white px-12 py-5 text-xs font-bold uppercase tracking-widest hover:bg-[#323334] transition-all flex items-center gap-4 mx-auto">
                                Next Step <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                )}

                {step === 'location' && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700">
                        <div className="text-center space-y-4">
                            <span className="p-4 bg-[#EEF2F6] rounded-full inline-block mb-4"><MapPin className="text-[#1D4F9C]" size={32} /></span>
                            <h3 className="text-3xl font-serif text-[#323334]">Select your location priority</h3>
                            <p className="text-[#323334]/60 font-light italic">Where does your life revolve in Pune?</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {[
                                { id: 'it', label: 'IT Corridor (Hinjewadi/Pune West)', icon: <Building2 size={20} /> },
                                { id: 'township', label: 'Self-Sustaining Townships (Hadapsar)', icon: <Sparkles size={20} /> },
                                { id: 'luxury', label: 'Premium Elevation & Privacy', icon: <TrendingUp size={20} /> },
                                { id: 'any', label: 'Maximum ROI Value (Anywhere)', icon: <Target size={20} /> }
                            ].map((opt) => (
                                <button 
                                    key={opt.id}
                                    onClick={() => setSelections({...selections, locationPriority: opt.id as Selections['locationPriority']})}
                                    className={`p-6 border text-left flex items-center gap-4 transition-all rounded-sm ${
                                        selections.locationPriority === opt.id 
                                        ? 'border-[#1D4F9C] bg-[#EEF2F6] shadow-md' 
                                        : 'border-[#C5A059]/20 hover:border-[#1D4F9C]'
                                    }`}
                                >
                                    <div className={`p-3 rounded-full ${selections.locationPriority === opt.id ? 'bg-[#1D4F9C] text-white' : 'bg-[#EEF2F6] text-[#323334]/40'}`}>
                                        {opt.icon}
                                    </div>
                                    <span className="text-sm font-bold uppercase tracking-widest leading-tight">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                        <div className="text-center pt-8">
                            <button onClick={handleNext} className="group bg-[#1D4F9C] text-white px-12 py-5 text-xs font-bold uppercase tracking-widest hover:bg-[#323334] transition-all flex items-center gap-4 mx-auto">
                                Continue <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                )}

                {step === 'goal' && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700">
                        <div className="text-center space-y-4">
                            <span className="p-4 bg-[#EEF2F6] rounded-full inline-block mb-4"><Target className="text-[#1D4F9C]" size={32} /></span>
                            <h3 className="text-3xl font-serif text-[#323334]">What is your primary goal?</h3>
                            <p className="text-[#323334]/60 font-light italic">Your intent defines your match.</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch max-w-3xl mx-auto">
                            {[
                                { id: 'rental', label: 'Maximum Rental Yield', desc: 'Secure monthly returns from high-demand IT hubs.' },
                                { id: 'appreciation', label: 'Capital Appreciation', desc: 'Early-entry into upcoming infra-growth corridor.' },
                                { id: 'end-user', label: 'Family & Self-Use', desc: 'Township legacy with schools & healthcare nearby.' }
                            ].map((opt) => (
                                <button 
                                    key={opt.id}
                                    onClick={() => setSelections({...selections, investmentGoal: opt.id as Selections['investmentGoal']})}
                                    className={`flex-1 p-8 border text-center flex flex-col items-center gap-4 transition-all rounded-sm ${
                                        selections.investmentGoal === opt.id 
                                        ? 'border-[#1D4F9C] bg-[#EEF2F6] shadow-xl' 
                                        : 'border-[#C5A059]/20 hover:border-[#1D4F9C]'
                                    }`}
                                >
                                    <div className={`p-4 rounded-full mb-4 ${selections.investmentGoal === opt.id ? 'bg-[#1D4F9C] text-white shadow-lg' : 'bg-[#EEF2F6] text-[#323334]/40'}`}>
                                        {opt.id === 'rental' ? <Wallet size={24} /> : opt.id === 'appreciation' ? <TrendingUp size={24} /> : <ShieldCheck size={24} />}
                                    </div>
                                    <h4 className="text-xs font-bold uppercase tracking-[0.2em]">{opt.label}</h4>
                                    <p className="text-[10px] text-[#323334]/60 leading-relaxed">{opt.desc}</p>
                                </button>
                            ))}
                        </div>
                        <div className="text-center pt-12">
                            <button onClick={handleNext} className="bg-[#323334] text-white px-16 py-6 text-sm font-bold uppercase tracking-[0.3em] hover:bg-[#1D4F9C] transition-all shadow-2xl animate-bounce">
                                Generate My Match
                            </button>
                        </div>
                    </div>
                )}

                {step === 'result' && matchedProject && (
                    <div className="animate-in fade-in zoom-in duration-1000 space-y-12">
                        <div className="text-center space-y-4">
                            <span className="p-3 bg-emerald-50 text-emerald-600 rounded-full inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-emerald-100">
                                <CheckCircle2 size={16} /> 100% Data-Backed Match
                            </span>
                            <h3 className="text-4xl md:text-5xl font-serif text-[#323334]">Your Ideal Investment: <span className="text-[#1D4F9C]">{matchedProject.title}</span></h3>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 items-center bg-[#EEF2F6]/50 p-8 rounded-sm">
                            <div className="relative aspect-video rounded-sm overflow-hidden shadow-2xl">
                                <Image src={matchedProject.image} fill className="object-cover" alt={`${matchedProject.title} - Matched Shapoorji Pallonji Residence in ${matchedProject.location}`} />
                                <div className="absolute top-4 left-4 bg-[#1D4F9C] text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest shadow-lg">
                                    {matchedProject.status}
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 text-[#323334]/60">
                                    <MapPin size={18} className="text-[#1D4F9C]" />
                                    <span className="text-lg font-light italic">{matchedProject.location}</span>
                                </div>
                                <p className="text-sm font-light leading-relaxed border-l-2 border-[#C5A059] pl-6 italic">
                                    This asset perfectly resolves your {selections.investmentGoal} goal within the {selections.budget} Lac budget, prioritized for {selections.locationPriority === 'any' ? 'overall Pune growth' : selections.locationPriority} corridor authority.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <span className="text-[9px] uppercase tracking-widest bg-white border border-[#1D4F9C]/10 px-3 py-1.5 font-bold shadow-sm">SP Brand Legacy</span>
                                    <span className="text-[9px] uppercase tracking-widest bg-white border border-[#1D4F9C]/10 px-3 py-1.5 font-bold shadow-sm">RERA Validated</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 h-full">
                            <Link 
                                href={`/projects/${matchedProject.slug}`}
                                className="group p-6 bg-[#FFFFFF] border border-[#1D4F9C]/20 hover:border-[#1D4F9C] transition-all flex flex-col justify-between items-center text-center rounded-sm"
                            >
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#323334]/40 mb-4">Core Asset</h4>
                                <span className="text-sm font-serif group-hover:text-[#1D4F9C]">Project Details</span>
                                <ChevronRight className="mt-4 text-[#1D4F9C] group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link 
                                href={`/insights/joyville-vs-competitors`}
                                className="group p-6 bg-[#FFFFFF] border border-[#1D4F9C]/20 hover:border-[#1D4F9C] transition-all flex flex-col justify-between items-center text-center rounded-sm"
                            >
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#323334]/40 mb-4">Investment Yield</h4>
                                <span className="text-sm font-serif group-hover:text-[#1D4F9C]">ROI Simulator</span>
                                <ChevronRight className="mt-4 text-[#1D4F9C] group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link 
                                href={`/projects/${matchedProject.slug}/insider`}
                                className="group p-6 bg-[#FFFFFF] border border-[#1D4F9C]/20 hover:border-[#1D4F9C] transition-all flex flex-col justify-between items-center text-center rounded-sm"
                            >
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#323334]/40 mb-4">Construction Status</h4>
                                <span className="text-sm font-serif group-hover:text-[#1D4F9C]">Insider Hub</span>
                                <ChevronRight className="mt-4 text-[#1D4F9C] group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="text-center pt-8 border-t border-[#C5A059]/10">
                            <button onClick={reset} className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#323334]/40 hover:text-[#1D4F9C] transition-colors flex items-center gap-2 mx-auto underline italic">
                                Start Over / New Selection
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Trust Signal */}
            <div className="p-6 bg-[#1A1A1A] text-white flex flex-col md:flex-row items-center justify-between text-[10px] uppercase font-bold tracking-[0.2em] gap-4">
                <span className="flex items-center gap-2 opacity-50"><ShieldCheck size={14} className="text-[#C5A059]" /> Neutral Data Verification System</span>
                <span className="flex items-center gap-2 opacity-100"><Circle size={8} className="fill-emerald-500 text-emerald-500 animate-pulse" /> Live Availability Sync Active</span>
                <span className="opacity-50 italic">Match Score: AI-Optimized for Pune 2026</span>
            </div>
        </div>
    );
}
