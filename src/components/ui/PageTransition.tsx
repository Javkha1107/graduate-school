"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const prevPathname = useRef(pathname);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setShouldAnimate(true);
      prevPathname.current = pathname;
      // Reset after animation completes
      const timer = setTimeout(() => setShouldAnimate(false), 350);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Skip animation entirely for reduced-motion preference
  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      animate={
        shouldAnimate ? { opacity: [0.6, 1], y: [8, 0] } : { opacity: 1, y: 0 }
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
