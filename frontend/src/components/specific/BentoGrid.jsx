import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiMapPin, FiActivity, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import Magnetic from "../common/Magnetic";

const BentoGrid = () => {
    const [ping, setPing] = useState(14);
    const containerRef = useRef(null);
    
    // Mouse tracking for parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
    
    // Parallax transforms
    const moveX = useTransform(springX, [-500, 500], [-15, 15]);
    const moveY = useTransform(springY, [-500, 500], [-15, 15]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPing(Math.floor(Math.random() * (45 - 12 + 1) + 12));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText("chaturvediinitin@gmail.com");
    };

    return (
        <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="flex flex-col gap-16 max-w-7xl mx-auto w-full mb-32 relative"
        >
            
            {/* Massive Bio Section with Parallax */}
            <div className="border-b border-stone-200 dark:border-stone-800 pb-16">
                <motion.h3 
                    style={{ x: moveX, y: moveY }}
                    className="text-5xl sm:text-7xl lg:text-[7.5rem] font-display font-bold text-stone-900 dark:text-stone-100 tracking-tighter leading-[0.95] mb-8"
                >
                    Ships production. <br className="hidden sm:block" /> 
                    <span className="font-serif italic font-light text-stone-400 dark:text-stone-500">Measures results.</span>
                </motion.h3>
                <p className="text-xl sm:text-2xl text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed font-medium">
                    I go beyond tutorials. My systems handle real users and real logic. Specializing in highly scalable MERN and Go architectures.
                </p>
                
                <div className="flex flex-wrap items-center gap-8 mt-12">
                     <Magnetic>
                         <a href="https://github.com/nitinvedi" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-stone-900 dark:text-stone-100 hover:text-amber-500 transition-colors uppercase tracking-[0.2em] text-xs font-bold p-2">
                             <FiGithub className="text-lg" /> Github
                         </a>
                     </Magnetic>
                     <Magnetic>
                         <a href="https://www.linkedin.com/in/nitinvedi" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-stone-900 dark:text-stone-100 hover:text-amber-500 transition-colors uppercase tracking-[0.2em] text-xs font-bold p-2">
                             <FiLinkedin className="text-lg" /> LinkedIn
                         </a>
                     </Magnetic>
                     <Magnetic>
                         <button onClick={handleCopy} className="flex items-center gap-2 text-stone-900 dark:text-stone-100 hover:text-amber-500 transition-colors uppercase tracking-[0.2em] text-xs font-bold cursor-pointer p-2">
                             <FiMail className="text-lg" /> Email Me
                         </button>
                     </Magnetic>
                </div>
            </div>

            {/* Tech Stack - Typographic Index List */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 w-full">
                
                {/* Left: Operations / Info */}
                <div className="w-full lg:w-1/3 flex flex-col gap-10">
                     <motion.div whileHover={{ x: 5 }} className="transition-all">
                         <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400 dark:text-stone-600 mb-3 block">[ Status ]</span>
                         <div className="flex items-center gap-3 text-stone-900 dark:text-stone-100 font-medium text-lg">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] outline outline-2 outline-emerald-500/30 outline-offset-2"></div>
                              Online & Available
                         </div>
                     </motion.div>
                     <motion.div whileHover={{ x: 5 }} className="transition-all">
                         <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400 dark:text-stone-600 mb-3 block">[ Location ]</span>
                         <div className="flex items-center gap-3 text-stone-900 dark:text-stone-100 font-medium text-lg">
                              <FiMapPin className="text-stone-400" /> India <span className="text-stone-400 font-normal">(UTC+5:30)</span>
                         </div>
                     </motion.div>
                     <motion.div whileHover={{ x: 5 }} className="transition-all">
                         <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400 dark:text-stone-600 mb-3 block">[ API Route ]</span>
                         <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-500 font-medium font-mono text-lg">
                              <FiActivity className="animate-pulse" /> {ping}ms avg latency
                         </div>
                     </motion.div>
                </div>

                {/* Right: Architecture & Tech */}
                <div className="w-full lg:w-2/3 flex flex-col pt-8 lg:pt-0 border-t lg:border-t-0 border-stone-200 dark:border-stone-800">
                     <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400 dark:text-stone-600 mb-8 block">[ Core Architecture ]</span>
                     
                     <div className="flex flex-col border-t border-stone-200 dark:border-stone-800">
                          {/* Row 1 */}
                          <motion.div 
                               whileHover={{ x: 10 }}
                               className="group flex flex-col sm:flex-row sm:items-baseline justify-between py-8 border-b border-stone-200 dark:border-stone-800 hover:bg-stone-50/50 dark:hover:bg-white/[0.02] px-4 -mx-4 transition-all duration-300 cursor-default"
                          >
                               <h4 className="text-2xl md:text-3xl font-display text-stone-900 dark:text-stone-100 w-full sm:w-1/3 mb-4 sm:mb-0 group-hover:text-amber-500 transition-colors italic group-hover:not-italic transition-all">Languages</h4>
                               <p className="text-stone-500 font-mono text-xs sm:text-sm sm:w-2/3 sm:text-right leading-relaxed">
                                   JavaScript / TypeScript <br className="sm:hidden" /> / Python / Go / C++
                               </p>
                          </motion.div>
                          {/* Row 2 */}
                          <motion.div 
                               whileHover={{ x: 10 }}
                               className="group flex flex-col sm:flex-row sm:items-baseline justify-between py-8 border-b border-stone-200 dark:border-stone-800 hover:bg-stone-50/50 dark:hover:bg-white/[0.02] px-4 -mx-4 transition-all duration-300 cursor-default"
                          >
                               <h4 className="text-2xl md:text-3xl font-display text-stone-900 dark:text-stone-100 w-full sm:w-1/3 mb-4 sm:mb-0 group-hover:text-amber-500 transition-colors italic group-hover:not-italic transition-all">Frontend</h4>
                               <p className="text-stone-500 font-mono text-xs sm:text-sm sm:w-2/3 sm:text-right leading-relaxed">
                                   React / React Native / Tailwind CSS / Framer Motion
                               </p>
                          </motion.div>
                          {/* Row 3 */}
                          <motion.div 
                               whileHover={{ x: 10 }}
                               className="group flex flex-col sm:flex-row sm:items-baseline justify-between py-8 border-b border-stone-200 dark:border-stone-800 hover:bg-stone-50/50 dark:hover:bg-white/[0.02] px-4 -mx-4 transition-all duration-300 cursor-default"
                          >
                               <h4 className="text-2xl md:text-3xl font-display text-stone-900 dark:text-stone-100 w-full sm:w-1/3 mb-4 sm:mb-0 group-hover:text-amber-500 transition-colors italic group-hover:not-italic transition-all">Backend / DB</h4>
                               <p className="text-stone-500 font-mono text-xs sm:text-sm sm:w-2/3 sm:text-right leading-relaxed">
                                   Node.js / Express / Socket.IO / MongoDB / PostgreSQL / Redis
                               </p>
                          </motion.div>
                     </div>
                </div>
            </div>
            
        </div>
    );
};

export default BentoGrid;
