import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, ChevronRight, AlertTriangle, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── FAQ accordion ─── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: '#E8E4DD20' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left bg-transparent border-none cursor-pointer"
      >
        <span className="font-heading font-semibold text-base" style={{ color: '#F5F3EE' }}>{q}</span>
        <ChevronDown
          size={18}
          className="flex-shrink-0 ml-4 transition-transform duration-300"
          style={{ color: '#E63B2E', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? '300px' : '0px' }}>
        <p className="font-heading text-sm leading-relaxed pb-5" style={{ color: '#E8E4DD88' }}>{a}</p>
      </div>
    </div>
  );
}

/* ─── Breadcrumb ─── */
function Breadcrumbs({ current }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-heading mb-6" style={{ color: '#E8E4DD66' }}>
      <Link to="/" className="hover:underline" style={{ color: '#E8E4DD66' }}>Home</Link>
      <ChevronRight size={12} />
      <Link to="/services" className="hover:underline" style={{ color: '#E8E4DD66' }}>Services</Link>
      <ChevronRight size={12} />
      <span style={{ color: '#E8E4DDaa' }}>{current}</span>
    </nav>
  );
}

/* ─── Service data keyed by slug ─── */
const serviceData = {
  'sign-design-winnipeg': {
    title: 'Professional Sign Design Winnipeg',
    metaTitle: 'Professional Sign Design Winnipeg | OnBoard Print & Signs',
    metaDesc: 'Expert sign design in Winnipeg. CorelDRAW, AutoCAD, SketchUp, 3D visualization, permit-ready drawings. Front-lit, back-lit, halo-lit options. OnBoard Print & Signs.',
    heroText: "Great signage starts with great design. Our dedicated design team creates sign concepts that look exceptional, meet fabrication requirements, and satisfy city permit specifications — all before a single piece of material is cut.",
    heroImage: { src: 'https://images.unsplash.com/photo-1661218986964-63fe8f3bf67c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Professional sign design process — digital layout and 3D visualization for Winnipeg signage projects' },
    contentImage: { src: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&q=80&auto=format&fit=crop', alt: '3D visualization render of a custom sign design for client approval', afterSection: 1 },
    sections: [
      {
        type: 'list',
        heading: 'Our Design Tools',
        items: [
          'CorelDRAW — industry-standard sign design',
          'AutoCAD — technical drawings and permit documentation',
          'SketchUp — 3D visualization and rendering',
          'Scale and layout verification systems',
        ],
      },
      {
        type: 'list',
        heading: 'What We Design',
        items: [
          'Logo refinement and letter style development',
          'Front-lit, back-lit, and combo-lit design options',
          'Raceway, backer panel, or direct-mount layouts',
          'Scaled shop drawings and installation-ready files',
          'Electrical layout compliant with local codes',
          'Permit-ready drawings and specifications',
        ],
      },
      {
        type: 'process',
        heading: 'Our Design Process',
        steps: [
          'Brief — understand your brand, your space, your goals',
          'Initial concepts — 2–3 directions for your review',
          '3D visualization — see your sign on your building before anything is built',
          'Revisions — we refine until you\'re happy',
          'Final approval — you sign off before fabrication begins',
          'Permit-ready files — prepared and submitted to the city',
        ],
      },
      {
        type: 'callout',
        text: "Every design we produce is built with fabrication and installation in mind. A design that looks great on screen but can't be built properly isn't a design — it's a problem. We catch those issues at the design stage so you never encounter them at installation.",
      },
    ],
    faqs: [],
    relatedServices: [
      { label: 'Manufacturing & Fabrication', slug: '/services/sign-manufacturing-winnipeg' },
      { label: 'Installation & Maintenance', slug: '/services/installation-maintenance-winnipeg' },
    ],
  },

  'sign-manufacturing-winnipeg': {
    title: 'Sign Manufacturing & Fabrication Winnipeg',
    metaTitle: 'Sign Manufacturing Winnipeg | UL-Certified Fabrication | OnBoard Print & Signs',
    metaDesc: 'UL-certified sign manufacturing and fabrication in Winnipeg. CNC routing, laser cutting, LED wiring, aluminum and acrylic fabrication. OnBoard Print & Signs.',
    heroText: "Everything we fabricate is built in-house by our team — not outsourced to a third party. That means we control quality at every step, and we stand behind the finished product completely.",
    heroVideo: { src: '/image-assets/laser.mp4', ariaLabel: 'Laser cutting machine fabricating aluminum sign components at OnBoard Print & Signs Winnipeg' },
    contentImage: { src: '/image-assets/cnc_router_2.webp', alt: 'CNC router cutting aluminum channel letter components in our Winnipeg sign fabrication shop', afterSection: 1 },
    extraVideo: { src: '/image-assets/plotter.mp4', ariaLabel: 'Wide-format vinyl plotter cutting precision graphics for vehicle wraps and signage at OnBoard Print & Signs' },
    sections: [
      {
        type: 'list',
        heading: 'Equipment',
        items: [
          'CNC router & laser cutting machines',
          'Coil letter bending systems',
          'LED layout and testing stations',
          'Electrical assembly & quality-control tools',
        ],
      },
      {
        type: 'credentials',
        heading: 'Certifications',
        items: [
          'UL-certified sign fabrication',
          'UL-listed LED modules and power supplies',
          'Electrical code-compliant wiring and components',
          'Permit-ready fabrication documentation',
        ],
      },
      {
        type: 'list',
        heading: 'What We Build',
        items: [
          'Aluminum returns and acrylic face fabrication',
          'LED placement, wiring, and load calculations',
          'Weather sealing and structural reinforcement',
          'Pre-installation testing and quality inspection',
        ],
      },
      {
        type: 'standards',
        text: "We refuse to reuse old acrylic sheets to save a client money. Old acrylic retains glue residue from previous signs — that residue glows through the face at night and ruins the finished look. We'd rather lose the job than deliver work we're not proud of. That's not a policy. It's how we think.",
      },
    ],
    faqs: [],
    relatedServices: [
      { label: 'Sign Design', slug: '/services/sign-design-winnipeg' },
      { label: 'Installation & Maintenance', slug: '/services/installation-maintenance-winnipeg' },
    ],
  },

  'installation-maintenance-winnipeg': {
    title: 'Sign Installation & Maintenance Winnipeg',
    metaTitle: 'Sign Installation & Maintenance Winnipeg | OnBoard Print & Signs',
    metaDesc: 'Professional sign installation and maintenance in Winnipeg. Bucket trucks, UL-certified installers, WCB insured, $5M liability. City permits handled. OnBoard Print & Signs.',
    heroText: "Installation is where everything either comes together or falls apart. We use licensed operators, bucket trucks, and follow every electrical and building code — because a sign that isn't installed right isn't done.",
    heroImage: { src: '/image-assets/sign_installation.webp', alt: 'Professional sign installation in Winnipeg — licensed installers mounting a commercial sign with a bucket truck' },
    contentImage: { src: '/image-assets/installation_signage.webp', alt: 'Professional sign installation in progress — OnBoard Print & Signs team installing commercial signage in Winnipeg', afterSection: 2, objectPosition: 'top' },
    sections: [
      {
        type: 'trust',
        heading: 'Trust Credentials',
        items: [
          'WCB Insured',
          '$5,000,000 Liability Insurance',
          'UL-Certified Installation',
          'Licensed Operators',
          'City Inspection & Permit Coordination',
        ],
      },
      {
        type: 'list',
        heading: 'Equipment',
        items: [
          'Bucket trucks and lift equipment',
          'Professional mounting and anchoring tools',
          'Electrical testing and safety equipment',
          'Job-site safety and access equipment',
        ],
      },
      {
        type: 'process',
        heading: 'Installation Process',
        steps: [
          'Site survey and pre-installation planning',
          'Raceway, backer panel, or direct-mount installation (per design spec)',
          'Electrical connection, testing, and illumination checks',
          'Final alignment and structural confirmation',
          'Cleanup and site restoration',
          'Client walkthrough — we don\'t leave until you\'re satisfied',
          'City inspection coordination where required',
        ],
      },
      {
        type: 'permit-detail',
        heading: 'Permit Handling',
        intro: 'We manage the entire permit process so you don\'t have to:',
        items: [
          'Review of local sign bylaws and zoning rules',
          'Preparation of permit and shop drawings',
          'Coordination with City of Winnipeg authorities and inspectors',
          'Permit tracking, revisions, and final approval support',
          'Electrical documentation meeting code standards',
        ],
      },
      {
        type: 'warning',
        title: 'The electrical conversation nobody is having with you.',
        text: "Many Winnipeg sign shops quote you for the sign but exclude the electrical connection. By installation day, you're surprised by costs you didn't expect. At OnBoard, we include the full electrical scope in every quote — upfront, no exceptions. If it lights up, the electrical is part of the conversation from the start.",
      },
      {
        type: 'text',
        heading: 'Maintenance',
        body: 'We don\'t disappear after installation. Our maintenance services include:',
        bullets: [
          { bold: 'LED module replacement', text: 'restore full brightness and colour consistency' },
          { bold: 'Face panel cleaning and restoration', text: 'remove grime, UV damage, and discolouration' },
          { bold: 'Structural checks and re-anchoring', text: 'ensure sign integrity after weather events' },
          { bold: 'Electrical diagnostics and repair', text: 'troubleshoot wiring, drivers, and connections' },
          { bold: 'Seasonal inspection packages', text: 'preventive maintenance to extend sign life' },
        ],
      },
    ],
    faqs: [
      { q: 'Do you handle permits for sign installation?', a: 'Yes. We prepare all permit drawings, submit to the city, and coordinate inspections.' },
      { q: 'What areas do you install in?', a: 'Winnipeg, Steinbach, and Selkirk, Manitoba. Call us for other areas — we may be able to accommodate.' },
      { q: 'Are your installers insured?', a: 'Yes. WCB covered and $5M liability insurance. We can provide certificates on request.' },
      { q: 'How long does installation take?', a: 'Most commercial sign installations take 1–4 hours. Larger or more complex projects (multiple signs, high-rise mounting) may take a full day. We\'ll give you a time estimate before we book.' },
    ],
    relatedServices: [
      { label: 'Permits & Electrical', slug: '/services/permits-winnipeg' },
      { label: 'Manufacturing & Fabrication', slug: '/services/sign-manufacturing-winnipeg' },
    ],
  },

  'permits-winnipeg': {
    title: 'Sign Permit Services Winnipeg',
    metaTitle: 'Sign Permits Winnipeg | City Permit Handling | OnBoard Print & Signs',
    metaDesc: 'OnBoard handles all city sign permits in Winnipeg, Steinbach & Selkirk. Permit drawings, bylaw compliance, electrical documentation, city inspection coordination.',
    heroText: "Permits are not optional. They protect you legally, satisfy your insurance requirements, and are almost always required by your property manager. We handle the entire process so you never have to figure it out yourself.",
    heroImage: { src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80&auto=format&fit=crop', alt: 'Permit-ready sign drawings prepared for City of Winnipeg submission' },
    contentImage: { src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1600&q=80&auto=format&fit=crop', alt: 'Electrical wiring and compliance work during sign installation', afterSection: 0 },
    sections: [
      {
        type: 'list',
        heading: 'What We Handle',
        items: [
          'Review of local sign bylaws and zoning rules for your specific location',
          'Preparation of permit and shop drawings',
          'Electrical documentation meeting code standards',
          'UL fabrication and installation references',
          'Digital submission and tracking',
          'Coordination with City of Winnipeg authorities and inspectors',
          'Permit tracking, revisions, and final approval support',
          'Inspection-ready submissions',
        ],
      },
      {
        type: 'standards',
        text: "We refuse jobs where clients ask us to skip permits. Not because we're inflexible — because skipping permits puts you at legal risk, voids your insurance, and creates problems when you eventually sell or transfer your lease. We protect you, even when you'd rather save the money.",
      },
    ],
    faqs: [],
    relatedServices: [
      { label: 'Installation & Maintenance', slug: '/services/installation-maintenance-winnipeg' },
      { label: 'Sign Design', slug: '/services/sign-design-winnipeg' },
    ],
  },

  'website-application-development': {
    title: 'Website & Application Development Winnipeg',
    metaTitle: 'Website & App Development Winnipeg | OnBoard Print & Signs',
    metaDesc: 'Custom website and application development in Winnipeg by OnBoard Print & Signs. Brand-aligned web design, business websites, and digital presence for local businesses.',
    heroText: "Your sign is up. Your truck is wrapped. Now make sure your digital storefront matches. We build brand-aligned websites and web applications for Winnipeg businesses — designed with the same attention to detail we put into every sign we make.",
    heroImage: { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80&auto=format&fit=crop', alt: 'Web developer building a custom business website for a Winnipeg client' },
    contentImage: { src: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1600&q=80&auto=format&fit=crop', alt: 'Custom responsive website design displayed on multiple devices', afterSection: 1 },
    sections: [
      {
        type: 'callout',
        text: "This is a service most sign companies in Winnipeg don't offer at all. We do, because we understand that your physical signage and your website need to feel like the same brand.",
      },
      {
        type: 'categorized-list',
        heading: 'What We Build',
        categories: [
          {
            name: 'Web Presence',
            items: [
              'Business websites (brochure, portfolio, lead-generation)',
              'Landing pages for specific campaigns, services, or promotions',
              'Full e-commerce stores (product listings, cart, checkout, inventory management)',
            ],
          },
          {
            name: 'Business Systems & Software',
            items: [
              'Payment gateway integrations (Stripe, Square, PayPal, Moneris)',
              'Custom receipt & invoicing software — automated receipts, branded PDF invoices, email delivery',
              'Booking & scheduling systems — appointment management, staff scheduling, automated reminders',
              'Customer portals — account management, order history, document access',
              'Inventory management systems — real-time stock tracking, supplier management',
              'Point-of-sale (POS) integrations — connecting your in-store and online systems',
              'CRM integrations — connecting your website to your customer management tools',
            ],
          },
          {
            name: 'API & Third-Party Integrations',
            items: [
              'Payment gateway APIs (Stripe, PayPal, Moneris)',
              'Shipping & logistics APIs (Canada Post, Purolator, UPS)',
              'Google Maps & location services',
              'Email marketing integrations (Mailchimp, Klaviyo, SendGrid)',
              'Social media integrations and feeds',
              'Any third-party platform your business already uses',
            ],
          },
          {
            name: 'Digital Marketing Add-ons',
            items: [
              'On-page SEO setup (meta tags, schema, sitemaps, structured data)',
              'Google Analytics 4 & conversion tracking setup',
              'Google Search Console setup and submission',
              'Google Business Profile optimization',
              'Basic social media asset creation (banners, profile images)',
              'Ad landing page builds (Google Ads, Meta Ads)',
            ],
          },
        ],
      },
      {
        type: 'monthly-plans',
        heading: 'Monthly Management Plans',
        intro: "Running a business is a full-time job. Managing your website, keeping software updated, monitoring performance, and handling technical issues shouldn't have to be yours too.\n\nWe offer monthly management plans for Winnipeg businesses that want their online systems looked after — without having to think about it.",
        items: [
          'Website hosting management & uptime monitoring',
          'Software & plugin updates',
          'Security monitoring and backups',
          'Content updates (text, images, pricing, hours)',
          'Performance monitoring & speed optimization',
          'Monthly analytics report — traffic, leads, conversions',
          'Priority support — we pick up when you call',
          'Ongoing SEO maintenance',
        ],
        closing: "One flat monthly fee. No surprise invoices. Your systems stay current, secure, and running — we handle it so you don't have to.",
        ctaLabel: 'Ask About Our Plans →',
        ctaLink: '/contact',
      },
      {
        type: 'text',
        heading: 'Our Approach',
        body: "We understand branding because we live it every day. We won't hand you a template dressed up to look custom. Everything we build is designed around your brand, your goals, and your customers.",
      },
      {
        type: 'list',
        heading: 'Who This Is For',
        items: [
          'New businesses launching and needing a professional online presence',
          'Existing businesses whose website doesn\'t match the quality of their physical branding',
          'Businesses that already have signage from us and want a consistent brand experience online',
        ],
      },
      {
        type: 'tech-stack',
        heading: 'For the Nerds',
        subheading: "What's actually running under the hood",
        intro: "If you're the kind of person who wants to know the stack before you trust someone with your system — we respect that. Here's exactly what we build with and why.",
        groups: [
          {
            name: 'Frontend',
            rows: [
              ['Next.js 14 (App Router)', 'React-based framework with server-side rendering, static generation, and edge-ready routing. Gives us full control over performance, SEO, and UX without platform restrictions.'],
              ['TypeScript', 'Strict typing across the entire codebase. Catches bugs at compile time, makes the codebase maintainable long-term, and prevents the kind of runtime errors that silently break production apps.'],
              ['Tailwind CSS', 'Utility-first CSS — no bloated stylesheets, no specificity wars, pixel-perfect layouts, responsive by default.'],
              ['Framer Motion', 'Production-grade animation library for React. Used for page transitions, scroll-triggered reveals, and micro-interactions.'],
            ],
          },
          {
            name: 'Backend',
            rows: [
              ['Node.js', 'Non-blocking, event-driven runtime. Handles concurrent connections efficiently — ideal for APIs, real-time features, and I/O-heavy applications.'],
              ['Express.js', 'Minimal, unopinionated REST API framework. We use it for custom API routes, middleware pipelines, and backend logic that lives outside the Next.js layer.'],
              ['Next.js API Routes / Route Handlers', 'For tightly coupled server logic, we use Next.js native route handlers — reducing round trips and keeping the architecture lean.'],
            ],
          },
          {
            name: 'Database',
            rows: [
              ['MongoDB (with Mongoose)', 'Document-oriented NoSQL database. Flexible schema for evolving data models, horizontal scalability, and native JSON storage — ideal for content-heavy and product catalog applications.'],
              ['PostgreSQL (via Prisma)', 'When relational integrity matters — financial transactions, booking systems, inventory management — we use PostgreSQL with Prisma ORM for type-safe queries and migration management.'],
              ['Redis', 'In-memory data store used for session management, rate limiting, caching frequently accessed data, and job queues.'],
            ],
          },
          {
            name: 'Payments & APIs',
            rows: [
              ['Stripe', 'PCI-compliant payment processing. We implement Stripe Checkout, Payment Intents, subscription billing, and webhook handlers for post-payment automation.'],
              ['Moneris', "Canadian-first payment processing — lower cross-border fees for CAD transactions and native support for Canadian banking infrastructure."],
              ['Resend / SendGrid / Nodemailer', 'Transactional email — order confirmations, automated receipts, booking reminders, and system alerts.'],
              ['REST & GraphQL APIs', 'We build and consume both. All third-party integrations (shipping, CRM, POS, social) are handled through clean API abstraction layers so your system stays modular.'],
            ],
          },
          {
            name: 'DevOps & Deployment',
            rows: [
              ['Vercel', 'Zero-config deployment for Next.js. Automatic preview deployments on every branch, edge network distribution, and built-in analytics.'],
              ['Docker', 'Containerized environments for backend services — ensures dev/prod parity and makes deployments portable and reproducible.'],
              ['GitHub Actions', "CI/CD pipelines for automated testing, linting, and deployment. Code doesn't go to production without passing the pipeline."],
              ['Environment-based config', 'All secrets, API keys, and environment variables are managed via .env files and secrets managers — never hardcoded, never in version control.'],
            ],
          },
        ],
        devProcess: [
          { title: 'Discovery & scoping', desc: 'requirements documented, stack selected for the use case, timeline and milestones agreed before any code is written' },
          { title: 'Design & prototyping', desc: 'wireframes and hi-fi mockups reviewed and approved before development begins' },
          { title: 'Agile development sprints', desc: 'work delivered in testable increments, not a black box' },
          { title: 'Code review & QA', desc: 'every feature tested in staging before it touches production' },
          { title: 'Deployment & go-live', desc: 'zero-downtime deployments, post-launch monitoring' },
          { title: 'Handoff or ongoing maintenance', desc: 'full documentation provided; or we stay on through a monthly plan' },
        ],
        closing: "We don't do black-box development. You own your codebase, your data, and your infrastructure. If you ever want to bring things in-house or switch providers, we'll hand over everything, documented and clean.",
      },
    ],
    faqs: [],
    relatedServices: [
      { label: 'Sign Design', slug: '/services/sign-design-winnipeg' },
      { label: 'LED Channel Letter Signs', slug: '/products/led-channel-letter-signs-winnipeg' },
    ],
  },
};

/* ─── Section renderers ─── */
function SectionText({ heading, body, bullets }) {
  return (
    <div>
      {heading && <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-4" style={{ color: '#111111' }}>{heading}</h2>}
      {body && <p className="font-heading text-base leading-relaxed mb-4" style={{ color: '#444' }}>{body}</p>}
      {bullets && (
        <ul className="space-y-2 ml-1">
          {bullets.map((b) => (
            <li key={b.bold} className="font-heading text-base leading-relaxed flex items-center gap-2" style={{ color: '#444' }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#E63B2E' }} />
              <span><strong style={{ color: '#111111' }}>{b.bold}</strong> — {b.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SectionList({ heading, items }) {
  return (
    <div>
      <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-4" style={{ color: '#111111' }}>{heading}</h2>
      <ul className="space-y-2 ml-1">
        {items.map((item) => (
          <li key={item} className="font-heading text-base leading-relaxed flex items-center gap-2" style={{ color: '#444' }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#E63B2E' }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionProcess({ heading, steps }) {
  return (
    <div>
      <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-6" style={{ color: '#111111' }}>{heading}</h2>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-4 p-4 border" style={{ borderRadius: '1rem', borderColor: '#E8E4DD60', backgroundColor: '#FFFFFF60' }}>
            <div
              className="w-8 h-8 flex-shrink-0 flex items-center justify-center font-data text-xs font-bold"
              style={{ backgroundColor: '#E63B2E', color: '#fff', borderRadius: '0.5rem' }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <span className="font-heading text-base" style={{ color: '#333' }}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionCallout({ text }) {
  return (
    <div className="p-6 border-l-4" style={{ borderColor: '#E63B2E', backgroundColor: '#E63B2E08', borderRadius: '0 1rem 1rem 0' }}>
      <p className="font-heading text-base leading-relaxed font-medium" style={{ color: '#333' }}>{text}</p>
    </div>
  );
}

function SectionTrust({ heading, items }) {
  return (
    <div>
      <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-6" style={{ color: '#111111' }}>{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3 p-4 border" style={{ borderRadius: '1rem', borderColor: '#E8E4DD60', backgroundColor: '#FFFFFF60' }}>
            <CheckCircle size={20} style={{ color: '#16a34a' }} className="flex-shrink-0" />
            <span className="font-heading font-semibold text-base" style={{ color: '#111111' }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionCredentials({ heading, items }) {
  return (
    <div>
      <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-4" style={{ color: '#111111' }}>{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3 p-4 border" style={{ borderRadius: '1rem', borderColor: '#E8E4DD60', backgroundColor: '#FFFFFF60' }}>
            <CheckCircle size={18} style={{ color: '#E63B2E' }} className="flex-shrink-0" />
            <span className="font-heading text-sm" style={{ color: '#333' }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionPermitDetail({ heading, intro, items }) {
  return (
    <div>
      <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-4" style={{ color: '#111111' }}>{heading}</h2>
      <p className="font-heading text-base leading-relaxed mb-4" style={{ color: '#444' }}>{intro}</p>
      <ul className="space-y-2 ml-1">
        {items.map((item) => (
          <li key={item} className="font-heading text-base leading-relaxed flex items-center gap-2" style={{ color: '#444' }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#E63B2E' }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionStandards({ text }) {
  return (
    <div className="p-6 border" style={{ borderRadius: '1.25rem', borderColor: '#111111', backgroundColor: '#11111108' }}>
      <p className="font-heading text-base leading-relaxed font-medium italic" style={{ color: '#333' }}>{text}</p>
    </div>
  );
}

function SectionWarning({ title, text }) {
  return (
    <div className="flex gap-4 p-6 border" style={{ borderRadius: '1.25rem', borderColor: '#E63B2E40', backgroundColor: '#E63B2E08' }}>
      <AlertTriangle size={22} className="flex-shrink-0 mt-0.5" style={{ color: '#E63B2E' }} />
      <div>
        <p className="font-heading font-bold text-base mb-1" style={{ color: '#111111' }}>{title}</p>
        <p className="font-heading text-sm leading-relaxed" style={{ color: '#444' }}>{text}</p>
      </div>
    </div>
  );
}

function SectionCategorizedList({ heading, categories }) {
  return (
    <div>
      <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-6" style={{ color: '#111111' }}>{heading}</h2>
      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat.name}>
            <h3 className="font-heading font-semibold text-lg mb-3" style={{ color: '#E63B2E' }}>{cat.name}</h3>
            <ul className="space-y-2 ml-1">
              {cat.items.map((item) => (
                <li key={item} className="font-heading text-base leading-relaxed flex items-center gap-2" style={{ color: '#444' }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#E63B2E' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionMonthlyPlans({ heading, intro, items, closing, ctaLabel, ctaLink }) {
  return (
    <div>
      <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-4" style={{ color: '#111111' }}>{heading}</h2>
      {intro.split('\n\n').map((p, i) => (
        <p key={i} className="font-heading text-base leading-relaxed mb-4" style={{ color: '#444' }}>{p}</p>
      ))}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3 p-4 border" style={{ borderRadius: '1rem', borderColor: '#E8E4DD60', backgroundColor: '#FFFFFF60' }}>
            <CheckCircle size={18} style={{ color: '#16a34a' }} className="flex-shrink-0" />
            <span className="font-heading text-sm" style={{ color: '#333' }}>{item}</span>
          </div>
        ))}
      </div>
      <p className="font-heading text-base leading-relaxed font-medium mb-6" style={{ color: '#333' }}>{closing}</p>
      <Link
        to={ctaLink}
        className="btn-magnetic inline-flex items-center gap-2 px-6 py-3 text-sm font-heading font-semibold text-white"
        style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}
      >
        <span className="btn-bg" style={{ backgroundColor: '#111111' }}></span>
        <span className="btn-text flex items-center gap-2">{ctaLabel}</span>
      </Link>
    </div>
  );
}

function SectionTechStack({ heading, subheading, intro, groups, devProcess, closing }) {
  return (
    <div>
      <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-1" style={{ color: '#111111' }}>{heading}</h2>
      <p className="font-heading text-base mb-4" style={{ color: '#666' }}>{subheading}</p>
      <p className="font-heading text-base leading-relaxed mb-8" style={{ color: '#444' }}>{intro}</p>

      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.name}>
            <h3 className="font-heading font-semibold text-lg mb-3" style={{ color: '#E63B2E' }}>{group.name}</h3>
            <div className="overflow-x-auto" style={{ borderRadius: '1rem' }}>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr style={{ backgroundColor: '#111111' }}>
                    <th className="px-5 py-3 font-heading font-semibold text-sm" style={{ color: '#F5F3EE', width: '35%' }}>Technology</th>
                    <th className="px-5 py-3 font-heading font-semibold text-sm" style={{ color: '#F5F3EE' }}>Why We Use It</th>
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((row, j) => (
                    <tr key={j} style={{ backgroundColor: j % 2 === 0 ? '#E8E4DD40' : '#E8E4DD20' }}>
                      <td className="px-5 py-3 font-heading text-sm font-semibold" style={{ color: '#111111' }}>{row[0]}</td>
                      <td className="px-5 py-3 font-heading text-sm" style={{ color: '#333' }}>{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Development Process */}
      <h3 className="font-heading font-semibold text-lg mt-10 mb-4" style={{ color: '#E63B2E' }}>Our Development Process</h3>
      <div className="space-y-3">
        {devProcess.map((step, i) => (
          <div key={i} className="flex items-start gap-4 p-4 border" style={{ borderRadius: '1rem', borderColor: '#E8E4DD60', backgroundColor: '#FFFFFF60' }}>
            <div
              className="w-8 h-8 flex-shrink-0 flex items-center justify-center font-data text-xs font-bold"
              style={{ backgroundColor: '#E63B2E', color: '#fff', borderRadius: '0.5rem' }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <span className="font-heading text-base" style={{ color: '#333' }}>
              <strong style={{ color: '#111111' }}>{step.title}</strong> — {step.desc}
            </span>
          </div>
        ))}
      </div>

      <p className="font-heading text-base leading-relaxed font-medium mt-8 p-6 border-l-4" style={{ color: '#333', borderColor: '#111111', backgroundColor: '#11111108', borderRadius: '0 1rem 1rem 0' }}>
        {closing}
      </p>
    </div>
  );
}

function renderSection(section, i) {
  switch (section.type) {
    case 'text': return <SectionText key={i} {...section} />;
    case 'list': return <SectionList key={i} {...section} />;
    case 'process': return <SectionProcess key={i} {...section} />;
    case 'callout': return <SectionCallout key={i} {...section} />;
    case 'trust': return <SectionTrust key={i} {...section} />;
    case 'credentials': return <SectionCredentials key={i} {...section} />;
    case 'permit-detail': return <SectionPermitDetail key={i} {...section} />;
    case 'standards': return <SectionStandards key={i} {...section} />;
    case 'warning': return <SectionWarning key={i} {...section} />;
    case 'categorized-list': return <SectionCategorizedList key={i} {...section} />;
    case 'monthly-plans': return <SectionMonthlyPlans key={i} {...section} />;
    case 'tech-stack': return <SectionTechStack key={i} {...section} />;
    default: return null;
  }
}

/* ─── Main page component ─── */
export default function ServiceDetailPage() {
  const { slug } = useParams();
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const service = serviceData[slug];

  useEffect(() => {
    if (!service) return;
    document.title = service.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', service.metaDesc);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `https://onboardprints.ca/services/${slug}`);

    // OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', service.metaTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', service.metaDesc);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `https://onboardprints.ca/services/${slug}`);

    // Inject BreadcrumbList schema
    const breadcrumbSchema = document.createElement('script');
    breadcrumbSchema.type = 'application/ld+json';
    breadcrumbSchema.id = 'service-breadcrumb-schema';
    breadcrumbSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://onboardprints.ca/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://onboardprints.ca/services" },
        { "@type": "ListItem", "position": 3, "name": service.title, "item": `https://onboardprints.ca/services/${slug}` },
      ],
    });
    document.head.appendChild(breadcrumbSchema);

    // Inject FAQPage schema if FAQs exist
    let faqSchema;
    if (service.faqs.length > 0) {
      faqSchema = document.createElement('script');
      faqSchema.type = 'application/ld+json';
      faqSchema.id = 'service-faq-schema';
      faqSchema.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": service.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": { "@type": "Answer", "text": faq.a },
        })),
      });
      document.head.appendChild(faqSchema);
    }

    return () => {
      const bs = document.getElementById('service-breadcrumb-schema');
      if (bs) bs.remove();
      const fs = document.getElementById('service-faq-schema');
      if (fs) fs.remove();
    };
  }, [service, slug]);

  useEffect(() => {
    if (!service) return;
    const ctx = gsap.context(() => {
      gsap.from('.svc-detail-hero-content', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2,
      });
    }, heroRef);
    return () => ctx.revert();
  }, [service]);

  useEffect(() => {
    if (!service) return;
    const ctx = gsap.context(() => {
      gsap.from('.svc-detail-section', {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 75%' },
      });
    }, contentRef);
    return () => ctx.revert();
  }, [service]);

  if (!service) {
    return (
      <main className="min-h-screen pt-40 pb-20 px-6 text-center">
        <h1 className="font-heading font-bold text-3xl mb-4" style={{ color: '#111111' }}>Service Not Found</h1>
        <Link to="/services" className="font-heading font-semibold text-sm" style={{ color: '#E63B2E' }}>&larr; Back to Services</Link>
      </main>
    );
  }

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-40 pb-16 px-6 md:px-12" style={{ backgroundColor: '#111111' }}>
        <div className="svc-detail-hero-content max-w-3xl mx-auto">
          <Breadcrumbs current={service.title} />
          <h1 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight mb-6" style={{ color: '#F5F3EE' }}>
            {service.title.replace(' Winnipeg', ' ')}
            <span className="font-drama italic" style={{ color: '#E63B2E' }}>Winnipeg.</span>
          </h1>
          <p className="font-heading text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: '#E8E4DD88' }}>
            {service.heroText}
          </p>
          <Link
            to="/quote"
            className="btn-magnetic inline-flex items-center gap-2 px-6 py-3 text-sm font-heading font-semibold text-white mt-8"
            style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}
          >
            <span className="btn-bg" style={{ backgroundColor: '#333' }}></span>
            <span className="btn-text flex items-center gap-2">Get a Free Quote <ArrowRight size={14} /></span>
          </Link>
        </div>
      </section>

      {/* Hero image or video */}
      {(service.heroImage || service.heroVideo) && (
        <section className="px-6 md:px-12 py-8" style={{ backgroundColor: '#F5F3EE' }}>
          <div className="max-w-4xl mx-auto overflow-hidden" style={{ borderRadius: '2rem' }}>
            {service.heroVideo ? (
              <video
                src={service.heroVideo.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-auto object-cover"
                style={{ maxHeight: '500px' }}
                aria-label={service.heroVideo.ariaLabel}
              />
            ) : (
              <img
                src={service.heroImage.src}
                alt={service.heroImage.alt}
                width={1600}
                height={900}
                loading="eager"
                className="w-full h-auto object-cover"
                style={{ maxHeight: '500px' }}
              />
            )}
          </div>
        </section>
      )}

      {/* Content sections */}
      <section ref={contentRef} className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#F5F3EE' }}>
        <div className="max-w-3xl mx-auto space-y-12">
          {service.sections.map((section, i) => (
            <React.Fragment key={i}>
              <div className="svc-detail-section">
                {renderSection(section, i)}
              </div>
              {service.contentImage && service.contentImage.afterSection === i && (
                <div className="svc-detail-section overflow-hidden" style={{ borderRadius: '1.5rem' }}>
                  {/* TODO: Replace src with /images/[page-name]-content.jpg from public folder */}
                  <img
                    src={service.contentImage.src}
                    alt={service.contentImage.alt}
                    width={1600}
                    height={900}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                    style={{ maxHeight: '420px', objectPosition: service.contentImage.objectPosition || 'center' }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Extra video (e.g. plotter) */}
      {service.extraVideo && (
        <section className="px-6 md:px-12 pb-16" style={{ backgroundColor: '#F5F3EE' }}>
          <div className="max-w-3xl mx-auto overflow-hidden" style={{ borderRadius: '1.5rem' }}>
            <video
              src={service.extraVideo.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-auto object-cover"
              style={{ maxHeight: '420px' }}
              aria-label={service.extraVideo.ariaLabel}
            />
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <section className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#111111' }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-data text-xs tracking-widest uppercase text-accent mb-3">Common Questions</p>
              <h2 className="font-heading font-bold text-2xl md:text-4xl tracking-tight" style={{ color: '#F5F3EE' }}>
                Frequently Asked{' '}
                <span className="font-drama italic" style={{ color: '#E63B2E' }}>Questions.</span>
              </h2>
            </div>
            {service.faqs.map((faq) => <FaqItem key={faq.q} {...faq} />)}
          </div>
        </section>
      )}

      {/* Related Services + CTA */}
      <section className="py-16 px-6 md:px-12" style={{ backgroundColor: '#F5F3EE' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-6" style={{ color: '#111111' }}>
            Related Services
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {service.relatedServices.map((rs) => (
              <Link
                key={rs.slug}
                to={rs.slug}
                className="inline-flex items-center gap-2 px-5 py-3 font-heading font-semibold text-sm border text-dark transition-colors duration-200 hover:bg-dark hover:text-white"
                style={{ borderRadius: '2rem', borderColor: '#111111' }}
              >
                {rs.label} <ArrowRight size={14} />
              </Link>
            ))}
          </div>
          <Link
            to="/quote"
            className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 text-base font-heading font-semibold text-white"
            style={{ backgroundColor: '#E63B2E', borderRadius: '2rem' }}
          >
            <span className="btn-bg" style={{ backgroundColor: '#111111' }}></span>
            <span className="btn-text flex items-center gap-2">Request a Quote <ArrowRight size={14} /></span>
          </Link>
        </div>
      </section>
    </>
  );
}
