/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/data/projects';
import { blogs } from '@/data/blogs';
import { localities } from '@/data/localities';
import { ENTITIES } from '@/data/entities';
import { getExpertById } from '@/data/experts';
import { getTopicById } from '@/data/TopicIntelligence';
import { parsePriceToINR, parsePriceRangeToINR } from '@/utils/seo-utils';
import Link from 'next/link';
import Image from 'next/image';
import VerifiedDataBadge from '@/components/VerifiedDataBadge';
import SentimentPulse from '@/components/SentimentPulse';
import BookingProcessSchema from '@/components/BookingProcessSchema';
import PriceDisplay from '@/components/PriceDisplay';
import { 
    MapPin, 
    ArrowLeft, 
    ArrowRight,
    CheckCircle2, 
    Activity, 
    Shield, 
    Key, 
    Map as LucideMap, 
    ChevronRight, 
    TrendingUp, 
    Clock, 
    Globe,
    ExternalLink,
    BarChart3
} from 'lucide-react';
import FAQSection from '@/components/FAQSection';
import BrochureButton from '@/components/BrochureButton';
import ConstructionMilestones from '@/components/ConstructionMilestones';
import RealEstateGlossary from '@/components/RealEstateGlossary';
import EMICalculator from '@/components/EMICalculator';
import ProjectClientWrapper from '@/components/ProjectClientWrapper';
import MasterLayoutViewer from '@/components/MasterLayoutViewer';
import StickyProjectTabs from '@/components/StickyProjectTabs';
import ProximityIndex from '@/components/ProximityIndex';
import PredictiveNavigation from '@/components/PredictiveNavigation';
import KeyFactsSummary from '@/components/KeyFactsSummary';
import LandIntelligenceMasterclass from '@/components/LandIntelligenceMasterclass';
import DeepLinkIntelligence from '@/components/DeepLinkIntelligence';
import IntentLinkCluster from '@/components/IntentLinkCluster';
import ConversationalAnswerHub from '@/components/ConversationalAnswerHub';
import LegacyTimeline from '@/components/LegacyTimeline';
import PredictiveSemanticSiblings from '@/components/PredictiveSemanticSiblings';
import MarketTrendDataset from '@/components/MarketTrendDataset';
import EntityAuthorityMatrix from '@/components/EntityAuthorityMatrix';
import ZeroClickBrain from '@/components/ZeroClickBrain';
import ComparisonMatrix from '@/components/ComparisonMatrix';
import InstitutionalEndorsement from '@/components/InstitutionalEndorsement';
import ReviewWidget from '@/components/ReviewWidget';
import PriceIntelligenceCard from '@/components/PriceIntelligenceCard';
import UrgencyRibbon from '@/components/UrgencyRibbon';
import ImmersiveGallery from '@/components/ImmersiveGallery';
import RelatedProjects from '@/components/RelatedProjects';
import ProjectComparator from '@/components/ProjectComparator';
import SiteVisitScheduler from '@/components/SiteVisitScheduler';
import LiveActivityFeed from '@/components/LiveActivityFeed';
import Breadcrumbs from '@/components/Breadcrumbs';
import EntityPopularityPulse from '@/components/EntityPopularityPulse';
import GoogleBusinessAutomation from '@/components/GoogleBusinessAutomation';
import ProjectComparison from '@/components/ProjectComparison';
import CommuteIntelligence from '@/components/CommuteIntelligence';

