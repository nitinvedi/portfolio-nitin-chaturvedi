import React, { useEffect, useState } from 'react';
import { FiEye, FiBarChart2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

const VisitorCounter = () => {
    const [count, setCount] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Switching to api.counterapi.dev for better reliability
        const fetchCount = async () => {
            try {
                // Namespace: nitin-portfolio-main
                // Key: visits
                const response = await fetch('https://api.counterapi.dev/v1/nitin-portfolio-main/visits/up');
                const data = await response.json();
                
                if (data && data.count) {
                    setCount(data.count);
                    localStorage.setItem('portfolio_visit_count', data.count.toString());
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (error) {
                console.error("Counter API Error:", error);
                
                // Fallback: Use local storage (incrementing)
                const localCount = localStorage.getItem('portfolio_visit_count');
                if (localCount) {
                    const newCount = parseInt(localCount) + 1;
                    setCount(newCount);
                    localStorage.setItem('portfolio_visit_count', newCount.toString());
                } else {
                    setCount(124); // Semantic base number
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCount();
    }, []);

    if (loading) return (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50 opacity-50">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-pulse"></span>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Loading...</span>
        </div>
    );

    return (
        <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50 group hover:border-teal-500/30 transition-colors"
        >
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <div className="flex items-center gap-1.5 text-xs font-medium text-stone-600 dark:text-stone-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                <FiEye className="text-sm" />
                <span>{count ? count.toLocaleString() : '---'}</span>
                <span className="hidden sm:inline text-stone-400">visits</span>
            </div>
        </motion.div>
    );
};

export default VisitorCounter;
