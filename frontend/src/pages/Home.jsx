import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiArrowDown, FiAward, FiBriefcase, FiBookOpen } from 'react-icons/fi';

import Logo from '../assets/images.png';
import Card from '../components/common/Card';
import Stack from '../components/specific/Stack';
import { projects } from '../data/projects';
import Noise from "../components/common/Noise";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
      className="scroll-smooth relative"
    >
      <Noise />
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>

      <div className="flex flex-col min-h-screen gap-20 pb-20 relative z-10"> {/* 10. Increased Global Spacing */}
          
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 mt-10 lg:mt-20" 
          >
            {/* 1. Hero Alignment */}
            <div className="flex flex-col text-center lg:text-left gap-6 max-w-3xl">
              
              {/* Open to Work Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit mx-auto lg:mx-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-medium text-emerald-500">Open to work</span>
              </div>

              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold font-display text-zinc-900 dark:text-zinc-100 leading-[1.1] tracking-tight"> {/* 3. Typography Scaling */}
                Nitin <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-900 dark:from-zinc-400 dark:to-zinc-100">Chaturvedi</span>
              </h1>
              <p className="text-xl sm:text-2xl text-zinc-500 dark:text-zinc-400 font-medium tracking-wide max-w-xl mx-auto lg:mx-0">
                Full Stack Web Developer & Product Builder
              </p>
              
              {/* Stack Integration (7. Stack Section Integration) */}
              <div className="mt-4 flex justify-center lg:justify-start">
                  <Stack />
              </div>
            </div>

            {/* 2. Profile Image Styling */}
            <motion.div 
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative group shrink-0"
            >
                <div className="absolute inset-0 bg-indigo-500 rounded-[2rem] rotate-6 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                <img
                    src={Logo}
                    alt="Logo"
                    className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-[2rem] object-cover bg-white dark:bg-zinc-800 shadow-2xl shadow-indigo-500/10 border-4 border-white dark:border-zinc-800 rotate-3 group-hover:rotate-0 transition-transform duration-500"
                />
            </motion.div>
          </motion.div>

          {/* 5. About Section Layout */}
          <motion.div
            id="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative max-w-3xl mx-auto text-center"
          >
            {/* 9. Section Separators (Decorative) */}
            <div className="w-px h-24 bg-gradient-to-b from-zinc-200 dark:from-zinc-800 to-transparent mx-auto mb-12"></div>

            <div className="prose prose-lg prose-zinc dark:prose-invert mx-auto">
                <p className="text-lg sm:text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans"> {/* 4. Body Text Readability */}
                    I'm a full-stack developer with a drive for building <span className="text-zinc-900 dark:text-zinc-100 font-semibold">beautiful, functional, and scalable</span> web applications. 
                    I love to jump into projects and learn from those around me to refine my skills.
                </p>
            </div>
            
            <div className="mt-8 flex justify-center">
                 {/* 6. "Read More" Interaction Styled as Link */}
                 <Link to="/about" className="group inline-flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold border-b border-zinc-900 dark:border-zinc-100 pb-0.5 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors">
                    More about me <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                 </Link>
            </div>
          </motion.div>


          {/* Projects Section */}
          <motion.div variants={containerVariants} id="projects">
            <div className="flex items-center gap-4 mb-12 justify-center lg:justify-start">
                <h2 className="text-3xl sm:text-4xl font-bold font-display text-zinc-900 dark:text-zinc-100">
                Notable Projects
                </h2>
                <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-grow max-w-xs hidden sm:block"></div> {/* 13. Section styling */}
            </div>

            {/* 8. Projects Grid Layout (Pinterest/Masonry) */}
            <motion.div
              className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8" // True Masonry using CSS columns
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.01 }}
            >
              {projects.map((project, idx) => (
                <motion.div 
                    key={idx} 
                    variants={cardVariants} 
                    className="break-inside-avoid" // Prevent card splitting
                >
                  <Card project={project} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Experience & Achievements (New Section) */}
          <motion.div variants={containerVariants} id="experience" className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              
              {/* Experience Column */}
              <div>
                  <div className="flex items-center gap-3 mb-8">
                       <FiBriefcase className="text-2xl text-indigo-600 dark:text-indigo-400" />
                       <h2 className="text-2xl sm:text-3xl font-bold font-display text-zinc-900 dark:text-zinc-100">Experience</h2>
                  </div>
                  
                  <div className="space-y-12 pl-4 border-l-2 border-zinc-200 dark:border-zinc-800 relative">
                      {/* Gradient Line Overlay */}
                      <div className="absolute top-0 bottom-0 -left-[2px] w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent"></div>

                      <div className="relative pl-8 group">
                           {/* Glowing Dot */}
                           <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border-2 border-indigo-500 ring-4 ring-indigo-500/20 group-hover:ring-indigo-500/40 transition-all"></div>
                           
                           <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                               <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Freelance Software Developer</h3>
                               <span className="text-sm font-mono text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">Nov '25 – Dec '25</span>
                           </div>
                           <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">Ram Mobiles</p>
                           <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                               Architected a full-stack e-commerce platform with React, Node.js, and MongoDB. 
                               Implemented inventory logic that reduced order errors and generated <span className="text-emerald-600 dark:text-emerald-400 font-semibold">~₹6,000 revenue</span>.
                           </p>
                      </div>

                      <div className="relative pl-8 group">
                           <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border-2 border-purple-500 ring-4 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all"></div>
                           
                           <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                               <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Full Stack Trainee (MERN)</h3>
                               <span className="text-sm font-mono text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">Jun '25 – Jul '25</span>
                           </div>
                           <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">Cipher Schools</p>
                           <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                               Built functionality for an Online Library Management System using modular backend architecture.
                           </p>
                      </div>
                  </div>
              </div>

              {/* Achievements Column */}
              <div>
                  <div className="flex items-center gap-3 mb-8">
                       <FiAward className="text-2xl text-amber-500" />
                       <h2 className="text-2xl sm:text-3xl font-bold font-display text-zinc-900 dark:text-zinc-100">Achievements</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg mb-1">DSA Excellence</h4>
                          <p className="text-zinc-600 dark:text-zinc-400">Solved <span className="font-semibold text-indigo-600 dark:text-indigo-400">500+ problems</span> across LeetCode & Coding Ninjas.</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg mb-1">LeetCode Recognition</h4>
                          <p className="text-zinc-600 dark:text-zinc-400">Achieved a peak contest rating of <span className="font-semibold text-amber-600 dark:text-amber-500">1426</span>.</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg mb-1">Hackathon Finalist</h4>
                          <p className="text-zinc-600 dark:text-zinc-400">Coding Ninjas Binary Bitz National Hackathon (Feb '24).</p>
                      </div>
                  </div>
              </div>
          </motion.div>

          {/* 11. Footer/Copyright */}
          <footer className="mt-20 pt-10 border-t border-zinc-200 dark:border-zinc-800 text-center text-zinc-400 text-sm flex flex-col items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Built with React & Tailwind</span>
             </div>
             <p>© {new Date().getFullYear()} Nitin Chaturvedi. All rights reserved.</p>
          </footer>
      </div>
    </motion.div>
  );
};

export default Home;
