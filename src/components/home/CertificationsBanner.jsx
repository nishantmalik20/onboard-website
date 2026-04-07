import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const certifications = [
  {
    abbr: 'BBB A+',
    name: 'Better Business Bureau',
    alt: 'BBB Accredited Business — A+ Rating | OnBoard Print & Signs Winnipeg',
    src: '/bbbw.png',
  },
  {
    abbr: 'SACI',
    name: 'Sign Association of Canada',
    alt: 'Sign Association of Canada Member | OnBoard Print & Signs',
    src: '/sac-logo-white-300.png',
  },
  {
    abbr: 'MANSA',
    name: 'Manitoba Sign Association',
    alt: 'MANSA Manitoba Sign Association Member | OnBoard Print & Signs Winnipeg',
    src: '/MANSA_Logo_brown-removebg-preview.png',
  },
];

function CertLogo({ cert }) {
  const [imgFailed, setImgFailed] = useState(false);
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    if (prefersReducedMotion()) return;
    gsap.to(cardRef.current, {
      scale: 1.04,
      borderColor: 'rgba(230, 59, 46, 0.5)',
      boxShadow: '0 0 24px rgba(230, 59, 46, 0.15)',
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion()) return;
    gsap.to(cardRef.current, {
      scale: 1,
      borderColor: 'rgba(232, 228, 221, 0.15)',
      boxShadow: '0 0 0px rgba(230, 59, 46, 0)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      role="img"
      aria-label={cert.alt}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col items-center justify-center gap-2 px-8 py-6 cursor-default"
      style={{
        backgroundColor: '#111111',
        borderRadius: '1.25rem',
        width: '260px',
        height: '140px',
        border: '1px solid rgba(232, 228, 221, 0.15)',
        willChange: 'transform',
      }}
    >
      {!imgFailed ? (
        <img
          src={cert.src}
          alt={cert.alt}
          width={180}
          height={90}
          loading="lazy"
          decoding="async"
          className="object-contain"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <>
          <span className="font-heading font-bold text-lg" style={{ color: '#E63B2E' }}>
            {cert.abbr}
          </span>
          {/* Fixed: was #E8E4DD88 — bumped to #E8E4DDBB for WCAG AA compliance */}
          <span className="font-heading text-xs text-center" style={{ color: '#E8E4DDBB' }}>
            {cert.name}
          </span>
        </>
      )}
    </div>
  );
}

export default function CertificationsBanner() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cert-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
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
      aria-label="Certifications and industry associations"
      className="py-16 md:py-20 px-6 md:px-12"
      style={{ backgroundColor: '#111111' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-data text-xs tracking-widest uppercase mb-3" style={{ color: '#E63B2E' }}>
            Certifications &amp; Associations
          </p>
          {/* Fixed: was #E8E4DD88 — bumped to #E8E4DDBB for WCAG AA compliance */}
          <p className="font-heading text-sm" style={{ color: '#E8E4DDBB' }}>
            Trusted, certified, and proud members of the sign industry
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {certifications.map((cert) => (
            <div key={cert.abbr} className="cert-item">
              <CertLogo cert={cert} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
