import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const Spline = lazy(() => import('@splinetool/react-spline'));

gsap.registerPlugin(ScrollTrigger);

/* SVG Animation 1: Rotating Geometric */
function RotatingGeometric() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.geo-rotate', { rotation: 360, duration: 20, repeat: -1, ease: 'none' });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="w-32 h-32 md:w-48 md:h-48">
      <svg viewBox="0 0 200 200" className="geo-rotate w-full h-full">
        {[0, 30, 60, 90, 120, 150].map((angle) => (
          <circle
            key={angle}
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="#E63B2E"
            strokeWidth="0.5"
            opacity="0.6"
            transform={`rotate(${angle} 100 100)`}
            strokeDasharray="4 8"
          />
        ))}
        {[40, 55, 70].map((r) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="#E8E4DD"
            strokeWidth="0.3"
            opacity="0.3"
          />
        ))}
      </svg>
    </div>
  );
}

/* SVG Animation 2: Scanning Laser Grid */
function ScanningGrid() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.scan-line', {
        y: 160,
        duration: 3,
        repeat: -1,
        ease: 'none',
        yoyo: true,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="w-32 h-32 md:w-48 md:h-48">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {Array.from({ length: 10 }).map((_, row) =>
          Array.from({ length: 10 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={20 + col * 18}
              cy={20 + row * 18}
              r="1.5"
              fill="#E8E4DD"
              opacity="0.3"
            />
          ))
        )}
        <line
          className="scan-line"
          x1="10"
          y1="20"
          x2="190"
          y2="20"
          stroke="#E63B2E"
          strokeWidth="1.5"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

/* SVG Animation 3: Pulsing Waveform */
function PulsingWaveform() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.wave-path', {
        strokeDashoffset: -400,
        duration: 4,
        repeat: -1,
        ease: 'none',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="w-32 h-32 md:w-48 md:h-48">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        <path
          className="wave-path"
          d="M0,50 Q25,20 50,50 T100,50 T150,50 T200,50 Q225,20 250,50 T300,50 T350,50 T400,50"
          fill="none"
          stroke="#E63B2E"
          strokeWidth="2"
          strokeDasharray="200"
          strokeDashoffset="0"
          opacity="0.8"
        />
        <line
          x1="0"
          y1="50"
          x2="200"
          y2="50"
          stroke="#E8E4DD"
          strokeWidth="0.3"
          opacity="0.2"
        />
      </svg>
    </div>
  );
}

export default function Process() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const splineRef = useRef(null);
  const [splineInView, setSplineInView] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  useEffect(() => {
    if (!splineRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSplineInView(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    observer.observe(splineRef.current);
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Request a Quote',
      desc: 'Tell us what you need — dimensions, quantities, materials, deadlines. Upload your artwork or request design assistance. We respond within 2 hours during business hours.',
      Animation: RotatingGeometric,
    },
    {
      num: '02',
      title: 'Approve Your Proof',
      desc: 'We send a detailed digital proof with exact colour matching, material specs, and a transparent line-item quote. No surprises, no hidden fees — just clear, honest pricing.',
      Animation: ScanningGrid,
    },
    {
      num: '03',
      title: 'Fast Production & Delivery',
      desc: 'Once approved, your project enters our production queue immediately. Standard orders ship or install within 24 hours. Rush orders available same-day.',
      Animation: PulsingWaveform,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Existing card pin logic
      cardsRef.current.forEach((card, i) => {
        if (i < steps.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            endTrigger: cardsRef.current[i + 1],
            end: 'top top',
            pin: true,
            pinSpacing: false,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.set(card, {
                scale: 1 - progress * 0.1,
                filter: `blur(${progress * 20}px)`,
                opacity: 1 - progress * 0.5,
              });
            },
          });
        }
      });

      // Spline Viewer scroll animation (scrubs up and down)
      gsap.fromTo(
        '.spline-wrapper',
        { y: 100, scale: 0.85, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative w-full bg-[#F5F3EE]">
      {/* Section Name Container acting as parent for everything */}
      <div className="pt-20 lg:pt-28 w-full relative z-20 flex flex-col items-center flex-grow">
        <div className="text-center px-6 mb-12 lg:mb-16">
          <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
            How We Work
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-dark tracking-tight">
            The{' '}
            <span className="font-drama italic" style={{ color: '#E63B2E' }}>
              process.
            </span>
          </h2>
        </div>

        {/* Split Content Wrapper */}
        <div className="flex flex-col lg:flex-row w-full relative text-left">
          {/* Left Column: Process Content & Cards */}
          <div className="w-full lg:w-1/2 relative z-10">
            {steps.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => (cardsRef.current[i] = el)}
                className="h-[80vh] md:h-screen w-full flex items-center justify-center px-4 md:px-8"
                style={{ backgroundColor: i % 2 === 0 ? '#F5F3EE' : '#E8E4DD' }}
              >
                <div
                  className="w-full max-w-xl p-8 md:p-12 flex flex-col items-center gap-6 border border-primary/20 shadow-2xl relative"
                  style={{ borderRadius: '2rem', backgroundColor: '#F5F3EE' }}
                >
                  <div className="flex-shrink-0 flex items-center justify-center opacity-70">
                    <step.Animation />
                  </div>
                  <div className="text-center">
                    <span className="font-data text-sm font-bold tracking-widest text-accent mb-2 block">{step.num}</span>
                    <h3 className="font-heading font-bold text-2xl md:text-3xl text-dark mb-4 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="font-heading text-sm md:text-base text-dark/80 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Sticky Spline Viewer (desktop only) */}
          {!isMobile && (
            <div ref={splineRef} className="hidden lg:block lg:w-1/2 relative z-0 bg-dark">
              <div className="lg:sticky top-0 h-full lg:h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                <div className="spline-wrapper w-full h-full flex items-center justify-center origin-center">
                  <div className="w-full h-full">
                    {splineInView ? (
                      <Suspense fallback={<div className="w-full h-full bg-dark/50 animate-pulse" style={{ borderRadius: '2rem' }} />}>
                        <Spline scene="https://prod.spline.design/D7tRYa-g2xZBohff/scene.splinecode" />
                      </Suspense>
                    ) : (
                      <div className="w-full h-full bg-dark/50 animate-pulse" style={{ borderRadius: '2rem' }} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
