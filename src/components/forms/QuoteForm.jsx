import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle, X } from 'lucide-react';
import FileUpload from './FileUpload';
import { supabasePublic } from '../../lib/supabasePublic';

gsap.registerPlugin(ScrollTrigger);

// Parse a response without throwing on non-JSON (e.g. a plain-text 413/500),
// so the user sees a clean message instead of a JSON parse error.
async function safeJson(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { error: text.trim().slice(0, 200) || 'Unexpected server response.' };
  }
}

const SERVICE_OPTIONS = [
  'Signage',
  'Vehicle Wraps',
  'Window Graphics',
  'Marketing Materials',
  'Web Development',
  'Custom Wallpaper',
];

const BUDGET_OPTIONS = [
  'Under $500',
  '$500 – $1,000',
  '$1,000 – $2,500',
  '$2,500 – $5,000',
  '$5,000 – $10,000',
  '$10,000+',
  'Not sure yet',
];

const inputStyle = {
  borderRadius: '2rem',
  backgroundColor: '#1A1A1F',
  borderColor: '#E8E4DD15',
  color: '#F5F3EE',
};

const textareaStyle = {
  ...inputStyle,
  borderRadius: '1.5rem',
};

export default function QuoteForm({ preselectedService = '' }) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [files, setFiles] = useState([]);
  const [optInMarketing, setOptInMarketing] = useState(true);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: preselectedService,
    description: '',
    quantity: '',
    deadline: '',
    budget: '',
  });

  useEffect(() => {
    if (preselectedService) {
      setForm((f) => ({ ...f, service: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.quote-form-inner', {
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
    if (!form.phone.trim()) errs.phone = 'Phone number is required.';
    if (!form.service) errs.service = 'Please select a service.';
    if (!form.description.trim()) errs.description = 'Please describe your project.';
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
      // 1. Upload any files straight to Supabase Storage via signed URLs,
      //    bypassing the serverless body-size limit entirely.
      let uploadedFiles = [];
      if (files.length > 0) {
        const urlRes = await fetch('/api/quote-upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            files: files.map((f) => ({ name: f.name, size: f.size, contentType: f.type })),
          }),
        });
        const urlData = await safeJson(urlRes);
        if (!urlRes.ok || !Array.isArray(urlData.uploads)) {
          throw new Error(urlData.error || 'Could not prepare file upload.');
        }

        await Promise.all(urlData.uploads.map(async (u, i) => {
          const file = files[i];
          const { error } = await supabasePublic.storage
            .from('quotes')
            .uploadToSignedUrl(u.path, u.token, file, {
              contentType: file.type || 'application/octet-stream',
            });
          if (error) throw new Error(`Upload failed for "${file.name}". Please try again.`);
        }));

        uploadedFiles = urlData.uploads.map((u, i) => ({
          name: files[i].name,
          path: u.path,
          size: files[i].size,
          contentType: files[i].type,
        }));
      }

      // 2. Submit the lead as small JSON (no file bytes through the function).
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, optInMarketing, uploadedFiles }),
      });
      const data = await safeJson(res);

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Server returned an error.');
      }

      // Sync to Brevo via separate JSON endpoint
      try {
        await fetch('/api/brevo-sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            company: form.company,
            service: form.service,
            source: 'quote_form',
            optInMarketing,
          }),
        });
      } catch { /* Brevo sync is best-effort — never block the submission */ }

      setToast({ type: 'success', message: 'Quote request submitted! We will be in touch within 2 hours.' });
      setForm({ name: '', email: '', phone: '', company: '', service: '', description: '', quantity: '', deadline: '', budget: '' });
      setFiles([]);
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
      {/* Toast notification */}
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

      <form onSubmit={handleSubmit} className="quote-form-inner">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label htmlFor="quote-name" className="sr-only">Full Name</label>
            <input
              id="quote-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name *"
              className={fieldClass}
              style={inputStyle}
            />
            {errors.name && <p className="font-heading text-xs mt-1 pl-4" style={{ color: '#E63B2E' }}>{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="quote-email" className="sr-only">Email Address</label>
            <input
              id="quote-email"
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

          {/* Phone */}
          <div>
            <label htmlFor="quote-phone" className="sr-only">Phone Number</label>
            <input
              id="quote-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number *"
              className={fieldClass}
              style={inputStyle}
            />
            {errors.phone && <p className="font-heading text-xs mt-1 pl-4" style={{ color: '#E63B2E' }}>{errors.phone}</p>}
          </div>

          {/* Company */}
          <div>
            <label htmlFor="quote-company" className="sr-only">Company Name</label>
            <input
              id="quote-company"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company Name"
              className={fieldClass}
              style={inputStyle}
            />
          </div>

          {/* Service */}
          <div>
            <label htmlFor="quote-service" className="sr-only">Select a Service</label>
            <select
              id="quote-service"
              name="service"
              value={form.service}
              onChange={handleChange}
              className={fieldClass}
              style={{ ...inputStyle, appearance: 'none' }}
            >
              <option value="">Select a Service *</option>
              {SERVICE_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.service && <p className="font-heading text-xs mt-1 pl-4" style={{ color: '#E63B2E' }}>{errors.service}</p>}
          </div>

          {/* Budget */}
          <div>
            <label htmlFor="quote-budget" className="sr-only">Budget Range</label>
            <select
              id="quote-budget"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className={fieldClass}
              style={{ ...inputStyle, appearance: 'none' }}
            >
              <option value="">Budget Range</option>
              {BUDGET_OPTIONS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quote-quantity" className="sr-only">Quantity</label>
            <input
              id="quote-quantity"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Quantity (e.g., 500 cards, 2 signs)"
              className={fieldClass}
              style={inputStyle}
            />
          </div>

          {/* Deadline */}
          <div>
            <label htmlFor="quote-deadline" className="sr-only">Deadline</label>
            <input
              id="quote-deadline"
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={handleChange}
              className={fieldClass}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label htmlFor="quote-description" className="sr-only">Project Description</label>
          <textarea
            id="quote-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your project — dimensions, materials, special requirements... *"
            rows={5}
            className={fieldClass}
            style={textareaStyle}
          />
          {errors.description && <p className="font-heading text-xs mt-1 pl-4" style={{ color: '#E63B2E' }}>{errors.description}</p>}
        </div>

        {/* File Upload */}
        <div className="mt-6">
          <p className="font-heading text-sm mb-3" style={{ color: '#E8E4DDaa' }}>
            Upload Your Files (optional)
          </p>
          <FileUpload files={files} onChange={setFiles} />
        </div>

        {/* Marketing opt-in */}
        <label className="flex items-start gap-3 cursor-pointer mt-6">
          <input
            type="checkbox"
            checked={optInMarketing}
            onChange={(e) => setOptInMarketing(e.target.checked)}
            className="mt-1 w-4 h-4 accent-accent flex-shrink-0"
          />
          <span className="font-heading text-xs leading-relaxed" style={{ color: '#E8E4DDaa' }}>
            I'd like to receive optional promotional offers from OnBoard Print & Signs.
          </span>
        </label>

        {/* Submit */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="btn-magnetic inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-heading font-semibold text-white w-full md:w-auto"
            style={{ backgroundColor: '#E63B2E', borderRadius: '2rem', opacity: loading ? 0.7 : 1 }}
          >
            <span className="btn-bg" style={{ backgroundColor: '#111111' }}></span>
            <span className="btn-text flex items-center gap-3">
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Quote Request <ArrowRight size={18} />
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
