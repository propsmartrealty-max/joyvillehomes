import { Metadata } from 'next';
export const dynamic = 'force-static';
import { notFound } from 'next/navigation';
import { blogs, getBlogBySlug } from '@/data/blogs';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Facebook, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import DiscussedEntities from '@/components/DiscussedEntities';
import KeyFactsSummary from '@/components/KeyFactsSummary';
import { projects } from '@/data/projects';
import { getExpertByName } from '@/data/experts';
import { getTopicById } from '@/data/TopicIntelligence';
import { Target, ArrowUpRight } from 'lucide-react';

const siteUrl = 'https://joyville-homes.com';

// Pre-render all blog routes at build time
export async function generateStaticParams() {
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const blog = getBlogBySlug(resolvedParams.slug);

    if (!blog) {
        return { title: 'Article Not Found | Joyville Insights' };
    }

    return {
        title: `${blog.title} | Market Insights Pune`,
        description: blog.excerpt,
        keywords: blog.seoKeywords,
        openGraph: {
            title: blog.title,
            description: blog.excerpt,
            type: 'article',
            publishedTime: new Date(blog.date).toISOString(),
            authors: [blog.author],
            section: blog.category,
            images: [{ url: blog.image }],
        },
        alternates: {
            canonical: `${siteUrl}/insights/${blog.slug}`
        }
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const blog = getBlogBySlug(resolvedParams.slug);

    if (!blog) {
        notFound();
    }

    // Get related articles (exclude current)
    const relatedArticles = blogs.filter(b => b.slug !== blog.slug).slice(0, 3);

    const articleContent = blog.content.join(" ").replace(/<[^>]*>?/gm, '');
    const wordCount = articleContent.split(/\s+/).length;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteUrl}/insights/${blog.slug}`
        },
        "subjectOf": [
            ...(projects.filter(p => p.topicID && blog.topicID && p.topicID.some(id => blog.topicID!.includes(id))).map(p => ({
                "@type": "RealEstateProject",
                "url": `${siteUrl}/projects/${p.slug}`,
                "name": p.title
            })))
        ],
        "headline": blog.title,
        "image": [blog.image],
        "datePublished": new Date(blog.date).toISOString(),
        "dateModified": new Date().toISOString(), // Dynamic build-time freshness signal for QDF
        "wordCount": wordCount,
        "keywords": blog.seoKeywords?.join(', '),
        "articleSection": blog.category, // Topical categorization for Google Discover
        "dateline": blog.dateline || "Pune, India",
        "printEdition": blog.printEdition || "Digital Insights",
        "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": ["h1", ".prose p:first-of-type"]
        },
        "author": blog.expertAuthor ? {
            "@type": "Person",
            "name": blog.expertAuthor.name,
            "jobTitle": blog.expertAuthor.role,
            "image": `${siteUrl}${blog.expertAuthor.image}`,
            "description": blog.expertAuthor.bio,
            "url": `${siteUrl}/insights/author/${getExpertByName(blog.expertAuthor.name)?.id || 'research-desk'}`
        } : {
            "@id": "https://joyville-homes.com/#research-desk"
        },
        "publisher": {
            "@id": "https://joyville-homes.com/#organization"
        },
        ...(blog.citedReferences?.length ? {
            "citation": blog.citedReferences.map(ref => ({
                "@type": "CreativeWork",
                "name": ref.title,
                "url": ref.url,
                "publisher": {
                    "@type": "Organization",
                    "name": ref.publisher
                }
            }))
        } : {}),
        "description": blog.excerpt,
        "articleBody": articleContent,
        ...(blog.relatedProjects?.length ? {
            "about": blog.relatedProjects.map(slug => ({
                "@type": "Accommodation",
                "name": slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                "url": `${siteUrl}/projects/${slug}`
            }))
        } : {}),
        ...(blog.relatedLocalities?.length ? {
            "mentions": [
                ...blog.relatedLocalities.map(slug => ({
                    "@type": "City",
                    "name": slug.charAt(0).toUpperCase() + slug.slice(1),
                    "url": `${siteUrl}/locality/${slug}`
                })),
                ...(projects.filter(p => p.topicID && blog.topicID && p.topicID.some(id => blog.topicID!.includes(id))).map(p => ({
                    "@type": "RealEstateProject",
                    "name": p.title,
                    "url": `${siteUrl}/projects/${p.slug}`
                })))
            ]
        } : {
            "mentions": projects.filter(p => p.topicID && blog.topicID && p.topicID.some(id => blog.topicID!.includes(id))).map(p => ({
                "@type": "RealEstateProject",
                "name": p.title,
                "url": `${siteUrl}/projects/${p.slug}`
            }))
        })
    };

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
            { "@type": "ListItem", "position": 2, "name": "Insights", "item": `${siteUrl}/insights` },
            { "@type": "ListItem", "position": 3, "name": blog.title, "item": `${siteUrl}/insights/${blog.slug}` }
        ]
    };

    return (
        <article className="min-h-[100dvh] bg-[#EEF2F6] pt-32 pb-24 text-[#323334]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

            <div className="max-w-4xl mx-auto px-6 mb-12">
                <Link href="/insights" className="inline-flex items-center gap-2 text-[#1D4F9C] hover:text-[#323334] font-light text-xs tracking-widest uppercase transition-colors mb-10">
                    <ArrowLeft size={16} /> Back to Insights
                </Link>

                <div className="mb-6 flex items-center gap-3 text-[#1D4F9C] text-[10px] uppercase tracking-[0.2em] font-bold">
                    <span>{blog.category}</span>
                    <span className="w-1 h-1 rounded-full bg-[#323334]/30" />
                    <span>{blog.readTime}</span>
                    <span className="w-1 h-1 rounded-full bg-[#323334]/30" />
                    <span>{wordCount.toLocaleString()} words</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#323334] font-light leading-tight mb-8">
                    {blog.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between border-y border-[#C5A059]/20 py-4 gap-6">
                    <div className="flex items-center gap-6 text-[#323334]/80 text-sm font-light">
                        <span className="flex items-center gap-2"><User size={16} className="text-[#1D4F9C]" /> {blog.author}</span>
                        <span className="flex items-center gap-2"><Calendar size={16} className="text-[#1D4F9C]" /> {blog.date}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-xs uppercase tracking-widest font-semibold text-[#323334]/60">Share</span>
                        <div className="flex items-center gap-3 text-[#1D4F9C]">
                            <button className="hover:text-[#323334] transition-colors"><Linkedin size={18} /></button>
                            <button className="hover:text-[#323334] transition-colors"><Twitter size={18} /></button>
                            <button className="hover:text-[#323334] transition-colors"><Facebook size={18} /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 mb-16">
                <div className="relative aspect-[21/9] w-full bg-[#323334] rounded-sm overflow-hidden shadow-2xl">
                    <Image
                        src={blog.image}
                        alt={`${blog.title} — Pune Real Estate Market Analysis by Shapoorji Pallonji`}
                        fill
                        className="object-cover opacity-90 mix-blend-luminosity"
                        priority
                        sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6">
                <KeyFactsSummary takeaways={[
                    blog.excerpt,
                    `Perspective: Authored by ${blog.expertAuthor ? blog.expertAuthor.name : blog.author} specializing in ${blog.category}`,
                    `Strategic Focus: ${blog.seoKeywords?.slice(0, 3).join(', ') ?? blog.title}`
                ]} />

                <div className="prose prose-lg prose-headings:font-serif prose-headings:font-light prose-headings:text-[#323334] prose-p:font-light prose-p:text-[#323334]/90 prose-p:leading-relaxed prose-a:text-[#1D4F9C] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-a:decoration-[#1D4F9C] max-w-none">
                    {blog.content.map((paragraph, idx) => (
                        <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} className="mb-8" />
                    ))}
                </div>

                <DiscussedEntities
                    projectSlugs={blog.relatedProjects}
                    localitySlugs={blog.relatedLocalities}
                />

                {/* Expert Author Section - E-E-A-T Signal */}
                {blog.expertAuthor && (
                    <div className="mt-16 p-8 bg-[#FFFFFF] border-l-4 border-[#1D4F9C] rounded-sm shadow-sm flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 shadow-lg border-2 border-[#1D4F9C]/10">
                            <Image
                                src={blog.expertAuthor.image}
                                alt={`${blog.expertAuthor.name} - Real Estate Expert Contributor at Shapoorji Pallonji Joyville`}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <span className="text-[10px] tracking-[0.2em] uppercase text-[#1D4F9C] font-bold block mb-2">Expert Contributor</span>
                            <Link href={`/insights/author/${getExpertByName(blog.expertAuthor.name)?.id || '#'}`} className="hover:text-[#1D4F9C] transition-colors">
                                <h3 className="text-xl font-serif text-[#323334] mb-2 underline decoration-[#C5A059]/30">{blog.expertAuthor.name}</h3>
                            </Link>
                            <p className="text-[#323334]/60 text-xs font-medium mb-4 uppercase tracking-widest">{blog.expertAuthor.role}</p>
                            <p className="text-[#323334] font-light text-sm leading-relaxed italic">
                                &quot;{blog.expertAuthor.bio}&quot;
                            </p>
                        </div>
                    </div>
                )}

                {/* Phase 28: Topical Insight Hub Link */}
                {blog.topicID && blog.topicID.length > 0 && (
                    <div className="mt-12 bg-[#1D4F9C] p-8 rounded-sm text-[#FFFFFF] shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Target size={120} />
                        </div>
                        <div className="relative z-10 max-w-lg">
                            <span className="text-[10px] tracking-[0.3em] uppercase font-bold opacity-60 mb-2 block">Authority Hub</span>
                            <h4 className="text-2xl font-serif mb-4 font-light leading-tight">Delve deeper into the entities discussed.</h4>
                            <p className="text-sm font-light mb-8 opacity-80 leading-relaxed">
                                Our data analysts have mapped the relationships between this insight and the broader market trajectory. Access the definitive Topic Hub for a unified view.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {blog.topicID.map(tid => {
                                    const topic = getTopicById(tid);
                                    if (!topic) return null;
                                    return (
                                        <Link key={tid} href={`/insights/topic/${topic.id}`} className="inline-flex items-center gap-2 bg-[#FFFFFF] text-[#1D4F9C] px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#FFFFFF] transition-all rounded-full group/btn">
                                            {topic.title} <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Cited References Section - Trust Signal */}
                {blog.citedReferences && blog.citedReferences.length > 0 && (
                    <div className="mt-12 p-8 border border-[#C5A059]/20 rounded-sm">
                        <h4 className="text-[10px] tracking-[0.2em] uppercase text-[#323334]/60 font-bold mb-6">Data Sources & Citations</h4>
                        <ul className="space-y-4">
                            {blog.citedReferences.map((ref, idx) => (
                                <li key={idx} className="flex flex-col">
                                    <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#1D4F9C] hover:underline flex items-center gap-2">
                                        {ref.title} <ArrowRight size={12} />
                                    </a>
                                    <span className="text-[10px] text-[#323334]/50 uppercase tracking-wider mt-1">{ref.publisher}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Semantic Content Siloing CTA */}
                <div className="mt-16 pt-8 border-t border-[#C5A059]/20 bg-[#FFFFFF] p-8 rounded-sm shadow-sm flex flex-col items-start">
                    <h3 className="text-2xl font-serif text-[#1D4F9C] mb-4">Take the Next Step</h3>
                    <p className="text-[#323334] font-light mb-8 text-lg">
                        Our market analysis indicates high demand for properties matching your interests. Explore curated Shapoorji Pallonji residences specific to this insight.
                    </p>

                    {/* Dynamic Routing Logic linking blogs to bottom-of-funnel programmatic pages */}
                    {blog.seoKeywords.some(k => k.toLowerCase().includes('hinjewadi') && k.toLowerCase().includes('2 bhk')) ? (
                        <Link href="/properties/2-bhk-flats-in-hinjewadi" className="inline-flex items-center gap-3 bg-[#1D4F9C] text-[#FFFFFF] px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#323334] transition-colors shadow-lg">
                            View 2 BHK Flats in Hinjewadi <ArrowRight size={16} />
                        </Link>
                    ) : blog.seoKeywords.some(k => k.toLowerCase().includes('hadapsar') || k.toLowerCase().includes('township')) ? (
                        <Link href="/properties/townships-near-magarpatta-city" className="inline-flex items-center gap-3 bg-[#1D4F9C] text-[#FFFFFF] px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#323334] transition-colors shadow-lg">
                            Explore Magarpatta Township <ArrowRight size={16} />
                        </Link>
                    ) : blog.seoKeywords.some(k => k.toLowerCase().includes('bavdhan') || k.toLowerCase().includes('luxury')) ? (
                        <Link href="/properties/3-bhk-luxury-apartments-pune-west" className="inline-flex items-center gap-3 bg-[#1D4F9C] text-[#FFFFFF] px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#323334] transition-colors shadow-lg">
                            Discover Pune West Luxury <ArrowRight size={16} />
                        </Link>
                    ) : (
                        <Link href="/projects" className="inline-flex items-center gap-3 bg-[#1D4F9C] text-[#FFFFFF] px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#323334] transition-colors shadow-lg">
                            Explore Master Portfolio <ArrowRight size={16} />
                        </Link>
                    )}
                </div>

                {/* Related Articles Section */}
                <section className="mt-20 pt-12 border-t border-[#C5A059]/10">
                    <h2 className="text-2xl font-serif text-[#323334] mb-8">More Market Insights</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {relatedArticles.map(article => (
                            <Link key={article.slug} href={`/insights/${article.slug}`} className="group bg-[#FFFFFF] border border-[#C5A059]/10 hover:border-[#C5A059]/40 p-6 transition-all duration-300 rounded-sm">
                                <span className="text-[10px] tracking-[0.2em] uppercase text-[#1D4F9C] font-semibold block mb-2">{article.category}</span>
                                <h3 className="text-base font-serif text-[#323334] group-hover:text-[#1D4F9C] transition-colors mb-3 leading-snug">{article.title}</h3>
                                <div className="flex items-center gap-2 text-[#1D4F9C] text-xs font-light">
                                    <span>Read Article</span>
                                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </article>
    );
}
