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
      {/* Subtle Ambient Lighting */}
      <div className="fixed top-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none mix-blend-screen z-0" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-teal-500/5 blur-[150px] pointer-events-none mix-blend-screen z-0" />

      <div className="flex flex-col min-h-screen gap-20 pb-20 relative z-10">
          
          {/* High-End Clean Editorial Hero Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="min-h-[85vh] flex flex-col justify-center pt-20 lg:pt-32 relative mb-20 px-4 sm:px-6 z-10"
          >
            {/* Minimalist Top Status */}
            <div className="flex justify-center mb-16 sm:mb-24 w-full">
               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-stone-200 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-md shadow-sm">
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                 </span>
                 <span className="text-xs font-mono font-medium text-stone-600 dark:text-stone-300 uppercase tracking-[0.15em]">Open to new opportunities</span>
               </div>
            </div>

            {/* Central Elegant Typography */}
            <div className="flex flex-col items-center text-center w-full max-w-6xl mx-auto gap-4 sm:gap-6">
              <h1 className="text-7xl sm:text-[8rem] md:text-[10rem] lg:text-[13rem] leading-[0.8] tracking-tighter font-display font-medium text-stone-900 dark:text-stone-100 flex items-center justify-center gap-2 sm:gap-4 lowercase">
                <span>nitin</span>
              </h1>
              <h1 className="text-7xl sm:text-[8rem] md:text-[10rem] lg:text-[13rem] leading-[0.8] tracking-tighter font-display font-medium text-stone-900 dark:text-stone-100 italic font-light lowercase">
                chaturvedi
              </h1>
              
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 border-t border-stone-200 dark:border-white/10 pt-12">
                 <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-teal-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <img 
                      src={Logo} 
                      alt="Nitin Chaturvedi" 
                      className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-white dark:border-stone-800 shadow-2xl transition-transform duration-500 group-hover:scale-105" 
                    />
                 </div>
                 <div className="flex flex-col items-center sm:items-start max-w-lg">
                    <p className="text-xl sm:text-3xl text-stone-600 dark:text-stone-400 font-serif leading-relaxed font-light">
                      A full-stack engineer turning complex algorithms into <span className="text-stone-900 dark:text-white italic underline decoration-amber-500/30">refined web experiences.</span>
                    </p>
                 </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-70 cursor-pointer hover:opacity-100 transition-opacity" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth'})}>
               <div className="w-px h-16 bg-gradient-to-b from-stone-400 dark:from-stone-600 to-transparent"></div>
               <span className="text-[10px] font-mono tracking-widest text-stone-500 uppercase">Scroll</span>
            </div>
          </motion.section>

          <motion.div
            id="about"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
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
                      <h3 className="text-4xl lg:text-5xl font-display text-stone-900 dark:text-stone-100 font-medium tracking-tight leading-tight">
                           Engineering Code,<br/>Driving Revenue.
                      </h3>
                 </div>
                 
                 {/* Right Column: Paragraph */}
                 <div className="w-full md:w-2/3">
                      <p className="text-xl sm:text-2xl lg:text-3xl text-stone-600 dark:text-stone-400 font-serif leading-relaxed font-light">
                           I engineer <span className="text-stone-900 dark:text-stone-100 italic font-normal">high-performance architecture</span> where algorithmic efficiency meets business reality. 
                           With a proven track record of solving <span className="text-stone-900 dark:text-stone-100 italic font-normal">500+ complex algorithms</span> and a top-tier global ranking, 
                           I don't just write code—I build <span className="text-stone-900 dark:text-stone-100 italic font-normal border-b border-amber-500/30">sub-10ms systems</span> that scale, perform, and drive actual revenue.
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

          {/* Experience & Achievements (New Section) */}
          <motion.div variants={containerVariants} id="experience-timeline" className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-7xl mx-auto px-4 sm:px-6 w-full mb-32">
              
              {/* Experience Timeline */}
              <div>
                  <div className="mb-16">
                       <h2 className="text-sm font-mono text-stone-500 uppercase tracking-widest mb-4">
                            [ Career ]
                       </h2>
                       <h3 className="text-4xl md:text-5xl font-display text-stone-900 dark:text-stone-100 font-medium tracking-tight">
                            Experience.
                       </h3>
                  </div>
                  
                  <div className="relative pl-8 md:pl-0 border-l md:border-l-0 border-stone-200 dark:border-stone-800 flex flex-col gap-16">
                      
                      {/* Timeline Node 1 */}
                      <motion.div 
                          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                          className="relative flex flex-col md:flex-row gap-4 md:gap-8 group"
                      >
                           {/* Glow Dot for Mobile Setup */}
                           <div className="md:hidden absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-stone-200 dark:bg-stone-800 border-2 border-white dark:border-[#0a0a0a] group-hover:bg-amber-500 transition-colors"></div>
                           
                           <div className="w-full md:w-1/4 pt-1">
                               <span className="text-xs md:text-sm font-mono text-stone-400 dark:text-stone-500 block mb-2 md:mb-0">Nov '25 &mdash; Dec '25</span>
                           </div>
                           
                           <div className="w-full md:w-3/4 md:border-b border-stone-200 dark:border-stone-800 pb-8 cursor-default">
                               <h3 className="text-2xl font-display text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors mb-2">Freelance Software Developer</h3>
                               <p className="text-stone-500 dark:text-stone-400 font-mono text-xs uppercase tracking-[0.2em] mb-4">Ram Mobiles</p>
                               <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm group-hover:text-stone-900 dark:group-hover:text-stone-300 transition-colors">
                                   Architected a full-stack e-commerce platform with React, Node.js, and MongoDB. 
                                   Implemented inventory logic that reduced order errors and generated <span className="text-stone-900 dark:text-stone-100 font-medium border-b border-amber-500/30">~₹6,000 revenue</span>.
                               </p>
                           </div>
                      </motion.div>

                      {/* Timeline Node 2 */}
                      <motion.div 
                          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                          className="relative flex flex-col md:flex-row gap-4 md:gap-8 group"
                      >
                           <div className="md:hidden absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-stone-200 dark:bg-stone-800 border-2 border-white dark:border-[#0a0a0a] group-hover:bg-amber-500 transition-colors"></div>
                           
                           <div className="w-full md:w-1/4 pt-1">
                               <span className="text-xs md:text-sm font-mono text-stone-400 dark:text-stone-500 block mb-2 md:mb-0">Jun '25 &mdash; Jul '25</span>
                           </div>
                           
                           <div className="w-full md:w-3/4 md:border-b border-stone-200 dark:border-stone-800 pb-8 cursor-default">
                               <h3 className="text-2xl font-display text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors mb-2">Full Stack Trainee (MERN)</h3>
                               <p className="text-stone-500 dark:text-stone-400 font-mono text-xs uppercase tracking-[0.2em] mb-4">Cipher Schools</p>
                               <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm group-hover:text-stone-900 dark:group-hover:text-stone-300 transition-colors">
                                   Built functionality for an Online Library Management System using modular backend architecture.
                               </p>
                           </div>
                      </motion.div>
                  </div>
              </div>

              {/* Achievements Column */}
              <div>
                  <div className="mb-16">
                       <h2 className="text-sm font-mono text-stone-500 uppercase tracking-widest mb-4">
                            [ Milestones ]
                       </h2>
                       <h3 className="text-4xl md:text-5xl font-display text-stone-900 dark:text-stone-100 font-medium tracking-tight">
                            Achievements.
                       </h3>
                  </div>

                  <div className="flex flex-col border-t border-stone-200 dark:border-stone-800">
                      <div className="group flex flex-col py-8 border-b border-stone-200 dark:border-stone-800 cursor-default hover:bg-stone-50/50 dark:hover:bg-white/[0.02] px-4 -mx-4 transition-colors">
                          <h4 className="font-display text-stone-900 dark:text-stone-100 text-2xl mb-2 group-hover:text-amber-500 transition-colors">DSA Excellence</h4>
                          <p className="text-stone-500 text-sm">Solved <span className="text-stone-800 dark:text-stone-300">500+ problems</span> across LeetCode & Coding Ninjas.</p>
                      </div>
                      <div className="group flex flex-col py-8 border-b border-stone-200 dark:border-stone-800 cursor-default hover:bg-stone-50/50 dark:hover:bg-white/[0.02] px-4 -mx-4 transition-colors">
                          <h4 className="font-display text-stone-900 dark:text-stone-100 text-2xl mb-2 group-hover:text-amber-500 transition-colors">LeetCode Recognition</h4>
                          <p className="text-stone-500 text-sm">Achieved a peak contest rating of <span className="text-stone-800 dark:text-stone-300 font-mono">1522</span>.</p>
                      </div>
                      <div className="group flex flex-col py-8 border-b border-stone-200 dark:border-stone-800 cursor-default hover:bg-stone-50/50 dark:hover:bg-white/[0.02] px-4 -mx-4 transition-colors">
                          <h4 className="font-display text-stone-900 dark:text-stone-100 text-2xl mb-2 group-hover:text-amber-500 transition-colors">High Global Rank</h4>
                          <p className="text-stone-500 text-sm">Secured Global Rank <span className="text-stone-800 dark:text-stone-300 font-mono">3,721</span> in LeetCode Weekly Contest 488.</p>
                      </div>
                      <div className="group flex flex-col py-8 border-b border-stone-200 dark:border-stone-800 cursor-default hover:bg-stone-50/50 dark:hover:bg-white/[0.02] px-4 -mx-4 transition-colors">
                          <h4 className="font-display text-stone-900 dark:text-stone-100 text-2xl mb-2 group-hover:text-amber-500 transition-colors">Hackathon Finalist</h4>
                          <p className="text-stone-500 text-sm">Coding Ninjas Binary Bitz National Hackathon (Feb '24).</p>
                      </div>
                  </div>
              </div>
          </motion.div>

          {/* Certifications Section */}
          <motion.div variants={containerVariants} id="certifications" className="max-w-7xl mx-auto px-4 sm:px-6 w-full mb-32">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                   <div>
                        <h2 className="text-sm font-mono text-stone-500 uppercase tracking-widest mb-4">
                            [ Continuous Learning ]
                        </h2>
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-display text-stone-900 dark:text-stone-100 font-medium tracking-tight">
                            Certifications.
                        </h3>
                   </div>
              </div>
              <div className="flex flex-col border-b border-stone-200 dark:border-white/10">
                  <div className="group flex flex-col sm:flex-row sm:items-center justify-between py-8 border-t border-stone-200 dark:border-white/10 relative transition-colors hover:bg-stone-50/50 dark:hover:bg-white/[0.02] cursor-default px-4 -mx-4 sm:px-0 sm:mx-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12 relative z-10">
                          <span className="font-mono text-xs text-stone-400 dark:text-stone-500">01</span>
                          <h4 className="text-2xl sm:text-3xl font-display text-stone-900 dark:text-stone-300 group-hover:text-amber-500 dark:group-hover:text-white transition-colors duration-300">
                              Cloud Computing
                          </h4>
                      </div>
                      <div className="flex items-center gap-8 mt-4 sm:mt-0 relative z-10 text-stone-500 font-mono text-sm">
                          <span>NPTEL</span>
                          <span className="opacity-60">May 2025</span>
                      </div>
                  </div>
                  <div className="group flex flex-col sm:flex-row sm:items-center justify-between py-8 border-t border-stone-200 dark:border-white/10 relative transition-colors hover:bg-stone-50/50 dark:hover:bg-white/[0.02] cursor-default px-4 -mx-4 sm:px-0 sm:mx-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12 relative z-10">
                          <span className="font-mono text-xs text-stone-400 dark:text-stone-500">02</span>
                          <h4 className="text-2xl sm:text-3xl font-display text-stone-900 dark:text-stone-300 group-hover:text-amber-500 dark:group-hover:text-white transition-colors duration-300">
                              Data Structures and Algorithms
                          </h4>
                      </div>
                      <div className="flex items-center gap-8 mt-4 sm:mt-0 relative z-10 text-stone-500 font-mono text-sm">
                          <span>Cipher Schools</span>
                          <span className="opacity-60">Dec 2024</span>
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
