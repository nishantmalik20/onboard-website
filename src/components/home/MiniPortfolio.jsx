import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const projects = [
  {
    image: '/image-assets/channel-letter3.webp',
    type: 'Channel Letter Signage',
    client: 'Storefront Signage Project',
    category: 'Signage',
  },
  {
    image: '/image-assets/vehicle_graphics_6.webp',
    type: 'Vehicle Wrap',
    client: 'Commercial Fleet Graphics',
    category: 'Vehicle Wraps',
  },
  {
    image: '/image-assets/wall_papers_onb.webp',
    type: 'Custom Wallpaper',
    client: 'Commercial Interior',
    category: 'Wallpaper',
  },
  {
    image: '/image-assets/decals_4.webp',
    type: 'Custom Decals',
    client: 'Window & Surface Graphics',
    category: 'Decals',
  },
];

export default function MiniPortfolio() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.portfolio-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
          Recent Work
        </p>
        <h2 className="font-heading font-bold text-3xl md:text-5xl text-dark tracking-tight">
          Crafted in{' '}
          <span className="font-drama italic" style={{ color: '#E63B2E' }}>
            Winnipeg.
          </span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.type}
            className="portfolio-card group relative overflow-hidden cursor-pointer"
            style={{ borderRadius: '2rem', backgroundColor: '#111111', height: '320px' }}
          >
            {/* object-contain: full image visible, no cropping, uniform card height */}
            <img
              src={proj.image}
              alt={proj.type}
              loading="lazy"
              width={800}
              height={600}
              className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
              style={{ objectFit: 'contain' }}
            />
            {/* Persistent bottom scrim */}
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                height: '50%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
              }}
            />
            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 20%, rgba(0,0,0,0.2) 60%, transparent 100%)' }}
            />
            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <p className="font-data text-xs uppercase tracking-wider mb-1" style={{ color: '#E63B2E' }}>
                {proj.type}
              </p>
              <p className="font-heading font-bold text-white text-base leading-snug">{proj.client}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link
          to="/portfolio"
          className="btn-magnetic inline-flex items-center gap-3 px-8 py-4 text-base font-heading font-semibold text-dark border border-primary/40"
          style={{ borderRadius: '2rem' }}
        >
          <span className="btn-bg" style={{ backgroundColor: '#E8E4DD' }}></span>
          <span className="btn-text flex items-center gap-3">
            View Full Portfolio <ArrowRight size={18} />
          </span>
        </Link>
      </div>
    </section>
  );
}
