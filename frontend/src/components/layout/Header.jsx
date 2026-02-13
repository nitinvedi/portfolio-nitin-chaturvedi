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

    // Scroll Detection Logic
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
                        
                        // Clear existing timer
                        if (timerRef.current) clearTimeout(timerRef.current);
                        
                        // Auto-hide after 3.5 seconds
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
    }, []); // Empty dependency array = Stable observer

    // Navigation Items
    const navItems = [
        { id: 'home', icon: FiHome, label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { id: 'about', icon: FiUser, label: 'About', action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
        { id: 'projects', icon: FiGrid, label: 'Projects', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
        { id: 'experience', icon: FiBriefcase, label: 'Experience', action: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) },
    ];

    // External Links
    const socialItems = [
        { id: 'github', icon: FiGithub, label: 'GitHub', href: "https://github.com/nitinvedi" },
        { id: 'linkedin', icon: FiLinkedin, label: 'LinkedIn', href: "https://www.linkedin.com/in/nitinvedi" },
        { id: 'leetcode', icon: SiLeetcode, label: 'LeetCode', href: "https://leetcode.com/u/chaturvedinitin/" },
        { id: 'resume', icon: FiFileText, label: 'Resume', href: "https://docs.google.com/document/d/1_qeKga3bYW3KWQpLs9sC_izgGzSNyWgT/edit?usp=drive_link" },
    ];

    const currentInsightData = insights.find(i => i.id === activeInsight);
    
    // Priority Logic: Notification > Insight > Nav
    const shouldShowNotification = !!notification;
    const shouldShowInsight = showInsight && currentInsightData && !shouldShowNotification;
    
    // Determine what to display
    let displayContent = null;
    let modeKey = "nav";

    if (shouldShowNotification) {
        modeKey = "notification";
        displayContent = (
            <motion.div
                key="notification"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center gap-3 text-stone-800 dark:text-stone-200 whitespace-nowrap px-2"
            >
                 <div className="p-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <notification.icon className="text-sm" />
                </div>
                <span className="text-sm font-medium">{notification.message}</span>
            </motion.div>
        );
    } else if (shouldShowInsight) {
        modeKey = "insight";
        displayContent = (
             <motion.div
                key="insight"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center gap-3 text-stone-800 dark:text-stone-200 whitespace-nowrap px-2"
            >
                 <div className="p-1.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400">
                    <currentInsightData.icon className="text-sm" />
                </div>
                <span className="text-sm font-medium">{currentInsightData.text}</span>
            </motion.div>
        );
    } else {
        modeKey = "nav";
        displayContent = (
             <motion.div
                key="nav"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-end gap-2 sm:gap-2 no-scrollbar"
            >
                {/* Internal Nav */}
                {navItems.map((item) => (
                    <DockIcon key={item.id} mouseX={mouseX} label={item.label} onClick={item.action} isMobile={isMobile}>
                        <item.icon className="text-lg sm:text-xl" />
                    </DockIcon>
                ))}

                {/* Divider */}
                <div className="h-6 sm:h-8 w-px bg-stone-300 dark:bg-stone-700 mx-0.5 sm:mx-1 self-center opacity-50 shrink-0" />

                {/* Socials */}
                {socialItems.map((item) => (
                    <DockIcon key={item.id} mouseX={mouseX} label={item.label} href={item.href} isMobile={isMobile}>
                        <item.icon className="text-lg sm:text-xl" />
                    </DockIcon>
                ))}

                {/* Divider */}
                <div className="h-6 sm:h-8 w-px bg-stone-300 dark:bg-stone-700 mx-0.5 sm:mx-1 self-center opacity-50 shrink-0" />

                {/* Theme Toggle */}
                <DockIcon mouseX={mouseX} label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'} onClick={toggleTheme} isMobile={isMobile}>
                    {theme === 'dark' ? <FiSun className="text-lg sm:text-xl" /> : <FiMoon className="text-lg sm:text-xl" />}
                </DockIcon>
            </motion.div>
        );
    }

    return (
        <motion.div 
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
            className="fixed top-6 left-1/2 z-50 pointer-events-none w-full flex justify-center px-4"
        >
            <motion.div
                onMouseMove={(e) => !isMobile && modeKey === 'nav' && mouseX.set(e.pageX)}
                onMouseLeave={() => !isMobile && mouseX.set(Infinity)}
                className="pointer-events-auto flex items-center justify-center rounded-full border border-stone-200/50 dark:border-white/5 bg-white/60 dark:bg-black/60 backdrop-blur-md px-4 py-2 shadow-lg shadow-black/5 ring-1 ring-black/5 dark:ring-white/5 max-w-full overflow-hidden min-h-[50px] min-w-[300px]"
            >
                <AnimatePresence mode="wait">
                    {displayContent}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

function DockIcon({ mouseX, children, href, onClick, label, isMobile }) {
    let ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // Magnification Curve: Only active on Desktop
    // Reduced max width for subtle effect (40 -> 60)
    let widthSync = useTransform(distance, [-100, 0, 100], [40, 60, 40]);
    let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    const content = (
        <motion.div 
            className="w-full h-full flex items-center justify-center text-stone-500 dark:text-stone-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            whileHover={!isMobile ? { scale: 1.1 } : {}} 
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
            {href ? (
                <a href={href} target="_blank" rel="noreferrer" className="w-full h-full flex items-center justify-center">
                    {content}
                </a>
            ) : (
                <button className="w-full h-full flex items-center justify-center">
                    {content}
                </button>
            )}

            {/* Tooltip - Hide on mobile */}
            <AnimatePresence>
                {isHovered && !isMobile && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
                        animate={{ opacity: 1, y: -15, scale: 1, x: "-50%" }}
                        exit={{ opacity: 0, y: 5, scale: 0.8, x: "-50%" }}
                        className="absolute -top-10 left-1/2 px-3 py-1 bg-stone-900/90 dark:bg-stone-100/90 text-stone-100 dark:text-stone-900 text-xs font-medium rounded-lg whitespace-nowrap backdrop-blur-md pointer-events-none shadow-xl border border-white/10 dark:border-black/10 z-[60]"
                    >
                        {label}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default Header;
