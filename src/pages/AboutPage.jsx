import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, MapPin, Phone, Mail, Clock,
  Users, Award, Target, Heart,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Harkamalbir Rai',
    role: 'Founder & Director',
    email: 'harkamalbir@onboardprints.ca',
    phone: '+1-204-951-5075',
    image: '/harkamal.png',
    bio: 'With over 15 years in the print and signage industry, Harkamalbir founded OnBoard to bring commercial-grade quality to Winnipeg businesses.',
  },
  {
    name: 'Mani Singh',
    role: 'Co-Founder & Director of Production',
    email: 'mani@onboardprints.ca',
    phone: '+1-204-869-1503',
    image: '/mani.png',
    bio: 'Mani oversees all production operations, ensuring every job meets our exacting quality standards and tight turnaround commitments.',
  },
  {
    name: 'Bharat Patel',
    role: 'Lead Designer',
    email: 'bharat@onboardprints.ca',
    phone: '+1-204-869-1503',
    image: '/bharat.png',
    bio: 'Bharat brings his 25 years of experience as a graphic and brand designer. Bharat brings brands to life with compelling visual design, from logo concepts and vehicle wrap layouts to large-format signage graphics.',
  },
  {
    name: 'Nishant Malik',
    role: 'Web Designer & Developer',
    email: 'nishant_malik@onboardprints.ca',
    phone: '+1-204-872-8989',
    image: '/nishant.png',
    bio: 'Nishant is our web and technology expert — he handles everything from websites to app development, design and manage online systems for businesses, and makes sure every system runs smoothly.',
  },
];

const values = [
  {
    icon: Target,
    title: 'Precision',
    desc: 'Every measurement, every colour, every cut is exact. We treat your brand with the care it deserves.',
  },
  {
    icon: Users,
    title: 'Partnership',
    desc: 'We work alongside you — not just for you. Your goals become our goals from day one.',
  },
  {
    icon: Award,
    title: 'Quality',
    desc: 'Commercial-grade equipment, premium materials, and rigorous QC at every stage of production.',
  },
  {
    icon: Heart,
    title: 'Community',
    desc: 'Proudly rooted in Winnipeg. We support local businesses because we are one.',
  },
];

