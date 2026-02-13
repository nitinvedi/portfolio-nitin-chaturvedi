import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiGithub, FiLinkedin, FiMail, FiCode, FiArrowUpRight, FiCopy, FiGlobe, FiCheck } from "react-icons/fi";
import { SiReact, SiNodedotjs, SiMongodb, SiTailwindcss, SiJavascript, SiTypescript, SiPostgresql, SiDocker, SiNextdotjs, SiAmazon, SiFigma, SiPython, SiGit, SiRedux, SiGraphql, SiFirebase } from "react-icons/si";
import { useNotification } from "../../context/NotificationContext";

/* --- Helper Components (Defined TOP to prevent hoisting errors) --- */

function BentoItem({ children, className }) {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            className={`p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/50 backdrop-blur-md transition-all duration-300 relative overflow-hidden group shadow-sm hover:shadow-xl hover:shadow-stone-200/50 dark:hover:shadow-black/50 ${className}`}
        >
            {/* Subtle Noise Overlay */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
            {children}
        </motion.div>
    );
}

function MarqueeRow({ icons, speed, reverse }) {
     return (
        <div className="flex overflow-hidden w-full mask-linear-fade">
            <motion.div 
                className="flex gap-8 items-center flex-shrink-0 pr-8"
                initial={{ x: reverse ? "-100%" : "0%" }}
                animate={{ x: reverse ? "0%" : "-100%" }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
            >
                {[...icons, ...icons, ...icons].map((Icon, idx) => ( // Triple fallback for smooth loop
                    <div key={idx} className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800/50 text-stone-400 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-white dark:hover:bg-stone-700 transition-all cursor-default transform hover:scale-110">
                        <Icon className="text-2xl sm:text-3xl" />
                    </div>
                ))}
            </motion.div>
             <motion.div 
                className="flex gap-8 items-center flex-shrink-0 pr-8"
                initial={{ x: reverse ? "-100%" : "0%" }}
                animate={{ x: reverse ? "0%" : "-100%" }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
            >
               {[...icons, ...icons, ...icons].map((Icon, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800/50 text-stone-400 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-white dark:hover:bg-stone-700 transition-all cursor-default transform hover:scale-110">
                        <Icon className="text-2xl sm:text-3xl" />
                    </div>
                ))}
            </motion.div>
        </div>
     )
}

function RotatingTextCircle({ text }) {
    return (
        <div className="relative w-32 h-32 flex items-center justify-center group cursor-pointer">
            {/* Rotating Ring */}
            <motion.div 
                className="absolute inset-0 w-full h-full rounded-full border border-stone-200 dark:border-stone-800"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
                <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                    <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="transparent"
                    />
                    <text className="text-[11px] font-bold uppercase tracking-[0.2em] fill-stone-400 dark:fill-stone-500">
                        <textPath href="#circlePath" startOffset="0%">
                            {text}
                        </textPath>
                    </text>
                </svg>
            </motion.div>
            
            {/* Center Glow on Hover */}
            <div className="absolute w-12 h-12 rounded-full bg-amber-500/10 scale-0 group-hover:scale-150 transition-transform duration-500"></div>
        </div>
    );
}

function CopyEmailButton({ email }) {
    const { notify } = useNotification();

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        notify("Email copied to clipboard!", FiCheck);
    };

    return (
        <button 
            onClick={handleCopy}
            className="w-full p-4 rounded-xl bg-stone-900 dark:bg-white text-stone-100 dark:text-stone-900 font-bold flex items-center justify-between group relative overflow-hidden"
        >
             <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
             <span className="relative z-10 flex items-center gap-2">
                 <FiMail className="text-lg" />
                 Copy Email
             </span>
             <FiCopy className="relative z-10 text-lg opacity-50 group-hover:opacity-100" />
        </button>
    )
}

function SocialLink({ href, icon, label }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 text-sm font-medium"
        >
            {icon}
            <span>{label}</span>
        </a>
    )
}

function TechIcon({ Icon, color, label }) {
    return (
        <div className="flex flex-col items-center gap-1 group">
            <Icon className={`text-2xl ${color} brightness-90 group-hover:brightness-110 transition-all duration-300`} />
        </div>
    );
}

/* --- Main Component --- */

const BentoGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">
            {/* 1. Location Map (Tall) */}
            <BentoItem className="md:col-span-1 md:row-span-1 min-h-[250px]">
                <div className="flex flex-col h-full justify-between z-10 relative">
                     <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-amber-500/10 rounded-lg">
                             <FiMapPin className="text-amber-500 text-xl" />
                        </div>
                        <span className="font-bold text-stone-900 dark:text-stone-100 font-display tracking-tight">Base of Operations</span>
                    </div>
                    
                    <div className="w-full flex-1 rounded-xl bg-stone-200 dark:bg-stone-800 relative overflow-hidden border border-stone-200 dark:border-stone-700/50 group">
                        {/* Map Image */}
                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/India_%28orthographic_projection%29.svg/1200px-India_%28orthographic_projection%29.svg.png')] bg-cover bg-center opacity-60 mix-blend-multiply dark:mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"></div>
                        
                        {/* Pulse Beacon */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <span className="relative flex h-4 w-4">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-white dark:border-stone-900"></span>
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                        <p className="text-sm text-stone-500 dark:text-stone-400 font-mono">India • UTC+5:30</p>
                    </div>
                </div>
            </BentoItem>

            {/* 2. Tech Arsenal (Wide & Infinite) */}
            <BentoItem className="md:col-span-2 md:row-span-1 overflow-hidden group">
                 <div className="flex flex-col h-full z-10 relative">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                             <div className="p-2 bg-teal-500/10 rounded-lg">
                                <SiReact className="text-teal-500 text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-stone-900 dark:text-stone-100 font-display text-lg">Tech Arsenal</h3>
                                <p className="text-xs text-stone-500 dark:text-stone-400">The weapons I choose.</p>
                            </div>
                        </div>
                    </div>

                    {/* Infinite Marquees */}
                    <div className="flex flex-col gap-4 relative mask-linear-fade">
                        <MarqueeRow icons={[SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiFigma, SiAmazon, SiGit]} speed={20} />
                        <MarqueeRow icons={[SiNodedotjs, SiMongodb, SiPostgresql, SiDocker, SiPython, SiRedux, SiGraphql, SiFirebase]} speed={25} reverse />
                    </div>
                 </div>
            </BentoItem>

            {/* 3. Let's Talk / Contact Circle (Square) - UPGRADED */}
            <BentoItem className="md:col-span-1 md:row-span-1 bg-stone-900 dark:bg-black !border-stone-800">
                 <div className="flex flex-col h-full items-center justify-center relative z-10 w-full">
                    <RotatingTextCircle text="LET'S TALK • WORK TOGETHER • " />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <FiMail className="text-3xl text-amber-500" />
                    </div>
                    <a href="mailto:chaturvediinitin@gmail.com" className="absolute inset-0 z-20" aria-label="Contact Me"></a>
                 </div>
            </BentoItem>

            {/* 4. Social & Connect (Wide) */}
            <BentoItem className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800/50">
                 <div className="flex flex-col sm:flex-row h-full gap-6 z-10 relative">
                    
                    {/* Bio Section */}
                    <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-stone-800 dark:text-stone-200 mb-2 font-display">
                            Engineering with <span className="text-amber-500">precision</span>.
                        </h3>
                        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                            Building scalable, accessible, and performant digital experiences. Always exploring the bleeding edge.
                        </p>
                        <div className="flex gap-2">
                             <SocialLink href="https://github.com/nitinvedi" icon={<FiGithub />} label="GitHub" />
                             <SocialLink href="https://www.linkedin.com/in/nitinvedi" icon={<FiLinkedin />} label="LinkedIn" />
                        </div>
                    </div>

                     {/* Stats / Copy Email */}
                    <div className="w-full sm:w-1/3 flex flex-col gap-2 justify-center">
                        <CopyEmailButton email="chaturvediinitin@gmail.com" />
                         <div className="p-3 rounded-xl bg-stone-200/50 dark:bg-black/20 border border-stone-200 dark:border-stone-700/50 flex align-center gap-3">
                            <FiCode className="text-xl text-emerald-500 mt-1" />
                            <div>
                                <span className="block text-lg font-bold text-stone-900 dark:text-white">Full Stack</span>
                                <span className="text-xs text-stone-500">Developer</span>
                            </div>
                        </div>
                    </div>

                 </div>
            </BentoItem>
        </div>
    );
};

export default BentoGrid;
