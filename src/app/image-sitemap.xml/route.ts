import { projects } from '@/data/projects';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
    const baseUrl = 'https://joyville-homes.com';

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
    xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    projects.forEach(project => {
        interface ImageEntry {
            url: string;
            title: string;
            caption?: string;
        }

        const entries: ImageEntry[] = [];
        const seenUrls = new Set<string>();

        const addImage = (url: string, title: string, caption?: string) => {
            if (!url || seenUrls.has(url)) return;
            seenUrls.add(url);
            const absoluteUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
            entries.push({ url: absoluteUrl, title, caption });
        };

        if (project.image) {
            addImage(
                project.image,
                `${project.title} - Shapoorji Pallonji ${project.location}`,
                `Official residential exterior facade and tower overview of ${project.title} in ${project.location}`
            );
        }

        if (project.masterLayout) {
            addImage(
                project.masterLayout,
                `${project.title} - Master Layout & Macro Development Plan`,
                `Certified architectural master layout and site development plan for ${project.title} in ${project.location}`
            );
        }

        if (project.floorPlans && project.floorPlans.length > 0) {
            project.floorPlans.forEach(plan => {
                if (plan.image) {
                    addImage(
                        plan.image,
                        `${project.title} - ${plan.type} Floor Plan Blueprint`,
                        `${project.title} ${plan.type} architectural unit blueprint (${plan.carpetArea}) in ${project.location}`
                    );
                }
            });
        }

        if (project.gallery && project.gallery.length > 0) {
            project.gallery.forEach((img: unknown, idx: number) => {
                const imgUrl = typeof img === 'string' ? img : (img && typeof img === 'object' && 'url' in img) ? (img as { url: string }).url : null;
                if (imgUrl) {
                    addImage(
                        imgUrl,
                        `${project.title} Gallery Photo ${idx + 1}`,
                        `Lifestyle amenities and residential features at ${project.title}, ${project.location}`
                    );
                }
            });
        }

        if (entries.length > 0) {
            xml += `  <url>\n`;
            xml += `    <loc>${baseUrl}/projects/${project.slug}</loc>\n`;
            
            entries.forEach(entry => {
                xml += `    <image:image>\n`;
                xml += `      <image:loc>${entry.url}</image:loc>\n`;
                xml += `      <image:title><![CDATA[${entry.title}]]></image:title>\n`;
                if (entry.caption) {
                    xml += `      <image:caption><![CDATA[${entry.caption}]]></image:caption>\n`;
                }
                xml += `    </image:image>\n`;
            });
            
            xml += `  </url>\n`;
        }
    });

    xml += `</urlset>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate',
        },
    });
}
