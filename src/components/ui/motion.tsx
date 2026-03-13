"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: staggerDelay, delayChildren: 0.1 },
    },
  };
  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}

export function CountUp({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <span ref={ref}>
      {isInView ? (
        <>
          <Counter from={0} to={target} duration={duration} />
          {suffix}
        </>
      ) : (
        <>0{suffix}</>
      )}
    </span>
  );
}

function Counter({
  from,
  to,
  duration,
}: {
  from: number;
  to: number;
  duration: number;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  return (
    <motion.span
      ref={nodeRef}
      initial={{ "--num": from } as Record<string, number>}
      animate={{ "--num": to } as Record<string, number>}
      transition={{ duration, ease: "easeOut" }}
      onUpdate={(latest) => {
        if (nodeRef.current) {
          nodeRef.current.textContent = Math.round(
            latest["--num"] as number,
          ).toLocaleString();
        }
      }}
    />
  );
}

export { motion };
