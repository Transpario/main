import React from 'react';
import { sanityFetch } from '@/lib/sanity/client';
import { getAllPublishedReviews } from '@/lib/sanity/queries';
import { StudentReview } from '@/lib/sanity/types';
import Container from '@/components/layout/Container';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Student Experiences - Transpario',
  description: 'What happened during the internship, from the people who were there.',
};

export default async function ExperiencesIndexPage() {
  const reviews = await sanityFetch<StudentReview[]>({
    query: getAllPublishedReviews,
  }) || [];

  return (
    <div className="min-h-screen bg-background">
      <Container wide>
        
        {/* Editorial Header */}
        <section className="pt-16 pb-12 md:pt-24 md:pb-20 border-b border-white/[0.06]">
          <h1 className="text-section-heading text-foreground mb-4">
            Student<br />Experiences
          </h1>
          <p className="text-[16px] md:text-[18px] text-foreground-muted max-w-xl leading-relaxed">
            What happened during the internship, from the people who were there.
          </p>
        </section>

        {reviews.length > 0 ? (
          <section className="pb-24">
            {reviews.map((review, i) => {
              const number = String(i + 1).padStart(2, '0');
              
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const internship = review.internship as any;
              
              const platformName = internship?.platform?.name || 'Unknown Company';
              const roleName = internship?.role || internship?.name || 'Unknown Role';
              
              const year = review.publishedAt 
                ? new Date(review.publishedAt).getFullYear() 
                : new Date().getFullYear();

              return (
                <article key={review._id} className="group border-b border-white/[0.06] last:border-b-0 py-12 md:py-16">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                    
                    {/* Number & Metadata */}
                    <div className="md:w-1/3 shrink-0">
                      <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle mb-6">
                        {number}
                      </span>
                      
                      <h2 className="text-[18px] font-heading font-bold uppercase tracking-tight text-foreground mb-2">
                        {roleName}
                      </h2>
                      
                      <p className="text-[14px] font-heading font-semibold text-accent mb-6 uppercase tracking-wider">
                        {platformName}
                      </p>
                      
                      <div className="text-[12px] font-heading font-bold uppercase tracking-[0.1em] text-foreground-subtle flex items-center gap-3">
                        <span>{year}</span>
                      </div>
                    </div>

                    {/* Excerpt & CTA */}
                    <div className="md:w-2/3 flex flex-col items-start">
                      {review.experience ? (
                        <div className="prose prose-invert prose-p:text-[18px] md:prose-p:text-[22px] prose-p:text-foreground prose-p:leading-relaxed max-w-2xl mb-8 line-clamp-4">
                          <PortableText value={review.experience} />
                        </div>
                      ) : review.keyTakeaway ? (
                        <blockquote className="text-[18px] md:text-[22px] text-foreground mb-8 leading-relaxed max-w-2xl italic">
                          &quot;{review.keyTakeaway}&quot;
                        </blockquote>
                      ) : (
                        <p className="text-[18px] md:text-[22px] text-foreground mb-8 leading-relaxed max-w-2xl italic opacity-50">
                          (Experience details withheld or unavailable)
                        </p>
                      )}

                      <Link 
                        href={`/experiences/${review._id}`}
                        className="inline-flex items-center gap-2 text-[12px] font-heading font-bold uppercase tracking-[0.1em] text-foreground-muted group-hover:text-white transition-colors mt-auto"
                      >
                        <span>Read Experience</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-accent transition-all" />
                      </Link>
                    </div>
                    
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          /* Empty State */
          <section className="py-24 text-center flex flex-col items-center">
            <h2 className="text-[24px] md:text-[32px] font-heading font-bold uppercase tracking-tight text-foreground mb-4">
              No Experiences Yet.
            </h2>
            <p className="text-[16px] text-foreground-muted mb-8 max-w-md">
              Be the first student to tell us what happened.
            </p>
            <Link 
              href="/review"
              className="inline-flex items-center gap-3 h-[44px] px-6 bg-white !text-black font-heading font-bold text-[13px] uppercase tracking-[0.1em] rounded-[var(--radius)] hover:bg-white/90 hover:!text-black transition-all"
            >
              <span>Share My Experience</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        )}
      </Container>
    </div>
  );
}
