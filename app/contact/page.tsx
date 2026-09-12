'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     
    const phoneNumber = '923179001036';
    const text = `New Contact Form Submission:%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Company:* ${formData.company}%0A*Message:* ${formData.message}`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <Image
          src="/images/hero-bg.jpeg"
          alt="Trekkers in snow"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Torn paper effect at the bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-[50px] md:h-[80px]"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V73.24C140.88,43.43,281.76,13.62,422.64,33.51c140.88,19.89,281.76,89.47,422.64,89.47S1059.12,53.32,1200,53.32V120H0Z"
              className="fill-white dark:fill-gray-950 transition-colors duration-300"
            ></path>
          </svg>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column - Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-[#1a202c] dark:text-white leading-tight transition-colors">
                Feel Free To
              </h1>
              <h2 className="text-5xl md:text-6xl font-bold text-[#f59e0b] leading-tight">
                Contact Us
              </h2>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed transition-colors">
              We'd love to hear from you! Whether you're planning a trek,
              expedition, or cultural tour in Gilgit-Baltistan, we're here to help you
              create the perfect adventure. Let us know your travel dates, group
              size, or any special requests — our team will guide you every step of
              the way. Reach out today and start your journey with Gilgit Getaways
              Trek and Tours!
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full border-2 border-gray-800 flex items-center justify-center shrink-0">
                  <Phone className="w-8 h-8 text-gray-800 dark:text-gray-200" />
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Call us at:</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">+92 3179001036</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full border-2 border-gray-800 flex items-center justify-center shrink-0">
                  <Mail className="w-8 h-8 text-gray-800 dark:text-gray-200" />
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Email:</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white break-all">fazalkarim142@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white dark:bg-gray-950 rounded-3xl border border-[#f59e0b] p-8 md:p-10 shadow-xl">
            <h3 className="text-2xl font-bold text-[#f59e0b] mb-2">
              Please fill in the information below
            </h3>
            <div className="w-full h-0.5 bg-[#f59e0b] mb-8"></div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">Your name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#f59e0b] bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#f59e0b] bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#f59e0b] bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">Company Name</label>
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#f59e0b] bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-700 dark:text-gray-300 text-sm">Describe your message *</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-[#f59e0b] bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent transition-all resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white font-bold py-4 rounded-lg transition-colors duration-300 shadow-md"
              >
                SUBMIT MESSAGE
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
