import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TextReveal = ({ children, className = "" }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.8", "start 0.25"],
  });

  let words = [];
  if (typeof children === "string") {
    words = children.split(" ");
  } else if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === "string") {
        words.push(...child.trim().split(/\s+/));
      } else {
        words.push(child);
      }
    });
  } else {
    // Fallback for single element child
    words = [children];
  }

  return (
    <div ref={targetRef} className={`relative z-0 h-[200vh] ${className}`}>
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <p className="flex flex-wrap p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mr-3 mt-3 lg:mr-4 lg:mt-4">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity: opacity }} className="text-black dark:text-white">
        {children}
      </motion.span>
    </span>
  );
};

export default TextReveal;
