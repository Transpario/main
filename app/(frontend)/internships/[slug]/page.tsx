import React from 'react';
import { notFound } from 'next/navigation';
import { getProgramBySlug } from '@/lib/sanity/queries';
import { sanityFetch } from '@/lib/sanity/client';
import { InternshipProgram, StudentReview } from '@/lib/sanity/types';
import Container from '@/components/layout/Container';
import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export const revalidate = 3600; // revalidate at most every hour

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const program = await sanityFetch<InternshipProgram>({
    query: getProgramBySlug,
    params: { slug },
  });

  if (!program) {
    return { title: 'Not Found' };
  }

  return {
    title: `${program.name} at ${(program.platform as { name?: string })?.name} | Transpario`,
    description: `Read verified student experiences for the ${program.name} internship program.`,
  };
}

const formatEnum = (val: string | undefined) => {
  if (!val) return 'Not Disclosed';
  const customMaps: Record<string, string> = {
    under_1_month: 'Under 1 Month',
    one_to_three_months: '1–3 Months',
    three_to_six_months: '3–6 Months',
    six_plus_months: '6+ Months',
    no_fee: 'No Fee',
    payment_required: 'Payment Required',
    optional_payment: 'Optional Payment',
    unclear: 'Unclear',
    free_certificate: 'Free Certificate',
    certificate_available: 'Certificate Available',
    certificate_requires_payment: 'Cert. Requires Payment',
    no_certificate: 'No Certificate',
    stipend_provided: 'Stipend Provided',
    no_stipend: 'No Stipend',
    performance_based: 'Performance Based',
    not_disclosed: 'Not Disclosed',
    remote: 'Remote',
    hybrid: 'Hybrid',
    onsite: 'On-site',
  };
  return customMaps[val] || val.replace(/_/g, ' ');
};

function formatStipendAmount(amount?: string, frequency?: string): string | undefined {
  if (!amount) return undefined;
  const cleanAmount = amount.trim();
  if (!frequency) return cleanAmount;

  const amountLower = cleanAmount.toLowerCase();
  const freqLower = frequency.toLowerCase();

  if (
    amountLower.includes('/month') ||
    amountLower.includes('monthly') ||
    amountLower.includes('/mo') ||
    amountLower.includes('per month') ||
    amountLower.includes('/week') ||
    amountLower.includes('weekly') ||
    amountLower.includes(freqLower)
  ) {
    return cleanAmount;
  }

  return `${cleanAmount} / ${frequency}`;
}

