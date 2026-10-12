"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
    ChevronRight, 
    Home, 
    ArrowRight, 
    Maximize2, 
    ZoomIn, 
    ZoomOut, 
    RotateCcw, 
    X, 
    Ruler, 
    Download, 
    Layers, 
    Eye
} from 'lucide-react';
import QuickEnquireModal from './QuickEnquireModal';
import { generateUnitSlug } from '@/utils/seo-utils';

export interface FloorPlan {
    type: string;
    description?: string;
    carpetArea: string;
    image?: string;
    spatialDimension?: string;
    category?: 'Studio' | 'Apartment' | 'Penthouse' | 'Duplex' | 'Tower Plan';
    intelligence?: {
        roi: string;
        rentalYield: string;
        appreciation: string;
    };
}

interface ProjectClientWrapperProps {
    floorPlans: FloorPlan[];
    projectName: string;
    location: string;
}

export default function ProjectClientWrapper({ floorPlans, projectName, location }: ProjectClientWrapperProps) {
    const [selectedTab, setSelectedTab] = useState<string>('all');
    const [isCostModalOpen, setIsCostModalOpen] = useState(false);
    const [activePlanForCost, setActivePlanForCost] = useState<string | null>(null);
    const [lightboxPlan, setLightboxPlan] = useState<FloorPlan | null>(null);
    const [zoomLevel, setZoomLevel] = useState(1);

    // Filter tabs calculation
    const tabs = useMemo(() => {
        const availableTabs = [
            { id: 'all', label: 'All Floor Plans', count: floorPlans.length }
        ];

        const twoBhkCount = floorPlans.filter(p => p.type.toLowerCase().includes('2 bhk')).length;
        if (twoBhkCount > 0) {
            availableTabs.push({ id: '2bhk', label: '2 BHK Residences', count: twoBhkCount });
        }

        const threeBhkCount = floorPlans.filter(p => p.type.toLowerCase().includes('3 bhk') && !p.type.toLowerCase().includes('duplex')).length;
        if (threeBhkCount > 0) {
            availableTabs.push({ id: '3bhk', label: '3 BHK Residences', count: threeBhkCount });
        }

        const duplexCount = floorPlans.filter(p => p.type.toLowerCase().includes('duplex') || p.category === 'Duplex').length;
        if (duplexCount > 0) {
            availableTabs.push({ id: 'duplex', label: 'Duplex Sky Villas', count: duplexCount });
        }

        const towerCount = floorPlans.filter(p => p.type.toLowerCase().includes('tower') || p.category === 'Tower Plan').length;
        if (towerCount > 0) {
            availableTabs.push({ id: 'tower', label: 'Tower Floor Plates', count: towerCount });
        }

        return availableTabs;
    }, [floorPlans]);

    // Filtered plans
    const filteredPlans = useMemo(() => {
        if (selectedTab === 'all') return floorPlans;
        if (selectedTab === '2bhk') return floorPlans.filter(p => p.type.toLowerCase().includes('2 bhk'));
        if (selectedTab === '3bhk') return floorPlans.filter(p => p.type.toLowerCase().includes('3 bhk') && !p.type.toLowerCase().includes('duplex'));
        if (selectedTab === 'duplex') return floorPlans.filter(p => p.type.toLowerCase().includes('duplex') || p.category === 'Duplex');
        if (selectedTab === 'tower') return floorPlans.filter(p => p.type.toLowerCase().includes('tower') || p.category === 'Tower Plan');
        return floorPlans;
    }, [floorPlans, selectedTab]);

    const handleOpenCostSheet = (planType: string) => {
        setActivePlanForCost(planType);
        setIsCostModalOpen(true);
    };

    const handleOpenLightbox = (plan: FloorPlan) => {
        setLightboxPlan(plan);
        setZoomLevel(1);
    };

    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
    const handleResetZoom = () => setZoomLevel(1);

    return (
        <div className="space-y-8">
            {/* Architectural Clarification Pill */}
            <div className="bg-[#FFFFFF] border border-[#C5A059]/40 rounded-sm p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#C5A059] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Ruler size={16} />
                    </div>
                    <div>
                        <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#1A1A1A] flex items-center gap-2">
                            <span>Individual Apartment Blueprints & Room Dimensions</span>
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                                Verified RERA Carpet Area
                            </span>
                        </div>
                        <p className="text-xs text-[#323334]/80 font-light mt-0.5 max-w-3xl">
                            Each blueprint below illustrates internal room dimensions, living-dining orientation, balcony decks, and utility spaces. To view overall estate zoning, tower positioning, and community amenities, view the <a href="#master-layout" className="font-semibold text-[#1D4F9C] hover:underline">Master Layout above</a>.
                        </p>
                    </div>
                </div>
                <div className="shrink-0 flex items-center gap-2 text-[10px] tracking-wider uppercase font-semibold text-[#1D4F9C] bg-[#EEF2F6] px-3 py-1.5 rounded-sm border border-[#1D4F9C]/20">
                    <Layers size={13} /> {floorPlans.length} Configurations Available
                </div>
            </div>

            {/* Typology Filter Tabs */}
            {tabs.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id)}
                            className={`flex-shrink-0 px-4 py-2.5 rounded-sm text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 border ${
                                selectedTab === tab.id
                                    ? 'bg-[#1D4F9C] text-white border-[#1D4F9C] shadow-md'
                                    : 'bg-[#FFFFFF] text-[#323334] border-[#C5A059]/30 hover:border-[#1D4F9C] hover:bg-[#EEF2F6]'
                            }`}
                        >
                            <span>{tab.label}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                selectedTab === tab.id
                                    ? 'bg-white/20 text-white'
                                    : 'bg-[#EEF2F6] text-[#1D4F9C]'
                            }`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {/* Floor Plans Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.map((plan, idx) => {
                    const isTower = plan.type.toLowerCase().includes('tower') || plan.category === 'Tower Plan';
                    const isDuplex = plan.type.toLowerCase().includes('duplex') || plan.category === 'Duplex';

                    return (
                        <div
                            key={idx}
                            className="w-full bg-[#FFFFFF] border border-[#C5A059]/40 hover:border-[#1D4F9C] transition-all duration-300 rounded-sm flex flex-col group shadow-sm hover:shadow-lg overflow-hidden"
                        >
                            {/* Blueprint Drawing Visual Preview */}
                            <div 
                                onClick={() => handleOpenLightbox(plan)}
                                className="relative aspect-[16/11] bg-[#F8FAFC] border-b border-[#C5A059]/20 cursor-zoom-in overflow-hidden"
                            >
                                {plan.image ? (
                                    <Image
                                        src={plan.image}
                                        alt={`${projectName} ${plan.type} Blueprint Floor Plan`}
                                        fill
                                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#EEF2F6] to-[#FFFFFF]">
                                        <Home className="text-[#1D4F9C] mb-2 opacity-40 group-hover:opacity-80 transition-opacity" size={36} strokeWidth={1.5} />
                                        <span className="text-xs font-serif text-[#323334] font-medium">{plan.type} Blueprint</span>
                                        <span className="text-[10px] text-[#323334]/60 mt-1">Certified Architectural Plan</span>
                                    </div>
                                )}

                                {/* Top Badges */}
                                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                                    <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm shadow-sm ${
                                        isTower
                                            ? 'bg-amber-600 text-white'
                                            : isDuplex
                                            ? 'bg-purple-700 text-white'
                                            : 'bg-[#1D4F9C] text-white'
                                    }`}>
                                        {isTower ? 'Tower Floor Plate' : isDuplex ? 'Duplex Sky Villa' : 'Unit Blueprint'}
                                    </span>
                                    <span className="text-[9px] bg-white/90 backdrop-blur-sm text-[#1A1A1A] px-2 py-0.5 rounded-sm font-semibold border border-[#C5A059]/30">
                                        RERA Validated
                                    </span>
                                </div>

                                {/* Hover Enlarge Overlay */}
                                <div className="absolute inset-0 bg-[#0A0D14]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="px-3.5 py-1.5 bg-white text-[#1D4F9C] text-[10px] tracking-widest uppercase font-bold rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                        <Maximize2 size={12} /> Inspect Blueprint
                                    </span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h4 className="text-[#323334] font-serif text-lg font-normal leading-snug group-hover:text-[#1D4F9C] transition-colors">
                                            {plan.type}
                                        </h4>
                                    </div>

                                    {/* Carpet Area Badge */}
                                    <div className="flex items-center gap-2 mb-3 bg-[#EEF2F6] px-3 py-1.5 rounded-sm border border-[#1D4F9C]/10">
                                        <Ruler size={13} className="text-[#1D4F9C] shrink-0" />
                                        <span className="text-xs font-semibold text-[#1D4F9C]">
                                            Carpet: {plan.carpetArea}
                                        </span>
                                    </div>

                                    {plan.description && (
                                        <p className="text-xs text-[#323334]/80 font-light line-clamp-2 mb-4 leading-relaxed">
                                            {plan.description}
                                        </p>
                                    )}

                                    {/* Financial Intelligence Matrix */}
                                    {plan.intelligence && (
                                        <div className="mb-4 grid grid-cols-3 gap-1 bg-[#F8FAFC] border border-[#C5A059]/20 p-2.5 rounded-sm">
                                            <div className="text-center">
                                                <span className="text-[8px] uppercase tracking-tight text-[#323334]/50 block">Est. ROI</span>
                                                <span className="text-[11px] font-bold text-[#1D4F9C]">{plan.intelligence.roi}</span>
                                            </div>
                                            <div className="text-center border-x border-[#C5A059]/20">
                                                <span className="text-[8px] uppercase tracking-tight text-[#323334]/50 block">Yield</span>
                                                <span className="text-[11px] font-bold text-[#1D4F9C]">{plan.intelligence.rentalYield}</span>
                                            </div>
                                            <div className="text-center">
                                                <span className="text-[8px] uppercase tracking-tight text-[#323334]/50 block">Appr.</span>
                                                <span className="text-[11px] font-bold text-[#1D4F9C]">{plan.intelligence.appreciation}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Action CTAs */}
                                <div className="space-y-2 pt-2 border-t border-[#C5A059]/20">
                                    <button
                                        onClick={() => handleOpenLightbox(plan)}
                                        className="w-full py-2.5 bg-[#EEF2F6] hover:bg-[#E2E8F0] border border-[#1D4F9C]/20 text-[10px] uppercase tracking-widest text-[#1D4F9C] font-bold rounded-sm transition-all flex items-center justify-center gap-1.5"
                                    >
                                        <Eye size={12} /> Inspect Full Blueprint
                                    </button>

                                    <button
                                        aria-label={`Unlock Detailed Cost Sheet for ${plan.type}`}
                                        onClick={() => handleOpenCostSheet(plan.type)}
                                        className="w-full py-2.5 bg-[#1D4F9C] hover:bg-[#153a75] text-white text-[10px] uppercase tracking-widest font-bold rounded-sm transition-all flex items-center justify-center gap-1 shadow-sm"
                                    >
                                        Unlock Detailed Cost Sheet <ChevronRight size={12} />
                                    </button>

                                    {!isTower && (
                                        <Link 
                                            href={`/properties/unit/${generateUnitSlug(projectName, plan.type, location)}`}
                                            className="w-full py-2 text-[9px] uppercase tracking-wider text-[#323334]/70 hover:text-[#1D4F9C] transition-colors flex items-center justify-center gap-1 font-semibold group/link"
                                        >
                                            Detailed Unit Specs & Pricing <ArrowRight size={11} className="group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Interactive Lightbox Modal for Blueprint Inspection */}
            {lightboxPlan && (
                <div 
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${lightboxPlan.type} Blueprint Fullscreen Viewer`}
                    className="fixed inset-0 z-[999] bg-[#0A0D14]/95 backdrop-blur-xl flex flex-col"
                >
                    {/* Lightbox Topbar */}
                    <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between text-white shrink-0">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] tracking-widest uppercase bg-[#C5A059] text-black px-2.5 py-1 font-bold rounded-sm">
                                Unit Floor Plan Blueprint
                            </span>
                            <span className="text-sm font-serif">{lightboxPlan.type} — {projectName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center bg-white/10 rounded-sm border border-white/20 p-1 mr-2">
                                <button
                                    onClick={handleZoomIn}
                                    aria-label="Zoom in"
                                    className="p-1.5 hover:bg-white/20 rounded text-white"
                                >
                                    <ZoomIn size={16} />
                                </button>
                                <span className="text-xs px-2 font-mono">
                                    {Math.round(zoomLevel * 100)}%
                                </span>
                                <button
                                    onClick={handleZoomOut}
                                    aria-label="Zoom out"
                                    className="p-1.5 hover:bg-white/20 rounded text-white"
                                >
                                    <ZoomOut size={16} />
                                </button>
                                <button
                                    onClick={handleResetZoom}
                                    aria-label="Reset zoom"
                                    className="p-1.5 hover:bg-white/20 rounded text-white border-l border-white/20 ml-1"
                                >
                                    <RotateCcw size={14} />
                                </button>
                            </div>

                            <button
                                onClick={() => handleOpenCostSheet(lightboxPlan.type)}
                                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#1D4F9C] hover:bg-[#153a75] text-white text-xs tracking-wider uppercase font-bold rounded-sm shadow-sm"
                            >
                                <Download size={14} /> Cost Sheet & Floor Availability
                            </button>

                            <button
                                onClick={() => setLightboxPlan(null)}
                                aria-label="Close fullscreen view"
                                className="p-2 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-colors"
                            >
                                <X size={22} />
                            </button>
                        </div>
                    </div>

                    {/* Lightbox Blueprint Canvas */}
                    <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
                        <div 
                            className="relative transition-transform duration-200 origin-center max-w-full max-h-full"
                            style={{ transform: `scale(${zoomLevel})` }}
                        >
                            {lightboxPlan.image ? (
                                <Image
                                    src={lightboxPlan.image}
                                    alt={`${lightboxPlan.type} Detailed Architectural Blueprint`}
                                    width={1400}
                                    height={900}
                                    className="object-contain max-h-[80vh] w-auto rounded-sm shadow-2xl bg-white p-4"
                                    priority
                                />
                            ) : (
                                <div className="bg-white p-12 rounded-sm text-center max-w-md shadow-2xl">
                                    <Home size={48} className="mx-auto text-[#1D4F9C] mb-4" />
                                    <h3 className="text-xl font-serif text-[#323334] mb-2">{lightboxPlan.type}</h3>
                                    <p className="text-sm text-[#323334]/80 mb-6">{lightboxPlan.description}</p>
                                    <button
                                        onClick={() => handleOpenCostSheet(lightboxPlan.type)}
                                        className="px-6 py-3 bg-[#1D4F9C] text-white text-xs tracking-widest uppercase font-bold rounded-sm"
                                    >
                                        Request Official Blueprint Copy
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Lightbox Details Bar */}
                    <div className="px-6 py-3 border-t border-white/10 bg-black/40 flex flex-col sm:flex-row items-center justify-between text-xs text-white/80 shrink-0 gap-3">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5 text-white">
                                <Ruler size={13} className="text-[#C5A059]" /> Carpet Area: <strong>{lightboxPlan.carpetArea}</strong>
                            </span>
                            {lightboxPlan.spatialDimension && (
                                <span className="hidden md:inline text-white/60">
                                    Format: {lightboxPlan.spatialDimension}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[11px] text-white/60">
                                Note: Dimensions are structural and unfurnished.
                            </span>
                            <button
                                onClick={() => handleOpenCostSheet(lightboxPlan.type)}
                                className="px-4 py-1.5 bg-[#C5A059] text-black text-[10px] tracking-wider uppercase font-bold rounded-sm hover:bg-[#d5b069] transition-colors"
                            >
                                Request Pricing
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Enquire Modal for Cost Sheet Unlock */}
            <QuickEnquireModal
                isOpen={isCostModalOpen}
                onClose={() => {
                    setIsCostModalOpen(false);
                    setActivePlanForCost(null);
                }}
                projectName={projectName}
                source={activePlanForCost ? `Floor Plan Cost Sheet (${activePlanForCost})` : "Floor Plan Cost Sheet Unlock"}
            />
        </div>
    );
}
