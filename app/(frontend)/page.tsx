import React from 'react';
import Container from '@/components/layout/Container';
import QuestionRow from '@/components/home/QuestionRow';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Reveal, RevealGroup } from '@/components/Reveal';
import { HeroTitle } from '@/components/home/HeroTitle';

export const revalidate = 3600;

const QUESTIONS = [
  {
    question: 'What does it cost?',
    description: 'Some programs charge fees. Some don\'t. Some won\'t tell you upfront.',
    href: '/explore?paymentStatus=payment_required,no_fee,optional_payment',
  },
  {
    question: 'Is there a stipend?',
    description: 'Paid, performance-based, or not disclosed.',
    href: '/explore?stipendStatus=stipend_provided,performance_based,no_stipend',
  },
  {
    question: 'Do they provide a certificate?',
    description: 'Free, paid, or not mentioned at all.',
    href: '/explore?certificateStatus=free_certificate,certificate_requires_payment,no_certificate',
  },
  {
    question: 'How do they select?',
    description: 'Direct enrollment, applications, tests, interviews - or they don\'t say.',
    href: '/explore',
  },
  {
    question: 'What will you actually do?',
    description: 'Real projects, training modules, assignments - the listing rarely says.',
    href: '/explore',
  },
  {
    question: 'What did previous interns say?',
    description: 'First-hand experiences from students who were already there.',
    href: '/explore',
  },
];

export default async function Home() {

  return (
    <>
      {/* ═══════════════════════════════════════════════
          SECTION 1 - HERO
      ═══════════════════════════════════════════════ */}
      <section className="min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center relative">
        <Container wide>
          <div className="pt-24 pb-16 md:pt-32 md:pb-24">
            {/* Editorial headline staggered */}
            <HeroTitle />

            {/* Human statement & CTAs staggered */}
            <RevealGroup>
              <Reveal>
                <p className="text-[17px] md:text-[20px] text-foreground-muted leading-relaxed max-w-[540px] mb-12 font-body">
                  Community-sourced platform to explore internships with transparency from students who&apos;ve been there.
                </p>
              </Reveal>

              <Reveal>
                <div className="w-12 h-[2px] bg-accent mb-10" />
              </Reveal>

              <Reveal>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Link
                    href="/explore"
                    className="inline-flex items-center gap-3 text-[13px] font-heading font-bold uppercase tracking-[0.12em] text-foreground hover:text-accent transition-colors duration-200 group"
                  >
                    <span>Enter the Index</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                  <Link
                    href="/review"
                    className="inline-flex items-center gap-3 text-[13px] font-heading font-bold uppercase tracking-[0.12em] text-foreground-subtle hover:text-foreground transition-colors duration-200 group"
                  >
                    <span>Share My Experience</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </Reveal>
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 - BEFORE YOU APPLY
      ═══════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06]">
        <Container wide>
          <div className="py-20 md:py-32">
            <Reveal>
              <div className="mb-12 md:mb-16">
                <h2 className="text-section-heading text-foreground">
                  Before You Apply,<br />
                  Look Closer.
                </h2>
              </div>
            </Reveal>

            <RevealGroup className="border-t border-white/[0.08]">
              {QUESTIONS.map((q, i) => (
                <Reveal key={i}>
                  <QuestionRow
                    question={q.question}
                    description={q.description}
                    href={q.href}
                    index={i}
                  />
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>


      {/* ═══════════════════════════════════════════════
          SECTION 4 - STUDENT EXPERIENCES
      ═══════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06]">
        <Container wide>
          <div className="py-20 md:py-32">
            <RevealGroup className="max-w-2xl">
              <Reveal>
                <h2 className="text-section-heading text-foreground mb-6">
                  Did You Do One of These Internships?
                </h2>
              </Reveal>
              <Reveal>
                <div className="space-y-4 text-[16px] md:text-[18px] text-foreground-muted leading-relaxed mb-10">
                  <p>
                    The listing told you one thing. What actually happened?
                  </p>
                  <p>
                    If you&apos;ve completed an internship listed here - or one that isn&apos;t listed yet - you can share what you experienced.
                  </p>
                </div>
              </Reveal>
              <Reveal>
                <Link
                  href="/review"
                  className="inline-flex items-center gap-3 h-[44px] px-6 bg-white !text-black font-heading font-bold text-[13px] uppercase tracking-[0.1em] rounded-[var(--radius)] hover:bg-white/90 hover:!text-black hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)] active:translate-y-0 transition-all duration-200 ease-out select-none"
                >
                  <span>Share My Experience</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Reveal>
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 5 - INFORMATION PHILOSOPHY
      ═══════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06] bg-black/40 backdrop-blur-sm">
        <Container wide>
          <div className="py-20 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <Reveal>
                <h2 className="text-section-heading text-foreground">
                  Not Disclosed<br />
                  Does Not Mean No.
                </h2>
              </Reveal>

              <RevealGroup className="space-y-5 text-[15px] md:text-[16px] text-foreground-muted leading-relaxed">
                <Reveal>
                  <p>
                    When we don&apos;t have enough information to classify something, we say so.
                  </p>
                </Reveal>
                <Reveal>
                  <p>
                    &ldquo;Not Disclosed&rdquo; means we haven&apos;t confirmed it - not that it doesn&apos;t exist.
                  </p>
                </Reveal>
                <Reveal>
                  <p>
                    Student experiences are presented as individual accounts, not universal claims. Programs can change. That&apos;s why we display a Last Reviewed date.
                  </p>
                </Reveal>
                <Reveal>
                  <div className="pt-4">
                    <Link
                      href="/guidelines"
                      className="inline-flex items-center gap-2 text-[12px] font-heading font-bold uppercase tracking-[0.12em] text-foreground-subtle hover:text-foreground transition-colors group"
                    >
                      <span>Read Our Guidelines</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </Reveal>
              </RevealGroup>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 6 - FINAL CTA
      ═══════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06]">
        <Container wide>
          <RevealGroup className="py-24 md:py-36">
            <Reveal>
              <h2 className="text-editorial text-foreground mb-12">
                Know Before<br />
                You Apply.
              </h2>
            </Reveal>

            <Reveal>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-3 h-[44px] px-6 bg-white !text-black font-heading font-bold text-[13px] uppercase tracking-[0.1em] rounded-[var(--radius)] hover:bg-white/90 hover:!text-black hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)] active:translate-y-0 transition-all duration-200 ease-out select-none"
                >
                  <span>Enter the Index</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/review"
                  className="inline-flex items-center gap-3 text-[13px] font-heading font-bold uppercase tracking-[0.12em] text-foreground-subtle hover:text-foreground transition-colors duration-200 group h-[44px]"
                >
                  <span>Share My Experience</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </Reveal>

            <Reveal>
              <p className="text-[12px] text-foreground-subtle mt-10 max-w-md">
                Information can change. Always review the latest available details before applying.
              </p>
            </Reveal>
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
