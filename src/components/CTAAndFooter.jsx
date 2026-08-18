import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTAAndFooter() {
  return (
    <footer className="w-full bg-[#fafafa] border-t border-zinc-200/50 mt-12 lg:mt-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-16 py-20 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 font-sans mb-6">
          Let's build something great
        </h2>
        <p className="text-base sm:text-lg text-zinc-600 mb-8 leading-relaxed max-w-xl mx-auto [text-wrap:balance]">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Let's make it happen.
        </p>
        <Link
          to="/#contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#242b38] hover:bg-zinc-900 text-white font-medium text-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg group"
        >
          Get In Touch
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      <div className="py-8 border-t border-zinc-200/50 flex justify-center">
        <p className="text-sm text-zinc-500 font-medium font-sans">
          &copy; 2026 - Zackyth
        </p>
      </div>
    </footer>
  );
}
