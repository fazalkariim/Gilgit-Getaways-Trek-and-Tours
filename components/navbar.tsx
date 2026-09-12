'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from './auth-provider';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const hasHeroSection = ['/', '/contact', '/my-bookings', '/login', '/register', '/verify-email'].includes(pathname || '');
  // Force solid navbar on pages without hero sections, or when scrolled on hero pages
  const shouldBeSolid = !hasHeroSection || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'TREKS', href: '/#treks' },
    { name: 'TOURS', href: '/#tours' },
    { name: 'EXPEDITIONS', href: '/#expeditions' },
    { name: 'ABOUT', href: '/#about' },
    { name: 'GALLERY', href: '/#gallery' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        shouldBeSolid ? 'pt-4 px-4 sm:px-6 lg:px-8' : 'pt-6 px-4 sm:px-6 lg:px-8'
      }`}
    >
      <div 
        className={`max-w-7xl mx-auto transition-all duration-500 rounded-full ${
          shouldBeSolid 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-gray-200/50 dark:border-gray-800/50 py-2 px-4 sm:px-6' 
            : 'bg-transparent py-2 px-2 sm:px-4'
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group">
              <div className={`relative rounded-xl overflow-hidden shadow-lg transform group-hover:scale-105 transition-all duration-500 ${
                shouldBeSolid ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-14 h-14 sm:w-16 sm:h-16 border-2 border-white/20'
              }`}>
                <Image src="/images/logo.svg" alt="Gilgit Getaways Logo" fill className="object-contain bg-white dark:bg-gray-100" />
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative group px-3 py-2 text-xs xl:text-sm font-bold tracking-widest transition-colors ${
                  shouldBeSolid ? 'text-gray-800 dark:text-white' : 'text-white drop-shadow-md'
                }`}
              >
                <span className="relative z-10 group-hover:text-brand-500 transition-colors duration-300">
                  {link.name}
                </span>
                <span className={`absolute bottom-1 left-1/2 w-0 h-[2px] -translate-x-1/2 transition-all duration-300 group-hover:w-3/4 ${
                  shouldBeSolid ? 'bg-brand-500' : 'bg-white'
                }`}></span>
              </Link>
            ))}
            
            <div className="ml-2 pr-2 border-r border-gray-400/30 dark:border-gray-600/30">
              <ThemeToggle shouldBeSolid={shouldBeSolid} />
            </div>

            {user ? (
              <div className="flex items-center gap-3 xl:gap-4 ml-2 xl:ml-4 pl-2 xl:pl-4">
                <Link
                  href="/my-bookings"
                  className={`relative group px-2 py-2 text-xs xl:text-sm font-bold tracking-widest transition-colors ${
                    shouldBeSolid ? 'text-gray-800 dark:text-white' : 'text-white drop-shadow-md'
                  }`}
                >
                  <span className="relative z-10 group-hover:text-brand-500 transition-colors duration-300">
                    MY BOOKINGS
                  </span>
                  <span className={`absolute bottom-1 left-1/2 w-0 h-[2px] -translate-x-1/2 transition-all duration-300 group-hover:w-3/4 ${
                    shouldBeSolid ? 'bg-brand-500' : 'bg-white'
                  }`}></span>
                </Link>
                <div className={`flex items-center gap-2 text-xs xl:text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-300 ${
                  shouldBeSolid 
                    ? 'bg-gray-100/50 dark:bg-gray-800/50 text-gray-800 dark:text-white border-gray-200/50 dark:border-gray-700/50' 
                    : 'bg-white/10 text-white border-white/20 backdrop-blur-md'
                }`}>
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className={`px-5 py-2 rounded-full text-xs xl:text-sm font-bold tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border ${
                    shouldBeSolid 
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent hover:bg-brand-500 dark:hover:bg-brand-400 dark:hover:text-white' 
                      : 'bg-brand-500 text-white border-transparent hover:bg-brand-600'
                  }`}
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <div className="ml-2 xl:ml-4 pl-2 xl:pl-4">
                <Link
                  href="/login"
                  className={`inline-block px-6 py-2.5 rounded-full text-xs xl:text-sm font-bold tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border ${
                    shouldBeSolid 
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent hover:bg-brand-500 dark:hover:bg-brand-400 dark:hover:text-white' 
                      : 'bg-white/10 text-white border-white/30 hover:bg-white hover:text-gray-900 backdrop-blur-md'
                  }`}
                >
                  LOGIN
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center pr-2 gap-2">
            <ThemeToggle shouldBeSolid={shouldBeSolid} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-full transition-colors ${
                shouldBeSolid 
                  ? 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800' 
                  : 'text-white hover:bg-white/10 backdrop-blur-md'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden absolute top-full left-4 right-4 mt-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-[0_20px_40px_rgb(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgb(0,0,0,0.5)] rounded-3xl overflow-hidden"
          >
            <div className="px-6 pt-6 pb-8 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-3 text-sm font-bold tracking-widest text-gray-800 dark:text-white hover:text-brand-600 dark:hover:text-brand-500 hover:bg-brand-50/50 dark:hover:bg-brand-900/20 rounded-2xl transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-gray-200/50 dark:bg-gray-700/50 my-6 mx-4"></div>
              {user ? (
                <div className="space-y-3 px-2">
                  <Link
                    href="/my-bookings"
                    className="block px-4 py-3 text-sm font-bold tracking-widest text-gray-800 dark:text-white hover:text-brand-600 dark:hover:text-brand-500 hover:bg-brand-50/50 dark:hover:bg-brand-900/20 rounded-2xl transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    MY BOOKINGS
                  </Link>
                  <div className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-brand-700 dark:text-brand-500 bg-brand-50/50 dark:bg-brand-900/20 rounded-2xl border border-brand-100/50 dark:border-brand-800/50">
                    <User className="w-5 h-5" />
                    Hi, {user.name}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-center mt-6 px-4 py-3.5 text-sm font-bold tracking-widest text-white dark:text-gray-900 bg-gray-900 dark:bg-white hover:bg-brand-500 dark:hover:bg-brand-400 rounded-2xl transition-colors shadow-md"
                  >
                    SIGN OUT
                  </button>
                </div>
              ) : (
                <div className="px-2 pt-2 space-y-3">
                  <Link
                    href="/login"
                    className="block w-full text-center px-4 py-3.5 text-sm font-bold tracking-widest text-white dark:text-gray-900 bg-gray-900 dark:bg-white hover:bg-brand-500 dark:hover:bg-brand-400 rounded-2xl transition-colors shadow-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    SIGN IN
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full text-center px-4 py-3.5 text-sm font-bold tracking-widest text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-2xl transition-colors shadow-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    CREATE ACCOUNT
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
