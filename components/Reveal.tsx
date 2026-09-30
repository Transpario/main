'use client';

import React from 'react';
import { LazyMotion, domAnimation, m } from 'motion/react';
import { fadeUpVariant, staggerContainer, useReducedMotion } from '@/lib/motion';

export function Reveal({ 
  children, 
  className = '', 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number 
}) {
  const isReducedMotion = useReducedMotion();

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const customVariant = {
    ...fadeUpVariant,
    visible: {
      ...fadeUpVariant.visible,
      transition: {
        ...(fadeUpVariant.visible as any).transition,
        delay,
      }
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        variants={customVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

export function RevealGroup({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string 
}) {
  const isReducedMotion = useReducedMotion();

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
