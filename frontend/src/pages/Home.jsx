import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiAward, FiBookOpen } from 'react-icons/fi';
import Logo from '../assets/images.png';
import Card from '../components/common/Card';
import { projects } from '../data/projects';
import Noise from "../components/common/Noise";
import Magnetic from '../components/common/Magnetic';
import BentoGrid from '../components/specific/BentoGrid';
import TextReveal from '../components/common/TextReveal';
import ProjectGallery from '../components/specific/ProjectGallery';
import HolographicCTA from '../components/common/HolographicCTA';
import VisitorCounter from '../components/common/VisitorCounter';
import GridBackground from '../components/common/GridBackground';
import BorderBeam from '../components/common/BorderBeam';
import SpotlightCard from '../components/common/SpotlightCard';

const Home = () => {

  // ... (rest of component logic) ...

  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("chaturvediinitin@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
      className="scroll-smooth relative overflow-hidden" // ensure overflow hidden for background
    >
      <GridBackground />

      <div className="flex flex-col min-h-screen gap-20 pb-20 relative z-10">
          
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 pt-32 lg:pt-40" 
          >
            <div className="flex flex-col text-center lg:text-left gap-6 max-w-3xl">
              {/* Open to Work Badge - Sleek Glassmorphic */}
              <div id="home-badge" className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-stone-500/10 dark:bg-white/5 border border-stone-200/50 dark:border-white/10 backdrop-blur-md w-fit mx-auto lg:mx-0 relative shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-widest">Available for hire</span>
              </div>
              
              <h1 id="hero-name" className="text-6xl sm:text-7xl lg:text-[7.5rem] font-black font-display text-stone-900 dark:text-stone-100 leading-[0.95] tracking-tighter mb-4">
               Nitin <br className="hidden lg:block"/>
               <span className="text-stone-800 dark:text-stone-300 font-serif italic font-light tracking-tight">Chaturvedi.</span>
              </h1>
              
              <div className="flex items-center gap-4 mt-2 mb-2">
                 <div className="h-px bg-amber-500 w-12 hidden sm:block"></div>
                 <p className="text-xl sm:text-2xl text-stone-600 dark:text-stone-400 font-medium tracking-tight">
                   I build fast, full-stack web applications.
                 </p>
              </div>
            </div>

            {/* Profile Image - Static & Clean */}
            <motion.div 
                className="relative shrink-0"
                transition={{ duration: 0.3 }}
            >
                {/* Backlight Glow */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-amber-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700"></div>
                
                <img
                    src={Logo}
                    alt="Logo"
                    className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-2xl object-cover bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-white/10 shadow-xl shadow-stone-200/50 dark:shadow-black/80"
                />
            </motion.div>
          </motion.div>

          <motion.div
            id="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative w-full max-w-6xl mx-auto"

          >
            <div className="w-px h-24 bg-gradient-to-b from-stone-200 dark:from-stone-800 to-transparent mx-auto mb-12"></div>

            {/* Text Reveal Component */}
            <div className="mb-20 px-4">
                 <TextReveal>
                     {[
                        "I'm a Full Stack Developer who ships ",
                        <span id="about-highlight-1" key="1" className="text-amber-500 dark:text-amber-400 font-serif italic pr-2 lg:pr-3">production systems</span>,
                        "— not side projects. From a live MERN e-commerce generating revenue to a ",
                        <span id="about-highlight-2" key="2" className="text-teal-600 dark:text-teal-400 font-serif italic pr-2 lg:pr-3">sub-10ms Go URL shortener</span>,
                        ", I build for performance, scale, and users."
                     ]}
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
          <motion.div variants={containerVariants} id="experience-timeline" className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto px-6">
              
              {/* Experience Timeline */}
              <div>
                  <div className="flex items-center gap-3 mb-8">
                       <FiBriefcase className="text-2xl text-teal-600 dark:text-teal-400" />
                       <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 italic">Experience</h2>
                  </div>
                  
                  <div className="relative pl-8 border-l border-stone-200 dark:border-stone-800 space-y-12">
                      
                      {/* Timeline Node 1 */}
                      <motion.div 
                          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                          className="relative group cursor-default"
                      >
                           {/* Glow Dot */}
                           <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-stone-200 dark:bg-stone-800 border-2 border-white dark:border-[#0a0a0a] group-hover:bg-amber-500 group-hover:scale-125 transition-all duration-300 z-10"></div>
                           
                           <div className="p-6 -mt-6 rounded-2xl transition-colors duration-300 group-hover:bg-stone-50/50 dark:group-hover:bg-stone-800/40 border border-transparent group-hover:border-stone-200/50 dark:group-hover:border-white/5">
                               <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-4 mb-2">
                                   <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors">Freelance Software Developer</h3>
                                   <span className="text-sm font-mono text-stone-500 dark:text-stone-500">Nov '25 – Dec '25</span>
                               </div>
                               <p className="text-amber-600 dark:text-amber-500 font-medium mb-3">Ram Mobiles</p>
                               <p className="text-stone-600 dark:text-stone-400 leading-relaxed group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors">
                                   Architected a full-stack e-commerce platform with React, Node.js, and MongoDB. 
                                   Implemented inventory logic that reduced order errors and generated <span className="text-stone-900 dark:text-stone-100 font-semibold underline decoration-amber-500/50">~₹6,000 revenue</span>.
                               </p>
                           </div>
                      </motion.div>

                      {/* Timeline Node 2 */}
                      <motion.div 
                          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                          className="relative group cursor-default"
                      >
                           <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-stone-200 dark:bg-stone-800 border-2 border-white dark:border-[#0a0a0a] group-hover:bg-teal-500 group-hover:scale-125 transition-all duration-300 z-10"></div>
                           
                           <div className="p-6 -mt-6 rounded-2xl transition-colors duration-300 group-hover:bg-stone-50/50 dark:group-hover:bg-stone-800/40 border border-transparent group-hover:border-stone-200/50 dark:group-hover:border-white/5">
                               <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-4 mb-2">
                                   <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-teal-500 transition-colors">Full Stack Trainee (MERN)</h3>
                                   <span className="text-sm font-mono text-stone-500 dark:text-stone-500">Jun '25 – Jul '25</span>
                               </div>
                               <p className="text-stone-500 dark:text-stone-400 font-medium mb-3">Cipher Schools</p>
                               <p className="text-stone-600 dark:text-stone-400 leading-relaxed group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors">
                                   Built functionality for an Online Library Management System using modular backend architecture.
                               </p>
                           </div>
                      </motion.div>
                  </div>
              </div>

              {/* Achievements Column */}
              <div>
                  <div className="flex items-center gap-3 mb-8">
                       <FiAward className="text-2xl text-amber-500" />
                       <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 italic">Achievements</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                      <SpotlightCard className="!p-6 !rounded-2xl !bg-white dark:!bg-stone-900 !border-stone-200 dark:!border-stone-800">
                          <h4 className="font-bold text-stone-900 dark:text-stone-100 text-lg mb-1">DSA Excellence</h4>
                          <p className="text-stone-600 dark:text-stone-400">Solved <span className="font-semibold text-teal-600 dark:text-teal-400">500+ problems</span> across LeetCode & Coding Ninjas.</p>
                      </SpotlightCard>
                      <SpotlightCard className="!p-6 !rounded-2xl !bg-white dark:!bg-stone-900 !border-stone-200 dark:!border-stone-800">
                          <h4 className="font-bold text-stone-900 dark:text-stone-100 text-lg mb-1">LeetCode Recognition</h4>
                          <p className="text-stone-600 dark:text-stone-400">Achieved a peak contest rating of <span className="font-semibold text-amber-600 dark:text-amber-500">1522</span>.</p>
                      </SpotlightCard>
                      <SpotlightCard className="!p-6 !rounded-2xl !bg-white dark:!bg-stone-900 !border-stone-200 dark:!border-stone-800">
                          <h4 className="font-bold text-stone-900 dark:text-stone-100 text-lg mb-1">High Global Rank</h4>
                          <p className="text-stone-600 dark:text-stone-400">Secured Global Rank <span className="font-semibold text-teal-600 dark:text-teal-400">3,721</span> in LeetCode Weekly Contest 488 (Dec 2025).</p>
                      </SpotlightCard>
                      <SpotlightCard className="!p-6 !rounded-2xl !bg-white dark:!bg-stone-900 !border-stone-200 dark:!border-stone-800">
                          <h4 className="font-bold text-stone-900 dark:text-stone-100 text-lg mb-1">Hackathon Finalist</h4>
                          <p className="text-stone-600 dark:text-stone-400">Coding Ninjas Binary Bitz National Hackathon (Feb '24).</p>
                      </SpotlightCard>
                  </div>
              </div>
          </motion.div>

          {/* Certifications Section */}
          <motion.div variants={containerVariants} id="certifications" className="max-w-6xl mx-auto px-6 w-full">
              <div className="flex items-center gap-3 mb-8">
                   <FiBookOpen className="text-2xl text-blue-500" />
                   <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 italic">Certifications</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative p-6 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-white/5 overflow-hidden flex flex-col justify-between items-start gap-4 shadow-sm group">
                      <BorderBeam size={200} duration={8} delay={0} />
                      <div className="relative z-10 w-full">
                          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">Cloud Computing</h3>
                          <div className="flex items-center justify-between w-full text-stone-600 dark:text-stone-400 font-mono text-sm">
                              <span>NPTEL</span>
                              <span className="opacity-60">May 2025</span>
                          </div>
                      </div>
                  </div>
                  <div className="relative p-6 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-white/5 overflow-hidden flex flex-col justify-between items-start gap-4 shadow-sm group">
                      <BorderBeam size={200} duration={8} delay={4} />
                      <div className="relative z-10 w-full">
                          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">Data Structures and Algorithms</h3>
                          <div className="flex items-center justify-between w-full text-stone-600 dark:text-stone-400 font-mono text-sm">
                              <span>Cipher Schools</span>
                              <span className="opacity-60">Dec 2024</span>
                          </div>
                      </div>
                  </div>
              </div>
          </motion.div>

          {/* Magnetic Footer CTA */}
          <section id="contact" className="py-20">
              <HolographicCTA />
          </section>

          <footer id="contact-footer" className="mt-10 pt-10 border-t border-stone-200 dark:border-stone-800 text-center text-stone-400 text-sm flex flex-col items-center gap-4">
             <div className="flex gap-6 mb-4">
                <Magnetic>
                    <a href="https://github.com/nitinvedi" target="_blank" rel="noreferrer" className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">GitHub</a>
                </Magnetic>
                <Magnetic>
                    <a href="https://www.linkedin.com/in/nitinvedi" target="_blank" rel="noreferrer" className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">LinkedIn</a>
                </Magnetic>
                <Magnetic>
                    <button onClick={handleCopyEmail} className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer min-w-[80px]">
                        {emailCopied ? <span className="text-emerald-500 font-bold">Copied!</span> : "Copy Email"}
                    </button>
                </Magnetic>
             </div>
             
             <VisitorCounter />

             <p>© {new Date().getFullYear()} Nitin Chaturvedi. All rights reserved.</p>
          </footer>
      </div>

    </motion.div>
  );
};

export default Home;
