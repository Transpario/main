// A lightweight shared store for scroll state that doesn't trigger React renders.
// Can be read in requestAnimationFrame loops (e.g. Three.js useFrame).

export const scrollStore = {
  progress: 0, // 0 to 1
  velocity: 0,
};

// Helper for native scroll calculations when Lenis is disabled
export function updateNativeScroll() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) {
    scrollStore.progress = 0;
  } else {
    scrollStore.progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
  }
}
