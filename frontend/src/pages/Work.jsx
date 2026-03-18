import React from 'react';

import { FiBriefcase, FiArrowRight, FiGitCommit } from 'react-icons/fi';
import { motion } from 'framer-motion';
import GridBackground from '../components/common/GridBackground';

const workExperience = [
  {
    version: "v2023.8",
    role: "Full Stack Developer",
    company: "Freelance",
    period: "Aug 2023 - Present",
    type: "FEATURE",
    description: "Architected and delivered scalable web applications for various international clients.",
    highlights: [
      "Engineered high-performance REST APIs using Node.js and Express.",
      "Developed interactive frontends with React and Tailwind CSS.",
      "Implemented real-time features using Socket.IO for live data updates."
    ]
  },
  {
    version: "v2021.1",
    role: "Open Source Contributor",
    company: "GitHub Community",
    period: "Jan 2021 - Present",
    type: "MAINTENANCE",
    description: "Active contributor to multiple open-source repositories focusing on tooling and infrastructure.",
    highlights: [
      "Optimized database queries in Go-based microservices, reducing load times by 40%.",
      "Resolved critical UI bugs and improved test coverage."
    ]
  }
];

const Work = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden bg-[#fafaf9] dark:bg-black"
    >
      <GridBackground />
      
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-center sm:text-left border-b border-stone-200 dark:border-white/10 pb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 text-stone-900 dark:text-stone-100 flex items-center justify-center sm:justify-start gap-4">
               <FiBriefcase className="text-amber-500" /> 
               Changelog
            </h1>
            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl font-mono tracking-tight">
                // System updates, career patches, and version history.
            </p>
        </div>

        {/* Timeline (Changelog Format) */}
        <div className="relative pl-4 sm:pl-8">
            {/* Vertical Git Line */}
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-stone-200 dark:bg-white/10"></div>

            <div className="space-y-16">
                {workExperience.map((job, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative pl-10 sm:pl-16 group"
                    >
                        {/* Git Node */}
                        <div className="absolute left-[-5px] top-8 w-[11px] h-[11px] bg-white dark:bg-black border-2 border-stone-300 dark:border-stone-600 rounded-full group-hover:border-amber-500 transition-colors z-10"></div>
                        <div className="absolute left-[-24px] top-6 text-stone-300 dark:text-stone-700 opacity-50 group-hover:opacity-100 transition-opacity">
                            <FiGitCommit className="text-lg rotate-90" />
                        </div>

                        {/* Content Box */}
                        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-stone-200 dark:border-white/5 hover:border-stone-300 dark:hover:border-white/10 transition-colors shadow-sm">
                            
                            {/* Version Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-stone-100 dark:border-white/5">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10 px-2 py-1 rounded">
                                            {job.version}
                                        </span>
                                        <span className="font-mono text-[10px] tracking-[0.2em] text-stone-400 uppercase">
                                            [{job.type}]
                                        </span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold font-display text-stone-900 dark:text-white">
                                        {job.role}
                                    </h3>
                                    <p className="text-stone-600 dark:text-stone-400 font-medium flex items-center gap-2 mt-1">
                                        @ {job.company}
                                    </p>
                                </div>
                                <div className="text-left sm:text-right">
                                    <span className="font-mono text-sm text-stone-500 bg-stone-50 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-white/5">
                                        {job.period}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-stone-600 dark:text-stone-300 mb-6 leading-relaxed">
                                {job.description}
                            </p>

                            {/* Highlights (Commit Msgs) */}
                            <div className="space-y-3">
                                {job.highlights.map((highlight, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <FiArrowRight className="text-amber-500 mt-1 shrink-0" />
                                        <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                                            {highlight}
                                        </p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Work;
