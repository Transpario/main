import React from 'react';
import Container from '@/components/layout/Container';
import { Metadata } from 'next';
import { ExperienceForm } from '@/components/experience/ExperienceForm';

export const metadata: Metadata = {
  title: 'Report an Internship — Transpario',
  description: 'Tell us what happened. Submit your field notes to help another student make an informed decision.',
};

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-background">
      <Container wide>
        
        {/* Editorial Header */}
        <section className="pt-16 pb-12 md:pt-24 md:pb-16 text-center max-w-2xl mx-auto">
          <span className="block text-index-number mb-6 md:mb-10 text-center">
            FIELD NOTES
          </span>
          <h1 className="text-[28px] md:text-[40px] font-heading font-bold uppercase tracking-tight text-foreground mb-4 leading-tight">
            Report an internship.
          </h1>
          <p className="text-[16px] md:text-[18px] text-foreground-muted leading-relaxed">
            Not a rating. Not a review. Just a personal account of what actually happened during your internship.
          </p>
        </section>

        <hr className="editorial-rule max-w-4xl mx-auto" />

        {/* The Interactive Form */}
        <section>
          <ExperienceForm />
        </section>

      </Container>
    </div>
  );
}
