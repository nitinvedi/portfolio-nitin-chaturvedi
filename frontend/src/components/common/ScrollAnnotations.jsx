import React, { useState, useEffect, useRef } from 'react';
import { RoughNotation } from 'react-rough-notation';
import { tourSteps } from '../../data/tourSteps'; // Ensure correct path
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { createPortal } from 'react-dom';
import { FiX, FiInfo } from 'react-icons/fi';

// --- 5. Realistic Paper Texture (Base64 Noise) ---
const PAPER_NOISE = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyMDAlJyBoZWlnaHQ9JzIwMCUnPjxmaWx0ZXIgaWQ9J25vaXNlRmlsdGVyJz48ZmVUdXJYdWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMC42NScgbnVtT2N0YXZlcz0TMycgc3RpdGNoVGlsZXM9J3N0aXRjaCcvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNub2lzZUZpbHRlciknIG9wYWNpdHk9JzAuMDUnLz48L3N2Zz4=')"; 

// --- 4. Handwriting Animation Component ---
const TypewriterText = ({ text }) => {
  const characters = text.split("");
  return (
    <span className="inline-block relative">
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05, delay: index * 0.03, ease: "linear" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// --- 3. 3D Tilt Physics Component ---
const TiltCard = ({ children, className, style, drag, dragConstraints, whileDrag }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ ...style, rotateX, rotateY, perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}  
            drag={drag}  // 2. Draggable
            dragConstraints={dragConstraints}
            whileDrag={whileDrag}
        >
            {children}
        </motion.div>
    );
};




