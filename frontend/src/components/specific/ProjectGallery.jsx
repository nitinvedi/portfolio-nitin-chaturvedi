import React from "react";

import { useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { projects } from "../../data/projects";
import { motion } from "framer-motion";

const Card = ({ project, index }) => {
    const isEven = index % 2 === 0;
    const navigate = useNavigate();
    
    // Generate a simple URL-friendly slug from the title
    const projectSlug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={`flex flex-col gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center group`}
        >
            {/* Image Side */}
            <div className="w-full md:w-1/2 relative overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-900 aspect-[4/3] cursor-pointer" onClick={() => navigate(`/projects/${projectSlug}`)}>
                {/* Number Overlay */}
                <div className="absolute top-4 left-4 z-20 font-mono text-xs font-bold text-white px-2 py-1 bg-black/50 backdrop-blur-md rounded border border-white/10 flex items-center gap-2 mix-blend-difference">
                     <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                     PROJ_{String(index + 1).padStart(2, '0')}
                </div>
                
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] transform group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="flex flex-col">
                    <h3 className="text-3xl md:text-5xl font-bold font-display text-stone-900 dark:text-white tracking-tight leading-tight mb-4 group-hover:text-amber-500 dark:group-hover:text-amber-500 transition-colors">
                        {project.title}
                    </h3>
                    
                    <p className="text-stone-600 dark:text-stone-400 text-base md:text-lg leading-relaxed mb-6 max-w-lg">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                            <span 
                                key={i} 
                                className="px-3 py-1 text-xs font-mono font-medium rounded-full border border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-white/5 text-stone-600 dark:text-stone-400"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 4 && (
                             <span className="px-3 py-1 text-xs font-mono font-medium rounded-full border border-transparent text-stone-400">
                                 +{project.technologies.length - 4} more
                             </span>
                        )}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-stone-200 dark:border-white/10">
                        <button
                            onClick={() => navigate(`/projects/${projectSlug}`)}
                            className="px-6 py-2 rounded-full border border-stone-200 dark:border-[#333] hover:bg-stone-900 dark:hover:bg-white text-stone-600 dark:text-stone-300 hover:text-white dark:hover:text-black transition-colors flex items-center gap-2 group/btn text-sm font-semibold cursor-pointer"
                        >
                            Read Case Study
                            <FiArrowUpRight className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </button>
                        
                        {project.githubLink && (
                            <a 
                                href={project.githubLink}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-full text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
                                aria-label="View Source Code"
                            >
                                <FiGithub className="text-xl" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectGallery = () => {
  return (
    <section className="relative mt-20 mb-20 bg-transparent">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 mb-20 pt-10 text-center sm:text-left border-b border-stone-200 dark:border-stone-800 pb-12">
            <h2 id="project-gallery-heading" className="text-4xl md:text-5xl font-bold font-display mb-4 text-stone-900 dark:text-stone-100">
                Selected Works.
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl">
                Real problems solved with scalable architecture.
            </p>
      </div>

      {/* Editorial Vertical List */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-32">
        {projects.map((project, i) => (
            <Card 
              key={i} 
              index={i} 
              project={project} 
            />
        ))}
      </div>
    </section>
  );
};

export default ProjectGallery;
