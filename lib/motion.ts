import { useEffect, useState } from 'react';
import { Variants } from 'motion/react';

// Common eased fade-up variant
export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  }
};

// Stagger container for lists
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    }
  }
};

// Hook to detect user OS preference for reduced motion
export function useReducedMotion() {
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isReduced;
}

// NOTE: When using these animations in components, prefer LazyMotion to reduce bundle size:
// import { LazyMotion, domAnimation, m } from 'motion/react'
// <LazyMotion features={domAnimation}>
//   <m.div variants={fadeUpVariant} initial="hidden" animate="visible" />
// </LazyMotion>
