import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`text-h3 text-foreground-muted mb-3 ${className}`}>
      {children}
    </div>
  );
}
