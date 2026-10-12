"use client";

import { useState } from 'react';
import { Calendar, Clock, Video, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuickEnquireModal from './QuickEnquireModal';

interface SiteVisitSchedulerProps {
    projectName: string;
    location: string;
}

export default function SiteVisitScheduler({ projectName, location }: SiteVisitSchedulerProps) {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [visitType, setVisitType] = useState<'in-person' | 'virtual' | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Generate next 7 days for the date picker
    const nextDays = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1); // Start from tomorrow
        return d;
    });

    const timeSlots = [
        '10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'
    ];

    const reset = () => {
        setStep(1);
        setVisitType(null);
        setSelectedDate(null);
        setSelectedTime(null);
    };

    return (
        <div className="bg-[#EEF2F6] border border-[#C5A059]/30 rounded-sm overflow-hidden mt-10">
            {/* Header */}
            <div className="bg-[#1D4F9C] p-6 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFFFFF]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-xl font-serif mb-2">Schedule Your Experience</h3>
                <p className="text-xs font-light text-white/80">Book a dedicated viewing of {projectName}</p>
            </div>

            <div className="p-6">
                <AnimatePresence mode="wait">
                    {/* STEP 1: Visit Type */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-4"
                        >
                            <p className="text-xs uppercase tracking-widest text-[#323334]/50 font-bold mb-4">1. Select Format</p>
                            
                            <button
                                onClick={() => { setVisitType('in-person'); setStep(2); }}
                                className="w-full flex items-start gap-4 p-4 border border-[#C5A059]/40 bg-[#FFFFFF] hover:border-[#1D4F9C] transition-all group rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4F9C]"
                            >
                                <div className="p-2 bg-[#EEF2F6] group-hover:bg-[#1D4F9C] group-hover:text-white text-[#1D4F9C] rounded-full transition-colors">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-[#323334] mb-1">In-Person VIP Tour</h4>
                                    <p className="text-xs text-[#323334]/60">Guided walkthrough at our {location} sales gallery</p>
                                </div>
                            </button>

                            <button
                                onClick={() => { setVisitType('virtual'); setStep(2); }}
                                className="w-full flex items-start gap-4 p-4 border border-[#C5A059]/40 bg-[#FFFFFF] hover:border-[#1D4F9C] transition-all group rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4F9C]"
                            >
                                <div className="p-2 bg-[#EEF2F6] group-hover:bg-[#1D4F9C] group-hover:text-white text-[#1D4F9C] rounded-full transition-colors">
                                    <Video size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-[#323334] mb-1">Virtual Presentation</h4>
                                    <p className="text-xs text-[#323334]/60">Live 1-on-1 video tour via Zoom or WhatsApp</p>
                                </div>
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 2: Date & Time */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <p className="text-xs uppercase tracking-widest text-[#323334]/50 font-bold">2. Select Schedule</p>
                                <button onClick={() => setStep(1)} className="text-[10px] uppercase tracking-widest text-[#1D4F9C] hover:underline">
                                    Back
                                </button>
                            </div>

                            {/* Date Picker */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-3 text-sm text-[#323334]">
                                    <Calendar size={16} className="text-[#1D4F9C]" /> Pick a Date
                                </div>
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                    {nextDays.map((d, i) => {
                                        const isSelected = selectedDate?.toDateString() === d.toDateString();
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedDate(d)}
                                                className={`flex-shrink-0 w-[60px] py-3 border rounded-sm flex flex-col items-center gap-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4F9C] ${
                                                    isSelected 
                                                        ? 'bg-[#1D4F9C] border-[#1D4F9C] text-white' 
                                                        : 'bg-white border-[#C5A059]/30 text-[#323334] hover:border-[#1D4F9C]'
                                                }`}
                                            >
                                                <span className="text-[10px] uppercase tracking-widest opacity-80">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()]}</span>
                                                <span className="text-lg font-serif">{d.getDate()}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Time Picker */}
                            <AnimatePresence>
                                {selectedDate && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mb-6 overflow-hidden"
                                    >
                                        <div className="flex items-center gap-2 mb-3 text-sm text-[#323334]">
                                            <Clock size={16} className="text-[#1D4F9C]" /> Open Slots
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {timeSlots.map(time => (
                                                <button
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`py-2 text-xs border rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4F9C] ${
                                                        selectedTime === time
                                                            ? 'bg-[#1D4F9C] border-[#1D4F9C] text-white'
                                                            : 'bg-white border-[#C5A059]/30 text-[#323334] hover:border-[#1D4F9C]'
                                                    }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                disabled={!selectedDate || !selectedTime}
                                onClick={() => setIsModalOpen(true)}
                                className={`w-full py-3 flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:ring-offset-2 ${
                                    selectedDate && selectedTime
                                        ? 'bg-[#C5A059] text-[#FFFFFF] hover:bg-[#a88647]'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-80'
                                }`}
                            >
                                Confirm Slot <ArrowRight size={14} />
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 3: Success */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 size={32} className="text-green-600" />
                            </div>
                            <h4 className="text-xl font-serif text-[#323334] mb-2">Slot Reserved</h4>
                            <p className="text-xs text-[#323334]/60 mb-6 max-w-[200px] mx-auto leading-relaxed">
                                Our relationship manager will coordinate your {visitType} experience for {selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {selectedTime}.
                            </p>
                            <button
                                onClick={reset}
                                className="text-[10px] uppercase tracking-widest text-[#1D4F9C] font-bold hover:underline"
                            >
                                Book Another Slot
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <QuickEnquireModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setStep(3);
                }}
                projectName={projectName}
                source={`VIP Site Visit: ${visitType === 'virtual' ? 'Virtual Tour' : 'In-Person'} - ${selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at ${selectedTime}`}
            />
        </div>
    );
}
