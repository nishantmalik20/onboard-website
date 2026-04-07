import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import Hero from '../components/home/Hero';
import UrgentBanner from '../components/home/UrgentBanner';
import StatsBar from '../components/home/StatsBar';
import CertificationsBanner from '../components/home/CertificationsBanner';
import ServicesGrid from '../components/home/ServicesGrid';
import NicheHighlight from '../components/home/NicheHighlight';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Industries from '../components/home/Industries';
import MiniPortfolio from '../components/home/MiniPortfolio';
import Testimonials from '../components/home/Testimonials';
import Process from '../components/home/Process';
import WebArchitecture from '../components/home/WebArchitecture';
import QuoteSection from '../components/home/QuoteSection';

export default function HomePage() {
  const location = useLocation();

  useSEO({
    title: 'OnBoard Print & Signs | Commercial Printing & Signage in Winnipeg, MB',
    description: 'Winnipeg\'s trusted partner for commercial print & signage. Same-day printing, 24-hour turnaround. Signage, vehicle wraps, window graphics, marketing materials & web development. Get a free quote today.',
    canonical: 'https://onboardprints.ca/',
  });

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const el = document.querySelector(location.state.scrollTo);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <UrgentBanner />
      <CertificationsBanner />
      <StatsBar />
      <ServicesGrid />
      <NicheHighlight />
      <WhyChooseUs />
      <Industries />
      <MiniPortfolio />
      <Testimonials />
      <Process />
      <WebArchitecture />
      <QuoteSection />
    </>
  );
}
