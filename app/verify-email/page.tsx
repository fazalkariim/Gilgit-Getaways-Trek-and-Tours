'use client';

import { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const verifySchema = z.object({
  code: z.string().length(6, 'OTP must be exactly 6 digits'),
});

type VerifyForm = z.infer<typeof verifySchema>;

function VerifyEmailContent() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyForm>({
    resolver: zodResolver(verifySchema),
  });

  useEffect(() => {
    if (!email) {
      router.push('/register');
    }
  }, [email, router]);

  const onSubmit = async (data: VerifyForm) => {
    if (!email) return;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: data.code }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Verification failed');
      }

      setSuccess('Email verified successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      if (err.message === 'Failed to fetch') {
        setError('Network error. Please try again.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setResendLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Failed to resend OTP');
      }

      setSuccess('A new OTP has been sent to your email.');
    } catch (err: any) {
      if (err.message === 'Failed to fetch') {
        setError('Network error. Please try again.');
      } else {
        setError(err.message);
      }
    } finally {
      setResendLoading(false);
    }
  };

  if (!email) return null;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-32 relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/verifybg/1920/1080"
          alt="Verify Background"
          fill
          className="object-cover opacity-60"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gray-900/80 mix-blend-multiply" />
      </div>

      <div className="max-w-md w-full space-y-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-10 rounded-3xl shadow-2xl relative z-10 border border-white/20">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            We sent a 6-digit code to <span className="font-bold">{email}</span>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="code" className="sr-only">Verification Code</label>
              <input
                id="code"
                type="text"
                maxLength={6}
                {...register('code')}
                className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                placeholder="------"
              />
              {errors.code && <p className="text-red-500 text-xs mt-1 text-center">{errors.code.message}</p>}
            </div>
          </div>

          {error && <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-lg">{success}</div>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={handleResend}
            disabled={resendLoading}
            className="text-sm font-medium text-orange-500 hover:text-orange-400 disabled:opacity-50"
          >
            {resendLoading ? 'Sending...' : 'Resend Code'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
