import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { projects } from "../../data/projects";
import { motion } from "framer-motion";
import MediaReveal from "../common/MediaReveal";

const ProjectRow = ({ project, index }) => {
    const navigate = useNavigate();
    const projectSlug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    return (
        <MediaReveal mediaSrc={project.image} mediaType="image">
            <div 
                onClick={() => navigate(`/projects/${projectSlug}`)}
                data-cursor-text="VIEW"
                className="group flex flex-col md:flex-row md:items-center justify-between py-10 md:py-16 border-t border-stone-200 dark:border-white/10 cursor-pointer relative"
            >
                {/* Subtle row highlight on hover */}
                <div className="absolute inset-0 bg-stone-50/50 dark:bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -mx-4 px-4 sm:mx-0 sm:px-0 rounded-lg sm:rounded-none"></div>

                {/* Left: Number & Title */}
                <div className="flex items-center gap-6 md:gap-12 relative z-10 w-full md:w-auto mb-6 md:mb-0">
                    <span className="font-mono text-sm text-stone-400 dark:text-stone-600 group-hover:text-amber-500 transition-colors">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-stone-900 dark:text-stone-300 group-hover:text-amber-500 dark:group-hover:text-white transition-colors duration-500 tracking-tighter">
                        {project.title}
                    </h3>
                </div>

                {/* Right: Tech & Action */}
                <div className="flex items-center justify-between md:justify-end gap-8 relative z-10 w-full md:w-auto">
                    <div className="flex md:flex-col lg:flex-row gap-4 md:items-end lg:items-center max-w-[250px] md:max-w-xs">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                            <span key={i} className="text-[10px] md:text-xs font-mono text-stone-500 uppercase tracking-widest">
                                {tech}
                            </span>
                        ))}
                    </div>
                    
                    <div className="w-12 h-12 shrink-0 rounded-full border border-stone-200 dark:border-stone-800 flex items-center justify-center group-hover:border-amber-500 dark:group-hover:border-white group-hover:bg-amber-500 dark:group-hover:bg-white text-stone-400 group-hover:text-white dark:group-hover:text-black transition-all duration-300">
                        <FiArrowUpRight className="text-xl group-hover:rotate-45 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </MediaReveal>
    );
};

const ProjectGallery = () => {
  return (
    <section className="relative mt-32 mb-32 bg-transparent">
      {/* Sleek Typography Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
                <h2 id="project-gallery-heading" className="text-sm font-mono text-stone-500 uppercase tracking-widest mb-4">
                    [ Selected Works ]
                </h2>
                <p className="text-4xl md:text-5xl lg:text-6xl font-display text-stone-900 dark:text-stone-100 font-medium tracking-tight">
                    Production Grade.
                </p>
            </div>
            <p className="text-stone-500 max-w-sm text-sm leading-relaxed hidden md:block border-l border-stone-200 dark:border-stone-800 pl-4">
                Real problems solved with scalable architecture. Hover to preview instances.
            </p>
      </div>

      {/* Index Vertical List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col border-b border-stone-200 dark:border-white/10">
        {projects.map((project, i) => (
            <ProjectRow 
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
