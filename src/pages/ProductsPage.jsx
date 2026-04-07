import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Lightbulb, Car, Wallpaper, GalleryHorizontalEnd, SignpostBig, CreditCard, Shirt } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const allProducts = [
  {
    icon: Lightbulb,
    title: 'LED Channel Letter Signs',
    desc: 'Custom illuminated letters for your storefront. Front-lit, back-lit, or halo-lit — fabricated and installed in-house.',
    slug: '/products/led-channel-letter-signs-winnipeg',
    image: 'https://images.unsplash.com/photo-1604638823265-1cabe872a94a?w=800&q=80&auto=format&fit=crop',
    alt: 'Close-up of illuminated LED channel letter sign on a building facade',
  },
  {
    icon: Car,
    title: 'Vehicle Wraps',
    desc: 'Cast or calendared vinyl wraps for cars, vans, trucks, and full fleets. Design, print, and install all under one roof.',
    slug: '/products/vehicle-wraps-winnipeg',
    image: '/image-assets/vehicle_graphics_6.webp',
    alt: 'Professional vehicle wrap on a commercial vehicle — OnBoard Print & Signs Winnipeg',
  },
  {
    icon: Wallpaper,
    title: 'Custom Wallpaper',
    desc: 'High-resolution commercial wallpaper for retail spaces, offices, restaurants, and feature walls. UV-coated and built to last.',
    slug: '/products/custom-wallpaper-winnipeg',
    image: '/image-assets/wall_papers_onb.webp',
    alt: 'Custom commercial wallpaper installation by OnBoard Print & Signs — branded wall mural in Winnipeg',
  },
  {
    icon: GalleryHorizontalEnd,
    title: 'Window Graphics',
    desc: 'Perforated one-way vision film, frosted vinyl, and full-colour window decals for any glass surface.',
    slug: '/products/window-graphics-winnipeg',
    image: 'https://images.unsplash.com/photo-1765150520336-bbce2f0ec05b?q=80&w=2675&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Custom window graphics applied to a Winnipeg retail storefront — perforated vinyl and window film',
  },
  {
    icon: SignpostBig,
    title: 'Yard Signs',
    desc: 'Coroplast, Alupanel, vinyl, and acrylic options. Wide-format printing, CNC routing, UV lamination.',
    slug: '/products/yard-signs-winnipeg',
    image: 'https://images.unsplash.com/photo-1604443572256-6585931858bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Custom yard signs for Winnipeg businesses — coroplast and alupanel outdoor signage',
  },
  {
    icon: CreditCard,
    title: 'Business Cards & Flyers',
    desc: 'Premium matte, gloss, and textured stocks. Spot UV, lamination, and specialty finishes available. Same-day options for urgent needs.',
    slug: '/products/business-cards-flyers-winnipeg',
    image: 'https://images.unsplash.com/photo-1599108859519-8ac78fd1b912?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Premium business cards printed in Winnipeg — matte and gloss finish options from OnBoard Print & Signs',
  },
  {
    icon: Shirt,
    title: 'Marketing Apparel',
    desc: 'Branded hoodies, tees, hats, mugs, and more — wear your brand everywhere.',
    slug: '/products/marketing-apparel-winnipeg',
    image: '/product-marketing/hoodie.webp',
    alt: 'Custom branded hoodie with embroidered logo — marketing apparel for Winnipeg businesses',
  },
];

export default function ProductsPage() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  useSEO({
    title: 'Print & Sign Products | OnBoard Print & Signs Winnipeg',
    description: 'LED channel letter signs, vehicle wraps, custom wallpaper, window graphics, yard signs, and business cards. Winnipeg\'s premium print and sign shop.',
    canonical: 'https://onboardprints.ca/products',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.products-hero-content', {
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
      gsap.from('.product-card', {
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
        <div className="products-hero-content max-w-3xl mx-auto text-center">
          <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
            What We Make
          </p>
          <h1
            className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight mb-6"
            style={{ color: '#F5F3EE' }}
          >
            Our{' '}
            <span className="font-drama italic" style={{ color: '#E63B2E' }}>
              Products.
            </span>
          </h1>
          <p
            className="font-heading text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: '#E8E4DD88' }}
          >
            We don't cut corners on materials — ever. Every product we offer is chosen for durability, visual impact, and long-term performance. Browse our full range below, or call us to talk through what's right for your business.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section ref={gridRef} className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#F5F3EE' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {allProducts.map((product) => (
            <div
              key={product.title}
              className="product-card group relative overflow-hidden"
              style={{ borderRadius: '2rem', minHeight: '420px' }}
            >
              {/* Background Image */}
              <img
                src={product.image}
                alt={product.alt}
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
                  <product.icon size={18} className="text-white" />
                </div>
                <h2
                  className="font-heading font-bold text-2xl mb-2 tracking-tight"
                  style={{ color: '#F5F3EE' }}
                >
                  {product.title}
                </h2>
                <p
                  className="font-heading text-sm leading-relaxed mb-4"
                  style={{ color: '#E8E4DDaa' }}
                >
                  {product.desc}
                </p>
                <Link
                  to={product.slug}
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
