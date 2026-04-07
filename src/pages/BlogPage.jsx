import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const allPosts = [
  { title: 'How Much Does an LED Channel Letter Sign Cost in Winnipeg?', excerpt: 'Real price ranges for the Winnipeg market, hidden costs most sign companies don\'t mention upfront, and exactly what to ask before you sign any quote.', category: 'Signs', slug: '/blog/led-channel-letter-sign-cost-winnipeg', date: 'March 15, 2025', image: '/image-assets/website_storefront.webp', alt: 'Custom LED channel letter sign illuminated on a Winnipeg storefront at night — OnBoard Print & Signs' },
  { title: 'Vehicle Wraps vs. Billboards: Which Gives Winnipeg Businesses Better ROI?', excerpt: 'A wrapped van generates up to 70,000 impressions daily at a fraction of billboard cost. Here\'s the real ROI comparison with the numbers.', category: 'Vehicle Wraps', slug: '/blog/vehicle-wraps-vs-billboards-winnipeg', date: 'March 8, 2025', image: 'https://images.unsplash.com/photo-1732690113224-e4230dd9a549?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Branded vehicle wrap on a commercial van — mobile advertising for Winnipeg businesses' },
  { title: 'The Complete Guide to Sign Permits in Winnipeg', excerpt: 'Most Winnipeg businesses need a permit before installing any exterior sign. This guide explains who needs one, what\'s required, and how we handle it.', category: 'Permits', slug: '/blog/sign-permit-guide-winnipeg', date: 'February 28, 2025', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&auto=format&fit=crop', alt: 'Sign permit application documents prepared for City of Winnipeg submission' },
  { title: 'Opening a New Business in Winnipeg? Your Complete Signage Checklist', excerpt: 'Everything a new Winnipeg business needs to think about for signage — from storefront signs and vehicle wraps to permits, timelines, and budget planning.', category: 'Business Tips', slug: '/blog/new-business-signage-checklist-winnipeg', date: 'February 20, 2025', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80&auto=format&fit=crop', alt: 'New business storefront with fresh exterior signage ready for opening day in Winnipeg' },
  { title: 'Custom Wallpaper vs. Paint: Why Winnipeg Businesses Are Choosing Wall Murals', excerpt: 'More Winnipeg restaurants, offices, and retailers are replacing paint with custom commercial wallpaper. Here\'s why — and what it actually costs.', category: 'Print', slug: '/blog/custom-wallpaper-vs-paint-winnipeg-commercial', date: 'February 12, 2025', image: 'https://images.unsplash.com/photo-1627815416399-ddaae0e2fa54?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Custom commercial wallpaper installed in a restaurant interior — branded wall mural in Winnipeg' },
  { title: 'Cast vs. Calendared Vinyl: How to Choose the Right Vehicle Wrap Material', excerpt: 'Using the wrong vinyl is the most common vehicle wrap mistake. Here\'s how to choose for Winnipeg climate and your vehicle type.', category: 'Vehicle Wraps', slug: '/blog/how-to-choose-vehicle-wrap-vinyl-winnipeg', date: 'February 5, 2025', image: 'https://images.unsplash.com/photo-1632605157148-6313421c504b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Cast vs calendared vinyl vehicle wrap — choosing the right material for Winnipeg climate and vehicle type' },
  { title: 'Same-Day Printing in Winnipeg: What\'s Possible, What\'s Not, and How to Order', excerpt: 'Need business cards, banners, or flyers printed today? Here\'s what\'s actually possible for same-day and rush printing — and how to order.', category: 'Print', slug: '/blog/same-day-printing-winnipeg-guide', date: 'January 28, 2025', image: 'https://images.unsplash.com/photo-1662001234358-45b7493d2bc0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Same-day printing in Winnipeg — business cards and flyers printed fast by OnBoard Print & Signs' },
  { title: 'Why Your Winnipeg Business Needs a Website — Not Just a Great Sign', excerpt: 'Your storefront sign gets people through the door. Your website gets them to find you first. Here\'s why you can\'t afford to choose one over the other.', category: 'Web Development', slug: '/blog/why-your-winnipeg-business-needs-a-website-not-just-a-sign', date: 'January 20, 2025', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop', alt: 'Custom business website displayed on a laptop' },
];

const categories = ['All', 'Signs', 'Vehicle Wraps', 'Print', 'Business Tips', 'Permits', 'Web Development'];

export default function BlogPage() {
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const gridRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts =
    activeCategory === 'All'
      ? allPosts
      : allPosts.filter((p) => p.category === activeCategory);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  useSEO({
    title: 'Blog | Signs, Printing & Business Tips for Winnipeg Businesses | OnBoard Print & Signs',
    description: 'Expert tips on signage, vehicle wraps, business branding, and print in Winnipeg. Real advice from the team at OnBoard Print & Signs — read the blog.',
    canonical: 'https://onboardprints.ca/blog',
  });

  useEffect(() => {

    // BreadcrumbList JSON-LD
    const breadcrumbSchema = document.createElement('script');
    breadcrumbSchema.type = 'application/ld+json';
    breadcrumbSchema.id = 'blog-breadcrumb-schema';
    breadcrumbSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://onboardprints.ca/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://onboardprints.ca/blog" },
      ],
    });
    document.head.appendChild(breadcrumbSchema);

    return () => {
      const bs = document.getElementById('blog-breadcrumb-schema');
      if (bs) bs.remove();
    };
  }, []);

  /* Hero animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.blog-hero-content', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  /* Featured card animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.blog-featured-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: featuredRef.current, start: 'top 75%' },
      });
    }, featuredRef);
    return () => ctx.revert();
  }, []);

  /* Grid animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.blog-grid-card', {
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
        <div className="blog-hero-content max-w-3xl mx-auto text-center">
          <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
            Insights &amp; Resources
          </p>
          <h1
            className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight mb-6"
            style={{ color: '#F5F3EE' }}
          >
            The OnBoard{' '}
            <span className="font-drama italic" style={{ color: '#E63B2E' }}>
              Blog.
            </span>
          </h1>
          <p
            className="font-heading text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: '#E8E4DD88' }}
          >
            Signage, print, and branding tips for Winnipeg business owners
          </p>
        </div>
      </section>

      {/* Category Filters + Content */}
      <section className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#F5F3EE' }}>
        <div className="max-w-6xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="font-heading font-semibold text-sm px-5 py-2.5 transition-all duration-300"
                style={{
                  borderRadius: '2rem',
                  backgroundColor: activeCategory === cat ? '#E63B2E' : 'transparent',
                  color: activeCategory === cat ? '#ffffff' : '#111111',
                  border: activeCategory === cat ? '1px solid #E63B2E' : '1px solid rgba(17,17,17,0.3)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div ref={featuredRef} className="mb-12">
              <Link
                to={featuredPost.slug}
                className="blog-featured-card group grid grid-cols-1 md:grid-cols-2 overflow-hidden border"
                style={{ borderRadius: '2rem', borderColor: 'rgba(17,17,17,0.3)', backgroundColor: '#ffffff' }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ minHeight: '320px' }}>
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.alt}
                    loading="eager"
                    width={800}
                    height={600}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <span
                    className="font-data text-xs tracking-widest uppercase mb-4 self-start px-3 py-1"
                    style={{ color: '#E63B2E', backgroundColor: 'rgba(230,59,46,0.08)', borderRadius: '2rem' }}
                  >
                    {featuredPost.category}
                  </span>
                  <h2
                    className="font-heading font-bold text-xl md:text-2xl tracking-tight mb-3"
                    style={{ color: '#111111' }}
                  >
                    {featuredPost.title}
                  </h2>
                  <p
                    className="font-heading text-sm leading-relaxed mb-5"
                    style={{ color: '#111111aa' }}
                  >
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="flex items-center gap-1.5 font-data text-xs" style={{ color: '#111111aa' }}>
                      <User size={13} /> By the OnBoard Team
                    </span>
                    <span className="flex items-center gap-1.5 font-data text-xs" style={{ color: '#111111aa' }}>
                      <Calendar size={13} /> {featuredPost.date}
                    </span>
                  </div>
                  <span
                    className="btn-magnetic inline-flex items-center gap-2 px-6 py-3 text-sm font-heading font-semibold text-white self-start"
                    style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}
                  >
                    <span className="btn-bg" style={{ backgroundColor: '#111111' }}></span>
                    <span className="btn-text flex items-center gap-2">
                      Read Article <ArrowRight size={14} />
                    </span>
                  </span>
                </div>
              </Link>
            </div>
          )}

          {/* Grid of remaining posts */}
          {remainingPosts.length > 0 && (
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {remainingPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={post.slug}
                  className="blog-grid-card group overflow-hidden border flex flex-col"
                  style={{ borderRadius: '2rem', borderColor: 'rgba(17,17,17,0.3)', backgroundColor: '#ffffff' }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: '220px' }}>
                    <img
                      src={post.image}
                      alt={post.alt}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6 md:p-8">
                    <span
                      className="font-data text-xs tracking-widest uppercase mb-3 self-start px-3 py-1"
                      style={{ color: '#E63B2E', backgroundColor: 'rgba(230,59,46,0.08)', borderRadius: '2rem' }}
                    >
                      {post.category}
                    </span>
                    <h3
                      className="font-heading font-bold text-lg tracking-tight mb-2"
                      style={{ color: '#111111' }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="font-heading text-sm leading-relaxed mb-4"
                      style={{
                        color: '#111111aa',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {post.excerpt}
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="flex items-center gap-1.5 font-data text-xs" style={{ color: '#111111aa' }}>
                          <User size={13} /> By the OnBoard Team
                        </span>
                        <span className="flex items-center gap-1.5 font-data text-xs" style={{ color: '#111111aa' }}>
                          <Calendar size={13} /> {post.date}
                        </span>
                      </div>
                      <span
                        className="font-heading font-semibold text-sm flex items-center gap-1.5 transition-colors duration-300 group-hover:text-accent"
                        style={{ color: '#E63B2E' }}
                      >
                        Read More <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty state */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="font-heading text-lg" style={{ color: '#111111aa' }}>
                No posts found in this category yet. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
