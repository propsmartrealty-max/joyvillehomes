import { Metadata } from 'next';
export const dynamic = 'force-static';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Target } from 'lucide-react';
import { blogs } from '@/data/blogs';
import { experts } from '@/data/experts';
import { TOPIC_HUBS } from '@/data/TopicIntelligence';
import MicroMarketBulletin from '@/components/MicroMarketBulletin';

export const metadata: Metadata = {
    title: {
        absolute: 'Pune Real Estate Market Insights 2026 | Joyville Homes'
    },
    description: 'Access deep market analysis across Pune\'s primary project clusters. Expert guides on Hinjewadi IT Lifeline, East Pune Township Corridor, and Bavdhan Nature Valley ROI.',
    keywords: [
        'Pune real estate clusters', 'Hinjewadi IT hub insights', 'Hadapsar township corridor', 'Bavdhan nature valley real estate',
        'investment potential Hinjewadi 2027', 'Joyville vs Kolte Patil comparison', 'Shewalewadi growth corridor',
        'Pune metro impact property prices', 'NRI investment guide Pune', 'biophilic living Bavdhan'
    ],
    alternates: {
        canonical: 'https://joyville-homes.com/insights'
    }
};

export default function InsightsPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["Blog", "CollectionPage"],
                "@id": "https://joyville-homes.com/insights/#blog",
                "name": "Joyville Pune Market Insights",
                "description": metadata.description,
                "url": "https://joyville-homes.com/insights",
                "publisher": {
                    "@id": "https://joyville-homes.com/#organization"
                },
                "blogPost": blogs.map(blog => ({
                    "@type": "BlogPosting",
                    "headline": blog.title,
                    "url": `https://joyville-homes.com/insights/${blog.slug}`,
                    "datePublished": new Date(blog.date).toISOString()
                }))
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://joyville-homes.com/insights/#breadcrumb",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://joyville-homes.com" },
                    { "@type": "ListItem", "position": 2, "name": "Insights", "item": "https://joyville-homes.com/insights" }
                ]
            }
        ]
    };

    const clusters = [
        {
            id: 'hinjewadi',
            title: 'Hinjewadi IT Lifeline Hub',
            description: 'Strategic analysis of West Pune\'s premier technology corridor and high-yield investment opportunities.',
            topicIds: ['hinjewadi-it-hub'],
            bg: 'bg-[#1D4F9C]/5'
        },
        {
            id: 'hadapsar',
            title: 'East Pune Township Corridor',
            description: 'Insights into the massive integrated townships near Magarpatta City and SP Infocity.',
            topicIds: ['hadapsar-east-corridor', 'shewalewadi-growth'],
            bg: 'bg-[#C5A059]/5'
        },
        {
            id: 'bavdhan',
            title: 'Bavdhan Nature Valley',
            description: 'Exploring the scarcity-driven luxury and biophilic living standards of Central-West Pune.',
            topicIds: ['bavdhan-luxury'],
            bg: 'bg-[#323334]/5'
        },
        {
            id: 'nri',
            title: 'NRI Investment Center',
            description: 'Global financial guides, RERA compliance, and remote investment protocols for international buyers.',
            topicIds: ['nri-investment'],
            bg: 'bg-[#1D4F9C]/10'
        }
    ];

    const getBlogsByCluster = (topicIds: string[]) => {
        return blogs.filter(blog => 
            blog.topicID?.some(id => topicIds.includes(id))
        );
    };

    return (
        <main className="min-h-[100dvh] bg-[#EEF2F6] pt-32 pb-24 text-[#323334]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <header className="max-w-7xl mx-auto px-6 mb-20 text-center">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#1D4F9C] font-semibold block mb-4">Shapoorji Pallonji Knowledge Hub</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#323334] font-light mb-6">Market Insights & Trends</h1>
                <p className="text-[#323334] text-lg max-w-2xl mx-auto font-light leading-relaxed">
                    Data-driven analysis and expert perspectives on Pune&apos;s dynamic real estate landscape to empower your investment decisions.
                </p>
            </header>

            {/* Phase 33: Matchmaker CTA Injection */}
            <section className="max-w-7xl mx-auto px-6 mb-20">
                <div className="bg-[#1D4F9C] p-10 md:p-16 rounded-sm text-white relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="max-w-2xl text-center lg:text-left">
                            <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] mb-8 border border-white/20">
                                <Sparkles size={14} className="text-[#C5A059]" /> New: Intent-Driven Discovery
                            </span>
                            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
                                Overwhelmed by <span className="italic opacity-80">Research?</span>
                            </h2>
                            <p className="text-lg font-light opacity-70 leading-relaxed mb-8">
                                Try the 60-Second Investment Matchmaker. Answer 3 critical questions and receive a personalized asset portfolio backed by real-time ROI and infrastructure data.
                            </p>
                            <Link href="/insights/matchmaker" className="inline-flex items-center gap-4 bg-[#FFFFFF] text-[#1D4F9C] px-10 py-5 text-sm font-bold uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-white transition-all shadow-xl">
                                Start Matching Now <ArrowRight size={18} />
                            </Link>
                        </div>
                        <div className="hidden lg:block shrink-0">
                            <div className="w-48 h-48 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center p-8 animate-spin-slow">
                                <div className="w-full h-full bg-[#C5A059] rounded-full shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Target size={40} className="text-[#1D4F9C]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <MicroMarketBulletin />

            <div className="space-y-24 mt-20">
                {/* Phase 40: Discovery Directory Layer — maximizing internal link equity */}
                <section className="max-w-7xl mx-auto px-6 mb-20">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Topic Directory */}
                        <div className="bg-[#FFFFFF] p-8 border border-[#C5A059]/20 rounded-sm shadow-sm">
                            <h3 className="text-xl font-serif text-[#323334] mb-6 flex items-center gap-3">
                                <Target size={20} className="text-[#1D4F9C]" /> Investigation Topics
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {TOPIC_HUBS.map(topic => (
                                    <Link 
                                        key={topic.id} 
                                        href={`/insights/topic/${topic.id}`}
                                        className="px-4 py-2 bg-[#EEF2F6] text-[#323334] text-[10px] font-bold uppercase tracking-widest hover:bg-[#1D4F9C] hover:text-[#FFFFFF] transition-all border border-[#C5A059]/10"
                                    >
                                        {topic.title}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Author Directory */}
                        <div className="bg-[#FFFFFF] p-8 border border-[#C5A059]/20 rounded-sm shadow-sm">
                            <h3 className="text-xl font-serif text-[#323334] mb-6 flex items-center gap-3">
                                <Sparkles size={20} className="text-[#C5A059]" /> Expert Contributors
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {experts.map(expert => (
                                    <Link 
                                        key={expert.id} 
                                        href={`/insights/author/${expert.id}`}
                                        className="flex items-center gap-3 group"
                                    >
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#C5A059]/30">
                                            <Image src={expert.image} alt={expert.name} fill className="object-cover" />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#323334] group-hover:text-[#1D4F9C] transition-colors">{expert.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {clusters.map((cluster) => {
                    const clusterBlogs = getBlogsByCluster(cluster.topicIds);
                    if (clusterBlogs.length === 0) return null;

                    return (
                        <section key={cluster.id} className={`py-20 ${cluster.bg}`}>
                            <div className="max-w-7xl mx-auto px-6">
                                <div className="mb-12">
                                    <h2 className="text-3xl md:text-4xl font-serif text-[#323334] mb-4">{cluster.title}</h2>
                                    <p className="text-[#323334]/70 max-w-2xl font-light">{cluster.description}</p>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {clusterBlogs.map((blog) => (
                                        <article key={blog.id} className="group bg-[#FFFFFF] flex flex-col rounded-sm overflow-hidden border border-[#C5A059]/20 shadow-sm hover:shadow-xl transition-all duration-500">
                                            <Link href={`/insights/${blog.slug}`} className="block relative aspect-[16/9] overflow-hidden">
                                                <Image
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100 mix-blend-luminosity"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                                <div className="absolute top-4 left-4 bg-[#1D4F9C] px-3 py-1 text-[#FFFFFF] text-[9px] uppercase tracking-widest font-bold">
                                                    {blog.category}
                                                </div>
                                            </Link>

                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="flex flex-wrap items-center gap-4 text-[#323334]/60 mb-3 text-[10px] uppercase tracking-widest font-semibold">
                                                    <span className="flex items-center gap-1">{blog.date}</span>
                                                    <span className="flex items-center gap-1">• {blog.readTime}</span>
                                                </div>

                                                <h3 className="text-xl font-serif text-[#323334] mb-3 leading-tight group-hover:text-[#1D4F9C] transition-colors">
                                                    <Link href={`/insights/${blog.slug}`}>{blog.title}</Link>
                                                </h3>

                                                <p className="text-[#323334]/80 font-light text-sm leading-relaxed mb-6 line-clamp-3">
                                                    {blog.excerpt}
                                                </p>

                                                <Link href={`/insights/${blog.slug}`} className="inline-flex items-center gap-2 text-[#1D4F9C] text-[10px] uppercase tracking-widest font-bold hover:text-[#323334] transition-colors mt-auto w-max">
                                                    Read Investigation <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </section>
                    );
                })}

                {/* Remaining Blogs that don't fit into primary clusters */}
                <section className="max-w-7xl mx-auto px-6 pb-20">
                    <div className="mb-12 border-b border-[#C5A059]/10 pb-6">
                        <h2 className="text-3xl font-serif text-[#323334]">General Insights & Buyer Education</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs
                            .filter(blog => !clusters.some(c => blog.topicID?.some(id => c.topicIds.includes(id))))
                            .map((blog) => (
                                <article key={blog.id} className="group flex flex-col transition-all duration-300">
                                    <div className="flex flex-wrap items-center gap-4 text-[#323334]/60 mb-3 text-[10px] uppercase tracking-widest font-semibold">
                                        <span>{blog.date}</span>
                                        <span>{blog.category}</span>
                                    </div>
                                    <h3 className="text-xl font-serif text-[#323334] mb-3 leading-tight group-hover:text-[#1D4F9C] transition-colors">
                                        <Link href={`/insights/${blog.slug}`}>{blog.title}</Link>
                                    </h3>
                                    <p className="text-[#323334]/80 font-light text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                                    <Link href={`/insights/${blog.slug}`} className="text-[#1D4F9C] text-[10px] uppercase tracking-widest font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                                        View Details <ArrowRight size={14} />
                                    </Link>
                                </article>
                            ))
                        }
                    </div>
                </section>
            </div>
        </main>
    );
}
