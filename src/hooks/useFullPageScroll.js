import { useEffect, useRef, useState } from 'react';

export default function useFullPageScroll(sectionIds, initialIndex = 0) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const locked = useRef(false);
  const currentIndexRef = useRef(initialIndex);
  const touchStartY = useRef(null);

  const goTo = (index, behavior = 'smooth') => {
    if (locked.current && behavior !== 'instant') return;
    if (index < 0 || index >= sectionIds.length) return;

    const el = document.getElementById(sectionIds[index]);
    if (!el) return;

    locked.current = true;
    currentIndexRef.current = index;
    setCurrentIndex(index);

    el.scrollIntoView({ behavior, block: 'start' });

    setTimeout(() => {
      locked.current = false;
    }, 1000);
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (locked.current) return;
      if (e.deltaY > 0) goTo(currentIndexRef.current + 1);
      else goTo(currentIndexRef.current - 1);
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (touchStartY.current === null || locked.current) return;
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;
      if (Math.abs(diff) < 40) return;
      if (diff > 0) goTo(currentIndexRef.current + 1);
      else goTo(currentIndexRef.current - 1);
    };

    const handleKeyDown = (e) => {
      // Allow default behavior for other keys
      if (['ArrowDown', 'PageDown', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        if (locked.current) return;
        
        if (['ArrowDown', 'PageDown'].includes(e.key)) {
          goTo(currentIndexRef.current + 1);
        } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
          goTo(currentIndexRef.current - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return { currentIndex, goTo };
}
