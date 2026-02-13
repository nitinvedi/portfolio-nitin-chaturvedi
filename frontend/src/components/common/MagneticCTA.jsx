import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

const MagneticCTA = () => {
  return (
    <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-100 to-transparent dark:from-zinc-900 pointer-events-none" />
        
        <Magnetic strength={0.3}>
            <a 
                href="mailto:chaturvediinitin@gmail.com"
                className="group relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80 rounded-full bg-indigo-600 text-white cursor-pointer overflow-hidden transition-transform duration-500 hover:scale-105"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-100 group-hover:opacity-90 transition-opacity" />
                {/* Moving blob background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-white/20 blur-[80px] rounded-full mix-blend-overlay group-hover:scale-110 transition-transform duration-700" />
                
                <div className="relative z-10 flex flex-col items-center gap-2">
                    <span className="text-lg md:text-xl font-medium opacity-80 group-hover:-translate-y-2 transition-transform duration-300">Got a project?</span>
                    <span className="text-3xl md:text-4xl font-bold font-display group-hover:scale-110 transition-transform duration-300">Let's Talk</span>
                </div>
            </a>
        </Magnetic>
    </div>
  );
};

export default MagneticCTA;
