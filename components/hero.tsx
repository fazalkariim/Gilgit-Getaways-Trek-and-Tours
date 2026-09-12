'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

export function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with subtle zoom animation */}
      <div className="absolute inset-0 z-0 animate-[pulse_20s_ease-in-out_infinite] scale-105">
        <Image
          src="/images/hero-bg.jpeg"
          alt="Breathtaking Karakoram Mountains"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-20 w-full">
        <motion.span 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6 shadow-xl"
        >
          Unleash Your Spirit
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight mb-6 text-shadow-lg leading-tight"
        >
          <span className="text-brand-500">Gilgit Getaways</span><br/>TREK AND TOURS
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-100 font-medium mb-10 text-shadow-md max-w-3xl mx-auto px-2 sm:px-0"
        >
          Epic Journeys, Led by Local Experts. Discover the untamed beauty of the world's most majestic peaks.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0"
        >
          <Link
            href="#tours"
            className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-full text-base sm:text-lg font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,153,0,0.4)] w-full sm:w-auto"
          >
            Start Your Adventure
          </Link>
          <Link
            href="#expeditions"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/50 px-8 py-4 rounded-full text-base sm:text-lg font-bold transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto"
          >
            View Expeditions
          </Link>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce"
      >
        <div className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      </motion.div>
    </div>
  );
}
