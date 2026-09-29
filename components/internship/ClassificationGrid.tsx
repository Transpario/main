import React, { ReactNode } from 'react';

interface ClassificationGridProps {
  children: ReactNode;
}

export default function ClassificationGrid({ children }: ClassificationGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  );
}
