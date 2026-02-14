import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { FiHome, FiUser, FiGrid, FiBriefcase, FiMail, FiMoon, FiSun, FiGithub, FiLinkedin, FiFileText, FiZap, FiCode, FiCheck } from 'react-icons/fi';
import { SiLeetcode } from "react-icons/si";
import { useTheme } from "../../context/ThemeContext";
import { useNotification } from "../../context/NotificationContext";

const insights = [
    { 
        id: "home", 
        text: "Architecting scalable digital ecosystems.", 
        icon: FiZap 
    },
    { 
        id: "about", 
        text: "Merging complex backend logic with seamless UI/UX.", 
        icon: FiUser 
    },
    { 
        id: "projects", 
        text: "Production-ready systems serving real-world users.", 
        icon: FiCode 
    },
    { 
        id: "experience", 
        text: "Engineering solutions that drive business growth.", 
        icon: FiBriefcase 
    },
    { 
        id: "contact", 
        text: "Let's engineer the future of your product.", 
        icon: FiMail 
    },
];

// --- Cinematic Theme Toggle Component ---
const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <button 
            onClick={toggleTheme}
            className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Toggle Theme"
        >
            <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                    <motion.div
                        key="moon"
                        initial={{ rotate: -90, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        exit={{ rotate: 90, scale: 0 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                    >
                        <FiMoon className="text-xl text-teal-400 fill-teal-400/20" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ rotate: 90, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        exit={{ rotate: -90, scale: 0 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                    >
                         <FiSun className="text-xl text-amber-500 fill-amber-500/20" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};

const Header = () => {
    let mouseX = useMotionValue(Infinity);
    const { theme, toggleTheme } = useTheme();
    const { notification } = useNotification();
    const [isMobile, setIsMobile] = useState(false);
    
    // Insight State
    const [activeInsight, setActiveInsight] = useState(null);
    const [showInsight, setShowInsight] = useState(false);
    
    // Refs for stability
    const activeInsightRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Scroll Detection Logic (Unchanged)
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-45% 0px -45% 0px", // Trigger when section is near middle
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const insight = insights.find(i => i.id === sectionId);
                    
                    if (insight && insight.id !== activeInsightRef.current) {
                        // Update State & Ref
                        setActiveInsight(insight.id);
                        activeInsightRef.current = insight.id;
                        setShowInsight(true);
                        
                        if (timerRef.current) clearTimeout(timerRef.current);
                        
                        timerRef.current = setTimeout(() => {
                            setShowInsight(false);
                        }, 3500);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        insights.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => {
             observer.disconnect();
             if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    // Navigation Items & Socials (Unchanged)
    const navItems = [
        { id: 'home', icon: FiHome, label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { id: 'about', icon: FiUser, label: 'About', action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
        { id: 'projects', icon: FiGrid, label: 'Projects', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
        { id: 'experience', icon: FiBriefcase, label: 'Experience', action: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) },
    ];

    const socialItems = [
        { id: 'github', icon: FiGithub, label: 'GitHub', href: "https://github.com/nitinvedi" },
        { id: 'linkedin', icon: FiLinkedin, label: 'LinkedIn', href: "https://www.linkedin.com/in/nitinvedi" },
        { id: 'leetcode', icon: SiLeetcode, label: 'LeetCode', href: "https://leetcode.com/u/chaturvedinitin/" },
        { id: 'resume', icon: FiFileText, label: 'Resume', href: "https://docs.google.com/document/d/1_qeKga3bYW3KWQpLs9sC_izgGzSNyWgT/edit?usp=drive_link" },
    ];

    const currentInsightData = insights.find(i => i.id === activeInsight);
    
    // Priority Logic
    const shouldShowNotification = !!notification;
    const shouldShowInsight = showInsight && currentInsightData && !shouldShowNotification;
    
    // Determine content for flipping
    const isNotifyMode = shouldShowNotification || shouldShowInsight;

    // --- Animation Variants ---
    const containerVariants = {
        nav: { boxShadow: "0px 10px 30px -10px rgba(0,0,0,0.1)" },
        notify: { boxShadow: "0px 10px 30px -10px rgba(0,0,0,0.1)" } 
    };

    // Slide Animation for Content
    const contentVariants = {
        hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
        visible: { y: 0, opacity: 1, filter: "blur(0px)" },
        exit: { y: -20, opacity: 0, filter: "blur(4px)" }
    };

    return (
        <div className="fixed top-6 left-0 w-full flex justify-center z-50 pointer-events-none px-4">
            <motion.div
                // Fixed Layout - No morphing size
                variants={containerVariants}
                animate={isNotifyMode ? "notify" : "nav"}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                onMouseMove={(e) => !isMobile && !isNotifyMode && mouseX.set(e.pageX)}
                onMouseLeave={() => !isMobile && mouseX.set(Infinity)}
                className={`pointer-events-auto relative flex items-center justify-center rounded-full 
                            bg-white/60 dark:bg-black/60 backdrop-blur-md border border-white/20 dark:border-white/10
                            shadow-lg overflow-hidden px-4 py-2 w-auto min-w-[340px] h-[54px]`} // Fixed Dimensions
            >
                <AnimatePresence mode="wait"> 
                    {shouldShowNotification ? (
                        <motion.div
                            key="notification"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex items-center gap-3 whitespace-nowrap text-stone-800 dark:text-stone-200"
                        >
                            <span className="p-1 rounded-full bg-green-500/20 text-green-600 dark:text-green-400">
                                <notification.icon />
                            </span>
                            <span className="font-medium text-sm">{notification.message}</span>
                        </motion.div>
                    ) : shouldShowInsight ? (
                         <motion.div
                            key="insight"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                             transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex items-center gap-3 whitespace-nowrap text-stone-800 dark:text-stone-200"
                        >
                             <span className="p-1 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400">
                                <currentInsightData.icon />
                            </span>
                            <span className="font-medium text-sm">{currentInsightData.text}</span>
                        </motion.div>
                    ) : (
                        <motion.div
                             key="nav"
                             variants={contentVariants}
                             initial="hidden"
                             animate="visible"
                             exit="exit"
                             transition={{ duration: 0.3, ease: "easeInOut" }}
                             className="flex items-center gap-2 sm:gap-1"
                        >
                            {/* Internal Nav */}
                            {navItems.map((item) => (
                                <DockIcon key={item.id} mouseX={mouseX} label={item.label} onClick={item.action} isMobile={isMobile}>
                                    <item.icon className="text-xl" />
                                </DockIcon>
                            ))}
            
                            {/* Divider */}
                            <div className="h-6 w-px bg-stone-300 dark:bg-stone-700 mx-2 opacity-30" />
            
                            {/* Socials */}
                            {socialItems.map((item) => (
                                <DockIcon key={item.id} mouseX={mouseX} label={item.label} href={item.href} isMobile={isMobile}>
                                    <item.icon className="text-xl" />
                                </DockIcon>
                            ))}
            
                            {/* Divider */}
                            <div className="h-6 w-px bg-stone-300 dark:bg-stone-700 mx-2 opacity-30" />
            
                            {/* 5. Cinematic Theme Toggle */}
                            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

// 3. Magnetic Nav Links (Enhanced Physics)
function DockIcon({ mouseX, children, href, onClick, label, isMobile }) {
    let ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // Stronger Magnification & Spring for "Magnetic" feel
    let widthSync = useTransform(distance, [-120, 0, 120], [40, 55, 40]);
    let width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });

    const content = (
        <motion.div 
            className="w-full h-full flex items-center justify-center text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
        >
            {children}
        </motion.div>
    );

    return (
        <motion.div 
            ref={ref}
            style={{ width: isMobile ? 40 : width }} 
            className="aspect-square flex items-center justify-center relative group shrink-0"
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
             {/* Hover Glow/Spotlight */}
             {isHovered && (
                <motion.div 
                    layoutId="spotlight"
                    className="absolute inset-2 bg-stone-200/50 dark:bg-stone-700/50 rounded-full -z-10 blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />
             )}

            {href ? (
                <a href={href} target="_blank" rel="noreferrer" className="w-full h-full flex items-center justify-center">
                    {content}
                </a>
            ) : (
                <button className="w-full h-full flex items-center justify-center">
                    {content}
                </button>
            )}
        </motion.div>
    );
}

export default Header;
