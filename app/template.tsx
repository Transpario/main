'use client';

import React from 'react';
import { LazyMotion, domAnimation, m } from 'motion/react';
import { useReducedMotion } from '@/lib/motion';

export default function Template({ children }: { children: React.ReactNode }) {
  const isReducedMotion = useReducedMotion();

  if (isReducedMotion) {
    return <>{children}</>;
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="flex flex-col flex-1"
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
