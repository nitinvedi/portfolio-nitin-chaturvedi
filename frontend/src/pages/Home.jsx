import React from "react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBriefcase, FiAward, FiBookOpen } from 'react-icons/fi';
import Logo from '../assets/images.png';
import Card from '../components/common/Card';
import { projects } from '../data/projects';
import Noise from "../components/common/Noise";
import Magnetic from '../components/common/Magnetic';
import BentoGrid from '../components/specific/BentoGrid';
import TextReveal from '../components/common/TextReveal';
import ProjectGallery from '../components/specific/ProjectGallery';
import MediaReveal from '../components/common/MediaReveal';
import TextSplitReveal from '../components/common/TextSplitReveal';
import HolographicCTA from '../components/common/HolographicCTA';
import VisitorCounter from '../components/common/VisitorCounter';
import GridBackground from '../components/common/GridBackground';
import BorderBeam from '../components/common/BorderBeam';
import SpotlightCard from '../components/common/SpotlightCard';

const Home = () => {

  // ... (rest of component logic) ...


  
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
      className="scroll-smooth relative overflow-hidden" // ensure overflow hidden for background
    >
      {/* Subtle Ambient Lighting */}
      <div className="fixed top-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none mix-blend-screen z-0" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-teal-500/5 blur-[150px] pointer-events-none mix-blend-screen z-0" />

      <div className="flex flex-col min-h-screen gap-20 pb-20 relative z-10">
          
          {/* Hero Section — fits in one viewport */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-screen flex flex-col justify-center pt-16 relative px-4 sm:px-6 xl:px-12 z-10"
          >
            {/* Two-Column Layout */}
            <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center lg:items-center justify-between gap-10 lg:gap-20">

              {/* LEFT — Name, Status, Tagline */}
              <div className="flex flex-col items-center lg:items-start gap-6 lg:gap-8 flex-1">
                {/* Status Pill */}
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-stone-200 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-md shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                  </span>
                  <span className="text-xs font-mono font-medium text-stone-600 dark:text-stone-300 uppercase tracking-[0.15em]">Open to new opportunities</span>
                </div>

                {/* Name */}
                <h1 className="text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[5.5rem] xl:text-[7rem] leading-[0.85] tracking-tighter font-display font-medium text-stone-900 dark:text-stone-100 lowercase text-center lg:text-left">
                  <TextSplitReveal text="nitin" delay={0.4} stagger={0.05} />
                  <br />
                  <span className="italic font-light">
                    <TextSplitReveal text="chaturvedi" delay={0.7} stagger={0.05} />
                  </span>
                </h1>

                {/* Tagline */}
                <p className="text-base sm:text-lg lg:text-xl text-stone-600 dark:text-stone-400 font-serif leading-relaxed font-light max-w-md text-center lg:text-left">
                  A full-stack engineer turning complex algorithms into{" "}
                  <span className="text-stone-900 dark:text-white italic underline decoration-amber-500/30">refined web experiences.</span>
                </p>

                {/* CTA Row */}
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="https://drive.usercontent.google.com/download?id=1t7BVlFtCW3vBn4nzrnKf1OGMfpW1wu96&export=download&authuser=0"
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-105"
                  >
                    <span>↓</span> Download Resume
                  </a>
                  <button
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone-300 dark:border-white/20 text-stone-700 dark:text-stone-300 text-xs font-bold uppercase tracking-widest hover:border-stone-900 dark:hover:border-white transition-all duration-300"
                  >
                    View Work →
                  </button>
                </div>
              </div>

              {/* RIGHT — Avatar + info */}
              <div className="flex flex-col items-center gap-6 shrink-0">
                {/* Avatar */}
                <div className="relative group">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 to-teal-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition duration-700"></div>
                  <img
                    src={Logo}
                    alt="Nitin Chaturvedi"
                    className="relative w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-full object-cover border-2 border-white dark:border-stone-800 shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>


              </div>
            </div>

            {/* Scroll Indicator */}
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <div className="w-px h-12 bg-gradient-to-b from-stone-400 dark:from-stone-600 to-transparent"></div>
              <span className="text-[10px] font-mono tracking-widest text-stone-500 uppercase">Scroll</span>
            </div>
          </motion.section>


          <motion.div
            id="about"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="relative w-full max-w-7xl mx-auto"
          >
            <div className="w-px h-24 bg-gradient-to-b from-stone-200 dark:from-stone-800 to-transparent mx-auto mb-20 hidden md:block"></div>

            {/* Redesigned Editorial About Section */}
            <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start mb-32 px-4 sm:px-6">
                 {/* Left Column: Title */}
                 <div className="w-full md:w-1/3 pt-2">
                      <h2 className="text-sm font-mono text-stone-500 uppercase tracking-widest mb-4">
                           [ Philosophy ]
                      </h2>
                       <h3 className="text-5xl lg:text-6xl font-display text-stone-900 dark:text-stone-100 font-bold tracking-tighter leading-[1.1]">
                           Engineering Code,<br/>Driving Revenue.
                       </h3>
                 </div>
                 
                 {/* Right Column: Paragraph with interactive keywords */}
                 <div className="w-full md:w-2/3">
                       <p className="text-xl sm:text-2xl lg:text-3xl text-stone-600 dark:text-stone-400 font-serif leading-relaxed font-light max-w-[45ch]">
                           I engineer 
                           <span className="text-stone-900 dark:text-stone-100 italic font-normal hover:text-amber-500 transition-colors mx-2 cursor-help relative group">
                               high-performance architecture
                               <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 group-hover:w-full transition-all duration-500"></span>
                           </span> 
                           where algorithmic efficiency meets business reality. 
                           With a proven track record of solving 
                           <span className="text-stone-900 dark:text-stone-100 italic font-normal hover:text-amber-500 transition-colors mx-2 cursor-help relative group">
                               500+ complex algorithms
                               <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 group-hover:w-full transition-all duration-500"></span>
                           </span>
                           and a top-tier global ranking, 
                           I don't just write code—I build 
                           <span className="text-stone-900 dark:text-stone-100 italic font-normal border-b border-amber-500/30 hover:text-amber-500 transition-colors mx-2 cursor-help relative group">
                               sub-10ms systems
                               <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 group-hover:w-full transition-all duration-500"></span>
                           </span>
                           that scale, perform, and drive actual revenue.
                      </p>
                 </div>
            </div>
            
            {/* Architecture Details */}
            <BentoGrid />
          </motion.div>


          {/* Projects Section - Interactive Gallery */}
          <div id="projects" className="relative z-10 w-full mb-20">
               <ProjectGallery />
          </div>

          {/* Experience Section */}
          <motion.div 
            variants={sectionVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-10%" }}
            id="experience" 
            className="max-w-7xl mx-auto px-4 sm:px-6 w-full mb-28"
          >
              <div className="mb-14">
                   <h2 className="text-sm font-mono text-stone-400 uppercase tracking-widest mb-3">
                        [ Career ]
                   </h2>
                   <h3 className="text-5xl md:text-6xl font-display text-stone-900 dark:text-stone-100 font-bold tracking-tighter">
                        <TextSplitReveal text="Experience." />
                   </h3>
              </div>
              
              <div className="relative pl-8 md:pl-0 border-l md:border-l-0 border-stone-200 dark:border-stone-800 flex flex-col gap-12">
                  <motion.div 
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                      className="relative flex flex-col md:flex-row gap-4 md:gap-8 group"
                  >
                       <div className="md:hidden absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-stone-200 dark:bg-stone-800 border-2 border-white dark:border-[#0a0a0a] group-hover:bg-amber-500 transition-colors"></div>
                       <div className="w-full md:w-1/4 pt-1">
                           <span className="text-xs md:text-sm font-mono text-stone-400 dark:text-stone-500 block mb-2 md:mb-0">Nov '25 &mdash; Dec '25</span>
                       </div>
                       <div className="w-full md:w-3/4 md:border-b border-stone-200 dark:border-stone-800 pb-12 cursor-default">
                           <h3 className="text-2xl font-display text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors mb-2">Freelance Software Developer</h3>
                           <p className="text-stone-500 dark:text-stone-400 font-mono text-xs uppercase tracking-[0.2em] mb-4">Ram Mobiles</p>
                           <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm group-hover:text-stone-900 dark:group-hover:text-stone-300 transition-colors max-w-2xl">
                               Architected a full-stack e-commerce platform with React, Node.js, and MongoDB. 
                               Implemented inventory logic that reduced order errors and generated <span className="text-stone-900 dark:text-stone-100 font-medium border-b border-amber-500/30">~₹6,000 revenue</span>.
                           </p>
                       </div>
                  </motion.div>

                  <motion.div 
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                      className="relative flex flex-col md:flex-row gap-4 md:gap-8 group"
                  >
                       <div className="md:hidden absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-stone-200 dark:bg-stone-800 border-2 border-white dark:border-[#0a0a0a] group-hover:bg-amber-500 transition-colors"></div>
                       <div className="w-full md:w-1/4 pt-1">
                           <span className="text-xs md:text-sm font-mono text-stone-400 dark:text-stone-500 block mb-2 md:mb-0">Jun '25 &mdash; Jul '25</span>
                       </div>
                       <div className="w-full md:w-3/4 md:border-b border-stone-200 dark:border-stone-800 pb-12 cursor-default">
                           <h3 className="text-2xl font-display text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors mb-2">Full Stack Trainee (MERN)</h3>
                           <p className="text-stone-500 dark:text-stone-400 font-mono text-xs uppercase tracking-[0.2em] mb-4">Cipher Schools</p>
                           <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm group-hover:text-stone-900 dark:group-hover:text-stone-300 transition-colors max-w-2xl">
                               Built functionality for an Online Library Management System using modular backend architecture.
                           </p>
                       </div>
                  </motion.div>
              </div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div 
            variants={sectionVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-10%" }}
            id="achievements" 
            className="max-w-7xl mx-auto px-4 sm:px-6 w-full mb-28"
          >
              <div className="mb-14">
                   <h2 className="text-sm font-mono text-stone-400 uppercase tracking-widest mb-3">
                        [ Milestones ]
                   </h2>
                   <h3 className="text-5xl md:text-6xl font-display text-stone-900 dark:text-stone-100 font-bold tracking-tighter">
                        <TextSplitReveal text="Achievements." />
                   </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 border-t border-stone-200 dark:border-stone-800">
                  <div className="group flex flex-col py-10 border-b border-stone-200 dark:border-stone-800 cursor-default hover:bg-stone-50/50 dark:hover:bg-white/[0.02] px-6 transition-colors border-r md:border-r border-stone-200 dark:border-stone-800">
                      <span className="text-stone-400 font-mono text-[10px] mb-4 uppercase tracking-[0.2em]">01 / Competitive</span>
                      <h4 className="font-display text-stone-900 dark:text-stone-100 text-2xl mb-4 group-hover:text-amber-500 transition-colors">DSA Excellence</h4>
                      <p className="text-stone-500 text-sm leading-relaxed">Solved <span className="text-stone-800 dark:text-stone-300 font-bold">500+ problems</span> across LeetCode & Coding Ninjas with algorithmic efficiency.</p>
                  </div>
                  <div className="group flex flex-col py-10 border-b border-stone-200 dark:border-stone-800 cursor-default hover:bg-stone-50/50 dark:hover:bg-white/[0.02] px-6 transition-colors">
                      <span className="text-stone-400 font-mono text-[10px] mb-4 uppercase tracking-[0.2em]">02 / Rating</span>
                      <h4 className="font-display text-stone-900 dark:text-stone-100 text-2xl mb-4 group-hover:text-amber-500 transition-colors">LeetCode Recognition</h4>
                      <p className="text-stone-500 text-sm leading-relaxed">Achieved a peak contest rating of <span className="text-stone-800 dark:text-stone-300 font-mono font-bold">1522</span>, placing in top percentiles.</p>
                  </div>
                  <div className="group flex flex-col py-10 border-b border-stone-200 dark:border-stone-800 cursor-default hover:bg-stone-50/50 dark:hover:bg-white/[0.02] px-6 transition-colors border-r md:border-r border-stone-200 dark:border-stone-800">
                      <span className="text-stone-400 font-mono text-[10px] mb-4 uppercase tracking-[0.2em]">03 / Global</span>
                      <h4 className="font-display text-stone-900 dark:text-stone-100 text-2xl mb-4 group-hover:text-amber-500 transition-colors">High Global Rank</h4>
                      <p className="text-stone-500 text-sm leading-relaxed">Secured Global Rank <span className="text-stone-800 dark:text-stone-300 font-mono font-bold">3,721</span> in LeetCode Weekly Contest 488.</p>
                  </div>
                  <div className="group flex flex-col py-10 border-b border-stone-200 dark:border-stone-800 cursor-default hover:bg-stone-50/50 dark:hover:bg-white/[0.02] px-6 transition-colors">
                      <span className="text-stone-400 font-mono text-[10px] mb-4 uppercase tracking-[0.2em]">04 / Innovation</span>
                      <h4 className="font-display text-stone-900 dark:text-stone-100 text-2xl mb-4 group-hover:text-amber-500 transition-colors">Hackathon Finalist</h4>
                      <p className="text-stone-500 text-sm leading-relaxed">Coding Ninjas Binary Bitz National Hackathon (Feb '24), focusing on real-world problem solving.</p>
                  </div>
              </div>
          </motion.div>

          {/* Education Section */}
          <motion.div 
            variants={sectionVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-10%" }}
            className="max-w-7xl mx-auto px-4 sm:px-6 w-full mb-28"
          >
              <div className="mb-14">
                   <h2 className="text-sm font-mono text-stone-400 uppercase tracking-widest mb-3">
                        [ Academic Background ]
                   </h2>
                   <h3 className="text-5xl md:text-6xl font-display text-stone-900 dark:text-stone-100 font-bold tracking-tighter">
                        <TextSplitReveal text="Education." />
                   </h3>
              </div>
              
              <div className="relative pl-8 md:pl-0 border-l md:border-l-0 border-stone-200 dark:border-stone-800 flex flex-col gap-12">
                  <motion.div 
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                      className="relative flex flex-col md:flex-row gap-4 md:gap-8 group"
                  >
                       <div className="md:hidden absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-stone-200 dark:bg-stone-800 border-2 border-white dark:border-[#0a0a0a] group-hover:bg-amber-500 transition-colors"></div>
                       <div className="w-full md:w-1/4 pt-1">
                           <span className="text-xs md:text-sm font-mono text-stone-400 dark:text-stone-500 block mb-2 md:mb-0">2022 &mdash; 2026</span>
                       </div>
                       <div className="w-full md:w-3/4 md:border-b border-stone-200 dark:border-stone-800 pb-12 cursor-default">
                           <h3 className="text-2xl font-display text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors mb-2">B.Tech Computer Science & Engineering</h3>
                           <p className="text-stone-500 dark:text-stone-400 font-mono text-xs uppercase tracking-[0.2em] mb-4">Lovely Professional University (LPU)</p>
                           <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm group-hover:text-stone-900 dark:group-hover:text-stone-300 transition-colors max-w-2xl">
                               Current CGPA: <span className="text-stone-900 dark:text-stone-100 font-mono font-medium">9.14</span>
                           </p>
                       </div>
                  </motion.div>

                  <motion.div 
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                      className="relative flex flex-col md:flex-row gap-4 md:gap-8 group"
                  >
                       <div className="md:hidden absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-stone-200 dark:bg-stone-800 border-2 border-white dark:border-[#0a0a0a] group-hover:bg-amber-500 transition-colors"></div>
                       <div className="w-full md:w-1/4 pt-1">
                           <span className="text-xs md:text-sm font-mono text-stone-400 dark:text-stone-500 block mb-2 md:mb-0">2021 &mdash; 2022</span>
                       </div>
                       <div className="w-full md:w-3/4 md:border-b border-stone-200 dark:border-stone-800 pb-12 cursor-default">
                           <h3 className="text-2xl font-display text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors mb-2">Senior Secondary (Class XII)</h3>
                           <p className="text-stone-500 dark:text-stone-400 font-mono text-xs uppercase tracking-[0.2em] mb-4">Kendriya Vidyalaya</p>
                           <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm group-hover:text-stone-900 dark:group-hover:text-stone-300 transition-colors max-w-2xl">
                               Score: <span className="text-stone-900 dark:text-stone-100 font-mono font-medium">89.8%</span>
                           </p>
                       </div>
                  </motion.div>

                  <motion.div 
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                      className="relative flex flex-col md:flex-row gap-4 md:gap-8 group"
                  >
                       <div className="md:hidden absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-stone-200 dark:bg-stone-800 border-2 border-white dark:border-[#0a0a0a] group-hover:bg-amber-500 transition-colors"></div>
                       <div className="w-full md:w-1/4 pt-1">
                           <span className="text-xs md:text-sm font-mono text-stone-400 dark:text-stone-500 block mb-2 md:mb-0">2019 &mdash; 2020</span>
                       </div>
                       <div className="w-full md:w-3/4 pb-12 cursor-default">
                           <h3 className="text-2xl font-display text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors mb-2">Secondary (Class X)</h3>
                           <p className="text-stone-500 dark:text-stone-400 font-mono text-xs uppercase tracking-[0.2em] mb-4">Kendriya Vidyalaya</p>
                           <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm group-hover:text-stone-900 dark:group-hover:text-stone-300 transition-colors max-w-2xl">
                               Score: <span className="text-stone-900 dark:text-stone-100 font-mono font-medium">94.8%</span>
                           </p>
                       </div>
                  </motion.div>
              </div>
          </motion.div>

          {/* Certifications Section */}
          <motion.div 
            variants={sectionVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-10%" }}
            id="certifications" 
            className="max-w-7xl mx-auto px-4 sm:px-6 w-full mb-24"
          >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
                   <div>
                        <h2 className="text-sm font-mono text-stone-400 uppercase tracking-widest mb-3">
                            [ Continuous Learning ]
                        </h2>
                        <h3 className="text-5xl md:text-6xl font-display text-stone-900 dark:text-stone-100 font-bold tracking-tighter">
                            <TextSplitReveal text="Certifications." />
                        </h3>
                   </div>
              </div>
              <div className="flex flex-col border-b border-stone-200 dark:border-white/10">
                  {/* NPTEL Certificate */}
                  <MediaReveal mediaSrc="/nptel.png">
                      <a 
                        href="https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs11/Course/NPTEL25CS11S133730003404243952.pdf" 
                        target="_blank" 
                        rel="noreferrer"
                        className="group flex flex-col sm:flex-row sm:items-center justify-between py-10 border-t border-stone-200 dark:border-white/10 relative transition-colors hover:bg-stone-50/50 dark:hover:bg-white/[0.02] cursor-pointer px-4 -mx-4 sm:px-0 sm:mx-0"
                      >
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12 relative z-10">
                              <span className="font-mono text-xs text-stone-400 dark:text-stone-500">01</span>
                              <h4 className="text-2xl sm:text-3xl font-display text-stone-900 dark:text-stone-300 group-hover:text-amber-500 dark:group-hover:text-white transition-colors duration-300">
                                  Cloud Computing
                              </h4>
                          </div>
                          <div className="flex items-center gap-8 mt-4 sm:mt-0 relative z-10 text-stone-500 font-mono text-sm group-hover:text-stone-900 dark:group-hover:text-stone-300">
                              <span>NPTEL</span>
                              <span className="opacity-60">May 2025</span>
                          </div>
                      </a>
                  </MediaReveal>

                  {/* DSA Certificate */}
                  <MediaReveal mediaSrc="/dsa.png">
                      <a 
                        href="https://cipher-other-assets.s3.ap-south-1.amazonaws.com/certificates/TC_chaturvediinitin%40gmail.com_CS2024-10202" 
                        target="_blank" 
                        rel="noreferrer"
                        className="group flex flex-col sm:flex-row sm:items-center justify-between py-10 border-t border-stone-200 dark:border-white/10 relative transition-colors hover:bg-stone-50/50 dark:hover:bg-white/[0.02] cursor-pointer px-4 -mx-4 sm:px-0 sm:mx-0"
                      >
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12 relative z-10">
                              <span className="font-mono text-xs text-stone-400 dark:text-stone-500">02</span>
                              <h4 className="text-2xl sm:text-3xl font-display text-stone-900 dark:text-stone-300 group-hover:text-amber-500 dark:group-hover:text-white transition-colors duration-300">
                                  Data Structures and Algorithms
                              </h4>
                          </div>
                          <div className="flex items-center gap-8 mt-4 sm:mt-0 relative z-10 text-stone-500 font-mono text-sm group-hover:text-stone-900 dark:group-hover:text-stone-300">
                              <span>Cipher Schools</span>
                              <span className="opacity-60">Dec 2024</span>
                          </div>
                      </a>
                  </MediaReveal>
              </div>
          </motion.div>

          {/* Magnetic Footer CTA */}
          <section id="contact" className="py-20">
              <HolographicCTA />
          </section>

          <footer id="contact-footer" className="mt-4 pt-8 border-t border-stone-200 dark:border-stone-800 text-center text-stone-400 text-sm flex flex-col items-center gap-4">
             <div className="flex flex-wrap justify-center gap-6 mb-2">
                <Magnetic>
                    <a href="https://github.com/nitinvedi" target="_blank" rel="noreferrer" className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">GitHub</a>
                </Magnetic>
                <Magnetic>
                    <a href="https://www.linkedin.com/in/nitinvedi" target="_blank" rel="noreferrer" className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">LinkedIn</a>
                </Magnetic>
                <Magnetic>
                    <a
                        href="https://drive.usercontent.google.com/download?id=1t7BVlFtCW3vBn4nzrnKf1OGMfpW1wu96&export=download&authuser=0"
                        download
                        className="text-stone-500 hover:text-amber-500 transition-colors font-medium"
                    >
                        ↓ Resume
                    </a>
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
