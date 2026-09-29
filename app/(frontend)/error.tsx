'use client';

import { useEffect } from 'react';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex-grow flex items-center justify-center min-h-[60vh]">
      <Section className="text-center max-w-md mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight mb-4">
          INFORMATION COULDN&apos;T BE LOADED.
        </h1>
        <p className="text-foreground-muted mb-8 text-lg">
          Something went wrong while loading the internship registry. Please try again.
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => reset()}
            className="bg-white text-black font-heading font-bold uppercase tracking-tight shadow-[6px_6px_0px_#2563eb] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[8px_8px_0px_#2563eb] border-2 border-white transition-all duration-200 px-6 py-3 focus:outline-2 focus:outline-accent focus:outline-offset-2"
          >
            TRY AGAIN
          </button>
        </div>
      </Section>
    </Container>
  );
}
