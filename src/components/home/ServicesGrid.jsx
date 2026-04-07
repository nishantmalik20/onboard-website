import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Layers, Car, Eye, Printer, Globe, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const services = [
  {
    icon: Layers,
    title: 'Storefront Signage',
    tagline: 'Be seen. Be remembered.',
    desc: 'From illuminated channel letters and pylon towers to ADA-compliant wayfinding — we design, fabricate, and install signage that commands attention. Every sign is built to withstand Manitoba winters and engineered for maximum visibility.',
    features: ['Channel Letters', 'Pylon Towers', 'Wayfinding Systems', 'Illuminated Displays'],
    image: 'https://images.unsplash.com/photo-1604638823265-1cabe872a94a?w=800&q=80&auto=format&fit=crop',
  },
  {
    icon: Car,
    title: 'Vehicle Wraps',
    tagline: 'Your fleet, your billboard.',
    desc: 'Turn every vehicle in your fleet into a mobile advertising platform. We use premium 3M and Avery Dennison materials with manufacturer-backed warranties. Our certified installers deliver bubble-free, seamless applications on cars, trucks, vans, and trailers.',
    features: ['Full Vehicle Wraps', 'Partial Wraps', 'Cut Vinyl Decals', 'Fleet Branding', '3M Warranty-Backed'],
    image: '/image-assets/vehicle_graphics_6.webp',
  },
  {
    icon: Eye,
    title: 'Window Graphics',
    tagline: 'Maximize your storefront.',
    desc: 'Your windows are prime real estate. Choose from frosted vinyl for an elegant privacy solution, perforated one-way vision film that lets you see out while projecting your brand, or full-colour printed graphics that transform your storefront into a vibrant statement.',
    features: ['Frosted Privacy Film', 'Perforated One-Way Vision', 'Full-Colour Prints', 'UV Protection Film', 'Seasonal Displays'],
    image: 'https://images.unsplash.com/photo-1574660100354-168f8e1cc8d0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    icon: Printer,
    title: 'Print & Marketing Materials',
    tagline: 'Professional impressions, every time.',
    desc: 'From premium business cards with spot UV and foil stamping to large-format banners and retractable trade show displays — we produce marketing collateral that makes a lasting impression. Our digital and offset presses deliver colour-accurate, consistent results across every run.',
    features: ['Business Cards', 'Brochures & Flyers', 'Banners & Displays', 'Trade Show Materials', 'Postcards & Mailers'],
    image: 'https://images.unsplash.com/photo-1599108859519-8ac78fd1b912?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    icon: Globe,
    title: 'Web Development',
    tagline: 'Extend your brand online.',
    desc: 'Complement your physical presence with a custom-designed, responsive website built for conversions. We create SEO-optimized sites, e-commerce platforms, and digital storefronts that drive leads and sales — integrated seamlessly with your print and signage branding.',
    features: ['Custom Websites', 'E-Commerce Platforms', 'SEO Optimization', 'Mobile-First Design', 'Analytics & Tracking'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
  },
  {
    icon: Star,
    title: 'Custom Wallpaper',
    tagline: 'Transform any interior space.',
    desc: 'Bespoke large-format wallpaper printed to your exact specifications. Whether it is a branded corporate lobby, a themed restaurant interior, or an inspiring office, we print and install high-resolution wallpaper using durable, eco-friendly materials that look stunning for years.',
    features: ['Corporate Branding', 'Retail Environments', 'Custom Patterns', 'Photo Murals', 'Eco-Friendly Materials'],
    image: '/image-assets/wall_papers_onb.webp',
  },
];

export default function ServicesGrid() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.service-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12" style={{ backgroundColor: '#F5F3EE' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
            What We Do
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-dark tracking-tight mb-5">
            Full-spectrum{' '}
            <span className="font-drama italic" style={{ color: '#E63B2E' }}>
              capabilities.
            </span>
          </h2>
          <p className="font-heading text-base md:text-lg text-dark/60 leading-relaxed">
            OnBoard Print &amp; Signs is a one-stop production house for every visual communication
            need your business has — from the sign above your door to the business card in your pocket.
            All services are produced in-house at our Winnipeg facility for faster turnaround and
            consistent quality control.
          </p>
        </div>

        {/* Service cards — alternating layout */}
        <div className="flex flex-col gap-6">
          {services.map((svc, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={svc.title}
                className="service-card group border overflow-hidden transition-all duration-500 hover:-translate-y-1"
                style={{
                  borderRadius: '2rem',
                  backgroundColor: '#111111',
                  borderColor: '#E8E4DD15',
                }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-5 ${isEven ? '' : ''}`}>
                  {/* Image — 2 cols */}
                  <div
                    className={`relative overflow-hidden lg:col-span-2 ${isEven ? '' : 'lg:order-2'}`}
                    style={{ minHeight: '280px' }}
                  >
                    <img
                      src={svc.image}
                      alt={svc.title}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: isEven
                          ? 'linear-gradient(to left, rgba(17,17,17,0.6) 0%, transparent 100%)'
                          : 'linear-gradient(to right, rgba(17,17,17,0.6) 0%, transparent 100%)',
                      }}
                    />
                    {/* Floating number */}
                    <div
                      className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center font-data text-sm font-bold"
                      style={{
                        backgroundColor: 'rgba(230, 59, 46, 0.9)',
                        borderRadius: '0.75rem',
                        color: '#F5F3EE',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Content — 3 cols */}
                  <div className={`lg:col-span-3 p-8 md:p-10 flex flex-col justify-center ${isEven ? '' : 'lg:order-1'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#E63B2E15', borderRadius: '0.75rem' }}
                      >
                        <svc.icon size={18} className="text-accent" />
                      </div>
                      <div>
                        <h3
                          className="font-heading font-bold text-xl md:text-2xl tracking-tight"
                          style={{ color: '#F5F3EE' }}
                        >
                          {svc.title}
                        </h3>
                        <p className="font-data text-xs uppercase tracking-wider" style={{ color: '#E63B2E' }}>
                          {svc.tagline}
                        </p>
                      </div>
                    </div>

                    <p
                      className="font-heading text-sm md:text-base leading-relaxed mb-6"
                      style={{ color: '#E8E4DDaa' }}
                    >
                      {svc.desc}
                    </p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {svc.features.map((feat) => (
                        <span
                          key={feat}
                          className="font-heading text-xs px-3 py-1.5 border"
                          style={{
                            borderRadius: '2rem',
                            borderColor: '#E8E4DD20',
                            color: '#E8E4DD88',
                            backgroundColor: '#1A1A1F',
                          }}
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/quote?service=${encodeURIComponent(svc.title)}`}
                      className="btn-magnetic inline-flex items-center gap-2 px-6 py-3 text-sm font-heading font-semibold text-white self-start"
                      style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}
                    >
                      <span className="btn-bg" style={{ backgroundColor: '#F5F3EE' }}></span>
                      <span className="btn-text flex items-center gap-2 text-white">
                        Get a Quote <ArrowRight size={14} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link
            to="/services"
            className="btn-magnetic inline-flex items-center gap-3 px-8 py-4 text-base font-heading font-semibold text-dark border border-primary/40"
            style={{ borderRadius: '2rem' }}
          >
            <span className="btn-bg" style={{ backgroundColor: '#E8E4DD' }}></span>
            <span className="btn-text flex items-center gap-3">
              View All Services <ArrowRight size={18} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
