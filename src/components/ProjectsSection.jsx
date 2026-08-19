import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';

export default function ProjectsSection({ isActive }) {
  return (
    <section id="projects" className="snap-section min-h-screen w-full flex items-center justify-center py-20 px-6 lg:px-16 bg-[#fafafa]">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -200 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 lg:order-1 lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 lg:space-y-6"
        >
          <div className="space-y-3 flex flex-col items-center lg:items-start">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-zinc-900 font-sans">
              My Projects
            </h2>

            {/* Double Line Underline Decoration */}
            <div className="space-y-1 pt-1 flex flex-col items-center lg:items-start">
              <div className="w-16 h-[3px] bg-zinc-900 rounded-full"></div>
              <div className="w-10 h-[2px] bg-zinc-400 rounded-full"></div>
            </div>
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-zinc-600 leading-relaxed font-sans max-w-md">
            Showcasing projects that highlight my journey.
          </p>

          <div className="pt-2">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-6 py-3 lg:px-7 lg:py-3.5 bg-[#242b38] hover:bg-zinc-900 text-white font-medium text-xs lg:text-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg group"
            >
              <span>Explore Projects</span>
            </Link>
          </div>
        </motion.div>

        {/* Featured Photo Frame with shared layoutId */}
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 200 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="order-1 lg:order-2 lg:col-span-6 flex justify-center lg:justify-end mb-6 lg:mb-0"
        >
          <Link to="/projects" className="block relative group cursor-pointer w-full max-w-md">
            <motion.div
              layoutId="projects-hero-image"
              className="relative w-full aspect-[4/3] sm:aspect-[1/1] rounded-2xl overflow-hidden shadow-xl bg-zinc-200 border border-zinc-200"
            >
              <img
                src={personalInfo.projectsImage}
                alt="My Projects"
                className="w-full h-full object-cover img-bw-hover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

