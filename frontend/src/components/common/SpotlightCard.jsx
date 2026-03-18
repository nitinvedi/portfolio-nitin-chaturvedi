import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SpotlightCard({ children, className = "" }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        const { left, top } = event.currentTarget.getBoundingClientRect();
        setMousePosition({ x: clientX - left, y: clientY - top });
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            whileHover={{ y: -4 }}
            className={`relative overflow-hidden group transition-all duration-300 ${className}`}
        >
             {/* Primary Glow Area */}
             <div 
                className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(20, 184, 166, 0.08), transparent 40%)` // Teal hue
                }}
             />
             {/* Border Highlighting */}
             <div 
                className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-overlay"
                style={{
                     background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2), transparent 40%)`
                }}
             />
             <div className="relative z-10 h-full">{children}</div>
        </motion.div>
    );
}
