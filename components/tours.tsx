'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';

interface Tour {
  id: string;
  title: string;
  price: number;
  description: string;
  duration: string;
  location: string;
  image: string;
}

export function Tours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch('/api/tours');
        if (res.ok) {
          const data = await res.json();
          setTours(data);
        }
      } catch (error) {
        // Silently ignore fetch errors
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden" id="tours">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            <span className="text-brand-600">Top Tours</span> across Pakistan
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the rich heritage, breathtaking landscapes, and vibrant cultures of Pakistan.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-950 rounded-3xl shadow-sm overflow-hidden animate-pulse border border-gray-100 dark:border-gray-800">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-20 bg-gray-200 rounded w-full"></div>
                  <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800 hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden m-2 rounded-2xl">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-extrabold text-brand-600 shadow-sm">
                    Rs. {tour.price.toLocaleString('en-PK')}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-1 group-hover:text-brand-600 transition-colors">
                    {tour.title}
                  </h3>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
                    <div className="flex items-center bg-gray-50 dark:bg-gray-900 px-3 py-1.5 rounded-lg">
                      <Clock className="w-4 h-4 mr-2 text-brand-500" />
                      {tour.duration}
                    </div>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-900 px-3 py-1.5 rounded-lg">
                      <MapPin className="w-4 h-4 mr-2 text-brand-500" />
                      {tour.location}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {tour.description}
                  </p>
                  
                  <Link
                    href={`/book/${tour.id}`}
                    className="block w-full text-center bg-brand-50 dark:bg-brand-900/20 hover:bg-brand-500 text-brand-600 dark:text-brand-400 hover:text-white font-bold py-3 px-4 rounded-xl transition-colors border border-brand-100 dark:border-brand-800/50 hover:border-brand-500 shadow-sm"
                  >
                    Book Now
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
