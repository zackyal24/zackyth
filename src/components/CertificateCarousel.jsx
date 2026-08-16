import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award, X, ExternalLink } from 'lucide-react';
import { certifications } from '../data/portfolioData';

export default function CertificateCarousel() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);

  // Zoom feature states
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });
  const containerRef = useRef(null);

  // Reset zoom when selecting a new cert or closing
  useEffect(() => {
    if (!selectedCert) {
      setIsZoomed(false);
    }
  }, [selectedCert]);

  const handleMouseMove = (e) => {
    if (!isZoomed || !containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x: `${x}%`, y: `${y}%` });
  };

  const handleImageClick = (e) => {
    if (!isZoomed) {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePos({ x: `${x}%`, y: `${y}%` });
      }
      setIsZoomed(true);
    } else {
      setIsZoomed(false);
    }
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // Use > 10 to account for fractional pixels and bounce effects
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-200 pb-4 mb-6 flex items-center gap-3">
        <Award className="w-7 h-7 text-zinc-800" />
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900">Certifications</h3>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative group flex justify-center w-full">
        
        {/* Floating Left Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-zinc-100 text-zinc-800 hover:scale-110 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hidden sm:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Floating Right Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-zinc-100 text-zinc-800 hover:scale-110 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hidden sm:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Horizontal Scroll Track */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto no-scrollbar py-8 snap-x snap-mandatory px-2 items-center max-w-full"
        >
        {certifications.map((cert) => (
          <motion.div
            key={cert.id}
            whileHover={{ 
              scale: 1.15,
              y: -15,
              zIndex: 30,
              transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            className="snap-start w-[250px] h-[400px] bg-white border border-zinc-200 rounded-[2rem] shadow-md hover:shadow-2xl flex flex-col flex-shrink-0 group overflow-hidden cursor-pointer relative"
            onClick={() => setSelectedCert(cert)}
          >
            {/* Full Image */}
            <div className="relative flex-1 w-full bg-zinc-100 overflow-hidden">
              <img
                src={cert.badgeUrl}
                alt={cert.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Title Section */}
            <div className="p-6 bg-white border-t border-zinc-100 min-h-[110px] flex flex-col justify-center">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 font-mono">
                ISSUED {cert.year}
              </span>
              <h4 className="text-base font-bold text-zinc-900 leading-snug line-clamp-3">
                {cert.title}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/80 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[420px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-full shadow-sm transition-colors focus:outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div 
                ref={containerRef}
                className={`w-full h-[360px] sm:h-[400px] bg-zinc-100 relative overflow-hidden flex-shrink-0 select-none ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                onMouseMove={handleMouseMove}
                onClick={handleImageClick}
              >
                <img 
                  src={selectedCert.badgeUrl} 
                  alt={selectedCert.title} 
                  className="w-full h-full object-cover transition-transform duration-300 ease-out" 
                  style={{
                    transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
                    transformOrigin: `${mousePos.x} ${mousePos.y}`
                  }}
                  draggable="false"
                />
              </div>

              <div className="w-full p-6 sm:p-8 flex flex-col items-center text-center bg-white relative">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 font-mono">
                  {selectedCert.issuer} • {selectedCert.year}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 leading-tight mb-6">
                  {selectedCert.title}
                </h3>
                
                <a
                  href={selectedCert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#242b38] hover:bg-zinc-900 text-white rounded-xl text-sm font-medium transition-colors w-full shadow-sm hover:shadow-md"
                >
                  Verify Credential
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

