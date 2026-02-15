import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Card from "../common/Card";
import { projects } from "../../data/projects";

import { FiLayers } from 'react-icons/fi';


const ProjectGallery = () => {
  const containerRef = useRef(null);
  const [activeTitle, setActiveTitle] = useState("");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(Math.floor(latest * projects.length), projects.length - 1);
    const currentProject = projects[index];
    
    if (currentProject && currentProject.title !== activeTitle) {
      setActiveTitle(currentProject.title);
    }
  });

  return (
    <section ref={containerRef} className="relative bg-transparent mt-20 mb-20">
      <div className="max-w-6xl mx-auto px-4 mb-20 text-center">
            <h2 id="project-gallery-heading" className="text-4xl md:text-5xl font-bold font-display mb-4 text-stone-900 dark:text-stone-100">
                Selected Works
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
                Each project is a deep dive into solving real problems.
            </p>
      </div>

      <div className="max-w-5xl mx-auto pb-40">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <CardWrapper
              key={i}
              i={i}
              project={project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
};

const CardWrapper = ({ i, project, progress, range, targetScale }) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-[80vh] flex items-center justify-center sticky top-20"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-10% + ${i * 25}px)`,
        }}
        className="flex flex-col relative w-full h-[500px] rounded-3xl origin-top border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-2xl overflow-hidden"
      >
        <Card project={project} index={i} isStacking={true} />
      </motion.div>
    </div>
  );
};

export default ProjectGallery;
