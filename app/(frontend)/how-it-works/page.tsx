import React from 'react';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Metadata } from 'next';
import { 
  FileText, 
  ClipboardCheck, 
  Layers, 
  ShieldCheck, 
  Compass, 
  ArrowDown, 
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How Transpario Works — Transparency Pipeline',
  description: 'Learn how Transpario collects, reviews, classifies, and publishes internship information.',
};

const STEPS = [
  {
    number: '01',
    title: '01 — STUDENTS SHARE',
    shortTitle: 'Student Share',
    desc: 'Students submit their internship experiences through the Transpario review form.',
    Icon: FileText,
    badge: 'Submission',
  },
  {
    number: '02',
    title: '02 — WE REVIEW',
    shortTitle: 'Team Review',
    desc: 'The Transpario team reviews submissions for clarity, relevance, consistency, and supporting information where available.',
    Icon: ClipboardCheck,
    badge: 'Verification',
  },
  {
    number: '03',
    title: '03 — WE CLASSIFY',
    shortTitle: 'Classification',
    desc: 'Relevant information is organized into categories such as payment, certificate, stipend, selection, work, and mentorship.',
    Icon: Layers,
    badge: 'Structuring',
  },
  {
    number: '04',
    title: '04 — WE APPROVE',
    shortTitle: 'Approval',
    desc: 'Information is reviewed internally and approved before being published to the public registry.',
    Icon: ShieldCheck,
    badge: 'Sign-off',
  },
  {
    number: '05',
    title: '05 — YOU EXPLORE',
    shortTitle: 'Public Explore',
    desc: 'Students can search the registry, understand available information, read student experiences, and make their own decisions.',
    Icon: Compass,
    badge: 'Publication',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-background text-foreground min-h-screen py-12 md:py-20">
      <Section>
        <Container>
          {/* Header */}
          <div className="max-w-3xl mb-12 md:mb-16">
            <SectionLabel className="mb-3">PROCESS & METHODOLOGY</SectionLabel>
            <h1 className="text-h1 uppercase tracking-tight text-foreground mb-4">
              How Transpario Works
            </h1>
            <p className="text-body-lg text-foreground-muted leading-relaxed font-normal">
              Transpario turns student experiences into structured information that other students can use before applying.
            </p>
          </div>

          {/* Main 2-Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Visual Stepper Timeline (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-6 before:bottom-6 before:w-0.5 before:bg-gradient-to-b before:from-accent before:via-border-strong before:to-accent/30">
                {STEPS.map((step) => {
                  const Icon = step.Icon;
                  return (
                    <div key={step.number} className="relative group">
                      {/* Numbered Icon Circle */}
                      <div className="absolute -left-6 sm:-left-10 top-0.5 w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-accent bg-surface text-accent flex items-center justify-center shrink-0 z-10 shadow-[0_0_12px_rgba(37,99,235,0.2)] group-hover:bg-accent group-hover:text-white transition-all duration-200">
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Content Card */}
                      <Card className="p-6 sm:p-7 border-border hover:border-accent/60 transition-all duration-200 group-hover:translate-x-1">
                        <div className="flex items-center justify-between gap-4 mb-3">
                          <h2 className="text-h2 uppercase text-foreground font-heading tracking-tight">
                            {step.title}
                          </h2>
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-hover text-foreground-muted border border-border/50 shrink-0 hidden sm:inline-block">
                            {step.badge}
                          </span>
                        </div>
                        <p className="text-body text-foreground-muted leading-relaxed">
                          {step.desc}
                        </p>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Interactive Visual Diagram & CTAs (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              {/* Supporting Visual Flow Card */}
              <Card className="p-6 sm:p-7 bg-surface/90 border-border/80 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-xs font-bold font-heading uppercase tracking-wider text-foreground">
                      TRANSPARENCY PIPELINE
                    </span>
                  </div>
                  <span className="text-xs font-mono text-accent font-semibold px-2 py-0.5 rounded bg-accent/10">
                    5 STAGES
                  </span>
                </div>

                {/* Flow Nodes Diagram */}
                <div className="space-y-3">
                  {STEPS.map((step, idx) => (
                    <React.Fragment key={step.number}>
                      <div className="flex items-center justify-between p-3 rounded-[var(--radius)] bg-surface-hover/60 border border-border/40 hover:border-accent/40 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-accent bg-accent/10 w-6 h-6 rounded flex items-center justify-center">
                            {step.number}
                          </span>
                          <span className="text-sm font-heading font-semibold text-foreground uppercase">
                            {step.shortTitle}
                          </span>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-positive/80 shrink-0" />
                      </div>
                      {idx < STEPS.length - 1 && (
                        <div className="flex justify-center py-0.5 text-foreground-subtle">
                          <ArrowDown className="w-3.5 h-3.5 opacity-40 animate-pulse" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-border/60 text-xs text-foreground-subtle leading-relaxed flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-positive inline-block shrink-0 animate-ping" />
                  <span>Verified and reviewed before publication to protect student integrity.</span>
                </div>
              </Card>

              {/* Call to Action Box */}
              <Card className="p-6 bg-surface-hover border-border">
                <h3 className="text-h3 uppercase text-foreground mb-2">
                  HAD AN INTERNSHIP EXPERIENCE?
                </h3>
                <p className="text-body text-foreground-muted text-sm mb-5 leading-relaxed">
                  Your experience helps future students make informed choices before applying.
                </p>
                <Button href="/review" variant="primary" className="w-full flex items-center justify-center gap-2 text-xs">
                  <span>REPORT AN INTERNSHIP</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Card>
            </div>

          </div>
        </Container>
      </Section>
    </div>
  );
}
