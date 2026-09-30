import React from 'react';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import { Metadata } from 'next';
import { 
  Scale, 
  SearchX, 
  User, 
  RotateCcw, 
  FileCheck, 
  Lock, 
  ClipboardCheck,
  AlertCircle
} from 'lucide-react';
import { Reveal, RevealGroup } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Transpario Guidelines — Editorial Principles',
  description: 'Learn how Transpario handles internship information, student experiences, classifications, evidence, and privacy.',
};

const GUIDELINES = [
  {
    num: 'Guideline 01',
    title: 'Facts Over Accusations',
    desc: 'Public information should focus on what can be supported rather than using inflammatory labels.',
    Icon: Scale,
  },
  {
    num: 'Guideline 02',
    title: 'No Assumptions',
    desc: 'Missing information is not automatically treated as a negative result.',
    Icon: SearchX,
  },
  {
    num: 'Guideline 03',
    title: 'Student Experiences Stay Personal',
    desc: "A student's experience is presented as that student's experience. It is not automatically treated as a universal fact.",
    Icon: User,
  },
  {
    num: 'Guideline 04',
    title: 'Information Can Change',
    desc: 'Internship programs can change their policies, pricing, selection processes, and benefits. This is why Transpario displays a Last Reviewed date.',
    Icon: RotateCcw,
  },
  {
    num: 'Guideline 05',
    title: 'Evidence Matters',
    desc: 'Supporting information can help the Transpario team understand and review factual claims.',
    Icon: FileCheck,
  },
  {
    num: 'Guideline 06',
    title: 'Privacy Matters',
    desc: 'Personal information and sensitive evidence should not be exposed publicly by default.',
    Icon: Lock,
  },
  {
    num: 'Guideline 07',
    title: 'Publication Requires Review',
    desc: 'Student submissions do not automatically become public listings.',
    Icon: ClipboardCheck,
  },
];

const GLOSSARY = [
  {
    title: 'No Fee',
    color: 'positive' as const,
    desc: 'No payment from the student is currently identified as required for the internship program.',
  },
  {
    title: 'Payment Required',
    color: 'caution' as const,
    desc: 'Available information indicates that payment from the student is required.',
  },
  {
    title: 'Optional Payment',
    color: 'neutral' as const,
    desc: 'A payment option exists, but the available information does not indicate that it is mandatory for participation in the internship itself.',
  },
  {
    title: 'Unclear',
    color: 'caution' as const,
    desc: 'Transpario does not currently have enough information to confidently classify the payment requirement.',
  },
  {
    title: 'Not Disclosed',
    color: 'neutral' as const,
    desc: 'Transpario does not currently have sufficient information to make a stronger classification.',
  },
];

const NOT_DISCLOSED_ITEMS = [
  'Stipends',
  'Certificates',
  'Mentorship',
  'Selection processes',
  'Work details',
];

export default function GuidelinesPage() {
  return (
    <div className="bg-background text-foreground min-h-screen py-12 md:py-20">
      {/* Header */}
      <Section>
        <Container>
          <RevealGroup className="max-w-3xl mb-12 md:mb-16">
            <Reveal>
              <SectionLabel className="mb-3">STANDARDS & TAXONOMY</SectionLabel>
            </Reveal>
            <Reveal>
              <h1 className="text-h1 uppercase tracking-tight text-foreground mb-4">
                Our Guidelines
              </h1>
            </Reveal>
            <Reveal>
              <p className="text-body-lg text-foreground-muted leading-relaxed font-normal">
                Transpario is built around a simple principle: present useful information without unnecessary assumptions.
              </p>
            </Reveal>
          </RevealGroup>

          {/* Guidelines 01 - 07 2-Column Grid */}
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {GUIDELINES.map((g) => {
              const Icon = g.Icon;
              return (
                <Reveal key={g.num}>
                  <Card className="p-6 sm:p-7 bg-white/[0.03] backdrop-blur-md border-border hover:border-accent/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded">
                          {g.num}
                        </span>
                        <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-border flex items-center justify-center text-accent">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <h2 className="text-h3 uppercase text-foreground font-heading mb-2">
                        {g.title}
                      </h2>
                      <p className="text-body text-foreground-muted leading-relaxed">
                        {g.desc}
                      </p>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* Classification Glossary */}
      <Section borderTop className="py-12 md:py-16 bg-black/40 backdrop-blur-sm">
        <Container>
          <div className="max-w-4xl">
            <RevealGroup className="mb-10">
              <Reveal>
                <SectionLabel className="mb-2">TERMINOLOGY GLOSSARY</SectionLabel>
              </Reveal>
              <Reveal>
                <h2 className="text-h1 uppercase tracking-tight text-foreground">
                  What do our classifications mean?
                </h2>
              </Reveal>
            </RevealGroup>

            <RevealGroup className="space-y-4">
              {GLOSSARY.map((item) => (
                <Reveal key={item.title}>
                  <Card className="p-5 sm:p-6 bg-white/[0.03] backdrop-blur-md border-border flex flex-col sm:flex-row sm:items-start gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    <div className="shrink-0 pt-0.5">
                      <Tag color={item.color} className="text-xs px-3 py-1 font-bold">
                        {item.title.toUpperCase()}
                      </Tag>
                    </div>
                    <p className="text-body text-foreground-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* Not Disclosed Does Not Mean No Highlighted Callout Box */}
      <Section borderTop className="py-12 md:py-20">
        <Container className="max-w-4xl">
          <Reveal>
            <Card className="p-8 sm:p-10 bg-white/[0.05] backdrop-blur-md border-accent/40 shadow-xl relative overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-accent" />
              
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-accent shrink-0" />
                <h2 className="text-h2 uppercase tracking-tight text-foreground font-heading">
                  Not disclosed does not mean no.
                </h2>
              </div>

              <p className="text-body-lg text-foreground-muted mb-4 leading-relaxed">
                When Transpario does not have enough reliable information about a feature, we use &quot;Not Disclosed&quot; rather than assuming that the feature does not exist.
              </p>

              <p className="text-body text-foreground font-semibold mb-4">
                This applies especially to:
              </p>

              <div className="flex flex-wrap gap-2.5">
                {NOT_DISCLOSED_ITEMS.map((item) => (
                  <span 
                    key={item}
                    className="px-3.5 py-1.5 rounded-[var(--radius)] bg-white/[0.05] border border-border text-sm font-heading font-semibold text-foreground uppercase tracking-wider inline-flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
