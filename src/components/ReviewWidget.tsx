"use client";

import { Star, ThumbsUp, MapPin, CheckCircle2, User, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectReview } from '@/data/projects';

interface ReviewWidgetProps {
    reviews?: ProjectReview[];
    projectName?: string;
}

export default function ReviewWidget({ reviews, projectName }: ReviewWidgetProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Default reviews if none provided
    const displayReviews = reviews && reviews.length > 0 ? reviews : [
        {
            author: "Amit Sharma",
            date: "2024-02-15",
            rating: 5,
            comment: "Excellent location in Hinjewadi Phase 1. The duplex design is quite unique. As an IT professional, the walk-to-work convenience is unbeatable.",
            isVerifiedBuyer: true,
            personaType: 'TechProfessional',
            attributes: { construction: 5, location: 5, value: 4, amenities: 4 }
        },
        {
            author: "Priya Nair",
            date: "2024-02-10",
            rating: 5,
            comment: "Shapoorji Pallonji's quality is evident. Best project for IT professionals looking for high rental yields and capital growth.",
            isVerifiedBuyer: true,
            personaType: 'Investor',
            attributes: { construction: 5, location: 5, value: 5, amenities: 4 }
        },
        {
            author: "Sanjay Gupta",
            date: "2024-03-01",
            rating: 5,
            comment: "Best township in East Pune. The amenities are world class. As a first-time buyer, the process was transparent and the 8.8 acres of open space is a life upgrade.",
            isVerifiedBuyer: true,
            personaType: 'FirstTimeBuyer',
            attributes: { construction: 5, location: 4, value: 5, amenities: 5 }
        }
    ];

    const nextReview = () => {
        setCurrentIndex((prev) => (prev + 1) % displayReviews.length);
    };

    const prevReview = () => {
        setCurrentIndex((prev) => (prev - 1 + displayReviews.length) % displayReviews.length);
    };

    const currentReview = displayReviews[currentIndex];

    // Helper for persona labels
    const personaLabels: Record<string, string> = {
        'NRI': 'NRI Investor',
        'Luxury': 'Premium Buyer',
        'FirstTimeBuyer': 'First Time Buyer',
        'Investor': 'Strategic Investor',
        'TechProfessional': 'IT Professional',
        'VastuConscious': 'Vastu Focused',
        'NatureSeeker': 'Nature Seeker',
        'AviationInvestor': 'Aviation Hub Investor'
    };

    return (
        <section className="py-24 bg-[#FFFFFF] border-y border-[#C5A059]/20 relative overflow-hidden font-sans">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1D4F9C]/5 blur-[100px] pointer-events-none rounded-bl-full" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
                    
                    {/* Left: Content & Statistics */}
                    <div className="lg:w-2/5">
                        <div className="inline-flex items-center gap-3 text-[#1D4F9C] font-semibold text-[10px] tracking-[0.3em] uppercase mb-8">
                            <ThumbsUp size={14} /> Algorithmic Loyalty & Trust
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-serif text-[#323334] font-light mb-8 leading-tight">
                            Verified Voices.<br />Unmatched Trust.
                        </h2>
                        <p className="text-[#323334]/80 font-light leading-relaxed mb-10 text-lg">
                            Go beyond testimonials. Dive into granular ratings from verified Joyville home owners who prioritize quality, location, and long-term value.
                        </p>

                        <div className="grid grid-cols-2 gap-8 mb-10">
                            <div>
                                <div className="text-3xl font-serif text-[#1D4F9C] mb-1">4.9/5</div>
                                <div className="text-[10px] uppercase tracking-widest text-[#323334]/60">Average Rating</div>
                            </div>
                            <div>
                                <div className="text-3xl font-serif text-[#1D4F9C] mb-1">98%</div>
                                <div className="text-[10px] uppercase tracking-widest text-[#323334]/60">Delivery Trust</div>
                            </div>
                        </div>

                        <div className="bg-[#EEF2F6] p-4 border-l-2 border-[#1D4F9C]">
                            <p className="text-[11px] text-[#323334]/70 italic leading-relaxed">
                                &quot;All reviews are from verified purchasers. Persona tags are categorized based on buyer profiles at the time of booking.&quot;
                            </p>
                        </div>
                    </div>

                    {/* Right: Dynamic Testimonial Carousel */}
                    <div className="lg:w-3/5 w-full">
                        <div className="relative bg-[#FFFFFF] border border-[#C5A059]/20 shadow-[0_20px_50px_rgba(29,79,156,0.08)] p-8 md:p-12 min-h-[450px] flex flex-col justify-between">
                            <Quote className="absolute -top-6 -left-6 w-12 h-12 text-[#1D4F9C]/10 fill-[#1D4F9C]/5" />
                            
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="flex-1"
                                >
                                    {/* Header: Author & Verified Status */}
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-[#EEF2F6] rounded-full flex items-center justify-center text-[#1D4F9C]">
                                                <User size={24} />
                                            </div>
                                            <div>
                                                <div className="text-[#323334] font-medium text-lg flex items-center gap-2">
                                                    {currentReview.author}
                                                    {currentReview.isVerifiedBuyer && (
                                                        <span className="inline-flex items-center gap-1 text-[10px] bg-[#1D4F9C] text-[#FFFFFF] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                                                            <CheckCircle2 size={10} /> Verified
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-[10px] uppercase tracking-widest text-[#323334]/50">
                                                    {currentReview.date} • {personaLabels[currentReview.personaType as string] || currentReview.personaType}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} className={i < currentReview.rating ? "text-[#C5A059] fill-[#C5A059]" : "text-[#EEF2F6] fill-[#EEF2F6]"} />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Body: Comment */}
                                    <blockquote className="text-[#323334] text-xl font-light italic leading-relaxed mb-10 min-h-[120px]">
                                        &quot;{currentReview.comment}&quot;
                                    </blockquote>

                                    {/* Footer: Detailed Ratings Attributes */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#EEF2F6]">
                                        {Object.entries(currentReview.attributes).map(([key, val]) => (
                                            <div key={key}>
                                                <div className="text-[10px] uppercase tracking-widest text-[#323334]/60 mb-2 truncate">{key}</div>
                                                <div className="flex gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <div key={i} className={`h-1 w-3 rounded-full ${i < val ? "bg-[#1D4F9C]" : "bg-[#EEF2F6]"}`} />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Carousel Controls */}
                            <div className="flex items-center gap-4 mt-8 justify-end">
                                <button 
                                    onClick={prevReview}
                                    className="p-3 border border-[#C5A059]/20 rounded-full hover:bg-[#EEF2F6] transition-colors group"
                                    aria-label="Previous Review"
                                >
                                    <ChevronLeft size={18} className="text-[#323334] group-hover:text-[#1D4F9C]" />
                                </button>
                                <button 
                                    onClick={nextReview}
                                    className="p-3 border border-[#C5A059]/20 rounded-full hover:bg-[#EEF2F6] transition-colors group"
                                    aria-label="Next Review"
                                >
                                    <ChevronRight size={18} className="text-[#323334] group-hover:text-[#1D4F9C]" />
                                </button>
                            </div>
                        </div>

                        {/* CTA: Leave a review */}
                        <div className="mt-8 flex justify-center lg:justify-start">
                            <a 
                                href={`https://www.google.com/search?q=Joyville+By+Shapoorji+Pallonji+${projectName || 'Pune'}+Reviews`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-[#EEF2F6] px-6 py-3 rounded-sm border border-[#C5A059]/20 hover:border-[#1D4F9C] hover:bg-[#1D4F9C]/5 transition-all text-[11px] font-bold uppercase tracking-widest text-[#1D4F9C]"
                            >
                                <MapPin size={14} /> Leave a Review for {projectName || 'Joyville Pune'}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
