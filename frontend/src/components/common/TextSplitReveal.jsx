import React from "react";
import { motion } from "framer-motion";

const TextSplitReveal = ({ text, className = "", delay = 0, stagger = 0.02 }) => {
    const characters = text.split("");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: stagger,
                delayChildren: delay,
            },
        },
    };

    const childVariants = {
        hidden: { 
            opacity: 0, 
            y: 40,
            rotateX: 45
        },
        visible: { 
            opacity: 1, 
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        },
    };

    return (
        <motion.span
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={`inline-block perspective-500 ${className}`}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={childVariants}
                    className="inline-block"
                    style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default TextSplitReveal;
