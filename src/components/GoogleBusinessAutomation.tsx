/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import { MapPin, Star, Clock, Navigation2, Phone, ExternalLink, ShieldCheck } from 'lucide-react';

interface GoogleBusinessProps {
    projectName: string;
    address: string;
    phone: string;
    rating: number;
    reviewCount: number;
    hours: string;
    coordinates: { lat: number; lng: number };
}

export default function GoogleBusinessAutomation({
    projectName,
    address,
    phone,
    rating,
    reviewCount,
    hours,
    coordinates
}: GoogleBusinessProps) {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;

    const businessSchema = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "@id": `https://joyville-homes.com/projects/${projectName.toLowerCase().replace(/\s+/g, '-')}/#site-office`,
        "name": `${projectName} Site Office`,
        "image": "https://joyville-homes.com/logo.png",
        "priceRange": "₹65 Lakhs - ₹2.5 Cr",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": address,
            "addressLocality": "Pune",
            "addressRegion": "MH",
            "postalCode": "411057",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": coordinates.lat,
            "longitude": coordinates.lng
        },
        "url": `https://joyville-homes.com/projects/${projectName.toLowerCase().replace(/\s+/g, '-')}`,
        "telephone": phone,
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "09:00",
                "closes": "20:00"
            }
        ]
    };

    return (
        <section className="relative mt-24 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1D4F9C] to-[#0A2A5E] p-8 md:p-12 text-white shadow-2xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
            />
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-[#C5A059]/10 blur-3xl"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                        <ShieldCheck size={16} className="text-[#C5A059]" />
                        <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">Official Site Office</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                        Experience {projectName} <br /> 
                        <span className="text-[#C5A059]">Live & In-Person</span>
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-6 mb-8">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={20} className={i < Math.floor(rating) ? "fill-[#C5A059] text-[#C5A059]" : "text-white/20"} />
                            ))}
                            <span className="ml-2 text-xl font-bold">{rating}</span>
                        </div>
                        <div className="h-4 w-px bg-white/20"></div>
                        <div className="text-white/80">
                            <span className="font-bold">{reviewCount}+</span> Google Reviews
                        </div>
                    </div>

                    <div className="space-y-6 mb-10">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                <MapPin className="text-[#C5A059]" size={24} />
                            </div>
                            <div>
                                <p className="text-white/60 text-sm uppercase tracking-wider mb-1">Location Address</p>
                                <p className="text-lg leading-snug">{address}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                <Clock className="text-[#C5A059]" size={24} />
                            </div>
                            <div>
                                <p className="text-white/60 text-sm uppercase tracking-wider mb-1">Visiting Hours</p>
                                <p className="text-lg leading-snug">{hours}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <a 
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#C5A059] text-white rounded-full font-bold transition-all hover:bg-[#B08A48] hover:scale-105 active:scale-95 shadow-lg shadow-[#C5A059]/20"
                        >
                            <Navigation2 size={20} />
                            Get Directions
                        </a>
                        <a 
                            href={`tel:${phone}`}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
                        >
                            <Phone size={20} />
                            Call Site Office
                        </a>
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A5E] to-transparent opacity-40 rounded-2xl"></div>
                    <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                        <iframe 
                            src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY_HERE&center=${coordinates.lat},${coordinates.lng}&zoom=15&maptype=satellite`}
                            width="100%" 
                            height="450" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                        ></iframe>
                    </div>
                    
                    <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[280px]">
                        <p className="text-[#323334] text-sm font-bold mb-3 flex items-center gap-2">
                            <Star className="fill-[#1D4F9C] text-[#1D4F9C]" size={16} />
                            Latest Review
                        </p>
                        <p className="text-[#323334]/70 text-xs italic leading-relaxed">
                            "Excellent hospitality at the site office. The model flat is stunning and the project planning is top-notch. Truly a Shapoorji standard."
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-[#EEF2F6] flex items-center justify-center text-[10px] font-bold text-[#1D4F9C]">VJ</div>
                            <span className="text-[10px] font-bold text-[#323334]">Verified Visitor</span>
                        </div>
                    </div>

                    <div className="absolute top-4 right-4">
                        <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(projectName + " " + address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
                        >
                            <ExternalLink size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
