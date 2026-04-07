import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function UrgentBanner() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.urgent-inner', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor: '#E63B2E' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 md:py-7">
        <div className="urgent-inner flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-start md:items-center gap-4">
            <div
              className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
            >
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <p className="font-heading font-bold text-white text-base md:text-lg leading-snug">
                Need it yesterday?
              </p>
              <p className="font-heading text-sm text-white/80 mt-0.5">
                We offer{' '}
                <strong className="text-white">Same Day Printing</strong> for urgent
                projects and a{' '}
                <strong className="text-white">24-Hour Turnaround</strong> on most
                standard orders.
              </p>
            </div>
          </div>
          <Link
            to="/quote"
            className="btn-magnetic btn-hover-dark inline-flex items-center gap-2 px-6 py-3 text-sm font-heading font-bold flex-shrink-0"
            style={{ backgroundColor: '#111111', color: '#F5F3EE', borderRadius: '2rem' }}
          >
            <span className="btn-bg" style={{ backgroundColor: '#F5F3EE' }}></span>
            <span className="btn-text flex items-center gap-2">
              Request a Rush Order <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
