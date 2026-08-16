import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, X, Maximize2, Info } from 'lucide-react';
import { activities } from '../data/portfolioData';

// Muted pastel colors for the activity containers
const bgColors = [
  'bg-slate-200',
  'bg-green-100',
  'bg-amber-100',
  'bg-blue-100',
  'bg-rose-100'
];

// Inner component for each stacked card to handle its own scroll-linked animations
const ActivityCard = ({ index, scrollY, vh, act, bgColor, showDetails, toggleDetails, setDetailsId, featuredId }) => {
  // The 'covering' phase for this card is when the NEXT card scrolls up over it.
  // Next card starts entering from the bottom when scrollY = index * vh
  // Next card fully covers this card when scrollY = (index + 1) * vh
  const startCover = index * vh;
  const endCover = (index + 1) * vh;

  // Animate scale down (peek) and fade out (crossfade) during the covering phase
  const scale = useTransform(scrollY, [startCover, endCover], [1, 0.85]);
  const opacity = useTransform(scrollY, [startCover, endCover], [1, 0]);
  const y = useTransform(scrollY, [startCover, endCover], [0, 50]);

  return (
    <motion.div 
      style={{ scale, opacity, y }}
      layoutId={act.id === featuredId ? "hero-trigger" : undefined}
      onClick={(e) => toggleDetails(act.id, e)}
      className={`relative w-full max-w-lg aspect-square rounded-[2.5rem] p-4 sm:p-6 cursor-pointer shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] transition-shadow duration-500 overflow-hidden flex-shrink-0 ${bgColor}`}
    >
      {/* Image Layer */}
      <div className={`w-full h-full transition-all duration-700 ease-in-out ${showDetails ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <img
          src={act.image}
          alt={act.title}
          className="w-full h-full object-cover rounded-2xl shadow-xl"
        />
      </div>

      {/* Title text at bottom left (no background, sharp drop shadow) */}
      {!showDetails && (
        <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 flex flex-col items-start z-20 pointer-events-none">
          <span 
            className="text-base sm:text-lg lg:text-xl font-medium text-white max-w-[250px] sm:max-w-[300px] leading-snug tracking-wide"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.5)' }}
          >
            {act.title}
          </span>
        </div>
      )}

      {/* Details Overlay (Crossfades in on click) */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-white z-10 flex flex-col justify-center px-6 sm:px-10 py-8 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setDetailsId(null); }} 
          >
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4 block">
              {act.date}
            </span>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 leading-tight mb-6">
              {act.title}
            </h4>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed overflow-y-auto no-scrollbar">
              {act.fullDetails}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function ActivityList() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [detailsId, setDetailsId] = useState(null);
  const [activeId, setActiveId] = useState(activities[0].id);
  const [vh, setVh] = useState(1000);
  const scrollRef = useRef(null);

  const featured = activities[0];

  useEffect(() => {
    // Track viewport height for accurate scroll progress calculations
    setVh(window.innerHeight);
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', handleResize);
    
    if (isGalleryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
    };
  }, [isGalleryOpen]);

  const toggleDetails = (id, e) => {
    if (e) e.stopPropagation();
    setDetailsId(detailsId === id ? null : id);
  };

  const toggleActiveDetails = () => {
    setDetailsId(detailsId === activeId ? null : activeId);
  };

  const { scrollY } = useScroll({ container: scrollRef });

  // Highly performant scroll tracking using pure math
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const currentScroll = scrollRef.current.scrollTop;
    
    // Use Math.round so the active card switches as soon as it takes up >50% of the screen
    const activeIndex = Math.round(currentScroll / vh);
    const clampedIndex = Math.min(Math.max(activeIndex, 0), activities.length - 1);
    
    const newActiveId = activities[clampedIndex].id;
    if (newActiveId !== activeId) {
      setActiveId(newActiveId);
    }
  };

  return (
    <>
      {/* ================================================================= */}
      {/* MAIN PAGE (HERO VIEW)                                             */}
      {/* ================================================================= */}
      <div className="relative">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          <div className="w-full lg:w-1/2">
            <h3 className="text-4xl lg:text-5xl font-extrabold text-zinc-900 leading-[1.1] tracking-tight">
              My Activity
            </h3>
            <p className="text-lg text-zinc-500 mt-6 leading-relaxed font-sans max-w-md">
              A collection of my recent activities and creative explorations. Discover what I've been up to lately.
            </p>

            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => setIsGalleryOpen(true)}
              className="mt-10 inline-flex items-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-zinc-800 transition-colors shadow-lg hover:shadow-xl"
            >
              <span>Explore Activity Gallery</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="w-full lg:w-1/2">
            <motion.div
              layoutId="hero-trigger"
              onClick={() => setIsGalleryOpen(true)}
              className="relative w-full aspect-square sm:aspect-[4/3] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 bg-slate-200 group flex items-center justify-center p-8 sm:p-12"
            >
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 right-6 bg-white/50 backdrop-blur-md p-3 rounded-full text-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-5 h-5" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* FULL-SCREEN STACKED GALLERY OVERLAY                               */}
      {/* ================================================================= */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-white overflow-hidden"
          >
            {/* 1. FIXED UI LAYER */}
            <div className="absolute inset-0 z-20 pointer-events-none flex flex-col lg:flex-row">
              
              <div className="w-full lg:w-5/12 p-6 sm:p-8 lg:pl-24 xl:pl-32 flex flex-col justify-center h-auto lg:h-full bg-white/90 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none">
                
                <div className="flex flex-col gap-6 pointer-events-auto mt-[10vh] lg:mt-0 max-w-md">
                  {/* Title Row (Mobile Info Button attached here) */}
                  <div className="flex items-center justify-between w-full lg:w-auto">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 leading-[1.1] tracking-tight drop-shadow-sm whitespace-nowrap">
                      Activity Gallery
                    </h3>
                    {/* Only visible on mobile, since on desktop it moves to the right column */}
                    <button 
                      onClick={toggleActiveDetails}
                      className={`lg:hidden cursor-pointer p-3.5 rounded-full transition-all duration-300 border shadow-md flex-shrink-0 ${
                        detailsId === activeId 
                          ? 'bg-zinc-900 border-zinc-900 text-white scale-110' 
                          : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                      }`}
                      aria-label="Toggle Details"
                    >
                      <Info className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Additional Description */}
                  <p className="text-sm sm:text-base lg:text-lg text-zinc-500 leading-relaxed hidden lg:block">
                    A curated collection of my recent activities and experiences. <br className="hidden xl:block" />
                    <span className="font-semibold text-zinc-700">Scroll to explore</span>, and <span className="font-semibold text-zinc-700">click on any image</span> to view its full details.
                  </p>
                </div>

                {/* Mobile Close Button */}
                <button
                  onClick={() => setIsGalleryOpen(false)}
                  className="lg:hidden pointer-events-auto mt-6 p-3 bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-700 transition-colors shadow-sm self-start cursor-pointer"
                  aria-label="Close Gallery"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Fixed Desktop Info Button - Centered in Right Column but Translated Left to sit next to the Image Box */}
              <div className="hidden lg:flex w-7/12 h-full items-center justify-center pointer-events-none">
                <button 
                  onClick={toggleActiveDetails}
                  className={`cursor-pointer pointer-events-auto p-4 rounded-full transition-all duration-300 border shadow-xl flex-shrink-0 -translate-x-[310px] xl:-translate-x-[330px] ${
                    detailsId === activeId 
                      ? 'bg-zinc-900 border-zinc-900 text-white scale-110' 
                      : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                  }`}
                  aria-label="Toggle Details"
                >
                  <Info className="w-6 h-6" />
                </button>
              </div>

              {/* Desktop Close Button */}
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="hidden lg:block absolute top-10 right-10 pointer-events-auto p-4 bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-700 transition-colors shadow-md cursor-pointer"
                aria-label="Close Gallery"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* 2. STACKED CAROUSEL SCROLL CONTAINER */}
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="absolute inset-0 w-full h-full overflow-y-auto no-scrollbar z-10 scroll-smooth"
            >
              {/* The native scroll space. We don't need gaps because position sticky handles the layout */}
              <div className="w-full relative">
                {activities.map((act, index) => (
                  // Each item takes 100vh. When scrolled, it sticks to top.
                  <div key={act.id} className={`w-full h-[100vh] sticky top-0 flex flex-col lg:flex-row ${detailsId === act.id ? 'z-50' : 'z-10'}`}>
                    
                    {/* Left padding/spacer */}
                    <div className="hidden lg:block w-5/12" />
                    
                    {/* Right column for the card - Centered so it's not too far right */}
                    <div className="w-full lg:w-7/12 h-full flex items-center justify-center p-6 pt-[12vh] lg:pt-6">
                      
                      <ActivityCard 
                        index={index}
                        scrollY={scrollY}
                        vh={vh}
                        act={act}
                        bgColor={bgColors[index % bgColors.length]}
                        showDetails={detailsId === act.id}
                        toggleDetails={toggleDetails}
                        setDetailsId={setDetailsId}
                        featuredId={featured.id}
                      />

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
