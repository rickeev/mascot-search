import { useCallback } from "react";

export default function useScrollToTop() {
  return useCallback(() => {
    // Get the current scroll position
    const startPosition = window.scrollY;
    // Set the duration shorter for faster scrolling (in milliseconds)
    const duration = 200;
    const startTime = performance.now();
    
    function scrollStep(timestamp) {
      const elapsed = timestamp - startTime;
      // Calculate how far to scroll with easeInOutQuad easing
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
      // Apply the scroll
      window.scrollTo(0, startPosition * (1 - easeProgress));
        
      // Continue the animation if not complete
      if (progress < 1) {
        window.requestAnimationFrame(scrollStep);
      }
    }
    // Start the scroll animation
    window.requestAnimationFrame(scrollStep);
  }, []);
}