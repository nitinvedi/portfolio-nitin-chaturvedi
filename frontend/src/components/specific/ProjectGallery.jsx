import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import Card from "../common/Card";
import { projects } from "../../data/projects";

const ProjectGallery = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-transparent">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 px-8 sm:px-16">
            {/* Intro Card */}
            <div className="flex-shrink-0 w-[80vw] sm:w-[500px] h-[500px] flex flex-col justify-center rounded-3xl bg-stone-100 dark:bg-stone-900/50 p-8 border border-stone-200 dark:border-stone-800">
                 <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-stone-900 dark:text-stone-100">
                    Selected Works
                 </h2>
                 <p className="text-stone-600 dark:text-stone-400 text-lg">
                    A collection of robust full-stack applications and experimental interfaces. Scroll to explore.
                 </p>
                 <div className="mt-8 flex gap-2">
                    <div className="w-12 h-1 bg-stone-300 dark:bg-stone-700 rounded-full animate-pulse"></div>
                    <div className="w-2 h-1 bg-stone-300 dark:bg-stone-700 rounded-full"></div>
                    <div className="w-2 h-1 bg-stone-300 dark:bg-stone-700 rounded-full"></div>
                 </div>
            </div>

            {/* Project Cards */}
            {projects.map((project, idx) => (
                <div key={idx} className="flex-shrink-0 w-[85vw] sm:w-[500px] h-[600px] flex items-center">
                    <div className="w-full h-full transform transition-transform duration-300 hover:scale-[1.02]">
                        <Card project={project} index={idx} />
                    </div>
                </div>
            ))}
            
             {/* Outro Card */}
             <div className="flex-shrink-0 w-[80vw] sm:w-[500px] h-[500px] flex flex-col justify-center items-center text-center rounded-3xl bg-stone-100 dark:bg-stone-900/50 p-8 border border-stone-200 dark:border-stone-800">
                 <h3 className="text-3xl font-bold mb-2 text-stone-900 dark:text-stone-100">More on GitHub</h3>
                 <a href="https://github.com/nitinvedi" target="_blank" rel="noreferrer" className="text-teal-500 hover:text-teal-400 font-medium text-lg underline underline-offset-4">
                    View all repositories
                 </a>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectGallery;
