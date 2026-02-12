import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { PiLinkedinLogoLight, PiGithubLogoLight, PiTelegramLogoThin } from 'react-icons/pi';
import { SiLeetcode } from "react-icons/si";
import { FiHome, FiBriefcase, FiCode } from "react-icons/fi";
import { CgFileDocument } from "react-icons/cg";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
    let mouseX = useMotionValue(Infinity);
    const { theme } = useTheme();
    const [activeSection, setActiveSection] = useState('home');
    const [isNavHovered, setIsNavHovered] = useState(false);

    // Resume Link
    const RESUME_URL = "https://docs.google.com/document/d/1_qeKga3bYW3KWQpLs9sC_izgGzSNyWgT/edit?usp=drive_link&ouid=101139583786478365075&rtpof=true&sd=true";

    // Scroll Spy Logic
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['experience', 'projects'];
            const scrollPosition = window.scrollY + 300; // Offset

            // Default to home
            let current = 'home';

            // Check if near bottom
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                 // optionally set to contact or projects if at very bottom
            }

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && element.offsetTop <= scrollPosition) {
                    current = section;
                }
            }

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navItems = [
        { id: 'home', icon: <FiHome className="text-xl" />, label: 'Home' },
        { id: 'experience', icon: <FiBriefcase className="text-xl" />, label: 'Experience' },
        { id: 'projects', icon: <FiCode className="text-xl" />, label: 'Projects' },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex h-16 items-end gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 backdrop-blur-2xl px-3 pb-3 shadow-lg shadow-zinc-200/50 dark:shadow-black/50 transition-colors duration-300"
            >
                {/* Collapsible Navigation Group */}
                <div 
                    className="flex items-end gap-2"
                    onMouseEnter={() => setIsNavHovered(true)}
                    onMouseLeave={() => setIsNavHovered(false)}
                >
                    <AnimatePresence initial={false} mode="popLayout">
                        {navItems.map((item) => {
                            // Show if it's the active section OR if the nav is hovered
                            const isVisible = isNavHovered || activeSection === item.id;

                            return isVisible ? (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                    animate={{ width: 'auto', opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.8, transition: { duration: 0.2 } }}
                                    transition={{ 
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                        mass: 1
                                    }}
                                >
                                    <DockIcon 
                                        mouseX={mouseX} 
                                        onClick={() => scrollToSection(item.id)}
                                        isActive={activeSection === item.id}
                                        label={item.label}
                                    >
                                        {item.icon}
                                    </DockIcon>
                                </motion.div>
                            ) : null;
                        })}
                    </AnimatePresence>
                </div>

                {/* Divider */}
                <div className="h-10 w-px bg-zinc-300 dark:bg-zinc-700 mx-1 self-center" />

                {/* Resume & Contact */}
                <DockIcon mouseX={mouseX} href={RESUME_URL} label="Resume">
                    <CgFileDocument className="text-xl" />
                </DockIcon>

                <DockIcon mouseX={mouseX} href="mailto:chaturvediinitin@gmail.com" label="Email">
                        <PiTelegramLogoThin className="text-xl" />
                </DockIcon>
                
                {/* Divider */}
                <div className="h-10 w-px bg-zinc-300 dark:bg-zinc-700 mx-1 self-center" />

                <DockIcon mouseX={mouseX} href="https://www.linkedin.com/in/nitinvedi" label="LinkedIn">
                    <PiLinkedinLogoLight className="text-2xl" />
                </DockIcon>
                <DockIcon mouseX={mouseX} href="https://github.com/nitinvedi" label="GitHub">
                    <PiGithubLogoLight className="text-2xl" />
                </DockIcon>
                <DockIcon mouseX={mouseX} href="https://leetcode.com/u/chaturvedinitin/" label="LeetCode">
                    <SiLeetcode className="text-xl" />
                </DockIcon>
            </motion.div>
        </div>
    );
};

function DockIcon({ mouseX, children, to, href, onClick, isActive, label }) {
    let ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    let widthSync = useTransform(distance, [-150, 0, 150], [40, 85, 40]);
    let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    const activeClass = isActive 
        ? "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-300 dark:ring-zinc-600" 
        : "bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700/50";

    const InnerContent = (
        <motion.button 
            className={`w-full h-full rounded-full flex items-center justify-center shadow-sm transition-colors relative ${activeClass}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </motion.button>
    );

    return (
        <motion.div 
            ref={ref}
            style={{ width }} 
            className="aspect-square rounded-full flex items-center justify-center relative"
        >
            {to ? (
                <Link to={to} className="w-full h-full flex items-center justify-center">
                    {InnerContent}
                </Link>
            ) : href ? (
                <a href={href} target="_blank" rel="noreferrer" className="w-full h-full flex items-center justify-center">
                    {InnerContent}
                </a>
            ) : (
                InnerContent
            )}

            <AnimatePresence>
                {isHovered && label && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: -12, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.8 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-bold rounded-md whitespace-nowrap pointer-events-none shadow-xl z-50 backdrop-blur-sm"
                    >
                         <span className="relative z-10">{label}</span>
                         <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-100"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default Header;
