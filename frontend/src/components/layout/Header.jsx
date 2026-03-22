import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from "../../context/ThemeContext";
import MediaReveal from "../common/MediaReveal";

const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Toggle Theme"
        >
            <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                    <motion.div
                        key="moon"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FiMoon className="text-lg text-stone-100" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ opacity: 0, rotate: 90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -90 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FiSun className="text-lg text-stone-900" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredIdx, setHoveredIdx] = useState(null);
    const [time, setTime] = useState("");
    const [activeSection, setActiveSection] = useState("Home");

    // Scroll reveal logic
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        // Dynamic Section Tracking
        const workSection = document.getElementById('project-gallery-heading');
        const stackSection = document.getElementById('tech-arsenal-heading');

        if (stackSection && latest > stackSection.offsetTop - 300) {
            setActiveSection("Stack");
        } else if (workSection && latest > workSection.offsetTop - 300) {
            setActiveSection("Work");
        } else {
            setActiveSection("Home");
        }
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        const updateTime = () => {
            setTime(new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).format(new Date()));
        };

        updateTime();
        const interval = setInterval(updateTime, 10000);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(interval);
        };
    }, []);

    const navItems = [
        { label: 'WORK', action: () => document.getElementById('project-gallery-heading')?.scrollIntoView({ behavior: 'smooth' }) },
        { label: 'STACK', action: () => document.getElementById('tech-arsenal-heading')?.scrollIntoView({ behavior: 'smooth' }) },
        { label: 'GITHUB', href: "https://github.com/nitinvedi" },
        { label: 'LINKEDIN', href: "https://www.linkedin.com/in/nitinvedi" },
    ];

    return (
        <div className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none px-6">
            <motion.header
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -100, opacity: 0 },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`pointer-events-auto flex items-center h-14 px-2 rounded-full border border-stone-200/50 dark:border-white/10 bg-white/60 dark:bg-black/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-500 ${scrolled ? 'scale-95' : 'scale-100'
                    }`}
            >
                {/* Logo & Dynamic Status Indicator */}
                <div
                    className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full cursor-pointer group"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <div className="w-10 h-10 rounded-full bg-stone-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-sm tracking-tighter group-hover:rotate-[360deg] transition-transform duration-700">
                        N
                    </div>
                    <div className="hidden lg:flex flex-col min-w-[60px]">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={activeSection}
                                initial={{ y: 5, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -5, opacity: 0 }}
                                className="text-[8px] font-mono leading-none text-stone-400 dark:text-stone-500 uppercase tracking-widest"
                            >
                                {activeSection}
                            </motion.span>
                        </AnimatePresence>
                        <span className="text-[10px] font-bold leading-none text-stone-900 dark:text-white mt-1">{time} IST</span>
                    </div>
                </div>

                {/* Vertical Divider (Left) */}
                <div className="hidden lg:block w-px h-6 bg-stone-200 dark:bg-white/10 mx-1"></div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1 mx-2 relative">
                    {navItems.map((item, idx) => {
                        const isHovered = hoveredIdx === idx;

                        const NavItem = (
                            <motion.div
                                key={idx}
                                onMouseEnter={() => setHoveredIdx(idx)}
                                onMouseLeave={() => setHoveredIdx(null)}
                                whileHover={{ y: -2 }}
                                className="relative cursor-pointer"
                            >
                                <div className={`px-4 py-2 text-[10px] font-bold tracking-[0.2em] transition-colors relative z-10 ${isHovered ? 'text-stone-900 dark:text-white' : 'text-stone-500 dark:text-stone-400'
                                    }`}>
                                    {item.label}
                                </div>
                            </motion.div>
                        );

                        const navElement = item.href ? (
                            <a key={idx} href={item.href} target="_blank" rel="noreferrer">
                                {NavItem}
                            </a>
                        ) : (
                            <button key={idx} onClick={item.action}>
                                {NavItem}
                            </button>
                        );

                        return (
                            <div key={idx} className="relative">
                                {item.label === 'WORK' ? (
                                    <MediaReveal mediaSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80">
                                        {navElement}
                                    </MediaReveal>
                                ) : navElement}
                            </div>
                        );
                    })}

                    {/* Shared Layout Hover Blob */}
                    <AnimatePresence>
                        {hoveredIdx !== null && (
                            <motion.div
                                layoutId="nav-blob"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                className="absolute inset-y-1 bg-stone-100 dark:bg-white/10 rounded-full z-0"
                                style={{
                                    left: (hoveredIdx * (100 / navItems.length)) + "%",
                                    width: (100 / navItems.length) + "%"
                                }}
                            />
                        )}
                    </AnimatePresence>
                </nav>

                {/* Vertical Divider (Right) */}
                <div className="hidden md:block w-px h-6 bg-stone-200 dark:bg-white/10 mx-2"></div>

                {/* Right Side Controls */}
                <div className="flex items-center gap-2 pl-2 pr-1">
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

                    {/* Minimal CTA with Glow */}
                    <a
                        href="mailto:chaturvedinitin.dev@gmail.com"
                        className="hidden sm:flex h-9 px-5 items-center justify-center rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all"
                    >
                        Talk
                    </a>

                    {/* Mobile Menu Trigger */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
                    >
                        <div className="w-5 flex flex-col items-end gap-1">
                            <div className="w-full h-0.5 bg-stone-900 dark:bg-white rounded-full"></div>
                            <div className="w-3/4 h-0.5 bg-stone-900 dark:bg-white rounded-full"></div>
                        </div>
                    </button>
                </div>
            </motion.header>

            {/* Mobile Full Screen Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-3xl z-[60] flex flex-col p-10 pointer-events-auto"
                    >
                        <div className="flex justify-between items-center mb-20">
                            <span className="font-display font-black text-2xl tracking-tighter dark:text-white text-stone-900">NITIN<span className="text-amber-500">.</span></span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-12 h-12 rounded-full border border-stone-200 dark:border-white/10 flex items-center justify-center text-sm font-bold dark:text-white"
                            >
                                CLOSE
                            </button>
                        </div>

                        <div className="flex flex-col gap-8">
                            {navItems.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    {item.href ? (
                                        <a href={item.href} target="_blank" rel="noreferrer" className="text-5xl font-display font-bold text-stone-900 dark:text-white hover:italic transition-all">
                                            {item.label}
                                        </a>
                                    ) : (
                                        <button onClick={() => { item.action(); setMobileMenuOpen(false); }} className="text-5xl font-display font-bold text-stone-900 dark:text-white hover:italic transition-all text-left">
                                            {item.label}
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-auto grid grid-cols-2 gap-4">
                            <a href="mailto:chaturvedinitin.dev@gmail.com" className="p-6 rounded-3xl bg-amber-500 text-white font-bold text-center">EMAIL ME</a>
                            <a href="tel:+917068072233" className="p-6 rounded-3xl bg-stone-900 dark:bg-white dark:text-black text-white font-bold text-center">CALL</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Header;
