import React from 'react';
import { notFound } from 'next/navigation';
import { getReviewById } from '@/lib/sanity/queries';
import { sanityFetch } from '@/lib/sanity/client';
import { StudentReview } from '@/lib/sanity/types';
import Container from '@/components/layout/Container';
import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const review = await sanityFetch<StudentReview>({
    query: getReviewById,
    params: { id },
  });

  if (!review) {
    return { title: 'Not Found' };
  }
  
  // @ts-ignore
  const roleName = review.internship?.role || review.internship?.name || 'Internship';

  return {
    title: `Student Experience: ${roleName} | Transpario`,
    description: `Read a student's personal account and field notes.`,
  };
}

export default async function ExperienceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const review = await sanityFetch<StudentReview>({
    query: getReviewById,
    params: { id },
  });

  if (!review) {
    notFound();
  }

  // @ts-ignore
  const internship = review.internship as any;
  const platformName = internship?.platform?.name || 'Unknown Company';
  const roleName = internship?.role || internship?.name || 'Unknown Role';
  const slug = internship?.slug?.current;

  const year = review.publishedAt 
    ? new Date(review.publishedAt).getFullYear() 
    : new Date().getFullYear();

  const authorName = review.anonymous ? 'ANONYMOUS STUDENT' : (review.displayName || 'STUDENT');

  return (
    <div className="min-h-screen bg-background">
      <Container wide>
        
        {/* ═══════════════════════════════════════════════
            HEADER
        ═══════════════════════════════════════════════ */}
        <section className="pt-16 pb-12 md:pt-24 md:pb-20 text-center max-w-3xl mx-auto">
          <span className="block text-index-number mb-6 md:mb-10 text-center">
            EXPERIENCE {id.slice(-4).toUpperCase()}
          </span>
          
          <h2 className="text-[18px] md:text-[24px] font-heading font-bold uppercase tracking-[0.12em] text-foreground-subtle mb-3">
            {platformName}
          </h2>
          
          <h1 className="text-section-heading text-foreground mb-10">
            {roleName}
          </h1>
          
          <div className="flex justify-center items-center gap-3 text-[13px] md:text-[14px] font-heading font-bold uppercase tracking-[0.1em] text-foreground-subtle">
            <span>{year}</span>
            <span className="text-white/20">·</span>
            <span className="text-accent">{authorName}</span>
          </div>
        </section>

        <hr className="editorial-rule-strong" />

        {/* ═══════════════════════════════════════════════
            DISCLAIMER
        ═══════════════════════════════════════════════ */}
        <section className="py-8 border-b border-white/[0.04]">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-baseline gap-4 md:gap-8">
            <span className="shrink-0 text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle">
              Personal Account
            </span>
            <p className="text-[14px] text-foreground-muted leading-relaxed">
              This account describes one student's experience. It should not be read as a universal description of the internship.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            THE CONTENT (Field Notes)
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            {review.experience ? (
              <div className="prose prose-invert prose-p:text-[20px] md:prose-p:text-[24px] prose-p:text-foreground prose-p:leading-[1.6] max-w-none">
                <PortableText value={review.experience} />
              </div>
            ) : review.keyTakeaway ? (
              <blockquote className="text-[24px] md:text-[32px] font-body text-foreground leading-[1.4] italic">
                "{review.keyTakeaway}"
              </blockquote>
            ) : (
              <p className="text-[20px] text-foreground-muted italic opacity-50">
                (Experience details withheld or unavailable)
              </p>
            )}

            {review.unexpected && (
              <div className="mt-16 pt-12 border-t border-white/[0.06]">
                <h3 className="text-[14px] font-heading font-bold uppercase tracking-[0.1em] text-foreground-subtle mb-4">
                  Unexpected Challenge
                </h3>
                <p className="text-[18px] md:text-[20px] text-foreground leading-relaxed">
                  {review.unexpected}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            WHAT THEY MENTIONED
        ═══════════════════════════════════════════════ */}
        {(review.paymentExperience || review.certificateExperience || review.stipendExperience || review.projectExperience || review.mentorshipExperience || review.selectionExperience) && (
          <section className="py-16 md:py-24 bg-surface/30 -mx-4 px-4 md:-mx-8 md:px-8 border-y border-white/[0.04]">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-[18px] font-heading font-bold uppercase tracking-[0.1em] text-foreground mb-12 text-center">
                What They Mentioned
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {review.paymentExperience && (
                  <div>
                    <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle mb-3">Payment</span>
                    <p className="text-[15px] text-foreground leading-relaxed">{review.paymentExperience}</p>
                  </div>
                )}
                {review.stipendExperience && (
                  <div>
                    <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle mb-3">Stipend</span>
                    <p className="text-[15px] text-foreground leading-relaxed">{review.stipendExperience}</p>
                  </div>
                )}
                {review.certificateExperience && (
                  <div>
                    <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle mb-3">Certificate</span>
                    <p className="text-[15px] text-foreground leading-relaxed">{review.certificateExperience}</p>
                  </div>
                )}
                {review.projectExperience && (
                  <div>
                    <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle mb-3">Work</span>
                    <p className="text-[15px] text-foreground leading-relaxed">{review.projectExperience}</p>
                  </div>
                )}
                {review.mentorshipExperience && (
                  <div>
                    <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle mb-3">Mentorship</span>
                    <p className="text-[15px] text-foreground leading-relaxed">{review.mentorshipExperience}</p>
                  </div>
                )}
                {review.selectionExperience && (
                  <div>
                    <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle mb-3">Selection</span>
                    <p className="text-[15px] text-foreground leading-relaxed">{Array.isArray(review.selectionExperience) ? review.selectionExperience.join(', ') : review.selectionExperience}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════
            FOOTER / LINK BACK
        ═══════════════════════════════════════════════ */}
        {slug && (
          <section className="py-20 text-center">
            <h3 className="text-[14px] font-heading font-bold uppercase tracking-[0.1em] text-foreground-subtle mb-6">
              Official Information
            </h3>
            <Link 
              href={`/internships/${slug}`}
              className="inline-flex items-center gap-3 h-[44px] px-6 bg-white !text-black font-heading font-bold text-[13px] uppercase tracking-[0.1em] rounded-[var(--radius)] hover:bg-white/90 transition-all"
            >
              <span>See The Internship</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        )}

      </Container>
    </div>
  );
}
