import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Sidebar from '../components/Sidebar';
import useFullPageScroll from '../hooks/useFullPageScroll';

const sectionIds = ['hero', 'about', 'projects', 'contact'];

export default function Home() {
  const { currentIndex, goTo } = useFullPageScroll(sectionIds);
  const location = useLocation();
  const activeSection = sectionIds[currentIndex] || 'hero';

  useEffect(() => {
    if (location.hash) {
      const hashId = location.hash.replace('#', '');
      const index = sectionIds.indexOf(hashId);
      if (index !== -1) {
        // Delay slightly so Framer Motion layouts settle before scrolling
        const timer = setTimeout(() => goTo(index), 100);
        return () => clearTimeout(timer);
      }
    }
  }, [location.hash]);

  useEffect(() => {
    const handleScrollToTop = () => goTo(0);
    window.addEventListener('scrollToTop', handleScrollToTop);
    return () => window.removeEventListener('scrollToTop', handleScrollToTop);
  }, [goTo]);

  const handleNavigate = (id) => {
    const index = sectionIds.indexOf(id);
    if (index !== -1) goTo(index);
  };

  return (
    <div className="relative w-full">
      <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />
      <main className="w-full">
        <HeroSection isActive={currentIndex === 0} onContactClick={() => goTo(3)} />
        <AboutSection isActive={currentIndex === 1} />
        <ProjectsSection isActive={currentIndex === 2} />
        <ContactSection isActive={currentIndex === 3} />
      </main>
    </div>
  );
}


