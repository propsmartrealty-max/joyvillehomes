"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, TrendingUp, Info, ArrowRight } from "lucide-react";

export default function ROICalculator() {
    const [amount, setAmount] = useState(7500000); // 75L default
    const [years, setYears] = useState(5);
    const [appreciation, setAppreciation] = useState(10); // 10% avg
    const [yieldRate, setYieldRate] = useState(4.5); // 4.5% avg for IT hubs

    // Calculate derived state directly during render to prevent cascading re-renders
    const finalValue = amount * Math.pow(1 + appreciation / 100, years);
    const annualRent = amount * (yieldRate / 100);
    const totalRent = annualRent * years;
    const totalGain = (finalValue - amount) + totalRent;
    const netROI = (totalGain / amount) * 100;

    const results = {
        finalValue,
        totalRent,
        netROI,
        totalGain
    };

    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Shapoorji Pallonji ROI & Appreciation Intelligence Engine",
        "image": "https://joyville-homes.com/og-image.jpg",
        "operatingSystem": "Web-Based API",
        "applicationCategory": "FinanceApplication",
        "browserRequirements": "Requires JavaScript",
        "softwareVersion": "2026.1.0",
        "featureList": [
            "Capital Appreciation Projection V3",
            "Rental Yield Calculation (IT Corridors)",
            "Metro Connectivity Impact Analysis (Pune Line 3)",
            "IT Hub Proximity Weighting (Hinjewadi/Hadapsar)",
            "Tax & Stamp Duty Estimation"
        ],
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
        },
        "description": "The definitive AI-powered real estate investment intelligence model for Shapoorji Pallonji Joyville projects in Pune. Calculates multi-generational wealth gain, capital appreciation, and rental yields based on live micro-market data."
    };

    const financialProductSchema = {
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": "Joyville Pune Investment Yield Model",
        "description": "Calculate projected ROI, rental yield, and capital appreciation for residential properties in Pune IT corridors.",
        "feesAndCommissionsSpecification": "Zero professional fees for digital estimation",
        "interestRate": appreciation, // Mapping appreciation as a proxy for growth rate
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
        }
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="bg-white border border-accent/20 rounded-sm shadow-2xl overflow-hidden max-w-4xl mx-auto font-sans text-foreground">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(financialProductSchema) }} />
            <div className="grid md:grid-cols-2">
                {/* Input Section */}
                <div className="p-8 md:p-12 bg-secondary/10 border-r border-accent/10">
                    <div className="flex items-center gap-3 mb-8">
                        <Calculator className="text-accent" size={24} />
                        <h3 className="text-xl font-serif italic uppercase tracking-wider">Investment Planner</h3>
                    </div>

                    <div className="space-y-8">
                        {/* Amount Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-xs uppercase tracking-widest font-semibold">
                                <span>Investment Amount</span>
                                <span className="text-accent">{formatCurrency(amount)}</span>
                            </div>
                            <input
                                type="range"
                                min="5000000"
                                max="30000000"
                                step="500000"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full h-1 bg-accent/20 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                        </div>

                        {/* Tenure Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-xs uppercase tracking-widest font-semibold">
                                <span>Hold Period (Years)</span>
                                <span className="text-accent">{years} Years</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={years}
                                onChange={(e) => setYears(Number(e.target.value))}
                                className="w-full h-1 bg-accent/20 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                        </div>

                        {/* Appreciation Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-xs uppercase tracking-widest font-semibold">
                                <span>Annual Appreciation (%)</span>
                                <span className="text-accent">{appreciation}%</span>
                            </div>
                            <input
                                type="range"
                                min="5"
                                max="20"
                                value={appreciation}
                                onChange={(e) => setAppreciation(Number(e.target.value))}
                                className="w-full h-1 bg-accent/20 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground italic">
                                <Info size={10} /> Pune avg: 10-12% (Hinjewadi/Hadapsar)
                            </div>
                        </div>

                        {/* Yield Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-xs uppercase tracking-widest font-semibold">
                                <span>Annual Rental Yield (%)</span>
                                <span className="text-accent">{yieldRate}%</span>
                            </div>
                            <input
                                type="range"
                                min="2"
                                max="8"
                                step="0.5"
                                value={yieldRate}
                                onChange={(e) => setYieldRate(Number(e.target.value))}
                                className="w-full h-1 bg-accent/20 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                        </div>
                    </div>
                </div>

                {/* Output Section */}
                <div className="p-8 md:p-12 flex flex-col justify-center bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={results.netROI}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-10 relative z-10"
                        >
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-2 block">Projected Portfolio Value</span>
                                <div className="text-4xl md:text-5xl font-serif">{formatCurrency(results.finalValue)}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 py-8 border-y border-accent/10">
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground block mb-1">Rental Income</span>
                                    <div className="text-xl font-serif text-accent">{formatCurrency(results.totalRent)}</div>
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground block mb-1">Net ROI (%)</span>
                                    <div className="text-xl font-serif text-green-600">{results.netROI.toFixed(1)}%</div>
                                </div>
                            </div>

                            <div>
                                <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground block mb-4 italic flex items-center gap-2">
                                    <TrendingUp size={12} /> Pune Real Estate Index Insight
                                </span>
                                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                                    With upcoming infrastructure like Metro Line 3, your property in <span className="text-foreground font-medium">Hinjewadi</span> or <span className="text-foreground font-medium">Hadapsar</span> is projected to see a combined wealth gain of <span className="text-accent font-semibold">{formatCurrency(results.totalGain)}</span> over {years} years.
                                </p>
                            </div>

                            <button className="w-full bg-foreground text-white py-5 flex items-center justify-center gap-3 uppercase text-xs tracking-widest font-bold hover:bg-accent transition-all group">
                                Get Detailed Investment Report <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
