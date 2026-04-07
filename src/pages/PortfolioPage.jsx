import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useSEO from '../hooks/useSEO';

gsap.registerPlugin(ScrollTrigger);

const allProjects = [
  // Channel Letters & Signage — new additions
  { image: '/image-assets/channel-letter2.webp',   type: 'Channel Letter Sign', client: 'Channel Letter Signage', category: 'Signage' },
  { image: '/image-assets/channel-letter3-b.webp', type: 'Channel Letter Sign', client: 'Illuminated Channel Letters', category: 'Signage' },
  { image: '/image-assets/channel-letter3.webp',   type: 'Channel Letter Sign', client: 'LED Channel Letters', category: 'Signage' },
  { image: '/image-assets/channel_letter.webp',    type: 'Channel Letter Sign', client: 'Custom Channel Letters', category: 'Signage' },
  // Channel Letters & Signage
  { image: '/image-assets/storefront_channelLetter.webp', type: 'Channel Letter Sign', client: 'Retail Storefront', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_1.webp', type: 'Channel Letter Sign', client: 'Commercial Building', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_2.webp', type: 'Channel Letter Sign', client: 'Plaza Tenant', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_3.webp', type: 'Channel Letter Sign', client: 'Restaurant Signage', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_4.webp', type: 'Channel Letter Sign', client: 'Franchise Location', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_5.webp', type: 'Channel Letter Sign', client: 'Corporate Office', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_6.webp', type: 'Channel Letter Sign', client: 'Retail Brand', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_7.webp', type: 'Channel Letter Sign', client: 'Shopping Centre', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_8.webp', type: 'Channel Letter Sign', client: 'Service Business', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_9.webp', type: 'Channel Letter Sign', client: 'Local Business', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_1.webp', type: 'Channel Letter Sign', client: 'Illuminated Storefront', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_2.webp', type: 'Channel Letter Sign', client: 'Night-Lit Fascia', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_3.webp', type: 'Channel Letter Sign', client: 'Multi-Tenant Plaza', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_4.webp', type: 'Channel Letter Sign', client: 'Halo-Lit Letters', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_5.webp', type: 'Channel Letter Sign', client: 'Front-Lit Sign', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_6.webp', type: 'Channel Letter Sign', client: 'Building Fascia', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_7.webp', type: 'Channel Letter Sign', client: 'Combo-Lit Letters', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_8.webp', type: 'Channel Letter Sign', client: 'Custom Fabrication', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_10.webp', type: 'Channel Letter Sign', client: 'Winnipeg Business', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_11.webp', type: 'Channel Letter Sign', client: 'Retail Chain', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_12.webp', type: 'Channel Letter Sign', client: 'Strip Mall', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_13.webp', type: 'Channel Letter Sign', client: 'Commercial Tenant', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_14.webp', type: 'Channel Letter Sign', client: 'Backlit Sign', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_15.webp', type: 'Channel Letter Sign', client: 'LED Signage', category: 'Signage' },
  { image: '/image-assets/channelLetters_signage_16.webp', type: 'Channel Letter Sign', client: 'Premium Signage', category: 'Signage' },
  { image: '/image-assets/channel_signage_1.webp', type: 'Outdoor Signage', client: 'Commercial Sign', category: 'Signage' },
  { image: '/image-assets/channel_signage_1.webp', type: 'Outdoor Signage', client: 'Business Sign', category: 'Signage' },
  { image: '/image-assets/channel_signage_2.webp', type: 'Outdoor Signage', client: 'Storefront Sign', category: 'Signage' },
  { image: '/image-assets/channel_signage_3.webp', type: 'Outdoor Signage', client: 'Exterior Sign', category: 'Signage' },
  { image: '/image-assets/channel_signage_4.webp', type: 'Outdoor Signage', client: 'Installed Sign', category: 'Signage' },
  { image: '/image-assets/channel_signage_5.webp', type: 'Outdoor Signage', client: 'Lit Signage', category: 'Signage' },
  { image: '/image-assets/channel_signage_6.webp', type: 'Outdoor Signage', client: 'Custom Sign', category: 'Signage' },
  { image: '/image-assets/channel_signage_7.webp', type: 'Outdoor Signage', client: 'Yard & Panel Sign', category: 'Signage' },
  { image: '/image-assets/channel_signage_8.webp', type: 'Outdoor Signage', client: 'Site Signage', category: 'Signage' },
  { image: '/image-assets/channel_signage_9.webp', type: 'Outdoor Signage', client: 'Directional Sign', category: 'Signage' },
  { image: '/image-assets/channel_signage_10.webp', type: 'Outdoor Signage', client: 'Pylon Sign', category: 'Signage' },
  { image: '/image-assets/channel_signage_11.webp', type: 'Outdoor Signage', client: 'Building Sign', category: 'Signage' },
  { image: '/image-assets/sign_installation.webp', type: 'Sign Installation', client: 'On-Site Install', category: 'Signage' },
  { image: '/image-assets/website_storefront.webp', type: 'Storefront Signage', client: 'Complete Branding', category: 'Signage' },
  { image: '/image-assets/indoor_signage_1.webp', type: 'Indoor Signage', client: 'Interior Wayfinding', category: 'Signage' },
  { image: '/image-assets/indoor_signage_1.webp', type: 'Indoor Signage', client: 'Lobby Sign', category: 'Signage' },
  { image: '/image-assets/indoor_signage_2.webp', type: 'Indoor Signage', client: 'Office Signage', category: 'Signage' },
  { image: '/image-assets/indoor_signage_3.webp', type: 'Indoor Signage', client: 'Reception Sign', category: 'Signage' },

  // Vehicle Wraps
  { image: '/image-assets/vehicle_graphics_6.webp', type: 'Vehicle Wrap', client: 'Commercial Vehicle', category: 'Vehicle Wraps' },
  { image: '/image-assets/vehicle_graphics_5.webp', type: 'Vehicle Wrap', client: 'Van Wrap', category: 'Vehicle Wraps' },
  { image: '/image-assets/vehicle_graphics_3.webp', type: 'Vehicle Wrap', client: 'Fleet Vehicle', category: 'Vehicle Wraps' },
  { image: '/image-assets/vehicle_graphics_2.webp', type: 'Vehicle Wrap', client: 'Service Vehicle', category: 'Vehicle Wraps' },
  { image: '/image-assets/vehicle_graphics_1.webp', type: 'Vehicle Wrap', client: 'Full Wrap', category: 'Vehicle Wraps' },
  { image: '/image-assets/vehicle_graphics_1.webp', type: 'Vehicle Wrap', client: 'Partial Wrap', category: 'Vehicle Wraps' },
  { image: '/image-assets/vehicle_graphics_2.webp', type: 'Vehicle Wrap', client: 'Branded Vehicle', category: 'Vehicle Wraps' },
  { image: '/image-assets/vehicle_graphics_3.webp', type: 'Vehicle Wrap', client: 'Company Van', category: 'Vehicle Wraps' },
  { image: '/image-assets/vehicle_graphics_4.webp', type: 'Vehicle Wrap', client: 'Delivery Vehicle', category: 'Vehicle Wraps' },
  { image: '/image-assets/vehicle_graphics_4.webp', type: 'Vehicle Wrap', client: 'Trades Vehicle', category: 'Vehicle Wraps' },
  { image: '/image-assets/vehicle_graphics_5.webp', type: 'Vehicle Wrap', client: 'Fleet Branding', category: 'Vehicle Wraps' },
  { image: '/image-assets/vehicle_graphics_7.webp', type: 'Vehicle Wrap', client: 'Pickup Truck Wrap', category: 'Vehicle Wraps' },
  { image: '/image-assets/vehicle_graphics_8.webp', type: 'Vehicle Wrap', client: 'Box Truck Wrap', category: 'Vehicle Wraps' },
  { image: '/image-assets/truck_wrap_1.webp', type: 'Truck Wrap', client: 'Commercial Truck', category: 'Vehicle Wraps' },
  { image: '/image-assets/truck_wrap_2.webp', type: 'Truck Wrap', client: 'Moving Truck', category: 'Vehicle Wraps' },
  { image: '/image-assets/truck_wrap_3.webp', type: 'Truck Wrap', client: 'Delivery Fleet', category: 'Vehicle Wraps' },
  { image: '/image-assets/truck_wrap_4.webp', type: 'Truck Wrap', client: 'Service Truck', category: 'Vehicle Wraps' },
  { image: '/image-assets/truck_wrap_5.webp', type: 'Truck Wrap', client: 'Construction Vehicle', category: 'Vehicle Wraps' },
  { image: '/image-assets/truck_wrap_6.webp', type: 'Truck Wrap', client: 'Freight Truck', category: 'Vehicle Wraps' },
  { image: '/image-assets/truck_wrap_7.webp', type: 'Truck Wrap', client: 'Branded Truck', category: 'Vehicle Wraps' },
  { image: '/image-assets/truck_wrap_8.webp', type: 'Truck Wrap', client: 'Full Truck Wrap', category: 'Vehicle Wraps' },
  { image: '/image-assets/truck_wrap_9.webp', type: 'Truck Wrap', client: 'Trailer Wrap', category: 'Vehicle Wraps' },
  { image: '/image-assets/truck_wrap_10.webp', type: 'Truck Wrap', client: 'Fleet Truck', category: 'Vehicle Wraps' },
  { image: '/image-assets/truck_wrap_11.webp', type: 'Truck Wrap', client: 'Custom Truck Wrap', category: 'Vehicle Wraps' },

  // Print & Business Cards
  { image: '/image-assets/businessCard_print_1.webp', type: 'Business Cards', client: 'Premium Print', category: 'Print' },
  { image: '/image-assets/businessCard_print_2.webp', type: 'Business Cards', client: 'Corporate Stationery', category: 'Print' },
  { image: '/image-assets/businescard_yardSigns_1.webp', type: 'Print & Signage', client: 'Business Collateral', category: 'Print' },
  { image: '/image-assets/businescard_yardSigns_2.webp', type: 'Print & Signage', client: 'Marketing Materials', category: 'Print' },
  { image: '/image-assets/businescard_yardSigns_3.webp', type: 'Print & Signage', client: 'Branded Print', category: 'Print' },
  { image: '/image-assets/businescard_yardSigns_4.webp', type: 'Print & Signage', client: 'Promotional Materials', category: 'Print' },
  { image: '/image-assets/businescard_yardSigns_5.webp', type: 'Print & Signage', client: 'Event Materials', category: 'Print' },
  { image: '/image-assets/businescard_yardSigns_6.webp', type: 'Print & Signage', client: 'Trade Show Print', category: 'Print' },
  { image: '/image-assets/businescard_yardSigns_7.webp', type: 'Print & Signage', client: 'Custom Print', category: 'Print' },
  { image: '/image-assets/businescard_yardSigns_8.webp', type: 'Print & Signage', client: 'Flyer Design', category: 'Print' },
  { image: '/image-assets/businescard_yardSigns_9.webp', type: 'Print & Signage', client: 'Brochure Print', category: 'Print' },
  { image: '/image-assets/businescard_yardSigns_10.webp', type: 'Print & Signage', client: 'Door Hanger', category: 'Print' },
  { image: '/image-assets/businescard_yardSigns_11.webp', type: 'Print & Signage', client: 'Postcard Mailer', category: 'Print' },

  // Wallpaper & Wall Graphics
  { image: '/image-assets/wall_papers_onb.webp', type: 'Custom Wallpaper', client: 'Commercial Interior', category: 'Wallpaper' },
  { image: '/image-assets/wall_graphics_1.webp', type: 'Wall Graphics', client: 'Office Branding', category: 'Wallpaper' },
  { image: '/image-assets/wall_graphics_2.webp', type: 'Wall Graphics', client: 'Retail Interior', category: 'Wallpaper' },
  { image: '/image-assets/wall_graphics_3.webp', type: 'Wall Graphics', client: 'Restaurant Mural', category: 'Wallpaper' },
  { image: '/image-assets/wall_graphics_4.webp', type: 'Wall Graphics', client: 'Feature Wall', category: 'Wallpaper' },
  { image: '/image-assets/wall_graphics_5.webp', type: 'Wall Graphics', client: 'Lobby Design', category: 'Wallpaper' },

  // Decals & Window Graphics
  { image: '/image-assets/decals_1.webp', type: 'Decals & Graphics', client: 'Window Decal', category: 'Decals' },
  { image: '/image-assets/decals_2.webp', type: 'Decals & Graphics', client: 'Storefront Decal', category: 'Decals' },
  { image: '/image-assets/decals_3.webp', type: 'Decals & Graphics', client: 'Glass Graphics', category: 'Decals' },
  { image: '/image-assets/decals_4.webp', type: 'Decals & Graphics', client: 'Vinyl Lettering', category: 'Decals' },
  { image: '/image-assets/decals_5.webp', type: 'Decals & Graphics', client: 'Door Decal', category: 'Decals' },
  { image: '/image-assets/decals_6.webp', type: 'Decals & Graphics', client: 'Floor Graphics', category: 'Decals' },
  { image: '/image-assets/decals_7.webp', type: 'Decals & Graphics', client: 'Promotional Decal', category: 'Decals' },
  { image: '/image-assets/decals_8.webp', type: 'Decals & Graphics', client: 'Safety Decal', category: 'Decals' },
  { image: '/image-assets/decals_9.webp', type: 'Decals & Graphics', client: 'Custom Decal', category: 'Decals' },
  { image: '/image-assets/decals_10.webp', type: 'Decals & Graphics', client: 'Brand Decal', category: 'Decals' },
  { image: '/image-assets/decals_11.webp', type: 'Decals & Graphics', client: 'Vehicle Decal', category: 'Decals' },

  // Fabrication
  { image: '/image-assets/cnc_router_2.webp', type: 'CNC Fabrication', client: 'Sign Components', category: 'Fabrication' },
  { image: '/image-assets/cnc_router_3.webp', type: 'CNC Fabrication', client: 'Letter Cutting', category: 'Fabrication' },
  { image: '/image-assets/signBender_1.webp', type: 'Letter Bending', client: 'Aluminum Returns', category: 'Fabrication' },
  { image: '/image-assets/signBender_2.webp', type: 'Letter Bending', client: 'Channel Letters', category: 'Fabrication' },
];

const categories = ['All', 'Signage', 'Vehicle Wraps', 'Print', 'Wallpaper', 'Decals', 'Fabrication'];

export default function PortfolioPage() {
  useSEO({
    title: 'Portfolio | Signage, Wraps & Print Projects | OnBoard Print & Signs Winnipeg',
    description: 'Browse our portfolio of channel letter signs, vehicle wraps, window graphics, custom wallpaper, and commercial printing projects across Winnipeg and Manitoba.',
    canonical: 'https://onboardprints.ca/portfolio',
  });

  const [activeFilter, setActiveFilter] = useState('All');
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  const filtered = activeFilter === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.portfolio-hero-content', {
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
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.portfolio-page-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, gridRef);
    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-40 pb-20 px-6 md:px-12"
        style={{ backgroundColor: '#111111' }}
      >
        <div className="portfolio-hero-content max-w-3xl mx-auto text-center">
          <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
            Our Work
          </p>
          <h1
            className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight mb-6"
            style={{ color: '#F5F3EE' }}
          >
            Portfolio{' '}
            <span className="font-drama italic" style={{ color: '#E63B2E' }}>
              gallery.
            </span>
          </h1>
          <p
            className="font-heading text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: '#E8E4DD88' }}
          >
            A showcase of recent projects crafted right here in Winnipeg for local and national brands.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#F5F3EE' }}>
        <div className="max-w-7xl mx-auto">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="px-5 py-2.5 text-sm font-heading font-medium transition-all duration-300 border"
                style={{
                  borderRadius: '2rem',
                  backgroundColor: activeFilter === cat ? '#111111' : 'transparent',
                  color: activeFilter === cat ? '#F5F3EE' : '#111111',
                  borderColor: activeFilter === cat ? '#111111' : '#E8E4DD',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Bento masonry grid — images render at their natural aspect ratio */}
          <div
            ref={gridRef}
            style={{
              columnCount: 'var(--col-count)',
              columnGap: '16px',
              '--col-count': 2,
            }}
            className="bento-grid"
          >
            <style>{`
              .bento-grid { --col-count: 2; }
              @media (min-width: 640px)  { .bento-grid { --col-count: 2; } }
              @media (min-width: 900px)  { .bento-grid { --col-count: 3; } }
              @media (min-width: 1200px) { .bento-grid { --col-count: 4; } }
            `}</style>

            {filtered.map((proj, i) => (
              <div
                key={`${proj.client}-${i}`}
                className="portfolio-page-card group relative overflow-hidden cursor-pointer"
                style={{
                  borderRadius: '1.5rem',
                  marginBottom: '16px',
                  breakInside: 'avoid',
                  display: 'inline-block',   /* prevents column break mid-card */
                  width: '100%',
                }}
              >
                {/* Image at full natural aspect ratio — no cropping */}
                <img
                  src={proj.image}
                  alt={proj.type}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                  style={{ display: 'block' }}
                />

                {/* Persistent bottom scrim */}
                <div
                  className="absolute inset-x-0 bottom-0 pointer-events-none"
                  style={{
                    height: '50%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
                  }}
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 20%, rgba(0,0,0,0.2) 60%, transparent 100%)' }}
                />

                {/* Label — slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <p className="font-data text-xs uppercase tracking-wider mb-1" style={{ color: '#E63B2E' }}>
                    {proj.type}
                  </p>
                  <p className="font-heading font-bold text-white text-base leading-snug">{proj.client}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
