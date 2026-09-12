'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-provider';
import Image from 'next/image';
import { MapPin, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';

interface Tour {
  id: string;
  title: string;
  price: number;
  duration: string;
  location: string;
  image: string;
}

interface Expedition {
  id: string;
  title: string;
  price: number;
  duration: string;
  location: string;
  image: string;
}

interface Booking {
  id: string;
  createdAt: string;
  persons: number;
  days: number;
  totalPrice: number;
  tour?: Tour;
  expedition?: Expedition;
}

export default function MyBookingsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/my-bookings');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      try {
        const res = await fetch('/api/my-bookings');
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        } else {
          setError('Failed to load bookings');
        }
      } catch (err: any) {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/bookings/1920/1080"
            alt="My Bookings Background"
            fill
            className="object-cover opacity-40"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            My Bookings
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Manage your upcoming adventures and review past expeditions.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-10">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-8">
            {error}
          </div>
        )}

        {bookings.length === 0 && !error ? (
          <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-sm p-12 text-center border border-gray-100 dark:border-gray-800">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No bookings yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">You haven&apos;t booked any tours with us yet. Start exploring!</p>
            <Link
              href="/#tours"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 transition-colors"
            >
              Explore Tours
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const item = booking.tour || booking.expedition;
              if (!item) return null;
              
              return (
              <div key={booking.id} className="bg-white dark:bg-gray-950 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-64 h-48 sm:h-auto flex-shrink-0">
                  <Image
                    src={item.image || 'https://picsum.photos/seed/placeholder/800/600'}
                    alt={item.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                        {item.title}
                        {booking.expedition && <span className="ml-2 text-xs text-orange-500 border border-orange-500 px-2 py-0.5 rounded-full">Expedition</span>}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Confirmed
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {booking.days} Days
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {item.location}
                      </div>
                      <div className="flex items-center bg-orange-50 text-orange-700 px-2 py-1 rounded">
                        <span className="font-semibold">{booking.persons}</span> &nbsp;Person(s)
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-1">Booking Date</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(booking.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 text-right">
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-1">Total Paid</p>
                      <p className="text-2xl font-bold text-orange-500">${booking.totalPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}
      </div>
    </div>
  );
}
