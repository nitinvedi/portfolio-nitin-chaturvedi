import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FiMoon, FiSun, FiArrowUpRight } from 'react-icons/fi';
import { useTheme } from "../../context/ThemeContext";

const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredIdx, setHoveredIdx] = useState(null);
    const [time, setTime] = useState("");
    const [hidden, setHidden] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    const lastScrollY = useRef(0);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;

        if (latest <= 150) {
            setHidden(false);
        } else if (latest > previous && latest > 150) {
            // Scrolling down
            setHidden(true);
        } else if (latest < previous) {
            // Scrolling up
            setHidden(false);
        }

        setScrolled(latest > 60);

        const sections = [
            { id: 'contact', label: 'Contact' },
            { id: 'certifications', label: 'Certs' },
            { id: 'achievements', label: 'Achievements' },
            { id: 'experience', label: 'Experience' },
            { id: 'projects', label: 'Work' },
            { id: 'about', label: 'About' },
        ];
        for (const section of sections) {
            const el = document.getElementById(section.id);
            if (el && latest > el.offsetTop - 300) {
                setActiveSection(section.label);
                return;
            }
        }
        setActiveSection("Home");
    });

    useEffect(() => {
        const updateTime = () => {
            setTime(new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }).format(new Date()));
        };
        updateTime();
        const interval = setInterval(updateTime, 10000);
        return () => clearInterval(interval);
    }, []);

    const navItems = [
        { label: 'Work', action: () => scrollToId('projects') },
        { label: 'Experience', action: () => scrollToId('experience') },
        { label: 'Achievements', action: () => scrollToId('achievements') },
        { label: 'Certs', action: () => scrollToId('certifications') },
        { label: 'Contact', action: () => scrollToId('contact') },
    ];

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: '-110%', opacity: 0 },
                }}
                animate={hidden ? 'hidden' : 'visible'}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? 'bg-white/85 dark:bg-[#080808]/90 backdrop-blur-xl border-b border-stone-200/60 dark:border-white/[0.06]'
                        : 'bg-transparent'
                }`}
            >
                <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between gap-8">

                    {/* LEFT — Monogram + Name */}
                    <div
                        className="flex items-center gap-3 cursor-pointer group shrink-0"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <div className="w-8 h-8 rounded-full bg-stone-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-xs tracking-tighter group-hover:rotate-[360deg] transition-transform duration-700 shrink-0">
                            N
                        </div>
                        <div className="hidden sm:flex flex-col leading-none">
                            <span className="text-[13px] font-bold tracking-tight text-stone-900 dark:text-white">Nitin Chaturvedi</span>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={activeSection}
                                    initial={{ y: 4, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -4, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-[9px] font-mono text-stone-400 dark:text-stone-500 uppercase tracking-[0.15em] mt-0.5"
                                >
                                    / {activeSection}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* CENTER — Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-0.5 relative">
                        {navItems.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={item.action}
                                onMouseEnter={() => setHoveredIdx(idx)}
                                onMouseLeave={() => setHoveredIdx(null)}
                                className="relative px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
                            >
                                {hoveredIdx === idx && (
                                    <motion.span
                                        layoutId="nav-highlight"
                                        className="absolute inset-0 bg-stone-100 dark:bg-white/8 rounded-lg"
                                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                    />
                                )}
                                <span className="relative z-10">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* RIGHT — Indicators + Actions */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">

                        {/* Live time + availability */}
                        <div className="hidden lg:flex items-center gap-2 pr-3 border-r border-stone-200 dark:border-white/10">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500 tabular-nums">{time} IST</span>
                        </div>

                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
                        >
                            <AnimatePresence mode="wait">
                                {theme === 'dark' ? (
                                    <motion.div key="moon" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                                        <FiMoon className="text-stone-400 text-sm" />
                                    </motion.div>
                                ) : (
                                    <motion.div key="sun" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                                        <FiSun className="text-stone-600 text-sm" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>

                        {/* GitHub — subtle bordered pill */}
                        <a
                            href="https://github.com/nitinvedi"
                            target="_blank"
                            rel="noreferrer"
                            className="hidden sm:inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border border-stone-200 dark:border-white/10 text-[11px] font-bold uppercase tracking-widest text-stone-600 dark:text-stone-400 hover:bg-stone-900 hover:text-white hover:border-stone-900 dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all duration-300"
                        >
                            GitHub <FiArrowUpRight className="text-xs" />
                        </a>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Open menu"
                            className="md:hidden w-9 h-9 flex flex-col items-end justify-center gap-[5px] rounded-full hover:bg-stone-100 dark:hover:bg-white/10 px-2 transition-colors"
                        >
                            <span className="block w-5 h-[1.5px] bg-stone-800 dark:bg-white rounded-full" />
                            <span className="block w-3.5 h-[1.5px] bg-stone-800 dark:bg-white rounded-full" />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* MOBILE — Circle-reveal full-screen menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
                        animate={{ clipPath: 'circle(170% at calc(100% - 2rem) 2rem)' }}
                        exit={{ clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 bg-stone-950 z-[60] flex flex-col px-8 py-8 pointer-events-auto"
                    >
                        {/* Top row */}
                        <div className="flex justify-between items-center mb-12">
                            <span className="font-display font-black text-xl tracking-tighter text-white">
                                N<span className="text-amber-400">.</span>
                            </span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors text-sm"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Nav links — massive editorial */}
                        <nav className="flex flex-col flex-1 justify-center gap-1">
                            {navItems.map((item, idx) => (
                                <motion.button
                                    key={idx}
                                    initial={{ opacity: 0, x: -24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.12 + idx * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    onClick={() => { item.action(); setMobileMenuOpen(false); }}
                                    className="group flex items-center justify-between py-4 border-b border-white/10 text-left"
                                >
                                    <span className="text-4xl sm:text-5xl font-display font-bold text-white/70 group-hover:text-white transition-colors duration-200">
                                        {item.label}
                                    </span>
                                    <FiArrowUpRight className="text-white/20 group-hover:text-amber-400 text-2xl transition-all duration-200 group-hover:rotate-45" />
                                </motion.button>
                            ))}
                        </nav>

                        {/* Bottom bar */}
                        <div className="flex items-center justify-between pt-8 border-t border-white/10 mt-8">
                            <div className="flex gap-5">
                                <a href="https://github.com/nitinvedi" target="_blank" rel="noreferrer" className="text-sm text-white/40 hover:text-white transition-colors">GitHub</a>
                                <a href="https://www.linkedin.com/in/nitinvedi" target="_blank" rel="noreferrer" className="text-sm text-white/40 hover:text-white transition-colors">LinkedIn</a>
                            </div>
                            <a
                                href="https://drive.usercontent.google.com/download?id=1t7BVlFtCW3vBn4nzrnKf1OGMfpW1wu96&export=download&authuser=0"
                                download
                                className="text-[11px] font-bold text-amber-400 uppercase tracking-widest hover:text-amber-300 transition-colors"
                            >
                                ↓ Resume
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
