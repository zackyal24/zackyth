import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, Send, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, DiscordIcon, InstagramIcon } from './SocialIcons';

export default function ContactSection({ isActive }) {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  const socialButtons = [
    { name: 'Email', icon: Mail, href: `mailto:${personalInfo.email}`, color: 'hover:bg-red-50 hover:text-red-600 hover:border-red-200' },
    { name: 'LinkedIn', icon: LinkedinIcon, href: personalInfo.socials.linkedin, color: 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200' },
    { name: 'GitHub', icon: GithubIcon, href: personalInfo.socials.github, color: 'hover:bg-zinc-100 hover:text-zinc-950 hover:border-zinc-300' },
    { name: 'Discord', icon: DiscordIcon, href: personalInfo.socials.discord, color: 'hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200' },
    { name: 'Instagram', icon: InstagramIcon, href: personalInfo.socials.instagram, color: 'hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200' },
  ];

  return (
    <section id="contact" className="snap-section min-h-screen w-full flex items-center justify-center py-20 px-6 lg:px-16 bg-[#fafafa] relative">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column sliding from Left */}
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -200 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-6"
        >
          <div className="space-y-3">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 font-sans">
              Get In Touch
            </h2>
            
            <div className="space-y-1 pt-1">
              <div className="w-16 h-[3px] bg-zinc-900 rounded-full"></div>
              <div className="w-10 h-[2px] bg-zinc-400 rounded-full"></div>
            </div>
          </div>

          <p className="text-base text-zinc-600 leading-relaxed max-w-lg">
            Whether you are looking to build a modern scalable web platform, architect cloud infrastructure, or discuss potential engineering opportunities, feel free to reach out directly.
          </p>

          <div className="pt-2">
            <div className="inline-flex items-center gap-3 p-2 pl-4 bg-white border border-zinc-300/80 rounded-2xl shadow-sm hover:border-zinc-400 transition-colors">
              <Mail className="w-4 h-4 text-zinc-500" />
              <span className="text-sm font-semibold font-mono text-zinc-800">
                {personalInfo.email}
              </span>
              <button
                onClick={handleCopyEmail}
                className="p-2 bg-zinc-100 hover:bg-zinc-200 rounded-xl text-zinc-700 transition-colors text-xs flex items-center gap-1 font-sans"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-3">
              DIRECT CHANNELS
            </p>
            <div className="flex flex-wrap gap-3">
              {socialButtons.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-medium text-zinc-700 transition-all duration-200 flex items-center gap-2 shadow-xs ${social.color}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Right Column sliding from Right */}
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 200 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <div className="bg-white p-8 rounded-3xl border border-zinc-200/80 shadow-xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Send me a direct message</h3>
            <p className="text-xs text-zinc-500 mb-6">I usually respond within 24 hours.</p>

            {formSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-center font-medium">
                Thank you! Your message has been sent successfully.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-600 mb-1">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-zinc-800 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-600 mb-1">YOUR EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@example.com"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-zinc-800 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-600 mb-1">MESSAGE</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project or inquiry..."
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-zinc-800 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-zinc-900 text-white font-medium text-sm rounded-xl hover:bg-zinc-800 transition-colors shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

