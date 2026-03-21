import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Pixel-Perfect Cartoon Hands matching the provided image
// Each SVG has been redrawn to be "bubbly" with 3 detail lines

const HandPointer = () => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 42V18C32 12 44 12 44 18V45" stroke="black" strokeWidth="6" strokeLinecap="round"/>
    <path d="M44 45V40C44 35 54 35 54 40V48" stroke="black" strokeWidth="6" strokeLinecap="round"/>
    <path d="M54 48V45C54 40 64 40 64 45V52" stroke="black" strokeWidth="6" strokeLinecap="round"/>
    <path d="M64 52V50C64 45 74 45 74 50V70C74 85 45 95 32 85L20 75C12 65 22 55 32 65" stroke="black" strokeWidth="6" strokeLinecap="round" fill="white"/>
    <path d="M32 42V18C32 12 44 12 44 18V45V40C44 35 54 35 54 40V48V45C54 40 64 40 64 45V52V50C64 45 74 45 74 50V70C74 85 45 95 32 85L20 75C12 65 22 55 32 65Z" fill="white"/>
    {/* Three detail lines */}
    <path d="M42 65V78" stroke="black" strokeWidth="3" strokeLinecap="round"/>
    <path d="M52 68V81" stroke="black" strokeWidth="3" strokeLinecap="round"/>
    <path d="M62 68V81" stroke="black" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const HandOpen = () => (
    <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M35 35V20C35 12 45 12 45 20V55" stroke="black" strokeWidth="6" strokeLinecap="round"/>
      <path d="M45 55V25C45 17 55 17 55 25V55" stroke="black" strokeWidth="6" strokeLinecap="round"/>
      <path d="M55 55V30C55 22 65 22 65 30V55" stroke="black" strokeWidth="6" strokeLinecap="round"/>
      <path d="M65 55V40C65 32 75 32 75 40V70C75 85 50 95 35 85L20 75C10 65 20 55 35 65" stroke="black" strokeWidth="6" strokeLinecap="round" fill="white"/>
      <path d="M35 35V20C35 12 45 12 45 20V55V25C45 17 55 17 55 25V55V30C55 22 65 22 65 30V55V40C65 32 75 32 75 40V70C75 85 50 95 35 85L20 75C10 65 20 55 35 65Z" fill="white"/>
      {/* Three detail lines */}
      <path d="M45 68V81" stroke="black" strokeWidth="3" strokeLinecap="round"/>
      <path d="M55 71V84" stroke="black" strokeWidth="3" strokeLinecap="round"/>
      <path d="M65 68V81" stroke="black" strokeWidth="3" strokeLinecap="round"/>
    </svg>
);

const HandFist = () => (
    <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M35 60 C35 50, 75 50, 75 60 L75 75 C75 90, 35 90, 35 75 Z" stroke="black" strokeWidth="6" strokeLinejoin="round" fill="white"/>
      <path d="M45 50 C45 42, 53 42, 53 50 L53 60" stroke="black" strokeWidth="6" strokeLinecap="round"/>
      <path d="M57 50 C57 42, 65 42, 65 50 L65 60" stroke="black" strokeWidth="6" strokeLinecap="round"/>
      <path d="M68 50 C68 42, 76 42, 76 50 L76 60" stroke="black" strokeWidth="6" strokeLinecap="round"/>
      <path d="M35 65 L20 75 C10 85, 20 95, 35 85 Z" stroke="black" strokeWidth="6" strokeLinejoin="round" fill="white"/>
      {/* Detail lines on fist */}
      <path d="M45 68V78" stroke="black" strokeWidth="3" strokeLinecap="round"/>
      <path d="M55 70V80" stroke="black" strokeWidth="3" strokeLinecap="round"/>
      <path d="M65 68V78" stroke="black" strokeWidth="3" strokeLinecap="round"/>
    </svg>
)

const CustomCursor = () => {
  const [cursorState, setCursorState] = useState('pointer'); // 'pointer', 'open', 'fist'
  const [isMouseDown, setIsMouseDown] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Buttery smooth physics
  const springConfig = { damping: 20, stiffness: 250, mass: 0.8 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
        const target = e.target;
        const interactive = 
            target.tagName === 'BUTTON' ||
            target.tagName === 'A' ||
            target.closest('button') ||
            target.closest('a') ||
            window.getComputedStyle(target).cursor === 'pointer';

        setCursorState(interactive ? 'open' : 'pointer');
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <style>{`
        body, a, button, [role="button"] { cursor: none !important; }
      `}</style>
      
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-25%', 
          translateY: '-15%'
        }}
        animate={{
          scale: isMouseDown ? 0.85 : (cursorState === 'open' ? 1.1 : 1),
          rotate: cursorState === 'open' ? 8 : (isMouseDown ? -5 : 0)
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {isMouseDown ? <HandFist /> : (cursorState === 'open' ? <HandOpen /> : <HandPointer />)}
      </motion.div>
    </>
  );
};

export default CustomCursor;
