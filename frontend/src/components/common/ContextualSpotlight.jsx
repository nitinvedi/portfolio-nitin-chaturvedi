import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiInfo, FiZap, FiCode, FiUser, FiBriefcase, FiMail } from "react-icons/fi";

const insights = [
    { 
        id: "home", 
        text: "Building digital excellence, one pixel at a time.", 
        icon: FiZap 
    },
    { 
        id: "about", 
        text: "Bridging the gap between complex logic and intuitive design.", 
        icon: FiUser 
    },
    { 
        id: "projects", 
        text: "Scalable, performant systems built for the real world.", 
        icon: FiCode 
    },
    { 
        id: "experience", 
        text: "Proven track record of delivering impact and revenue.", 
        icon: FiBriefcase 
    },
    { 
        id: "contact", 
        text: "Ready to build something extraordinary?", 
        icon: FiMail 
    },
];

const ContextualSpotlight = () => {
    const [activeSection, setActiveSection] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-40% 0px -40% 0px", // Trigger when section is in middle of viewport
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    if (sectionId !== activeSection) {
                        setActiveSection(sectionId);
                        setIsVisible(true);
                        
                        // Auto-hide after 4 seconds
                        const timer = setTimeout(() => {
                            setIsVisible(false);
                        }, 4000);
                        
                        return () => clearTimeout(timer);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        insights.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [activeSection]);

    // Find current insight
    const currentInsight = insights.find(i => i.id === activeSection);

    if (!currentInsight) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: 20, x: "-50%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-24 left-1/2 z-40 flex items-center gap-3 px-5 py-3 rounded-full bg-stone-900/90 dark:bg-stone-100/90 text-stone-100 dark:text-stone-900 shadow-2xl backdrop-blur-md border border-white/10 dark:border-black/5 min-w-max pointer-events-none"
                    key={activeSection} // Re-animate on change
                >
                    <div className="p-1.5 rounded-full bg-teal-500/20 text-teal-400 dark:text-teal-600">
                        <currentInsight.icon className="text-lg" />
                    </div>
                    <span className="text-sm font-medium pr-2">
                        {currentInsight.text}
                    </span>
                    
                    {/* Progress Bar (Optional, indicates timer) */}
                    <motion.div 
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 4, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-[2px] bg-teal-500/50"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ContextualSpotlight;
