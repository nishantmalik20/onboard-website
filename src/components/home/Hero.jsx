import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from('.hero-panel',    { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from('.hero-eyebrow',  { y: 14, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
        .from('.hero-h1',       { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.45')
        .from('.hero-sub',      { y: 14, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.45')
        .from('.hero-cta',      { y: 14, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="pt-24 md:pt-0 px-4 md:px-0" style={{ backgroundColor: '#111111' }}>

      {/* Image container — natural aspect ratio on mobile (no crop), 100dvh on desktop (slight crop ok) */}
      <div className="hero-img-wrap relative w-full aspect-[2752/1536] md:aspect-auto md:h-[100dvh] overflow-hidden rounded-[1.25rem] md:rounded-none">

        <picture>
          <source srcSet="/hero.webp" type="image/webp" />
          <img
            src="/hero.jpg"
            alt="OnBoard Print & Signs — commercial signage, vehicle wraps, and large-format printing in Winnipeg, Manitoba"
            width="2752"
            height="1536"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </picture>

        {/* Subtle bottom fade — helps text blend without covering the image */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '45%',
            background: 'linear-gradient(to top, rgba(10,10,10,0.55) 0%, transparent 100%)',
          }}
        />

        {/* Text panel — desktop only, vertically centred left */}
        <div className="hero-panel absolute inset-y-0 left-0 right-0 hidden md:flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
            <div
              style={{
                display: 'inline-block',
                maxWidth: '520px',
                padding: '1.5rem 1.75rem',
                background: 'rgba(17, 17, 17, 0.65)',
                borderRadius: '1.25rem',
                border: '1px solid rgba(232, 228, 221, 0.08)',
              }}
            >
              <TextContent />
            </div>
          </div>
        </div>

      </div>

      {/* Mobile text — below image on solid dark background */}
      <div
        className="md:hidden px-6 py-10"
        style={{ backgroundColor: '#111111' }}
      >
        <TextContent />
      </div>

    </section>
  );
}

function TextContent() {
  return (
    <>
      <p
        className="hero-eyebrow font-data text-[10px] tracking-[0.22em] uppercase mb-3 flex items-center gap-2.5"
        style={{ color: '#E63B2E' }}
      >
        <span className="inline-block w-4 h-px flex-shrink-0" style={{ backgroundColor: '#E63B2E' }} />
        Signs &middot; Wraps &middot; Print &middot; Web &mdash; Winnipeg, MB
      </p>

      <h1
        className="hero-h1 font-heading font-bold tracking-tight leading-[1.05] mb-3"
        style={{
          color: '#F5F3EE',
          fontSize: 'clamp(1.5rem, 2.4vw, 2.6rem)',
          textShadow: '0 1px 8px rgba(0,0,0,0.55)',
        }}
      >
        Winnipeg's Fast &amp; Reliable Partner for{' '}
        <span className="font-drama italic" style={{ color: '#E63B2E' }}>
          Commercial Print &amp; Signage.
        </span>
      </h1>

      <p
        className="hero-sub font-heading text-sm leading-relaxed mb-6"
        style={{
          color: 'rgba(232,228,221,0.80)',
          textShadow: '0 1px 6px rgba(0,0,0,0.45)',
        }}
      >
        From same-day business cards to full building wraps — commercial-grade quality
        with 24-hour turnaround on most standard orders.
      </p>

      <div className="hero-cta flex flex-wrap gap-3">
        <Link
          to="/quote"
          className="btn-magnetic inline-flex items-center gap-2 px-6 py-3 text-sm font-heading font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ backgroundColor: '#E63B2E', borderRadius: '2rem', outlineColor: '#E63B2E' }}
        >
          <span className="btn-bg" style={{ backgroundColor: '#111111' }} />
          <span className="btn-text flex items-center gap-2 text-white">
            Get a Custom Quote <ArrowRight size={15} />
          </span>
        </Link>
        <Link
          to="/services"
          className="btn-magnetic inline-flex items-center gap-2 px-6 py-3 text-sm font-heading font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            backgroundColor: 'transparent',
            borderRadius: '2rem',
            border: '1.5px solid rgba(245,243,238,0.35)',
            color: '#F5F3EE',
            outlineColor: '#F5F3EE',
          }}
        >
          <span className="btn-bg" style={{ backgroundColor: 'rgba(245,243,238,0.07)' }} />
          <span className="btn-text flex items-center gap-2">
            Explore Services <ChevronRight size={15} />
          </span>
        </Link>
      </div>
    </>
  );
}
