import Image from 'next/image';

const images = [
  '/images/gallery-1.jpeg',
  '/images/gallery-2.jpeg',
  '/images/gallery-3.jpeg',
  '/images/gallery-4.jpeg',
  '/images/gallery-5.jpeg',
  '/images/gallery-6.jpeg',
  '/images/gallery-7.jpeg',
  '/images/gallery-8.jpeg',
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-brand-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            <span className="text-brand-600">Moments from</span> the Mountains
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Real journeys across the Karakoram and beyond</p>
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {images.map((src, index) => (
            <div key={index} className="break-inside-avoid relative rounded-3xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-500 border border-white/50 dark:border-gray-800">
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                width={400}
                height={600}
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
