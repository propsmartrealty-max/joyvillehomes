"use client";

import { useCallback } from 'react';

const SECTIONS = ['Overview', 'Master-Layout', 'Floor-Plans', 'Amenities', 'Specifications', 'Financing', 'Gallery', 'Location'];

export default function StickyProjectTabs() {
    const scrollToSection = useCallback((e: React.MouseEvent<HTMLButtonElement>, section: string) => {
        e.preventDefault();
        const element = document.getElementById(section.toLowerCase());
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    return (
        <div className="sticky top-[72px] lg:top-20 z-[90] bg-[#EEF2F6]/95 backdrop-blur-xl border-y border-[#C5A059]/30 mb-8 md:mb-16 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 sm:gap-8 overflow-x-auto scroll-smooth no-scrollbar">
                {SECTIONS.map((section) => (
                    <button
                        key={section}
                        onClick={(e) => scrollToSection(e, section)}
                        className="flex-shrink-0 min-h-[48px] px-4 py-4 text-[#1A1A1A] hover:text-[#1D4F9C] tracking-[0.15em] uppercase text-[10px] font-bold whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-[#C5A059]"
                    >
                        {section.replace('-', ' ')}
                    </button>
                ))}
            </div>
        </div>
    );
}
