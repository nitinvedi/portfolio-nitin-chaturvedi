import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function MediaReveal({ children, mediaSrc, mediaType = 'image' }) {
    const [isHovered, setIsHovered] = useState(false);
    
    const mouseX = useSpring(0, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(0, { stiffness: 150, damping: 15 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const padding = 24;
            const width = 256; // w-64
            const height = 160; // h-40

            let targetX = e.clientX;
            // Default position: slightly above the cursor
            let targetY = e.clientY - height / 2 - 24;

            // Clamp X to screen
            if (targetX < width / 2 + padding) {
                targetX = width / 2 + padding;
            } else if (targetX > window.innerWidth - width / 2 - padding) {
                targetX = window.innerWidth - width / 2 - padding;
            }

            // Clamp Y (if it goes off top of screen, flip below cursor)
            if (targetY - height / 2 < padding) {
                targetY = e.clientY + height / 2 + 24;
            }

            mouseX.set(targetX);
            mouseY.set(targetY);
        };
        // We only add the listener when hovered for performance, or keep it global.
        // Keeping it global ensures it doesn't snap abruptly on enter.
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
            
            {/* The Floating Portal equivalent (fixed to window) */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-[100] w-64 h-40 overflow-hidden rounded-xl shadow-2xl border border-white/10 origin-center"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%', 
                }}
                initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
                animate={{ 
                    opacity: isHovered ? 1 : 0, 
                    scale: isHovered ? 1 : 0.5,
                    rotate: isHovered ? 0 : -5
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >
               {mediaType === 'image' ? (
                   <img src={mediaSrc} alt="Preview" className="w-full h-full object-cover rounded-xl" />
               ) : (
                   <video src={mediaSrc} autoPlay loop muted playsInline className="w-full h-full object-cover rounded-xl" />
               )}
            </motion.div>
        </div>
    );
}
