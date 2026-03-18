import React from 'react';

export const GridBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* The Grid */}
        <div 
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
                backgroundImage: `linear-gradient(to right, #8882 1px, transparent 1px), linear-gradient(to bottom, #8882 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                maskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)'
            }}
        />
        
        {/* Subtle glowing orbs for depth instead of overpowering aurora */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/5 blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-amber-500/5 blur-[120px] mix-blend-screen pointer-events-none" />
    </div>
  );
};

export default GridBackground;
