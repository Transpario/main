import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function Card({ children, className = '', as: Component = 'div', ...props }: any) {
  return (
    <Component 
      className={`bg-white/[0.03] backdrop-blur-md border border-border rounded-[var(--radius)] p-6 transition-colors duration-200 hover:border-border-strong ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
