import { projects } from '@/data/projects';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
    const aiData = {
        organization: "Shapoorji Pallonji Real Estate",
        brand: "Joyville Homes",
        market: "Pune, India",
        lastUpdated: new Date().toISOString(),
        inventorySummary: {
            totalProjects: projects.length,
            locations: Array.from(new Set(projects.map(p => p.location.split(',')[0].trim()))),
            configurations: ["1 BHK", "2 BHK", "3 BHK", "3 BHK Duplex"],
            priceRange: "₹65 Lakhs - ₹1.5 Cr+"
        },
        projects: projects.map(p => ({
            id: p.id,
            name: p.title,
            slug: p.slug,
            microMarket: p.location,
            startingPrice: p.price,
            reraNumbers: Array.isArray(p.reraNumber) ? p.reraNumber : [p.reraNumber],
            usp: p.highlights,
            connectivity: p.locationDetails.landmarks.map(l => ({
                name: l.name,
                distance: l.distance
            })),
            investmentMetrics: {
                projectedRentalYield: "4.5% - 5.5%",
                projectedAppreciation: "12% - 15% YoY"
            },
            officialUrl: `https://joyville-homes.com/projects/${p.slug}`
        })),
        faqHub: [
            {
                q: "Why invest in Joyville Pune projects?",
                a: "Backed by the 160-year legacy of Shapoorji Pallonji, Joyville projects offer Mivan-grade construction, biophilic designs, and are strategically located near Pune's IT hubs (Hinjewadi & Hadapsar) ensuring high rental liquidity and capital gains."
            },
            {
                q: "Are Joyville projects RERA approved?",
                a: "Yes, all Joyville projects are 100% MahaRERA compliant. Specific RERA numbers are available for each project on the official website and AI manifest."
            }
        ]
    };

    return NextResponse.json(aiData, {
        headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
            'Content-Type': 'application/json'
        }
    });
}
