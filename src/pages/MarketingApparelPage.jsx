import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, ChevronRight, MessageSquare, Upload, Eye, Package } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Apparel subcategory data ─── */
const apparelProducts = [
  {
    title: 'Hoodies',
    images: [
      { src: '/product-marketing/hoodie.webp', alt: 'Custom branded hoodie with embroidered logo — marketing apparel for Winnipeg businesses' },
      { src: '/product-marketing/hoodie_2.webp', alt: 'Custom printed hoodie — promotional apparel for Winnipeg teams and events' },
    ],
    description: 'Heavyweight fleece hoodies customized with your logo or design. Embroidery for a premium, long-lasting finish. Screen printing for bold, full-colour graphics. Perfect for team uniforms, client gifts, and brand merchandise.',
    methods: ['Embroidery', 'Screen Printing', 'Heat Transfer'],
  },
  {
    title: 'Crewnecks',
    images: [{ src: '/product-marketing/crewneck.webp', alt: 'Custom branded crewneck sweatshirt with logo — promotional apparel Winnipeg' }],
    description: 'Classic crewneck sweatshirts with your brand applied cleanly and durably. A versatile everyday piece that works for any team or brand program.',
    methods: ['Embroidery', 'Screen Printing', 'Heat Transfer'],
  },
  {
    title: 'T-Shirts',
    images: [{ src: '/product-marketing/tshirt.webp', alt: 'Custom branded t-shirts for Winnipeg businesses — screen printed or embroidered team shirts' }],
    description: 'From event tees to everyday staff uniforms, custom t-shirts are the most versatile piece in any brand\'s apparel lineup. Available in a wide range of colours, weights, and fits.',
    methods: ['Screen Printing', 'DTG Printing', 'Embroidery', 'Heat Transfer'],
  },
  {
    title: 'Hats',
    images: [{ src: '/product-marketing/hat.webp', alt: 'Custom embroidered branded hats for Winnipeg businesses — promotional caps with logo' }],
    description: 'Structured caps, dad hats, and snapbacks embroidered with your logo. One of the highest-worn promotional products — your brand on the move, every day.',
    methods: ['Embroidery', 'Patch Application', 'Heat Transfer'],
  },
  {
    title: 'Toques',
    images: [{ src: '/product-marketing/toque.webp', alt: 'Custom branded toques for Winnipeg businesses — embroidered winter hats with logo' }],
    description: 'Built for Winnipeg winters. Custom toques with your embroidered logo keep your team warm and your brand visible through the coldest months of the year.',
    methods: ['Embroidery', 'Patch Application'],
  },
  {
    title: 'Pants',
    images: [{ src: '/product-marketing/pants.webp', alt: 'Custom branded pants and workwear bottoms — promotional apparel for Winnipeg teams' }],
    description: 'Branded bottoms for team uniforms, workwear programs, and athletic sets. Available in jogger, cargo, and work pant styles with embroidered or printed branding.',
    methods: ['Embroidery', 'Screen Printing', 'Heat Transfer'],
  },
  {
    title: 'Workwear',
    images: [{ src: '/product-marketing/workwear.webp', alt: 'Custom branded workwear for Winnipeg trades and businesses — embroidered high-visibility and safety apparel' }],
    description: 'High-visibility vests, safety jackets, coveralls, and durable work shirts — branded with your company logo for a professional, consistent team appearance on every job site. Built for trades, construction, and service businesses across Winnipeg.',
    methods: ['Embroidery', 'Screen Printing', 'Heat Transfer Vinyl'],
  },
  {
    title: 'Pens',
    images: [{ src: '/product-marketing/pen.webp', alt: 'Custom branded pens with logo — promotional products for Winnipeg businesses' }],
    description: 'Every client handshake is an opportunity to leave your brand behind. Custom branded pens are one of the most cost-effective promotional products — kept, used, and seen daily.',
    methods: ['Laser Engraving', 'Pad Printing', 'Full-Colour Wrap'],
  },
  {
    title: 'Diaries & Notebooks',
    images: [{ src: '/product-marketing/diary.webp', alt: 'Custom branded notebooks and diaries — promotional products for Winnipeg corporate gifting' }],
    description: 'Premium branded notebooks and journals for corporate gifting, event packages, and client onboarding kits. Your logo on something people use every day — at the desk, in meetings, and on the road.',
    methods: ['Debossing', 'Screen Printing', 'Full-Colour Wrap', 'Laser Engraving'],
  },
  {
    title: 'Mugs',
    images: [{ src: '/product-marketing/mugs.webp', alt: 'Custom branded mugs for Winnipeg businesses — logo coffee mugs for corporate gifts and team merchandise' }],
    description: 'Custom branded mugs for team gifts, client appreciation packages, and office branding. Ceramic, travel, and enamel options available. A daily brand impression — every morning, every coffee break.',
    methods: ['Sublimation Printing', 'Laser Engraving', 'Wrap Printing'],
  },
  {
    title: 'Stickers',
    images: [{ src: '/product-marketing/sticker.webp', alt: 'Custom branded stickers for Winnipeg businesses — die-cut and vinyl stickers with logo' }],
    description: 'Custom die-cut, vinyl, and kiss-cut stickers with your logo, design, or branding. Weatherproof, durable, and endlessly versatile — used on packaging, laptops, helmets, water bottles, storefronts, and event giveaways. One of the highest-ROI promotional products: low cost per unit, high brand exposure.',
    methods: ['Digital Print', 'Die-Cut', 'Kiss-Cut', 'Vinyl Cut'],
  },
];

