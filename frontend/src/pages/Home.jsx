import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiArrowDown, FiAward, FiBriefcase, FiBookOpen, FiCheck } from 'react-icons/fi';
import Logo from '../assets/images.png';
import Card from '../components/common/Card';
import { projects } from '../data/projects';
import Noise from "../components/common/Noise";
import { useScramble } from '../hooks/useScramble';
import Magnetic from '../components/common/Magnetic';
import BentoGrid from '../components/specific/BentoGrid';
import TextReveal from '../components/common/TextReveal';
import ProjectGallery from '../components/specific/ProjectGallery';
import HolographicCTA from '../components/common/HolographicCTA';
import { useNotification } from '../context/NotificationContext';

const Home = () => {
  const { displayText, scramble } = useScramble("Chaturvedi");
  const { notify } = useNotification();

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("chaturvediinitin@gmail.com");
    notify("Email copied to clipboard!", FiCheck);
  };
  
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

      <div className="flex flex-col min-h-screen gap-20 pb-20 relative z-10">
          
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
              <div id="home" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 w-fit mx-auto lg:mx-0 relative">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-xs font-medium text-amber-600 dark:text-amber-500 uppercase tracking-widest">Available for hire</span>
              </div>

              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black font-display text-stone-900 dark:text-stone-100 leading-[1.1] tracking-tight"> {/* 3. Typography Scaling */}
                Nitin <br className="hidden lg:block"/>
                <span 
                    onMouseEnter={scramble} 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-stone-500 to-stone-900 dark:from-stone-400 dark:to-stone-100 cursor-default"
                >
                    {displayText}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-stone-500 dark:text-stone-400 font-medium tracking-wide max-w-xl mx-auto lg:mx-0">
                Full Stack Web Developer & Product Builder
              </p>
            </div>

            {/* 2. Profile Image Styling - Clean & Sharp */}
            <motion.div 
                className="relative group shrink-0"
            >
                <img
                    src={Logo}
                    alt="Logo"
                    className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-xl object-cover bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-xl shadow-stone-200/50 dark:shadow-black/50"
                />
            </motion.div>
          </motion.div>

          {/* 5. About Section Layout (Text Reveal & Bento Grid) */}
          <motion.div
            id="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative w-full max-w-6xl mx-auto"
          >
            {/* 9. Section Separators (Decorative) */}
            <div className="w-px h-24 bg-gradient-to-b from-stone-200 dark:from-stone-800 to-transparent mx-auto mb-12"></div>

            {/* Text Reveal Component */}
            <div className="mb-20 px-4">
                 <TextReveal>
                    I design and ship robust software systems. With a deep focus on performance, scalability, and intuitive user experiences, I bridge the gap between complex backend logic and polished frontend interfaces.
                 </TextReveal>
            </div>
            
            {/* Bento Grid Layout */}
            <div className="px-4">
                <BentoGrid />
            </div>
          </motion.div>


          {/* Projects Section - Interactive Gallery */}
          <div id="projects" className="relative z-10 w-full mb-20">
               <ProjectGallery />
          </div>

          {/* Experience & Achievements (New Section) */}
          <motion.div variants={containerVariants} id="experience" className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto px-6">
              
              {/* Experience Column */}
              <div>
                  <div className="flex items-center gap-3 mb-8">
                       <FiBriefcase className="text-2xl text-teal-600 dark:text-teal-400" />
                       <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 italic">Experience</h2>
                  </div>
                  
                  <div className="space-y-12 pl-4 border-l border-stone-200 dark:border-stone-800 relative">
                      
                      <div className="relative pl-8 group">
                           <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-stone-900 dark:bg-stone-100 ring-4 ring-white dark:ring-black transition-all"></div>
                           
                           <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                               <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">Freelance Software Developer</h3>
                               <span className="text-sm font-mono text-stone-500 dark:text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">Nov '25 – Dec '25</span>
                           </div>
                           <p className="text-amber-600 dark:text-amber-500 font-medium mb-3">Ram Mobiles</p>
                           <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                               Architected a full-stack e-commerce platform with React, Node.js, and MongoDB. 
                               Implemented inventory logic that reduced order errors and generated <span className="text-stone-900 dark:text-stone-100 font-semibold underline decoration-amber-500/50">~₹6,000 revenue</span>.
                           </p>
                      </div>

                      <div className="relative pl-8 group">
                           <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-stone-400 dark:bg-stone-600 ring-4 ring-white dark:ring-black transition-all"></div>
                           
                           <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                               <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">Full Stack Trainee (MERN)</h3>
                               <span className="text-sm font-mono text-stone-500 dark:text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">Jun '25 – Jul '25</span>
                           </div>
                           <p className="text-stone-500 dark:text-stone-400 font-medium mb-3">Cipher Schools</p>
                           <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                               Built functionality for an Online Library Management System using modular backend architecture.
                           </p>
                      </div>
                  </div>
              </div>

              {/* Achievements Column */}
              <div>
                  <div className="flex items-center gap-3 mb-8">
                       <FiAward className="text-2xl text-amber-500" />
                       <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 italic">Achievements</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                      <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow">
                          <h4 className="font-bold text-stone-900 dark:text-stone-100 text-lg mb-1">DSA Excellence</h4>
                          <p className="text-stone-600 dark:text-stone-400">Solved <span className="font-semibold text-teal-600 dark:text-teal-400">500+ problems</span> across LeetCode & Coding Ninjas.</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow">
                          <h4 className="font-bold text-stone-900 dark:text-stone-100 text-lg mb-1">LeetCode Recognition</h4>
                          <p className="text-stone-600 dark:text-stone-400">Achieved a peak contest rating of <span className="font-semibold text-amber-600 dark:text-amber-500">1426</span>.</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow">
                          <h4 className="font-bold text-stone-900 dark:text-stone-100 text-lg mb-1">Hackathon Finalist</h4>
                          <p className="text-stone-600 dark:text-stone-400">Coding Ninjas Binary Bitz National Hackathon (Feb '24).</p>
                      </div>
                  </div>
              </div>
          </motion.div>

          {/* Magnetic Footer CTA */}
          <section id="contact" className="py-20">
              <HolographicCTA />
          </section>


          {/* 11. Footer/Copyright */}
          <footer className="mt-10 pt-10 border-t border-stone-200 dark:border-stone-800 text-center text-stone-400 text-sm flex flex-col items-center gap-4">
             <div className="flex gap-6 mb-4">
                <Magnetic>
                    <a href="https://github.com/nitinvedi" target="_blank" rel="noreferrer" className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">GitHub</a>
                </Magnetic>
                <Magnetic>
                    <a href="https://www.linkedin.com/in/nitinvedi" target="_blank" rel="noreferrer" className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">LinkedIn</a>
                </Magnetic>
                <Magnetic>
                    <button onClick={handleCopyEmail} className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer">
                        Copy Email
                    </button>
                </Magnetic>
             </div>
             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Built with React & Tailwind</span>
             </div>
             <p>© {new Date().getFullYear()} Nitin Chaturvedi. All rights reserved.</p>
          </footer>
      </div>
    </motion.div>
  );
};

export default Home;
