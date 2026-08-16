import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';

export default function AboutSection({ isActive }) {
  return (
    <section id="about" className="snap-section min-h-screen w-full flex items-center justify-center py-20 px-6 lg:px-16 bg-[#fafafa]">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Title, Underline, Description, Button */}
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -200 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-6"
        >
          {/* Main Title & Double Line Underline */}
          <div className="space-y-3">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 font-sans">
              About Me
            </h2>
            
            {/* Double Line Underline Decoration */}
            <div className="space-y-1 pt-1">
              <div className="w-16 h-[3px] bg-zinc-900 rounded-full"></div>
              <div className="w-10 h-[2px] bg-zinc-400 rounded-full"></div>
            </div>
          </div>

          {/* Subtitle / Description */}
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-sans max-w-md">
            A glimpse into my journey and what drives me forward.
          </p>

          {/* Action Button */}
          <div className="pt-2">
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-7 py-3 bg-[#242b38] hover:bg-zinc-900 text-white font-medium text-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg group"
            >
              <span>More About Me</span>
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Photo Frame with shared layoutId */}
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 200 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="lg:col-span-6 flex justify-center lg:justify-end"
        >
          <Link to="/about" className="block relative group cursor-pointer w-full max-w-md">
            <motion.div
              layoutId="about-hero-image"
              className="relative w-full aspect-[4/3] sm:aspect-[1/1] rounded-2xl overflow-hidden shadow-xl bg-zinc-200 border border-zinc-200"
            >
              <img
                src={personalInfo.aboutImage}
                alt="Zacky About"
                className="w-full h-full object-cover img-bw-hover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

