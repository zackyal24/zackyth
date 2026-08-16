import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, Layers, Code, Image as ImageIcon } from 'lucide-react';
import { highlightProject, otherProjects } from '../data/portfolioData';
import Sidebar from '../components/Sidebar';
import { GithubIcon } from '../components/SocialIcons';


export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find matching project
  const allProjects = [highlightProject, ...otherProjects];
  const project = allProjects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] p-6 text-center">
        <h1 className="text-3xl font-bold text-zinc-900 mb-4">Project Not Found</h1>
        <p className="text-zinc-600 mb-6">The project you are looking for does not exist or has been moved.</p>
        <Link to="/projects" className="px-6 py-3 bg-zinc-900 text-white rounded-xl text-sm font-medium">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-20 px-6 lg:px-16 text-zinc-800">
      <Sidebar activeSection="projects" />

      <div className="max-w-4xl mx-auto space-y-12">
        


        {/* Editorial Header Section (2 Columns) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-12"
        >
          {/* Left Column: Metadata */}
          <div className="md:col-span-4 space-y-8">
            <div>
              <h4 className="text-xs font-mono tracking-[0.25em] text-zinc-400 mb-2 uppercase">Project</h4>
              <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900">{project.title}</h1>
            </div>

            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-mono tracking-[0.25em] text-zinc-400 mb-2 uppercase">Technology</h4>
                <p className="text-[15px] text-zinc-700 font-medium leading-relaxed">
                  {project.technologies.join(', ')}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono tracking-[0.25em] text-zinc-400 mb-2 uppercase">Year</h4>
                <p className="text-[15px] text-zinc-700 font-medium">{project.year}</p>
              </div>

              {project.liveUrl && (
                <div>
                  <h4 className="text-xs font-mono tracking-[0.25em] text-zinc-400 mb-2 uppercase">Preview</h4>
                  <div className="flex flex-col gap-3">
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[15px] text-zinc-900 font-medium hover:text-zinc-500 transition-colors group">
                      Live Preview <ExternalLink className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              )}

              {project.githubUrl && (
                <div>
                  <h4 className="text-xs font-mono tracking-[0.25em] text-zinc-400 mb-2 uppercase">Source Code</h4>
                  <div className="flex flex-col gap-3">
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[15px] text-zinc-900 font-medium hover:text-zinc-500 transition-colors group">
                      Github <GithubIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Description */}
          <div className="md:col-span-8">
            <h4 className="text-xs font-mono tracking-[0.25em] text-zinc-400 mb-4 uppercase">Description</h4>
            <div className="text-[15px] text-zinc-500 leading-[1.8] space-y-6 whitespace-pre-line font-sans">
              {project.fullDescription || project.description}
            </div>
          </div>
        </motion.div>

        {/* Gallery / Images Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 pt-10 border-t border-zinc-200"
        >
          {/* Main Banner Image */}
          <div className="rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-100">
            <img
              src={project.mainImage || project.previewMedia}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Documentation Gallery Photos */}
          {project.documentationPhotos && project.documentationPhotos.map((photo, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-100"
            >
              <img
                src={photo}
                alt={`Documentation ${idx + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}

