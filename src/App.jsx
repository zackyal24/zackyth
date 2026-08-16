import React, { useState, useLayoutEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, LayoutGroup } from 'framer-motion';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const location = useLocation();
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    // Reset scroll on the scrollable container only if there's no hash
    if (scrollRef.current) {
      if (!location.hash) {
        scrollRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    }
  }, [location.pathname, location.hash]);

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

