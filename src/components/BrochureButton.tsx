"use client";

import { useState } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import QuickEnquireModal from './QuickEnquireModal';

interface BrochureButtonProps {
    projectName: string;
    label?: string;
    className?: string;
}

export default function BrochureButton({
    projectName,
    label = "Request Brochure",
    className = "w-full bg-[#1D4F9C] text-[#FFFFFF] uppercase tracking-[0.2em] text-[10px] font-bold py-4 hover:bg-[#323334] transition-colors duration-300 shadow-[0_10px_30px_rgba(197,160,89,0.2)]"
}: BrochureButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDownload = () => {
        sendGAEvent('event', 'brochure_download_intent', { project: projectName });

        // Meta Pixel Tracking for micro-conversion
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof window !== 'undefined' && (window as any).fbq) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).fbq('track', 'Contact', { content_name: `${projectName} Brochure` });
        }

        setIsModalOpen(true);
    };

    return (
        <>
            <button
                onClick={handleDownload}
                className={className}
                aria-label={`Download brochure for ${projectName}`}
            >
                {label}
            </button>
            <QuickEnquireModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                projectName={projectName}
                source={`${projectName} Brochure Download`}
            />
        </>
    );
}
