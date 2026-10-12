import { projects } from '../src/data/projects';

console.log(`=== Total Projects: ${projects.length} ===`);
projects.forEach((p, i) => {
  console.log(`\n--- [${i + 1}] ${p.title} (${p.slug}) ---`);
  console.log(`Location: ${p.location}`);
  console.log(`Price: ${p.price}`);
  console.log(`Type: ${p.type} | Status: ${p.status}`);
  console.log(`RERA: ${p.reraNumber || 'N/A'}`);
  console.log(`Image: ${p.image}`);
  console.log(`Floor Plans: ${p.floorPlans.length} | Gallery: ${p.gallery.length} | Amenities: ${p.amenities.reduce((acc, a) => acc + a.items.length, 0)}`);
  console.log(`Construction Update: ${p.constructionUpdate ? `${p.constructionUpdate.percentage}% - ${p.constructionUpdate.statusText}` : 'N/A'}`);
  console.log(`Coordinates: ${p.locationDetails?.landmarks?.length || 0} landmarks`);
});
