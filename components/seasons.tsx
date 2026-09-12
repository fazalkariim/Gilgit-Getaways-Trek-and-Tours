'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Snowflake, Flower2, Sun, Leaf } from 'lucide-react';

const seasonsData = [
  {
    id: 'winter',
    name: 'Winter (Sardiyan)',
    subtitle: 'Snow Wonderland',
    months: 'December – January – February',
    icon: Snowflake,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    images: [
      '/images/WINTER (1).jpeg',
      '/images/WINTER (2).jpeg',
      '/images/WINTER (3).jpeg',
    ],
    description: 'A serene snow-covered paradise, ideal for winter sports, frozen lakes, and peaceful retreats. Discover the quiet beauty of the snow-capped mountains.'
  },
  {
    id: 'spring',
    name: 'Spring (Bahar)',
    subtitle: 'Blossom 🌸 isi mein hota hai',
    months: 'March – April – May',
    icon: Flower2,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    borderColor: 'border-pink-200 dark:border-pink-800',
    images: [
      '/images/BAHAR (1).jpeg',
      '/images/BLOSSOM (1).jpeg',
      '/images/BAHAR (2).jpeg',
    ],
    description: 'Witness the breathtaking cherry and apricot blossoms painting the valleys in hues of pink and white. The perfect time to experience the rebirth of nature in Gilgit-Baltistan.'
  },
  {
    id: 'summer',
    name: 'Summer (Garmiyan)',
    subtitle: 'Peak Trekking',
    months: 'June – July – August',
    icon: Sun,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    images: [
      'https://picsum.photos/seed/mountainlake/800/600',
      'https://picsum.photos/seed/summerhike/800/600',
      'https://picsum.photos/seed/greenvalley/800/600',
    ],
    description: 'The ideal time for high-altitude treks, lush green meadows, and crystal-clear blue lakes. Escape the heat and explore the majestic peaks.'
  },
  {
    id: 'autumn',
    name: 'Autumn (Khizan)',
    subtitle: 'Golden Valleys',
    months: 'September – October – November',
    icon: Leaf,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    images: [
      '/images/KHIZAN (1).jpeg',
      '/images/KHIZAN (2).jpeg',
      '/images/KHIZAN (3).jpeg',
    ],
    description: 'Experience the magic of fall as the foliage turns into vibrant shades of gold, orange, and red. A photographer\'s absolute paradise.'
  }
];

export function Seasons() {
  const [activeSeason, setActiveSeason] = useState(seasonsData[0]);
  const [currentSeasonId, setCurrentSeasonId] = useState('');

  useEffect(() => {
    const month = new Date().getMonth(); // 0-11
    let currentId = '';
    if (month >= 2 && month <= 4) currentId = 'spring';
    else if (month >= 5 && month <= 7) currentId = 'summer';
    else if (month >= 8 && month <= 10) currentId = 'autumn';
    else currentId = 'winter';

    setCurrentSeasonId(currentId);
    const current = seasonsData.find(s => s.id === currentId);
    if (current) setActiveSeason(current);
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Gilgit-Baltistan Through the Seasons
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Every season brings a unique charm to the mountains. Discover what awaits you throughout the year.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Season Selector */}
          <div className="lg:col-span-4 space-y-4">
            {seasonsData.map((season) => {
              const isActive = activeSeason.id === season.id;
              const isCurrent = currentSeasonId === season.id;
              const Icon = season.icon;

              return (
                <button
                  key={season.id}
                  onClick={() => setActiveSeason(season)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border-2 relative overflow-hidden group ${
                    isActive 
                      ? `${season.borderColor} ${season.bgColor} shadow-md` 
                      : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-900'
                  }`}
                >
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${isActive ? 'bg-white dark:bg-gray-950 shadow-sm' : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700'} transition-colors`}>
                        <Icon className={`w-6 h-6 ${isActive ? season.color : 'text-gray-500 dark:text-gray-400'}`} />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                          {season.name}
                        </h3>
                        <p className={`text-sm font-medium mt-1 ${isActive ? season.color : 'text-gray-500 dark:text-gray-400'}`}>
                          {season.months}
                        </p>
                      </div>
                    </div>
                    {isCurrent && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 dark:bg-brand-900/30 text-brand-800 dark:text-brand-300">
                        Current
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Season Content Display */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSeason.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 h-full flex flex-col"
              >
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <activeSeason.icon className={`w-8 h-8 ${activeSeason.color}`} />
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{activeSeason.name}</h3>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {activeSeason.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-auto">
                  {activeSeason.images.map((img, idx) => (
                    <div 
                      key={idx} 
                      className={`relative rounded-2xl overflow-hidden shadow-sm group ${
                        idx === 0 ? 'md:col-span-2 md:row-span-2 h-64 md:h-[400px]' : 'h-48 md:h-[192px]'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${activeSeason.name} scenery ${idx + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
