import { Metadata } from 'next';
export const dynamic = 'force-static';
import ProjectsPortfolioClient from '@/components/ProjectsPortfolioClient';
import ShapoorjiPuneMasterSweep from '@/components/ShapoorjiPuneMasterSweep';
import Breadcrumbs from '@/components/Breadcrumbs';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
    title: "Shapoorji Pallonji Pune Projects (2026) | Complete Joyville Price List & Floor Plans",
    description: "Explore all 12 Shapoorji Pallonji residential developments in Pune across Hinjewadi, Hadapsar, Bavdhan & Purandar. Verified MahaRERA numbers, starting prices from ₹65L, floor plans & instant site visit booking.",
    keywords: [
        "Shapoorji Pallonji projects Pune",
        "Joyville Pune all projects",
        "Joyville Vyomora Hinjewadi",
        "Joyville Sensorium Hinjewadi",
        "Joyville Hadapsar Annexe",
        "Vanaha Bavdhan Pune",
        "flats in Pune by Shapoorji",
        "Shapoorji Pallonji Pune price list 2026"
    ],
    alternates: {
        canonical: 'https://joyville-homes.com/projects',
    }
};

export default function ProjectsPortfolio() {
    const siteUrl = 'https://joyville-homes.com';
    
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
            { "@type": "ListItem", "position": 2, "name": "Projects", "item": `${siteUrl}/projects` }
        ]
    };

    const itemListLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Shapoorji Pallonji Joyville Projects in Pune",
        "description": "Complete portfolio of premium residential projects in Hinjewadi, Hadapsar, and Bavdhan.",
        "url": `${siteUrl}/projects`,
        "numberOfItems": projects.length,
        "itemListElement": projects.map((project, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "RealEstateListing",
                "name": project.title,
                "url": `${siteUrl}/projects/${project.slug}`,
                "image": `${siteUrl}${project.image}`,
                "description": project.description,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": project.location,
                    "addressRegion": "Maharashtra",
                    "addressCountry": "IN"
                },
                "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "INR",
                    "priceRange": project.price,
                    "availability": project.status.toLowerCase().includes('ready') ? "https://schema.org/InStock" : "https://schema.org/PreOrder"
                }
            }
        }))
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
            <div className="max-w-7xl mx-auto px-6 pt-32">
                <Breadcrumbs items={[{ label: 'Projects Portfolio', href: '/projects' }]} />
            </div>
            <ProjectsPortfolioClient />
            <ShapoorjiPuneMasterSweep />
        </>
    );
}
