import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { highlightProject, otherProjects, personalInfo } from '../data/portfolioData';
import Sidebar from '../components/Sidebar';
import { GithubIcon } from '../components/SocialIcons';

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

  const filteredProjects = selectedCategory === 'All'
    ? otherProjects
    : otherProjects.filter(p => p.category === selectedCategory);

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
                <div className="lg:col-span-6">
                  <div className="relative w-full h-[200px] sm:h-[240px] lg:h-[260px]">

                    {/* Image 1 (back-left, tilted) */}
                    <motion.div
                      initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
                      whileInView={{ opacity: 1, rotate: -6, scale: 1 }}
                      whileHover={{ scale: 1.15, zIndex: 40 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5 }}
                      className="absolute top-3 left-0 w-[65%] h-[85%] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer z-10"
                    >
                      <img
                        src={highlightProject.thumbnails[0]}
                        alt="Screenshot 1"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </motion.div>

                    {/* Image 2 (center-top, main focus) */}
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      whileHover={{ scale: 1.15, zIndex: 40 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5 }}
                      className="absolute top-0 left-[15%] w-[75%] h-[95%] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer z-20"
                    >
                      <img
                        src={highlightProject.mainImage}
                        alt="Main Screenshot"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </motion.div>

                    {/* Image 3 (back-right, tilted) */}
                    <motion.div
                      initial={{ opacity: 0, rotate: 8, scale: 0.9 }}
                      whileInView={{ opacity: 1, rotate: 4, scale: 1 }}
                      whileHover={{ scale: 1.15, zIndex: 40 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5 }}
                      className="absolute top-5 right-0 w-[55%] h-[80%] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer z-10"
                    >
                      <img
                        src={highlightProject.thumbnails[1]}
                        alt="Screenshot 3"
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
                    <div className="group relative rounded-2xl overflow-hidden aspect-[16/10] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">

                      {/* Background preview image */}
                      <img
                        src={project.previewMedia}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />

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

      </main>
    </div>
  );
}

