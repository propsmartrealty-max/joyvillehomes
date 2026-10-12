"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, Menu, X, ChevronDown, MapPin, Sparkles, Building2, Calculator, BookOpen, Compass } from "lucide-react";
import dynamic from "next/dynamic";
import { projects } from "@/data/projects";
import CurrencyToggle from "./CurrencyToggle";

const QuickEnquireModal = dynamic(() => import("./QuickEnquireModal"), {
    ssr: false,
});

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isEnquireModalOpen, setIsEnquireModalOpen] = useState(false);
    const pathname = usePathname();

    const isHomePage = pathname === "/";

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    // Close dropdown on route change
    useEffect(() => {
        const timer = setTimeout(() => {
            setActiveDropdown(null);
            setIsMobileMenuOpen(false);
        }, 0);
        return () => clearTimeout(timer);
    }, [pathname]);

    // Top 4 flagship projects for the sleek mega-dropdown
    const flagshipProjects = projects.slice(0, 4);

    return (
        <>
            <header
                className={`fixed top-3 left-1/2 -translate-x-1/2 w-[96%] max-w-7xl z-[100] transition-all duration-500 ease-out px-4 sm:px-6 py-2.5 rounded-2xl border ${
                    isScrolled || !isHomePage
                        ? 'bg-white/95 backdrop-blur-xl border-[#C5A059]/30 shadow-[0_12px_40px_rgba(29,79,156,0.1)]'
                        : 'bg-white/90 backdrop-blur-lg border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
                }`}
                onMouseLeave={() => setActiveDropdown(null)}
            >
                <nav aria-label="Main Navigation" className="flex justify-between items-center relative">
                    {/* Brand Logo */}
                    <Link href="/" aria-label="Joyville Pune Home" className="flex items-center shrink-0 z-20 group">
                        <Image 
                            src="/logo.svg" 
                            alt="Joyville Homes - Shapoorji Pallonji Real Estate Pune Official Logo" 
                            width={118} 
                            height={42} 
                            className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                            priority
                            unoptimized
                        />
                    </Link>

                    {/* Streamlined Desktop Navigation Links (Uncluttered & High-Impact) */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] tracking-[0.16em] uppercase font-medium text-[#2C3E50]">
                        
                        {/* 1. Projects Dropdown */}
                        <div
                            className="relative py-2 flex items-center gap-1 cursor-pointer group"
                            onMouseEnter={() => setActiveDropdown('projects')}
                            onClick={() => setActiveDropdown(activeDropdown === 'projects' ? null : 'projects')}
                        >
                            <Link href="/projects" className="hover:text-[#1D4F9C] transition-colors py-1">
                                Projects
                            </Link>
                            <ChevronDown size={13} className={`transition-transform duration-300 ${activeDropdown === 'projects' ? 'rotate-180 text-[#1D4F9C]' : 'text-slate-400'}`} />

                            <AnimatePresence>
                                {activeDropdown === 'projects' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full -left-20 w-[640px] pt-3 z-50 pointer-events-auto"
                                        onMouseEnter={() => setActiveDropdown('projects')}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <div className="bg-white border border-[#C5A059]/25 shadow-[0_20px_50px_rgba(29,79,156,0.15)] rounded-xl p-5 overflow-hidden">
                                            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                                                <span className="text-[10px] tracking-[0.2em] font-bold text-[#1D4F9C] flex items-center gap-1.5">
                                                    <Building2 size={13} /> Flagship Pune Residences
                                                </span>
                                                <Link href="/projects" className="text-[10px] font-semibold tracking-wider text-[#C5A059] hover:text-[#1D4F9C] transition-colors">
                                                    View All 10 Projects →
                                                </Link>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                {flagshipProjects.map((proj) => (
                                                    <Link 
                                                        key={proj.id} 
                                                        href={`/projects/${proj.slug}`}
                                                        className="group/card flex items-center gap-3 p-2.5 rounded-lg border border-slate-100 hover:border-[#C5A059]/50 hover:bg-[#F8FAFC] transition-all"
                                                        onClick={() => setActiveDropdown(null)}
                                                    >
                                                        <div className="w-16 h-14 relative rounded-md overflow-hidden shrink-0 bg-slate-100">
                                                            <Image 
                                                                src={proj.image} 
                                                                alt={`${proj.title} Pune - Shapoorji Pallonji Joyville Homes`} 
                                                                fill 
                                                                className="object-cover group-hover/card:scale-105 transition-transform duration-500" 
                                                                sizes="64px"
                                                            />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <span className="block text-[11px] font-bold text-[#1E293B] truncate group-hover/card:text-[#1D4F9C] transition-colors">
                                                                {proj.title}
                                                            </span>
                                                            <span className="block text-[9px] text-[#64748B] tracking-normal normal-case truncate">
                                                                {proj.location.split(',')[0]} • {proj.type}
                                                            </span>
                                                            <span className="block text-[10px] font-semibold text-[#C5A059] mt-0.5">
                                                                {proj.price}
                                                            </span>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* 2. Locations Dropdown */}
                        <div
                            className="relative py-2 flex items-center gap-1 cursor-pointer group"
                            onMouseEnter={() => setActiveDropdown('locations')}
                            onClick={() => setActiveDropdown(activeDropdown === 'locations' ? null : 'locations')}
                        >
                            <span className="hover:text-[#1D4F9C] transition-colors py-1">
                                Micro-Markets
                            </span>
                            <ChevronDown size={13} className={`transition-transform duration-300 ${activeDropdown === 'locations' ? 'rotate-180 text-[#1D4F9C]' : 'text-slate-400'}`} />

                            <AnimatePresence>
                                {activeDropdown === 'locations' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 w-64 pt-3 z-50 pointer-events-auto"
                                        onMouseEnter={() => setActiveDropdown('locations')}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <div className="bg-white border border-[#C5A059]/25 shadow-2xl rounded-xl p-3 space-y-1">
                                            <Link href="/locality/hinjewadi" className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                                                <MapPin size={14} className="text-[#1D4F9C] shrink-0" />
                                                <div>
                                                    <span className="block text-[11px] font-bold text-[#1E293B]">Hinjewadi</span>
                                                    <span className="block text-[9px] text-slate-500 normal-case tracking-normal">IT Corridor • Phase 1</span>
                                                </div>
                                            </Link>
                                            <Link href="/locality/hadapsar" className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                                                <MapPin size={14} className="text-[#1D4F9C] shrink-0" />
                                                <div>
                                                    <span className="block text-[11px] font-bold text-[#1E293B]">Hadapsar</span>
                                                    <span className="block text-[9px] text-slate-500 normal-case tracking-normal">East Pune • Townships</span>
                                                </div>
                                            </Link>
                                            <Link href="/locality/bavdhan" className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                                                <MapPin size={14} className="text-[#1D4F9C] shrink-0" />
                                                <div>
                                                    <span className="block text-[11px] font-bold text-[#1E293B]">Bavdhan</span>
                                                    <span className="block text-[9px] text-slate-500 normal-case tracking-normal">Nature Valley • 1000 Acres</span>
                                                </div>
                                            </Link>
                                            <div className="pt-2 mt-1 border-t border-slate-100">
                                                <Link href="/location" className="block text-[10px] text-center font-bold text-[#C5A059] hover:text-[#1D4F9C] transition-colors py-1">
                                                    Pune Connectivity Map →
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* 3. Buyer Hub Dropdown */}
                        <div
                            className="relative py-2 flex items-center gap-1 cursor-pointer group"
                            onMouseEnter={() => setActiveDropdown('buyerHub')}
                            onClick={() => setActiveDropdown(activeDropdown === 'buyerHub' ? null : 'buyerHub')}
                        >
                            <span className="hover:text-[#1D4F9C] transition-colors py-1">
                                Buyer Hub
                            </span>
                            <ChevronDown size={13} className={`transition-transform duration-300 ${activeDropdown === 'buyerHub' ? 'rotate-180 text-[#1D4F9C]' : 'text-slate-400'}`} />

                            <AnimatePresence>
                                {activeDropdown === 'buyerHub' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 w-72 pt-3 z-50 pointer-events-auto"
                                        onMouseEnter={() => setActiveDropdown('buyerHub')}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <div className="bg-white border border-[#C5A059]/25 shadow-2xl rounded-xl p-3 space-y-1">
                                            <Link href="/roi-calculator" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                                                <Calculator size={15} className="text-[#1D4F9C] shrink-0" />
                                                <div>
                                                    <span className="block text-[11px] font-bold text-[#1E293B]">ROI & EMI Calculator</span>
                                                    <span className="block text-[9px] text-slate-500 normal-case tracking-normal">Simulate returns & monthly outflow</span>
                                                </div>
                                            </Link>
                                            <Link href="/locality/compare" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                                                <Compass size={15} className="text-[#1D4F9C] shrink-0" />
                                                <div>
                                                    <span className="block text-[11px] font-bold text-[#1E293B]">Market Comparison Matrix</span>
                                                    <span className="block text-[9px] text-slate-500 normal-case tracking-normal">Side-by-side micro-market analysis</span>
                                                </div>
                                            </Link>
                                            <Link href="/insights/matchmaker" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                                                <Sparkles size={15} className="text-[#C5A059] shrink-0" />
                                                <div>
                                                    <span className="block text-[11px] font-bold text-[#1E293B]">Investment Matchmaker</span>
                                                    <span className="block text-[9px] text-slate-500 normal-case tracking-normal">60-second home recommendation</span>
                                                </div>
                                            </Link>
                                            <Link href="/insights/nri/region/nri-uae-dubai" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                                                <BookOpen size={15} className="text-[#1D4F9C] shrink-0" />
                                                <div>
                                                    <span className="block text-[11px] font-bold text-[#1E293B]">Global NRI Desk</span>
                                                    <span className="block text-[9px] text-slate-500 normal-case tracking-normal">FEMA & Dubai/USA investment guidance</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* 4. Amenities */}
                        <Link href="/amenities" className="hover:text-[#1D4F9C] transition-colors py-2">
                            Amenities
                        </Link>

                        {/* 5. Insights */}
                        <Link href="/insights" className="hover:text-[#1D4F9C] transition-colors py-2">
                            Insights
                        </Link>
                    </div>

                    {/* Right Action Bar (Currency + Sleek Luxury CTA + Mobile Toggle) */}
                    <div className="flex items-center gap-2.5 sm:gap-4 shrink-0 z-20">
                        <CurrencyToggle />

                        <button
                            onClick={() => setIsEnquireModalOpen(true)}
                            aria-label="Enquire Now"
                            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[10px] tracking-[0.16em] uppercase bg-[#1D4F9C] text-white hover:bg-[#153a73] transition-all duration-300 shadow-[0_4px_14px_rgba(29,79,156,0.3)] hover:shadow-[0_6px_20px_rgba(29,79,156,0.4)] border border-[#C5A059]/40 active:scale-95"
                        >
                            <PhoneCall size={12} className="text-[#C5A059]" />
                            <span>Schedule Visit</span>
                        </button>

                        <button
                            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 text-[#1E293B] hover:text-[#1D4F9C] hover:border-[#1D4F9C] transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Quick Enquire Modal */}
            <QuickEnquireModal
                isOpen={isEnquireModalOpen}
                onClose={() => setIsEnquireModalOpen(false)}
                projectName="Joyville Pune Collection"
                source="Global Navbar Enquiry"
            />

            {/* --- REFINED MOBILE DRAWER --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[95] bg-white/98 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 overflow-y-auto"
                    >
                        <div className="max-w-md mx-auto w-full space-y-6">
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold block mb-3">
                                    Residences & Locations
                                </span>
                                <div className="grid grid-cols-2 gap-2">
                                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/projects" className="p-3 bg-slate-50 rounded-xl text-xs font-bold text-[#1E293B] hover:text-[#1D4F9C] border border-slate-100">
                                        All Projects
                                    </Link>
                                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/locality/hinjewadi" className="p-3 bg-slate-50 rounded-xl text-xs font-bold text-[#1E293B] hover:text-[#1D4F9C] border border-slate-100">
                                        Hinjewadi
                                    </Link>
                                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/locality/hadapsar" className="p-3 bg-slate-50 rounded-xl text-xs font-bold text-[#1E293B] hover:text-[#1D4F9C] border border-slate-100">
                                        Hadapsar
                                    </Link>
                                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/locality/bavdhan" className="p-3 bg-slate-50 rounded-xl text-xs font-bold text-[#1E293B] hover:text-[#1D4F9C] border border-slate-100">
                                        Bavdhan
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold block mb-3">
                                    Buyer Tools & Insights
                                </span>
                                <div className="space-y-1.5">
                                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/roi-calculator" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-700">
                                        <span>ROI & EMI Calculator</span>
                                        <ChevronDown size={14} className="-rotate-90 text-slate-400" />
                                    </Link>
                                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/locality/compare" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-700">
                                        <span>Market Matrix</span>
                                        <ChevronDown size={14} className="-rotate-90 text-slate-400" />
                                    </Link>
                                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/amenities" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-700">
                                        <span>60+ Amenities</span>
                                        <ChevronDown size={14} className="-rotate-90 text-slate-400" />
                                    </Link>
                                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/insights" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-700">
                                        <span>Research & Articles</span>
                                        <ChevronDown size={14} className="-rotate-90 text-slate-400" />
                                    </Link>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 space-y-3">
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsEnquireModalOpen(true);
                                    }}
                                    className="w-full py-4 rounded-xl bg-[#1D4F9C] text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#1D4F9C]/25 flex items-center justify-center gap-2"
                                >
                                    <PhoneCall size={14} className="text-[#C5A059]" />
                                    <span>Schedule Site Visit</span>
                                </button>
                                <a
                                    href="https://wa.me/912067431149?text=Hi%2C%20I%20want%20details%20about%20Joyville%20Pune%20homes"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3.5 rounded-xl border border-emerald-500/30 text-emerald-700 bg-emerald-50/50 font-bold text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2"
                                >
                                    <span>Chat on WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
