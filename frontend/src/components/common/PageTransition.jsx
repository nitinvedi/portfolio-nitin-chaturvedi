import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }) => {
    const location = useLocation();

    const variants = {
        initial: {
            opacity: 0,
            y: 20,
            scale: 0.98
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1], // Custom slow-out ease
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            scale: 1.02,
            transition: {
                duration: 0.4,
                ease: [0.33, 1, 0.68, 1],
            }
        }
    };

    return (
        <AnimatePresence mode="popLayout">
            <motion.div
                key={location.pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                className="w-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;