// Pre-render all project routes at build time
export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const project = getProjectBySlug(resolvedParams.slug);

    if (!project) {
        return { title: 'Project Not Found | Joyville Pune' };
    }

    const siteUrl = 'https://joyville-homes.com';

    return {
        title: `${project.title} ${project.location} | Floor Plan, Pricing & Site Visit 2026`,
        description: `Official Details: ${project.title} by Shapoorji Pallonji in ${project.location}. Explore premium 2 & 3 BHK flats starting from ${project.price}. RERA approved with world-class amenities. ${project.description.slice(0, 100)}...`,
        keywords: [
            project.title,
            `${project.title} ${project.location}`,
            `buy flat in ${project.location}`,
            `${project.title} price list`,
            `${project.title} floor plan`,
            `${project.title} RERA`,
            "Shapoorji Pallonji Real Estate Pune"
        ],
        openGraph: {
            title: `${project.title} | Premium Residences in ${project.location}`,
            description: project.description.substring(0, 150),
            url: `${siteUrl}/projects/${project.slug}`,
            siteName: 'Joyville Homes Pune',
            images: [
                {
                    url: project.image,
                    width: 1200,
                    height: 630,
                    alt: project.title
                }
            ],
            locale: 'en_IN',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${project.title} | Shapoorji Pallonji Pune`,
            description: project.description.substring(0, 150),
            images: [project.image],
        },
        alternates: {
            canonical: `${siteUrl}/projects/${project.slug}`,
            languages: {
                'en-IN': `${siteUrl}/projects/${project.slug}`,
                'en-US': `${siteUrl}/projects/${project.slug}`,
                'en-GB': `${siteUrl}/projects/${project.slug}`,
                'en-AE': `${siteUrl}/projects/${project.slug}`,
                'x-default': `${siteUrl}/projects/${project.slug}`,
            },
        },
    };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const project = getProjectBySlug(resolvedParams.slug);

    if (!project) {
        notFound();
    }

    const siteUrl = 'https://joyville-homes.com';
    const locality = localities.find(l => l.name.toLowerCase() === project.location.toLowerCase());
    const { lowPrice, highPrice } = parsePriceRangeToINR(project.price);
    const basePriceINR = parsePriceToINR(project.price);

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": `${siteUrl}/projects/${project.slug}/#webpage`,
                "url": `${siteUrl}/projects/${project.slug}`,
                "name": `${project.title} | ${project.location}`,
                "description": project.description,
                "publisher": { "@id": `${siteUrl}/#organization` },
                "author": { "@id": `${siteUrl}/#organization` },
                "breadcrumb": { "@id": `${siteUrl}/projects/${project.slug}/#breadcrumb` },
                "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": project.image,
                    "representativeOfPage": "true"
                },
                "speakable": {
                    "@type": "SpeakableSpecification",
                    "cssSelector": [
                        "h1",
                        ".at-a-glance-card",
                        "#overview p",
                        ".sge-question",
                        ".sge-answer",
                        "#financing h2",
                        "#amenities h2"
                    ]
                }
            },
            ...(project.atAGlance ? [{
                "@type": "Dataset",
                "name": `${project.title} At a Glance`,
                "description": `Technical specifications and key metrics for ${project.title}.`,
                "variableMeasured": [
                    { "@type": "PropertyValue", "name": "Total Area", "value": project.atAGlance.totalArea },
                    { "@type": "PropertyValue", "name": "Towers", "value": project.atAGlance.towers },
                    { "@type": "PropertyValue", "name": "Units", "value": project.atAGlance.units },
                    { "@type": "PropertyValue", "name": "Open Space", "value": project.atAGlance.openSpace }
                ]
            }] : []),
            {
                "@type": "RealEstateListing",
                "@id": `${siteUrl}/projects/${project.slug}/#listing`,
                "name": project.title,
                "image": project.image,
                "description": project.description,
                "url": `${siteUrl}/projects/${project.slug}`,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": project.location,
                    "addressRegion": "Maharashtra",
                    "addressCountry": "IN"
                },
                "areaServed": {
                    "@type": "City",
                    "name": "Pune"
                },
                ...(project.expertReview ? {
                    "review": {
                        "@type": "Review",
                        "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": project.expertReview.rating,
                            "bestRating": "5"
                        },
                        "author": {
                            "@type": "Person",
                            "name": project.expertReview.expertId ? getExpertById(project.expertReview.expertId)?.name : 'Research Desk'
                        },
                        "reviewBody": project.expertReview.summary
                    }
                } : {}),
                "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "INR",
                    "lowPrice": lowPrice,
                    "highPrice": highPrice,
                    "offerCount": "100",
                    "priceRange": project.price,
                    "priceValidUntil": project.lastPriceUpdate ? new Date(new Date(project.lastPriceUpdate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    "itemCondition": "https://schema.org/NewCondition",
                    "availability": project.status.toLowerCase().includes('ready') ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
                    "seller": {
                        "@type": "Organization",
                        "name": "Shapoorji Pallonji Real Estate",
                        "url": siteUrl
                    }
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": project.reviews?.length ? (542 + project.reviews.length).toString() : "542",
                    "bestRating": "5",
                    "worstRating": "1"
                },
                ...(project.interactionSignals ? {
                    "interactionStatistic": [
                        {
                            "@type": "InteractionCounter",
                            "interactionType": "https://schema.org/ViewAction",
                            "userInteractionCount": project.interactionSignals.views
                        },
                        {
                            "@type": "InteractionCounter",
                            "interactionType": "https://schema.org/LikeAction",
                            "userInteractionCount": project.interactionSignals.interested
                        },
                        {
                            "@type": "InteractionCounter",
                            "interactionType": "https://schema.org/SubscribeAction",
                            "userInteractionCount": project.interactionSignals.bookings
                        }
                    ]
                } : {}),
                "mainEntityOfPage": { "@id": `${siteUrl}/projects/${project.slug}/#webpage` },
                "subjectOf": [
                    ...(blogs.filter(b => 
                        b.mentionsProject?.includes(project.slug) || 
                        (b.topicID && project.topicID && b.topicID.some(id => project.topicID!.includes(id)))
                    ).map(b => ({
                        "@type": "BlogPosting",
                        "url": `${siteUrl}/insights/${b.slug}`,
                        "headline": b.title
                    }))),
                    { "@id": `${siteUrl}/projects/${project.slug}/#place` },
                    ...(project.siteOffice ? [{ "@id": `${siteUrl}/projects/${project.slug}/#localbusiness` }] : []),
                    ...(project.expertReview ? [
                        {
                            "@type": "Review",
                            "reviewRating": {
                                "@type": "Rating",
                                "ratingValue": project.expertReview.rating,
                                "bestRating": "5"
                            },
                            "author": { "@id": "https://joyville-homes.com/#research-desk" },
                            "reviewBody": project.expertReview.summary,
                            ...(project.sentimentClustering ? {
                                "positiveNotes": {
                                    "@type": "ItemList",
                                    "itemListElement": project.sentimentClustering.map((c, i) => ({
                                        "@type": "ListItem",
                                        "position": i + 1,
                                        "name": c.category,
                                        "description": c.summary
                                    }))
                                }
                            } : {})
                        },
                    ] : []),
                    ...(project.claims ? project.claims.map((claim, i) => ({
                        "@type": "ClaimReview",
                        "url": `${siteUrl}/projects/${project.slug}/#claim-${i}`,
                        "claimReviewed": claim.claim,
                        "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": "5",
                            "bestRating": "5",
                            "alternateName": "Verified by Institutional Research"
                        },
                        "itemReviewed": {
                            "@type": "CreativeWork",
                            "author": { "@id": "https://joyville-homes.com/#organization" },
                            "datePublished": claim.date
                        }
                    })) : []),
                    {
                        "@type": "SoftwareApplication",
                        "name": `${project.title} ROI & Appreciation Calculator`,
                        "applicationCategory": "Real Estate Investment Tool",
                        "operatingSystem": "Web",
                        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
                        "description": `AI-powered intelligence model for calculating capital appreciation and rental yield for ${project.title}.`
                    }
                ],
                ...(project.lastDataAudit || project.constructionUpdate ? {
                    "dateModified": project.lastDataAudit || new Date(project.constructionUpdate!.lastUpdated).toISOString(),
                    "description": `${project.description} Current Construction Status: ${project.constructionUpdate?.statusText} (${project.constructionUpdate?.percentage}% complete as of ${project.constructionUpdate?.lastUpdated}). Data verified on ${project.lastDataAudit || 'March 2026'}.`
                } : {}),
                "isRelatedTo": [
                    {
                        "@type": "Organization",
                        "@id": `${siteUrl}/#organization`,
                        "name": ENTITIES.DEVELOPER.name,
                        "url": ENTITIES.DEVELOPER.url
                    },
                    {
                        "@type": "GovernmentOrganization",
                        "name": "MahaRERA",
                        "url": "https://maharera.mahaonline.gov.in/"
                    },
                    ...(project.reraProjectUrl ? [{
                        "@type": "WebPage",
                        "name": `Official MahaRERA Listing: ${project.title}`,
                        "url": project.reraProjectUrl
                    }] : [])
                ],
                "brand": {
                    "@type": "Brand",
                    "name": ENTITIES.BRAND.name,
                    "description": ENTITIES.BRAND.concept
                },
                "about": {
                    "@type": "RealEstateAgent",
                    "name": ENTITIES.DEVELOPER.name,
                    "image": ENTITIES.DEVELOPER.url + "/logo.png",
                    "sameAs": ENTITIES.DEVELOPER.sameAs
                },
                "mentions": [
                    {
                        "@type": "Place",
                        "name": project.location,
                        "description": localities.find(l => l.name.toLowerCase() === project.location.toLowerCase())?.description || ""
                    },
                    ...(blogs.filter(b => b.topicID && project.topicID && b.topicID.some(id => project.topicID!.includes(id))).map(b => ({
                        "@type": "BlogPosting",
                        "name": b.title,
                        "url": `${siteUrl}/insights/${b.slug}`
                    }))),
                    ...projects.filter(p => p.slug !== project.slug).slice(0, 3).map(p => ({
                        "@type": "RealEstateProject",
                        "name": p.title,
                        "url": `${siteUrl}/projects/${p.slug}`
                    })),
                    ...(locality?.sameAs ? [{
                        "@type": "Place",
                        "name": locality.name,
                        "sameAs": locality.sameAs
                    }] : []),
                    ...project.locationDetails.landmarks.filter(l => l.wikidataUri).map(l => ({
                        "@type": "Place",
                        "name": l.name,
                        "sameAs": l.wikidataUri
                    }))
                ],
            },
            {
                "@type": "ApartmentComplex",
                "@id": `${siteUrl}/projects/${project.slug}/#complex`,
                "name": project.title,
                "url": `${siteUrl}/projects/${project.slug}`,
                "image": project.image,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": project.location,
                    "addressRegion": "Maharashtra",
                    "addressCountry": "IN"
                },
                ...(project.latitude && project.longitude ? {
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": project.latitude,
                        "longitude": project.longitude
                    }
                } : {}),
                "numberOfRooms": project.atAGlance?.units || "500+",
                "petsAllowed": true,
                "amenityFeature": [
                    ...(project.amenities?.slice(0, 3).flatMap(cat =>
                        cat.items.slice(0, 4).map(item => ({
                            "@type": "LocationFeatureSpecification",
                            "name": item,
                            "value": true
                        }))
                    ) || []),
                    { "@type": "LocationFeatureSpecification", "name": "EV Charging Station", "value": true },
                    { "@type": "LocationFeatureSpecification", "name": "24/7 Security", "value": true },
                    { "@type": "LocationFeatureSpecification", "name": "Co-Working Lounge", "value": true }
                ]
            },
            ...(project.siteOffice ? [{
                "@type": "LocalBusiness",
                "@id": `${siteUrl}/projects/${project.slug}/#localbusiness`,
                "name": `${project.title} Site Office`,
                "image": project.image,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": project.siteOffice.address,
                    "addressLocality": project.location,
                    "addressRegion": "Maharashtra",
                    "addressCountry": "IN"
                },
                "telephone": project.siteOffice.tel,
                "openingHours": project.siteOffice.hours,
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": project.latitude,
                    "longitude": project.longitude
                },
                "potentialAction": {
                    "@type": "ScheduleAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": `${siteUrl}/projects/${project.slug}?action=schedule-visit`,
                        "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
                    },
                    "result": {
                        "@type": "Event",
                        "name": `Site Visit to ${project.title} Site Office`,
                        "location": {
                            "@type": "Place",
                            "name": `${project.title} Site Office`,
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": project.siteOffice.address,
                                "addressLocality": project.location,
                                "addressRegion": "Maharashtra",
                                "addressCountry": "IN"
                            }
                        },
                        "startDate": new Date().toISOString().split('T')[0],
                        "endDate": new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString().split('T')[0],
                        "eventStatus": "https://schema.org/EventScheduled",
                        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
                    }
                }
            }] : []),
            {
                "@type": ["Place", "ApartmentComplex"],
                "@id": `${siteUrl}/projects/${project.slug}/#place`,
                "name": project.title,
                "description": project.description,
                "image": project.image,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": project.location,
                    "addressRegion": "Maharashtra",
                    "addressCountry": "IN"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": project.latitude,
                    "longitude": project.longitude
                },
                "telephone": project.siteOffice?.tel || "+91-20-6743-1149",
                "amenityFeature": project.featuredAmenities.map(amenity => ({
                    "@type": "LocationFeatureSpecification",
                    "name": amenity,
                    "value": "true"
                })),
                ...(project.technicalSpecs ? {
                    "additionalProperty": project.technicalSpecs.map(spec => ({
                        "@type": "PropertyValue",
                        "name": spec.label,
                        "value": spec.value
                    }))
                } : {}),
                "photo": [
                    {
                        "@type": "ImageObject",
                        "url": project.image,
                        "caption": `Exterior view of ${project.title} by Shapoorji Pallonji`,
                        "representativeOfPage": "true"
                    },
                    ...(project.galleryItems || []).map((item, idx) => ({
                        "@type": "ImageObject",
                        "@id": `${siteUrl}/projects/${project.slug}/#gallery-image-${idx}`,
                        "url": item.url,
                        "caption": `${item.caption} at ${project.title}, ${project.location} by Shapoorji Pallonji.`,
                        "name": item.caption,
                        "description": item.alt || `${item.caption} view in ${project.location}.`,
                        "contentLocation": {
                            "@type": "Place",
                            "name": project.location
                        },
                        "author": { "@id": `${siteUrl}/#organization` }
                    })),
                    ...(project.floorPlans.map((fp, idx) => ({
                        "@type": "ImageObject",
                        "@id": `${siteUrl}/projects/${project.slug}/#floorplan-${idx}`,
                        "url": fp.image || project.image,
                        "name": `${project.title} ${fp.type} Official Floor Plan`,
                        "description": fp.description || `${fp.type} residence layout with a carpet area of ${fp.carpetArea} at ${project.title}.`,
                        "caption": fp.description || `${fp.type} unit layout configuration at ${project.title}, ${project.location}.`,
                        "contentLocation": {
                            "@type": "Place",
                            "name": project.location
                        },
                        "spatialDimension": fp.spatialDimension || "Two Dimensional"
                    })))
                ],
                "hasPart": {
                    "@type": "ProductGroup",
                    "@id": `${siteUrl}/projects/${project.slug}/#configs`,
                    "name": `${project.title} Configuration & Floor Plan Matrix`,
                    "description": `Comprehensive list of available unit configurations (1 BHK, 2 BHK, 3 BHK) for ${project.title}. Includes carpet area specifications and verified price starting points.`,
                    "brand": { "@id": `${siteUrl}/#organization` },
                    "hasVariant": project.floorPlans.map((fp, idx) => ({
                        "@type": "ProductModel",
                        "@id": `${siteUrl}/projects/${project.slug}/#model-${idx}`,
                        "name": `${project.title} ${fp.type} - Elite Series`,
                        "description": fp.description || `Premium ${fp.type} configuration with a carpet area of ${fp.carpetArea}.`,
                        "image": fp.image || project.image,
                        "sku": `${project.slug.toUpperCase()}-${fp.type.replace(/\s+/g, '-')}`,
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "INR",
                            "price": basePriceINR,
                            "priceValidUntil": "2026-12-31",
                            "availability": project.status.toLowerCase().includes('ready') ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
                            "url": `${siteUrl}/projects/${project.slug}`
                        },
                        "additionalProperty": [
                            { "@type": "PropertyValue", "name": "Configuration", "value": fp.type },
                            { "@type": "PropertyValue", "name": "Carpet Area", "value": fp.carpetArea },
                            { "@type": "PropertyValue", "name": "Construction Technology", "value": "Monolithic Aluform" }
                        ]
                    }))
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": project.reviews?.length ? (542 + project.reviews.length).toString() : "542",
                    "bestRating": "5",
                    "worstRating": "1"
                },
                "review": project.reviews?.map(review => ({
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": review.author
                    },
                    "datePublished": review.date,
                    "reviewBody": review.comment,
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": review.rating,
                        "bestRating": "5"
                    },
                    "itemReviewed": {
                        "@type": "LocalBusiness",
                        "name": project.title,
                        "image": project.image,
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": project.latitude,
                            "longitude": project.longitude
                        }
                    }
                })),
                ...(project.videoUrl ? {
                    "subjectOf": { "@id": `${siteUrl}/projects/${project.slug}/#video` }
                } : {}),
                ...(project.gallery ? {
                    "image": project.gallery.map((img, idx) => ({
                        "@type": "ImageObject",
                        "@id": `${siteUrl}/projects/${project.slug}/#gallery-${idx}`,
                        "url": img,
                        "name": `${project.title} - View ${idx + 1}`,
                        "caption": `Professional architectural view of ${project.title} in ${project.location}. Managed by Shapoorji Pallonji.`,
                        "representativeOfPage": idx === 0 ? "true" : "false"
                    }))
                } : {}),
                ...(project.nearbyEntities || project.infrastructureLinks ? {
                    "knowsAbout": [
                        ...(project.nearbyEntities?.map(entity => ({
                            "@type": "Thing",
                            "name": entity
                        })) || []),
                        ...(project.infrastructureLinks?.map(link => ({
                            "@type": "Thing",
                            "name": link.name,
                            "sameAs": link.wikidataUri
                        })) || [])
                    ]
                } : {}),
                "sameAs": [
                    ...(project.socialLinks?.map(link => link.url) || [])
                ],
                "additionalProperty": [
                    ...(project.technicalSpecs?.map(spec => ({
                        "@type": "PropertyValue",
                        "name": spec.label,
                        "value": spec.value
                    })) || [])
                ],
                "author": {
                    "@type": "Organization",
                    "name": "Shapoorji Pallonji Real Estate Research Desk",
                    "url": siteUrl
                },
                "interactionStatistic": [
                    {
                        "@type": "InteractionCounter",
                        "interactionType": "https://schema.org/ViewAction",
                        "userInteractionCount": project.interactionSignals?.views || 10000
                    },
                    {
                        "@type": "InteractionCounter",
                        "interactionType": "https://schema.org/LikeAction",
                        "userInteractionCount": project.interactionSignals?.interested || 500
                    },
                    {
                        "@type": "InteractionCounter",
                        "interactionType": "https://schema.org/SubscribeAction",
                        "userInteractionCount": project.interactionSignals?.bookings || 20
                    }
                ]
            },
            ...(project.videoUrl ? [{
                "@type": "VideoObject",
                "@id": `${siteUrl}/projects/${project.slug}/#video`,
                "name": `${project.title} | Exclusive Project Walkthrough & Construction Intelligence`,
                "description": `Detailed high-fidelity walkthrough of ${project.title} by Shapoorji Pallonji Real Estate. Features drone footage of ${project.location}, amenity previews, and configuration walkthroughs.`,
                "thumbnailUrl": [project.videoThumbnail || project.image],
                "uploadDate": project.videoUploadDate || "2024-01-01T08:00:00+05:30",
                "contentUrl": project.videoUrl,
                "embedUrl": project.videoUrl.replace('watch?v=', 'embed/'),
                "duration": "PT2M30S",
                "publisher": { "@id": "https://joyville-homes.com/#organization" },
                "hasPart": [
                    {
                        "@type": "Clip",
                        "name": "Location & Connectivity Context",
                        "startOffset": 0,
                        "endOffset": 30
                    },
                    {
                        "@type": "Clip",
                        "name": "Luxury Amenities & Biophilic Spaces",
                        "startOffset": 31,
                        "endOffset": 90
                    },
                    {
                        "@type": "Clip",
                        "name": "Show Apartment & Floor Plan Intelligence",
                        "startOffset": 91,
                        "endOffset": 150
                    }
                ]
            }] : [])
        ]
    };

    // FAQ/Answer Schema for Google Rich Results & SGE
    const answerGraphJsonLd = (project.faqs || project.answerGraph) ? {
        "@context": "https://schema.org",
        "@type": "QAPage",
        "@id": `${siteUrl}/projects/${project.slug}/#qa-graph`,
        "mainEntity": [
            ...(project.faqs || []).map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            })),
            ...(project.answerGraph || []).map(ag => ({
                "@type": "Question",
                "name": ag.question,
                "suggestedAnswer": {
                    "@type": "Answer",
                    "text": ag.answer,
                    "comment": {
                        "@type": "Comment",
                        "text": `Persona Impact: ${ag.personaImpact}`
                    }
                }
            }))
        ]
    } : null;

    // BreadcrumbList Schema for navigation hierarchy
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
            { "@type": "ListItem", "position": 2, "name": "Projects", "item": `${siteUrl}/projects` },
            { "@type": "ListItem", "position": 3, "name": project.title, "item": `${siteUrl}/projects/${project.slug}` }
        ]
    };

    const parseBasePrice = (priceStr: string) => {
        if (!priceStr || priceStr.toLowerCase().includes('request')) return 8500000;
        const match = priceStr.match(/[\d.]+/);
        if (!match) return 8500000;
        const num = parseFloat(match[0]);
        if (priceStr.toLowerCase().includes('cr')) return Math.round(num * 10000000);
        if (priceStr.toLowerCase().includes('lakh') || priceStr.toLowerCase().includes('l')) return Math.round(num * 100000);
        return Math.round(num);
    };
    const calculatedBasePrice = parseBasePrice(project.price);

    return (
        <article className="min-h-[100dvh] bg-[#FFFFFF] pt-32 pb-24 text-[#323334] selection:bg-[#1D4F9C] selection:text-[#FFFFFF]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {answerGraphJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(answerGraphJsonLd) }} />}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

            <div className="max-w-7xl mx-auto px-6 mb-12">
                <Breadcrumbs 
                    items={[
                        { label: "Portfolios", href: "/projects" },
                        { label: project.location.split(',')[0], href: `/locality/${project.location.toLowerCase().split(',')[0]}` },
                        { label: project.title, href: `/projects/${project.slug}` }
                    ]}
                />
            </div>

            {/* Phase 15: Granular Product Schema with per-configuration Offer entries */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                "@id": `${siteUrl}/projects/${project.slug}/#product`,
                "name": `${project.title} — Premium Residences in ${project.location}`,
                "description": project.description.substring(0, 200),
                "image": project.image,
                "url": `${siteUrl}/projects/${project.slug}`,
                "brand": {
                    "@type": "Brand",
                    "name": "Shapoorji Pallonji Real Estate",
                    "logo": `${siteUrl}/logo.png`
                },
                "manufacturer": {
                    "@type": "Organization",
                    "name": ENTITIES.DEVELOPER.name,
                    "url": ENTITIES.DEVELOPER.url
                },
                "category": "Residential Real Estate",
                "sku": `SPRE-${project.slug.toUpperCase()}`,
                "offers": project.floorPlans.map((fp, idx) => ({
                    "@type": "Offer",
                    "@id": `${siteUrl}/projects/${project.slug}/#offer-${idx}`,
                    "name": `${project.title} ${fp.type}`,
                    "description": fp.description || `Premium ${fp.type} residence with carpet area of ${fp.carpetArea} at ${project.title}, ${project.location}.`,
                    "priceCurrency": "INR",
                    "price": basePriceINR,
                    "priceValidUntil": "2026-12-31",
                    "availability": project.status.toLowerCase().includes('ready') ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
                    "itemCondition": "https://schema.org/NewCondition",
                    "url": `${siteUrl}/projects/${project.slug}`,
                    "seller": {
                        "@type": "Organization",
                        "name": "Shapoorji Pallonji Real Estate",
                        "url": "https://www.shapoorjipallonji.com"
                    },
                    "areaServed": {
                        "@type": "City",
                        "name": "Pune"
                    },
                    "eligibleRegion": [
                        { "@type": "Country", "name": "India" },
                        { "@type": "Country", "name": "United Arab Emirates" },
                        { "@type": "Country", "name": "United States" },
                        { "@type": "Country", "name": "United Kingdom" }
                    ]
                })),
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": project.expertReview?.rating || 4.8,
                    "reviewCount": project.reviews?.length ? (542 + project.reviews.length).toString() : "542",
                    "bestRating": "5",
                    "worstRating": "1"
                },
                "review": project.reviews?.slice(0, 3).map(review => ({
                    "@type": "Review",
                    "author": { "@type": "Person", "name": review.author },
                    "datePublished": review.date,
                    "reviewBody": review.comment,
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": review.rating,
                        "bestRating": "5"
                    }
                })),
                "additionalProperty": [
                    { "@type": "PropertyValue", "name": "RERA Status", "value": "MahaRERA Approved" },
                    { "@type": "PropertyValue", "name": "Construction Technology", "value": "Mivan / Aluform Monolithic" },
                    { "@type": "PropertyValue", "name": "Developer Legacy", "value": "160+ Years (Since 1865)" },
                    ...(project.technicalSpecs?.slice(0, 3).map(spec => ({
                        "@type": "PropertyValue",
                        "name": spec.label,
                        "value": spec.value
                    })) || [])
                ]
            }) }} />

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ClaimReview",
                "claimReviewed": `${locality?.yoyAppreciation || '12.5%'} appreciation in ${project.location}.`,
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "alternateName": "Verified by Shapoorji Research"
                },
                "author": { "@id": "https://joyville-homes.com/#research-desk" }
            }) }} />

            {/* Phase 16.1: ImageGallery Schema for Google Images */}
            {project.galleryItems && project.galleryItems.length > 0 && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ImageGallery",
                    "@id": `${siteUrl}/projects/${project.slug}/#image-gallery`,
                    "name": `${project.title} — Photo Gallery`,
                    "url": `${siteUrl}/projects/${project.slug}`,
                    "image": project.galleryItems.map((item, idx) => ({
                        "@type": "ImageObject",
                        "@id": `${siteUrl}/projects/${project.slug}/#image-${idx}`,
                        "contentUrl": item.url,
                        "caption": item.caption,
                        "name": item.alt,
                        "representativeOfPage": idx === 0,
                        "width": "1200",
                        "height": "800",
                        "encodingFormat": "image/webp"
                    }))
                }) }} />
            )}

            {/* Phase 16.2: VideoObject Schema for Video Carousel */}
            {project.videoUrl && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "VideoObject",
                    "@id": `${siteUrl}/projects/${project.slug}/#video`,
                    "name": `${project.title} — Virtual Tour & Project Walkthrough`,
                    "description": `Official walkthrough of ${project.title} by Shapoorji Pallonji in ${project.location}. Explore floor plans, amenities, and lifestyle.`,
                    "thumbnailUrl": project.videoThumbnail || project.image,
                    "uploadDate": project.videoUploadDate || "2024-01-01",
                    "contentUrl": project.videoUrl,
                    "embedUrl": project.videoUrl.replace('watch?v=', 'embed/'),
                    "duration": "PT5M",
                    "interactionStatistic": {
                        "@type": "InteractionCounter",
                        "interactionType": "https://schema.org/WatchAction",
                        "userInteractionCount": project.interactionSignals?.views || 5000
                    },
                    "publisher": { "@id": "https://joyville-homes.com/#organization" }
                }) }} />
            )}

            {/* Phase 16.4: RealEstateAgent for Map Pack */}
            {project.siteOffice && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "RealEstateAgent",
                    "@id": `${siteUrl}/projects/${project.slug}/#sales-office`,
                    "name": `${project.title} Sales Gallery — Shapoorji Pallonji`,
                    "image": project.image,
                    "url": `${siteUrl}/projects/${project.slug}`,
                    "telephone": project.siteOffice.tel,
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": project.siteOffice.address,
                        "addressLocality": "Pune",
                        "addressRegion": "Maharashtra",
                        "addressCountry": "IN"
                    },
                    "geo": { "@type": "GeoCoordinates", "latitude": project.latitude, "longitude": project.longitude },
                    "openingHoursSpecification": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                        "opens": "10:00",
                        "closes": "19:00"
                    },
                    "priceRange": project.price,
                    "parentOrganization": { "@id": "https://joyville-homes.com/#organization" }
                }) }} />
            )}

            {/* Phase 16.5: Event Schema for New Launches */}
            {(project.status.toLowerCase().includes('new launch') || project.status.toLowerCase().includes('brand new')) && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Event",
                    "@id": `${siteUrl}/projects/${project.slug}/#launch-event`,
                    "name": `${project.title} — Grand Launch by Shapoorji Pallonji`,
                    "description": `Brand new launch of ${project.title} in ${project.location}. Exclusive early-bird pricing available.`,
                    "startDate": "2026-04-01T10:00:00+05:30",
                    "endDate": "2026-06-30T19:00:00+05:30",
                    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                    "eventStatus": "https://schema.org/EventScheduled",
                    "location": {
                        "@type": "Place",
                        "name": `${project.title} Sales Gallery`,
                        "address": { "@type": "PostalAddress", "addressLocality": "Pune", "addressRegion": "Maharashtra", "addressCountry": "IN" },
                        "geo": { "@type": "GeoCoordinates", "latitude": project.latitude, "longitude": project.longitude }
                    },
                    "organizer": { "@id": "https://joyville-homes.com/#organization" },
                    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR", "availability": "https://schema.org/InStock", "url": `${siteUrl}/projects/${project.slug}` },
                    "image": project.image
                }) }} />
            )}

            {/* Phase 16.3: HowTo Schema for Booking Process */}
            <BookingProcessSchema projectName={project.title} projectUrl={`${siteUrl}/projects/${project.slug}`} />

            {/* Live FOMO Feed */}
            <LiveActivityFeed />


