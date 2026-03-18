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
        <span className="text-stone-500 dark:text-stone-400 font-mono text-sm tracking-tight opacity-50">
            [loading...]
        </span>
    );

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-stone-500 dark:text-stone-500 font-mono text-sm tracking-tight flex items-center gap-2"
        >
            <span>[</span>
            <span>{count ? count.toLocaleString() : '---'}</span>
            <span>visits ]</span>
        </motion.div>
    );
};

export default VisitorCounter;
