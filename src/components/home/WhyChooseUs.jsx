import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Shield, Layers, Zap, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs() {
  const sectionRef = useRef(null);

  const pillars = [
    {
      icon: MapPin,
      title: 'Local Winnipeg Production',
      desc: 'No waiting for out-of-province shipping. Your project is manufactured right here in Winnipeg, giving you faster access and hands-on quality control. Visit our Lucas Avenue facility anytime to see your project in production.',
      highlights: ['Same-city production', 'On-site facility tours', 'Local installation crews'],
    },
    {
      icon: Shield,
      title: 'Commercial-Grade Quality',
      desc: 'We invest in industrial-class equipment — HP Latex wide-format printers, Roland print-and-cut systems, and precision CNC routers — because your brand deserves output that matches the quality of national franchises.',
      highlights: ['HP Latex & Roland systems', 'Colour-matched proofing', 'Premium materials only'],
    },
    {
      icon: Layers,
      title: 'End-to-End Service',
      desc: 'From the first design consultation through print production and professional installation — one team handles everything. That means one point of contact, one invoice, and zero miscommunications between vendors.',
      highlights: ['In-house design team', 'Production & finishing', 'Professional installation'],
    },
    {
      icon: Zap,
      title: 'Speed & Reliability',
      desc: 'Same-day printing for urgent projects. 24-hour turnaround on most standard orders. We quote guaranteed deadlines — not estimates — because we know your launch date, event, or grand opening cannot wait.',
      highlights: ['Same-day rush available', '24hr standard turnaround', 'Guaranteed deadlines'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.from('.value-card-wrapper', {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });
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
        <div className="why-header max-w-2xl mb-16">
          <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
            Why OnBoard
          </p>
          <h2
            className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-5"
            style={{ color: '#F5F3EE' }}
          >
            Built for{' '}
            <span className="font-drama italic" style={{ color: '#E63B2E' }}>
              business.
            </span>
          </h2>
          <p
            className="font-heading text-base md:text-lg leading-relaxed"
            style={{ color: '#E8E4DD66' }}
          >
            Winnipeg businesses choose OnBoard because we combine the responsiveness of
            a local shop with the production capabilities of a national supplier. Every
            project gets the same attention to detail — whether it is 100 business cards
            or a full building wrap.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p) => (
            <div key={p.title} className="value-card-wrapper">
              <div
                className="p-8 border transition-all duration-500 hover:-translate-y-1 h-full"
                style={{
                  borderRadius: '2rem',
                  backgroundColor: '#1A1A1F',
                  borderColor: '#E8E4DD15',
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mb-5"
                  style={{ backgroundColor: '#E63B2E15', borderRadius: '1rem' }}
                >
                  <p.icon size={22} className="text-accent" />
                </div>
                <h3
                  className="font-heading font-bold text-xl mb-3"
                  style={{ color: '#F5F3EE' }}
                >
                  {p.title}
                </h3>
                <p
                  className="font-heading text-sm leading-relaxed mb-5"
                  style={{ color: '#E8E4DD88' }}
                >
                  {p.desc}
                </p>
                <ul className="flex flex-col gap-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-accent flex-shrink-0" />
                      <span className="font-heading text-xs" style={{ color: '#E8E4DDaa' }}>
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
