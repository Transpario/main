import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'Transpario',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({
      // We can customize the structure here later
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
