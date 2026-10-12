import { projects } from '@/data/projects';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
    const baseUrl = 'https://joyville-homes.com';

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
    xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    projects.forEach(project => {
        // Collect all available valid images for this project
        const images = new Set<string>();
        
        if (project.image) images.add(project.image);
        if (project.masterLayout) images.add(project.masterLayout);
        if (project.videoThumbnail) images.add(project.videoThumbnail);
        
        if (project.gallery && project.gallery.length > 0) {
            project.gallery.forEach((img: unknown) => {
                if (typeof img === 'string') {
                    images.add(img);
                } else if (img && typeof img === 'object' && 'url' in img && typeof (img as {url: string}).url === 'string') {
                    images.add((img as {url: string}).url);
                }
            });
        }

        if (images.size > 0) {
            xml += `  <url>\n`;
            xml += `    <loc>${baseUrl}/projects/${project.slug}</loc>\n`;
            
            images.forEach(imgUrl => {
                // Ensure absolute URL
                const absoluteImgUrl = imgUrl.startsWith('http') ? imgUrl : `${baseUrl}${imgUrl}`;
                xml += `    <image:image>\n`;
                xml += `      <image:loc>${absoluteImgUrl}</image:loc>\n`;
                xml += `      <image:title><![CDATA[${project.title} - ${project.location}]]></image:title>\n`;
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
