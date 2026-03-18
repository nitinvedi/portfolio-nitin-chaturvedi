import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { FiCommand, FiHome, FiUser, FiBriefcase, FiMail, FiGithub, FiLinkedin, FiMoon, FiSun, FiMapPin } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Toggle the menu when ⌘K or Ctrl+K is pressed
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (action) => {
    action();
    setOpen(false);
  };

  const navToId = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop Blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-900/40 dark:bg-black/60 backdrop-blur-sm z-[99999]"
            onClick={() => setOpen(false)}
          />

          {/* Palette Container */}
          <div className="fixed inset-0 z-[100000] flex items-start justify-center pt-[20vh] pointer-events-none px-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="w-full max-w-2xl bg-white dark:bg-[#111111] border border-stone-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              <Command 
                 className="w-full h-full flex flex-col"
                 filter={(value, search) => {
                    if (value.toLowerCase().includes(search.toLowerCase())) return 1;
                    return 0;
                 }}
              >
                {/* Search Input */}
                <div className="flex items-center px-4 py-4 border-b border-stone-100 dark:border-white/5">
                  <FiCommand className="text-stone-400 mr-3 text-lg shrink-0" />
                  <Command.Input 
                     autoFocus
                     placeholder="Type a command or search..."
                     className="flex-1 bg-transparent text-stone-900 dark:text-stone-100 placeholder:text-stone-400 outline-none CustomFontDisplay text-lg"
                  />
                  <span className="text-xs font-mono text-stone-400 border border-stone-200 dark:border-stone-700 rounded px-1.5 py-0.5 bg-stone-50 dark:bg-stone-800">ESC</span>
                </div>

                {/* Results List */}
                <Command.List className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
                  <Command.Empty className="py-6 text-center text-sm text-stone-500">
                    No results found.
                  </Command.Empty>

                  <Command.Group heading="Navigation" className="text-xs font-semibold text-stone-500 tracking-wider px-2 py-2">
                    <Command.Item 
                        value="home"
                        onSelect={() => handleSelect(() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
                        className="flex items-center gap-3 px-3 py-3 text-sm text-stone-700 dark:text-stone-300 rounded-xl cursor-pointer hover:bg-stone-100 dark:hover:bg-white/5 aria-selected:bg-stone-100 dark:aria-selected:bg-white/5 transition-colors"
                    >
                      <FiHome className="text-stone-400" />
                      Home
                    </Command.Item>
                    <Command.Item 
                        value="about"
                        onSelect={() => handleSelect(() => navToId('about'))}
                        className="flex items-center gap-3 px-3 py-3 text-sm text-stone-700 dark:text-stone-300 rounded-xl cursor-pointer hover:bg-stone-100 dark:hover:bg-white/5 aria-selected:bg-stone-100 dark:aria-selected:bg-white/5 transition-colors"
                    >
                      <FiUser className="text-stone-400" />
                      About Me
                    </Command.Item>
                    <Command.Item 
                        value="work projects"
                        onSelect={() => handleSelect(() => navToId('project-gallery-heading'))}
                        className="flex items-center gap-3 px-3 py-3 text-sm text-stone-700 dark:text-stone-300 rounded-xl cursor-pointer hover:bg-stone-100 dark:hover:bg-white/5 aria-selected:bg-stone-100 dark:aria-selected:bg-white/5 transition-colors"
                    >
                      <FiBriefcase className="text-stone-400" />
                      Selected Work (Projects)
                    </Command.Item>
                    <Command.Item 
                        value="tech stack architecture tools"
                        onSelect={() => handleSelect(() => navToId('tech-arsenal-heading'))}
                        className="flex items-center gap-3 px-3 py-3 text-sm text-stone-700 dark:text-stone-300 rounded-xl cursor-pointer hover:bg-stone-100 dark:hover:bg-white/5 aria-selected:bg-stone-100 dark:aria-selected:bg-white/5 transition-colors"
                    >
                      <FiMapPin className="text-stone-400" />
                      Tech Arsenal & Stack
                    </Command.Item>
                  </Command.Group>

                  <Command.Group heading="Socials & Links" className="text-xs font-semibold text-stone-500 tracking-wider px-2 py-2 mt-2">
                    <Command.Item 
                        value="github source code"
                        onSelect={() => handleSelect(() => openLink('https://github.com/nitinvedi'))}
                        className="flex items-center gap-3 px-3 py-3 text-sm text-stone-700 dark:text-stone-300 rounded-xl cursor-pointer hover:bg-stone-100 dark:hover:bg-white/5 aria-selected:bg-stone-100 dark:aria-selected:bg-white/5 transition-colors"
                    >
                      <FiGithub className="text-stone-400" />
                      GitHub Profile
                    </Command.Item>
                    <Command.Item 
                        value="linkedin"
                        onSelect={() => handleSelect(() => openLink('https://www.linkedin.com/in/nitinvedi'))}
                        className="flex items-center gap-3 px-3 py-3 text-sm text-stone-700 dark:text-stone-300 rounded-xl cursor-pointer hover:bg-stone-100 dark:hover:bg-white/5 aria-selected:bg-stone-100 dark:aria-selected:bg-white/5 transition-colors"
                    >
                      <FiLinkedin className="text-stone-400" />
                      LinkedIn Profile
                    </Command.Item>
                    <Command.Item 
                        value="email contact"
                        onSelect={() => handleSelect(() => window.location.href = 'mailto:chaturvediinitin@gmail.com')}
                        className="flex items-center gap-3 px-3 py-3 text-sm text-stone-700 dark:text-stone-300 rounded-xl cursor-pointer hover:bg-stone-100 dark:hover:bg-white/5 aria-selected:bg-stone-100 dark:aria-selected:bg-white/5 transition-colors"
                    >
                      <FiMail className="text-stone-400" />
                      Send an Email
                    </Command.Item>
                  </Command.Group>

                  <Command.Group heading="Preferences" className="text-xs font-semibold text-stone-500 tracking-wider px-2 py-2 mt-2">
                    <Command.Item 
                        value="theme toggle dark light"
                        onSelect={() => handleSelect(toggleTheme)}
                        className="flex items-center gap-3 px-3 py-3 text-sm text-stone-700 dark:text-stone-300 rounded-xl cursor-pointer hover:bg-stone-100 dark:hover:bg-white/5 aria-selected:bg-stone-100 dark:aria-selected:bg-white/5 transition-colors"
                    >
                      {theme === 'dark' ? <FiMoon className="text-stone-400" /> : <FiSun className="text-stone-400" />}
                      Toggle Theme ({theme === 'dark' ? 'Light' : 'Dark'})
                    </Command.Item>
                  </Command.Group>

                </Command.List>
              </Command>
              
              {/* Footer */}
              <div className="bg-stone-50 dark:bg-black/50 border-t border-stone-100 dark:border-white/5 px-4 py-3 flex items-center justify-between">
                 <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase">Command Menu</span>
                 <div className="flex items-center gap-2 text-[10px] text-stone-500 font-mono">
                     <span>Use</span>
                     <kbd className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-white/10 rounded px-1.5 py-0.5">↑↓</kbd>
                     <span>to navigate</span>
                     <span>•</span>
                     <kbd className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-white/10 rounded px-1.5 py-0.5">↵</kbd>
                     <span>to select</span>
                 </div>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
