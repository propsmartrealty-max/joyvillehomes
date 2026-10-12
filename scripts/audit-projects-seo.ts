import { projects } from '../src/data/projects';

console.log('=== Shapoorji Pune Projects SEO Hardening Audit ===\n');

projects.forEach((p, idx) => {
  console.log(`[${idx + 1}] ${p.title} (ID: ${p.id}, Slug: ${p.slug})`);
  console.log(`- Location: ${p.location}`);
  console.log(`- Price: ${p.price}`);
  console.log(`- Status: ${p.status}`);
  console.log(`- RERA: ${p.reraNumber || 'MISSING'}`);
  console.log(`- Image: ${p.image}`);
  console.log(`- Floor Plans count: ${p.floorPlans?.length || 0}`);
  console.log(`- Gallery count: ${p.gallery?.length || 0}`);
  console.log(`- Amenities categories: ${p.amenities?.length || 0}`);
  console.log(`- Specifications categories: ${p.specifications?.length || 0}`);
  console.log(`- Highlights count: ${p.highlights?.length || 0}`);
  console.log(`- Overview paragraphs: ${p.overview?.length || 0}`);
  console.log(`- Construction Update: ${p.constructionUpdate ? `${p.constructionUpdate.percentage}% - ${p.constructionUpdate.statusText}` : 'MISSING'}`);
  console.log(`- Map Iframe: ${p.locationDetails?.iframeSrc ? 'YES' : 'MISSING'}`);
  console.log(`- Landmarks count: ${p.locationDetails?.landmarks?.length || 0}`);
  console.log(`- Reviews count: ${p.reviews?.length || 0}`);
  console.log(`- Claims count: ${p.claims?.length || 0}`);
  console.log(`- FAQs count in projects.ts: ${p.answerGraph?.length || 0}`);
  console.log('--------------------------------------------------');
});
