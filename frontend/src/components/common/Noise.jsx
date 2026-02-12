import { useEffect, useRef } from 'react';

const Noise = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawNoise = () => {
      const w = canvas.width;
      const h = canvas.height;
      const idata = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.5) {
            buffer32[i] = 0xff000000; // Black noise
        }
      }
      ctx.putImageData(idata, 0, 0);
    };

    let animationId;
    const loop = () => {
        // Draw noise but less frequently to save performance/battery? 
        // Or static noise is often enough. Let's try static first for performance.
        // Actually, static noise acts like a texture. Animated is distinct.
        // Let's go with a static CSS pattern approach for better perf, 
        // OR a very lightweight canvas draw that happens once on resize.
        drawNoise();
    };

    resize();
    loop();

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay"
        aria-hidden="true"
    />
  );
};

export default Noise;