export default function AboutPage() {
  useSEO({
    title: 'About OnBoard Print & Signs | Our Team & Story | Winnipeg, MB',
    description: 'Meet the team behind OnBoard Print & Signs. 15+ years of commercial printing and signage experience in Winnipeg. BBB A+ rated, MANSA & SAC certified.',
    canonical: 'https://onboardprints.ca/about',
  });

  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const infoRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-hero-content', {
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
      gsap.from('.story-content', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: storyRef.current, start: 'top 75%' },
      });
    }, storyRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.value-item', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: valuesRef.current, start: 'top 75%' },
      });
    }, valuesRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-card', {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: teamRef.current, start: 'top 70%' },
      });
    }, teamRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.info-card', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: infoRef.current, start: 'top 75%' },
      });
    }, infoRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
      });
    }, ctaRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative pt-40 pb-20 px-6 md:px-12"
        style={{ backgroundColor: '#111111' }}
      >
        <div className="about-hero-content max-w-3xl mx-auto text-center">
          <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
            Who We Are
          </p>
          <h1
            className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight mb-6"
            style={{ color: '#F5F3EE' }}
          >
            About{' '}
            <span className="font-drama italic" style={{ color: '#E63B2E' }}>
              OnBoard.
            </span>
          </h1>
          <p
            className="font-heading text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: '#E8E4DD88' }}
          >
            A team of creative artisans in Winnipeg delivering fast, complete, end-to-end
            print and signage solutions under one roof.
          </p>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section
        ref={storyRef}
        className="py-20 md:py-28 px-6 md:px-12"
        style={{ backgroundColor: '#F5F3EE' }}
      >
        <div className="story-content max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
              Our Story
            </p>
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-dark tracking-tight mb-6">
              Built from the ground up in{' '}
              <span className="font-drama italic" style={{ color: '#E63B2E' }}>
                Winnipeg.
              </span>
            </h2>
            <p className="font-heading text-base text-dark/70 leading-relaxed mb-4">
              OnBoard Print &amp; Signs was founded with a simple belief: local businesses
              deserve the same commercial-grade print and signage quality as national
              franchises — without the national price tag or shipping delays.
            </p>
            <p className="font-heading text-base text-dark/70 leading-relaxed mb-4">
              What started as a small shop on Lucas Ave has grown into a
              full-service production facility equipped with industrial-class HP Latex,
              Roland, and CNC equipment. Today, we handle everything from same-day business
              cards to full building wraps — all manufactured right here in Winnipeg.
            </p>
            <p className="font-heading text-base text-dark/70 leading-relaxed">
              Our mission remains unchanged: deliver outstanding quality, honest pricing,
              and turnaround times that actually work for busy business owners.
            </p>
          </div>
          <div
            className="relative overflow-hidden"
            style={{ borderRadius: '2rem', aspectRatio: '4/3' }}
          >
            <img
              src="/image-assets/onboard_storefront.webp"
              alt="OnBoard Print & Signs storefront in Winnipeg — our sign and print shop"
              loading="lazy"
              width={900}
              height={600}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(17,17,17,0.4) 0%, transparent 50%)',
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section
        ref={valuesRef}
        className="py-20 md:py-28 px-6 md:px-12"
        style={{ backgroundColor: '#111111' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
              What Drives Us
            </p>
            <h2
              className="font-heading font-bold text-2xl md:text-4xl tracking-tight"
              style={{ color: '#F5F3EE' }}
            >
              Our{' '}
              <span className="font-drama italic" style={{ color: '#E63B2E' }}>
                values.
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="value-item h-full">
                <div
                  className="p-7 border transition-transform duration-500 hover:-translate-y-2 h-full"
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
                    <v.icon size={22} className="text-accent" />
                  </div>
                  <h3
                    className="font-heading font-bold text-lg mb-2"
                    style={{ color: '#F5F3EE' }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="font-heading text-sm leading-relaxed"
                    style={{ color: '#E8E4DD88' }}
                  >
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section
        ref={teamRef}
        className="py-20 md:py-28 px-6 md:px-12"
        style={{ backgroundColor: '#F5F3EE' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
              The Team
            </p>
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-dark tracking-tight">
              Meet the people behind{' '}
              <span className="font-drama italic" style={{ color: '#E63B2E' }}>
                OnBoard.
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="team-card group flex flex-col"
                style={{ borderRadius: '2rem', overflow: 'hidden' }}
              >
                {/* Photo */}
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: '3/4' }}
                >
                  <img
                    src={member.image}
                    alt={`${member.name} — OnBoard Print & Signs team member`}
                    loading="lazy"
                    width={400}
                    height={533}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.1) 50%, transparent 100%)',
                    }}
                  />
                  {/* Overlay info on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p
                      className="font-heading font-bold text-lg tracking-tight"
                      style={{ color: '#F5F3EE' }}
                    >
                      {member.name}
                    </p>
                    <p
                      className="font-data text-xs uppercase tracking-wider mt-1"
                      style={{ color: '#E63B2E' }}
                    >
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Info card */}
                <div
                  className="p-5 border border-t-0 flex-1 flex flex-col"
                  style={{
                    backgroundColor: '#1A1A1F',
                    borderColor: '#E8E4DD15',
                    borderRadius: '0 0 2rem 2rem',
                  }}
                >
                  <p
                    className="font-heading text-sm leading-relaxed mb-4 flex-1"
                    style={{ color: '#E8E4DD88' }}
                  >
                    {member.bio}
                  </p>
                  <div className="flex flex-col gap-2 mt-auto">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 font-heading text-xs link-lift transition-colors duration-300"
                      style={{ color: '#E8E4DDaa' }}
                    >
                      <Mail size={12} className="text-accent flex-shrink-0" />
                      {member.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location & Contact Info ── */}
      <section
        ref={infoRef}
        className="py-20 md:py-28 px-6 md:px-12"
        style={{ backgroundColor: '#111111' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
              Visit Us
            </p>
            <h2
              className="font-heading font-bold text-2xl md:text-4xl tracking-tight"
              style={{ color: '#F5F3EE' }}
            >
              Find{' '}
              <span className="font-drama italic" style={{ color: '#E63B2E' }}>
                us.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
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
                  lines: ['Mon–Fri: 8 AM – 7 PM', 'Saturday: 10 AM – 7 PM', 'Sunday: 1 PM – 7 PM'],
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="info-card p-6 border"
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
                  <h3
                    className="font-heading font-semibold text-sm mb-2 uppercase tracking-widest"
                    style={{ color: '#E8E4DD' }}
                  >
                    {item.label}
                  </h3>
                  {item.lines.map((line) =>
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
                      <p
                        key={line}
                        className="font-heading text-sm"
                        style={{ color: '#E8E4DDaa' }}
                      >
                        {line}
                      </p>
                    )
                  )}
                </div>
              ))}
            </div>

            {/* Right: Google Map */}
            <div
              className="info-card overflow-hidden"
              style={{ borderRadius: '2rem', minHeight: '380px' }}
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

      {/* ── CTA: Navigate to Contact ── */}
      <section
        ref={ctaRef}
        className="py-20 md:py-28 px-6 md:px-12"
        style={{ backgroundColor: '#F5F3EE' }}
      >
        <div className="cta-content max-w-3xl mx-auto text-center">
          <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
            Let's Talk
          </p>
          <h2 className="font-heading font-bold text-2xl md:text-4xl text-dark tracking-tight mb-6">
            Ready to start your{' '}
            <span className="font-drama italic" style={{ color: '#E63B2E' }}>
              next project?
            </span>
          </h2>
          <p
            className="font-heading text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ color: '#11111188' }}
          >
            Whether you need a quick print run or a full signage installation, our team is
            here to help. Reach out and let's make it happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-magnetic inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-heading font-semibold text-white"
              style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}
            >
              <span className="btn-bg" style={{ backgroundColor: '#111111' }}></span>
              <span className="btn-text flex items-center gap-3">
                Contact Us <ArrowRight size={18} />
              </span>
            </Link>
            <Link
              to="/quote"
              className="btn-magnetic inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-heading font-semibold text-dark border"
              style={{ borderRadius: '2rem', borderColor: '#E8E4DD' }}
            >
              <span className="btn-bg" style={{ backgroundColor: '#E8E4DD' }}></span>
              <span className="btn-text flex items-center gap-3">
                Request a Quote <ArrowRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
