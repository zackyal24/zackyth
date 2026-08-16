import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 900);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const panelExit = (direction) => ({
    y: direction === 'top' ? '-100%' : '100%',
    transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Top Panel */}
          <motion.div
            initial={{ y: 0 }}
            exit={panelExit('top')}
            className="fixed inset-x-0 top-0 z-50 h-1/2 bg-[#fafafa] flex flex-col items-center justify-end pb-6"
          >
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="text-[10px] font-mono tracking-[0.4em] text-zinc-400 uppercase mb-3"
            >
              Portfolio
            </motion.p>
          </motion.div>

          {/* Bottom Panel */}
          <motion.div
            initial={{ y: 0 }}
            exit={panelExit('bottom')}
            className="fixed inset-x-0 bottom-0 z-50 h-1/2 bg-[#fafafa] flex flex-col items-center justify-start pt-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
              className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 font-sans"
            >
              Ahmad Zacky Taufiqul Hakim
            </motion.h1>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

