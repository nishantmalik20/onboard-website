import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function AnimatedNumber({ target, suffix = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = target.toLocaleString() + suffix;
      return;
    }

    const obj = { val: 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toLocaleString() + suffix;
          },
          onComplete: () => {
            // Pulse the number on completion
            gsap.fromTo(
              el,
              { scale: 1.12 },
              { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' }
            );
          },
        });
      },
    });
    return () => trigger.kill();
  }, [target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function StatsBar() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-item',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 2500, suffix: '+', label: 'Projects Completed', detail: 'for Winnipeg and Manitoba businesses' },
    { value: 15, suffix: '+', label: 'Years of Experience', detail: 'in commercial print and signage' },
    { value: 24, suffix: 'hr', label: 'Standard Turnaround', detail: 'on most print and signage orders' },
    { value: 98, suffix: '%', label: 'Client Satisfaction', detail: 'based on post-project surveys' },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 px-6 md:px-12" style={{ backgroundColor: '#111111' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center">
              <p className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-2" style={{ color: '#E63B2E' }}>
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-heading font-semibold text-sm md:text-base mb-1" style={{ color: '#F5F3EE' }}>
                {stat.label}
              </p>
              {/* Fixed: was #E8E4DD55 (~33% opacity) which fails WCAG AA on #111111 */}
              <p className="font-heading text-xs" style={{ color: '#E8E4DD99' }}>
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
