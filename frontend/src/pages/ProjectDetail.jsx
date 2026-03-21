import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { FiArrowLeft, FiGithub, FiExternalLink, FiCalendar, FiCode, FiLayers } from 'react-icons/fi';
import { projects } from '../data/projects';
import GridBackground from '../components/common/GridBackground';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);

    useEffect(() => {
        // Find project by matching the ID (which we'll derive from the title slug)
        const foundProject = projects.find(p => 
            p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id
        );
        
        if (foundProject) {
            setProject(foundProject);
        } else {
            // Handle 404
            navigate('/');
        }
    }, [id, navigate]);

    if (!project) return null;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden bg-[#fafaf9] dark:bg-black"
        >
            <div className="max-w-4xl mx-auto relative z-10">
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm font-mono text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors mb-12 group"
                >
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span>BACK TO WORK</span>
                </button>

                {/* Header */}
                <div className="mb-12">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold font-display text-stone-900 dark:text-white tracking-tight leading-tight mb-6"
                    >
                        {project.title}
                    </motion.h1>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-wrap items-center gap-4 text-sm font-mono text-stone-600 dark:text-stone-400"
                    >
                        <div className="flex items-center gap-2">
                             <FiCalendar className="text-amber-500" />
                             <span>{project.period}</span>
                        </div>
                        <span className="opacity-30">•</span>
                        <div className="flex items-center gap-2">
                             <FiLayers className="text-teal-500" />
                             <span>Full Stack System</span>
                        </div>
                    </motion.div>
                </div>

                {/* Hero Image */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-16 rounded-2xl overflow-hidden border border-stone-200 dark:border-white/10 shadow-2xl bg-stone-100 dark:bg-stone-900"
                >
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full object-cover"
                    />
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    
                    {/* Main Description */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-2 space-y-6 text-stone-600 dark:text-stone-300 leading-relaxed text-lg"
                    >
                        <h3 className="text-2xl font-display font-bold text-stone-900 dark:text-white mb-4">Overview</h3>
                        <p>{project.description}</p>
                        
                        {/* Placeholder for deeper case study content that the user can fill out later */}
                        <div className="mt-8 p-6 rounded-xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10">
                            <h4 className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-4">Architectural Notes</h4>
                            <p className="text-sm opacity-80">
                                This system was designed with performance and scalability in mind. It leverages {project.technologies.slice(0, 3).join(', ')} to ensure high availability.
                            </p>
                        </div>
                    </motion.div>

                    {/* Meta Sidebar */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-10"
                    >
                        {/* Stack */}
                        <div>
                            <h4 className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <FiCode /> Tech Stack
                            </h4>
                            <div className="flex flex-col gap-2">
                                {project.technologies.map((tech, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm font-medium text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-white/5 pb-2">
                                        <div className="w-1 h-1 rounded-full bg-teal-500"></div>
                                        {tech}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-4">Links</h4>
                            <div className="flex flex-col gap-3">
                                {project.githubLink && (
                                    <a 
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-between p-3 rounded-lg border border-stone-200 dark:border-white/10 hover:bg-stone-100 dark:hover:bg-white/5 transition-colors group"
                                    >
                                        <div className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-white">
                                            <FiGithub /> Source Code
                                        </div>
                                        <FiExternalLink className="text-stone-400 group-hover:text-amber-500 transition-colors" />
                                    </a>
                                )}
                                {project.liveLink && (
                                    <a 
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-between p-3 rounded-lg border border-teal-500/30 bg-teal-50/50 dark:bg-teal-500/10 hover:bg-teal-100 dark:hover:bg-teal-500/20 transition-colors group"
                                    >
                                        <div className="flex items-center gap-2 text-sm font-semibold text-teal-700 dark:text-teal-400">
                                            <FiExternalLink /> Live Deployment
                                        </div>
                                        <FiExternalLink className="text-teal-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                )}
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectDetail;
