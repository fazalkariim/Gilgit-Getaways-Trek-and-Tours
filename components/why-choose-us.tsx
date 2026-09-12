import { CheckCircle2, Shield, Map, Compass, Tent } from 'lucide-react';

const reasons = [
  {
    title: 'Safety & Expert Guidance',
    description: 'Led by experienced mountaineers, our team ensures careful planning and secure journeys on every adventure.',
    icon: Shield,
  },
  {
    title: 'Local Guides, Hidden Gems',
    description: 'Our experts know every secret trail, story, and corner of the Karakoram and Pakistan.',
    icon: Map,
  },
  {
    title: 'Adventures Tailored to You',
    description: 'From treks and jeep safaris to cycling tours and high-altitude climbs—your trip is built around your spirit.',
    icon: Compass,
  },
  {
    title: 'Top-Quality Gear & Seamless Logistics',
    description: 'Safe camps, reliable equipment, and fully managed support let you focus on the journey.',
    icon: Tent,
  },
];

export function WhyChooseUs() {
  return (
    <section id="about" className="py-24 bg-brand-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            <span className="text-brand-600">Why</span> Choose Us
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Why we&apos;re your adventure experts.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side graphic */}
          <div className="relative flex justify-center">
            <div className="w-72 h-96 bg-gradient-to-br from-brand-400 to-brand-600 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] flex items-center justify-center text-white shadow-2xl transform transition-transform duration-700 hover:scale-105">
              <div className="text-center p-8">
                <Compass className="w-24 h-24 mx-auto mb-4 opacity-90" />
                <h3 className="text-3xl font-bold">Discover<br/>The Unknown</h3>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-dashed border-brand-300 rounded-full animate-[spin_20s_linear_infinite]" />
          </div>

          {/* Right side list */}
          <div className="space-y-6">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-white/50 dark:border-gray-700/50 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-xl group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{reason.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </section>
  );
}
