import Container from '@/components/layout/Container';

export default function Loading() {
  return (
    <Container className="flex-grow flex items-center justify-center min-h-[60vh]">
      <div className="text-sm font-heading font-bold uppercase tracking-widest text-foreground-muted animate-pulse">
        LOADING...
      </div>
    </Container>
  );
}
