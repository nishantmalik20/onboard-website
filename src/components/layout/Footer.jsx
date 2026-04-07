import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const productServiceLinks = [
    { label: 'LED Channel Letter Signs', to: '/products/led-channel-letter-signs-winnipeg' },
    { label: 'Vehicle Wraps', to: '/products/vehicle-wraps-winnipeg' },
    { label: 'Custom Wallpaper', to: '/products/custom-wallpaper-winnipeg' },
    { label: 'Window Graphics', to: '/products/window-graphics-winnipeg' },
    { label: 'Yard Signs', to: '/products/yard-signs-winnipeg' },
    { label: 'Business Cards & Flyers', to: '/products/business-cards-flyers-winnipeg' },
    { label: 'Sign Design', to: '/services/sign-design-winnipeg' },
    { label: 'Manufacturing', to: '/services/sign-manufacturing-winnipeg' },
    { label: 'Installation & Maintenance', to: '/services/installation-maintenance-winnipeg' },
    { label: 'Permits & Electrical', to: '/services/permits-winnipeg' },
    { label: 'Website & App Development', to: '/services/website-application-development' },
  ];

  return (
    <footer
      id="contact"
      className="px-6 md:px-12 pt-16 pb-8"
      style={{ backgroundColor: '#111111', borderRadius: '4rem 4rem 0 0' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top row: Brand + Trust + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand + NAP */}
          <div>
            <Link to="/">
              <div
                className="inline-block mb-6 px-4 py-3"
                style={{ backgroundColor: '#F5F3EE', borderRadius: '0.75rem' }}
              >
                <img
                  src="/onboard_logo.svg"
                  alt="OnBoard Print & Signs"
                  loading="lazy"
                  width={200}
                  height={52}
                  style={{ height: '36px', width: 'auto', display: 'block' }}
                />
              </div>
            </Link>
            <p
              className="font-heading text-sm leading-relaxed mb-6"
              style={{ color: '#E8E4DD88' }}
            >
              High-end creative artisans delivering fast, complete, end-to-end print and
              signage solutions under one roof.
            </p>

            {/* NAP Details */}
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <p className="font-heading text-sm" style={{ color: '#E8E4DDaa' }}>
                  205 Lucas Ave #118
                  <br />
                  Winnipeg, MB R2R 2S9
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-accent flex-shrink-0" />
                <a
                  href="tel:+12048691503"
                  className="font-heading text-sm link-lift"
                  style={{ color: '#E8E4DDaa' }}
                >
                  +1-204-869-1503
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <a
                  href="mailto:contact@onboardprints.ca"
                  className="font-heading text-sm link-lift"
                  style={{ color: '#E8E4DDaa' }}
                >
                  contact@onboardprints.ca
                </a>
              </div>
            </div>

            {/* BBB Badge */}
            <a
              href="https://www.bbb.org/ca/mb/winnipeg/profile/signs/on-board-print-and-signs-inc-0057-1000011390"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex overflow-hidden transition-all duration-300 hover:opacity-100 opacity-90 border cursor-pointer"
              style={{
                borderRadius: '1rem',
                borderColor: '#E8E4DD15',
                backgroundColor: 'transparent',
              }}
            >
              <img
                src="/bbb-logo.svg"
                alt="BBB Accredited Business A+ Rating"
                loading="lazy"
                width={200}
                height={52}
                className="h-12 w-auto"
              />
            </a>
          </div>

          {/* Hours + Services */}
          <div className="grid grid-cols-2 gap-8">
            {/* Quick Links */}
            <div>
              <h4
                className="font-heading font-semibold text-sm mb-4 uppercase tracking-widest"
                style={{ color: '#E8E4DD' }}
              >
                Company
              </h4>
              <ul className="flex flex-col gap-1.5 mb-6">
                {[
                  { label: 'Services', to: '/services' },
                  { label: 'Portfolio', to: '/portfolio' },
                  { label: 'About Us', to: '/about' },
                  { label: 'Contact Us', to: '/contact' },
                  { label: 'Get a Quote', to: '/quote' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="link-lift font-heading text-sm transition-colors duration-300"
                      style={{ color: '#E8E4DD88' }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <h4
                className="font-heading font-semibold text-sm mb-4 uppercase tracking-widest"
                style={{ color: '#E8E4DD' }}
              >
                Hours
              </h4>
              <ul className="flex flex-col gap-2">
                {[
                  { day: 'Mon – Fri', time: '8 AM – 7 PM' },
                  { day: 'Saturday', time: '10 AM – 7 PM' },
                  { day: 'Sunday', time: '1 PM – 7 PM' },
                ].map((h) => (
                  <li key={h.day} className="flex justify-between gap-2">
                    <span
                      className="font-heading text-sm"
                      style={{ color: '#E8E4DD88' }}
                    >
                      {h.day}
                    </span>
                    <span
                      className="font-data text-xs"
                      style={{ color: '#E8E4DDaa' }}
                    >
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services list */}
            <div>
              <h4
                className="font-heading font-semibold text-sm mb-4 uppercase tracking-widest"
                style={{ color: '#E8E4DD' }}
              >
                Products & Services
              </h4>
              <ul className="flex flex-col gap-1.5">
                {productServiceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="link-lift font-heading text-sm transition-colors duration-300"
                      style={{ color: '#E8E4DD88' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Google Map */}
          <div>
            <h4
              className="font-heading font-semibold text-sm mb-4 uppercase tracking-widest"
              style={{ color: '#E8E4DD' }}
            >
              Find Us
            </h4>
            <div
              className="overflow-hidden"
              style={{ borderRadius: '1.5rem', height: '280px' }}
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

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 mt-8"
          style={{ borderTop: '1px solid #E8E4DD12' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 pulse-dot"></div>
            <span className="font-data text-xs" style={{ color: '#E8E4DD55' }}>
              System Operational
            </span>
          </div>
          <p className="font-data text-xs" style={{ color: '#E8E4DD33' }}>
            &copy; {new Date().getFullYear()} OnBoard Print &amp; Signs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
