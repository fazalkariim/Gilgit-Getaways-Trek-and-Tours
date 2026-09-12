import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { WhyChooseUs } from '@/components/why-choose-us';
import { Seasons } from '@/components/seasons';
import { SeasonGlimpses } from '@/components/season-glimpses';
import { Expeditions } from '@/components/expeditions';
import { TopTreks } from '@/components/top-treks';
import { Tours } from '@/components/tours';
import { Testimonials } from '@/components/testimonials';
import { Gallery } from '@/components/gallery';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Tours />
      <Services />
      <WhyChooseUs />
      <Seasons />
      <SeasonGlimpses />
      <Expeditions />
      <TopTreks />
      <Testimonials />
      <Gallery />
      <Footer />
    </main>
  );
}
