import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Ensure write token exists
const writeToken = process.env.SANITY_API_WRITE_TOKEN;
if (!writeToken) {
  console.error('Error: SANITY_API_WRITE_TOKEN is missing in .env.local');
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'b77dwhwwyes',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: writeToken,
});

const faqs = [
  {
    question: 'What is Transpario?',
    answer: 'Transpario is an internship transparency platform that helps students understand internship opportunities through structured information and real student experiences.',
  },
  {
    question: 'Does Transpario rate companies?',
    answer: 'No. The MVP does not use company ratings, star scores, or numerical rankings.',
  },
  {
    question: 'Does Transpario call internships scams?',
    answer: 'Transpario is designed to present neutral, factual information rather than automatically labeling programs as scams or frauds.',
  },
  {
    question: 'What does "Payment Required" mean?',
    answer: 'It means the available information indicates that payment from the student is required for the relevant internship program or participation.',
  },
  {
    question: 'What does "Not Disclosed" mean?',
    answer: 'It means Transpario does not currently have enough information to make a stronger classification. It does not automatically mean the feature does not exist.',
  },
  {
    question: 'Are student reviews verified?',
    answer: 'Submissions are reviewed by the Transpario team. Where relevant, supporting evidence may be considered. A published student experience still represents an individual\'s experience.',
  },
  {
    question: 'Can I submit an internship experience?',
    answer: 'Yes. Use the "Share Your Experience" form to submit your experience.',
  },
  {
    question: 'Will my submission be published automatically?',
    answer: 'No. Submissions are reviewed before any information is published.',
  },
  {
    question: 'Can I submit anonymously?',
    answer: 'Yes, where the review workflow allows anonymous publication. Contact information may still be requested privately for clarification.',
  },
  {
    question: 'Does Transpario charge companies to be listed?',
    answer: 'The MVP is designed around independent information and does not use paid placement as a basis for public classification.',
  },
  {
    question: 'Can internship information change?',
    answer: 'Yes. Internship programs can change over time. Transpario therefore displays a Last Reviewed date.',
  },
];

async function seedData() {
  console.log('Starting data sync to Sanity...');
  
  try {
    for (const [index, faq] of faqs.entries()) {
      const doc = {
        _type: 'faq',
        question: faq.question,
        answer: faq.answer,
        order: index,
        published: true,
      };
      
      await client.create(doc);
      console.log(`Created FAQ: ${faq.question}`);
    }
    
    // Create site settings
    const siteSettings = {
      _type: 'siteSettings',
      _id: 'siteSettings',
      title: 'Transpario',
      description: 'A neutral internship transparency platform helping students understand what they\'re choosing.',
      reviewFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScbVhsiH_WbHZc2TYnn2_0tKSkiB-7ai4h7nlSzPX-mQLQSIA/viewform',
    };
    
    await client.createIfNotExists(siteSettings);
    console.log('Created Site Settings document');
    
    console.log('✅ Sync completed successfully!');
  } catch (error) {
    console.error('Error syncing data:', error.message);
  }
}

seedData();
