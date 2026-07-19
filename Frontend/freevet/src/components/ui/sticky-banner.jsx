"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyBanner = ({
  className,
  children,
  hideOnScroll = false
}) => {
  const [open, setOpen] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (hideOnScroll && latest > 40) {
      setOpen(false);
    }
  });

  // Auto-dismiss banner after 5 seconds if not closed manually
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={cn(
            "sticky inset-x-0 top-0 z-40 flex w-full items-center justify-center bg-transparent px-4 overflow-hidden",
            className
          )}
          initial={{
            height: 0,
            opacity: 0,
            y: -50,
          }}
          animate={{
            height: "auto",
            opacity: 1,
            y: 0,
          }}
          exit={{
            height: 0,
            opacity: 0,
            y: -50,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}>
          <div className="py-2.5 w-full flex items-center justify-center">
            {children}
          </div>
          <motion.button
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer z-50 p-1 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setOpen(false)}>
            <CloseIcon className="h-5 w-5 text-white" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CloseIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};
