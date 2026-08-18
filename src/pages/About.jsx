import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Code2, Cpu } from 'lucide-react';
import { personalInfo, experiences, skillCategories } from '../data/portfolioData';
import CertificateCarousel from '../components/CertificateCarousel';
import ActivityList from '../components/ActivityModal';
import Sidebar from '../components/Sidebar';
import CTAAndFooter from '../components/CTAAndFooter';

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeSlideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const fadeSlideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about-who-am-i');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full bg-[#fafafa] text-zinc-800 min-h-screen">
      <Sidebar activeSection="about" />

      <main className="w-full">
        
        {/* Hero: Left text + Right FULL image (top-0 to bottom-0, edge-to-edge) */}
        <section className="relative min-h-screen w-full bg-[#fafafa] overflow-hidden">
          <div className="relative min-h-screen flex flex-col lg:flex-row">

            {/* Left Column: Title, subtitle, button */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-28 lg:py-20 z-10"
            >
              <div className="space-y-6 max-w-lg">
                <div className="space-y-3">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 font-sans leading-[1.05]">
                    About Me
                  </h1>
                  
                  {/* Double Line Underline */}
                  <div className="space-y-1.5 pt-2">
                    <div className="w-16 h-[3px] bg-zinc-900 rounded-full"></div>
                    <div className="w-10 h-[2px] bg-zinc-400 rounded-full"></div>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-sans">
                  A glimpse into my journey and what drives me forward.
                </p>

                <div className="pt-2">
                  <button
                    onClick={scrollToNextSection}
                    className="px-7 py-3.5 bg-[#242b38] hover:bg-zinc-900 text-white font-medium text-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Scroll Down
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Column: FULL edge-to-edge image */}
            <div className="w-full lg:w-1/2 h-[50vh] sm:h-[60vh] lg:h-auto lg:absolute lg:top-0 lg:right-0 lg:bottom-0">
              <motion.div
                layoutId="about-hero-image"
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full"
              >
                <img
                  src={personalInfo.aboutImage}
                  alt="Zacky About"
                  className="w-full h-full object-cover img-bw-hover"
                />
              </motion.div>
            </div>

          </div>
        </section>

        {/* Get to Know Me */}
        <section id="about-who-am-i" className="py-24 px-6 lg:px-16 bg-[#f4f4f6]/50 border-t border-zinc-200/60">
          <div className="max-w-5xl w-full mx-auto space-y-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeSlideUp}
              transition={{ duration: 0.7 }}
              className="bg-white p-8 sm:p-12 rounded-3xl border border-zinc-200/80 shadow-sm space-y-6"
            >
              <motion.h2
                variants={fadeSlideLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-zinc-900"
              >
                Get to Know Me
              </motion.h2>
              <motion.p
                variants={fadeSlideUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-zinc-600 leading-relaxed text-base text-justify"
              >
                {personalInfo.fullBio}
              </motion.p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100"
              >
                <motion.div
                  variants={staggerItem}
                  transition={{ duration: 0.5 }}
                  className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200"
                >
                  <span className="block text-xl font-bold text-zinc-900">Fresh Graduate</span>
                  <span className="text-xs font-mono text-zinc-500 uppercase mt-1 block">Informatics Engineering</span>
                </motion.div>
                <motion.div
                  variants={staggerItem}
                  transition={{ duration: 0.5 }}
                  className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200"
                >
                  <span className="block text-xl font-bold text-zinc-900">Passionate Learner</span>
                  <span className="text-xs font-mono text-zinc-500 uppercase mt-1 block">Tech Enthusiast</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Work Experience & Education */}
        <section className="py-24 px-6 lg:px-16 bg-white border-t border-zinc-200/60">
          <div className="max-w-6xl w-full mx-auto">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Work Experience Column */}
              <div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeSlideUp}
                  transition={{ duration: 0.6 }}
                  className="border-b border-zinc-200 pb-4 mb-10 flex items-center gap-3"
                >
                  <Briefcase className="w-7 h-7 text-zinc-800" />
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">Work Experience</h2>
                  </div>
                </motion.div>

                <div className="relative border-l-2 border-zinc-200 ml-4 space-y-8 pl-6">
                  {experiences.filter(exp => exp.type === 'work').map((exp, idx) => (
                    <motion.div
                      key={idx}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={fadeSlideLeft}
                      transition={{ duration: 0.6, delay: idx * 0.15 }}
                      className="relative group"
                    >
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-zinc-300 group-hover:bg-zinc-900 group-hover:scale-125 border-2 border-white shadow-sm transition-all duration-300"></div>

                      <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200/80 shadow-sm group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:border-zinc-300 transition-all duration-300">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-zinc-900 leading-tight">{exp.role}</h3>
                            <span className="text-sm font-semibold text-zinc-600 block mt-0.5">{exp.company}</span>
                          </div>
                          <span className="px-3 py-1 bg-white border border-zinc-200 rounded-full text-xs font-mono text-zinc-700 whitespace-nowrap self-start">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mt-3">
                          {exp.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Education Column */}
              <div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeSlideUp}
                  transition={{ duration: 0.6 }}
                  className="border-b border-zinc-200 pb-4 mb-10 flex items-center gap-3"
                >
                  <GraduationCap className="w-8 h-8 text-zinc-800" />
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">Education</h2>
                  </div>
                </motion.div>

                <div className="relative border-l-2 border-zinc-200 ml-4 space-y-8 pl-6">
                  {experiences.filter(exp => exp.type === 'education').map((exp, idx) => (
                    <motion.div
                      key={idx}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={fadeSlideLeft}
                      transition={{ duration: 0.6, delay: idx * 0.15 }}
                      className="relative group"
                    >
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-zinc-300 group-hover:bg-zinc-900 group-hover:scale-125 border-2 border-white shadow-sm transition-all duration-300"></div>

                      <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200/80 shadow-sm group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:border-zinc-300 transition-all duration-300">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-zinc-900 leading-tight">{exp.role}</h3>
                            <span className="text-sm font-semibold text-zinc-600 block mt-0.5">{exp.company}</span>
                          </div>
                          <span className="px-3 py-1 bg-white border border-zinc-200 rounded-full text-xs font-mono text-zinc-700 whitespace-nowrap self-start">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mt-3">
                          {exp.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Skills & Certifications */}
        <section className="py-24 px-6 lg:px-16 bg-[#f4f4f6]/50 border-t border-zinc-200/60">
          <div className="max-w-6xl w-full mx-auto">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeSlideUp}
              transition={{ duration: 0.6 }}
              className="border-b border-zinc-200 pb-4 mb-10 flex items-center gap-3"
            >
              <Cpu className="w-7 h-7 text-zinc-800" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">Skills & Expertise</h2>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {skillCategories.slice(0, 4).map((cat, idx) => (
                <motion.div
                  key={idx}
                  variants={staggerItem}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm hover:shadow-xl hover:border-zinc-300 transition-all duration-300 space-y-4"
                >
                  <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-zinc-900" />
                    <h3 className="text-lg font-bold text-zinc-900">{cat.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.1, backgroundColor: '#f4f4f5' }}
                        className="px-3 py-1.5 bg-zinc-100/80 rounded-lg text-xs font-semibold text-zinc-700 font-mono transition-colors duration-200 cursor-default border border-zinc-200/50 shadow-sm inline-block"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-24 px-6 lg:px-16 bg-white border-t border-zinc-200/60">
          <div className="max-w-6xl w-full mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeSlideUp}
              transition={{ duration: 0.7 }}
            >
              <CertificateCarousel />
            </motion.div>
          </div>
        </section>

        {/* Activities */}
        <section className="py-24 px-6 lg:px-16 bg-[#f4f4f6]/50 border-t border-zinc-200/60">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeSlideUp}
            transition={{ duration: 0.7 }}
            className="max-w-5xl w-full mx-auto"
          >
            <ActivityList />
          </motion.div>
        </section>

        <CTAAndFooter />
      </main>
    </div>
  );
}

