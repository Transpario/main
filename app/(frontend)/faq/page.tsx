import React from 'react';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import FaqClient from '@/components/faq/FaqClient';
import { client } from '@/lib/sanity/client';
import { getPublishedFAQs } from '@/lib/sanity/queries';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Transpario',
  description: 'Common questions and answers about Transpario and how it works.',
};

// Fallback static FAQs from SITE_CONTENT.md §51
const staticFaqs = [
  {
    _id: '1',
    question: 'What is Transpario?',
    answer: 'Transpario is an internship transparency platform that helps students understand internship opportunities through structured information and real student experiences.',
    category: 'About the Platform',
  },
  {
    _id: '2',
    question: 'Does Transpario rate companies?',
    answer: 'No. The MVP does not use company ratings, star scores, or numerical rankings.',
    category: 'About the Platform',
  },
  {
    _id: '3',
    question: 'Does Transpario call internships scams?',
    answer: 'Transpario is designed to present neutral, factual information rather than automatically labeling programs as scams or frauds.',
    category: 'About the Platform',
  },
  {
    _id: '4',
    question: 'What does "Payment Required" mean?',
    answer: 'It means the available information indicates that payment from the student is required for the relevant internship program or participation.',
    category: 'Classifications & Evidence',
  },
  {
    _id: '5',
    question: 'What does "Not Disclosed" mean?',
    answer: 'It means Transpario does not currently have enough information to make a stronger classification. It does not automatically mean the feature does not exist.',
    category: 'Classifications & Evidence',
  },
  {
    _id: '6',
    question: 'Are student reviews verified?',
    answer: 'Submissions are reviewed by the Transpario team. Where relevant, supporting evidence may be considered. A published student experience still represents an individual\'s experience.',
    category: 'Classifications & Evidence',
  },
  {
    _id: '7',
    question: 'Can I submit an internship experience?',
    answer: 'Yes. Use the "Report an Internship" form to submit your experience.',
    category: 'Submitting Experiences',
  },
  {
    _id: '8',
    question: 'Will my submission be published automatically?',
    answer: 'No. Submissions are reviewed before any information is published.',
    category: 'Submitting Experiences',
  },
  {
    _id: '9',
    question: 'Can I submit anonymously?',
    answer: 'Yes, where the review workflow allows anonymous publication. Contact information may still be requested privately for clarification.',
    category: 'Submitting Experiences',
  },
  {
    _id: '10',
    question: 'Does Transpario charge companies to be listed?',
    answer: 'The MVP is designed around independent information and does not use paid placement as a basis for public classification.',
    category: 'About the Platform',
  },
  {
    _id: '11',
    question: 'Can internship information change?',
    answer: 'Yes. Internship programs can change over time. Transpario therefore displays a Last Reviewed date.',
    category: 'About the Platform',
  },
];

export const revalidate = 3600; // Revalidate every hour

export default async function FaqPage() {
  const sanityFaqs = await client.fetch(getPublishedFAQs);
  const faqs = sanityFaqs && sanityFaqs.length > 0 ? sanityFaqs : staticFaqs;

  return (
    <div className="bg-background text-foreground min-h-screen py-12 md:py-20">
      <Section>
        <Container className="max-w-4xl">
          <div className="mb-10 md:mb-14">
            <SectionLabel className="mb-3">HELP & KNOWLEDGE BASE</SectionLabel>
            <h1 className="text-h1 uppercase tracking-tight text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-body-lg text-foreground-muted leading-relaxed font-normal max-w-2xl">
              Find answers to common questions about Transpario, our classification methodology, and submission workflows.
            </p>
          </div>

          <FaqClient faqs={faqs} />
        </Container>
      </Section>
    </div>
  );
}
