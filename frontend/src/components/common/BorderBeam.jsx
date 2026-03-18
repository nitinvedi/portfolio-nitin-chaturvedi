
import { motion } from "framer-motion";

const BorderBeam = ({ className = "", size = 200, duration = 15, delay = 0 }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 z-10 rounded-3xl overflow-hidden ${className}`}>
        <motion.div 
            className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0"
            animate={{
                offsetDistance: ["0%", "100%"],
                opacity: [0, 1, 0]
            }}
            transition={{
                duration: duration,
                ease: "linear",
                repeat: Infinity,
                delay: delay,
            }}
            style={{
                offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            }}
        />
        {/* CSS Fallback/Alternative implementation since offset-path support varies */}
        <div 
            className="absolute top-0 left-0 w-full h-full border border-transparent rounded-[inherit]" 
            style={{
                background: `linear-gradient(90deg, transparent 50%, #6366f1 100%)`, 
                mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
                maskComposite: `exclude`,
                WebkitMaskComposite: `xor`,
                padding: '1px'
            }}
        >
             {/* This static border is replaced by the animation below if needed, but for 'Beam' specifically: */}
        </div>
        
        <motion.div
            className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent skew-x-12"
            animate={{
                left: ["-100%", "200%"]
            }}
            transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 3
            }}
        />
    </div>
  );
};

// Simple focused implementation
export const SimpleBorderBeam = () => {
    return (
        <div className="absolute inset-0 z-20 pointer-events-none rounded-[inherit] overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full animate-border-beam" />
             <style>{`
                @keyframes border-beam {
                    0% { transform: translateX(-100%) translateY(-100%); }
                    100% { transform: translateX(100%) translateY(100%); }
                }
                .animate-border-beam {
                    background: linear-gradient(to right, transparent, #6366f1, transparent);
                    width: 200%;
                    height: 100%;
                    transform: rotate(45deg);
                    opacity: 0.5;
                    animation: shimmer 3s infinite linear;
                }
                @keyframes shimmer {
                    0% { transform: translateX(-150%) skewX(-15deg); }
                    100% { transform: translateX(150%) skewX(-15deg); }
                }
             `}</style>
             <div className="absolute inset-0 w-full h-full animate-[shimmer_3s_infinite_linear] bg-gradient-to-r from-transparent via-white/20 dark:via-indigo-500/30 to-transparent -skew-x-12" />
        </div>
    )
}

export default SimpleBorderBeam;
