"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
    Play, 
    Pause, 
    X, 
    ChevronLeft, 
    ChevronRight, 
    MapPin, 
    ExternalLink, 
    Smartphone
} from 'lucide-react';

export interface WebStorySlide {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    tag: string;
    metrics?: { label: string; value: string }[];
}

export interface WebStory {
    id: string;
    projectSlug: string;
    title: string;
    location: string;
    coverImage: string;
    status: string;
    price: string;
    reraNumber: string;
    slidesCount: number;
    slides: WebStorySlide[];
}

const WEB_STORIES: WebStory[] = [
    {
        id: 'story-vyomora',
        projectSlug: 'joyville-vyomora-hinjewadi',
        title: 'Joyville Vyomora',
        location: 'Hinjewadi Phase 1, Pune',
        coverImage: '/images/projects/vyomora/desktop_banner.webp',
        status: 'Brand New Launch',
        price: '₹88.19 L Onwards',
        reraNumber: 'PR1260002600999',
        slidesCount: 5,
        slides: [
            {
                title: 'Joyville Vyomora Hinjewadi',
                subtitle: '25-Acre Master-Planned Community',
                description: 'Envisioned with 80% open breathing space and horizontal openness in Hinjewadi Phase 1 by Shapoorji Pallonji Real Estate.',
                image: '/images/projects/vyomora/desktop_banner.webp',
                tag: 'Overview',
                metrics: [{ label: 'Land Parcel', value: '25 Acres' }, { label: 'Open Space', value: '80%' }, { label: 'Clubhouse', value: '32,000+ Sq. Ft.' }]
            },
            {
                title: 'Certified Master Site Plan',
                subtitle: 'Macro Development Zoning',
                description: 'Explore the 25-acre layout featuring residential tower clusters, 8-acre Central Park, and elevated eco-deck podium.',
                image: '/images/projects/vyomora/master-layout.webp',
                tag: 'Master Plan',
                metrics: [{ label: 'Central Greens', value: '8 Acres' }, { label: 'Towers', value: 'G+22 Floors' }, { label: 'Entry Gates', value: 'RFID Secured' }]
            },
            {
                title: 'Architectural Floor Plans',
                subtitle: '2, 3 BHK & Duplex Sky Villas',
                description: 'Engineered with Mivan monolithic construction for zero seepage. 2 BHK Suites from 685 sq. ft. to Duplexes up to 1434 sq. ft.',
                image: '/images/projects/vyomora/floor-plans/2bhk-1.webp',
                tag: 'Floor Plans',
                metrics: [{ label: '2 BHK Carpet', value: '685 - 839 sq.ft.' }, { label: '3 BHK Carpet', value: '1052 - 1190 sq.ft.' }, { label: 'Duplex Carpet', value: '1434 sq.ft.' }]
            },
            {
                title: '48+ Curated Amenities',
                subtitle: 'Biophilic Luxury & Sports Arenas',
                description: 'Olympic-length lap pool, championship pickleball courts, sky gym, digital mini-theatre, and reflexology pathways.',
                image: '/images/projects/vyomora/gallery/photo_gallery3.webp',
                tag: 'Amenities',
                metrics: [{ label: 'Amenities', value: '48+ Curated' }, { label: 'Pool', value: 'Olympic Lap' }, { label: 'Sports', value: 'Pickleball / Turf' }]
            },
            {
                title: 'Secure Your Hinjewadi Asset',
                subtitle: 'MahaRERA: PR1260002600999',
                description: 'Minutes from Rajiv Gandhi Infotech Park & Pune Metro Line 3. Starting ₹88.19 L with high projected rental yield.',
                image: '/images/projects/vyomora/gallery/photo_gallery1.webp',
                tag: 'Investment',
                metrics: [{ label: 'Starting Price', value: '₹88.19 L' }, { label: 'Est. Yield', value: '4.8%' }, { label: 'Metro Proximity', value: '5 Mins' }]
            }
        ]
    },
    {
        id: 'story-sensorium',
        projectSlug: 'joyville-sensorium-hinjewadi',
        title: 'Joyville Sensorium',
        location: 'Hinjewadi Phase 1, Pune',
        coverImage: '/images/joyville_sensorium_projectcard.webp',
        status: 'Under Construction',
        price: '₹1.10 Cr Onwards',
        reraNumber: 'P52100027234',
        slidesCount: 5,
        slides: [
            {
                title: 'Joyville Sensorium',
                subtitle: 'Biophilic 10.5-Acre Sanctuary',
                description: 'Designed around 5D sensorial experiences with 75% open spaces and lush tree canopies in Maan, Hinjewadi Phase 1.',
                image: '/images/joyville_sensorium_projectcard.webp',
                tag: 'Overview',
                metrics: [{ label: 'Site Area', value: '10.5 Acres' }, { label: 'Open Space', value: '75%' }, { label: 'Sunken Garden', value: '2.8 Acres' }]
            },
            {
                title: '2.8-Acre Sunken Sensory Park',
                subtitle: 'Interactive Nature Living',
                description: 'A multi-level sunken garden featuring aroma trails, tree-hug decks, cascading water walls, and open-air meditation zones.',
                image: '/images/hero_bg.webp',
                tag: 'Landscape',
                metrics: [{ label: 'Sensory Zones', value: '5 Dimensions' }, { label: 'Aroma Groves', value: 'Yes' }, { label: 'Lap Pool', value: 'Infinity Edge' }]
            },
            {
                title: '2 & 3 BHK Luxe Blueprints',
                subtitle: 'Optimal Spatial Geometry',
                description: 'Spacious 2 BHK Luxe & 3 BHK Royale residences with large deck sit-outs and high acoustic insulation.',
                image: '/images/projects/vyomora/floor-plans/2bhk-2.webp',
                tag: 'Floor Plans',
                metrics: [{ label: '2 BHK Luxe', value: '725 sq.ft.' }, { label: '3 BHK Royale', value: '985 sq.ft.' }, { label: 'Balcony', value: 'Panoramic' }]
            },
            {
                title: 'Riverfront Connectivity',
                subtitle: 'Maan Village Road Corridor',
                description: 'Direct access to Infosys, Wipro, and Cognizant campuses. Fast exit to Mumbai-Pune Expressway.',
                image: '/images/desktop-poster.webp',
                tag: 'Location',
                metrics: [{ label: 'To Infosys', value: '4 Mins' }, { label: 'Expressway', value: '8 Mins' }, { label: 'Metro Station', value: '1.2 Km' }]
            },
            {
                title: 'Verified MahaRERA: P52100027234',
                subtitle: 'Starting ₹1.10 Cr',
                description: 'Shapoorji Pallonji engineering excellence with proven capital appreciation in Pune west IT corridor.',
                image: '/images/joyville_sensorium_projectcard.webp',
                tag: 'Pricing & RERA',
                metrics: [{ label: 'Price', value: '₹1.10 Cr+' }, { label: 'RERA', value: 'P52100027234' }, { label: 'Possession', value: 'Dec 2026' }]
            }
        ]
    },
    {
        id: 'story-hadapsar',
        projectSlug: 'joyville-hadapsar-annexe-pune',
        title: 'Joyville Hadapsar Annexe',
        location: 'Shewalewadi, Hadapsar, Pune',
        coverImage: '/images/joyville_hadapsar_projectcard.webp',
        status: 'Ready & Under Construction',
        price: '₹65 L Onwards',
        reraNumber: 'P52100026451',
        slidesCount: 5,
        slides: [
            {
                title: 'Joyville Hadapsar Annexe',
                subtitle: '21-Acre Master Township',
                description: 'Eastern Pune landmark community with 35,000 sq. ft. clubhouse and 8.85 acres of continuous Central Park.',
                image: '/images/joyville_hadapsar_projectcard.webp',
                tag: 'Overview',
                metrics: [{ label: 'Township', value: '21 Acres' }, { label: 'Central Park', value: '8.85 Acres' }, { label: 'Clubhouse', value: '35,000 Sq. Ft.' }]
            },
            {
                title: '60+ Curated Lifestyle Amenities',
                subtitle: 'Central Park Recreation',
                description: 'Equipped with multiple swimming pools, vehicular drop-offs, cricket pitch, tennis courts, and amphitheatre.',
                image: '/images/hero_bg.webp',
                tag: 'Amenities',
                metrics: [{ label: 'Clubhouse Levels', value: 'G+2' }, { label: 'Swimming Pools', value: '2' }, { label: 'Walking Track', value: '1 Km+' }]
            },
            {
                title: '1, 2 & 3 BHK Layouts',
                subtitle: 'Joy, Delight & Grande Series',
                description: 'Vastu-conscious apartments designed for modern nuclear families with minimal passage wastage.',
                image: '/images/projects/vyomora/floor-plans/2bhk-3.webp',
                tag: 'Floor Plans',
                metrics: [{ label: '1 BHK Joy', value: '430 sq.ft.' }, { label: '2 BHK Delight', value: '619 sq.ft.' }, { label: '3 BHK Grande', value: '894 sq.ft.' }]
            },
            {
                title: 'SP Infocity & Magarpatta Hub',
                subtitle: 'Prime East Pune Corridor',
                description: 'Directly off Pune-Solapur Highway. Just 10 mins from SP Infocity Phursungi and Magarpatta City IT SEZ.',
                image: '/images/desktop-poster.webp',
                tag: 'Location',
                metrics: [{ label: 'To SP Infocity', value: '8 Mins' }, { label: 'To Magarpatta', value: '12 Mins' }, { label: 'Highway Access', value: 'Direct' }]
            },
            {
                title: 'Ready Possession Units Available',
                subtitle: 'MahaRERA: P52100026451',
                description: 'Starting from ₹65 Lakhs. Over 1,000+ satisfied families already part of this flourishing community.',
                image: '/images/joyville_hadapsar_projectcard.webp',
                tag: 'Pricing & RERA',
                metrics: [{ label: 'Starting Price', value: '₹65 L' }, { label: 'Families', value: '1000+' }, { label: 'Rental Yield', value: '4.6%' }]
            }
        ]
    },
    {
        id: 'story-celestia',
        projectSlug: 'joyville-celestia-hadapsar',
        title: 'Joyville Celestia',
        location: 'Shewalewadi, Hadapsar, Pune',
        coverImage: '/images/joyville_celestia_projectcard.webp',
        status: 'Under Construction',
        price: '₹85 L Onwards',
        reraNumber: 'P52100048338',
        slidesCount: 5,
        slides: [
            {
                title: 'Joyville Celestia',
                subtitle: 'Vastu-Compliant Celestial Living',
                description: 'Luxury high-rise towers in Hadapsar Annexe featuring 40+ celestial amenities and uninterrupted hillside views.',
                image: '/images/joyville_celestia_projectcard.webp',
                tag: 'Overview',
                metrics: [{ label: 'Typologies', value: '2 & 3 BHK' }, { label: 'Vastu Alignment', value: '100%' }, { label: 'Club Access', value: 'Grand Club' }]
            },
            {
                title: 'Stargazing Decks & Infinity Pool',
                subtitle: 'Sky Lounge Amenities',
                description: 'Rooftop observatory, sky gym, co-working pods, and landscaped party decks overlooking the countryside.',
                image: '/images/hero_bg.webp',
                tag: 'Amenities',
                metrics: [{ label: 'Rooftop Decks', value: 'Yes' }, { label: 'Co-Working', value: 'High-Speed' }, { label: 'EV Stations', value: 'Provided' }]
            },
            {
                title: '2 & 3 BHK Smart Floor Plans',
                subtitle: 'Biometric Access & Smart Switches',
                description: 'Double-glazed windows, premium vitrified tiles, designer sanitary fittings, and expansive master bedroom suites.',
                image: '/images/projects/vyomora/floor-plans/2bhk-4.webp',
                tag: 'Floor Plans',
                metrics: [{ label: '2 BHK Smart', value: '710 sq.ft.' }, { label: '3 BHK Grand', value: '920 sq.ft.' }, { label: 'Home Automation', value: 'Integrated' }]
            },
            {
                title: 'Fast Access to Hadapsar Tech Hubs',
                subtitle: 'Shewalewadi Growth Node',
                description: 'Seamless road connectivity to EON IT Park Kharadi via Manjri bridge, Amanora Mall, and upcoming Ring Road.',
                image: '/images/desktop-poster.webp',
                tag: 'Location',
                metrics: [{ label: 'To Kharadi IT', value: '18 Mins' }, { label: 'To Amanora Mall', value: '10 Mins' }, { label: 'Ring Road', value: '5 Mins' }]
            },
            {
                title: 'MahaRERA: P52100048338',
                subtitle: 'Starting ₹85 Lakhs',
                description: 'Competitive price point with flexible construction-linked payment plans from Shapoorji Pallonji.',
                image: '/images/joyville_celestia_projectcard.webp',
                tag: 'Pricing & RERA',
                metrics: [{ label: 'Price', value: '₹85 L+' }, { label: 'Status', value: 'New Phase' }, { label: 'Bank Approvals', value: 'All Major Banks' }]
            }
        ]
    },
    {
        id: 'story-skyluxe',
        projectSlug: 'joyville-skyluxe-hadapsar',
        title: 'Joyville Skyluxe Edition',
        location: 'Shewalewadi, Hadapsar, Pune',
        coverImage: '/images/joyville_hadapsar_projectcard.webp',
        status: 'Exclusive Launch',
        price: '₹1.40 Cr Onwards',
        reraNumber: 'P52100048338',
        slidesCount: 5,
        slides: [
            {
                title: 'Joyville Skyluxe Edition',
                subtitle: '3 BHK Sky Villas & Penthouses',
                description: 'The ultra-luxury signature wing of Joyville Hadapsar with private elevator access and Italian marble finishes.',
                image: '/images/joyville_hadapsar_projectcard.webp',
                tag: 'Overview',
                metrics: [{ label: 'Format', value: 'Sky Villas' }, { label: 'Finishes', value: 'Italian Marble' }, { label: 'Privacy', value: 'High Exclusive' }]
            },
            {
                title: 'Double-Height Living Decks',
                subtitle: 'Breathtaking 180° Panoramas',
                description: 'Floor-to-ceiling glass facades offering panoramic views of Pune green belt and Sahyadri mountain ridgelines.',
                image: '/images/projects/vyomora/gallery/photo_gallery5.webp',
                tag: 'Architecture',
                metrics: [{ label: 'Deck Width', value: 'Extra Large' }, { label: 'Ceiling Height', value: '10.5 Feet' }, { label: 'Glazing', value: 'Acoustic DGU' }]
            },
            {
                title: 'Palatial 3 BHK Blueprints',
                subtitle: '1150+ Sq. Ft. Carpet Area',
                description: 'Separate walk-in dresser in master suite, powder room, expanded kitchen with quartz counter, and private utility.',
                image: '/images/projects/vyomora/floor-plans/3bhk-1.webp',
                tag: 'Floor Plans',
                metrics: [{ label: 'Carpet Area', value: '1150 - 1380 sq.ft.' }, { label: 'Bathrooms', value: '3 En-Suite' }, { label: 'Servant Space', value: 'Optional' }]
            },
            {
                title: 'Private Sky Club Privileges',
                subtitle: 'Curated HNI Community',
                description: 'Exclusive access to private banquet dining, temperature-controlled splash pool, and private business boardroom.',
                image: '/images/projects/vyomora/gallery/photo_gallery4.webp',
                tag: 'Privileges',
                metrics: [{ label: 'Private Lounge', value: 'Reserved' }, { label: 'Concierge', value: '24x7 On Call' }, { label: 'Valet', value: 'Included' }]
            },
            {
                title: 'MahaRERA: P52100048338',
                subtitle: 'Starting ₹1.40 Cr',
                description: 'An elite address for corporate CXOs and NRI investors seeking luxury backed by Shapoorji legacy.',
                image: '/images/joyville_hadapsar_projectcard.webp',
                tag: 'Pricing & RERA',
                metrics: [{ label: 'Starting Price', value: '₹1.40 Cr' }, { label: 'Car Parking', value: '2 Covered Bays' }, { label: 'ROI Benchmark', value: '9.2%' }]
            }
        ]
    },
    {
        id: 'story-wildernest',
        projectSlug: 'wildernest-sp-kingstown',
        title: 'Wildernest at SP Kingstown',
        location: 'SP Kingstown, Shewalewadi Road, Pune',
        coverImage: '/images/desktop-poster.webp',
        status: 'Premium Launch',
        price: '₹1.85 Cr Onwards',
        reraNumber: 'P52100052683',
        slidesCount: 5,
        slides: [
            {
                title: 'Wildernest at SP Kingstown',
                subtitle: 'Forest-Themed Luxury Living',
                description: 'An opulent hillside enclave nestled inside the 200+ acre SP Kingstown mega development in Eastern Pune.',
                image: '/images/desktop-poster.webp',
                tag: 'Overview',
                metrics: [{ label: 'Theme', value: 'Forest Sanctuary' }, { label: 'Township', value: 'SP Kingstown' }, { label: 'Acreage', value: '200+ Acres' }]
            },
            {
                title: 'Miyawaki Forest Canopy',
                subtitle: 'Pure Air & Natural Ecosystem',
                description: 'Over 10,000 native trees, nature trails, butterfly gardens, and forest gazebos offering tranquil retreat living.',
                image: '/images/hero_bg.webp',
                tag: 'Landscape',
                metrics: [{ label: 'Trees', value: '10,000+ Native' }, { label: 'Nature Trail', value: '2.2 Km' }, { label: 'AQI Level', value: 'Sub-50 Pristine' }]
            },
            {
                title: '3 & 4 BHK Forest Residences',
                subtitle: 'Expansive Villa-Style Suites',
                description: 'Lavish carpet configurations with sprawling sit-out balconies facing serene dense forest greens.',
                image: '/images/projects/vyomora/floor-plans/3bhk-2.webp',
                tag: 'Floor Plans',
                metrics: [{ label: '3 BHK Carpet', value: '1250 - 1480 sq.ft.' }, { label: '4 BHK Carpet', value: '1750+ sq.ft.' }, { label: 'Balconies', value: 'Dual Facing' }]
            },
            {
                title: 'SP Infocity & Pune-Solapur Link',
                subtitle: 'Strategic Connectivity',
                description: 'Quick transit to Hadapsar commercial hub while living completely away from city pollution and congestion.',
                image: '/images/desktop-poster.webp',
                tag: 'Location',
                metrics: [{ label: 'To Hadapsar', value: '10 Mins' }, { label: 'To Airport', value: '25 Mins' }, { label: 'Ring Road', value: 'Nearby' }]
            },
            {
                title: 'MahaRERA: P52100052683',
                subtitle: 'Starting ₹1.85 Cr',
                description: 'Ultra-exclusive residential enclave by Shapoorji Pallonji for discerning homebuyers wanting forest tranquility.',
                image: '/images/desktop-poster.webp',
                tag: 'Pricing & RERA',
                metrics: [{ label: 'Starting Price', value: '₹1.85 Cr' }, { label: 'RERA', value: 'P52100052683' }, { label: 'Status', value: 'Active Booking' }]
            }
        ]
    },
    {
        id: 'story-golfland',
        projectSlug: 'vanaha-golfland-pune',
        title: 'Vanaha Golfland',
        location: 'Bavdhan, Western Pune',
        coverImage: '/images/dl_vanaha-pune.jpg',
        status: 'Under Construction',
        price: '₹1.55 Cr Onwards',
        reraNumber: 'P52100052531',
        slidesCount: 5,
        slides: [
            {
                title: 'Vanaha Golfland Bavdhan',
                subtitle: 'Golf-Facing Luxury Residences',
                description: 'Perched in Western Pune overlooking the Oxford Golf Resort inside the 1,000-acre Vanaha master township.',
                image: '/images/dl_vanaha-pune.jpg',
                tag: 'Overview',
                metrics: [{ label: 'Township', value: '1,000 Acres' }, { label: 'Golf View', value: 'Oxford Resort' }, { label: 'Open Space', value: '90+ Acres Green' }]
            },
            {
                title: 'Unobstructed Golf Course Views',
                subtitle: 'Lush Greens & Valley Panoramas',
                description: 'Wake up to the rolling fairways of championship golf course and surrounding Sahyadri hills.',
                image: '/images/dl_vanaha-pune.jpg',
                tag: 'Views',
                metrics: [{ label: 'Course View', value: '18-Hole Championship' }, { label: 'Air Quality', value: 'Pristine Valley' }, { label: 'Elevation', value: 'High Vantage' }]
            },
            {
                title: '2, 3 & 4 BHK Golf Suites',
                subtitle: 'Premium Architectural Layouts',
                description: 'Spacious floor plans with wide sun decks, imported fixtures, modular kitchen provisions, and grand master suites.',
                image: '/images/projects/vyomora/floor-plans/3bhk-3.webp',
                tag: 'Floor Plans',
                metrics: [{ label: '2 BHK Carpet', value: '850 sq.ft.' }, { label: '3 BHK Carpet', value: '1180 - 1450 sq.ft.' }, { label: '4 BHK Carpet', value: '1900 sq.ft.' }]
            },
            {
                title: 'Kothrud & Chandani Chowk Corridor',
                subtitle: 'Bavdhan Expressway Access',
                description: 'Just 5 mins from Chandani Chowk interchange, 10 mins from Kothrud, and 20 mins from Hinjewadi IT Park.',
                image: '/images/desktop-poster.webp',
                tag: 'Location',
                metrics: [{ label: 'To Chandani Chowk', value: '5 Mins' }, { label: 'To Kothrud', value: '10 Mins' }, { label: 'To Hinjewadi', value: '20 Mins' }]
            },
            {
                title: 'MahaRERA: P52100052531',
                subtitle: 'Starting ₹1.55 Cr',
                description: 'Invest in one of India largest and most scenic integrated townships with Shapoorji Pallonji.',
                image: '/images/dl_vanaha-pune.jpg',
                tag: 'Pricing & RERA',
                metrics: [{ label: 'Starting Price', value: '₹1.55 Cr' }, { label: 'RERA', value: 'P52100052531' }, { label: 'Amenities', value: '90+ Township' }]
            }
        ]
    },
    {
        id: 'story-springs',
        projectSlug: 'vanaha-springs-pune',
        title: 'Vanaha Springs',
        location: 'Bavdhan, Western Pune',
        coverImage: '/images/dl_vanaha-pune.jpg',
        status: 'Ready & Under Construction',
        price: '₹95 L Onwards',
        reraNumber: 'P52100028031',
        slidesCount: 5,
        slides: [
            {
                title: 'Vanaha Springs',
                subtitle: 'Nature-Embraced Mountain Homes',
                description: '1, 2 & 3 BHK residences nestled amidst valley breezes and scenic hills in Bavdhan, Pune West.',
                image: '/images/dl_vanaha-pune.jpg',
                tag: 'Overview',
                metrics: [{ label: 'Township', value: '1,000 Acres' }, { label: 'Nature Trails', value: 'Extensive' }, { label: 'Clubhouse', value: 'Signature' }]
            },
            {
                title: 'Over 90+ Curated Township Amenities',
                subtitle: 'Health, Leisure & Sports',
                description: 'Full sports infrastructure, jogging circuits, healthcare clinic, retail high street, and outdoor amphitheatre.',
                image: '/images/hero_bg.webp',
                tag: 'Amenities',
                metrics: [{ label: 'Amenities', value: '90+' }, { label: 'Turf Sports', value: 'Multiple' }, { label: 'Retail', value: 'On-Site' }]
            },
            {
                title: 'Smart 1, 2 & 3 BHK Blueprints',
                subtitle: 'Efficient Cross-Ventilated Living',
                description: 'Designed to capture year-round hill breezes with maximized carpet efficiency and sunlit living rooms.',
                image: '/images/projects/vyomora/floor-plans/2bhk-1.webp',
                tag: 'Floor Plans',
                metrics: [{ label: '1 BHK Carpet', value: '500 sq.ft.' }, { label: '2 BHK Carpet', value: '720 sq.ft.' }, { label: '3 BHK Carpet', value: '980 sq.ft.' }]
            },
            {
                title: 'Western Pune Golden Triangle',
                subtitle: 'Bavdhan - Kothrud - Hinjewadi',
                description: 'Direct flyover connectivity to Pune central areas while preserving unmatched air quality and greenery.',
                image: '/images/desktop-poster.webp',
                tag: 'Location',
                metrics: [{ label: 'To Kothrud', value: '10 Mins' }, { label: 'To Baner', value: '15 Mins' }, { label: 'Air Quality', value: 'Exceptional' }]
            },
            {
                title: 'MahaRERA: P52100028031',
                subtitle: 'Starting ₹95 Lakhs',
                description: 'Affordable luxury backed by Shapoorji Pallonji with fast possession timelines.',
                image: '/images/dl_vanaha-pune.jpg',
                tag: 'Pricing & RERA',
                metrics: [{ label: 'Starting Price', value: '₹95 L' }, { label: 'RERA', value: 'P52100028031' }, { label: 'Rental Yield', value: '4.7%' }]
            }
        ]
    },
    {
        id: 'story-vanaha',
        projectSlug: 'vanaha-bavdhan-springs',
        title: 'Vanaha Bavdhan Mega Township',
        location: 'Bavdhan, Pune',
        coverImage: '/images/dl_vanaha-pune.jpg',
        status: 'Master Township',
        price: '₹82 L Onwards',
        reraNumber: 'P52100028031',
        slidesCount: 5,
        slides: [
            {
                title: 'Vanaha 1,000-Acre Township',
                subtitle: 'One of Western India Largest',
                description: 'A transformative urban sanctuary built across a natural valley with over 90,000 trees in Bavdhan, Pune.',
                image: '/images/dl_vanaha-pune.jpg',
                tag: 'Overview',
                metrics: [{ label: 'Total Area', value: '1,000 Acres' }, { label: 'Trees', value: '90,000+' }, { label: 'Township School', value: 'Planned' }]
            },
            {
                title: 'Sustainable Smart Township',
                subtitle: 'EDGE Certified Infrastructure',
                description: 'Solar microgrid, complete zero-discharge rainwater harvesting, EV charging stations, and eco-cycling tracks.',
                image: '/images/hero_bg.webp',
                tag: 'Sustainability',
                metrics: [{ label: 'Green Certification', value: 'EDGE Green' }, { label: 'Rainwater', value: '100% Harvested' }, { label: 'STP Grid', value: 'Centralized' }]
            },
            {
                title: 'Diverse Housing Typologies',
                subtitle: 'Flats, Penthouses & Villas',
                description: 'From smart starter homes to ultra-luxury penthouses overlooking Oxford Golf course.',
                image: '/images/projects/vyomora/floor-plans/2bhk-2.webp',
                tag: 'Options',
                metrics: [{ label: '1 BHK', value: 'From ₹55 L' }, { label: '2 BHK', value: 'From ₹82 L' }, { label: '3 BHK', value: 'From ₹1.25 Cr' }]
            },
            {
                title: 'Strategic Foothill Location',
                subtitle: 'Minutes to Paud Road & Chandani Chowk',
                description: 'The premier choice for IT professionals working in Hinjewadi wanting lush natural hill surroundings.',
                image: '/images/desktop-poster.webp',
                tag: 'Connectivity',
                metrics: [{ label: 'To Hinjewadi IT', value: '20 Mins' }, { label: 'To University', value: '15 Mins' }, { label: 'To Airport', value: '35 Mins' }]
            },
            {
                title: 'Official MahaRERA: P52100028031',
                subtitle: 'Starting ₹82 Lakhs',
                description: 'Join over 2,500+ homebuyer families already invested in Vanaha grand vision.',
                image: '/images/dl_vanaha-pune.jpg',
                tag: 'Pricing & RERA',
                metrics: [{ label: 'Starting Price', value: '₹82 L' }, { label: 'Families', value: '2500+' }, { label: 'Developer', value: 'Shapoorji Pallonji' }]
            }
        ]
    },
    {
        id: 'story-treetopia',
        projectSlug: 'shapoorji-treetopia-pune',
        title: 'Shapoorji Pallonji Treetopia',
        location: 'Jadhavwadi, Pune Growth Corridor',
        coverImage: '/images/projects/treetopia/desktop_banner.webp',
        status: 'NA Plots Launch',
        price: '₹99 L Onwards',
        reraNumber: 'PP1261012501803',
        slidesCount: 5,
        slides: [
            {
                title: 'Shapoorji Pallonji Treetopia',
                subtitle: "Nature's Own ~105-Acre Estate",
                description: 'Nestled between hills on three sides, Treetopia is a serene valley of growth where custom villas coexist with nature.',
                image: '/images/projects/treetopia/desktop_banner.webp',
                tag: 'Overview',
                metrics: [{ label: 'Estate Area', value: '~105 Acres' }, { label: 'Natural Lake', value: '25 Acres' }, { label: 'Surroundings', value: '3-Sided Hills' }]
            },
            {
                title: '10 Mins from Purandar Airport',
                subtitle: 'Pune Growth Corridor Connectivity',
                description: 'Around 10 mins from proposed Purandar Airport, 10 mins to Saswad & Wadki, 30 mins to SP Infocity, and direct links to Hadapsar.',
                image: '/images/projects/treetopia/location-map.jpg',
                tag: 'Growth Driver',
                metrics: [{ label: 'Purandar Airport', value: '10 Mins' }, { label: 'Saswad & Wadki', value: '10 Mins' }, { label: 'SP Infocity', value: '30 Mins' }]
            },
            {
                title: '105-Acre Master Layout Plan',
                subtitle: 'Bespoke Villa Plots (1800 - 5000+ sq.ft.)',
                description: 'Wide 18-metre paved tree-lined Central Avenue, underground utilities, and clear individual 7/12 extract titles.',
                image: '/images/projects/treetopia/master-layout.jpg',
                tag: 'Master Plan',
                metrics: [{ label: 'Regal Plots', value: '1800 - 2500 sq.ft.' }, { label: 'Grand Plots', value: '3000 - 5000+ sq.ft.' }, { label: 'Central Avenue', value: '18 Metres' }]
            },
            {
                title: '25-Acre Lake & 30+ Amenities',
                subtitle: 'Clubhouse, Lake Promenade & Trails',
                description: 'Nature clubhouse, swimming pools, lakeside promenade, eco-pond with island, fishing deck, and riding trails.',
                image: '/images/projects/treetopia/page_18.jpg',
                tag: 'Amenities',
                metrics: [{ label: 'Natural Lake', value: '25 Acres' }, { label: 'Amenities', value: '30+ Curated' }, { label: 'Lifestyle', value: 'Resort Theme' }]
            },
            {
                title: 'MahaRERA: PP1261012501803',
                subtitle: 'Starting at ₹99 Lakhs Onwards',
                description: '100% legal compliance, individual 7/12 extract ownership, and title mortgaged to Beacon Trusteeship Ltd. (NOC available).',
                image: '/images/projects/treetopia/gallery_1.webp',
                tag: 'Pricing & RERA',
                metrics: [{ label: 'Starting Price', value: '₹99 L*' }, { label: 'RERA Number', value: 'PP1261012501803' }, { label: 'Title', value: 'Individual 7/12' }]
            }
        ]
    }
];

