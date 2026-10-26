import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { blogs } from '@/data/blogs';
import { localities } from '@/data/localities';
import { experts } from '@/data/experts';
import { TOPIC_HUBS } from '@/data/TopicIntelligence';
import { NRI_REGIONS } from '@/data/GlobalNRI';
import { SEO_ROUTES } from '@/data/seo-routes';
import { generateUnitSlug } from '@/utils/seo-utils';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://joyville-homes.com';

    // Phase 38: Cap all dates to today — future-dated lastmod suppresses Google indexing
    const today = new Date();
    const capDate = (date: Date): Date => date > today ? today : date;

    const getGeneralLastMod = () => {
        const projectDates = projects.map(p => p.lastDataAudit ? new Date(p.lastDataAudit).getTime() : 0);
        const blogDates = blogs.map(b => new Date(b.date).getTime());
        const raw = new Date(Math.max(...projectDates, ...blogDates, new Date('2024-03-25').getTime()));
        return capDate(raw);
    };

    const generalLastMod = getGeneralLastMod();

    // Phase 38: Tiered priority system — if everything is priority 1, nothing is
    const baseRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}`,
            lastModified: today,
            changeFrequency: 'daily',
            priority: 1.0, // Homepage — sole priority 1.0
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: today,
            changeFrequency: 'daily',
            priority: 0.95,
        },
        {
            url: `${baseUrl}/location`,
            lastModified: generalLastMod,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/amenities`,
            lastModified: generalLastMod,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/insights`,
            lastModified: today,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/roi-calculator`,
            lastModified: today,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/media`,
            lastModified: generalLastMod,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/press-research`,
            lastModified: today,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/locality/compare`,
            lastModified: today,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/pune-real-estate-guide`,
            lastModified: generalLastMod,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/pune-real-estate-market`,
            lastModified: today,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/insights/joyville-vs-competitors`,
            lastModified: today,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/flats-in-pune`,
            lastModified: today,
            changeFrequency: 'daily',
            priority: 0.95,
        },
        {
            url: `${baseUrl}/glossary`,
            lastModified: generalLastMod,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/insights/matchmaker`,
            lastModified: today,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/ar/projects`,
            lastModified: today,
            changeFrequency: 'daily',
            priority: 0.9, // High priority for localized Middle East traffic
        },
    ];

    const toAbsoluteUrl = (pathOrUrl: string): string => {
        if (!pathOrUrl) return '';
        if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
            return pathOrUrl;
        }
        return `${baseUrl}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
    };

    // Phase 38: Per-project lastModified — capped to prevent future dates
    const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => {
        const rawDate = project.lastDataAudit ? new Date(project.lastDataAudit) : generalLastMod;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sitemapEntry: any = {
            url: `${baseUrl}/projects/${project.slug}`,
            lastModified: capDate(rawDate),
            changeFrequency: 'weekly',
            priority: 0.9,
        };
        // Safely add images (Google XML Sitemap specification requires fully qualified absolute URLs)
        if (project.gallery && project.gallery.length > 0) {
            sitemapEntry.images = project.gallery
                .map((img: unknown) => {
                    const str = typeof img === 'string' ? img : (img && typeof img === 'object' && 'url' in img) ? (img as { url: string }).url : '';
                    return toAbsoluteUrl(str);
                })
                .filter((url: string) => Boolean(url) && url.startsWith('http'));
        } else if (project.image) {
            const abs = toAbsoluteUrl(project.image);
            if (abs.startsWith('http')) {
                sitemapEntry.images = [abs];
            }
        }
        return sitemapEntry;
    });

    // Phase 38: Programmatic SEO routes — pointing to canonical /properties/[seoSlug]
    const programmaticRoutes: MetadataRoute.Sitemap = SEO_ROUTES.map((route) => {
        const isHighIntent = route.slug.includes('wipro') || route.slug.includes('infosys') || route.slug.includes('tcs') || route.slug.includes('cognizant') || route.slug.includes('duplex') || route.slug.includes('cost-sheet') || route.slug.includes('possession') || route.slug.includes('villas');
        return {
            url: `${baseUrl}/properties/${route.slug}`,
            lastModified: today,
            changeFrequency: 'weekly',
            priority: isHighIntent ? 0.92 : 0.85, // High priority for transactional programmatic routes
        };
    });

    // Landmark proximity landing pages
    const landmarkRoutes: MetadataRoute.Sitemap = [
        'infosys-hinjewadi',
        'wtc-pune',
        'magarpatta-city',
        'symbiosis-university',
        'bavdhan-highway'
    ].map((slug) => ({
        url: `${baseUrl}/flats-near-${slug}`,
        lastModified: today,
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // Blog routes use actual publication dates for genuine freshness
    // Phase 38: Blog routes — cap future dates to today
    const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => {
        const isClusterGuide = blog.category === 'Master Guides' || blog.category === 'Project Clusters';
        return {
            url: `${baseUrl}/insights/${blog.slug}`,
            lastModified: capDate(new Date(blog.date)),
            changeFrequency: isClusterGuide ? 'weekly' : 'monthly',
            priority: isClusterGuide ? 0.85 : 0.75,
        };
    });

    const localityRoutes: MetadataRoute.Sitemap = localities.map((loc) => ({
        url: `${baseUrl}/locality/${loc.slug}`,
        lastModified: today,
        changeFrequency: 'weekly', 
        priority: 0.8,
    }));

    const authorRoutes: MetadataRoute.Sitemap = experts.map(expert => ({
        url: `${baseUrl}/insights/author/${expert.id}`,
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    const topicRoutes: MetadataRoute.Sitemap = TOPIC_HUBS.map(topic => ({
        url: `${baseUrl}/insights/topic/${topic.id}`,
        lastModified: today,
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    const regionalNRIRoutes: MetadataRoute.Sitemap = NRI_REGIONS.map(region => ({
        url: `${baseUrl}/insights/nri/region/${region.id}`,
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    const unitRoutes: MetadataRoute.Sitemap = projects.flatMap(project => 
        project.floorPlans.map(plan => ({
            url: `${baseUrl}/properties/unit/${generateUnitSlug(project.title, plan.type, project.location)}`,
            lastModified: today,
            changeFrequency: 'weekly',
            priority: 0.82, // High intent deep links
        }))
    );

    return [...baseRoutes, ...projectRoutes, ...blogRoutes, ...localityRoutes, ...programmaticRoutes, ...landmarkRoutes, ...authorRoutes, ...topicRoutes, ...regionalNRIRoutes, ...unitRoutes];
}
