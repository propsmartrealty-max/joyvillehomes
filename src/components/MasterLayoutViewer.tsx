"use client";

import { useState } from 'react';
import Image from 'next/image';
import { 
    Maximize2, 
    ZoomIn, 
    ZoomOut, 
    RotateCcw, 
    X, 
    Download, 
    MapPin, 
    Compass, 
    Layers, 
    ShieldCheck, 
    ArrowDownCircle, 
    Building2, 
    Trees, 
    Dumbbell, 
    Waves, 
    Car,
    Sparkles,
    Landmark
} from 'lucide-react';
import QuickEnquireModal from './QuickEnquireModal';

interface MasterLayoutViewerProps {
    masterLayoutUrl: string;
    projectName: string;
    location: string;
    reraNumber?: string | string[];
}

const ZONING_POINTS = [
    { id: '1', title: 'Residential Towers', desc: 'Polaris, Cygnus & Infinia Tower Clusters (G+22 floors)', icon: Building2 },
    { id: '2', title: 'Signature Clubhouse', desc: '32,000+ sq. ft. multi-level recreational & wellness hub', icon: Sparkles },
    { id: '3', title: '8-Acre Central Park', desc: 'Expansive biophilic green lung with dense Miyawaki canopy', icon: Trees },
    { id: '4', title: 'Olympic Lap Pool', desc: 'Temperature-controlled lap pool, kids pool & sunken aqua gym', icon: Waves },
    { id: '5', title: 'Elevated Podium Eco-Deck', desc: 'Traffic-free leisure podium with reflexology & zen gardens', icon: Layers },
    { id: '6', title: 'Tennis & Pickleball Courts', desc: 'Championship acrylic-surfaced multi-sport courts', icon: Dumbbell },
    { id: '7', title: 'Multipurpose Sports Turf', desc: 'Basketball court, mini football turf & cricket simulator', icon: Dumbbell },
    { id: '8', title: 'Grand Entry & Security Gate', desc: 'RFID boom barriers, CCTV surveillance & visitor check-in', icon: ShieldCheck },
    { id: '9', title: 'Tree-Lined Perimeter Boulevard', desc: 'Dedicated 1.8km cycling circuit & continuous jogging track', icon: Trees },
    { id: '10', title: 'Covered & Visitor Parking', desc: 'Basement + podium ventilated vehicle parking bays', icon: Car },
];

const TREETOPIA_ZONING_POINTS = [
    { id: '1', title: 'Regal Villa Plots', desc: '1,800 - 2,500 sq. ft. clear title NA plots with individual 7/12 extract', icon: Building2 },
    { id: '2', title: 'Grand Estate Plots', desc: '3,000 - 5,000+ sq. ft. signature plots overlooking the 25-acre lake', icon: Sparkles },
    { id: '3', title: '25-Acre Natural Lake', desc: 'Central water body with eco-pond, fountain & water ghats', icon: Waves },
    { id: '4', title: '18m Tree-Lined Central Avenue', desc: 'Paved arterial roadway with underground power & fiber optic lines', icon: Compass },
    { id: '5', title: 'Grand Social Clubhouse', desc: 'Multi-level recreational hub with swimming pool, gym & billiards', icon: Layers },
    { id: '6', title: 'Multi-Sport & Riding Arenas', desc: 'Tennis courts, play courts & equestrian riding area and trail', icon: Dumbbell },
    { id: '7', title: 'Lakeside Promenade & Decks', desc: 'Scenic viewing decks, fishing deck, and continuous water walkway', icon: Waves },
    { id: '8', title: 'Grand Ceremonial Entrance', desc: 'RFID boom barriers, security check-in, and boundary walls', icon: ShieldCheck },
    { id: '9', title: 'Ancient Preserved Temple', desc: 'Heritage temple sanctum within the natural terrain', icon: Landmark },
    { id: '10', title: 'Hiking & Canopy Trails', desc: 'Native dense canopy trails, lemongrass groves & banyan trees', icon: Trees },
];

