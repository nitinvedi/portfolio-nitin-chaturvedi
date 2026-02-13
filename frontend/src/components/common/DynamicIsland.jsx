import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiInfo } from "react-icons/fi";

const DynamicIsland = ({ message, isVisible, onClose, type = "success" }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
                     <motion.div
                        initial={{ width: "200px", height: "40px", opacity: 0, y: -20, scale: 0.8 }}
                        animate={{ width: "auto", height: "auto", opacity: 1, y: 0, scale: 1 }}
                        exit={{ width: "100px", opacity: 0, y: -10, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="bg-black/90 dark:bg-zinc-100/95 backdrop-blur-xl text-white dark:text-black rounded-[2rem] shadow-2xl overflow-hidden pointer-events-auto"
                     >
                        <div className="flex items-center gap-3 px-5 py-3 min-w-[300px]">
                            <div className={`p-1 rounded-full ${type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'} text-white`}>
                                {type === 'success' ? <FiCheckCircle /> : <FiInfo />}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold leading-tight">System Update</span>
                                <span className="text-xs opacity-80">{message}</span>
                            </div>
                        </div>
                     </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default DynamicIsland;
