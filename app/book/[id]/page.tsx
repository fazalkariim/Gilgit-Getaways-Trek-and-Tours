'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-provider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { MapPin, Clock } from 'lucide-react';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  persons: z.number().min(1, 'At least 1 person is required'),
  days: z.number().min(1, 'At least 1 day is required'),
});

type BookingForm = z.infer<typeof bookingSchema>;

interface Tour {
  id: string;
  title: string;
  price: number;
  description: string;
  duration: string;
  location: string;
  image: string;
}

export default function BookTourPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [tour, setTour] = useState<Tour | null>(null);
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
  const totalPrice = tour ? tour.price * persons * days : 0;

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/login?redirect=/book/${id}`);
    } else if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
    }
  }, [user, authLoading, router, id, setValue]);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`/api/tours/${id}`);
        if (res.ok) {
          const data = await res.json();
          setTour(data);
          // Try to extract days from duration string if possible
          const match = data.duration.match(/(\d+)/);
          if (match && match[1]) {
            setValue('days', parseInt(match[1], 10));
          }
        } else {
          setError('Tour not found');
        }
      } catch (err: any) {
        setError('Failed to load tour details');
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id, setValue]);

  const onSubmit = async (data: BookingForm) => {
    setSubmitLoading(true);
    setError('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: id,
          name: data.name,
          email: data.email,
          persons: data.persons,
          days: data.days,
          totalPrice: totalPrice,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Failed to book tour');
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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) return null; // Will redirect

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Tour not found</h2>
          <button onClick={() => router.push('/')} className="mt-4 text-orange-500 hover:underline">
            Return to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Tour Details Side */}
        <div className="md:w-1/2 bg-gray-900 text-white relative">
          <div className="absolute inset-0 opacity-40">
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 p-10 h-full flex flex-col justify-between bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
            <div>
              <h2 className="text-3xl font-extrabold mb-4">{tour.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-300 mb-6">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {tour.duration}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {tour.location}
                </div>
              </div>
              <p className="text-gray-300 line-clamp-4">{tour.description}</p>
            </div>
            <div className="mt-8">
              <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Price per person/day</p>
              <p className="text-4xl font-bold text-orange-500">Rs. {tour.price.toLocaleString('en-PK')}</p>
            </div>
          </div>
        </div>

        {/* Booking Form Side */}
        <div className="md:w-1/2 p-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Complete your booking</h3>
          
          {success ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-green-900 mb-2">Booking Confirmed!</h4>
              <p className="text-green-700">Thank you for booking with us. We have sent an email to the admin with your details.</p>
              <p className="text-sm text-green-600 mt-4">Redirecting to your bookings...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm bg-gray-50"
                    readOnly
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm bg-gray-50"
                    readOnly
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="persons" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Persons
                  </label>
                  <input
                    id="persons"
                    type="number"
                    min="1"
                    {...register('persons', { valueAsNumber: true })}
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  />
                  {errors.persons && <p className="text-red-500 text-xs mt-1">{errors.persons.message}</p>}
                </div>

                <div>
                  <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Days
                  </label>
                  <input
                    id="days"
                    type="number"
                    min="1"
                    {...register('days', { valueAsNumber: true })}
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  />
                  {errors.days && <p className="text-red-500 text-xs mt-1">{errors.days.message}</p>}
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex justify-between items-center">
                <span className="text-gray-700 font-medium">Total Price:</span>
                <span className="text-2xl font-bold text-orange-600">Rs. {totalPrice.toLocaleString('en-PK')}</span>
              </div>

              {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

              <button
                type="submit"
                disabled={submitLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-colors"
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
