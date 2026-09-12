'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-provider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { MapPin, Clock, Mountain } from 'lucide-react';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  persons: z.number().min(1, 'At least 1 person is required'),
  days: z.number().min(1, 'At least 1 day is required'),
});

type BookingForm = z.infer<typeof bookingSchema>;

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

export default function BookExpeditionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [expedition, setExpedition] = useState<Expedition | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      persons: 1,
      days: 1,
    }
  });

  const persons = watch('persons') || 1;
  const days = watch('days') || 1;
  const totalPrice = expedition ? expedition.price * persons * days : 0;

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/login?redirect=/expeditions/${id}`);
    } else if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
    }
  }, [user, authLoading, router, id, setValue]);

  useEffect(() => {
    const fetchExpedition = async () => {
      try {
        const res = await fetch(`/api/expeditions/${id}`);
        if (res.ok) {
          const data = await res.json();
          setExpedition(data);
          // Try to extract days from duration string if possible
          const match = data.duration.match(/(\d+)/);
          if (match && match[1]) {
            setValue('days', parseInt(match[1], 10));
          }
        } else {
          setError('Expedition not found');
        }
      } catch (err: any) {
        setError('Failed to load expedition details');
      } finally {
        setLoading(false);
      }
    };
    fetchExpedition();
  }, [id, setValue]);

  const onSubmit = async (data: BookingForm) => {
    setSubmitLoading(true);
    setError('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expeditionId: id,
          name: data.name,
          email: data.email,
          persons: data.persons,
          days: data.days,
          totalPrice: totalPrice,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Failed to book expedition');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/my-bookings');
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

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
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) return null; // Will redirect

  if (!expedition) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Expedition not found</h2>
          <button onClick={() => router.push('/')} className="mt-4 text-orange-500 hover:underline">
            Return to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-700">
        
        {/* Expedition Details Side */}
        <div className="md:w-1/2 bg-black text-white relative">
          <div className="absolute inset-0 opacity-50">
            <Image
              src={expedition.image || 'https://picsum.photos/seed/placeholder/800/600'}
              alt={expedition.title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 p-10 h-full flex flex-col justify-between bg-gradient-to-t from-black via-black/80 to-transparent">
            <div>
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(expedition.difficulty)}`}>
                  {expedition.difficulty}
                </span>
              </div>
              <h2 className="text-4xl font-extrabold mb-4 text-white">{expedition.title}</h2>
              <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-6">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-orange-500" />
                  {expedition.duration}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-orange-500" />
                  {expedition.location}
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{expedition.description}</p>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Price per person/day</p>
              <p className="text-4xl font-bold text-orange-500">${expedition.price}</p>
            </div>
          </div>
        </div>

        {/* Booking Form Side */}
        <div className="md:w-1/2 p-10 bg-gray-800">
          <h3 className="text-2xl font-bold text-white mb-6">Book this Expedition</h3>
          
          {success ? (
            <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-green-400 mb-2">Expedition Booked!</h4>
              <p className="text-green-200">Your spot is secured. We have sent an email to the admin with your details.</p>
              <p className="text-sm text-green-400/70 mt-4">Redirecting to your bookings...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    readOnly
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    readOnly
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="persons" className="block text-sm font-medium text-gray-300 mb-1">
                    Number of Persons
                  </label>
                  <input
                    id="persons"
                    type="number"
                    min="1"
                    {...register('persons', { valueAsNumber: true })}
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  />
                  {errors.persons && <p className="text-red-400 text-xs mt-1">{errors.persons.message}</p>}
                </div>

                <div>
                  <label htmlFor="days" className="block text-sm font-medium text-gray-300 mb-1">
                    Number of Days
                  </label>
                  <input
                    id="days"
                    type="number"
                    min="1"
                    {...register('days', { valueAsNumber: true })}
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  />
                  {errors.days && <p className="text-red-400 text-xs mt-1">{errors.days.message}</p>}
                </div>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-gray-700 flex justify-between items-center">
                <span className="text-gray-300 font-medium">Total Price:</span>
                <span className="text-2xl font-bold text-orange-500">Rs. {totalPrice.toLocaleString('en-PK')}</span>
              </div>

              {error && <div className="text-red-400 text-sm bg-red-900/30 border border-red-500/30 p-3 rounded-lg">{error}</div>}

              <button
                type="submit"
                disabled={submitLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-colors"
              >
                {submitLoading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
