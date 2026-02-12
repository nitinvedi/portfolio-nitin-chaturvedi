import React from "react";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "Python", icon: "devicon-python-plain colored" },
      { name: "Java", icon: "devicon-java-plain colored" },
      { name: "C++", icon: "devicon-cplusplus-plain colored" },
      { name: "PHP", icon: "devicon-php-plain colored" },
      { name: "C", icon: "devicon-c-plain colored" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js", icon: "devicon-react-original colored" },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain colored" },
    ],
  },
  {
    title: "Backend & DB",
    skills: [
      { name: "Node.js", icon: "devicon-nodejs-plain colored" },
      { name: "Express.js", icon: "devicon-express-original" },
      { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
      { name: "MySQL", icon: "devicon-mysql-plain colored" },
    ],
  },
  {
    title: "Tools",
    skills: [
        { name: "Git", icon: "devicon-git-plain colored" },
        { name: "Postman", icon: "devicon-postman-plain colored" },
    ]
  }
];

export default function Stack() {
  return (
    <section className="flex flex-col gap-6">
      {skillCategories.map((category, idx) => (
        <div key={idx} className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider pl-1">
                {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, index) => (
                <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50
                            border border-zinc-200 dark:border-zinc-700/50 text-xs font-medium shadow-sm
                            hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-white dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300 cursor-default"
                >
                    <i className={`${skill.icon} text-base`} title={skill.name}></i>
                    <span>{skill.name}</span>
                </motion.div>
                ))}
            </div>
        </div>
      ))}
    </section>
  );
}
