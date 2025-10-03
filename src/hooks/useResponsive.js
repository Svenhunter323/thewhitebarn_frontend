import { useState, useEffect, useMemo } from 'react';

/**
 * Custom hook for responsive behavior management
 * Provides breakpoint detection and responsive utilities
 */
const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [breakpoint, setBreakpoint] = useState('desktop');

  // Tailwind CSS breakpoints
  const breakpoints = useMemo(() => ({
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  }), []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });

      // Determine current breakpoint
      if (width < breakpoints.sm) {
        setBreakpoint('mobile');
      } else if (width < breakpoints.md) {
        setBreakpoint('sm');
      } else if (width < breakpoints.lg) {
        setBreakpoint('md');
      } else if (width < breakpoints.xl) {
        setBreakpoint('lg');
      } else if (width < breakpoints['2xl']) {
        setBreakpoint('xl');
      } else {
        setBreakpoint('2xl');
      }
    };

    // Set initial values
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints]);

  // Utility functions
  const isMobile = windowSize.width < breakpoints.lg;
  const isTablet = windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg;
  const isDesktop = windowSize.width >= breakpoints.lg;
  const isSmallScreen = windowSize.width < breakpoints.md;

  // Breakpoint checkers
  const isAbove = (bp) => windowSize.width >= breakpoints[bp];
  const isBelow = (bp) => windowSize.width < breakpoints[bp];
  const isBetween = (minBp, maxBp) => 
    windowSize.width >= breakpoints[minBp] && windowSize.width < breakpoints[maxBp];

  return {
    windowSize,
    breakpoint,
    breakpoints,
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
    isAbove,
    isBelow,
    isBetween,
  };
};

export default useResponsive;
