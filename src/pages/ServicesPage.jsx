import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, PenTool, Factory, HardHat, FileCheck, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const allServices = [
  {
    icon: PenTool,
    title: 'Sign Design',
    desc: 'Professional design using CorelDRAW, AutoCAD, and SketchUp. 3D visualization and permit-ready drawings included.',
    slug: '/services/sign-design-winnipeg',
    image: 'https://images.unsplash.com/photo-1661218986964-63fe8f3bf67c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Professional sign design process — digital layout and 3D visualization for Winnipeg signage projects',
  },
  {
    icon: Factory,
    title: 'Manufacturing & Fabrication',
    desc: 'UL-certified in-house fabrication. CNC routing, laser cutting, LED wiring — all done by our team, not outsourced.',
    slug: '/services/sign-manufacturing-winnipeg',
    image: '/image-assets/cnc_router_2.webp',
    alt: 'CNC router cutting aluminum channel letter components in our Winnipeg sign fabrication shop',
  },
  {
    icon: HardHat,
    title: 'Installation & Maintenance',
    desc: 'Licensed operators, bucket trucks, WCB insured, $5M liability. We install it right and stand behind our work.',
    slug: '/services/installation-maintenance-winnipeg',
    image: '/image-assets/sign_installation.webp',
    alt: 'Professional sign installation in Winnipeg — licensed installers mounting a commercial sign with a bucket truck',
  },
  {
    icon: FileCheck,
    title: 'Permits & Electrical',
    desc: 'We handle city permit applications, bylaw review, electrical documentation, and city inspector coordination.',
    slug: '/services/permits-winnipeg',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&auto=format&fit=crop',
    alt: 'Sign permit documentation and city bylaw compliance in Winnipeg',
  },
  {
    icon: Globe,
    title: 'Website & App Development',
    desc: 'Brand-aligned websites and applications for Winnipeg businesses. As polished as your sign.',
    slug: '/services/website-application-development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
    alt: 'Custom website development for Winnipeg businesses by OnBoard',
  },
];

export default function ServicesPage() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  useSEO({
    title: 'Sign & Print Services Winnipeg | Design, Manufacturing & Installation | OnBoard',
    description: 'Full-service sign company in Winnipeg. Design, manufacturing, installation, permits, and website development — all under one roof. OnBoard Print & Signs.',
    canonical: 'https://onboardprints.ca/services',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services-hero-content', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-detail-card', {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 70%' },
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-40 pb-20 px-6 md:px-12"
        style={{ backgroundColor: '#111111' }}
      >
        <div className="services-hero-content max-w-3xl mx-auto text-center">
          <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
            What We Do
          </p>
          <h1
            className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight mb-6"
            style={{ color: '#F5F3EE' }}
          >
            Our{' '}
            <span className="font-drama italic" style={{ color: '#E63B2E' }}>
              Services.
            </span>
          </h1>
          <p
            className="font-heading text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: '#E8E4DD88' }}
          >
            We don't hand you a product and walk away. At OnBoard, we manage every step of the process — so you never have to coordinate between a designer, a fabricator, and an installer. One team. One call. Everything handled.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={gridRef} className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#F5F3EE' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {allServices.map((svc) => (
            <div
              key={svc.title}
              className="service-detail-card group relative overflow-hidden"
              style={{ borderRadius: '2rem', minHeight: '420px' }}
            >
              {/* Background Image */}
              <img
                src={svc.image}
                alt={svc.alt}
                loading="lazy"
                width={800}
                height={600}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Gradient scrim */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(17,17,17,0.95) 0%, rgba(17,17,17,0.7) 50%, rgba(17,17,17,0.3) 100%)',
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div
                  className="w-10 h-10 flex items-center justify-center mb-3"
                  style={{
                    backgroundColor: 'rgba(230, 59, 46, 0.9)',
                    borderRadius: '0.75rem',
                  }}
                >
                  <svc.icon size={18} className="text-white" />
                </div>
                <h2
                  className="font-heading font-bold text-2xl mb-2 tracking-tight"
                  style={{ color: '#F5F3EE' }}
                >
                  {svc.title}
                </h2>
                <p
                  className="font-heading text-sm leading-relaxed mb-4"
                  style={{ color: '#E8E4DDaa' }}
                >
                  {svc.desc}
                </p>
                <Link
                  to={svc.slug}
                  className="btn-magnetic inline-flex items-center gap-2 px-6 py-3 text-sm font-heading font-semibold text-white self-start"
                  style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}
                >
                  <span className="btn-bg" style={{ backgroundColor: '#111111' }}></span>
                  <span className="btn-text flex items-center gap-2">
                    Learn More <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
