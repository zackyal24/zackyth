import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function HeroSection({ isActive, onContactClick }) {

  return (
    <section id="hero" className="snap-section w-full flex items-center justify-center pt-20 pb-12 px-6 lg:px-16 relative">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        
        {/* Text Content (Bottom on Mobile, Left on Desktop) */}
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -200 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 lg:space-y-6"
        >
          <h2 className="text-zinc-600 font-medium tracking-[0.4em] uppercase text-xs sm:text-sm lg:text-base mb-1">
            {personalInfo.fullName}
          </h2>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.15] lg:leading-[1.1] font-sans">
            Software Engineering <br className="hidden lg:inline" />
            <span className="text-zinc-500 font-normal">& Cloud Engineer</span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-zinc-600 leading-relaxed max-w-xl">
            {personalInfo.shortBio}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 lg:gap-4 pt-2">
            <a
              href={personalInfo.cvUrl}
              download
              className="px-6 py-3 lg:px-7 lg:py-3.5 bg-zinc-900 text-white font-medium text-xs lg:text-sm rounded-xl hover:bg-zinc-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 group"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              Download CV
            </a>

            <button
              onClick={onContactClick}
              className="px-6 py-3 lg:px-7 lg:py-3.5 bg-white border border-zinc-300 text-zinc-900 font-medium text-xs lg:text-sm rounded-xl hover:bg-zinc-100 transition-all duration-300 shadow-xs flex items-center gap-2 group cursor-pointer active:scale-95"
            >
              Contact Me
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Image (Top on Mobile, Right on Desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 200 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end mb-4 lg:mb-0"
        >
          <div className="relative group cursor-pointer">
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-80 lg:h-[420px] rounded-full lg:rounded-[50%] overflow-hidden border-4 border-white shadow-xl lg:shadow-2xl bg-zinc-200">
              <img
                src={personalInfo.avatar}
                alt={personalInfo.fullName}
                className="w-full h-full object-cover object-[center_15%] scale-[1.7] img-bw-hover group-hover:scale-[1.8] transition-transform duration-500"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

