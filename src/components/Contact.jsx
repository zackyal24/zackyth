import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Github, Linkedin, Instagram } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Contact() {
  const currentYear = new Date().getFullYear();

  return (
    <section id="contact" className="relative w-full bg-[#161a23] text-white pt-24 pb-12 px-6 lg:px-16 overflow-hidden">
      
      {/* Background aesthetic blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-b from-[#1e2330] to-transparent opacity-50 blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Main CTA Content */}
        <div className="flex flex-col items-center text-center space-y-8 mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeSlideUp}
            className="space-y-4 max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white font-sans leading-tight">
              Let's create something <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">amazing.</span>
            </h2>
            <p className="text-lg text-zinc-400 font-sans mt-6">
              I'm always open to discussing product design work, exciting new projects, or partnership opportunities.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeSlideUp}
            className="pt-8"
          >
            <a
              href={personalInfo.socials.email}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-zinc-900 rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]"
            >
              <div className="absolute inset-0 bg-zinc-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <Mail className="w-5 h-5 relative z-10" />
              <span className="relative z-10 font-sans tracking-wide">Say Hello</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Footer Area */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="border-t border-zinc-800 pt-8 mt-16 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tighter text-white">
              {personalInfo.shortName}
            </span>
            <span className="text-zinc-500">© {currentYear}</span>
          </div>

          <div className="flex gap-4">
            <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="p-3 bg-zinc-800/50 hover:bg-zinc-700 rounded-full text-zinc-300 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-zinc-800/50 hover:bg-zinc-700 rounded-full text-zinc-300 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={personalInfo.socials.instagram} target="_blank" rel="noreferrer" className="p-3 bg-zinc-800/50 hover:bg-zinc-700 rounded-full text-zinc-300 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          <div className="text-zinc-500 text-sm font-sans text-center md:text-right">
            Designed & Built with passion.<br/>
            All rights reserved.
          </div>
        </motion.div>

      </div>
    </section>
  );
}
