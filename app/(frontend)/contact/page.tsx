import React from 'react';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import Card from '@/components/ui/Card';
import ContactForm from '@/components/contact/ContactForm';
import { client } from '@/lib/sanity/client';
import { getSiteSettings } from '@/lib/sanity/queries';
import { Metadata } from 'next';
import { Mail, Clock, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Transpario - Support & Inquiries',
  description: 'Get in touch with the Transpario team for questions, corrections, partnerships, or contributor inquiries.',
};

export const revalidate = 3600;

export default async function ContactPage() {
  const settings = await client.fetch(getSiteSettings);
  const email = settings?.contactEmail || 'contact@transpario.page';

  return (
    <div className="bg-background text-foreground min-h-screen py-12 md:py-20">
      <Section>
        <Container>
          {/* Header */}
          <div className="max-w-3xl mb-12 md:mb-16">
            <SectionLabel className="mb-3">GET IN TOUCH</SectionLabel>
            <h1 className="text-h1 uppercase tracking-tight text-foreground mb-4">
              Contact Transpario
            </h1>
            <p className="text-body-lg text-foreground-muted leading-relaxed font-normal">
              Have a question, correction, or general inquiry? Get in touch with the Transpario team.
            </p>
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Interactive Form (7 Cols) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Right Column: Alternative Info & Support Cards (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              {/* Direct Email Card */}
              <Card className="p-6 bg-surface border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-[var(--radius)] bg-surface-hover border border-border flex items-center justify-center text-accent shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold font-heading uppercase tracking-wider text-foreground-subtle">
                      DIRECT EMAIL
                    </h3>
                    <span className="text-sm font-semibold text-foreground">
                      Reach us directly anytime
                    </span>
                  </div>
                </div>

                <a 
                  href={`mailto:${email}`}
                  className="w-full flex items-center justify-between p-3.5 rounded-[var(--radius)] bg-surface-hover border border-border text-foreground hover:border-accent hover:text-accent transition-all font-mono text-xs sm:text-sm font-bold truncate group"
                >
                  <span className="truncate">{email}</span>
                  <ExternalLink className="w-4 h-4 text-foreground-subtle group-hover:text-accent shrink-0 ml-2" />
                </a>
              </Card>

              {/* Expected Response Time Card */}
              <Card className="p-6 bg-surface border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <h3 className="text-xs font-bold font-heading uppercase tracking-wider text-foreground">
                      RESPONSE TIME
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-positive bg-positive/10 px-2 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-positive animate-pulse" />
                    ACTIVE SUPPORT
                  </span>
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  We aim to review and respond to all inquiries within <strong className="text-foreground">24–48 hours</strong>.
                </p>
              </Card>
            </div>

          </div>
        </Container>
      </Section>
    </div>
  );
}
