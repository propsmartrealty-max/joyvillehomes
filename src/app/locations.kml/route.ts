import { projects } from '@/data/projects';

export const dynamic = 'force-static';

export async function GET() {
    let kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Joyville Homes Pune Locations</name>
    <description>Premium residential projects by Shapoorji Pallonji across Pune.</description>
`;

    // Add placemarks for the projects
    projects.forEach((project) => {
        let lat = project.latitude || 18.5913;
        let lng = project.longitude || 73.7389;

        if (!project.latitude || !project.longitude) {
            if (project.location.includes('Hadapsar') || project.location.includes('Shewalewadi')) {
                lat = 18.5089;
                lng = 73.9259;
            } else if (project.location.includes('Bavdhan')) {
                lat = 18.5158;
                lng = 73.7819;
            } else if (project.location.includes('Purandar')) {
                lat = 18.2818;
                lng = 73.9877;
            }
        }

        kml += `
    <Placemark>
      <name>${project.title}</name>
      <description><![CDATA[
        <p>${project.description}</p>
        <p><a href="https://joyville-homes.com/projects/${project.slug}">View Project</a></p>
      ]]></description>
      <Point>
        <coordinates>${lng},${lat},0</coordinates>
      </Point>
      <Polygon>
        <outerBoundaryIs>
          <LinearRing>
            <coordinates>
              ${lng - 0.005},${lat - 0.005},0
              ${lng + 0.005},${lat - 0.005},0
              ${lng + 0.005},${lat + 0.005},0
              ${lng - 0.005},${lat + 0.005},0
              ${lng - 0.005},${lat - 0.005},0
            </coordinates>
          </LinearRing>
        </outerBoundaryIs>
      </Polygon>
    </Placemark>`;
    });

    kml += `
  </Document>
</kml>`;

    return new Response(kml, {
        status: 200,
        headers: {
            'Content-Type': 'application/vnd.google-earth.kml+xml',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
        },
    });
}
