import { projects } from '@/data/projects';
import { parsePriceToINR } from '@/utils/seo-utils';

export const dynamic = 'force-static';

export async function GET() {
    const siteUrl = 'https://joyville-homes.com';
    const timestamp = new Date().toUTCString();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
    <channel>
        <title>Joyville Homes Pune | Premium Real Estate</title>
        <link>${siteUrl}</link>
        <description>Shapoorji Pallonji Joyville Homes Premium Residences</description>
        <lastBuildDate>${timestamp}</lastBuildDate>
`;

    // Add Projects as Products
    projects.forEach((project) => {
        const numericPrice = parsePriceToINR(project.price);
        const isPreOrder = project.status.toLowerCase().includes('launch') || project.status.toLowerCase().includes('pre');
        const availability = isPreOrder ? 'preorder' : 'in_stock';
        const rera = Array.isArray(project.reraNumber) ? project.reraNumber[0] : (project.reraNumber || 'PR1260002600999');

        xml += `
        <item>
            <g:id>${project.id}</g:id>
            <g:title><![CDATA[${project.title} | Shapoorji Pallonji ${project.location}]]></g:title>
            <g:description><![CDATA[${project.description} MahaRERA: ${rera}. Price: ${project.price}.]]></g:description>
            <g:link>${siteUrl}/projects/${project.slug}</g:link>
            <g:image_link>${siteUrl}${project.image}</g:image_link>
            <g:condition>new</g:condition>
            <g:availability>${availability}</g:availability>
            <g:price>${numericPrice}.00 INR</g:price>
            <g:brand>Shapoorji Pallonji</g:brand>
            <g:google_product_category>Real Estate &gt; Residential Properties</g:google_product_category>
            <g:product_type>Real Estate &gt; Residential &gt; ${project.type}</g:product_type>
            <g:custom_label_0>${project.location}</g:custom_label_0>
            <g:custom_label_1>${project.type}</g:custom_label_1>
            <g:custom_label_2>${project.status}</g:custom_label_2>
            <g:mpn>${rera}</g:mpn>
        </item>`;
    });

    xml += `
    </channel>
</rss>`;

    return new Response(xml, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
        },
    });
}
