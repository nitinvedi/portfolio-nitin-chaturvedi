import { motion } from "framer-motion";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";

const Card = ({ project, index = 0 }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center w-full group`}
    >
      {/* 1. Image Showcase Area */}
      <div className="w-full lg:w-3/5 aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm relative">
          <div className="w-full h-full relative overflow-hidden">
               <img
                 src={project.image}
                 alt={project.title}
                 className="w-full h-full object-cover saturate-[0.8] brightness-[0.9] transition-all duration-700 ease-out group-hover:scale-105 group-hover:saturate-100 group-hover:brightness-100"
               />
          </div>
          
          {/* Subtle Project Numbering Badge */}
          <div className="absolute top-6 left-6 w-10 h-10 bg-white/90 dark:bg-black/80 backdrop-blur-md flex items-center justify-center rounded-full border border-stone-200 dark:border-stone-700 font-mono text-sm font-bold text-stone-900 dark:text-stone-100 shadow-sm">
             {String(index + 1).padStart(2, '0')}
          </div>
      </div>

      {/* 2. Text Content Area */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center">
          
          {/* Title Area */}
          <div className="mb-6">
              <h3 className="text-4xl sm:text-5xl font-display font-bold text-stone-900 dark:text-stone-100 leading-tight mb-4 tracking-tight">
                 {project.title}
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed">
                  {project.description}
              </p>
          </div>
          
          {/* Tech Stack - Elegant Pills */}
          <div className="flex flex-wrap gap-2 mb-10">
              {project.technologies.slice(0, 5).map(tech => (
                  <div key={tech} className="px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50">
                      <span className="text-xs font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400">
                          {tech}
                      </span>
                  </div>
              ))}
          </div>

          {/* Action Links - Brutalist Buttons */}
          <div className="flex flex-wrap items-center gap-4">
               {project.liveUrl && (
                   <a 
                     href={project.liveUrl} 
                     target="_blank" 
                     rel="noreferrer" 
                     className="flex items-center gap-2 px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-black font-semibold rounded-full hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 transition-colors"
                   >
                       Visit Live <FiArrowUpRight className="text-lg" />
                   </a>
               )}
               {project.githubUrl && (
                   <a 
                     href={project.githubUrl} 
                     target="_blank" 
                     rel="noreferrer" 
                     className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-semibold rounded-full border border-stone-300 dark:border-stone-700 hover:border-stone-900 dark:hover:border-stone-400 transition-colors"
                   >
                       <FiGithub className="text-lg" /> Source Code
                   </a>
               )}
          </div>
      </div>
    </motion.div>
  );
};

export default Card;
