import { useRef, useState } from "react";
import { motion, useSpring, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";

const Card = ({ project, index = 0 }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  // Dynamic Gradients based on index
  const gradients = [
    "from-indigo-500/5 to-purple-500/5",
    "from-emerald-500/5 to-teal-500/5",
    "from-amber-500/5 to-orange-500/5",
    "from-rose-500/5 to-pink-500/5",
    "from-cyan-500/5 to-blue-500/5",
  ];
  const bgGradient = gradients[index % gradients.length];
  const accentColor = [
    "bg-indigo-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500", "bg-cyan-500"
  ][index % gradients.length];
  const accentText = [
    "text-indigo-500", "text-emerald-500", "text-amber-500", "text-rose-500", "text-cyan-500"
  ][index % gradients.length];

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left - width / 2;
    const y = clientY - top - height / 2;
    
    mouseX.set(x);
    mouseY.set(y);
  }

  const cardVariants = {
    hover: {
      y: -5,
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-hidden bg-gradient-to-br ${bgGradient}`}
      variants={cardVariants}
      whileHover="hover"
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
    >
      <Spotlight mouseX={mouseX} mouseY={mouseY} />
      
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header: Title */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-1">
             <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${accentColor} animate-pulse`}></span>
                <span className={`text-xs font-semibold uppercase tracking-wider ${accentText} opacity-80`}>
                    Project
                </span>
             </div>
             <h3 className="text-2xl font-bold font-display text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {project.title}
             </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 flex-grow font-sans">
          {project.description}
        </p>

        {/* Tech Stack Pills - Glassmorphic */}
        <div className="flex flex-wrap gap-2 mb-16">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/40 dark:bg-zinc-800/40 backdrop-blur-md text-zinc-600 dark:text-zinc-300 border border-white/20 dark:border-zinc-700/50 shadow-sm"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
             <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/40 dark:bg-zinc-800/40 backdrop-blur-md text-zinc-400 border border-white/20 dark:border-zinc-800/50">
                +{project.technologies.length - 4}
             </span>
          )}
        </div>

        {/* Footer: Learn More Link & Reveal Action Bar */}
        <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/50 flex justify-between items-center relative overflow-hidden">
             <button className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-200 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors z-20">
                Learn more <FiArrowRight className="transition-transform group-hover:translate-x-1" />
             </button>

             {/* Hover Reveal Action Bar */}
             <motion.div 
                className="absolute right-0 top-3 flex gap-2 z-30"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 50, opacity: 0 }} // Keep hidden initially
                variants={{
                    hover: { y: 0, opacity: 1 }
                }}
             >
                {/* Reveal on Parent Hover */}
                <div className="flex gap-2 transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-spring">
                    {project.githubUrl && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-colors shadow-sm"
                        title="View Source"
                    >
                        <FiGithub className="text-lg" />
                    </a>
                    )}
                    {project.liveUrl && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-colors shadow-sm"
                        title="Live Demo"
                    >
                        <FiExternalLink className="text-lg" />
                    </a>
                    )}
                </div>
             </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

function Spotlight({ mouseX, mouseY }) {
  let maskImage = useMotionTemplate`radial-gradient(
    250px circle at ${mouseX}px ${mouseY}px,
    white,
    transparent
  )`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0 transition duration-300 opacity-0 group-hover:opacity-100"
      style={style}
    >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-xl" />
    </motion.div>
  );
}

export default Card;