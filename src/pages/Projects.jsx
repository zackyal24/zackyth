import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { highlightProject, projectsList, personalInfo } from '../data/portfolioData';
import Sidebar from '../components/Sidebar';
import { GithubIcon } from '../components/SocialIcons';
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

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Web Development', 'Cloud Computing', 'Other'];

  const allProjectsList = [...projectsList].sort((a, b) => {
    return parseInt(b.year) - parseInt(a.year);
  });

  const filteredProjects = selectedCategory === 'All'
    ? allProjectsList
    : allProjectsList.filter(p => p.category === selectedCategory);

  const scrollToProjects = () => {
    const section = document.getElementById('projects-catalog');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full bg-[#fafafa] text-zinc-800 min-h-screen">
      <Sidebar activeSection="projects" />

      <main className="w-full">

        {/* Hero: Left text + Right FULL image */}
        <section className="relative min-h-screen w-full bg-[#fafafa] overflow-hidden">
          <div className="relative min-h-screen flex flex-col lg:flex-row">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeSlideLeft}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-28 lg:py-20 z-10"
            >
              <div className="space-y-6 max-w-lg">
                <div className="space-y-3">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 font-sans leading-[1.05]">
                    My Projects
                  </h1>
                  <div className="space-y-1.5 pt-2">
                    <div className="w-16 h-[3px] bg-zinc-900 rounded-full"></div>
                    <div className="w-10 h-[2px] bg-zinc-400 rounded-full"></div>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-sans">
                  Showcasing projects that highlight my journey.
                </p>

                <div className="pt-2">
                  <button
                    onClick={scrollToProjects}
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
                layoutId="projects-hero-image"
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full"
              >
                <img
                  src="/img/projects/hero-image.jpeg"
                  alt="My Projects Journey"
                  className="w-full h-full object-cover img-bw-hover"
                />
              </motion.div>
            </div>

          </div>
        </section>

        {/* Highlight Section (matching reference screenshot: dark card, 3 stacked images, portrait) */}
        <section id="projects-catalog" className="py-24 px-6 lg:px-16 bg-[#f4f4f6]/50 border-t border-zinc-200/60">
          <div className="max-w-6xl w-full mx-auto space-y-10">

            {/* Double line + "Highlight" title */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeSlideUp}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <div className="space-y-1.5">
                <div className="w-16 h-[3px] bg-zinc-900 rounded-full"></div>
                <div className="w-10 h-[2px] bg-zinc-400 rounded-full"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">Highlight</h2>
            </motion.div>

            {/* Highlight Card (Dark background like reference) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeSlideUp}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-[#1a1f2b] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                {/* Left: 3 Stacked Screenshot Images */}
                <div className="lg:col-span-6 flex items-center justify-center pt-4 lg:pt-0">
                  <div className="relative w-full max-w-[480px] h-[240px] sm:h-[300px] lg:h-[340px]">

                    {/* Image 1 (back-left, web, tilted) */}
                    <motion.div
                      initial={{ opacity: 0, rotate: -8, scale: 0.9, x: 20 }}
                      whileInView={{ opacity: 1, rotate: -6, scale: 1, x: 0 }}
                      whileHover={{ scale: 1.1, zIndex: 40, rotate: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5 }}
                      className="absolute top-1/2 -translate-y-1/2 left-0 w-[55%] aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer z-10 bg-[#f8f9fa] flex items-center justify-center p-2 sm:p-3"
                    >
                      <img
                        src={highlightProject.thumbnails[0]}
                        alt="Screenshot 1"
                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 rounded-sm sm:rounded-md shadow-sm"
                      />
                    </motion.div>

                    {/* Image 3 (back-right, web, tilted) */}
                    <motion.div
                      initial={{ opacity: 0, rotate: 8, scale: 0.9, x: -20 }}
                      whileInView={{ opacity: 1, rotate: 6, scale: 1, x: 0 }}
                      whileHover={{ scale: 1.1, zIndex: 40, rotate: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5 }}
                      className="absolute top-1/2 -translate-y-1/2 right-0 w-[55%] aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer z-10 bg-[#f8f9fa] flex items-center justify-center p-2 sm:p-3"
                    >
                      <img
                        src={highlightProject.thumbnails[1]}
                        alt="Screenshot 3"
                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 rounded-sm sm:rounded-md shadow-sm"
                      />
                    </motion.div>

                    {/* Image 2 (center-top, mobile, main focus) */}
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      whileHover={{ scale: 1.05, zIndex: 40, y: -10 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5 }}
                      className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-[95%] sm:h-[100%] aspect-[9/19] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[4px] sm:border-[8px] border-[#242b38] group cursor-pointer z-20 bg-white"
                    >
                      {/* Mobile Notch Mockup */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[12px] sm:h-[16px] bg-[#242b38] rounded-b-xl sm:rounded-b-2xl z-30 opacity-80" />
                      
                      <img
                        src={highlightProject.mainImage}
                        alt="Main Screenshot"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </motion.div>

                  </div>
                </div>

                {/* Right: Title, Description, Buttons */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeSlideRight}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="lg:col-span-6 space-y-5"
                >
                  <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {highlightProject.title}
                  </h3>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                    {highlightProject.description}
                  </p>

                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <Link
                      to={`/projects/${highlightProject.id}`}
                      className="px-6 py-3 bg-white text-zinc-900 font-semibold text-sm rounded-xl hover:bg-zinc-100 transition-colors shadow-md flex items-center gap-2"
                    >
                      More
                    </Link>
                    {highlightProject.liveUrl && (
                      <a
                        href={highlightProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 bg-transparent border border-white/30 text-white font-semibold text-sm rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"
                      >
                        Preview
                      </a>
                    )}
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </section>

        {/* Other Projects Grid */}
        <section className="py-24 px-6 lg:px-16 bg-white border-t border-zinc-200/60">
          <div className="max-w-6xl w-full mx-auto space-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeSlideUp}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <div className="w-16 h-[3px] bg-zinc-900 rounded-full"></div>
                <div className="w-10 h-[2px] bg-zinc-400 rounded-full"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">All Projects</h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeSlideUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap justify-center sm:justify-start gap-6 border-b border-zinc-200"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`pb-3 text-sm font-medium transition-colors relative ${selectedCategory === cat
                      ? 'text-zinc-900'
                      : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                >
                  {cat}
                  {selectedCategory === cat && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-900"></span>
                  )}
                </button>
              ))}
            </motion.div>
            {/* Staggered 2-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={fadeSlideUp}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className={idx % 2 !== 0 ? 'md:mt-16' : ''}
                >
                  <Link to={`/projects/${project.id}`}>
                    <div 
                      className="group relative rounded-2xl overflow-hidden aspect-video cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
                      onMouseEnter={(e) => {
                        const video = e.currentTarget.querySelector('video');
                        if (video) {
                          // Play promise handling to avoid abort errors
                          const playPromise = video.play();
                          if (playPromise !== undefined) {
                            playPromise.catch(() => {});
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        const video = e.currentTarget.querySelector('video');
                        if (video) {
                          video.pause();
                          video.currentTime = 0;
                        }
                      }}
                    >

                      {/* Ambient Blurred Background (always active) */}
                      <div className="absolute inset-0 overflow-hidden bg-zinc-900">
                        <img
                          src={project.previewMedia}
                          alt=""
                          className="w-full h-full object-cover blur-xl scale-125 opacity-50"
                        />
                      </div>

                      {/* Background static image */}
                      <img
                        src={project.previewMedia}
                        alt={project.title}
                        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${(project.previewGif || project.previewVideo) ? 'group-hover:opacity-0' : ''}`}
                      />

                      {/* Background GIF (plays when hovered) */}
                      {project.previewGif && (
                        <img
                          src={project.previewGif}
                          alt={`${project.title} animation`}
                          className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 object-contain"
                        />
                      )}

                      {/* Background Video (Hardware Accelerated) */}
                      {project.previewVideo && (
                        <video
                          src={project.previewVideo}
                          muted
                          loop
                          playsInline
                          className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 object-contain"
                        />
                      )}

                      {/* Dark overlay with text content */}
                      <div className="absolute inset-0 bg-[#1e2330]/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 sm:p-8 transition-opacity duration-500 group-hover:opacity-0 z-10">

                        {/* Year badge */}
                        <span className="absolute top-4 left-4 px-3 py-1 bg-white/15 text-white text-xs font-bold rounded-md border border-white/10">
                          {project.year}
                        </span>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5 line-clamp-3 max-w-sm">
                          {project.shortDesc}
                        </p>

                        {/* Tech stack pills */}
                        <div className="flex flex-wrap justify-center gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-white/10 text-zinc-200 text-[11px] font-medium rounded-full border border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTAAndFooter />
      </main>
    </div>
  );
}

