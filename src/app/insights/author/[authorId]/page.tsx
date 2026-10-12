import { Metadata } from 'next';
export const dynamic = 'force-static';
import { notFound } from 'next/navigation';
import { experts, getExpertById } from '@/data/experts';
import { blogs } from '@/data/blogs';
import { projects } from '@/data/projects';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Linkedin, Twitter, Medal, Target, BookOpen, Quote, ExternalLink, ChevronRight, MapPin, TrendingUp, ShieldCheck, Building2 } from 'lucide-react';

const siteUrl = 'https://joyville-homes.com';

export async function generateStaticParams() {
    return experts.map((expert) => ({
        authorId: expert.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ authorId: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const expert = getExpertById(resolvedParams.authorId);

    if (!expert) {
        return { title: 'Expert Analyst | Joyville Insights' };
    }

    return {
        title: `${expert.name} | ${expert.role} | Official Profile`,
        description: expert.bio,
        openGraph: {
            title: `${expert.name} - ${expert.role}`,
            description: expert.bio,
            images: [{ url: expert.image }],
        },
        alternates: {
            canonical: `${siteUrl}/insights/author/${expert.id}`
        }
    };
}

export default async function ExpertProfilePage({ params }: { params: Promise<{ authorId: string }> }) {
    const resolvedParams = await params;
    const expert = getExpertById(resolvedParams.authorId);

    if (!expert) {
        notFound();
    }

    const relevantBlogs = blogs.filter(b => b.author === expert.name || b.expertAuthor?.name === expert.name);
    const relevantProjects = projects.filter(p => p.expertReview && p.expertReview.expertId === expert.id);

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
                "name": expert.name,
                "item": `${siteUrl}/insights/author/${expert.id}`
            }
        ]
    };

    const personLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${siteUrl}/insights/author/${expert.id}/#person`,
        "name": expert.name,
        "jobTitle": expert.role,
        "description": expert.bio,
        "image": `${siteUrl}${expert.image}`,
        "sameAs": [
            expert.linkedIn,
            expert.twitter
        ].filter(Boolean),
        "worksFor": {
            "@type": "Organization",
            "name": "Shapoorji Pallonji Real Estate",
            "url": siteUrl
        },
        "url": `${siteUrl}/insights/author/${expert.id}`
    };

    const profilePageLd = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": { "@id": `${siteUrl}/insights/author/${expert.id}/#person` },
        "breadcrumb": { "@id": `${siteUrl}/insights/author/${expert.id}/#breadcrumb` }
    };

    return (
        <main className="min-h-[100dvh] bg-[#EEF2F6] text-[#323334]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            
            {/* Author Hero */}
            <section className="relative pt-40 pb-20 overflow-hidden bg-[#FFFFFF]">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1D4F9C]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <Link href="/insights" className="inline-flex items-center gap-2 text-[#1D4F9C] hover:text-[#323334] font-light text-xs tracking-widest uppercase transition-colors mb-12">
                        <ArrowLeft size={16} /> Back to Insights
                    </Link>

                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16">
                        {/* Avatar Column */}
                        <div className="relative w-64 h-64 lg:w-80 lg:h-80 shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#1D4F9C] to-transparent opacity-10 rounded-full blur-2xl" />
                            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#FFFFFF] shadow-2xl">
                                <Image src={expert.image} alt={expert.name} fill className="object-cover" priority />
                            </div>
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#1D4F9C] text-[#FFFFFF] px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-lg border border-[#FFFFFF]/20">
                                Official Analyst
                            </div>
                        </div>

                        {/* Bio Column */}
                        <div className="flex-1 text-center lg:text-left">
                            <h1 className="text-5xl lg:text-7xl font-serif text-[#323334] font-light mb-4">{expert.name}</h1>
                            <p className="text-xl text-[#1D4F9C] font-serif italic mb-8 border-b border-[#C5A059]/20 pb-6 inline-block lg:block">{expert.role}</p>
                            
                            <div className="space-y-6 max-w-3xl">
                                {expert.longBio.map((p, i) => (
                                    <p key={i} className="text-[#323334] font-light leading-relaxed text-lg">{p}</p>
                                ))}
                            </div>

                            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6">
                                {expert.linkedIn && (
                                    <a href={expert.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#323334]/60 hover:text-[#1D4F9C] transition-colors text-xs font-bold uppercase tracking-widest">
                                        <Linkedin size={18} /> LinkedIn Profile
                                    </a>
                                )}
                                {expert.twitter && (
                                    <a href={expert.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#323334]/60 hover:text-[#1D4F9C] transition-colors text-xs font-bold uppercase tracking-widest">
                                        <Twitter size={18} /> Twitter Insight Stream
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid lg:grid-cols-3 gap-16">
                    
                    {/* Credentials & Forecasts */}
                    <div className="space-y-12">
                        {/* Certifications */}
                        <div>
                            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-[#1D4F9C] mb-8 flex items-center gap-3">
                                <Medal size={16} /> Verified Credentials
                            </h3>
                            <div className="space-y-4">
                                {expert.certification?.map((cert, i) => (
                                    <div key={i} className="bg-[#FFFFFF] p-6 border border-[#C5A059]/10 rounded-sm shadow-sm flex items-start gap-4">
                                        <ShieldCheck size={20} className="text-[#C5A059] shrink-0" />
                                        <div>
                                            <p className="text-sm font-serif text-[#323334] leading-tight mb-1">{cert.name}</p>
                                            <p className="text-[10px] uppercase tracking-widest text-[#323334]/40 font-bold">{cert.authority} • {cert.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Market Forecasts */}
                        {expert.marketForecast && (
                            <div className="bg-[#1D4F9C] p-8 rounded-sm text-[#FFFFFF] shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <TrendingUp size={120} />
                                </div>
                                <h3 className="text-xs uppercase tracking-[0.3em] font-bold opacity-60 mb-8 relative z-10 flex items-center gap-3">
                                    <Target size={16} /> Market Intensity Predictions
                                </h3>
                                <div className="space-y-8 relative z-10">
                                    {expert.marketForecast.map((f, i) => (
                                        <div key={i} className="border-b border-white/20 last:border-0 pb-6 last:pb-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] uppercase font-bold tracking-widest">{f.locality}</span>
                                                <span className="text-[#C5A059] font-serif italic text-lg">{f.prediction}</span>
                                            </div>
                                            <div className="h-1 w-full bg-white/10 rounded-full mb-3 overflow-hidden">
                                                <div 
                                                    className={`h-full bg-[#C5A059] ${
                                                        f.confidence >= 95 ? 'w-full' :
                                                        f.confidence >= 90 ? 'w-[90%]' :
                                                        f.confidence >= 80 ? 'w-[80%]' :
                                                        f.confidence >= 70 ? 'w-[70%]' :
                                                        f.confidence >= 60 ? 'w-[60%]' :
                                                        'w-1/2'
                                                    }`}
                                                />
                                            </div>
                                            <p className="text-[10px] font-light opacity-80 leading-relaxed italic">&quot;{f.rationale}&quot;</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Published Work & Reviews */}
                    <div className="lg:col-span-2 space-y-16">
                        
                        {/* Notable Quotes */}
                        <div>
                            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-[#1D4F9C] mb-8 flex items-center gap-3">
                                <Quote size={16} /> Key Analysis Highlights
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {expert.quotes?.map((q, i) => (
                                    <div key={i} className="bg-[#FFFFFF]/60 backdrop-blur-sm p-8 border-l-4 border-[#C5A059] rounded-sm italic text-[#323334] font-serif text-lg leading-relaxed shadow-sm">
                                        &quot;{q}&quot;
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Insights */}
                        <div>
                            <div className="flex items-center justify-between mb-8 border-b border-[#C5A059]/20 pb-4">
                                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-[#1D4F9C] flex items-center gap-3">
                                    <BookOpen size={16} /> Authored Publications
                                </h3>
                                <span className="text-[10px] text-[#323334]/40 font-bold">{relevantBlogs.length} Articles</span>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {relevantBlogs.map(blog => (
                                    <Link key={blog.id} href={`/insights/${blog.slug}`} className="group bg-[#FFFFFF] border border-[#C5A059]/10 hover:border-[#1D4F9C]/40 p-6 transition-all duration-300 rounded-sm shadow-sm hover:shadow-xl">
                                        <span className="text-[10px] tracking-[0.2em] uppercase text-[#1D4F9C] font-semibold block mb-2">{blog.category}</span>
                                        <h3 className="text-base font-serif text-[#323334] group-hover:text-[#1D4F9C] transition-colors mb-3 leading-snug">{blog.title}</h3>
                                        <div className="flex items-center gap-2 text-[#1D4F9C] text-xs font-light">
                                            <span>Read Article</span>
                                            <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Project Audits */}
                        {relevantProjects.length > 0 && (
                            <div>
                                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-[#1D4F9C] mb-8 border-b border-[#C5A059]/20 pb-4 flex items-center gap-3">
                                    <Building2 size={16} /> Assigned Project Audits
                                </h3>
                                <div className="space-y-4">
                                    {relevantProjects.map(project => (
                                        <Link key={project.id} href={`/projects/${project.slug}`} className="flex items-center justify-between bg-[#FFFFFF] p-6 border border-[#C5A059]/10 rounded-sm hover:border-[#1D4F9C]/40 transition-all shadow-sm group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 relative rounded-sm overflow-hidden">
                                                    <Image src={project.image} fill className="object-cover grayscale group-hover:grayscale-0 transition-all" alt={`${project.title} - Shapoorji Pallonji Pune project audit`} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-serif text-[#323334] group-hover:text-[#1D4F9C] transition-colors">{project.title}</h4>
                                                    <p className="text-[10px] uppercase text-[#323334]/40 font-bold flex items-center gap-1"><MapPin size={10} /> {project.location}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right hidden md:block">
                                                    <p className="text-[10px] uppercase font-bold text-[#323334]/40">Expert Rating</p>
                                                    <p className="text-[#C5A059] font-serif">{project.expertReview?.rating}/5.0</p>
                                                </div>
                                                <ExternalLink size={16} className="text-[#323334]/20 group-hover:text-[#1D4F9C] transition-colors" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Verification Footer */}
            <footer className="bg-[#FFFFFF] border-t border-[#C5A059]/20 py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-[#323334]/40 font-bold mb-4">Official E-E-A-T Authority Center</p>
                    <p className="text-xs text-[#323334]/60 max-w-2xl mx-auto leading-relaxed">
                        The individuals listed in our Expert Directory are verified professionals with active certifications in their respective domains. Every analysis and forecast provided here is subject to periodic data-audits for accuracy against MahaRERA and census records.
                    </p>
                </div>
            </footer>
        </main>
    );
}
