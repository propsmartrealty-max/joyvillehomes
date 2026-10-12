import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'عقارات فاخرة في بوني | مشاريع جويفيل',
    description: 'اكتشف شقق فاخرة في بوني من شابورجي بالونجي. استثمارات عقارية ممتازة للمغتربين في الإمارات.',
    alternates: {
        canonical: 'https://joyville-homes.com/ar/projects',
        languages: {
            'en-US': 'https://joyville-homes.com/projects'
        }
    }
};

export default function ArabicProjectsLanding() {
    return (
        <main dir="rtl" className="min-h-[100dvh] bg-[#F8FAFC] font-sans">
            <section className="relative pt-32 pb-20 px-6 bg-[#1D4F9C] text-white">
                <div className="absolute inset-0 z-0 opacity-20">
                    <Image src="/images/hero_bg.webp" fill alt="مشاريع شابورجي بالونجي جويفيل بوني الفاخرة" className="object-cover" priority />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        استثمر في عقارات بوني الفاخرة
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10">
                        شقق فاخرة بغرفتين وثلاث غرف نوم من شابورجي بالونجي. العوائد الاستثمارية الأفضل للمغتربين.
                    </p>
                    <Link 
                        href="/projects/joyville-sensorium-hinjewadi"
                        className="inline-block bg-[#C5A059] text-white px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-[#1D4F9C] transition-colors rounded-sm"
                    >
                        استكشف المشاريع
                    </Link>
                </div>
            </section>

            <section className="py-20 px-6 bg-white">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl font-bold text-[#323334]">لماذا الاستثمار في بوني؟</h2>
                    <p className="text-[#323334]/80 leading-relaxed text-lg">
                        تعد مدينة بوني واحدة من أسرع مدن تكنولوجيا المعلومات نمواً في الهند. مع المشاريع الضخمة مثل مترو بوني، تضمن استثماراتك في جويفيل نمواً غير مسبوق في رأس المال وإيرادات إيجارية ممتازة.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-8 pt-10">
                        <div className="p-8 border border-[#EEF2F6] shadow-sm rounded-lg">
                            <h3 className="text-xl font-bold text-[#1D4F9C] mb-3">عائد الإيجار</h3>
                            <p className="text-sm text-gray-500">حتى 6% سنوياً</p>
                        </div>
                        <div className="p-8 border border-[#EEF2F6] shadow-sm rounded-lg">
                            <h3 className="text-xl font-bold text-[#1D4F9C] mb-3">تبدأ من</h3>
                            <p className="text-sm text-gray-500">1.10 كرور روبية</p>
                        </div>
                        <div className="p-8 border border-[#EEF2F6] shadow-sm rounded-lg">
                            <h3 className="text-xl font-bold text-[#1D4F9C] mb-3">تراث شابورجي</h3>
                            <p className="text-sm text-gray-500">جودة بناء عالمية</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
