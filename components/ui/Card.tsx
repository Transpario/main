import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function Card({ children, className = '', as: Component = 'div', ...props }: CardProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Component 
      className={`bg-surface border border-border rounded-[var(--radius)] p-6 transition-colors duration-200 hover:border-border-strong ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