export default function MasterLayoutViewer({ 
    masterLayoutUrl, 
    projectName, 
    location,
    reraNumber 
}: MasterLayoutViewerProps) {
    const isTreetopia = projectName.toLowerCase().includes('treetopia');
    const zoningPoints = isTreetopia ? TREETOPIA_ZONING_POINTS : ZONING_POINTS;
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeZone, setActiveZone] = useState<string | null>(null);

    const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
    const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
    const handleResetZoom = () => setZoomLevel(1);

    const scrollToFloorPlans = (e: React.MouseEvent) => {
        e.preventDefault();
        const el = document.getElementById('floor-plans');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="space-y-8">
            {/* Architecture Scope Notice */}
            <div className="bg-[#1D4F9C]/5 border border-[#1D4F9C]/20 rounded-sm p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1D4F9C] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Compass size={18} />
                    </div>
                    <div>
                        <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#1D4F9C]">
                            {isTreetopia ? 'Macro 105-Acre Estate Development Plan' : 'Macro Estate Development Plan'}
                        </div>
                        <p className="text-xs text-[#323334] font-light mt-0.5 max-w-2xl">
                            {isTreetopia 
                                ? 'The Master Layout visualizes the 105-acre estate land zoning, 25-acre natural lake, central avenue, and villa plot sectors. Looking for individual plot dimensions and typology blueprints? Explore the Plot Layouts section below.'
                                : 'The Master Layout visualizes overall land zoning, tower placements, access roads, and recreational spaces. Looking for room dimensions and apartment blueprints? Explore the Floor Plans section below.'
                            }
                        </p>
                    </div>
                </div>
                <button
                    onClick={scrollToFloorPlans}
                    className="shrink-0 flex items-center gap-1.5 px-3 py-2 bg-white border border-[#1D4F9C]/30 text-[#1D4F9C] hover:bg-[#1D4F9C] hover:text-white rounded-sm text-[10px] tracking-widest uppercase font-bold transition-all shadow-sm"
                >
                    {isTreetopia ? 'Jump to Plot Layouts' : 'Jump to Floor Plans'} <ArrowDownCircle size={13} />
                </button>
            </div>

            {/* Master Plan Main Visual Frame */}
            <div className="relative group rounded-sm overflow-hidden border border-[#C5A059]/60 bg-[#EEF2F6] shadow-sm">
                <div 
                    onClick={() => setIsLightboxOpen(true)}
                    className="aspect-[16/9] relative cursor-zoom-in"
                >
                    <Image
                        src={masterLayoutUrl}
                        alt={`${projectName} Master Layout & Macro Site Plan ${location}`}
                        fill
                        className="object-contain p-2 sm:p-4 bg-white/95 group-hover:scale-[1.01] transition-transform duration-500"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        priority={true}
                    />

                    {/* Gradient Overlay & Hover Pill */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-transparent to-transparent flex items-end justify-between p-4 sm:p-6 opacity-95 group-hover:opacity-100 transition-opacity">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-white">
                            <span className="text-[10px] tracking-widest uppercase bg-[#1D4F9C] px-3 py-1 font-bold rounded-sm shadow-md">
                                Certified Master Site Plan
                            </span>
                            <span className="text-xs text-white/90 font-light flex items-center gap-1">
                                <MapPin size={13} className="text-[#C5A059]" /> {location}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/90 text-[#1D4F9C] hover:bg-white text-[11px] tracking-widest uppercase font-bold px-4 py-2 rounded-full border border-[#C5A059]/40 backdrop-blur-md shadow-md transition-all">
                            <Maximize2 size={13} /> Click to Enlarge Plan
                        </div>
                    </div>
                </div>
            </div>

            {/* Zoning Legend Grid & Action CTAs */}
            <div className="bg-[#FFFFFF] border border-[#C5A059]/30 rounded-sm p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#C5A059]/20 gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-[#C5A059] text-[10px] tracking-[0.2em] uppercase font-bold mb-1">
                            <Layers size={14} /> Master Development Zoning Legend
                        </div>
                        <h3 className="text-xl font-serif text-[#323334]">
                            Master Site Infrastructure & Amenities Key
                        </h3>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsLightboxOpen(true)}
                            className="px-4 py-2.5 bg-[#EEF2F6] hover:bg-[#E2E8F0] text-[#1D4F9C] border border-[#1D4F9C]/20 rounded-sm text-[10px] tracking-widest uppercase font-bold transition-all flex items-center gap-1.5"
                        >
                            <ZoomIn size={13} /> Fullscreen Blueprint
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-5 py-2.5 bg-[#1D4F9C] hover:bg-[#153a75] text-white rounded-sm text-[10px] tracking-widest uppercase font-bold transition-all shadow-md flex items-center gap-1.5"
                        >
                            <Download size={13} /> Download Master Plan PDF
                        </button>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-6">
                    {zoningPoints.map((zone) => {
                        const Icon = zone.icon;
                        const isSelected = activeZone === zone.id;
                        return (
                            <button
                                key={zone.id}
                                onClick={() => setActiveZone(isSelected ? null : zone.id)}
                                className={`text-left p-3.5 rounded-sm border transition-all text-xs flex flex-col justify-between ${
                                    isSelected 
                                        ? 'bg-[#1D4F9C]/10 border-[#1D4F9C] shadow-sm' 
                                        : 'bg-[#EEF2F6]/60 border-[#C5A059]/20 hover:border-[#C5A059] hover:bg-white'
                                }`}
                            >
                                <div className="flex items-center justify-between w-full mb-1.5">
                                    <span className="w-5 h-5 rounded-full bg-[#1D4F9C] text-white text-[10px] font-bold flex items-center justify-center">
                                        {zone.id}
                                    </span>
                                    <Icon size={14} className="text-[#1D4F9C]/70" />
                                </div>
                                <div className="font-semibold text-[#1A1A1A] text-[11px] leading-tight mb-1">
                                    {zone.title}
                                </div>
                                <p className="text-[10px] text-[#323334]/70 font-light leading-snug line-clamp-2">
                                    {zone.desc}
                                </p>
                            </button>
                        );
                    })}
                </div>

                {reraNumber && (
                    <div className="mt-6 pt-4 border-t border-[#C5A059]/20 flex items-center justify-between text-[11px] text-[#323334]/70 font-light">
                        <span className="flex items-center gap-1.5">
                            <ShieldCheck size={14} className="text-emerald-600" />
                            MahaRERA Registered Master Plan Layout: <strong className="font-semibold text-[#1A1A1A]">{Array.isArray(reraNumber) ? reraNumber.join(', ') : reraNumber}</strong>
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[#C5A059]">
                            Subject to competent authority sanctions
                        </span>
                    </div>
                )}
            </div>

            {/* Lightbox Modal with Zoom Controls */}
            {isLightboxOpen && (
                <div 
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${projectName} Master Layout Fullscreen Viewer`}
                    className="fixed inset-0 z-[999] bg-[#0A0D14]/95 backdrop-blur-xl flex flex-col"
                >
                    {/* Lightbox Topbar */}
                    <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between text-white shrink-0">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] tracking-widest uppercase bg-[#C5A059] text-black px-2.5 py-1 font-bold rounded-sm">
                                Master Site Plan
                            </span>
                            <span className="text-sm font-serif">{projectName} Master Layout</span>
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
                                onClick={() => setIsModalOpen(true)}
                                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#1D4F9C] hover:bg-[#153a75] text-white text-xs tracking-wider uppercase font-bold rounded-sm"
                            >
                                <Download size={14} /> Download PDF
                            </button>
                            <button
                                onClick={() => setIsLightboxOpen(false)}
                                aria-label="Close fullscreen view"
                                className="p-2 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-colors"
                            >
                                <X size={22} />
                            </button>
                        </div>
                    </div>

                    {/* Lightbox Image Stage */}
                    <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
                        <div 
                            className="relative transition-transform duration-200 origin-center max-w-full max-h-full"
                            style={{ transform: `scale(${zoomLevel})` }}
                        >
                            <Image
                                src={masterLayoutUrl}
                                alt={`${projectName} Master Layout Fullscreen Site Plan`}
                                width={1600}
                                height={900}
                                className="object-contain max-h-[85vh] w-auto rounded-sm shadow-2xl bg-white"
                                priority
                            />
                        </div>
                    </div>

                    {/* Lightbox Footer */}
                    <div className="h-12 px-6 border-t border-white/10 flex items-center justify-between text-xs text-white/70 shrink-0">
                        <span>
                            {isTreetopia 
                                ? 'Tip: Use zoom controls above or scroll to inspect estate sectors and natural lake features.' 
                                : 'Tip: Use zoom controls above or scroll to inspect tower footprints and zoning keys.'
                            }
                        </span>
                        <button
                            onClick={() => {
                                setIsLightboxOpen(false);
                                scrollToFloorPlans({ preventDefault: () => {} } as React.MouseEvent);
                            }}
                            className="text-[#C5A059] hover:underline uppercase text-[10px] tracking-wider font-semibold"
                        >
                            {isTreetopia ? 'Switch to Plot Typologies →' : 'Switch to Unit Floor Plans →'}
                        </button>
                    </div>
                </div>
            )}

            {/* Download Master Plan Modal */}
            <QuickEnquireModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                projectName={projectName}
                source="Master Layout High-Res PDF Download"
            />
        </div>
    );
}
