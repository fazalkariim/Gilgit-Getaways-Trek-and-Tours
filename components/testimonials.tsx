'use client';

import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    location: "United Kingdom",
    tour: "K2 Base Camp Trek",
    rating: 5,
    text: "An absolute dream come true. The guides were incredibly professional, and the logistics were flawless. Standing at Concordia was a life-changing moment.",
    avatar: "https://picsum.photos/seed/sarah/100/100"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Singapore",
    tour: "Hunza Valley Autumn Tour",
    rating: 5,
    text: "Breathtaking scenery and flawless organization. The colors of autumn in Hunza are unmatched, and the local hospitality was heartwarming.",
    avatar: "https://picsum.photos/seed/michael/100/100"
  },
  {
    id: 3,
    name: "Emma & Tom",
    location: "Australia",
    tour: "Fairy Meadows & Nanga Parbat",
    rating: 5,
    text: "The guides were incredibly knowledgeable. Waking up to the view of Nanga Parbat right outside our cabin was an experience we'll never forget.",
    avatar: "https://picsum.photos/seed/emma/100/100"
  },
  {
    id: 4,
    name: "David Müller",
    location: "Germany",
    tour: "Skardu Expedition",
    rating: 5,
    text: "Top-notch equipment and safety standards. Gilgit Getaways made sure we were comfortable even in the harshest conditions. Highly recommended!",
    avatar: "https://picsum.photos/seed/david/100/100"
  },
  {
    id: 5,
    name: "Ayesha Khan",
    location: "UAE",
    tour: "Cherry Blossom Tour",
    rating: 5,
    text: "A magical experience! The cherry blossoms in Hunza and Skardu were stunning. The team took care of every single detail perfectly.",
    avatar: "https://picsum.photos/seed/ayesha/100/100"
  },
  {
    id: 6,
    name: "James Wilson",
    location: "USA",
    tour: "Rakaposhi Base Camp",
    rating: 5,
    text: "Challenging but incredibly rewarding. The food provided during the trek was surprisingly good, and the porters were absolute heroes.",
    avatar: "https://picsum.photos/seed/james/100/100"
  },
  {
    id: 7,
    name: "Sophie Laurent",
    location: "France",
    tour: "Gondogoro La Trek",
    rating: 5,
    text: "A life-changing experience. Crossing the pass was tough, but the support from the Gilgit Getaways team made it possible and safe.",
    avatar: "https://picsum.photos/seed/sophie/100/100"
  },
  {
    id: 8,
    name: "Daniel Rossi",
    location: "Italy",
    tour: "Khunjerab Pass Tour",
    rating: 5,
    text: "Smooth logistics and great hospitality. Driving up to the China border was spectacular. The vehicle was comfortable and the driver was very skilled.",
    avatar: "https://picsum.photos/seed/daniel/100/100"
  },
  {
    id: 9,
    name: "Yuki Tanaka",
    location: "Japan",
    tour: "Baltoro Glacier Trek",
    rating: 5,
    text: "The sheer scale of the mountains is humbling. Everything from the airport pickup to the final farewell dinner was perfectly orchestrated.",
    avatar: "https://picsum.photos/seed/yuki/100/100"
  },
  {
    id: 10,
    name: "Mark Davies",
    location: "Canada",
    tour: "Custom Family Tour",
    rating: 5,
    text: "They catered to our family's every need. Traveling with kids in the mountains can be tricky, but they made it seamless and fun for everyone.",
    avatar: "https://picsum.photos/seed/mark/100/100"
  }
];

export function Testimonials() {
  // Split reviews into two rows for visual variety
  const topRow = reviews.slice(0, 5);
  const bottomRow = reviews.slice(5, 10);

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          What Our Adventurers Say
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Don&apos;t just take our word for it. Read about the unforgettable experiences of our guests.
        </p>
      </div>

      <div className="relative w-full flex flex-col gap-8">
        {/* Top Row - Scrolling Left */}
        <div className="flex w-max animate-marquee hover:pause-animation">
          <div className="flex gap-6 px-3">
            {topRow.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="flex gap-6 px-3">
            {topRow.map((review) => (
              <ReviewCard key={`${review.id}-dup`} review={review} />
            ))}
          </div>
        </div>

        {/* Bottom Row - Scrolling Right */}
        <div className="flex w-max animate-marquee-reverse hover:pause-animation">
          <div className="flex gap-6 px-3">
            {bottomRow.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="flex gap-6 px-3">
            {bottomRow.map((review) => (
              <ReviewCard key={`${review.id}-dup`} review={review} />
            ))}
          </div>
        </div>
        
        {/* Gradient Overlays for smooth fade effect on edges */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="w-80 md:w-96 bg-white dark:bg-gray-950 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex-shrink-0 flex flex-col justify-between transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-brand-500 text-brand-500" />
            ))}
          </div>
          <Quote className="w-8 h-8 text-gray-200 dark:text-gray-800" />
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 italic">
          &quot;{review.text}&quot;
        </p>
      </div>
      
      <div className="flex items-center gap-4 mt-auto">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-100 dark:border-brand-900/50">
          <Image 
            src={review.avatar} 
            alt={review.name} 
            fill 
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white">{review.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{review.tour} • {review.location}</p>
        </div>
      </div>
    </div>
  );
}