export default function GoogleWebStoriesFooter() {
    const [activeStory, setActiveStory] = useState<WebStory | null>(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const SLIDE_DURATION_MS = 5000;
    const PROGRESS_INTERVAL_MS = 50;

    const openStory = (story: WebStory) => {
        setActiveStory(story);
        setCurrentSlideIndex(0);
        setProgress(0);
        setIsPaused(false);
    };

    const closeStory = useCallback(() => {
        setActiveStory(null);
        setCurrentSlideIndex(0);
        setProgress(0);
        setIsPaused(false);
    }, []);

    const nextSlide = useCallback(() => {
        if (!activeStory) return;
        if (currentSlideIndex < activeStory.slides.length - 1) {
            setCurrentSlideIndex(prev => prev + 1);
            setProgress(0);
        } else {
            // Find next story
            const currentStoryIdx = WEB_STORIES.findIndex(s => s.id === activeStory.id);
            if (currentStoryIdx < WEB_STORIES.length - 1) {
                setActiveStory(WEB_STORIES[currentStoryIdx + 1]);
                setCurrentSlideIndex(0);
                setProgress(0);
            } else {
                closeStory();
            }
        }
    }, [activeStory, currentSlideIndex, closeStory]);

    const prevSlide = useCallback(() => {
        if (!activeStory) return;
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(prev => prev - 1);
            setProgress(0);
        } else {
            const currentStoryIdx = WEB_STORIES.findIndex(s => s.id === activeStory.id);
            if (currentStoryIdx > 0) {
                const prevStory = WEB_STORIES[currentStoryIdx - 1];
                setActiveStory(prevStory);
                setCurrentSlideIndex(prevStory.slides.length - 1);
                setProgress(0);
            }
        }
    }, [activeStory, currentSlideIndex]);

    // Handle timer progression
    useEffect(() => {
        if (!activeStory || isPaused) return;

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    nextSlide();
                    return 0;
                }
                return prev + (PROGRESS_INTERVAL_MS / SLIDE_DURATION_MS) * 100;
            });
        }, PROGRESS_INTERVAL_MS);

        timerRef.current = interval;

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [activeStory, isPaused, nextSlide]);

    // Keyboard navigation
    useEffect(() => {
        if (!activeStory) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeStory();
            if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeStory, nextSlide, prevSlide, closeStory]);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
    };

    // Schema.org structured data for Google Web Stories Carousel
    const webStoriesSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        'name': 'Google Web Stories — Shapoorji Pallonji Joyville Homes Pune Master Collection',
        'description': 'Official visual web stories for all 10 Shapoorji Pallonji residential and plotted developments in Pune across Hinjewadi, Hadapsar, Bavdhan, and Purandar.',
        'itemListOrder': 'https://schema.org/ItemListOrderAscending',
        'numberOfItems': WEB_STORIES.length,
        'itemListElement': WEB_STORIES.map((story, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'item': {
                '@type': 'CreativeWork',
                'name': `${story.title} Visual Web Story — Shapoorji Pallonji ${story.location}`,
                'headline': `${story.title} Project Walkthrough & Master Story`,
                'url': `https://joyville-homes.com/projects/${story.projectSlug}#web-story`,
                'image': `https://joyville-homes.com${story.coverImage}`,
                'publisher': {
                    '@type': 'Organization',
                    'name': 'Shapoorji Pallonji Real Estate',
                    'logo': 'https://joyville-homes.com/logo.svg'
                }
            }
        }))
    };

    return (
        <section className="border-t border-[#FFFFFF]/10 pt-12 pb-12 mb-8 relative">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webStoriesSchema) }}
            />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                    <div className="flex items-center gap-2 text-[#C5A059] text-[10px] tracking-[0.3em] uppercase font-bold mb-2">
                        <Smartphone size={14} />
                        <span>Google Web Stories • Visual Explorations</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif text-[#FFFFFF]">
                        Interactive Stories: All 10 Shapoorji Pune Projects
                    </h3>
                    <p className="text-xs text-[#FFFFFF]/60 font-light mt-1 max-w-2xl leading-relaxed">
                        Tap any visual story below for bite-sized vertical walkthroughs exploring master site plans, architectural floor plates, resort amenities, and MahaRERA certifications.
                    </p>
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center gap-2 self-start md:self-end">
                    <button
                        onClick={scrollLeft}
                        aria-label="Scroll left through Google Web Stories"
                        className="w-9 h-9 rounded-full bg-[#FFFFFF]/5 hover:bg-[#FFFFFF]/20 border border-[#FFFFFF]/10 text-white flex items-center justify-center transition-all"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={scrollRight}
                        aria-label="Scroll right through Google Web Stories"
                        className="w-9 h-9 rounded-full bg-[#FFFFFF]/5 hover:bg-[#FFFFFF]/20 border border-[#FFFFFF]/10 text-white flex items-center justify-center transition-all"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Horizontal Story Cards Carousel */}
            <div 
                ref={scrollContainerRef}
                className="flex items-stretch gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar scrollbar-none"
            >
                {WEB_STORIES.map((story) => (
                    <div
                        key={story.id}
                        onClick={() => openStory(story)}
                        className="flex-shrink-0 w-[240px] sm:w-[260px] aspect-[9/16] relative rounded-xl overflow-hidden border border-[#FFFFFF]/15 hover:border-[#C5A059] shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group flex flex-col justify-between p-4"
                    >
                        {/* Background Poster Image */}
                        <Image
                            src={story.coverImage}
                            alt={`${story.title} Visual Google Web Story — Shapoorji Pallonji ${story.location}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="260px"
                        />

                        {/* Top Gradient & Story Badges */}
                        <div className="relative z-10 flex items-center justify-between w-full">
                            <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md text-white text-[9px] px-2 py-1 rounded-full font-bold uppercase tracking-wider border border-white/20">
                                <Play size={8} className="fill-white" /> {story.slidesCount} Slides
                            </span>
                            <span className="text-[9px] bg-[#C5A059] text-black font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                {story.status}
                            </span>
                        </div>

                        {/* Center Hover Play Indicator */}
                        <div className="relative z-10 self-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-xl">
                            <Play size={20} className="fill-white ml-0.5" />
                        </div>

                        {/* Bottom Gradient & Project Details */}
                        <div className="relative z-10 bg-gradient-to-t from-black/95 via-black/70 to-transparent -mx-4 -mb-4 p-4 pt-10">
                            <span className="text-[9px] text-[#C5A059] font-mono tracking-wider uppercase block mb-1">
                                {story.location.split(',')[0]}
                            </span>
                            <h4 className="text-base font-serif text-white font-medium leading-snug group-hover:text-[#C5A059] transition-colors">
                                {story.title}
                            </h4>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20 text-[10px] text-white/80">
                                <span className="font-semibold text-white">{story.price}</span>
                                <span className="text-[9px] text-[#C5A059] uppercase tracking-widest font-bold flex items-center gap-1">
                                    Watch Story →
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Interactive Full-Screen Web Story Viewer Modal */}
            {activeStory && (
                <div 
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${activeStory.title} Google Web Story Fullscreen Player`}
                    className="fixed inset-0 z-[9999] bg-[#0A0D14]/98 backdrop-blur-2xl flex items-center justify-center p-0 sm:p-4"
                >
                    {/* Story Player Container (Mobile 9:16 Aspect Box) */}
                    <div className="relative w-full h-full sm:max-w-md sm:h-[90vh] sm:max-h-[860px] bg-black sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between border sm:border-white/20">
                        {/* Slide Background Image */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src={activeStory.slides[currentSlideIndex].image}
                                alt={`${activeStory.title} — ${activeStory.slides[currentSlideIndex].title} (${activeStory.slides[currentSlideIndex].tag})`}
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Cinematic Dark Gradient Layers */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
                        </div>

                        {/* Top Story Header & Progress Bars */}
                        <div className="relative z-20 p-4 space-y-3">
                            {/* Segmented Progress Bars */}
                            <div className="flex items-center gap-1.5 w-full">
                                {activeStory.slides.map((_, idx) => (
                                    <div 
                                        key={idx}
                                        className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
                                    >
                                        <div 
                                            className="h-full bg-white transition-all duration-75"
                                            style={{
                                                width: idx < currentSlideIndex 
                                                    ? '100%' 
                                                    : idx === currentSlideIndex 
                                                    ? `${progress}%` 
                                                    : '0%'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Story Meta & Controls */}
                            <div className="flex items-center justify-between text-white">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-[#1D4F9C] text-white flex items-center justify-center font-bold text-xs shadow-md border border-white/20">
                                        SP
                                    </div>
                                    <div>
                                        <span className="text-xs font-serif font-medium block leading-none">
                                            {activeStory.title}
                                        </span>
                                        <span className="text-[9px] text-[#C5A059] uppercase tracking-wider">
                                            Slide {currentSlideIndex + 1} of {activeStory.slides.length}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setIsPaused(prev => !prev)}
                                        aria-label={isPaused ? "Play story" : "Pause story"}
                                        className="p-2 hover:bg-white/20 rounded-full text-white/90 hover:text-white transition-colors"
                                    >
                                        {isPaused ? <Play size={16} /> : <Pause size={16} />}
                                    </button>
                                    <button
                                        onClick={closeStory}
                                        aria-label="Close story"
                                        className="p-2 hover:bg-white/20 rounded-full text-white/90 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Touch / Click Tap Zones for Navigation */}
                        <div className="absolute inset-y-24 inset-x-0 z-10 flex">
                            <div 
                                onClick={prevSlide}
                                aria-label="Previous slide"
                                className="w-1/3 h-full cursor-w-resize"
                            />
                            <div 
                                onClick={() => setIsPaused(prev => !prev)}
                                aria-label="Toggle pause"
                                className="w-1/3 h-full cursor-pointer"
                            />
                            <div 
                                onClick={nextSlide}
                                aria-label="Next slide"
                                className="w-1/3 h-full cursor-e-resize"
                            />
                        </div>

                        {/* Bottom Slide Content Card */}
                        <div className="relative z-20 p-5 pb-6 text-white space-y-3 bg-gradient-to-t from-black via-black/90 to-transparent pt-12">
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold uppercase tracking-widest bg-[#C5A059] text-black px-2.5 py-0.5 rounded-sm">
                                    {activeStory.slides[currentSlideIndex].tag}
                                </span>
                                <span className="text-[10px] text-white/70 font-light flex items-center gap-1">
                                    <MapPin size={11} className="text-[#C5A059]" /> {activeStory.location}
                                </span>
                            </div>

                            <h3 className="text-2xl font-serif text-white font-normal leading-tight">
                                {activeStory.slides[currentSlideIndex].title}
                            </h3>

                            <p className="text-xs text-white/80 font-light leading-relaxed">
                                {activeStory.slides[currentSlideIndex].description}
                            </p>

                            {/* Slide Key Metrics */}
                            {activeStory.slides[currentSlideIndex].metrics && (
                                <div className="grid grid-cols-3 gap-2 bg-white/10 backdrop-blur-md rounded-lg p-2.5 border border-white/10">
                                    {activeStory.slides[currentSlideIndex].metrics?.map((m, i) => (
                                        <div key={i} className="text-center">
                                            <span className="text-[8px] uppercase tracking-wider text-white/60 block">{m.label}</span>
                                            <span className="text-[11px] font-bold text-[#C5A059]">{m.value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Slide Direct Actions */}
                            <div className="pt-2 flex items-center gap-2">
                                <Link
                                    href={`/projects/${activeStory.projectSlug}`}
                                    onClick={closeStory}
                                    className="flex-1 py-3 bg-[#1D4F9C] hover:bg-[#153a75] text-white rounded-lg text-center text-xs font-bold tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-1.5"
                                >
                                    Explore Project Page <ExternalLink size={13} />
                                </Link>
                                <button
                                    onClick={nextSlide}
                                    className="px-4 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
