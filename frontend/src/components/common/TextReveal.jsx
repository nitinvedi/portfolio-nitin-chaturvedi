import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TextReveal = ({ children, className = "" }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.8", "start 0.25"],
  });

  return (
    <div ref={targetRef} className={`relative z-0 h-[150vh] ${className}`}>
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {/* Massive Typography Update */}
        <p className="flex flex-wrap p-5 text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black font-display tracking-tight text-stone-200 dark:text-stone-800 leading-[1.1]">
          {Array.isArray(children) 
            ? children.map((child, i) => {
                const start = i / children.length;
                const end = start + 1 / children.length;
                return (
                  <Word key={i} progress={scrollYProgress} range={[start, end]}>
                    {child}
                  </Word>
                );
              })
            : <Word progress={scrollYProgress} range={[0, 1]}>{children}</Word>
          }
        </p>
      </div>
    </div>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  
  // If the child is a React element (like our <span className="text-amber-500">), 
  // we render it directly inside the motion.span to preserve its specific styling,
  // but let framer-motion control its overall opacity reveal.
  
  return (
    <span className="relative mr-3 mt-3 lg:mr-4 lg:mt-4">
      <span className="absolute opacity-10 select-none" aria-hidden="true">{children}</span>
      <motion.span 
         style={{ opacity: opacity }} 
         className="text-stone-900 dark:text-stone-100 relative drop-shadow-sm"
      >
        {children}
      </motion.span>
    </span>
  );
};

export default TextReveal;
