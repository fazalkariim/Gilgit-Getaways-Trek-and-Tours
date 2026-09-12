import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Phone, Mail } from 'lucide-react';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export function Footer() {
  return (
    <footer id="contact" className="bg-[#d97706] text-white pt-16 pb-6 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="w-32 h-32 relative rounded-xl overflow-hidden bg-white dark:bg-gray-100 p-2">
              <Image src="/images/logo.svg" alt="Gilgit Getaways Logo" fill className="object-contain" />
            </div>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-white hover:text-gray-200 transition-colors">
                <Phone className="w-5 h-5" />
                <span className="font-medium">92 3179001036</span>
              </div>
              <div className="flex items-center gap-3 text-white hover:text-gray-200 transition-colors">
                <Mail className="w-5 h-5" />
                <span className="font-medium">fazalkarim142@gmail.com</span>
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              <a href="https://www.facebook.com/hassnain.ali.342678" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/fazall_karim/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/fazal-karim-462888276/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
                <Linkedin className="w-6 h-6" />
              </a>
              
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-white/90 hover:text-white hover:translate-x-1 inline-block transition-all">Trekkings</Link></li>
              <li><Link href="#" className="text-white/90 hover:text-white hover:translate-x-1 inline-block transition-all">Cultural Tours</Link></li>
              <li><Link href="#" className="text-white/90 hover:text-white hover:translate-x-1 inline-block transition-all">Scenic Tours</Link></li>
              <li><Link href="#" className="text-white/90 hover:text-white hover:translate-x-1 inline-block transition-all">Adventure Tours</Link></li>
              <li><Link href="#" className="text-white/90 hover:text-white hover:translate-x-1 inline-block transition-all">Expeditions</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Quick as</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-white/90 hover:text-white hover:translate-x-1 inline-block transition-all">Home</Link></li>
              <li><Link href="/#about" className="text-white/90 hover:text-white hover:translate-x-1 inline-block transition-all">About Us</Link></li>
              <li><Link href="/contact" className="text-white/90 hover:text-white hover:translate-x-1 inline-block transition-all">Contact Us</Link></li>
              <li><Link href="/#gallery" className="text-white/90 hover:text-white hover:translate-x-1 inline-block transition-all">Gallery</Link></li>
            </ul>
          </div>

          {/* Blogs */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Blogs</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-white/90 hover:text-white transition-colors block leading-snug">Best Time to Trek in Gilgit-Baltistan</Link></li>
              <li><Link href="#" className="text-white/90 hover:text-white transition-colors block leading-snug">K2 Base Camp Trek</Link></li>
              <li><Link href="#" className="text-white/90 hover:text-white transition-colors block leading-snug">Safety Measures for High-Altitude Treks in Pakistan</Link></li>
              <li><Link href="#" className="text-white/90 hover:text-white transition-colors block leading-snug">Jeep Safaris in Northern Pakistan</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 flex justify-center items-center text-white/90 text-sm font-medium bg-[#c26a05] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-4">
          <p>Copyright © {new Date().getFullYear()} Fazal Karim . All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
