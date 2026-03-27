import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight, FiCopy, FiCheck, FiMail, FiGithub, FiLinkedin } from "react-icons/fi";

const HolographicCTA = () => {
    const containerRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

    const handleCopy = () => {
        navigator.clipboard.writeText("chaturvediinitin@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socials = [
        { label: "GitHub", href: "https://github.com/nitinvedi", icon: <FiGithub /> },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/nitinvedi", icon: <FiLinkedin /> },
        { label: "LeetCode", href: "https://leetcode.com/u/chaturvedinitin", icon: <FiArrowUpRight /> },
    ];

    return (
        <div ref={containerRef} id="contact" className="relative overflow-hidden py-24 md:py-36">
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40vw] h-[40vw] bg-amber-500/4 dark:bg-amber-500/[0.03] blur-[120px] rounded-full" />
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[30vw] h-[30vw] bg-teal-500/4 dark:bg-teal-500/[0.03] blur-[100px] rounded-full" />
            </div>

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10"
            >
                {/* Section label */}
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-stone-400 dark:text-stone-500 mb-10">
                    [ Let's Connect ]
                </p>

                {/* Main grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 border-t border-stone-200 dark:border-white/8 pt-14">

                    {/* LEFT — Headline */}
                    <div className="flex flex-col justify-between gap-12">
                        <h2 className="text-5xl sm:text-6xl xl:text-7xl font-display font-bold tracking-tighter leading-[0.88] text-stone-900 dark:text-white">
                            Open to roles &amp;<br />
                            <span className="italic font-light text-stone-400 dark:text-stone-500">
                                freelance work.
                            </span>
                        </h2>

                        {/* Social links */}
                        <div className="flex flex-col gap-0 border-t border-stone-200 dark:border-white/8">
                            {socials.map((s, i) => (
                                <motion.a
                                    key={i}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    whileHover={{ x: 6 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    className="group flex items-center justify-between py-4 border-b border-stone-200 dark:border-white/8 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-base">{s.icon}</span>
                                        <span className="text-sm font-medium">{s.label}</span>
                                    </div>
                                    <FiArrowUpRight className="text-stone-300 dark:text-stone-600 group-hover:text-stone-900 dark:group-hover:text-white group-hover:rotate-45 transition-all" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — Email CTA */}
                    <div className="flex flex-col justify-between gap-10">
                        <p className="text-lg text-stone-500 dark:text-stone-400 leading-relaxed max-w-md">
                            Whether it's a new product, a complex engineering challenge, or a side project — I'm here for it.
                            Let's build something that ships and scales.
                        </p>

                        {/* Email block */}
                        <div className="flex flex-col gap-4">
                            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500">
                                Preferred contact
                            </span>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href="mailto:chaturvediinitin@gmail.com"
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-sm font-bold uppercase tracking-widest hover:shadow-[0_0_24px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_24px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-[1.02]"
                                >
                                    <FiMail />
                                    Send Email
                                </a>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border border-stone-200 dark:border-white/10 text-sm font-medium text-stone-600 dark:text-stone-400 hover:border-stone-400 dark:hover:border-white/30 transition-all duration-300"
                                >
                                    {copied ? (
                                        <><FiCheck className="text-emerald-500" /><span className="text-emerald-500">Copied!</span></>
                                    ) : (
                                        <><FiCopy /><span>Copy</span></>
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-stone-400 font-mono">chaturvediinitin@gmail.com</p>
                        </div>

                        {/* Availability */}
                        <div className="flex items-center gap-3 p-5 rounded-2xl border border-stone-200 dark:border-white/8 bg-stone-50/50 dark:bg-white/[0.02]">
                            <span className="relative flex h-2.5 w-2.5 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Available now</p>
                                <p className="text-xs text-stone-400 font-mono">Open to full-time, freelance &amp; internships</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HolographicCTA;
