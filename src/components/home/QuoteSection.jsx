import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function QuoteSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.quote-content', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="quote"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 bg-background"
    >
      <div className="quote-content max-w-3xl mx-auto text-center">
        <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
          Get Started
        </p>
        <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-6 text-dark">
          Ready to{' '}
          <span className="font-drama italic text-accent">
            build?
          </span>
        </h2>
        <p className="font-heading text-base md:text-lg leading-relaxed mb-10 text-dark/70">
          Tell us about your project. We'll respond with a transparent, line-item quote
          within 2 hours during business hours. No obligation, no fine print.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:contact@onboardprints.ca"
            className="btn-magnetic inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-heading font-semibold text-white group"
            style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}
          >
            <span className="btn-bg" style={{ backgroundColor: '#111111' }}></span>
            <span className="btn-text flex items-center gap-3 text-white transition-colors">
              <Mail size={18} /> Email Us a Brief
            </span>
          </a>
          <a
            href="tel:+12048691503"
            className="btn-magnetic inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-heading font-semibold text-dark border border-dark/20"
            style={{ borderRadius: '2rem' }}
          >
            <span className="btn-bg" style={{ backgroundColor: '#E8E4DD' }}></span>
            <span className="btn-text flex items-center gap-3">
              <Phone size={18} /> Call +1-204-869-1503
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
