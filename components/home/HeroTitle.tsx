'use client';

import React from 'react';
import { LazyMotion, domAnimation, m } from 'motion/react';
import { fadeUpVariant, useReducedMotion } from '@/lib/motion';

export function HeroTitle() {
  const isReducedMotion = useReducedMotion();
  const lines = ['The', 'Internship', 'Index'];

  if (isReducedMotion) {
    return (
      <h1 className="text-editorial text-foreground mb-8 md:mb-10">
        The<br />
        Internship<br />
        Index
      </h1>
    );
  }

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.h1 
        className="text-editorial text-foreground mb-8 md:mb-10 flex flex-col"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        {lines.map((line, i) => (
          <m.span key={i} variants={fadeUpVariant} className="block overflow-hidden">
            {line}
          </m.span>
        ))}
      </m.h1>
    </LazyMotion>
  );
}
