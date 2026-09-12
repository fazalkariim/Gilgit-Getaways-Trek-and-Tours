import Image from 'next/image';
import Link from 'next/link';

const treks = [
  {
    title: 'K2 Base Camp & Gondogoro La Trek',
    price: 'Rs.2,250',
    description: 'Epic Karakoram classic trek the Baltoro Glacier to iconic Concordia, camp under Trango Towers, and cross the challenging Gondogoro La pass.',
    duration: '21 days',
    location: 'Skardu',
    image: '/images/trek-k2.jpeg',
  },
  {
    title: 'Rakaposhi Base Camp Trek',
    price: 'Rs.890',
    description: 'Beautiful journey to Rakaposhi\'s dramatic face: lush forests, meadows, and steady climbs to perfect base camp views.',
    duration: '10 days',
    location: 'Skardu',
    image: '/images/Trek-rakaposhi.jpeg',
  },
  {
    title: 'Snow Lake Biafo-Hispar Trek',
    price: 'RS.2,450',
    description: 'World-class glacier expedition: cross vast ice, camp on moraines, and reach surreal Snow Lake — a frozen basin surrounded by peaks.',
    duration: '18 days',
    location: 'Skardu',
    image: '/images/Trek-snowlake.jpeg',
  },
];

export function TopTreks() {
  return (
    <section id="treks" className="py-24 bg-gray-900 relative">
      {/* Topographic pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            <span className="text-brand-500">Our Most</span> Loved Treks
          </h2>
          <p className="text-xl text-gray-300">Find your pace, Find your path, Find yourself</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treks.map((trek, index) => (
            <div key={index} className="group relative rounded-[2rem] overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(255,153,0,0.3)] transition-all duration-500 hover:-translate-y-2 border border-gray-700">
              {/* Image Background */}
              <div className="relative h-[500px] w-full">
                <Image
                  src={trek.image}
                  alt={trek.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-90" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white leading-tight pr-4 group-hover:text-brand-400 transition-colors">{trek.title}</h3>
                  <span className="bg-brand-500 text-white font-bold px-4 py-1 rounded-full text-sm shrink-0 shadow-lg">
                    {trek.price}
                  </span>
                </div>
                
                <p className="text-gray-300 text-sm mb-6 line-clamp-3">
                  {trek.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-2">
                    <span className="bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/20">
                      {trek.duration}
                    </span>
                    <span className="bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/20">
                      {trek.location}
                    </span>
                  </div>
                  <Link
                    href={`#book-${index}`}
                    className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white hover:bg-brand-500 hover:text-white px-6 py-2 rounded-full text-sm font-bold transition-colors shadow-lg"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
