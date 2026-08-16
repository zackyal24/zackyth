import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';

export default function HamburgerMenu({ isOpen, onClose }) {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'My Projects', path: '/projects' },
    { name: 'Contact', path: '/#contact' },
  ];

  const handleLinkClick = () => {
    onClose();
  };

  const containerVariants = {
    hidden: { 
      clipPath: 'polygon(100% 0, 100% 0, 100% 0, 100% 0)',
    },
    visible: {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      transition: {
        duration: 0.25,
        ease: [0.76, 0, 0.24, 1],
        when: "beforeChildren",
        staggerChildren: 0.03,
      },
    },
    exit: {
      clipPath: 'polygon(100% 0, 100% 0, 100% 0, 100% 0)',
      transition: { 
        duration: 0.2, 
        ease: [0.76, 0, 0.24, 1],
        when: "afterChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-lg text-white flex flex-col px-6 lg:px-12 py-4 overflow-y-auto select-none"
        >
          {/* Header Row */}
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
            <Link
              to="/"
              onClick={onClose}
              className="text-lg sm:text-xl font-bold tracking-tight text-white hover:text-zinc-300 transition-colors font-sans"
            >
              {personalInfo.shortName}
            </Link>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl hover:bg-white/10 text-white transition-colors focus:outline-none flex justify-center items-center"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 stroke-[2]" />
            </button>
          </div>

          {/* Main Content: Just Centered Navigation Links */}
          <div className="w-full flex-grow flex items-center justify-center">
            <div className="space-y-8 flex flex-col items-center text-center">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div key={link.name} variants={itemVariants}>
                    <Link
                      to={link.path}
                      onClick={handleLinkClick}
                      className={`text-2xl sm:text-3xl font-semibold transition-all duration-300 inline-block hover:scale-105 ${
                        isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Empty div for flex-between balance */}
          <div></div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

