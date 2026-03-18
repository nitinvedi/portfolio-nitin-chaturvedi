import React, { useState } from "react";
import { FiMail, FiCopy, FiArrowRight, FiCheck } from "react-icons/fi";

const HolographicCTA = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText("chaturvediinitin@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full py-32 flex flex-col items-center justify-center border-y border-stone-200 dark:border-[#1a1a1a] bg-stone-50 dark:bg-[#0c0c0c] mt-20">
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-4">
            <span className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-6">Next Steps</span>
            
            <h2 className="text-5xl sm:text-7xl font-bold font-display text-stone-900 dark:text-stone-100 mb-6 tracking-tighter">
                Let's build something <span className="italic font-serif font-light text-stone-500">real.</span>
            </h2>
            
            <p className="text-lg text-stone-500 dark:text-stone-400 mb-10 max-w-xl mx-auto">
                Whether you need a full-stack web application from scratch or want to scale an existing system, I'm available for freelance work.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <a 
                    href="mailto:chaturvediinitin@gmail.com"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 font-semibold flex items-center justify-center gap-2 hover:bg-stone-800 dark:hover:bg-white transition-colors"
                >
                    Start a conversation <FiArrowRight />
                </a>
                
                <button 
                    onClick={handleCopy}
                    className="w-full sm:w-auto px-6 py-4 rounded-full bg-white dark:bg-[#111111] border border-stone-200 dark:border-[#2a2a2a] text-stone-600 dark:text-stone-300 font-medium flex items-center justify-center gap-2 hover:bg-stone-50 dark:hover:bg-[#161616] transition-colors"
                >
                    {copied ? <FiCheck className="text-emerald-500" /> : <FiCopy />}
                    {copied ? "Copied" : "Copy Email"}
                </button>
            </div>
        </div>
    </div>
  );
};

export default HolographicCTA;
