import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'OnBoard wrapped our entire delivery fleet in under a week. The quality is incredible — even after two Manitoba winters, the wraps still look brand new. They turned our vans into the best advertising we have ever invested in.',
    name: 'David Murray',
    title: 'Operations Manager',
    company: 'Prairie Fleet Services',
    rating: 5,
  },
  {
    quote: 'We needed signage for our new Pembina Highway location on a tight deadline. OnBoard handled everything from city permits to installation, and the finished sign exceeded our expectations. Professional, transparent, and fast.',
    name: 'Jasmine Fehr',
    title: 'Owner',
    company: 'The Exchange District Cafe',
    rating: 5,
  },
  {
    quote: 'As a business firm, our printed materials need to communicate trust and professionalism. OnBoard delivered business cards and brochures with a level of print quality I have not seen from any other Winnipeg shop. They understand brand consistency.',
    name: 'Michael Sinclair',
    title: 'Managing Partner',
    company: 'Burgess Law Group',
    rating: 5,
  },
  {
    quote: 'The custom wallpaper OnBoard produced for our office lobby completely transformed the space. Clients constantly comment on it. The installation was seamless, and the colours are exactly what we specified in our brand guidelines.',
    name: 'Xiang Zhao',
    title: 'Marketing Director',
    company: 'River Avenue Financial',
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
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
      style={{ backgroundColor: '#111111' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
            Client Testimonials
          </p>
          <h2
            className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-5"
            style={{ color: '#F5F3EE' }}
          >
            What our clients{' '}
            <span className="font-drama italic" style={{ color: '#E63B2E' }}>
              say.
            </span>
          </h2>
          <p
            className="font-heading text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: '#E8E4DD66' }}
          >
            We have earned the trust of hundreds of Winnipeg businesses — from local
            startups to established enterprises. Here is what a few of them have to say about
            working with OnBoard Print &amp; Signs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card p-8 border transition-all duration-500 hover:-translate-y-1"
              style={{
                borderRadius: '2rem',
                backgroundColor: '#1A1A1F',
                borderColor: '#E8E4DD15',
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="#E63B2E" stroke="#E63B2E" />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="font-heading text-sm md:text-base leading-relaxed mb-6"
                style={{ color: '#E8E4DDcc' }}
              >
                "{t.quote}"
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 flex items-center justify-center font-heading font-bold text-sm flex-shrink-0"
                  style={{
                    backgroundColor: '#E63B2E15',
                    borderRadius: '50%',
                    color: '#E63B2E',
                  }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p
                    className="font-heading font-semibold text-sm"
                    style={{ color: '#F5F3EE' }}
                  >
                    {t.name}
                  </p>
                  <p className="font-heading text-xs" style={{ color: '#E8E4DD66' }}>
                    {t.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate rating */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 border" style={{ borderRadius: '2rem', borderColor: '#E8E4DD15', backgroundColor: '#1A1A1F' }}>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="#E63B2E" stroke="#E63B2E" />
              ))}
            </div>
            <span className="font-heading font-bold text-sm" style={{ color: '#F5F3EE' }}>4.9</span>
            <span className="font-heading text-xs" style={{ color: '#E8E4DD55' }}>average rating from 128+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