const whyColumns = [
  {
    title: 'Brand Consistency',
    text: 'We already know your brand. If we\'ve made your sign, your vehicle wrap, or your business cards, we understand your colours, your standards, and your identity. Your apparel will match — not approximate.',
  },
  {
    title: 'One Team, Everything',
    text: 'You don\'t need a sign company, a print shop, and an apparel supplier. We handle your physical signage, your print materials, your website, and now your apparel — all under one roof. One relationship, full brand coverage.',
  },
  {
    title: 'Quality We Stand Behind',
    text: 'We won\'t put your logo on something we\'re not proud of. Every apparel item we produce meets the same quality standard as every sign we install — because your brand is on it, and that matters.',
  },
];

const orderSteps = [
  { icon: MessageSquare, title: 'Get in touch', text: 'Call, WhatsApp, or fill out our quote form. Tell us what you need — category, approximate quantity, and your timeline.' },
  { icon: Upload, title: 'Share your brand', text: 'Send us your logo (vector preferred: AI, EPS, PDF) and any colour specs. If you don\'t have a vector file, our design team can help.' },
  { icon: Eye, title: 'We prepare a proof', text: 'You\'ll see exactly what your apparel will look like before anything is produced. We don\'t proceed without your approval.' },
  { icon: Package, title: 'Production & delivery', text: 'We produce your order and have it ready for pickup or delivery in Winnipeg.' },
];

const faqs = [
  { q: 'What is the minimum order quantity for custom apparel?', a: 'Minimum quantities vary by product and decoration method. As a general guide: screen printed t-shirts typically start at 12 pieces; embroidered items (hats, hoodies, workwear) often start at 6 pieces; promotional items like mugs and pens start at 24 pieces; stickers typically start at 50 pieces. Contact us for exact minimums on your specific order.' },
  { q: 'Can you match my exact brand colours?', a: 'Yes. We colour-match to your Pantone or CMYK specs for screen printing, and match thread colours as closely as possible for embroidery. We provide a proof for your approval before production begins.' },
  { q: 'What file format do I need to provide for my logo?', a: 'Vector files are preferred — AI, EPS, or print-ready PDF. High-resolution PNG (300 DPI minimum) is also acceptable for most decoration methods. If you only have a low-resolution file, our design team can redraw your logo in vector format for a small fee.' },
  { q: 'How long does a custom apparel order take?', a: 'Standard turnaround is 10–15 business days from proof approval. Rush orders may be available depending on quantity and decoration method — contact us to discuss your timeline.' },
  { q: 'Do you deliver to Steinbach and Selkirk?', a: 'Yes. We serve businesses throughout Winnipeg, Steinbach, Selkirk, and surrounding Manitoba communities. Contact us to arrange delivery or pickup.' },
  { q: 'Can I order different items in the same order (e.g. hoodies and mugs together)?', a: 'Yes. Many of our clients order a full brand kit — apparel, mugs, pens, and notebooks — all in one order. We coordinate everything and deliver together.' },
];

