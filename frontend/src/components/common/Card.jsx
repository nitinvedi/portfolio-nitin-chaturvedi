import { useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";

const Card = ({ project, index = 0 }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse tracking for custom cursor within the card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Smooth follow for cursor
  const cursorX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
  const cursorY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-xl overflow-hidden cursor-none" // Consistent rounded-xl
    >
      {/* 1. Background Image Layer */}
      <div className="absolute inset-0 z-0">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover saturate-[0.8] brightness-[0.9] transition-all duration-700 ease-out group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-110"
          />
          {/* Noise Overlay */}
          <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none"></div>
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-50"></div>
      </div>

      {/* 2. Custom Magnetic Cursor (Only visible on hover) */}
      <motion.div
        className="absolute pointer-events-none z-50 flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white font-medium text-xs uppercase tracking-widest mix-blend-difference"
        style={{
            left: cursorX,
            top: cursorY,
            x: "-50%",
            y: "-50%",
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.5,
        }}
      >
         View
      </motion.div>

      {/* 3. Content Layout (Editorial Style) */}
      <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between">
          
          {/* Top: Index & Links */}
          <div className="flex justify-between items-start">
             <span className="text-4xl font-serif text-white/20 font-bold">
                {String(index + 1).padStart(2, '0')}
             </span>

             <div className="flex gap-2 translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform cursor-pointer pointer-events-auto z-50">
                        <FiGithub />
                    </a>
                )}
                {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="p-3 bg-zinc-900 text-white rounded-full hover:scale-110 transition-transform cursor-pointer pointer-events-auto z-50">
                        <FiArrowUpRight />
                    </a>
                )}
             </div>
          </div>

          {/* Bottom: Title & Info */}
          <div>
              <div className="overflow-hidden mb-2">
                 <motion.h3 
                    className="text-3xl sm:text-4xl font-display font-medium text-white leading-tight"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                 >
                    {project.title}
                 </motion.h3>
              </div>

              <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500 ease-in-out">
                  <p className="text-zinc-300 text-sm leading-relaxed mb-4 mt-2 max-w-[90%] font-light">
                      {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pb-2">
                      {project.technologies.slice(0, 3).map(tech => (
                          <span key={tech} className="text-[10px] uppercase tracking-wider text-zinc-400 border border-zinc-700 px-2 py-1 rounded-full">
                              {tech}
                          </span>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </motion.div>
  );
};

export default Card;