import React from "react";
import { motion } from "framer-motion";

const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base Background Color */}
      <div className="absolute inset-0 bg-stone-100 dark:bg-stone-950 transition-colors duration-700" />

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10 blur-[100px]">
        {/* Orb 1: Deep Indigo/Blue (Top Left) */}
        <motion.div
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/30 mix-blend-multiply dark:mix-blend-screen"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Orb 2: Teal/Cyan (Top Right) */}
        <motion.div
          className="absolute top-[0%] right-[0%] w-[40vw] h-[40vw] rounded-full bg-teal-600/20 mix-blend-multiply dark:mix-blend-screen"
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Orb 3: Violet/Purple (Bottom Left) */}
        <motion.div
          className="absolute bottom-[0%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-violet-600/20 mix-blend-multiply dark:mix-blend-screen"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

         {/* Orb 4: Rose/Red (Center/Moving) */}
         <motion.div
          className="absolute top-[30%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-rose-500/20 mix-blend-multiply dark:mix-blend-screen"
          animate={{
            x: [0, 150, -100, 0],
            y: [0, -100, 100, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Subtle Noise Texture Overlay for "Grain" feel */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>
    </div>
  );
};

export default AuroraBackground;
