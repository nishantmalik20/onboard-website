import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Building, ShoppingBag, Utensils, Truck,
  Stethoscope, GraduationCap, HardHat, ArrowRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    icon: Building,
    title: 'Corporate & Office',
    desc: 'Lobby signage, wayfinding systems, branded wallpaper, and professional marketing materials that reflect your corporate identity across every touchpoint.',
  },
  {
    icon: ShoppingBag,
    title: 'Retail & Storefront',
    desc: 'Window graphics, point-of-sale displays, promotional banners, and exterior signage designed to drive foot traffic and increase in-store conversions.',
  },
  {
    icon: Utensils,
    title: 'Restaurants & Hospitality',
    desc: 'Menu boards, interior branding, vehicle wraps for catering fleets, window decals, and seasonal promotional materials tailored to the food and beverage industry.',
  },
  {
    icon: Truck,
    title: 'Fleet & Transportation',
    desc: 'Full and partial vehicle wraps, fleet decal packages, magnetic signs, and DOT-compliant lettering for commercial vehicles across Manitoba.',
  },
  {
    icon: Stethoscope,
    title: 'Healthcare & Clinics',
    desc: 'ADA-compliant wayfinding, privacy window film, professional office signage, and patient communication materials that meet healthcare standards.',
  },
  {
    icon: GraduationCap,
    title: 'Education & Non-Profit',
    desc: 'Campus wayfinding, event banners, fundraising materials, donor recognition displays, and branded merchandise for schools and charitable organizations.',
  },
  {
    icon: HardHat,
    title: 'Construction & Trades',
    desc: 'Job site signage, safety displays, vehicle and equipment graphics, hard hat decals, and professional business cards for contractors and tradespeople.',
  },
  {
    icon: Building,
    title: 'Real Estate & Property',
    desc: 'For sale and lease signs, development hoardings, building wraps, directional signage, and branded marketing packages for realtors and property managers.',
  },
];

export default function Industries() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.industry-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12"
      style={{ backgroundColor: '#F5F3EE' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
            Industries We Serve
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-dark tracking-tight mb-5">
            Trusted across{' '}
            <span className="font-drama italic" style={{ color: '#E63B2E' }}>
              every sector.
            </span>
          </h2>
          <p className="font-heading text-base md:text-lg text-dark/60 leading-relaxed">
            From corporate offices on Portage Avenue to restaurants in the Exchange District,
            OnBoard Print &amp; Signs serves businesses across every industry in Winnipeg and
            throughout Manitoba. We understand the unique signage and print requirements of
            each sector and deliver solutions tailored to your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((ind) => (
            <div
              key={ind.title}
              className="industry-card p-6 border transition-all duration-500 hover:-translate-y-1 hover:border-accent/30"
              style={{
                borderRadius: '1.5rem',
                backgroundColor: '#FFFFFF',
                borderColor: '#E8E4DD',
              }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center mb-4"
                style={{ backgroundColor: '#E63B2E10', borderRadius: '0.75rem' }}
              >
                <ind.icon size={18} className="text-accent" />
              </div>
              <h3 className="font-heading font-bold text-base text-dark mb-2">
                {ind.title}
              </h3>
              <p className="font-heading text-sm text-dark/55 leading-relaxed">
                {ind.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="font-heading text-base text-dark/60 mb-6">
            Don't see your industry? We work with businesses of all types and sizes.
          </p>
          <Link
            to="/contact"
            className="btn-magnetic inline-flex items-center gap-3 px-8 py-4 text-base font-heading font-semibold text-white"
            style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}
          >
            <span className="btn-bg" style={{ backgroundColor: '#111111' }}></span>
            <span className="btn-text flex items-center gap-3 text-white">
              Tell Us About Your Project <ArrowRight size={18} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
