import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}

export default function Container({ children, className = '', wide = false }: ContainerProps) {
  return (
    <div className={`${wide ? 'max-w-[1400px]' : 'max-w-[1200px]'} mx-auto px-4 md:px-8 ${className}`}>
      {children}
    </div>
  );
}
