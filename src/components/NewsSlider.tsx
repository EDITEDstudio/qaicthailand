/**
 * NewsSlider — Full-width hero image slideshow
 * Images from /public/news-slide/
 * Auto-advances every 10 seconds
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    src: '/news-slide/General Principles of Food Hygiene- Good Hygiene Practices (GHPs) and the Hazard Analysis and Critical Control Point (HACCP) System (GHPs:HACCP) (CXC1-1969), Revised in 2022.jpeg',
    alt: 'GHP/HACCP - General Principles of Food Hygiene (CXC1-1969)',
    label: 'GHP / HACCP',
  },
  {
    src: '/news-slide/มกษ.4403-2553 - การปฏิบัติที่ดีสำหรับโรงสีข้าว.jpg',
    alt: 'มกษ.4403-2553 การปฏิบัติที่ดีสำหรับโรงสีข้าว',
    label: 'มกษ.4403-2553',
  },
  {
    src: '/news-slide/มกษ.6401-2558 - การปฏิบัติที่ดีสําหรับศูนย์รวบรวมน้ํานมดิบ.jpeg',
    alt: 'มกษ.6401-2558 การปฏิบัติที่ดีสำหรับศูนย์รวบรวมน้ำนมดิบ',
    label: 'มกษ.6401-2558',
  },
  {
    src: '/news-slide/มกษ.6406-2550 - หลักเกณฑ์การปฏิบัติด้านสุขลักษณะสำหรับน้ำนมและผลิตภัณฑ์นม เล่ม 1 (หลักการทั่วไป).jpeg',
    alt: 'มกษ.6406-2550 หลักเกณฑ์การปฏิบัติด้านสุขลักษณะสำหรับน้ำนม เล่ม 1',
    label: 'มกษ.6406-2550',
  },
  {
    src: '/news-slide/มกษ.6407-2551 - หลักปฏิบัติเกี่ยวกับสุขลักษณะสําหรับน้ํานมและผลิตภัณฑ์ เล่ม 2.jpeg',
    alt: 'มกษ.6407-2551 หลักปฏิบัติเกี่ยวกับสุขลักษณะสำหรับน้ำนม เล่ม 2',
    label: 'มกษ.6407-2551',
  },
  {
    src: '/news-slide/มกษ.7410-2554 - หลักปฏิบัติสําหรับสัตว์น้ําและผลิตภัณฑ์สัตว์น้ํา (เล่ม 1 - ข้อกําหนดทั่วไป).jpeg',
    alt: 'มกษ.7410-2554 หลักปฏิบัติสำหรับสัตว์น้ำและผลิตภัณฑ์สัตว์น้ำ เล่ม 1',
    label: 'มกษ.7410-2554',
  },
  {
    src: '/news-slide/มกษ.7414-2551 - หลักปฏิบัติสําหรับสัตว์น้ําและผลิตภัณฑ์สัตว์น้ํา เล่ม 3.jpeg',
    alt: 'มกษ.7414-2551 หลักปฏิบัติสำหรับสัตว์น้ำ เล่ม 3',
    label: 'มกษ.7414-2551',
  },
  {
    src: '/news-slide/มกษ.7420-2552 - การปฏิบัติที่ดีด้านสุขลักษณะสําหรับการแปรรูปสัตว์น้ําเบื้องต้น.jpeg',
    alt: 'มกษ.7420-2552 การปฏิบัติที่ดีสำหรับการแปรรูปสัตว์น้ำเบื้องต้น',
    label: 'มกษ.7420-2552',
  },
  {
    src: '/news-slide/มกษ.9023-2564 - หลักการทั่วไปด้านสุขลักษณะอาหาร- การปฏิบัติทางสุขลักษณะที่ดี .jpeg',
    alt: 'มกษ.9023-2564 หลักการทั่วไปด้านสุขลักษณะอาหาร',
    label: 'มกษ.9023-2564',
  },
  {
    src: '/news-slide/มกษ.9024-2564 - ระบบการวิเคราะห์อันตรายและจุดวิกฤตที่ต้องควบคุมและแนวทางการนำไปใช้.jpeg',
    alt: 'มกษ.9024-2564 ระบบ HACCP และแนวทางการนำไปใช้',
    label: 'มกษ.9024-2564',
  },
  {
    src: '/news-slide/มกษ.9035-2563 - การปฏิบัติที่ดีสําหรับโรงคัดบรรจุผักและผลไม้สด.jpeg',
    alt: 'มกษ.9035-2563 การปฏิบัติที่ดีสำหรับโรงคัดบรรจุผักและผลไม้สด',
    label: 'มกษ.9035-2563',
  },
  {
    src: '/news-slide/มกษ.9039-2556 - การปฏิบัติที่ดีสําหรับการผลิตผักและผลไม้สดตัดแต่งพร้อมบริโภค.jpeg',
    alt: 'มกษ.9039-2556 การปฏิบัติที่ดีสำหรับผักและผลไม้สดตัดแต่งพร้อมบริโภค',
    label: 'มกษ.9039-2556',
  },
  {
    src: '/news-slide/มกษ.9041-2557 - หลักปฏิบัติสําหรับการผลิตสินค้าเกษตรแช่เยือกแข็ง.jpeg',
    alt: 'มกษ.9041-2557 หลักปฏิบัติสำหรับการผลิตสินค้าเกษตรแช่เยือกแข็ง',
    label: 'มกษ.9041-2557',
  },
  {
    src: '/news-slide/มกษ.9046-2560 - การปฏิบัติสําหรับการผลิตทุเรียนแช่เยือกแข็ง.jpeg',
    alt: 'มกษ.9046-2560 การปฏิบัติสำหรับการผลิตทุเรียนแช่เยือกแข็ง',
    label: 'มกษ.9046-2560',
  },
  {
    src: '/news-slide/มกษ.9047-2560 - การปฏิบัติที่ดีสําหรับโรงรวบรวมผักและผลไม้สด.jpeg',
    alt: 'มกษ.9047-2560 การปฏิบัติที่ดีสำหรับโรงรวบรวมผักและผลไม้สด',
    label: 'มกษ.9047-2560',
  },
  {
    src: '/news-slide/มกษ.9070-2566 - หลักปฎิบัติการในการตรวจและรับผลทุเรียนสำหรับโรงรวบรวมและโรงคัดบรรจุ.jpeg',
    alt: 'มกษ.9070-2566 หลักปฏิบัติในการตรวจและรับผลทุเรียน',
    label: 'มกษ.9070-2566',
  },
];

export default function NewsSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-advance every 10 seconds
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, [next, paused]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-[2rem] mb-6 shadow-2xl bg-white dark:bg-slate-900"
      style={{ aspectRatio: '16/9', maxHeight: '520px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].src}
            alt={slides[current].alt}
            className="w-full h-full object-contain object-center"
            draggable={false}
          />

          {/* Gradient overlay bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Label bottom-left */}
          <div className="absolute bottom-5 left-6 right-16">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/90 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm mb-2">
              มาตรฐาน QAIC
            </span>
            <p className="text-white text-sm md:text-base font-bold leading-snug drop-shadow-lg line-clamp-2">
              {slides[current].alt}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev Button */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Next Button */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 right-4 flex gap-1.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === current
                ? 'w-5 h-1.5 bg-white'
                : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 z-10">
          <motion.div
            key={`progress-${current}`}
            className="h-full bg-blue-400"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 10, ease: 'linear' }}
          />
        </div>
      )}
    </div>
  );
}
