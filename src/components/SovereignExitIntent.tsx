'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Shield, Zap, FileText, Calendar } from 'lucide-react';

export default function SovereignExitIntent() {
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hasBeenShown, setHasBeenShown] = useState(false);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasBeenShown) {
                setIsVisible(true);
                setHasBeenShown(true);
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [hasBeenShown]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const phoneClean = phone.replace(/\D/g, '');
        if (phoneClean.length < 10) return;

        setSubmitting(true);

        const leadId = `lead_exit_${Date.now()}`;
        const leadPayload = {
            id: leadId,
            project: "Joyville Homes Master Collection",
            source: "Sovereign Exit Intent",
            data: { name, phone: phoneClean },
            timestamp: new Date().toISOString(),
            synced: false
        };

        try {
            const vault = JSON.parse(localStorage.getItem('sovereign_vault') || '[]');
            vault.push(leadPayload);
            localStorage.setItem('sovereign_vault', JSON.stringify(vault));
        } catch {}

        try {
            await fetch("https://formsubmit.co/ajax/propsmartrealty@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    _subject: "New Lead: Sovereign Exit Intent - 2026 Price List",
                    name: name,
                    phone: phoneClean,
                    lead_magnet: "Exit Intent - 2026 Price List",
                    _captcha: "false"
                })
            });

            try {
                const vault = JSON.parse(localStorage.getItem('sovereign_vault') || '[]');
                const updatedVault = vault.map((l: { id: string; synced?: boolean }) => l.id === leadId ? { ...l, synced: true } : l);
                localStorage.setItem('sovereign_vault', JSON.stringify(updatedVault));
            } catch {}
        } catch (err) {
            console.error("Exit intent submit error:", err);
        } finally {
            setSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => setIsVisible(false), 3000);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 backdrop-blur-md bg-[#323334]/60">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <button 
                            onClick={() => setIsVisible(false)}
                            className="absolute top-6 right-6 text-[#323334]/40 hover:text-[#323334] transition-colors z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="grid md:grid-cols-5 h-full">
                            <div className="md:col-span-2 bg-[#1D4F9C] p-8 text-white flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                                        <Zap size={24} className="text-[#C5A059]" />
                                    </div>
                                    <h3 className="text-2xl font-serif mb-4 leading-tight">Wait! Get the Insider Advantage</h3>
                                    <p className="text-white/60 text-sm font-light">
                                        Before you go, unlock the official Price Sheets and Inventory Data usually reserved for institutional partners.
                                    </p>
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <div className="flex items-center gap-3 text-xs text-white/80">
                                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center"><FileText size={12} /></div>
                                        <span>PDF Cost Sheets Included</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-white/80">
                                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center"><Calendar size={12} /></div>
                                        <span>Priority Site Visit Pass</span>
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-3 p-10 bg-white">
                                {!isSubmitted ? (
                                    <>
                                        <div className="mb-8">
                                            <span className="text-[10px] font-bold text-[#1D4F9C] uppercase tracking-widest block mb-2">Sovereign Data Access</span>
                                            <h4 className="text-2xl font-serif text-[#323334]">Unlock the 2026 Price List</h4>
                                        </div>
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <input 
                                                    type="text" 
                                                    placeholder="Your Name" 
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required 
                                                    className="w-full px-5 py-4 bg-[#EEF2F6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#1D4F9C] transition-all"
                                                />
                                            </div>
                                            <div>
                                                <input 
                                                    type="tel" 
                                                    placeholder="WhatsApp Number" 
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    required 
                                                    className="w-full px-5 py-4 bg-[#EEF2F6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#1D4F9C] transition-all"
                                                />
                                            </div>
                                            <button 
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full bg-[#1D4F9C] hover:bg-[#0A2A5E] text-white font-bold py-5 rounded-xl flex items-center justify-center gap-3 transition-all group disabled:opacity-75"
                                            >
                                                <span>{submitting ? 'Submitting...' : 'Send via WhatsApp'}</span>
                                                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </form>
                                        <p className="mt-6 text-[10px] text-[#323334]/40 flex items-center gap-2">
                                            <Shield size={12} /> Your data is secured by Shapoorji Pallonji Privacy Protocols.
                                        </p>
                                    </>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center"
                                        >
                                            <Send size={32} />
                                        </motion.div>
                                        <div>
                                            <h4 className="text-2xl font-serif text-[#323334] mb-2">Access Granted</h4>
                                            <p className="text-sm text-[#323334]/60">Check your WhatsApp. The Price Sheet and Priority Pass are on their way.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