const AnnotationTrigger = ({ step }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [targetElement, setTargetElement] = useState(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Increase Threshold for "No Gutter Space" - e.g. < 1440px (approx 1152 + 250 + 250 margin)
  // Let's be slightly lenient, say 1300px, creating smaller space or hiding. 
  const breakpoint = 1400; 
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  const [isHovered, setIsHovered] = useState(false); 

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const element = document.querySelector(step.target);
    if (element) {
      setTargetElement(element);
      let animationFrameId; // Use RAF for smooth tracking
      let hideTimeout;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            // Start RAF loop
            const tick = () => {
              updateCoords(element);
              animationFrameId = requestAnimationFrame(tick);
            };
            tick();

            if (!isMobile) {
                const wordCount = step.content.split(' ').length;
                const readingTime = 2000 + (wordCount * 300);
                
                hideTimeout = setTimeout(() => {
                   setIsDismissed(true);
                }, readingTime);
            }

          } else {
            setIsVisible(false);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (hideTimeout) clearTimeout(hideTimeout);
          }
        },
        { threshold: 0.6 }
      );

      observer.observe(element);
      // We still listen to events as backup/trigger
      window.addEventListener('resize', () => updateCoords(element));
      
      return () => {
        observer.disconnect();
        window.removeEventListener('resize', () => updateCoords(element));
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (hideTimeout) clearTimeout(hideTimeout);
      };
    }
  }, [step.target, isMobile]); // Re-run if mobile changes

  const updateCoords = (el) => {
    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    
    setCoords({
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      width: rect.width,
      height: rect.height,
    });
  };

  if (!targetElement || isDismissed) return null;

  const readingTime = 2000 + (step.content.split(' ').length * 300);

  const getNoteConfig = () => {
      // Logic for Gutter Placement
      // Default: Right side unless specified "left"
      const isRightSide = !step.position?.includes('left'); 
      const wrapperWidth = 1152; // Approx max-w-6xl
      const gutterOffset = 20; // Space from content edge

      let style = {};
      let arrowStyle = {};
      let arrowRotation = 0;

      if (isRightSide) {
          // Right Gutter
          style = {
              top: '50%',
              left: `calc(50vw + ${wrapperWidth / 2 + gutterOffset}px)`, 
              translateY: '-50%',
              width: '220px',
              textAlign: 'left'
          };
          arrowRotation = 180; // Point Left
          arrowStyle = { top: '50%', right: '100%', marginTop: -10, marginRight: -25 };
      } else {
          // Left Gutter
          style = {
              top: '50%',
              right: `calc(50vw + ${wrapperWidth / 2 + gutterOffset}px)`,
              translateY: '-50%',
              width: '220px',
              textAlign: 'right'
          };
          arrowRotation = 0; // Point Right
          arrowStyle = { top: '50%', left: '100%', marginTop: -10, marginLeft: -25 };
      }
      return { style, arrowRotation, arrowStyle };
  };

  const { style, arrowRotation, arrowStyle } = getNoteConfig();

  const wrapperStyle = {
    top: coords.top, // Key vertical alignment
    left: 0, 
    width: '100%', // Use full width for horizontal calc
    height: coords.height, // Use element height for vertical centering reference
    position: 'absolute',
    pointerEvents: 'none', 
    zIndex: 50, 
  };
  
  // 5. Ambient Glow Logic (Box Shadow)
  const glowStart = "0 0 0px rgba(251, 191, 36, 0)"; 
  const glowActive = "0 0 25px rgba(251, 191, 36, 0.4)"; // Amber glow

  return createPortal(
    <>
      {/* 1. The Rough Notation Highlight */}
      <div 
        className="absolute pointer-events-none z-0"
        style={{
            top: coords.top,
            left: coords.left,
            width: coords.width,
            height: coords.height
        }}
      >
        <RoughNotation
          type={step.type}
          color={step.color}
          strokeWidth={2}
          show={isVisible}
          padding={step.padding || 5}
          brackets={step.brackets}
          multiline={step.multiline}
          animationDuration={1200}
          iterations={2} 
        >
          <div className="w-full h-full" />
        </RoughNotation>
      </div>

      {/* Wrapper for the Note */}
      <div style={wrapperStyle}>
        <AnimatePresence>
          {isVisible && (
            <>
              {!isMobile && (
                <TiltCard // 3. 3D Tilt Physics + 1. Levitation (inside component) + 2. Draggable
                    style={style}
                    drag // Enable Drag
                    dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                    whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 100 }}
                    className={`absolute pointer-events-auto p-2 max-w-[220px] 
                                font-['Patrick_Hand'] leading-snug text-lg
                                transform-gpu cursor-grab active:cursor-grabbing`} 
                >
                    {/* Removed: Paper Texture & Glow & Background - User wants clean text only */}

                    {/* Close Button */}
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsDismissed(true); }}
                        className="absolute -top-2 -right-2 bg-stone-100 dark:bg-stone-800 rounded-full p-1.5 
                                   shadow-sm transition-transform hover:scale-110 z-20"
                        style={{ color: step.color }}
                        aria-label="Close annotation"
                         onMouseDown={(e) => e.stopPropagation()} // Prevent drag when clicking close
                    >
                        <FiX size={12} />
                    </button>

                     {/* 2. Animated Arrow */}
                    <div 
                        className="absolute w-12 h-12 pointer-events-none"
                        style={{ 
                            ...arrowStyle, 
                            color: step.color, // Apply color to arrow
                            transform: `rotate(${arrowRotation}deg)` 
                        }}
                    >
                        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <motion.path 
                                d="M25 45L25 5M25 5L10 20M25 5L40 20" 
                                stroke="currentColor" 
                                strokeWidth="2.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                             />
                        </svg>
                    </div>

                    {/* 4. Handwriting Text Animation + Cursor */}
                    <div 
                        className="relative z-10 select-none font-bold drop-shadow-md" 
                        style={{ color: step.color }} // Apply color to text
                    > 
                        <TypewriterText text={step.content} />
                    </div>

                </TiltCard>
              )}

              {/* Mobile View */}
              {isMobile && (
                  <div className="absolute top-0 right-0 pointer-events-auto -mt-6 -mr-2">
                        <AnimatePresence>
                            {!isMobileOpen ? (
                                <motion.button
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    onClick={() => setIsMobileOpen(true)}
                                    className="bg-amber-500 text-white p-1.5 rounded-full shadow-md z-50 animate-bounce"
                                >
                                    <FiInfo size={16} />
                                </motion.button>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    className="absolute right-0 top-8 w-48 p-2 z-50 text-sm font-['Patrick_Hand']"
                                >
                                    <button 
                                        onClick={() => setIsMobileOpen(false)}
                                        className="absolute top-1 right-1 text-stone-400 hover:text-stone-600"
                                    >
                                        <FiX size={14} />
                                    </button>
                                    <p className="text-stone-800 dark:text-stone-200">
                                        <TypewriterText text={step.content} />
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                  </div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </>,
    document.body
  );
};

const ScrollAnnotations = () => {
  return (
    <>
      {tourSteps.map((step, index) => (
        <AnnotationTrigger key={index} step={step} />
      ))}
    </>
  );
};

export default ScrollAnnotations;
