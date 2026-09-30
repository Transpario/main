'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { scrollStore, updateNativeScroll } from '@/lib/scrollStore';

function ScrollManager({ isReducedMotion }: { isReducedMotion: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lenis = useLenis();

  // On route change, scroll to top immediately
  useEffect(() => {
    if (lenis && !isReducedMotion) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' } as ScrollToOptions);
    }
  }, [pathname, searchParams, lenis, isReducedMotion]);

  // Update scrollStore from Lenis or Native
  useLenis((scroll) => {
    if (!isReducedMotion) {
      scrollStore.progress = scroll.progress;
      scrollStore.velocity = scroll.velocity;
    }
  });

  useEffect(() => {
    if (!isReducedMotion) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateNativeScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // Initialize
    updateNativeScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isReducedMotion]);

  // Handle anchor links
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      
      const hash = target.hash;
      if (hash && target.origin === window.location.origin && target.pathname === window.location.pathname) {
        const element = document.querySelector(hash) as HTMLElement;
        if (element) {
          e.preventDefault();
          if (lenis && !isReducedMotion) {
            lenis.scrollTo(element, { immediate: false });
          } else {
            element.scrollIntoView({ behavior: 'auto' });
          }
        }
      }
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [lenis, isReducedMotion]);

  return null;
}

import { Suspense } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  if (isReducedMotion) {
    return (
      <>
        <Suspense fallback={null}>
          <ScrollManager isReducedMotion={true} />
        </Suspense>
        {children}
      </>
    );
  }

  return (
    <ReactLenis 
      root 
      options={{
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      <Suspense fallback={null}>
        <ScrollManager isReducedMotion={false} />
      </Suspense>
      {children}
    </ReactLenis>
  );
}
