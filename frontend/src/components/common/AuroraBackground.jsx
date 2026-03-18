import React from "react";

const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* 
        Minimalist Matte Black Background 
        - Using stone-950/black for deep contrast 
      */}
      <div className="absolute inset-0 bg-stone-50 dark:bg-[#0a0a0a] transition-colors duration-700" />
      
      {/* Extremely subtle noise for texture - optional, but keeps it from feeling completely flat */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
    </div>
  );
};

export default AuroraBackground;