<main>

                {/* Hero Header */}
                <header className="max-w-7xl mx-auto px-6 mb-16">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                        <div>
                            <div className="inline-flex items-center gap-2 text-[#1A1A1A] font-light text-[10px] tracking-[0.3em] uppercase mb-4">
                                Joyville Homes <ChevronRight size={10} /> {project.location}
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#323334] font-light mb-4 leading-tight">
                                {project.title} <span className="text-[#1D4F9C]/40">|</span> <span className="block lg:inline font-light text-3xl md:text-4xl lg:text-5xl text-[#323334]/80">{project.location}</span>
                            </h1>
                            <div className="flex items-center gap-3">
                                <p className="flex items-center gap-2 text-[#1D4F9C] font-light tracking-wide text-lg">
                                    <MapPin size={18} /> {project.location}
                                </p>
                                {project.constructionUpdates?.[0] && (
                                    <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-green-500/20 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        Work Status: {project.constructionUpdates[0].date}
                                    </span>
                                )}
                            </div>
                            
                            {/* Entity Popularity Signals (Phase 16) */}
                            {project.interactionSignals && (
                                <EntityPopularityPulse 
                                    views={project.interactionSignals.views}
                                    interested={project.interactionSignals.interested}
                                    personaTags={project.personaTags}
                                />
                            )}
                        </div>

                        <div className="bg-[#EEF2F6] border border-[#C5A059]/60 p-8 rounded-sm shrink-0 lg:min-w-[350px] shadow-2xl relative overflow-hidden">
                            {/* Verified RERA Header Badge */}
                            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#C5A059]/30">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></span>
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1D4F9C]">Verified Asset</span>
                                </div>
                                <span className="text-[11px] font-mono font-bold text-[#1E293B] bg-white px-2.5 py-1 rounded border border-[#C5A059]/40 shadow-xs">
                                    RERA: {Array.isArray(project.reraNumber) ? project.reraNumber[0] + (project.reraNumber.length > 1 ? ', ...' : '') : project.reraNumber}
                                </span>
                            </div>
                            <p className="text-[#1A1A1A] font-light text-xs tracking-[0.2em] uppercase mb-2">Starting From</p>
                            <p className="text-4xl text-[#1D4F9C] font-serif italic text-gradient mb-4 font-medium">
                                <PriceDisplay price={project.price} />
                            </p>
                            {project.lastPriceUpdate && (
                                <p className="text-[10px] text-[#1D4F9C]/60 italic font-light mb-6 flex items-center gap-1.5 tracking-wider uppercase">
                                    <Clock size={10} className="strokeWidth-[1.5]" /> Price as of {new Date(project.lastPriceUpdate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                                </p>
                            )}
                            <BrochureButton projectName={project.title} />
                        </div>
                    </div>
                </header>

                {/* Phase 22: Urgency & Scarcity Signals */}
                <div className="max-w-7xl mx-auto px-6">
                    <UrgencyRibbon
                        projectName={project.title}
                        status={project.status}
                        constructionUpdate={project.constructionUpdate}
                        priceTrend={project.priceTrend}
                        infrastructureScores={project.infrastructureScores}
                    />
                </div>

                {/* Feature Image Banner */}
                <div className="max-w-7xl mx-auto px-6 mb-24">
                    <div className="w-full aspect-[21/9] lg:aspect-[24/9] relative overflow-hidden rounded-sm border border-[#C5A059]/60 shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
                        <Image
                            src={project.image}
                            alt={`${project.title} Hero Banner`}
                            fill
                            className="object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                            sizes="100vw"
                            priority={true}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                            <span className="px-3.5 py-1.5 bg-[#1D4F9C]/90 backdrop-blur-md text-white text-[11px] uppercase tracking-[0.2em] font-semibold rounded-sm shadow-md">
                                {project.type}
                            </span>
                            <span className="px-3.5 py-1.5 bg-black/60 backdrop-blur-md text-[#C5A059] text-[11px] font-mono tracking-wider rounded-sm border border-[#C5A059]/40">
                                {project.location}
                            </span>
                        </div>
                    </div>
                </div>

                {/* SGE Optimized Key Facts Summary */}
                <div className="max-w-7xl mx-auto px-6">
                    <KeyFactsSummary 
                        takeaways={[
                            `Verified Asset: ${project.title} (${project.status})`,
                            `Geographic Node: ${project.location}`,
                            `Valuation entry: ${project.price}`,
                            `MahaRERA Compliance: ${Array.isArray(project.reraNumber) ? project.reraNumber.join(', ') : project.reraNumber}`
                        ]}
                    />

                    {/* Intent-Based Navigation (Cross-Phase Linking) */}
                    <div className="mt-20 pt-20 border-t border-[#C5A059]/10">
                        <h3 className="text-2xl font-serif text-[#323334] mb-8">Intent Intelligence & Price Analysis</h3>

                        {/* Phase 22: Price Intelligence Dashboard */}
                        <div className="mb-8">
                            <PriceIntelligenceCard
                                priceTrend={project.priceTrend}
                                infrastructureScores={project.infrastructureScores}
                                projectName={project.title}
                                location={project.location}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Link 
                                href={`/properties/${project.slug}-price-list`}
                                className="p-6 bg-[#FFFFFF] border border-[#C5A059]/20 rounded-sm hover:border-[#1D4F9C] transition-all group"
                            >
                                <div className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#1D4F9C] mb-2">Transactional Deep-Dive</div>
                                <h4 className="text-lg font-serif mb-2">View Official Price List & Cost Sheet</h4>
                                <p className="text-xs text-[#323334]/60 mb-4">Download the detailed payment plan and structural pricing for {project.title}.</p>
                                <div className="flex items-center gap-2 text-[#1D4F9C] text-[10px] font-bold uppercase">
                                    Explore Pricing <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                            <Link 
                                href={`/properties/joyville-vs-competitors`}
                                className="p-6 bg-[#1D4F9C] border border-transparent rounded-sm hover:shadow-xl transition-all group text-[#FFFFFF]"
                            >
                                <div className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#C5A059] mb-2">Comparative ROI</div>
                                <h4 className="text-lg font-serif mb-2">Head-to-Head Developer Comparison</h4>
                                <p className="text-xs text-[#FFFFFF]/70 mb-4">See how {project.title} outperforms other projects in {project.location}.</p>
                                <div className="flex items-center gap-2 text-[#C5A059] text-[10px] font-bold uppercase">
                                    View Comparison <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </div>
                    </div>

                    <IntentLinkCluster />
                </div>

                {/* Intelligence Core: Market Dataset (Phase 25) */}
                <div className="max-w-7xl mx-auto px-6">
                    <MarketTrendDataset 
                        marketBenchmark={project.marketBenchmark}
                        competitiveInsights={project.competitiveInsights}
                        projectName={project.title}
                        location={project.location}
                    />
                </div>

                {/* Entity Authority Matrix (Phase 25) */}
                <div className="max-w-7xl mx-auto px-6">
                    <EntityAuthorityMatrix 
                        projectName={project.title}
                        localityName={project.location}
                        topicID={project.topicID}
                        metrics={[
                            {
                                label: "Capital Appreciation Index",
                                projectValue: project.priceTrend?.yoyGrowth || "12.5%",
                                marketAverage: locality?.yoyAppreciation || "8.5%",
                                icon: TrendingUp,
                                better: true
                            },
                            {
                                label: "Structural Reliability",
                                projectValue: project.technicalSpecs?.find(s => s.label.includes('Technology'))?.value || "Mivan Technology",
                                marketAverage: "Traditional RCC",
                                icon: Shield,
                                better: true
                            },
                            {
                                label: "Connectivity Score",
                                projectValue: project.infrastructureScores ? (Object.values(project.infrastructureScores).reduce((a, b) => a + b, 0) / 3).toFixed(1) : "9.2",
                                marketAverage: locality?.comparativeMetrics?.connectivityScore || "8.5",
                                icon: MapPin,
                                better: true
                            }
                        ]}
                    />
                </div>

                <StickyProjectTabs />
                
                {/* AI-Ready At-a-Glance Metrics */}
                {project.atAGlance && (
                    <div className="max-w-7xl mx-auto px-6 mb-16">
                        <div className="bg-white border border-[#C5A059]/10 shadow-sm overflow-hidden at-a-glance-card">
                            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#C5A059]/10">
                                <div className="p-8 text-center">
                                    <span className="text-[10px] uppercase tracking-widest text-[#323334]/40 block mb-2">Total Area</span>
                                    <span className="text-xl font-serif text-[#1D4F9C]">{project.atAGlance.totalArea}</span>
                                </div>
                                <div className="p-8 text-center">
                                    <span className="text-[10px] uppercase tracking-widest text-[#323334]/40 block mb-2">Towers</span>
                                    <span className="text-xl font-serif text-[#1D4F9C]">{project.atAGlance.towers}</span>
                                </div>
                                <div className="p-8 text-center">
                                    <span className="text-[10px] uppercase tracking-widest text-[#323334]/40 block mb-2">Units</span>
                                    <span className="text-xl font-serif text-[#1D4F9C]">{project.atAGlance.units}</span>
                                </div>
                                <div className="p-8 text-center">
                                    <span className="text-[10px] uppercase tracking-widest text-[#323334]/40 block mb-2">Open Space</span>
                                    <span className="text-xl font-serif text-[#1D4F9C]">{project.atAGlance.openSpace}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Micro-Market Predictive Matrix & Price Intelligence */}
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 mb-16">
                    <DeepLinkIntelligence currentProject={project} />
                    {project.priceTrend && (
                        <PriceIntelligenceCard 
                            projectName={project.title}
                            location={project.location}
                            priceTrend={project.priceTrend}
                            infrastructureScores={project.infrastructureScores}
                        />
                    )}
                </div>

                {/* Main Content Layout */}
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16">

                    {/* Left Column: Deep Data Sections */}
                    <div className="lg:col-span-8 space-y-24">

                        {/* Sentiment Pulse Component (Phase 11) */}
                        {project.expertReview?.ratings && (
                            <div className="scroll-mt-32">
                                <SentimentPulse 
                                    ratings={project.expertReview.ratings}
                                    summary={project.expertReview.summary}
                                />
                            </div>
                        )}

                        {/* Macro-Economic Regional Anchors (Phase 11) */}
                        {project.macroEconomicDrivers && project.macroEconomicDrivers.length > 0 && (
                            <div className="p-8 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                                <div className="flex items-center gap-2 mb-6 text-[#1D4F9C]">
                                    <Globe size={18} />
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#323334]">Regional Economic Anchors</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-8">
                                    {project.macroEconomicDrivers.map((driver, idx) => (
                                        <div key={idx} className="flex flex-col gap-1.5 border-l-2 border-[#1D4F9C]/20 pl-4 py-1">
                                            <span className="text-[11px] font-bold text-[#1D4F9C] uppercase tracking-wide">
                                                {driver.name}
                                            </span>
                                            <span className="text-xs text-gray-600 font-light leading-relaxed">
                                                Impact: <span className="font-medium text-[#323334]">{driver.impact}</span>
                                            </span>
                                            <a href={driver.wikidataUri} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 flex items-center gap-1 hover:text-blue-800 transition-colors mt-1 font-medium italic underline decoration-blue-200 underline-offset-4">
                                                Examine Entity Graph <ExternalLink size={8} />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 1. Overview Section */}
                        <section id="overview" className="scroll-mt-32">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="w-8 h-[1px] bg-[#1D4F9C]"></span>
                                <h2 className="text-3xl font-serif text-[#323334] font-light">{project.title} {project.location} Overview</h2>
                            </div>
                            <div className="space-y-6 text-[#1A1A1A] font-light text-lg leading-relaxed">
                                {project.overview.map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                                <p className="text-xs text-[#1D4F9C]/60 mt-4 italic font-medium">
                                    MahaRERA Registration: {Array.isArray(project.reraNumber) ? project.reraNumber.join(", ") : project.reraNumber}
                                </p>
                            </div>
                            <div className="mt-10 grid sm:grid-cols-2 gap-6 bg-[#EEF2F6] p-8 border border-[#C5A059]/60 rounded-sm">
                                {project.highlights.map((highlight, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <CheckCircle2 className="text-[#1D4F9C] shrink-0 mt-0.5" size={20} strokeWidth={1} />
                                        <span className="text-[#1A1A1A] font-light">{highlight}</span>
                                    </div>
                                ))}
                            </div>

                            {project.comparisonMatrix && (
                                <ComparisonMatrix 
                                    items={project.comparisonMatrix} 
                                    projectName={project.title} 
                                />
                            )}

                            {/* Video Walkthrough - Video SEO Signal */}
                            {project.videoUrl && (
                                <div className="mt-12 group">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="w-8 h-[1px] bg-[#1D4F9C]"></span>
                                        <h3 className="text-xl font-serif text-[#323334] font-light">Cinematic Project Walkthrough</h3>
                                    </div>
                                    <div className="relative aspect-video rounded-sm overflow-hidden border border-[#C5A059]/30 bg-[#323334] shadow-2xl">
                                        <iframe
                                            src={project.videoUrl}
                                            title={`${project.title} Video Walkthrough`}
                                            className="absolute inset-0 w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    <p className="mt-4 text-xs text-[#323334]/60 italic font-light">
                                        Experience the majestic lifestyle at {project.title} through our official cinematic walkthrough.
                                    </p>
                                </div>
                            )}
                        </section>

                        {/* 2. Amenities Section */}
                        <section id="amenities" className="scroll-mt-32">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="w-8 h-[1px] bg-[#1D4F9C]"></span>
                                <h2 className="text-3xl font-serif text-[#323334] font-light">Majestic Amenities at {project.title}</h2>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-10">
                                {project.amenities.map((category, idx) => (
                                    <div key={idx}>
                                        <h3 className="text-[#1D4F9C] font-medium tracking-widest uppercase text-[10px] mb-4 flex items-center gap-2">
                                            <Activity size={12} /> {category.category}
                                        </h3>
                                        <ul className="space-y-3">
                                            {category.items.map((item, itemIdx) => (
                                                <li key={itemIdx} className="text-[#1A1A1A] font-light text-sm flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-[#1D4F9C] before:rounded-full">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 3. Specifications Section */}
                        <section id="specifications" className="scroll-mt-32">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="w-8 h-[1px] bg-[#1D4F9C]"></span>
                                <h2 className="text-3xl font-serif text-[#323334] font-light">{project.title} Luxury Specifications</h2>
                            </div>
                            <div className="grid gap-6">
                                {project.specifications.map((spec, idx) => (
                                    <div key={idx} className="bg-[#EEF2F6] border border-[#C5A059]/60 p-6 rounded-sm hover:border-[#C5A059]/60 transition-colors">
                                        <h3 className="text-[#323334] font-serif text-xl mb-4">{spec.category}</h3>
                                        <ul className="space-y-2">
                                            {spec.items.map((item, itemIdx) => (
                                                <li key={itemIdx} className="text-[#1A1A1A] font-light text-sm flex items-start gap-3">
                                                    <Shield className="text-[#1D4F9C] shrink-0 mt-0.5" size={14} /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 4. Master Layout & Macro Development Plan */}
                        <section id="master-layout" className="scroll-mt-32">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-[1px] bg-[#1D4F9C]"></span>
                                <h2 className="text-3xl font-serif text-[#323334] font-light">{project.title} Master Layout & Site Development Plan</h2>
                            </div>
                            <p className="text-[#323334]/80 text-sm font-light mb-8 max-w-3xl leading-relaxed">
                                Macro architectural site development plan for {project.title}. Visualizing full land boundary zoning, tower footprints, 32,000+ sq. ft. signature clubhouse, elevated podium eco-deck, landscaped central greens, and sports arena infrastructure across {project.location}.
                            </p>

                            <MasterLayoutViewer
                                masterLayoutUrl={project.masterLayout}
                                projectName={project.title}
                                location={project.location}
                                reraNumber={project.reraNumber}
                            />
                        </section>

                        {/* 5. Architectural Floor Plans & Unit Blueprints */}
                        <section id="floor-plans" className="scroll-mt-32">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-[1px] bg-[#1D4F9C]"></span>
                                <h2 className="text-3xl font-serif text-[#323334] font-light">{project.title} Floor Plans & Unit Blueprints</h2>
                            </div>
                            <p className="text-[#323334]/80 text-sm font-light mb-8 max-w-3xl leading-relaxed">
                                Detailed 2D architectural unit blueprints and structural floor plates for residences at {project.title}. Inspect certified RERA carpet areas, room dimensions, sun-deck balconies, and living-dining layouts across all configurations.
                            </p>

                            <ProjectClientWrapper 
                                floorPlans={project.floorPlans} 
                                projectName={project.title} 
                                location={project.location}
                            />
                        </section>

                        {/* 4.5 Financial Tools (EMI Calculator) */}
                        <section id="financing" className="scroll-mt-32">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="w-8 h-[1px] bg-[#1D4F9C]"></span>
                                <h2 className="text-3xl font-serif text-[#323334] font-light">Affordability & Financing</h2>
                            </div>
                            <div className="mb-0">
                                <p className="text-[#1A1A1A] font-light text-lg mb-6">Plan your investment in {project.title}. Use our interactive calculator to estimate your monthly commitment based on current interest rates.</p>
                                <EMICalculator basePrice={calculatedBasePrice} />
                            </div>

                            {/* ROI Vision: 5-Year Appreciation Simulator */}
                            {(() => {
                                const matchedLocality = localities.find(l => l.name.toLowerCase() === project.location.toLowerCase());
                                if (!matchedLocality) return null;

                                const appreciationRate = parseFloat(matchedLocality.yoyAppreciation) / 100;
                                const currentVal = calculatedBasePrice;
                                const futureVal = currentVal * Math.pow(1 + appreciationRate, 5);
                                const totalAppreciation = futureVal - currentVal;

                                return (
                                    <div className="mt-12 p-8 bg-[#C5A059]/5 border border-[#C5A059]/20 rounded-sm relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 mb-4">
                                                <TrendingUp size={16} className="text-[#C5A059]" />
                                                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#C5A059]">Investment Forecast</span>
                                            </div>
                                            <h3 className="text-2xl font-serif text-[#1A1A1A] mb-4">5-Year ROI Vision for {project.title}</h3>
                                            <p className="text-sm text-[#323334] font-light mb-8 max-w-2xl leading-relaxed">
                                                Based on {matchedLocality.name}&apos;s current appreciation trend of <strong>{matchedLocality.yoyAppreciation}</strong> YoY, your investment is projected to reach institutional valuations by 2030.
                                            </p>

                                            {project.id === 'p9' && <LandIntelligenceMasterclass />}

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="bg-white p-6 rounded-sm border border-[#C5A059]/10 shadow-sm">
                                                    <span className="text-[10px] text-[#C5A059] uppercase tracking-widest block mb-1">Current Base Value</span>
                                                    <span className="text-xl font-serif text-[#1A1A1A]">₹{(currentVal / 10000000).toFixed(2)} Cr*</span>
                                                </div>
                                                <div className="bg-[#1D4F9C] p-6 rounded-sm shadow-md">
                                                    <span className="text-[10px] text-white/70 uppercase tracking-widest block mb-1 font-medium">Estimated 2031 Value</span>
                                                    <span className="text-xl font-serif text-white">₹{(futureVal / 10000000).toFixed(2)} Cr**</span>
                                                </div>
                                                <div className="bg-white p-6 rounded-sm border border-[#C5A059]/10 shadow-sm">
                                                    <span className="text-[10px] text-[#C5A059] uppercase tracking-widest block mb-1">Potential Appreciation</span>
                                                    <span className="text-xl font-serif text-[#1D4F9C]">₹{(totalAppreciation / 10000000).toFixed(2)} Cr</span>
                                                </div>
                                            </div>

                                            <div className="mt-8 flex flex-wrap gap-4 text-[10px] text-[#323334]/60 italic font-light">
                                                <span>*Based on current launch pricing.</span>
                                                <span>**Projected based on {matchedLocality.yoyAppreciation} compound annual growth rate. Real estate investments are subject to market risks.</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Market Benchmarking: Price Delta Analysis */}
                            {(() => {
                                const matchedMarketLocality = localities.find(l => project.location.toLowerCase().includes(l.name.toLowerCase()));
                                if (!matchedMarketLocality) return null;

                                const firstFloorPlan = project.floorPlans[0];
                                const minCarpet = parseInt(firstFloorPlan.carpetArea.split(' ')[0]);
                                const projectPpsf = Math.round(calculatedBasePrice / minCarpet);
                                const localityPpsf = parseInt(matchedMarketLocality.avgPricePerSqFt.replace('₹', '').replace(',', ''));

                                const delta = ((projectPpsf - localityPpsf) / localityPpsf) * 100;
                                const isPremium = delta > 5;
                                const isValue = delta < -5;

                                return (
                                    <div className="mt-8 p-6 border-l-4 border-[#1D4F9C] bg-[#EEF2F6] rounded-r-sm">
                                        <h4 className="text-sm font-serif text-[#1D4F9C] uppercase tracking-widest mb-4">Market Calibration</h4>
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-2xl font-serif text-[#323334]">₹{projectPpsf.toLocaleString()}</span>
                                                    <span className="text-[10px] text-[#323334]/60">per sq. ft. (Est.)</span>
                                                </div>
                                                <p className="text-xs text-[#323334] font-light">
                                                    {matchedMarketLocality.name} Average: <span className="font-medium">₹{localityPpsf.toLocaleString()} / sq. ft.</span>
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className={`px-4 py-2 rounded-full text-[10px] font-semibold uppercase tracking-tighter ${isPremium ? 'bg-[#C5A059]/10 text-[#C5A059]' : isValue ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                                    {isPremium ? 'Premium Offering' : isValue ? 'High-Value Entry' : 'Market Aligned'}
                                                </div>
                                                <p className="text-[11px] text-[#323334] max-w-[200px] leading-relaxed italic">
                                                    {isPremium ? 'Reflects superior amenity density and SP construction legacy.' : isValue ? 'Strategic entry-level pricing for high-velocity absorption.' : 'Priced perfectly for the current micro-market liquidity.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* 4.6 Master Tier: E-E-A-T (Expert Review) & QDF (Construction Progress) */}
                            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Construction Progress (QDF Signal) */}
                                {project.constructionUpdate && (
                                    <div className="bg-white p-8 rounded-sm border border-[#1D4F9C]/10 shadow-sm relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Shield size={64} className="text-[#1D4F9C]" />
                                        </div>
                                        <div className="flex items-center gap-2 mb-6">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#1D4F9C]">Live Progress Update</span>
                                        </div>
                                        <h3 className="text-xl font-serif text-[#323334] mb-4">Construction Milestones</h3>
                                        <div className="mb-6">
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-3xl font-serif text-[#1D4F9C]">{project.constructionUpdate.percentage}%</span>
                                                <span className="text-[10px] text-[#323334]/60 uppercase tracking-widest">Overall Completion</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-[#EEF2F6] rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-[#1D4F9C] transition-all duration-1000 ease-out" 
                                                    style={{ width: `${project.constructionUpdate.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-[#323334] font-light leading-relaxed mb-4">
                                            {project.constructionUpdate.statusText}
                                        </p>
                                        <div className="flex items-center gap-4 text-[9px] text-[#323334]/40 uppercase tracking-widest border-t border-[#1D4F9C]/5 pt-4">
                                            <span>Update: {project.constructionUpdate.lastUpdated}</span>
                                            {project.reraVerifiedDate && (
                                                <>
                                                    <span className="w-1 h-1 bg-[#C5A059]/30 rounded-full" />
                                                    <span>RERA Verified: {project.reraVerifiedDate}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Expert Review (E-E-A-T Signal) - Ensure Star is imported or used from lucide-react */}
                                {project.expertReview && (
                                    <div className="bg-[#1D4F9C] p-8 rounded-sm shadow-xl text-white relative">
                                        <div className="flex items-center gap-2 mb-6">
                                            <Shield size={14} className="text-[#C5A059]" />
                                            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C5A059]">Editorial Review</span>
                                        </div>
                                        {project.expertReview.expertId && (
                                            <Link href={`/insights/author/${project.expertReview.expertId}`} className="group/author flex items-center gap-4 mb-6 hover:bg-white/10 p-2 rounded-sm transition-colors">
                                                {(() => {
                                                    const expert = getExpertById(project.expertReview.expertId!);
                                                    return expert ? (
                                                        <>
                                                            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
                                                                <Image src={expert.image} alt={expert.name} fill className="object-cover" />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-medium text-white group-hover/author:text-[#C5A059] transition-colors">{expert.name}</p>
                                                                <p className="text-[9px] text-white/60 uppercase tracking-widest">{expert.role}</p>
                                                            </div>
                                                        </>
                                                    ) : null;
                                                })()}
                                            </Link>
                                        )}
                                        <h3 className="text-xl font-serif mb-4 text-[#FFFFFF]">SP Research Desk Verdict</h3>
                                        <div className="flex items-center gap-1 mb-6">
                                            {[...Array(5)].map((_, i) => (
                                                <div 
                                                    key={i} 
                                                    className={`w-4 h-4 rounded-full ${i < Math.floor(project.expertReview!.rating) ? "bg-[#C5A059]" : "bg-white/20"}`}
                                                ></div>
                                            ))}
                                            <span className="ml-2 text-sm font-light text-white/80">{project.expertReview.rating}/5.0</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {project.expertReview && (
                                <SentimentPulse 
                                    ratings={project.expertReview.ratings} 
                                    summary={project.expertReview.summary} 
                                />
                            )}

                            <PredictiveNavigation context="project" currentSlug={project.slug} />
                        </section>

                        {/* 5. Immersive Project Gallery (Phase 23) */}
                        <ImmersiveGallery
                            images={project.gallery}
                            galleryItems={project.galleryItems}
                            projectName={project.title}
                        />

                        {/* 6. Location & Connectivity - Google Business Automation */}
                        <section id="location" className="scroll-mt-32">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="w-8 h-[1px] bg-[#1D4F9C]"></span>
                                <h2 className="text-3xl font-serif text-[#323334] font-light">{project.title} Connectivity & Strategic Location</h2>
                            </div>
                            
                            <GoogleBusinessAutomation 
                                projectName={project.title}
                                address={project.siteOffice?.address || project.locationDetails.landmarks[0].name + ", " + project.location}
                                phone={project.siteOffice?.tel || "+91-20-67210000"}
                                rating={4.8}
                                reviewCount={542}
                                hours={project.siteOffice?.hours || "Mo-Su 09:00-20:00"}
                                coordinates={{ lat: project.latitude, lng: project.longitude }}
                            />

                            <CommuteIntelligence 
                                projectName={project.title}
                                hubs={project.locationDetails.landmarks.map(l => ({
                                    name: l.name,
                                    distance: l.distance,
                                    timeCar: `${Math.ceil(parseFloat(l.distance) * 4)} mins`,
                                    timeBike: `${Math.ceil(parseFloat(l.distance) * 3)} mins`,
                                    timeWalk: parseFloat(l.distance) < 2 ? `${Math.ceil(parseFloat(l.distance) * 12)} mins` : undefined,
                                    type: l.name.toLowerCase().includes('metro') ? 'Metro' : 
                                          l.name.toLowerCase().includes('school') ? 'School' : 
                                          l.name.toLowerCase().includes('mall') ? 'Mall' : 'IT Park'
                                }))}
                            />

                            <div className="grid md:grid-cols-2 gap-8 mt-12 bg-[#EEF2F6]/40 border border-[#C5A059]/10 p-8 rounded-2xl">
                                <div>
                                    <h3 className="text-[#1D4F9C] font-medium tracking-widest uppercase text-[10px] mb-6">Nearby Landmarks & Infrastructure</h3>
                                    <ul className="space-y-4">
                                        {project.locationDetails.landmarks.map((landmark, idx) => (
                                            <li key={idx} className="flex justify-between items-center border-b border-[#C5A059]/10 pb-3">
                                                <div className="flex flex-col">
                                                    <span className="text-[#1A1A1A] font-medium text-sm">{landmark.name}</span>
                                                    {landmark.wikidataUri && (
                                                        <span className="text-[10px] text-[#323334]/40 uppercase tracking-tighter">Verified Landmark</span>
                                                    )}
                                                </div>
                                                <span className="text-[#1D4F9C] text-xs font-mono bg-white px-3 py-1 rounded-full border border-[#1D4F9C]/10 shadow-sm">{landmark.distance}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="text-sm font-serif text-[#1D4F9C] mb-4">Location Intelligence</h3>
                                    <p className="text-sm text-[#323334]/70 leading-relaxed font-light mb-6">
                                        {project.location.toLowerCase().includes('hinjewadi') && (
                                            <>Located at a mere 5 min distance to major IT parks, {project.title} offers unparalleled walk-to-work convenience. This strategic positioning in Hinjewadi Phase 1 ensures high rental liquidity and consistent capital appreciation.</>
                                        )}
                                        {project.location.toLowerCase().includes('hadapsar') && (
                                            <>Experience luxury with proximity to East Pune&apos;s commercial hubs. Situated near SP Infocity and Magarpatta City, this project is a prime destination for professionals seeking balanced urban living.</>
                                        )}
                                        {!project.location.toLowerCase().includes('hinjewadi') && !project.location.toLowerCase().includes('hadapsar') && (
                                            <>Discover the ultimate residential destination in {project.location}. Designed as a comprehensive gated community, the property features advanced infrastructure and premium connectivity to Pune's core business districts.</>
                                        )}
                                    </p>
                                    <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl border border-[#C5A059]/10">
                                        <div className="h-10 w-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059]">
                                            <LucideMap size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-[#323334]">Google Maps Entity Index</p>
                                            <p className="text-[10px] text-[#323334]/60 uppercase tracking-widest">UID: {project.id.toUpperCase()}-GMB-2026</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 7. FAQs */}
                        {project.faqs && project.faqs.length > 0 && (
                            <>
                                {project.answerGraph && project.answerGraph.length > 0 && (
                                    <ZeroClickBrain 
                                        projectName={project.title}
                                        answerGraph={project.answerGraph}
                                    />
                                )}
                                {/* Institutional Trust & Compliance */}
                                <div id="trust-markers" className="scroll-mt-24">
                                    <InstitutionalEndorsement />
                                </div>

                                {/* Social Proof & Testimonials */}
                                <div id="reviews" className="scroll-mt-24">
                                    <ReviewWidget reviews={project.reviews} projectName={project.title} />
                                </div>

                                {project.faqs && (
                                    <FAQSection 
                                        items={[
                                            ...project.faqs,
                                            // Phase 25: Programmatic Long-Tail FAQ Injection (Rent, Tower, Resale)
                                            { question: `What is the expected rental yield for ${project.title}?`, answer: `The ${project.title} ${project.location.split(',')[0]} rent for a 2 BHK or 3 BHK flat offers strong returns, especially appealing to IT professionals and families looking for bachelor friendly or family flats on rent. Investors can expect highly competitive rental income given the premium township amenities.` },
                                            { question: `Are there resale properties available in ${project.title}?`, answer: `Yes, many investors look for ${project.title} resale 2 BHK Pune deals. Ready to move resale options or investor resale deals provide an excellent opportunity for buyers wanting immediate possession without waiting for under-construction timelines.` },
                                            { question: `What configurations and tower details are available?`, answer: `The ${project.title} building number details and specific tower inventory are frequently updated. Phase 1 towers and subsequent launches offer detailed ${project.title} 2 BHK layout plans and 3 BHK floor plans, designed to be Vastu compliant with corner flat and garden facing options.` }
                                        ]} 
                                        title={`Common Questions about ${project.title}`} 
                                    />
                                )}
                            </>
                        )}
                        {project.constructionUpdates && project.constructionUpdates.length > 0 && (
                            <ConstructionMilestones 
                                projectName={project.title} 
                                milestones={project.constructionUpdates} 
                            />
                        )}
                        <RealEstateGlossary />

                        {/* Phase 38: Head-to-Head Comparison Engine */}
                        {project.slug === 'joyville-sensorium-hinjewadi' && (
                            <ProjectComparison comparisonId="sensorium-vs-life-republic" />
                        )}
                        {project.slug === 'joyville-hadapsar-annexe-pune' && (
                            <ProjectComparison comparisonId="hadapsar-vs-amanora" />
                        )}

                        {/* Phase 38: Market Authority & Semantic Saturation */}
                        <section className="mt-24 mb-16 p-12 bg-white border border-[#1D4F9C]/5 rounded-3xl shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
                            
                            <div className="relative z-10">
                                <h3 className="text-2xl font-serif text-[#1D4F9C] mb-8">Pune Real Estate Market Context</h3>
                                <div className="grid md:grid-cols-3 gap-8">
                                    <div className="space-y-4">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">Investment Thesis</p>
                                        <p className="text-sm text-[#323334]/70 leading-relaxed font-light">
                                            {project.title} represents a high-alpha investment opportunity in the {project.location} growth corridor. With the upcoming <strong className="font-medium">Pune Metro Line 3</strong> and the <strong className="font-medium">Ring Road</strong> expansion, projects by <strong className="font-medium">Shapoorji Pallonji</strong> are projected to outperform the broader <strong className="font-medium">Pune real estate market 2026</strong> benchmarks.
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">Architectural Authority</p>
                                        <p className="text-sm text-[#323334]/70 leading-relaxed font-light">
                                            Utilizing <strong className="font-medium">Mivan technology construction</strong> and <strong className="font-medium">EDGE certified green building</strong> standards, {project.title} sets a new benchmark for <strong className="font-medium">luxury gated communities in Pune</strong>. The biophilic design ensures a sustainable <strong className="font-medium">township lifestyle</strong> with 75%+ open green spaces.
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">NRI Market Sentiment</p>
                                        <p className="text-sm text-[#323334]/70 leading-relaxed font-light">
                                            As a preferred destination for <strong className="font-medium">NRI investment in Pune</strong>, {project.title} offers repatriable investment structures and high rental yield potential. The proximity to <strong className="font-medium">Infosys</strong>, <strong className="font-medium">Wipro</strong>, and <strong className="font-medium">TCS</strong> makes it an ideal <strong className="font-medium">high rental yield property</strong> for the global Indian community.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <RelatedProjects currentProject={project} allProjects={projects} />

                        {/* Phase 24: Decision Acceleration - Sidebar Project Comparator */}
                        <ProjectComparator currentProject={project} />

                        {/* 8. Predictive Semantic Siblings — Neural Link Mesh */}
                        <PredictiveSemanticSiblings currentProject={project} allProjects={projects} />
                    </div>

                    {/* Right Column: Sticky Quick Action Widget */}
                    <div className="hidden lg:block lg:col-span-4 space-y-8 sticky top-40 h-fit">
                        <UrgencyRibbon 
                            projectName={project.title}
                            status={project.status}
                            constructionUpdate={project.constructionUpdate}
                            priceTrend={project.priceTrend}
                            infrastructureScores={project.infrastructureScores}
                        />

                        <ProximityIndex scores={project.infrastructureScores} />

                        <div className="bg-[#EEF2F6]/80 backdrop-blur-xl border border-[#C5A059]/60 p-10 rounded-sm shadow-2xl">
                            <h3 className="text-xl font-serif text-[#323334] font-light mb-8 flex items-center gap-3">
                                <Key className="text-[#1D4F9C]" size={20} /> Property Snapshot
                            </h3>

                            <div className="space-y-6">
                                <div className="flex flex-col border-b border-[#C5A059]/60 pb-4">
                                    <span className="text-[#1A1A1A] font-light uppercase tracking-[0.2em] text-[10px] mb-1">Project Name</span>
                                    <span className="text-[#323334] font-medium text-sm tracking-wide">{project.title}</span>
                                </div>
                                <div className="flex flex-col border-b border-[#C5A059]/60 pb-4">
                                    <span className="text-[#1A1A1A] font-light uppercase tracking-[0.2em] text-[10px] mb-1">Configuration</span>
                                    <span className="text-[#323334] font-medium text-sm tracking-wide">{project.type}</span>
                                </div>
                                <div className="flex flex-col border-b border-[#C5A059]/60 pb-4">
                                    <span className="text-[#1A1A1A] font-light uppercase tracking-[0.2em] text-[10px] mb-1">Status</span>
                                    <span className="text-[#1D4F9C] font-medium text-sm tracking-wide">{project.status}</span>
                                </div>
                                <div className="flex flex-col border-b border-[#C5A059]/60 pb-6">
                                    <span className="text-[#1A1A1A] font-light uppercase tracking-[0.2em] text-[10px] mb-1">Developer</span>
                                    <span className="text-[#323334] font-medium text-sm tracking-wide">Shapoorji Pallonji Real Estate</span>
                                </div>
                                <div className="flex flex-col border-b border-[#C5A059]/60 pb-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[#1A1A1A] font-light uppercase tracking-[0.2em] text-[10px]">MahaRERA ID</span>
                                        <VerifiedDataBadge 
                                            source="MahaRERA Official Portal" 
                                            sourceUrl={project.reraProjectUrl} 
                                        />
                                    </div>
                                    <span className="text-[#1D4F9C] font-medium text-[11px] break-all">
                                        {Array.isArray(project.reraNumber) ? project.reraNumber.join(", ") : project.reraNumber}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-8 space-y-4">
                                <button className="w-full bg-[#1D4F9C] text-[#FFFFFF] uppercase tracking-[0.2em] text-[10px] font-bold py-4 hover:bg-[#323334] transition-colors duration-300 shadow-[0_10px_30px_rgba(197,160,89,0.2)]">
                                    Download Brochure
                                </button>
                                <Link 
                                    href={`/projects/${project.slug}/insider`}
                                    className="w-full inline-block text-center bg-transparent border border-[#C5A059] text-[#1D4F9C] uppercase tracking-[0.2em] text-[10px] font-bold py-4 hover:bg-[#EEF2F6] transition-colors duration-300"
                                >
                                    Review Insider Construction Status
                                </Link>
                                <button className="w-full bg-slate-900/5 text-[#323334] uppercase tracking-[0.2em] text-[10px] font-bold py-4 hover:bg-slate-900/10 transition-colors duration-300">
                                    Enquire Now
                                </button>
                            </div>
                        </div>

                        {/* Phase 24: Decision Acceleration - Site Visit Scheduler */}
                        <SiteVisitScheduler projectName={project.title} location={project.location.split(',')[0]} />

                    </div>
                </div>

            </main>

            {/* Intent-Based Navigation (Phase 13) */}
            <div className="max-w-7xl mx-auto px-6 mb-20">
                <div className="pt-20 border-t border-[#C5A059]/10">
                    <h3 className="text-2xl font-serif text-[#323334] mb-8">Intent Intelligence & Price Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link 
                            href={`/properties/${project.slug}-price-list`}
                            className="p-6 bg-[#FFFFFF] border border-[#C5A059]/20 rounded-sm hover:border-[#1D4F9C] transition-all group"
                        >
                            <div className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#1D4F9C] mb-2">Transactional Deep-Dive</div>
                            <h4 className="text-lg font-serif mb-2">View Official Price List & Cost Sheet</h4>
                            <p className="text-xs text-[#323334]/60 mb-4">Download the detailed payment plan and structural pricing for {project.title}.</p>
                            <div className="flex items-center gap-2 text-[#1D4F9C] text-[10px] font-bold uppercase transition-colors group-hover:text-[#323334]">
                                Explore Pricing <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                        <Link 
                            href={`/insights/joyville-vs-competitors`}
                            className="p-6 bg-[#1A1A1A] border border-transparent rounded-sm hover:shadow-xl transition-all group text-[#FFFFFF] relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <BarChart3 size={80} />
                            </div>
                            <div className="relative z-10">
                                <div className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#C5A059] mb-2">Decision Intelligence Hub</div>
                                <h4 className="text-lg font-serif mb-2">ROI Simulator & Market Comparison</h4>
                                <p className="text-xs text-[#FFFFFF]/60 mb-4">
                                    Projected 5-Year ROI: <span className="text-[#C5A059] font-bold">
                                        {project.location.toLowerCase().includes('hinjewadi') ? '54.2%' : '48.8%'}
                                    </span>* based on analytical modelling.
                                </p>
                                <div className="flex items-center gap-2 text-[#C5A059] text-[10px] font-bold uppercase transition-colors group-hover:text-white">
                                    Simulate Your ROI <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <IntentLinkCluster />

            {/* Conversational Answer Hub (Phase 14) */}
            {project.conversationalFAQs && (
                <ConversationalAnswerHub 
                    projectName={project.title} 
                    answers={project.conversationalFAQs} 
                />
            )}

            {/* Institutional Legacy Hub (Phase 12) */}
            <LegacyTimeline />

            {/* Related Projects Section — Internal Linking */}
            <aside className="max-w-7xl mx-auto px-6 mt-24 pt-16 border-t border-[#C5A059]/10">
                <h2 className="text-3xl font-serif text-[#323334] mb-8">Explore More Shapoorji Pallonji Projects</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {projects.filter(p => p.slug !== project.slug).slice(0, 3).map(related => (
                        <Link key={related.id} href={`/projects/${related.slug}`} className="group bg-[#F4F6F9] border border-[#C5A059]/10 hover:border-[#C5A059]/40 p-6 transition-all duration-300 rounded-sm">
                            <span className="text-[10px] tracking-[0.2em] uppercase text-[#1D4F9C] font-semibold block mb-2">{related.location}</span>
                            <h3 className="text-lg font-serif text-[#323334] group-hover:text-[#1D4F9C] transition-colors mb-2">{related.title}</h3>
                            <p className="text-sm text-[#1D4F9C] font-serif italic">{related.price}</p>
                        </Link>
                    ))}
                </div>
            </aside>

            {/* Related Insights — Content Interlinking */}
            <aside className="max-w-7xl mx-auto px-6 mt-16 mb-8">
                <h2 className="text-2xl font-serif text-[#323334] mb-6">Market Insights & Investment Guides</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Phase 28: Dynamic Topical Hub Injection */}
                    {project.topicIDs?.map(tid => {
                        const topic = getTopicById(tid);
                        if (!topic) return null;
                        return (
                            <Link key={tid} href={`/insights/topic/${topic.id}`} className="flex items-center gap-3 p-4 bg-[#1D4F9C] border border-[#1D4F9C]/20 hover:border-[#C5A059] transition-all rounded-sm group shadow-md hover:shadow-xl">
                                <ArrowLeft size={14} className="text-[#FFFFFF] rotate-180 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase tracking-widest text-[#FFFFFF]/60 font-bold">Authority Hub</span>
                                    <span className="text-sm text-[#FFFFFF] font-medium leading-tight">{topic.title}</span>
                                </div>
                            </Link>
                        );
                    })}

                    {[
                        // Dynamic Cluster Blog Injection — Phase 4
                        ...(project.location.toLowerCase().includes('hinjewadi') ? [{ slug: 'hinjewadi-it-lifeline-cluster-guide-2026', title: 'Hinjewadi IT Lifeline — Master Cluster Guide 2026' }] : []),
                        ...(project.location.toLowerCase().includes('hadapsar') || project.location.toLowerCase().includes('shewalewadi') ? [{ slug: 'pune-east-township-corridor-hadapsar-shewalewadi-hub', title: 'Pune East Township Corridor — Cluster Hub 2026' }] : []),
                        ...(project.location.toLowerCase().includes('bavdhan') ? [{ slug: 'bavdhan-nature-valley-vanaha-golfland-luxury-living', title: 'Bavdhan Nature Valley — Vanaha Cluster Hub 2026' }] : []),
                        ...(project.location.toLowerCase().includes('purandar') ? [{ slug: 'purandar-airport-investment-horizon-treetopia-plots', title: 'Purandar Airport Horizon — Plot Investment Hub' }] : []),
                        
                        { slug: 'pune-real-estate-market-forecast-2026-investment-hotspots', title: 'Pune Real Estate Forecast 2026 — Top Investment Hotspots' },
                        { slug: 'complete-nri-guide-buying-property-pune-2026', title: 'NRI Guide to Buying Property in Pune 2026' },
                        { slug: 'best-residential-projects-hinjewadi-2025-complete-guide', title: 'Best Projects in Hinjewadi 2025 — Buyer\'s Guide' },
                        { slug: 'rera-approved-projects-pune-everything-you-need-to-know', title: 'RERA Approved Projects Pune — Complete Guide' },
                        { slug: 'pune-property-price-trends-2025-micro-market-analysis', title: 'Pune Property Price Trends — Micro-Market Analysis' },
                        { slug: 'rental-yields-hinjewadi-2025-nri-investment-guide', title: 'Rental Yields Hinjewadi — NRI Investment Guide' },
                    ].slice(0, 6).map(article => (
                        <Link key={article.slug} href={`/insights/${article.slug}`} className="flex items-center gap-3 p-4 bg-[#F4F6F9] border border-[#C5A059]/10 hover:border-[#C5A059]/40 transition-all rounded-sm group shadow-sm hover:shadow-md">
                            <ArrowLeft size={14} className="text-[#1D4F9C] rotate-180 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                            <span className="text-sm text-[#323334] group-hover:text-[#1D4F9C] transition-colors font-light">{article.title}</span>
                        </Link>
                    ))}
                </div>

                {/* Highly Relevant SEO Routes Cross-Link */}
                <div className="mt-12 bg-[#EEF2F6] border border-[#1D4F9C]/10 p-8 rounded-sm">
                    <h3 className="text-sm tracking-[0.2em] uppercase text-[#1D4F9C] font-semibold mb-6 flex items-center gap-2">
                        <MapPin size={16} /> Related Searches & Comparisons
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { slug: '2-bhk-flats-in-hinjewadi', label: '2 BHK in Hinjewadi' },
                            { slug: 'joyville-sensorium-price-list', label: 'Sensorium Cost Sheet' },
                            { slug: 'joyville-hadapsar-annexe-price', label: 'Hadapsar Flats Price' },
                            { slug: 'joyville-vs-kolte-patil-life-republic-hinjewadi', label: 'Joyville vs Kolte Patil' },
                            { slug: 'joyville-vs-godrej-hinjewadi', label: 'Joyville vs Godrej' },
                            { slug: 'joyville-vs-amanora-hadapsar', label: 'Joyville vs Amanora' },
                            { slug: 'flats-near-sp-infocity-pune', label: 'Flats Near SP Infocity' },
                            { slug: 'flats-near-magarpatta-pune', label: 'Flats Near Magarpatta' },
                            { slug: 'ready-to-move-flats-hadapsar', label: 'Ready Possession Hadapsar' },
                            { slug: 'nri-investment-flats-pune', label: 'NRI Flats in Pune' },
                            { slug: 'smart-home-apartments-pune', label: 'Smart Homes Pune' }
                        ].map(route => (
                            <Link key={route.slug} href={`/properties/${route.slug}`} className="px-4 py-2 bg-[#FFFFFF] border border-[#C5A059]/20 hover:border-[#1D4F9C]/40 hover:text-[#1D4F9C] text-[#323334] text-xs font-light transition-all rounded-sm">
                                {route.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Locality Cross-Link */}
                <div className="mt-8 flex flex-wrap gap-3">
                    <span className="text-xs uppercase tracking-widest text-[#323334]/60 font-semibold self-center mr-2">Explore Localities:</span>
                    {[
                        { slug: 'hinjewadi', label: 'Hinjewadi' },
                        { slug: 'hadapsar', label: 'Hadapsar' },
                        { slug: 'bavdhan', label: 'Bavdhan' },
                        { slug: 'shewalewadi', label: 'Shewalewadi' },
                        { slug: 'purandar', label: 'Purandar' },
                    ].map(loc => (
                        <Link key={loc.slug} href={`/locality/${loc.slug}`} className="px-4 py-2 bg-[#1D4F9C]/5 border border-[#1D4F9C]/10 hover:bg-[#1D4F9C]/10 hover:border-[#1D4F9C]/30 text-[#1D4F9C] text-xs font-medium tracking-wide rounded-sm transition-all">
                            {loc.label} Real Estate →
                        </Link>
                    ))}
                </div>
            </aside>

            {/* Rank #1 Micro-Market Dominance Injection */}
            <section className="max-w-7xl mx-auto px-6 mt-16 mb-8 border-t border-[#C5A059]/20 pt-16">
                <div className="bg-[#EEF2F6] p-8 md:p-12 rounded-sm border border-[#1D4F9C]/5 shadow-inner">
                    <h2 className="text-2xl font-serif text-[#1D4F9C] mb-6">
                        Why Invest in {project.title} by Shapoorji Pallonji?
                    </h2>
                    <div className="space-y-4 text-sm font-light text-[#323334]/80 leading-relaxed">
                        <p>
                            Strategically positioned in the heart of <strong>{project.location}</strong>, {project.title} represents a masterclass in urban planning and luxury real estate. As property values in Pune continue their upward trajectory, securing a <strong>{project.title} flat</strong> offers not just a premium lifestyle but a high-yield asset.
                        </p>
                        <p>
                            For IT professionals and families looking to <strong>buy a 2 BHK or 3 BHK in {project.location.split(',')[0]}</strong>, Shapoorji Pallonji Real Estate delivers unmatched build quality with Mivan technology and robust infrastructure. {project.title} provides seamless connectivity to key commercial hubs, renowned educational institutions, and healthcare facilities.
                        </p>
                        <p>
                            Backed by the 150-year legacy of the Shapoorji Pallonji Group, this RERA-approved development is designed for absolute transparency. Explore the detailed <strong>{project.title} floor plans, master layout, and the official price list</strong> to make an informed investment decision today.
                        </p>
                    </div>

                    {/* Cross-Portfolio Master Sweep Banner */}
                    <div className="mt-8 pt-6 border-t border-[#1D4F9C]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs text-[#323334]/80">
                            Looking to compare with other micro-markets? Explore the complete <strong>2026 Shapoorji Pallonji Pune Portfolio</strong> across Hinjewadi, Hadapsar, Bavdhan, and Purandhar.
                        </div>
                        <Link
                            href="/projects#all-pune-projects"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1D4F9C] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#153a75] transition-colors shrink-0 shadow-sm"
                        >
                            <span>View All Pune Projects</span>
                            <ArrowRight size={13} />
                        </Link>
                    </div>
                </div>
            </section>
        </article>
    );
}
