import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Code2, MonitorPlay, Zap, ArrowRight } from 'lucide-react';
const Spline = lazy(() => import('@splinetool/react-spline'));

gsap.registerPlugin(ScrollTrigger);

export default function WebArchitecture() {
  const sectionRef = useRef(null);
  const splineRef = useRef(null);
  const [splineInView, setSplineInView] = useState(false);

  useEffect(() => {
    if (!splineRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSplineInView(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    observer.observe(splineRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.web-text', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-24 lg:py-40 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#111111' }}
    >
      <div className="w-full max-w-screen-2xl px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start z-10 text-left">
          <p className="web-text font-data text-xs tracking-widest uppercase text-accent mb-4">
            Digital Infrastructure
          </p>
          <h2 className="web-text font-heading font-bold text-4xl md:text-6xl tracking-tight mb-8" style={{ color: '#F5F3EE' }}>
            Web{' '}
            <span className="font-drama italic" style={{ color: '#E63B2E' }}>architecture.</span>
          </h2>
          <p className="web-text font-heading text-lg md:text-xl leading-relaxed mb-10 max-w-lg" style={{ color: '#E8E4DDaa' }}>
            Your physical signage brings them to the door; your digital presence closes the deal. We build lightning-fast, high-converting websites and systems engineered for brutal performance and aesthetic dominance.
          </p>
          
          <ul className="web-text flex flex-col gap-6 font-heading text-lg text-white">
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E63B2E20' }}>
                <MonitorPlay size={20} color="#E63B2E" />
              </div>
              <span style={{ color: '#F5F3EE' }}>Bespoke UI/UX Design</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E63B2E20' }}>
                <Code2 size={20} color="#E63B2E" />
              </div>
              <span style={{ color: '#F5F3EE' }}>High-Performance React Frameworks</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E63B2E20' }}>
                <Zap size={20} color="#E63B2E" />
              </div>
              <span style={{ color: '#F5F3EE' }}>Modern CMS & E-Commerce Integration</span>
            </li>
          </ul>
          
          <div className="web-text mt-12 w-full">
            <Link
              to="/quote"
              className="btn-magnetic inline-flex items-center gap-3 px-8 py-4 text-base font-heading font-semibold text-white group"
              style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}
            >
              <span className="btn-bg" style={{ backgroundColor: '#F5F3EE' }}></span>
              <span className="btn-text flex items-center gap-3 text-white group-hover:text-dark transition-colors duration-300">
                Get a Quote <ArrowRight size={18} />
              </span>
            </Link>
          </div>
        </div>

        {/* Right: 3D Element */}
        <div ref={splineRef} className="w-full lg:w-1/2 h-[50vh] lg:h-[70vh] flex items-center justify-center relative overflow-hidden group">
          {splineInView ? (
            <Suspense fallback={<div className="w-full h-full bg-dark/50 animate-pulse" style={{ borderRadius: '2rem' }} />}>
              <Spline scene="https://prod.spline.design/URLqcaBTJnqQtEnx/scene.splinecode" />
            </Suspense>
          ) : (
            <div className="w-full h-full bg-dark/50 animate-pulse" style={{ borderRadius: '2rem' }} />
          )}
        </div>

      </div>
    </section>
  );
}
