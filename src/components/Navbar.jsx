import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import HamburgerMenu from './HamburgerMenu';
import { personalInfo } from '../data/portfolioData';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isProjectDetail = location.pathname.startsWith('/projects/');
  
  let backToPath = '/';
  if (isProjectDetail) {
    backToPath = '/projects';
  } else if (location.pathname === '/about') {
    backToPath = '/#about';
  } else if (location.pathname === '/projects') {
    backToPath = '/#projects';
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 px-6 lg:px-12 py-4 transition-all duration-300 bg-[#fafafa]/80 backdrop-blur-md border-b border-zinc-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Side: Reserved space for chevron so text never shifts */}
          <Link
            to={isHome ? "/" : backToPath}
            state={{ restoreScroll: true }}
            onClick={() => {
              if (isHome) {
                window.dispatchEvent(new CustomEvent('scrollToTop'));
              }
            }}
            className="inline-flex items-center text-lg sm:text-xl font-medium tracking-tight text-zinc-900 hover:text-zinc-600 transition-colors font-sans"
          >
            <div className="w-5 h-5 flex items-center justify-center mr-1">
              {!isHome && <ChevronLeft className="w-5 h-5 -ml-2" />}
            </div>
            <span>{personalInfo.shortName}</span>
          </Link>

          {/* 2-Line Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2.5 rounded-xl hover:bg-zinc-200/40 transition-colors group focus:outline-none flex flex-col items-end gap-1.5 justify-center"
            aria-label="Open menu"
          >
            <span className="w-6 h-[2px] bg-zinc-900 rounded-full group-hover:w-6 transition-all duration-300"></span>
            <span className="w-4 h-[2px] bg-zinc-900 rounded-full group-hover:w-6 transition-all duration-300"></span>
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

