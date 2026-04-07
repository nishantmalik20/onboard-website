import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function NicheHighlight() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.niche-content', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 65%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: '500px' }}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1677272294437-c7ac54693ac3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, #111111ee 0%, #111111bb 50%, #11111144 100%)',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="niche-content max-w-xl">
          <p
            className="font-data text-xs tracking-widest uppercase mb-4"
            style={{ color: '#E63B2E' }}
          >
            Niche Specialty
          </p>
          <h2
            className="font-heading font-bold text-3xl md:text-5xl leading-[1.1] tracking-tight mb-6"
            style={{ color: '#F5F3EE' }}
          >
            Custom{' '}
            <span className="font-drama italic" style={{ color: '#E63B2E' }}>
              Wallpapers
            </span>
          </h2>
          <p
            className="font-heading text-base md:text-lg leading-relaxed mb-8"
            style={{ color: '#E8E4DDcc' }}
          >
            Transform any corporate lobby, retail space, or office environment with
            bespoke, large-format wallpaper printed to your exact specifications. Any
            image, any pattern, any brand — applied flawlessly by our installation team.
          </p>
          <Link
            to="/quote"
            className="btn-magnetic inline-flex items-center gap-3 px-8 py-4 text-base font-heading font-semibold text-white"
            style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}
          >
            <span className="btn-bg" style={{ backgroundColor: '#111111' }}></span>
            <span className="btn-text flex items-center gap-3">
              Enquire About Wallpaper <ArrowRight size={18} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