export default async function InternshipDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = await sanityFetch<InternshipProgram>({
    query: getProgramBySlug,
    params: { slug },
  });

  if (!program) {
    notFound();
  }

  const reviews = (program.studentReviews || []) as unknown as StudentReview[];
  const platform = program.platform as { name?: string, website?: string } | undefined;
  
  const lastReviewedDate = program.lastReviewed 
    ? new Date(program.lastReviewed).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
    : null;

  // Utility to determine transparency state
  const getTransparencyState = (value: string | undefined | null): string => {
    if (!value || value === 'not_disclosed') return 'NOT DISCLOSED';
    if (value === 'unclear') return 'UNCLEAR';
    // If it has a definitive value, it is confirmed/disclosed
    return 'DISCLOSED';
  };

  const getTransparencyColor = (state: string) => {
    if (state === 'NOT DISCLOSED' || state === 'UNCLEAR') return 'text-foreground-muted';
    return 'text-accent'; // Used for "DISCLOSED" or "CONFIRMED"
  };

  const paymentState = getTransparencyState(program.paymentStatus);
  const stipendState = getTransparencyState(program.stipendStatus);
  const certificateState = getTransparencyState(program.certificateStatus);
  const mentorshipState = getTransparencyState(program.mentorship);
  const selectionState = program.selectionProcess?.length || program.selectionDetails ? 'INFORMATION AVAILABLE' : 'NOT DISCLOSED';

  // Format payment display
  const formattedPaymentAmount = program.paymentAmount ? `${program.paymentAmount} ${program.paymentCurrency || ''}`.trim() : undefined;
  const formattedStipendAmount = formatStipendAmount(program.stipendAmount, program.stipendFrequency);

  return (
    <div className="min-h-screen bg-background">
      <Container wide>
        
        {/* ═══════════════════════════════════════════════
            SECTION 1: OPPORTUNITY HEADER
        ═══════════════════════════════════════════════ */}
        <section className="pt-16 pb-12 md:pt-24 md:pb-20">
          <span className="block text-index-number mb-6 md:mb-10">01 / OPPORTUNITY</span>
          
          <h2 className="text-[18px] md:text-[24px] font-heading font-bold uppercase tracking-[0.12em] text-foreground-subtle mb-3">
            {platform?.name || 'Unknown Platform'}
          </h2>
          
          <h1 className="text-section-heading text-foreground mb-4">
            {program.name}
          </h1>
          
          {program.role && (
            <p className="text-[18px] md:text-[22px] font-heading font-semibold text-foreground-muted mb-8">
              {program.role}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] md:text-[14px] font-heading font-bold uppercase tracking-[0.1em] text-foreground-subtle mb-10">
            {program.domain && program.domain.length > 0 && (
              <>
                <span>{program.domain[0]}</span>
                <span className="text-white/20">·</span>
              </>
            )}
            <span>{formatEnum(program.mode)}</span>
            <span className="text-white/20">·</span>
            <span>{formatEnum(program.durationCategory)}</span>
          </div>

          {/* Prominent CTA */}
          {platform?.website && (
            <a 
              href={platform.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 h-[44px] px-6 bg-white !text-black font-heading font-bold text-[13px] uppercase tracking-[0.1em] rounded-[var(--radius)] hover:bg-white/90 hover:!text-black hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)] active:translate-y-0 transition-all duration-200 ease-out select-none group"
            >
              <span>Apply</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          )}
        </section>

        <hr className="editorial-rule-strong" />

        {/* ═══════════════════════════════════════════════
            SECTION 2: THE RECORD
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24">
          <h3 className="text-[20px] md:text-[24px] font-heading font-bold uppercase tracking-tight text-foreground mb-12">
            The Record
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
            {/* Payment */}
            {program.paymentStatus && (
              <div>
                <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.12em] text-foreground-subtle mb-2">Payment</span>
                <p className="text-[18px] md:text-[20px] font-body text-foreground leading-snug">
                  {formatEnum(program.paymentStatus)}
                  {formattedPaymentAmount && <span className="block font-semibold mt-1">{formattedPaymentAmount}</span>}
                </p>
                {(program.paymentDetails || program.paymentReason) && (
                  <p className="text-[14px] text-foreground-muted mt-2 leading-relaxed">
                    {program.paymentDetails || program.paymentReason}
                  </p>
                )}
              </div>
            )}
            
            {/* Stipend */}
            {program.stipendStatus && (
              <div>
                <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.12em] text-foreground-subtle mb-2">Stipend</span>
                <p className="text-[18px] md:text-[20px] font-body text-foreground leading-snug">
                  {formatEnum(program.stipendStatus)}
                  {formattedStipendAmount && <span className="block font-semibold mt-1">{formattedStipendAmount}</span>}
                </p>
                {program.stipendDetails && (
                  <p className="text-[14px] text-foreground-muted mt-2 leading-relaxed">
                    {program.stipendDetails}
                  </p>
                )}
              </div>
            )}

            {/* Certificate */}
            {program.certificateStatus && (
              <div>
                <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.12em] text-foreground-subtle mb-2">Certificate</span>
                <p className="text-[18px] md:text-[20px] font-body text-foreground leading-snug">
                  {formatEnum(program.certificateStatus)}
                  {program.certificateCost && <span className="block font-semibold mt-1">{program.certificateCost}</span>}
                </p>
                {program.certificateDetails && (
                  <p className="text-[14px] text-foreground-muted mt-2 leading-relaxed">
                    {program.certificateDetails}
                  </p>
                )}
              </div>
            )}

            {/* Work Mode */}
            {program.mode && (
              <div>
                <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.12em] text-foreground-subtle mb-2">Work Mode</span>
                <p className="text-[18px] md:text-[20px] font-body text-foreground leading-snug">
                  {formatEnum(program.mode)}
                </p>
              </div>
            )}

            {/* Duration */}
            {program.duration && (
              <div>
                <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.12em] text-foreground-subtle mb-2">Duration</span>
                <p className="text-[18px] md:text-[20px] font-body text-foreground leading-snug">
                  {program.duration}
                </p>
              </div>
            )}
            
            {/* Mentorship */}
            {program.mentorship && (
              <div>
                <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.12em] text-foreground-subtle mb-2">Mentorship</span>
                <p className="text-[18px] md:text-[20px] font-body text-foreground leading-snug">
                  {formatEnum(program.mentorship)}
                </p>
                {program.mentorshipDetails && (
                  <p className="text-[14px] text-foreground-muted mt-2 leading-relaxed">
                    {program.mentorshipDetails}
                  </p>
                )}
              </div>
            )}
            
            {/* Work Type */}
            {program.workType && program.workType.length > 0 && (
              <div>
                <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.12em] text-foreground-subtle mb-2">Work Type</span>
                <p className="text-[18px] md:text-[20px] font-body text-foreground leading-snug">
                  {program.workType.map(formatEnum).join(', ')}
                </p>
              </div>
            )}
          </div>
        </section>
        
        <hr className="editorial-rule" />

        {/* ═══════════════════════════════════════════════
            SECTION 3: THE WORK (Description)
        ═══════════════════════════════════════════════ */}
        {(program.description || program.workDescription) && (
          <>
            <section className="py-16 md:py-24">
              <div className="max-w-3xl">
                <h3 className="text-[20px] md:text-[24px] font-heading font-bold uppercase tracking-tight text-foreground mb-8">
                  The Work
                </h3>
                
                {program.workDescription && (
                  <p className="text-body-lg text-foreground-muted leading-relaxed mb-6">
                    {program.workDescription}
                  </p>
                )}

                {program.description && (
                  <div className="prose prose-invert prose-p:text-body-lg prose-p:text-foreground-muted prose-p:leading-relaxed prose-a:text-accent prose-headings:font-heading max-w-none">
                    <PortableText value={program.description} />
                  </div>
                )}
              </div>
            </section>
            <hr className="editorial-rule" />
          </>
        )}

        {/* ═══════════════════════════════════════════════
            SECTION 4: WHAT WE KNOW
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl">
            <h3 className="text-[20px] md:text-[24px] font-heading font-bold uppercase tracking-tight text-foreground mb-8">
              What We Know
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
              {/* Payment State */}
              <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                <span className="text-[14px] font-heading font-bold uppercase tracking-wider text-foreground">Payment</span>
                <div className="flex items-center gap-2">
                  {(paymentState === 'DISCLOSED' || paymentState === 'CONFIRMED') && <Check className="w-4 h-4 text-accent" />}
                  <span className={`text-[12px] font-heading font-bold uppercase tracking-[0.1em] ${getTransparencyColor(paymentState)}`}>
                    {paymentState === 'DISCLOSED' && program.paymentStatus === 'no_fee' ? 'CONFIRMED' : paymentState}
                  </span>
                </div>
              </div>

              {/* Stipend State */}
              <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                <span className="text-[14px] font-heading font-bold uppercase tracking-wider text-foreground">Stipend</span>
                <div className="flex items-center gap-2">
                  {(stipendState === 'DISCLOSED' || stipendState === 'CONFIRMED') && <Check className="w-4 h-4 text-accent" />}
                  <span className={`text-[12px] font-heading font-bold uppercase tracking-[0.1em] ${getTransparencyColor(stipendState)}`}>
                    {stipendState}
                  </span>
                </div>
              </div>

              {/* Certificate State */}
              <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                <span className="text-[14px] font-heading font-bold uppercase tracking-wider text-foreground">Certificate</span>
                <div className="flex items-center gap-2">
                  {(certificateState === 'DISCLOSED' || certificateState === 'CONFIRMED') && <Check className="w-4 h-4 text-accent" />}
                  <span className={`text-[12px] font-heading font-bold uppercase tracking-[0.1em] ${getTransparencyColor(certificateState)}`}>
                    {certificateState}
                  </span>
                </div>
              </div>

              {/* Mentorship State */}
              <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                <span className="text-[14px] font-heading font-bold uppercase tracking-wider text-foreground">Mentorship</span>
                <div className="flex items-center gap-2">
                  {(mentorshipState === 'DISCLOSED' || mentorshipState === 'CONFIRMED') && <Check className="w-4 h-4 text-accent" />}
                  <span className={`text-[12px] font-heading font-bold uppercase tracking-[0.1em] ${getTransparencyColor(mentorshipState)}`}>
                    {mentorshipState}
                  </span>
                </div>
              </div>

              {/* Selection State */}
              <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                <span className="text-[14px] font-heading font-bold uppercase tracking-wider text-foreground">Selection</span>
                <div className="flex items-center gap-2">
                  {selectionState === 'INFORMATION AVAILABLE' && <Check className="w-4 h-4 text-accent" />}
                  <span className={`text-[12px] font-heading font-bold uppercase tracking-[0.1em] ${getTransparencyColor(selectionState)}`}>
                    {selectionState}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[13px] text-foreground-subtle mt-8 max-w-lg leading-relaxed">
              "Not Disclosed" means Transpario does not currently have enough information to classify this feature. It does not automatically mean the feature does not exist.
            </p>
          </div>
        </section>

        <hr className="editorial-rule" />

        {/* ═══════════════════════════════════════════════
            SECTION 5: HOW THEY SELECT
        ═══════════════════════════════════════════════ */}
        {(program.selectionProcess?.length || program.selectionDetails) && (
          <>
            <section className="py-16 md:py-24">
              <div className="max-w-3xl">
                <h3 className="text-[20px] md:text-[24px] font-heading font-bold uppercase tracking-tight text-foreground mb-8">
                  How They Select
                </h3>
                
                {program.selectionProcess && program.selectionProcess.length > 0 && (
                  <div className="space-y-6 mb-8">
                    {program.selectionProcess.map((step, index) => (
                      <div key={index} className="flex items-baseline gap-4">
                        <span className="text-[12px] font-heading font-bold uppercase tracking-[0.1em] text-foreground-subtle w-6">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h4 className="text-[16px] md:text-[18px] font-bold text-foreground capitalize">
                          {step.replace(/_/g, ' ')}
                        </h4>
                      </div>
                    ))}
                  </div>
                )}
                
                {program.selectionDetails && (
                  <p className="text-[15px] text-foreground-muted leading-relaxed pl-10 border-l border-white/[0.1]">
                    {program.selectionDetails}
                  </p>
                )}
              </div>
            </section>
            <hr className="editorial-rule" />
          </>
        )}

        {/* ═══════════════════════════════════════════════
            SECTION 6: STUDENT EXPERIENCES
        ═══════════════════════════════════════════════ */}
        {reviews.length > 0 && (
          <>
            <section className="py-16 md:py-24 bg-surface/30 -mx-4 px-4 md:-mx-8 md:px-8">
              <div className="max-w-4xl">
                <div className="mb-12">
                  <h3 className="text-[20px] md:text-[24px] font-heading font-bold uppercase tracking-tight text-foreground mb-4">
                    Student Experiences
                  </h3>
                  <p className="text-[14px] text-foreground-muted max-w-xl leading-relaxed">
                    This describes one student's experience. It is not automatically a universal description of the internship.
                  </p>
                </div>
                
                <div className="space-y-16">
                  {reviews.map((review) => {
                    const reviewDate = review.publishedAt 
                      ? new Date(review.publishedAt).getFullYear() 
                      : '';
                    
                    return (
                      <div key={review._id} className="border-l-2 border-accent/40 pl-6 md:pl-10">
                        <div className="mb-6">
                          <span className="text-[11px] font-heading font-bold uppercase tracking-[0.12em] text-foreground-subtle block mb-1">
                            Student Experience
                          </span>
                          <span className="text-[14px] font-heading font-semibold text-foreground">
                            {reviewDate}
                          </span>
                        </div>

                        {review.experience ? (
                          <div className="prose prose-invert prose-p:text-[16px] md:prose-p:text-[18px] prose-p:text-foreground prose-p:leading-relaxed max-w-3xl mb-8">
                            <PortableText value={review.experience} />
                          </div>
                        ) : review.keyTakeaway ? (
                          <blockquote className="text-[18px] md:text-[22px] italic text-foreground mb-8 leading-relaxed max-w-3xl">
                            "{review.keyTakeaway}"
                          </blockquote>
                        ) : null}

                        {review.unexpected && (
                          <div className="mb-8 max-w-3xl">
                            <h4 className="text-[12px] font-heading font-bold uppercase tracking-[0.1em] text-foreground-subtle mb-2">
                              Unexpected Challenge
                            </h4>
                            <p className="text-[15px] text-foreground-muted leading-relaxed">
                              {review.unexpected}
                            </p>
                          </div>
                        )}

                        {/* What they mentioned grid */}
                        {(review.paymentExperience || review.certificateExperience || review.stipendExperience || review.projectExperience) && (
                          <div className="bg-surface/50 border border-white/[0.04] rounded-[var(--radius)] p-6 md:p-8 max-w-3xl">
                            <h4 className="text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle mb-6">
                              What They Mentioned
                            </h4>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                              {review.paymentExperience && (
                                <div>
                                  <span className="block text-[10px] font-heading font-bold uppercase tracking-wider text-foreground-muted mb-1">Payment</span>
                                  <p className="text-[13px] text-foreground leading-relaxed">{review.paymentExperience}</p>
                                </div>
                              )}
                              {review.stipendExperience && (
                                <div>
                                  <span className="block text-[10px] font-heading font-bold uppercase tracking-wider text-foreground-muted mb-1">Stipend</span>
                                  <p className="text-[13px] text-foreground leading-relaxed">{review.stipendExperience}</p>
                                </div>
                              )}
                              {review.certificateExperience && (
                                <div>
                                  <span className="block text-[10px] font-heading font-bold uppercase tracking-wider text-foreground-muted mb-1">Certificate</span>
                                  <p className="text-[13px] text-foreground leading-relaxed">{review.certificateExperience}</p>
                                </div>
                              )}
                              {review.projectExperience && (
                                <div>
                                  <span className="block text-[10px] font-heading font-bold uppercase tracking-wider text-foreground-muted mb-1">Work</span>
                                  <p className="text-[13px] text-foreground leading-relaxed">{review.projectExperience}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
            <hr className="editorial-rule" />
          </>
        )}

        {/* ═══════════════════════════════════════════════
            SECTION 7: SOURCE & LAST REVIEWED
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-20">
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <div>
              <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle mb-2">
                Last Reviewed
              </span>
              <span className="text-[15px] font-bold text-foreground block mb-2">
                {lastReviewedDate || 'UNKNOWN'}
              </span>
              <p className="text-[13px] text-foreground-muted max-w-xs leading-relaxed">
                Internship information can change. Always verify current details.
              </p>
            </div>
            
            {platform?.website && (
              <div>
                <span className="block text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-foreground-subtle mb-2">
                  Source
                </span>
                <a 
                  href={platform.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-semibold text-accent hover:text-white transition-colors underline underline-offset-4"
                >
                  Official Website ↗
                </a>
              </div>
            )}
          </div>
        </section>

        <hr className="editorial-rule-strong" />

        {/* ═══════════════════════════════════════════════
            SECTION 8: BOTTOM CTA
        ═══════════════════════════════════════════════ */}
        {platform?.website && (
          <section className="pt-16 pb-24 md:pt-20 md:pb-32 text-center flex flex-col items-center">
            <h2 className="text-[24px] md:text-[32px] font-heading font-bold uppercase tracking-tight text-foreground mb-8">
              Ready to apply?
            </h2>
            <a 
              href={platform.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 h-[48px] px-8 bg-white !text-black font-heading font-bold text-[14px] uppercase tracking-[0.1em] rounded-[var(--radius)] hover:bg-white/90 hover:!text-black hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)] active:translate-y-0 transition-all duration-200 ease-out select-none group"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </section>
        )}

      </Container>
    </div>
  );
}
