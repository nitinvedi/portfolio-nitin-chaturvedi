import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { FiMapPin, FiGithub, FiCode, FiArrowUpRight, FiCopy, FiActivity, FiCheck, FiMail, FiLinkedin } from "react-icons/fi";
import { SiReact, SiNodedotjs, SiMongodb, SiTailwindcss, SiJavascript, SiPostgresql, SiPython, SiGit, SiHtml5, SiCss3, SiGithub, SiGo, SiRedis, SiSocketdotio, SiCplusplus } from "react-icons/si";

/* --- Helper Components (Defined TOP to prevent hoisting errors) --- */

function BentoItem({ children, className }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        const { left, top } = event.currentTarget.getBoundingClientRect();
        setMousePosition({ x: clientX - left, y: clientY - top });
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`p-6 rounded-[2rem] border border-stone-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a] transition-all duration-300 relative overflow-hidden group hover:bg-stone-50 dark:hover:bg-[#111111] shadow-sm ${className}`}
        >
             {/* Spotlight Gradient */}
             <div 
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,180,50,0.08), transparent 40%)`
                }}
             />
             {/* Border Spotlight */}
             <div 
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-overlay"
                style={{
                     background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2), transparent 40%)`,
                     maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                     maskComposite: 'exclude',
                     WebkitMaskComposite: 'xor',
                     padding: '1px'
                }}
             />

            {/* Subtle Noise Overlay */}
            <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none mix-blend-overlay"></div>
            {children}
        </motion.div>
    );
}

// Removed MarqueeRow in favor of a structured list

// Removed RotatingTextCircle

function CopyEmailButton({ email }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button 
            onClick={handleCopy}
            className="w-full p-4 rounded-xl bg-stone-900 dark:bg-white text-stone-100 dark:text-stone-900 font-bold flex items-center justify-between group relative overflow-hidden"
        >
             <div className={`absolute inset-0 ${copied ? 'bg-emerald-500' : 'bg-amber-500'} ${copied ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'} transition-transform duration-300`}></div>
             <span className="relative z-10 flex items-center gap-2">
                 {copied ? <FiCheck className="text-lg" /> : <FiMail className="text-lg" />}
                 {copied ? "Address Copied!" : "Copy Email"}
             </span>
             {copied ? <FiCheck className="relative z-10 text-lg opacity-100" /> : <FiCopy className="relative z-10 text-lg opacity-50 group-hover:opacity-100" />}
        </button>
    )
}

function SocialLink({ href, icon, label }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 text-sm font-medium"
        >
            {icon}
            <span>{label}</span>
        </a>
    )
}

function TechIcon({ Icon, color, label }) {
    return (
        <div className="flex flex-col items-center gap-1 group">
            <Icon className={`text-2xl ${color} brightness-90 group-hover:brightness-110 transition-all duration-300`} />
        </div>
    );
}

function TechBadge({ icon: Icon, name, color = "text-stone-900 dark:text-stone-100" }) {
    // Sleek List Item Badge - Monochromatic baseline, brand colors on hover
    return (
        <div className="group/badge flex items-center gap-2.5 px-2 py-1.5 transition-colors duration-300 cursor-default hover:bg-stone-100 dark:hover:bg-white/5 rounded-md -ml-2">
            <Icon className={`text-base text-stone-400 dark:text-stone-500 group-hover/badge:${color.split(' ')[0]} dark:group-hover/badge:${color.split(' ')[1] || color.split(' ')[0]} transition-colors duration-300`} />
            <span className={`text-xs font-semibold tracking-wide text-stone-600 dark:text-stone-400 group-hover/badge:text-stone-900 dark:group-hover/badge:text-stone-100 transition-colors duration-300`}>{name}</span>
        </div>
    );
}

/* --- Main Component --- */

