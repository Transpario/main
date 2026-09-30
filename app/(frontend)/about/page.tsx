import React from 'react';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Metadata } from 'next';
import { Quote, Scale, ShieldCheck, ArrowRight } from 'lucide-react';
import { Reveal, RevealGroup } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'About Transpario — Mission & Principles',
  description: 'Learn about Transpario, an internship transparency platform designed to help students make informed decisions.',
};

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground min-h-screen py-12 md:py-20">
      {/* Intro / Hero Header */}
      <Section>
        <Container className="max-w-4xl">
          <RevealGroup className="mb-8">
            <Reveal>
              <SectionLabel className="mb-3">OUR MISSION & VALUES</SectionLabel>
            </Reveal>
            <Reveal>
              <h1 className="text-h1 uppercase tracking-tight text-foreground mb-4">
                About Transpario
              </h1>
            </Reveal>
            <Reveal>
              <p className="text-body-lg text-foreground font-medium leading-relaxed max-w-3xl">
                Transpario exists to make internship information easier to understand.
              </p>
            </Reveal>
          </RevealGroup>

          <Reveal>
            <div className="bg-white/[0.03] backdrop-blur-md border border-border p-6 sm:p-8 rounded-[var(--radius)] relative overflow-hidden mb-12 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
              <div className="space-y-4 text-body text-foreground-muted leading-relaxed">
                <p>
                  Students should be able to understand what an internship opportunity involves before deciding whether to apply.
                </p>
                <p>
                  Transpario brings together structured information and student experiences to provide a clearer picture of internship programs.
                </p>
                <p>
                  We focus on details such as payment, certificates, stipends, selection processes, project work, mentorship, and student experiences.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Subsection 1: We don't tell you what to choose */}
      <Section borderTop className="py-12 md:py-16">
        <Container className="max-w-4xl">
          <RevealGroup className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <Reveal className="lg:col-span-7 space-y-4">
              <h2 className="text-h2 uppercase text-foreground font-heading tracking-tight">
                We don&apos;t tell you what to choose.
              </h2>
              <div className="space-y-3 text-body text-foreground-muted leading-relaxed">
                <p>
                  Different students have different goals, expectations, and circumstances.
                </p>
                <p>
                  Transpario does not decide which internship is right for you.
                </p>
                <p>
                  We help you understand the information available so you can make that decision yourself.
                </p>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5">
              <Card className="p-6 bg-white/[0.03] backdrop-blur-md border-border relative hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <Quote className="w-8 h-8 text-accent/40 mb-3" />
                <blockquote className="text-body font-heading font-semibold text-foreground italic mb-4 leading-snug">
                  &ldquo;Transpario does not decide which internship is right for you.&rdquo;
                </blockquote>
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-accent bg-accent/10 px-2 py-1 rounded inline-block">
                  NEUTRAL TRANSPARENCY
                </span>
              </Card>
            </Reveal>
          </RevealGroup>
        </Container>
      </Section>

      {/* Subsection 2: Information over assumptions */}
      <Section borderTop className="py-12 md:py-16 bg-black/40 backdrop-blur-sm">
        <Container className="max-w-4xl">
          <RevealGroup className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <Reveal className="lg:col-span-5 order-2 lg:order-1">
              <Card className="p-6 bg-white/[0.03] backdrop-blur-md border-border hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <Scale className="w-7 h-7 text-accent mb-3" />
                <p className="text-sm font-heading font-semibold text-foreground mb-3 leading-snug">
                  &ldquo;When information is not available, we do not automatically assume that something does not exist.&rdquo;
                </p>
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-foreground-muted bg-white/[0.05] px-2 py-1 rounded inline-block border border-border/50">
                  CLEAR CLASSIFICATIONS
                </span>
              </Card>
            </Reveal>

            <Reveal className="lg:col-span-7 order-1 lg:order-2 space-y-4">
              <h2 className="text-h2 uppercase text-foreground font-heading tracking-tight">
                Information over assumptions.
              </h2>
              <div className="space-y-3 text-body text-foreground-muted leading-relaxed">
                <p>
                  Transpario aims to use clear and neutral classifications.
                </p>
                <p>
                  When information is not available, we do not automatically assume that something does not exist.
                </p>
                <p>
                  &quot;Not Disclosed&quot; means we currently do not have sufficient information to make a stronger classification.
                </p>
                <p>
                  Student experiences are identified as individual experiences rather than universal claims.
                </p>
              </div>
            </Reveal>
          </RevealGroup>
        </Container>
      </Section>

      {/* Subsection 3: Reviewed information */}
      <Section borderTop className="py-12 md:py-16">
        <Container className="max-w-4xl">
          <RevealGroup className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <Reveal className="lg:col-span-7 space-y-4">
              <h2 className="text-h2 uppercase text-foreground font-heading tracking-tight">
                Reviewed information.
              </h2>
              <div className="space-y-3 text-body text-foreground-muted leading-relaxed">
                <p>
                  Information submitted to Transpario may be reviewed for consistency and supporting evidence before publication.
                </p>
                <p>
                  Evidence may help the Transpario team understand and verify specific claims, but private or sensitive evidence is not publicly exposed by default.
                </p>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5">
              <Card className="p-6 bg-white/[0.03] backdrop-blur-md border-border hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <ShieldCheck className="w-7 h-7 text-positive mb-3" />
                <p className="text-sm font-heading font-semibold text-foreground mb-3 leading-snug">
                  &ldquo;Private or sensitive evidence is not publicly exposed by default.&rdquo;
                </p>
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-positive bg-positive/10 px-2 py-1 rounded inline-block">
                  VERIFICATION PROTOCOL
                </span>
              </Card>
            </Reveal>
          </RevealGroup>
        </Container>
      </Section>

      {/* Footer Call to Action */}
      <Section borderTop className="py-16 bg-black/40 backdrop-blur-sm">
        <Container className="max-w-4xl text-center">
          <RevealGroup>
            <Reveal>
              <h2 className="text-h2 uppercase text-foreground mb-4">
                READY TO EXPLORE OR SHARE?
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-body-lg text-foreground-muted mb-8 max-w-xl mx-auto">
                Browse verified internship data or help the community by sharing your own experience.
              </p>
            </Reveal>
            <Reveal>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/explore" variant="primary" className="w-full sm:w-auto">
                  EXPLORE INTERNSHIPS
                </Button>
                <Button href="/review" variant="secondary" className="w-full sm:w-auto flex items-center justify-center gap-2">
                  <span>REPORT AN INTERNSHIP</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Reveal>
          </RevealGroup>
        </Container>
      </Section>
    </div>
  );
}
