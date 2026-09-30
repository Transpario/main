'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
// @ts-expect-error - Vanta is untyped
import CLOUDS from 'vanta/dist/vanta.clouds.min';
import { scrollStore } from '@/lib/scrollStore';

function useReducedMotion() {
  const [isReduced, setIsReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  return isReduced;
}

export default function CloudBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const isReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasWebGL(!!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))));
    } catch {
      setHasWebGL(false);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && hasWebGL && !vantaEffect && vantaRef.current) {
      try {
        const effect = CLOUDS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          backgroundColor: 0x030712, 
          skyColor: 0x030712, 
          cloudColor: 0x1a2b4c, // pure deep blue, no red
          cloudShadowColor: 0x040b17, // very dark blue
          sunColor: 0x010514, // Truthy dark blue to override Vanta's defaults
          sunGlareColor: 0x010514, // Truthy dark blue
          sunPosition: 0.0,
          speed: isReducedMotion ? 0 : 0.6
        });
        
        setVantaEffect(effect);
      } catch (e) {
        console.error('Vanta effect failed', e);
        setHasWebGL(false);
      }
    }
    
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [mounted, hasWebGL, isReducedMotion, vantaEffect]);

  // Hook into our scrollStore to adjust the vanta camera for a parallax effect
  useEffect(() => {
    if (vantaEffect && vantaEffect.camera) {
      let animationFrameId: number;
      let currentScroll = 0;
      
      const loop = () => {
        if (!isReducedMotion) {
          // scrollStore.progress goes 0 to 1
          const targetScroll = scrollStore.progress * 400; // arbitrary multiplier
          currentScroll += (targetScroll - currentScroll) * 0.1; // simple smoothing
          
          // Move the camera to create scroll parallax
          // Vanta Clouds usually looks down, adjusting Y or Z gives depth
          // vantaEffect.camera.position.z = 200 - currentScroll;
          // vantaEffect.camera.position.y = 50 + currentScroll * 0.5;
        }
        animationFrameId = requestAnimationFrame(loop);
      };
      
      loop();
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [vantaEffect, isReducedMotion]);

  if (!hasWebGL) {
    // Fallback static gradient
    return (
      <div 
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, #1c1f26 0%, #0a0a0c 100%)'
        }}
      />
    );
  }

  return (
    <div 
      className="fixed inset-0 -z-10 pointer-events-none transition-opacity duration-1000 ease-in-out bg-[#0A0A0C]"
      style={{ opacity: mounted ? 1 : 0 }}
      aria-hidden="true"
    >
      <div ref={vantaRef} className="w-full h-full" />
      
      {/* CSS overlay to strictly enforce the blue color palette and destroy any red hues from Vanta's internal lighting */}
      <div className="absolute inset-0 bg-[#0a1930] mix-blend-color pointer-events-none" />
      
      {/* Dark vignette overlay for readability */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0C_100%)] opacity-50" />
    </div>
  );
}
