import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const inputStyle = {
  borderRadius: '2rem',
  backgroundColor: '#1A1A1F',
  borderColor: '#E8E4DD15',
  color: '#F5F3EE',
};

export default function ContactForm() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-form-inner', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
      });
    }, formRef);
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.';
    if (!form.message.trim()) errs.message = 'Please enter a message.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Server returned an error.');
      }

      setToast({ type: 'success', message: 'Message sent! We will get back to you shortly.' });
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Something went wrong. Please try again or call us directly.' });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 5000);
    }
  };

  const fieldClass = 'w-full px-6 py-4 font-heading text-sm border outline-none transition-all duration-300 focus:border-accent/50';

  return (
    <div ref={formRef}>
      {/* Toast */}
      {toast && (
        <div
          className="fixed top-24 right-6 z-[100] flex items-center gap-3 px-6 py-4 shadow-2xl"
          style={{
            borderRadius: '1.5rem',
            backgroundColor: toast.type === 'success' ? '#111111' : '#E63B2E',
            color: '#F5F3EE',
          }}
        >
          {toast.type === 'success' ? (
            <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
          ) : (
            <X size={18} className="flex-shrink-0" />
          )}
          <p className="font-heading text-sm">{toast.message}</p>
          <button onClick={() => setToast(null)} className="ml-2">
            <X size={14} />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form-inner flex flex-col gap-4">
        <div>
          <label htmlFor="contact-name" className="sr-only">Full Name</label>
          <input
            id="contact-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name *"
            className={fieldClass}
            style={inputStyle}
          />
          {errors.name && <p className="font-heading text-xs mt-1 pl-4" style={{ color: '#E63B2E' }}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="contact-email" className="sr-only">Email Address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address *"
            className={fieldClass}
            style={inputStyle}
          />
          {errors.email && <p className="font-heading text-xs mt-1 pl-4" style={{ color: '#E63B2E' }}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="contact-phone" className="sr-only">Phone Number</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className={fieldClass}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="sr-only">Your Message</label>
          <textarea
            id="contact-message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message *"
            rows={5}
            className={fieldClass}
            style={{ ...inputStyle, borderRadius: '1.5rem' }}
          />
          {errors.message && <p className="font-heading text-xs mt-1 pl-4" style={{ color: '#E63B2E' }}>{errors.message}</p>}
        </div>

        <div className="mt-2">
          <button
            type="submit"
            disabled={loading}
            className="btn-magnetic inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-heading font-semibold text-white w-full"
            style={{ backgroundColor: '#E63B2E', borderRadius: '2rem', opacity: loading ? 0.7 : 1 }}
          >
            <span className="btn-bg" style={{ backgroundColor: '#111111' }}></span>
            <span className="btn-text flex items-center gap-3">
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message <ArrowRight size={18} />
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
