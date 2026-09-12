'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';

interface Expedition {
  id: string;
  title: string;
  price: number;
  description: string;
  duration: string;
  location: string;
  difficulty: string;
  image: string;
}

export function Expeditions() {
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        const res = await fetch('/api/expeditions');
        if (res.ok) {
          const data = await res.json();
          setExpeditions(data);
        }
      } catch (error) {
        // Silently ignore fetch errors
      } finally {
        setLoading(false);
      }
    };
    fetchExpeditions();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'hard':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'extreme':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-800';
    }
  };

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden" id="expeditions">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-500/20 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            <span className="text-brand-500">Top Expeditions</span> for True Climbers
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Challenge yourself on the world&apos;s most formidable peaks. From 6000m trekking peaks to the savage K2.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800/50 rounded-3xl overflow-hidden animate-pulse border border-gray-700 backdrop-blur-sm">
                <div className="h-64 bg-gray-700/50"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-700/50 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
                  <div className="h-20 bg-gray-700/50 rounded w-full"></div>
                  <div className="h-10 bg-gray-700/50 rounded w-full mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expeditions.map((expedition) => (
              <div
                key={expedition.id}
                className="group bg-gray-800/40 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-[0_0_30px_rgba(255,153,0,0.15)] transition-all duration-500 overflow-hidden flex flex-col border border-gray-700 hover:border-brand-500/50 hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden m-2 rounded-2xl">
                  <Image
                    src={expedition.image || 'https://picsum.photos/seed/placeholder/800/600'}
                    alt={expedition.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-80"></div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-sm font-extrabold text-white shadow-sm border border-white/10">
                    ${expedition.price}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border shadow-lg backdrop-blur-md ${getDifficultyColor(expedition.difficulty)}`}>
                      {expedition.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-3 line-clamp-1 group-hover:text-brand-400 transition-colors">
                    {expedition.title}
                  </h3>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-300 mb-4 font-medium">
                    <div className="flex items-center bg-gray-700/50 px-3 py-1.5 rounded-lg border border-gray-600/50">
                      <Clock className="w-4 h-4 mr-2 text-brand-400" />
                      {expedition.duration}
                    </div>
                    <div className="flex items-center bg-gray-700/50 px-3 py-1.5 rounded-lg border border-gray-600/50">
                      <MapPin className="w-4 h-4 mr-2 text-brand-400" />
                      {expedition.location}
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {expedition.description}
                  </p>
                  
                  <Link
                    href={`/expeditions/${expedition.id}`}
                    className="block w-full text-center bg-transparent hover:bg-brand-500 text-brand-400 hover:text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 border border-brand-500/50 hover:border-brand-500 shadow-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
