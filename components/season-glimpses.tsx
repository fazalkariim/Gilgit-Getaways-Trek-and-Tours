'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

const glimpses = [
  { src: '/images/WINTER (1).jpeg', alt: 'Winter Glimpse 1' },
  { src: '/images/BAHAR (1).jpeg', alt: 'Spring Glimpse 1' },
  { src: '/images/BLOSSOM (1).jpeg', alt: 'Blossom Glimpse 1' },
  { src: '/images/KHIZAN (1).jpeg', alt: 'Autumn Glimpse 1' },
  { src: '/images/WINTER (2).jpeg', alt: 'Winter Glimpse 2' },
  { src: '/images/BAHAR (2).jpeg', alt: 'Spring Glimpse 2' },
  { src: '/images/BLOSSOM (2).jpeg', alt: 'Blossom Glimpse 2' },
  { src: '/images/KHIZAN (2).jpeg', alt: 'Autumn Glimpse 2' },
];

export function SeasonGlimpses() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          Glimpses of All Seasons
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A visual journey through the ever-changing landscapes of Gilgit-Baltistan.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradient Overlays for smooth fading effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900 z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 z-10 pointer-events-none"></div>

        <motion.div
          className="flex gap-6 w-max"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            duration: 30,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {/* Double the array for seamless infinite scrolling */}
          {[...glimpses, ...glimpses].map((image, idx) => (
            <div
              key={idx}
              className="relative w-72 h-96 md:w-96 md:h-[30rem] rounded-3xl overflow-hidden shadow-xl flex-shrink-0 group"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
