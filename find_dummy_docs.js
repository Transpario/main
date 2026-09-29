import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: false,
});

async function findDummyDocs() {
  const query = `*[_type in ["internshipProgram", "internshipPlatform", "studentReview"]] { _id, _type, name, title, role, displayName, "platformName": platform->name }`;
  const docs = await client.fetch(query);
  console.log("Total docs:", docs.length);
  docs.forEach(d => {
    if ((d.name && d.name.toLowerCase().includes('dummy')) || 
        (d.name && d.name.toLowerCase().includes('test')) ||
        (d.title && d.title.toLowerCase().includes('dummy')) ||
        (d.title && d.title.toLowerCase().includes('test')) ||
        (d.role && d.role.toLowerCase().includes('dummy')) ||
        (d.role && d.role.toLowerCase().includes('test')) ||
        (d.displayName && d.displayName.toLowerCase().includes('dummy')) ||
        (d.displayName && d.displayName.toLowerCase().includes('test')) ||
        (d.platformName && d.platformName.toLowerCase().includes('dummy')) ||
        (d.platformName && d.platformName.toLowerCase().includes('test'))) {
      console.log(`- ${d._type}: "${d.name || d.title || d.role || d.displayName}" (_id: ${d._id})`);
    } else {
        // Just print all of them so I can see what might be dummy
        console.log(`- ${d._type}: "${d.name || d.title || d.role || d.displayName}" (_id: ${d._id})`);
    }
  });
}
findDummyDocs().catch(console.error);
