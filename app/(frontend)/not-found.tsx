import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Container className="flex-grow flex items-center justify-center min-h-[60vh]">
      <Section className="text-center max-w-md mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight mb-4">
          INTERNSHIP NOT FOUND.
        </h1>
        <p className="text-foreground-muted mb-8 text-lg">
          The information you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex justify-center">
          <Button href="/explore" variant="primary">
            EXPLORE INTERNSHIPS
          </Button>
        </div>
      </Section>
    </Container>
  );
}
