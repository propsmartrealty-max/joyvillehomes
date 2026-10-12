import { Metadata } from 'next';
export const dynamic = 'force-static';
import { notFound } from 'next/navigation';
import { TOPIC_HUBS, getTopicById } from '@/data/TopicIntelligence';
import { projects } from '@/data/projects';
import { blogs } from '@/data/blogs';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight, BookOpen, Building2, MapPin, Target, Sparkles, TrendingUp, Globe, Map } from 'lucide-react';

const siteUrl = 'https://joyville-homes.com';

export async function generateStaticParams() {
    return TOPIC_HUBS.map((topic) => ({
        topicId: topic.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ topicId: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const topic = getTopicById(resolvedParams.topicId);

    if (!topic) {
        return { title: 'Topic Hub | Joyville Insights' };
    }

    return {
        title: `${topic.title} | Official Authority Hub`,
        description: topic.metaDescription,
        keywords: topic.keywords,
        alternates: {
            canonical: `${siteUrl}/insights/topic/${topic.id}`
        }
    };
}

const iconMap: Record<string, React.ReactNode> = {
    'Building2': <Building2 size={24} />,
    'TrendingUp': <TrendingUp size={24} />,
    'Globe': <Globe size={24} />,
    'Map': <Map size={24} />,
};

export default async function TopicHubPage({ params }: { params: Promise<{ topicId: string }> }) {
    const resolvedParams = await params;
    const topic = getTopicById(resolvedParams.topicId);

    if (!topic) {
        notFound();
    }

    // Filter relevant content
    const relevantBlogs = blogs.filter(b => b.topicID?.includes(topic.id));
    const relevantProjects = projects.filter(p => p.topicIDs?.includes(topic.id));

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteUrl
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Insights",
                "item": `${siteUrl}/insights`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": topic.title,
                "item": `${siteUrl}/insights/topic/${topic.id}`
            }
        ]
    };

    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": topic.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${siteUrl}/insights/topic/${topic.id}/#webpage`,
        "url": `${siteUrl}/insights/topic/${topic.id}`,
        "name": topic.title,
        "description": topic.description,
        "mainEntity": {
            "@type": "Thing",
            "name": topic.title,
            "description": topic.description
        },
        "hasPart": [
            ...relevantBlogs.map(b => ({
                "@type": "Article",
                "headline": b.title,
                "url": `${siteUrl}/insights/${b.slug}`
            })),
            ...relevantProjects.map(p => ({
                "@type": "RealEstateProject",
                "name": p.title,
                "url": `${siteUrl}/projects/${p.slug}`
            }))
        ]
    };

    return (
        <main className="min-h-[100dvh] bg-[#EEF2F6] text-[#323334]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            
            {/* Topic Hero Section */}
            <section className="relative pt-40 pb-24 overflow-hidden bg-[#FFFFFF]">
                <div className="absolute inset-0 z-0 opacity-10">
                    <Image src={topic.heroImage} fill className="object-cover grayscale" alt={`${topic.title} - Pune Real Estate Insights`} priority />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-4 text-[#1D4F9C] font-bold text-[10px] tracking-[0.4em] uppercase mb-8">
                        <span className="p-3 bg-[#1D4F9C]/5 rounded-full">
                            {iconMap[topic.icon]}
                        </span>
                        Topical Authority Hub
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif text-[#323334] font-light leading-tight max-w-4xl mb-8">
                        {topic.h1}
                    </h1>
                    <p className="text-xl text-[#323334]/80 font-light max-w-2xl leading-relaxed mb-12 border-l-2 border-[#C5A059] pl-8">
                        {topic.description}
                    </p>
                </div>
            </section>

            {/* Hub Body */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-3 gap-16">
                    
                    {/* Left & Center: Content Stream */}
                    <div className="lg:col-span-2 space-y-20">
                        
                        {/* Phase 31: Regional NRI Hub Injection */}
                        {topic.id === 'nri-investment' && (
                            <div className="bg-[#FFFFFF] p-10 border border-[#C5A059]/30 rounded-sm shadow-xl">
                                <div className="flex items-center gap-3 mb-8">
                                    <Globe className="text-[#1D4F9C]" size={24} />
                                    <h2 className="text-2xl font-serif text-[#323334]">Regional Investment Hubs</h2>
                                </div>
                                <p className="text-sm text-[#323334]/60 font-light mb-8 leading-relaxed">
                                    Select your current region for localized FEMA guidance, tax advantages, and currency-specific ROI projections.
                                </p>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {[
                                        { id: 'nri-uae-dubai', name: 'UAE / Dubai', icon: '🇦🇪' },
                                        { id: 'nri-usa-tech', name: 'USA / North America', icon: '🇺🇸' },
                                        { id: 'nri-uk-europe', name: 'UK / Europe', icon: '🇬🇧' }
                                    ].map(region => (
                                        <Link 
                                            key={region.id} 
                                            href={`/insights/nri/region/${region.id}`}
                                            className="p-6 bg-[#EEF2F6] border border-[#C5A059]/10 rounded-sm hover:border-[#1D4F9C] hover:bg-[#FFFFFF] transition-all group text-center"
                                        >
                                            <div className="text-3xl mb-3">{region.icon}</div>
                                            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#323334] group-hover:text-[#1D4F9C] transition-colors">{region.name}</h4>
                                            <div className="mt-4 flex items-center justify-center gap-1 text-[8px] text-[#1D4F9C] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                                View Strategy <ChevronRight size={10} />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Summary Content */}
                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-3xl font-serif text-[#1D4F9C] mb-8 font-light flex items-center gap-3">
                                <Sparkles size={24} className="text-[#C5A059]" /> Executive Summary
                            </h2>
                            {topic.content.map((p, i) => (
                                <p key={i} className="text-[#323334] font-light leading-loose text-lg mb-6">{p}</p>
                            ))}
                        </div>

                        {/* Filtered Articles */}
                        <div>
                            <div className="flex items-center justify-between mb-10 border-b border-[#C5A059]/20 pb-6">
                                <h2 className="text-2xl font-serif text-[#323334] font-light flex items-center gap-3">
                                    <BookOpen size={24} className="text-[#1D4F9C]" /> Deep Dives & Analysis
                                </h2>
                                <span className="text-xs uppercase tracking-widest text-[#323334]/40 font-bold">{relevantBlogs.length} Articles</span>
                            </div>
                            <div className="space-y-8">
                                {relevantBlogs.map(blog => (
                                    <Link key={blog.id} href={`/insights/${blog.slug}`} className="group block bg-[#FFFFFF] p-8 border border-[#C5A059]/10 hover:border-[#1D4F9C]/40 transition-all rounded-sm shadow-sm hover:shadow-xl">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex-1">
                                                <span className="text-[10px] uppercase tracking-widest text-[#1D4F9C] font-bold mb-3 block">{blog.category}</span>
                                                <h3 className="text-2xl font-serif text-[#323334] group-hover:text-[#1D4F9C] transition-colors mb-3 leading-snug">{blog.title}</h3>
                                                <p className="text-sm text-[#323334]/60 font-light line-clamp-2 mb-4">{blog.excerpt}</p>
                                                <div className="flex items-center gap-4 text-[10px] text-[#323334]/40 font-bold uppercase tracking-widest">
                                                    <span>By {blog.author}</span>
                                                    <span>•</span>
                                                    <span>{blog.readTime}</span>
                                                </div>
                                            </div>
                                            <div className="shrink-0 w-full md:w-32 aspect-square relative rounded-sm overflow-hidden">
                                                <Image src={blog.image} fill className="object-cover group-hover:scale-110 transition-transform duration-700" alt={`${blog.title} - Shapoorji Pallonji Joyville`} />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Master FAQs */}
                        <div className="bg-[#FFFFFF] p-10 border border-[#1D4F9C]/10 rounded-sm">
                            <h2 className="text-2xl font-serif text-[#323334] mb-8 font-light flex items-center gap-3">
                                <Target size={24} className="text-[#1D4F9C]" /> Common Queries & Facts
                            </h2>
                            <div className="space-y-6">
                                {topic.faqs.map((faq, i) => (
                                    <div key={i} className="pb-6 border-b border-[#C5A059]/10 last:border-0 last:pb-0">
                                        <h4 className="text-lg font-serif text-[#1D4F9C] mb-3">{faq.q}</h4>
                                        <p className="text-sm text-[#323334] font-light leading-relaxed">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar: Contextual Projects */}
                    <aside className="space-y-8">
                        <div className="sticky top-32">
                            <h2 className="text-xl font-serif text-[#323334] mb-8 font-light tracking-wide uppercase flex items-center gap-3">
                                <Building2 size={20} className="text-[#1D4F9C]" /> Matched Assets
                            </h2>
                            <div className="space-y-4">
                                {relevantProjects.map(project => (
                                    <Link key={project.id} href={`/projects/${project.slug}`} className="group block bg-[#FFFFFF] border border-[#C5A059]/20 p-5 rounded-sm hover:border-[#1D4F9C]/40 transition-all shadow-sm">
                                        <div className="relative aspect-video mb-4 overflow-hidden rounded-sm">
                                            <Image src={project.image} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={project.title} />
                                        </div>
                                        <h3 className="text-lg font-serif text-[#323334] group-hover:text-[#1D4F9C] transition-colors mb-1">{project.title}</h3>
                                        <div className="flex items-center gap-2 text-[#323334]/60 text-[10px] uppercase font-bold tracking-widest mb-4">
                                            <MapPin size={10} /> {project.location}
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-[#C5A059]/10">
                                            <span className="text-[#1D4F9C] font-serif italic text-sm">{project.price}</span>
                                            <ChevronRight size={16} className="text-[#1D4F9C] group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Global Entity Anchoring */}
                            <div className="mt-12 p-6 bg-[#1D4F9C] text-[#FFFFFF] rounded-sm">
                                <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-4 opacity-60">Entity Map</h3>
                                <div className="flex flex-wrap gap-2">
                                    {topic.keywords.map(k => (
                                        <span key={k} className="text-[9px] uppercase tracking-widest px-2 py-1 bg-white/10 rounded-sm">{k}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* Bottom Funnel Injection */}
            <section className="bg-[#FFFFFF] border-t border-[#C5A059]/20 py-24 text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-4xl font-serif text-[#323334] mb-6 font-light">Deepened your understanding?</h2>
                    <p className="text-lg text-[#323334]/60 font-light mb-10">Our specialists can provide a granular 5-year ROI and Infrastructure impact report for these specific topics.</p>
                    <Link href="/projects" className="inline-flex items-center gap-4 bg-[#1D4F9C] text-[#FFFFFF] px-10 py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#323334] transition-colors shadow-2xl">
                        Request Detailed Insight Report <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

        </main>
    );
}
