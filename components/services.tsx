import Image from 'next/image';

const services = [
  {
    title: 'Expeditions',
    description: 'Summit iconic peaks safely with a trusted team. From 6,000m to 8,000m giants, expert support helps you push limits with confidence.',
    image: '/images/service-expeditions.jpeg',
    blobClass: 'rounded-[40%_60%_70%_30%/40%_50%_60%_50%]',
  },
  {
    title: 'Trekkings',
    description: 'Walk stunning mountain trails with expert guides. Glaciers, valleys, and high-altitude views reveal the Karakoram\'s beauty.',
    image: '/images/service-trekkings.jpeg',
    blobClass: 'rounded-[50%_50%_30%_70%/50%_50%_70%_50%]',
  },
  {
    title: 'Tours',
    description: 'Discover Pakistan\'s culture, history, and beauty. Jeep safaris, heritage sites, lakes, and traditions make every trip unforgettable.',
    image: '/images/service-tours.jpeg',
    blobClass: 'rounded-[60%_40%_50%_50%/40%_40%_60%_60%]',
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-[#FAFAFA] dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-200 mb-2">
          <span className="text-[#FF9900]">Our</span> Services
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto font-medium">
          Find the adventure that calls you
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className={`relative w-72 h-72 mb-8 overflow-hidden shadow-lg transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl ${service.blobClass}`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm px-4">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
