import { useRef, useState } from "react";
import { motion, useSpring, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";

const Card = ({ project }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="group relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Spotlight mouseX={mouseX} mouseY={mouseY} />
      
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header: Title & Links */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-1">
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                    Project
                </span>
             </div>
             <h3 className="text-2xl font-bold font-display text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {project.title}
             </h3>
          </div>
          
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                title="View Source"
              >
                <FiGithub className="text-xl" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                title="Live Demo"
              >
                <FiExternalLink className="text-xl" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
             <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-50 dark:bg-zinc-900 text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                +{project.technologies.length - 4}
             </span>
          )}
        </div>

        {/* Footer: Learn More Link */}
        <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
             <button className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-200 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                Learn more <FiArrowRight className="transition-transform group-hover:translate-x-1" />
             </button>
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