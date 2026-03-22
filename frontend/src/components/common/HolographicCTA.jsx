import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { FiArrowUpRight, FiCopy, FiCheck } from "react-icons/fi";
import TextSplitReveal from "./TextSplitReveal";

const MagneticButton = ({ children, href, onClick }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const center = { x: left + width / 2, y: top + height / 2 };
        x.set((clientX - center.x) * 0.4);
        y.set((clientY - center.y) * 0.4);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const content = (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="w-48 h-48 md:w-64 md:h-64 bg-stone-900 dark:bg-white rounded-full flex flex-col items-center justify-center group cursor-pointer relative"
        >
            <div className="absolute inset-0 bg-stone-800 dark:bg-stone-200 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
            <div className="relative z-10 flex flex-col items-center text-white dark:text-stone-900">
                <span className="text-3xl md:text-4xl">
                   <FiArrowUpRight />
                </span>
                <span className="mt-2 text-xs font-black uppercase tracking-[0.2em]">Contact</span>
            </div>
        </motion.div>
    );

    return href ? (
        <a href={href} target="_blank" rel="noreferrer">{content}</a>
    ) : (
        <button onClick={onClick}>{content}</button>
    );
};

const HolographicCTA = () => {
    const containerRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText("chaturvediinitin@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div ref={containerRef} className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden py-32 bg-transparent">
            
            {/* Soft Local Glow to match site theme */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-amber-500/5 dark:bg-amber-500/[0.03] blur-[150px] rounded-full pointer-events-none z-0" />
            
            <motion.div 
                style={{ y, opacity }}
                className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center"
            >
                {/* Secondary Title */}
                <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-stone-400 dark:text-stone-500 mb-12">
                   Available for Freelance & Collaborative Projects
                </span>

                {/* Main Headline */}
                <h2 className="text-[12vw] md:text-[8vw] font-display font-black leading-[0.8] tracking-tighter text-stone-900 dark:text-white uppercase mb-20 select-none">
                    <TextSplitReveal text="Let's Build" />
                    <br />
                    <span className="text-transparent stroke-text dark:stroke-text-white">
                        <TextSplitReveal text="Something" delay={0.4} />
                    </span> 
                    <TextSplitReveal text="Real" delay={0.6} />
                    <span className="text-amber-500">.</span>
                </h2>

                {/* The Magnetic Vortex */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 w-full">
                    <div className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left max-w-xs">
                        <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-8">
                            High-performance design systems, architectural efficiency, and scalable engineering. Let’s turn your vision into production-ready software.
                        </p>
                        <button 
                            onClick={handleCopy}
                            className="group flex items-center gap-4 text-xs font-black uppercase tracking-widest text-stone-900 dark:text-white hover:italic transition-all"
                        >
                            {copied ? (
                                <span className="flex items-center gap-2 text-emerald-500">
                                    <FiCheck /> COPIED
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <FiCopy /> COPY EMAIL
                                </span>
                            )}
                        </button>
                    </div>

                    <div className="order-1 md:order-2">
                        <MagneticButton href="mailto:chaturvediinitin@gmail.com" />
                    </div>
                </div>
            </motion.div>

            {/* Subtle Aesthetic Accents */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-stone-200/30 dark:bg-white/5" />
            <div className="absolute top-0 right-[20%] w-px h-[20%] bg-stone-200/30 dark:bg-white/5 hidden md:block" />
        </div>
    );
};

export default HolographicCTA;
