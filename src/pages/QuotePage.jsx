import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Eye, Zap, ChevronDown } from 'lucide-react';
import QuoteForm from '../components/forms/QuoteForm';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: 'How quickly will I receive my quote?',
    a: 'We respond within 2 hours during business hours (Mon-Fri, 8 AM - 7 PM). For requests submitted outside business hours, you will hear from us first thing the next morning.',
  },
  {
    q: 'What information do I need to provide?',
    a: 'The more detail, the better. At minimum, we need the type of product, approximate dimensions, and quantity. If you have artwork files, upload them with your request for the most accurate quote.',
  },
  {
    q: 'Are there any hidden fees?',
    a: 'Never. Our quotes are transparent, line-item breakdowns. The price we quote is the price you pay. Design revisions, installation, and delivery fees (if applicable) are always listed upfront.',
  },
  {
    q: 'Can I get a rush order?',
    a: 'Absolutely. We offer same-day printing for many standard products and 24-hour turnaround on most orders. Rush fees may apply depending on the project scope.',
  },
  {
    q: 'What file formats do you accept?',
    a: 'We accept PDF, AI, PSD, EPS, SVG, PNG, JPG, and TIFF files. For best results, provide vector files (AI, EPS, SVG) or high-resolution rasters (300 DPI minimum).',
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b"
      style={{ borderColor: '#E8E4DD20' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left bg-transparent border-none cursor-pointer"
      >
        <span className="font-heading font-semibold text-base" style={{ color: '#F5F3EE' }}>
          {q}
        </span>
        <ChevronDown
          size={18}
          className="flex-shrink-0 ml-4 transition-transform duration-300"
          style={{ color: '#E63B2E', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '200px' : '0px' }}
      >
        <p className="font-heading text-sm leading-relaxed pb-5" style={{ color: '#E8E4DD88' }}>
          {a}
        </p>
      </div>
    </div>
  );
}

export default function QuotePage() {
  useSEO({
    title: 'Request a Free Quote | OnBoard Print & Signs Winnipeg',
    description: 'Get a free, transparent quote for commercial printing, signage, vehicle wraps, or any print project in Winnipeg. We respond within 2 hours during business hours.',
    canonical: 'https://onboardprints.ca/quote',
  });

  const heroRef = useRef(null);
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.quote-hero-content', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    { icon: FileText, title: 'Submit', desc: 'Fill out the form below with your project details.' },
    { icon: Eye, title: 'Proof', desc: 'We send a detailed digital proof for your approval.' },
    { icon: Zap, title: 'Production', desc: 'Once approved, we produce and deliver — fast.' },
  ];

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-40 pb-20 px-6 md:px-12"
        style={{ backgroundColor: '#111111' }}
      >
        <div className="quote-hero-content max-w-3xl mx-auto text-center">
          <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
            Get Started
          </p>
          <h1
            className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight mb-6"
            style={{ color: '#F5F3EE' }}
          >
            Request a{' '}
            <span className="font-drama italic" style={{ color: '#E63B2E' }}>
              Quote.
            </span>
          </h1>
          <p
            className="font-heading text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: '#E8E4DD88' }}
          >
            Tell us about your project. We'll respond with a transparent, line-item quote
            within 2 hours during business hours.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-6 md:px-12" style={{ backgroundColor: '#111111' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center p-6 border"
              style={{
                borderRadius: '2rem',
                backgroundColor: '#1A1A1F',
                borderColor: '#E8E4DD15',
              }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center mb-4"
                style={{ backgroundColor: '#E63B2E15', borderRadius: '1rem' }}
              >
                <step.icon size={22} className="text-accent" />
              </div>
              <div className="font-data text-xs text-accent mb-2">
                Step {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-heading font-bold text-lg mb-2" style={{ color: '#F5F3EE' }}>
                {step.title}
              </h3>
              <p className="font-heading text-sm" style={{ color: '#E8E4DD66' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#111111' }}>
        <div className="max-w-4xl mx-auto">
          <QuoteForm preselectedService={preselectedService} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#111111' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">
              Common Questions
            </p>
            <h2
              className="font-heading font-bold text-2xl md:text-4xl tracking-tight"
              style={{ color: '#F5F3EE' }}
            >
              Quoting{' '}
              <span className="font-drama italic" style={{ color: '#E63B2E' }}>
                FAQ.
              </span>
            </h2>
          </div>
          <div>
            {faqs.map((faq) => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
