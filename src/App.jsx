import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { motion, LayoutGroup } from 'framer-motion';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';

const scrollPositions = {};

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const location = useLocation();
  const navType = useNavigationType();
  const scrollRef = useRef(null);
  const pathnameRef = useRef(location.pathname);
  pathnameRef.current = location.pathname;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      // Use the ref to ensure we always write to the currently active pathname,
      // avoiding stale closures overwriting previous pathnames during transitions.
      scrollPositions[pathnameRef.current] = el.scrollTop;
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    // Restore scroll position only if there's no hash
    if (scrollRef.current) {
      if (!location.hash) {
        let savedPos = 0;
        // Only restore scroll memory if the user is explicitly going "Back" 
        // (either via browser back button 'POP' or our Navbar back button state)
        if (navType === 'POP' || location.state?.restoreScroll) {
          savedPos = scrollPositions[pathnameRef.current] || 0;
        } else {
          // Fresh navigation (e.g. clicking 'Explore Projects'): reset to top and clear memory
          scrollPositions[pathnameRef.current] = 0;
        }
        
        scrollRef.current.scrollTo({ top: savedPos, left: 0, behavior: 'instant' });
      }
    }
  }, [location.pathname, location.hash, location.state, navType]);

  return (
    <LayoutGroup>
      <motion.div 
        ref={scrollRef}
        layoutScroll
        className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden bg-[#fafafa] text-zinc-800 font-sans selection:bg-zinc-900 selection:text-white relative"
      >
        {/* Booting Preloader Screen */}
        {!loadingComplete && <Preloader onComplete={() => setLoadingComplete(true)} />}

        {/* Global Top Navbar */}
        <Navbar />

        {/* Router View */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </motion.div>
    </LayoutGroup>
  );
}

