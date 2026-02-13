import React, { useState, useEffect } from 'react';
import { RoughNotation } from 'react-rough-notation';
import { tourSteps } from '../../data/tourSteps';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const AnnotationTrigger = ({ step }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [targetElement, setTargetElement] = useState(null);

  useEffect(() => {
    const element = document.querySelector(step.target);
    if (element) {
      setTargetElement(element);
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Re-calculate coords when visible to ensure accuracy
            updateCoords(element);
          } else {
             // Optional: Hide when scrolling away? 
             // Keeping it visible once triggered might be less distracting, 
             // but 'auto does that' implies reaction. Let's hide to re-trigger for impact.
             setIsVisible(false);
          }
        },
        { threshold: 0.6 } // Trigger when 60% visible
      );

      observer.observe(element);

      // Handle resize to update coordinates
      window.addEventListener('resize', () => updateCoords(element));
      
      return () => {
        observer.disconnect();
        window.removeEventListener('resize', () => updateCoords(element));
      };
    }
  }, [step.target]);

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

  if (!targetElement) return null;

  // Determine note position based on config or default
  const getNoteStyle = () => {
      const baseStyle = { position: 'absolute', fontFamily: '"Patrick Hand", cursive', fontSize: '1.5rem', lineHeight: '1.2', color: step.color, zIndex: 50, pointerEvents: 'none', maxWidth: '250px' };
      
      switch(step.position) {
          case 'top-left': return { ...baseStyle, top: coords.top - 80, left: coords.left - 40 };
          case 'top-right': return { ...baseStyle, top: coords.top - 80, left: coords.left + coords.width - 60 };
          case 'bottom-left': return { ...baseStyle, top: coords.top + coords.height + 40, left: coords.left };
          case 'bottom-right': return { ...baseStyle, top: coords.top + coords.height + 40, left: coords.left + coords.width - 220 };
          case 'left': return { ...baseStyle, top: coords.top + (coords.height / 2) - 20, left: coords.left - 280 };
          case 'right': return { ...baseStyle, top: coords.top + (coords.height / 2) - 20, left: coords.left + coords.width + 50 };
          case 'top-center': return { ...baseStyle, top: coords.top - 100, left: coords.left + (coords.width / 2) - 125 };
          default: return { ...baseStyle, top: coords.top + coords.height + 30, left: coords.left };
      }
  };

  return createPortal(
    <>
      {/* 1. The Rough Notation Highlight */}
      <div 
        className="absolute pointer-events-none z-40"
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
        >
          <div className="w-full h-full" />
        </RoughNotation>
      </div>

      {/* 2. The Handwritten Note */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0 }}
            style={getNoteStyle()}
            className="hidden lg:block text-shadow-sm" // Hide on mobile if too cluttered? Or adjust.
          >
             {step.content}
             {/* Example arrow could go here if needed */}
          </motion.div>
        )}
      </AnimatePresence>
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
