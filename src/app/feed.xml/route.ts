import { projects } from '@/data/projects';
import { SEO_ROUTES } from '@/data/seo-routes';
import { blogs } from '@/data/blogs';

export const dynamic = 'force-static';

export async function GET() {
    const siteUrl = 'https://joyville-homes.com';
    const now = new Date();
    const timestamp = now.toUTCString();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Joyville Homes Pune | Real Estate Updates</title>
    <link>${siteUrl}</link>
    <description>Latest premium residential projects and real estate market updates from Shapoorji Pallonji Joyville Homes.</description>
    <lastBuildDate>${timestamp}</lastBuildDate>
    <atom:link rel="hub" href="https://pubsubhubbub.appspot.com/"/>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
`;

    // 1. Add Projects as RSS Items
    projects.forEach((project) => {
        const pubDate = project.lastDataAudit ? new Date(project.lastDataAudit).toUTCString() : timestamp;
        xml += `
    <item>
      <title><![CDATA[${project.title} - Shapoorji Pallonji Pune]]></title>
      <link>${siteUrl}/projects/${project.slug}</link>
      <guid isPermaLink="true">${siteUrl}/projects/${project.slug}</guid>
      <description><![CDATA[${project.description} Price: ${project.price}. Status: ${project.status}. Location: ${project.location}.]]></description>
      <pubDate>${pubDate}</pubDate>
      <category>Residential Project</category>
    </item>`;
    });

    // 2. Add Blogs and Market Intelligence Reports
    blogs.forEach((blog) => {
        const pubDate = blog.date ? new Date(blog.date).toUTCString() : timestamp;
        xml += `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${siteUrl}/insights/${blog.slug}</link>
      <guid isPermaLink="true">${siteUrl}/insights/${blog.slug}</guid>
      <description><![CDATA[${blog.excerpt || blog.title}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category>${blog.category || 'Real Estate Insights'}</category>
    </item>`;
    });

    // 3. Add all Programmatic SEO Landing Pages
    SEO_ROUTES.forEach((route) => {
        xml += `
    <item>
      <title><![CDATA[${route.title}]]></title>
      <link>${siteUrl}/properties/${route.slug}</link>
      <guid isPermaLink="true">${siteUrl}/properties/${route.slug}</guid>
      <description><![CDATA[${route.description}]]></description>
      <pubDate>${timestamp}</pubDate>
      <category>Market Intelligence</category>
    </item>`;
    });

    xml += `
  </channel>
</rss>`;

    return new Response(xml, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
