"use client"
import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PhotosLayout = ({ pictures }) => {
  const [isVisible, setIsVisible] = useState(Array(pictures.length).fill(false));
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const newVisibleStatus = pictures.map((picture, index) => {
        const el = document.getElementById(`image-${index}`);
        if (!el) return false;
        return el.offsetTop < scrollY + windowHeight;
      });

      setIsVisible(newVisibleStatus);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pictures]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i <= 0 ? pictures.length - 1 : i - 1));
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i >= pictures.length - 1 ? 0 : i + 1));
    };
    window.addEventListener('keydown', onKeyDown);
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo(0, scrollY);
    };
  }, [lightboxIndex, pictures.length, closeLightbox]);

  if (!pictures?.length) return null;

  const lightbox = (
    <AnimatePresence>
      {lightboxIndex !== null && (
        <motion.div
          className="fixed inset-0 z-[9999] flex min-h-screen min-w-full items-center justify-center bg-black"
          style={{ minHeight: '100dvh' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>

          <button
            type="button"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:left-4"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i <= 0 ? pictures.length - 1 : i - 1)); }}
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>

          <div
            className="flex min-h-0 flex-1 items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              key={lightboxIndex}
              className="flex h-full w-full items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={pictures[lightboxIndex].url}
                alt={`Gallery image ${lightboxIndex + 1} full size`}
                className="max-h-full max-w-full object-contain"
                style={{
                  maxHeight: 'min(calc(100dvh - 2rem), calc(100vh - 2rem))',
                  maxWidth: 'calc(100vw - 2rem)',
                }}
                draggable={false}
              />
            </motion.div>
          </div>

          <button
            type="button"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-4"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i >= pictures.length - 1 ? 0 : i + 1)); }}
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4">
        {pictures.map((picture, index) => (
          <motion.div
            key={index}
            id={`image-${index}`}
            className="cursor-pointer overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible[index] ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setLightboxIndex(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(index)}
            aria-label={`View image ${index + 1} full size`}
          >
            <img src={picture.url} loading="lazy" alt={`Gallery image ${index + 1}`} className="aspect-square w-full object-cover pointer-events-none select-none" />
          </motion.div>
        ))}
      </div>

      {mounted && typeof document !== 'undefined' && createPortal(lightbox, document.body)}
    </>
  );
};

export default PhotosLayout;
