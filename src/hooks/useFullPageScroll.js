import { useEffect, useRef, useState } from 'react';

export default function useFullPageScroll(sectionIds) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const locked = useRef(false);
  const currentIndexRef = useRef(0);
  const touchStartY = useRef(null);

  const goTo = (index) => {
    if (locked.current) return;
    if (index < 0 || index >= sectionIds.length) return;

    const el = document.getElementById(sectionIds[index]);
    if (!el) return;

    locked.current = true;
    currentIndexRef.current = index;
    setCurrentIndex(index);

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });

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

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return { currentIndex, goTo };
}