const BentoGrid = () => {
    const [ping, setPing] = useState(14);

    // Simulate API Ping fluctuation
    useEffect(() => {
        const interval = setInterval(() => {
            setPing(Math.floor(Math.random() * (45 - 12 + 1) + 12));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">
            {/* NEW UNIFIED TOP SECTION: Architecture Dashboard (Spans all 3 cols) */}
            <div className="md:col-span-3 rounded-[2rem] border border-stone-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a] overflow-hidden flex flex-col md:flex-row shadow-sm relative group p-1 z-10 transition-colors hover:border-stone-300 dark:hover:border-white/10">
                
                {/* 1. Operations Panel (Left 1/3) */}
                <div className="w-full md:w-1/3 p-6 md:p-8 rounded-t-[1.8rem] md:rounded-l-[1.8rem] md:rounded-tr-none bg-stone-50/50 dark:bg-black flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-stone-200/50 dark:border-white/5">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse outline outline-2 outline-emerald-500/30 outline-offset-2"></div>
                            <span className="font-mono text-[10px] text-stone-500 dark:text-stone-400 tracking-[0.25em] uppercase">System: Online</span>
                        </div>
                        
                        <h3 className="font-display text-4xl font-bold text-stone-900 dark:text-stone-100 leading-[1.1] tracking-tight mb-2">Base of<br/>Operations</h3>
                        
                        <div className="mt-8 flex flex-col gap-3 font-mono text-xs tracking-[0.15em] text-stone-500 dark:text-stone-400">
                             <div className="flex items-center gap-2">
                                  <FiMapPin className="text-amber-500" />
                                  <span>India • UTC+5:30</span>
                             </div>
                             <div className="pl-6 flex flex-col gap-1 opacity-60">
                                 <span>LAT: 28.6139° N</span>
                                 <span>LON: 77.2090° E</span>
                             </div>
                             
                             {/* Dynamic Metrics */}
                             <div className="flex items-center gap-2 mt-4 text-emerald-500/80">
                                  <FiActivity className="text-emerald-500" />
                                  <span>API Route: <span className="text-emerald-400 font-bold">{ping}ms</span></span>
                             </div>
                        </div>
                    </div>

                    {/* Abstract Wireframe Grid */}
                    <div className="absolute top-0 right-0 w-64 h-64 opacity-5 dark:opacity-20 pointer-events-none" 
                         style={{ 
                            backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.5) 1px, transparent 1px)`,
                            backgroundSize: '20px 20px',
                            maskImage: 'radial-gradient(circle at top right, black, transparent 70%)',
                            WebkitMaskImage: 'radial-gradient(circle at top right, black, transparent 70%)'
                         }}>
                    </div>
                </div>

                {/* 2. Tech Stack Panel (Right 2/3) */}
                <div className="w-full md:w-2/3 p-6 md:p-8 rounded-b-[1.8rem] md:rounded-r-[1.8rem] md:rounded-bl-none z-10 bg-white/50 dark:bg-stone-900/10 relative overflow-hidden">
                     
                     {/* Faint Code Background Overlay */}
                     <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none overflow-hidden select-none flex items-center justify-center">
                         <pre className="font-mono text-xs text-stone-900 dark:text-stone-100 whitespace-pre leading-relaxed">
{`func (s *Server) handleIncoming(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()
    start := time.Now()
    
    // Auth Check
    token := r.Header.Get("Authorization")
    if !auth.Validate(token) {
        log.Warn("Unauthorized access attempt", zap.String("ip", r.RemoteAddr))
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

    // Process Pipeline
    payload, err := s.parser.Parse(r.Body)
    if err != nil {
        metrics.ErrorsTotal.Inc()
        w.WriteHeader(http.StatusBadRequest)
        return
    }

    // Execute Core
    result := s.engine.Process(ctx, payload)
    
    // Metrics
    duration := time.Since(start)
    metrics.RequestDuration.Observe(duration.Seconds())
}`}
                         </pre>
                     </div>

                     <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200/50 dark:border-white/5 relative z-10">
                         <div className="flex items-center gap-3">
                              <FiCode className="text-teal-500 text-xl" />
                              <h3 id="tech-arsenal-heading" className="font-display font-bold text-lg text-stone-900 dark:text-stone-100 tracking-tight">Core Architecture</h3>
                         </div>
                         <span className="font-mono text-[10px] text-stone-500 tracking-[0.2em] uppercase hidden sm:block">Tech Stack // Current</span>
                     </div>

                     <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
                          {/* Category 1 */}
                          <div className="flex flex-col gap-1 w-full">
                               <h4 className="font-mono text-[9px] text-stone-400 dark:text-stone-500 uppercase tracking-[0.25em] mb-3 border-l-2 border-stone-300 dark:border-stone-700 pl-2">Languages</h4>
                               <TechBadge icon={SiJavascript} name="JavaScript" color="text-yellow-500 dark:text-yellow-400" />
                               <TechBadge icon={SiPython} name="Python" color="text-blue-500 dark:text-yellow-300" />
                               <TechBadge icon={SiGo} name="Go" color="text-cyan-600 dark:text-cyan-500" />
                               <TechBadge icon={SiCplusplus} name="C++ / C" color="text-blue-500 dark:text-blue-300" />
                          </div>
                          {/* Category 2 */}
                          <div className="flex flex-col gap-1 w-full">
                               <h4 className="font-mono text-[9px] text-stone-400 dark:text-stone-500 uppercase tracking-[0.25em] mb-3 border-l-2 border-stone-300 dark:border-stone-700 pl-2">Frontend</h4>
                               <TechBadge icon={SiReact} name="React" color="text-cyan-400 dark:text-cyan-300" />
                               <TechBadge icon={SiTailwindcss} name="Tailwind" color="text-cyan-500 dark:text-cyan-400" />
                               <TechBadge icon={SiHtml5} name="HTML5" color="text-orange-600 dark:text-orange-500" />
                               <TechBadge icon={SiCss3} name="CSS3" color="text-blue-600 dark:text-blue-500" />
                          </div>
                          {/* Category 3 */}
                          <div className="flex flex-col gap-1 w-full">
                               <h4 className="font-mono text-[9px] text-stone-400 dark:text-stone-500 uppercase tracking-[0.25em] mb-3 border-l-2 border-stone-300 dark:border-stone-700 pl-2">Backend</h4>
                               <TechBadge name="Node.js" icon={SiNodedotjs} color="text-green-600 dark:text-green-500" />
                               <TechBadge name="Express" icon={SiNodedotjs} color="text-stone-800 dark:text-stone-200" />
                               <TechBadge icon={SiSocketdotio} name="Socket.IO" color="text-stone-800 dark:text-stone-200" />
                          </div>
                          {/* Category 4 */}
                          <div className="flex flex-col gap-1 w-full">
                               <h4 className="font-mono text-[9px] text-stone-400 dark:text-stone-500 uppercase tracking-[0.25em] mb-3 border-l-2 border-stone-300 dark:border-stone-700 pl-2">Database/Infra</h4>
                               <TechBadge icon={SiMongodb} name="MongoDB" color="text-green-500 dark:text-green-400" />
                               <TechBadge icon={SiPostgresql} name="PostgreSQL" color="text-blue-500 dark:text-blue-400" />
                               <TechBadge icon={SiRedis} name="Redis" color="text-red-600 dark:text-red-500" />
                               <TechBadge icon={SiGit} name="Git" color="text-orange-600 dark:text-orange-500" />
                          </div>
                     </div>
                </div>
            </div>

            {/* 3. Let's Talk / Contact Block - Grounded */}
            <BentoItem className="md:col-span-1 md:row-span-1 !bg-[#0f0f0f] dark:!bg-[#0c0c0c] !border-stone-200 dark:!border-[#1a1a1a]">
                 <div className="flex flex-col h-full items-start justify-between relative z-10 w-full p-2">
                    <div>
                      <h3 className="text-xl font-bold font-display text-stone-900 dark:text-stone-100 mb-1">Let's work together.</h3>
                      <p className="text-sm text-stone-500 dark:text-stone-400">I'm currently available for freelance projects.</p>
                    </div>
                    
                    {/* Interactive Hover-Reveal Email CTA */}
                    <div 
                        className="group mt-6 w-full flex items-center justify-between p-4 bg-stone-100 dark:bg-[#161616] border border-stone-200 dark:border-[#2a2a2a] rounded-xl hover:bg-stone-200 dark:hover:bg-[#1a1a1a] transition-all cursor-pointer overflow-hidden relative"
                        onClick={() => {
                            navigator.clipboard.writeText('chaturvediinitin@gmail.com');
                            // Could add a toast here, but the active state handles feedback
                        }}
                    >
                        {/* Default State */}
                        <div className="flex items-center justify-between w-full group-hover:-translate-y-8 transition-transform duration-300">
                            <span className="font-semibold text-stone-900 dark:text-stone-100">Send an email</span>
                            <FiArrowUpRight className="text-stone-400" />
                        </div>
                        
                        {/* Hover Reveal State (Email Address) */}
                        <div className="absolute inset-0 w-full h-full flex items-center justify-between px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-amber-500">
                            <span className="font-bold text-stone-900 tracking-wide text-sm">chaturvediinitin@gmail.com</span>
                            <FiCopy className="text-stone-900" />
                        </div>
                    </div>
                 </div>
            </BentoItem>

            {/* 4. Social & Connect (Wide) */}
            <BentoItem className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800/50">
                 <div className="flex flex-col sm:flex-row h-full gap-6 z-10 relative">
                    
                    {/* Bio Section */}
                    <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-stone-800 dark:text-stone-200 mb-2 font-display">
                            Ships production. <span className="text-amber-500">Measures results.</span>
                        </h3>
                        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                            I go beyond tutorials — my projects generate real revenue and handle real users. Specializing in MERN, Go, and distributed systems with an eye for clean architecture.
                        </p>
                        <div className="flex gap-2">
                             <SocialLink href="https://github.com/nitinvedi" icon={<FiGithub />} label="GitHub" />
                             <SocialLink href="https://www.linkedin.com/in/nitinvedi" icon={<FiLinkedin />} label="LinkedIn" />
                        </div>
                    </div>

                     {/* Stats / Copy Email */}
                    <div className="w-full sm:w-1/3 flex flex-col gap-2 justify-center">
                        <CopyEmailButton email="chaturvediinitin@gmail.com" />
                         <div className="p-3 rounded-xl bg-stone-200/50 dark:bg-black/20 border border-stone-200 dark:border-stone-700/50 flex align-center gap-3">
                            <FiCode className="text-xl text-emerald-500 mt-1" />
                            <div>
                                <span className="block text-lg font-bold text-stone-900 dark:text-white">Full Stack</span>
                                <span className="text-xs text-stone-500">Developer</span>
                            </div>
                        </div>
                    </div>

                 </div>
            </BentoItem>
        </div>
    );
};

export default BentoGrid;
