'use client';

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Clouds, Cloud } from '@react-three/drei';
import * as THREE from 'three';

function useReducedMotion() {
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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

import { scrollStore } from '@/lib/scrollStore';

function CloudScene({ isMobile, isReducedMotion }: { isMobile: boolean; isReducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const currentScroll = useRef(0);

  useFrame((state, delta) => {
    if (isReducedMotion) return;
    
    // Cloud drift
    if (groupRef.current) {
      groupRef.current.position.x -= delta * 0.05;
      
      // Scroll parallax (damped) using the global scrollStore
      const targetScroll = scrollStore.progress * 4; // Map 0-1 progress to 0-4 units of movement
      currentScroll.current += (targetScroll - currentScroll.current) * 4 * delta;
      groupRef.current.position.y = currentScroll.current;
    }

    // Mouse parallax (damped, desktop only)
    if (!isMobile) {
      const targetX = (state.pointer.x * state.viewport.width) / 10;
      const targetY = (state.pointer.y * state.viewport.height) / 10;
      
      state.camera.position.x += (targetX - state.camera.position.x) * 2 * delta;
      state.camera.position.y += (targetY - state.camera.position.y) * 2 * delta;
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={groupRef}>
      <Clouds material={THREE.MeshBasicMaterial} texture="/textures/cloud.png">
        <Cloud 
          seed={1}
          segments={isMobile ? 8 : 25}
          bounds={[12, 2, 2]}
          volume={6}
          color="#111318"
          position={[0, 0, -10]}
          speed={0.1}
          opacity={0.35}
        />
        <Cloud 
          seed={2}
          segments={isMobile ? 6 : 20}
          bounds={[15, 3, 2]}
          volume={5}
          color="#0d0e12"
          position={[-5, 2, -15]}
          speed={0.2}
          opacity={0.25}
        />
        {!isMobile && (
          <>
            <Cloud 
              seed={3}
              segments={20}
              bounds={[20, 5, 2]}
              volume={8}
              color="#131c26" // faint blue tint
              position={[5, -2, -20]}
              speed={0.15}
              opacity={0.15}
            />
            <Cloud 
              seed={4}
              segments={15}
              bounds={[10, 4, 2]}
              volume={4}
              color="#0d1712" // faint green tint
              position={[-2, -3, -25]}
              speed={0.1}
              opacity={0.15}
            />
          </>
        )}
      </Clouds>
    </group>
  );
}

export default function CloudBackground() {
  const isReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      setHasWebGL(!!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))));
    } catch (e) {
      setHasWebGL(false);
    }
    
    // Delayed mount for LCP
    const timer = setTimeout(() => setMounted(true), 1500);
    return () => clearTimeout(timer);
  }, []);

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
      className="fixed inset-0 -z-10 pointer-events-none transition-opacity duration-1500 ease-in-out bg-[#0A0A0C]"
      style={{ opacity: mounted ? 1 : 0 }}
      aria-hidden="true"
    >
      {mounted && (
        <Canvas
          dpr={isMobile ? 1 : [1, 1.5]}
          gl={{ antialias: false, powerPreference: "low-power" }}
          camera={{ position: [0, 0, 10], fov: 50 }}
          frameloop={isReducedMotion ? "demand" : "always"}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', (e) => {
              e.preventDefault();
              setHasWebGL(false);
            });
          }}
        >
          <color attach="background" args={['#0A0A0C']} />
          <fog attach="fog" args={['#0A0A0C', 5, 30]} />
          <Suspense fallback={null}>
            <CloudScene isMobile={isMobile} isReducedMotion={isReducedMotion} />
          </Suspense>
        </Canvas>
      )}
      
      {/* Dark vignette overlay for readability */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0C_100%)] opacity-80" />
    </div>
  );
}
