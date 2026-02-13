import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { FiMail, FiCopy, FiArrowUpRight, FiCheck } from "react-icons/fi";
import { useNotification } from "../../context/NotificationContext";

const HolographicCTA = () => {
  return (
    <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-t from-stone-100 to-transparent dark:from-stone-950 pointer-events-none" />
      <TiltCard />
    </div>
  );
};

const TiltCard = () => {
  const ref = useRef(null);
  const { notify } = useNotification();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * 32.5;
    const mouseY = (e.clientY - rect.top) * 32.5;

    const rX = (mouseY / height - 32.5 / 2) * -1;
    const rY = mouseX / width - 32.5 / 2;

    x.set(rX);
    y.set(rY);
  };

  const handleCopy = (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText("chaturvediinitin@gmail.com");
      notify("Email copied to clipboard!", FiCheck);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative w-80 h-96 rounded-3xl bg-stone-900/90 dark:bg-black/90 border border-stone-800 backdrop-blur-sm shadow-2xl cursor-pointer group"
    >
      {/* Holographic Gradient Overlay */}
      <div 
        style={{
          transform: "translateZ(50px)",
        }}
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-teal-500/20 via-amber-500/20 to-orange-500/20 pointer-events-none" 
      />
      
      {/* Content Layer */}
      <div 
        style={{
          transform: "translateZ(75px)",
        }}
        className="absolute inset-0 flex flex-col justify-between p-8"
      >
        {/* Top Header */}
        <div className="flex justify-between items-start">
            <div className="flex flex-col">
                <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">Status</span>
                <span className="flex items-center gap-1.5 mt-1">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-bold text-stone-300">Online</span>
                </span>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <FiArrowUpRight className="text-stone-400 text-xl" />
            </div>
        </div>

        {/* Center Text */}
        <div className="space-y-1">
            <h3 className="text-3xl font-bold text-white font-display leading-tight">
                Ready to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-amber-400">collaborate?</span>
            </h3>
            <p className="text-sm text-stone-400 leading-relaxed max-w-[200px]">
                Initiate a connection. Let's build the extraordinary.
            </p>
        </div>

        {/* Bottom Action */}
        <button 
            onClick={handleCopy}
            className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all flex items-center justify-between px-4 group/btn"
        >
            <span className="text-sm font-medium text-stone-300 group-hover/btn:text-white">
                chaturvediinitin@gmail.com
            </span>
            <FiCopy className="text-stone-400 group-hover/btn:text-white transition-colors" />
        </button>
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise mix-blend-overlay rounded-3xl" />
      
      {/* Glare Effect */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 group-hover:ring-white/20 transition-all pointer-events-none" />
    </motion.div>
  );
};

export default HolographicCTA;
