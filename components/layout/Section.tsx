import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  borderTop?: boolean;
  className?: string;
  spacing?: 'default' | 'compact' | 'large';
}

const spacingStyles = {
  default: 'py-16 md:py-24',
  compact: 'py-10 md:py-16',
  large: 'py-24 md:py-36',
};

export default function Section({ children, borderTop = false, className = '', spacing = 'default' }: SectionProps) {
  return (
    <section
      className={`${spacingStyles[spacing]} ${borderTop ? 'border-t border-border' : ''} ${className}`}
    >
      {children}
    </section>
  );
}
