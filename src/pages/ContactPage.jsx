import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import ContactForm from '../components/forms/ContactForm';

export default function ContactPage() {
  useSEO({
    title: 'Contact OnBoard Print & Signs | Winnipeg Print Shop | Call 204-869-1503',
    description: 'Get in touch with OnBoard Print & Signs at 205 Lucas Ave #118, Winnipeg, MB. Call +1-204-869-1503 or email contact@onboardprints.ca. Open Mon-Sun.',
    canonical: 'https://onboardprints.ca/contact',
  });

  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-hero-content', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });
      gsap.from('.contact-grid > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.4,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const info = [
    {
      icon: MapPin,
      label: 'Address',
      lines: ['205 Lucas Ave #118', 'Winnipeg, MB R2R 2S9'],
    },
    {
      icon: Phone,
      label: 'Phone',
      lines: ['+1-204-869-1503'],
      href: 'tel:+12048691503',
    },
    {
      icon: Mail,
      label: 'Email',
      lines: ['contact@onboardprints.ca'],
      href: 'mailto:contact@onboardprints.ca',
    },
    {
      icon: Clock,
      label: 'Hours',
      lines: ['Mon - Fri: 8 AM - 7 PM', 'Saturday: 10 AM - 7 PM', 'Sunday: 1 PM - 7 PM'],
    },
  ];

  return (
    <div ref={heroRef}>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-12" style={{ backgroundColor: '#111111' }}>
        <div className="contact-hero-content max-w-3xl mx-auto text-center">
          <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
            Get In Touch
          </p>
          <h1
            className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight mb-6"
            style={{ color: '#F5F3EE' }}
          >
            Contact{' '}
            <span className="font-drama italic" style={{ color: '#E63B2E' }}>
              us.
            </span>
          </h1>
          <p
            className="font-heading text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: '#E8E4DD88' }}
          >
            Have a question or ready to start a project? Reach out and we will get back to you quickly.
          </p>
        </div>
      </section>

      {/* Split: Form + Info */}
      <section className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#111111' }}>
        <div className="contact-grid max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Form */}
          <div>
            <h2 className="font-heading font-bold text-2xl mb-8" style={{ color: '#F5F3EE' }}>
              Send us a message
            </h2>
            <ContactForm />
          </div>

          {/* Right: Info + Map */}
          <div>
            <h2 className="font-heading font-bold text-2xl mb-8" style={{ color: '#F5F3EE' }}>
              Business Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {info.map((item) => (
                <div
                  key={item.label}
                  className="p-6 border"
                  style={{
                    borderRadius: '2rem',
                    backgroundColor: '#1A1A1F',
                    borderColor: '#E8E4DD15',
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-4"
                    style={{ backgroundColor: '#E63B2E15', borderRadius: '0.75rem' }}
                  >
                    <item.icon size={18} className="text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-sm mb-2 uppercase tracking-widest" style={{ color: '#E8E4DD' }}>
                    {item.label}
                  </h3>
                  {item.lines.map((line) => (
                    item.href ? (
                      <a
                        key={line}
                        href={item.href}
                        className="block font-heading text-sm link-lift"
                        style={{ color: '#E8E4DDaa' }}
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={line} className="font-heading text-sm" style={{ color: '#E8E4DDaa' }}>
                        {line}
                      </p>
                    )
                  ))}
                </div>
              ))}
            </div>

            {/* Map */}
            <div
              className="overflow-hidden"
              style={{ borderRadius: '2rem', height: '300px' }}
            >
              <iframe
                title="OnBoard Print & Signs Location"
                src="https://maps.google.com/maps?q=205%20Lucas%20Ave%20%23118,%20Winnipeg,%20MB%20R2R%202S9&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) contrast(1.1) brightness(0.7)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
