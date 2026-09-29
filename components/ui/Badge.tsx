import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-xs font-bold uppercase tracking-wider px-2 py-1.5 border border-border bg-surface ${className}`}
    >
      {children}
    </span>
  );
}