/* ─── FAQ accordion item ─── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: '#E8E4DD20' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left bg-transparent border-none cursor-pointer"
      >
        <span className="font-heading font-semibold text-base" style={{ color: '#F5F3EE' }}>{q}</span>
        <ChevronDown
          size={18}
          className="flex-shrink-0 ml-4 transition-transform duration-300"
          style={{ color: '#E63B2E', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? '400px' : '0px' }}>
        <p className="font-heading text-sm leading-relaxed pb-5" style={{ color: '#E8E4DD88' }}>{a}</p>
      </div>
    </div>
  );
}

/* ─── Breadcrumb ─── */
function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-heading mb-6" style={{ color: '#E8E4DD66' }}>
      <Link to="/" className="hover:underline" style={{ color: '#E8E4DD66' }}>Home</Link>
      <ChevronRight size={12} />
      <Link to="/products" className="hover:underline" style={{ color: '#E8E4DD66' }}>Products</Link>
      <ChevronRight size={12} />
      <span style={{ color: '#E8E4DDaa' }}>Marketing Apparel Winnipeg</span>
    </nav>
  );
}

/* ─── Apparel product card ─── */
function ApparelCard({ product }) {
  const hasTwoImages = product.images.length === 2;

  return (
    <div
      className="group overflow-hidden border flex flex-col h-full"
      style={{ borderRadius: '2rem', borderColor: 'rgba(17,17,17,0.15)', backgroundColor: '#ffffff' }}
    >
      {/* Image area */}
      {hasTwoImages ? (
        <div className="grid grid-cols-2 gap-0.5" style={{ height: '260px' }}>
          {product.images.map((img, i) => (
            <div key={i} className="relative overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                width={600}
                height={400}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative overflow-hidden" style={{ height: '260px' }}>
          <img
            src={product.images[0].src}
            alt={product.images[0].alt}
            loading="lazy"
            decoding="async"
            width={600}
            height={400}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 md:p-8">
        <h3
          className="font-heading font-bold text-xl tracking-tight mb-2"
          style={{ color: '#111111' }}
        >
          {product.title}
        </h3>
        <p
          className="font-heading text-sm leading-relaxed mb-4 flex-1"
          style={{ color: '#111111aa' }}
        >
          {product.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {product.methods.map((method) => (
            <span
              key={method}
              className="font-data text-[10px] tracking-wider uppercase px-2.5 py-1"
              style={{ color: '#E63B2E', backgroundColor: 'rgba(230,59,46,0.08)', borderRadius: '2rem' }}
            >
              {method}
            </span>
          ))}
        </div>
        <div className="mt-auto">
          <Link
            to="/contact"
            className="btn-magnetic inline-flex items-center gap-2 px-5 py-2.5 text-sm font-heading font-semibold text-white"
            style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}
          >
            <span className="btn-bg" style={{ backgroundColor: '#111111' }}></span>
            <span className="btn-text flex items-center gap-2">Get a Quote <ArrowRight size={14} /></span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Main page component ─── */
export default function MarketingApparelPage() {
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const gridRef = useRef(null);
  const whyRef = useRef(null);
  const orderRef = useRef(null);

  useSEO({
    title: 'Marketing Apparel & Promotional Products Winnipeg | OnBoard Print & Signs',
    description: 'Custom branded hoodies, t-shirts, hats, toques, workwear, mugs, pens, and more in Winnipeg. High-quality marketing apparel with your logo — designed and delivered by OnBoard Print & Signs.',
    canonical: 'https://onboardprints.ca/products/marketing-apparel-winnipeg',
  });

  /* Structured data */
  useEffect(() => {

    // BreadcrumbList schema
    const breadcrumbSchema = document.createElement('script');
    breadcrumbSchema.type = 'application/ld+json';
    breadcrumbSchema.id = 'apparel-breadcrumb-schema';
    breadcrumbSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://onboardprints.ca/" },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://onboardprints.ca/products" },
        { "@type": "ListItem", "position": 3, "name": "Marketing Apparel Winnipeg", "item": "https://onboardprints.ca/products/marketing-apparel-winnipeg" },
      ],
    });
    document.head.appendChild(breadcrumbSchema);

    // Product schema
    const productSchema = document.createElement('script');
    productSchema.type = 'application/ld+json';
    productSchema.id = 'apparel-product-schema';
    productSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Marketing Apparel & Promotional Products",
      "description": "Custom branded hoodies, t-shirts, hats, toques, workwear, mugs, pens, and promotional items for Winnipeg businesses. Designed and fulfilled by OnBoard Print & Signs.",
      "brand": { "@type": "Brand", "name": "OnBoard Print & Signs" },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "CAD",
        "availability": "https://schema.org/InStock",
      },
    });
    document.head.appendChild(productSchema);

    // FAQPage schema
    const faqSchema = document.createElement('script');
    faqSchema.type = 'application/ld+json';
    faqSchema.id = 'apparel-faq-schema';
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a },
      })),
    });
    document.head.appendChild(faqSchema);

    return () => {
      ['apparel-breadcrumb-schema', 'apparel-product-schema', 'apparel-faq-schema'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, []);

  /* GSAP animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.apparel-hero-content', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.apparel-intro', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: introRef.current, start: 'top 75%' } });
    }, introRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.apparel-card', { y: 50, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: gridRef.current, start: 'top 70%' } });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-col', { y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: whyRef.current, start: 'top 70%' } });
    }, whyRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.order-step', { y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: orderRef.current, start: 'top 70%' } });
    }, orderRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ─── Hero ─── */}
      <section ref={heroRef} className="relative pt-40 pb-16 px-6 md:px-12" style={{ backgroundColor: '#111111' }}>
        <div className="apparel-hero-content max-w-3xl mx-auto">
          <Breadcrumbs />
          <h1 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight mb-6" style={{ color: '#F5F3EE' }}>
            Marketing Apparel &amp; Promotional Products{' '}
            <span className="font-drama italic" style={{ color: '#E63B2E' }}>Winnipeg.</span>
          </h1>
          <p className="font-heading text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: '#E8E4DD88' }}>
            Your brand doesn't stop at the storefront. Custom apparel and promotional products turn your team, your customers, and everyday objects into walking brand impressions — in Winnipeg and everywhere your people go.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/contact"
              className="btn-magnetic inline-flex items-center gap-2 px-6 py-3 text-sm font-heading font-semibold text-white"
              style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}
            >
              <span className="btn-bg" style={{ backgroundColor: '#333' }}></span>
              <span className="btn-text flex items-center gap-2">Get a Quote <ArrowRight size={14} /></span>
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-heading font-semibold border transition-colors duration-200 hover:bg-white/10"
              style={{ borderRadius: '2rem', borderColor: '#E8E4DD44', color: '#E8E4DDaa' }}
            >
              View All Products <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Hero Image ─── */}
      <section className="px-6 md:px-12 py-8" style={{ backgroundColor: '#F5F3EE' }}>
        <div className="max-w-4xl mx-auto overflow-hidden" style={{ borderRadius: '2rem' }}>
          <img
            src="/product-marketing/hoodie.webp"
            alt="Custom branded hoodie with embroidered logo — marketing apparel for Winnipeg businesses"
            width={1600}
            height={900}
            loading="eager"
            className="w-full h-auto object-cover"
            style={{ maxHeight: '500px' }}
          />
        </div>
      </section>

      {/* ─── Intro Section ─── */}
      <section ref={introRef} className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#F5F3EE' }}>
        <div className="apparel-intro max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-6" style={{ color: '#111111' }}>
            Turn Your Brand Into Something People Wear
          </h2>
          <div className="space-y-4 font-heading text-base leading-relaxed" style={{ color: '#444' }}>
            <p>
              At <Link to="/about" className="font-semibold underline" style={{ color: '#E63B2E' }}>OnBoard Print &amp; Signs</Link>, we're known for the signs on your storefront, the wrap on your van, and the mural on your office wall. But brand identity doesn't stop at the building. Marketing apparel and promotional products extend your brand into every handshake, every job site, every morning coffee, and every team uniform.
            </p>
            <p>
              Whether you need embroidered hoodies for your crew, screen-printed t-shirts for an event, custom mugs for client gifts, or branded workwear for a full team rollout — we handle design, production, and delivery. Same quality standard. Same attention to detail. Same team.
            </p>
            <p>
              We serve businesses of all sizes across Winnipeg, Steinbach, and Selkirk, Manitoba.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Products Grid ─── */}
      <section ref={gridRef} className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#F5F3EE' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">What We Offer</p>
            <h2 className="font-heading font-bold text-2xl md:text-4xl tracking-tight mb-4" style={{ color: '#111111' }}>
              Our Marketing Apparel &amp; Promotional{' '}
              <span className="font-drama italic" style={{ color: '#E63B2E' }}>Products.</span>
            </h2>
            <p className="font-heading text-base max-w-2xl mx-auto" style={{ color: '#111111aa' }}>
              Custom branded with your logo, colours, and design — built for Winnipeg businesses that take their brand seriously.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apparelProducts.map((product) => (
              <div key={product.title} className="apparel-card h-full">
                <ApparelCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose OnBoard ─── */}
      <section ref={whyRef} className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#111111' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">Why OnBoard</p>
            <h2 className="font-heading font-bold text-2xl md:text-4xl tracking-tight" style={{ color: '#F5F3EE' }}>
              Why Winnipeg Businesses Choose OnBoard for Branded{' '}
              <span className="font-drama italic" style={{ color: '#E63B2E' }}>Apparel.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyColumns.map((col) => (
              <div key={col.title} className="why-col p-8 border" style={{ borderRadius: '2rem', borderColor: '#E8E4DD20', backgroundColor: '#FFFFFF08' }}>
                <h3 className="font-heading font-bold text-lg mb-3" style={{ color: '#F5F3EE' }}>{col.title}</h3>
                <p className="font-heading text-sm leading-relaxed" style={{ color: '#E8E4DD88' }}>{col.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How to Order ─── */}
      <section ref={orderRef} className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#F5F3EE' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">Process</p>
            <h2 className="font-heading font-bold text-2xl md:text-4xl tracking-tight" style={{ color: '#111111' }}>
              How to Order Custom Apparel in{' '}
              <span className="font-drama italic" style={{ color: '#E63B2E' }}>Winnipeg.</span>
            </h2>
          </div>
          <div className="space-y-4">
            {orderSteps.map((step, i) => (
              <div
                key={step.title}
                className="order-step flex items-start gap-5 p-6 border"
                style={{ borderRadius: '1.5rem', borderColor: '#E8E4DD60', backgroundColor: '#FFFFFF60' }}
              >
                <div
                  className="w-12 h-12 flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: '#E63B2E', borderRadius: '0.75rem' }}
                >
                  <step.icon size={20} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-data text-xs font-bold" style={{ color: '#E63B2E' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-heading font-bold text-base" style={{ color: '#111111' }}>{step.title}</h3>
                  </div>
                  <p className="font-heading text-sm leading-relaxed" style={{ color: '#444' }}>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/contact"
              className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 text-base font-heading font-semibold text-white"
              style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}
            >
              <span className="btn-bg" style={{ backgroundColor: '#111111' }}></span>
              <span className="btn-text flex items-center gap-2">Start Your Order <ArrowRight size={14} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#111111' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">Common Questions</p>
            <h2 className="font-heading font-bold text-2xl md:text-4xl tracking-tight" style={{ color: '#F5F3EE' }}>
              Frequently Asked{' '}
              <span className="font-drama italic" style={{ color: '#E63B2E' }}>Questions.</span>
            </h2>
          </div>
          {faqs.map((faq) => <FaqItem key={faq.q} {...faq} />)}
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="py-16 px-6 md:px-12" style={{ backgroundColor: '#F5F3EE' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-4" style={{ color: '#111111' }}>
            Ready to Put Your Brand on Everything?
          </h2>
          <p className="font-heading text-base leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: '#444' }}>
            From a single product to a full brand kit — hoodies, hats, mugs, pens, stickers, and more. Tell us what you need and we'll handle the rest.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 text-base font-heading font-semibold text-white"
              style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}
            >
              <span className="btn-bg" style={{ backgroundColor: '#111111' }}></span>
              <span className="btn-text flex items-center gap-2">Get a Quote <ArrowRight size={14} /></span>
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-heading font-semibold border text-dark transition-colors duration-200 hover:bg-dark hover:text-white"
              style={{ borderRadius: '2rem', borderColor: '#111111' }}
            >
              View All Products <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
