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
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'WORK', action: () => document.getElementById('project-gallery-heading')?.scrollIntoView({ behavior: 'smooth' }) },
        { label: 'STACK', action: () => document.getElementById('tech-arsenal-heading')?.scrollIntoView({ behavior: 'smooth' }) },
        { label: 'GITHUB', href: "https://github.com/nitinvedi" },
        { label: 'LINKEDIN', href: "https://www.linkedin.com/in/nitinvedi" },
        { label: 'RESUME', href: "https://drive.usercontent.google.com/download?id=1t7BVlFtCW3vBn4nzrnKf1OGMfpW1wu96&export=download&authuser=0&confirm=t&uuid=0d515bcd-b4b8-4b4b-ba18-8457bc660163&at=AGN2oQ3saf-qIj6q5X11O14cme16:1773686935414" },
    ];

    return (
        <motion.header 
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 border-b ${
                scrolled 
                ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-stone-200 dark:border-white/5 py-4 shadow-sm' 
                : 'bg-transparent border-transparent py-6'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                
                {/* Logo / Masthead Title */}
                <div 
                    className="flex flex-col cursor-pointer group"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <span className="font-display font-black text-xl leading-none text-stone-900 dark:text-stone-100 tracking-tighter">
                        NITIN<span className="text-amber-500">.</span>
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-stone-500 dark:text-stone-500 group-hover:text-stone-900 dark:group-hover:text-stone-300 transition-colors">
                        Engineer
                    </span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item, idx) => {
                        const content = (
                            <div className="text-xs font-semibold tracking-[0.15em] text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors relative group">
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-amber-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                            </div>
                        );

                        const LinkWrapper = item.href ? (
                            <a 
                                key={idx} 
                                href={item.href} 
                                target="_blank" 
                                rel="noreferrer"
                                className="cursor-pointer"
                            >
                                {content}
                            </a>
                        ) : (
                            <button 
                                key={idx} 
                                onClick={item.action}
                                className="cursor-pointer"
                            >
                                {content}
                            </button>
                        );

                        if (item.label === 'WORK') {
                            return (
                                <MediaReveal key={idx} mediaSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80">
                                    {LinkWrapper}
                                </MediaReveal>
                            );
                        }

                        return LinkWrapper;
                    })}
                    
                    {/* Divider */}
                    <div className="w-px h-4 bg-stone-300 dark:bg-stone-700"></div>
                    
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center gap-4">
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-xs font-semibold tracking-widest text-stone-800 dark:text-stone-200 uppercase"
                    >
                        {mobileMenuOpen ? 'CLOSE' : 'MENU'}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-stone-200 dark:border-white/5 overflow-hidden"
                    >
                        <div className="flex flex-col px-6 py-8 gap-6">
                            {navItems.map((item, idx) => (
                                item.href ? (
                                    <a 
                                        key={idx} 
                                        href={item.href} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-lg font-display font-bold tracking-tight text-stone-800 dark:text-stone-200"
                                    >
                                        {item.label}
                                    </a>
                                ) : (
                                    <button 
                                        key={idx} 
                                        onClick={() => {
                                            item.action();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="text-left text-lg font-display font-bold tracking-tight text-stone-800 dark:text-stone-200"
                                    >
                                        {item.label}
                                    </button>
                                )
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
