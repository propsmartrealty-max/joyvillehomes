"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, MapPin, PhoneCall, CheckCircle2, Building2, Trees, ShieldCheck, Landmark } from "lucide-react";
import ReviewWidget from "@/components/ReviewWidget";
import BrochureButton from './BrochureButton';
import InteractiveFloorPlan from './InteractiveFloorPlan';
import GlobalFAQ from "@/components/GlobalFAQ";
import TrustBanner from "@/components/TrustBanner";
import MarketTicker from "@/components/MarketTicker";
import LiveActivityFeed from "@/components/LiveActivityFeed";
import InstitutionalEndorsement from "@/components/InstitutionalEndorsement";
import { blogs } from "@/data/blogs";

import PriceDisplay from "@/components/PriceDisplay";
import { useCurrency } from "@/context/CurrencyContext";

// --- Framer Motion Variants ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function HomeClient() {
  const { formatPrice } = useCurrency();
  const [activeFloorPlan, setActiveFloorPlan] = useState<"2BHK" | "3BHK">("2BHK");

  return (
    <main className="bg-[#FFFFFF] min-h-[100dvh] text-[#323334] selection:bg-[#1D4F9C] selection:text-[#FFFFFF] overflow-hidden font-sans">
      {/* RealEstateAgent schema provided by layout.tsx @graph — no duplicate needed */}

      {/* --- Ultra-Modern Hero Layout (Phase 3) --- */}
      <section className="relative h-[100dvh] w-full flex items-center overflow-hidden bg-[#EEF2F6]">
        {/* Animated Background Parallax */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative"
          >
            <Image
              src="/images/desktop-poster.webp"
              fill
              alt="Shapoorji Pallonji Joyville Homes Pune - Premium 2 BHK and 3 BHK residential apartments representing the pinnacle of the Pune Real Estate Market in Hinjewadi"
              className="object-cover opacity-60 mix-blend-luminosity"
              priority
              fetchPriority="high"
              sizes="(max-width: 1200px) 100vw, 100vw"
            />
          </motion.div>

          {/* Advanced Gradient Overlays for Depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFFFF]/90 via-[#FFFFFF]/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-[#FFFFFF]/40 z-10" />

          {/* Subtle grain/noise texture overlay for premium feel */}
          <div className="absolute inset-0 z-10 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }} />
        </div>

        {/* Floating Interactive Structure */}
        <div className="relative z-20 w-full px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 mt-20">

          {/* Left Hero Content - Magnetic Typography */}
          <div className="flex-1 md:pr-10 lg:pr-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-4 text-[#1D4F9C] font-light text-[10px] tracking-[0.4em] uppercase mb-10"
            >
              <span className="w-12 h-[1px] bg-[#1D4F9C]" /> Pune&apos;s Finest Address
            </motion.div>

            <motion.h1
              initial={{ opacity: 1, y: 0 }} // LCP Optimization: Visible immediately
              animate={{ y: [10, 0], opacity: [0.9, 1] }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#323334] font-light leading-[1.05] tracking-tight mb-8"
            >
              <span className="block text-[10px] md:text-xs font-bold tracking-[0.5em] text-[#1D4F9C]/70 mb-4 sm:mb-6 uppercase">Shapoorji Pallonji Real Estate</span>
              <span className="text-[#1D4F9C] italic text-gradient">Joyville Homes Pune</span> <br />
              Projects &amp; Residences 2026.
            </motion.h1>

            <motion.div
              initial={{ opacity: 1 }} // LCP Optimization
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <p className="text-lg md:text-xl text-[#323334] max-w-lg font-light tracking-wide leading-relaxed border-l-2 border-[#C5A059]/60 pl-6">
                Experience the brand new launch of <span className="font-medium">Joyville Vyomora</span> in Hinjewadi Phase 1. Discover premium 2 & 3 BHK residences and exclusive 3 BHK duplexes starting from <span className="font-bold">{formatPrice('₹84.99 Lakhs*')}</span>, featuring 60+ world-class amenities and Pune&apos;s finest IT address.
              </p>

              <div className="pt-4 flex items-center gap-8">
                <Link href="/projects" className="relative group overflow-hidden px-10 py-5 bg-[#1D4F9C] text-[#FFFFFF] text-[10px] uppercase tracking-[0.3em] font-bold shadow-[0_10px_40px_rgba(197,160,89,0.2)] hover:shadow-[0_15px_50px_rgba(197,160,89,0.4)] transition-all duration-500 block w-max">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Explore Portfolios <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-[#323334] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Floating Stat Cards (Data micro-interactions) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, delay: 1.2, ease: "easeOut" }}
            className="hidden lg:flex flex-col gap-6"
          >
            <div className="bg-[#EEF2F6]/60 backdrop-blur-xl border border-[#C5A059]/60 p-8 rounded-sm shrink-0 w-[280px] hover:-translate-y-2 transition-transform duration-500">
              <div className="text-[#1D4F9C] mb-4"><Landmark size={24} strokeWidth={1} /></div>
              <h3 className="text-4xl font-serif text-[#323334] font-light mb-1">150+</h3>
              <p className="text-[#323334] text-[10px] uppercase tracking-[0.2em] font-medium">Years of Legacy</p>
            </div>
            <div className="bg-[#FFFFFF]/80 backdrop-blur-xl border border-[#C5A059]/60 p-8 rounded-sm shrink-0 w-[280px] -ml-12 hover:-translate-y-2 transition-transform duration-500">
              <div className="text-[#1D4F9C] mb-4"><Trees size={24} strokeWidth={1} /></div>
              <h3 className="text-4xl font-serif text-[#323334] font-light mb-1">10.5</h3>
              <p className="text-[#323334] text-[10px] uppercase tracking-[0.2em] font-medium">Acres of Greens</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Brand New Launch Feature (Vyomora) --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] relative z-10" aria-labelledby="new-launch-heading">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center gap-16"
          >
            <div className="flex-1">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#1D4F9C]/5 border border-[#1D4F9C]/20 rounded-full text-[#1D4F9C] text-[10px] uppercase tracking-widest font-bold mb-8">
                <span className="w-2 h-2 rounded-full bg-[#1D4F9C] animate-pulse" /> Just Launched: Vyomora
              </div>
              <h2 id="new-launch-heading" className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#323334] font-light mb-8 leading-tight">
                Joyville Vyomora: <br />
                <span className="italic text-[#1D4F9C]">The Future of Hinjewadi.</span>
              </h2>
              <p className="text-[#323334]/80 text-base md:text-lg font-light leading-relaxed mb-10">
                Strategically positioned in the heart of Phase 1, Vyomora introduces a new era of urban living. With unique 3 BHK Duplex configurations and a 100% IT-professional centric design, this is Pune&apos;s most anticipated residential launch of 2026.
              </p>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <div className="text-[#1D4F9C] font-serif text-3xl mb-1">
                    <PriceDisplay price="₹84.99 Lakhs+" />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-[#323334]/60 font-medium">Starting Investment</div>
                </div>
                <div>
                  <div className="text-[#1D4F9C] font-serif text-3xl mb-1">Phase 1</div>
                  <div className="text-[10px] uppercase tracking-widest text-[#323334]/60 font-medium">Prime IT Location</div>
                </div>
              </div>

              <Link href="/projects/joyville-vyomora-hinjewadi" className="inline-flex items-center gap-4 text-[#1D4F9C] font-bold text-xs uppercase tracking-[0.2em] group border-b border-[#1D4F9C] pb-2 hover:text-[#323334] hover:border-[#323334] transition-all">
                Access Project Details <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="flex-1 relative aspect-square w-full max-w-xl">
              <div className="absolute inset-0 bg-[#EEF2F6] rounded-sm transform rotate-3" />
              <div className="absolute inset-0 bg-[#FFFFFF] border border-[#C5A059]/40 shadow-2xl rounded-sm overflow-hidden transform hover:rotate-0 transition-transform duration-700">
                <Image
                  src="/images/joyville_sensorium_projectcard.webp"
                  fill
                  alt="Joyville Vyomora New Launch in Hinjewadi Phase 1 - Premium 3 BHK Duplex Residences"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#323334]/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="text-[#FFFFFF] text-xs uppercase tracking-[0.2em] font-medium mb-2">Hinjewadi Phase 1</div>
                  <div className="text-[#FFFFFF] text-2xl font-serif">Vyomora: Modern IT Residences</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Shapoorji Pallonji Legacy (Trust Factor) --- */}
      <section id="legacy" className="py-32 px-4 sm:px-6 lg:px-8 bg-[#EEF2F6] border-b border-[#C5A059]/60 relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1D4F9C]/5 blur-[120px] pointer-events-none rounded-bl-full" />
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-20 items-center"
          >
            <motion.div variants={fadeUp} className="order-2 lg:order-1 relative p-4">
              {/* Elegant image collage representing legacy */}
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto z-10 shadow-2xl rounded-sm overflow-hidden border border-[#C5A059]/60">
                <Image
                  src="/images/joyville_sensorium_projectcard.webp"
                  fill
                  className="object-cover opacity-80 mix-blend-luminosity"
                  alt="150+ year architectural legacy of Shapoorji Pallonji Real Estate projects in Pune"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F4F6F9] via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-4 -left-4 lg:-left-12 w-64 h-64 bg-[#FFFFFF]/90 backdrop-blur-xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#C5A059]/60 z-20 flex flex-col justify-center items-center text-center">
                <Landmark size={40} className="text-[#1D4F9C] mb-4 stroke-1" />
                <div className="text-5xl font-serif text-[#323334] mb-2">150+</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#1D4F9C] font-medium">Years of Trust</div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="order-1 lg:order-2">
              <h4 className="text-[#1D4F9C] font-light text-xs tracking-[0.3em] uppercase mb-6 flex items-center gap-4">
                <span className="w-16 h-[1px] bg-[#1D4F9C]" /> Shapoorji Pallonji Real Estate
              </h4>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 text-[#323334] leading-[1.15] font-light">
                Shapoorji Pallonji: Building India&apos;s <br />
                <span className="italic text-[#1D4F9C]">Iconic Landmarks.</span>
              </h2>
              <p className="text-[#323334] text-base md:text-lg leading-relaxed mb-10 font-light">
                With a legacy spanning over a century and a half, Shapoorji Pallonji is the name behind some of the most prestigious architectural marvels. Joyville Homes Pune is our commitment to bringing this unparalleled standard of construction, engineering, and trust to the premium residential properties of Hinjewadi.
              </p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-8 pt-10 border-t border-[#C5A059]/60">
                <div className="flex items-start gap-4 group cursor-pointer">
                  <CheckCircle2 className="text-[#1D4F9C] mt-1 flex-shrink-0 stroke-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h5 className="font-medium text-[#323334] mb-2 tracking-wide">Global Footprint</h5>
                    <p className="text-sm text-[#323334] font-light">Presence in over 50 countries</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group cursor-pointer">
                  <CheckCircle2 className="text-[#1D4F9C] mt-1 flex-shrink-0 stroke-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h5 className="font-medium text-[#323334] mb-2 tracking-wide">Award-Winning</h5>
                    <p className="text-sm text-[#323334] font-light">Recognized construction excellence</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- Master Layout (Midnight Premium Visual) --- */}
      <section id="master-layout" className="py-32 bg-[#FFFFFF] relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-center mb-24"
          >
            <h4 className="text-[#1D4F9C] font-light text-xs tracking-[0.3em] uppercase mb-6 flex items-center justify-center gap-4">
              <span className="w-8 h-[1px] bg-[#1D4F9C]" /> A Planned Ecosystem <span className="w-8 h-[1px] bg-[#1D4F9C]" />
            </h4>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 text-[#323334] font-light">Joyville Premium Master Layout</h2>
            <p className="text-[#323334] max-w-2xl mx-auto text-base lg:text-lg font-light leading-relaxed">Explore 10.5 acres of thoughtfully integrated nature, wellness, and cutting-edge amenities—setting a new benchmark for premium flats in Hinjewadi.</p>
          </motion.div>

          <div className="relative aspect-[21/9] w-full bg-[#EEF2F6] border border-[#C5A059]/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group overflow-hidden rounded-sm">
            {/* Dark, sophisticated master layout blueprint visualization */}
            <div 
              style={{ backgroundImage: "url('/images/joyville_hinjawadi_projectcard.webp')" }}
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-color-dodge group-hover:scale-105 transition-all duration-[2000ms]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-transparent" />

            <div className="absolute top-[30%] left-[40%] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 cursor-pointer">
              <span className="absolute w-16 h-16 rounded-full bg-[#1D4F9C]/20 animate-ping" />
              <div className="relative w-3 h-3 rounded-full bg-[#1D4F9C] shadow-[0_0_20px_#1D4F9C]" />
              <div className="absolute top-6 w-max px-5 py-3 bg-[#EEF2F6]/90 backdrop-blur-md border border-[#C5A059]/60 shadow-2xl text-[10px] tracking-[0.2em] uppercase text-[#1D4F9C] font-medium">Premium Clubhouse</div>
            </div>

            <div className="absolute top-[60%] left-[25%] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 cursor-pointer">
              <span className="absolute w-16 h-16 rounded-full bg-[#1D4F9C]/20 animate-ping" />
              <div className="relative w-3 h-3 rounded-full bg-[#1D4F9C] shadow-[0_0_20px_#1D4F9C]" />
              <div className="absolute top-6 w-max px-5 py-3 bg-[#EEF2F6]/90 backdrop-blur-md border border-[#C5A059]/60 shadow-2xl text-[10px] tracking-[0.2em] uppercase text-[#1D4F9C] font-medium">Central Green Oasis</div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Trees, label: "60+ Luxury Amenities" },
              { icon: ShieldCheck, label: "Multi-tier Security" },
              { icon: Building2, label: "Vastu Compliant Homes" },
              { icon: MapPin, label: "Hinjewadi Phase 1" },
            ].map((feature, idx) => (
              <div key={idx} className="p-10 bg-[#EEF2F6] border border-[#C5A059]/60 shadow-2xl hover:border-[#C5A059]/40 hover:bg-[#EEF2F6]/80 transition-all duration-500 flex flex-col items-center justify-center gap-6 group">
                <feature.icon className="text-[#1D4F9C] group-hover:scale-110 transition-transform duration-500 stroke-1" size={40} />
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#323334]">{feature.label}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a href="/amenities" className="inline-flex items-center gap-3 text-[#1D4F9C] font-medium uppercase tracking-[0.2em] text-xs hover:text-[#323334] transition-colors group">
              View All Premium Amenities <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* --- Detailed Floor Plans (Dark Theme) --- */}
      <section id="floor-plans" className="py-32 px-4 sm:px-6 lg:px-8 bg-[#EEF2F6] border-y border-[#C5A059]/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-20 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              <h4 className="text-[#1D4F9C] font-light text-xs tracking-[0.3em] uppercase mb-6 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-[#1D4F9C]" /> Space Optimized Living
              </h4>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#323334] font-light">Pune&apos;s Premium Residences</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="flex border border-[#C5A059]/60 p-1 bg-[#FFFFFF] rounded-sm"
            >
              <button
                aria-label="View 2 BHK Premium Floor Plans"
                onClick={() => setActiveFloorPlan("2BHK")}
                className={`px-10 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 ${activeFloorPlan === "2BHK" ? "bg-[#1D4F9C] text-[#FFFFFF] font-semibold" : "text-[#323334] hover:text-[#1D4F9C] font-light"}`}
              >
                2 BHK Premium
              </button>
              <button
                aria-label="View 3 BHK Luxury Floor Plans"
                onClick={() => setActiveFloorPlan("3BHK")}
                className={`px-10 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 ${activeFloorPlan === "3BHK" ? "bg-[#1D4F9C] text-[#FFFFFF] font-semibold" : "text-[#323334] hover:text-[#1D4F9C] font-light"}`}
              >
                3 BHK Luxury
              </button>
            </motion.div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#C5A059]/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 lg:p-16 rounded-sm">
            <AnimatePresence mode="wait">
              {activeFloorPlan === "2BHK" && (
                <motion.div
                  key="2bhk"
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  transition={{ duration: 0.6 }}
                  className="grid lg:grid-cols-12 gap-16 items-center"
                >
                  <div className="lg:col-span-7 order-2 lg:order-1 aspect-[4/3] bg-[#EEF2F6] border border-[#C5A059]/60 p-2 relative group overflow-hidden flex items-center justify-center">
                    <InteractiveFloorPlan src="/images/joyville_sensorium_projectcard.webp" alt="2 BHK Floor Plan" />
                    <div className="absolute top-4 right-4 z-10 border border-[#C5A059]/60 flex items-center justify-center bg-[#FFFFFF]/50 backdrop-blur-sm pointer-events-none">
                      <span className="text-[#1D4F9C] text-xs tracking-[0.3em] uppercase border border-[#C5A059]/60 px-6 py-2">Floor Plan View</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 order-1 lg:order-2">
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "RealEstateListing",
                                "name": "2 BHK Premium Flats at Joyville Hinjewadi",
                                "description": "Premium 2 BHK apartments in Hinjewadi Phase 1 with 750-850 sq.ft carpet area.",
                                "offers": {
                                    "@type": "Offer",
                                    "price": "11000000",
                                    "priceCurrency": "INR",
                                    "availability": "https://schema.org/InStock"
                                },
                                "datePosted": new Date().toISOString().split('T')[0]
                            })
                        }}
                    />
                    <h3 className="text-3xl lg:text-4xl font-serif mb-4 text-[#323334] font-light">2 BHK Joyville Flats</h3>
                    <p className="text-2xl text-[#1D4F9C] mb-10 font-serif italic text-gradient">
                      Starting <PriceDisplay price="₹1.10 Cr*" />
                    </p>

                    <div className="space-y-8 mb-12">
                      <div className="flex justify-between border-b border-[#C5A059]/60 pb-4">
                        <span className="text-[#323334] font-light uppercase tracking-[0.2em] text-[10px]">Carpet Area</span>
                        <span className="text-[#323334] font-medium tracking-wide text-sm">750 - 850 Sq.Ft.</span>
                      </div>
                      <div className="flex justify-between border-b border-[#C5A059]/60 pb-4">
                        <span className="text-[#323334] font-light uppercase tracking-[0.2em] text-[10px]">Configuration</span>
                        <span className="text-[#323334] font-medium tracking-wide text-sm">2 Beds • 2 Baths</span>
                      </div>
                      <div className="flex justify-between border-b border-[#C5A059]/60 pb-4">
                        <span className="text-[#323334] font-light uppercase tracking-[0.2em] text-[10px]">Status</span>
                        <span className="text-[#1D4F9C] font-medium tracking-wide text-sm">Ready to Move Options</span>
                      </div>
                    </div>

                    <BrochureButton
                      projectName="2BHK Hinjewadi"
                      label="Download 2BHK Brochure"
                      className="w-full py-5 border border-[#C5A059] text-[#1D4F9C] uppercase tracking-[0.2em] text-xs font-medium hover:bg-[#1D4F9C] hover:text-[#FFFFFF] transition-all duration-500 rounded-sm block"
                    />
                  </div>
                </motion.div>
              )}

              {activeFloorPlan === "3BHK" && (
                <motion.div
                  key="3bhk"
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  transition={{ duration: 0.6 }}
                  className="grid lg:grid-cols-12 gap-16 items-center"
                >
                  <div className="lg:col-span-7 order-2 lg:order-1 aspect-[4/3] bg-[#EEF2F6] border border-[#C5A059]/60 p-2 relative group overflow-hidden flex items-center justify-center">
                    <InteractiveFloorPlan src="/images/joyville_hinjawadi_projectcard.webp" alt="3 BHK Floor Plan" />
                    <div className="absolute top-4 right-4 z-10 border border-[#C5A059]/60 flex items-center justify-center bg-[#FFFFFF]/50 backdrop-blur-sm pointer-events-none">
                      <span className="text-[#1D4F9C] text-xs tracking-[0.3em] uppercase border border-[#C5A059]/60 px-6 py-2">Floor Plan View</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 order-1 lg:order-2">
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "RealEstateListing",
                                "name": "3 BHK Luxury Apartments at Joyville Hinjewadi",
                                "description": "Luxury 3 BHK apartments in Hinjewadi Phase 1 with 1050-1200 sq.ft carpet area.",
                                "offers": {
                                    "@type": "Offer",
                                    "price": "14500000",
                                    "priceCurrency": "INR",
                                    "availability": "https://schema.org/PreOrder"
                                },
                                "datePosted": new Date().toISOString().split('T')[0]
                            })
                        }}
                    />
                    <h3 className="text-3xl lg:text-4xl font-serif mb-4 text-[#323334] font-light">3 BHK Luxury Apartments</h3>
                    <p className="text-2xl text-[#1D4F9C] mb-10 font-serif italic text-gradient">
                      Starting <PriceDisplay price="₹1.45 Cr*" />
                    </p>

                    <div className="space-y-8 mb-12">
                      <div className="flex justify-between border-b border-[#C5A059]/60 pb-4">
                        <span className="text-[#323334] font-light uppercase tracking-[0.2em] text-[10px]">Carpet Area</span>
                        <span className="text-[#323334] font-medium tracking-wide text-sm">1050 - 1200 Sq.Ft.</span>
                      </div>
                      <div className="flex justify-between border-b border-[#C5A059]/60 pb-4">
                        <span className="text-[#323334] font-light uppercase tracking-[0.2em] text-[10px]">Configuration</span>
                        <span className="text-[#323334] font-medium tracking-wide text-sm">3 Beds • 3 Baths</span>
                      </div>
                      <div className="flex justify-between border-b border-[#C5A059]/60 pb-4">
                        <span className="text-[#323334] font-light uppercase tracking-[0.2em] text-[10px]">Status</span>
                        <span className="text-[#323334] font-medium tracking-wide text-sm">Under Construction</span>
                      </div>
                    </div>

                    <BrochureButton
                      projectName="3BHK Pune West"
                      label="Download 3BHK Brochure"
                      className="w-full py-5 border border-[#C5A059] text-[#1D4F9C] uppercase tracking-[0.2em] text-xs font-medium hover:bg-[#1D4F9C] hover:text-[#FFFFFF] transition-all duration-500 rounded-sm block"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- Brand Trust & Legacy Section --- */}
      <TrustBanner />
      <MarketTicker />

      {/* --- Latest Market Insights (Phase 4: Crawl Depth Optimization) --- */}
      <aside className="bg-[#EEF2F6] py-24 px-6 border-b border-[#C5A059]/30" aria-label="Market Insights">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <div className="inline-flex items-center gap-4 text-[#1D4F9C] font-light text-xs tracking-[0.3em] uppercase mb-4">
                <span className="w-8 h-[1px] bg-[#1D4F9C]" /> Market Intelligence
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-[#323334] font-light">Latest <span className="text-[#1D4F9C] italic">Insights</span></h2>
            </div>
            <Link href="/insights" className="text-xs uppercase tracking-[0.2em] font-bold text-[#1D4F9C] hover:text-[#323334] transition-colors flex items-center gap-2 group border-b border-[#1D4F9C] hover:border-[#323334] pb-1 w-max">
              View All Analysis <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((blog) => (
              <Link key={blog.id} href={`/insights/${blog.slug}`} className="group bg-[#FFFFFF] border border-[#C5A059]/20 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col rounded-sm">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={`Real Estate Insight: ${blog.title}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 bg-[#1D4F9C] text-[#FFFFFF] text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 shadow-lg">
                    {blog.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-[#1D4F9C] text-xs font-light mb-3">{blog.date}</div>
                  <h3 className="text-lg md:text-xl font-serif text-[#323334] mb-4 leading-snug group-hover:text-[#1D4F9C] transition-colors">{blog.title}</h3>
                  <div className="flex items-center gap-2 text-[#323334] text-xs font-bold uppercase tracking-widest mt-auto border-t border-[#C5A059]/20 pt-4">
                    Read Report <ArrowRight size={14} className="text-[#1D4F9C] group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Phase 16.7: Internal Link Equity Grid — distributes homepage authority to money pages */}
      <section className="bg-[#FFFFFF] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#C5A059]/20 content-defer" aria-label="Quick Property Searches">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-8 h-[1px] bg-[#1D4F9C]" />
            <h2 className="text-sm font-serif text-[#323334]">Popular Property Searches in Pune</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { href: '/flats-in-pune', label: 'All Flats in Pune' },
              { href: '/properties/2-bhk-flats-in-hinjewadi', label: '2 BHK Hinjewadi' },
              { href: '/properties/3-bhk-flats-in-hinjewadi', label: '3 BHK Hinjewadi' },
              { href: '/properties/ready-possession-flats-pune-2026', label: 'Ready Possession 2026' },
              { href: '/properties/under-1-crore-flats-pune', label: 'Under ₹1 Crore' },
              { href: '/properties/nri-investment-flats-pune', label: 'NRI Investment' },
              { href: '/properties/flats-near-hinjewadi-it-park', label: 'Near IT Park' },
              { href: '/properties/flats-near-magarpatta-pune', label: 'Near Magarpatta' },
              { href: '/properties/new-launch-projects-pune-2026', label: 'New Launch 2026' },
              { href: '/properties/investment-property-pune-2026', label: 'Investment 2026' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="px-4 py-3 bg-[#EEF2F6] border border-[#C5A059]/10 text-xs text-[#323334] font-light hover:bg-[#1D4F9C] hover:text-[#FFFFFF] hover:border-[#1D4F9C] transition-all text-center">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- Institutional Trust & Compliance (Phase 22) --- */}
      <InstitutionalEndorsement />

      {/* --- Global SEO FAQ Section --- */}
      <GlobalFAQ />

      {/* --- Review Harvesting Component (Local SEO) --- */}
      <ReviewWidget />

      {/* --- Footer & Final CTA (Dark Premium) --- */}
      <footer className="py-32 bg-[#FFFFFF] border-t border-[#C5A059]/60 text-center relative z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1D4F9C]/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif mb-10 text-[#323334] font-light leading-[1.1]">
            Own a piece of the <br /> <span className="text-[#1D4F9C] italic text-gradient">Shapoorji Legacy.</span>
          </h2>
          <p className="text-[#323334] text-base md:text-lg mx-auto mb-16 font-light">
            The defining face of premium residential projects in Pune. Contact our concierge to schedule a private viewing at Joyville Hinjewadi.
          </p>

          <div className="flex max-w-lg mx-auto relative bg-[#EEF2F6] shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-[#C5A059]/60 overflow-hidden rounded-sm">
            <input
              type="text"
              aria-label="Phone Number for Enquiry"
              placeholder="Enter your phone number"
              className="w-full bg-transparent px-8 py-5 text-[#323334] placeholder-[#323334]/30 focus:outline-none focus:bg-[#FFFFFF]/50 transition-colors font-light text-sm tracking-wide"
            />
            <button aria-label="Submit Quick Enquiry" className="bg-[#1D4F9C] px-10 text-[#FFFFFF] uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-[#323334] transition-colors duration-300">
              Enquire
            </button>
          </div>

          <div className="mt-20 pt-10 border-t border-[#C5A059]/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <div>
              <div className="text-3xl font-serif text-[#1D4F9C] font-light tracking-widest mb-4">JOYVILLE <span className="text-[10px] font-sans tracking-[0.4em] text-[#323334] uppercase ml-2">Pune</span></div>
              <p className="text-[#323334]/70 text-sm font-light leading-relaxed mb-6">
                Premium residences and townships crafted with Shapoorji Pallonji&apos;s 150-year legacy of engineering excellence.
              </p>
              <p className="text-[#323334]/40 text-[9px] tracking-[0.3em] uppercase font-medium">MahaRERA: P52100000000</p>
            </div>

            <div className="lg:col-start-4">
              <h4 className="text-[#1D4F9C] font-semibold text-xs tracking-widest uppercase mb-6">High-Intent Intelligence</h4>
              <ul className="space-y-4">
                <li><Link href="/pune-real-estate-guide" className="text-[#323334]/80 text-sm font-light hover:text-[#1D4F9C] transition-colors">Pune Homebuyer&apos;s Guide 2025-2026</Link></li>
                <li><Link href="/insights/pune-real-estate-market-forecast-2026-investment-hotspots" className="text-[#323334]/80 text-sm font-light hover:text-[#1D4F9C] transition-colors">Pune Market Forecast 2026</Link></li>
                <li><Link href="/insights/complete-nri-guide-buying-property-pune-2026" className="text-[#323334]/80 text-sm font-light hover:text-[#1D4F9C] transition-colors">NRI Buying Guide 2026</Link></li>
                <li><Link href="/insights/joyville-vs-competitors" className="text-[#323334]/80 text-sm font-light hover:text-[#1D4F9C] transition-colors">Joyville vs Competitors Analysis</Link></li>
                <li><Link href="/properties/flats-near-eon-it-park-kharadi" className="text-[#323334]/80 text-sm font-light hover:text-[#1D4F9C] transition-colors">Flats near EON IT Park</Link></li>
                <li><Link href="/properties/2-bhk-flats-in-hinjewadi" className="text-[#323334]/80 text-sm font-light hover:text-[#1D4F9C] transition-colors">2 BHK Flats in Hinjewadi</Link></li>
                <li><Link href="/properties/property-near-sp-infocity-phursungi" className="text-[#323334]/80 text-sm font-light hover:text-[#1D4F9C] transition-colors">Property near SP Infocity</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* --- SEO Content Block (Crawlable keyword-rich text) --- */}
      <article className="bg-[#F4F6F9] border-t border-[#C5A059]/20 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-serif text-[#323334] mb-6">About Joyville Homes Pune — Premium Residences by Shapoorji Pallonji</h2>
          <div className="text-sm text-[#323334]/80 font-light leading-relaxed space-y-4">
            <p>
              Joyville Homes Pune brings together the finest 2 BHK and 3 BHK luxury flats across Pune&apos;s most sought-after micro-markets — Hinjewadi, Hadapsar, Bavdhan, and Shewalewadi. Developed by Shapoorji Pallonji Real Estate, a group with over 150 years of engineering legacy since 1865, Joyville represents the gold standard of residential development in Maharashtra. Every project is fully MahaRERA registered, EDGE green-certified, and comes with 60+ premium amenities including infinity pools, co-working spaces, sports arenas, and landscaped gardens.
            </p>
            <p>
              In <Link href="/locality/hinjewadi" className="text-[#1D4F9C] hover:underline">Hinjewadi Phase 1</Link>, <Link href="/projects/joyville-sensorium-hinjewadi" className="text-[#1D4F9C] hover:underline">Joyville Sensorium</Link> offers walk-to-work apartments near Infosys, Wipro, TCS, and 200+ IT companies in the Rajiv Gandhi Infotech Park. In <Link href="/locality/hadapsar" className="text-[#1D4F9C] hover:underline">Hadapsar</Link>, <Link href="/projects/joyville-hadapsar-annexe-pune" className="text-[#1D4F9C] hover:underline">Joyville Hadapsar Annexe</Link> provides ready-to-move-in flats from ₹65 Lakhs across a sprawling 21-acre township near Magarpatta City and SP Infocity. <Link href="/locality/bavdhan" className="text-[#1D4F9C] hover:underline">Bavdhan&apos;s</Link> <Link href="/projects/vanaha-golfland-pune" className="text-[#1D4F9C] hover:underline">Vanaha Golfland</Link> and <Link href="/projects/vanaha-springs-bavdhan" className="text-[#1D4F9C] hover:underline">Vanaha Springs</Link> offer golf course views within Pune&apos;s largest 1,000-acre integrated township.
            </p>
            <p>
              Whether you are an IT professional looking for <Link href="/properties/flats-near-hinjewadi-it-park" className="text-[#1D4F9C] hover:underline">flats near Hinjewadi IT Park</Link>, an NRI investor seeking <Link href="/properties/nri-investment-flats-pune" className="text-[#1D4F9C] hover:underline">RERA-approved NRI investment options</Link>, or a first-time homebuyer searching for <Link href="/properties/under-1-crore-flats-pune" className="text-[#1D4F9C] hover:underline">flats under ₹1 Crore in Pune</Link>, Joyville Homes delivers the perfect balance of luxury, connectivity, and value. Explore our <Link href="/insights/pune-real-estate-market-forecast-2026-investment-hotspots" className="text-[#1D4F9C] hover:underline">2026 market forecast</Link> and <Link href="/pune-real-estate-guide" className="text-[#1D4F9C] hover:underline">Pune real estate guide</Link> to make an informed investment decision.
            </p>
          </div>
        </div>
      </article>

      {/* Floating CTA */}
      <div className="fixed bottom-10 right-10 z-50">
        <button aria-label="Call Sales Office" className="w-16 h-16 bg-[#1D4F9C] text-[#FFFFFF] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(197,160,89,0.3)] hover:scale-110 transition-transform duration-500 hover:bg-[#323334] border border-[#C5A059]/50">
          <PhoneCall size={20} />
        </button>
      </div>

      {/* Phase 22: Live Activity Feed */}
      <LiveActivityFeed />
    </main>
  );
}
